import type { Metadata } from "next"
import { getUser } from "@/lib/supabase/server"
import { PageContainer } from "@/components/layout/page-container"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getUser()

  // TODO: fetch projects from DB — show onboarding when count === 0
  const hasProjects = false

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, {user?.email}
          </p>
        </div>

        {!hasProjects && <OnboardingCard />}
      </div>
    </PageContainer>
  )
}

function OnboardingCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-8 space-y-4 max-w-lg">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Welcome to Shark 🦈</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Shark helps you turn a raw business idea into a structured report and
          execution workspace — so you know if it&apos;s worth building before
          you build it.
        </p>
      </div>

      <ol className="space-y-2 text-sm text-muted-foreground list-none">
        {[
          "Create a project for your idea",
          "Complete the intake form",
          "Get your AI-generated report",
          "Work inside your execution workspace",
        ].map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span className="shrink-0 w-5 h-5 rounded-full bg-muted text-xs font-medium flex items-center justify-center mt-0.5">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
        Create your first project
      </button>
    </div>
  )
}
