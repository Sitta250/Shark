import type { Metadata } from "next"
import { getUser } from "@/lib/supabase/server"
import { getProjects } from "@/lib/projects/actions"
import { PageContainer } from "@/components/layout/page-container"
import { ProjectsView } from "@/components/projects/projects-view"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const [user, projects] = await Promise.all([getUser(), getProjects()])

  return (
    <PageContainer>
      <ProjectsView projects={projects} userEmail={user?.email ?? ""} />
    </PageContainer>
  )
}
