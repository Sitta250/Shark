"use client"

import { signOut } from "@/lib/auth/actions"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

type TopbarProps = {
  email: string
}

export function Topbar({ email }: TopbarProps) {
  const initial = email ? email[0].toUpperCase() : "?"

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-border bg-card">
      <div />

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm">
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
            {initial}
          </div>
          <span className="text-muted-foreground hidden sm:block">{email}</span>
        </div>

        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            aria-label="Sign out"
            className="h-8 w-8 text-muted-foreground"
          >
            <LogOut size={15} />
          </Button>
        </form>
      </div>
    </header>
  )
}
