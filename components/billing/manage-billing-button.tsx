"use client"

import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import { createPortalSession } from "@/lib/billing/actions"
import { cn } from "@/lib/utils"

type Props = {
  variant?: "button" | "link"
}

export function ManageBillingButton({ variant = "button" }: Props) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await createPortalSession()
    })
  }

  if (variant === "link") {
    return (
      <button
        onClick={handleClick}
        disabled={pending}
        className="text-secondary hover:underline disabled:opacity-60"
      >
        {pending ? "Loading…" : "Manage billing"}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={cn(
        "w-full flex items-center justify-center gap-2 rounded-xl bg-surface-high text-foreground text-sm font-medium py-2.5 hover:bg-surface-mid transition-colors disabled:opacity-60",
      )}
    >
      {pending && <Loader2 size={13} className="animate-spin" />}
      {pending ? "Loading…" : "Manage billing"}
    </button>
  )
}
