"use client"

import { useState, useTransition } from "react"
import { Plus, Trash2, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { createNote, updateNote, deleteNote } from "@/lib/workspace/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Note } from "@/types"

// ─── Note card ────────────────────────────────────────────────

function NoteCard({
  note,
  projectId,
}: {
  note: Note
  projectId: string
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [pending, startTransition] = useTransition()

  function handleSave() {
    if (!title.trim()) return
    startTransition(async () => {
      await updateNote(projectId, note.id, {
        title: title.trim(),
        content: content.trim(),
      })
      setEditing(false)
    })

  }

  function handleDelete() {
    startTransition(async () => {
      await deleteNote(projectId, note.id)
    })
  }

  function handleCancel() {
    setTitle(note.title)
    setContent(note.content)
    setEditing(false)
  }

  return (
    <div
      className={cn(
        "rounded-md bg-card p-4 space-y-2 group transition-opacity",
        pending && "opacity-50",
      )}
    >
      {editing ? (
        <>
          <Input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-8 text-sm font-medium"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full text-sm bg-surface-low rounded-md px-3 py-2 resize-none border border-outline-variant/20 focus:outline-none focus:border-ring transition-colors"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={pending || !title.trim()}>
              <Check size={12} className="mr-1" />
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X size={12} className="mr-1" />
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <p
              className="text-sm font-semibold cursor-pointer hover:text-secondary transition-colors"
              onClick={() => setEditing(true)}
            >
              {note.title}
            </p>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={handleDelete}
                disabled={pending}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
          {note.content && (
            <p
              className="text-sm text-muted-foreground whitespace-pre-wrap cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {note.content}
            </p>
          )}
          <p className="text-[0.625rem] text-muted-foreground">
            {new Date(note.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </>
      )}
    </div>
  )
}

// ─── Add note form ────────────────────────────────────────────

function AddNoteForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    startTransition(async () => {
      await createNote(projectId, title.trim(), content.trim())
      setTitle("")
      setContent("")
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
        Add note
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md bg-card p-4 space-y-3"
    >
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title…"
        className="h-8 text-sm"
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note…"
        rows={4}
        className="w-full text-sm bg-surface-low rounded-md px-3 py-2 resize-none border border-outline-variant/20 focus:outline-none focus:border-ring transition-colors"
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending || !title.trim()}>
          Save note
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

// ─── Main export ──────────────────────────────────────────────

export function NotesModule({
  projectId,
  notes,
}: {
  projectId: string
  notes: Note[]
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {notes.map((n) => (
          <NoteCard key={n.id} note={n} projectId={projectId} />
        ))}
      </div>
      {notes.length === 0 && (
        <p className="text-sm text-muted-foreground">No notes yet.</p>
      )}
      <AddNoteForm projectId={projectId} />
    </div>
  )
}
