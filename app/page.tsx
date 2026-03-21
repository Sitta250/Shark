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

      {/* ── Navbar — merges with purple hero ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm"
        style={{
          backgroundColor: "hsl(255 78% 53% / 0.92)",
          borderBottom: "1px solid hsl(255 70% 44%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/shark.png" alt="Shark" width={40} height={40} />
            <span className="font-semibold text-lg tracking-tight text-white">
              Shark
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-base">
            <Link href="#features" className="text-white/75 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-white/75 hover:text-white transition-colors">
              How it works
            </Link>
            <Link href="/pricing" className="text-white/75 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-base text-white/75 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-base px-5 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "hsl(38 85% 62%)", color: "hsl(38 70% 14%)" }}
            >
              Get started free
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero — 60% purple · 30% neutral · 10% amber ── */}
        <section
          className="min-h-[calc(100vh-4.5rem)] px-6 flex flex-col"
          style={{ backgroundColor: "hsl(255 78% 53%)" }}
        >
          {/* Main hero content */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-1 py-10">
            <div className="space-y-8">
              <h1 className="text-6xl sm:text-7xl font-bold tracking-tight leading-[1.05] text-white">
                Turn your idea into a startup in 5 minutes
              </h1>
              <p className="text-xl leading-relaxed max-w-md text-white/70">
                Shark turns your rough business idea into a structured report —
                market, competitors, risks, and an execution plan — in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Primary CTA — amber (10% complementary) */}
                <Link
                  href="/signup"
                  className="px-6 py-3 rounded-md font-medium text-base text-center transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "hsl(38 85% 62%)", color: "hsl(38 70% 14%)" }}
                >
                  Analyze my idea — it&apos;s free
                </Link>
                {/* Secondary CTA — neutral (30%) */}
                <Link
                  href="/pricing"
                  className="px-6 py-3 rounded-md text-base font-medium text-center transition-colors"
                  style={{
                    backgroundColor: "hsl(255 78% 62%)",
                    color: "white",
                    border: "1px solid hsl(255 70% 68%)",
                  }}
                >
                  See pricing
                </Link>
              </div>

              {/* Social proof — avatars + amber stars */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-2">
                  {[11, 5, 13, 47, 15].map((n) => (
                    <Image
                      key={n}
                      src={`https://i.pravatar.cc/32?img=${n}`}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      style={{ border: "2px solid hsl(255 78% 53%)" }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        style={{ fill: "hsl(38 85% 62%)", color: "hsl(38 85% 62%)" }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-white/70">
                    <span className="font-semibold text-white">2,000+</span>{" "}
                    founders already validated their ideas
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <MacbookMockup />
            </div>
          </div>

          {/* FUD strip — neutral 30%, sits at hero bottom */}
          <div
            className="mt-auto"
            style={{
              borderTop: "1px solid hsl(255 70% 62%)",
              backgroundColor: "hsl(255 78% 47%)",
            }}
          >
            <div className="flex flex-col md:flex-row md:justify-evenly w-full divide-y md:divide-y-0 md:divide-x divide-white/10">
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
                <div key={fear} className="flex-1 px-6 py-5 md:px-10 md:py-7 flex items-start gap-4">
                  <span className="text-xl font-bold leading-none mt-0.5 select-none text-white/20 shrink-0">
                    {number}
                  </span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-white/50">{fear}</p>
                    <p className="text-base font-medium text-white">{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            POST-HERO: white bg · lavender elements · black text
        ════════════════════════════════════════════════════════ */}

        {/* ── How it works ── */}
        <section id="how-it-works" className="bg-white">
          <HowItWorks />
        </section>

        {/* ── Feature dock ── */}
        <div className="bg-white">
          <FeatureDockSection />
        </div>

        {/* ── Feature details (alternating 2-col) ── */}
        <section className="py-20 px-6 bg-white">
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
        <div className="bg-white">
          <IdeaMarquee />
        </div>

        {/* ── FAQ ── */}
        <div className="bg-white">
          <FaqSection />
        </div>

        {/* ── Final CTA ── */}
        <section className="py-24 px-6 text-center bg-white">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Get started today
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-black">
              Your next idea deserves a real answer
            </h2>
            <p className="leading-relaxed text-black/60">
              Don&apos;t spend months building something nobody wants. Shark
              gives you the analysis and the plan — so you start smart.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity bg-primary text-primary-foreground"
              >
                Analyze my idea — it&apos;s free
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-3 border border-border rounded-md text-sm font-medium text-black hover:bg-muted transition-colors"
              >
                View plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer — purple dominant ── */}
      <footer
        className="px-6 py-14"
        style={{ backgroundColor: "hsl(255 78% 53%)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/shark.png" alt="Shark" width={24} height={24} />
              <span className="font-semibold text-sm text-white">Shark</span>
            </Link>
            <p className="text-xs leading-relaxed max-w-xs text-white/60">
              AI-powered platform that turns business ideas into structured
              reports and execution workspaces.
            </p>
          </div>

          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white">
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-xs text-white/55 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="max-w-6xl mx-auto mt-12 pt-6"
          style={{ borderTop: "1px solid hsl(255 70% 62%)" }}
        >
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Shark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
