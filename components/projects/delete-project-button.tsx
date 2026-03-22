"use client"

import { useState, useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deleteProject } from "@/lib/projects/actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

type Props = {
  projectId: string
  projectName: string
}

export function DeleteProjectButton({ projectId, projectName }: Props) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(async () => {
      await deleteProject(projectId)
    })
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={13} />
        Delete project
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription className="pt-1">
              <span className="font-medium text-foreground">&ldquo;{projectName}&rdquo;</span>{" "}
              and all its data will be permanently deleted. This cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirm}
              disabled={pending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg shadow-none"
            >
              {pending ? "Deleting…" : "Yes, delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
