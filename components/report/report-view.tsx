import { cn } from "@/lib/utils"
import type {
  ReportSections,
  ReportVerdict,
  PainIntensity,
  GrowthTrend,
  RiskSeverity,
} from "@/lib/report/schema"
import { SectionCard, BulletList, LabeledText } from "./section-card"

// ─── Badge ────────────────────────────────────────────────────

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
  declining:   "bg-red-50 text-red-700",
  stable:      "bg-surface-high text-muted-foreground",
  growing:     "bg-emerald-50 text-emerald-700",
  hypergrowth: "bg-secondary/10 text-secondary",
}

const RISK_STYLES: Record<RiskSeverity, string> = {
  low:    "bg-surface-high text-muted-foreground",
  medium: "bg-amber-50 text-amber-700",
  high:   "bg-red-50 text-red-700",
}

const SCORE_STYLES: Record<ReportVerdict, string> = {
  go:      "text-emerald-600",
  caution: "text-amber-600",
  avoid:   "text-red-600",
}

function Badge({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-sm px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider",
      className,
    )}>
      {label}
    </span>
  )
}

// ─── Section group divider ────────────────────────────────────

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground/60 pt-2">
      {children}
    </p>
  )
}

// ─── Sections ─────────────────────────────────────────────────

function ExecutiveVerdictSection({ s }: { s: ReportSections["executive_verdict"] }) {
  return (
    <SectionCard label="Executive verdict" title={s.headline} hero>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-baseline gap-1">
          <span className={cn("text-5xl font-bold tracking-tight tabular-nums", SCORE_STYLES[s.recommendation])}>
            {s.score}
          </span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
        <Badge label={s.recommendation} className={VERDICT_STYLES[s.recommendation]} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{s.summary}</p>
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2.5">Key strengths</p>
        <BulletList items={s.key_strengths} />
      </div>
    </SectionCard>
  )
}

function CustomerSection({ s }: { s: ReportSections["customer_and_pain"] }) {
  return (
    <SectionCard label="Customer & pain" title="Who feels this and how badly">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <LabeledText label="Primary customer" value={s.primary_customer} />
        <div className="space-y-1">
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
        <Badge
          label={s.growth_trend.replace("hypergrowth", "hyper-growth")}
          className={GROWTH_STYLES[s.growth_trend]}
        />
      </div>
      <p className="text-xs text-muted-foreground italic leading-relaxed">{s.tam_note}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2.5">Tailwinds</p>
          <BulletList items={s.key_tailwinds} />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2.5">Headwinds</p>
          <BulletList items={s.key_headwinds} />
        </div>
      </div>
    </SectionCard>
  )
}

function CompetitorsSection({ s }: { s: ReportSections["competitors"] }) {
  return (
    <SectionCard label="Competitors" title="Competitive landscape">
      <p className="text-sm text-muted-foreground leading-relaxed">{s.landscape_summary}</p>
      <div className="space-y-3">
        {s.competitors.map((c, i) => (
          <div key={i} className="rounded-lg bg-surface-low p-4 space-y-1.5">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2.5">Revenue streams</p>
          <BulletList items={s.revenue_streams} />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2.5">Key assumptions</p>
          <BulletList items={s.key_assumptions} />
        </div>
      </div>
    </SectionCard>
  )
}

function MvpSection({ s }: { s: ReportSections["mvp_features"] }) {
  return (
    <SectionCard label="MVP" title={`Build time: ${s.build_time_estimate}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2.5">Must-have</p>
          <BulletList items={s.core_features} />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2.5">Phase 2</p>
          <BulletList items={s.phase_two_features} />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2.5">Cut for now</p>
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
          <p className="text-xs font-medium text-muted-foreground mb-2.5">Potential partnerships</p>
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
          <div key={i} className="rounded-lg bg-surface-low p-4 space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{r.title}</p>
              <Badge label={r.severity} className={RISK_STYLES[r.severity]} />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
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
    { label: "This week",    items: s.week_1 },
    { label: "This month",   items: s.month_1 },
    { label: "This quarter", items: s.quarter_1 },
  ]
  return (
    <SectionCard label="Next steps" title="What to do now">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {phases.map(({ label, items }) => (
          <div key={label}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {label}
            </p>
            <ol className="space-y-2.5">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="text-[0.625rem] font-bold text-muted-foreground mt-0.5 tabular-nums shrink-0 w-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
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
    <div className="space-y-3">

      <ExecutiveVerdictSection s={sections.executive_verdict} />

      <GroupLabel>Market analysis</GroupLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CustomerSection s={sections.customer_and_pain} />
        <MarketSection   s={sections.market_attractiveness} />
      </div>

      <CompetitorsSection s={sections.competitors} />

      <GroupLabel>Strategy</GroupLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <BusinessModelSection s={sections.business_model} />
        <GoToMarketSection    s={sections.go_to_market} />
      </div>

      <MvpSection s={sections.mvp_features} />

      <GroupLabel>Execution</GroupLabel>
      <RisksSection    risks={sections.risks} />
      <NextStepsSection s={sections.next_steps} />

    </div>
  )
}
