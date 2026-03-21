"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "./project-card"
import { NewProjectModal } from "./new-project-modal"
import type { Project } from "@/types"

type Props = {
  projects: Project[]
  userEmail: string
}

export function ProjectsView({ projects, userEmail }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

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
            <Button size="sm" onClick={() => setModalOpen(true)}>
              <Plus size={15} />
              New project
            </Button>
          )}
        </div>

        {/* Empty state */}
        {projects.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 space-y-4 max-w-lg">
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
                  <span className="shrink-0 w-5 h-5 rounded-full bg-muted text-xs font-medium flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <Button onClick={() => setModalOpen(true)}>
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

      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
