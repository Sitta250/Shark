"use server"

import Stripe from "stripe"
import { redirect } from "next/navigation"
import { createServerClient, getUser } from "@/lib/supabase/server"
import { STRIPE_PRICES } from "@/lib/billing/plans"
import type { Plan, Subscription } from "@/types"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia",
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

// ─── Get subscription ─────────────────────────────────────────

export async function getSubscription(): Promise<Subscription | null> {
  const user = await getUser()
  if (!user) return null

  const supabase = await createServerClient()
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single()

  return data as Subscription | null
}

// ─── Checkout ─────────────────────────────────────────────────

export async function createCheckoutSession(
  plan: "starter" | "pro",
): Promise<{ error?: string }> {
  const user = await getUser()
  if (!user) redirect("/login")

  const priceId = STRIPE_PRICES[plan]
  if (!priceId) return { error: "Price not configured" }

  const supabase = await createServerClient()
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single()

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer: sub?.stripe_customer_id || undefined,
    customer_email: sub?.stripe_customer_id ? undefined : user.email,
    metadata: { user_id: user.id },
    success_url: `${APP_URL}/dashboard?upgraded=1`,
    cancel_url:  `${APP_URL}/pricing`,
  })

  redirect(session.url!)
}

// ─── Customer portal ──────────────────────────────────────────

export async function createPortalSession(): Promise<{ error?: string }> {
  const user = await getUser()
  if (!user) redirect("/login")

  const supabase = await createServerClient()
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single()

  if (!sub?.stripe_customer_id) return { error: "No billing account found" }

  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${APP_URL}/dashboard`,
  })

  redirect(session.url)
}

// ─── Upsert subscription (called from webhook) ────────────────

export async function upsertSubscription(params: {
  userId: string
  plan: Plan
  status: Subscription["status"]
  stripeCustomerId: string
  stripeSubscriptionId: string
  currentPeriodEnd: Date
}): Promise<void> {
  const supabase = await createServerClient()
  await supabase.from("subscriptions").upsert(
    {
      user_id:                params.userId,
      plan:                   params.plan,
      status:                 params.status,
      stripe_customer_id:     params.stripeCustomerId,
      stripe_subscription_id: params.stripeSubscriptionId,
      current_period_end:     params.currentPeriodEnd.toISOString(),
      updated_at:             new Date().toISOString(),
    },
    { onConflict: "user_id" },
  )
}
