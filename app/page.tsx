import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Star, ArrowRight } from "lucide-react"
import { FaqSection } from "@/app/(landing)/faq-section"
import { IdeaMarquee } from "@/components/ui/idea-marquee"
import { HowItWorks } from "@/components/ui/feature-section-with-bento-grid"
import { FeatureDockSection } from "@/components/ui/feature-dock-section"
import { MacbookMockup } from "@/components/ui/macbook-mockup"

// ─── Feature Visuals ─────────────────────────────────────────

function ReportMockup() {
  const scores = [
    { label: "Market size", pct: 82 },
    { label: "Revenue potential", pct: 74 },
    { label: "Competition level", pct: 55 },
    { label: "Execution complexity", pct: 38 },
  ]
  return (
    <div className="rounded-lg bg-card p-6 space-y-5 shadow-ambient">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[0.625rem] text-muted-foreground font-semibold uppercase tracking-wider">
            Executive verdict
          </p>
          <p className="text-sm font-semibold tracking-tight">AI Meal Planning SaaS</p>
        </div>
        <span className="px-2 py-0.5 rounded-sm bg-primary text-primary-foreground text-[0.625rem] font-semibold uppercase tracking-wider">
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
            <div className="h-1 rounded-full bg-surface-high overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-3 space-y-2">
        <div className="h-2 bg-surface-high rounded-full w-full" />
        <div className="h-2 bg-surface-high rounded-full w-4/5" />
        <div className="h-2 bg-surface-high rounded-full w-3/5" />
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
    <div className="rounded-lg bg-card p-5 flex gap-3 shadow-ambient">
      {columns.map(({ title, items }) => (
        <div key={title} className="flex-1 space-y-2 min-w-0">
          <p className="text-[0.625rem] font-semibold text-muted-foreground uppercase tracking-wider truncate">
            {title}
          </p>
          {items.map((item, i) => (
            <div key={i} className="rounded-md bg-surface-low p-3 space-y-2">
              <div className={`h-1.5 bg-foreground/15 rounded ${item.w}`} />
              <div className="h-1.5 bg-foreground/10 rounded w-2/5" />
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

      {/* ── Navbar — glass, white bg, no color ── */}
      <header className="sticky top-0 z-50 glass shadow-ambient">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/shark.png" alt="Shark" width={32} height={32} />
            <span className="font-semibold text-base tracking-tight text-foreground">
              Shark
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-cta text-white text-sm px-5 py-2 rounded-xl font-medium hover:brightness-110 transition-all shadow-ambient"
            >
              Get started free
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero — white bg, dark navy headline ── */}
        <section className="bg-background min-h-[calc(100vh-4rem)] px-6 flex flex-col">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-1 py-20">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-high text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                AI-Powered Venture Intelligence
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
                Turn your idea into a startup in 5 minutes
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
                Shark turns your rough business idea into a structured report —
                market, competitors, risks, and an execution plan — in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/signup"
                  className="bg-cta text-white px-6 py-3 rounded-xl font-medium text-sm text-center hover:brightness-110 transition-all shadow-ambient inline-flex items-center justify-center gap-2"
                >
                  Analyze my idea — it&apos;s free
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/pricing"
                  className="bg-surface-high text-foreground px-6 py-3 rounded-lg text-sm font-medium text-center hover:bg-surface-highest transition-colors"
                >
                  See pricing
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-2">
                  {[11, 5, 13, 47, 15].map((n) => (
                    <Image
                      key={n}
                      src={`https://i.pravatar.cc/32?img=${n}`}
                      alt=""
                      width={28}
                      height={28}
                      className="rounded-full object-cover ring-2 ring-background"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-secondary fill-secondary"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">2,000+</span>{" "}
                    founders already validated their ideas
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <MacbookMockup />
            </div>
          </div>

          {/* ── Stats strip — surface-low separates from hero ── */}
          <div className="bg-surface-low mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:divide-x divide-outline-variant/20">
              {[
                { fear: "Is my idea worth building?", answer: "Get a clear verdict in 2 minutes.", number: "01" },
                { fear: "I don't know the market.", answer: "Shark maps competitors, customers & size for you.", number: "02" },
                { fear: "I don't know where to start.", answer: "Every report includes a 90-day execution plan.", number: "03" },
              ].map(({ fear, answer, number }) => (
                <div key={fear} className="flex-1 px-6 py-6 md:px-10 md:py-8 flex items-start gap-4">
                  <span className="text-lg font-bold leading-none mt-0.5 select-none text-outline shrink-0 tabular-nums">
                    {number}
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{fear}</p>
                    <p className="text-sm font-medium text-foreground">{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="bg-background">
          <HowItWorks />
        </section>

        {/* ── Feature dock ── */}
        <div className="bg-background">
          <FeatureDockSection />
        </div>

        {/* ── Feature details (alternating 2-col) ── */}
        <section className="py-24 px-6 bg-surface-low">
          <div className="max-w-5xl mx-auto space-y-24">
            {featureDetails.map(({ label, headline, body, bullets, imageSide }) => (
              <div
                key={label}
                className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
                  imageSide === "left" ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
                }`}
              >
                <div className="space-y-5">
                  <p className="text-[0.625rem] font-semibold text-secondary uppercase tracking-wider">{label}</p>
                  <h2 className="text-3xl font-bold tracking-tight leading-tight">{headline}</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
                  <ul className="space-y-2.5">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle size={14} className="text-secondary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-center">
                  {label === "Structured reports" ? <ReportMockup /> : <WorkspaceMockup />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Idea marquee ── */}
        <div className="bg-background">
          <IdeaMarquee />
        </div>

        {/* ── FAQ ── */}
        <div className="bg-surface-low">
          <FaqSection />
        </div>

        {/* ── Final CTA — deep navy band (shark_v1 footer CTA pattern) ── */}
        <section className="py-28 px-6 text-center bg-primary">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              Get started today
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-primary-foreground">
              Your next idea deserves a real answer
            </h2>
            <p className="leading-relaxed text-primary-foreground/60 text-sm">
              Don&apos;t spend months building something nobody wants. Shark
              gives you the analysis and the plan — so you start smart.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto bg-cta text-white px-8 py-3 rounded-xl font-medium text-sm hover:brightness-110 transition-all shadow-ambient"
              >
                Analyze my idea — it&apos;s free
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground border border-primary-foreground/20 hover:border-primary-foreground/40 transition-colors"
              >
                View plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer — deep navy, structural ── */}
      <footer className="bg-primary px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/shark.png" alt="Shark" width={22} height={22} />
              <span className="font-semibold text-sm text-primary-foreground">Shark</span>
            </Link>
            <p className="text-xs leading-relaxed max-w-xs text-primary-foreground/50">
              AI-powered platform that turns business ideas into structured
              reports and execution workspaces.
            </p>
          </div>

          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="space-y-3">
              <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-primary-foreground/60">
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-primary-foreground/10">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Shark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
