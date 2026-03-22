// ─── Enum-like literals ───────────────────────────────────────
export type ReportVerdict    = "go" | "caution" | "avoid"
export type PainIntensity    = "low" | "medium" | "high" | "critical"
export type GrowthTrend      = "declining" | "stable" | "growing" | "hypergrowth"
export type RiskSeverity     = "low" | "medium" | "high"

// ─── Section shapes ───────────────────────────────────────────
export type ExecutiveVerdict = {
  score: number            // 0–100
  recommendation: ReportVerdict
  headline: string
  summary: string
  key_strengths: string[]
}

export type CustomerAndPain = {
  primary_customer: string
  pain_description: string
  pain_intensity: PainIntensity
  evidence: string
  willingness_to_pay: string
}

export type MarketAttractiveness = {
  size_estimate: string
  growth_trend: GrowthTrend
  tam_note: string
  key_tailwinds: string[]
  key_headwinds: string[]
}

export type Competitor = {
  name: string
  description: string
  weakness: string
}

export type CompetitorAnalysis = {
  landscape_summary: string
  competitors: Competitor[]
  positioning_gap: string
}

export type BusinessModel = {
  recommended_model: string
  pricing_strategy: string
  revenue_streams: string[]
  key_assumptions: string[]
}

export type MvpFeatures = {
  core_features: string[]
  phase_two_features: string[]
  avoid: string[]
  build_time_estimate: string
}

export type GoToMarket = {
  launch_channel: string
  first_100_customers: string
  content_angle: string
  partnerships: string[]
}

export type Risk = {
  title: string
  description: string
  severity: RiskSeverity
  mitigation: string
}

export type NextSteps = {
  week_1: string[]
  month_1: string[]
  quarter_1: string[]
}

// ─── Top-level ────────────────────────────────────────────────
export type ReportSections = {
  executive_verdict:    ExecutiveVerdict
  customer_and_pain:    CustomerAndPain
  market_attractiveness: MarketAttractiveness
  competitors:          CompetitorAnalysis
  business_model:       BusinessModel
  mvp_features:         MvpFeatures
  go_to_market:         GoToMarket
  risks:                Risk[]
  next_steps:           NextSteps
}
