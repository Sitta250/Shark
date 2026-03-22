"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "./project-card"
import { NewProjectModal } from "./new-project-modal"
import { UpgradePrompt } from "@/components/billing/upgrade-prompt"
import { PLAN_LIMITS, PLAN_LABELS } from "@/lib/billing/plans"
import type { Project } from "@/types"
import type { Plan } from "@/types"

type Props = {
  projects: Project[]
  userEmail: string
  plan: Plan
}

export function ProjectsView({ projects, userEmail, plan }: Props) {
  const [modalOpen, setModalOpen]       = useState(false)
  const [showUpgrade, setShowUpgrade]   = useState(false)

  const limit     = PLAN_LIMITS[plan]
  const atLimit   = projects.length >= limit

  function handleNewProject() {
    if (atLimit) {
      setShowUpgrade(true)
    } else {
      setModalOpen(true)
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back, {userEmail}
            </p>
          </div>
          {projects.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {projects.length} / {limit} projects · {PLAN_LABELS[plan]}
              </span>
              <Button size="sm" onClick={handleNewProject}>
                <Plus size={15} />
                New project
              </Button>
            </div>
          )}
        </div>

        {/* Upgrade prompt */}
        {showUpgrade && (
          <UpgradePrompt
            currentPlan={plan}
            onDismiss={() => setShowUpgrade(false)}
          />
        )}

        {/* Empty state */}
        {projects.length === 0 ? (
          <div className="rounded-lg bg-card p-8 space-y-4 max-w-lg">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Welcome to Shark</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Shark helps you turn a raw business idea into a structured report
                and execution workspace — so you know if it&apos;s worth building
                before you build it.
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
                  <span className="shrink-0 w-5 h-5 rounded-full bg-surface-high text-xs font-medium flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <Button onClick={handleNewProject}>
              Create your first project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>

      {/* Modal — only opens when under limit */}
      <NewProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={plan}
      />
    </>
  )
}
