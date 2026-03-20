"use client"

import Image from "next/image"

const rowOne = [
  { idea: "An AI tool that turns Notion docs into client-ready presentations instantly", tag: "SaaS", name: "James", avatar: "https://i.pravatar.cc/40?img=11" },
  { idea: "A subscription box for local artisan coffee paired with brewing guides for beginners", tag: "E-commerce", name: "Sofia", avatar: "https://i.pravatar.cc/40?img=5" },
  { idea: "SaaS that auto-generates legal contracts for freelancers based on project type", tag: "Legal tech", name: "Arjun", avatar: "https://i.pravatar.cc/40?img=13" },
  { idea: "A marketplace connecting freelance chefs with remote teams for weekly meal prep", tag: "Marketplace", name: "Lena", avatar: "https://i.pravatar.cc/40?img=47" },
  { idea: "A micro-SaaS that tracks competitor pricing changes and sends daily digests", tag: "B2B", name: "Marcus", avatar: "https://i.pravatar.cc/40?img=15" },
  { idea: "White-label loyalty program platform for independent coffee shops", tag: "SaaS", name: "Priya", avatar: "https://i.pravatar.cc/40?img=44" },
  { idea: "API service that detects emotional tone in customer support tickets in real-time", tag: "Dev tools", name: "Tom", avatar: "https://i.pravatar.cc/40?img=17" },
  { idea: "An online community and course platform for women transitioning into tech careers", tag: "EdTech", name: "Aisha", avatar: "https://i.pravatar.cc/40?img=49" },
]

const rowTwo = [
  { idea: "Peer-to-peer car sharing app focused on rural areas with limited public transport", tag: "Mobility", name: "Daniel", avatar: "https://i.pravatar.cc/40?img=18" },
  { idea: "AI writing assistant specifically trained for e-commerce product descriptions", tag: "AI", name: "Yuki", avatar: "https://i.pravatar.cc/40?img=45" },
  { idea: "B2B platform for small restaurants to manage food waste and reduce supply costs", tag: "FoodTech", name: "Carlos", avatar: "https://i.pravatar.cc/40?img=21" },
  { idea: "A mobile app that gamifies saving money for Gen Z using social challenges", tag: "FinTech", name: "Nina", avatar: "https://i.pravatar.cc/40?img=46" },
  { idea: "No-code tool that lets non-technical founders build and launch email automations", tag: "No-code", name: "Sam", avatar: "https://i.pravatar.cc/40?img=23" },
  { idea: "A mental health journaling app that uses AI to surface recurring patterns over time", tag: "Health", name: "Mia", avatar: "https://i.pravatar.cc/40?img=48" },
  { idea: "Remote team async standup tool that generates weekly summaries for managers", tag: "Productivity", name: "Kevin", avatar: "https://i.pravatar.cc/40?img=25" },
  { idea: "Subscription analytics dashboard built specifically for Stripe-powered startups", tag: "Analytics", name: "Zara", avatar: "https://i.pravatar.cc/40?img=43" },
]

type CardItem = typeof rowOne[number]

function IdeaCard({ idea, tag, name, avatar }: CardItem) {
  return (
    <div className="w-72 shrink-0 rounded-xl border border-border bg-card mx-3 p-5 flex flex-col justify-between gap-5" style={{ minHeight: "160px" }}>
      <div className="space-y-2">
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
          {tag}
        </span>
        <p className="text-sm leading-relaxed text-foreground line-clamp-3">{idea}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <Image
          src={avatar}
          alt={name}
          width={28}
          height={28}
          className="rounded-full object-cover"
        />
        <span className="text-xs font-medium text-muted-foreground">{name}</span>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse = false }: { items: CardItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden">
      <div
        className="flex"
        style={{
          animation: `${reverse ? "marquee-right" : "marquee-left"} 60s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <IdeaCard key={i} {...item} />
        ))}
      </div>
    </div>
  )
}

export function IdeaMarquee() {
  return (
    <section className="py-24 overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 text-center space-y-3 mb-12">
        <h2 className="text-4xl font-bold tracking-tight">What founders bring to Shark</h2>
        <p className="text-lg text-muted-foreground">Real ideas. Structured answers.</p>
      </div>

      <div className="space-y-4">
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />
      </div>
    </section>
  )
}
