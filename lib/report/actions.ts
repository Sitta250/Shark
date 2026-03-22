"use server"

import { createServerClient, getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getIntake } from "@/lib/intake/actions"
import { generateReportSections } from "./generate"
import type { Report } from "@/types"

export async function getReport(projectId: string): Promise<Report | null> {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("reports")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  return (data as Report | null) ?? null
}

export async function generateReport(
  projectId: string
): Promise<{ error: string | null }> {
  const user = await getUser()
  if (!user) redirect("/login")

  const supabase = await createServerClient()

  // Verify project ownership
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single()

  if (!project) return { error: "Project not found" }

  // Require completed intake
  const intake = await getIntake(projectId)
  if (!intake?.is_complete) return { error: "Complete the intake first" }

  // Insert a pending report row so we can track state
  const { data: report, error: insertError } = await supabase
    .from("reports")
    .insert({ project_id: projectId, status: "pending", sections: null })
    .select("id")
    .single()

  if (insertError || !report) {
    return { error: insertError?.message ?? "Could not create report" }
  }

  try {
    const sections = await generateReportSections(intake)

    const { error: updateError } = await supabase
      .from("reports")
      .update({ status: "completed", sections })
      .eq("id", report.id)

    if (updateError) throw new Error(updateError.message)

    return { error: null }
  } catch (err) {
    await supabase
      .from("reports")
      .update({ status: "failed" })
      .eq("id", report.id)

    return { error: err instanceof Error ? err.message : "Generation failed" }
  }
}
