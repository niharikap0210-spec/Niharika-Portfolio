import { motion, AnimatePresence, useInView, useMotionValue, useScroll, useSpring, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpIcon as ArrowUp,
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  UsersThreeIcon as UsersThree,
  ChatCircleTextIcon as ChatCircleText,
  MapPinIcon as MapPin,
  WrenchIcon as Wrench,
  LightbulbIcon as Lightbulb,
  MagnifyingGlassIcon as MagnifyingGlass,
  LayoutIcon as Layout,
  ChartBarIcon as ChartBar,
  PathIcon as Path,
  StackIcon as Stack,
  HandshakeIcon as Handshake,
  PencilSimpleIcon as PencilSimple,
  SparkleIcon as Sparkle,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { projects, type Project } from "../data/projects";

/* ══════════════════════════════════════════════════════════════════
   LOCALLIFT — scoped palette + type tokens
══════════════════════════════════════════════════════════════════ */
const ll = {
  primary: "#3B4F7B",
  light:   "#6577A0",
  dark:    "#1E2A45",
  surface: "#EDF0F7",
  subtle:  "rgba(59, 79, 123, 0.08)",
  line:    "rgba(59, 79, 123, 0.16)",
  muted:   "rgba(59, 79, 123, 0.62)",
  warm:    "#C47B3A",
  ink:     "#121A2A",
};

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";

const t = {
  eyebrow: {
    ...mono, fontSize: 11, letterSpacing: "0.22em",
    color: ll.primary, fontWeight: 700,
  } as React.CSSProperties,
  h2: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(32px, 3.8vw, 48px)",
    letterSpacing: "-0.025em", lineHeight: 1.15,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  h3: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(22px, 2.1vw, 28px)",
    letterSpacing: "-0.02em", lineHeight: 1.2,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  bodyLg: {
    fontFamily: sans, fontSize: "clamp(18px, 1.4vw, 21px)",
    lineHeight: 1.75, color: "var(--text-secondary)",
    fontWeight: 400,
  } as React.CSSProperties,
  body: {
    fontFamily: sans, fontSize: 18, lineHeight: 1.75,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  bodyMuted: {
    fontFamily: sans, fontSize: 15, lineHeight: 1.7,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
};

const SECTION_PAD = "clamp(80px, 10vw, 140px) 0";
const TOTAL = "09";
const LOFI  = "/locallift/lofi";
const HIFI  = "/locallift/hifi";
const IMG   = "/locallift";

/* Indigo-tinted blueprint grid used on the ll.surface sections */
const gridSurface: React.CSSProperties = {
  backgroundColor: ll.surface,
  backgroundImage: [
    "repeating-linear-gradient(0deg, rgba(59,79,123,0.06) 0, rgba(59,79,123,0.06) 0.5px, transparent 0.5px, transparent 20px)",
    "repeating-linear-gradient(90deg, rgba(59,79,123,0.06) 0, rgba(59,79,123,0.06) 0.5px, transparent 0.5px, transparent 20px)",
    "repeating-linear-gradient(0deg, rgba(59,79,123,0.14) 0, rgba(59,79,123,0.14) 0.5px, transparent 0.5px, transparent 80px)",
    "repeating-linear-gradient(90deg, rgba(59,79,123,0.14) 0, rgba(59,79,123,0.14) 0.5px, transparent 0.5px, transparent 80px)",
  ].join(", "),
};

/* Light blueprint grid for the dark Outcomes panel */
const gridDark: React.CSSProperties = {
  backgroundColor: ll.dark,
  backgroundImage: [
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 0.5px, transparent 0.5px, transparent 20px)",
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 0.5px, transparent 0.5px, transparent 20px)",
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.09) 0, rgba(255,255,255,0.09) 0.5px, transparent 0.5px, transparent 80px)",
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0, rgba(255,255,255,0.09) 0.5px, transparent 0.5px, transparent 80px)",
  ].join(", "),
};

/* ══════════════════════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════════════════════ */
function Reveal({
  children, delay = 0, y = 24, className = "", once = true,
}: { children: React.ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix = "", duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, value, duration, mv]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* Minimal section header with numbered eyebrow */
function SectionHeader({
  num, title, phase,
}: { num: string; title: string; phase: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} style={{ marginBottom: "clamp(44px, 5vw, 72px)" }}>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 20, flexWrap: "wrap",
        paddingBottom: 16,
      }}>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...mono, fontSize: 13, color: ll.primary, letterSpacing: "0.24em", fontWeight: 700 }}
        >
          {num} <span style={{ color: ll.muted, fontWeight: 400 }}>/ {TOTAL}</span>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...mono, fontSize: 13, color: "var(--text-primary)", letterSpacing: "0.24em", fontWeight: 600 }}
        >
          {title}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.55 }}
          style={{ ...mono, fontSize: 12, color: ll.muted, letterSpacing: "0.22em", marginLeft: "auto" }}
        >
          {phase}
        </motion.span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: 1, background: ll.primary, transformOrigin: "left", opacity: 0.7 }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PHONE FRAME — float + hover wrapper (images already contain
   their own phone mockup, so no bezel is drawn here)
────────────────────────────────────────────────────────────── */
function PhoneFrame({
  src, alt, scale = 1, tilt = 0, floatDelay = 0, priority = false,
  style, onMouseEnter, onMouseLeave,
}: {
  src: string; alt: string;
  scale?: number; tilt?: number; floatDelay?: number; priority?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: () => void; onMouseLeave?: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{ y: [0, -8, 0], rotate: [tilt, tilt + 0.25, tilt] }}
      transition={{ duration: 6 + floatDelay, repeat: Infinity, ease: "easeInOut", delay: floatDelay * 0.3 }}
      whileHover={{ y: -14, scale: scale * 1.035, rotate: tilt, transition: { type: "spring", stiffness: 260, damping: 22 } }}
      style={{
        position: "relative",
        width: "100%",
        willChange: "transform",
        cursor: "default",
        filter: "drop-shadow(0 2px 6px rgba(18,26,42,0.10)) drop-shadow(0 24px 48px rgba(59,79,123,0.18))",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ASPECT PLATE — large image tile with registration marks
────────────────────────────────────────────────────────────── */
function Plate({
  src, alt, caption, tag,
  aspect = "16 / 10",
  fit = "contain",
  bg = "#FFFFFF",
  maxHeight,
  padding,
  compareArrow = false,
}: {
  src: string; alt: string; caption?: string; tag?: string;
  aspect?: string; fit?: "contain" | "cover"; bg?: string; maxHeight?: number;
  padding?: string;
  compareArrow?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <figure style={{ margin: 0, width: "100%" }}>
      <motion.div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        style={{
          position: "relative",
          background: bg,
          border: `1px solid ${ll.line}`,
          overflow: "hidden",
          boxShadow: hover
            ? "0 2px 6px rgba(18,26,42,0.04), 0 24px 48px rgba(59,79,123,0.14)"
            : "0 1px 2px rgba(18,26,42,0.03), 0 8px 24px rgba(59,79,123,0.06)",
          transition: "box-shadow 260ms ease-out",
        }}
      >
        {/* Registration marks */}
        {[
          { top: 8,    left:  8,  t: true,  l: true  },
          { top: 8,    right: 8,  t: true,  l: false },
          { bottom: 8, left:  8,  t: false, l: true  },
          { bottom: 8, right: 8,  t: false, l: false },
        ].map((pos, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              position: "absolute", width: 11, height: 11,
              borderTop:    pos.t  ? `1px solid ${ll.primary}` : "none",
              borderBottom: !pos.t ? `1px solid ${ll.primary}` : "none",
              borderLeft:   pos.l  ? `1px solid ${ll.primary}` : "none",
              borderRight:  !pos.l ? `1px solid ${ll.primary}` : "none",
              opacity: 0.55, zIndex: 2,
              top: pos.top, left: pos.left, bottom: pos.bottom, right: pos.right,
            }}
          />
        ))}
        {tag && (
          <span style={{
            position: "absolute", top: 18, left: 18,
            ...mono, fontSize: 9.5, color: ll.primary,
            letterSpacing: "0.22em", fontWeight: 700,
            background: "rgba(255,255,255,0.92)",
            padding: "5px 10px",
            border: `1px solid ${ll.line}`,
            zIndex: 3,
          }}>
            {tag}
          </span>
        )}
        <div style={{
          width: "100%", aspectRatio: aspect,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: padding ?? (fit === "contain" ? "clamp(20px, 3vw, 44px)" : 0),
        }}>
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            animate={{ scale: hover ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            style={{
              width: "100%", height: "100%",
              objectFit: fit,
              display: "block",
            }}
          />
          {compareArrow && (
            <motion.div
              aria-hidden
              animate={{ x: hover ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{
                position: "absolute",
                left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                width: 56, height: 56,
                borderRadius: "50%",
                background: ll.primary,
                display: "grid", placeItems: "center",
                boxShadow: "0 2px 6px rgba(18,26,42,0.12), 0 14px 32px rgba(59,79,123,0.32)",
                border: "2px solid #FFFFFF",
                zIndex: 4,
              }}
            >
              <ArrowRight size={24} color="#FFFFFF" weight="bold" />
            </motion.div>
          )}
        </div>
      </motion.div>
      {caption && (
        <figcaption style={{
          ...mono, fontSize: 10, color: ll.muted,
          letterSpacing: "0.22em", fontWeight: 700,
          marginTop: 14, paddingTop: 12,
          borderTop: `1px solid ${ll.line}`,
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ──────────────────────────────────────────────────────────────
   PHONE GALLERY — responsive grid of phone-framed screens
────────────────────────────────────────────────────────────── */
function PhoneGallery({
  items, tone = "light",
}: {
  items: { src: string; label: string }[];
  tone?: "light" | "paper";
}) {
  return (
    <div
      className="ll-phone-gallery"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "clamp(18px, 2.2vw, 32px)",
        padding: tone === "paper" ? "clamp(32px, 3.6vw, 56px) clamp(18px, 2vw, 32px)" : 0,
        background: tone === "paper" ? ll.surface : "transparent",
        border: tone === "paper" ? `1px solid ${ll.line}` : undefined,
      }}
    >
      {items.map((s, i) => (
        <motion.figure
          key={s.src}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}
        >
          <PhoneFrame src={s.src} alt={`LocalLift ${s.label}`} />
          <figcaption style={{
            ...mono, fontSize: 9.5, letterSpacing: "0.22em",
            color: ll.muted, fontWeight: 700, textAlign: "center",
          }}>
            {s.label}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   LOFI FILMSTRIP — horizontal snap-scroll carousel (space-saving)
   Groups screens into flows; user switches flow via tabs.
────────────────────────────────────────────────────────────── */
type FlowGroup = { id: string; label: string; indices: number[] };

function LofiFilmstrip({
  items, groups,
}: {
  items: { src: string; label: string }[];
  groups: FlowGroup[];
}) {
  const [activeFlow, setActiveFlow] = useState(groups[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const active = groups.find(g => g.id === activeFlow) ?? groups[0];
  const visible = active.indices.map(i => items[i]);

  const updateState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
  };

  useEffect(() => {
    updateState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    const ro = new ResizeObserver(updateState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateState);
      ro.disconnect();
    };
  }, [activeFlow]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeFlow]);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-lofi-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  return (
    <div>
      {/* Flow tabs + counter row */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center",
        justifyContent: "space-between", gap: 18, marginBottom: 20,
      }}>
        <div role="tablist" aria-label="Lo-fi flows" style={{
          display: "flex", flexWrap: "wrap", gap: 6,
          padding: 4, background: ll.subtle,
          border: `1px solid ${ll.line}`,
        }}>
          {groups.map(g => {
            const on = g.id === activeFlow;
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActiveFlow(g.id)}
                style={{
                  position: "relative",
                  padding: "9px 14px",
                  background: on ? "#FFFFFF" : "transparent",
                  border: `1px solid ${on ? ll.line : "transparent"}`,
                  ...mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
                  color: on ? ll.primary : ll.muted,
                  cursor: "pointer",
                  transition: "color 180ms ease, background 180ms ease",
                }}
              >
                {g.label}
                <span style={{
                  marginLeft: 8, opacity: 0.7,
                  fontSize: 9,
                }}>
                  {String(g.indices.length).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{
            ...mono, fontSize: 10, fontWeight: 700,
            letterSpacing: "0.22em", color: ll.muted,
          }}>
            {active.label} · {visible.length} SCREENS
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              aria-label="Scroll left"
              onClick={() => scrollBy("left")}
              disabled={!canLeft}
              style={{
                width: 36, height: 36,
                display: "grid", placeItems: "center",
                background: "#FFFFFF",
                border: `1px solid ${ll.line}`,
                cursor: canLeft ? "pointer" : "not-allowed",
                opacity: canLeft ? 1 : 0.4,
                transition: "opacity 160ms ease, background 160ms ease",
              }}
            >
              <ArrowLeft size={16} color={ll.primary} weight="bold" />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scrollBy("right")}
              disabled={!canRight}
              style={{
                width: 36, height: 36,
                display: "grid", placeItems: "center",
                background: "#FFFFFF",
                border: `1px solid ${ll.line}`,
                cursor: canRight ? "pointer" : "not-allowed",
                opacity: canRight ? 1 : 0.4,
                transition: "opacity 160ms ease, background 160ms ease",
              }}
            >
              <ArrowRight size={16} color={ll.primary} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Strip container */}
      <div style={{
        position: "relative",
        background: ll.surface,
        border: `1px solid ${ll.line}`,
      }}>
        {/* Edge fades */}
        <div aria-hidden style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 48,
          background: `linear-gradient(to right, ${ll.surface}, rgba(237,240,247,0))`,
          opacity: canLeft ? 1 : 0,
          transition: "opacity 200ms ease",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 48,
          background: `linear-gradient(to left, ${ll.surface}, rgba(237,240,247,0))`,
          opacity: canRight ? 1 : 0,
          transition: "opacity 200ms ease",
          zIndex: 2, pointerEvents: "none",
        }} />

        <div
          ref={scrollRef}
          className="ll-lofi-strip"
          style={{
            display: "flex",
            gap: 24,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            padding: "clamp(32px, 3.6vw, 56px) clamp(18px, 2vw, 32px)",
            scrollbarWidth: "none",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {visible.map((s, i) => (
              <motion.figure
                key={`${activeFlow}-${s.src}`}
                data-lofi-card
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  margin: 0,
                  flex: "0 0 clamp(160px, 17vw, 200px)",
                  scrollSnapAlign: "start",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 14,
                }}
              >
                <PhoneFrame src={s.src} alt={`LocalLift ${s.label}`} />
                <figcaption style={{
                  ...mono, fontSize: 9.5, letterSpacing: "0.22em",
                  color: ll.muted, fontWeight: 700, textAlign: "center",
                }}>
                  {s.label}
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div style={{
          position: "relative",
          height: 2, background: ll.subtle,
          borderTop: `1px solid ${ll.line}`,
        }}>
          <motion.span
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              background: ll.primary,
              transformOrigin: "0 50%",
              scaleX: progress,
            }}
            animate={{ scaleX: progress }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          />
        </div>
      </div>

      <style>{`
        .ll-lofi-strip::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO MOCKUP — three floating phones
══════════════════════════════════════════════════════════════════ */
function HeroMockup() {
  return (
    <div
      className="md:col-span-7"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "clamp(420px, 52vw, 620px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Soft indigo glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-6% -4%",
          background: `radial-gradient(50% 55% at 50% 50%, ${ll.light}66 0%, ${ll.primary}33 40%, rgba(59,79,123,0) 72%)`,
          filter: "blur(64px)",
          opacity: 0.9,
          zIndex: 0,
        }}
      />
      {/* Secondary warm glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "6%", bottom: "8%",
          width: "42%", height: "42%",
          background: `radial-gradient(circle, ${ll.warm}44 0%, rgba(196,123,58,0) 70%)`,
          filter: "blur(52px)",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* Back-left phone */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          left: "4%",
          top: "8%",
          width: "30%",
          zIndex: 1,
          filter: "saturate(0.92)",
        }}
      >
        <PhoneFrame src={`${HIFI}/hifi-explore.png`}   alt="Explore" tilt={-6} floatDelay={0.8} />
      </motion.div>

      {/* Center phone — main focal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "34%",
          zIndex: 3,
        }}
      >
        <PhoneFrame src={`${HIFI}/hifi-splash.png`}    alt="Splash"  tilt={0} floatDelay={0} priority />
      </motion.div>

      {/* Back-right phone */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          right: "4%",
          top: "8%",
          width: "30%",
          zIndex: 1,
          filter: "saturate(0.92)",
        }}
      >
        <PhoneFrame src={`${HIFI}/hifi-community.png`} alt="Community" tilt={6} floatDelay={1.4} />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   NAV CARD
══════════════════════════════════════════════════════════════════ */
function NavCard({ project }: { project: Project }) {
  const [hover, setHover] = useState(false);
  const accent = `hsl(${project.accentHue}, 38%, 48%)`;
  const primaryTag = project.tags[0] ?? project.year;

  return (
    <Link
      to={`/work/${project.slug}`}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", textDecoration: "none", display: "block",
        overflow: "hidden", aspectRatio: "5 / 4", background: project.gradient,
      }}
    >
      <span aria-hidden style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, transparent 35%, ${accent}26 100%)`,
        opacity: hover ? 1 : 0,
        transition: "opacity 420ms ease-out",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute",
        top: "clamp(24px, 2.4vw, 36px)",
        left: "clamp(24px, 2.4vw, 36px)",
        right: "clamp(24px, 2.4vw, 36px)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
      }}>
        <span style={{ ...mono, fontSize: 11, color: "rgba(26,26,26,0.65)", letterSpacing: "0.24em", fontWeight: 600 }}>
          {project.year}
        </span>
        <span style={{
          ...mono, fontSize: 10, color: "rgba(26,26,26,0.65)", letterSpacing: "0.22em", fontWeight: 600,
          padding: "6px 10px", border: "1px solid rgba(26,26,26,0.18)", borderRadius: 999,
        }}>
          {primaryTag}
        </span>
      </div>

      <div style={{
        position: "absolute",
        left:   "clamp(24px, 2.4vw, 36px)",
        right:  "clamp(24px, 2.4vw, 36px)",
        bottom: "clamp(24px, 2.4vw, 36px)",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        <motion.p
          animate={{ y: hover ? -2 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: "clamp(36px, 4.2vw, 60px)",
            letterSpacing: "-0.03em", lineHeight: 1.02,
            color: "#1A1A1A", margin: 0,
          }}
        >
          {project.title}
        </motion.p>
        <p style={{
          fontFamily: sans, fontSize: "clamp(15px, 1.05vw, 17px)",
          lineHeight: 1.55, color: "rgba(26,26,26,0.72)",
          maxWidth: 460, margin: 0,
        }}>
          {project.subtitle}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
          <span style={{
            ...mono, fontSize: 11, letterSpacing: "0.24em", fontWeight: 700,
            color: hover ? accent : "#1A1A1A",
            transition: "color 260ms ease-out",
          }}>
            View case study
          </span>
          <motion.span
            animate={{ x: hover ? 6 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ display: "inline-flex", color: hover ? accent : "#1A1A1A", transition: "color 260ms ease-out" }}
          >
            <ArrowRight size={16} weight="regular" />
          </motion.span>
        </div>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════════
   AFFINITY OUTPUT — four tensions, one affinity map
══════════════════════════════════════════════════════════════════ */
const TENSIONS: {
  tag: string; icon: Icon; title: string; takeaway: string; count: number;
}[] = [
  { tag: "T·01", icon: Handshake,  title: "Industry-specific mentorship", takeaway: "Generic advice doesn't land. Owners want someone from their lane.", count: 12 },
  { tag: "T·02", icon: Wrench,     title: "Tools built for their scale",  takeaway: "Dashboards assume a team. A solo owner needs one next action, not twenty.", count: 11 },
  { tag: "T·03", icon: UsersThree, title: "Peer networks as backbone",   takeaway: "Mistakes travel faster between owners than they do through playbooks.", count: 9 },
  { tag: "T·04", icon: MapPin,     title: "Local context as feature",    takeaway: "A city, a street, a regulation. Specificity is what makes advice usable.", count: 8 },
];

function TensionCard({
  t: tension, index, active, onEnter, onLeave,
}: {
  t: (typeof TENSIONS)[number]; index: number;
  active: boolean;
  onEnter: () => void; onLeave: () => void;
}) {
  const I = tension.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      style={{
        position: "relative",
        background: "#FFFFFF",
        border: `1px solid ${active ? ll.primary : ll.line}`,
        padding: "clamp(22px, 2.4vw, 32px)",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "clamp(18px, 2vw, 28px)",
        alignItems: "start",
        cursor: "default",
        outline: "none",
        boxShadow: active
          ? "0 2px 6px rgba(18,26,42,0.05), 0 18px 44px rgba(59,79,123,0.14)"
          : "0 1px 2px rgba(18,26,42,0.03), 0 6px 18px rgba(59,79,123,0.05)",
        transition: "border-color 260ms ease-out, box-shadow 260ms ease-out",
      }}
    >
      {/* Accent stripe on active */}
      <motion.span
        aria-hidden
        animate={{ scaleY: active ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: 3, background: ll.warm, transformOrigin: "top",
        }}
      />

      {/* Left column — numeral + icon */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
        <span style={{
          fontFamily: serif, fontWeight: 700,
          fontSize: "clamp(44px, 4.4vw, 60px)",
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          color: active ? ll.primary : ll.light,
          transition: "color 260ms ease-out",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{
          width: 36, height: 36,
          background: active ? ll.primary : ll.surface,
          border: `1px solid ${active ? ll.primary : ll.line}`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "background 260ms ease-out, border-color 260ms ease-out",
        }}>
          <I size={18} color={active ? "#FFFFFF" : ll.primary} weight="regular" />
        </span>
      </div>

      {/* Right column — content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ ...mono, fontSize: 10, color: ll.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
            {tension.tag}
          </span>
          <span style={{ ...mono, fontSize: 10, color: ll.muted, letterSpacing: "0.2em", fontWeight: 700 }}>
            {tension.count} OBS
          </span>
        </div>
        <h4 style={{
          fontFamily: serif, fontWeight: 700,
          fontSize: "clamp(19px, 1.7vw, 23px)",
          letterSpacing: "-0.015em", lineHeight: 1.2,
          color: "var(--text-primary)",
        }}>
          {tension.title}
        </h4>
        <p style={{
          fontFamily: sans, fontSize: 16.5, lineHeight: 1.65,
          color: "var(--text-secondary)",
        }}>
          {tension.takeaway}
        </p>

        {/* Proportional count bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          marginTop: 6,
        }}>
          <div style={{ flex: 1, height: 3, background: ll.subtle, position: "relative" }}>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", left: 0, top: 0,
                width: `${(tension.count / 40) * 100}%`,
                height: "100%",
                background: active ? ll.warm : ll.primary,
                transformOrigin: "left",
                transition: "background 260ms ease-out",
              }}
            />
          </div>
          <span style={{ ...mono, fontSize: 10, color: ll.muted, letterSpacing: "0.2em", fontWeight: 700 }}>
            {Math.round((tension.count / 40) * 100)}%
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function AffinityOutput() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div style={{ marginBottom: "clamp(56px, 6vw, 88px)" }}>
      {/* Header row */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        style={{ marginBottom: "clamp(28px, 3vw, 40px)" }}
      >
        <div className="lg:col-span-8">
          <Reveal>
            <p style={{ ...t.eyebrow, marginBottom: 14 }}>AFFINITY · OUTPUT</p>
            <h3 style={{ ...t.h3 }}>
              Forty observations,
              <span style={{ fontStyle: "italic", color: ll.primary }}> four tensions.</span>
            </h3>
          </Reveal>
        </div>
        <div className="lg:col-span-4">
          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex", justifyContent: "flex-end",
                gap: 24, flexWrap: "wrap",
              }}
            >
              {([
                { k: "OBSERVATIONS", v: "40" },
                { k: "THEMES",       v: "04" },
                { k: "OWNERS",       v: "12" },
              ] as { k: string; v: string }[]).map((m) => (
                <div key={m.k} style={{ textAlign: "right" }}>
                  <div style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(24px, 2.2vw, 30px)",
                    letterSpacing: "-0.02em",
                    color: ll.primary, lineHeight: 1,
                  }}>
                    {m.v}
                  </div>
                  <div style={{
                    ...mono, fontSize: 9.5, color: ll.muted,
                    letterSpacing: "0.22em", fontWeight: 700,
                    marginTop: 6,
                  }}>
                    {m.k}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* 2x2 Tension grid */}
      <div
        className="tension-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "clamp(16px, 1.8vw, 24px)",
          marginBottom: "clamp(40px, 4.6vw, 64px)",
        }}
      >
        {TENSIONS.map((tn, i) => (
          <TensionCard
            key={tn.tag}
            t={tn}
            index={i}
            active={active === i}
            onEnter={() => setActive(i)}
            onLeave={() => setActive((curr) => (curr === i ? null : curr))}
          />
        ))}
      </div>

      {/* Full-width affinity map */}
      <Reveal delay={0.1}>
        <Plate
          src={`${IMG}/user-stories.png`}
          alt="Affinity map of user stories from small business owner interviews."
          caption="FIG · 01 / AFFINITY MAP · USER STORIES CLUSTERED BY TENSION"
          tag="RESEARCH"
          aspect="16 / 7"
          bg={ll.surface}
          padding="clamp(8px, 1vw, 16px)"
        />
      </Reveal>

      <style>{`
        @media (max-width: 780px) {
          .tension-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PERSONAS — interactive tabbed explorer
══════════════════════════════════════════════════════════════════ */
type PersonaGroup = { icon: Icon; label: string; items: string[] };
type Persona = {
  tag: string;
  archetype: string;
  name: string;
  role: string;
  stage: string;
  quote: string;
  img: string;
  groups: PersonaGroup[];
};

const PERSONAS: Persona[] = [
  {
    tag: "P·01",
    archetype: "Early-stage owner",
    name: "Amara N.",
    role: "Founder · solo operator",
    stage: "0–12 months in business",
    quote: "I have customers. I just need a way to actually reach more of them online.",
    img: `${IMG}/persona-1.png`,
    groups: [
      {
        icon: Sparkle, label: "Goals",
        items: [
          "Local discoverability",
          "Mentor who's been here",
          "Tools that save time",
        ],
      },
      {
        icon: Wrench, label: "Frustrations",
        items: [
          "Tools built for teams",
          "Generic advice",
          "Forums feel too big",
        ],
      },
      {
        icon: Path, label: "Behaviours",
        items: [
          "Runs shop from a phone",
          "Trusts word of mouth",
          "Tries, then commits",
        ],
      },
    ],
  },
  {
    tag: "P·02",
    archetype: "Growth-oriented owner",
    name: "Daniel O.",
    role: "Owner · small team lead",
    stage: "2–5 years, starting to scale",
    quote: "I don't need another dashboard. I need the right person to tell me what to fix next.",
    img: `${IMG}/persona-2.png`,
    groups: [
      {
        icon: Sparkle, label: "Goals",
        items: [
          "Benchmark by industry",
          "Convert social to repeat",
          "Systemize the ad-hoc",
        ],
      },
      {
        icon: Wrench, label: "Frustrations",
        items: [
          "Generic playbooks",
          "Stage-specific mentors",
          "Data without decisions",
        ],
      },
      {
        icon: Path, label: "Behaviours",
        items: [
          "Compares before committing",
          "Peers over templates",
          "Tracks weekly metrics",
        ],
      },
    ],
  },
];

function PersonasSection() {
  const [active, setActive] = useState(0);
  const p = PERSONAS[active];

  return (
    <section style={{
      padding: SECTION_PAD,
      ...gridSurface,
      borderTop: `1px solid ${ll.line}`,
      borderBottom: `1px solid ${ll.line}`,
    }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader num="04" title="Personas" phase="Synthesis" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 style={{ ...t.h2, marginBottom: 20 }}>
                Two owners,
                <span style={{ fontStyle: "italic", color: ll.primary }}> one shared platform.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                The early-stage owner and the growth-oriented owner showed up in every interview with the
                same platform needs and different stakes. Every feature had to answer to both without favoring either.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.16}>
              <p style={{
                ...mono, fontSize: 11, letterSpacing: "0.22em",
                color: ll.muted, fontWeight: 700, textAlign: "right",
              }}>
                02 ARCHETYPES<br />PRESSURE-TESTED ACROSS EVERY SCREEN
              </p>
            </Reveal>
          </div>
        </div>

        {/* Tab bar */}
        <Reveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Personas"
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: "clamp(28px, 3vw, 40px)",
            }}
          >
            {PERSONAS.map((persona, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={persona.tag}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    position: "relative",
                    display: "inline-flex", alignItems: "center", gap: 12,
                    padding: "14px 22px",
                    background: isActive ? ll.primary : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : ll.primary,
                    border: `1px solid ${isActive ? ll.primary : ll.line}`,
                    cursor: "pointer",
                    transition: "background 240ms ease-out, color 240ms ease-out, border-color 240ms ease-out",
                    fontFamily: sans,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.borderColor = ll.primary;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.borderColor = ll.line;
                  }}
                >
                  <span style={{
                    ...mono, fontSize: 10, letterSpacing: "0.22em",
                    fontWeight: 700,
                    color: isActive ? "rgba(255,255,255,0.75)" : ll.muted,
                  }}>
                    {persona.tag}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.005em" }}>
                    {persona.archetype}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="persona-tab-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      style={{
                        position: "absolute", left: 0, right: 0, bottom: -1,
                        height: 2, background: ll.warm,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        {/* Content */}
        <div
          className="persona-card"
          style={{
            background: "#FFFFFF",
            border: `1px solid ${ll.line}`,
            overflow: "hidden",
            boxShadow: "0 1px 2px rgba(18,26,42,0.03), 0 14px 36px rgba(59,79,123,0.08)",
          }}
        >
          <div
            className="persona-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(320px, 6fr) minmax(280px, 6fr)",
              minHeight: 640,
            }}
          >
            {/* Left — image */}
            <div style={{
              position: "relative",
              background: ll.surface,
              borderRight: `1px solid ${ll.line}`,
              overflow: "hidden",
            }}>
              {/* Registration marks */}
              {[
                { top: 12, left: 12,  t: true,  l: true  },
                { top: 12, right: 12, t: true,  l: false },
                { bottom: 12, left: 12,  t: false, l: true  },
                { bottom: 12, right: 12, t: false, l: false },
              ].map((pos, i) => (
                <span
                  key={i} aria-hidden
                  style={{
                    position: "absolute", width: 11, height: 11,
                    borderTop:    pos.t  ? `1px solid ${ll.primary}` : "none",
                    borderBottom: !pos.t ? `1px solid ${ll.primary}` : "none",
                    borderLeft:   pos.l  ? `1px solid ${ll.primary}` : "none",
                    borderRight:  !pos.l ? `1px solid ${ll.primary}` : "none",
                    opacity: 0.5, zIndex: 2,
                    top: pos.top, left: pos.left, bottom: pos.bottom, right: pos.right,
                  }}
                />
              ))}
              <span style={{
                position: "absolute", top: 20, left: 20,
                ...mono, fontSize: 9.5, color: ll.primary,
                letterSpacing: "0.22em", fontWeight: 700,
                background: "rgba(255,255,255,0.92)",
                padding: "5px 10px",
                border: `1px solid ${ll.line}`,
                zIndex: 3,
              }}>
                {p.tag}
              </span>
              <AnimatePresence mode="wait">
                <motion.img
                  key={p.img}
                  src={p.img}
                  alt={p.archetype}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",
                    padding: "clamp(10px, 1.4vw, 20px)",
                    display: "block",
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Right — content */}
            <div style={{
              padding: "clamp(28px, 3.4vw, 48px)",
              display: "flex", flexDirection: "column",
              gap: "clamp(20px, 2vw, 28px)",
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.tag}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2vw, 28px)" }}
                >
                  {/* Header */}
                  <div>
                    <p style={{
                      ...mono, fontSize: 10, letterSpacing: "0.22em",
                      color: ll.primary, fontWeight: 700, marginBottom: 10,
                    }}>
                      {p.archetype.toUpperCase()}
                    </p>
                    <h3 style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(26px, 2.6vw, 34px)",
                      letterSpacing: "-0.02em", lineHeight: 1.15,
                      color: "var(--text-primary)",
                      marginBottom: 8,
                    }}>
                      {p.name}
                    </h3>
                    <p style={{
                      fontFamily: sans, fontSize: 14,
                      color: ll.muted, fontWeight: 500,
                      letterSpacing: "0.01em",
                    }}>
                      {p.role} · {p.stage}
                    </p>
                  </div>

                  {/* Quote */}
                  <blockquote style={{
                    margin: 0, padding: "16px 20px",
                    borderLeft: `3px solid ${ll.primary}`,
                    background: ll.surface,
                    fontFamily: serif, fontStyle: "italic",
                    fontSize: "clamp(16px, 1.25vw, 19px)",
                    lineHeight: 1.5, color: "var(--text-primary)",
                    letterSpacing: "-0.005em",
                  }}>
                    "{p.quote}"
                  </blockquote>

                  {/* Trait groups */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "clamp(16px, 1.6vw, 24px)",
                  }}>
                    {p.groups.map((g, gi) => {
                      const I = g.icon;
                      return (
                        <motion.div
                          key={g.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.15 + gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          style={{ display: "flex", flexDirection: "column", gap: 10 }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{
                              width: 28, height: 28,
                              background: ll.surface,
                              border: `1px solid ${ll.line}`,
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <I size={14} color={ll.primary} weight="regular" />
                            </span>
                            <span style={{
                              ...mono, fontSize: 10, letterSpacing: "0.22em",
                              color: ll.primary, fontWeight: 700,
                            }}>
                              {g.label.toUpperCase()}
                            </span>
                          </div>
                          <ul style={{
                            margin: 0, paddingLeft: 0, listStyle: "none",
                            display: "flex", flexDirection: "column", gap: 8,
                          }}>
                            {g.items.map((item, ii) => (
                              <li key={ii} style={{
                                position: "relative", paddingLeft: 16,
                                fontFamily: sans, fontSize: 14.5, lineHeight: 1.55,
                                color: "var(--text-secondary)",
                              }}>
                                <span aria-hidden style={{
                                  position: "absolute", left: 0, top: "0.75em",
                                  width: 6, height: 1, background: ll.primary,
                                }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .persona-grid {
              grid-template-columns: minmax(0, 1fr) !important;
            }
            .persona-grid > div:first-child {
              border-right: none !important;
              border-bottom: 1px solid ${ll.line} !important;
              min-height: 340px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function LocalLiftCase() {
  const otherProjects = projects.filter((p) => p.slug !== "locallift").slice(0, 2);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);

  // Subtle parallax on hero copy
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, -60]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-14"
    >
      {/* Top nav mask */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 59,
        background: "var(--bg-primary)", zIndex: 45, pointerEvents: "none",
      }} />

      {/* Scroll progress */}
      <div style={{
        position: "fixed", top: 56, left: 0, right: 0, height: 2,
        background: "var(--bg-primary)", zIndex: 49,
      }}>
        <motion.div style={{
          height: "100%", background: ll.primary,
          scaleX, transformOrigin: "left", opacity: 0.9,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          00 · HERO — three-phone mockup stage
      ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "calc(100vh - 56px)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          background: "var(--bg-primary)",
        }}
      >
        {/* Blueprint grid backdrop */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            repeating-linear-gradient(0deg,  ${ll.subtle} 0 0.5px, transparent 0.5px 22px),
            repeating-linear-gradient(90deg, ${ll.subtle} 0 0.5px, transparent 0.5px 22px),
            repeating-linear-gradient(0deg,  ${ll.line}  0 0.5px, transparent 0.5px 88px),
            repeating-linear-gradient(90deg, ${ll.line}  0 0.5px, transparent 0.5px 88px)
          `,
          opacity: 0.55,
          maskImage: "radial-gradient(ellipse 85% 85% at 55% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 55% 50%, #000 40%, transparent 100%)",
        }} />

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05, duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            width: "100%", flexShrink: 0,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: "clamp(16px, 2vw, 24px)",
            paddingBottom: 14,
            flexWrap: "wrap", gap: 16,
            borderBottom: `1px solid ${ll.line}`,
            position: "relative", zIndex: 1,
          }}
        >
          <Link to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              ...mono, fontSize: 11, letterSpacing: "0.22em",
              color: "var(--text-secondary)", textDecoration: "none",
              transitionProperty: "color", transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ll.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
          >
            <ArrowLeft size={14} weight="regular" />
            Index
          </Link>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {["UX Research", "Service Design", "SMB", "Cross-cultural"].map((tag) => (
              <span key={tag} style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero body */}
        <div
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            flex: 1, width: "100%", minHeight: 0,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "clamp(24px, 3vw, 40px)",
            alignItems: "center",
            paddingTop: "clamp(32px, 3.5vw, 56px)",
            paddingBottom: "clamp(24px, 2.6vw, 40px)",
            position: "relative", zIndex: 1,
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-12"
            style={{
              gap: "clamp(28px, 3.4vw, 52px)",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* LEFT — title + lede + meta */}
            <motion.div
              className="md:col-span-5"
              style={{ minWidth: 0, opacity: heroOpacity, y: heroY }}
            >
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}
                style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, maxWidth: 460 }}
              >
                <span style={{ ...mono, fontSize: 11, color: ll.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                  Case Study · 04
                </span>
                <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
                  SMB · 2024
                </span>
              </motion.div>

              <div style={{ overflow: "hidden", marginBottom: "clamp(22px, 2.4vw, 32px)" }}>
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(60px, 8.5vw, 124px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.055em", lineHeight: 0.92,
                    margin: 0,
                  }}
                >
                  LocalLift<span style={{ color: ll.primary, fontStyle: "italic" }}>.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                style={{
                  fontFamily: serif, fontStyle: "italic",
                  fontSize: "clamp(19px, 1.7vw, 25px)",
                  color: "var(--text-primary)",
                  lineHeight: 1.45, maxWidth: 520,
                  marginBottom: "clamp(28px, 3vw, 40px)",
                  letterSpacing: "-0.01em",
                }}
              >
                A mentorship and digital-tools app built to close the gap between small business owners and
                <span style={{ color: ll.primary }}> the digital economy </span>
                they're supposed to already live in.
              </motion.p>

              {/* Meta — 2x2 grid */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  columnGap: "clamp(20px, 3vw, 40px)",
                  rowGap: 22,
                  borderTop: `1px solid ${ll.line}`,
                  paddingTop: 24,
                  maxWidth: 460,
                }}
              >
                {([
                  { label: "Role",     value: "UX Researcher / Designer" },
                  { label: "Methods",  value: "Interviews · Affinity · Testing" },
                  { label: "Timeline", value: "10 weeks" },
                  { label: "Team",     value: "5 members" },
                ] as { label: string; value: string }[]).map((m) => (
                  <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{ ...mono, fontSize: 11, color: ll.muted, letterSpacing: "0.22em", fontWeight: 700 }}>
                      {m.label}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 16, fontWeight: 500, color: "var(--text-primary)" }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — phones */}
            <HeroMockup />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            width: "100%", flexShrink: 0,
            display: "flex", justifyContent: "center", alignItems: "center",
            paddingBottom: "clamp(14px, 1.6vw, 22px)",
            position: "relative", zIndex: 1,
          }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              ...mono, fontSize: 10, letterSpacing: "0.22em",
              color: "var(--text-secondary)",
            }}
          >
            Scroll
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 01 · CONTEXT ─────────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD, background: "var(--bg-primary)",
        borderTop: `1px solid ${ll.line}`,
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="01" title="Context" phase="Setup" />

          <div style={{ maxWidth: 820 }}>
            <Reveal>
              <h2 style={{ ...t.h2, marginBottom: 22 }}>
                A mentorship platform,
                <span style={{ fontStyle: "italic", color: ll.primary }}> grounded in real owners across two markets.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ ...t.bodyLg, marginBottom: 20 }}>
                LocalLift sits at the intersection of two growth markets for small business: the US Southeast
                and Southern Africa. A five-person product team spent the first weeks of the build in listening
                mode, reading the space, choosing the owner, and writing the question we actually wanted to answer.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p style={{ ...t.bodyLg }}>
                The mandate: <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>design a service
                that helps a local small business grow digitally</span>, without flattening what made it local.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 02 · PROBLEM ─────────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        ...gridSurface,
        borderTop: `1px solid ${ll.line}`,
        borderBottom: `1px solid ${ll.line}`,
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="02" title="The gap" phase="Problem" />

          <div style={{ maxWidth: 820, marginBottom: "clamp(48px, 5vw, 72px)" }}>
            <Reveal>
              <h2 style={{ ...t.h2, marginBottom: 20 }}>
                Digital tools were built for scale.
                <br />
                <span style={{ fontStyle: "italic", color: ll.primary }}>Most small businesses are built for survival.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ ...t.bodyLg }}>
                SMB-facing platforms are either too technical, too abstract, or too generic to help a specific
                owner in a specific market make a specific decision. The result isn't a gap in ambition.
                It's a gap in access, in mentorship, and in the feedback loop between tool and user.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 1,
              background: ll.line,
              border: `1px solid ${ll.line}`,
            }}
          >
            {([
              { icon: Wrench,     head: "Built for enterprise",    body: "Dashboards, settings, and workflows assume a team. The owner of one location is navigating them alone, between customers.", tag: "OBS · 01" },
              { icon: UsersThree, head: "No peer backbone",         body: "Owners learn by doing and re-doing. There's no channel to exchange what works with other owners one block over, one industry across.", tag: "OBS · 02" },
              { icon: MapPin,     head: "Advice without a ZIP code", body: "Generic playbooks miss local regulation, local customers, local pricing. What an owner needs is advice that knows their street.", tag: "OBS · 03" },
            ] as { icon: Icon; head: string; body: string; tag: string }[]).map((o, i) => {
              const I = o.icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                    style={{
                      background: "#FFFFFF",
                      padding: "32px 28px 30px",
                      height: "100%",
                      display: "flex", flexDirection: "column",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                      <div style={{
                        width: 44, height: 44, background: ll.subtle,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <I size={22} color={ll.primary} weight="regular" />
                      </div>
                      <p style={{ ...mono, fontSize: 9.5, color: ll.muted, letterSpacing: "0.22em", fontWeight: 700 }}>
                        {o.tag}
                      </p>
                    </div>
                    <h3 style={{ ...t.h3, marginBottom: 12 }}>{o.head}</h3>
                    <p style={{ ...t.body, flex: 1 }}>{o.body}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 03 · RESEARCH ──────────────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="03" title="Research" phase="Method + synthesis" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{ ...t.h2, marginBottom: 20 }}>
                  A cross-cultural study,
                  <span style={{ fontStyle: "italic", color: ll.primary }}> shaped in partnership with local voices.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  Three lenses: understand the owner's day, cluster what we heard across context, turn it into
                  archetypes the team could design against. Local collaborators translated insight, literally
                  and culturally, so patterns carried the texture of each market, not just one.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.16}>
                <p style={{
                  ...mono, fontSize: 11, letterSpacing: "0.22em",
                  color: ll.muted, fontWeight: 700, textAlign: "right",
                }}>
                  03 METHODS<br />ONE SHARED TRANSCRIPT
                </p>
              </Reveal>
            </div>
          </div>

          {/* Method tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(18px, 1.8vw, 28px)",
              marginBottom: "clamp(56px, 6vw, 88px)",
            }}
          >
            {([
              { num: "M·01", icon: ChatCircleText, title: "Interviews",       body: "Semi-structured conversations with small business owners across industries and stages. Recorded, coded, revisited.", output: "5 voices · 6 questions" },
              { num: "M·02", icon: Stack,          title: "Affinity mapping", body: "Clustered observations into four tensions: mentorship, tools, peer networks, local context. Prioritised by frequency and urgency.", output: "40+ observations" },
              { num: "M·03", icon: UsersThree,     title: "Personas",         body: "Two archetypes pressure-tested across every screen: the early-stage owner and the growth-oriented owner.", output: "2 archetypes" },
            ] as { num: string; icon: Icon; title: string; body: string; output: string }[]).map((m, i) => {
              const I = m.icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.07}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                    style={{
                      background: "#FFFFFF",
                      border: `1px solid ${ll.line}`,
                      padding: "30px 28px 26px",
                      height: "100%",
                      display: "flex", flexDirection: "column",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
                      <span style={{ ...mono, fontSize: 11, color: ll.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                        {m.num}
                      </span>
                      <I size={22} color={ll.primary} weight="regular" />
                    </div>
                    <h3 style={{ ...t.h3, marginBottom: 12 }}>{m.title}</h3>
                    <p style={{ ...t.body, flex: 1, marginBottom: 20 }}>{m.body}</p>
                    <p style={{
                      ...mono, fontSize: 10, letterSpacing: "0.22em",
                      color: ll.primary, fontWeight: 700,
                      paddingTop: 14, borderTop: `1px solid ${ll.line}`,
                    }}>
                      OUTPUT · {m.output}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          {/* Affinity output — redesigned: header row, 2x2 tension grid, full-width plate */}
          <AffinityOutput />


          {/* Voices */}
          <Reveal>
            <p style={{ ...t.eyebrow, marginBottom: 18 }}>VOICES · DIRECT QUOTES</p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(16px, 1.6vw, 24px)",
            }}
          >
            {([
              { num: "V·01", finding: "Mentorship must be industry-specific", quote: "I need someone who's been in my shoes to tell me exactly what works and what doesn't." },
              { num: "V·02", finding: "Tools must feel built for them",       quote: "There are so many tools, but they feel built for big companies, not me." },
              { num: "V·03", finding: "Peer networks are missing",            quote: "I'm figuring everything out alone. Connecting with other owners would help me avoid mistakes." },
              { num: "V·04", finding: "Local context beats generic",           quote: "I need insights relevant to my city and industry, not generic business tips." },
            ] as { num: string; finding: string; quote: string }[]).map((v, i) => (
              <Reveal key={i} delay={0.05 + i * 0.06}>
                <motion.figure
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  style={{
                    background: "#FFFFFF",
                    border: `1px solid ${ll.line}`,
                    padding: "28px 26px 24px",
                    height: "100%",
                    display: "flex", flexDirection: "column",
                    gap: 16, margin: 0,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ ...mono, fontSize: 11, color: ll.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                      {v.num}
                    </span>
                    <span aria-hidden style={{
                      fontFamily: serif, fontStyle: "italic", fontSize: 42,
                      color: ll.primary, opacity: 0.22, lineHeight: 0.6,
                    }}>"</span>
                  </div>
                  <blockquote style={{
                    fontFamily: serif, fontStyle: "italic",
                    fontSize: "clamp(18px, 1.4vw, 21px)",
                    color: "var(--text-primary)",
                    lineHeight: 1.45, letterSpacing: "-0.01em",
                    margin: 0, flex: 1,
                  }}>
                    {v.quote}
                  </blockquote>
                  <figcaption style={{
                    ...mono, fontSize: 9.5, letterSpacing: "0.22em",
                    color: ll.muted, fontWeight: 700,
                    paddingTop: 16, borderTop: `1px solid ${ll.line}`,
                  }}>
                    FINDING · {v.finding}
                  </figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04 · PERSONAS ─────────────────────────────────── */}
      <PersonasSection />

      {/* ─── 05 · LOFI EXPLORATION ──────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="05" title="Lo-fi exploration" phase="Wireframes" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2, marginBottom: 20 }}>
                  Start in greyscale.
                  <span style={{ fontStyle: "italic", color: ll.primary }}> Test structure before style.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 620 }}>
                  Every flow began as a lo-fi wireframe: onboarding, auth, explore, search, community, profile.
                  We tested placement, hierarchy, and task sequence first so that colour, copy, and type couldn't
                  mask a broken structure.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.16}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  padding: "12px 18px",
                  background: ll.subtle,
                  border: `1px solid ${ll.line}`,
                  float: "right",
                }}>
                  <PencilSimple size={18} color={ll.primary} weight="regular" />
                  <span style={{ ...mono, fontSize: 11, color: ll.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                    10 WIREFRAMES · 4 FLOWS
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          <LofiFilmstrip
            items={[
              { src: `${LOFI}/lofi-splash.png`,       label: "Splash" },
              { src: `${LOFI}/lofi-onboarding-1.png`, label: "Onboard · 1" },
              { src: `${LOFI}/lofi-onboarding-2.png`, label: "Onboard · 2" },
              { src: `${LOFI}/lofi-onboarding-3.png`, label: "Onboard · 3" },
              { src: `${LOFI}/lofi-login.png`,        label: "Login" },
              { src: `${LOFI}/lofi-signup.png`,       label: "Sign up" },
              { src: `${LOFI}/lofi-explore.png`,      label: "Explore" },
              { src: `${LOFI}/lofi-search.png`,       label: "Search" },
              { src: `${LOFI}/lofi-community.png`,    label: "Community" },
              { src: `${LOFI}/lofi-profile.png`,      label: "Profile" },
            ]}
            groups={[
              { id: "all",        label: "All flows",  indices: [0,1,2,3,4,5,6,7,8,9] },
              { id: "onboarding", label: "Onboarding", indices: [0,1,2,3] },
              { id: "auth",       label: "Auth",       indices: [4,5] },
              { id: "core",       label: "Core",       indices: [6,7,8,9] },
            ]}
          />
        </div>
      </section>

      {/* ─── 06 · HIFI FINAL DESIGN ──────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        ...gridSurface,
        borderTop: `1px solid ${ll.line}`,
        borderBottom: `1px solid ${ll.line}`,
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="06" title="Final design" phase="Hi-fi UI" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2, marginBottom: 20 }}>
                  A quiet UI for a loud week.
                  <span style={{ fontStyle: "italic", color: ll.primary }}> Calm indigo, clear hierarchy, one action at a time.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 620 }}>
                  The hi-fi system layered type weight, gentle elevation, and an indigo accent on a near-white
                  surface. Every screen earns one primary action. The rest of the UI recedes until it's asked for.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.16}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  padding: "12px 18px",
                  background: "#FFFFFF",
                  border: `1px solid ${ll.line}`,
                  float: "right",
                }}>
                  <Sparkle size={18} color={ll.primary} weight="regular" />
                  <span style={{ ...mono, fontSize: 11, color: ll.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                    14 HI-FI SCREENS · 6 FLOWS
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          <PhoneGallery
            items={[
              { src: `${HIFI}/hifi-splash.png`,         label: "Splash" },
              { src: `${HIFI}/hifi-onboarding-1.png`,   label: "Onboard · 1" },
              { src: `${HIFI}/hifi-onboarding-2.png`,   label: "Onboard · 2" },
              { src: `${HIFI}/hifi-onboarding-3.png`,   label: "Onboard · 3" },
              { src: `${HIFI}/hifi-login.png`,          label: "Login" },
              { src: `${HIFI}/hifi-signup.png`,         label: "Sign up" },
              { src: `${HIFI}/hifi-explore.png`,        label: "Explore" },
              { src: `${HIFI}/hifi-search.png`,         label: "Search" },
              { src: `${HIFI}/hifi-community.png`,      label: "Community" },
              { src: `${HIFI}/hifi-profile-posts.png`,  label: "Profile · Posts" },
              { src: `${HIFI}/hifi-profile-company.png`, label: "Profile · Company" },
              { src: `${HIFI}/hifi-profile-founder.png`, label: "Profile · Founder" },
              { src: `${HIFI}/hifi-course.png`,         label: "Course detail" },
              { src: `${HIFI}/hifi-session.png`,        label: "Mentor session" },
            ]}
          />

          {/* User flow — full-width under gallery */}
          <div style={{ marginTop: "clamp(56px, 6vw, 88px)" }}>
            <Reveal>
              <Plate
                src={`${IMG}/user-flow.png`}
                alt="Primary user flow from onboarding through mentorship match."
                caption="FIG · 02 / PRIMARY USER FLOW · ONBOARD → MATCH → LEARN → APPLY"
                tag="FLOW"
                aspect="16 / 7"
                bg="#FFFFFF"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 07 · ITERATIONS ──────────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="07" title="Iterations" phase="Usability rounds" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{ ...t.h2, marginBottom: 20 }}>
                  Three rounds, three
                  <span style={{ fontStyle: "italic", color: ll.primary }}> targeted changes.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  Each usability round surfaced a single friction. Each iteration answered that friction with one
                  visible move, not a redesign but a correction. The outcome came from stacking the three.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.16}>
                <p style={{
                  ...mono, fontSize: 11, letterSpacing: "0.22em",
                  color: ll.muted, fontWeight: 700, textAlign: "right",
                }}>
                  03 MOVES<br />BEFORE · AFTER
                </p>
              </Reveal>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px, 4.4vw, 64px)" }}>
            {([
              {
                num: "01", icon: Layout,
                friction: "Dense cards slowed scanning",
                move: "Reduced card hierarchy from five fields to three; separated primary action from metadata.",
                principle: "Visual hierarchy",
                result: "20% faster information absorption",
                img: `${IMG}/improvement-card-design.png`,
                tag: "ITER · 01",
              },
              {
                num: "02", icon: Path,
                friction: "Users unsure where they were in a task",
                move: "Added a persistent progress bar across onboarding and mentor-match flows, with explicit step counts.",
                principle: "Visibility of status",
                result: "20% less reported confusion",
                img: `${IMG}/improvement-progress-bar.png`,
                tag: "ITER · 02",
              },
              {
                num: "03", icon: MagnifyingGlass,
                friction: "Generic search buried the local answer",
                move: "Restructured search around industry + city as first-class filters, with recency and proximity as signals.",
                principle: "Recognition over recall",
                result: "40% faster time-to-relevant-result",
                img: `${IMG}/improvement-search-filter.png`,
                tag: "ITER · 03",
              },
            ] as { num: string; icon: Icon; friction: string; move: string; principle: string; result: string; img: string; tag: string }[]).map((m, i) => {
              const I = m.icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.06}>
                  <div
                    className="iteration-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(260px, 0.8fr) minmax(0, 1.4fr)",
                      gap: "clamp(24px, 2.6vw, 44px)",
                      alignItems: "center",
                    }}
                  >
                    {/* LEFT — narrative */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{
                          fontFamily: serif, fontWeight: 700,
                          fontSize: "clamp(48px, 5vw, 64px)", color: ll.primary,
                          letterSpacing: "-0.04em", lineHeight: 1,
                        }}>
                          {m.num}
                        </span>
                        <I size={26} color={ll.primary} weight="regular" />
                      </div>

                      <div>
                        <p style={{ ...mono, fontSize: 10, color: ll.muted, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 8 }}>
                          FRICTION
                        </p>
                        <p style={{ ...t.h3, letterSpacing: "-0.02em" }}>{m.friction}</p>
                      </div>

                      <div style={{ borderTop: `1px solid ${ll.line}`, paddingTop: 16 }}>
                        <p style={{ ...mono, fontSize: 10, color: ll.muted, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 8 }}>
                          MOVE
                        </p>
                        <p style={{ ...t.body }}>{m.move}</p>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 4 }}>
                        <span style={{
                          ...mono, fontSize: 10, letterSpacing: "0.22em",
                          color: ll.primary, fontWeight: 700,
                          padding: "6px 11px", border: `1px solid ${ll.primary}`,
                        }}>
                          {m.principle}
                        </span>
                        <span style={{
                          fontFamily: serif, fontStyle: "italic", fontWeight: 700,
                          fontSize: 18, color: ll.primary, letterSpacing: "-0.01em",
                        }}>
                          → {m.result}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT — image */}
                    <div>
                      <Plate
                        src={m.img}
                        alt={`Before and after for ${m.friction}`}
                        tag={m.tag}
                        aspect="16 / 10"
                        fit="contain"
                        bg={ll.surface}
                        compareArrow
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <style>{`
            @media (max-width: 900px) {
              .iteration-row {
                grid-template-columns: minmax(0, 1fr) !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ─── 08 · OUTCOMES ──────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        ...gridDark,
        color: "#FFFFFF",
        borderTop: `1px solid ${ll.dark}`,
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ marginBottom: "clamp(44px, 5vw, 72px)" }}>
            <div style={{
              display: "flex", alignItems: "baseline", gap: 20, flexWrap: "wrap",
              paddingBottom: 16,
            }}>
              <span style={{ ...mono, fontSize: 13, color: "#FFFFFF", letterSpacing: "0.24em", fontWeight: 700 }}>
                08 <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>/ {TOTAL}</span>
              </span>
              <span style={{ ...mono, fontSize: 13, color: "#FFFFFF", letterSpacing: "0.24em", fontWeight: 600 }}>
                Outcomes
              </span>
              <span style={{ ...mono, fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.22em", marginLeft: "auto" }}>
                Measured impact
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.3)" }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{
                  fontFamily: serif, fontWeight: 700,
                  fontSize: "clamp(32px, 3.8vw, 48px)",
                  letterSpacing: "-0.025em", lineHeight: 1.15,
                  color: "#FFFFFF", marginBottom: 20,
                }}>
                  Small moves,
                  <span style={{ fontStyle: "italic", color: ll.warm }}> compounded.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{
                  fontFamily: sans, fontSize: "clamp(17px, 1.2vw, 19px)",
                  lineHeight: 1.7, color: "rgba(255,255,255,0.92)",
                  maxWidth: 640,
                }}>
                  Three iterations, three metrics. Owners scanned faster, navigated with less confusion, and
                  reached what they were looking for in less than half the time.
                </p>
              </Reveal>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 1,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {[
              { stat: 20, suffix: "%", label: "faster information absorption", source: "Usability Round · Cleaner cards", tag: "R·01" },
              { stat: 20, suffix: "%", label: "less reported confusion",        source: "Usability Round · Progress bar",  tag: "R·02" },
              { stat: 40, suffix: "%", label: "faster time-to-relevant-result", source: "Usability Round · Localised search", tag: "R·03" },
            ].map((s, i) => (
              <Reveal key={i} delay={0.05 + i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  style={{
                    background: ll.dark,
                    padding: "40px 30px 32px",
                    height: "100%",
                    display: "flex", flexDirection: "column",
                    cursor: "default",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <ChartBar size={24} color={ll.warm} weight="regular" />
                    <p style={{ ...mono, fontSize: 9.5, color: "rgba(255,255,255,0.65)", letterSpacing: "0.22em", fontWeight: 700 }}>
                      {s.tag}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(56px, 7vw, 82px)",
                    color: "#FFFFFF", lineHeight: 1, marginBottom: 18,
                    letterSpacing: "-0.04em",
                  }}>
                    <CountUp value={s.stat} suffix={s.suffix} />
                  </p>
                  <p style={{
                    fontFamily: sans, fontSize: 17, lineHeight: 1.5,
                    color: "rgba(255,255,255,0.92)", marginBottom: 20, flex: 1,
                  }}>
                    {s.label}
                  </p>
                  <p style={{
                    ...mono, fontSize: 10, color: "rgba(255,255,255,0.65)",
                    letterSpacing: "0.22em",
                    paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.18)",
                  }}>
                    {s.source}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 09 · REFLECTION ───────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="09" title="Reflection" phase="Takeaways" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-9">
              <Reveal>
                <h2 style={{ ...t.h2, marginBottom: 18 }}>
                  A platform
                  <span style={{ fontStyle: "italic", color: ll.primary }}> isn't a tool. It's a community the tool keeps open.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  The strongest thing this project left me with was a quiet reframe: stop designing around
                  the feature and start designing around the owner's week.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-3">
              <Reveal delay={0.16}>
                <p style={{
                  ...mono, fontSize: 11, letterSpacing: "0.22em",
                  color: ll.muted, fontWeight: 700, textAlign: "right",
                }}>
                  04 LESSONS<br />ONE STUDY
                </p>
              </Reveal>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(18px, 1.8vw, 28px)",
            }}
          >
            {([
              { num: "01", icon: Path,      short: "Follow the owner, not the feature.", body: "The design followed the owner's day. When an insight didn't fit one of the four themes, we didn't force it in. We held it and kept listening." },
              { num: "02", icon: Lightbulb, short: "Small iterations compound.",           body: "Three focused rounds produced the outcome, not one heroic redesign. Each fix targeted a single friction and left the rest of the product alone." },
              { num: "03", icon: Handshake, short: "Mentorship is infrastructure.",        body: "Peer networks and industry mentors turned the platform from a tool into a place. The tool's retention job is to keep the community open, not to replace it." },
              { num: "04", icon: MapPin,    short: "Local context is a feature.",          body: "Generic advice reads as noise. Designing search and content around industry + city made the product feel like it knew the owner, because it did." },
            ] as { num: string; icon: Icon; short: string; body: string }[]).map((lesson, i) => {
              const I = lesson.icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                    style={{
                      background: "#FFFFFF",
                      border: `1px solid ${ll.line}`,
                      padding: "30px 28px 28px",
                      height: "100%",
                      display: "flex", flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{
                        fontFamily: serif, fontWeight: 700, fontSize: 30,
                        color: ll.primary, letterSpacing: "-0.03em", lineHeight: 1,
                      }}>
                        {lesson.num}
                      </span>
                      <I size={22} color={ll.primary} weight="regular" />
                    </div>
                    <h3 style={{ ...t.h3 }}>{lesson.short}</h3>
                    <p style={{ ...t.body, margin: 0 }}>{lesson.body}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MORE CASE STUDIES
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(64px, 8vw, 104px) 0", borderTop: `1px solid ${ll.line}` }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 36 }}>
            <span aria-hidden style={{ width: 3, height: 14, background: ll.primary }} />
            <p style={{ ...mono, fontSize: 12, color: ll.primary, letterSpacing: "0.22em", fontWeight: 600 }}>
              More case studies
            </p>
          </div>

          <div
            className="more-cases-grid"
            style={{
              display: "grid",
              gridTemplateColumns: otherProjects.length > 1 ? "1fr 1fr" : "1fr",
              gap: "clamp(16px, 1.6vw, 24px)",
            }}
          >
            {otherProjects.map((p) => (
              <NavCard key={p.slug} project={p} />
            ))}
          </div>
          <style>{`
            @media (max-width: 720px) {
              .more-cases-grid { grid-template-columns: minmax(0, 1fr) !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          Back to top
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            style={{
              position: "fixed",
              right: "clamp(20px, 2.4vw, 32px)",
              bottom: "clamp(20px, 2.4vw, 32px)",
              zIndex: 60,
              width: 52, height: 52, borderRadius: 999,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              gap: 0,
              border: `1px solid ${ll.primary}`,
              background: "var(--bg-elevated)",
              color: ll.primary,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px rgba(59,79,123,0.18)",
              transitionProperty: "background-color, color, border-color",
              transitionDuration: "180ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = ll.primary;
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-elevated)";
              (e.currentTarget as HTMLElement).style.color = ll.primary;
            }}
          >
            <ArrowUp size={20} weight="bold" color="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
