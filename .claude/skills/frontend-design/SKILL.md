---
name: frontend-design
description: Frontend design setup skill. Invoke before writing any frontend code to load brand assets, establish design system, and enforce anti-generic guardrails.
user-invocable: true
---

You are now in frontend design mode. Before writing any code, follow these steps in order:

## Step 1 — Scan Brand Assets

Check the `brand_assets/` folder in the project root.

- If logos exist → use them directly (never use placeholders where real assets exist)
- If a color palette or style guide is defined → extract the exact hex values and use ONLY those
- If font files or font names are specified → use them
- Report what you found before proceeding

## Step 2 — Establish the Design System

Define these tokens before writing a single line of CSS or Tailwind:

**Colors** — Never use default Tailwind palette (no indigo-500, blue-600, etc.)
- Pick or extract a primary brand color
- Derive: a lighter tint (+20% lightness), a darker shade (−20%), a muted/surface variant
- Define an accent color that complements the primary

**Typography** — Never use the same font for headings and body
- Heading font: a display, serif, or distinctive sans
- Body font: a clean, readable sans-serif
- Large headings: `letter-spacing: -0.03em`, `font-weight: 700+`
- Body text: `line-height: 1.7`

**Spacing** — Use intentional spacing tokens (e.g., 4 / 8 / 16 / 24 / 40 / 64 / 96px), not random Tailwind steps

**Shadows** — Never use flat `shadow-md`
- Use layered shadows with color tints and low opacity
- Example: `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(brandColor, 0.12)`

**Depth / Layering** — Define a z-plane system:
- Base surface → Elevated card → Floating panel/modal

## Step 3 — Visual Treatment Rules

Apply these to every design:

**Gradients**
- Layer multiple radial gradients (not a single linear gradient)
- Add grain/texture via SVG noise filter for depth

**Images**
- Add `bg-gradient-to-t from-black/60` overlay on every image
- Add a color-treatment layer using `mix-blend-multiply`

**Animations**
- Only animate `transform` and `opacity` — never `transition-all`
- Use spring-style easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`

**Interactive States**
- Every clickable element MUST have: hover, focus-visible, and active states
- No exceptions — buttons, links, cards, icons

## Step 4 — Output Defaults

- Single `index.html` with all styles inline unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Step 5 — Hard Rules Checklist

Before writing code, confirm:
- [ ] No default Tailwind blue/indigo as primary
- [ ] No `transition-all` used anywhere
- [ ] No `shadow-md` without custom layering
- [ ] Heading and body fonts are different
- [ ] Every interactive element has hover/focus/active states
- [ ] Spacing follows intentional tokens
- [ ] Images have gradient + blend-mode overlays

---

Once you have completed these steps, briefly summarize:
1. Brand colors found/chosen (with hex values)
2. Font pairing selected
3. Key design decisions

Then proceed to write the code.
