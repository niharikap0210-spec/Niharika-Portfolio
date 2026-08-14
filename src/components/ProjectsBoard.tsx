import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRightIcon as ArrowUpRight,
  ChatCircleIcon as ChatCircle,
  CursorClickIcon as CursorClick,
  SunIcon as Sun,
  CubeIcon as Cube,
} from "@phosphor-icons/react";
import {
  siFigma, siFramer, siSwift, siRive, siMiro, siNotion, siJira, siSketch,
  siLinear, siLoom, siWebflow, siStorybook,
  siAutodesk, siSketchup, siBlender, siAutodeskrevit, siAutodeskmaya, siTwinmotion, siUnrealengine,
} from "simple-icons";
import { projects, type Project, type ProjectAccent } from "../data/projects";
import { ProjectHeroStage } from "./ProjectHeroStage";
import LiquidBackground from "./LiquidBackground";

gsap.registerPlugin(ScrollTrigger);

/* ─── Miro palette (matches MiroHero) ─────────────────────────────── */
const FONT = "'Manrope', system-ui, sans-serif";
const STICKY = { yellow: "#FCE34E", blue: "#9EC5F6", pink: "#F6A9D0", green: "#B7E49B", purple: "#C8B4EF" };

/* discipline → sticky colour (fixed map, keeps the board coherent) */
function stickyColor(discipline: string): string {
  const d = discipline.toUpperCase();
  if (d.includes("ENTERPRISE") || d.includes("HEALTHCARE")) return STICKY.blue;
  if (d.includes("SERVICE")) return STICKY.pink;
  if (d.includes("FIELD") || d.includes("RESEARCH")) return STICKY.yellow;
  if (d.includes("PRODUCT")) return STICKY.green;
  return STICKY.purple; // architecture / urban / visualization
}

/* ─── Frame model (normalises product + architecture) ─────────────── */
type Deck = "product" | "arch";
type Frame = {
  slug: string;
  href: string;
  name: string;
  subtitle: string;
  discipline: string;
  year: string;
  tags: string[];
  accent: ProjectAccent;
  featured?: boolean;
  comment?: { who: string; n: number };
  kind: Deck;
  project?: Project;
  archImage?: string;
};

const productFrames: Frame[] = projects.map((p, i) => ({
  slug: p.slug,
  href: `/work/${p.slug}`,
  name: p.title,
  subtitle: p.subtitle,
  discipline: p.discipline,
  year: p.year,
  tags: p.tags.slice(0, 2),
  accent: p.accent,
  featured: i === 0,
  comment: i === 0 ? { who: "PR", n: 2 } : undefined,
  kind: "product",
  project: p,
}));

const archFrames: Frame[] = [
  {
    slug: "thesis",
    href: "/architecture/thesis",
    name: "Public Realm: Beyond the Streets",
    subtitle: "Redefining public spaces, reviving community life",
    discipline: "ARCHITECTURAL THESIS · URBAN DESIGN",
    year: "2024",
    tags: ["URBAN DESIGN", "ARCH PLANNING"],
    accent: { primary: "#9B7A52", light: "#B8966D", dark: "#6B5238", surface: "#F6EEE5" },
    featured: true,
    comment: { who: "DV", n: 2 },
    kind: "arch",
    archImage: "https://framerusercontent.com/images/eq440NR8EZrR2U1JX0rdFpXeA.jpg",
  },
  {
    slug: "renders",
    href: "/architecture/renders",
    name: "Rendered Realities",
    subtitle: "3D modeling and visualization in architecture",
    discipline: "ARCHITECTURAL VISUALIZATION",
    year: "2024",
    tags: ["3D MODELLING", "RENDERING"],
    accent: { primary: "#4E7396", light: "#6B90B3", dark: "#2E4F6A", surface: "#EBF1F8" },
    kind: "arch",
    archImage: "https://framerusercontent.com/images/2uuxghidYBAIl3mTfzx4LS16YA.jpg",
  },
];

/* Shared-stack ticker — real brand logos (simple-icons) where available, Phosphor fallback otherwise */
type Brand = { path: string; hex: string; title: string };
type Tool = { name: string; icon?: Brand; Fallback?: React.ElementType };
const PRODUCT_TICKER: Tool[] = [
  { name: "Figma", icon: siFigma },
  { name: "FigJam", icon: siFigma },
  { name: "Framer", icon: siFramer },
  { name: "ProtoPie", Fallback: CursorClick },
  { name: "Rive", icon: siRive },
  { name: "SwiftUI", icon: siSwift },
  { name: "Sketch", icon: siSketch },
  { name: "Miro", icon: siMiro },
  { name: "Notion", icon: siNotion },
  { name: "Jira", icon: siJira },
  { name: "Linear", icon: siLinear },
  { name: "Loom", icon: siLoom },
  { name: "Webflow", icon: siWebflow },
  { name: "Storybook", icon: siStorybook },
];
const ARCH_TICKER: Tool[] = [
  { name: "AutoCAD", icon: siAutodesk },
  { name: "SketchUp", icon: siSketchup },
  { name: "Revit", icon: siAutodeskrevit },
  { name: "Maya", icon: siAutodeskmaya },
  { name: "Blender", icon: siBlender },
  { name: "Twinmotion", icon: siTwinmotion },
  { name: "Unreal Engine", icon: siUnrealengine },
  { name: "Lumion", Fallback: Sun },
  { name: "V-Ray", Fallback: Cube },
];

/* Section framing copy — no em dashes; headline highlight is the last phrase. */
const DECK_META: Record<Deck, { intro: string; headStart: string; headEnd: string }> = {
  product: {
    intro:
      "A live board of end-to-end product work across enterprise SaaS, consumer onboarding, and research-led discovery. Each frame is a study in turning a specific constraint into something people actually reach for.",
    headStart: "Hard problems,",
    headEnd: "quietly solved.",
  },
  arch: {
    intro:
      "Architecture and urban design from my prior training: a thesis on public space and a body of 3D visualization work, plus the structural eye I still bring to every product I design.",
    headStart: "Space, structure,",
    headEnd: "and story.",
  },
};

const mono: React.CSSProperties = { fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.16em" };

/* ─── Brand logo (or Phosphor fallback) ───────────────────────────── */
function BrandIcon({ tool, size = 18 }: { tool: Tool; size?: number }) {
  if (tool.icon) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={`#${tool.icon.hex}`} aria-hidden style={{ flexShrink: 0 }}>
        <path d={tool.icon.path} />
      </svg>
    );
  }
  if (tool.Fallback) {
    const F = tool.Fallback;
    return <F size={size} weight="regular" color="#6B6B75" aria-hidden style={{ flexShrink: 0 }} />;
  }
  return null;
}

/* ─── Shared-stack ticker (seamless GSAP marquee, pauses on hover) ──── */
function Ticker({ tools }: { tools: Tool[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const items = [...tools, ...tools]; // duplicated for a seamless -50% loop

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The track is an exact 2x duplicate, so a -50% translate loops seamlessly.
        // xPercent re-resolves against the live element width on every layout, so it
        // stays seamless across font-load + resize with no measurement or reflow.
        tweenRef.current = gsap.to(el, {
          xPercent: -50, ease: "none", repeat: -1,
          duration: el.scrollWidth / 2 / 60, force3D: true,
        });
        // Recompute pacing once the web font swaps in (the seam stays correct regardless —
        // xPercent is a live %; this only keeps the ~60px/s speed accurate).
        document.fonts?.ready.then(() => {
          const t = trackRef.current;
          if (t && tweenRef.current) tweenRef.current.duration(t.scrollWidth / 2 / 60);
        });
      });
    });
    return () => ctx.revert();
  }, [tools]);

  // Ease the marquee to a stop on hover (and back up on leave) instead of snapping.
  const glide = (ts: number) => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: ts, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      className="pboard-ticker"
      onMouseEnter={() => glide(0)}
      onMouseLeave={() => glide(1)}
    >
      <div ref={trackRef} className="pboard-ticker-track">
        {items.map((t, i) => (
          <div key={i} className="pboard-ticker-item" aria-hidden={i >= tools.length}>
            <BrandIcon tool={t} />
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup visual (product composition or arch photo) ───────────── */
function FrameVisual({ frame, hovered }: { frame: Frame; hovered: boolean }) {
  if (frame.kind === "product" && frame.project) {
    return <ProjectHeroStage project={frame.project} hovered={hovered} />;
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: `linear-gradient(180deg, ${frame.accent.surface} 0%, ${frame.accent.primary}0a 100%)` }}>
      <img src={frame.archImage} alt={frame.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.04) 45%, transparent 100%)" }} />
    </div>
  );
}

/* ─── Selection overlay (subtle Miro ring + corner handles) ────────── */
function SelectionOverlay({ show }: { show: boolean }) {
  const corners: React.CSSProperties[] = [
    { top: -4, left: -4 }, { top: -4, right: -4 }, { bottom: -4, right: -4 }, { bottom: -4, left: -4 },
  ];
  return (
    <div aria-hidden className="pboard-select" style={{ opacity: show ? 1 : 0 }}>
      <span className="pboard-ring" />
      {corners.map((c, i) => <span key={i} className="pboard-handle" style={c} />)}
    </div>
  );
}

/* ─── One project card ────────────────────────────────────────────── */
function BoardFrame({ frame, reduce }: { frame: Frame; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const liftRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const [demo, setDemo] = useState(false);
  const stik = stickyColor(frame.discipline);

  // Featured card briefly self-demos its (subtle) selection ring on first reveal
  useEffect(() => {
    if (!frame.featured || !inView || reduce) return;
    setDemo(true);
    const t = setTimeout(() => setDemo(false), 1600);
    return () => clearTimeout(t);
  }, [frame.featured, inView, reduce]);

  const lift = (to: number) => {
    if (!reduce && liftRef.current) gsap.to(liftRef.current, { y: to, duration: to ? 0.35 : 0.4, ease: "power3.out" });
  };

  // GSAP reveals the outer .pboard-frame-wrap on scroll; GSAP drives the hover lift on the card.
  return (
    <div
      ref={ref}
      className="pboard-frame-wrap"
      onMouseEnter={() => { setHovered(true); lift(-5); }}
      onMouseLeave={() => { setHovered(false); lift(0); }}
    >
      <div ref={liftRef} className="pboard-frame">
        <Link to={frame.href} className="pboard-link" aria-label={`View ${frame.name} case study`}>
          {/* mockup (clip holds the image; selection overlay sits above, unclipped) */}
          <div className="pboard-mockup">
            <div className="pboard-mockup-clip"><FrameVisual frame={frame} hovered={hovered} /></div>
            <SelectionOverlay show={hovered || demo} />
            {frame.comment && (
              <div aria-hidden className="pboard-comment hidden lg:flex">
                <span className="pboard-comment-avatar" style={{ background: frame.accent.primary }}>
                  {frame.comment.who}
                  <span className="pboard-comment-badge">{frame.comment.n}</span>
                </span>
                <span className="pboard-comment-text"><ChatCircle size={13} weight="fill" color={frame.accent.primary} /> Looks great</span>
              </div>
            )}
          </div>

          {/* title + subtitle */}
          <h3 className="pboard-title">{frame.name}</h3>
          <p className="pboard-sub">{frame.subtitle}</p>

          {/* tags (left) + CTA (right) on one row */}
          <div className="pboard-cardfoot">
            <div className="pboard-stickies">
              {frame.tags.map((t) => (
                <span key={t} className="pboard-sticky" style={{ background: stik }}>{t}</span>
              ))}
            </div>
            <span className="pboard-cta">
              <span className="pboard-cta-label">
                View case study
                <ArrowUpRight size={16} weight="bold" aria-hidden className="pboard-cta-arrow" data-on={hovered} />
              </span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Main ════════════════════════════════ */
export default function ProjectsBoard() {
  const reduce = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const revealedRef = useRef(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const switchReadyRef = useRef(false);
  const [deck, setDeck] = useState<Deck>("product");
  const frames = deck === "product" ? productFrames : archFrames;
  const meta = DECK_META[deck];

  /* GSAP — header reveal (once) + moving background blobs + mesh parallax. Persistent elements. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pboard-kicker, .pboard-heading, .pboard-notes, .pboard-switcher", {
          y: 20, autoAlpha: 0, duration: 0.9, ease: "power2.out", stagger: 0.09,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* GSAP — card reveals + mockup parallax + comment-pin bob. Re-bound on every deck switch
     (cards + the keyed intro/stats remount). First run waits for scroll; later runs animate at once. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const frameEls = gsap.utils.toArray<HTMLElement>(".pboard-frame-wrap");
        if (!revealedRef.current) {
          gsap.from(frameEls, {
            y: 34, autoAlpha: 0, duration: 0.9, ease: "power2.out", stagger: 0.12,
            clearProps: "transform,opacity,visibility",
            // flip the flag only when the reveal actually fires, so it survives StrictMode's
            // double-invoke (a persistent ref set at setup time would skip the scroll reveal in dev)
            scrollTrigger: { trigger: ".pboard-grid", start: "top 85%", once: true, onEnter: () => { revealedRef.current = true; } },
          });
        } else {
          gsap.from(frameEls, { y: 24, autoAlpha: 0, duration: 0.6, ease: "power2.out", stagger: 0.1, clearProps: "transform,opacity,visibility" });
          // re-reveal the swapped intro so it always reappears on deck switch
          gsap.from(".pboard-notes", { autoAlpha: 0, y: 10, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity,visibility" });
        }
        gsap.utils.toArray<HTMLElement>(".pboard-mockup").forEach((el) => {
          gsap.fromTo(el, { yPercent: -4 }, {
            yPercent: 4, ease: "none", force3D: true,
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5, fastScrollEnd: true, invalidateOnRefresh: true },
          });
        });
        gsap.utils.toArray<HTMLElement>(".pboard-comment").forEach((el) => {
          gsap.to(el, { y: -5, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [deck]);

  /* GSAP — slide the switcher indicator to the active tab (and keep it in place on resize) */
  useLayoutEffect(() => {
    const place = (animate: boolean) => {
      const btn = tabRefs.current[deck === "product" ? 0 : 1];
      const ind = indicatorRef.current;
      const box = switcherRef.current;
      if (!btn || !ind || !box) return;
      const b = btn.getBoundingClientRect();
      const s = box.getBoundingClientRect();
      const to = { x: b.left - s.left, width: b.width, autoAlpha: 1 };
      if (animate && !reduce) gsap.to(ind, { ...to, duration: 0.42, ease: "power3.out" });
      else gsap.set(ind, to);
    };
    place(switchReadyRef.current);
    switchReadyRef.current = true;
    if (document.fonts?.ready) document.fonts.ready.then(() => place(false));
    let raf = 0;
    const onResize = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; place(false); }); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); if (raf) cancelAnimationFrame(raf); };
  }, [deck, reduce]);

  return (
    <section ref={rootRef} id="projects" className="pboard-section" style={{ scrollMarginTop: 96 }} aria-label="Selected work">
      <LiquidBackground c0="f0f5fe" c1="dfe9fb" c2="c6d9f5" fade={0} lift={0.28} grain={0.055} speed={0.1} />

      <div className="pboard-inner">
        {/* header */}
        <div className="pboard-head">
          <span className="pboard-kicker">Selected work</span>
          <h2 className="pboard-heading">
            {meta.headStart}{" "}
            <span className="pboard-heading-hl">
              <span className="pboard-heading-mark" aria-hidden />
              <span className="pboard-heading-text">{meta.headEnd}</span>
            </span>
          </h2>
        </div>

        {/* intro line (keyed by deck so it always re-reveals on switch) */}
        <div className="pboard-intro">
          <p className="pboard-notes" key={deck}>{meta.intro}</p>
        </div>

        {/* Product / Architecture switcher — frosted pill with a GSAP sliding indicator */}
        <div ref={switcherRef} className="pboard-switcher" role="group" aria-label="Choose a deck">
          <span ref={indicatorRef} className="pboard-switch-ind" aria-hidden />
          {([["product", "Product Design", productFrames.length], ["arch", "Architecture", archFrames.length]] as [Deck, string, number][]).map(([dk, label, count], i) => (
            <button
              key={dk}
              ref={(el) => { tabRefs.current[i] = el; }}
              aria-pressed={deck === dk}
              onClick={() => setDeck(dk)}
              className="pboard-tab"
              data-active={deck === dk}
            >
              {label}
              <span className="pboard-tab-count">{String(count).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        {/* cards grid */}
        <div className="pboard-grid">
          {frames.map((f) => <BoardFrame key={f.slug} frame={f} reduce={reduce} />)}
        </div>

        {/* footer: shared-stack ticker */}
        <div className="pboard-foot">
          <span className="pboard-foot-label" style={mono}>Shared&nbsp;Stack</span>
          <Ticker key={deck} tools={deck === "product" ? PRODUCT_TICKER : ARCH_TICKER} />
        </div>
      </div>
    </section>
  );
}
