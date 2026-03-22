import Link from "next/link"
import { ArrowRight, Globe, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Project } from "@/types"

/* shark_v1: no borders on cards — hover state shifts bg from white to surface-high.
   Badges are rectangular, uppercase, technical. */

const STAGE_LABELS: Record<string, string> = {
  idea: "Idea",
  validation: "Validation",
  building: "Building",
  launched: "Launched",
  scaling: "Scaling",
}

const STAGE_CLASSES: Record<string, string> = {
  idea:       "bg-surface-high text-muted-foreground",
  validation: "bg-blue-50 text-blue-700",
  building:   "bg-amber-50 text-amber-700",
  launched:   "bg-emerald-50 text-emerald-700",
  scaling:    "bg-primary text-primary-foreground",
}

type Props = { project: Project }

export function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-lg bg-card p-5 hover:bg-surface-high transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-sm leading-snug tracking-tight line-clamp-2">
          {project.name}
        </h3>
        <Badge
          className={cn(
            "shrink-0",
            STAGE_CLASSES[project.stage] ?? STAGE_CLASSES.idea
          )}
        >
          {STAGE_LABELS[project.stage] ?? project.stage}
        </Badge>
      </div>

      {project.description && (
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      )}

      <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
        {project.country && (
          <span className="flex items-center gap-1">
            <Globe size={11} />
            {project.country}
          </span>
        )}
        {project.target_customer && (
          <span className="flex items-center gap-1 truncate">
            <User size={11} />
            {project.target_customer}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-end">
        <span className="text-xs text-secondary flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          Open workspace
          <ArrowRight size={11} />
        </span>
      </div>
    </Link>
  )
}
