import { useState, useMemo } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { Heart, X, Sparkles, Briefcase, MapPin, GraduationCap, Zap } from "lucide-react";

export type Profile = {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  experience: string;
  bio: string;
  skills: string[];
  match: number;
  diversity: number;
  ai: number;
  gradient: string;
  emoji: string;
  tag: string;
};

const SWIPE_THRESHOLD = 120;

export function SwipeDeck({
  profiles,
  onMatch,
  onReject,
}: {
  profiles: Profile[];
  onMatch: (p: Profile) => void;
  onReject?: (p: Profile) => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const visible = profiles.slice(index, index + 3);

  const advance = (dir: "left" | "right") => {
    setDirection(dir);
    const current = profiles[index];
    if (current) {
      if (dir === "right") onMatch(current);
      else onReject?.(current);
    }
    setTimeout(() => {
      setIndex((i) => (i + 1) % profiles.length);
      setDirection(null);
    }, 320);
  };

  return (
    <div className="relative mx-auto h-[560px] w-full max-w-[380px]">
      <AnimatePresence>
        {visible.map((p, i) => (
          <SwipeCard
            key={p.id + index}
            profile={p}
            stackIndex={i}
            isTop={i === 0}
            direction={i === 0 ? direction : null}
            onSwipe={advance}
          />
        ))}
      </AnimatePresence>

      <div className="absolute -bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-6">
        <ActionBtn onClick={() => advance("left")} label="Not a match" tone="skip" big>
          <X className="h-7 w-7" />
        </ActionBtn>
        <ActionBtn onClick={() => advance("right")} label="Match" tone="match" big>
          <Heart className="h-7 w-7" fill="currentColor" />
        </ActionBtn>
      </div>
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  label,
  tone,
  big,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  tone: "skip" | "match";
  big?: boolean;
}) {
  const tones: Record<string, string> = {
    skip: "bg-white text-charcoal border border-border",
    match: "bg-[var(--gradient-primary)] text-primary-foreground",
  };
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`group grid ${big ? "h-16 w-16" : "h-12 w-12"} place-items-center rounded-full ${tones[tone]} shadow-[var(--shadow-float)] transition-transform hover:-translate-y-1 hover:scale-105 active:scale-95`}
    >
      {children}
    </button>
  );
}

function SwipeCard({
  profile,
  stackIndex,
  isTop,
  direction,
  onSwipe,
}: {
  profile: Profile;
  stackIndex: number;
  isTop: boolean;
  direction: "left" | "right" | null;
  onSwipe: (d: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const likeOpacity = useTransform(x, [20, 140], [0, 1]);
  const nopeOpacity = useTransform(x, [-140, -20], [1, 0]);

  const handleEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) return onSwipe("right");
    if (info.offset.x < -SWIPE_THRESHOLD) return onSwipe("left");
  };

  const exitX = direction === "right" ? 600 : direction === "left" ? -600 : 0;

  const scale = 1 - stackIndex * 0.05;
  const translateY = stackIndex * 14;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragElastic={0.6}
      onDragEnd={handleEnd}
      style={isTop ? { x, rotate } : undefined}
      initial={{ scale, y: translateY + 20, opacity: 0 }}
      animate={{ scale, y: translateY, opacity: 1 }}
      exit={{ x: exitX, opacity: 0, rotate: exitX / 20, transition: { duration: 0.32 } }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`absolute inset-0 ${isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[var(--shadow-float)]"
      >
        <div
          className="relative h-72 w-full"
          style={{ background: profile.gradient }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_60%)]" />
          <div className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-charcoal backdrop-blur-md">
            {profile.tag}
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <Sparkles className="h-3 w-3" /> {profile.match}% match
          </div>
          <div className="absolute bottom-4 left-4 grid h-20 w-20 place-items-center rounded-full bg-white/85 font-display text-3xl font-semibold text-charcoal shadow-[var(--shadow-float)] ring-4 ring-white/60 backdrop-blur">{profile.emoji}</div>

          {isTop && (
            <>
              <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute right-6 top-24 -rotate-12 rounded-2xl border-4 border-[oklch(0.7_0.2_15)] bg-white/80 px-4 py-2 text-2xl font-black text-[oklch(0.6_0.22_15)] backdrop-blur"
              >
                ❤ MATCH
              </motion.div>
              <motion.div
                style={{ opacity: nopeOpacity }}
                className="absolute left-6 top-24 rotate-12 rounded-2xl border-4 border-charcoal/60 bg-white/80 px-4 py-2 text-2xl font-black text-charcoal backdrop-blur"
              >
                ✕ NOPE
              </motion.div>
            </>
          )}
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-2xl leading-tight">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.role} · {profile.company}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1"><MapPin className="h-3 w-3" />{profile.location}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1"><Briefcase className="h-3 w-3" />{profile.experience}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.94_0.05_305)] px-2.5 py-1 text-[oklch(0.4_0.1_305)]"><GraduationCap className="h-3 w-3" />Diversity {profile.diversity}</span>
          </div>

          <p className="text-sm leading-relaxed text-charcoal/80">{profile.bio}</p>

          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <span key={s} className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] text-charcoal/80">
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[oklch(0.96_0.04_15)] via-[oklch(0.96_0.04_305)] to-[oklch(0.96_0.05_85)] p-3">
            <StatPill icon={<Zap className="h-3 w-3" />} label="AI" value={`${profile.ai}%`} />
            <StatPill label="Compat." value={`${profile.match}%`} />
            <StatPill label="Diversity" value={`${profile.diversity}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatPill({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-charcoal">{icon}{value}</span>
    </div>
  );
}

export function useSampleProfiles(): Profile[] {
  return useMemo(
    () => [
      {
        id: "1", name: "Ananya Rao", role: "Principal ML Engineer", company: "Stellaris AI",
        location: "Bangalore, IN", experience: "12 yrs", tag: "🤝 Mentor",
        bio: "Ex-Google. Building ethical AI systems. Loves mentoring first-gen women engineers.",
        skills: ["ML Systems", "PyTorch", "LLMs", "Leadership"],
        match: 96, diversity: 92, ai: 98, emoji: "AR",
        gradient: "linear-gradient(135deg, oklch(0.9 0.07 15), oklch(0.86 0.08 340))",
      },
      {
        id: "2", name: "Chloe Zhang", role: "Staff Software Engineer", company: "Aperture Labs",
        location: "San Francisco, US", experience: "10 yrs", tag: "✨ Perfect Fit",
        bio: "Distributed systems nerd. I coach on scoping, promo docs, and staying human in staff+ roles.",
        skills: ["Go", "Kubernetes", "Systems Design", "Mentorship"],
        match: 94, diversity: 88, ai: 93, emoji: "CZ",
        gradient: "linear-gradient(135deg, oklch(0.92 0.06 200), oklch(0.9 0.06 260))",
      },
      {
        id: "3", name: "Tanvi Sharma", role: "Product Manager", company: "Lumen Pay",
        location: "London, UK", experience: "7 yrs", tag: "💼 PM Mentor",
        bio: "0→1 fintech PM. Ask me about ruthless prioritization, roadmaps, and negotiating your worth.",
        skills: ["Product", "Strategy", "Fintech", "0→1"],
        match: 93, diversity: 90, ai: 91, emoji: "TS",
        gradient: "linear-gradient(135deg, oklch(0.9 0.06 305), oklch(0.92 0.05 260))",
      },
      {
        id: "4", name: "Sarah Jenkins", role: "Engineering Director", company: "Meridian",
        location: "New York, US", experience: "15 yrs", tag: "🌟 Leadership",
        bio: "Grew an all-women platform team from 3 → 40. Talk to me about scaling with soul.",
        skills: ["Leadership", "Hiring", "Culture", "Platform"],
        match: 97, diversity: 96, ai: 94, emoji: "SJ",
        gradient: "linear-gradient(135deg, oklch(0.88 0.08 20), oklch(0.9 0.06 320))",
      },
      {
        id: "5", name: "Meera Patel", role: "Senior Data Scientist", company: "Northwind Labs",
        location: "Remote / EU", experience: "8 yrs", tag: "📊 Data Mentor",
        bio: "Applied ML for climate. I love helping first-gen women break into research + industry.",
        skills: ["Python", "Causal Inference", "MLOps", "Storytelling"],
        match: 92, diversity: 89, ai: 95, emoji: "MP",
        gradient: "linear-gradient(135deg, oklch(0.92 0.06 150), oklch(0.9 0.06 200))",
      },
      {
        id: "6", name: "Kavita Iyer", role: "Recruiting Partner", company: "Halo Robotics",
        location: "Bangalore, IN", experience: "11 yrs", tag: "💼 Recruiter",
        bio: "I hire senior engineers who care about accessibility. Warm intros for the right story.",
        skills: ["Hiring", "Negotiation", "A11y", "Career Coaching"],
        match: 90, diversity: 91, ai: 87, emoji: "KI",
        gradient: "linear-gradient(135deg, oklch(0.94 0.05 85), oklch(0.9 0.06 40))",
      },
      {
        id: "7", name: "Rhea Kapoor", role: "Founder & CEO", company: "Bloom Ventures",
        location: "Mumbai, IN", experience: "13 yrs", tag: "🚀 Founder",
        bio: "Backed 40+ women-led startups. Ask me about fundraising, storytelling, and staying founder-fit.",
        skills: ["Founding", "Fundraising", "Storytelling", "Community"],
        match: 95, diversity: 94, ai: 92, emoji: "RK",
        gradient: "linear-gradient(135deg, oklch(0.92 0.07 340), oklch(0.9 0.06 15))",
      },
    ],
    [],
  );
}
