import type { Metadata } from "next"
import Link from "next/link"
import Pricing from "@/components/ui/pricing-base"

export const metadata: Metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </div>
      <Pricing />
    </main>
  )
}
