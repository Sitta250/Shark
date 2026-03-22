"use client"

import { cn } from "@/lib/utils"
import type { TileOption } from "@/lib/intake/schema"

type Props = {
  options: TileOption[]
  value: string
  onChange: (value: string) => void
  cols?: 2 | 3
  error?: string
}

export function TileSelect({ options, value, onChange, cols = 3, error }: Props) {
  return (
    <div className="space-y-2">
      <div
        className={cn(
          "grid gap-2",
          cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
        )}
      >
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "text-left p-3.5 rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                selected
                  ? "border-secondary/40 bg-secondary/10 ring-1 ring-secondary/20"
                  : "border-outline-variant/20 bg-card hover:border-secondary/30 hover:bg-surface-low"
              )}
            >
              <p
                className={cn(
                  "text-sm font-semibold leading-tight",
                  selected ? "text-secondary" : "text-foreground"
                )}
              >
                {opt.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {opt.description}
              </p>
            </button>
          )
        })}
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  )
}
