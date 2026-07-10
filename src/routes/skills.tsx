import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { analyzeSkillGap, type SkillGap } from "@/lib/career.functions";
import { Loader2, Target, Wand2, BookOpen, Award, Rocket } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "AI Skill Gap · NextHer" },
      { name: "description", content: "Compare your current skills to any target role. See what to learn, in what order, and how long it takes." },
    ],
  }),
  component: SkillsPage,
});

const ROLES = ["Software Engineer","Frontend Engineer","ML Engineer","Data Scientist","Product Manager","UI/UX Designer","Cybersecurity Analyst","DevOps Engineer","iOS Engineer","Staff Engineer"];

function SkillsPage() {
  const [role, setRole] = useState(ROLES[2]);
  const [skills, setSkills] = useState("React, TypeScript, Node.js, Python basics, SQL");
  const [loading, setLoading] = useState(false);
  const [gap, setGap] = useState<SkillGap | null>(null);

  async function run() {
    setLoading(true);
    try {
      const g = await analyzeSkillGap({ data: { targetRole: role, currentSkills: skills } });
      setGap(g);
    } finally { setLoading(false); }
  }

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[10%] top-[8%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty" />
        <div className="absolute left-[8%] bottom-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty-slow" />
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"><Target className="h-3.5 w-3.5 text-primary" /> AI Skill Gap</span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">Close the gap to <span className="text-gradient italic">your dream role</span>.</h1>
        </header>

        <div className="glass-strong grid gap-3 rounded-3xl p-5 md:grid-cols-[1fr_2fr_auto] md:items-end">
          <label className="block">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Target role</span>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full rounded-2xl bg-white/80 px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary/40">
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Your current skills</span>
            <input value={skills} onChange={(e) => setSkills(e.target.value)} className="mt-1 w-full rounded-2xl bg-white/80 px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary/40" />
          </label>
          <button onClick={run} disabled={loading} className="btn-magnetic text-sm disabled:opacity-60">
            {loading ? (<><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Analyzing…</>) : (<><Wand2 className="mr-2 inline h-4 w-4" /> Analyze</>)}
          </button>
        </div>

        {gap && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
            <div className="glass-strong rounded-3xl p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Readiness for {gap.targetRole}</p>
                  <p className="mt-1 font-display text-6xl text-gradient">{gap.overallReadiness}%</p>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-xs text-muted-foreground">Aura believes you're closer than you think ✨</p>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
                <motion.div initial={{ width: 0 }} animate={{ width: `${gap.overallReadiness}%` }} transition={{ duration: 1.2 }} className="h-full rounded-full bg-[var(--gradient-primary)]" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Mastered</p>
                <div className="mt-3 space-y-2">
                  {gap.mastered.map((s) => (
                    <div key={s.skill}>
                      <div className="mb-1 flex justify-between text-sm"><span>{s.skill}</span><span className="text-muted-foreground">{s.level}%</span></div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-blush/40">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-[var(--gradient-primary)]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-[linear-gradient(135deg,oklch(0.96_0.04_15),oklch(0.95_0.04_340))] p-5 shadow-[var(--shadow-soft)]">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Skills to learn</p>
                <div className="mt-3 space-y-2">
                  {gap.missing.map((m) => (
                    <div key={m.skill} className="flex items-center justify-between rounded-2xl bg-white/70 p-3 text-sm">
                      <div>
                        <p className="font-medium">{m.skill}</p>
                        <p className="text-xs text-muted-foreground">~{m.estimatedWeeks} weeks</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.priority === "high" ? "bg-primary text-primary-foreground" : m.priority === "medium" ? "bg-gold text-charcoal" : "bg-white ring-1 ring-border"}`}>{m.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <List icon={<Rocket className="h-4 w-4 text-primary" />} title="Learning order" items={gap.learningOrder} />
            <div className="grid gap-4 md:grid-cols-2">
              <List icon={<Rocket className="h-4 w-4 text-primary" />} title="Projects to build" items={gap.projects} />
              <List icon={<Award className="h-4 w-4 text-primary" />} title="Certifications" items={gap.certifications} />
              <List icon={<BookOpen className="h-4 w-4 text-primary" />} title="Books" items={gap.books} />
              <List icon={<Rocket className="h-4 w-4 text-primary" />} title="Practice platforms" items={gap.practicePlatforms} />
              <List icon={<Award className="h-4 w-4 text-primary" />} title="Interview prep" items={gap.interviewResources} />
              <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Courses</p>
                <ul className="space-y-1.5">
                  {gap.courses.map((c) => (
                    <li key={c.name} className="flex items-center justify-between text-sm"><span>{c.name}</span><span className="text-xs text-muted-foreground">{c.platform}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function List({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">{icon}{title}</div>
      <ol className="space-y-1.5">
        {items.map((s, i) => (
          <li key={s} className="flex gap-2 text-sm"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blush/60 text-[10px] font-bold">{i + 1}</span>{s}</li>
        ))}
      </ol>
    </div>
  );
}
