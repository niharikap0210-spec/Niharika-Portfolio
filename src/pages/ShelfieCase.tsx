import { motion, useInView, useMotionValue, useScroll, useSpring, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpIcon as ArrowUp,
  ArrowLeftIcon as ArrowLeft,
  QuotesIcon as Quotes,
  EyeIcon as Eye,
  TimerIcon as Timer,
  BrainIcon as Brain,
  StackIcon as Stack,
  HandTapIcon as HandTap,
  ThermometerIcon as Thermometer,
  DeviceMobileIcon as DeviceMobile,
  CheckCircleIcon as CheckCircle,
  PackageIcon as Package,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { getAdjacentProjects } from "../data/projects";

/* ── Shelfie palette, scoped to this page ─────────────────────────── */
const sh = {
  primary: "#C44536",         // terracotta — the warning/expired tone
  light:   "#E8A598",         // tint
  dark:    "#8C2E22",         // shade
  surface: "#FBEDE6",         // soft blush background
  subtle:  "rgba(196, 69, 54, 0.08)",
  muted:   "rgba(196, 69, 54, 0.55)",
  fresh:   "#5A8C5C",         // sage — the "still fresh" complement
  caution: "#D4A43C",         // amber — the "caution" mid-state
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
  h1Display: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(40px, 5.2vw, 64px)",
    letterSpacing: "-0.035em", lineHeight: 1.05,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  h2Section: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(30px, 3.6vw, 44px)",
    letterSpacing: "-0.025em", lineHeight: 1.2,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  h3Lede: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(22px, 2.4vw, 28px)",
    letterSpacing: "-0.02em", lineHeight: 1.3,
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
    fontFamily: sans, fontSize: 14.5, lineHeight: 1.7,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
};

const SECTION_PAD = "clamp(72px, 9vw, 120px) 0";
const TOTAL = "08";

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
  return (
    <span ref={ref}>{display}{suffix}</span>
  );
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
            ...mono, fontSize: 14, color: sh.primary,
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
          height: 1, background: sh.primary, transformOrigin: "left",
          opacity: 0.6,
        }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   INLINE ILLUSTRATIONS
══════════════════════════════════════════════════════════════════ */

/* Three product illustrations showing label failures */
function OilBottleIllustration() {
  return (
    <svg viewBox="0 0 140 180" width="100%" style={{ maxWidth: 140 }} aria-hidden>
      {/* cap */}
      <rect x="56" y="8" width="28" height="16" fill={sh.dark} rx="1" />
      {/* neck */}
      <rect x="60" y="22" width="20" height="12" fill={sh.caution} />
      {/* bottle */}
      <path
        d="M 44 34 Q 44 48 40 58 L 40 160 Q 40 170 50 170 L 90 170 Q 100 170 100 160 L 100 58 Q 96 48 96 34 Z"
        fill={sh.caution}
        opacity="0.85"
      />
      {/* highlight */}
      <path
        d="M 48 60 L 48 158 Q 48 164 54 164 L 60 164 L 60 60 Z"
        fill="#FFFFFF"
        opacity="0.18"
      />
      {/* illegible date — same yellow as oil */}
      <text x="70" y="112" textAnchor="middle"
        fontFamily="'Space Mono', monospace" fontSize="7"
        fill={sh.caution} opacity="0.7">USE BY 05/24</text>
      {/* frustrated highlight ring */}
      <ellipse cx="70" cy="110" rx="28" ry="8" fill="none" stroke={sh.primary} strokeWidth="1" strokeDasharray="2 2" opacity="0.9" />
      {/* caption tag */}
      <line x1="98" y1="110" x2="128" y2="100" stroke={sh.dark} strokeWidth="0.7" />
    </svg>
  );
}

function BreadBagIllustration() {
  return (
    <svg viewBox="0 0 160 180" width="100%" style={{ maxWidth: 160 }} aria-hidden>
      {/* bag tie */}
      <rect x="72" y="6" width="16" height="8" fill={sh.dark} />
      {/* bag */}
      <path
        d="M 30 20 Q 80 10 130 20 L 132 162 Q 80 172 28 162 Z"
        fill={sh.surface}
        stroke={sh.dark}
        strokeWidth="0.9"
      />
      {/* printed label on front */}
      <rect x="48" y="50" width="64" height="22" fill={sh.primary} opacity="0.9" />
      <text x="80" y="65" textAnchor="middle" fontFamily={serif} fontSize="12" fontWeight="700" fill="#fff">BREAD</text>
      {/* scattered date stamps — random placement */}
      <text x="38" y="98" fontFamily="'Space Mono', monospace" fontSize="6" fill={sh.dark} opacity="0.6">BB 04/15</text>
      <text x="96" y="140" fontFamily="'Space Mono', monospace" fontSize="6" fill={sh.dark} opacity="0.6">04/15</text>
      <text x="54" y="155" fontFamily="'Space Mono', monospace" fontSize="5" fill={sh.dark} opacity="0.5">LOT 22A</text>
      {/* wandering search arrow */}
      <path d="M 38 102 Q 60 120 96 136" fill="none" stroke={sh.primary} strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 94 134 L 99 138 L 96 140 Z" fill={sh.primary} />
    </svg>
  );
}

function CanTopIllustration() {
  return (
    <svg viewBox="0 0 160 160" width="100%" style={{ maxWidth: 160 }} aria-hidden>
      {/* outer ring */}
      <circle cx="80" cy="80" r="62" fill="#D9D9D9" stroke={sh.dark} strokeWidth="1" />
      {/* inner lid */}
      <circle cx="80" cy="80" r="52" fill="#E8E8E8" />
      {/* embossed ridge */}
      <circle cx="80" cy="80" r="52" fill="none" stroke="#C0C0C0" strokeWidth="0.5" />
      <circle cx="80" cy="80" r="46" fill="none" stroke="#C0C0C0" strokeWidth="0.5" />
      {/* embossed date — low contrast */}
      <text x="80" y="78" textAnchor="middle"
        fontFamily="'Space Mono', monospace" fontSize="10"
        fill="#A0A0A0" opacity="0.9" letterSpacing="0.15em">
        23262
      </text>
      <text x="80" y="90" textAnchor="middle"
        fontFamily="'Space Mono', monospace" fontSize="7"
        fill="#A0A0A0" opacity="0.9" letterSpacing="0.2em">
        LOT#109
      </text>
      {/* illegibility circle */}
      <circle cx="80" cy="82" r="28" fill="none" stroke={sh.primary} strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
    </svg>
  );
}

/* Method column illustrations */
function ObservationGlyph() {
  return (
    <svg viewBox="0 0 80 80" width="56" height="56" aria-hidden>
      <rect x="8" y="24" width="64" height="44" fill="none" stroke={sh.primary} strokeWidth="1.2" />
      <path d="M 8 32 L 40 52 L 72 32" fill="none" stroke={sh.primary} strokeWidth="1" opacity="0.5" />
      <circle cx="40" cy="16" r="6" fill="none" stroke={sh.primary} strokeWidth="1.2" />
      <line x1="40" y1="22" x2="40" y2="28" stroke={sh.primary} strokeWidth="1.2" />
    </svg>
  );
}
function ExperimentGlyph() {
  return (
    <svg viewBox="0 0 80 80" width="56" height="56" aria-hidden>
      <rect x="16" y="10" width="20" height="60" fill="none" stroke={sh.primary} strokeWidth="1.2" />
      <rect x="44" y="24" width="20" height="46" fill="none" stroke={sh.primary} strokeWidth="1.2" />
      <line x1="10" y1="70" x2="70" y2="70" stroke={sh.primary} strokeWidth="1.2" />
      <line x1="16" y1="30" x2="36" y2="30" stroke={sh.primary} strokeWidth="0.7" opacity="0.6" />
      <line x1="44" y1="44" x2="64" y2="44" stroke={sh.primary} strokeWidth="0.7" opacity="0.6" />
    </svg>
  );
}
function SurveyGlyph() {
  return (
    <svg viewBox="0 0 80 80" width="56" height="56" aria-hidden>
      <rect x="12" y="8" width="56" height="64" fill="none" stroke={sh.primary} strokeWidth="1.2" />
      <line x1="20" y1="22" x2="52" y2="22" stroke={sh.primary} strokeWidth="1" />
      <rect x="20" y="30" width="6" height="6" fill="none" stroke={sh.primary} strokeWidth="1" />
      <line x1="30" y1="33" x2="54" y2="33" stroke={sh.primary} strokeWidth="0.8" opacity="0.7" />
      <rect x="20" y="42" width="6" height="6" fill={sh.primary} />
      <line x1="30" y1="45" x2="54" y2="45" stroke={sh.primary} strokeWidth="0.8" opacity="0.7" />
      <rect x="20" y="54" width="6" height="6" fill="none" stroke={sh.primary} strokeWidth="1" />
      <line x1="30" y1="57" x2="46" y2="57" stroke={sh.primary} strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

/* Solution illustrations */
function UniversalIconIllustration() {
  return (
    <svg viewBox="0 0 240 140" width="100%" aria-hidden>
      {/* card */}
      <rect x="1" y="1" width="238" height="138" fill="#fff" stroke={sh.dark} strokeWidth="0.8" />
      {/* three states */}
      {[
        { x: 40,  label: "FRESH",   color: sh.fresh,   check: true  },
        { x: 120, label: "SOON",    color: sh.caution, check: false },
        { x: 200, label: "EXPIRED", color: sh.primary, check: false },
      ].map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy="60" r="22" fill={s.color} opacity="0.14" />
          <circle cx={s.x} cy="60" r="18" fill="none" stroke={s.color} strokeWidth="1.6" />
          {/* inner glyph — leaf / arc / cross */}
          {s.label === "FRESH" && (
            <path d={`M ${s.x - 7} 64 L ${s.x - 2} 69 L ${s.x + 8} 53`} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {s.label === "SOON" && (
            <g>
              <line x1={s.x} y1="50" x2={s.x} y2="60" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
              <line x1={s.x} y1="60" x2={s.x + 6} y2="66" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
          {s.label === "EXPIRED" && (
            <g>
              <line x1={s.x - 6} y1="54" x2={s.x + 6} y2="66" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
              <line x1={s.x + 6} y1="54" x2={s.x - 6} y2="66" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
          <text x={s.x} y="106" textAnchor="middle"
            fontFamily="'Space Mono', monospace" fontSize="9"
            fill={s.color} letterSpacing="0.15em" fontWeight="700">
            {s.label}
          </text>
        </g>
      ))}
      {/* caption rule */}
      <text x="120" y="128" textAnchor="middle"
        fontFamily="'Space Mono', monospace" fontSize="7"
        fill={sh.dark} opacity="0.7" letterSpacing="0.18em">
        ONE ICON · THREE STATES · NO READING REQUIRED
      </text>
    </svg>
  );
}

function TimeStripIllustration() {
  return (
    <svg viewBox="0 0 240 140" width="100%" aria-hidden>
      <rect x="1" y="1" width="238" height="138" fill="#fff" stroke={sh.dark} strokeWidth="0.8" />
      {/* milk carton silhouette */}
      <path d="M 36 34 L 36 104 L 80 104 L 80 34 L 68 20 L 48 20 Z" fill="none" stroke={sh.dark} strokeWidth="1" />
      {/* time strip on carton */}
      <defs>
        <linearGradient id="freshnessGrad" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%"   stopColor={sh.fresh} />
          <stop offset="50%"  stopColor={sh.caution} />
          <stop offset="100%" stopColor={sh.primary} />
        </linearGradient>
      </defs>
      <rect x="42" y="80" width="32" height="8" fill="url(#freshnessGrad)" />
      {/* indicator tick */}
      <polygon points="52,76 56,80 48,80" fill={sh.dark} />
      <text x="58" y="100" fontFamily="'Space Mono', monospace" fontSize="5" fill={sh.dark} opacity="0.7" textAnchor="middle" letterSpacing="0.1em">NOW</text>

      {/* scale diagram right side */}
      <text x="100" y="32" fontFamily="'Space Mono', monospace" fontSize="8" fill={sh.dark} letterSpacing="0.15em">PASSIVE TIME-STRIP</text>
      <line x1="100" y1="40" x2="226" y2="40" stroke={sh.dark} strokeWidth="0.5" opacity="0.4" />
      <rect x="100" y="52" width="126" height="14" fill="url(#freshnessGrad)" />
      <text x="100" y="80" fontFamily="'Space Mono', monospace" fontSize="7" fill={sh.fresh}>FRESH</text>
      <text x="163" y="80" fontFamily="'Space Mono', monospace" fontSize="7" fill={sh.caution} textAnchor="middle">HALFWAY</text>
      <text x="226" y="80" fontFamily="'Space Mono', monospace" fontSize="7" fill={sh.primary} textAnchor="end">EXPIRED</text>
      <text x="100" y="104" fontFamily="'Inter', system-ui, sans-serif" fontSize="8" fill={sh.dark} opacity="0.8">
        Temperature-reactive ink. No battery.
      </text>
      <text x="100" y="118" fontFamily="'Inter', system-ui, sans-serif" fontSize="8" fill={sh.dark} opacity="0.8">
        Strip darkens as the product ages in real conditions.
      </text>
    </svg>
  );
}

function OpenByIllustration() {
  return (
    <svg viewBox="0 0 240 140" width="100%" aria-hidden>
      <rect x="1" y="1" width="238" height="138" fill="#fff" stroke={sh.dark} strokeWidth="0.8" />
      {/* jar */}
      <rect x="32" y="40" width="54" height="64" fill="none" stroke={sh.dark} strokeWidth="1" />
      <rect x="28" y="30" width="62" height="12" fill={sh.dark} />
      {/* lid open indicator */}
      <path d="M 28 30 L 38 22 L 80 22 L 90 30" fill="none" stroke={sh.dark} strokeWidth="1" opacity="0.5" />
      {/* peel-back sticker that reveals countdown when opened */}
      <rect x="36" y="58" width="46" height="26" fill={sh.surface} stroke={sh.primary} strokeWidth="0.8" />
      <text x="59" y="70" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" fill={sh.dark} letterSpacing="0.12em">OPEN BY</text>
      <text x="59" y="81" textAnchor="middle" fontFamily={serif} fontSize="11" fontWeight="700" fill={sh.primary}>7 DAYS</text>

      {/* tear-line arrow */}
      <path d="M 92 70 Q 110 70 118 60" fill="none" stroke={sh.primary} strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 116 58 L 120 60 L 117 63 Z" fill={sh.primary} />

      {/* right-side explainer */}
      <text x="130" y="40" fontFamily="'Space Mono', monospace" fontSize="8" fill={sh.dark} letterSpacing="0.15em">OPEN-BY OVERLAY</text>
      <line x1="130" y1="48" x2="226" y2="48" stroke={sh.dark} strokeWidth="0.5" opacity="0.4" />

      {/* three small steps */}
      <g>
        <circle cx="140" cy="64" r="6" fill={sh.primary} />
        <text x="140" y="67" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="7" fontWeight="700" fill="#fff">1</text>
        <text x="152" y="67" fontFamily="'Inter', system-ui, sans-serif" fontSize="9" fill={sh.dark}>Peel seal when opening.</text>
      </g>
      <g>
        <circle cx="140" cy="86" r="6" fill={sh.primary} />
        <text x="140" y="89" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="7" fontWeight="700" fill="#fff">2</text>
        <text x="152" y="89" fontFamily="'Inter', system-ui, sans-serif" fontSize="9" fill={sh.dark}>Countdown begins printing.</text>
      </g>
      <g>
        <circle cx="140" cy="108" r="6" fill={sh.primary} />
        <text x="140" y="111" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="7" fontWeight="700" fill="#fff">3</text>
        <text x="152" y="111" fontFamily="'Inter', system-ui, sans-serif" fontSize="9" fill={sh.dark}>Expires on a visible, fresh date.</text>
      </g>
    </svg>
  );
}

function ShelfieAppIllustration() {
  return (
    <svg viewBox="0 0 240 140" width="100%" aria-hidden>
      <rect x="1" y="1" width="238" height="138" fill="#fff" stroke={sh.dark} strokeWidth="0.8" />
      {/* phone frame */}
      <rect x="20" y="16" width="70" height="108" rx="8" fill="none" stroke={sh.dark} strokeWidth="1" />
      <rect x="26" y="24" width="58" height="6" fill={sh.dark} opacity="0.15" />
      {/* app header */}
      <text x="30" y="46" fontFamily={serif} fontSize="11" fontWeight="700" fill={sh.dark}>Shelfie</text>
      {/* 3 item rows */}
      {[
        { y: 58, label: "Milk",       days: "2d",  color: sh.caution },
        { y: 76, label: "Sauce",      days: "9d",  color: sh.fresh   },
        { y: 94, label: "Bread",      days: "0d",  color: sh.primary },
      ].map((r, i) => (
        <g key={i}>
          <rect x="28" y={r.y} width="54" height="14" fill={r.color} opacity="0.1" />
          <circle cx="34" cy={r.y + 7} r="3" fill={r.color} />
          <text x="42" y={r.y + 10} fontFamily="'Inter', system-ui, sans-serif" fontSize="8" fill={sh.dark}>{r.label}</text>
          <text x="78" y={r.y + 10} textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="7" fill={r.color} fontWeight="700">{r.days}</text>
        </g>
      ))}
      <text x="55" y="118" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" fill={sh.dark} opacity="0.5" letterSpacing="0.15em">+ SCAN SHELFIE</text>

      {/* right-side flow: camera → extract → track */}
      <text x="108" y="30" fontFamily="'Space Mono', monospace" fontSize="8" fill={sh.dark} letterSpacing="0.15em">SHELFIE APP</text>
      <line x1="108" y1="38" x2="226" y2="38" stroke={sh.dark} strokeWidth="0.5" opacity="0.4" />

      {/* step icons */}
      {[
        { x: 122, label: "SNAP",  glyph: "camera"  },
        { x: 167, label: "READ",  glyph: "ocr"     },
        { x: 212, label: "TRACK", glyph: "bell"    },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy="66" r="14" fill={sh.subtle} />
          {s.glyph === "camera" && (
            <g stroke={sh.primary} strokeWidth="1.2" fill="none">
              <rect x={s.x - 8} y="62" width="16" height="10" />
              <circle cx={s.x} cy="67" r="2.5" />
              <rect x={s.x - 3} y="59" width="6" height="3" />
            </g>
          )}
          {s.glyph === "ocr" && (
            <g stroke={sh.primary} strokeWidth="1.2">
              <line x1={s.x - 6} y1="62" x2={s.x + 6} y2="62" />
              <line x1={s.x - 6} y1="66" x2={s.x + 4} y2="66" />
              <line x1={s.x - 6} y1="70" x2={s.x + 6} y2="70" />
            </g>
          )}
          {s.glyph === "bell" && (
            <g stroke={sh.primary} strokeWidth="1.2" fill="none">
              <path d={`M ${s.x - 5} 66 Q ${s.x - 5} 60 ${s.x} 60 Q ${s.x + 5} 60 ${s.x + 5} 66 L ${s.x + 6} 70 L ${s.x - 6} 70 Z`} />
              <circle cx={s.x} cy="73" r="1.5" fill={sh.primary} />
            </g>
          )}
          <text x={s.x} y="94" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="7" fill={sh.dark} letterSpacing="0.14em">{s.label}</text>
          {i < 2 && (
            <line x1={s.x + 18} y1="66" x2={s.x + 30} y2="66" stroke={sh.dark} strokeWidth="0.6" strokeDasharray="2 2" />
          )}
        </g>
      ))}
      <text x="167" y="118" textAnchor="middle" fontFamily="'Inter', system-ui, sans-serif" fontSize="8" fill={sh.dark} opacity="0.8">Snap a photo of the shelf — app reads the dates and reminds you.</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO VISUAL — editorial specimen composition
   Three product silhouettes on a shelf line, each with a dotted
   callout to its failure mode. Sits behind a soft terracotta blur,
   matching the Arko / Veriflow hero-mockup language.
══════════════════════════════════════════════════════════════════ */
function HeroVisual() {
  return (
    <motion.div
      className="md:col-span-7"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", width: "100%", minWidth: 0 }}
    >
      {/* Soft terracotta radial blur — sits behind the specimen plate */}
      <div aria-hidden style={{
        position: "absolute", inset: "-8% -6%",
        background: `radial-gradient(55% 55% at 55% 50%, ${sh.light} 0%, ${sh.primary} 40%, rgba(196,69,54,0) 72%)`,
        filter: "blur(60px)", opacity: 0.45, zIndex: 0, pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", left: "-10%", top: "15%",
        width: "55%", height: "55%",
        background: `radial-gradient(circle, ${sh.primary} 0%, rgba(196,69,54,0) 70%)`,
        filter: "blur(48px)", opacity: 0.32, zIndex: 0, pointerEvents: "none",
      }} />

      {/* Specimen plate */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "relative", zIndex: 2,
          width: "94%", marginLeft: "6%",
          background: "var(--bg-elevated)",
          border: `1px solid ${sh.subtle}`,
          padding: "clamp(28px, 3vw, 40px) clamp(24px, 2.6vw, 36px) clamp(20px, 2.4vw, 32px)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 24px 60px rgba(196,69,54,0.16), 0 4px 14px rgba(0,0,0,0.06)",
        }}
      >
        {/* Plate header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 22,
        }}>
          <span aria-hidden style={{ width: 3, height: 14, background: sh.primary }} />
          <span style={{ ...mono, fontSize: 11, color: sh.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
            FIG. 01 · THREE FAILURES, ONE AISLE
          </span>
        </div>

        {/* SVG specimen — three products on a shelf with annotation callouts */}
        <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid meet" style={{
          width: "100%", height: "auto", display: "block",
        }} aria-hidden>
          <defs>
            <pattern id="sh-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke={sh.primary} strokeWidth="0.4" opacity="0.12" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="600" height="320" fill="url(#sh-grid)" />

          {/* Shelf line */}
          <line x1="40" y1="248" x2="560" y2="248" stroke={sh.dark} strokeWidth="1.2" />
          <line x1="40" y1="252" x2="560" y2="252" stroke={sh.muted} strokeWidth="0.5" />

          {/* ── Product 1: Oil bottle (CONTRAST) ─────────────────────── */}
          <g transform="translate(110, 90)">
            <rect x="-14" y="-78" width="28" height="14" fill={sh.dark} />
            <rect x="-10" y="-64" width="20" height="10" fill={sh.caution} />
            <path d="M -22 -54 Q -22 -42 -26 -32 L -26 158 L 26 158 L 26 -32 Q 22 -42 22 -54 Z"
              fill={sh.caution} opacity="0.85" />
            <path d="M -18 -32 L -18 152 L -10 152 L -10 -32 Z" fill="#fff" opacity="0.18" />
            {/* Same-color date stamp */}
            <text x="0" y="36" textAnchor="middle"
              fontFamily="'Space Mono', monospace" fontSize="7"
              fill={sh.caution} opacity="0.7" letterSpacing="0.1em">USE BY 05/24</text>
            <ellipse cx="0" cy="34" rx="26" ry="7" fill="none" stroke={sh.primary} strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* ── Product 2: Bread bag (PLACEMENT) ─────────────────────── */}
          <g transform="translate(300, 110)">
            <rect x="-8" y="-100" width="16" height="8" fill={sh.dark} />
            <path d="M -52 -90 Q 0 -100 52 -90 L 54 138 Q 0 148 -54 138 Z"
              fill={sh.surface} stroke={sh.dark} strokeWidth="0.9" />
            <rect x="-32" y="-58" width="64" height="22" fill={sh.primary} opacity="0.9" />
            <text x="0" y="-43" textAnchor="middle" fontFamily={serif} fontSize="12" fontWeight="700" fill="#fff">BREAD</text>
            {/* Wandering date stamps */}
            <text x="-44" y="-12" fontFamily="'Space Mono', monospace" fontSize="6" fill={sh.dark} opacity="0.55">BB 04/15</text>
            <text x="14" y="38" fontFamily="'Space Mono', monospace" fontSize="6" fill={sh.dark} opacity="0.55">04/15</text>
            <text x="-30" y="62" fontFamily="'Space Mono', monospace" fontSize="5" fill={sh.dark} opacity="0.5">LOT 22A</text>
            {/* Search arrow */}
            <path d="M -44 -8 Q -10 30 14 36" fill="none" stroke={sh.primary} strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 12 34 L 17 38 L 14 40 Z" fill={sh.primary} />
          </g>

          {/* ── Product 3: Can (LEGIBILITY) ──────────────────────────── */}
          <g transform="translate(490, 130)">
            <ellipse cx="0" cy="-58" rx="44" ry="8" fill="#D4D4D4" stroke={sh.dark} strokeWidth="0.8" />
            <rect x="-44" y="-58" width="88" height="160" fill="#E8E8E8" stroke={sh.dark} strokeWidth="0.8" />
            <ellipse cx="0" cy="102" rx="44" ry="8" fill="#C8C8C8" stroke={sh.dark} strokeWidth="0.8" />
            {/* Label band */}
            <rect x="-44" y="-30" width="88" height="80" fill={sh.primary} opacity="0.92" />
            <text x="0" y="10" textAnchor="middle" fontFamily={serif} fontSize="13" fontWeight="700" fill="#fff">SOUP</text>
            <text x="0" y="26" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" fill="#fff" opacity="0.85" letterSpacing="0.15em">CLASSIC</text>
            {/* Embossed date on lid */}
            <text x="0" y="-54" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" fill="#A0A0A0" letterSpacing="0.18em">23262 · LOT 109</text>
            <ellipse cx="0" cy="-56" rx="34" ry="5" fill="none" stroke={sh.primary} strokeWidth="0.9" strokeDasharray="2 2" />
          </g>

          {/* ── Annotation callouts ──────────────────────────────────── */}
          {/* Oil → CONTRAST */}
          <line x1="136" y1="124" x2="180" y2="46" stroke={sh.primary} strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="180" cy="46" r="2.5" fill={sh.primary} />
          <line x1="180" y1="46" x2="220" y2="46" stroke={sh.primary} strokeWidth="0.8" />
          <text x="226" y="42" fontFamily="'Space Mono', monospace" fontSize="9" fill={sh.primary} letterSpacing="0.18em" fontWeight="700">CONTRAST</text>
          <text x="226" y="56" fontFamily="'Inter', system-ui, sans-serif" fontSize="9" fill={sh.dark} opacity="0.75">Same colour as the product</text>

          {/* Bread → PLACEMENT */}
          <line x1="324" y1="146" x2="380" y2="200" stroke={sh.primary} strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="380" cy="200" r="2.5" fill={sh.primary} />
          <line x1="380" y1="200" x2="430" y2="200" stroke={sh.primary} strokeWidth="0.8" />
          <text x="436" y="196" fontFamily="'Space Mono', monospace" fontSize="9" fill={sh.primary} letterSpacing="0.18em" fontWeight="700">PLACEMENT</text>
          <text x="436" y="210" fontFamily="'Inter', system-ui, sans-serif" fontSize="9" fill={sh.dark} opacity="0.75">No fixed location</text>

          {/* Can → LEGIBILITY */}
          <line x1="468" y1="74" x2="430" y2="36" stroke={sh.primary} strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="430" cy="36" r="2.5" fill={sh.primary} />
          <line x1="430" y1="36" x2="384" y2="36" stroke={sh.primary} strokeWidth="0.8" />
          <text x="378" y="32" textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="9" fill={sh.primary} letterSpacing="0.18em" fontWeight="700">LEGIBILITY</text>
          <text x="378" y="46" textAnchor="end" fontFamily="'Inter', system-ui, sans-serif" fontSize="9" fill={sh.dark} opacity="0.75">Embossed, not printed</text>

          {/* Shelf caption */}
          <text x="300" y="282" textAnchor="middle"
            fontFamily="'Space Mono', monospace" fontSize="9"
            fill={sh.dark} opacity="0.55" letterSpacing="0.22em">
            STUDY SPECIMENS · n=4 · GROCERY AISLE
          </text>
        </svg>

        {/* Plate footer */}
        <div style={{
          marginTop: 18, paddingTop: 16,
          borderTop: `1px solid ${sh.subtle}`,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
            Plate · 01 / 04
          </span>
          <span style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.2em", fontWeight: 600 }}>
            Annotated specimen
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function ShelfieCase() {
  const adjacent = getAdjacentProjects("shelfie");
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
          height: "100%", background: sh.primary,
          scaleX, transformOrigin: "left", opacity: 0.85,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          00 · HERO — editorial monograph cover
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        height: "calc(100vh - 56px)",
        minHeight: 640,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Top bar — back link + tag strip */}
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
          }}
        >
          <Link to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              ...mono, fontSize: 11, letterSpacing: "0.22em",
              color: "var(--text-secondary)", textDecoration: "none",
              transitionProperty: "color", transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = sh.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
            <ArrowLeft size={14} weight="regular" />
            Index
          </Link>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {["UX Research", "Field Study", "Packaging", "Consumer"].map((tag) => (
              <span key={tag} style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero body — 2-column: text left, specimen right, all in viewport */}
        <div
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            flex: 1, width: "100%", minHeight: 0,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "clamp(24px, 3vw, 40px)",
            alignItems: "center",
            paddingTop: "clamp(20px, 2.4vw, 32px)",
            paddingBottom: "clamp(16px, 2vw, 24px)",
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
            {/* LEFT — title, subtitle, meta */}
            <div className="md:col-span-5" style={{ minWidth: 0 }}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}
                style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, maxWidth: 460 }}
              >
                <span style={{ ...mono, fontSize: 11, color: sh.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                  Case Study · 03
                </span>
                <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
                  Consumer · 2023
                </span>
              </motion.div>

              <div style={{ overflow: "hidden", marginBottom: "clamp(24px, 2.6vw, 36px)" }}>
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(64px, 9.5vw, 140px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.055em", lineHeight: 0.9,
                    margin: 0,
                  }}>
                  Shelfie<span style={{ color: sh.primary, fontStyle: "italic" }}>.</span>
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
                A field study into why expiration dates —
                <span style={{ color: sh.primary }}> the quiet safety signal </span>
                nobody can read — get misread by nearly two-thirds of shoppers.
              </motion.p>

              {/* Meta row — 2x2, compact, below subtitle */}
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
                  { label: "Role",     value: "UX Researcher" },
                  { label: "Methods",  value: "Field · Experiment · Survey" },
                  { label: "Timeline", value: "12 weeks" },
                  { label: "Sample",   value: "25 shoppers" },
                ] as { label: string; value: string }[]).map((m) => (
                  <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{ ...mono, fontSize: 13, color: "var(--text-secondary)", letterSpacing: "0.2em", fontWeight: 600 }}>
                      {m.label}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 19, fontWeight: 500, color: "var(--text-primary)" }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — annotated specimen plate */}
            <HeroVisual />
          </div>
        </div>

        {/* Scroll cue — bottom strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            width: "100%", flexShrink: 0,
            display: "flex", justifyContent: "center", alignItems: "center",
            paddingBottom: "clamp(14px, 1.6vw, 22px)",
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

      {/* ─── 01 PREMISE ───────────────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        background: sh.surface,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="01" title="Premise" phase="The stakes" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 20 }}>
                  A three-word
                  <br />
                  <span style={{ fontStyle: "italic", color: sh.primary }}>public-health</span>
                  <br />
                  problem.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p style={{ ...t.body, marginBottom: 32 }}>
                  Expiration dates are the last thing a shopper reads before a purchase and the
                  first thing they consult before a meal. Yet the label system is a collage of
                  competing vocabularies, placements, and print styles — with real costs on both
                  sides of the decision.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: 24,
                }}>
                  {[
                    { stat: 30, suffix: "%", label: "U.S. food waste tied to date-label confusion", source: "ReFED, 2022" },
                    { stat: 32, suffix: "%", label: "of consumers correctly interpret \"sell by\" / \"use by\"", source: "Norden, 2017" },
                    { stat: 30, suffix: "%", label: "of foodborne illness tied to spoiled food", source: "CDC, 2015" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      borderLeft: `2px solid ${sh.primary}`, paddingLeft: 16,
                    }}>
                      <p style={{
                        fontFamily: serif, fontWeight: 700,
                        fontSize: "clamp(34px, 4vw, 48px)",
                        color: sh.primary, lineHeight: 1, marginBottom: 10,
                        letterSpacing: "-0.03em",
                      }}>
                        <CountUp value={s.stat} suffix={s.suffix} />
                      </p>
                      <p style={{ ...t.bodySm, marginBottom: 6 }}>{s.label}</p>
                      <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.18em" }}>
                        {s.source}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02 THE PROBLEM ON THE SHELF ──────────────────────────── */}
      <section style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="02" title="What fails on the shelf" phase="Failure cases" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Three ways a label
                  <span style={{ fontStyle: "italic", color: sh.primary }}> disappears</span>
                  — in plain sight.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p style={{ ...t.body }}>
                  Before we ran the field study, we needed to see the failure modes clearly. We
                  pulled four representative products off the shelves of a major grocery chain
                  and studied each one as an object — where the date lived, how the text rendered,
                  and how the user was expected to find it.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Three failure modes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                illus: <OilBottleIllustration />,
                tag: "CONTRAST",
                title: "Same color as the product.",
                body: "A yellow stamp on yellow oil. The date is printed — and functionally invisible.",
              },
              {
                illus: <BreadBagIllustration />,
                tag: "PLACEMENT",
                title: "Somewhere on the bag.",
                body: "Transparent packaging and loose placement make every scan a scavenger hunt.",
              },
              {
                illus: <CanTopIllustration />,
                tag: "LEGIBILITY",
                title: "Embossed, not printed.",
                body: "Same-color-on-same-color ridges read as decoration, not information.",
              },
            ].map((f, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  padding: "28px 24px 24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <div style={{
                    height: 180, display: "flex", alignItems: "center",
                    justifyContent: "center", marginBottom: 18,
                    background: sh.surface,
                  }}>
                    {f.illus}
                  </div>
                  <p style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.2em", fontWeight: 700, marginBottom: 10 }}>
                    {f.tag}
                  </p>
                  <h3 style={{ ...t.h3Lede, fontSize: 20, marginBottom: 8 }}>
                    {f.title}
                  </h3>
                  <p style={{ ...t.bodySm }}>
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03 RESEARCH APPROACH ─────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="03" title="How we studied it" phase="Method" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  A mixed-methods study,
                  <span style={{ fontStyle: "italic", color: sh.primary }}> grounded in the aisle.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p style={{ ...t.body }}>
                  Twenty-five participants, balanced across age, gender, shopping cadence, and
                  vision correction. Three complementary lenses: watching shoppers in situ,
                  timing them on standardized products, and asking them to reflect on their own
                  habits.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Three method columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                glyph: <ObservationGlyph />,
                tag: "METHOD · 01",
                title: "Observation",
                body: "Naturalistic study of 25 grocery shoppers across shifts and aisles — noting hesitation, tilting, comparison behaviour, and where lighting helped or hurt.",
              },
              {
                glyph: <ExperimentGlyph />,
                tag: "METHOD · 02",
                title: "Controlled experiment",
                body: "Four standardized products. Each participant timed locating the date. Spread: 5.0s for the best layout, 8.9s for the worst — a 78% swing from design alone.",
              },
              {
                glyph: <SurveyGlyph />,
                tag: "METHOD · 03",
                title: "Post-task survey",
                body: "Self-reported habits, prior illness from expired food, and participant preferences on how to fix the label system.",
              },
            ].map((m, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div style={{
                  borderTop: `2px solid ${sh.primary}`,
                  padding: "24px 4px 4px",
                  height: "100%",
                }}>
                  <div style={{ marginBottom: 18 }}>{m.glyph}</div>
                  <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em", marginBottom: 10 }}>
                    {m.tag}
                  </p>
                  <h3 style={{ ...t.h3Lede, fontSize: 22, marginBottom: 10 }}>
                    {m.title}
                  </h3>
                  <p style={{ ...t.bodySm }}>
                    {m.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Participant strip */}
          <Reveal delay={0.3}>
            <div style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              padding: "24px 28px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Package size={20} color={sh.primary} weight="regular" />
                <p style={{ ...mono, fontSize: 11, color: sh.dark, letterSpacing: "0.2em", fontWeight: 700 }}>
                  Sample Composition
                </p>
              </div>
              {[
                { n: 25, l: "participants" },
                { n: 4,  l: "age cohorts 18–56+" },
                { n: 12, l: "used corrective lenses" },
                { n: 4,  l: "products tested" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{
                    fontFamily: serif, fontWeight: 700, fontSize: 28,
                    color: sh.primary, letterSpacing: "-0.02em",
                  }}>{s.n}</span>
                  <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.16em" }}>
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 04 VOICES FROM THE AISLE ─────────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: sh.surface }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="04" title="Voices from the aisle" phase="Research highlights" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                finding: "Terminology is the first point of failure",
                quote: "Honestly I just guess. \"Best by,\" \"sell by\" — I treat them all the same. If it smells fine I keep it.",
              },
              {
                finding: "Placement and contrast quietly defeat readability",
                quote: "On the oil bottle the date was the same yellow as the oil. I had to tilt it under the light to even find it.",
              },
              {
                finding: "The riskiest moment is after the package is opened",
                quote: "Once I open something, that printed date doesn't matter anymore — I'm just hoping I remember when I opened it.",
              },
            ].map((r, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  padding: "28px 26px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <Quotes size={28} color={sh.primary} weight="fill" style={{ marginBottom: 16, opacity: 0.7 }} />
                  <blockquote style={{
                    fontFamily: serif, fontStyle: "italic",
                    fontSize: 18, lineHeight: 1.5,
                    color: "var(--text-primary)",
                    marginBottom: 20,
                  }}>
                    "{r.quote}"
                  </blockquote>
                  <div style={{
                    marginTop: "auto",
                    borderTop: "1px solid var(--border)",
                    paddingTop: 14,
                  }}>
                    <p style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.18em", fontWeight: 700, marginBottom: 4 }}>
                      FINDING · 0{i + 1}
                    </p>
                    <p style={{ ...t.bodySm, color: "var(--text-primary)", fontWeight: 500 }}>
                      {r.finding}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05 PRINCIPLES APPLIED ────────────────────────────────── */}
      <section style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="05" title="Principles we pressed against" phase="Synthesis" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Every failure traced back to a
                  <span style={{ fontStyle: "italic", color: sh.primary }}> named principle.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p style={{ ...t.body }}>
                  The human factors literature gives us a vocabulary for why a label goes wrong.
                  Mapping each observation to a principle let us move from anecdotes ("people
                  struggled") to arguments ("this violates Hick's Law, here's how to fix it").
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Brain, title: "Hick's Law", rule: "Simplify decisions.", body: "Four competing vocabularies (use-by, sell-by, best-before, freeze-by) inflate decision time. Collapse them." },
              { icon: Stack, title: "Miller's Law", rule: "Seven, plus or minus two.", body: "Dense ingredient panels push the date out of working memory. Chunk and isolate it." },
              { icon: Eye, title: "Visual hierarchy", rule: "The critical thing, biggest.", body: "Today the nutrition label dominates. The safety date should be the first thing the eye lands on." },
              { icon: HandTap, title: "Affordance", rule: "The sign suggests the use.", body: "Universal symbols read faster than typography. A glyph is language-independent." },
            ].map((p, i) => {
              const Icon = p.icon as Icon;
              return (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <div style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    padding: "26px 28px",
                    display: "flex",
                    gap: 22,
                    alignItems: "flex-start",
                    height: "100%",
                  }}>
                    <div style={{
                      width: 44, height: 44, flexShrink: 0,
                      background: sh.subtle,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={22} color={sh.primary} weight="regular" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                        <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 20, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                          {p.title}
                        </h3>
                        <span style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.18em" }}>
                          {p.rule}
                        </span>
                      </div>
                      <p style={{ ...t.bodySm }}>
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 06 DESIGN SOLUTIONS ──────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="06" title="Design proposals" phase="Concepts" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Four concepts,
                  <span style={{ fontStyle: "italic", color: sh.primary }}> two sides of the package.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p style={{ ...t.body }}>
                  Better printing helps the aisle. Better tools help the pantry. Each proposal
                  addresses a specific finding and names the principle it's leaning on — so the
                  design isn't asking to be trusted, it's showing its work.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Four solution cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                icon: CheckCircle,
                title: "Universal Freshness Icon",
                tag: "INDUSTRY · PACKAGING",
                body: "Replace the four-vocabulary tangle with a single three-state glyph — fresh, soon, expired. Colour-coded, language-independent, scannable in a half-second glance.",
                illus: <UniversalIconIllustration />,
                principle: "Affordance · Visual hierarchy",
              },
              {
                num: "02",
                icon: Thermometer,
                title: "Passive Time-Strip",
                tag: "INDUSTRY · PACKAGING",
                body: "Temperature-reactive ink that darkens with real storage conditions — not a printed guess. If it sat in a hot car for a week, the strip knows. No battery, no electronics.",
                illus: <TimeStripIllustration />,
                principle: "Mental models · Feedback",
              },
              {
                num: "03",
                icon: Timer,
                title: "Open-By Overlay",
                tag: "INDUSTRY · POST-OPEN",
                body: "The riskiest window starts the moment the seal is broken. A peel-reveal sticker begins a visible countdown on first open — making the invisible timer visible.",
                illus: <OpenByIllustration />,
                principle: "Cognitive load · Mental models",
              },
              {
                num: "04",
                icon: DeviceMobile,
                title: "Shelfie — household tracker",
                tag: "CONSUMER · APP",
                body: "Snap a photo of your pantry shelf. OCR extracts dates, builds a timeline, and nudges you before something tips. Closes the loop even when the label itself is broken.",
                illus: <ShelfieAppIllustration />,
                principle: "Distributed cognition · Reminders",
              },
            ].map((s, i) => {
              const Icon = s.icon as Icon;
              return (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    {/* illustration zone */}
                    <div style={{
                      background: sh.surface,
                      padding: "24px 20px",
                      borderBottom: "1px solid var(--border)",
                    }}>
                      {s.illus}
                    </div>
                    {/* body */}
                    <div style={{ padding: "28px 28px 30px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <span style={{
                          width: 34, height: 34,
                          background: sh.primary, color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
                          letterSpacing: "0.1em",
                        }}>
                          {s.num}
                        </span>
                        <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                          {s.tag}
                        </span>
                      </div>
                      <h3 style={{ ...t.h3Lede, fontSize: 22, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                        <Icon size={22} color={sh.primary} weight="regular" />
                        {s.title}
                      </h3>
                      <p style={{ ...t.bodySm, marginBottom: 16 }}>
                        {s.body}
                      </p>
                      <div style={{
                        marginTop: "auto",
                        paddingTop: 14,
                        borderTop: "1px solid var(--border-light)",
                        display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
                      }}>
                        <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.18em" }}>
                          LEANS ON
                        </span>
                        <span style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.16em", fontWeight: 600 }}>
                          {s.principle}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 07 OUTCOMES + TAKEAWAYS ──────────────────────────────── */}
      <section style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="07" title="What the work left us with" phase="Reflection" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 24 }}>
                  Research as a way
                  <span style={{ fontStyle: "italic", color: sh.primary }}> to make the invisible</span>
                  <br />
                  arguable.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.body }}>
                  The strongest thing the field study gave us wasn't a single fix — it was a way
                  to defend each fix. Every design choice points back to a behavioural observation,
                  which points back to a named human factors principle.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {[
                  "A label is a system, not a sticker — terminology, placement, contrast, and post-open behaviour all have to be designed together.",
                  "Field research reveals failures that surveys flatter away. People say they check dates carefully; the timing data disagrees.",
                  "Vulnerable users set the floor. Designing for tired eyes and bad lighting raises the floor for everyone.",
                  "Fixes have to live on both sides of the package — better printing helps the aisle, better tools help the pantry.",
                  "Behind every \"obvious\" interface decision sits a cognitive principle worth naming. Making them explicit makes the case defensible.",
                ].map((tk, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.06}>
                    <div style={{
                      display: "flex", gap: 20, alignItems: "flex-start",
                      padding: "20px 22px",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                    }}>
                      <span style={{
                        ...mono, fontSize: 12, fontWeight: 700,
                        color: sh.primary, letterSpacing: "0.15em",
                        flexShrink: 0, paddingTop: 2,
                      }}>
                        0{i + 1}
                      </span>
                      <p style={{ ...t.bodySm, color: "var(--text-primary)" }}>
                        {tk}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEXT CASE ─────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(64px, 8vw, 96px) 0", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{
            display: "grid", gap: "clamp(16px, 3vw, 40px)",
            gridTemplateColumns: adjacent.prev && adjacent.next ? "1fr 1fr" : "1fr",
          }}>
            {adjacent.prev && (
              <Link to={`/work/${adjacent.prev.slug}`}
                style={{
                  padding: "clamp(24px, 3vw, 36px)",
                  background: "var(--bg-elevated)",
                  border: `1px solid ${sh.subtle}`,
                  textDecoration: "none", display: "block",
                  transition: "border-color 240ms, transform 240ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = sh.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = sh.subtle; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ ...mono, fontSize: 11, color: sh.muted, letterSpacing: "0.2em", marginBottom: 12 }}>
                  ← PREVIOUS CASE
                </div>
                <div style={{ ...t.h3Lede }}>{adjacent.prev.title}</div>
                <div style={{ ...t.bodySm, marginTop: 6 }}>{adjacent.prev.subtitle}</div>
              </Link>
            )}
            {adjacent.next && (
              <Link to={`/work/${adjacent.next.slug}`}
                style={{
                  padding: "clamp(24px, 3vw, 36px)",
                  background: "var(--bg-elevated)",
                  border: `1px solid ${sh.subtle}`,
                  textDecoration: "none", display: "block",
                  transition: "border-color 240ms, transform 240ms",
                  textAlign: adjacent.prev ? "right" : "left",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = sh.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = sh.subtle; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ ...mono, fontSize: 11, color: sh.muted, letterSpacing: "0.2em", marginBottom: 12 }}>
                  NEXT CASE →
                </div>
                <div style={{ ...t.h3Lede }}>{adjacent.next.title}</div>
                <div style={{ ...t.bodySm, marginTop: 6 }}>{adjacent.next.subtitle}</div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Scroll-to-top */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          style={{
            position: "fixed", bottom: 32, right: 32, zIndex: 40,
            width: 44, height: 44,
            background: sh.primary, color: "#fff",
            border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(140,46,34,0.18), 0 12px 32px rgba(140,46,34,0.22)",
            transitionProperty: "transform, box-shadow",
            transitionDuration: "200ms",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <ArrowUp size={18} weight="regular" />
        </motion.button>
      )}
    </motion.div>
  );
}
