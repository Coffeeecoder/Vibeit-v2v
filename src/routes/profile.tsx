import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { AuraAvatar } from "@/components/AuraAvatar";
import { Sparkles, MapPin, Briefcase, Heart, Flame, Award } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · NextHer" },
      { name: "description", content: "Your NextHer profile — career readiness, streaks, matches, and roadmap progress." },
      { property: "og:title", content: "Profile · NextHer" },
      { property: "og:description", content: "Your NextHer career profile at a glance." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[16%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty-slow" />
        <div className="absolute right-[6%] top-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty" />
      </div>

      <main className="mx-auto max-w-6xl px-6 pt-36 pb-24">
        {/* hero */}
        <div className="glass-strong rounded-3xl p-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-[var(--gradient-warm)] text-5xl shadow-[var(--shadow-soft)]">
              🌸
            </div>
            <div className="flex-1">
              <h1 className="font-display text-4xl">Bhavika Sharma</h1>
              <p className="mt-1 text-muted-foreground">
                ML Engineer · Career switcher · She/Her
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1">
                  <MapPin className="h-3 w-3" /> Bangalore, IN
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1">
                  <Briefcase className="h-3 w-3" /> 4 yrs
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-primary">
                  <Sparkles className="h-3 w-3" /> ML · Data · Product
                </span>
              </div>
            </div>
            <Link to="/aura" className="btn-magnetic inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Open Ask_Her Studio
            </Link>
          </div>
        </div>

        {/* widgets */}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Widget label="Profile" value="82%" icon={<Award className="h-4 w-4" />} sub="Almost there" />
          <Widget label="Streak" value="12 days" icon={<Flame className="h-4 w-4" />} sub="Keep it going" />
          <Widget label="Confidence" value="78" icon={<Sparkles className="h-4 w-4" />} sub="+6 this week" />
          <Widget label="Matches" value="14" icon={<Heart className="h-4 w-4" />} sub="3 super connects" />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          {/* timeline */}
          <div className="glass rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Career Timeline</p>
            <h2 className="mt-2 font-display text-2xl">Your growth, remembered</h2>
            <ol className="mt-6 space-y-4">
              {[
                { t: "Resume uploaded", d: "ATS score 78", done: true },
                { t: "Roadmap generated", d: "6-month Staff-track plan", done: true },
                { t: "Mentor matched", d: "Priya Menon · 94% fit", done: true },
                { t: "Mock interview", d: "System design · 82/100", done: true },
                { t: "Application submitted", d: "Meridian Systems", done: false },
                { t: "Offer received", d: "Coming soon 🌸", done: false },
              ].map((e, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${
                      e.done ? "bg-[var(--gradient-primary)] text-primary-foreground" : "bg-white/70 text-muted-foreground"
                    }`}
                  >
                    {e.done ? "✓" : i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-charcoal">{e.t}</p>
                    <p className="text-xs text-muted-foreground">{e.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* aura */}
          <div className="glass-strong rounded-3xl p-6 text-center">
            <div className="mx-auto">
              <AuraAvatar size={112} />
            </div>
            <p className="mt-4 font-display text-xl">Next_Her remembers</p>
            <div className="mt-3 space-y-2 text-left text-sm">
              {[
                "🌸 Last week you wanted ML internships — 3 new ones today.",
                "✨ You haven't spoken to Priya in 2 weeks.",
                "💫 Your Staff-track roadmap is 42% complete.",
              ].map((m) => (
                <div key={m} className="rounded-2xl bg-white/80 px-3 py-2 text-charcoal/85">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Widget({
  label,
  value,
  icon,
  sub,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <p className="mt-2 font-display text-3xl text-gradient">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
