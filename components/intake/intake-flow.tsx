"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  STEPS,
  EMPTY_INTAKE,
  REVIEW_STEP,
  type IntakeFormData,
  type StepDef,
} from "@/lib/intake/schema"
import { saveIntakeStep, submitIntake } from "@/lib/intake/actions"
import { StepIndicator } from "./step-indicator"
import { TileSelect } from "./tile-select"
import { BusinessTypeField } from "./business-type-field"
import { ReviewScreen } from "./review-screen"
import type { ProjectInput } from "@/types"

// ─── Validation ───────────────────────────────────────────────
type FieldErrors = Partial<Record<keyof IntakeFormData, string>>

function validateStep(step: StepDef, data: IntakeFormData): FieldErrors {
  const errors: FieldErrors = {}
  for (const field of step.fields) {
    if (field.condition && !field.condition(data)) continue
    if (field.required) {
      const val = data[field.id]?.trim()
      // "other" is a sentinel meaning the Other tile was clicked but nothing typed yet
      if (!val || val === "other") {
        errors[field.id] = "This field is required."
      }
    }
  }
  return errors
}

// ─── Props ────────────────────────────────────────────────────
type Props = {
  projectId: string
  existingIntake: ProjectInput | null
}

export function IntakeFlow({ projectId, existingIntake }: Props) {
  const router = useRouter()

  // Resume at the saved step (clamped to valid range)
  const savedStep = existingIntake?.current_step ?? 1
  const [step, setStep] = useState(
    savedStep >= 1 && savedStep <= REVIEW_STEP ? savedStep : 1
  )

  const [formData, setFormData] = useState<IntakeFormData>({
    idea: existingIntake?.idea ?? "",
    problem: existingIntake?.problem ?? "",
    target_customer: existingIntake?.target_customer ?? "",
    country: existingIntake?.country ?? "",
    business_type: existingIntake?.business_type ?? "",
    stage: existingIntake?.stage ?? "",
    budget: existingIntake?.budget ?? "",
    timeline: existingIntake?.timeline ?? "",
    goal: existingIntake?.goal ?? "",
  })

  const [errors, setErrors] = useState<FieldErrors>({})
  const [saving, setSaving] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const isReview = step === REVIEW_STEP
  const currentStepDef = STEPS[step - 1]
  const stepTitles = STEPS.map((s) => s.title)

  // ─── Field update ───────────────────────────────────────────
  const updateField = useCallback(
    (id: keyof IntakeFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [id]: value }))
      setErrors((prev) => ({ ...prev, [id]: undefined }))
    },
    []
  )

  // ─── Continue ──────────────────────────────────────────────
  const handleContinue = async () => {
    if (!currentStepDef) return

    const stepErrors = validateStep(currentStepDef, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      // Scroll to first error
      setTimeout(() => {
        document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 50)
      return
    }

    setSaving(true)
    setGlobalError(null)
    const nextStep = step + 1
    const { error } = await saveIntakeStep(projectId, formData, nextStep)
    setSaving(false)

    if (error) {
      setGlobalError(error)
      return
    }

    setErrors({})
    setStep(nextStep)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ─── Back ──────────────────────────────────────────────────
  const handleBack = () => {
    setErrors({})
    setGlobalError(null)
    setStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ─── Jump to step (from review) ────────────────────────────
  const handleEdit = (targetStep: number) => {
    setErrors({})
    setGlobalError(null)
    setStep(targetStep)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ─── Final submit ──────────────────────────────────────────
  const handleSubmit = async () => {
    setSaving(true)
    setGlobalError(null)
    const { error } = await submitIntake(projectId, formData)
    setSaving(false)

    if (error) {
      setGlobalError(error)
      return
    }

    router.refresh()
  }

  return (
    <div className="max-w-2xl w-full">
      {/* Progress */}
      <div className="mb-8">
        <StepIndicator
          steps={stepTitles}
          currentStep={Math.min(step, STEPS.length)}
        />
      </div>

      {/* Header */}
      <div className="mb-7">
        {isReview ? (
          <>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">
              Review
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Looks good?
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Check your answers before we lock them in.
            </p>
          </>
        ) : (
          <>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">
              Step {step} of {STEPS.length}
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              {currentStepDef.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              {currentStepDef.subtitle}
            </p>
          </>
        )}
      </div>

      {/* Content */}
      {isReview ? (
        <ReviewScreen
          data={formData}
          onEdit={handleEdit}
          onBack={handleBack}
          onSubmit={handleSubmit}
          submitting={saving}
          error={globalError}
        />
      ) : (
        <div className="space-y-8">
          {currentStepDef.fields.map((field) => {
            if (field.condition && !field.condition(formData)) return null

            const value = formData[field.id]
            const error = errors[field.id]

            return (
              <div key={field.id} className="space-y-2" data-error={error ? true : undefined}>
                {/* Label */}
                <div>
                  <Label className="text-sm font-semibold">
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {field.description}
                  </p>
                </div>

                {/* Input */}
                {field.type === "textarea" && (
                  <div className="relative">
                    <Textarea
                      value={value}
                      onChange={(e) => updateField(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                      rows={4}
                      className={cn(
                        "resize-none pb-7",
                        error && "border-destructive focus-visible:ring-destructive/30"
                      )}
                    />
                    {field.maxLength && (
                      <span className="absolute bottom-2.5 right-3 text-xs text-muted-foreground pointer-events-none">
                        {value.length}/{field.maxLength}
                      </span>
                    )}
                  </div>
                )}

                {field.type === "text" && (
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={cn(error && "border-destructive focus-visible:ring-destructive/30")}
                  />
                )}

                {field.type === "tile-select" && field.options && (
                  field.id === "business_type" ? (
                    <BusinessTypeField
                      value={value}
                      onChange={(v) => updateField(field.id, v)}
                      error={error}
                    />
                  ) : (
                    <TileSelect
                      options={field.options}
                      value={value}
                      onChange={(v) => updateField(field.id, v)}
                      cols={field.cols ?? 3}
                    />
                  )
                )}

                {/* BusinessTypeField renders its own error; skip outer error for it */}
                {error && field.id !== "business_type" && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    {error}
                  </p>
                )}
              </div>
            )
          })}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2 pb-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className={cn(step === 1 && "opacity-0 pointer-events-none")}
            >
              <ArrowLeft size={14} />
              Back
            </Button>

            <div className="flex flex-col items-end gap-1">
              {globalError && (
                <p className="text-xs text-destructive">{globalError}</p>
              )}
              <Button type="button" onClick={handleContinue} disabled={saving}>
                {saving
                  ? "Saving…"
                  : step === STEPS.length
                  ? "Review answers →"
                  : "Continue →"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
