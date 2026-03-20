"use client"

import { signOut } from "@/lib/auth/actions"
import { LogOut } from "lucide-react"

type TopbarProps = {
  email: string
}

export function Topbar({ email }: TopbarProps) {
  const initial = email ? email[0].toUpperCase() : "?"

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-border bg-card">
      <div />

      <div className="flex items-center gap-2">
        {/* User info */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm">
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
            {initial}
          </div>
          <span className="text-muted-foreground hidden sm:block">{email}</span>
        </div>

        {/* Logout */}
        <form action={signOut}>
          <button
            type="submit"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Sign out"
          >
            <LogOut size={16} />
          </button>
        </form>
      </div>
    </header>
  )
}
