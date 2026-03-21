// ─── Subscription ────────────────────────────────────────────
export type Plan = "free" | "starter" | "pro"
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing"

export type Subscription = {
  id: string
  user_id: string
  plan: Plan
  stripe_customer_id: string
  stripe_subscription_id: string
  status: SubscriptionStatus
  current_period_end: string
  created_at: string
  updated_at: string
}

// ─── Profile ─────────────────────────────────────────────────
export type Profile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

// ─── Project ─────────────────────────────────────────────────
export type ProjectStage =
  | "idea"
  | "validation"
  | "building"
  | "launched"
  | "scaling"

export type Project = {
  id: string
  user_id: string
  name: string
  description: string
  country: string
  target_customer: string
  stage: ProjectStage
  created_at: string
  updated_at: string
}

// ─── Project Input ────────────────────────────────────────────
export type ProjectInput = {
  id: string
  project_id: string
  // Core idea fields
  idea: string
  problem: string
  // Market fields
  target_customer: string
  country: string
  business_type: string
  // Situation fields
  stage: string
  budget: string
  timeline: string
  goal: string
  // Metadata
  raw_json: Record<string, unknown> | null
  current_step: number
  is_complete: boolean
  created_at: string
  updated_at: string
}

// ─── Report ──────────────────────────────────────────────────
export type ReportStatus = "pending" | "completed" | "failed"

export type Report = {
  id: string
  project_id: string
  status: ReportStatus
  sections: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

// ─── Workspace ───────────────────────────────────────────────
export type TaskStatus = "todo" | "in_progress" | "done"

export type Task = {
  id: string
  project_id: string
  title: string
  description: string
  status: TaskStatus
  due_date: string | null
  created_at: string
  updated_at: string
}

export type MilestoneStatus = "planned" | "achieved" | "missed"

export type Milestone = {
  id: string
  project_id: string
  title: string
  target_date: string | null
  status: MilestoneStatus
  created_at: string
  updated_at: string
}

export type AssumptionStatus = "untested" | "validated" | "invalid"

export type Assumption = {
  id: string
  project_id: string
  description: string
  status: AssumptionStatus
  notes: string
  created_at: string
  updated_at: string
}
