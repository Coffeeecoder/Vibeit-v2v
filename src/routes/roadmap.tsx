import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { generateRoadmap, type Roadmap } from "@/lib/career.functions";
import { Loader2, Sparkles, MapPin, CheckCircle2, Circle, Wand2 } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "AI Career Roadmap · NextHer" },
      { name: "description", content: "A personalized week-by-week career roadmap crafted for your dream role." },
    ],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const [form, setForm] = useState({
    currentRole: "Frontend Engineer",
    dreamRole: "Staff ML Engineer",
    skills: "React, TypeScript, Python basics",
    experience: "3 years",
    timeframe: "6 months",
  });
  const [loading, setLoading] = useState(false);
  const [rm, setRm] = useState<Roadmap | null>(null);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true); setError(null); setDone(new Set());
    try {
      const r = await generateRoadmap({ data: form });
      setRm(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  }

  const progress = rm ? Math.round((done.size / rm.milestones.length) * 100) : 0;

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty" />
        <div className="absolute left-[6%] bottom-[10%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty-slow" />
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"><MapPin className="h-3.5 w-3.5 text-primary" /> AI Career Roadmap</span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">Your path, <span className="text-gradient italic">plotted</span>.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Aura designs a weekly roadmap — skills, projects, mentors, applications — that adapts as you grow.</p>
        </header>

        <div className="glass-strong grid gap-3 rounded-3xl p-5 md:grid-cols-5">
          {(["currentRole","dreamRole","skills","experience","timeframe"] as const).map((k) => (
            <label key={k} className="block">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.replace(/([A-Z])/g," $1")}</span>
              <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="mt-1 w-full rounded-2xl bg-white/80 px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary/40" />
            </label>
          ))}
          <div className="md:col-span-5 flex items-center justify-between">
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button onClick={run} disabled={loading} className="btn-magnetic ml-auto text-sm disabled:opacity-60">
              {loading ? (<><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Building…</>) : (<><Wand2 className="mr-2 inline h-4 w-4" /> Generate roadmap</>)}
            </button>
          </div>
        </div>

        {rm && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl">{rm.title}</h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{rm.overview}</p>
              </div>
              <div className="glass rounded-2xl px-4 py-3 text-sm">
                <p className="text-xs text-muted-foreground">Progress</p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="font-display text-2xl text-gradient">{progress}%</span>
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-white/70">
                    <div className="h-full rounded-full bg-[var(--gradient-primary)] transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative space-y-4 border-l-2 border-dashed border-primary/30 pl-6">
              {rm.milestones.map((m, i) => {
                const isDone = done.has(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="relative">
                    <button
                      onClick={() => setDone((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                      className="absolute -left-[35px] top-4 grid h-7 w-7 place-items-center rounded-full bg-white ring-2 ring-primary/30 transition hover:ring-primary"
                    >
                      {isDone ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                    </button>
                    <div className={`rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)] transition ${isDone ? "opacity-70" : ""}`}>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-blush/60 px-2 py-0.5 font-semibold text-charcoal">{m.week}</span>
                        <span className="rounded-full bg-lavender/60 px-2 py-0.5 font-semibold text-charcoal">{m.category}</span>
                      </div>
                      <h3 className={`mt-2 font-display text-xl ${isDone ? "line-through" : ""}`}>{m.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                      <ul className="mt-3 space-y-1.5">
                        {m.tasks.map((t) => (
                          <li key={t} className="flex gap-2 text-sm"><Sparkles className="mt-0.5 h-3.5 w-3.5 text-primary" />{t}</li>
                        ))}
                      </ul>
                      {m.resources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.resources.map((r) => (
                            <span key={r.name} className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] ring-1 ring-border">{r.name} · {r.type}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
