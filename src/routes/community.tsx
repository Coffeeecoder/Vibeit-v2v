import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/Nav";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Repeat2,
  Share2,
  Sparkles,
  Hash,
  Send,
  BookOpen,
  Image as ImageIcon,
  Smile,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community · NextHer" },
      { name: "description", content: "A Twitter-style feed for women in tech, with Discord-style channels and Substacks you'll actually read." },
    ],
  }),
  component: Community,
});

// ============================================================
// User / profile directory
// Drop real profile-photo URLs into `avatarUrl` (place files in
// src/assets/community/ or paste a hosted URL). When avatarUrl is
// empty the initials placeholder renders — no emojis.
// ============================================================
type Profile = {
  id: string;
  name: string;
  handle: string;
  jobTitle: string;
  company: string;
  avatarUrl?: string;
  badge?: string;
  badgeColor?: string;
};

const profiles: Record<string, Profile> = {
  meera: {
    id: "meera",
    name: "Meera Shankar",
    handle: "@meera",
    jobTitle: "Staff Engineer",
    company: "Meridian",
    avatarUrl: "",
    badge: "Level 12",
    badgeColor: "bg-[oklch(0.94_0.06_305)] text-[oklch(0.4_0.1_305)]",
  },
  aisha: {
    id: "aisha",
    name: "Aisha Khan",
    handle: "@aisha",
    jobTitle: "Principal ML Engineer",
    company: "Halo AI",
    avatarUrl: "",
    badge: "Mentor",
    badgeColor: "bg-[var(--gradient-primary)] text-white",
  },
  jules: {
    id: "jules",
    name: "Jules Nakamura",
    handle: "@jules",
    jobTitle: "CS Graduate",
    company: "Stanford",
    avatarUrl: "",
    badge: "New",
    badgeColor: "bg-white border border-border text-charcoal",
  },
  rhea: {
    id: "rhea",
    name: "Rhea Kapoor",
    handle: "@rhea",
    jobTitle: "Founder",
    company: "Bloom Ventures",
    avatarUrl: "",
    badge: "Speaker",
    badgeColor: "bg-[oklch(0.94_0.06_85)] text-[oklch(0.4_0.12_85)]",
  },
  zara: {
    id: "zara",
    name: "Zara Ahmed",
    handle: "@zara",
    jobTitle: "Senior iOS Engineer",
    company: "Halo",
    avatarUrl: "",
    badge: "Win",
    badgeColor: "bg-[oklch(0.94_0.06_85)] text-[oklch(0.4_0.12_85)]",
  },
  you: {
    id: "you",
    name: "You",
    handle: "@you",
    jobTitle: "NextHer Member",
    company: "NextHer",
    avatarUrl: "",
    badge: "You",
    badgeColor: "bg-[var(--gradient-primary)] text-white",
  },
};

type Post = {
  id: string;
  authorId: string;
  time: string;
  createdAt: number;
  body: string;
  mediaUrl?: string;
  likes: number;
  replies: number;
  reposts: number;
  liked?: boolean;
  reposted?: boolean;
  bookmarked?: boolean;
};

const initialPosts: Post[] = [
  {
    id: "p1", authorId: "meera", time: "2h", createdAt: Date.now() - 2 * 3600_000,
    body: "Negotiated 34% more today. Sharing my full script in the replies — 💌 if you want it.",
    likes: 428, replies: 96, reposts: 41,
  },
  {
    id: "p2", authorId: "aisha", time: "5h", createdAt: Date.now() - 5 * 3600_000,
    body: "A short thread 🧵 on how I run technical 1:1s that actually help ICs grow — no more status theater.",
    likes: 1204, replies: 187, reposts: 264,
  },
  {
    id: "p3", authorId: "jules", time: "8h", createdAt: Date.now() - 8 * 3600_000,
    body: "First interview tomorrow. Nervous but ready 🥹 Any last-minute advice for a woman entering AI research?",
    likes: 342, replies: 74, reposts: 18,
  },
  {
    id: "p4", authorId: "rhea", time: "1d", createdAt: Date.now() - 24 * 3600_000,
    body: "We just closed our 6th consecutive quarter of >45% women-led investments. AMA in the replies.",
    likes: 892, replies: 154, reposts: 132,
  },
  {
    id: "p5", authorId: "zara", time: "2d", createdAt: Date.now() - 48 * 3600_000,
    body: "Small win: shipped my first solo feature at Halo today. Two years ago I was self-teaching Swift at 2am. 🥲",
    likes: 2104, replies: 312, reposts: 501,
  },
];

const channels = [
  { name: "welcome", unread: 0 },
  { name: "interview-help", unread: 12 },
  { name: "women-in-ai", unread: 34 },
  { name: "salary-talk", unread: 5 },
  { name: "scholarships", unread: 2 },
  { name: "ask-a-mentor", unread: 8 },
  { name: "hackathons", unread: 0 },
  { name: "wins", unread: 21 },
];

// ============================================================
// Substack publications (from user-provided links)
// ============================================================
type Substack = {
  id: string;
  name: string;
  author: string;
  description: string;
  postTitle: string;
  postUrl: string;
  pubUrl: string;
  logoUrl?: string;
};

const substacks: Substack[] = [
  {
    id: "womenintechnology",
    name: "Women in Technology",
    author: "Women in Technology",
    description: "A year of interviewing inspiring women shaping tech.",
    postTitle: "A Year of Interviewing Inspiring Women",
    postUrl: "https://open.substack.com/pub/womenintechnology/p/a-year-of-interviewing-inspiring?r=5ks2j2",
    pubUrl: "https://womenintechnology.substack.com/subscribe?r=5ks2j2",
  },
  {
    id: "thenoosphere",
    name: "The Noosphere",
    author: "The Noosphere",
    description: "Culture, tech & how we treat women in the industry.",
    postTitle: "Move Fast and Break Women",
    postUrl: "https://open.substack.com/pub/thenoosphere/p/move-fast-and-break-women?r=5ks2j2",
    pubUrl: "https://thenoosphere.substack.com/subscribe?r=5ks2j2",
  },
  {
    id: "humidityspeaks",
    name: "Humidity Speaks",
    author: "Humidity Speaks",
    description: "Essays on AI, identity and what the machines miss.",
    postTitle: "I Asked Three AI Systems the Same Question",
    postUrl: "https://open.substack.com/pub/humidityspeaks/p/i-asked-three-ai-systems-the-same?r=5ks2j2",
    pubUrl: "https://humidityspeaks.substack.com/subscribe?r=5ks2j2",
  },
  {
    id: "riseandoptimize",
    name: "Rise & Optimize",
    author: "Rise & Optimize",
    description: "Short notes on ambition, optimization and rising.",
    postTitle: "Featured note",
    postUrl: "https://substack.com/@riseandoptimize/note/c-260009294?r=5ks2j2",
    pubUrl: "https://substack.com/@riseandoptimize",
  },
];

// ============================================================
// Avatar — real image with initials fallback (no emoji)
// ============================================================
function Avatar({ profile, size = 44 }: { profile: Profile; size?: number }) {
  const [broken, setBroken] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const style = { width: size, height: size };

  if (profile.avatarUrl && !broken) {
    return (
      <img
        src={profile.avatarUrl}
        alt={profile.name}
        onError={() => setBroken(true)}
        className="shrink-0 rounded-full object-cover ring-1 ring-black/5"
        style={style}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.94_0.03_320)] to-[oklch(0.92_0.03_260)] text-[13px] font-semibold text-charcoal/70 ring-1 ring-black/5"
      style={style}
      aria-label={profile.name}
    >
      {initials || "·"}
    </div>
  );
}

function formatRelative(ms: number) {
  const diff = Date.now() - ms;
  const s = Math.floor(diff / 1000);
  if (s < 60) return "now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

// Simple inline SVG brand icons (kept minimal to preserve visual style)
function DiscordIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3l-.196.34a13.75 13.75 0 0 1 4.048 1.315C18.5 3.7 15.4 3.15 12 3.15c-3.4 0-6.5.55-8.41 1.505A13.75 13.75 0 0 1 7.638 3.34L7.442 3a19.79 19.79 0 0 0-3.76 1.369C1.24 8.017.55 11.57.9 15.078c2.2 1.62 4.33 2.6 6.42 3.24l.53-.72c-1.2-.44-2.32-1.02-3.35-1.72.28-.2.55-.41.81-.63 3.3 1.53 6.87 1.53 10.13 0 .26.22.53.43.81.63-1.03.7-2.15 1.28-3.35 1.72l.53.72c2.09-.64 4.22-1.62 6.42-3.24.42-4.07-.67-7.6-3.53-10.71ZM9.09 13.62c-.9 0-1.63-.83-1.63-1.85s.72-1.85 1.63-1.85c.9 0 1.64.83 1.62 1.85 0 1.02-.72 1.85-1.62 1.85Zm5.82 0c-.9 0-1.63-.83-1.63-1.85s.72-1.85 1.63-1.85c.9 0 1.64.83 1.62 1.85 0 1.02-.72 1.85-1.62 1.85Z" />
    </svg>
  );
}
function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.51 0 .18 5.33.18 11.88c0 2.1.55 4.14 1.6 5.94L0 24l6.34-1.66a11.9 11.9 0 0 0 5.72 1.46h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.43-8.44Zm-8.46 18.29h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.98 1-3.66-.24-.38a9.85 9.85 0 0 1-1.52-5.24c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.84 9.88Zm5.4-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15s-.76.96-.94 1.15c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.29.17-1.4-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}
function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22.05 3.05 1.7 10.9c-1.4.54-1.39 1.32-.25 1.67l5.22 1.63L18.75 6.4c.57-.35 1.09-.16.66.22L9.62 15.4l-.38 5.65c.55 0 .8-.25 1.1-.55l2.63-2.55 5.46 4.03c1 .55 1.72.27 1.97-.93l3.57-16.8c.36-1.51-.55-2.19-1.86-1.7Z" />
    </svg>
  );
}
function SubstackIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

const MAX_LEN = 500;

function Community() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [tab, setTab] = useState("For you");
  const [draft, setDraft] = useState("");
  const [activeChannel, setActiveChannel] = useState("women-in-ai");
  const [replyOpen, setReplyOpen] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 240) + "px";
  }, [draft]);

  const canPost = draft.trim().length > 0 && draft.length <= MAX_LEN;

  const compose = () => {
    if (!canPost) return;
    const p: Post = {
      id: `p-${Date.now()}`,
      authorId: "you",
      time: "now",
      createdAt: Date.now(),
      body: draft.trim(),
      likes: 0,
      replies: 0,
      reposts: 0,
    };
    setPosts((cur) => [p, ...cur]);
    setDraft("");
    textareaRef.current?.focus();
  };

  const toggle = (id: string, key: "liked" | "reposted" | "bookmarked") => {
    setPosts((cur) =>
      cur.map((p) => {
        if (p.id !== id) return p;
        const next = { ...p, [key]: !p[key] } as Post;
        if (key === "liked") next.likes += next.liked ? 1 : -1;
        if (key === "reposted") next.reposts += next.reposted ? 1 : -1;
        return next;
      }),
    );
  };

  const submitReply = (id: string) => {
    if (!replyText.trim()) return;
    setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, replies: p.replies + 1 } : p)));
    setReplyText("");
    setReplyOpen(null);
  };

  const tabs = useMemo(() => ["For you", "Following", "Trending", "Wins", "Ask"], []);
  const you = profiles.you;

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg">
      <Nav />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[6%] top-[10%] h-72 w-72 rounded-full bg-blush/60 blur-3xl floaty-slow" />
        <div className="absolute right-[6%] top-[30%] h-72 w-72 rounded-full bg-lavender/70 blur-3xl floaty" />
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-charcoal/70">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Women in tech, in one warm room
          </span>
          <h1 className="mt-5 font-display text-5xl leading-tight">
            The <span className="text-gradient italic">softest</span> corner of the internet.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Post, reply, repost, bookmark — meet your next collaborator.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr_320px]">
          {/* LEFT — Discord-style channels */}
          <aside className="hidden lg:block">
            <div className="glass-strong sticky top-28 rounded-3xl p-4">
              <div className="mb-3 flex items-center gap-2 px-2">
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground">
                  <Hash className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-display text-sm">NextHer Server</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">128k members · online</p>
                </div>
              </div>
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Channels</p>
              <ul className="space-y-0.5">
                {channels.map((c) => (
                  <li key={c.name}>
                    <button
                      onClick={() => setActiveChannel(c.name)}
                      className={`flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-sm transition ${
                        activeChannel === c.name
                          ? "bg-white text-charcoal shadow-[var(--shadow-soft)]"
                          : "text-charcoal/70 hover:bg-white/60"
                      }`}
                    >
                      <span className="flex items-center gap-1.5"><Hash className="h-3.5 w-3.5 text-muted-foreground" />{c.name}</span>
                      {c.unread > 0 && (
                        <span className="rounded-full bg-[var(--gradient-primary)] px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                          {c.unread}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl bg-white/70 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Join us on</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <a href="#" className="grid place-items-center rounded-xl bg-[#5865F2]/10 p-2 text-[#5865F2] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]" aria-label="Discord">
                    <DiscordIcon />
                  </a>
                  <a href="#" className="grid place-items-center rounded-xl bg-[#25D366]/10 p-2 text-[#128C7E] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]" aria-label="WhatsApp">
                    <WhatsAppIcon />
                  </a>
                  <a href="#" className="grid place-items-center rounded-xl bg-[#26A5E4]/10 p-2 text-[#26A5E4] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]" aria-label="Telegram">
                    <TelegramIcon />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* CENTER — Feed */}
          <section>
            {/* Composer */}
            <div className="mb-4 rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
              <div className="flex items-start gap-3">
                <Avatar profile={you} size={40} />
                <div className="flex-1">
                  <label htmlFor="composer" className="sr-only">Compose a post</label>
                  <textarea
                    id="composer"
                    ref={textareaRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value.slice(0, MAX_LEN))}
                    onKeyDown={(e) => {
                      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                        e.preventDefault();
                        compose();
                      }
                    }}
                    placeholder="Share a win, ask a hard question, or start a thread…"
                    rows={2}
                    maxLength={MAX_LEN}
                    className="w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <button type="button" className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-blush/40 hover:text-primary" aria-label="Add image"><ImageIcon className="h-4 w-4" /></button>
                      <button type="button" className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-blush/40 hover:text-primary" aria-label="Add emoji"><Smile className="h-4 w-4" /></button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] tabular-nums ${draft.length > MAX_LEN - 40 ? "text-primary" : "text-muted-foreground"}`}>
                        {draft.length}/{MAX_LEN}
                      </span>
                      <button
                        type="button"
                        onClick={compose}
                        disabled={!canPost}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gradient-primary)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-glow)] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Post <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-4 flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    tab === t
                      ? "bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "glass text-charcoal/80 hover:bg-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {posts.map((p) => {
                  const author = profiles[p.authorId] ?? profiles.you;
                  const timeLabel = p.authorId === "you" ? formatRelative(p.createdAt) : p.time;
                  return (
                    <motion.article
                      layout
                      key={p.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]"
                    >
                      <div className="space-y-3 p-5">
                        <div className="flex items-start gap-3">
                          <Avatar profile={author} size={44} />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm">
                              <span className="font-semibold text-charcoal">{author.name}</span>
                              {author.badge && (
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${author.badgeColor}`}>{author.badge}</span>
                              )}
                              <span className="text-muted-foreground">{author.handle} · {timeLabel}</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              {author.jobTitle} · {author.company}
                            </p>
                          </div>
                        </div>
                        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-charcoal/85">{p.body}</p>
                        {p.mediaUrl && (
                          <img
                            src={p.mediaUrl}
                            alt=""
                            className="max-h-96 w-full rounded-2xl object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                          <button
                            onClick={() => setReplyOpen((cur) => (cur === p.id ? null : p.id))}
                            className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                          >
                            <MessageCircle className="h-4 w-4" /> {p.replies}
                          </button>
                          <button
                            onClick={() => toggle(p.id, "reposted")}
                            className={`inline-flex items-center gap-1 transition-colors ${p.reposted ? "text-[oklch(0.6_0.16_150)]" : "hover:text-[oklch(0.6_0.16_150)]"}`}
                          >
                            <Repeat2 className="h-4 w-4" /> {p.reposts}
                          </button>
                          <button
                            onClick={() => toggle(p.id, "liked")}
                            className={`inline-flex items-center gap-1 transition-colors ${p.liked ? "text-primary" : "hover:text-primary"}`}
                          >
                            <Heart className={`h-4 w-4 ${p.liked ? "fill-current" : ""}`} /> {p.likes}
                          </button>
                          <button
                            onClick={() => toggle(p.id, "bookmarked")}
                            className={`inline-flex items-center gap-1 transition-colors ${p.bookmarked ? "text-[oklch(0.55_0.16_260)]" : "hover:text-primary"}`}
                          >
                            <Bookmark className={`h-4 w-4 ${p.bookmarked ? "fill-current" : ""}`} />
                          </button>
                          <button className="inline-flex items-center gap-1 transition-colors hover:text-primary" aria-label="Share">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>

                        {replyOpen === p.id && (
                          <div className="flex items-center gap-2 rounded-2xl bg-[oklch(0.98_0.015_20)] p-2">
                            <input
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && submitReply(p.id)}
                              placeholder={`Reply to ${author.name}…`}
                              className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
                            />
                            <button
                              onClick={() => submitReply(p.id)}
                              disabled={!replyText.trim()}
                              className="grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground disabled:opacity-40"
                              aria-label="Send reply"
                            >
                              <Send className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>

          {/* RIGHT — Substacks & Trending */}
          <aside className="space-y-5">
            <div className="glass-strong rounded-3xl p-6">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h3 className="font-display text-lg">Featured Substacks</h3>
              </div>
              <div className="space-y-3">
                {substacks.map((s) => {
                  const initials = s.name
                    .split(" ")
                    .map((w) => w[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();
                  return (
                    <div
                      key={s.id}
                      className="rounded-2xl bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                    >
                      <div className="flex items-center gap-3">
                        {s.logoUrl ? (
                          <img
                            src={s.logoUrl}
                            alt={`${s.name} logo`}
                            className="h-11 w-11 shrink-0 rounded-2xl object-cover ring-1 ring-black/5"
                          />
                        ) : (
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FF6719] text-white ring-1 ring-black/5">
                            <SubstackIcon className="h-5 w-5" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <a
                            href={s.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-sm font-semibold text-charcoal hover:text-primary"
                          >
                            {s.name}
                          </a>
                          <p className="truncate text-[11px] text-muted-foreground">by {s.author}</p>
                        </div>
                        <a
                          href={s.pubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto shrink-0 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-glow)]"
                        >
                          Subscribe
                        </a>
                      </div>
                      <p className="mt-2 line-clamp-2 text-[12px] leading-snug text-charcoal/75">{s.description}</p>
                      <a
                        href={s.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                      >
                        Read: {s.postTitle} <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="mb-3 font-display text-lg">Trending</h3>
              <div className="space-y-2">
                {[
                  { tag: "#WomenInAI", count: 842 },
                  { tag: "#SalaryTalk", count: 613 },
                  { tag: "#FromICtoManager", count: 421 },
                  { tag: "#RemoteFirst", count: 388 },
                  { tag: "#Hackathons2026", count: 274 },
                ].map((t) => (
                  <div key={t.tag} className="flex items-center justify-between rounded-2xl bg-white/70 px-3 py-2 text-sm">
                    <span className="text-charcoal">{t.tag}</span>
                    <span className="text-xs text-muted-foreground">{t.count} posts</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-6 shadow-[var(--shadow-float)]" style={{ background: "var(--gradient-warm)" }}>
              <p className="text-xs uppercase tracking-wider text-charcoal/60">Join the community</p>
              <h3 className="mt-1 font-display text-xl text-charcoal">Wherever you hang out.</h3>
              <div className="mt-4 space-y-2">
                <a href="#" className="flex items-center gap-3 rounded-2xl bg-white/80 px-3 py-2.5 text-sm text-charcoal transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#5865F2] text-white"><DiscordIcon /></span>
                  <span className="flex-1"><span className="font-semibold">Discord</span> · 128k members</span>
                  <span className="text-xs text-primary font-semibold">Join</span>
                </a>
                <a href="#" className="flex items-center gap-3 rounded-2xl bg-white/80 px-3 py-2.5 text-sm text-charcoal transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#25D366] text-white"><WhatsAppIcon /></span>
                  <span className="flex-1"><span className="font-semibold">WhatsApp</span> · Circle chats</span>
                  <span className="text-xs text-primary font-semibold">Join</span>
                </a>
                <a href="#" className="flex items-center gap-3 rounded-2xl bg-white/80 px-3 py-2.5 text-sm text-charcoal transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#26A5E4] text-white"><TelegramIcon /></span>
                  <span className="flex-1"><span className="font-semibold">Telegram</span> · Daily jobs</span>
                  <span className="text-xs text-primary font-semibold">Join</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
