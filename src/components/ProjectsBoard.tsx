import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRightIcon as ArrowUpRight,
  ChatCircleIcon as ChatCircle,
} from "@phosphor-icons/react";
import { projects, type Project, type ProjectAccent } from "../data/projects";
import { ProjectHeroStage } from "./ProjectHeroStage";

gsap.registerPlugin(ScrollTrigger);

/* ─── Miro palette (matches MiroHero) ─────────────────────────────── */
const FONT = "'Manrope', system-ui, sans-serif";
const INK = "#1A1A2E";
const INK_SUB = "#54545F";
const MIRO_BLUE = "#4262FF";
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

/* ─── Moving background blobs (GSAP-animated cool-pastel field) ─────── */
const BLOBS = [
  { c: "rgba(158,197,246,0.60)", x: "14%", y: "22%", s: 520, dx: 46, dy: 34, d: 17 },
  { c: "rgba(200,180,239,0.54)", x: "82%", y: "26%", s: 460, dx: -54, dy: 40, d: 20 },
  { c: "rgba(183,228,155,0.46)", x: "70%", y: "80%", s: 520, dx: -40, dy: -44, d: 22 },
  { c: "rgba(246,169,208,0.40)", x: "24%", y: "84%", s: 420, dx: 50, dy: -34, d: 19 },
  { c: "rgba(150,190,255,0.34)", x: "50%", y: "52%", s: 460, dx: 34, dy: 46, d: 24 },
];

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

const PRODUCT_TOOLS = ["Figma", "Framer", "ProtoPie", "SwiftUI", "Rive", "FigJam", "User Research", "Design Systems", "Prototyping"];
const ARCH_TOOLS = ["AutoCAD", "SketchUp", "Lumion", "V-Ray", "Urban Planning", "Structural Drawing", "Physical Models", "Site Analysis"];

/* Section framing copy — no em dashes; headline highlight is the last phrase. */
const DECK_META: Record<Deck, { intro: string; stats: [string, string][]; headStart: string; headEnd: string }> = {
  product: {
    intro:
      "A live board of end-to-end product work across enterprise SaaS, consumer onboarding, and research-led discovery. Each frame is a study in turning a specific constraint into something people actually reach for.",
    stats: [["04", "Case Studies"], ["2022–26", "Active Span"], ["Web + iOS", "Surfaces"]],
    headStart: "Hard problems,",
    headEnd: "quietly solved.",
  },
  arch: {
    intro:
      "Architecture and urban design from my prior training: a thesis on public space and a body of 3D visualization work, plus the structural eye I still bring to every product I design.",
    stats: [["02", "Projects"], ["2024", "Year"], ["Physical + 3D", "Media"]],
    headStart: "Space, structure,",
    headEnd: "and story.",
  },
};

const mono: React.CSSProperties = { fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.16em" };

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

          {/* tag stickies — straight */}
          <div className="pboard-stickies">
            {frame.tags.map((t) => (
              <span key={t} className="pboard-sticky" style={{ background: stik }}>{t}</span>
            ))}
          </div>

          {/* CTA — frosted, grainy pill */}
          <span className="pboard-cta">
            View case study
            <ArrowUpRight size={16} weight="bold" aria-hidden className="pboard-cta-arrow" data-on={hovered} />
          </span>
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
  const [deck, setDeck] = useState<Deck>("product");
  const frames = deck === "product" ? productFrames : archFrames;
  const tools = deck === "product" ? PRODUCT_TOOLS : ARCH_TOOLS;
  const meta = DECK_META[deck];

  /* GSAP — header reveal (once) + moving background blobs + mesh parallax. Persistent elements. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pboard-kicker, .pboard-heading, .pboard-notes, .pboard-stat, .pboard-switcher", {
          y: 22, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
        });
        // continuously drifting colour blobs — the moving background
        gsap.utils.toArray<HTMLElement>(".pboard-blob").forEach((el, i) => {
          const b = BLOBS[i];
          if (!b) return;
          gsap.to(el, { x: b.dx, y: b.dy, scale: 1.15, duration: b.d, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.5 });
        });
        // slow parallax on the whole field as the section scrolls
        gsap.to(".pboard-bg", {
          yPercent: 14, ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
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
            y: 48, autoAlpha: 0, duration: 0.85, ease: "power3.out", stagger: 0.12,
            scrollTrigger: { trigger: ".pboard-grid", start: "top 85%", once: true },
          });
        } else {
          gsap.from(frameEls, { y: 30, autoAlpha: 0, duration: 0.55, ease: "power3.out", stagger: 0.1 });
          // re-reveal the swapped intro + stats so they always reappear on deck switch
          gsap.from(".pboard-notes, .pboard-stat", { autoAlpha: 0, y: 10, duration: 0.45, ease: "power3.out", stagger: 0.05 });
        }
        gsap.utils.toArray<HTMLElement>(".pboard-mockup").forEach((el) => {
          gsap.fromTo(el, { yPercent: -4 }, {
            yPercent: 4, ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
          });
        });
        gsap.utils.toArray<HTMLElement>(".pboard-comment").forEach((el) => {
          gsap.to(el, { y: -5, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });
      });
      revealedRef.current = true;
    }, rootRef);
    return () => ctx.revert();
  }, [deck]);

  return (
    <section ref={rootRef} id="projects" className="pboard-section" style={{ scrollMarginTop: 96 }} aria-label="Selected work">
      <div className="pboard-bg" aria-hidden>
        {BLOBS.map((b, i) => (
          <span
            key={i}
            className="pboard-blob"
            style={{ left: b.x, top: b.y, width: b.s, height: b.s, background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)` }}
          />
        ))}
      </div>

      <div className="pboard-inner">
        {/* header */}
        <div className="pboard-head">
          <span className="pboard-kicker" style={mono}><span className="pboard-kicker-dot" />Selected Work</span>
          <h2 className="pboard-heading">
            {meta.headStart}{" "}
            <span className="pboard-heading-hl">
              <span className="pboard-heading-mark" aria-hidden />
              <span className="pboard-heading-text">{meta.headEnd}</span>
            </span>
          </h2>
        </div>

        {/* intro + stat pills (keyed by deck so they always re-reveal on switch) */}
        <div className="pboard-intro">
          <p className="pboard-notes" key={deck}>{meta.intro}</p>
          <div className="pboard-stats" key={deck + "-stats"}>
            {meta.stats.map(([v, l]) => (
              <div key={l} className="pboard-stat">
                <span className="pboard-stat-v">{v}</span>
                <span className="pboard-stat-l" style={mono}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product / Architecture switcher */}
        <div className="pboard-switcher" role="group" aria-label="Choose a deck">
          {([["product", "Product Design", productFrames.length], ["arch", "Architecture", archFrames.length]] as [Deck, string, number][]).map(([dk, label, count]) => {
            const active = deck === dk;
            return (
              <button
                key={dk}
                aria-pressed={active}
                onClick={() => setDeck(dk)}
                className="pboard-tab"
                style={{ color: active ? MIRO_BLUE : INK_SUB, background: active ? "var(--miro-blue-soft)" : "transparent" }}
              >
                {label}
                <span style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", opacity: 0.7 }}>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        {/* cards grid */}
        <div className="pboard-grid">
          {frames.map((f) => <BoardFrame key={f.slug} frame={f} reduce={reduce} />)}
        </div>

        {/* footer: tools */}
        <div className="pboard-foot">
          <div className="pboard-tools">
            <span className="pboard-tools-label" style={mono}>Shared&nbsp;Stack</span>
            <div className="pboard-tools-list">
              {tools.map((t) => <span key={t} className="pboard-tool-chip">{t}</span>)}
            </div>
            <span className="pboard-tools-label" style={mono}>{String(tools.length).padStart(2, "0")}&nbsp;Tools</span>
          </div>
        </div>
      </div>
    </section>
  );
}
