'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2,
  Users,
  Swords,
  Briefcase,
  Rocket,
  CheckSquare,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

// ─── Background SVGs ──────────────────────────────────────────

function LineGraphBg() {
  return (
    <svg viewBox="0 0 560 220" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Grid lines */}
      {[40, 80, 120, 160, 200].map((y) => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 4" opacity="0.3" />
      ))}
      {/* Area fill */}
      <path d="M0,190 C60,180 100,140 160,110 C220,80 260,95 320,60 C380,28 430,15 560,5 L560,220 L0,220 Z" fill="currentColor" opacity="0.06" />
      {/* Line */}
      <path d="M0,190 C60,180 100,140 160,110 C220,80 260,95 320,60 C380,28 430,15 560,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Dots */}
      {[[160,110],[320,60],[430,15]].map(([x,y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="currentColor" />
      ))}
    </svg>
  );
}

function BarChartBg() {
  const bars = [
    { x: 30, h: 80, w: 50 },
    { x: 110, h: 130, w: 50 },
    { x: 190, h: 60, w: 50 },
    { x: 270, h: 160, w: 50 },
    { x: 350, h: 100, w: 50 },
    { x: 430, h: 140, w: 50 },
  ];
  return (
    <svg viewBox="0 0 560 220" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <line x1="20" y1="200" x2="540" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {bars.map(({ x, h, w }) => (
        <rect key={x} x={x} y={200 - h} width={w} height={h} rx="4" fill="currentColor" opacity="0.12" />
      ))}
      {bars.map(({ x, h, w }) => (
        <rect key={`t-${x}`} x={x} y={200 - h} width={w} height="3" rx="2" fill="currentColor" opacity="0.4" />
      ))}
    </svg>
  );
}

function CompetitorGridBg() {
  const cols = [160, 280, 400, 520];
  const rows = [40, 90, 140, 190];
  return (
    <svg viewBox="0 0 560 220" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Header row */}
      {cols.map((x) => (
        <rect key={x} x={x - 50} y="10" width="100" height="22" rx="4" fill="currentColor" opacity="0.15" />
      ))}
      {/* Row labels */}
      {rows.map((y) => (
        <rect key={y} x="10" y={y} width="80" height="18" rx="3" fill="currentColor" opacity="0.1" />
      ))}
      {/* Cells — filled or empty */}
      {rows.map((y, ri) =>
        cols.map((x, ci) => (
          <rect key={`${ri}-${ci}`} x={x - 40} y={y} width="80" height="18" rx="3"
            fill="currentColor" opacity={(ri + ci) % 3 === 0 ? 0.18 : 0.06} />
        ))
      )}
      {/* Check marks on filled cells */}
      {[[160,40],[280,90],[400,40],[400,140],[520,90]].map(([x,y]) => (
        <text key={`${x}-${y}`} x={x - 4} y={y + 13} fontSize="10" fill="currentColor" opacity="0.5">✓</text>
      ))}
    </svg>
  );
}

function BusinessModelBg() {
  // Node-connection diagram: value prop in center, connected to customer segments, revenue streams, channels
  const nodes = [
    { cx: 280, cy: 110, r: 28, label: 'Value' },       // center
    { cx: 100, cy: 50,  r: 18, label: 'B2B' },          // top-left
    { cx: 100, cy: 110, r: 18, label: 'B2C' },          // mid-left
    { cx: 100, cy: 170, r: 18, label: 'SMB' },          // bottom-left
    { cx: 460, cy: 50,  r: 18, label: 'SaaS' },         // top-right
    { cx: 460, cy: 110, r: 18, label: 'Usage' },        // mid-right
    { cx: 460, cy: 170, r: 18, label: 'One-off' },      // bottom-right
  ];
  const edges = [
    [280, 110, 100, 50],
    [280, 110, 100, 110],
    [280, 110, 100, 170],
    [280, 110, 460, 50],
    [280, 110, 460, 110],
    [280, 110, 460, 170],
  ];
  return (
    <svg viewBox="0 0 560 220" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="currentColor" strokeWidth="1" strokeDasharray="5 4" opacity="0.18" />
      ))}
      {nodes.map(({ cx, cy, r }) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r}
          stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.08" />
      ))}
      {/* Center ring emphasis */}
      <circle cx="280" cy="110" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      <circle cx="280" cy="110" r="20" fill="currentColor" opacity="0.1" />
      {/* Left label: Segments, Right label: Revenue */}
      <rect x="20" y="0" width="60" height="14" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="480" y="0" width="70" height="14" rx="3" fill="currentColor" opacity="0.12" />
    </svg>
  );
}

function RoadmapBg() {
  // Winding path with milestone markers across 3 phases
  const milestones = [
    { cx: 60,  cy: 60  },
    { cx: 160, cy: 100 },
    { cx: 260, cy: 60  },
    { cx: 360, cy: 100 },
    { cx: 460, cy: 60  },
  ];
  return (
    <svg viewBox="0 0 560 220" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Phase bands */}
      {[0, 187, 374].map((x, i) => (
        <rect key={i} x={x} y="0" width="186" height="220"
          fill="currentColor" opacity={i % 2 === 0 ? 0.03 : 0.06} />
      ))}
      {/* Winding path */}
      <path
        d="M20,60 C80,60 120,100 180,100 C240,100 280,60 340,60 C400,60 440,100 500,100 C530,100 545,80 560,80"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2"
      />
      {/* Milestone dots */}
      {milestones.map(({ cx, cy }) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="10" fill="currentColor" opacity="0.12" />
          <circle cx={cx} cy={cy} r="4"  fill="currentColor" opacity="0.35" />
        </g>
      ))}
      {/* Week bars below path */}
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={20 + i * 44} y="145" width="36" height="10" rx="3"
          fill="currentColor" opacity={i < 4 ? 0.2 : 0.07} />
      ))}
      <rect x="20" y="165" width="160" height="6" rx="3" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function WorkspaceBg() {
  const columns = [
    { x: 20, label: 'Todo', cards: [30, 80, 130] },
    { x: 200, label: 'In Progress', cards: [30, 80] },
    { x: 380, label: 'Done', cards: [30, 80, 130, 180] },
  ];
  return (
    <svg viewBox="0 0 560 220" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {columns.map(({ x, cards }) => (
        <g key={x}>
          {/* Column header */}
          <rect x={x} y="0" width="155" height="20" rx="4" fill="currentColor" opacity="0.15" />
          {/* Cards */}
          {cards.map((y) => (
            <g key={y}>
              <rect x={x} y={y} width="155" height="38" rx="6" fill="currentColor" opacity="0.08" />
              {/* Card content lines */}
              <rect x={x + 10} y={y + 10} width="80" height="6" rx="2" fill="currentColor" opacity="0.2" />
              <rect x={x + 10} y={y + 22} width="50" height="5" rx="2" fill="currentColor" opacity="0.12" />
              {/* Avatar dot */}
              <circle cx={x + 140} cy={y + 19} r="6" fill="currentColor" opacity="0.15" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ─── Features ─────────────────────────────────────────────────

const features = [
  {
    id: 'viability',
    title: 'Viability Assessment',
    icon: BarChart2,
    summary: 'Go, cautious, or avoid — backed by data.',
    description:
      'Shark scores your idea on market demand, competition level, execution complexity, and revenue potential. You get a clear verdict so you can decide fast — not after months of building.',
    background: <LineGraphBg />,
  },
  {
    id: 'market',
    title: 'Market Analysis',
    icon: Users,
    summary: 'Know your customer before you build.',
    description:
      'Understand who your target customer is, what pain they have, and how big the market opportunity really is. Shark breaks it down by segment so you stop guessing and start validating.',
    background: <BarChartBg />,
  },
  {
    id: 'competitors',
    title: 'Competitor Breakdown',
    icon: Swords,
    summary: 'See the landscape. Find your gap.',
    description:
      "Shark identifies key competitors, maps their strengths and weaknesses, and surfaces positioning gaps you can exploit. Know who you're up against before you spend a dollar.",
    background: <CompetitorGridBg />,
  },
  {
    id: 'business-model',
    title: 'Business Model',
    icon: Briefcase,
    summary: 'How you make money — made clear.',
    description:
      'Shark recommends the best-fit business model for your idea based on your market, stage, and goals. Includes pricing strategy, revenue streams, and key assumptions to test first.',
    background: <BusinessModelBg />,
  },
  {
    id: 'execution',
    title: 'Execution Plan',
    icon: Rocket,
    summary: 'A 90-day plan, ready on day one.',
    description:
      'Every report ends with a structured 90-day roadmap — what to build, validate, and launch. Prioritised by impact so you always know the next move, not just the big picture.',
    background: <RoadmapBg />,
  },
  {
    id: 'workspace',
    title: 'Workspace',
    icon: CheckSquare,
    summary: 'From report to execution in one place.',
    description:
      'Tasks, milestones, assumption tracker, and notes — all linked to your report. Shark keeps your analysis and your execution in the same place so nothing gets lost between insight and action.',
    background: <WorkspaceBg />,
  },
];

// ─── Component ────────────────────────────────────────────────

export function FeatureDockSection() {
  const [activeId, setActiveId] = useState<string>(features[0].id);

  const active = features.find((f) => f.id === activeId) ?? features[0];

  return (
    <section id="features" className="py-28 lg:py-36 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">

        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need to decide and act
          </h2>
          <p className="text-lg text-muted-foreground">
            Hover each feature to explore.
          </p>
        </div>

        {/* Dock */}
        <div className="w-full flex justify-center">
          <Dock magnification={72} panelHeight={96} distance={160} className="bg-transparent border-none shadow-none px-8 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} onMouseEnter={() => setActiveId(feature.id)}>
                  <DockItem
                    className={`aspect-square rounded-2xl cursor-pointer transition-colors ${
                      activeId === feature.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <DockLabel>{feature.title}</DockLabel>
                    <DockIcon>
                      <Icon
                        className={`h-full w-full ${
                          activeId === feature.id
                            ? 'text-primary-foreground'
                            : 'text-foreground/70'
                        }`}
                      />
                    </DockIcon>
                  </DockItem>
                </div>
              );
            })}
          </Dock>
        </div>

        {/* Info panel */}
        <div className="w-full relative min-h-[200px]">

          {/* Background illustrations — crossfade independently */}
          <AnimatePresence>
            <motion.div
              key={`bg-${active.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 right-0 text-foreground pointer-events-none"
              style={{
                bottom: '-80px',
                maskImage:
                  'radial-gradient(ellipse 90% 75% at 50% 35%, black 15%, transparent 70%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 90% 75% at 50% 35%, black 15%, transparent 70%)',
              }}
            >
              {active.background}
            </motion.div>
          </AnimatePresence>

          {/* Bottom fade — always present, never animates */}
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{
              bottom: '-80px',
              background:
                'linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 50%, transparent) 40%, transparent 70%)',
            }}
          />

          {/* Content — animates separately */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 p-8 space-y-3"
            >
              {/* Subtle frosted backing — sits behind text, on top of SVG */}
              <div className="absolute inset-0 rounded-xl bg-background/40 backdrop-blur-[2px] -z-10" />
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = active.icon;
                  return (
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                  );
                })()}
                <div>
                  <h3 className="font-semibold text-lg">{active.title}</h3>
                  <p className="text-sm text-muted-foreground">{active.summary}</p>
                </div>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
