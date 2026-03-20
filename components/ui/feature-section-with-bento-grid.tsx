"use client"

import { useEffect, useRef, useState } from "react"
import { FolderPlus, ClipboardList, BarChart2, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: FolderPlus,
    step: "01",
    title: "Create a project",
    description:
      "Name your idea, pick your market, and set your stage. Takes 30 seconds.",
    wide: true,
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Complete the intake",
    description:
      "Answer a short form about your customer, problem, and goals.",
    wide: false,
  },
  {
    icon: BarChart2,
    step: "03",
    title: "Get your report",
    description:
      "Shark generates a full analysis — market, competitors, risks, and a viability verdict.",
    wide: false,
  },
  {
    icon: Rocket,
    step: "04",
    title: "Start executing",
    description:
      "Your workspace is ready. Track tasks, milestones, and assumptions from day one.",
    wide: true,
  },
]

function BentoCard({
  icon: Icon,
  step,
  title,
  description,
  wide,
  index,
}: {
  icon: React.ElementType
  step: string
  title: string
  description: string
  wide: boolean
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 250}ms` }}
      className={cn(
        "bg-muted rounded-xl p-8 flex flex-col justify-between aspect-square lg:aspect-auto transition-all duration-1000 ease-out",
        wide ? "lg:col-span-2" : "lg:col-span-1",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-16 scale-[0.95]"
      )}
    >
      <div className="flex items-start justify-between">
        <Icon className="w-8 h-8 stroke-1" />
        <span className="text-4xl font-bold text-foreground/10 select-none">
          {step}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <div className="w-full py-28 lg:py-36">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12">
          <div className="flex gap-4 flex-col items-start">
            <h2 className="text-4xl md:text-5xl tracking-tight font-bold text-left">
              From idea to execution in four steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <BentoCard key={step.step} {...step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
