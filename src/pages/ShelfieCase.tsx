import { motion, AnimatePresence, useInView, useMotionValue, useScroll, useSpring, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpIcon as ArrowUp,
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
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
  PlusIcon as Plus,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { projects, type Project } from "../data/projects";

/* ── Shelfie palette, scoped to this page ─────────────────────────── */
const sh = {
  primary: "#1F5F5C",         // deep teal - sophisticated, food-fresh
  light:   "#4A8985",         // tint
  dark:    "#143F3D",         // shade
  surface: "#E8F1EF",         // very pale mint-cream
  subtle:  "rgba(31, 95, 92, 0.08)",
  muted:   "rgba(31, 95, 92, 0.55)",
  fresh:   "#5A8C5C",         // sage - the "still fresh" complement
  caution: "#D4A43C",         // amber - the "caution" mid-state
  expired: "#C44536",         // semantic red - used ONLY in freshness-state diagrams
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
    fontFamily: sans, fontSize: 14, lineHeight: 1.7,
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

/* ──────────────────────────────────────────────────────────────────
   FAILURE-MODE SPECIMEN PLATES
   Four unified editorial diagrams - same 320×200 canvas, same
   annotation language, callouts always to the right. Each plate
   makes the failure mode immediately readable: the product is on
   the left, the date sits where it actually fails, the right rail
   names the diagnosis.
   ────────────────────────────────────────────────────────────── */

/* shared annotation rule - thin pointer with a square node */
function PointerRule({ x1, y1, x2, y2, color = sh.dark }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" />
      <rect x={x1 - 2} y={y1 - 2} width="4" height="4" fill={color} />
    </g>
  );
}

/* Annotation type sizes - calibrated for SVG render at ~500-560px wide.
   Larger sizes here read clearly without crowding. */
type SvgTextProps = React.SVGProps<SVGTextElement>;
const ANNOT: Record<"hed" | "body" | "small" | "fig", SvgTextProps> = {
  hed:    { fontFamily: "'Space Mono', monospace", fontSize: 11,  fontWeight: 700, letterSpacing: "0.18em" },
  body:   { fontFamily: "'Space Mono', monospace", fontSize: 9.5,                  letterSpacing: "0.16em" },
  small:  { fontFamily: "'Space Mono', monospace", fontSize: 8.5,                  letterSpacing: "0.16em" },
  fig:    { fontFamily: "'Space Mono', monospace", fontSize: 8,                    letterSpacing: "0.2em"  },
};

/* 01 · CONTRAST - yellow stamp on yellow oil */
function OilBottleIllustration() {
  return (
    <svg viewBox="0 0 360 240" width="100%" aria-hidden>
      {/* cap + neck */}
      <rect x="74" y="22" width="32" height="16" fill={sh.dark} />
      <rect x="78" y="36" width="24" height="12" fill={sh.caution} opacity="0.9" />
      {/* bottle body */}
      <path
        d="M 60 48 Q 60 62 54 70 L 54 200 Q 54 212 66 212 L 114 212 Q 126 212 126 200 L 126 70 Q 120 62 120 48 Z"
        fill={sh.caution} opacity="0.88"
      />
      {/* subtle highlight */}
      <path d="M 60 72 L 60 198 Q 60 206 68 206 L 76 206 L 76 72 Z" fill="#FFFFFF" opacity="0.20" />

      {/* the invisible date - same yellow as oil, pointer line attaches to it */}
      <text x="90" y="142" textAnchor="middle"
        fontFamily="'Space Mono', monospace" fontSize="9"
        fill={sh.caution} opacity="0.75" letterSpacing="0.08em" fontWeight="700">
        USE BY 05/24
      </text>

      {/* pointer + caption rail (points to the invisible date) */}
      <PointerRule x1={126} y1={142} x2={206} y2={142} />
      <text x="214" y="138" {...ANNOT.hed} fill={sh.dark}>DATE</text>
      <text x="214" y="154" {...ANNOT.body} fill={sh.dark} opacity="0.75">AMBER ON AMBER</text>

      {/* ΔE swatch comparison block, top-right */}
      <text x="214" y="48" {...ANNOT.hed} fill={sh.dark}>ΔE · CONTRAST</text>
      <line x1="214" y1="56" x2="344" y2="56" stroke={sh.dark} strokeWidth="0.5" opacity="0.4" />
      <rect x="214" y="66" width="28" height="28" fill={sh.caution} opacity="0.88" />
      <rect x="248" y="66" width="28" height="28" fill={sh.caution} opacity="0.66" />
      <text x="214" y="108" {...ANNOT.small} fill={sh.dark} opacity="0.7">BG</text>
      <text x="248" y="108" {...ANNOT.small} fill={sh.dark} opacity="0.7">INK</text>
      <text x="294" y="86" fontFamily={serif} fontWeight="700" fontSize="22"
        fill={sh.primary} letterSpacing="-0.02em">≈ 4</text>
      <text x="294" y="102" {...ANNOT.small} fill={sh.dark} opacity="0.6">WCAG MIN 30</text>

      {/* base rule + fig footer */}
      <line x1="214" y1="200" x2="344" y2="200" stroke={sh.dark} strokeWidth="0.5" opacity="0.4" />
      <text x="214" y="220" {...ANNOT.fig} fill={sh.dark} opacity="0.55">
        FIG · 01 / CONTRAST
      </text>
    </svg>
  );
}

/* 02 · PLACEMENT - date stamped in three different spots */
function BreadBagIllustration() {
  const dots = [
    { x: 88,  y: 80,  n: "1" },
    { x: 138, y: 124, n: "2" },
    { x: 96,  y: 174, n: "3" },
  ];
  const rows = [
    { y: 70,  n: "1", t: "FRONT FACE",  code: "BB 04/15" },
    { y: 102, n: "2", t: "BACK PANEL",  code: "04/15"   },
    { y: 134, n: "3", t: "BOTTOM FOLD", code: "LOT 22A" },
  ];
  return (
    <svg viewBox="0 0 360 240" width="100%" aria-hidden>
      {/* twist tie */}
      <rect x="100" y="22" width="18" height="8" fill={sh.dark} />
      {/* bag */}
      <path d="M 50 32 Q 109 20 168 32 L 170 208 Q 109 220 48 208 Z"
        fill={sh.surface} stroke={sh.dark} strokeWidth="1" />
      {/* brand label */}
      <rect x="74" y="46" width="70" height="22" fill={sh.primary} opacity="0.94" />
      <text x="109" y="62" textAnchor="middle" fontFamily={serif} fontSize="13"
        fontWeight="700" fill="#fff" letterSpacing="-0.01em">BREAD</text>

      {/* dotted search path between the three spots */}
      <path d={`M ${dots[0].x} ${dots[0].y} Q ${dots[1].x - 24} ${dots[0].y + 22} ${dots[1].x} ${dots[1].y} Q ${dots[2].x + 30} ${dots[1].y + 22} ${dots[2].x} ${dots[2].y}`}
        fill="none" stroke={sh.primary} strokeWidth="0.9" strokeDasharray="3 3" opacity="0.7" />
      {/* numbered dots only - labels live in the right rail */}
      {dots.map((d) => (
        <g key={d.n}>
          <circle cx={d.x} cy={d.y} r="9" fill={sh.primary} />
          <text x={d.x} y={d.y + 4} textAnchor="middle"
            fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="700"
            fill="#fff">{d.n}</text>
        </g>
      ))}

      {/* right rail */}
      <text x="206" y="48" {...ANNOT.hed} fill={sh.dark}>PRINT LOCATIONS</text>
      <line x1="206" y1="56" x2="344" y2="56" stroke={sh.dark} strokeWidth="0.5" opacity="0.4" />

      {rows.map((r) => (
        <g key={r.n}>
          <circle cx="214" cy={r.y} r="9" fill={sh.primary} />
          <text x="214" y={r.y + 4} textAnchor="middle"
            fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="700"
            fill="#fff">{r.n}</text>
          <text x="232" y={r.y - 1} {...ANNOT.body} fill={sh.dark}>
            {r.t}
          </text>
          <text x="232" y={r.y + 12} {...ANNOT.small} fill={sh.dark} opacity="0.6">
            {r.code}
          </text>
        </g>
      ))}

      <text x="206" y="178" fontFamily={serif} fontSize="26" fontWeight="700"
        fill={sh.primary} letterSpacing="-0.03em">3 spots,</text>
      <text x="206" y="200" fontFamily={serif} fontSize="16" fontStyle="italic"
        fill={sh.dark}>no convention.</text>

      <text x="206" y="226" {...ANNOT.fig} fill={sh.dark} opacity="0.55">
        FIG · 02 / PLACEMENT
      </text>
    </svg>
  );
}

/* 03 · LEGIBILITY - Julian-day code that needs a decoder */
function CodedDateIllustration() {
  return (
    <svg viewBox="0 0 360 240" width="100%" aria-hidden>
      {/* carton silhouette (left half) */}
      <path d="M 36 38 L 36 210 L 144 210 L 144 38 L 120 22 L 60 22 Z"
        fill={sh.caution} opacity="0.55" stroke={sh.dark} strokeWidth="1" />
      {/* fold seams */}
      <line x1="60" y1="22" x2="60" y2="210" stroke={sh.dark} strokeWidth="0.5" opacity="0.45" />
      <line x1="120" y1="22" x2="120" y2="210" stroke={sh.dark} strokeWidth="0.5" opacity="0.45" />

      {/* printed label patch with the cryptic code */}
      <rect x="48" y="92" width="84" height="38" fill="#FFFFFF" opacity="0.95"
        stroke={sh.dark} strokeWidth="0.7" />
      <text x="60" y="118" fontFamily="'Space Mono', monospace" fontSize="17"
        fontWeight="700" fill={sh.dark} letterSpacing="0.10em">mfg 213</text>

      {/* faux ingredient panel below - blurred lines */}
      {[148, 160, 172, 184, 196].map((y, i) => (
        <line key={i} x1="48" y1={y} x2={i % 2 === 0 ? 132 : 116}
          y2={y} stroke={sh.dark} strokeWidth="0.7" opacity={0.18 + (i % 2) * 0.08} />
      ))}

      {/* decoder pointer line from label out to right rail */}
      <PointerRule x1={132} y1={111} x2={188} y2={111} />

      {/* right rail - the decode */}
      <text x="200" y="48" {...ANNOT.hed} fill={sh.dark}>DECODE REQUIRED</text>
      <line x1="200" y1="56" x2="344" y2="56" stroke={sh.dark} strokeWidth="0.5" opacity="0.4" />

      <text x="200" y="86" fontFamily="'Space Mono', monospace" fontSize="14"
        fontWeight="700" fill={sh.dark} letterSpacing="0.10em">213</text>
      <text x="240" y="86" {...ANNOT.body} fill={sh.dark} opacity="0.7">JULIAN DAY</text>

      {/* arrow down */}
      <line x1="216" y1="98" x2="216" y2="118" stroke={sh.primary} strokeWidth="1.2" />
      <path d="M 211 116 L 216 124 L 221 116 Z" fill={sh.primary} />

      <text x="200" y="152" fontFamily={serif} fontSize="30" fontWeight="700"
        fill={sh.primary} letterSpacing="-0.03em">Aug 1</text>
      <text x="200" y="172" {...ANNOT.body} fill={sh.dark} opacity="0.7">2025 · MFG DATE</text>

      {/* mini key block */}
      <rect x="200" y="186" width="144" height="22" fill="none"
        stroke={sh.dark} strokeWidth="0.5" opacity="0.45" />
      <text x="208" y="201" {...ANNOT.small} fill={sh.dark} opacity="0.65">
        KEY · DAY OF YEAR 1 TO 365
      </text>

      <text x="200" y="226" {...ANNOT.fig} fill={sh.dark} opacity="0.55">
        FIG · 03 / LEGIBILITY
      </text>
    </svg>
  );
}

/* 04 · TYPE SIZE - micro-printed rim with magnification inset */
function YogurtCupIllustration() {
  return (
    <svg viewBox="0 0 360 240" width="100%" aria-hidden>
      {/* cup body */}
      <path d="M 50 50 L 60 210 Q 60 218 68 218 L 134 218 Q 142 218 142 210 L 152 50 Z"
        fill="#FAFAFA" stroke={sh.dark} strokeWidth="1" />
      {/* foil lid */}
      <ellipse cx="101" cy="50" rx="51" ry="7" fill="#E0DFD9" stroke={sh.dark} strokeWidth="0.8" />
      {/* brand band */}
      <rect x="56" y="108" width="90" height="38" fill={sh.primary} opacity="0.94" />
      <text x="101" y="128" textAnchor="middle" fontFamily={serif} fontSize="14"
        fontWeight="700" fill="#fff" letterSpacing="-0.01em">YOGURT</text>
      <text x="101" y="140" textAnchor="middle" fontFamily="'Space Mono', monospace"
        fontSize="6" fill="#fff" opacity="0.85" letterSpacing="0.18em">
        PROBIOTIC · 150 G
      </text>

      {/* micro-printed rim date - purposely tiny + faint */}
      <text x="64" y="46" fontFamily="'Space Mono', monospace" fontSize="3"
        fill={sh.dark} opacity="0.55" letterSpacing="0.04em">
        EXP 04/29/25 LOT 4178
      </text>

      {/* magnifier connectors - from rim to inset */}
      <line x1="92" y1="46" x2="218" y2="78" stroke={sh.primary} strokeWidth="0.9" strokeDasharray="3 3" opacity="0.7" />
      <line x1="92" y1="48" x2="218" y2="138" stroke={sh.primary} strokeWidth="0.9" strokeDasharray="3 3" opacity="0.7" />

      {/* magnification inset card */}
      <rect x="216" y="68" width="128" height="80" fill="#fff" stroke={sh.primary} strokeWidth="1.2" />
      <text x="226" y="86" {...ANNOT.body} fill={sh.primary} fontWeight="700">
        ENLARGED 4×
      </text>
      <text x="226" y="112" fontFamily="'Space Mono', monospace" fontSize="14"
        fontWeight="700" fill={sh.dark} letterSpacing="0.04em">EXP 04/29/25</text>
      <text x="226" y="128" fontFamily="'Space Mono', monospace" fontSize="10"
        fill={sh.dark} opacity="0.65" letterSpacing="0.08em">LOT 4178</text>
      <line x1="216" y1="138" x2="344" y2="138" stroke={sh.primary} strokeWidth="0.5" opacity="0.5" />
      <text x="226" y="146" {...ANNOT.small} fill={sh.dark} opacity="0.6">
        SOURCE · FOIL RIM
      </text>

      {/* scale comparison - vertically stacked, no collision */}
      <text x="216" y="176" {...ANNOT.hed} fill={sh.dark}>TYPE SIZE</text>
      <text x="216" y="206" fontFamily={serif} fontSize="32" fontWeight="700"
        fill={sh.primary} letterSpacing="-0.03em">3.4 pt</text>
      <text x="290" y="200" {...ANNOT.body} fill={sh.dark} opacity="0.7">vs 8 pt</text>
      <text x="290" y="214" {...ANNOT.small} fill={sh.dark} opacity="0.55">READ MIN</text>

      <text x="216" y="232" {...ANNOT.fig} fill={sh.dark} opacity="0.55">
        FIG · 04 / TYPE SIZE
      </text>
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

/* ──────────────────────────────────────────────────────────────────
   METHOD CARD - hover/focus reveals the field kit detail panel
────────────────────────────────────────────────────────────────── */
type MethodDetail = { k: string; v: string };
function MethodCard({
  glyph, tag, title, body, detail, index,
}: {
  glyph: React.ReactNode;
  tag: string;
  title: string;
  body: string;
  detail: MethodDetail[];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const expand = () => setOpen(true);
  const collapse = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <Reveal delay={0.1 + index * 0.08}>
      <motion.div
        onMouseEnter={expand}
        onMouseLeave={collapse}
        onFocus={expand}
        onBlur={collapse}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={`${title} method - press to ${open ? "collapse" : "expand"} field kit`}
        whileHover={{ y: -4 }}
        animate={{
          backgroundColor: open ? "var(--bg-elevated)" : "rgba(255,255,255,0)",
          boxShadow: open
            ? "0 1px 2px rgba(0,0,0,0.04), 0 18px 40px rgba(31,95,92,0.13)"
            : "none",
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderTop: `2px solid ${sh.primary}`,
          padding: "26px 24px 22px",
          height: "100%",
          cursor: "pointer",
          outline: "none",
          position: "relative",
        }}
      >
        {/* Glyph + plus toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <motion.div
            animate={{ scale: open ? 1.08 : 1, rotate: open ? -2 : 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ display: "inline-block", transformOrigin: "left center" }}
          >
            {glyph}
          </motion.div>
          <motion.div
            animate={{ rotate: open ? 45 : 0, color: open ? sh.primary : "var(--text-muted)" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 32, height: 32,
              border: `1px solid ${open ? sh.primary : sh.subtle}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
            aria-hidden
          >
            <Plus size={16} weight="regular" />
          </motion.div>
        </div>

        <p style={{ ...mono, fontSize: 11, color: sh.primary, letterSpacing: "0.22em", marginBottom: 12, fontWeight: 700 }}>
          {tag}
        </p>
        <h3 style={{ ...t.h3Lede, fontSize: 26, marginBottom: 14 }}>
          {title}
        </h3>
        <p style={{ ...t.bodyLg, marginBottom: 4 }}>
          {body}
        </p>

        {/* Field-kit detail (revealed on hover/focus) */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 22 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{
                paddingTop: 18,
                borderTop: `1px solid ${sh.subtle}`,
                display: "grid",
                gap: 12,
              }}>
                <p style={{ ...mono, fontSize: 10, letterSpacing: "0.24em", color: sh.muted, fontWeight: 700, marginBottom: 4 }}>
                  FIELD KIT
                </p>
                {detail.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.06 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1fr",
                      gap: 14,
                      paddingBottom: 10,
                      borderBottom: i < detail.length - 1 ? `1px dashed ${sh.subtle}` : "none",
                    }}
                  >
                    <p style={{ ...mono, fontSize: 10, letterSpacing: "0.2em", color: sh.primary, fontWeight: 700, paddingTop: 2 }}>
                      {d.k.toUpperCase()}
                    </p>
                    <p style={{ fontFamily: sans, fontSize: 15.5, lineHeight: 1.55, color: "var(--text-primary)", margin: 0 }}>
                      {d.v}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}

/* ──────────────────────────────────────────────────────────────────
   VOICES PANEL - editorial "field recording" with hover-driven
   theme list and cross-fading hero quote
────────────────────────────────────────────────────────────────── */
type Voice = {
  icon: Icon;
  theme: string;
  finding: string;
  quote: string;
  meta: { id: string; age: number; role: string };
  stat: string;
};

function VoicesPanel({ voices }: { voices: Voice[] }) {
  const [active, setActive] = useState(0);
  const current = voices[active];
  const total = voices.length;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((v) => (v + 1) % total);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((v) => (v - 1 + total) % total);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0" style={{
      background: "var(--bg-elevated)",
      border: `1px solid ${sh.subtle}`,
    }}>
      {/* LEFT - hero quote stage */}
      <div className="lg:col-span-8" style={{
        position: "relative",
        padding: "40px 44px",
        borderRight: `1px solid ${sh.subtle}`,
        minHeight: 320,
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              ...mono, fontSize: 10, letterSpacing: "0.24em",
              color: sh.primary, fontWeight: 700,
              marginBottom: 20,
            }}>
              {String(active + 1).padStart(2, "0")} · {current.theme.toUpperCase()}
            </p>

            <blockquote style={{
              fontFamily: serif, fontStyle: "italic",
              fontSize: "clamp(22px, 2.1vw, 28px)",
              lineHeight: 1.4,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              margin: 0,
              maxWidth: "48ch",
            }}>
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT - theme list */}
      <div
        className="lg:col-span-4"
        role="tablist"
        aria-label="Voices from the aisle"
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{
          background: sh.surface,
          outline: "none",
          position: "relative",
          display: "flex", flexDirection: "column",
        }}
      >
        {voices.map((v, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                width: "100%",
                padding: "22px 26px",
                textAlign: "left",
                border: "none",
                borderBottom: i === total - 1 ? "none" : `1px solid ${sh.subtle}`,
                background: isActive ? "var(--bg-elevated)" : "transparent",
                cursor: "pointer",
                position: "relative",
                outline: "none",
                flex: 1,
                transition: "background-color 0.32s ease",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="voice-active-bar"
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: 3,
                    background: sh.primary,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              <p style={{
                ...mono, fontSize: 13, letterSpacing: "0.22em",
                color: isActive ? sh.primary : sh.muted,
                fontWeight: 700,
                margin: 0,
                transition: "color 0.32s ease",
              }}>
                {String(i + 1).padStart(2, "0")} · {v.theme.toUpperCase()}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   TAKEAWAYS PANEL - simple 2x2 grid of lessons.
────────────────────────────────────────────────────────────────── */
type Takeaway = {
  num: string;
  short: string;
  body: string;
};

function TakeawayCard({ tk }: { tk: Takeaway }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      style={{
        textAlign: "left",
        padding: "clamp(28px, 3vw, 36px)",
        background: "var(--bg-elevated)",
        border: `1px solid ${open ? sh.primary : sh.subtle}`,
        borderLeft: `3px solid ${sh.primary}`,
        cursor: "pointer",
        outline: "none",
        transition: "border-color 240ms ease",
        display: "block", width: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, marginBottom: 14 }}>
        <p style={{
          ...mono, fontSize: 11, letterSpacing: "0.22em",
          color: sh.primary, fontWeight: 700,
          margin: 0,
        }}>
          {tk.num} · TAKEAWAY
        </p>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 24 }}
          style={{
            display: "inline-flex",
            color: sh.primary,
            flexShrink: 0,
          }}
        >
          <Plus size={18} weight="regular" />
        </motion.span>
      </div>

      <h3 style={{
        fontFamily: serif, fontWeight: 700,
        fontSize: "clamp(22px, 1.8vw, 26px)",
        letterSpacing: "-0.02em", lineHeight: 1.28,
        color: "var(--text-primary)",
        margin: 0,
      }}>
        {tk.short}
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ ...t.bodyLg, margin: 0, marginTop: 16 }}>{tk.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function TakeawaysPanel({ takeaways }: { takeaways: Takeaway[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {takeaways.map((tk) => (
        <TakeawayCard key={tk.num} tk={tk} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PROPOSAL BAND - one editorial band per concept. Alternates which
   side carries the illustration. Each band breathes; nothing crowds.
────────────────────────────────────────────────────────────────── */
type ProposalBandData = {
  num: string;
  icon: Icon;
  title: string;
  category: string;
  body: string;
  illus: React.ReactNode;
  principle: string;
  respondsTo: string;
  filing: string;
};

function ProposalBand({ data, index }: { data: ProposalBandData; index: number }) {
  const flip = index % 2 === 1;
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const Glyph = data.icon as Icon;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "var(--bg-elevated)",
        border: `1px solid ${sh.subtle}`,
        borderTop: `2px solid ${sh.primary}`,
      }}
    >
      {/* Patent-style header bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 28px",
        background: sh.surface,
        borderBottom: `1px solid ${sh.subtle}`,
        ...mono, fontSize: 10, letterSpacing: "0.22em",
      }}>
        <span style={{ color: sh.primary, fontWeight: 700 }}>
          PROPOSAL · {data.num} / 04
        </span>
        <span style={{ color: sh.muted, fontWeight: 700 }}>
          FILING {data.filing}
        </span>
      </div>

      {/* Body grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0`}>
        {/* Illustration stage */}
        <motion.div
          className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            background: sh.surface,
            padding: "clamp(40px, 5vw, 72px) clamp(28px, 4vw, 56px)",
            minHeight: 360,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRight: flip ? "none" : `1px solid ${sh.subtle}`,
            borderLeft:  flip ? `1px solid ${sh.subtle}` : "none",
          }}
        >
          {/* Corner registration marks */}
          {([
            { top: 14, left: 14,    borderTop: `1px solid ${sh.primary}`, borderLeft: `1px solid ${sh.primary}` },
            { top: 14, right: 14,   borderTop: `1px solid ${sh.primary}`, borderRight: `1px solid ${sh.primary}` },
            { bottom: 14, left: 14, borderBottom: `1px solid ${sh.primary}`, borderLeft: `1px solid ${sh.primary}` },
            { bottom: 14, right: 14, borderBottom: `1px solid ${sh.primary}`, borderRight: `1px solid ${sh.primary}` },
          ] as React.CSSProperties[]).map((p, i) => (
            <div key={i} style={{ position: "absolute", width: 14, height: 14, ...p }} />
          ))}

          <p style={{
            ...mono, position: "absolute", left: 22, bottom: 18,
            fontSize: 9, letterSpacing: "0.22em", color: sh.muted,
          }}>
            FIG. {data.num} · CONCEPT
          </p>

          <div style={{ width: "100%", maxWidth: 440 }}>
            {data.illus}
          </div>
        </motion.div>

        {/* Text column */}
        <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`} style={{
          padding: "clamp(36px, 4.5vw, 56px) clamp(28px, 4vw, 48px)",
          display: "flex", flexDirection: "column",
        }}>
          {/* Number chip + category */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span style={{
              width: 40, height: 40,
              background: sh.primary, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              ...mono, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em",
            }}>
              {data.num}
            </span>
            <span style={{ ...mono, fontSize: 11, color: sh.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
              {data.category}
            </span>
          </div>

          {/* Title with icon */}
          <h3 style={{
            ...t.h3Lede, fontSize: "clamp(26px, 2.4vw, 32px)",
            marginBottom: 18,
            display: "flex", alignItems: "flex-start", gap: 14,
          }}>
            <Glyph size={28} color={sh.primary} weight="regular" style={{ flexShrink: 0, marginTop: 4 }} />
            <span>{data.title}</span>
          </h3>

          <p style={{ ...t.bodyLg, marginBottom: 28, maxWidth: "52ch" }}>
            {data.body}
          </p>

          {/* Footer tag pair */}
          <div style={{
            marginTop: "auto", paddingTop: 22,
            borderTop: `1px solid ${sh.subtle}`,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
          }}>
            <div>
              <p style={{ ...mono, fontSize: 9.5, color: sh.muted, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 6 }}>
                RESPONDS TO
              </p>
              <p style={{ ...mono, fontSize: 12, color: "var(--text-primary)", letterSpacing: "0.16em" }}>
                {data.respondsTo}
              </p>
            </div>
            <div>
              <p style={{ ...mono, fontSize: 9.5, color: sh.muted, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 6 }}>
                LEANS ON
              </p>
              <p style={{ ...mono, fontSize: 12, color: sh.primary, letterSpacing: "0.16em", fontWeight: 700 }}>
                {data.principle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PROPOSAL ILLUSTRATIONS - clean, single-subject, no side panels.
   Each is a 320x220 viewBox with the central concept centered and
   given room to breathe. Annotations come from the surrounding card.
────────────────────────────────────────────────────────────────── */
function UniversalIconIllustration() {
  const cx = 160, cy = 100;
  const states: Array<{ x: number; label: string; color: string; kind: "check" | "arc" | "cross" }> = [
    { x: cx - 90, label: "FRESH",   color: sh.fresh,   kind: "check" },
    { x: cx,      label: "SOON",    color: sh.caution, kind: "arc"   },
    { x: cx + 90, label: "EXPIRED", color: sh.expired, kind: "cross" },
  ];
  return (
    <svg viewBox="0 0 320 220" width="100%" aria-hidden style={{ display: "block" }}>
      {states.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={cy} r="38" fill={s.color} opacity="0.10" />
          <circle cx={s.x} cy={cy} r="32" fill="none" stroke={s.color} strokeWidth="2" />
          {s.kind === "check" && (
            <path d={`M ${s.x - 12} ${cy + 6} L ${s.x - 4} ${cy + 14} L ${s.x + 14} ${cy - 10}`}
              fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {s.kind === "arc" && (
            <g stroke={s.color} strokeWidth="3" strokeLinecap="round" fill="none">
              <line x1={s.x} y1={cy - 14} x2={s.x} y2={cy + 2} />
              <line x1={s.x} y1={cy + 2} x2={s.x + 10} y2={cy + 12} />
            </g>
          )}
          {s.kind === "cross" && (
            <g stroke={s.color} strokeWidth="3" strokeLinecap="round">
              <line x1={s.x - 11} y1={cy - 11} x2={s.x + 11} y2={cy + 11} />
              <line x1={s.x + 11} y1={cy - 11} x2={s.x - 11} y2={cy + 11} />
            </g>
          )}
          <text x={s.x} y={cy + 70} textAnchor="middle"
            fontFamily="'Space Mono', monospace" fontSize="11"
            fill={s.color} letterSpacing="0.2em" fontWeight="700">
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function TimeStripIllustration() {
  return (
    <svg viewBox="0 0 320 220" width="100%" aria-hidden style={{ display: "block" }}>
      <defs>
        <linearGradient id="freshnessGrad" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%"   stopColor={sh.fresh} />
          <stop offset="50%"  stopColor={sh.caution} />
          <stop offset="100%" stopColor={sh.expired} />
        </linearGradient>
      </defs>

      {/* Milk carton, centered and large */}
      <g transform="translate(110 28)">
        <path d="M 0 32 L 0 160 L 100 160 L 100 32 L 76 4 L 24 4 Z"
          fill="#fff" stroke={sh.dark} strokeWidth="1.4" strokeLinejoin="round" />
        {/* fold lines */}
        <line x1="0" y1="32" x2="100" y2="32" stroke={sh.dark} strokeWidth="0.8" opacity="0.5" />
        <line x1="50" y1="4" x2="50" y2="32" stroke={sh.dark} strokeWidth="0.6" opacity="0.4" />

        {/* MILK label area */}
        <text x="50" y="64" textAnchor="middle"
          fontFamily="'Playfair Display', serif" fontSize="14" fontWeight="700" fill={sh.dark}>
          MILK
        </text>

        {/* Time strip with current indicator */}
        <rect x="14" y="100" width="72" height="14" fill="url(#freshnessGrad)" rx="2" />
        <rect x="14" y="100" width="72" height="14" fill="none" stroke={sh.dark} strokeWidth="0.8" rx="2" />
        {/* indicator tick */}
        <g transform="translate(36 92)">
          <polygon points="0,8 5,0 10,8" fill={sh.dark} />
          <text x="5" y="-2" textAnchor="middle"
            fontFamily="'Space Mono', monospace" fontSize="8" fill={sh.dark} letterSpacing="0.18em">NOW</text>
        </g>
        {/* scale labels */}
        <text x="14" y="132" fontFamily="'Space Mono', monospace" fontSize="8" fill={sh.fresh} letterSpacing="0.16em">FRESH</text>
        <text x="86" y="132" textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="8" fill={sh.expired} letterSpacing="0.16em">EXPIRED</text>
      </g>
    </svg>
  );
}

function OpenByIllustration() {
  return (
    <svg viewBox="0 0 320 220" width="100%" aria-hidden style={{ display: "block" }}>
      {/* Jar, centered */}
      <g transform="translate(110 24)">
        {/* lid */}
        <rect x="-4" y="0" width="108" height="20" fill={sh.dark} rx="2" />
        <rect x="-4" y="0" width="108" height="20" fill="none" stroke={sh.dark} strokeWidth="0.8" rx="2" />
        {/* lid ridges */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={4 + i * 22} y1="4" x2={4 + i * 22} y2="16"
            stroke="#fff" strokeWidth="0.6" opacity="0.4" />
        ))}
        {/* jar body */}
        <rect x="2" y="20" width="96" height="148" fill="#fff" stroke={sh.dark} strokeWidth="1.4" rx="3" />
        {/* peel-reveal countdown sticker */}
        <g>
          <rect x="8" y="48" width="84" height="92" fill={sh.surface} stroke={sh.primary} strokeWidth="1.2" rx="2" />
          {/* corner peel mark */}
          <path d="M 92 48 L 84 42 L 76 48 Z" fill={sh.primary} opacity="0.3" />
          <text x="50" y="72" textAnchor="middle"
            fontFamily="'Space Mono', monospace" fontSize="8.5"
            fill={sh.dark} letterSpacing="0.22em" fontWeight="700">OPEN BY</text>
          <text x="50" y="104" textAnchor="middle"
            fontFamily="'Playfair Display', serif" fontSize="20" fontWeight="700" fill={sh.primary}>
            7 DAYS
          </text>
          <line x1="20" y1="116" x2="80" y2="116" stroke={sh.primary} strokeWidth="0.6" opacity="0.5" />
          <text x="50" y="130" textAnchor="middle"
            fontFamily="'Space Mono', monospace" fontSize="6.5" fill={sh.muted} letterSpacing="0.18em">FROM SEAL BREAK</text>
        </g>
      </g>
    </svg>
  );
}

function ShelfieAppIllustration() {
  const items = [
    { y: 76, label: "Milk",   days: "2d", color: sh.caution },
    { y: 102, label: "Sauce", days: "9d", color: sh.fresh   },
    { y: 128, label: "Bread", days: "0d", color: sh.expired },
    { y: 154, label: "Yogurt", days: "5d", color: sh.fresh  },
  ];
  return (
    <svg viewBox="0 0 320 220" width="100%" aria-hidden style={{ display: "block" }}>
      {/* Phone, centered */}
      <g transform="translate(95 14)">
        <rect x="0" y="0" width="130" height="200" rx="14"
          fill="#fff" stroke={sh.dark} strokeWidth="1.4" />
        {/* status bar */}
        <rect x="50" y="6" width="30" height="6" rx="3" fill={sh.dark} opacity="0.3" />
        {/* app title */}
        <text x="14" y="42" fontFamily="'Playfair Display', serif" fontSize="16" fontWeight="700" fill={sh.dark}>
          Shelfie
        </text>
        <text x="14" y="58" fontFamily="'Space Mono', monospace" fontSize="7" letterSpacing="0.2em" fill={sh.muted}>
          4 ITEMS · 1 EXPIRING
        </text>
        <line x1="14" y1="66" x2="116" y2="66" stroke={sh.subtle} strokeWidth="0.8" />

        {/* item rows */}
        {items.map((r, i) => (
          <g key={i}>
            <circle cx="22" cy={r.y} r="3.5" fill={r.color} />
            <text x="32" y={r.y + 3.5}
              fontFamily="'Inter', system-ui, sans-serif" fontSize="10" fill={sh.dark} fontWeight="500">
              {r.label}
            </text>
            <text x="116" y={r.y + 3.5} textAnchor="end"
              fontFamily="'Space Mono', monospace" fontSize="9" fill={r.color} fontWeight="700" letterSpacing="0.05em">
              {r.days}
            </text>
            {i < items.length - 1 && (
              <line x1="14" y1={r.y + 13} x2="116" y2={r.y + 13} stroke={sh.subtle} strokeWidth="0.5" />
            )}
          </g>
        ))}

        {/* CTA pill */}
        <rect x="22" y="178" width="86" height="14" rx="7" fill={sh.primary} />
        <text x="65" y="187" textAnchor="middle"
          fontFamily="'Space Mono', monospace" fontSize="7" fill="#fff" letterSpacing="0.22em" fontWeight="700">
          + SCAN SHELF
        </text>
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO VISUAL - shopper reading an expiration date
   Captures the central moment of the project: hands cradling a product,
   eyes on a tiny printed date that refuses to make sense. Soft teal glow
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
        paddingLeft: "clamp(24px, 6vw, 80px)",
      }}
    >
      {/* Soft teal radial glow - sits behind the figure */}
      <div aria-hidden style={{
        position: "absolute", inset: "-10%",
        background: `radial-gradient(50% 50% at 50% 50%, ${sh.light} 0%, ${sh.primary} 38%, rgba(31,95,92,0) 72%)`,
        filter: "blur(80px)", opacity: 0.30, zIndex: 0, pointerEvents: "none",
      }} />

      <motion.img
        src="/shelfie/expiration-reader.jpg"
        alt="A shopper holding a product up close, trying to read the expiration date"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "relative", zIndex: 1,
          width: "min(100%, 520px)", height: "auto", display: "block",
          // Feather every edge into the page so the rectangle dissolves
          maskImage:
            "radial-gradient(ellipse 72% 80% at 50% 50%, #000 30%, rgba(0,0,0,0.85) 55%, transparent 96%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 80% at 50% 50%, #000 30%, rgba(0,0,0,0.85) 55%, transparent 96%)",
        }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FAILURE EXPLORER - Section 02 interactive
   Left: a comparative locate-time chart (4 rows, 5s comfort threshold).
   Right: a live specimen card that swaps to show the active failure.
   Hover, focus, or tap a row to inspect. Bars fill on scroll-in.
══════════════════════════════════════════════════════════════════ */
type FailureSpec = {
  tag: string;
  title: string;
  body: string;
  time: number;
  illus?: React.ReactNode;
  image?: string;
  alt?: string;
};

function FailureExplorer() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const failures: FailureSpec[] = [
    {
      tag: "CONTRAST",
      title: "Same color as the product.",
      body: "A yellow stamp on yellow oil. Printed, but functionally invisible.",
      time: 8.9,
      illus: <OilBottleIllustration />,
    },
    {
      tag: "PLACEMENT",
      title: "Somewhere on the bag.",
      body: "Loose placement turns every scan into a scavenger hunt.",
      time: 7.6,
      illus: <BreadBagIllustration />,
    },
    {
      tag: "LEGIBILITY",
      title: "Coded, not communicated.",
      body: "Manufacture codes (\u201Cmfg 213\u201D) demand a decoder ring. Useless at a glance.",
      time: 6.4,
      illus: <CodedDateIllustration />,
    },
    {
      tag: "TYPE SIZE",
      title: "Smaller than the lot code.",
      body: "3.4 pt on a foil rim. Below the comfortable reading threshold.",
      time: 9.2,
      illus: <YogurtCupIllustration />,
    },
  ];

  const maxTime = 10;
  const threshold = 5;

  const current = failures[active];

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
      {/* ── LEFT · comparative chart ──────────────────────────────── */}
      <div className="lg:col-span-5">
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          marginBottom: 12,
        }}>
          <p style={{ ...mono, fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.2em", margin: 0 }}>
            FIG · LOCATE TIME · SECONDS
          </p>
          <p style={{ ...mono, fontSize: 11, color: sh.muted, letterSpacing: "0.16em", margin: 0 }}>
            HOVER OR TAP A ROW
          </p>
        </div>

        <div style={{
          position: "relative",
          borderTop: `1px solid ${sh.subtle}`,
          borderBottom: `1px solid ${sh.subtle}`,
          paddingTop: 22, paddingBottom: 6,
        }}>
          {/* 5s comfort threshold marker */}
          <div aria-hidden style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${(threshold / maxTime) * 100}%`,
            width: 0,
            borderLeft: `1px dashed ${sh.dark}`,
            opacity: 0.45,
            zIndex: 1,
          }}>
            <span style={{
              position: "absolute", top: 4, left: 6,
              ...mono, fontSize: 11, fontWeight: 700,
              color: sh.dark, letterSpacing: "0.16em",
              whiteSpace: "nowrap", opacity: 0.7,
            }}>
              5 S · COMFORT
            </span>
          </div>

          {failures.map((f, i) => {
            const isActive = active === i;
            const fillPct = inView ? (f.time / maxTime) * 100 : 0;
            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`Inspect ${f.tag.toLowerCase()} failure, ${f.time.toFixed(1)} seconds`}
                style={{
                  width: "100%", display: "block", textAlign: "left",
                  padding: "20px 0",
                  border: "none", background: "transparent",
                  cursor: "pointer",
                  borderTop: i === 0 ? "none" : `1px solid ${sh.subtle}`,
                  outline: "none",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div style={{
                  display: "flex", alignItems: "baseline",
                  justifyContent: "space-between", marginBottom: 12,
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                    <span style={{
                      ...mono, fontSize: 13, fontWeight: 700,
                      color: isActive ? sh.primary : "var(--text-muted)",
                      letterSpacing: "0.2em",
                      transition: "color 0.3s ease",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      fontFamily: serif, fontWeight: 700, fontSize: 26,
                      letterSpacing: "-0.02em",
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      transition: "color 0.3s ease",
                    }}>
                      {f.tag.charAt(0) + f.tag.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <span style={{
                    ...mono, fontSize: 14, fontWeight: 700,
                    color: isActive ? sh.primary : sh.dark,
                    letterSpacing: "0.16em",
                    transition: "color 0.3s ease",
                  }}>
                    {f.time.toFixed(1)} s
                  </span>
                </div>
                <div style={{
                  position: "relative", height: 6,
                  background: sh.subtle,
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPct}%` }}
                    transition={{
                      duration: 1.0,
                      delay: 0.15 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      position: "absolute", left: 0, top: 0, bottom: 0,
                      background: isActive ? sh.primary : sh.light,
                      transition: "background 0.3s ease",
                    }}
                  />
                  {/* slim active marker dot at end of bar */}
                  {isActive && (
                    <motion.div
                      layoutId="failure-active-dot"
                      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{
                        position: "absolute",
                        left: `${fillPct}%`, top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 12, height: 12,
                        background: sh.primary,
                        border: `2px solid var(--bg-primary)`,
                        boxShadow: `0 0 0 1px ${sh.primary}`,
                        borderRadius: 0,
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: 10,
          ...mono, fontSize: 11, color: "var(--text-muted)",
          letterSpacing: "0.16em",
        }}>
          <span>0 S</span>
          <span>{maxTime} S</span>
        </div>
      </div>

      {/* ── RIGHT · active specimen card ──────────────────────────── */}
      <div className="lg:col-span-7">
        <div style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderTop: `3px solid ${sh.primary}`,
          padding: "26px 28px 24px",
          height: "100%",
          display: "flex", flexDirection: "column",
          minHeight: 480,
          position: "relative",
        }}>
          {/* spec strip */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: 16,
          }}>
            <span style={{
              ...mono, fontSize: 10, color: sh.primary,
              letterSpacing: "0.2em", fontWeight: 700,
            }}>
              SPECIMEN · {String(active + 1).padStart(2, "0")} / 04
            </span>
            <span style={{
              ...mono, fontSize: 10, color: "var(--text-muted)",
              letterSpacing: "0.2em",
            }}>
              {current.tag}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <div style={{
                background: sh.surface,
                padding: "24px 28px",
                marginBottom: 16,
                minHeight: 280,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}>
                {/* magnifier badge - top-right of the specimen frame */}
                <div aria-hidden style={{
                  position: "absolute", top: 14, right: 14,
                  width: 32, height: 32,
                  background: "rgba(255,255,255,0.9)",
                  border: `1px solid ${sh.subtle}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <MagnifyingGlass size={15} color={sh.primary} weight="regular" />
                </div>

                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.alt ?? ""}
                    style={{
                      maxWidth: "100%", maxHeight: 240,
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", maxWidth: 480 }}>
                    {current.illus}
                  </div>
                )}
              </div>

              <h3 style={{ ...t.h3Lede, fontSize: 22, marginBottom: 8 }}>
                {current.title}
              </h3>
              <p style={{ ...t.bodyLg, margin: 0 }}>
                {current.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   NAV CARD — editorial gradient tile for "more case studies"
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

      <div
        style={{
          position: "absolute",
          top: "clamp(24px, 2.4vw, 36px)",
          left: "clamp(24px, 2.4vw, 36px)",
          right: "clamp(24px, 2.4vw, 36px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ ...mono, fontSize: 11, color: "rgba(26,26,26,0.65)", letterSpacing: "0.24em", fontWeight: 600 }}>
          {project.year}
        </span>
        <span
          style={{
            ...mono,
            fontSize: 10,
            color: "rgba(26,26,26,0.65)",
            letterSpacing: "0.22em",
            fontWeight: 600,
            padding: "6px 10px",
            border: "1px solid rgba(26,26,26,0.18)",
            borderRadius: 999,
          }}
        >
          {primaryTag}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: "clamp(24px, 2.4vw, 36px)",
          right: "clamp(24px, 2.4vw, 36px)",
          bottom: "clamp(24px, 2.4vw, 36px)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <motion.p
          animate={{ y: hover ? -2 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          style={{
            fontFamily: serif,
            fontWeight: 700,
            fontSize: "clamp(36px, 4.2vw, 60px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            color: "#1A1A1A",
            margin: 0,
          }}
        >
          {project.title}
        </motion.p>

        <p
          style={{
            fontFamily: sans,
            fontSize: "clamp(15px, 1.05vw, 17px)",
            lineHeight: 1.55,
            color: "rgba(26,26,26,0.72)",
            maxWidth: 460,
            margin: 0,
          }}
        >
          {project.subtitle}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
          <span
            style={{
              ...mono,
              fontSize: 11,
              letterSpacing: "0.24em",
              fontWeight: 700,
              color: hover ? accent : "#1A1A1A",
              transition: "color 260ms ease-out",
            }}
          >
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
export default function ShelfieCase() {
  const otherProjects = projects.filter((p) => p.slug !== "shelfie").slice(-2);
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
          00 · HERO - editorial monograph cover
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        height: "calc(100vh - 56px)",
        minHeight: 640,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Blueprint grid backdrop - fine 20px micro + 80px primary */}
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
        {/* Top bar - back link + tag strip */}
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

        {/* Hero body - 2-column: text left, specimen right, all in viewport */}
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
            {/* LEFT - title, subtitle, meta */}
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
                A field study into why expiration dates,
                <span style={{ color: sh.primary }}> the quiet safety signal </span>
                nobody can read, get misread by nearly two-thirds of shoppers.
              </motion.p>

              {/* Meta row - 2x2, compact, below subtitle */}
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

            {/* RIGHT - annotated specimen plate */}
            <HeroVisual />
          </div>
        </div>

        {/* Scroll cue - bottom strip */}
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
          </div>

          {/* Evidence band - vocabulary chaos in the wild */}
          <Reveal delay={0.05}>
            <figure style={{
              background: "var(--bg-elevated)",
              border: `1px solid ${sh.subtle}`,
              marginBottom: 56,
            }}>
              {/* Catalog strip */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 24px",
                borderBottom: `1px solid ${sh.subtle}`,
                background: sh.surface,
              }}>
                <p style={{ ...mono, fontSize: 10, letterSpacing: "0.24em", color: sh.primary, fontWeight: 700 }}>
                  EXHIBIT · A
                </p>
                <p style={{ ...mono, fontSize: 9, letterSpacing: "0.22em", color: sh.muted }}>
                  CATALOG · ONE PRODUCT, TWO TERMS
                </p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
                gap: 0,
              }}>
                {/* Image plate with corner registration marks */}
                <div style={{
                  position: "relative",
                  background: sh.surface,
                  borderRight: `1px solid ${sh.subtle}`,
                  padding: "40px 32px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  minHeight: 340,
                }}>
                  {([
                    { top: 14, left: 14,    borderTop: `1px solid ${sh.primary}`, borderLeft: `1px solid ${sh.primary}` },
                    { top: 14, right: 14,   borderTop: `1px solid ${sh.primary}`, borderRight: `1px solid ${sh.primary}` },
                    { bottom: 14, left: 14, borderBottom: `1px solid ${sh.primary}`, borderLeft: `1px solid ${sh.primary}` },
                    { bottom: 14, right: 14, borderBottom: `1px solid ${sh.primary}`, borderRight: `1px solid ${sh.primary}` },
                  ] as React.CSSProperties[]).map((p, i) => (
                    <div key={i} style={{ position: "absolute", width: 14, height: 14, ...p }} />
                  ))}
                  <img
                    src="/shelfie/best-before-bag.jpg"
                    alt="A jar of peanut butter with the labels 'BEST BEFORE' and 'USE BY' marked with question marks. The chaos of competing terms on a single product."
                    style={{
                      maxWidth: "100%",
                      maxHeight: 300,
                      objectFit: "contain",
                      display: "block",
                      mixBlendMode: "multiply",
                    }}
                  />
                  <p style={{
                    ...mono, position: "absolute", left: 24, bottom: 26,
                    fontSize: 9, letterSpacing: "0.22em", color: sh.muted,
                  }}>
                    FIG. 01 · OBSERVED IN-AISLE
                  </p>
                </div>

                {/* Field note */}
                <figcaption style={{
                  padding: "36px 40px",
                  display: "flex", flexDirection: "column", gap: 24,
                }}>
                  <p style={{ ...t.bodyLg, margin: 0 }}>
                    A single jar carries two competing terms within an inch of each other. Neither defined in U.S. law. Neither prioritised. Both treated by the shopper as a hard stop.
                  </p>

                  <div style={{ display: "grid", gap: 0 }}>
                    {[
                      { tag: "T·01", term: "BEST BEFORE", meaning: "QUALITY", note: "Manufacturer's freshness estimate. Not a safety threshold." },
                      { tag: "T·02", term: "USE BY",      meaning: "SAFETY",  note: "Federally regulated only on infant formula. Elsewhere, also voluntary." },
                    ].map((row, i) => (
                      <div key={i} style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: 22,
                        padding: "22px 0",
                        borderTop: `1px solid ${sh.subtle}`,
                        borderBottom: i === 1 ? `1px solid ${sh.subtle}` : "none",
                        alignItems: "baseline",
                      }}>
                        <p style={{ ...mono, fontSize: 13, letterSpacing: "0.2em", color: sh.muted, fontWeight: 700 }}>
                          {row.tag}
                        </p>
                        <div>
                          <p style={{ ...mono, fontSize: 18, letterSpacing: "0.18em", color: "var(--text-primary)", fontWeight: 700, margin: 0, marginBottom: 8 }}>
                            {row.term}
                          </p>
                          <p style={{ ...t.bodySm, fontSize: 17, color: sh.muted, margin: 0, lineHeight: 1.55 }}>
                            {row.note}
                          </p>
                        </div>
                        <p style={{
                          ...mono, fontSize: 12, letterSpacing: "0.22em", color: sh.primary, fontWeight: 700,
                          padding: "6px 14px", border: `1px solid ${sh.primary}`,
                          whiteSpace: "nowrap",
                        }}>
                          {row.meaning}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p style={{ ...mono, fontSize: 14, letterSpacing: "0.18em", color: "var(--text-primary)", margin: 0, fontStyle: "italic" }}>
                    The vocabulary problem is not abstract. It lives on the lid.
                  </p>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          {/* Six-stat panel - the public-health math */}
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
                    <p style={{ ...t.bodyLg, marginBottom: 14, flex: 1 }}>{s.label}</p>
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
                  , in plain sight.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 620 }}>
                  I pulled four representative products off the shelf, then timed
                  twenty-five shoppers locating each date. Every product failed differently,
                  and the spread between best and worst was almost two-to-one.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Interactive comparative explorer - chart + live specimen */}
          <Reveal delay={0.15}>
            <FailureExplorer />
          </Reveal>
        </div>
      </section>

      {/* ─── 03 RESEARCH APPROACH ─────────────────────────────────── */}
      <section style={{
        padding: SECTION_PAD,
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="03" title="How I studied it" phase="Method" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 18 }}>
                  A mixed-methods study,
                  <span style={{ fontStyle: "italic", color: sh.primary }}> grounded in the aisle.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  Three complementary lenses: watch them, time them, ask them.
                  Twenty-five participants, balanced across age, vision, and cadence.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.18}>
                <p style={{ ...mono, fontSize: 11, letterSpacing: "0.22em", color: sh.muted, fontWeight: 700, textAlign: "right" }}>
                  HOVER OR TAP A METHOD<br />TO REVEAL THE FIELD KIT
                </p>
              </Reveal>
            </div>
          </div>

          {/* Three method cards - each expands its field kit on hover/focus/tap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {[
              {
                glyph: <ObservationGlyph />,
                tag: "METHOD · 01",
                title: "Observation",
                body: "Watching 25 shoppers in situ: hesitation, tilting, comparison behaviour, lighting.",
                detail: [
                  { k: "Sample",    v: "25 shoppers, 6 stores, 3 cities" },
                  { k: "Instrument", v: "Notebook, stopwatch, phone audio" },
                  { k: "Output",    v: "127 logged interactions, 41 photos" },
                ] as MethodDetail[],
              },
              {
                glyph: <ExperimentGlyph />,
                tag: "METHOD · 02",
                title: "Controlled experiment",
                body: "Four standardised products. Timed locate task. 5.0s to 8.9s spread from design alone.",
                detail: [
                  { k: "Sample",    v: "Same 25, controlled lighting booth" },
                  { k: "Instrument", v: "Stopwatch, eye-line camera, fixed shelf" },
                  { k: "Output",    v: "100 timed reads, 4 confidence scores each" },
                ] as MethodDetail[],
              },
              {
                glyph: <SurveyGlyph />,
                tag: "METHOD · 03",
                title: "Post-task survey",
                body: "Self-reported habits, prior illness, and preferences on how to fix the label system.",
                detail: [
                  { k: "Sample",    v: "All 25, completed within 24 hours" },
                  { k: "Instrument", v: "12-question Likert plus 3 open prompts" },
                  { k: "Output",    v: "300 quant data points, 75 verbatims" },
                ] as MethodDetail[],
              },
            ].map((m, i) => (
              <MethodCard key={i} index={i} {...m} />
            ))}
          </div>

        </div>
      </section>

      {/* ─── 04 VOICES FROM THE AISLE ─────────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: sh.surface }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="04" title="Voices from the aisle" phase="Research highlights" />

          {/* Lede - text only, panel sits below */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Twenty-five shoppers,
                  <span style={{ fontStyle: "italic", color: sh.primary }}> in their own words.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  Semi-structured shop-alongs and post-task debriefs. Verbatim transcripts,
                  affinity-diagrammed, blind-coded. Browse the four strongest themes below.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.16}>
                <p style={{
                  ...mono, fontSize: 11, letterSpacing: "0.22em",
                  color: sh.muted, fontWeight: 700,
                  textAlign: "right",
                }}>
                  HOVER OR TAP A VOICE<br />TO PLAY THE RECORDING
                </p>
              </Reveal>
            </div>
          </div>

          {/* Interactive voices panel */}
          <Reveal delay={0.2}>
            <VoicesPanel
              voices={[
                {
                  icon: ChatCircleText,
                  theme: "Vocabulary",
                  finding: "Vocabulary collapses into a single guess",
                  quote: "Honestly I just guess. \"Best by,\" \"sell by,\" I treat them all the same.",
                  meta: { id: "P04", age: 31, role: "Weekly shopper" },
                  stat: "18 / 25 don't distinguish between the four terms",
                },
                {
                  icon: Eye,
                  theme: "Contrast",
                  finding: "Contrast and placement defeat the eye",
                  quote: "The date was the same yellow as the oil. I had to tilt it under the light to even find it.",
                  meta: { id: "P11", age: 47, role: "Corrective lenses" },
                  stat: "62% of locate attempts required tilting under light",
                },
                {
                  icon: Brain,
                  theme: "Memory",
                  finding: "Once opened, the date stops meaning anything",
                  quote: "I'm just hoping I remember when I opened it. The printed date doesn't matter anymore.",
                  meta: { id: "P19", age: 28, role: "Weekly shopper" },
                  stat: "23 / 25 had no system for tracking opened items",
                },
                {
                  icon: HandPalm,
                  theme: "Loss aversion",
                  finding: "Loss aversion drives over-discarding",
                  quote: "If it's the day after the date I throw it out. Not risking a hospital bill for two dollars.",
                  meta: { id: "P14", age: 38, role: "Parent of two" },
                  stat: "9 / 25 discard within 24 h regardless of state",
                },
              ]}
            />
          </Reveal>

        </div>
      </section>

      {/* ─── 05 PRINCIPLES APPLIED ────────────────────────────────── */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="05" title="Principles I pressed against" phase="Synthesis" />

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
                  Anecdotes don't change packaging. Principles do. I mapped each observation
                  onto a named cognitive constraint, so the design isn't asking to be trusted,
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
                    {/* big numerical index - subtle background flourish */}
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
                      <p style={{ ...t.bodyLg }}>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Four concepts,
                  <span style={{ fontStyle: "italic", color: sh.primary }}> two sides of the package.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  Better printing helps the aisle. Better tools help the pantry.
                  Each concept points back to a finding and names the principle it leans on.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.16}>
                <p style={{
                  ...mono, fontSize: 11, letterSpacing: "0.22em",
                  color: sh.muted, fontWeight: 700,
                  textAlign: "right",
                }}>
                  04 PROPOSALS<br />FILING USP-2025
                </p>
              </Reveal>
            </div>
          </div>

          {/* Stacked alternating proposal bands */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {([
              {
                num: "01", icon: CheckCircle,
                title: "Universal Freshness Icon",
                category: "PASSIVE PACKAGING",
                body: "A single three-state glyph replaces the four-vocabulary tangle. Fresh, soon, expired: colour-coded, language-independent, half-second glance.",
                illus: <UniversalIconIllustration />,
                principle: "Affordance · Visual hierarchy",
                respondsTo: "F·01 Vocabulary",
                filing: "USP-2025-A",
              },
              {
                num: "02", icon: Thermometer,
                title: "Passive Time-Strip",
                category: "SMART PACKAGING",
                body: "Temperature-reactive ink darkens with real storage conditions. No battery, and a hot car ride doesn't go uncounted.",
                illus: <TimeStripIllustration />,
                principle: "Mental models · Feedback",
                respondsTo: "F·03 Memory",
                filing: "USP-2025-B",
              },
              {
                num: "03", icon: Timer,
                title: "Open-By Overlay",
                category: "POST-OPEN",
                body: "A peel-reveal sticker starts a visible countdown the moment the seal breaks, making the invisible post-open timer visible.",
                illus: <OpenByIllustration />,
                principle: "Cognitive load · Mental models",
                respondsTo: "F·03 Memory",
                filing: "USP-2025-C",
              },
              {
                num: "04", icon: DeviceMobile,
                title: "Shelfie, household tracker",
                category: "CONSUMER TOOL",
                body: "Snap one shelf photo. OCR extracts dates, builds a timeline, and nudges you 48 h before something tips.",
                illus: <ShelfieAppIllustration />,
                principle: "Distributed cognition · Reminders",
                respondsTo: "F·04 Loss aversion",
                filing: "USP-2025-D",
              },
            ] as ProposalBandData[]).map((p, i) => (
              <ProposalBand key={p.num} data={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 07 OUTCOMES + TAKEAWAYS ──────────────────────────────── */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader num="07" title="What the work left me with" phase="Reflection" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
            <div className="lg:col-span-9">
              <Reveal>
                <h2 style={{ ...t.h2Section, marginBottom: 16 }}>
                  Research as a way
                  <span style={{ fontStyle: "italic", color: sh.primary }}> to make the invisible arguable.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                  The strongest thing this study left me with wasn't a single fix.
                  It was a way to defend each one: observation by observation, principle by principle.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-3">
              <Reveal delay={0.16}>
                <p style={{
                  ...mono, fontSize: 11, letterSpacing: "0.22em",
                  color: sh.muted, fontWeight: 700,
                  textAlign: "right",
                }}>
                  04 LESSONS<br />ONE STUDY
                </p>
              </Reveal>
            </div>
          </div>

          {/* Interactive takeaways panel */}
          <Reveal delay={0.2}>
            <TakeawaysPanel
              takeaways={[
                {
                  num: "01",
                  short: "A label is a system, not a sticker.",
                  body: "Terminology, placement, contrast, and post-open behaviour all have to be designed together. A perfect typeface fails on the wrong vocabulary; perfect vocabulary fails at the wrong height.",
                },
                {
                  num: "02",
                  short: "Field research reveals what surveys flatter away.",
                  body: "People say they check dates carefully. The timing data disagrees. Watching a 1.4-second decision happen in real light, in a real aisle, beats any self-report ten times over.",
                },
                {
                  num: "03",
                  short: "Vulnerable users set the floor.",
                  body: "Designing for tired eyes, bifocals, low light, and one-handed grocery carts raises the floor for everyone. The 67-year-old who can read the date is the test the 27-year-old benefits from silently.",
                },
                {
                  num: "04",
                  short: "Research is the leverage, not the deliverable.",
                  body: "This study didn't ship a label. It made every future label argument shorter, every concept easier to defend, and every objection answerable by the page it lives on.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MORE CASE STUDIES — editorial gradient tiles
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(64px, 8vw, 104px) 0", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 36 }}>
            <span aria-hidden style={{ width: 3, height: 14, background: sh.primary }} />
            <p style={{ ...mono, fontSize: 12, color: sh.primary, letterSpacing: "0.22em", fontWeight: 600 }}>
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
          Back to top — floating action, bottom-right
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
              right: "clamp(48px, 5.5vw, 88px)",
              bottom: "clamp(32px, 3.2vw, 52px)",
              zIndex: 60,
              width: 52,
              height: 52,
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              border: `1px solid ${sh.primary}`,
              background: "var(--bg-elevated)",
              color: sh.primary,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px rgba(31,95,92,0.18)",
              transitionProperty: "background-color, color, border-color",
              transitionDuration: "180ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = sh.primary;
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-elevated)";
              (e.currentTarget as HTMLElement).style.color = sh.primary;
            }}
          >
            <ArrowUp size={20} weight="bold" color="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
