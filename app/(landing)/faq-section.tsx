"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How does Shark analyze my idea?",
    answer:
      "You fill in a short intake form — your idea, target customer, market, and goals. Shark sends this to an AI model trained on business analysis frameworks and returns a structured report with a viability score, market breakdown, competitor landscape, risks, and a 90-day execution plan.",
  },
  {
    question: "How long does it take to get a report?",
    answer:
      "Most reports are generated in under 2 minutes. Once you submit your intake, Shark works in the background and notifies you when it's ready.",
  },
  {
    question: "Can I edit or redo the intake after submitting?",
    answer:
      "Yes. The intake form is editable at any time. You can update your inputs and regenerate the report — useful as your thinking evolves.",
  },
  {
    question: "What's included in the execution workspace?",
    answer:
      "Each project gets a full workspace with tasks, milestones, an assumption tracker, and notes. It's designed to take you from report insights to actual execution steps.",
  },
  {
    question: "Is my idea data kept private?",
    answer:
      "Absolutely. Your project data is private to your account and never shared or used to train AI models. We take idea confidentiality seriously.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="divide-y divide-border">
          {faqs.map((faq, index) => (
            <div key={faq.question}>
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-foreground transition-colors"
              >
                <span className="font-medium text-sm">{faq.question}</span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
