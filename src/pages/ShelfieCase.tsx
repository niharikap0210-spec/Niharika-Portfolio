import { motion, useInView, useMotionValue, useScroll, useSpring, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpIcon as ArrowUp,
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
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
  TrashIcon as Trash,
  CurrencyDollarIcon as CurrencyDollar,
  QuestionIcon as Question,
  ArrowsLeftRightIcon as ArrowsLeftRight,
  FirstAidKitIcon as FirstAidKit,
  HandPalmIcon as HandPalm,
  UsersThreeIcon as UsersThree,
  LightbulbIcon as Lightbulb,
  MagnifyingGlassIcon as MagnifyingGlass,
  FlaskIcon as Flask,
  ChatCircleTextIcon as ChatCircleText,
  GearIcon as Gear,
  TargetIcon as Target,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { getAdjacentProjects } from "../data/projects";

/* ── Shelfie palette, scoped to this page ─────────────────────────── */
const sh = {
  primary: "#1F5F5C",         // deep teal — sophisticated, food-fresh
  light:   "#4A8985",         // tint
  dark:    "#143F3D",         // shade
  surface: "#E8F1EF",         // very pale mint-cream
  subtle:  "rgba(31, 95, 92, 0.08)",
  muted:   "rgba(31, 95, 92, 0.55)",
  fresh:   "#5A8C5C",         // sage — the "still fresh" complement
  caution: "#D4A43C",         // amber — the "caution" mid-state
  expired: "#C44536",         // semantic red — used ONLY in freshness-state diagrams
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

function YogurtCupIllustration() {
  return (
    <svg viewBox="0 0 140 180" width="100%" style={{ maxWidth: 140 }} aria-hidden>
      {/* foil lid */}
      <ellipse cx="70" cy="34" rx="46" ry="8" fill="#E0DFD9" stroke={sh.dark} strokeWidth="0.8" />
      {/* cup body — tapers slightly */}
      <path
        d="M 26 36 L 32 168 Q 32 174 38 174 L 102 174 Q 108 174 108 168 L 114 36 Z"
        fill="#FAFAFA"
        stroke={sh.dark}
        strokeWidth="0.9"
      />
      {/* brand band */}
      <rect x="32" y="74" width="76" height="36" fill={sh.primary} opacity="0.92" />
      <text x="70" y="92" textAnchor="middle" fontFamily={serif} fontSize="11" fontWeight="700" fill="#fff">YOGURT</text>
      <text x="70" y="103" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" fill="#fff" opacity="0.85" letterSpacing="0.2em">PROBIOTIC · 150 G</text>
      {/* micro-printed date on rim */}
      <text x="34" y="44" fontFamily="'Space Mono', monospace" fontSize="3.2" fill={sh.dark} opacity="0.55" letterSpacing="0.05em">EXP 04/29/25 LOT 4178</text>
      {/* magnifier ring centered on date */}
      <circle cx="48" cy="42" r="14" fill="rgba(255,255,255,0.6)" stroke={sh.primary} strokeWidth="1.2" />
      <text x="48" y="40" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="5" fontWeight="700" fill={sh.primary} letterSpacing="0.05em">EXP 04/29</text>
      <text x="48" y="46" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="3.4" fill={sh.dark} opacity="0.7">LOT 4178</text>
      {/* magnifier handle */}
      <line x1="58" y1="52" x2="76" y2="68" stroke={sh.primary} strokeWidth="2" strokeLinecap="round" />
      {/* fingertip scale ref */}
      <text x="118" y="48" fontFamily="'Space Mono', monospace" fontSize="5" fill={sh.dark} opacity="0.6" letterSpacing="0.1em">3.4 pt</text>
      <line x1="116" y1="44" x2="62" y2="44" stroke={sh.dark} strokeWidth="0.4" strokeDasharray="1 1" opacity="0.5" />
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
        { x: 200, label: "EXPIRED", color: sh.expired, check: false },
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
   HERO VISUAL — confused shopper photograph
   Captures the central moment of the project: a person in the aisle,
   product in hand, label refusing to make sense. Soft teal glow
   behind, gentle float, no card frame.
══════════════════════════════════════════════════════════════════ */
function HeroVisual() {
  return (
    <motion.div
      className="md:col-span-7"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative", width: "100%", minWidth: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(20px, 3vw, 40px) 0",
      }}
    >
      {/* Soft teal radial glow — sits behind the figure */}
      <div aria-hidden style={{
        position: "absolute", inset: "-10%",
        background: `radial-gradient(50% 50% at 50% 50%, ${sh.light} 0%, ${sh.primary} 38%, rgba(31,95,92,0) 72%)`,
        filter: "blur(80px)", opacity: 0.30, zIndex: 0, pointerEvents: "none",
      }} />

      <motion.img
        src="/shelfie/shopper-confused.webp"
        alt="A shopper in the aisle puzzling over a product label"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "relative", zIndex: 1,
          width: "min(100%, 460px)", height: "auto", display: "block",
          mixBlendMode: "multiply",
          filter: "drop-shadow(0 22px 40px rgba(31,95,92,0.18))",
        }}
      />
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
        {/* Blueprint grid backdrop — fine 20px micro + 80px primary */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            repeating-linear-gradient(0deg, ${sh.subtle} 0 0.5px, transparent 0.5px 20px),
            repeating-linear-gradient(90deg, ${sh.subtle} 0 0.5px, transparent 0.5px 20px),
            repeating-linear-gradient(0deg, ${sh.muted} 0 0.5px, transparent 0.5px 80px),
            repeating-linear-gradient(90deg, ${sh.muted} 0 0.5px, transparent 0.5px 80px)
          `,
          opacity: 0.42,
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, #000 40%, transparent 100%)",
        }} />
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

      {/* ─── 01 PREMISE ───────────────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        background: sh.surface,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="01" title="Premise" phase="The stakes" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 20 }}>
                  A three-word
                  <br />
                  <span style={{ fontStyle: "italic", color: sh.primary }}>public-health</span>
                  <br />
                  problem.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ ...t.bodyLg, maxWidth: 480 }}>
                  The last thing a shopper reads before a purchase. The first thing they
                  consult before a meal. And nearly nobody reads it the same way twice.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal delay={0.18}>
                <div style={{
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: "14px 20px",
                  padding: "26px 28px",
                  background: "var(--bg-elevated)",
                  border: `1px solid ${sh.subtle}`,
                  borderLeft: `3px solid ${sh.primary}`,
                }}>
                  {[
                    { icon: ChatCircleText, label: "Vocabulary", body: "Four competing terms — no legal definition." },
                    { icon: Eye,            label: "Legibility", body: "Low contrast, micro-type, hidden placement." },
                    { icon: Brain,          label: "Memory",     body: "The printed date stops meaning anything once opened." },
                  ].map((row, i) => {
                    const I = row.icon as Icon;
                    return (
                      <div key={i} style={{ display: "contents" }}>
                        <div style={{
                          width: 36, height: 36, flexShrink: 0,
                          background: sh.subtle,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <I size={18} color={sh.primary} weight="regular" />
                        </div>
                        <div style={{ alignSelf: "center" }}>
                          <p style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.2em", fontWeight: 700, marginBottom: 2 }}>
                            {row.label}
                          </p>
                          <p style={{ ...t.bodySm, color: "var(--text-primary)", margin: 0 }}>{row.body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Six-stat panel — the public-health math */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 1,
            background: sh.subtle,
            border: `1px solid ${sh.subtle}`,
          }}>
            {[
              { icon: Trash,           stat: 30,  suffix: "%", label: "of U.S. food waste tied directly to date-label confusion",            source: "ReFED, 2022" },
              { icon: HandPalm,        stat: 84,  suffix: "%", label: "discard food at \u201Cbest-before\u201D regardless of actual safety", source: "FMI · Johns Hopkins" },
              { icon: Question,        stat: 32,  suffix: "%", label: "correctly interpret the difference between sell-by and use-by",      source: "Nordic Council" },
              { icon: CurrencyDollar,  stat: 161, suffix: "B", prefix: "$", label: "in U.S. household food thrown out each year",            source: "USDA · NRDC, 2022" },
            ].map((s, i) => {
              const I = s.icon as Icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "var(--bg-elevated)",
                      padding: "26px 24px 24px",
                      height: "100%",
                      display: "flex", flexDirection: "column",
                      cursor: "default",
                    }}
                  >
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      marginBottom: 18,
                    }}>
                      <div style={{
                        width: 38, height: 38, background: sh.subtle,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <I size={20} color={sh.primary} weight="regular" />
                      </div>
                      <p style={{ ...mono, fontSize: 9, color: sh.muted, letterSpacing: "0.2em" }}>
                        FACT · 0{i + 1}
                      </p>
                    </div>
                    <p style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(34px, 4vw, 46px)",
                      color: sh.primary, lineHeight: 1, marginBottom: 12,
                      letterSpacing: "-0.03em",
                    }}>
                      {s.prefix && <span>{s.prefix}</span>}
                      <CountUp value={s.stat} suffix={s.suffix} />
                    </p>
                    <p style={{ ...t.bodySm, marginBottom: 14, flex: 1 }}>{s.label}</p>
                    <p style={{
                      ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.18em",
                      paddingTop: 10, borderTop: `1px solid ${sh.subtle}`,
                    }}>
                      {s.source}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 02 THE PROBLEM ON THE SHELF ──────────────────────────── */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="02" title="What fails on the shelf" phase="Failure cases" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Four ways a label
                  <span style={{ fontStyle: "italic", color: sh.primary }}> disappears</span>
                  — in plain sight.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 620 }}>
                  We pulled four representative products off the shelf, then timed
                  twenty-five shoppers locating each date. Every product failed differently
                  — and the spread between best and worst was almost two-to-one.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.18}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 20px",
                  background: "var(--bg-elevated)",
                  border: `1px solid ${sh.subtle}`,
                  borderLeft: `3px solid ${sh.primary}`,
                }}>
                  <Flask size={22} color={sh.primary} weight="regular" />
                  <div>
                    <p style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.2em", fontWeight: 700, marginBottom: 2 }}>
                      METHOD
                    </p>
                    <p style={{ ...t.bodySm, color: "var(--text-primary)", margin: 0 }}>
                      Naturalistic locate-task · in-aisle lighting · n = 25
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Four failure modes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { illus: <OilBottleIllustration />,  tag: "CONTRAST",  title: "Same color as the product.",      body: "Yellow stamp on yellow oil — printed, functionally invisible.",       time: "8.9s", hits: "3 / 25 under 5s" },
              { illus: <BreadBagIllustration />,   tag: "PLACEMENT", title: "Somewhere on the bag.",            body: "Loose placement turns every scan into a scavenger hunt.",            time: "7.6s", hits: "11 / 25 flipped the bag" },
              { image: "/shelfie/decoding-mfg-code.jpg", alt: "A hand pointing at a packaging code reading 'mfg 213' with a callout 'manufactured on August 1'", tag: "LEGIBILITY", title: "Coded, not communicated.",  body: "Manufacture codes (\u201Cmfg 213\u201D) demand a decoder ring — useless at a glance.", time: "6.4s", hits: "9 / 25 read the wrong number" },
              { illus: <YogurtCupIllustration />,  tag: "TYPE SIZE", title: "Smaller than the lot code.",       body: "3.4 pt on a foil rim. Below the comfortable reading threshold.",      time: "9.2s", hits: "5 / 25 needed it closer" },
            ].map((f, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    padding: "28px 24px 24px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "default",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = sh.primary; (e.currentTarget as HTMLElement).style.boxShadow = `0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(31,95,92,0.12)`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  {/* magnifier badge — top-right corner */}
                  <div style={{
                    position: "absolute", top: 14, right: 14, zIndex: 2,
                    width: 30, height: 30,
                    background: sh.subtle,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <MagnifyingGlass size={14} color={sh.primary} weight="regular" />
                  </div>
                  <div style={{
                    height: 180, display: "flex", alignItems: "center",
                    justifyContent: "center", marginBottom: 18,
                    background: sh.surface, overflow: "hidden",
                  }}>
                    {f.image ? (
                      <img
                        src={f.image}
                        alt={f.alt ?? ""}
                        style={{
                          maxWidth: "100%", maxHeight: "100%",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : (
                      f.illus
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, gap: 8 }}>
                    <p style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.2em", fontWeight: 700, margin: 0 }}>
                      {f.tag}
                    </p>
                    <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.16em", margin: 0 }}>
                      AVG · <span style={{ color: sh.dark, fontWeight: 700 }}>{f.time}</span>
                    </p>
                  </div>
                  <h3 style={{ ...t.h3Lede, fontSize: 19, marginBottom: 8 }}>
                    {f.title}
                  </h3>
                  <p style={{ ...t.bodySm, marginBottom: 14 }}>
                    {f.body}
                  </p>
                  <div style={{
                    marginTop: "auto", paddingTop: 12,
                    borderTop: `1px solid ${sh.subtle}`,
                    ...mono, fontSize: 9, color: sh.muted, letterSpacing: "0.16em",
                  }}>
                    {f.hits}
                  </div>
                </motion.div>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  A mixed-methods study,
                  <span style={{ fontStyle: "italic", color: sh.primary }}> grounded in the aisle.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 580 }}>
                  Three complementary lenses: watch them, time them, ask them.
                  Twenty-five participants, balanced across age, vision, and cadence.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Three method columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { glyph: <ObservationGlyph />, tag: "METHOD · 01", title: "Observation",          body: "Watching 25 shoppers in situ — hesitation, tilting, comparison behaviour, lighting." },
              { glyph: <ExperimentGlyph />,  tag: "METHOD · 02", title: "Controlled experiment", body: "Four standardised products. Timed locate task. 5.0s → 8.9s spread from design alone." },
              { glyph: <SurveyGlyph />,      tag: "METHOD · 03", title: "Post-task survey",      body: "Self-reported habits, prior illness, and preferences on how to fix the label system." },
            ].map((m, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    borderTop: `2px solid ${sh.primary}`,
                    padding: "24px 4px 4px",
                    height: "100%",
                    cursor: "default",
                  }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ marginBottom: 18, display: "inline-block", transformOrigin: "left center" }}
                  >
                    {m.glyph}
                  </motion.div>
                  <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em", marginBottom: 10 }}>
                    {m.tag}
                  </p>
                  <h3 style={{ ...t.h3Lede, fontSize: 22, marginBottom: 10 }}>
                    {m.title}
                  </h3>
                  <p style={{ ...t.bodySm }}>
                    {m.body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 04 VOICES FROM THE AISLE ─────────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: sh.surface }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="04" title="Voices from the aisle" phase="Research highlights" />

          {/* Lede */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Twenty-five shoppers,
                  <span style={{ fontStyle: "italic", color: sh.primary }}> in their own words.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 600 }}>
                  Semi-structured shop-alongs and post-task debriefs. Verbatim transcripts,
                  affinity-diagrammed, blind-coded.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Four finding cards — strongest themes only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: ChatCircleText,
                finding: "Vocabulary collapses into a single guess",
                quote: "Honestly I just guess. \"Best by,\" \"sell by\" — I treat them all the same.",
                meta: "P04 · 31 · weekly shopper",
                stat: "18 / 25 don't distinguish between the four terms",
              },
              {
                icon: Eye,
                finding: "Contrast and placement defeat the eye",
                quote: "The date was the same yellow as the oil. I had to tilt it under the light to even find it.",
                meta: "P11 · 47 · corrective lenses",
                stat: "62% of locate attempts required tilting under light",
              },
              {
                icon: Brain,
                finding: "Once opened, the date stops meaning anything",
                quote: "I'm just hoping I remember when I opened it. The printed date doesn't matter anymore.",
                meta: "P19 · 28 · weekly shopper",
                stat: "23 / 25 had no system for tracking opened items",
              },
              {
                icon: HandPalm,
                finding: "Loss aversion drives over-discarding",
                quote: "If it's the day after the date I throw it out. Not risking a hospital bill for two dollars.",
                meta: "P14 · 38 · parent of two",
                stat: "9 / 25 discard within 24 h regardless of state",
              },
            ].map((r, i) => {
              const I = r.icon as Icon;
              return (
                <Reveal key={i} delay={0.1 + i * 0.07}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      padding: "30px 30px 28px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "default",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = sh.primary; (e.currentTarget as HTMLElement).style.boxShadow = `0 1px 2px rgba(0,0,0,0.04), 0 14px 36px rgba(31,95,92,0.13)`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                      <div style={{
                        width: 44, height: 44, background: sh.subtle,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <I size={22} color={sh.primary} weight="regular" />
                      </div>
                      <p style={{ ...mono, fontSize: 10, color: sh.primary, letterSpacing: "0.18em", fontWeight: 700, margin: 0 }}>
                        FINDING · 0{i + 1}
                      </p>
                    </div>
                    <Quotes size={22} color={sh.primary} weight="fill" style={{ marginBottom: 10, opacity: 0.5 }} />
                    <blockquote style={{
                      fontFamily: serif, fontStyle: "italic",
                      fontSize: 19, lineHeight: 1.5,
                      color: "var(--text-primary)",
                      marginBottom: 14,
                    }}>
                      "{r.quote}"
                    </blockquote>
                    <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.18em", marginBottom: 18 }}>
                      — {r.meta}
                    </p>
                    <div style={{
                      marginTop: "auto",
                      borderTop: `1px solid ${sh.subtle}`,
                      paddingTop: 14,
                    }}>
                      <p style={{ ...t.bodySm, color: "var(--text-primary)", fontWeight: 500, marginBottom: 8 }}>
                        {r.finding}
                      </p>
                      <p style={{ ...mono, fontSize: 9, color: sh.muted, letterSpacing: "0.16em" }}>
                        {r.stat}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 05 PRINCIPLES APPLIED ────────────────────────────────── */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="05" title="Principles we pressed against" phase="Synthesis" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Every failure traced back to a
                  <span style={{ fontStyle: "italic", color: sh.primary }}> named principle.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 580 }}>
                  Anecdotes don't change packaging. Principles do. We mapped each observation
                  onto a named cognitive constraint — so the design isn't asking to be trusted,
                  it's showing its work.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Brain,   title: "Hick's Law",       rule: "Simplify decisions.",            body: "Four competing vocabularies inflate decision time. Collapse them." },
              { icon: Stack,   title: "Miller's Law",     rule: "Seven, plus or minus two.",      body: "Dense panels push the date out of working memory. Chunk and isolate." },
              { icon: Eye,     title: "Visual hierarchy", rule: "The critical thing, biggest.",   body: "Today nutrition dominates. The safety date should land first." },
              { icon: HandTap, title: "Affordance",       rule: "The sign suggests the use.",     body: "Universal symbols read faster than typography. Glyphs are language-independent." },
            ].map((p, i) => {
              const Icon = p.icon as Icon;
              return (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      padding: "26px 28px",
                      display: "flex",
                      gap: 22,
                      alignItems: "flex-start",
                      height: "100%",
                      cursor: "default",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = sh.primary; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                  >
                    {/* big numerical index — subtle background flourish */}
                    <span aria-hidden style={{
                      position: "absolute", right: 16, bottom: -12,
                      fontFamily: serif, fontWeight: 700,
                      fontSize: 78, color: sh.subtle,
                      letterSpacing: "-0.03em", lineHeight: 1, pointerEvents: "none",
                      userSelect: "none",
                    }}>
                      0{i + 1}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{
                        width: 48, height: 48, flexShrink: 0,
                        background: sh.subtle,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative", zIndex: 1,
                      }}
                    >
                      <Icon size={24} color={sh.primary} weight="regular" />
                    </motion.div>
                    <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                        <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 22, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
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
                  </motion.div>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Four concepts,
                  <span style={{ fontStyle: "italic", color: sh.primary }}> two sides of the package.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 600 }}>
                  Better printing helps the aisle. Better tools help the pantry.
                  Each concept points back to a finding and names the principle it leans on.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Four solution cards in a uniform 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01", icon: CheckCircle,
                title: "Universal Freshness Icon",
                category: "PASSIVE PACKAGING",
                body: "A single three-state glyph replaces the four-vocabulary tangle. Fresh · soon · expired — colour-coded, language-independent, half-second glance.",
                illus: <UniversalIconIllustration />,
                principle: "Affordance · Visual hierarchy",
              },
              {
                num: "02", icon: Thermometer,
                title: "Passive Time-Strip",
                category: "SMART PACKAGING",
                body: "Temperature-reactive ink darkens with real storage conditions. No battery — and a hot car ride doesn't go uncounted.",
                illus: <TimeStripIllustration />,
                principle: "Mental models · Feedback",
              },
              {
                num: "03", icon: Timer,
                title: "Open-By Overlay",
                category: "POST-OPEN",
                body: "A peel-reveal sticker starts a visible countdown the moment the seal breaks — making the invisible post-open timer visible.",
                illus: <OpenByIllustration />,
                principle: "Cognitive load · Mental models",
              },
              {
                num: "04", icon: DeviceMobile,
                title: "Shelfie — household tracker",
                category: "CONSUMER TOOL",
                body: "Snap one shelf photo. OCR extracts dates, builds a timeline, and nudges you 48 h before something tips.",
                illus: <ShelfieAppIllustration />,
                principle: "Distributed cognition · Reminders",
              },
            ].map((s, i) => {
              const Icon = s.icon as Icon;
              return (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex", flexDirection: "column",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = sh.primary; (e.currentTarget as HTMLElement).style.boxShadow = `0 1px 2px rgba(0,0,0,0.04), 0 18px 44px rgba(31,95,92,0.14)`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <div style={{
                      background: sh.surface,
                      padding: "24px 20px",
                      borderBottom: "1px solid var(--border)",
                      overflow: "hidden",
                    }}>
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {s.illus}
                      </motion.div>
                    </div>
                    <div style={{ padding: "28px 28px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
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
                          {s.category}
                        </span>
                      </div>
                      <h3 style={{ ...t.h3Lede, fontSize: 22, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                        <Icon size={22} color={sh.primary} weight="regular" />
                        {s.title}
                      </h3>
                      <p style={{ ...t.bodySm, marginBottom: 18 }}>
                        {s.body}
                      </p>
                      <div style={{
                        marginTop: "auto", paddingTop: 14,
                        borderTop: `1px solid ${sh.subtle}`,
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
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 07 OUTCOMES + TAKEAWAYS ──────────────────────────────── */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="07" title="What the work left us with" phase="Reflection" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Research as a way
                  <span style={{ fontStyle: "italic", color: sh.primary }}> to make the invisible</span>
                  <br />
                  arguable.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 600 }}>
                  The strongest thing this study left us with wasn't a single fix.
                  It was a way to defend each one — observation by observation, principle by principle.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Takeaway grid — icon-led cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Stack,
                head: "A label is a system, not a sticker.",
                body: "Terminology, placement, contrast, and post-open behaviour all have to be designed together.",
              },
              {
                icon: Eye,
                head: "Field research reveals what surveys flatter away.",
                body: "People say they check dates carefully. The timing data disagrees.",
              },
              {
                icon: UsersThree,
                head: "Vulnerable users set the floor.",
                body: "Designing for tired eyes and bad lighting raises the floor for everyone.",
              },
              {
                icon: Lightbulb,
                head: "Research is the leverage, not the deliverable.",
                body: "The study didn't ship a label. It made every future label argument shorter.",
              },
            ].map((tk, i) => {
              const I = tk.icon as Icon;
              return (
                <Reveal key={i} delay={0.05 + i * 0.06}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "relative",
                      padding: "28px 26px 26px",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      height: "100%",
                      display: "flex", flexDirection: "column",
                      cursor: "default",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = sh.primary; (e.currentTarget as HTMLElement).style.boxShadow = `0 1px 2px rgba(0,0,0,0.04), 0 14px 36px rgba(31,95,92,0.12)`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    {/* big background numeral */}
                    <span aria-hidden style={{
                      position: "absolute", right: 12, bottom: -18,
                      fontFamily: serif, fontWeight: 700,
                      fontSize: 88, color: sh.subtle,
                      letterSpacing: "-0.03em", lineHeight: 1, pointerEvents: "none",
                      userSelect: "none",
                    }}>
                      0{i + 1}
                    </span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, position: "relative", zIndex: 1 }}>
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: -4 }}
                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{
                          width: 44, height: 44, background: sh.subtle,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <I size={22} color={sh.primary} weight="regular" />
                      </motion.div>
                      <span style={{ ...mono, fontSize: 10, color: sh.muted, letterSpacing: "0.2em", fontWeight: 700 }}>
                        TAKEAWAY · 0{i + 1}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: serif, fontWeight: 700, fontSize: 19,
                      color: "var(--text-primary)", letterSpacing: "-0.015em",
                      lineHeight: 1.3, marginBottom: 10, position: "relative", zIndex: 1,
                    }}>
                      {tk.head}
                    </h3>
                    <p style={{ ...t.bodySm, position: "relative", zIndex: 1 }}>
                      {tk.body}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
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
                  transition: "border-color 240ms, transform 240ms, box-shadow 240ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = sh.primary; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 1px 2px rgba(0,0,0,0.04), 0 18px 44px rgba(31,95,92,0.13)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = sh.subtle; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ ...mono, fontSize: 11, color: sh.muted, letterSpacing: "0.2em", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <ArrowLeft size={14} weight="regular" />
                  PREVIOUS CASE
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
                  transition: "border-color 240ms, transform 240ms, box-shadow 240ms",
                  textAlign: adjacent.prev ? "right" : "left",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = sh.primary; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 1px 2px rgba(0,0,0,0.04), 0 18px 44px rgba(31,95,92,0.13)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = sh.subtle; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ ...mono, fontSize: 11, color: sh.muted, letterSpacing: "0.2em", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, justifyContent: adjacent.prev ? "flex-end" : "flex-start" }}>
                  NEXT CASE
                  <ArrowRight size={14} weight="regular" />
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
            boxShadow: "0 2px 4px rgba(20,63,61,0.18), 0 12px 32px rgba(20,63,61,0.22)",
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
