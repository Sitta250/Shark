"use client"

import { useState } from "react"

// ─── Domain derivation ────────────────────────────────────────

const NOISE = /\b(Inc|Ltd|Corp|Co|Group|Holdings|Technologies|Tech|AI|App|Apps|Platform|Reviews?|Guides?|Blogs?)\b\.?/gi

function toDomain(name: string): string {
  const clean    = name.replace(/\s*\(.*?\)\s*/g, "").trim()
  const stripped = clean.replace(NOISE, "").trim()
  const slug     = stripped.replace(/\s+/g, "").toLowerCase()
  return `${slug || clean.split(" ")[0].toLowerCase()}.com`
}

// ─── Deterministic color ──────────────────────────────────────
// Consistent hue per brand name — no network or CORS needed.

function brandColor(name: string, alpha: number): string {
  let h = 0
  for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h)
  const hue = Math.abs(h) % 360
  // hsl → rgb (pure math, no DOM)
  const s = 0.60, l = 0.48
  const k  = (n: number) => (n + hue / 30) % 12
  const ch = s * Math.min(l, 1 - l)
  const f  = (n: number) => l - ch * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
  const r  = Math.round(f(0) * 255)
  const g  = Math.round(f(8) * 255)
  const b  = Math.round(f(4) * 255)
  return `rgba(${r},${g},${b},${alpha})`
}

// ─── Logo sources (tried in order) ───────────────────────────

function logoSources(domain: string): string[] {
  return [
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ]
}

// ─── Component ────────────────────────────────────────────────

export function CompetitorCard({
  name,
  description,
  weakness,
}: {
  name: string
  description: string
  weakness: string
}) {
  const domain  = toDomain(name)
  const sources = logoSources(domain)

  const [srcIdx,  setSrcIdx]  = useState(0)
  const [logoOk,  setLogoOk]  = useState(false)

  const src     = sources[srcIdx]
  const initial = name.trim()[0]?.toUpperCase() ?? "?"

  function handleError() {
    if (srcIdx + 1 < sources.length) {
      setSrcIdx(srcIdx + 1) // try next source
    } else {
      setLogoOk(false)       // all sources exhausted → show initial
    }
  }

  return (
    <div
      className="rounded-lg p-5 space-y-3"
      style={{ backgroundColor: brandColor(name, 0.08) }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
          style={{ backgroundColor: brandColor(name, 0.20) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={src}
            src={src}
            alt={name}
            onLoad={() => setLogoOk(true)}
            onError={handleError}
            className={logoOk ? "w-5 h-5 object-contain" : "hidden"}
          />
          {!logoOk && (
            <span className="text-[11px] font-bold text-foreground/60 select-none">
              {initial}
            </span>
          )}
        </div>
        <p className="text-sm font-semibold">{name}</p>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      <p className="text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Weakness: </span>
        {weakness}
      </p>
    </div>
  )
}
