"use client"

import { useState, useTransition } from "react"
import { Plus, Trash2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  createAssumption,
  updateAssumption,
  deleteAssumption,
} from "@/lib/workspace/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Assumption, AssumptionStatus } from "@/types"

// ─── Config ───────────────────────────────────────────────────

const STATUS_OPTIONS: AssumptionStatus[] = ["untested", "validated", "invalid"]

const STATUS_STYLES: Record<AssumptionStatus, string> = {
  untested:  "bg-surface-high text-muted-foreground",
  validated: "bg-emerald-50 text-emerald-700",
  invalid:   "bg-red-50 text-red-700",
}

// ─── Assumption card ──────────────────────────────────────────

function AssumptionCard({
  assumption,
  projectId,
}: {
  assumption: Assumption
  projectId: string
}) {
  const [expanded, setExpanded] = useState(false)
  const [notes, setNotes] = useState(assumption.notes)
  const [pending, startTransition] = useTransition()

  function setStatus(status: AssumptionStatus) {
    startTransition(async () => {
      await updateAssumption(projectId, assumption.id, { status })
    })
  }

  function saveNotes() {
    if (notes === assumption.notes) return
    startTransition(async () => {
      await updateAssumption(projectId, assumption.id, { notes })
    })
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteAssumption(projectId, assumption.id)
    })
  }

  return (
    <div
      className={cn(
        "rounded-md bg-card transition-opacity",
        pending && "opacity-50",
      )}
    >
      <div className="flex items-start gap-3 px-3 py-2.5 group">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-0.5 text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ChevronDown
            size={14}
            className={cn("transition-transform", expanded && "rotate-180")}
          />
        </button>

        <p className="flex-1 text-sm">{assumption.description}</p>

        {/* Status selector */}
        <select
          value={assumption.status}
          onChange={(e) => setStatus(e.target.value as AssumptionStatus)}
          disabled={pending}
          className={cn(
            "shrink-0 text-[0.625rem] font-semibold uppercase tracking-wider rounded-sm px-2 py-0.5 border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring",
            STATUS_STYLES[assumption.status],
          )}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={handleDelete}
          disabled={pending}
          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all mt-0.5"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {expanded && (
        <div className="px-3 pb-3 space-y-1.5">
          <p className="text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground">
            Notes
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={saveNotes}
            rows={3}
            placeholder="Add notes about this assumption…"
            className="w-full text-sm bg-surface-low rounded-md px-3 py-2 resize-none border border-outline-variant/20 focus:outline-none focus:border-ring transition-colors"
          />
        </div>
      )}
    </div>
  )
}

// ─── Add form ─────────────────────────────────────────────────

function AddAssumptionForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false)
  const [desc, setDesc] = useState("")
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!desc.trim()) return
    startTransition(async () => {
      await createAssumption(projectId, desc.trim())
      setDesc("")
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
        Add assumption
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        autoFocus
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Describe the assumption…"
        className="h-8 text-sm"
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      />
      <Button type="submit" size="sm" disabled={pending || !desc.trim()}>
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

export function AssumptionsModule({
  projectId,
  assumptions,
}: {
  projectId: string
  assumptions: Assumption[]
}) {
  return (
    <div className="space-y-2">
      {assumptions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No assumptions yet.</p>
      ) : (
        assumptions.map((a) => (
          <AssumptionCard key={a.id} assumption={a} projectId={projectId} />
        ))
      )}
      <div className="pt-1">
        <AddAssumptionForm projectId={projectId} />
      </div>
    </div>
  )
}
