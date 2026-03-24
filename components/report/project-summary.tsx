import { cn } from "@/lib/utils"
import type { ReportSections, ReportVerdict } from "@/lib/report/schema"
import { ExportButton } from "./export-button"

// ─── Verdict styling ──────────────────────────────────────────

const VERDICT_STYLES: Record<ReportVerdict, { badge: string; score: string; cardBg: string }> = {
  go:      { badge: "bg-emerald-100 text-emerald-700", score: "text-emerald-600", cardBg: "bg-emerald-50/60" },
  caution: { badge: "bg-amber-100 text-amber-700",     score: "text-amber-600",   cardBg: "bg-amber-50/60"  },
  avoid:   { badge: "bg-red-100 text-red-700",          score: "text-red-600",     cardBg: "bg-red-50/60"   },
}

function getBiggestRisk(risks: ReportSections["risks"]) {
  const priority = ["high", "medium", "low"]
  for (const sev of priority) {
    const r = risks.find((r) => r.severity === sev)
    if (r) return r
  }
  return risks[0]
}

// ─── Sub-sections ──────────────────────────────────────────────

function SummaryBlock({
  label,
  labelColor,
  bg,
  children,
}: {
  label: string
  labelColor?: string
  bg?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("rounded-xl ring-1 ring-outline-variant/20 p-7 space-y-3", bg ?? "bg-card")}>
      <p className={cn(
        "text-[10px] font-bold uppercase tracking-widest",
        labelColor ?? "text-muted-foreground"
      )}>
        {label}
      </p>
      {children}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────

export function ProjectSummary({
  projectName,
  sections,
}: {
  projectName: string
  sections: ReportSections
}) {
  const ev      = sections.executive_verdict
  const styles  = VERDICT_STYLES[ev.recommendation]
  const risk    = getBiggestRisk(sections.risks)
  const opportunity =
    ev.key_strengths[0] ?? sections.market_attractiveness.key_tailwinds[0]

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
            Project summary
          </p>
          <h2 className="text-2xl font-bold tracking-tight">{projectName}</h2>
        </div>
        <div className="print:hidden shrink-0">
          <ExportButton />
        </div>
      </div>

      {/* Verdict hero */}
      <div className={cn("rounded-xl ring-1 ring-outline-variant/20 p-8 space-y-4 relative overflow-hidden", styles.cardBg)}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/40 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Verdict</p>
          <p className="text-lg font-semibold tracking-tight leading-snug mb-5">{ev.headline}</p>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="bg-white/70 rounded-lg p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Score</p>
              <p className={cn("text-2xl font-bold", styles.score)}>{ev.score}<span className="text-sm font-normal text-muted-foreground">/100</span></p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 col-span-2 flex flex-col justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Recommendation</p>
              <span className={cn("self-start inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-bold uppercase tracking-widest", styles.badge)}>
                {ev.recommendation}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{ev.summary}</p>
        </div>
      </div>

      {/* Opportunity + Risk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryBlock label="Biggest opportunity" labelColor="text-emerald-700" bg="bg-emerald-50/70">
          <p className="text-sm leading-relaxed">{opportunity}</p>
        </SummaryBlock>

        <SummaryBlock label="Biggest risk" labelColor="text-red-700" bg="bg-red-50/70">
          <p className="text-sm font-medium">{risk?.title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Mitigation: </span>
            {risk?.mitigation}
          </p>
        </SummaryBlock>
      </div>

      {/* Next steps */}
      <SummaryBlock label="Recommended next steps — this week">
        <ol className="space-y-2">
          {sections.next_steps.week_1.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="text-[0.625rem] font-bold text-muted-foreground mt-0.5 tabular-nums w-4 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </SummaryBlock>

      {/* Roadmap snapshot */}
      <SummaryBlock label="Roadmap snapshot">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Month 1</p>
            <ul className="space-y-1.5">
              {sections.next_steps.month_1.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Quarter 1</p>
            <ul className="space-y-1.5">
              {sections.next_steps.quarter_1.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SummaryBlock>

    </div>
  )
}
