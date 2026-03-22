"use client"

import { useState, useTransition } from "react"
import { Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  createMilestone,
  updateMilestone,
  deleteMilestone,
} from "@/lib/workspace/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Milestone, MilestoneStatus } from "@/types"

// ─── Config ───────────────────────────────────────────────────

const STATUS_CYCLE: Record<MilestoneStatus, MilestoneStatus> = {
  planned:  "achieved",
  achieved: "missed",
  missed:   "planned",
}

const STATUS_STYLES: Record<MilestoneStatus, string> = {
  planned:  "bg-surface-high text-muted-foreground",
  achieved: "bg-emerald-50 text-emerald-700",
  missed:   "bg-red-50 text-red-700",
}

// ─── Milestone row ────────────────────────────────────────────

function MilestoneRow({
  milestone,
  projectId,
}: {
  milestone: Milestone
  projectId: string
}) {
  const [pending, startTransition] = useTransition()

  function cycleStatus() {
    startTransition(async () => {
      await updateMilestone(projectId, milestone.id, {
        status: STATUS_CYCLE[milestone.status],
      })
    })
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteMilestone(projectId, milestone.id)
    })
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 bg-card group transition-opacity",
        pending && "opacity-50",
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm">{milestone.title}</p>
        {milestone.target_date && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {new Date(milestone.target_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      <button
        onClick={cycleStatus}
        disabled={pending}
        className={cn(
          "shrink-0 inline-flex items-center rounded-sm px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider cursor-pointer transition-opacity hover:opacity-70",
          STATUS_STYLES[milestone.status],
        )}
      >
        {milestone.status}
      </button>

      <button
        onClick={handleDelete}
        disabled={pending}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}

// ─── Add form ─────────────────────────────────────────────────

function AddMilestoneForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    startTransition(async () => {
      await createMilestone(projectId, title.trim(), date || null)
      setTitle("")
      setDate("")
      setOpen(false)
    })
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Plus size={13} />
        Add milestone
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Milestone title…"
        className="h-8 text-sm flex-1 min-w-40"
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="h-8 text-sm w-36"
      />
      <Button type="submit" size="sm" disabled={pending || !title.trim()}>
        Add
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
    </form>
  )
}

// ─── Main export ──────────────────────────────────────────────

export function MilestonesModule({
  projectId,
  milestones,
}: {
  projectId: string
  milestones: Milestone[]
}) {
  return (
    <div className="space-y-2">
      {milestones.length === 0 ? (
        <p className="text-sm text-muted-foreground">No milestones yet.</p>
      ) : (
        milestones.map((m) => (
          <MilestoneRow key={m.id} milestone={m} projectId={projectId} />
        ))
      )}
      <div className="pt-1">
        <AddMilestoneForm projectId={projectId} />
      </div>
    </div>
  )
}
