"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "report",      label: "Report" },
  { id: "tasks",       label: "Tasks" },
  { id: "milestones",  label: "Milestones" },
  { id: "assumptions", label: "Assumptions" },
  { id: "notes",       label: "Notes" },
] as const

export type WorkspaceTab = (typeof TABS)[number]["id"]

type Props = {
  activeTab: WorkspaceTab
  children: React.ReactNode
}

export function WorkspaceShell({ activeTab, children }: Props) {
  const pathname = usePathname()

  return (
    <div className="space-y-5">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-outline-variant/20">
        {TABS.map(({ id, label }) => {
          const href = `${pathname}?tab=${id}`
          const active = id === activeTab
          return (
            <Link
              key={id}
              href={href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors -mb-px",
                active
                  ? "border-b-2 border-secondary text-secondary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* Tab content */}
      <div>{children}</div>
    </div>
  )
}
