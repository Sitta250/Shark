import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Try Shark with one idea.",
    features: [
      "1 project",
      "Full AI report generation",
      "Execution workspace",
      "Tasks & milestones",
    ],
    cta: "Get started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Starter",
    price: "$19",
    description: "For founders validating multiple ideas.",
    features: [
      "3 projects",
      "Full AI report generation",
      "Execution workspace",
      "Tasks & milestones",
      "Export reports",
      "Assumption tracker",
    ],
    cta: "Get Starter",
    href: "/signup?plan=starter",
    popular: true,
  },
  {
    name: "Pro",
    price: "$49",
    description: "For power users and consultants.",
    features: [
      "10 projects",
      "Full AI report generation",
      "Execution workspace",
      "Tasks & milestones",
      "Export reports",
      "Assumption tracker",
      "Priority support",
    ],
    cta: "Get Pro",
    href: "/signup?plan=pro",
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Pricing that scales with you
          </h1>
          <p className="text-muted-foreground">
            Start free with one project. Upgrade when you need more. No credit
            card required to get started.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="relative flex flex-col shadow-sm transition-all duration-200 hover:shadow-md hover:border-foreground/30 hover:-translate-y-0.5">
              {plan.popular && (
                <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
                  Most popular
                </span>
              )}

              <CardHeader>
                <CardTitle className="text-base font-medium">
                  {plan.name}
                </CardTitle>
                <span className="my-3 block text-3xl font-semibold">
                  {plan.price}
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}/ mo
                  </span>
                </span>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <hr className="border-dashed" />
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="size-3.5 shrink-0 text-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto">
                <Button
                  asChild
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
