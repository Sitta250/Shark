"use server"

import { createServerClient, getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { canCreateProject } from "@/lib/billing/plans"
import type { Plan, Project, ProjectStage } from "@/types"

export async function deleteProject(projectId: string): Promise<void> {
  const user = await getUser()
  if (!user) redirect("/login")

  const supabase = await createServerClient()
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", user.id)

  if (error) {
    console.error("deleteProject:", error.message)
    throw new Error(error.message)
  }

  redirect("/projects")
}

export async function getProjects(): Promise<Project[]> {
  const user = await getUser()
  if (!user) return []

  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("getProjects:", error.message)
    return []
  }

  return (data ?? []) as Project[]
}

export async function createProject(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const user = await getUser()
  if (!user) redirect("/login")

  const name = (formData.get("name") as string)?.trim()
  const description = (formData.get("description") as string)?.trim() ?? ""
  const country = (formData.get("country") as string)?.trim() ?? ""
  const target_customer = (formData.get("target_customer") as string)?.trim() ?? ""
  const stage = (formData.get("stage") as ProjectStage) ?? "idea"

  if (!name) return "Project name is required"

  const supabase = await createServerClient()

  // ── Plan limit check ───────────────────────────────────────
  const [{ count }, { data: subData }] = await Promise.all([
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .then((r) => ({ count: r.count ?? 0 })),
    supabase
      .from("subscriptions")
      .select("plan")
      .eq("user_id", user.id)
      .single(),
  ])

  const plan = (subData?.plan ?? "free") as Plan
  if (!canCreateProject(plan, count)) {
    return "PLAN_LIMIT"
  }
  // ──────────────────────────────────────────────────────────
  const { data, error } = await supabase
    .from("projects")
    .insert({ user_id: user.id, name, description, country, target_customer, stage })
    .select("id")
    .single()

  if (error) {
    console.error("createProject:", error.message)
    return error.message
  }

  redirect(`/projects/${data.id}`)
}
