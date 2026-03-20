import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle,
  Star,
} from "lucide-react"
import { FaqSection } from "@/app/(landing)/faq-section"
import { IdeaMarquee } from "@/components/ui/idea-marquee"
import { HowItWorks } from "@/components/ui/feature-section-with-bento-grid"
import { FeatureDockSection } from "@/components/ui/feature-dock-section"

// ─── Feature Visuals ─────────────────────────────────────────

function ReportMockup() {
  const scores = [
    { label: "Market size", pct: 82 },
    { label: "Revenue potential", pct: 74 },
    { label: "Competition level", pct: 55 },
    { label: "Execution complexity", pct: 38 },
  ]
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground font-medium">Executive verdict</p>
          <p className="text-sm font-semibold">AI Meal Planning SaaS</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          Score: 87 / 100
        </span>
      </div>
      <div className="space-y-3">
        {scores.map(({ label, pct }) => (
          <div key={label} className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{label}</span>
              <span className="font-medium text-foreground">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full opacity-70"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-border space-y-2">
        <div className="h-2.5 bg-muted rounded-full w-full" />
        <div className="h-2.5 bg-muted rounded-full w-4/5" />
        <div className="h-2.5 bg-muted rounded-full w-3/5" />
      </div>
    </div>
  )
}

function WorkspaceMockup() {
  const columns = [
    { title: "To Do", items: [{ w: "w-3/4" }, { w: "w-1/2" }, { w: "w-2/3" }] },
    { title: "In Progress", items: [{ w: "w-4/5" }, { w: "w-2/3" }] },
    { title: "Done", items: [{ w: "w-3/4" }, { w: "w-full" }, { w: "w-1/2" }] },
  ]
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5 flex gap-3">
      {columns.map(({ title, items }) => (
        <div key={title} className="flex-1 space-y-2 min-w-0">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider truncate">
            {title}
          </p>
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-border bg-muted/40 p-3 space-y-2">
              <div className={`h-2 bg-foreground/15 rounded ${item.w}`} />
              <div className="h-2 bg-foreground/10 rounded w-2/5" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────


const featureDetails = [
  {
    label: "Structured reports",
    headline: "Stop guessing. Start with a full business breakdown.",
    body: "Every Shark report covers the things that matter: customer pain, market size, business model fit, competitor gaps, and real risks. Structured, scannable, and actionable.",
    bullets: [
      "Executive verdict with opportunity score",
      "Market size and customer analysis",
      "Business model recommendations",
      "MVP scope and go-to-market plan",
    ],
    imageSide: "right" as const,
  },
  {
    label: "Execution workspace",
    headline: "Keep the momentum after your report.",
    body: "Most tools give you insights and leave you hanging. Shark gives you a workspace to actually move — track tasks, log milestones, test assumptions, and write decisions.",
    bullets: [
      "Task board linked to your report findings",
      "Milestone tracker for your 90-day plan",
      "Assumption log to validate what you believe",
      "Private notes and decision history",
    ],
    imageSide: "left" as const,
  },
]


const footerLinks = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Changelog", "Roadmap"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
]

// ─── Page ────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/shark.png" alt="Shark" width={40} height={40} />
            <span className="font-semibold text-lg tracking-tight">Shark</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-base text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-base px-5 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Get started free
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="h-[calc(100vh-4.5rem)] px-6 bg-muted/20 flex flex-col">
          {/* Main hero content */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-1 py-10">
            <div className="space-y-8">
              <h1 className="text-6xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
                Turn your idea into a startup in 5 minutes
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                Shark turns your rough business idea into a structured report —
                market, competitors, risks, and an execution plan — in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/signup"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium text-base hover:opacity-90 transition-opacity text-center"
                >
                  Analyze my idea — it&apos;s free
                </Link>
                <Link
                  href="/pricing"
                  className="px-6 py-3 border border-border rounded-md text-base font-medium hover:bg-muted transition-colors text-center"
                >
                  See pricing
                </Link>
              </div>

              {/* Social proof row */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-2">
                  {[11, 5, 13, 47, 15].map((n) => (
                    <Image
                      key={n}
                      src={`https://i.pravatar.cc/32?img=${n}`}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">2,000+</span> founders already validated their ideas
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center relative">
              {/* Decorative blob behind the shark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] h-[380px] rounded-full bg-primary/5 blur-3xl" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[280px] h-[280px] rounded-full bg-primary/10 blur-2xl" />
              </div>
              <Image
                src="/shark.png"
                alt="Shark"
                width={380}
                height={380}
                className="relative drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* FUD strip — pinned to bottom of hero */}
          <div className="mt-auto border-t border-border bg-muted/30">
            <div className="flex justify-evenly w-full">
              {[
                {
                  fear: "Is my idea worth building?",
                  answer: "Get a clear verdict in 2 minutes.",
                  number: "01",
                },
                {
                  fear: "I don't know the market.",
                  answer: "Shark maps competitors, customers & size for you.",
                  number: "02",
                },
                {
                  fear: "I don't know where to start.",
                  answer: "Every report includes a 90-day execution plan.",
                  number: "03",
                },
              ].map(({ fear, answer, number }) => (
                <div key={fear} className="px-10 py-7 flex items-start gap-5">
                  <span className="text-2xl font-bold text-foreground/10 leading-none mt-1 select-none">{number}</span>
                  <div className="space-y-2.5">
                    <p className="text-base font-semibold text-muted-foreground">{fear}</p>
                    <p className="text-lg font-medium">{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works">
          <HowItWorks />
        </section>

        {/* ── Feature dock ── */}
        <FeatureDockSection />

        {/* ── Feature details (alternating 2-col) ── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto space-y-24">
            {featureDetails.map(({ label, headline, body, bullets, imageSide }) => (
              <div
                key={label}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                  imageSide === "left" ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
                }`}
              >
                <div className="space-y-5">
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest">{label}</p>
                  <h2 className="text-3xl font-bold tracking-tight leading-tight">{headline}</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
                  <ul className="space-y-2">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product mockup */}
                <div className="flex items-center justify-center">
                  {label === "Structured reports" ? <ReportMockup /> : <WorkspaceMockup />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Idea marquee ── */}
        <IdeaMarquee />

        {/* ── FAQ ── */}
        <FaqSection />

        {/* ── Final CTA ── */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-sm font-medium text-primary uppercase tracking-widest">
              Get started today
            </p>
            <h2 className="text-4xl font-bold tracking-tight">
              Your next idea deserves a real answer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Don&apos;t spend months building something nobody wants. Shark
              gives you the analysis and the plan — so you start smart.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Analyze my idea — it&apos;s free
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-3 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors"
              >
                View plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-muted/20 px-6 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/shark.png" alt="Shark" width={24} height={24} />
              <span className="font-semibold text-sm">Shark</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              AI-powered platform that turns business ideas into structured
              reports and execution workspaces.
            </p>
          </div>

          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Shark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
