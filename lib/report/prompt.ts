import type { ProjectInput } from "@/types"
import {
  BUSINESS_TYPE_OPTIONS,
  STAGE_OPTIONS,
  TIMELINE_OPTIONS,
  GOAL_OPTIONS,
} from "@/lib/intake/schema"

function label(
  options: { value: string; label: string }[],
  value: string
): string {
  return options.find((o) => o.value === value)?.label ?? value
}

export function buildSystemPrompt(): string {
  return `You are a senior startup analyst with deep expertise in market research, competitive intelligence, and venture evaluation. You produce rigorous, specific, and actionable reports for early-stage founders.

You MUST respond with a single valid JSON object matching this exact schema — no extra keys, no markdown fences:

{
  "executive_verdict": {
    "score": <integer 0–100>,
    "recommendation": <"go" | "caution" | "avoid">,
    "headline": <string, max 100 chars, punchy and specific>,
    "summary": <string, 2–3 sentences, the real verdict>,
    "key_strengths": [<string>, ...]
  },
  "customer_and_pain": {
    "primary_customer": <string, specific persona>,
    "pain_description": <string, what exactly hurts and why>,
    "pain_intensity": <"low" | "medium" | "high" | "critical">,
    "evidence": <string, why you believe this pain is real>,
    "willingness_to_pay": <string, realistic assessment>
  },
  "market_attractiveness": {
    "size_estimate": <string, TAM/SAM ballpark with reasoning>,
    "growth_trend": <"declining" | "stable" | "growing" | "hypergrowth">,
    "tam_note": <string, key sizing caveat or assumption>,
    "key_tailwinds": [<string>, ...],
    "key_headwinds": [<string>, ...]
  },
  "competitors": {
    "landscape_summary": <string, who owns the space and how contested it is>,
    "competitors": [
      { "name": <string>, "description": <string>, "weakness": <string> }
    ],
    "positioning_gap": <string, the gap this idea can credibly own>
  },
  "business_model": {
    "recommended_model": <string, what model fits best and why>,
    "pricing_strategy": <string, specific pricing approach>,
    "revenue_streams": [<string>, ...],
    "key_assumptions": [<string, assumption that must hold for this model to work>, ...]
  },
  "mvp_features": {
    "core_features": [<string>, ...],
    "phase_two_features": [<string>, ...],
    "avoid": [<string, scope creep to cut>, ...],
    "build_time_estimate": <string, realistic time-to-MVP estimate>
  },
  "go_to_market": {
    "launch_channel": <string, single highest-leverage channel to start>,
    "first_100_customers": <string, tactical playbook for first 100>,
    "content_angle": <string, the narrative or hook that resonates>,
    "partnerships": [<string>, ...]
  },
  "risks": [
    {
      "title": <string>,
      "description": <string, why this is a real risk>,
      "severity": <"low" | "medium" | "high">,
      "mitigation": <string, concrete action to reduce it>
    }
  ],
  "next_steps": {
    "week_1": [<string, specific action>, ...],
    "month_1": [<string, specific action>, ...],
    "quarter_1": [<string, specific action>, ...]
  }
}

Rules:
- Be specific. Never write "conduct market research" — say exactly what to research and where.
- Base analysis strictly on the provided context. Do not invent product features the founder didn't mention.
- competitors must have 3–5 entries (real companies or representative archetypes).
- risks must have 4–6 entries.
- next_steps lists must have 3–5 items each.
- key_strengths must have 2–4 items.
- All strings are plain English. No markdown syntax inside values.`
}

export function buildUserPrompt(intake: ProjectInput): string {
  return `Analyze the following business idea and return the structured JSON report.

BUSINESS IDEA
Idea: ${intake.idea}
Problem being solved: ${intake.problem}

MARKET CONTEXT
Target customer: ${intake.target_customer}
Primary market: ${intake.country}
Business model: ${label(BUSINESS_TYPE_OPTIONS, intake.business_type)}

FOUNDER CONTEXT
Current stage: ${label(STAGE_OPTIONS, intake.stage)}
Launch timeline: ${label(TIMELINE_OPTIONS, intake.timeline)}
Primary goal: ${label(GOAL_OPTIONS, intake.goal)}

Return the analysis JSON now.`
}
