"use client"

import { signOut } from "@/lib/auth/actions"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

/* shark_v1 Glass Rule: sticky headers use glassmorphism (bg/80 + backdrop-blur-[12px]).
   No border-b — the translucency + ambient shadow creates separation. */

type TopbarProps = {
  email: string
}

export function Topbar({ email }: TopbarProps) {
  const initial = email ? email[0].toUpperCase() : "?"

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-5 glass shadow-ambient">
      <div />

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
            {initial}
          </div>
          <span className="text-muted-foreground hidden sm:block text-xs tracking-wide">{email}</span>
        </div>

        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            aria-label="Sign out"
            className="h-8 w-8 text-muted-foreground"
          >
            <LogOut size={14} />
          </Button>
        </form>
      </div>
    </header>
  )
}
