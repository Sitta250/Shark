import Link from "next/link"
import { ArrowRight, Globe, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Project } from "@/types"

const STAGE_LABELS: Record<string, string> = {
  idea: "Idea",
  validation: "Validation",
  building: "Building",
  launched: "Launched",
  scaling: "Scaling",
}

const STAGE_CLASSES: Record<string, string> = {
  idea:       "bg-muted text-muted-foreground border-transparent hover:bg-muted",
  validation: "bg-blue-50 text-blue-600 border-transparent hover:bg-blue-50",
  building:   "bg-orange-50 text-orange-600 border-transparent hover:bg-orange-50",
  launched:   "bg-green-50 text-green-600 border-transparent hover:bg-green-50",
  scaling:    "bg-secondary text-primary border-transparent hover:bg-secondary",
}

type Props = { project: Project }

export function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-lg border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {project.name}
        </h3>
        <Badge
          className={cn(
            "shrink-0 text-xs font-medium",
            STAGE_CLASSES[project.stage] ?? STAGE_CLASSES.idea
          )}
        >
          {STAGE_LABELS[project.stage] ?? project.stage}
        </Badge>
      </div>

      {project.description && (
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
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
        <span className="text-xs text-primary flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          Open workspace
          <ArrowRight size={11} />
        </span>
      </div>
    </Link>
  )
}
