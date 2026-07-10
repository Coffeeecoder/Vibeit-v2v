import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Nav } from "@/components/Nav";
import { SwipeDeck, useSampleProfiles, type Profile } from "@/components/SwipeCard";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "Matchmaking · NextHer" },
      { name: "description", content: "Swipe into mentors, recruiters and dream companies — Tinder-style, built for careers." },
    ],
  }),
  component: MatchPage,
});

function MatchPage() {
  const profiles = useSampleProfiles();
  const [matched, setMatched] = useState<Profile | null>(null);

  const onMatch = (p: Profile) => {
    setMatched(p);
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.4 },
      colors: ["#f7c9d5", "#e6b8ff", "#f5e0a0", "#ffffff"],
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[6%] top-[16%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty" />
        <div className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty-slow" />
        <div className="absolute bottom-[10%] left-[45%] h-72 w-72 rounded-full bg-cream blur-3xl floaty" />
      </div>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-40 pt-36 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <section className="hidden md:block">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-charcoal/70">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Signature experience
          </span>
          <h1 className="mt-5 font-display text-5xl leading-tight">
            Swipe your <span className="text-gradient italic">people</span> into place.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Mentors, recruiters and companies — matched by AI compatibility, diversity signal and shared skills. Drag a card,
            tap Match, or Super for the ones that make your heart skip.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { k: "❤️", v: "Right — I want to connect" },
              { k: "✨", v: "Up — Super like, book a session" },
              { k: "✕", v: "Left — Not this one, next" },
            ].map((r) => (
              <div key={r.v} className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm">
                <span className="text-xl">{r.k}</span>
                <span className="text-charcoal/80">{r.v}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SwipeDeck profiles={profiles} onMatch={onMatch} />
        </section>

        <aside className="hidden md:block">
          <div className="glass-strong space-y-4 rounded-3xl p-6">
            <h3 className="font-display text-xl">AI Insights</h3>
            <Insight label="⭐ Compatibility" value="Top 4% for Data Science mentors" />
            <Insight label="🎯 Best fit" value="Principal ML mentors, remote-friendly" />
            <Insight label="📚 Learn next" value="Systems design for staff+ roles" />
            <Insight label="💼 Hiring you" value="12 recruiters actively viewing" />
            <Insight label="✨ Leadership" value="Score 78 · +6 this week" />
          </div>

          <div className="glass mt-4 rounded-3xl p-6">
            <h4 className="font-display text-base">Today</h4>
            <div className="mt-3 space-y-2 text-sm">
              <Row label="Swipes" v="12" />
              <Row label="Matches" v="3" />
              <Row label="Super likes" v="1" />
              <Row label="Sessions booked" v="1" />
            </div>
          </div>
        </aside>
      </main>

      <AnimatePresence>
        {matched && <MatchModal profile={matched} onClose={() => setMatched(null)} />}
      </AnimatePresence>
    </div>
  );
}

function Insight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 p-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm text-charcoal">{value}</p>
    </div>
  );
}
function Row({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-charcoal">{v}</span>
    </div>
  );
}

function MatchModal({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/40 backdrop-blur-md p-6"
      onClick={onClose}
    >
      {[...Array(24)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={{ opacity: [0, 1, 0], y: -400, x: (Math.random() - 0.5) * 400, scale: 1 }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          className="pointer-events-none absolute text-2xl"
        >
          ✨
        </motion.span>
      ))}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white p-8 text-center shadow-[var(--shadow-float)]"
      >
        <div className="absolute inset-x-0 -top-24 h-56" style={{ background: profile.gradient }} />
        <div className="relative">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-6xl shadow-[var(--shadow-soft)]">{profile.emoji}</div>
          <h2 className="mt-6 font-display text-4xl">It's a match! 🎉</h2>
          <p className="mt-2 text-muted-foreground">
            <span className="font-semibold text-charcoal">{profile.name}</span> is excited to connect with you.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button className="btn-ghost-lux" onClick={onClose}>Keep swiping</button>
            <button className="btn-magnetic">Send a message</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
