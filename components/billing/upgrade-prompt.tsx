"use client"

import { useTransition } from "react"
import { Sparkles, Loader2, X } from "lucide-react"
import { createCheckoutSession } from "@/lib/billing/actions"
import type { Plan } from "@/types"
import { PLAN_LIMITS } from "@/lib/billing/plans"

type Props = {
  currentPlan: Plan
  onDismiss: () => void
}

const UPGRADE_TARGET: Record<Plan, "starter" | "pro" | null> = {
  free:    "starter",
  starter: "pro",
  pro:     null,
}

const UPGRADE_COPY: Record<Plan, { title: string; description: string } | null> = {
  free: {
    title: "You've reached your project limit",
    description: `The Free plan includes ${PLAN_LIMITS.free} project. Upgrade to Starter for up to ${PLAN_LIMITS.starter} projects.`,
  },
  starter: {
    title: "You've reached your project limit",
    description: `The Starter plan includes ${PLAN_LIMITS.starter} projects. Upgrade to Pro for up to ${PLAN_LIMITS.pro} projects.`,
  },
  pro: null,
}

export function UpgradePrompt({ currentPlan, onDismiss }: Props) {
  const [pending, startTransition] = useTransition()
  const target    = UPGRADE_TARGET[currentPlan]
  const copy      = UPGRADE_COPY[currentPlan]

  if (!target || !copy) return null

  function handleUpgrade() {
    startTransition(async () => {
      await createCheckoutSession(target!)
    })
  }

  return (
    <div className="rounded-xl bg-card ring-1 ring-secondary/20 p-5 flex items-start gap-4 max-w-lg">
      <div className="shrink-0 h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
        <Sparkles size={15} className="text-secondary" />
      </div>

      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold">{copy.title}</p>
          <p className="text-sm text-muted-foreground">{copy.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUpgrade}
            disabled={pending}
            className="inline-flex items-center gap-2 bg-cta text-white rounded-lg px-4 py-2 text-sm font-medium shadow-ambient disabled:opacity-60 transition-opacity"
          >
            {pending ? (
              <><Loader2 size={13} className="animate-spin" /> Redirecting…</>
            ) : (
              <>Upgrade to {target.charAt(0).toUpperCase() + target.slice(1)}</>
            )}
          </button>
          <button
            onClick={onDismiss}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}
