import { ArrowLeft, Edit2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { STEPS, getOptionLabel } from "@/lib/intake/schema"
import type { IntakeFormData } from "@/lib/intake/schema"

type Props = {
  data: IntakeFormData
  onEdit: (step: number) => void
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
  error: string | null
}

export function ReviewScreen({ data, onEdit, onBack, onSubmit, submitting, error }: Props) {
  return (
    <div className="space-y-4">
      {STEPS.map((step, i) => (
        <div
          key={step.id}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          {/* Section header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <h3 className="text-sm font-semibold">{step.title}</h3>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(i + 1)}
              className="h-auto py-1 px-2 text-xs text-primary hover:text-primary"
            >
              <Edit2 size={11} />
              Edit
            </Button>
          </div>

          {/* Field values */}
          <div className="px-5 py-4 space-y-4">
            {step.fields.map((field) => {
              // Skip conditional fields not applicable to this data
              if (field.condition && !field.condition(data)) return null

              const raw = data[field.id]
              if (!raw) return null

              const display =
                field.type === "tile-select"
                  ? getOptionLabel(field.id, raw)
                  : raw

              return (
                <div key={field.id}>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {field.label}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {display}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Submit */}
      <div className="pt-2 space-y-4">
        <div className="flex items-start gap-3 rounded-xl bg-secondary/60 border border-primary/20 px-5 py-4">
          <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-secondary-foreground leading-relaxed">
            Once you submit, Shark will be ready to run your idea analysis. You
            can always update your answers later.
          </p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" onClick={onBack} disabled={submitting}>
            <ArrowLeft size={14} />
            Back
          </Button>
          <Button type="button" onClick={onSubmit} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit intake →"}
          </Button>
        </div>
      </div>
    </div>
  )
}
