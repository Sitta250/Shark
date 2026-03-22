"use client"

import { useTransition } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { seedWorkspaceFromReport } from "@/lib/workspace/actions"
import { Button } from "@/components/ui/button"
import type { ReportSections } from "@/lib/report/schema"

type Props = {
  projectId: string
  sections: ReportSections
}

export function SeedBanner({ projectId, sections }: Props) {
  const [pending, startTransition] = useTransition()

  function handleSeed() {
    startTransition(async () => {
      await seedWorkspaceFromReport(projectId, sections)
    })
  }

  return (
    <div className="rounded-lg bg-secondary/5 border border-secondary/20 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">Seed workspace from report</p>
        <p className="text-xs text-muted-foreground">
          Auto-populate tasks, milestones, and assumptions from your analysis report.
        </p>
      </div>
      <Button
        size="sm"
        onClick={handleSeed}
        disabled={pending}
        className="gap-2 shrink-0"
      >
        {pending ? (
          <>
            <Loader2 size={13} className="animate-spin" />
            Seeding…
          </>
        ) : (
          <>
            <Sparkles size={13} />
            Seed workspace
          </>
        )}
      </Button>
    </div>
  )
}
