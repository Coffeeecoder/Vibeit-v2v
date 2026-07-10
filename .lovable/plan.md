This is a large, multi-surface transformation. I'll ship it in focused phases so each one lands polished rather than half-done everywhere. The existing visual identity (pinks, lavender, cream, glass, serif+sans, soft shadows) stays 100% intact — only clarity, hierarchy, structure, interactions, and the Aura narrative change.

## Phase 1 — Foundation (this phase, one turn)

Goal: rebrand, restructure nav, and rebuild the home page so the product immediately reads as "The Career Operating System for Women."

1. **Rebrand `Next_Her` → `NextHer` everywhere**
   - `src/components/Nav.tsx`, all `src/routes/*.tsx` head meta + copy, `index.html` if present.
   - Wordmark: `Next` + gradient `Her` (no underscore).

2. **Nav restructure** (`src/components/Nav.tsx`)
   - New links: Home · Discover · Community · Aura Studio · Dashboard · Profile.
   - Route mapping:
     - Discover → `/discover` (new, tabbed: Mentors / Jobs / Companies / Hackathons / Collaborators; wraps current `/match` as the Mentors tab initially).
     - Aura Studio → `/aura` (new, tabbed: Overview / Resume / Skill Gap / Roadmap / Interview; wraps existing `/resume`, `/skills`, `/roadmap`, `/interview`).
     - Profile → `/profile` (new, minimal onboarding-style summary).
     - Home, Community, Dashboard keep current routes.
   - Old routes remain reachable so nothing 404s during later phases.
   - CTA button: "Meet Aura" → `/aura`.

3. **Home page rebuild** (`src/routes/index.tsx`)
   - Bigger typography, more whitespace, tighter alignment, fewer decorative orbs, sharper hierarchy.
   - New section order: Hero → Trusted by Women → How It Works → Matchmaking Preview → Community Preview → Company Insights → Testimonials → Aura Preview → Success Stories → Footer.
   - Hero copy exactly as specified:
     - H1: "Empowering Women. Transforming Careers."
     - Sub: "AI-powered mentorship, hiring, networking, community, and career guidance platform built exclusively for women."
     - 4 CTAs: ✨ Meet Aura · ❤️ Find Mentors · 💼 Explore Opportunities · 🌸 Join Community.
   - Trust stats: 128K+ Women · 4,200+ Mentors · 1,200+ Companies · 9,000+ Opportunities.
   - How It Works: 6-step visual journey (Resume → Aura → Roadmap → Mentors → Opportunities → Growth).
   - Matchmaking preview: mini stacked-card mockup + "Tinder for careers" line.
   - Aura preview: introduce the mascot with a soft breathing avatar and sample contextual messages.

4. **Aura Studio shell** (`src/routes/aura.tsx`)
   - Route with 5 tabs (Overview / Resume / Skill Gap / Roadmap / Interview).
   - Overview shows the connected flow diagram and a Career Readiness Score placeholder.
   - Other tabs embed/link the existing feature pages' UI so nothing is lost.

5. **Discover shell** (`src/routes/discover.tsx`)
   - Tabs: Mentors / Jobs / Companies / Hackathons / Collaborators.
   - Mentors tab reuses the current SwipeDeck from `/match`.
   - Other tabs get styled "coming in next phase" cards using the existing glass aesthetic — not lorem, but real-feeling teaser content (sample company/hackathon cards).

6. **Profile route** (`src/routes/profile.tsx`)
   - Simple profile summary with completion %, streak, confidence score widgets — sets up Phase 3.

Everything preserves the current color tokens, gradients, glass classes, and typography.

## Phase 2 — Matchmaking depth (next turn, on your go)

- True stacked swipe deck (cards peek behind, spring physics, rotate + scale, up-swipe = Super Connect).
- Directional overlays (❤️ Interested / ❌ Pass / ⭐ Super Connect).
- Richer mentor + company cards with the emotional bullets you listed.
- Upgraded match modal with bloom + petal particles.

## Phase 3 — Aura personality + Dashboard OS (following turn)

- Aura mascot component (breathing SVG, floating petals, contextual messages, memory-style prompts) available globally as a floating companion.
- Dashboard rebuilt as Notion×Linear×Calendar: Today focus, draggable widgets, Kanban application pipeline, career timeline.
- Onboarding flow at `/onboarding` powering recommendations.

## Phase 4 — Community + Resources + Reviews polish

- Community tabs (Feed / Discord-style / YouTube / Reviews / Resources / Hackathons).
- Glassdoor-for-women reviews view.
- Resource library.

## Technical notes

- All new routes are TanStack file routes under `src/routes/`; the router plugin regenerates `routeTree.gen.ts`.
- Each new route gets its own `head()` with unique title + description + og:title/og:description (no og:image on root).
- No new dependencies needed for Phase 1 — `framer-motion`, `canvas-confetti`, `lucide-react` are already in use.
- Design tokens in `src/styles.css` stay untouched.

## What I need from you

Approve Phase 1 as scoped, or tell me to reshuffle priorities (e.g. "do matchmaking depth first"). Once approved I'll build Phase 1 in one pass and show it, then we iterate.