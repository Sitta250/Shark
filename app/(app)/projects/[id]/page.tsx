import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { createServerClient, getUser } from "@/lib/supabase/server"
import { getIntake } from "@/lib/intake/actions"
import { PageContainer } from "@/components/layout/page-container"
import { IntakeFlow } from "@/components/intake/intake-flow"
import type { Project } from "@/types"

export const metadata: Metadata = { title: "Project" }

type Props = { params: Promise<{ id: string }> }

const STAGE_LABELS: Record<string, string> = {
  idea: "Idea",
  validation: "Validation",
  building: "Building",
  launched: "Launched",
  scaling: "Scaling",
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const user = await getUser()

  const supabase = await createServerClient()
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user?.id ?? "")
    .single()

  if (!data) notFound()

  const project = data as Project
  const intake = await getIntake(id)
  const intakeComplete = !!intake?.is_complete

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Project header */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ChevronLeft size={13} />
            Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              {STAGE_LABELS[project.stage] ?? project.stage}
            </span>
          </div>

          {project.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {project.description}
            </p>
          )}
        </div>

        {/* Intake flow or workspace */}
        {!intakeComplete ? (
          <>
            <div className="rounded-xl border border-border bg-muted/30 px-5 py-3.5 text-sm text-muted-foreground">
              Complete the intake form to unlock your analysis report and
              workspace.
            </div>
            <IntakeFlow projectId={id} existingIntake={intake} />
          </>
        ) : (
          <WorkspacePlaceholder />
        )}
      </div>
    </PageContainer>
  )
}

function WorkspacePlaceholder() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        <span>Workspace</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["Report", "Tasks", "Milestones", "Assumptions"].map((tab) => (
          <div
            key={tab}
            className="rounded-xl border border-dashed border-border p-4 text-center"
          >
            <p className="text-sm font-medium text-muted-foreground">{tab}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Coming soon</p>
          </div>
        ))}
      </div>
    </div>
  )
}
