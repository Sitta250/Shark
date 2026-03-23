import type { Plan } from "@/types"

// ─── Plan limits ──────────────────────────────────────────────

export const PLAN_LIMITS: Record<Plan, number> = {
  free:    2,
  starter: 5,
  pro:     10,
}

export const PLAN_LABELS: Record<Plan, string> = {
  free:    "Free",
  starter: "Starter",
  pro:     "Pro",
}

// ─── Stripe price IDs (set in env) ───────────────────────────

export const STRIPE_PRICES: Record<"starter" | "pro", string> = {
  starter: process.env.STRIPE_PRICE_STARTER ?? "",
  pro:     process.env.STRIPE_PRICE_PRO     ?? "",
}

// ─── Helpers ──────────────────────────────────────────────────

export function getProjectLimit(plan: Plan): number {
  return PLAN_LIMITS[plan]
}

export function canCreateProject(plan: Plan, currentCount: number): boolean {
  return currentCount < PLAN_LIMITS[plan]
}
