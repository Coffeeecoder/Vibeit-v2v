import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, X, Loader2, Wand2, Cat, Paperclip, FileText, CheckCircle2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };
type Attachment = { name: string; size: number };

const SUGGESTED = [
  "How do I break into ML from a frontend role?",
  "Rewrite my resume bullet: 'Worked on APIs'",
  "Prep me for a Google PM behavioral round",
  "What certifications matter most in 2026?",
];

type QuickKey = "resume" | "roadmap" | "skills" | "interview" | "guidance";

const QUICK_ACTIONS: { key: QuickKey; label: string; emoji: string }[] = [
  { key: "resume", label: "Resume Analysis", emoji: "📄" },
  { key: "roadmap", label: "Career Roadmap", emoji: "🗺️" },
  { key: "skills", label: "Skill Gap Analysis", emoji: "🎯" },
  { key: "interview", label: "Interview Prep", emoji: "🎤" },
  { key: "guidance", label: "Career Guidance", emoji: "✨" },
];

const DEMO: Record<QuickKey, { user: string; reply: string }> = {
  resume: {
    user: "Can you analyze my resume?",
    reply: `**Resume Analysis · ATS Score 87 / 100** 🌸

**Strengths**
- Strong quantified ML impact ("reduced inference cost 42%")
- Clean, single-column, ATS-friendly layout
- Great keyword coverage for *ML Engineer* roles

**Gaps I'd fix this week**
1. Add a **systems-design** bullet (staff-track roles screen for this)
2. Two bullets are passive — rewrite with *action → metric → outcome*
3. Missing "LLMs / RAG" keywords — 6 of your target JDs mention them

**Rewrite suggestion**
> *"Worked on APIs"* → **"Designed & shipped 7 low-latency APIs (p95 < 90 ms) powering personalization for 1.2 M users."**

Want me to draft 3 tailored versions for **ML Engineer**, **Applied Scientist**, and **Staff Eng**? ✨`,
  },
  roadmap: {
    user: "Build me a career roadmap.",
    reply: `**Your 3 · 6 · 12-month Roadmap** 🗺️

**Next 3 months — Foundation**
- Ship 1 systems-design portfolio project (feature store or RAG service)
- Book 4 mentor sessions with **Ananya Rao** & **Sarah Jenkins**
- Complete *Designing Data-Intensive Applications* — Ch. 1–6

**Months 4–6 — Signal**
- Contribute to 1 OSS ML repo (aim: merged PR)
- Publish 2 technical writeups on LinkedIn / Substack
- Start applying to **Staff ML** roles at Northwind, Meridian, Aperture

**Months 7–12 — Level up**
- Target: 3 onsite loops, 1 offer at senior-staff band
- Negotiation coaching with **Tanvi Sharma** in month 10
- Speak at 1 women-in-AI event

Weekly check-ins on your dashboard. I'll nudge you gently. 💫`,
  },
  skills: {
    user: "Where are my biggest skill gaps?",
    reply: `**Skill Gap Analysis** 🎯

Compared to your target role (**Staff ML Engineer**):

| Skill | You | Target | Gap |
|---|---|---|---|
| ML Systems | 8 / 10 | 9 | 🟢 close |
| Distributed Training | 5 / 10 | 8 | 🟡 focus |
| Systems Design | 4 / 10 | 9 | 🔴 priority |
| Cross-team Influence | 6 / 10 | 9 | 🟡 focus |
| LLM / RAG | 6 / 10 | 8 | 🟡 focus |

**My plan for you**
1. 🔴 6-week systems-design sprint (I'll drop weekly problems)
2. 🟡 Distributed training project — fine-tune a 7B model on 4× A100
3. 🟡 Publish 1 RAG deep-dive to build LLM signal

You're closer than you think. Let's go. 🌸`,
  },
  interview: {
    user: "Help me prep for interviews.",
    reply: `**Interview Prep · Mock Round Plan** 🎤

**This week**
- **Mon** — Behavioral round (STAR × 6 stories). I'll play the interviewer.
- **Wed** — ML system design: "Design a real-time recommender for 50 M users."
- **Fri** — Coding: 2 mediums + 1 hard (arrays + graphs)

**Your top 3 stories to sharpen**
1. The 42% inference cost win → *scope, tradeoffs, cross-team*
2. The failed launch → *what you learned, what changed*
3. The teammate you unblocked → *shows leadership at IC level*

**Confidence forecast:** you're currently **72 / 100**. Two mocks with me and you'll be **88+** by Friday. Ready to start round 1? ✨`,
  },
  guidance: {
    user: "I feel a little lost — some career guidance please?",
    reply: `Take a breath. You're not lost — you're *between chapters*. 🌸

Here's what I see in you right now:
- You've been shipping for **4 years** without a real pause to reflect
- Your recent wins point toward **applied ML leadership**, not pure IC forever
- You're **89% ready** for staff-track — the missing piece is *visibility*, not skill

**3 gentle next steps**
1. Book a 30-min chat with **Sarah Jenkins** (she made this exact jump)
2. Write down what a *"good week"* looks like — we'll design toward it
3. Say no to one thing this week that doesn't serve your roadmap

You have a whole village here. I'm right beside you. 💫`,
  },
};

function CatMascot({ size = 28 }: { size?: number }) {
  return (
    <span
      className="relative inline-grid place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, oklch(0.94 0.06 15), oklch(0.9 0.07 340))",
      }}
      aria-hidden
    >
      <Cat className="text-primary" style={{ width: size * 0.6, height: size * 0.6 }} />
    </span>
  );
}

export function AiCopilot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming, uploadPct]);

  const typeOut = async (full: string) => {
    // simulated streaming for demo replies
    setMessages((cur) => [...cur, { role: "assistant", content: "" }]);
    const chunks = full.match(/.{1,6}/gs) ?? [full];
    for (const c of chunks) {
      await new Promise((r) => setTimeout(r, 14));
      setMessages((cur) => {
        const copy = cur.slice();
        copy[copy.length - 1] = {
          role: "assistant",
          content: (copy[copy.length - 1]?.content ?? "") + c,
        };
        return copy;
      });
    }
  };

  const runDemo = async (key: QuickKey) => {
    if (streaming) return;
    const d = DEMO[key];
    setMessages((cur) => [...cur, { role: "user", content: d.user }]);
    setStreaming(true);
    await new Promise((r) => setTimeout(r, 700)); // thinking
    await typeOut(d.reply);
    setStreaming(false);
  };

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;
    const userMsg: Msg = {
      role: "user",
      content: attachment ? `${text}\n\n📎 *${attachment.name}*` : text,
    };
    const priorForApi = [...messages, { role: "user" as const, content: text }];
    const next: Msg[] = [...messages, userMsg, { role: "assistant", content: "" }];
    setMessages(next);
    setInput("");
    setAttachment(null);
    setStreaming(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: priorForApi.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((cur) => {
          const copy = cur.slice();
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((cur) => {
        const copy = cur.slice();
        copy[copy.length - 1] = { role: "assistant", content: `_Ask_Her hit a snag: ${msg}_` };
        return copy;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const onPickFile = (f: File) => {
    setUploadPct(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 8 + Math.random() * 14;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setUploadPct(100);
        setAttachment({ name: f.name, size: f.size });
        setTimeout(() => setUploadPct(null), 500);
        // auto-run resume analysis after upload
        setTimeout(() => {
          setMessages((cur) => [
            ...cur,
            { role: "user", content: `📎 Uploaded **${f.name}** — please analyze.` },
          ]);
          setStreaming(true);
          setTimeout(async () => {
            await new Promise((r) => setTimeout(r, 500));
            await typeOut(DEMO.resume.reply);
            setStreaming(false);
          }, 200);
        }, 400);
      } else {
        setUploadPct(Math.round(p));
      }
    }, 140);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[80] grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-float)] hover:shadow-[var(--shadow-glow)]"
        aria-label="Open Ask_Her"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {open ? <X className="h-6 w-6" /> : <Cat className="h-7 w-7" />}
        </motion.span>
        {!open && (
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-primary/30" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-28 right-6 z-[79] flex h-[70vh] max-h-[680px] w-[92vw] max-w-md flex-col overflow-hidden rounded-[32px] bg-white shadow-[var(--shadow-float)] ring-1 ring-black/5"
          >
            <div className="relative overflow-hidden px-5 pt-5 pb-4" style={{ background: "linear-gradient(135deg, oklch(0.94 0.06 15), oklch(0.9 0.07 340))" }}>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-white/85 shadow-[var(--shadow-soft)]">
                  <Cat className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-display text-xl leading-tight">Ask_Her <span className="ml-1 text-base">🐱</span></p>
                  <p className="text-xs text-charcoal/70">Your NextHer career copilot</p>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Hi love 🌸 — I'm <span className="font-semibold text-charcoal">Ask_Her</span>.
                    Upload your resume or tap a quick action below. I remember our chat.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((q) => (
                      <button
                        key={q.key}
                        onClick={() => runDemo(q.key)}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-medium ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                      >
                        <span className="mr-1">{q.emoji}</span> {q.label}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Try asking</p>
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="block w-full rounded-2xl bg-[oklch(0.98_0.015_20)] px-3 py-2 text-left text-sm text-charcoal/80 transition hover:bg-white hover:shadow-[var(--shadow-soft)]"
                      >
                        <Wand2 className="mr-1 inline h-3 w-3 text-primary" /> {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex items-start gap-2"}>
                  {m.role === "assistant" && <CatMascot size={28} />}
                  {m.role === "user" ? (
                    <div className="max-w-[85%] rounded-3xl rounded-br-md bg-[var(--gradient-primary)] px-4 py-2.5 text-sm text-primary-foreground shadow-[var(--shadow-soft)]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none flex-1 text-charcoal prose-headings:font-display prose-headings:mt-3 prose-headings:mb-1 prose-p:my-2 prose-pre:my-2 prose-pre:rounded-2xl prose-pre:bg-charcoal prose-pre:text-cream prose-code:text-primary prose-code:bg-blush/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-primary">
                      {m.content ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Ask_Her is thinking…
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {uploadPct !== null && (
                <div className="rounded-2xl bg-white p-3 ring-1 ring-border">
                  <div className="flex items-center gap-2 text-xs text-charcoal">
                    {uploadPct < 100 ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    )}
                    <span className="font-medium">
                      {uploadPct < 100 ? "Uploading…" : "Uploaded"}
                    </span>
                    <span className="ml-auto text-muted-foreground">{uploadPct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[oklch(0.96_0.02_20)]">
                    <div
                      className="h-full rounded-full bg-[var(--gradient-primary)] transition-all"
                      style={{ width: `${uploadPct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-border/60 bg-white/70 px-4 py-3 backdrop-blur"
            >
              {attachment && (
                <div className="mb-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs ring-1 ring-border">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate font-medium text-charcoal">{attachment.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="ml-auto text-muted-foreground hover:text-charcoal"
                    aria-label="Remove attachment"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <div className="flex items-end gap-2 rounded-3xl bg-white p-2 ring-1 ring-border focus-within:ring-primary/40">
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md,image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onPickFile(f);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-blush/40 hover:text-primary"
                  aria-label="Attach file"
                  title="Upload resume or file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask Ask_Her anything…"
                  className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition disabled:opacity-40"
                  aria-label="Send"
                >
                  {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
