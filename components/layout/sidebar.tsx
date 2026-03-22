"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderOpen, CreditCard, Triangle } from "lucide-react"
import { cn } from "@/lib/utils"

/* shark_v1 No-Line Rule: sidebar uses bg-surface-low instead of border-r.
   Tonal shift from bg-background (main) to bg-surface-low (sidebar) = boundary.
   No explicit borders anywhere — spacing acts as the divider. */

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-surface-low h-full">
      {/* Brand — spacing acts as divider, no border */}
      <div className="h-14 flex items-center px-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 font-semibold text-sm tracking-tight hover:opacity-70 transition-opacity"
        >
          <Triangle size={14} className="fill-secondary text-secondary" />
          <span className="text-foreground">Shark</span>
        </Link>
      </div>

      {/* Nav — spacing-8 separates from brand */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-surface-high text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-high"
              )}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer — spacing-8 above, no border-t */}
      <div className="px-5 py-5">
        <p className="text-xs text-muted-foreground truncate mb-1">Free plan</p>
        <Link
          href="/pricing"
          className="text-xs text-secondary hover:opacity-70 transition-opacity font-medium"
        >
          Upgrade
        </Link>
      </div>
    </aside>
  )
}
