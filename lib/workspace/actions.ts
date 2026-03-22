"use server"

import { revalidatePath } from "next/cache"
import { createServerClient, getUser } from "@/lib/supabase/server"
import type {
  Task, TaskStatus,
  Milestone, MilestoneStatus,
  Assumption, AssumptionStatus,
  Note,
} from "@/types"
import type { ReportSections } from "@/lib/report/schema"

// ─── Helpers ──────────────────────────────────────────────────

async function assertProjectOwner(projectId: string) {
  const user = await getUser()
  if (!user) throw new Error("Unauthorized")
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single()
  if (!data) throw new Error("Project not found")
  return supabase
}

function path(projectId: string) {
  return `/projects/${projectId}`
}

// ─── Tasks ────────────────────────────────────────────────────

export async function getTasks(projectId: string): Promise<Task[]> {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
  return (data ?? []) as Task[]
}

export async function createTask(
  projectId: string,
  title: string,
  description = "",
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase.from("tasks").insert({
      project_id: projectId,
      title,
      description,
      status: "todo",
    })
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function updateTask(
  projectId: string,
  taskId: string,
  fields: Partial<Pick<Task, "title" | "description" | "status" | "due_date">>,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase
      .from("tasks")
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq("id", taskId)
      .eq("project_id", projectId)
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function deleteTask(
  projectId: string,
  taskId: string,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .eq("project_id", projectId)
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

// ─── Milestones ───────────────────────────────────────────────

export async function getMilestones(projectId: string): Promise<Milestone[]> {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("target_date", { ascending: true, nullsFirst: false })
  return (data ?? []) as Milestone[]
}

export async function createMilestone(
  projectId: string,
  title: string,
  target_date: string | null = null,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase.from("milestones").insert({
      project_id: projectId,
      title,
      target_date,
      status: "planned",
    })
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function updateMilestone(
  projectId: string,
  milestoneId: string,
  fields: Partial<Pick<Milestone, "title" | "status" | "target_date">>,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase
      .from("milestones")
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq("id", milestoneId)
      .eq("project_id", projectId)
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function deleteMilestone(
  projectId: string,
  milestoneId: string,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase
      .from("milestones")
      .delete()
      .eq("id", milestoneId)
      .eq("project_id", projectId)
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

// ─── Assumptions ──────────────────────────────────────────────

export async function getAssumptions(projectId: string): Promise<Assumption[]> {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("assumptions")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
  return (data ?? []) as Assumption[]
}

export async function createAssumption(
  projectId: string,
  description: string,
  notes = "",
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase.from("assumptions").insert({
      project_id: projectId,
      description,
      notes,
      status: "untested",
    })
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function updateAssumption(
  projectId: string,
  assumptionId: string,
  fields: Partial<Pick<Assumption, "description" | "status" | "notes">>,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase
      .from("assumptions")
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq("id", assumptionId)
      .eq("project_id", projectId)
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function deleteAssumption(
  projectId: string,
  assumptionId: string,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase
      .from("assumptions")
      .delete()
      .eq("id", assumptionId)
      .eq("project_id", projectId)
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

// ─── Notes ────────────────────────────────────────────────────

export async function getNotes(projectId: string): Promise<Note[]> {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
  return (data ?? []) as Note[]
}

export async function createNote(
  projectId: string,
  title: string,
  content: string,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase.from("notes").insert({
      project_id: projectId,
      title,
      content,
    })
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function updateNote(
  projectId: string,
  noteId: string,
  fields: Partial<Pick<Note, "title" | "content">>,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase
      .from("notes")
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq("id", noteId)
      .eq("project_id", projectId)
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function deleteNote(
  projectId: string,
  noteId: string,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
      .eq("project_id", projectId)
    if (error) return { error: error.message }
    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}

// ─── Seed from report ─────────────────────────────────────────

export async function seedWorkspaceFromReport(
  projectId: string,
  sections: ReportSections,
): Promise<{ error?: string }> {
  try {
    const supabase = await assertProjectOwner(projectId)

    // week_1 → tasks
    const taskRows = sections.next_steps.week_1.map((item) => ({
      project_id: projectId,
      title: item,
      description: "",
      status: "todo" as TaskStatus,
    }))

    // month_1 + quarter_1 → milestones
    const milestoneRows = [
      ...sections.next_steps.month_1.map((item) => ({
        project_id: projectId,
        title: item,
        target_date: null as string | null,
        status: "planned" as MilestoneStatus,
      })),
      ...sections.next_steps.quarter_1.map((item) => ({
        project_id: projectId,
        title: item,
        target_date: null as string | null,
        status: "planned" as MilestoneStatus,
      })),
    ]

    // risks → assumptions
    const assumptionRows = sections.risks.map((r) => ({
      project_id: projectId,
      description: r.title,
      notes: r.description,
      status: "untested" as AssumptionStatus,
    }))

    const [t, m, a] = await Promise.all([
      supabase.from("tasks").insert(taskRows),
      supabase.from("milestones").insert(milestoneRows),
      supabase.from("assumptions").insert(assumptionRows),
    ])

    const err = t.error ?? m.error ?? a.error
    if (err) return { error: err.message }

    revalidatePath(path(projectId))
    return {}
  } catch (e) {
    return { error: (e as Error).message }
  }
}
