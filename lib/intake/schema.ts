// ─── Form data shape ─────────────────────────────────────────
export type IntakeFormData = {
  idea: string
  problem: string
  target_customer: string
  country: string
  business_type: string
  stage: string
  budget: string
  timeline: string
  goal: string
}

export const EMPTY_INTAKE: IntakeFormData = {
  idea: "",
  problem: "",
  target_customer: "",
  country: "",
  business_type: "",
  stage: "",
  budget: "",
  timeline: "",
  goal: "",
}

// ─── Tile options ────────────────────────────────────────────
export type TileOption = {
  value: string
  label: string
  description: string
}

export const BUSINESS_TYPE_OPTIONS: TileOption[] = [
  { value: "b2b",         label: "B2B",         description: "You sell to other businesses"     },
  { value: "b2c",         label: "B2C",         description: "You sell directly to consumers"   },
  { value: "saas",        label: "SaaS",        description: "Software subscription product"    },
  { value: "marketplace", label: "Marketplace", description: "Connect buyers and sellers"       },
  { value: "ecommerce",   label: "E-commerce",  description: "Sell products online / D2C"       },
  { value: "service",     label: "Service",     description: "Consulting, agency, freelance"    },
  { value: "other",       label: "Other",       description: "Something different"              },
]

export const STAGE_OPTIONS: TileOption[] = [
  { value: "idea",       label: "Just an idea", description: "Haven't built or tested anything yet"     },
  { value: "validation", label: "Validating",   description: "Talking to customers, testing assumptions" },
  { value: "building",   label: "Building",     description: "Working on the MVP"                        },
  { value: "launched",   label: "Launched",     description: "Have real users or customers"              },
  { value: "scaling",    label: "Scaling",      description: "Growing an existing business"              },
]

export const BUDGET_OPTIONS: TileOption[] = [
  { value: "bootstrap", label: "Bootstrapped", description: "Under $1,000"           },
  { value: "low",       label: "$1k – $10k",   description: "Small but real budget"  },
  { value: "medium",    label: "$10k – $50k",  description: "Meaningful runway"      },
  { value: "high",      label: "$50k – $200k", description: "Well-resourced"         },
  { value: "funded",    label: "$200k+",       description: "Significant capital"    },
]

export const TIMELINE_OPTIONS: TileOption[] = [
  { value: "asap",      label: "ASAP",           description: "Moving as fast as possible" },
  { value: "3months",   label: "3 months",        description: "Within the next quarter"    },
  { value: "6months",   label: "6 months",        description: "Within two quarters"        },
  { value: "1year",     label: "Within a year",   description: "No rush, within 12 months"  },
  { value: "exploring", label: "Just exploring",  description: "No timeline pressure"       },
]

export const GOAL_OPTIONS: TileOption[] = [
  { value: "side_income", label: "Side income",        description: "Supplement my main salary"       },
  { value: "full_time",   label: "Full-time business", description: "Replace my current job"          },
  { value: "startup",     label: "Startup scale",      description: "Raise funding and grow fast"     },
  { value: "lifestyle",   label: "Lifestyle business", description: "Freedom and sustainability"      },
  { value: "social",      label: "Social impact",      description: "Mission-driven, beyond profit"   },
]

// ─── Field / step definitions ─────────────────────────────────
export type FieldType = "textarea" | "text" | "tile-select"

export type FieldDef = {
  id: keyof IntakeFormData
  label: string
  description: string
  type: FieldType
  placeholder?: string
  required: boolean
  maxLength?: number
  options?: TileOption[]
  cols?: 2 | 3
  // Adaptive: render this field only when condition returns true.
  // Receives all current form values so decisions can chain.
  condition?: (data: Partial<IntakeFormData>) => boolean
}

export type StepDef = {
  id: string
  title: string
  subtitle: string
  fields: FieldDef[]
}

// ─── Steps ───────────────────────────────────────────────────
export const STEPS: StepDef[] = [
  {
    id: "idea",
    title: "The Idea",
    subtitle: "Tell us what you're building and why it matters.",
    fields: [
      {
        id: "idea",
        label: "Describe your business idea",
        description:
          "Give a clear, concise pitch. Imagine explaining it to a friend in 30 seconds.",
        type: "textarea",
        placeholder:
          "e.g. A subscription box of locally-sourced snacks that rotates through a different world region every month.",
        required: true,
        maxLength: 600,
      },
      {
        id: "problem",
        label: "What problem does it solve?",
        description:
          "What pain or frustration are you eliminating? Who feels it most?",
        type: "textarea",
        placeholder:
          "e.g. People want interesting, high-quality snacks but supermarkets only carry boring mainstream brands.",
        required: true,
        maxLength: 600,
      },
    ],
  },
  {
    id: "market",
    title: "The Market",
    subtitle: "Help us understand your customers and how you'll make money.",
    fields: [
      {
        id: "target_customer",
        label: "Who is your target customer?",
        description:
          "Be specific — job title, age, lifestyle, pain point. The more concrete, the better the analysis.",
        type: "textarea",
        placeholder:
          "e.g. Remote workers aged 25–40 who care about food culture, spend $80+/month on delivery, and live in US cities.",
        required: true,
        maxLength: 400,
      },
      {
        id: "country",
        label: "Primary market",
        description: "Where will you launch first?",
        type: "text",
        placeholder: "e.g. United States, Europe, Southeast Asia",
        required: true,
      },
      {
        id: "business_type",
        label: "Business model",
        description: "What best describes how you'll make money?",
        type: "tile-select",
        options: BUSINESS_TYPE_OPTIONS,
        cols: 3,
        required: true,
      },
    ],
  },
  {
    id: "situation",
    title: "Your Situation",
    subtitle: "We'll tailor the analysis to your context and constraints.",
    fields: [
      {
        id: "stage",
        label: "Where are you right now?",
        description: "What best describes your current progress?",
        type: "tile-select",
        options: STAGE_OPTIONS,
        cols: 3,
        required: true,
      },
      {
        id: "timeline",
        label: "Launch timeline",
        description: "When do you want something in market?",
        type: "tile-select",
        options: TIMELINE_OPTIONS,
        cols: 3,
        required: true,
      },
      {
        id: "goal",
        label: "What's your main goal?",
        description: "What does success look like for you?",
        type: "tile-select",
        options: GOAL_OPTIONS,
        cols: 3,
        required: true,
      },
    ],
  },
]

export const REVIEW_STEP = STEPS.length + 1 // step 4

// ─── Option label helpers ─────────────────────────────────────
const ALL_OPTIONS: Record<string, TileOption[]> = {
  business_type: BUSINESS_TYPE_OPTIONS,
  stage: STAGE_OPTIONS,
  budget: BUDGET_OPTIONS,
  timeline: TIMELINE_OPTIONS,
  goal: GOAL_OPTIONS,
}

export function getOptionLabel(fieldId: string, value: string): string {
  const opt = ALL_OPTIONS[fieldId]?.find((o) => o.value === value)
  return opt ? opt.label : value
}
