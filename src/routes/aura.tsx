import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { AuraAvatar } from "@/components/AuraAvatar";
import { FileText, Target, Map as MapIcon, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/aura")({
  head: () => ({
    meta: [
      { title: "Ask_Her Studio · NextHer" },
      { name: "description", content: "Your AI career sister. Resume analysis, skill gap, roadmap, and interview coaching — one connected studio." },
      { property: "og:title", content: "Ask_Her Studio · NextHer" },
      { property: "og:description", content: "Resume → Roadmap → Mentors → Interviews. One AI-powered career studio for women." },
    ],
  }),
  component: AuraStudio,
});

type Tab = "overview" | "resume" | "skills" | "roadmap" | "interview";

const tabs: { id: Tab; label: string; icon: React.ReactNode; to?: string }[] = [
  { id: "overview", label: "Overview", icon: <Sparkles className="h-4 w-4" /> },
  { id: "resume", label: "Resume Analysis", icon: <FileText className="h-4 w-4" />, to: "/resume" },
  { id: "skills", label: "Skill Gap", icon: <Target className="h-4 w-4" />, to: "/skills" },
  { id: "roadmap", label: "Roadmap", icon: <MapIcon className="h-4 w-4" />, to: "/roadmap" },
  { id: "interview", label: "Interview Coach", icon: <MessageSquare className="h-4 w-4" />, to: "/interview" },
];

function AuraStudio() {
  const [tab, setTab] = useState<Tab>("overview");
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty-slow" />
        <div className="absolute right-[6%] top-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty" />
      </div>

      <main className="mx-auto max-w-6xl px-6 pt-36 pb-24">
        {/* header */}
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <AuraAvatar size={128} />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-charcoal/70">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Ask_Her Studio
            </span>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">
              Hi, I'm <span className="text-gradient italic">Ask_Her</span>.
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Upload your resume and I'll analyze it, spot the gaps, draft your roadmap, and coach
              you through interviews — all in one studio.
            </p>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-white/60 pb-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                tab === t.id
                  ? "bg-white text-charcoal shadow-[var(--shadow-soft)]"
                  : "text-muted-foreground hover:text-charcoal"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="mt-10">
          {tab === "overview" ? (
            <Overview />
          ) : (
            <div className="glass-strong rounded-3xl p-10 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white text-primary shadow-[var(--shadow-soft)]">
                {active.icon}
              </div>
              <h2 className="font-display text-3xl">{active.label}</h2>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Open the full {active.label.toLowerCase()} workspace — everything you build here feeds into your roadmap.
              </p>
              {active.to && (
                <Link to={active.to} className="btn-magnetic mt-6 inline-flex items-center gap-2">
                  Open workspace <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Overview() {
  const steps = [
    { n: 1, t: "Resume Upload", d: "ATS score & instant feedback", to: "/resume" },
    { n: 2, t: "Skill Gap", d: "Where you are vs. where you're going", to: "/skills" },
    { n: 3, t: "Career Readiness", d: "One score, tracked weekly", to: "/aura" },
    { n: 4, t: "Roadmap", d: "3 / 6 / 12 month plan", to: "/roadmap" },
    { n: 5, t: "Weekly Goals", d: "Bite-sized, Duolingo-style", to: "/roadmap" },
    { n: 6, t: "Interview Coach", d: "Mock rounds & confidence score", to: "/interview" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <div className="glass-strong rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">The Flow</p>
        <h2 className="mt-2 font-display text-3xl">One connected journey</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {steps.map((s) => (
            <Link
              key={s.n}
              to={s.to}
              className="group flex items-center gap-3 rounded-2xl bg-white/80 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-primary)] font-display text-sm text-primary-foreground">
                {s.n}
              </span>
              <div className="flex-1">
                <p className="font-medium text-charcoal">{s.t}</p>
                <p className="text-xs text-muted-foreground">{s.d}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Career Readiness</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-5xl text-gradient">78</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/70">
            <div className="h-full w-[78%] rounded-full bg-[var(--gradient-primary)]" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">+6 this week · Keep going 🌸</p>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Ask_Her says</p>
          <div className="mt-3 space-y-2 text-sm">
            {[
              "🌸 Your resume is strong on ML — let's add a systems-design project.",
              "✨ 3 new mentors match your Staff-track goals.",
              "💫 Interview coach: 2 mock rounds recommended before Friday.",
            ].map((m) => (
              <div key={m} className="rounded-2xl bg-white/80 px-3 py-2 text-charcoal/85">
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
