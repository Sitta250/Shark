"use client"

import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import { createCheckoutSession } from "@/lib/billing/actions"
import { cn } from "@/lib/utils"

type Props = {
  plan: "starter" | "pro"
  popular?: boolean
}

export function CheckoutButton({ plan, popular }: Props) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await createCheckoutSession(plan)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={cn(
        "w-full flex items-center justify-center gap-2 rounded-xl text-sm font-medium py-2.5 transition-opacity disabled:opacity-60",
        popular
          ? "bg-cta text-white shadow-ambient"
          : "bg-surface-high text-foreground hover:bg-surface-mid",
      )}
    >
      {pending && <Loader2 size={13} className="animate-spin" />}
      {pending ? "Redirecting…" : `Get ${plan.charAt(0).toUpperCase() + plan.slice(1)}`}
    </button>
  )
}
