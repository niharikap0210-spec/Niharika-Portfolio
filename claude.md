# CLAUDE.md — Frontend Website Rules

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

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

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