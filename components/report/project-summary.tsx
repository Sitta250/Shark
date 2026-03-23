import { cn } from "@/lib/utils"
import type { ReportSections, ReportVerdict } from "@/lib/report/schema"
import { ExportButton } from "./export-button"

// ─── Verdict styling ──────────────────────────────────────────

const VERDICT_STYLES: Record<ReportVerdict, { badge: string; score: string }> = {
  go:      { badge: "bg-emerald-50 text-emerald-700", score: "text-emerald-600" },
  caution: { badge: "bg-amber-50 text-amber-700",    score: "text-amber-600"   },
  avoid:   { badge: "bg-red-50 text-red-700",         score: "text-red-600"    },
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
  children,
}: {
  label: string
  labelColor?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-card p-5 space-y-2.5">
      <p className={cn(
        "text-[0.625rem] font-semibold uppercase tracking-wider",
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
          <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Project summary
          </p>
          <h2 className="text-2xl font-bold tracking-tight">{projectName}</h2>
        </div>
        <div className="print:hidden shrink-0">
          <ExportButton />
        </div>
      </div>

      {/* Verdict hero */}
      <div className="rounded-xl bg-card p-6 space-y-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-baseline gap-1">
            <span className={cn("text-5xl font-bold tracking-tight tabular-nums", styles.score)}>
              {ev.score}
            </span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <span className={cn(
            "inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-wider",
            styles.badge,
          )}>
            {ev.recommendation}
          </span>
        </div>
        <p className="text-lg font-semibold tracking-tight leading-snug">{ev.headline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{ev.summary}</p>
      </div>

      {/* Opportunity + Risk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryBlock label="Biggest opportunity" labelColor="text-emerald-600">
          <p className="text-sm leading-relaxed">{opportunity}</p>
        </SummaryBlock>

        <SummaryBlock label="Biggest risk" labelColor="text-red-600">
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
