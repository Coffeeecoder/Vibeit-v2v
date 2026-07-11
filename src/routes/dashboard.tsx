import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Sparkles, Calendar, Target, Award, TrendingUp, FileText, MessageCircle, Zap } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · NextHer" },
      { name: "description", content: "Your personal AI career command center — mentors, applications, confidence, community." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[6%] top-[10%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty" />
        <div className="absolute left-[8%] bottom-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty-slow" />
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Good morning, Bhavikia Sharma ✨</p>
            <h1 className="font-display text-4xl md:text-5xl">Today looks <span className="text-gradient italic">promising</span>.</h1>
          </div>
          <div className="glass flex items-center gap-3 rounded-full px-4 py-2 text-sm">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground text-xs font-bold">78</span>
            Confidence score · <span className="text-primary font-semibold">+6 this week</span>
          </div>
        </header>

        <div className="grid auto-rows-[minmax(0,auto)] grid-cols-6 gap-4">
          <Tile className="col-span-6 md:col-span-4 md:row-span-2" accent="linear-gradient(135deg, oklch(0.94 0.06 15), oklch(0.9 0.07 340))">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Next mentor session</p>
                <h3 className="mt-1 font-display text-3xl">Rhea Okonkwo</h3>
                <p className="text-sm text-muted-foreground">Director of Engineering · Meridian</p>
              </div>
              <div className="text-5xl">🕊️</div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <MiniStat icon={<Calendar className="h-4 w-4" />} label="Tomorrow" value="10:30 AM" />
              <MiniStat icon={<Sparkles className="h-4 w-4" />} label="Topic" value="IC → Manager" />
              <MiniStat icon={<Target className="h-4 w-4" />} label="Match" value="97%" />
            </div>
            <div className="mt-6 flex gap-2">
              <button className="btn-magnetic text-sm">Join session</button>
              <button className="btn-ghost-lux text-sm">Reschedule</button>
            </div>
          </Tile>

          <Tile className="col-span-3 md:col-span-2" accent="linear-gradient(135deg, oklch(0.92 0.06 305), oklch(0.94 0.05 260))">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Resume score</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-5xl text-gradient">92</span>
              <span className="mb-2 text-sm text-muted-foreground">/ 100</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/70">
              <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full rounded-full bg-[var(--gradient-primary)]" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="h-3.5 w-3.5" /> AI suggests 2 tweaks
            </div>
          </Tile>

          <Tile className="col-span-3 md:col-span-2" accent="linear-gradient(135deg, oklch(0.94 0.06 85), oklch(0.94 0.05 40))">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Streak</p>
            <div className="mt-3 font-display text-5xl">🔥 14</div>
            <p className="text-xs text-muted-foreground">days of career action</p>
            <div className="mt-3 flex gap-1">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="h-6 flex-1 rounded-md bg-[oklch(0.9_0.09_60)]" style={{ opacity: 0.4 + (i / 14) * 0.6 }} />
              ))}
            </div>
          </Tile>

          <Tile className="col-span-6 md:col-span-3" accent="linear-gradient(135deg, oklch(0.94 0.05 200), oklch(0.94 0.05 260))">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Applications</p>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-4 space-y-3">
              {apps.map((a) => (
                <div key={a.co} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl text-lg" style={{ background: a.g }}>{a.e}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.co}</p>
                    <p className="text-xs text-muted-foreground">{a.role}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${a.color}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </Tile>

          <Tile className="col-span-3 md:col-span-2" accent="linear-gradient(135deg, oklch(0.94 0.06 20), oklch(0.92 0.06 85))">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Achievement Badges</p>
            <div className="relative mt-4">
              <div className="grid grid-cols-3 gap-2 blur-md select-none pointer-events-none" aria-hidden>
                {["🌸","⚡","💫","🌷","🎯","🦋"].map((b, i) => (
                  <div key={i} className="grid aspect-square place-items-center rounded-2xl bg-white/70 text-2xl shadow-[var(--shadow-soft)]">{b}</div>
                ))}
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-charcoal shadow-[var(--shadow-soft)] backdrop-blur">
                  ✨ Coming Soon
                </span>
              </div>
            </div>
          </Tile>

          <Tile className="col-span-3 md:col-span-1" accent="linear-gradient(135deg, oklch(0.94 0.06 305), oklch(0.94 0.05 15))">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Unread</p>
            <div className="mt-3 flex items-center gap-2">
              <MessageCircle className="h-8 w-8 text-primary" />
              <span className="font-display text-4xl">7</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">from mentors & recruiters</p>
          </Tile>

          <Tile className="col-span-6 md:col-span-4" accent="linear-gradient(135deg, oklch(0.94 0.05 260), oklch(0.94 0.06 305))">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Confidence over time</p>
              <span className="text-xs text-primary font-semibold">↗ Trending up</span>
            </div>
            <svg viewBox="0 0 400 120" className="mt-4 w-full">
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.14 12)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="oklch(0.78 0.14 12)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6 }}
                d="M0 90 C 40 80, 80 70, 120 72 S 200 40, 240 50 S 340 20, 400 25"
                fill="none"
                stroke="oklch(0.72 0.13 12)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path d="M0 90 C 40 80, 80 70, 120 72 S 200 40, 240 50 S 340 20, 400 25 L 400 120 L 0 120 Z" fill="url(#g)" />
            </svg>
          </Tile>

          <Tile className="col-span-6 md:col-span-2" accent="linear-gradient(135deg, oklch(0.94 0.06 15), oklch(0.94 0.06 85))">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Learning path</p>
            <div className="mt-3 space-y-2">
              {[
                { t: "Systems design", p: 70 },
                { t: "Managerial 1:1s", p: 45 },
                { t: "Negotiation", p: 88 },
              ].map((l) => (
                <div key={l.t}>
                  <div className="mb-1 flex justify-between text-xs"><span>{l.t}</span><span className="text-muted-foreground">{l.p}%</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/70">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${l.p}%` }} transition={{ duration: 1.2 }} className="h-full rounded-full bg-[var(--gradient-primary)]" />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Zap className="h-3 w-3" /> Continue learning</button>
          </Tile>
        </div>
      </main>
    </div>
  );
}

function Tile({ children, className = "", accent }: { children: React.ReactNode; className?: string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-float)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-70 blur-2xl" style={{ background: accent }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 p-3">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">{icon}{label}</div>
      <p className="mt-1 text-sm font-semibold text-charcoal">{value}</p>
    </div>
  );
}

const apps = [
  { co: "Northwind Labs", role: "Sr. ML Engineer", e: "🌿", g: "linear-gradient(135deg, oklch(0.92 0.06 150), oklch(0.9 0.06 200))", status: "Interview", color: "bg-[oklch(0.9_0.09_150)] text-[oklch(0.35_0.1_150)]" },
  { co: "Halo Robotics", role: "iOS Engineer", e: "🌷", g: "linear-gradient(135deg, oklch(0.94 0.06 15), oklch(0.9 0.06 40))", status: "Offer", color: "bg-[var(--gradient-primary)] text-white" },
  { co: "Meridian", role: "Staff PM", e: "🕊️", g: "linear-gradient(135deg, oklch(0.9 0.06 305), oklch(0.92 0.05 260))", status: "Applied", color: "bg-white text-charcoal border border-border" },
];
