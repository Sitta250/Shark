import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"
import { getSubscription } from "@/lib/billing/actions"
import { CheckoutButton } from "@/components/billing/checkout-button"
import { ManageBillingButton } from "@/components/billing/manage-billing-button"

export const metadata: Metadata = { title: "Pricing" }

const PLANS = [
  {
    id:    "free" as const,
    name:  "Free",
    price: "$0",
    description: "Try Shark with up to 2 ideas.",
    features: [
      "2 active projects",
      "Full AI report generation",
      "Execution workspace",
      "Tasks & milestones",
    ],
  },
  {
    id:    "starter" as const,
    name:  "Starter",
    price: "$19",
    description: "For founders validating multiple ideas.",
    popular: true,
    features: [
      "5 active projects",
      "Full AI report generation",
      "Execution workspace",
      "Tasks & milestones",
      "Export reports",
      "Assumption tracker",
    ],
  },
  {
    id:    "pro" as const,
    name:  "Pro",
    price: "$49",
    description: "For power users and consultants.",
    features: [
      "10 active projects",
      "Full AI report generation",
      "Execution workspace",
      "Tasks & milestones",
      "Export reports",
      "Assumption tracker",
      "Priority support",
    ],
  },
]

export default async function PricingPage() {
  const subscription = await getSubscription()
  const currentPlan  = subscription?.plan ?? "free"
  const hasPaidPlan  = currentPlan !== "free"

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">

          {/* Header */}
          <div className="mx-auto max-w-2xl space-y-3 text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Pricing that scales with you
            </h1>
            <p className="text-muted-foreground">
              Start free with one project. Upgrade when you need more. No credit card required to get started.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => {
              const isCurrent = currentPlan === plan.id
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-xl bg-card p-6 space-y-5 ${
                    plan.popular ? "ring-2 ring-secondary/40" : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[0.625rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-sm">
                      Most popular
                    </span>
                  )}

                  {/* Plan header */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
                        {plan.name}
                      </p>
                      {isCurrent && (
                        <span className="text-[0.625rem] font-semibold uppercase tracking-wider bg-surface-high text-muted-foreground px-2 py-0.5 rounded-sm">
                          Current plan
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">/ mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check size={13} className="text-secondary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div>
                    {plan.id === "free" ? (
                      isCurrent ? (
                        <div className="w-full text-center text-sm text-muted-foreground py-2">
                          Your current plan
                        </div>
                      ) : (
                        <Link
                          href="/signup"
                          className="block w-full text-center rounded-xl bg-surface-high text-foreground text-sm font-medium py-2.5 hover:bg-surface-mid transition-colors"
                        >
                          Get started free
                        </Link>
                      )
                    ) : isCurrent ? (
                      <ManageBillingButton />
                    ) : (
                      <CheckoutButton plan={plan.id} popular={!!plan.popular} />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Manage billing link for existing paid users */}
          {hasPaidPlan && (
            <p className="text-center text-sm text-muted-foreground mt-10">
              Need to cancel or change payment details?{" "}
              <ManageBillingButton variant="link" />
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
