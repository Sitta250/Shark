"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const OPTIONS = [
  "Agency",
  "Consulting",
  "Franchise",
  "Hardware / Physical product",
  "Mobile app",
  "Community / Membership platform",
  "Media / Newsletter",
  "Non-profit",
  "Creator / Content",
  "Open source / Developer tools",
  "Retail",
  "Real estate",
  "Education / EdTech",
  "Health / MedTech",
  "FinTech",
]

type Props = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function OtherBusinessCombobox({ value, onChange, error }: Props) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync display when parent clears
  useEffect(() => {
    setQuery(value)
  }, [value])

  const filtered = OPTIONS.filter(
    (o) => !query || o.toLowerCase().includes(query.toLowerCase())
  )
  const exactMatch = OPTIONS.some(
    (o) => o.toLowerCase() === query.trim().toLowerCase()
  )

  function commit(val: string) {
    setQuery(val)
    onChange(val)
    setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      if (filtered[0]) commit(filtered[0])
      else if (query.trim()) commit(query.trim())
    }
    if (e.key === "Escape") setOpen(false)
  }

  // Close on outside click, commit typed value
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
        if (query.trim() && query !== value) onChange(query.trim())
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [query, value, onChange])

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search or describe your business model…"
          className={cn(
            "pr-9",
            error && "border-destructive focus-visible:ring-destructive/30"
          )}
        />
        <ChevronDown
          size={15}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </div>

      {open && (
        <div className="absolute z-30 top-full mt-1 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden">
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commit(opt)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-2 hover:bg-muted transition-colors",
                    value === opt && "text-primary font-medium"
                  )}
                >
                  {opt}
                  {value === opt && (
                    <Check size={13} className="text-primary shrink-0" />
                  )}
                </button>
              </li>
            ))}

            {/* Custom value option when no exact match */}
            {!exactMatch && query.trim() && (
              <li>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commit(query.trim())}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors text-muted-foreground"
                >
                  Use{" "}
                  <span className="font-medium text-foreground">
                    &ldquo;{query.trim()}&rdquo;
                  </span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive mt-1.5">{error}</p>
      )}
    </div>
  )
}
