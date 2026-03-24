import { cn } from "@/lib/utils"
import type {
  ReportSections,
  ReportVerdict,
  PainIntensity,
  GrowthTrend,
  RiskSeverity,
} from "@/lib/report/schema"
import { SectionCard, BulletList, LabeledText } from "./section-card"

// ─── Style maps ───────────────────────────────────────────────

const VERDICT_BADGE: Record<ReportVerdict, string> = {
  go:      "bg-emerald-50 text-emerald-700",
  caution: "bg-amber-50 text-amber-700",
  avoid:   "bg-red-50 text-red-700",
}

const VERDICT_SCORE: Record<ReportVerdict, string> = {
  go:      "text-emerald-600",
  caution: "text-amber-600",
  avoid:   "text-red-600",
}

const PAIN_BADGE: Record<PainIntensity, string> = {
  low:      "bg-surface-high text-muted-foreground",
  medium:   "bg-amber-50 text-amber-700",
  high:     "bg-orange-50 text-orange-700",
  critical: "bg-red-50 text-red-700",
}

const GROWTH_BADGE: Record<GrowthTrend, string> = {
  declining:   "bg-red-50 text-red-700",
  stable:      "bg-surface-high text-muted-foreground",
  growing:     "bg-emerald-50 text-emerald-700",
  hypergrowth: "bg-secondary/10 text-secondary",
}

const RISK_BADGE: Record<RiskSeverity, string> = {
  low:    "bg-surface-high text-muted-foreground",
  medium: "bg-amber-50 text-amber-700",
  high:   "bg-red-50 text-red-700",
}

// ─── Shared primitives ────────────────────────────────────────

function Badge({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
      className,
    )}>
      {label}
    </span>
  )
}

function StatTile({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="bg-surface-low rounded-lg p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
      <p className={cn("text-2xl font-bold tracking-tight", valueClass)}>{value}</p>
    </div>
  )
}

// ─── Group divider ────────────────────────────────────────────

function GroupDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-outline-variant/20" />
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 shrink-0">
        {label}
      </p>
      <div className="h-px flex-1 bg-outline-variant/20" />
    </div>
  )
}

// ─── Sections ─────────────────────────────────────────────────

function ExecutiveVerdictSection({ s }: { s: ReportSections["executive_verdict"] }) {
  return (
    <div className="bg-card rounded-xl ring-1 ring-outline-variant/20 p-8 relative overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Label + title */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
          Executive verdict
        </p>
        <h3 className="text-xl font-semibold tracking-tight mb-6">{s.headline}</h3>

        {/* Stat tiles */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatTile
            label="Confidence score"
            value={`${s.score}/100`}
            valueClass={VERDICT_SCORE[s.recommendation]}
          />
          <div className="bg-surface-low rounded-lg p-4 col-span-2 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Recommendation</p>
            <Badge label={s.recommendation} className={cn("self-start text-sm px-3 py-1", VERDICT_BADGE[s.recommendation])} />
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.summary}</p>

        {/* Strengths */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Key strengths</p>
          <BulletList items={s.key_strengths} />
        </div>
      </div>
    </div>
  )
}

function CustomerSection({ s }: { s: ReportSections["customer_and_pain"] }) {
  return (
    <SectionCard label="Customer & pain" title="Who feels this and how badly">
      <div className="grid grid-cols-2 gap-4">
        <LabeledText label="Primary customer" value={s.primary_customer} />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pain intensity</p>
          <Badge label={s.pain_intensity} className={PAIN_BADGE[s.pain_intensity]} />
        </div>
      </div>
      <LabeledText label="Willingness to pay" value={s.willingness_to_pay} />
      <LabeledText label="Pain description" value={s.pain_description} />
      <LabeledText label="Evidence" value={s.evidence} />
    </SectionCard>
  )
}

function MarketSection({ s }: { s: ReportSections["market_attractiveness"] }) {
  return (
    <SectionCard label="Market" title="Market attractiveness">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-base font-semibold">{s.size_estimate}</span>
        <Badge
          label={s.growth_trend.replace("hypergrowth", "hyper-growth")}
          className={GROWTH_BADGE[s.growth_trend]}
        />
      </div>
      <p className="text-xs text-muted-foreground italic leading-relaxed">{s.tam_note}</p>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Tailwinds</p>
          <BulletList items={s.key_tailwinds} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Headwinds</p>
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
          <div key={i} className="rounded-lg bg-surface-low p-5 space-y-2">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Weakness: </span>
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
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Revenue streams</p>
          <BulletList items={s.revenue_streams} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Key assumptions</p>
          <BulletList items={s.key_assumptions} />
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Potential partnerships</p>
          <BulletList items={s.partnerships} />
        </div>
      )}
    </SectionCard>
  )
}

function MvpSection({ s }: { s: ReportSections["mvp_features"] }) {
  return (
    <SectionCard label="MVP" title={`Build time: ${s.build_time_estimate}`}>
      <div className="grid grid-cols-3 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Must-have</p>
          <BulletList items={s.core_features} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Phase 2</p>
          <BulletList items={s.phase_two_features} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Cut for now</p>
          <BulletList items={s.avoid} />
        </div>
      </div>
    </SectionCard>
  )
}

function RisksSection({ risks }: { risks: ReportSections["risks"] }) {
  return (
    <SectionCard label="Risks" title="Key risks to address">
      <div className="space-y-3">
        {risks.map((r, i) => (
          <div key={i} className="rounded-lg bg-surface-low p-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <p className="text-sm font-semibold">{r.title}</p>
              <Badge label={r.severity} className={RISK_BADGE[r.severity]} />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Mitigation: </span>
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
      <div className="grid grid-cols-3 gap-8">
        {phases.map(({ label, items }) => (
          <div key={label}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              {label}
            </p>
            <ol className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-[10px] font-bold text-muted-foreground mt-0.5 tabular-nums shrink-0 w-4">
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
    <div className="space-y-5">

      <ExecutiveVerdictSection s={sections.executive_verdict} />

      <GroupDivider label="Market analysis" />
      <div className="grid grid-cols-2 gap-5">
        <CustomerSection s={sections.customer_and_pain} />
        <MarketSection   s={sections.market_attractiveness} />
      </div>
      <CompetitorsSection s={sections.competitors} />

      <GroupDivider label="Strategy" />
      <div className="grid grid-cols-2 gap-5">
        <BusinessModelSection s={sections.business_model} />
        <GoToMarketSection    s={sections.go_to_market} />
      </div>
      <MvpSection s={sections.mvp_features} />

      <GroupDivider label="Execution" />
      <RisksSection     risks={sections.risks} />
      <NextStepsSection s={sections.next_steps} />

    </div>
  )
}
