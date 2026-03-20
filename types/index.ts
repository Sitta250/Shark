// ─── Subscription ────────────────────────────────────────────
export type Plan = "free" | "starter" | "pro"
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing"

export type Subscription = {
  id: string
  userId: string
  plan: Plan
  stripeCustomerId: string
  stripeSubscriptionId: string
  status: SubscriptionStatus
  currentPeriodEnd: string
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
  userId: string
  name: string
  description: string
  country: string
  stage: ProjectStage
  createdAt: string
  updatedAt: string
}

// ─── Intake ──────────────────────────────────────────────────
export type ProjectInput = {
  id: string
  projectId: string
  idea: string
  problem: string
  targetCustomer: string
  budget: string
  goal: string
  rawJson?: Record<string, unknown>
}

// ─── Report ──────────────────────────────────────────────────
export type ReportStatus = "pending" | "completed" | "failed"

export type Report = {
  id: string
  projectId: string
  status: ReportStatus
  createdAt: string
}

export type ReportSection = {
  id: string
  reportId: string
  sectionKey: string
  contentJson: Record<string, unknown>
}

// ─── Workspace ───────────────────────────────────────────────
export type TaskStatus = "todo" | "in_progress" | "done"

export type Task = {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  dueDate?: string
}

export type MilestoneStatus = "planned" | "achieved" | "missed"

export type Milestone = {
  id: string
  projectId: string
  title: string
  targetDate: string
  status: MilestoneStatus
}

export type AssumptionStatus = "untested" | "validated" | "invalid"

export type Assumption = {
  id: string
  projectId: string
  description: string
  status: AssumptionStatus
  notes: string
}

export type Note = {
  id: string
  projectId: string
  content: string
  createdAt: string
}
