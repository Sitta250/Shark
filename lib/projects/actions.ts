"use server"

import { createServerClient, getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import type { Project, ProjectStage } from "@/types"

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
