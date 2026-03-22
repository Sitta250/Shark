"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Loader2 } from "lucide-react"
import { generateReport } from "@/lib/report/actions"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type Props = { projectId: string }

export function GenerateReportButton({ projectId }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleGenerate() {
    setError(null)
    startTransition(async () => {
      const { error } = await generateReport(projectId)
      if (error) {
        setError(error)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <Button onClick={handleGenerate} disabled={pending} className="gap-2">
        {pending ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Generating report…
          </>
        ) : (
          <>
            <Sparkles size={14} />
            Generate report
          </>
        )}
      </Button>

      {pending && (
        <p className="text-xs text-muted-foreground">
          Analysing your idea — this takes about 20–30 seconds.
        </p>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
