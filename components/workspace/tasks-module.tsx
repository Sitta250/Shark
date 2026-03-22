"use client"

import { useState, useTransition } from "react"
import { Plus, Trash2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { createTask, updateTask, deleteTask } from "@/lib/workspace/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Task, TaskStatus } from "@/types"

// ─── Status config ────────────────────────────────────────────

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo:        "To do",
  in_progress: "In progress",
  done:        "Done",
}

const STATUS_ORDER: TaskStatus[] = ["todo", "in_progress", "done"]

const STATUS_STYLES: Record<TaskStatus, string> = {
  todo:        "bg-surface-high text-muted-foreground",
  in_progress: "bg-amber-50 text-amber-700",
  done:        "bg-emerald-50 text-emerald-700",
}

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  todo:        "in_progress",
  in_progress: "done",
  done:        "todo",
}

// ─── Single task row ──────────────────────────────────────────

function TaskRow({
  task,
  projectId,
}: {
  task: Task
  projectId: string
}) {
  const [pending, startTransition] = useTransition()

  function cycleStatus() {
    startTransition(async () => {
      await updateTask(projectId, task.id, { status: NEXT_STATUS[task.status] })
    })
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteTask(projectId, task.id)
    })
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 bg-card group transition-opacity",
        pending && "opacity-50",
      )}
    >
      {/* Status toggle circle */}
      <button
        onClick={cycleStatus}
        disabled={pending}
        className={cn(
          "shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors",
          task.status === "done"
            ? "bg-emerald-500 border-emerald-500 text-white"
            : task.status === "in_progress"
            ? "border-amber-500"
            : "border-outline-variant/40",
        )}
      >
        {task.status === "done" && <Check size={10} strokeWidth={3} />}
      </button>

      <span
        className={cn(
          "flex-1 text-sm",
          task.status === "done" && "line-through text-muted-foreground",
        )}
      >
        {task.title}
      </span>

      <span
        className={cn(
          "hidden sm:inline-flex items-center rounded-sm px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider shrink-0",
          STATUS_STYLES[task.status],
        )}
      >
        {STATUS_LABELS[task.status]}
      </span>

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

// ─── Add task form ────────────────────────────────────────────

function AddTaskForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    startTransition(async () => {
      await createTask(projectId, title.trim())
      setTitle("")
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
        Add task
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title…"
        className="h-8 text-sm"
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
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

export function TasksModule({
  projectId,
  tasks,
}: {
  projectId: string
  tasks: Task[]
}) {
  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: tasks.filter((t) => t.status === status),
  })).filter(({ items }) => items.length > 0)

  return (
    <div className="space-y-5">
      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">No tasks yet.</p>
      ) : (
        grouped.map(({ status, items }) => (
          <div key={status} className="space-y-1">
            <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {STATUS_LABELS[status]}
            </p>
            {items.map((task) => (
              <TaskRow key={task.id} task={task} projectId={projectId} />
            ))}
          </div>
        ))
      )}
      <AddTaskForm projectId={projectId} />
    </div>
  )
}
