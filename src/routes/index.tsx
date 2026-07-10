import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { AuraAvatar } from "@/components/AuraAvatar";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Briefcase,
  Users,
  FileText,
  Compass,
  Map as MapIcon,
  Rocket,
  TrendingUp,
  Shield,
  Star,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NextHer — The Career Operating System for Women" },
      {
        name: "description",
        content:
          "AI-powered mentorship, hiring, networking, community, and career guidance — built exclusively for women.",
      },
      { property: "og:title", content: "NextHer — The Career Operating System for Women" },
      {
        property: "og:description",
        content:
          "A safe, AI-powered ecosystem where women discover mentors, opportunities, community, and career growth.",
      },
    ],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span>
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />

      {/* soft ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[6%] top-[20%] h-72 w-72 rounded-full bg-blush/50 blur-3xl floaty-slow" />
        <div className="absolute right-[8%] top-[8%] h-80 w-80 rounded-full bg-lavender/60 blur-3xl floaty" />
        <div className="absolute bottom-[10%] left-[42%] h-72 w-72 rounded-full bg-cream blur-3xl floaty-slow" />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="mt-6 font-display text-6xl leading-[1.02] tracking-tight md:text-8xl">
            <span className="block">Women Who Build Together,</span>
            <span className="block text-gradient italic">Stay Together.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            AI-powered mentorship, hiring, networking, community, and career guidance —
            built exclusively for women.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/aura" className="btn-magnetic inline-flex items-center gap-2">
              ✨ Meet Ask_Her <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/discover" className="btn-ghost-lux inline-flex items-center gap-2">
              ❤️ Find Mentors
            </Link>
            <Link to="/discover" className="btn-ghost-lux inline-flex items-center gap-2">
              💼 Explore Opportunities
            </Link>
            <Link to="/community" className="btn-ghost-lux inline-flex items-center gap-2">
              🌸 Join Community
            </Link>
          </div>
        </motion.div>
      </section>

      {/* TRUST STATS */}
      <section className="mx-auto max-w-6xl px-6">
        <p className="mb-5 text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Trusted by women in tech worldwide
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { n: 128000, s: "+", l: "Women" },
            { n: 4200, s: "+", l: "Mentors" },
            { n: 1200, s: "+", l: "Companies" },
            { n: 9000, s: "+", l: "Opportunities" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-3xl p-6 text-center">
              <div className="font-display text-4xl text-gradient">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">The Journey</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            One continuous <span className="text-gradient italic">career journey</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything on NextHer flows into everything else. From your first resume upload
            to your director offer — designed as one connected ecosystem.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { n: 1, i: <FileText className="h-5 w-5" />, t: "Upload Resume", d: "ATS-analyzed instantly." },
            { n: 2, i: <Sparkles className="h-5 w-5" />, t: "Meet Ask_Her", d: "Your AI career sister." },
            { n: 3, i: <MapIcon className="h-5 w-5" />, t: "Get Your Roadmap", d: "3, 6, 12 month plan." },
            { n: 4, i: <Heart className="h-5 w-5" />, t: "Match Mentors", d: "Swipe & connect." },
            { n: 5, i: <Briefcase className="h-5 w-5" />, t: "Discover Roles", d: "Jobs that fit you." },
            { n: 6, i: <TrendingUp className="h-5 w-5" />, t: "Grow Your Career", d: "Track every win." },
          ].map((s) => (
            <div
              key={s.n}
              className="group relative rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-float)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cream text-primary">
                  {s.i}
                </div>
                <span className="font-display text-2xl text-gradient">{s.n}</span>
              </div>
              <h3 className="font-display text-lg">{s.t}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MATCHMAKING PREVIEW */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Signature Experience
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Tinder for <span className="text-gradient italic">careers</span>, mentors & opportunities.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Swipe right on the mentor who believes in you. Super-connect with the recruiter
              who's hiring. Real spring physics, real compatibility, real matches.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {["❤️ Mentors", "💼 Companies", "🤝 Collaborators", "🚀 Opportunities"].map((t) => (
                <span key={t} className="glass rounded-full px-3 py-1.5 text-charcoal/80">
                  {t}
                </span>
              ))}
            </div>
            <Link to="/discover" className="btn-magnetic mt-8 inline-flex items-center gap-2">
              Start swiping <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* mini stacked card mockup */}
          <div className="relative mx-auto h-[420px] w-full max-w-sm">
            {[
              {
                z: 2,
                x: -18,
                y: 22,
                r: -6,
                g: "linear-gradient(135deg, oklch(0.92 0.06 150), oklch(0.9 0.06 200))",
                e: "🌿",
                n: "Northwind Labs",
                r2: "Hiring · Remote",
                m: 92,
              },
              {
                z: 3,
                x: 12,
                y: 10,
                r: 4,
                g: "linear-gradient(135deg, oklch(0.9 0.06 305), oklch(0.92 0.05 260))",
                e: "💫",
                n: "Priya Menon",
                r2: "Staff PM · Mentor",
                m: 94,
              },
              {
                z: 4,
                x: 0,
                y: 0,
                r: 0,
                g: "linear-gradient(135deg, oklch(0.9 0.07 15), oklch(0.88 0.08 340))",
                e: "🌸",
                n: "Aisha Kapoor",
                r2: "Principal ML · Mentor",
                m: 96,
              },
            ].map((c, i) => (
              <div
                key={i}
                className="absolute inset-x-0 mx-auto overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[var(--shadow-float)]"
                style={{
                  zIndex: c.z,
                  transform: `translate(${c.x}px, ${c.y}px) rotate(${c.r}deg)`,
                  width: "88%",
                  height: "100%",
                }}
              >
                <div className="relative h-56" style={{ background: c.g }}>
                  <div className="absolute right-3 top-3 rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur">
                    {c.m}% match
                  </div>
                  <div className="absolute bottom-3 left-4 text-6xl">{c.e}</div>
                </div>
                <div className="p-4">
                  <p className="font-display text-xl">{c.n}</p>
                  <p className="text-xs text-muted-foreground">{c.r2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY PREVIEW */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Community</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            A room where every woman <span className="text-gradient italic">belongs</span>.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              i: <MessageCircle className="h-5 w-5" />,
              t: "Discord-style channels",
              d: "#interview-help, #women-in-ai, #scholarships, #ask-a-mentor.",
              g: "linear-gradient(135deg, oklch(0.94 0.05 260), oklch(0.94 0.06 305))",
            },
            {
              i: <Users className="h-5 w-5" />,
              t: "Feed & stories",
              d: "Career wins, mentorship, advice — never a cold LinkedIn post.",
              g: "linear-gradient(135deg, oklch(0.94 0.06 15), oklch(0.92 0.06 340))",
            },
            {
              i: <Shield className="h-5 w-5" />,
              t: "Safe by design",
              d: "Verified women, moderated spaces, zero tolerance.",
              g: "linear-gradient(135deg, oklch(0.94 0.05 150), oklch(0.94 0.05 200))",
            },
          ].map((s) => (
            <div
              key={s.t}
              className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-float)]"
            >
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70 blur-2xl"
                style={{ background: s.g }}
              />
              <div className="relative">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-white text-primary shadow-[var(--shadow-soft)]">
                  {s.i}
                </div>
                <h3 className="font-display text-xl">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPANY INSIGHTS */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <div className="glass-strong rounded-3xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cream">🏢</div>
                <div>
                  <p className="font-display text-xl">Meridian Systems</p>
                  <p className="text-xs text-muted-foreground">Series C · Fintech · 480 people</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Women leadership", "42%"],
                  ["Diversity score", "9.1"],
                  ["Maternity", "26 weeks"],
                  ["Remote flexibility", "First"],
                  ["Pay transparency", "Bands public"],
                  ["Returnship", "Active"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-white/70 p-3">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</p>
                    <p className="font-semibold text-charcoal">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Company Insights</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Glassdoor <span className="text-gradient italic">for women</span>.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Women-leadership %, maternity policy, pay transparency, returnship, interview
              experiences — the signals that actually matter, from the women who lived them.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Voices</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Loved by <span className="text-gradient italic">128,000+</span> women.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <article key={t.name} className="rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)]">
              <div className="mb-3 flex gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-charcoal/85">"{t.quote}"</p>
              <p className="mt-4 text-xs font-medium text-muted-foreground">
                {t.name} · {t.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* AURA PREVIEW */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[36px] bg-white p-10 shadow-[var(--shadow-float)] md:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
            <div className="mx-auto">
              <AuraAvatar size={160} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Meet Ask_Her</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">
                Your AI <span className="text-gradient italic">older sister</span>.
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Warm, encouraging, calm, empathetic. Ask_Her reads your resume, drafts your
                roadmap, remembers what you're chasing, and nudges you when it's time.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                {[
                  "🌸 Hi Bhavika. Ready to work on your dream career today?",
                  "✨ I found 3 new ML internships that match your roadmap.",
                  "💫 You haven't spoken to Priya in 2 weeks. Want me to schedule?",
                ].map((m) => (
                  <div key={m} className="glass inline-block rounded-2xl px-4 py-2 text-charcoal/85">
                    {m}
                  </div>
                ))}
              </div>
              <Link to="/aura" className="btn-magnetic mt-8 inline-flex items-center gap-2">
                Open Ask_Her Studio <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Success Stories</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Stories that <span className="text-gradient italic">stay with you</span>.
          </h2>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {stories.map((s) => (
            <article
              key={s.name}
              className="min-w-[320px] snap-start rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 h-40 w-full rounded-2xl p-4 text-5xl" style={{ background: s.gradient }}>
                {s.emoji}
              </div>
              <p className="text-sm text-charcoal/80">"{s.quote}"</p>
              <p className="mt-3 text-xs font-medium text-muted-foreground">
                {s.name} · {s.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto my-32 max-w-5xl px-6">
        <div
          className="relative overflow-hidden rounded-[36px] p-12 text-center shadow-[var(--shadow-float)]"
          style={{ background: "var(--gradient-warm)" }}
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
          <h2 className="relative font-display text-4xl md:text-6xl">
            Your next chapter is <span className="italic">one swipe</span> away.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-charcoal/70">
            Join 128,000+ women who found a mentor, a role, or the courage to ask for the raise.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/aura" className="btn-magnetic inline-flex items-center gap-2">
              ✨ Meet Ask_Her <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/discover" className="btn-ghost-lux inline-flex items-center gap-2">
              <Compass className="h-4 w-4" /> Discover
            </Link>
          </div>
        </div>
      </section>

      <footer className="pb-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NextHer · The Career Operating System for Women
      </footer>
    </div>
  );
}

const testimonials = [
  {
    name: "Zara",
    role: "Sr. iOS @ Halo",
    quote:
      "Swiped right on my recruiter. Two weeks later, offer. I've never felt more seen in a hiring process.",
  },
  {
    name: "Meera",
    role: "Staff Eng @ Meridian",
    quote: "Rhea helped me negotiate 34% more. She's family now. Aura remembered every milestone.",
  },
  {
    name: "Jules",
    role: "First-gen · CS grad",
    quote: "I didn't know women like me existed in AI. NextHer showed me a whole community.",
  },
];

const stories = [
  {
    name: "Anaya",
    role: "Career switcher",
    quote: "Left banking, matched with a mentor in 3 days, landed a PM role in 2 months.",
    emoji: "💫",
    gradient: "linear-gradient(135deg, oklch(0.92 0.06 150), oklch(0.9 0.06 200))",
  },
  {
    name: "Sana",
    role: "Returnee mom",
    quote: "After a 3-year break, Aura built me a roadmap. I'm back — and I'm leading.",
    emoji: "🌷",
    gradient: "linear-gradient(135deg, oklch(0.94 0.06 15), oklch(0.9 0.06 40))",
  },
  {
    name: "Priya",
    role: "Founder",
    quote: "The community here backed me before any VC did. That's the power of women in one room.",
    emoji: "🌸",
    gradient: "linear-gradient(135deg, oklch(0.9 0.07 15), oklch(0.88 0.08 340))",
  },
  {
    name: "Kiran",
    role: "Sr. Data Scientist",
    quote: "Interview coach + roadmap = 3 offers in 6 weeks. It felt like magic.",
    emoji: "🕊️",
    gradient: "linear-gradient(135deg, oklch(0.9 0.06 305), oklch(0.92 0.05 260))",
  },
];

// unused imports guard
void Rocket;
