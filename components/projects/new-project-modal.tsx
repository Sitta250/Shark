"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { createProject } from "@/lib/projects/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STAGES = [
  { value: "idea",       label: "Idea"       },
  { value: "validation", label: "Validation" },
  { value: "building",   label: "Building"   },
  { value: "launched",   label: "Launched"   },
  { value: "scaling",    label: "Scaling"    },
] as const

type Props = {
  open: boolean
  onClose: () => void
}

export function NewProjectModal({ open, onClose }: Props) {
  const [error, action, pending] = useActionState(createProject, null)
  const [stage, setStage] = useState("idea")
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!open) {
      formRef.current?.reset()
      setStage("idea")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Tell us about your idea to get started.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={action} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="name">
              Idea name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              required
              autoFocus
              placeholder="e.g. AI meal planner for busy parents"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">One-line description</Label>
            <Input
              id="description"
              name="description"
              placeholder="What does it do in one sentence?"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="e.g. United States"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="stage">Stage</Label>
              {/* Hidden input so FormData picks up the value */}
              <input type="hidden" name="stage" value={stage} />
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger id="stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="target_customer">Target customer</Label>
            <Input
              id="target_customer"
              name="target_customer"
              placeholder="e.g. Parents with children under 10"
            />
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Creating…" : "Create project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
