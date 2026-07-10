import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Sparkles, TrendingUp, Award, Calendar, Target, FileText, MessageCircle, Rocket } from "lucide-react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "AI Insights · NextHer" },
      { name: "description", content: "Your dynamic AI career strategist — readiness, growth, next actions, and trending skills in your field." },
    ],
  }),
  component: InsightsPage,
});

const scores = [
  { label: "Resume health", value: 92, hint: "Top 8% for your role" },
  { label: "ATS score", value: 88, hint: "+4 this week" },
  { label: "Career readiness", value: 74, hint: "Level up: negotiation" },
  { label: "Interview readiness", value: 66, hint: "3 mocks recommended" },
];

const trending = ["LangGraph", "RAG evaluation", "Vector DB tuning", "TypeScript 5.6", "Design systems", "System design"];

const nextActions = [
  { icon: <FileText className="h-4 w-4" />, title: "Rewrite 2 weak bullets", route: "/resume", cta: "Open analyzer" },
  { icon: <Target className="h-4 w-4" />, title: "Close the ML skill gap", route: "/skills", cta: "Analyze" },
  { icon: <MessageCircle className="h-4 w-4" />, title: "Prep for Stripe onsite", route: "/interview", cta: "Start coach" },
  { icon: <Rocket className="h-4 w-4" />, title: "Ship a portfolio project", route: "/roadmap", cta: "See roadmap" },
];

function InsightsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty" />
        <div className="absolute left-[6%] bottom-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty-slow" />
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"><Sparkles className="h-3.5 w-3.5 text-primary" /> AI Career Insights</span>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">You are <span className="text-gradient italic">on trajectory</span>.</h1>
          </div>
          <div className="glass rounded-2xl px-4 py-3 text-sm">
            <p className="text-xs text-muted-foreground">Trending in your field</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {trending.slice(0,3).map((t) => <span key={t} className="rounded-full bg-white/70 px-2.5 py-0.5 text-xs ring-1 ring-border">{t}</span>)}
            </div>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          {scores.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blush/60 opacity-70 blur-2xl" />
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-display text-4xl text-gradient">{s.value}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blush/40">
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.value}%` }} transition={{ duration: 1.2 }} className="h-full rounded-full bg-[var(--gradient-primary)]" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{s.hint}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)] md:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Recommended next actions</p>
              <span className="text-xs text-primary font-semibold">Aura suggests</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {nextActions.map((a) => (
                <Link key={a.title} to={a.route} className="group flex items-center gap-3 rounded-2xl bg-blush/20 p-3 transition hover:-translate-y-0.5 hover:bg-blush/40">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-[var(--shadow-soft)] text-primary">{a.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-primary group-hover:underline">{a.cta} →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[linear-gradient(135deg,oklch(0.94_0.05_260),oklch(0.94_0.06_305))] p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Upcoming</p>
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="rounded-2xl bg-white/70 p-3"><p className="font-medium">Mentor call · Rhea Okonkwo</p><p className="text-xs text-muted-foreground">Tomorrow, 10:30 AM</p></li>
              <li className="rounded-2xl bg-white/70 p-3"><p className="font-medium">Stripe recruiter screen</p><p className="text-xs text-muted-foreground">Thu, 3:00 PM</p></li>
              <li className="rounded-2xl bg-white/70 p-3"><p className="font-medium">Grace Hopper apply deadline</p><p className="text-xs text-muted-foreground">Sun</p></li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"><TrendingUp className="h-4 w-4 text-primary" /> Skill growth (30d)</div>
            <svg viewBox="0 0 400 120" className="w-full">
              <defs>
                <linearGradient id="ig" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.14 12)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="oklch(0.78 0.14 12)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 95 C 60 88, 120 80, 180 60 S 300 30, 400 20 L 400 120 L 0 120 Z" fill="url(#ig)" />
              <path d="M0 95 C 60 88, 120 80, 180 60 S 300 30, 400 20" fill="none" stroke="oklch(0.72 0.13 12)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"><Award className="h-4 w-4 text-primary" /> Recent wins</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span>🌸</span> Booked 3 mentor sessions</li>
              <li className="flex items-center gap-2"><span>⚡</span> Resume score +11</li>
              <li className="flex items-center gap-2"><span>💫</span> Completed React perf module</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"><Sparkles className="h-4 w-4 text-primary" /> Trending skills</div>
            <div className="flex flex-wrap gap-1.5">
              {trending.map((t) => <span key={t} className="rounded-full bg-blush/40 px-2.5 py-1 text-xs">{t}</span>)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
