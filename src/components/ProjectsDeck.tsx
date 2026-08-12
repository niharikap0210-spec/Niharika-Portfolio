import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  CaretLeftIcon as CaretLeft,
  CaretRightIcon as CaretRight,
  ArrowUpRightIcon as ArrowUpRight,
  SquaresFourIcon as SquaresFour,
  XIcon as X,
  SelectionIcon as Selection,
  ChatCircleIcon as ChatCircle,
} from "@phosphor-icons/react";
import { projects, type Project, type ProjectAccent } from "../data/projects";
import { ProjectHeroStage } from "./ProjectHeroStage";

/* ─── Miro palette (matches MiroHero) ─────────────────────────────── */
const FONT = "'Manrope', system-ui, sans-serif";
const INK = "#1A1A2E";
const INK_SUB = "#54545F";
const MIRO_BLUE = "#4262FF";
const STICKY_YELLOW = "#FCE34E";
const STICKY_GREEN = "#B7E49B";
const LIVE_GREEN = "#3FB950";
const MUTED = "#6B6B75"; // AA-contrast muted text on the light board (>=4.5:1)

/* ─── Slide model (normalises product + architecture) ─────────────── */
type Deck = "product" | "arch";
type Slide = {
  slug: string;
  href: string;
  name: string;
  subtitle: string;
  discipline: string;
  year: string;
  tags: string[];
  accent: ProjectAccent;
  badge?: string;
  comment: { who: string; n: number };
  kind: Deck;
  project?: Project;
  archImage?: string;
};

const COMMENTERS = [
  { who: "DV", n: 2 },
  { who: "PR", n: 1 },
  { who: "MK", n: 3 },
  { who: "AR", n: 1 },
];

const productSlides: Slide[] = projects.map((p, i) => ({
  slug: p.slug,
  href: `/work/${p.slug}`,
  name: p.title,
  subtitle: p.subtitle,
  discipline: p.discipline,
  year: p.year,
  tags: p.tags.slice(0, 2),
  accent: p.accent,
  badge: p.slug === "shelfie" ? "UX Research" : undefined,
  comment: COMMENTERS[i % COMMENTERS.length],
  kind: "product",
  project: p,
}));

const archSlides: Slide[] = [
  {
    slug: "thesis",
    href: "/architecture/thesis",
    name: "Public Realm: Beyond the Streets",
    subtitle: "Redefining public spaces, reviving community life",
    discipline: "ARCHITECTURAL THESIS · URBAN DESIGN",
    year: "2024",
    tags: ["URBAN DESIGN", "ARCH PLANNING"],
    accent: { primary: "#9B7A52", light: "#B8966D", dark: "#6B5238", surface: "#F6EEE5" },
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
    comment: { who: "PR", n: 1 },
    kind: "arch",
    archImage: "https://framerusercontent.com/images/2uuxghidYBAIl3mTfzx4LS16YA.jpg",
  },
];

/* ─── Tools (the shared stack legend) ─────────────────────────────── */
const PRODUCT_TOOLS = ["Figma", "Framer", "ProtoPie", "SwiftUI", "Rive", "FigJam", "User Research", "Design Systems", "Prototyping"];
const ARCH_TOOLS = ["AutoCAD", "SketchUp", "Lumion", "V-Ray", "Urban Planning", "Structural Drawing", "Physical Models", "Site Analysis"];

/* ─── Per-deck framing copy ───────────────────────────────────────── */
const DECK_META: Record<Deck, { intro: string; stats: [string, string][] }> = {
  product: {
    intro: "A selection of end-to-end product work — enterprise SaaS, consumer onboarding, and research-led discovery. Presented one frame at a time; use the filmstrip to jump.",
    stats: [["04", "Case Studies"], ["2022–26", "Active Span"], ["Web + iOS", "Surfaces"]],
  },
  arch: {
    intro: "Architecture & urban design from my prior training — a thesis on public space and a body of 3D visualization work. The structural eye I still bring to product.",
    stats: [["02", "Projects"], ["2024", "Year"], ["Physical + 3D", "Media"]],
  },
};

const mono: React.CSSProperties = {
  fontFamily: FONT,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
};

/* ─── Left-column visual: product composition or arch photo ───────── */
function StageVisual({ slide }: { slide: Slide }) {
  if (slide.kind === "product" && slide.project) {
    return <ProjectHeroStage project={slide.project} />;
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: `linear-gradient(180deg, ${slide.accent.surface} 0%, ${slide.accent.primary}0a 100%)` }}>
      <img src={slide.archImage} alt={slide.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.05) 45%, transparent 100%)" }} />
    </div>
  );
}

/* ─── Comment pin (Miro avatar bubble parked on the mockup) ───────── */
function CommentPin({ accent, who, n, reduce }: { accent: ProjectAccent; who: string; n: number; reduce: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="hidden lg:flex"
      animate={reduce ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", left: 20, bottom: 20, alignItems: "center", gap: 8, zIndex: 5 }}
    >
      <span style={{ position: "relative", width: 34, height: 34, borderRadius: "50% 50% 50% 2px", background: accent.primary, color: "#fff", display: "grid", placeItems: "center", fontFamily: FONT, fontSize: 12, fontWeight: 700, boxShadow: "0 6px 16px rgba(9,30,66,0.28)", border: "2px solid #fff" }}>
        {who}
        <span style={{ position: "absolute", top: -6, right: -6, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 999, background: "#fff", color: INK, fontSize: 9.5, fontWeight: 800, display: "grid", placeItems: "center", boxShadow: "0 1px 3px rgba(9,30,66,0.25)" }}>{n}</span>
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: "#fff", borderRadius: 10, boxShadow: "0 4px 12px rgba(9,30,66,0.16)", fontFamily: FONT, fontSize: 11.5, fontWeight: 600, color: INK_SUB }}>
        <ChatCircle size={14} weight="fill" color={accent.primary} /> Looks great
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════ Main ════════════════════════════════ */
export default function ProjectsDeck() {
  const reduce = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const seen = useInView(rootRef, { once: true, margin: "-120px" });

  const [deck, setDeck] = useState<Deck>("product");
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const slides = deck === "product" ? productSlides : archSlides;
  const tools = deck === "product" ? PRODUCT_TOOLS : ARCH_TOOLS;
  const slide = slides[Math.min(index, slides.length - 1)];
  const total = slides.length;

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i + d + total) % total);
  }, [total]);

  const jump = useCallback((i: number) => {
    setDir(i >= index ? 1 : -1);
    setIndex(i);
  }, [index]);

  const switchDeck = useCallback((dk: Deck) => {
    if (dk === deck) return;
    setDir(1);
    setDeck(dk);
    setIndex(0);
  }, [deck]);

  /* Arrow-key navigation — only when focus is inside the deck (never hijacks global arrows) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showAll) return;
      const t = e.target as HTMLElement;
      if (t?.isContentEditable || t?.tagName === "INPUT" || t?.tagName === "TEXTAREA") return;
      const root = rootRef.current;
      if (!root || !root.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showAll, go]);

  /* Overview overlay — Escape closes + lock body scroll (works regardless of scroll position) */
  useEffect(() => {
    if (!showAll) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowAll(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [showAll]);

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d > 0 ? 64 : -64, scale: reduce ? 1 : 0.985 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d > 0 ? -54 : 54, scale: reduce ? 1 : 0.985 }),
  };

  return (
    <section ref={rootRef} id="projects" className="pdeck-section miro-surface" style={{ scrollMarginTop: 96 }} aria-label="Selected work — presentation deck">
      <motion.div
        className="pdeck-frame"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 42 }}
        animate={seen ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.4, 1] }}
      >
        {/* frame title tab */}
        <div className="pdeck-frametab">
          <Selection size={15} weight="bold" color={MIRO_BLUE} /> Selected Work
        </div>

        {/* ── toolbar: deck tabs · presenting/counter/controls ── */}
        <div className="pdeck-toolbar">
          <div className="pdeck-tabs" role="group" aria-label="Choose a deck">
            {([["product", "Product Design", productSlides.length], ["arch", "Architecture", archSlides.length]] as [Deck, string, number][]).map(([dk, label, count]) => {
              const active = deck === dk;
              return (
                <button
                  key={dk}
                  aria-pressed={active}
                  onClick={() => switchDeck(dk)}
                  className="pdeck-tab"
                  style={{ color: active ? MIRO_BLUE : INK_SUB, background: active ? "var(--miro-blue-soft)" : "transparent" }}
                >
                  {label}
                  <span style={{ ...mono, fontSize: 10, letterSpacing: "0.12em", opacity: 0.7 }}>{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>

          <div className="pdeck-controls">
            <span className="pdeck-live hidden md:inline-flex">
              <motion.span
                animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 7, height: 7, borderRadius: 999, background: LIVE_GREEN, display: "inline-block" }}
              />
              Presenting
            </span>

            <span className="pdeck-counter" aria-hidden>
              <span style={{ position: "relative", display: "inline-block", width: "2ch", height: "1.2em", overflow: "hidden", verticalAlign: "bottom" }}>
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.span
                    key={deck + index}
                    custom={dir}
                    initial={reduce ? { opacity: 0 } : { y: dir > 0 ? "-100%" : "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { y: dir > 0 ? "100%" : "-100%", opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.25, 1, 0.4, 1] }}
                    style={{ position: "absolute", inset: 0, color: INK, fontWeight: 700 }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span style={{ color: MUTED, margin: "0 3px" }}>/</span>
              <span style={{ color: MUTED }}>{String(total).padStart(2, "0")}</span>
            </span>

            <div className="pdeck-navbtns">
              <button aria-label="Previous project" onClick={() => go(-1)} className="pdeck-iconbtn"><CaretLeft size={18} weight="bold" /></button>
              <button aria-label="Next project" onClick={() => go(1)} className="pdeck-iconbtn"><CaretRight size={18} weight="bold" /></button>
            </div>

            <button aria-label="Show all frames" onClick={() => setShowAll(true)} className="pdeck-iconbtn pdeck-showall hidden md:grid" title="Show all frames">
              <SquaresFour size={18} weight="regular" />
            </button>
          </div>
        </div>

        {/* ── intro (speaker notes) + stats ── */}
        <div className="pdeck-intro">
          <AnimatePresence mode="wait">
            <motion.p
              key={deck}
              className="pdeck-notes"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {DECK_META[deck].intro}
            </motion.p>
          </AnimatePresence>
          <div className="pdeck-stats">
            {DECK_META[deck].stats.map(([v, l]) => (
              <div key={l} className="pdeck-stat">
                <span className="pdeck-stat-v">{v}</span>
                <span className="pdeck-stat-l" style={mono}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── stage: the active frame ── */}
        <div className="pdeck-stage">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={deck + "-" + index}
              className="pdeck-stagewrap"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
            >
              {/* slide title tab */}
              <div className="pdeck-slidetab">
                <span style={{ width: 8, height: 8, borderRadius: 999, background: slide.accent.primary, flexShrink: 0 }} />
                <span className="pdeck-slidetab-name">Frame {String(index + 1).padStart(2, "0")} — {slide.name}</span>
                <span className="hidden xl:inline" style={{ color: MUTED, fontWeight: 500, flexShrink: 0 }}>· {slide.discipline}</span>
              </div>

              <Link to={slide.href} className="pdeck-panel group" aria-label={`Open ${slide.name} case study`}>
                <span className="pdeck-spine" style={{ background: slide.accent.primary }} />

                {/* left — mockup on accent surface */}
                <div className="pdeck-visual">
                  <StageVisual slide={slide} />
                  <CommentPin accent={slide.accent} who={slide.comment.who} n={slide.comment.n} reduce={reduce} />
                </div>

                {/* right — meta */}
                <div className="pdeck-meta">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, marginBottom: 18 }}>
                    <span className="pdeck-eyebrow" style={mono}>{slide.discipline}</span>
                    <span className="pdeck-yearsticky" aria-hidden>{slide.year}</span>
                  </div>

                  <h3 className="pdeck-title">{slide.name}</h3>
                  <p className="pdeck-sub">{slide.subtitle}</p>

                  <div className="pdeck-tags">
                    {slide.badge && <span className="pdeck-badge" style={{ background: STICKY_GREEN }}>{slide.badge}</span>}
                    {slide.tags.map((t) => (
                      <span key={t} className="pdeck-tag" style={mono}>{t}</span>
                    ))}
                  </div>

                  <div className="pdeck-cta-row">
                    <span className="pdeck-cta">
                      Open case study
                      <ArrowUpRight size={17} weight="bold" className="pdeck-cta-arrow" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── progress segments (visual indicator; navigation is the filmstrip) ── */}
        <div className="pdeck-progress" aria-hidden>
          {slides.map((s, i) => (
            <div key={s.slug} className="pdeck-progseg">
              <span
                className="pdeck-progfill"
                style={{ width: i <= index ? "100%" : "0%", background: i === index ? slide.accent.primary : "rgba(9,30,66,0.22)" }}
              />
            </div>
          ))}
        </div>

        {/* ── filmstrip + tools ── */}
        <div className="pdeck-bottom">
          <div className="pdeck-filmstrip" role="group" aria-label="All frames">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.slug}
                  aria-label={`Frame ${i + 1}: ${s.name}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => jump(i)}
                  className="pdeck-thumb"
                  style={{ borderColor: active ? "transparent" : "rgba(9,30,66,0.08)" }}
                >
                  <span className="pdeck-thumb-top" style={{ background: s.accent.primary }} />
                  <span className="pdeck-thumb-n" style={mono}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="pdeck-thumb-name">{s.name}</span>
                  {active && <motion.span layoutId="pdeckThumbRing" className="pdeck-thumb-ring" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }} />}
                </button>
              );
            })}
          </div>

          <div className="pdeck-tools">
            <span className="pdeck-tools-label" style={mono}>Shared&nbsp;Stack</span>
            <div className="pdeck-tools-list">
              {tools.map((t) => (
                <span key={t} className="pdeck-tool-chip">{t}</span>
              ))}
            </div>
            <span className="pdeck-tools-label" style={mono}>{String(tools.length).padStart(2, "0")}&nbsp;Tools</span>
          </div>
        </div>
      </motion.div>

      {/* ── "Show all frames" overview overlay ── */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            className="pdeck-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowAll(false)}
          >
            <motion.div
              className="pdeck-overlay-panel"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pdeck-overlay-head">
                <span className="pdeck-frametab" style={{ position: "static", boxShadow: "none", border: "1px solid rgba(9,30,66,0.08)" }}>
                  <Selection size={15} weight="bold" color={MIRO_BLUE} /> All frames · {deck === "product" ? "Product Design" : "Architecture"}
                </span>
                <button aria-label="Close" onClick={() => setShowAll(false)} className="pdeck-iconbtn"><X size={18} weight="bold" /></button>
              </div>
              <div className="pdeck-overlay-grid">
                {slides.map((s, i) => (
                  <button
                    key={s.slug}
                    className="pdeck-overlay-card"
                    onClick={() => { jump(i); setShowAll(false); }}
                  >
                    <span className="pdeck-overlay-tab">
                      <span style={{ width: 7, height: 7, borderRadius: 999, background: s.accent.primary }} />
                      Frame {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pdeck-overlay-visual" style={{ background: `linear-gradient(180deg, ${s.accent.surface}, ${s.accent.primary}12)` }}>
                      {s.kind === "arch" ? (
                        <img src={s.archImage} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span className="pdeck-overlay-mono" style={mono}>{s.name}</span>
                      )}
                    </div>
                    <span className="pdeck-overlay-name">{s.name}</span>
                    <span className="pdeck-overlay-sub">{s.subtitle}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
