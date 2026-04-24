import { motion, AnimatePresence, useInView, useMotionValue, useScroll, useSpring, animate } from "framer-motion";
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
  CompassIcon as Compass,
  PathIcon as Path,
  StackIcon as Stack,
  HandshakeIcon as Handshake,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { projects, type Project } from "../data/projects";

/* ── LocalLift palette, scoped to this page ───────────────────────── */
const ll = {
  primary: "#3B4F7B",         // deep indigo — mentorship, trust
  light:   "#6577A0",
  dark:    "#2A3A5C",
  surface: "#EDF0F7",
  subtle:  "rgba(59, 79, 123, 0.08)",
  muted:   "rgba(59, 79, 123, 0.55)",
  warm:    "#C47B3A",         // warm amber — the "lift", used sparingly
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
    ...mono, fontSize: 11, letterSpacing: "0.18em",
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  h2Section: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(30px, 3.6vw, 44px)",
    letterSpacing: "-0.025em", lineHeight: 1.2,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  bodyLg: {
    fontFamily: sans, fontSize: "clamp(18px, 1.4vw, 21px)",
    lineHeight: 1.75, color: "var(--text-secondary)",
  } as React.CSSProperties,
  body: {
    fontFamily: sans, fontSize: 18, lineHeight: 1.75,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  bodySm: {
    fontFamily: sans, fontSize: 14, lineHeight: 1.7,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
};

const SECTION_PAD = "clamp(72px, 9vw, 120px) 0";
const TOTAL = "06";

/* ══════════════════════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════════════════════ */
function Reveal({
  children, delay = 0, y = 20, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix = "", duration = 1.4 }: { value: number; suffix?: string; duration?: number }) {
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

function SectionHeader({
  num, title, phase,
}: { num: string; title: string; phase: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap",
        paddingBottom: 14,
      }}>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...mono, fontSize: 14, color: ll.primary,
            letterSpacing: "0.22em", fontWeight: 700,
          }}>
          {num} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {TOTAL}</span>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...mono, fontSize: 14, color: "var(--text-primary)",
            letterSpacing: "0.22em", fontWeight: 600,
          }}>
          {title}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.55 }}
          style={{
            ...mono, fontSize: 13, color: "var(--text-muted)",
            letterSpacing: "0.2em", marginLeft: "auto",
          }}>
          {phase}
        </motion.span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 1, background: ll.primary, transformOrigin: "left",
          opacity: 0.6,
        }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO VISUAL — editorial stack diagram
   Shows the gap LocalLift closes: owner → platform → market,
   with mentorship and peer network as the bridging layers.
══════════════════════════════════════════════════════════════════ */
function HeroVisual() {
  return (
    <div
      className="md:col-span-7"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 580,
        marginLeft: "auto",
      }}
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 560 420" width="100%" aria-hidden>
          {/* Blueprint grid backing */}
          <defs>
            <pattern id="ll-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={ll.subtle} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="560" height="420" fill="url(#ll-grid)" opacity="0.7" />

          {/* Registration marks */}
          {[
            { x: 8, y: 8, d: "M 0 0 L 12 0 M 0 0 L 0 12" },
            { x: 552, y: 8, d: "M 0 0 L -12 0 M 0 0 L 0 12" },
            { x: 8, y: 412, d: "M 0 0 L 12 0 M 0 0 L 0 -12" },
            { x: 552, y: 412, d: "M 0 0 L -12 0 M 0 0 L 0 -12" },
          ].map((m, i) => (
            <g key={i} transform={`translate(${m.x} ${m.y})`}>
              <path d={m.d} stroke={ll.primary} strokeWidth="1" />
            </g>
          ))}

          {/* Title bar */}
          <text x="24" y="36" {...{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.22em", fontWeight: 700 }} fill={ll.primary}>
            FIG · 01 / THE STACK
          </text>
          <line x1="24" y1="44" x2="536" y2="44" stroke={ll.primary} strokeWidth="0.5" opacity="0.5" />

          {/* Column A: without LocalLift */}
          <text x="92" y="72" textAnchor="middle" {...{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700 }} fill={ll.muted}>
            WITHOUT
          </text>
          {[
            { y: 88,  label: "OWNER" },
            { y: 140, label: "DAILY OPS" },
            { y: 248, label: "MARKET" },
          ].map((row, i) => (
            <g key={i}>
              <rect x="32" y={row.y} width="120" height="36" fill="#FFFFFF" stroke={ll.muted} strokeWidth="0.8" />
              <text x="92" y={row.y + 22} textAnchor="middle" {...{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.18em", fontWeight: 700 }} fill={ll.dark}>
                {row.label}
              </text>
            </g>
          ))}
          {/* Gap indicator */}
          <g>
            <line x1="92" y1="182" x2="92" y2="242" stroke={ll.warm} strokeWidth="1" strokeDasharray="3 3" />
            <text x="100" y="216" {...{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.18em", fontWeight: 700 }} fill={ll.warm}>
              GAP
            </text>
          </g>

          {/* Divider */}
          <line x1="200" y1="88" x2="200" y2="336" stroke={ll.subtle} strokeWidth="1" strokeDasharray="2 4" />

          {/* Arrow between columns */}
          <g transform="translate(220 200)">
            <line x1="0" y1="0" x2="24" y2="0" stroke={ll.primary} strokeWidth="1" />
            <path d="M 18 -4 L 24 0 L 18 4" fill="none" stroke={ll.primary} strokeWidth="1" />
          </g>

          {/* Column B: with LocalLift — full stack */}
          <text x="400" y="72" textAnchor="middle" {...{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700 }} fill={ll.primary}>
            WITH LOCALLIFT
          </text>
          {[
            { y: 88,  label: "OWNER",        highlight: false },
            { y: 132, label: "DAILY OPS",    highlight: false },
            { y: 176, label: "MENTORSHIP",   highlight: true },
            { y: 220, label: "PEER NETWORK", highlight: true },
            { y: 264, label: "LOCAL TOOLS",  highlight: false },
            { y: 308, label: "MARKET",       highlight: false },
          ].map((row, i) => (
            <g key={i}>
              <rect
                x="340" y={row.y} width="120" height="36"
                fill={row.highlight ? ll.primary : "#FFFFFF"}
                stroke={row.highlight ? ll.primary : ll.muted}
                strokeWidth="0.8"
              />
              <text
                x="400" y={row.y + 22}
                textAnchor="middle"
                {...{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.18em", fontWeight: 700 }}
                fill={row.highlight ? "#FFFFFF" : ll.dark}
              >
                {row.label}
              </text>
            </g>
          ))}

          {/* Right-side callouts */}
          <line x1="460" y1="194" x2="516" y2="194" stroke={ll.primary} strokeWidth="0.8" />
          <rect x="458" y="192" width="4" height="4" fill={ll.primary} />
          <text x="524" y="191" {...{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.18em", fontWeight: 700 }} fill={ll.primary} textAnchor="end">
            BRIDGING
          </text>
          <text x="524" y="204" {...{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.16em" }} fill={ll.muted} textAnchor="end">
            LAYERS
          </text>

          {/* Footer */}
          <line x1="24" y1="368" x2="536" y2="368" stroke={ll.primary} strokeWidth="0.5" opacity="0.5" />
          <text x="24" y="390" {...{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700 }} fill={ll.muted}>
            SCALE · 1:1
          </text>
          <text x="536" y="390" textAnchor="end" {...{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700 }} fill={ll.muted}>
            LL-STACK / v.01
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   NAV CARD — matching Shelfie pattern for consistency
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
        position: "relative",
        textDecoration: "none",
        display: "block",
        overflow: "hidden",
        aspectRatio: "5 / 4",
        background: project.gradient,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent 35%, ${accent}26 100%)`,
          opacity: hover ? 1 : 0,
          transition: "opacity 420ms ease-out",
          pointerEvents: "none",
        }}
      />

      <div style={{
        position: "absolute",
        top: "clamp(24px, 2.4vw, 36px)",
        left: "clamp(24px, 2.4vw, 36px)",
        right: "clamp(24px, 2.4vw, 36px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}>
        <span style={{ ...mono, fontSize: 11, color: "rgba(26,26,26,0.65)", letterSpacing: "0.24em", fontWeight: 600 }}>
          {project.year}
        </span>
        <span style={{
          ...mono, fontSize: 10,
          color: "rgba(26,26,26,0.65)", letterSpacing: "0.22em", fontWeight: 600,
          padding: "6px 10px", border: "1px solid rgba(26,26,26,0.18)", borderRadius: 999,
        }}>
          {primaryTag}
        </span>
      </div>

      <div style={{
        position: "absolute",
        left: "clamp(24px, 2.4vw, 36px)",
        right: "clamp(24px, 2.4vw, 36px)",
        bottom: "clamp(24px, 2.4vw, 36px)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
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
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function LocalLiftCase() {
  const otherProjects = projects.filter((p) => p.slug !== "locallift").slice(0, 2);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-14"
    >
      {/* Top mask for fixed nav */}
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
          scaleX, transformOrigin: "left", opacity: 0.85,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          00 · HERO
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Blueprint grid backdrop */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            repeating-linear-gradient(0deg, ${ll.subtle} 0 0.5px, transparent 0.5px 20px),
            repeating-linear-gradient(90deg, ${ll.subtle} 0 0.5px, transparent 0.5px 20px),
            repeating-linear-gradient(0deg, ${ll.muted} 0 0.5px, transparent 0.5px 80px),
            repeating-linear-gradient(90deg, ${ll.muted} 0 0.5px, transparent 0.5px 80px)
          `,
          opacity: 0.42,
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, #000 40%, transparent 100%)",
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
            borderBottom: "1px solid var(--border)",
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
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
            <ArrowLeft size={14} weight="regular" />
            Index
          </Link>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {["UX Research", "Service Design", "SMB", "Cross-cultural"].map((tag) => (
              <span key={tag} style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
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
            paddingTop: "clamp(32px, 3.5vw, 52px)",
            paddingBottom: "clamp(24px, 2.4vw, 36px)",
            position: "relative", zIndex: 1,
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-12"
            style={{
              gap: "clamp(24px, 3vw, 48px)",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* LEFT */}
            <div className="md:col-span-5" style={{ minWidth: 0 }}>
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

              <div style={{ overflow: "hidden", marginBottom: "clamp(24px, 2.6vw, 36px)" }}>
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(60px, 8.5vw, 124px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.055em", lineHeight: 0.92,
                    margin: 0,
                  }}>
                  LocalLift<span style={{ color: ll.primary, fontStyle: "italic" }}>.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                style={{
                  fontFamily: serif, fontStyle: "italic",
                  fontSize: "clamp(20px, 1.8vw, 26px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5, maxWidth: 520,
                  marginBottom: "clamp(28px, 3vw, 42px)",
                  letterSpacing: "-0.01em",
                }}
              >
                A mentorship and digital-tools platform built to close the gap between small business owners and
                <span style={{ color: ll.primary }}> the digital economy </span>
                they're supposed to already live in.
              </motion.p>

              {/* Meta row */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  columnGap: "clamp(20px, 3vw, 40px)",
                  rowGap: 22,
                  borderTop: "1px solid var(--border)",
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
                    <span style={{ ...mono, fontSize: 13, color: "var(--text-secondary)", letterSpacing: "0.2em", fontWeight: 600 }}>
                      {m.label}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 17, fontWeight: 500, color: "var(--text-primary)" }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — hero diagram */}
            <HeroVisual />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
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

      {/* ─── 01 THE GAP ──────────────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        background: ll.surface,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="01" title="The gap" phase="Problem" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 20 }}>
                  Digital tools were built for scale.
                  <br />
                  <span style={{ fontStyle: "italic", color: ll.primary }}>Most small businesses are built for survival.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ ...t.bodyLg, maxWidth: 620 }}>
                  SMB-facing platforms are either too technical, too abstract, or too generic to help a specific
                  owner in a specific market make a specific decision. The result isn't a gap in ambition —
                  it's a gap in access, in mentorship, and in the feedback loop between tool and user.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Three observation tiles */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: ll.subtle,
            border: `1px solid ${ll.subtle}`,
          }}>
            {([
              {
                icon: Wrench,
                head: "Built for enterprise",
                body: "Dashboards, settings, and workflows assume a team. The owner of one location is navigating them alone — between customers.",
                tag: "OBS · 01",
              },
              {
                icon: UsersThree,
                head: "No peer backbone",
                body: "Owners learn by doing and re-doing. There's no channel to exchange what works with other owners one block over, one industry across.",
                tag: "OBS · 02",
              },
              {
                icon: MapPin,
                head: "Advice without a ZIP code",
                body: "Generic playbooks miss local regulation, local customers, local pricing. What an owner needs is advice that knows their street.",
                tag: "OBS · 03",
              },
            ] as { icon: Icon; head: string; body: string; tag: string }[]).map((o, i) => {
              const I = o.icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "var(--bg-elevated)",
                      padding: "28px 26px 26px",
                      height: "100%",
                      display: "flex", flexDirection: "column",
                      cursor: "default",
                    }}
                  >
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      marginBottom: 20,
                    }}>
                      <div style={{
                        width: 40, height: 40, background: ll.subtle,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <I size={20} color={ll.primary} weight="regular" />
                      </div>
                      <p style={{ ...mono, fontSize: 9, color: ll.muted, letterSpacing: "0.2em", fontWeight: 700 }}>
                        {o.tag}
                      </p>
                    </div>
                    <h3 style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(22px, 2vw, 26px)",
                      color: "var(--text-primary)",
                      lineHeight: 1.2, letterSpacing: "-0.02em",
                      marginBottom: 12,
                    }}>
                      {o.head}
                    </h3>
                    <p style={{ ...t.bodySm, fontSize: 16, lineHeight: 1.65, flex: 1 }}>
                      {o.body}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 02 METHOD ──────────────────────────────────────────── */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="02" title="How I studied it" phase="Method" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 18 }}>
                  A cross-cultural study,
                  <span style={{ fontStyle: "italic", color: ll.primary }}> shaped in partnership with local voices.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  Ten weeks. Graduate students from Namibia University co-designing the questions and helping
                  translate insights across context. Three lenses: understand the owner's day, cluster what we heard,
                  turn it into archetypes the team could design against.
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
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(16px, 1.6vw, 24px)",
          }}>
            {([
              {
                num: "M·01",
                icon: ChatCircleText,
                title: "Interviews",
                body: "Semi-structured conversations with small business owners across industries and stages. Recorded, coded, revisited.",
                output: "5 voices · 4 themes",
              },
              {
                num: "M·02",
                icon: Stack,
                title: "Affinity mapping",
                body: "Clustered observations into four tensions: mentorship, tools, peer networks, local context. Prioritised by frequency and urgency.",
                output: "40+ observations",
              },
              {
                num: "M·03",
                icon: UsersThree,
                title: "Personas",
                body: "Two archetypes pressure-tested across every screen: the early-stage owner and the growth-oriented owner. Different needs, same platform.",
                output: "2 archetypes",
              },
            ] as { num: string; icon: Icon; title: string; body: string; output: string }[]).map((m, i) => {
              const I = m.icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.06}>
                  <div style={{
                    background: "var(--bg-elevated)",
                    border: `1px solid ${ll.subtle}`,
                    padding: "28px 26px 24px",
                    height: "100%",
                    display: "flex", flexDirection: "column",
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      marginBottom: 24,
                    }}>
                      <span style={{ ...mono, fontSize: 11, color: ll.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                        {m.num}
                      </span>
                      <I size={22} color={ll.primary} weight="regular" />
                    </div>
                    <h3 style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: 24,
                      color: "var(--text-primary)",
                      lineHeight: 1.2, letterSpacing: "-0.02em",
                      marginBottom: 12,
                    }}>
                      {m.title}
                    </h3>
                    <p style={{ ...t.bodySm, fontSize: 15, lineHeight: 1.65, flex: 1, marginBottom: 18 }}>
                      {m.body}
                    </p>
                    <p style={{
                      ...mono, fontSize: 10, letterSpacing: "0.2em",
                      color: ll.muted, paddingTop: 14, borderTop: `1px solid ${ll.subtle}`,
                    }}>
                      OUTPUT · {m.output}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 03 VOICES & INSIGHTS ──────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        background: ll.surface,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="03" title="What I heard" phase="Research highlights" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 18 }}>
                  Four tensions kept
                  <span style={{ fontStyle: "italic", color: ll.primary }}> showing up in different words.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  Different industries, different stages, one recurring shape: owners wanted guidance from someone
                  who had done the thing, tools that assumed their scale, peers they could learn from, and advice
                  tuned to their market — not a generic one.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Quote grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(16px, 1.6vw, 24px)",
          }}>
            {([
              {
                num: "V·01",
                finding: "Mentorship must be industry-specific",
                quote: "I need someone who's been in my shoes to tell me exactly what works and what doesn't.",
              },
              {
                num: "V·02",
                finding: "Tools must feel built for them",
                quote: "There are so many tools, but they feel built for big companies, not me.",
              },
              {
                num: "V·03",
                finding: "Peer networks are missing infrastructure",
                quote: "I'm figuring everything out alone. Connecting with other owners would help me avoid mistakes.",
              },
              {
                num: "V·04",
                finding: "Local context outperforms generic advice",
                quote: "I need insights relevant to my city and industry, not generic business tips.",
              },
            ] as { num: string; finding: string; quote: string }[]).map((v, i) => (
              <Reveal key={i} delay={0.05 + i * 0.06}>
                <figure style={{
                  background: "var(--bg-elevated)",
                  border: `1px solid ${ll.subtle}`,
                  padding: "30px 28px 26px",
                  height: "100%",
                  display: "flex", flexDirection: "column",
                  gap: 18,
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <span style={{ ...mono, fontSize: 11, color: ll.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                      {v.num}
                    </span>
                    <span aria-hidden style={{
                      fontFamily: serif, fontStyle: "italic", fontSize: 40,
                      color: ll.primary, opacity: 0.25, lineHeight: 0.6,
                    }}>
                      "
                    </span>
                  </div>

                  <blockquote style={{
                    fontFamily: serif, fontStyle: "italic",
                    fontSize: "clamp(19px, 1.5vw, 22px)",
                    color: "var(--text-primary)",
                    lineHeight: 1.45, letterSpacing: "-0.01em",
                    margin: 0, flex: 1,
                  }}>
                    {v.quote}
                  </blockquote>

                  <figcaption style={{
                    ...mono, fontSize: 10, letterSpacing: "0.2em",
                    color: ll.muted, fontWeight: 700,
                    paddingTop: 16, borderTop: `1px solid ${ll.subtle}`,
                  }}>
                    FINDING · {v.finding}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04 DESIGN MOVES ───────────────────────────────────── */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="04" title="Design moves" phase="Response" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 18 }}>
                  Three iterations, three
                  <span style={{ fontStyle: "italic", color: ll.primary }}> targeted changes.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  Each usability round surfaced a single friction. Each iteration answered that friction with
                  one visible move — not a redesign, a correction. The outcome came from stacking the three.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.16}>
                <p style={{
                  ...mono, fontSize: 11, letterSpacing: "0.22em",
                  color: ll.muted, fontWeight: 700, textAlign: "right",
                }}>
                  03 MOVES<br />THREE ROUNDS
                </p>
              </Reveal>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {([
              {
                num: "01",
                icon: Layout,
                friction: "Dense cards slowed scanning",
                move: "Reduced card hierarchy from five fields to three; separated primary action from metadata.",
                principle: "Visual hierarchy · Information density",
                result: "20% faster information absorption",
              },
              {
                num: "02",
                icon: Compass,
                friction: "Users unsure where they were in a task",
                move: "Added a persistent progress bar across onboarding and mentor-match flows, with explicit step counts.",
                principle: "Feedback · Visibility of system status",
                result: "20% less reported confusion",
              },
              {
                num: "03",
                icon: MagnifyingGlass,
                friction: "Generic search buried the local answer",
                move: "Restructured search around industry + city as first-class filters, with recency and proximity as signals.",
                principle: "Mental models · Recognition over recall",
                result: "40% faster time-to-relevant-result",
              },
            ] as { num: string; icon: Icon; friction: string; move: string; principle: string; result: string }[]).map((m, i) => {
              const I = m.icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.06}>
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "var(--bg-elevated)",
                      border: `1px solid ${ll.subtle}`,
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "clamp(20px, 2.5vw, 40px)",
                      padding: "clamp(24px, 2.4vw, 36px)",
                      alignItems: "center",
                    }}
                  >
                    {/* Left: number + icon */}
                    <div style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      gap: 14,
                      padding: "8px 20px 8px 0",
                      borderRight: `1px solid ${ll.subtle}`,
                      minWidth: 100,
                    }}>
                      <span style={{
                        fontFamily: serif, fontWeight: 700,
                        fontSize: 52, color: ll.primary,
                        letterSpacing: "-0.04em", lineHeight: 1,
                      }}>
                        {m.num}
                      </span>
                      <I size={24} color={ll.primary} weight="regular" />
                    </div>

                    {/* Right: content */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div>
                        <p style={{ ...mono, fontSize: 10, color: ll.muted, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 6 }}>
                          FRICTION
                        </p>
                        <p style={{
                          fontFamily: serif, fontWeight: 700,
                          fontSize: "clamp(20px, 1.8vw, 24px)",
                          color: "var(--text-primary)",
                          letterSpacing: "-0.02em", lineHeight: 1.25,
                        }}>
                          {m.friction}
                        </p>
                      </div>
                      <div style={{ borderTop: `1px solid ${ll.subtle}`, paddingTop: 14 }}>
                        <p style={{ ...mono, fontSize: 10, color: ll.muted, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 6 }}>
                          MOVE
                        </p>
                        <p style={{ ...t.bodySm, fontSize: 16, lineHeight: 1.65 }}>
                          {m.move}
                        </p>
                      </div>
                      <div style={{
                        display: "flex", flexWrap: "wrap", alignItems: "center",
                        gap: 14, marginTop: 4,
                      }}>
                        <span style={{
                          ...mono, fontSize: 10, letterSpacing: "0.22em",
                          color: ll.primary, fontWeight: 700,
                          padding: "6px 12px", border: `1px solid ${ll.primary}`,
                        }}>
                          {m.principle}
                        </span>
                        <span style={{
                          fontFamily: serif, fontStyle: "italic", fontWeight: 700,
                          fontSize: 18, color: ll.primary,
                          letterSpacing: "-0.01em",
                        }}>
                          → {m.result}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 05 OUTCOMES ──────────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        background: ll.dark,
        color: "#FFFFFF",
        borderTop: `1px solid ${ll.dark}`,
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div style={{
              display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap",
              paddingBottom: 14,
            }}>
              <span style={{
                ...mono, fontSize: 14, color: "#FFFFFF",
                letterSpacing: "0.22em", fontWeight: 700,
              }}>
                05 <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>/ {TOTAL}</span>
              </span>
              <span style={{
                ...mono, fontSize: 14, color: "#FFFFFF",
                letterSpacing: "0.22em", fontWeight: 600,
              }}>
                Outcomes
              </span>
              <span style={{
                ...mono, fontSize: 13, color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.2em", marginLeft: "auto",
              }}>
                Measured impact
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.3)" }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{
                  fontFamily: serif, fontWeight: 700,
                  fontSize: "clamp(30px, 3.6vw, 44px)",
                  letterSpacing: "-0.025em", lineHeight: 1.2,
                  color: "#FFFFFF",
                  marginBottom: 18,
                }}>
                  Small moves,
                  <span style={{ fontStyle: "italic", color: ll.warm }}> compounded.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{
                  fontFamily: sans, fontSize: "clamp(18px, 1.4vw, 21px)",
                  lineHeight: 1.75, color: "rgba(255,255,255,0.78)",
                  maxWidth: 640,
                }}>
                  Three iterations, three metrics. Owners scanned faster, navigated with less confusion,
                  and reached what they were looking for in less than half the time.
                </p>
              </Reveal>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 1,
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            {[
              { stat: 20, suffix: "%", label: "faster information absorption", source: "Usability Round · Cleaner cards", tag: "R·01" },
              { stat: 20, suffix: "%", label: "less reported confusion", source: "Usability Round · Progress bar", tag: "R·02" },
              { stat: 40, suffix: "%", label: "faster time-to-relevant-result", source: "Usability Round · Localised search", tag: "R·03" },
            ].map((s, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: ll.dark,
                    padding: "36px 28px 30px",
                    height: "100%",
                    display: "flex", flexDirection: "column",
                    cursor: "default",
                  }}
                >
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: 22,
                  }}>
                    <ChartBar size={22} color={ll.warm} weight="regular" />
                    <p style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: "0.2em", fontWeight: 700 }}>
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
                    fontFamily: sans, fontSize: 17, lineHeight: 1.55,
                    color: "rgba(255,255,255,0.85)", marginBottom: 18, flex: 1,
                  }}>
                    {s.label}
                  </p>
                  <p style={{
                    ...mono, fontSize: 10, color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.2em",
                    paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.15)",
                  }}>
                    {s.source}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 06 TAKEAWAYS ────────────────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="06" title="What the work left me with" phase="Reflection" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
            <div className="lg:col-span-9">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
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

          {/* Takeaways list */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(16px, 1.6vw, 24px)",
          }}>
            {([
              {
                num: "01",
                icon: Path,
                short: "Follow the owner, not the feature.",
                body: "The design followed the owner's day. When an insight didn't fit one of the four themes, we didn't force it in — we held it and kept listening.",
              },
              {
                num: "02",
                icon: Lightbulb,
                short: "Small iterations compound.",
                body: "Three focused rounds produced the outcome, not one heroic redesign. Each fix targeted a single friction and left the rest of the product alone.",
              },
              {
                num: "03",
                icon: Handshake,
                short: "Mentorship is infrastructure.",
                body: "Peer networks and industry mentors turned the platform from a tool into a place. The tool's retention job is to keep the community open — not to replace it.",
              },
              {
                num: "04",
                icon: MapPin,
                short: "Local context is a feature.",
                body: "Generic advice reads as noise. Designing search and content around industry + city made the product feel like it knew the owner — because it did.",
              },
            ] as { num: string; icon: Icon; short: string; body: string }[]).map((lesson, i) => {
              const I = lesson.icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.06}>
                  <div style={{
                    background: "var(--bg-elevated)",
                    border: `1px solid ${ll.subtle}`,
                    padding: "28px 26px 26px",
                    height: "100%",
                    display: "flex", flexDirection: "column",
                    gap: 16,
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <span style={{
                        fontFamily: serif, fontWeight: 700, fontSize: 28,
                        color: ll.primary, letterSpacing: "-0.03em", lineHeight: 1,
                      }}>
                        {lesson.num}
                      </span>
                      <I size={22} color={ll.primary} weight="regular" />
                    </div>
                    <h3 style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(20px, 1.8vw, 24px)",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em", lineHeight: 1.25,
                    }}>
                      {lesson.short}
                    </h3>
                    <p style={{ ...t.bodySm, fontSize: 16, lineHeight: 1.65, margin: 0 }}>
                      {lesson.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MORE CASE STUDIES
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(64px, 8vw, 104px) 0", borderTop: "1px solid var(--border)" }}>
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
              width: 52,
              height: 52,
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
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
