import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { createServerClient, getUser } from "@/lib/supabase/server"
import { getIntake } from "@/lib/intake/actions"
import { getReport } from "@/lib/report/actions"
import {
  getTasks,
  getMilestones,
  getAssumptions,
  getNotes,
} from "@/lib/workspace/actions"
import { PageContainer } from "@/components/layout/page-container"
import { IntakeFlow } from "@/components/intake/intake-flow"
import { DeleteProjectButton } from "@/components/projects/delete-project-button"
import { GenerateReportButton } from "@/components/report/generate-report-button"
import { ReportView } from "@/components/report/report-view"
import { ProjectSummary } from "@/components/report/project-summary"
import { WorkspaceShell } from "@/components/workspace/workspace-shell"
import { TasksModule } from "@/components/workspace/tasks-module"
import { MilestonesModule } from "@/components/workspace/milestones-module"
import { AssumptionsModule } from "@/components/workspace/assumptions-module"
import { NotesModule } from "@/components/workspace/notes-module"
import { SeedBanner } from "@/components/workspace/seed-banner"
import type { Project } from "@/types"
import type { ReportSections } from "@/lib/report/schema"
import type { WorkspaceTab } from "@/components/workspace/workspace-shell"

export const metadata: Metadata = { title: "Project" }

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}

const STAGE_LABELS: Record<string, string> = {
  idea:       "Idea",
  validation: "Validation",
  building:   "Building",
  launched:   "Launched",
  scaling:    "Scaling",
}

const VALID_TABS: WorkspaceTab[] = [
  "overview",
  "report",
  "tasks",
  "milestones",
  "assumptions",
  "notes",
]

function isValidTab(v: string | undefined): v is WorkspaceTab {
  return VALID_TABS.includes(v as WorkspaceTab)
}

export default async function ProjectPage({ params, searchParams }: Props) {
  const { id } = await params
  const { tab: tabParam } = await searchParams
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
  const intake  = await getIntake(id)
  const report  = await getReport(id)

  const intakeComplete = !!intake?.is_complete
  const reportDone     = report?.status === "completed" && !!report.sections

  return (
    <PageContainer>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ChevronLeft size={13} />
            Projects
          </Link>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
              <span className="px-2 py-0.5 rounded-sm bg-surface-high text-muted-foreground text-[0.625rem] font-semibold uppercase tracking-wider">
                {STAGE_LABELS[project.stage] ?? project.stage}
              </span>
            </div>
            <DeleteProjectButton projectId={project.id} projectName={project.name} />
          </div>

          {project.description && (
            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
          )}
        </div>

        {/* Body */}
        {!intakeComplete ? (
          <>
            <div className="rounded-lg bg-surface-low px-5 py-3.5 text-sm text-muted-foreground">
              Complete the intake form to unlock your analysis report and workspace.
            </div>
            <IntakeFlow projectId={id} existingIntake={intake} />
          </>
        ) : !reportDone ? (
          <ReportPrompt projectId={id} failed={report?.status === "failed"} />
        ) : (
          <WorkspaceTabs
            projectId={id}
            projectName={project.name}
            sections={report.sections as ReportSections}
            tab={isValidTab(tabParam) ? tabParam : "overview"}
          />
        )}

      </div>
    </PageContainer>
  )
}

// ─── Report prompt ────────────────────────────────────────────

function ReportPrompt({
  projectId,
  failed,
}: {
  projectId: string
  failed: boolean
}) {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-1.5">
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Analysis report
        </p>
        <h2 className="text-xl font-bold tracking-tight">
          {failed ? "Generation failed — try again" : "Ready to analyse your idea"}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          {failed
            ? "Something went wrong with the last attempt. Click below to retry."
            : "Shark will analyse your intake data and produce a full business report covering market, competitors, business model, MVP scope, and a 90-day execution plan."}
        </p>
      </div>

      <GenerateReportButton projectId={projectId} />
    </div>
  )
}

// ─── Workspace tabs ───────────────────────────────────────────

async function WorkspaceTabs({
  projectId,
  projectName,
  sections,
  tab,
}: {
  projectId: string
  projectName: string
  sections: ReportSections
  tab: WorkspaceTab
}) {
  const [tasks, milestones, assumptions, notes] = await Promise.all([
    getTasks(projectId),
    getMilestones(projectId),
    getAssumptions(projectId),
    getNotes(projectId),
  ])

  const workspaceEmpty =
    tasks.length === 0 && milestones.length === 0 && assumptions.length === 0

  return (
    <WorkspaceShell activeTab={tab}>
      {workspaceEmpty && tab !== "report" && tab !== "overview" && (
        <div className="mb-5">
          <SeedBanner projectId={projectId} sections={sections} />
        </div>
      )}

      {tab === "overview" && (
        <ProjectSummary projectName={projectName} sections={sections} />
      )}

      {tab === "report" && (
        <>
          {workspaceEmpty && (
            <div className="mb-5">
              <SeedBanner projectId={projectId} sections={sections} />
            </div>
          )}
          <ReportView sections={sections} />
        </>
      )}

      {tab === "tasks" && (
        <TasksModule projectId={projectId} tasks={tasks} />
      )}

      {tab === "milestones" && (
        <MilestonesModule projectId={projectId} milestones={milestones} />
      )}

      {tab === "assumptions" && (
        <AssumptionsModule projectId={projectId} assumptions={assumptions} />
      )}

      {tab === "notes" && (
        <NotesModule projectId={projectId} notes={notes} />
      )}
    </WorkspaceShell>
  )
}
