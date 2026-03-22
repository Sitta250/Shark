import { cn } from "@/lib/utils"
import type {
  ReportSections,
  ReportVerdict,
  PainIntensity,
  GrowthTrend,
  RiskSeverity,
} from "@/lib/report/schema"
import { SectionCard, BulletList, LabeledText } from "./section-card"

// ─── Badge helpers ────────────────────────────────────────────

const VERDICT_STYLES: Record<ReportVerdict, string> = {
  go:      "bg-emerald-50 text-emerald-700",
  caution: "bg-amber-50 text-amber-700",
  avoid:   "bg-red-50 text-red-700",
}

const PAIN_STYLES: Record<PainIntensity, string> = {
  low:      "bg-surface-high text-muted-foreground",
  medium:   "bg-amber-50 text-amber-700",
  high:     "bg-orange-50 text-orange-700",
  critical: "bg-red-50 text-red-700",
}

const GROWTH_STYLES: Record<GrowthTrend, string> = {
  declining:    "bg-red-50 text-red-700",
  stable:       "bg-surface-high text-muted-foreground",
  growing:      "bg-emerald-50 text-emerald-700",
  hypergrowth:  "bg-secondary/10 text-secondary",
}

const RISK_STYLES: Record<RiskSeverity, string> = {
  low:    "bg-surface-high text-muted-foreground",
  medium: "bg-amber-50 text-amber-700",
  high:   "bg-red-50 text-red-700",
}

function Badge({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-sm px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider",
      className
    )}>
      {label}
    </span>
  )
}

// ─── Section components ───────────────────────────────────────

function ExecutiveVerdictSection({ s }: { s: ReportSections["executive_verdict"] }) {
  return (
    <SectionCard label="Executive verdict" title={s.headline}>
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight">{s.score}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
        <Badge label={s.recommendation} className={VERDICT_STYLES[s.recommendation]} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{s.summary}</p>
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Key strengths</p>
        <BulletList items={s.key_strengths} />
      </div>
    </SectionCard>
  )
}

function CustomerSection({ s }: { s: ReportSections["customer_and_pain"] }) {
  return (
    <SectionCard label="Customer & pain" title="Who feels this and how badly">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LabeledText label="Primary customer" value={s.primary_customer} />
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-muted-foreground">Pain intensity</p>
          <Badge label={s.pain_intensity} className={PAIN_STYLES[s.pain_intensity]} />
        </div>
        <LabeledText label="Willingness to pay" value={s.willingness_to_pay} />
      </div>
      <LabeledText label="Pain description" value={s.pain_description} />
      <LabeledText label="Evidence" value={s.evidence} />
    </SectionCard>
  )
}

function MarketSection({ s }: { s: ReportSections["market_attractiveness"] }) {
  return (
    <SectionCard label="Market" title="Market attractiveness">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold">{s.size_estimate}</span>
        <Badge label={s.growth_trend.replace("hypergrowth", "hyper-growth")} className={GROWTH_STYLES[s.growth_trend]} />
      </div>
      <p className="text-xs text-muted-foreground italic">{s.tam_note}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Tailwinds</p>
          <BulletList items={s.key_tailwinds} />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Headwinds</p>
          <BulletList items={s.key_headwinds} />
        </div>
      </div>
    </SectionCard>
  )
}

function CompetitorsSection({ s }: { s: ReportSections["competitors"] }) {
  return (
    <SectionCard label="Competitors" title="Competitive landscape">
      <p className="text-sm text-muted-foreground">{s.landscape_summary}</p>
      <div className="space-y-3">
        {s.competitors.map((c, i) => (
          <div key={i} className="rounded-md bg-surface-low p-4 space-y-1">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.description}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Weakness: </span>
              {c.weakness}
            </p>
          </div>
        ))}
      </div>
      <LabeledText label="Positioning gap" value={s.positioning_gap} />
    </SectionCard>
  )
}

function BusinessModelSection({ s }: { s: ReportSections["business_model"] }) {
  return (
    <SectionCard label="Business model" title={s.recommended_model}>
      <LabeledText label="Pricing strategy" value={s.pricing_strategy} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Revenue streams</p>
          <BulletList items={s.revenue_streams} />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Key assumptions</p>
          <BulletList items={s.key_assumptions} />
        </div>
      </div>
    </SectionCard>
  )
}

function MvpSection({ s }: { s: ReportSections["mvp_features"] }) {
  return (
    <SectionCard label="MVP" title={`Build time: ${s.build_time_estimate}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Must-have</p>
          <BulletList items={s.core_features} />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Phase 2</p>
          <BulletList items={s.phase_two_features} />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Cut for now</p>
          <BulletList items={s.avoid} />
        </div>
      </div>
    </SectionCard>
  )
}

function GoToMarketSection({ s }: { s: ReportSections["go_to_market"] }) {
  return (
    <SectionCard label="Go-to-market" title="Launch strategy">
      <LabeledText label="Primary launch channel" value={s.launch_channel} />
      <LabeledText label="First 100 customers" value={s.first_100_customers} />
      <LabeledText label="Content angle" value={s.content_angle} />
      {s.partnerships.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Potential partnerships</p>
          <BulletList items={s.partnerships} />
        </div>
      )}
    </SectionCard>
  )
}

function RisksSection({ risks }: { risks: ReportSections["risks"] }) {
  return (
    <SectionCard label="Risks" title="Key risks to address">
      <div className="space-y-3">
        {risks.map((r, i) => (
          <div key={i} className="rounded-md bg-surface-low p-4 space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{r.title}</p>
              <Badge label={r.severity} className={RISK_STYLES[r.severity]} />
            </div>
            <p className="text-xs text-muted-foreground">{r.description}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Mitigation: </span>
              {r.mitigation}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

function NextStepsSection({ s }: { s: ReportSections["next_steps"] }) {
  const phases = [
    { label: "This week",      items: s.week_1 },
    { label: "This month",     items: s.month_1 },
    { label: "This quarter",   items: s.quarter_1 },
  ]
  return (
    <SectionCard label="Next steps" title="What to do now">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {phases.map(({ label, items }) => (
          <div key={label}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {label}
            </p>
            <ol className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-[0.625rem] font-bold text-muted-foreground mt-0.5 tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

// ─── Main export ──────────────────────────────────────────────

export function ReportView({ sections }: { sections: ReportSections }) {
  return (
    <div className="space-y-4">
      <ExecutiveVerdictSection s={sections.executive_verdict} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomerSection       s={sections.customer_and_pain} />
        <MarketSection         s={sections.market_attractiveness} />
      </div>
      <CompetitorsSection      s={sections.competitors} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BusinessModelSection  s={sections.business_model} />
        <GoToMarketSection     s={sections.go_to_market} />
      </div>
      <MvpSection              s={sections.mvp_features} />
      <RisksSection            risks={sections.risks} />
      <NextStepsSection        s={sections.next_steps} />
    </div>
  )
}
