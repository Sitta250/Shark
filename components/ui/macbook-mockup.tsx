// Static MacBook hero mockup — no client JS needed

function AppScreen() {
  const scores = [
    { label: "Viability", pct: 87 },
    { label: "Market size", pct: 74 },
    { label: "Competition", pct: 52 },
    { label: "Execution", pct: 68 },
  ]

  const tasks = [
    { text: "Validate core assumptions", done: true },
    { text: "Build MVP feature set", done: false },
    { text: "Launch beta to 50 users", done: false },
  ]

  return (
    <div className="flex h-full overflow-hidden bg-[#f9f9f9] text-[#111]">
      {/* ── Sidebar ── */}
      <div className="w-[18%] shrink-0 bg-white border-r border-[#e5e5e5] flex flex-col py-3 px-2 gap-0.5">
        {/* Logo */}
        <div className="flex items-center gap-1.5 px-1.5 mb-3">
          <div className="w-4 h-4 rounded-[3px] bg-[#111] flex items-center justify-center">
            <span className="text-white text-[6px] font-bold leading-none">S</span>
          </div>
          <span className="text-[8px] font-semibold tracking-tight">Shark</span>
        </div>
        {[
          { label: "Dashboard", active: false },
          { label: "AI Meal Planner", active: true },
          { label: "Social Media Bot", active: false },
          { label: "Marketplace", active: false },
        ].map(({ label, active }) => (
          <div
            key={label}
            className={`px-1.5 py-[4px] rounded-[4px] text-[6.5px] truncate ${
              active
                ? "bg-[#111] text-white font-medium"
                : "text-[#888]"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* ── Main ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#e5e5e5] bg-white">
          <div>
            <p className="text-[8.5px] font-semibold leading-none">AI Meal Planning SaaS</p>
            <p className="text-[6px] text-[#888] mt-0.5 leading-none">Report · Generated 2 min ago</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-[2px] rounded-full bg-[#dcfce7] text-[#16a34a] text-[6px] font-semibold leading-none">
              GO
            </span>
            <span className="px-1.5 py-[2px] rounded-full bg-[#f0f0f0] text-[#555] text-[6px] font-medium leading-none">
              Score: 87 / 100
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-2.5 space-y-2">
          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: "Market Size", value: "$4.2B", sub: "TAM" },
              { label: "Competitors", value: "14", sub: "Identified" },
              { label: "Revenue Pot.", value: "High", sub: "Recurring SaaS" },
              { label: "MVP Scope", value: "8 wks", sub: "To launch" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white border border-[#e5e5e5] rounded-[5px] p-2">
                <p className="text-[5.5px] text-[#888] leading-none">{label}</p>
                <p className="text-[9px] font-bold mt-1 leading-none">{value}</p>
                <p className="text-[5px] text-[#aaa] mt-0.5 leading-none">{sub}</p>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-2 gap-1.5">
            {/* Score breakdown */}
            <div className="bg-white border border-[#e5e5e5] rounded-[5px] p-2.5 space-y-2">
              <p className="text-[7px] font-semibold leading-none">Analysis scores</p>
              {scores.map(({ label, pct }) => (
                <div key={label} className="space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-[5.5px] text-[#888]">{label}</span>
                    <span className="text-[5.5px] font-medium">{pct}%</span>
                  </div>
                  <div className="h-[3px] rounded-full bg-[#f0f0f0] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#111]"
                      style={{ width: `${pct}%`, opacity: 0.7 + pct / 333 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 90-day plan */}
            <div className="bg-white border border-[#e5e5e5] rounded-[5px] p-2.5 space-y-2">
              <p className="text-[7px] font-semibold leading-none">90-day plan</p>
              {tasks.map(({ text, done }) => (
                <div key={text} className="flex items-start gap-1.5">
                  <div
                    className={`shrink-0 w-[8px] h-[8px] rounded-full mt-[1px] border flex items-center justify-center ${
                      done
                        ? "bg-[#111] border-[#111]"
                        : "border-[#ccc] bg-white"
                    }`}
                  >
                    {done && (
                      <svg viewBox="0 0 6 6" className="w-[4px] h-[4px]" fill="none">
                        <path d="M1 3l1.5 1.5L5 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-[5.5px] leading-[1.3] ${done ? "text-[#aaa] line-through" : "text-[#444]"}`}>
                    {text}
                  </span>
                </div>
              ))}
              <div className="mt-1 pt-1.5 border-t border-[#f0f0f0]">
                <div className="flex justify-between mb-0.5">
                  <span className="text-[5.5px] text-[#888]">Progress</span>
                  <span className="text-[5.5px] font-medium">33%</span>
                </div>
                <div className="h-[3px] rounded-full bg-[#f0f0f0] overflow-hidden">
                  <div className="h-full rounded-full bg-[#111] w-[33%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Executive summary strip */}
          <div className="bg-[#111] rounded-[5px] p-2.5">
            <p className="text-[6px] font-semibold text-white/90 leading-none mb-1">Executive summary</p>
            <p className="text-[5.5px] text-white/50 leading-[1.5]">
              Strong market opportunity in the $4.2B AI productivity space. Differentiate on niche meal-planning workflows. Recommend freemium → SaaS at $19/mo. Key risk: retention after first week.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MacbookMockup() {
  return (
    <div
      className="relative w-full max-w-[560px] select-none"
      style={{
        filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.18)) drop-shadow(0 8px 24px rgba(0,0,0,0.10))",
      }}
    >
      {/* ── Lid ── */}
      <div
        className="relative rounded-[10px] overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2a2a2c 0%, #1c1c1e 60%)",
          padding: "10px 10px 6px",
        }}
      >
        {/* Camera dot */}
        <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#3a3a3c]" />

        {/* Screen */}
        <div
          className="rounded-[4px] overflow-hidden"
          style={{ aspectRatio: "16 / 10" }}
        >
          <AppScreen />
        </div>
      </div>

      {/* ── Hinge line ── */}
      <div className="h-[2px] bg-[#141416]" />

      {/* ── Base ── */}
      <div
        className="h-[22px] relative"
        style={{
          background: "linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 100%)",
          clipPath: "polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)",
        }}
      >
        {/* Trackpad notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[2px]"
          style={{
            width: "28%",
            height: "3px",
            background: "linear-gradient(180deg, #1c1c1e, #2a2a2c)",
          }}
        />
      </div>
    </div>
  )
}
