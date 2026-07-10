import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/community", label: "Community" },
  { to: "/aura", label: "Ask_Her Studio" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
] as const;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass-strong flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-3 py-2">
        <Link to="/" className="flex items-center gap-2 pl-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Next<span className="text-gradient">Her</span>
          </span>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "rounded-full px-4 py-2 text-sm text-foreground bg-white/70 shadow-[var(--shadow-soft)]" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/aura" className="btn-magnetic text-sm">
          Meet Ask_Her
        </Link>
      </nav>
    </header>
  );
}
