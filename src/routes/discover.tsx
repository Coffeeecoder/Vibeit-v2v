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
        {matched && <MatchModal onClose={() => setMatched(false)} />}
      </AnimatePresence>
    </div>
  );
}

function MatchModal({ onClose }: { onClose: () => void }) {
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
        className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white p-10 text-center shadow-[var(--shadow-float)]"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.05 }}
          className="mx-auto text-6xl"
          aria-hidden
        >
          🎉
        </motion.div>
        <h2 className="mt-4 font-display text-4xl">It's a Match!</h2>
        <p className="mt-3 text-muted-foreground">
          Congratulations, <span className="font-semibold text-charcoal">Diva</span>! You have a new match.
        </p>
        <div className="mt-8 flex justify-center">
          <button className="btn-magnetic" onClick={onClose}>
            Continue Swiping
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
