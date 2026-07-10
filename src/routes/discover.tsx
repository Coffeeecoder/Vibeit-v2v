import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Nav } from "@/components/Nav";
import { SwipeDeck, useSampleProfiles, type Profile } from "@/components/SwipeCard";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover · NextHer" },
      { name: "description", content: "Tinder-style matchmaking — swipe into your people." },
      { property: "og:title", content: "Discover · NextHer" },
      { property: "og:description", content: "Tinder-style matchmaking — swipe into your people." },
    ],
  }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const profiles = useSampleProfiles();
  const [matched, setMatched] = useState(false);

  const onMatch = (_p: Profile) => {
    setMatched(true);
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.4 },
      colors: ["#f7c9d5", "#e6b8ff", "#f5e0a0", "#ffffff"],
    });
  };

  const onReject = () => {
    toast("Not a match.");
  };

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[6%] top-[16%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty" />
        <div className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty-slow" />
      </div>

      <main className="mx-auto max-w-3xl px-6 pt-36 pb-32">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-charcoal/70">
            Tinder for careers
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">
            Discover your <span className="text-gradient italic">people</span>.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Swipe right to match. Swipe left to skip.
          </p>
        </div>

        <section className="flex justify-center">
          <SwipeDeck profiles={profiles} onMatch={onMatch} onReject={onReject} />
        </section>
      </main>

      <AnimatePresence>
        {matched && <MatchModal profile={matched} onClose={() => setMatched(null)} />}
      </AnimatePresence>
    </div>
  );
}

function MatchModal({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/40 p-6 backdrop-blur-md"
      onClick={onClose}
    >
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
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-6xl shadow-[var(--shadow-soft)]">
            {profile.emoji}
          </div>
          <h2 className="mt-6 font-display text-4xl">It's a Match! 🎉</h2>
          <p className="mt-2 text-muted-foreground">
            <span className="font-semibold text-charcoal">{profile.name}</span> also wants to connect with you.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button className="btn-ghost-lux" onClick={onClose}>
              Continue Swiping
            </button>
            <button className="btn-magnetic">Send Message</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
