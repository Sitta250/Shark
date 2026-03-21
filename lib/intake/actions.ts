"use server"

import { createServerClient, getUser } from "@/lib/supabase/server"
import type { IntakeFormData } from "./schema"
import type { ProjectInput } from "@/types"

export async function getIntake(projectId: string): Promise<ProjectInput | null> {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("project_inputs")
    .select("*")
    .eq("project_id", projectId)
    .maybeSingle()

  return (data as ProjectInput | null) ?? null
}

export async function saveIntakeStep(
  projectId: string,
  data: Partial<IntakeFormData>,
  currentStep: number
): Promise<{ error: string | null }> {
  const user = await getUser()
  if (!user) return { error: "Not authenticated" }

  const supabase = await createServerClient()
  const { error } = await supabase.from("project_inputs").upsert(
    {
      project_id: projectId,
      ...data,
      current_step: currentStep,
      is_complete: false,
    },
    { onConflict: "project_id" }
  )

  if (error) {
    console.error("saveIntakeStep:", error.message)
    return { error: error.message }
  }

  return { error: null }
}

export async function submitIntake(
  projectId: string,
  data: IntakeFormData
): Promise<{ error: string | null }> {
  const user = await getUser()
  if (!user) return { error: "Not authenticated" }

  const supabase = await createServerClient()

  const { error: intakeError } = await supabase.from("project_inputs").upsert(
    {
      project_id: projectId,
      ...data,
      current_step: 4,
      is_complete: true,
      raw_json: { submitted_at: new Date().toISOString() },
    },
    { onConflict: "project_id" }
  )

  if (intakeError) {
    console.error("submitIntake:", intakeError.message)
    return { error: intakeError.message }
  }

  // Sync key fields back onto the project row
  await supabase
    .from("projects")
    .update({
      stage: data.stage as
        | "idea"
        | "validation"
        | "building"
        | "launched"
        | "scaling",
      target_customer: data.target_customer,
      country: data.country,
    })
    .eq("id", projectId)
    .eq("user_id", user.id)

  return { error: null }
}
