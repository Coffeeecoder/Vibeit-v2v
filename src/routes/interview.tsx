import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { generateInterview, type InterviewSet } from "@/lib/career.functions";
import { Loader2, MessageCircle, Wand2, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "AI Interview Coach · NextHer" },
      { name: "description", content: "Realistic interview questions with strong-answer frameworks, tailored to your role and background." },
    ],
  }),
  component: InterviewPage,
});

function InterviewPage() {
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [company, setCompany] = useState("Stripe");
  const [bg, setBg] = useState("3 years at a fintech, led migration from Angular to React, mentored 4 juniors, shipped a design system.");
  const [set, setSet] = useState<InterviewSet | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  async function run() {
    setLoading(true);
    try {
      const s = await generateInterview({ data: { role, company, background: bg } });
      setSet(s); setOpen(0);
    } finally { setLoading(false); }
  }

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty" />
        <div className="absolute left-[6%] bottom-[10%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty-slow" />
      </div>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-36">
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"><MessageCircle className="h-3.5 w-3.5 text-primary" /> AI Interview Coach</span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">Walk in <span className="text-gradient italic">unshakeable</span>.</h1>
        </header>

        <div className="glass-strong grid gap-3 rounded-3xl p-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="block"><span className="text-[10px] uppercase tracking-wider text-muted-foreground">Role</span>
            <input value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full rounded-2xl bg-white/80 px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary/40" />
          </label>
          <label className="block"><span className="text-[10px] uppercase tracking-wider text-muted-foreground">Company</span>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-2xl bg-white/80 px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary/40" />
          </label>
          <button onClick={run} disabled={loading} className="btn-magnetic text-sm disabled:opacity-60">
            {loading ? (<><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Generating…</>) : (<><Wand2 className="mr-2 inline h-4 w-4" /> Get questions</>)}
          </button>
          <label className="md:col-span-3 block"><span className="text-[10px] uppercase tracking-wider text-muted-foreground">Your background</span>
            <textarea value={bg} onChange={(e) => setBg(e.target.value)} rows={3} className="mt-1 w-full resize-none rounded-2xl bg-white/80 p-3 text-sm outline-none ring-1 ring-border focus:ring-primary/40" />
          </label>
        </div>

        {set && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">Tailored for <span className="font-semibold text-charcoal">{set.role}</span> at <span className="font-semibold text-charcoal">{set.company}</span></p>
            {set.questions.map((q, i) => (
              <div key={i} className="overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-soft)]">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 p-5 text-left">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gradient-primary)] text-sm font-bold text-primary-foreground">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{q.category}</p>
                    <p className="font-medium text-charcoal">{q.question}</p>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="space-y-3 border-t border-border/50 bg-blush/10 px-5 py-4 text-sm">
                    <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Why they ask</p><p className="mt-1 text-charcoal/80">{q.whyAsked}</p></div>
                    <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Strong answer framework</p><p className="mt-1 text-charcoal/80 whitespace-pre-line">{q.strongAnswerFramework}</p></div>
                    <div className="rounded-2xl bg-white p-3"><p className="text-xs font-semibold uppercase tracking-wider text-primary">Example answer</p><p className="mt-1 text-charcoal/80 whitespace-pre-line">{q.exampleAnswer}</p></div>
                  </motion.div>
                )}
              </div>
            ))}

            {set.tips.length > 0 && (
              <div className="rounded-3xl bg-[linear-gradient(135deg,oklch(0.96_0.04_15),oklch(0.95_0.04_340))] p-5">
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Aura's tips</p>
                <ul className="space-y-1.5">{set.tips.map((t) => <li key={t} className="text-sm">✨ {t}</li>)}</ul>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
