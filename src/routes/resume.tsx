import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { analyzeResume, type ResumeReport } from "@/lib/career.functions";
import { FileText, Loader2, Sparkles, Award, AlertCircle, CheckCircle2, TrendingUp, Zap } from "lucide-react";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "AI Resume Analyzer · NextHer" },
      { name: "description", content: "ATS score, keyword gaps, gap recovery mode and rewrite suggestions — powered by Aura." },
    ],
  }),
  component: ResumePage,
});

const SAMPLE = `Aarti Menon\nSoftware Engineer · aarti@example.com\n\nEXPERIENCE\nAcme Corp (2022 - Present) - Software Engineer\n- Worked on APIs\n- Built new features for the dashboard\n- Helped with onboarding new hires\n\nEDUCATION\nB.Tech, Computer Science, IIT Bombay, 2018-2022\n\nSKILLS\nJavaScript, React, Node.js, Python\n`;

function ResumePage() {
  const [text, setText] = useState("");
  const [target, setTarget] = useState("Senior Frontend Engineer");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ResumeReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onFile(f: File | undefined) {
    if (!f) return;
    if (f.type === "text/plain" || f.name.endsWith(".txt") || f.name.endsWith(".md")) {
      setText(await f.text());
    } else {
      setError("For now, please paste your resume text. PDF/DOCX text extraction coming soon.");
    }
  }

  async function run() {
    if (text.trim().length < 20) {
      setError("Paste at least a few lines of your resume.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const r = await analyzeResume({ data: { resumeText: text, targetRole: target } });
      setReport(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty" />
        <div className="absolute left-[6%] bottom-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty-slow" />
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <header className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Resume Analyzer
          </span>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Your resume, <span className="text-gradient italic">reviewed by Aura</span>.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            ATS score, keyword gaps, weak bullet rewrites, and gap-recovery moves — in seconds.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <div className="glass-strong space-y-4 rounded-3xl p-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Target role</label>
              <input value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1 w-full rounded-2xl bg-white/80 px-4 py-2.5 text-sm outline-none ring-1 ring-border focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Resume text</label>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} placeholder="Paste your resume here…" className="mt-1 w-full resize-none rounded-2xl bg-white/80 p-4 text-sm outline-none ring-1 ring-border focus:ring-primary/40" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold ring-1 ring-border hover:shadow-[var(--shadow-soft)]">
                <FileText className="mr-1 inline h-3.5 w-3.5 text-primary" /> Upload .txt
                <input type="file" accept=".txt,.md,text/plain" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
              </label>
              <button onClick={() => setText(SAMPLE)} className="rounded-full bg-white px-4 py-2 text-xs font-semibold ring-1 ring-border hover:shadow-[var(--shadow-soft)]">
                Try sample
              </button>
              <button onClick={run} disabled={loading} className="btn-magnetic ml-auto text-sm disabled:opacity-60">
                {loading ? (<><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Analyzing…</>) : (<><Zap className="mr-2 inline h-4 w-4" /> Analyze</>)}
              </button>
            </div>
            {error && <p className="rounded-2xl bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
          </div>

          <div className="space-y-6">
            {!report && !loading && (
              <div className="glass grid min-h-[400px] place-items-center rounded-3xl p-10 text-center text-muted-foreground">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/70 text-3xl">📄</div>
                  <p className="mt-4 font-display text-2xl text-charcoal">Your report will bloom here</p>
                  <p className="mt-1 text-sm">Paste your resume, pick a target role, and let Aura break it down beautifully.</p>
                </div>
              </div>
            )}
            {loading && (
              <div className="glass grid min-h-[400px] place-items-center rounded-3xl p-10">
                <div className="text-center">
                  <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
                  <p className="mt-4 font-display text-xl">Aura is reading between the lines…</p>
                </div>
              </div>
            )}
            {report && <ReportView r={report} />}
          </div>
        </div>
      </main>
    </div>
  );
}

function ReportView({ r }: { r: ResumeReport }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <Ring label="ATS" value={r.atsScore} accent="linear-gradient(135deg, oklch(0.94 0.06 15), oklch(0.9 0.07 340))" />
        <Ring label="Strength" value={r.strengthScore} accent="linear-gradient(135deg, oklch(0.92 0.06 305), oklch(0.94 0.05 260))" />
        <Ring label="Readable" value={r.readabilityScore} accent="linear-gradient(135deg, oklch(0.94 0.05 200), oklch(0.94 0.05 260))" />
      </div>

      <Card icon={<Sparkles className="h-4 w-4" />} title="Aura's take">
        <p className="text-sm text-charcoal/80">{r.summary}</p>
      </Card>

      {r.gapDetected && (
        <Card icon={<AlertCircle className="h-4 w-4 text-primary" />} title="Gap Recovery Mode" accent>
          <p className="text-sm text-charcoal/80">{r.gapExplanation}</p>
          <ul className="mt-3 space-y-1.5">
            {r.gapRecovery.map((g) => (
              <li key={g} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{g}</li>
            ))}
          </ul>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <ChipCard title="Technical skills" items={r.technicalSkills} />
        <ChipCard title="Soft skills" items={r.softSkills} />
        <ChipCard title="Missing keywords" items={r.missingKeywords} tone="warn" />
        <ChipCard title="Stronger action verbs" items={r.actionVerbs} />
      </div>

      {r.weakBullets.length > 0 && (
        <Card icon={<TrendingUp className="h-4 w-4" />} title="Bullet rewrites">
          <div className="space-y-3">
            {r.weakBullets.map((b, i) => (
              <div key={i} className="rounded-2xl bg-white/70 p-3 text-sm">
                <p className="text-muted-foreground line-through">{b.original}</p>
                <p className="mt-1 text-charcoal">✨ {b.improved}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard title="Formatting" items={r.formatting} />
        <ListCard title="Grammar & writing" items={r.grammar} />
        <ListCard title="Industry recommendations" items={r.industryTips} />
        <ListCard title="Portfolio boosts" items={r.portfolioSuggestions} />
        <ListCard title="Projects to add" items={r.missingProjects} />
        <ListCard title="Certifications to consider" items={r.missingCertifications} />
        <ListCard title="Profile suggestions" items={r.profileSuggestions} />
      </div>

      <button
        onClick={() => {
          const blob = new Blob([JSON.stringify(r, null, 2)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "aura-resume-report.json"; a.click();
          URL.revokeObjectURL(url);
        }}
        className="btn-ghost-lux text-sm"
      >
        <Award className="mr-1 inline h-4 w-4" /> Download report
      </button>
    </motion.div>
  );
}

function Ring({ label, value, accent }: { label: string; value: number; accent: string }) {
  const v = Math.max(0, Math.min(100, value));
  const c = 2 * Math.PI * 42;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-60 blur-2xl" style={{ background: accent }} />
      <div className="relative flex flex-col items-center">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.94 0.02 20)" strokeWidth="10" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none" stroke="oklch(0.72 0.13 12)" strokeWidth="10" strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${c}` }}
            animate={{ strokeDasharray: `${(v / 100) * c} ${c}` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <p className="-mt-16 font-display text-3xl">{v}</p>
        <p className="mt-10 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Card({ children, title, icon, accent }: { children: React.ReactNode; title: string; icon?: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-3xl p-5 shadow-[var(--shadow-soft)] ${accent ? "bg-[linear-gradient(135deg,oklch(0.96_0.04_15),oklch(0.95_0.04_340))]" : "bg-white"}`}>
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">{icon}{title}</div>
      {children}
    </div>
  );
}
function ChipCard({ title, items, tone }: { title: string; items: string[]; tone?: "warn" }) {
  return (
    <Card title={title}>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span key={s} className={`rounded-full px-2.5 py-1 text-xs ${tone === "warn" ? "bg-blush text-charcoal" : "bg-white/70 ring-1 ring-border"}`}>{s}</span>
        ))}
      </div>
    </Card>
  );
}
function ListCard({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <Card title={title}>
      <ul className="space-y-1.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t}</li>
        ))}
      </ul>
    </Card>
  );
}
