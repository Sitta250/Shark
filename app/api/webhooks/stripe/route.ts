import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerClient } from "@/lib/supabase/server"
import type { Plan, Subscription } from "@/types"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia",
})

const PRICE_TO_PLAN: Record<string, Plan> = {
  [process.env.STRIPE_PRICE_STARTER ?? ""]: "starter",
  [process.env.STRIPE_PRICE_PRO     ?? ""]: "pro",
}

function planFromPriceId(priceId: string): Plan {
  return PRICE_TO_PLAN[priceId] ?? "free"
}

function statusFromStripe(
  s: Stripe.Subscription.Status,
): Subscription["status"] {
  const map: Partial<Record<Stripe.Subscription.Status, Subscription["status"]>> = {
    active:   "active",
    canceled: "canceled",
    past_due: "past_due",
    trialing: "trialing",
  }
  return map[s] ?? "active"
}

async function upsertSub(
  sub: Stripe.Subscription,
  userId: string,
) {
  const priceId = sub.items.data[0]?.price.id ?? ""
  const plan    = planFromPriceId(priceId)
  const status  = statusFromStripe(sub.status)
  const periodEnd = new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000)

  const supabase = await createServerClient()
  await supabase.from("subscriptions").upsert(
    {
      user_id:                userId,
      plan,
      status,
      stripe_customer_id:     sub.customer as string,
      stripe_subscription_id: sub.id,
      current_period_end:     periodEnd.toISOString(),
      updated_at:             new Date().toISOString(),
    },
    { onConflict: "user_id" },
  )
}

async function handleDeleted(sub: Stripe.Subscription) {
  const supabase = await createServerClient()
  await supabase
    .from("subscriptions")
    .update({
      plan:   "free",
      status: "canceled",
      stripe_subscription_id: null,
      current_period_end: null,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", sub.id)
}

export async function POST(req: Request) {
  const body      = await req.text()
  const headersList = await headers()
  const sig       = headersList.get("stripe-signature") ?? ""
  const secret    = process.env.STRIPE_WEBHOOK_SECRET ?? ""

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== "subscription") break

        const userId = session.metadata?.user_id
        if (!userId) break

        // Retrieve full subscription object
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string,
        )
        await upsertSub(sub, userId)

        // Store customer ID mapping
        const supabase = await createServerClient()
        await supabase
          .from("subscriptions")
          .update({ stripe_customer_id: session.customer as string })
          .eq("user_id", userId)
        break
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription
        // Look up user_id from existing subscription row
        const supabase = await createServerClient()
        const { data } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", sub.customer as string)
          .single()

        if (data?.user_id) {
          await upsertSub(sub, data.user_id)
        }
        break
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription
        await handleDeleted(sub)
        break
      }

      default:
        break
    }
  } catch (err) {
    console.error("Webhook handler error:", err)
    return NextResponse.json({ error: "Handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
