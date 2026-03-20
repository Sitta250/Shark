import type { Metadata } from "next"
import { PageContainer } from "@/components/layout/page-container"

export const metadata: Metadata = {
  title: "Project",
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Project</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Project workspace
          </h1>
          <p className="text-xs text-muted-foreground mt-1">ID: {id}</p>
        </div>

        {/* Workspace tabs will go here: Report / Tasks / Milestones / Assumptions / Notes */}
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground text-sm">
            Workspace coming soon. Intake → Report → Execution.
          </p>
        </div>
      </div>
    </PageContainer>
  )
}
