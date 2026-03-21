import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  steps: string[]     // display titles
  currentStep: number // 1-indexed
}

export function StepIndicator({ steps, currentStep }: Props) {
  const pct = Math.round((currentStep / steps.length) * 100)

  return (
    <>
      {/* Mobile — progress bar */}
      <div className="sm:hidden space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold">{steps[currentStep - 1]}</span>
          <span className="text-muted-foreground">
            {currentStep} / {steps.length}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Desktop — bubbles + connector lines */}
      <div className="hidden sm:flex items-start">
        {steps.map((title, i) => {
          const n = i + 1
          const done = n < currentStep
          const active = n === currentStep
          const last = i === steps.length - 1

          return (
            <div key={title} className="flex items-start flex-1 last:flex-none">
              {/* Bubble + label */}
              <div className="flex flex-col items-center gap-2 min-w-[48px]">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200",
                    done && "bg-primary text-primary-foreground",
                    active &&
                      "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !done && !active &&
                      "bg-muted text-muted-foreground border border-border"
                  )}
                >
                  {done ? <Check size={14} strokeWidth={2.5} /> : n}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium text-center max-w-[72px] leading-tight",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {title}
                </span>
              </div>

              {/* Connector */}
              {!last && (
                <div
                  className={cn(
                    "flex-1 h-px mt-4 mx-1 transition-colors duration-300",
                    n < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
