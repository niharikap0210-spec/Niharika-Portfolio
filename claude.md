# CLAUDE.md — Frontend Website Rules

## Skill Matching — Claude Code's Autonomous Responsibility

**You must proactively judge which skill best fits the task at hand and invoke it — without waiting to be asked.**

Before writing any frontend code, designing any UI, or reviewing any UX, scan the task against the skill list below. If a skill matches, invoke it first via the Skill tool. A task may match more than one skill — invoke the most specific one. You are responsible for this judgment call every time.

Do not skip skills because a task "seems simple." The skill system exists to raise the quality floor on every output, not just complex tasks. If you are unsure whether a skill applies, read the trigger conditions — err on the side of invoking the skill.

---

## Installed Skills

### 1. `frontend-design` → `.claude/skills/frontend-design/SKILL.md`
**Always invoke before writing any frontend code, every session, no exceptions.**
Covers: UI component architecture, Vite + React patterns, Tailwind usage, Framer Motion, responsive layout, design token wiring, accessibility in web components.
Triggers (invoke when): writing or modifying any React component, adding a new page, building a layout, wiring up animations, styling anything.

---

### 2. `refactoring-ui` → `.claude/skills/refactoring-ui/SKILL.md`
Covers: Visual hierarchy fixes, spacing scale discipline, color system audits, typography pairing, contrast, whitespace, component-level design improvements. Based on the "Refactoring UI" methodology — grayscale-first approach, 7 core principles, 0–10 quality scoring per principle.
Triggers (invoke when):
- "this UI looks off" / "something feels wrong visually"
- "fix the design" / "make this look better"
- Visual hierarchy is unclear or headings don't stand out
- Spacing feels random or inconsistent
- Color palette needs an audit or doesn't feel cohesive
- Typography feels flat or hard to scan
- A component or page needs a design review before shipping

---

### 3. `ux-heuristics` → `.claude/skills/ux-heuristics/SKILL.md`
Covers: Usability audits using Nielsen's 10 heuristics, Krug's "Don't Make Me Think" laws, severity ratings (0–4 scale), actionable fix recommendations per violation. Produces structured audit reports with prioritized issues.
Triggers (invoke when):
- "users are confused" / "this is hard to use"
- "usability audit" / "heuristic evaluation"
- Navigation problems or users getting lost
- Forms or flows that feel friction-heavy
- Feedback loops are unclear (no confirmation states, no error messages)
- Reviewing a completed feature before user testing
- Any task involving information architecture or user flows

---

### 4. `hooked-ux` → `.claude/skills/hooked-ux/SKILL.md`
Covers: Engagement and retention design using the Hook Model (Trigger → Action → Variable Reward → Investment). Habit zone analysis, internal vs. external triggers, reward variability, investment mechanics. Based on Nir Eyal's "Hooked" framework.
Triggers (invoke when):
- "users aren't coming back" / "low retention"
- "engagement loops" / "habit-forming design"
- Building onboarding flows or notifications
- Designing dashboards or recurring-use features
- Questioning whether a feature creates long-term value vs. one-time use
- Evaluating motivational design or behavior change patterns

---

### 5. `ios-hig-design` → `.claude/skills/ios-hig-design/SKILL.md`
Covers: Apple Human Interface Guidelines — safe area insets, 44pt minimum tap targets, SF Symbols usage, Dynamic Island awareness, SwiftUI layout patterns, iOS accessibility (Dynamic Type, VoiceOver, color contrast), iPad / iPhone layout differences.
Triggers (invoke when):
- Designing or reviewing an iPhone or iPad app
- Any SwiftUI component or screen layout task
- Questions about iOS-specific interaction patterns (sheets, navigation stacks, tab bars)
- Checking accessibility compliance for Apple platforms
- App Store submission design requirements

---

### 6. `ui-ux-pro-max` → `.claude/skills/ui-ux-pro-max/SKILL.md`
Covers: 50+ UI styles and visual directions, 161 curated color palettes, 57 font pairings, 10 full design system stacks, 99 UX best-practice guidelines. The broadest skill — acts as a comprehensive design reference for any UI structure or visual direction decision.
Triggers (invoke when):
- Starting a new UI from scratch with no reference
- Choosing a visual style, color palette, or font pairing
- Building a full design system or component library
- Any task that benefits from surveying multiple design directions before committing
- "What style should this be?" / "What palette works here?" / "What's the right font pairing?"
- Large redesign tasks where multiple visual options should be considered

---

### 7. `design-sprint` → `.claude/skills/design-sprint/SKILL.md`
Covers: The 5-day Google Ventures Design Sprint process — Map (problem framing, How Might We), Sketch (Crazy 8s, solution sketching), Decide (storyboarding, dot voting), Prototype (realistic artifact creation), Test (structured user interviews, pattern analysis). Produces sprint artifacts: problem statements, sketches, storyboards, interview scripts, findings reports.
Triggers (invoke when):
- "validate this idea before building it"
- "rapid prototype" / "de-risk before development"
- Facing a complex design problem with multiple possible solutions
- Need to align stakeholders on a direction quickly
- "Design sprint" / "ideation session" / "concept exploration"
- Starting a new product, feature, or flow from zero

---

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Framework & Tech Stack
- **Always use Vite + React** as the framework. Do not use Next.js, Create React App, or plain HTML unless explicitly told otherwise.
- Use **React Router** for page navigation.
- Use **Framer Motion (Motion)** for all animations and page transitions.
- Use **Tailwind CSS** for styling (via PostCSS, not CDN — since we're in Vite).
- Everything is client-side rendered. No SSR, no server components.
- If starting a new project: `npm create vite@latest` with the React template, then install dependencies (`tailwindcss`, `framer-motion`, `react-router-dom`).
- If a Vite project already exists, work within the existing structure. Do not recreate or scaffold from scratch.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).

## Screen Recording References
- If a screen recording or video is provided: treat it as a dynamic reference. Study the interactions, animations, scroll behaviors, hover effects, transitions, and timing shown in the recording.
- Replicate the motion design, easing curves, and interaction patterns as closely as possible.
- If the recording shows a full page or flow, implement all visible states and transitions — not just the static resting state.
- When both a screen recording and a static reference image are provided, the screen recording takes priority for interaction/animation behavior and the static image takes priority for layout/colors/typography.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- For Vite projects: start the dev server with `npm run dev` (default serves at `http://localhost:5173`).
- If a custom `serve.mjs` exists in the project root, use `node serve.mjs` instead.
- If the server is already running, do not start a second instance.
- **Vercel has been unlinked.** The site is not deployed anywhere. It is only viewable locally via the dev server. Do not reference a live URL or suggest Vercel deployment.

## Output Defaults
- For quick prototypes or single-page tests: single `index.html` file with inline styles is acceptable.
- For the main portfolio project: always work within the Vite + React project structure (components in `src/`, pages in `src/pages/`, shared styles in `src/index.css`).
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive.

## Color System & Design Tokens
- Define all colors as CSS custom properties (design tokens) in `src/index.css` or a dedicated `tokens.css` file.
- Wire tokens through Tailwind's `theme.extend.colors` config so every component uses them.
- **No hardcoded hex values anywhere in components.** Every color must reference a token.
- When the color palette is updated, only the token definitions should change — nothing else.

## Color Tokens — Source of Truth

When updating or auditing the color system, update the CSS custom properties in `src/index.css` (`:root` block) and wire them through `tailwind.config.js` under `theme.extend.colors`. The canonical token values for this portfolio are:

```css
--bg-primary:      #FAFAFA
--bg-secondary:    #F0F0F0
--text-primary:    #1A1A1A
--text-secondary:  #6B6B6B
--text-muted:      #9A9A9A
--accent:          #B5924C
--border:          #E5E5E5
```

**Accent usage rules — `--accent` (#B5924C) must be used ONLY on:**
1. Hover states on interactive elements
2. The italic phrase in the hero headline ("spaces between taps")
3. The pulsing status dot border
4. Active/current nav link indicator

Do NOT use `--accent` anywhere else in the portfolio.

**When applying a token update:**
- Do a global search across all component files and replace any hardcoded hex color values with the appropriate CSS custom property reference.
- Do not change any layout, typography, animation, or structure — only color values.
- After updating, verify `src/index.css` (token definitions) and `tailwind.config.js` (theme wiring) are in sync.

## Brand Assets
- The canonical brand guide is at `Brand Guide/Brand Guide.png` — read it before making any visual decisions.
- **Follow the brand guide at all times unless the user explicitly says to change something.**
- Do not use placeholders where real assets are available.
- Do not invent brand colors — always reference the token system which is derived from the brand guide.

### Brand Guide Summary (`Brand Guide/Brand Guide.png`)
**Color palette** (in order): White (#FAFAFA) → Black (#1A1A1A) → Medium Gray (#6B6B6B) → Light Gray (#9A9A9A) → Gold/Amber (#B5924C). These map exactly to the CSS tokens defined below.
**Typography**: Playfair Display (serif) for all headings — Inter (sans-serif) for body text — Space Mono (monospace) for labels, annotations, and metadata.
**Accent**: The gold (#B5924C) is used sparingly — see accent usage rules below.
**Layout style**: Blueprint grid background, minimal architectural aesthetic, dark footer bar.
**Headline**: "Design buildings, taps." — "taps." is italic and rendered in the gold accent color.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing via Framer Motion.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Icons
- **All icons must come from [Phosphor Icons](https://phosphoricons.com)** — no other icon libraries (Heroicons, Lucide, react-icons, etc.).
- Install via: `npm install @phosphor-icons/react`
- Import individually: `import { ArrowRight, GithubLogo } from "@phosphor-icons/react"`
- **Default weight: `regular`** — use this unless there is a strong visual reason to deviate.
- **Accent/emphasis icons** (e.g., in CTAs, active nav items): use `bold`.
- **Never mix weights within the same visual group** (e.g., a nav bar, a card's action row, a list of links must all use the same weight).
- **Icon size:** default `size={20}` for inline/body use, `size={24}` for standalone/prominent icons. Never size with CSS width/height — always use the `size` prop.
- **Color:** always inherit from text color via `color="currentColor"` (the default) — never hardcode a color on an icon.
- **No decorative icon inconsistency:** if one item in a repeated pattern (list, grid, nav) has an icon, all items in that pattern must have an icon.

## Hard Rules
- Do not add sections, features, or content not in the reference.
- Do not "improve" a reference design — match it. Unless mentioned otherwise.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as primary color.
- Do not use Next.js or any SSR framework unless explicitly instructed.
- Do not install unnecessary dependencies. Keep the bundle lean.
- Do not use any icon library other than `@phosphor-icons/react`.