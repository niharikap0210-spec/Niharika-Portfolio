import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ClockIcon as Clock, ArrowsHorizontalIcon as ArrowsHorizontal, WarningCircleIcon as WarningCircle, QuotesIcon as Quotes, DeviceMobileCameraIcon as DeviceMobileCamera, ApertureIcon as Aperture, LightbulbFilamentIcon as LightbulbFilament, CheckCircleIcon as CheckCircle, UsersThreeIcon as UsersThree, SparkleIcon as Sparkle, PushPinIcon as PushPin, CubeIcon as Cube, CompassIcon as Compass } from "@phosphor-icons/react";
import HandDrawnSketch from "../components/HandDrawnSketch";
import { getAdjacentProjects } from "../data/projects";

/* ── Arko brand palette (scoped to this page only) ─────────────── */
const arko = {
  primary: "#6E8F4E",         // Arko olive green
  light:   "#8BAD6A",         // tint
  dark:    "#4F6B35",         // shade
  surface: "#F0F4E8",         // very light tint for soft backgrounds
  subtle:  "rgba(110, 143, 78, 0.08)", // hover / highlight washes
  muted:   "rgba(110, 143, 78, 0.55)", // for sketch strokes
};

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";
const caption: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontStyle: "italic",
  fontSize: 15,
  color: "var(--text-muted)",
  lineHeight: 1.5,
};

/* ── Unified type scale — single source of truth ─────────────────── */
const t = {
  eyebrow: {
    ...mono,
    fontSize: 11,
    letterSpacing: "0.16em",
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  eyebrowAccent: {
    ...mono,
    fontSize: 11,
    letterSpacing: "0.16em",
    color: arko.dark,
  } as React.CSSProperties,
  h1Display: {
    fontFamily: serif,
    fontWeight: 700,
    fontSize: "clamp(40px, 5.2vw, 64px)",
    letterSpacing: "-0.035em",
    lineHeight: 1.05,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  h2Section: {
    fontFamily: serif,
    fontWeight: 700,
    fontSize: "clamp(30px, 3.6vw, 44px)",
    letterSpacing: "-0.025em",
    lineHeight: 1.2,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  h3Lede: {
    fontFamily: serif,
    fontWeight: 700,
    fontSize: "clamp(22px, 2.4vw, 28px)",
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  bodyLg: {
    fontFamily: sans,
    fontSize: "clamp(16px, 1.2vw, 18px)",
    lineHeight: 1.75,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  body: {
    fontFamily: sans,
    fontSize: 16,
    lineHeight: 1.75,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  bodySm: {
    fontFamily: sans,
    fontSize: 14,
    lineHeight: 1.7,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  statNum: {
    fontFamily: serif,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: 0.95,
    color: arko.primary,
  } as React.CSSProperties,
};

/* Section vertical rhythm (matched across the page) */
const SECTION_PAD = "clamp(72px, 9vw, 112px) 0";

/* ── Scroll-triggered fade ──────────────────────────────────────── */
function Reveal({
  children, delay = 0, y = 20, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Section break — clean rule, no centered label ───────────────── */


/* ── CountUp — animates a number from 0 to target on scroll ─────── */
function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.4,
  className = "",
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, mv]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ── ImageReveal — clip-path wipe from left on scroll ───────────── */
function ImageReveal({
  children,
  delay = 0,
  duration = 1.1,
  direction = "left",
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "up";
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const from =
    direction === "left"  ? "inset(0 100% 0 0)" :
    direction === "right" ? "inset(0 0 0 100%)" :
                            "inset(100% 0 0 0)";
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ clipPath: from, WebkitClipPath: from }}
      animate={inView ? { clipPath: "inset(0 0 0 0)", WebkitClipPath: "inset(0 0 0 0)" } : {}}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Arrow button ────────────────────────────────────────────────── */
function ArrowBtn({ onClick, dir }: { onClick: () => void; dir: "left" | "right" }) {
  return (
    <button onClick={onClick}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid var(--border)", background: "var(--bg-elevated)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "var(--text-secondary)", flexShrink: 0,
        transitionProperty: "transform, opacity", transitionDuration: "150ms",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--text-secondary)"; el.style.color = "var(--text-primary)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-secondary)"; }}
      onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.93)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {dir === "left" ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11.5 4.5L6.5 9l5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.5 4.5L11.5 9l-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
    </button>
  );
}

/* ── Pill dot indicator ──────────────────────────────────────────── */
function Dots({ count, active, onGo }: { count: number; active: number; onGo: (i: number) => void }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onGo(i)} aria-label={`Go to slide ${i + 1}`}
          style={{
            height: 6, width: i === active ? 22 : 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer",
            background: i === active ? "var(--text-primary)" : "var(--border)",
            transitionProperty: "transform, opacity", transitionDuration: "250ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PHONE CAROUSEL
══════════════════════════════════════════════════════════════════ */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit:  (d: number) => ({ opacity: 0, x: d * -40 }),
};

function PhoneCarousel({ slides }: { slides: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const go = (i: number) => { setDir(i > active ? 1 : -1); setActive(i); };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <ArrowBtn dir="left"  onClick={() => go(active === 0 ? slides.length - 1 : active - 1)} />
        <div style={{ flex: 1, overflow: "hidden", display: "flex", justifyContent: "center", minHeight: 420 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={active} custom={dir} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "clamp(190px, 30vw, 280px)" }}>
              <img src={slides[active].src} alt={slides[active].label} style={{ width: "100%", display: "block" }} />
            </motion.div>
          </AnimatePresence>
        </div>
        <ArrowBtn dir="right" onClick={() => go(active === slides.length - 1 ? 0 : active + 1)} />
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={active} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          style={{ ...caption, textAlign: "center", margin: "14px 0 12px" }}>
          {slides[active].label}
        </motion.p>
      </AnimatePresence>
      <Dots count={slides.length} active={active} onGo={go} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   WEB GALLERY
══════════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════════
   BROWSER MOCKUP — macOS browser chrome for inline screenshots
══════════════════════════════════════════════════════════════════ */
function BrowserMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{
      borderRadius: 10, overflow: "hidden",
      boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 24px 56px rgba(0,0,0,0.10)",
      border: "1px solid rgba(0,0,0,0.08)",
    }}>
      <div style={{
        background: "#EBEBEB", padding: "8px 12px",
        display: "flex", alignItems: "center", gap: 8,
        borderBottom: "1px solid #D8D8D8",
      }}>
        <div style={{ display: "flex", gap: 5.5, flexShrink: 0 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57", border: "0.5px solid rgba(0,0,0,0.12)" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E", border: "0.5px solid rgba(0,0,0,0.12)" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840", border: "0.5px solid rgba(0,0,0,0.12)" }} />
        </div>
        <div style={{
          flex: 1, height: 22, background: "#FAFAFA",
          borderRadius: 5, border: "1px solid #D0D0D0",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          maxWidth: 240, margin: "0 auto",
        }}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
            <rect x="1.5" y="3.8" width="6" height="4.6" rx="0.9" fill="#AEAEB2"/>
            <path d="M2.8 3.8V2.6a1.7 1.7 0 013.4 0v1.2" stroke="#AEAEB2" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: sans, fontSize: 9.5, color: "#636366" }}>app.arko.design</span>
        </div>
        <div style={{ width: 60, flexShrink: 0 }} />
      </div>
      <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LAPTOP MOCKUP — SVG-based realistic MacBook frame
══════════════════════════════════════════════════════════════════ */
function LaptopMockup({ src, alt }: { src: string; alt: string }) {
  // ViewBox: 960 wide. Lid 576 tall. Screen 16:10 inside.
  // Base trapezoid wider than lid. Foot strip at very bottom.
  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none" }}>
      <svg
        viewBox="0 0 960 650"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="lm-lid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2C2C2E"/>
            <stop offset="50%"  stopColor="#1D1D1F"/>
            <stop offset="100%" stopColor="#141416"/>
          </linearGradient>
          <linearGradient id="lm-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#E8E8EA"/>
            <stop offset="100%" stopColor="#C4C4C6"/>
          </linearGradient>
          <linearGradient id="lm-foot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#C0C0C2"/>
            <stop offset="100%" stopColor="#A8A8AA"/>
          </linearGradient>
          <linearGradient id="lm-hinge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#060606"/>
            <stop offset="100%" stopColor="#1A1A1A"/>
          </linearGradient>
          <linearGradient id="lm-bezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.06)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
          {/* Clip the screenshot to rounded rect */}
          <clipPath id="lm-clip">
            <rect x="18" y="30" width="924" height="522" rx="3" ry="3"/>
          </clipPath>
          {/* Drop shadow on entire device */}
          <filter id="lm-dropshadow" x="-8%" y="-4%" width="116%" height="130%">
            <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#000" floodOpacity="0.24"/>
            <feDropShadow dx="0" dy="4"  stdDeviation="6"  floodColor="#000" floodOpacity="0.10"/>
          </filter>
        </defs>

        <g filter="url(#lm-dropshadow)">

          {/* ── Lid body ── */}
          <rect x="0" y="0" width="960" height="578" rx="14" ry="14" fill="url(#lm-lid)"/>

          {/* ── Camera notch pill ── */}
          <rect x="436" y="0" width="88" height="20" rx="10" ry="10" fill="#1D1D1F"/>
          {/* Camera lens rings */}
          <circle cx="480" cy="12" r="6"   fill="#28282A"/>
          <circle cx="480" cy="12" r="4"   fill="#1A1A1C"/>
          <circle cx="480" cy="12" r="2.5" fill="#323234"/>

          {/* ── Inner black bezel ── */}
          <rect x="12" y="24" width="936" height="542" rx="6" ry="6" fill="#000"/>

          {/* ── Screenshot ── */}
          <foreignObject x="18" y="30" width="924" height="522" clipPath="url(#lm-clip)">
            <div style={{ width: "100%", height: "100%", overflow: "hidden", background: "#000" }}>
              <img
                src={src} alt={alt}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </foreignObject>

          {/* ── Screen top glare ── */}
          <rect x="18" y="30" width="924" height="60" fill="url(#lm-bezel)" rx="3"/>

          {/* ── Hinge ── */}
          <rect x="-4" y="578" width="968" height="6" fill="url(#lm-hinge)"/>

          {/* ── Base (trapezoid — wider than lid) ── */}
          <path d="M-12,584 L972,584 L984,618 L-24,618 Z" fill="url(#lm-base)"/>
          {/* Base top highlight */}
          <path d="M-12,584 L972,584 L974,589 L-14,589 Z" fill="rgba(255,255,255,0.55)"/>
          {/* Base bottom edge */}
          <path d="M-24,615 L984,615 L984,618 L-24,618 Z" fill="rgba(0,0,0,0.10)"/>

          {/* ── Trackpad ── */}
          <rect x="384" y="592" width="192" height="18" rx="4" ry="4"
            fill="rgba(0,0,0,0.07)" stroke="rgba(0,0,0,0.09)" strokeWidth="0.6"/>

          {/* ── Foot ── */}
          <rect x="56" y="618" width="848" height="5" rx="2.5" ry="2.5" fill="url(#lm-foot)"/>

        </g>
      </svg>
    </div>
  );
}


function WebGallery({ screens }: { screens: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      {/* Vertical filmstrip — thumbnails */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0, width: 140 }}>
        {screens.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{
              padding: 0, background: "none", cursor: "pointer", overflow: "hidden",
              border: i === active ? `2px solid ${arko.primary}` : "1px solid var(--border)",
              borderRadius: 4,
              opacity: i === active ? 1 : 0.55,
              transitionProperty: "opacity, border-color", transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.opacity = "0.55"; }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <img src={s.src} alt={s.label} style={{ width: "100%", display: "block" }} />
          </button>
        ))}
      </div>

      {/* Main image + caption */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", WebkitClipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0 0)", WebkitClipPath: "inset(0 0 0 0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrowserMockup src={screens[active].src} alt={screens[active].label} />
            </motion.div>
          </AnimatePresence>
          {/* Metadata pill — floating top-right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`pill-${active}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                padding: "6px 10px",
                background: "rgba(26,26,26,0.82)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                border: `1px solid ${arko.muted}`,
                display: "flex",
                alignItems: "center",
                gap: 8,
                pointerEvents: "none",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: arko.light,
                }}
              />
              <span style={{ ...mono, fontSize: 10, color: "#FAFAFA", letterSpacing: "0.16em" }}>
                {screens[active].label.split(" · ")[0]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ ...caption }}>
            {screens[active].label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   USER TABS
══════════════════════════════════════════════════════════════════ */
function UserTabs() {
  const [tab, setTab] = useState<0 | 1>(0);
  const tabs = [
    {
      label: "Primary · The Designer",
      heading: "The Design Firm",
      body: "A project lead managing 4–8 active client projects simultaneously. Uses Arko daily to scan spaces, place furniture, adjust finishes, and track project status across the team. Needs speed, precision, and a clear handoff mechanism.",
      img: "/arko/web-3.png",
      imgCaption: "Designer dashboard · daily workspace",
      sketch: "furnitureRoom" as const,
      annotation: "their daily canvas",
      isPhone: false,
      icon: <UsersThree size={18} color={arko.primary} weight="duotone" />,
    },
    {
      label: "Secondary · The Client",
      heading: "The Client",
      body: "A homeowner or property developer reviewing a design remotely. Not design-literate. Needs to understand the space instantly, leave specific feedback, and approve with confidence, without downloading an app or creating an account.",
      img: "/arko/phone-13.png",
      imgCaption: "Client landing · no login, no friction",
      sketch: "phoneInHand" as const,
      annotation: "what they see",
      isPhone: true,
      icon: <DeviceMobileCamera size={18} color={arko.primary} weight="duotone" />,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 36 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i as 0 | 1)}
            style={{
              padding: "14px 24px", background: "none", border: "none",
              borderBottom: `2px solid ${tab === i ? "var(--text-primary)" : "transparent"}`,
              cursor: "pointer", textAlign: "left",
              transitionProperty: "transform, opacity", transitionDuration: "150ms",
            }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <span style={{ ...mono, fontSize: 11, color: tab === i ? "var(--text-primary)" : "var(--text-secondary)", display: "block", marginBottom: 6, letterSpacing: "0.14em" }}>{t.label}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              {t.icon}
              <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 20, color: tab === i ? "var(--text-primary)" : "var(--text-secondary)" }}>{t.heading}</span>
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 24 }}>{tabs[tab].body}</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
                <HandDrawnSketch type={tabs[tab].sketch}
                  width={tabs[tab].sketch === "phoneInHand" ? 120 : 180}
                  height={tabs[tab].sketch === "phoneInHand" ? 96 : 110}
                  delay={0.2}
                  strokeColor={arko.primary} opacity={0.7} />
                <HandLabel arrow="left" arrowLength={52} rotate={-5} size={26} delay={0.5}>
                  {tabs[tab].annotation}
                </HandLabel>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <SparkleCluster count={4} size={16} color={arko.primary} />
              {tabs[tab].isPhone ? (
                <motion.div
                  whileHover={{ rotate: -3, y: -6 }}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ transform: "rotate(-5deg)", transformOrigin: "center center" }}
                >
                  <img src={tabs[tab].img} alt={tabs[tab].heading}
                    style={{ width: "clamp(160px, 65%, 240px)", display: "block", margin: "0 auto", filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.22))" }} />
                </motion.div>
              ) : (
                <BrowserMockup src={tabs[tab].img} alt={tabs[tab].heading} />
              )}
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
                <p style={{ ...caption, margin: 0 }}>{tabs[tab].imgCaption}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DESIGN DECISION STEPPER
══════════════════════════════════════════════════════════════════ */
function DecisionStepper() {
  const [active, setActive] = useState(0);
  const decisions = [
    {
      num: "01", short: "Two separate\nexperiences",
      title: "Two entirely separate experiences",
      body: "The designer interface is dense, powerful, and built for daily professional use: sidebar navigation, project management, team activity, AR editing tools. The client interface strips everything away: no login, no nav, no jargon. Just the room, a comment button, and an approve button. The same product, two completely different contexts of use.",
      img: "/arko/web-5.png",
      landscape: false,
      Icon: UsersThree,
    },
    {
      num: "02", short: "AR editor for\nprofessionals",
      title: "AR editor built for professionals, not consumers",
      body: "The AR room editor puts the canvas first and keeps all tools at the edges: collapsible Furniture Library on the left, Properties panel on the right, minimal toolbar at the bottom. The designer stays focused on the space, not the interface. Every element category is structured as progressive disclosure so the library never overwhelms.",
      img: "/arko/phone-10.png",
      landscape: true,
      Icon: Cube,
    },
    {
      num: "03", short: "Approval as the\ncore value",
      title: "The approval flow as the product's core value",
      body: "Most design tools stop at visualization. Arko makes client sign-off a first-class feature: the Share modal, client walkthrough, comment pinning, and one-tap approval are designed as a single seamless flow. When a client approves, the designer gets an instant notification and a timestamped PDF summary. This closes the loop that every other tool leaves open.",
      img: "/arko/phone-16.png",
      landscape: false,
      Icon: CheckCircle,
    },
    {
      num: "04", short: "Empty states as\nonboarding",
      title: "Empty states as onboarding",
      body: "Both the dashboard and project detail have fully designed empty states that guide the user to their first action rather than leaving them stranded. For a B2B product where adoption depends on the first session, this matters. A stranded user is a churned user; empty states are a product feature, not an afterthought.",
      img: "/arko/web-3.png",
      landscape: false,
      Icon: Compass,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0"
        style={{ borderBottom: "1px solid var(--border)", marginBottom: 0 }}>
        {decisions.map((d, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{
              padding: "20px 16px",
              background: active === i ? arko.surface : "var(--bg-primary)",
              border: "none",
              borderBottom: `2px solid ${active === i ? arko.primary : "transparent"}`,
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
              cursor: "pointer", textAlign: "left",
              transitionProperty: "transform, opacity, background-color", transitionDuration: "150ms",
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.background = arko.subtle; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.background = "var(--bg-primary)"; }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: active === i ? arko.primary : "var(--border)", lineHeight: 1 }}>
                {d.num}
              </span>
              <d.Icon size={18} color={active === i ? arko.primary : "var(--text-muted)"} weight={active === i ? "duotone" : "regular"} />
            </div>
            <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: active === i ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.3, display: "block", whiteSpace: "pre-line" }}>
              {d.short}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: "44px 0", borderBottom: "1px solid var(--border)", minHeight: "clamp(380px, 45vw, 500px)", display: "flex", alignItems: "center" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center" style={{ width: "100%" }}>
            <div>
              <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 30px)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 20 }}>
                {decisions[active].title}
              </h3>
              <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                {decisions[active].body}
              </p>
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              {decisions[active].img.includes("web-") ? (
                <BrowserMockup src={decisions[active].img} alt={decisions[active].title} />
              ) : decisions[active].landscape ? (
                <img src={decisions[active].img} alt={decisions[active].title}
                  style={{ width: "100%", display: "block", filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.22))" }} />
              ) : (
                <img src={decisions[active].img} alt={decisions[active].title}
                  style={{ width: "clamp(200px, 65%, 280px)", display: "block", margin: "0 auto", filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.22))" }} />
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   AR EDITOR STEPPER — segmented showcase for AR editor steps
══════════════════════════════════════════════════════════════════ */
function ArEditorStepper({
  steps,
}: {
  steps: { src: string; num: string; label: string; desc: string }[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {/* Segmented control */}
      <div
        role="tablist"
        aria-label="AR editor steps"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          border: "1px solid var(--border)",
          borderRadius: 2,
          overflow: "hidden",
          background: "var(--bg-elevated)",
          marginBottom: 32,
        }}
      >
        {steps.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              padding: "14px 16px",
              background: active === i ? arko.surface : "transparent",
              border: "none",
              borderRight: i < steps.length - 1 ? "1px solid var(--border)" : "none",
              borderBottom: `2px solid ${active === i ? arko.primary : "transparent"}`,
              cursor: "pointer",
              textAlign: "left",
              transitionProperty: "background-color, border-color",
              transitionDuration: "180ms",
            }}
            onMouseEnter={(e) => {
              if (i !== active) (e.currentTarget as HTMLElement).style.background = arko.subtle;
            }}
            onMouseLeave={(e) => {
              if (i !== active) (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`;
              (e.currentTarget as HTMLElement).style.outlineOffset = "-2px";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.outline = "none";
            }}
          >
            <span
              style={{
                ...mono,
                fontSize: 12,
                fontWeight: 700,
                color: active === i ? arko.primary : "var(--text-secondary)",
                display: "block",
                marginBottom: 6,
                lineHeight: 1,
                letterSpacing: "0.14em",
              }}
            >
              {s.num}
            </span>
            <span
              className="hidden md:block"
              style={{
                fontFamily: serif,
                fontSize: 15,
                fontWeight: 600,
                color: active === i ? "var(--text-primary)" : "var(--text-secondary)",
                lineHeight: 1.3,
                display: "block",
              }}
            >
              {s.label.split(" · ")[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Active panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <motion.div
              className="md:col-span-7"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={steps[active].src}
                alt={steps[active].label}
                style={{
                  width: "100%",
                  display: "block",
                  filter: "drop-shadow(0 14px 40px rgba(0,0,0,0.18))",
                }}
              />
            </motion.div>
            <div className="md:col-span-5">
              <span
                style={{
                  ...mono,
                  fontSize: 11,
                  color: arko.dark,
                  display: "block",
                  marginBottom: 14,
                  letterSpacing: "0.14em",
                }}
              >
                Step {steps[active].num} · of {String(steps.length).padStart(2, "0")}
              </span>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.6vw, 30px)",
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                  marginBottom: 18,
                  letterSpacing: "-0.01em",
                }}
              >
                {steps[active].label}
              </p>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 16,
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                {steps[active].desc}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CHAPTER MARK — big handwritten chapter number + label
══════════════════════════════════════════════════════════════════ */
function ChapterMark({
  number,
  label,
  note,
  className = "",
}: {
  number: string;
  label: string;
  note?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={className} style={{ marginBottom: 32, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
        <motion.span
          initial={{ opacity: 0, y: 14, rotate: -6 }}
          animate={inView ? { opacity: 1, y: 0, rotate: -4 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Caveat', cursive",
            fontWeight: 500,
            fontSize: "clamp(56px, 7vw, 84px)",
            color: arko.primary,
            lineHeight: 0.9,
            display: "inline-block",
            transformOrigin: "center",
          }}
        >
          ch. {number}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(22px, 2.2vw, 26px)",
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          {label}
        </motion.span>
      </div>
      {note && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.85 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            display: "inline-block",
            marginTop: 10,
            fontFamily: "'Caveat', cursive",
            fontSize: 22,
            color: arko.dark,
            transform: "rotate(-2deg)",
            transformOrigin: "left center",
          }}
        >
          {note}
        </motion.span>
      )}
      <motion.svg
        aria-hidden
        width="100%"
        height="18"
        viewBox="0 0 600 18"
        preserveAspectRatio="none"
        style={{ display: "block", marginTop: 14, overflow: "visible", maxWidth: 560 }}
      >
        <motion.path
          d="M 2 10 C 60 4, 140 14, 220 9 C 300 4, 380 14, 460 9 C 520 6, 580 12, 598 9"
          stroke={arko.primary}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity={0.55}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   POLAROID FRAME — tilted paper-style image wrapper with tape accent
══════════════════════════════════════════════════════════════════ */
function PolaroidFrame({
  children,
  rotate = -3,
  tape = true,
  caption,
  className = "",
  style,
}: {
  children: React.ReactNode;
  rotate?: number;
  tape?: boolean;
  caption?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      whileHover={{ rotate: rotate * 0.4, y: -4 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className={className}
      style={{
        display: "inline-block",
        padding: "14px 14px 22px",
        background: "var(--bg-elevated)",
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.05), 0 10px 28px rgba(0,0,0,0.10), 0 28px 56px rgba(0,0,0,0.08)",
        transform: `rotate(${rotate}deg)`,
        transformOrigin: "center center",
        position: "relative",
        ...style,
      }}
    >
      {tape && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%) rotate(-4deg)",
            width: 72,
            height: 22,
            background: "rgba(181, 146, 76, 0.28)",
            border: "1px solid rgba(181, 146, 76, 0.18)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      {caption && (
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 20,
            color: arko.dark,
            textAlign: "center",
            marginTop: 10,
            lineHeight: 1.2,
          }}
        >
          {caption}
        </p>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SCRIBBLE CIRCLE — hand-drawn ellipse wrapping a phrase
══════════════════════════════════════════════════════════════════ */
function ScribbleCircle({
  children,
  color = arko.primary,
  strokeWidth = 2.2,
  rotate = -2,
  delay = 0.2,
  padX = 10,
  padY = 6,
}: {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  rotate?: number;
  delay?: number;
  padX?: number;
  padY?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 200 70"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: -padX,
          right: -padX,
          top: -padY,
          bottom: -padY,
          width: `calc(100% + ${padX * 2}px)`,
          height: `calc(100% + ${padY * 2}px)`,
          pointerEvents: "none",
          transform: `rotate(${rotate}deg)`,
          overflow: "visible",
        }}
      >
        {/* organic bezier ellipse — two overlapping passes for a hand-drawn feel */}
        <motion.path
          d="M 14 36 C 10 12, 70 4, 118 6 C 168 8, 196 22, 192 42 C 188 62, 130 68, 82 66 C 34 64, 8 54, 14 36 Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          opacity={0.85}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M 18 34 C 18 16, 70 10, 118 12 C 162 14, 190 26, 186 40"
          stroke={color}
          strokeWidth={strokeWidth * 0.75}
          strokeLinecap="round"
          fill="none"
          opacity={0.45}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.9, delay: delay + 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SCRIBBLE UNDERLINE — wavy hand-drawn stroke beneath a phrase
══════════════════════════════════════════════════════════════════ */
function ScribbleUnderline({
  children,
  color = arko.primary,
  strokeWidth = 2.2,
  delay = 0.2,
  offset = -4,
}: {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  offset?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 18"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: -4,
          right: -4,
          bottom: offset,
          width: "calc(100% + 8px)",
          height: 18,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <motion.path
          d="M 4 10 C 40 4, 80 14, 120 8 C 160 3, 200 14, 240 8 C 268 4, 288 10, 296 9"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          opacity={0.85}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SPARKLE CLUSTER — scattered 4-point stars around an area
══════════════════════════════════════════════════════════════════ */
function SparkleCluster({
  count = 4,
  color = arko.primary,
  size = 16,
  className = "",
  style,
}: {
  count?: number;
  color?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  // deterministic scatter positions (percentages) so SSR + remount are stable
  const scatter = [
    { top: "6%",  left: "4%",   s: 1.0,  d: 0.15, r: 12  },
    { top: "14%", left: "88%",  s: 0.75, d: 0.35, r: -8  },
    { top: "74%", left: "2%",   s: 0.8,  d: 0.55, r: 18  },
    { top: "82%", left: "78%",  s: 1.1,  d: 0.75, r: -4  },
    { top: "42%", left: "94%",  s: 0.6,  d: 0.95, r: 10  },
    { top: "50%", left: "-4%",  s: 0.65, d: 0.45, r: -14 },
  ].slice(0, count);

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}
    >
      {scatter.map((p, i) => (
        <motion.svg
          key={i}
          width={size * p.s}
          height={size * p.s}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            transform: `rotate(${p.r}deg)`,
            overflow: "visible",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: p.d, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <path
            d="M12 1.5 C 12.2 7.4, 13.6 10.5, 22.5 12 C 13.6 13.5, 12.2 16.6, 12 22.5 C 11.8 16.6, 10.4 13.5, 1.5 12 C 10.4 10.5, 11.8 7.4, 12 1.5 Z"
            fill={color}
            opacity={0.9}
          />
        </motion.svg>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HAND LABEL — positioned Caveat cursive note with optional arrow
══════════════════════════════════════════════════════════════════ */
function HandLabel({
  children,
  color = arko.dark,
  rotate = -4,
  size = 22,
  arrow = "none",
  arrowLength = 44,
  className = "",
  style,
  delay = 0.3,
}: {
  children: React.ReactNode;
  color?: string;
  rotate?: number;
  size?: number;
  arrow?: "left" | "right" | "down" | "up" | "none";
  arrowLength?: number;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const a: string = arrow;
  const isHorizontal = a === "left" || a === "right";
  const isBefore = a === "left" || a === "up";
  const isAfter = a === "right" || a === "down";
  const w = isHorizontal ? arrowLength : 24;
  const h = isHorizontal ? 24 : arrowLength;

  let arrowPath = "";
  let tipPath = "";
  if (a === "left") {
    arrowPath = `M ${arrowLength} 12 C ${arrowLength * 0.6} 6, 14 14, 6 12`;
    tipPath = `M 12 7 L 6 12 L 12 17`;
  } else if (a === "right") {
    arrowPath = `M 6 12 C 14 6, ${arrowLength * 0.6} 18, ${arrowLength - 2} 12`;
    tipPath = `M ${arrowLength - 8} 7 L ${arrowLength - 2} 12 L ${arrowLength - 8} 17`;
  } else if (a === "down") {
    arrowPath = `M 12 6 C 6 ${arrowLength * 0.5}, 18 ${arrowLength * 0.7}, 12 ${arrowLength - 4}`;
    tipPath = `M 7 ${arrowLength - 8} L 12 ${arrowLength - 2} L 17 ${arrowLength - 8}`;
  } else if (a === "up") {
    arrowPath = `M 12 ${arrowLength - 4} C 18 ${arrowLength * 0.5}, 6 ${arrowLength * 0.3}, 12 6`;
    tipPath = `M 7 12 L 12 6 L 17 12`;
  }

  const arrowSvg = arrowPath ? (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <motion.path
        d={arrowPath}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d={tipPath}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.7}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.7 } : { opacity: 0 }}
        transition={{ duration: 0.25, delay: delay + 0.7 }}
      />
    </svg>
  ) : null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: "center",
        gap: 6,
        pointerEvents: "none",
        ...style,
      }}
    >
      {isBefore && arrowSvg}
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: size,
          color,
          lineHeight: 1.15,
          transform: `rotate(${rotate}deg)`,
          transformOrigin: "center left",
          whiteSpace: "nowrap",
          opacity: 0.92,
          fontWeight: 500,
        }}
      >
        {children}
      </motion.span>
      {isAfter && arrowSvg}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PROCESS TIMELINE — interactive accordion
══════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function ArkoCase() {
  const adjacent = getAdjacentProjects("arko");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }} className="pt-14"
    >
      {/* ── Full-width top mask — hides content scrolling into nav zone ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 59,
        background: "var(--bg-primary)", zIndex: 45,
        pointerEvents: "none",
      }} />

      {/* ── Progress bar ─────────────────────────────────────────────── */}
      <div style={{
        position: "fixed", top: 56, left: 0, right: 0, height: 2,
        background: "var(--bg-primary)", zIndex: 49,
      }}>
        <motion.div style={{
          height: "100%", background: arko.primary,
          scaleX, transformOrigin: "left", opacity: 0.8,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          HERO — single-viewport scrapbook cover
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-primary)",
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Top bar — back link + tags */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05, duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            width: "100%",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: "clamp(20px, 2.4vw, 32px)",
            flexWrap: "wrap", gap: 16,
          }}
        >
          <Link to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Caveat', cursive", fontSize: 22,
              color: arko.dark, textDecoration: "none",
              transitionProperty: "color", transitionDuration: "200ms",
              transform: "rotate(-2deg)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = arko.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = arko.dark)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 9H3M6 5L2 9l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            back to all work
          </Link>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {["Product Design", "B2B SaaS", "Web + iOS", "AR / Spatial"].map((tag, i) => (
              <span key={tag} style={{
                fontFamily: "'Caveat', cursive", fontSize: 18,
                color: "var(--text-secondary)",
                transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
                display: "inline-block",
              }}>
                {i === 0 ? "" : "· "}{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Middle — 2-column layout centered vertically */}
        <div
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            flex: 1,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "clamp(32px, 4vw, 56px)",
            alignItems: "center",
            paddingTop: "clamp(24px, 3vw, 40px)",
            paddingBottom: "clamp(24px, 3vw, 40px)",
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-12"
            style={{ gap: "clamp(24px, 3vw, 48px)", alignItems: "center", width: "100%" }}
          >

            {/* LEFT — title + subtitle + meta */}
            <div className="md:col-span-6">
              <div style={{ overflow: "hidden", marginBottom: 18 }}>
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.08, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(80px, 12vw, 180px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.055em", lineHeight: 0.85,
                    display: "inline-block",
                  }}>
                  Arko
                  <span style={{ color: arko.primary, fontStyle: "italic" }}>.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  color: arko.dark,
                  lineHeight: 1.2,
                  maxWidth: 460,
                  marginBottom: 28,
                  transform: "rotate(-1.5deg)",
                }}
              >
                a spatial design platform for interior firms —
                <span style={{ color: arko.primary }}> scan, design, approve </span>
                in one loop.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.6 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, auto)",
                  gap: "14px 40px",
                  paddingTop: 20,
                  borderTop: `1.5px dashed ${arko.muted}`,
                  maxWidth: 480,
                }}
              >
                {([
                  { label: "role",     value: "Product Designer" },
                  { label: "platform", value: "Web + iOS" },
                  { label: "timeline", value: "14 weeks" },
                  { label: "tools",    value: "Figma · Framer" },
                ] as { label: string; value: string }[]).map((m) => (
                  <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: 18,
                      color: arko.dark,
                      lineHeight: 1,
                    }}>
                      {m.label}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — laptop + phone collage */}
            <motion.div
              className="md:col-span-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", width: "100%" }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ rotate: -1, y: -8 }}
                style={{
                  position: "relative", zIndex: 2,
                  transform: "rotate(-2deg)",
                  transformOrigin: "center center",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.15))",
                }}
              >
                <LaptopMockup src="/arko/web-1.png" alt="Arko designer dashboard" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                whileHover={{ y: -16, rotate: 4 }}
                style={{
                  position: "absolute",
                  left: "-4%", bottom: "-8%",
                  width: "26%",
                  zIndex: 4,
                  transform: "rotate(9deg)",
                  filter: "drop-shadow(0 20px 36px rgba(0,0,0,0.28))",
                }}
              >
                <img src="/arko/phone-13.png" alt="Client mobile view" style={{ width: "100%", display: "block" }} />
              </motion.div>

              <div style={{ position: "absolute", right: "-2%", top: "-8%", zIndex: 6, pointerEvents: "none" }}>
                <HandLabel arrow="down" arrowLength={42} rotate={-4} size={24} delay={1.1}>
                  designer's canvas
                </HandLabel>
              </div>
              <div style={{ position: "absolute", left: "-6%", bottom: "-4%", zIndex: 6, pointerEvents: "none" }}>
                <HandLabel arrow="up" arrowLength={40} rotate={-6} size={22} delay={1.3}>
                  client's view
                </HandLabel>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            width: "100%",
            display: "flex", justifyContent: "center",
            paddingBottom: "clamp(18px, 2vw, 28px)",
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Caveat', cursive", fontSize: 18,
              color: "var(--text-secondary)",
            }}
          >
            scroll
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          OVERVIEW — minimal: title → description → stats
      ══════════════════════════════════════════════════════════════ */}
      <section id="sec-overview" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <Reveal>
            <ChapterMark number="01" label="the whole thing, in one breath" note="a.k.a. overview" />

            {/* Title + description */}
            <div style={{ maxWidth: 760, marginBottom: 72, position: "relative" }}>
              <h2 style={{ ...t.h1Display, marginBottom: 24 }}>
                One loop.{" "}
                <ScribbleCircle color={arko.primary} rotate={-2} padX={14} padY={10} delay={0.4}>
                  <em style={{ fontStyle: "italic", color: arko.primary }}>
                    Zero back-and-forth.
                  </em>
                </ScribbleCircle>
              </h2>
              <p style={{ ...t.bodyLg, maxWidth: 640 }}>
                A B2B platform that turns spatial design approvals from a week of emails
                into a single tap.
              </p>
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 14 }}>
                <HandLabel arrow="left" arrowLength={52} rotate={-3} size={24} delay={0.9}>
                  the whole thesis
                </HandLabel>
              </div>
            </div>
          </Reveal>

          {/* Stats — clean editorial row, no tilt, no tape */}
          <Reveal delay={0.1}>
            <div
              className="grid grid-cols-2 lg:grid-cols-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {([
                { label: "approval time",    num: 45,   decimals: 0, prefix: "",  unit: "min", delta: "−92%",       status: "down" as const },
                { label: "revision cycles",  num: 1.2,  decimals: 1, prefix: "",  unit: "avg", delta: "−72%",       status: "down" as const },
                { label: "spatial accuracy", num: 92,   decimals: 0, prefix: "",  unit: "%",   delta: "target met", status: "flat" as const },
                { label: "client NPS",       num: 38,   decimals: 0, prefix: "+", unit: "pts", delta: "+24 pts",    status: "up"   as const },
              ] as { label: string; num: number; decimals: number; prefix: string; unit: string; delta: string; status: "up" | "down" | "flat" }[]).map((k, i, arr) => (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "32px 24px",
                    borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <p style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 20,
                    color: arko.dark,
                    marginBottom: 14,
                    lineHeight: 1,
                  }}>
                    {k.label}
                  </p>
                  <p style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(44px, 4.8vw, 58px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.035em",
                    lineHeight: 1,
                    marginBottom: 10,
                  }}>
                    <CountUp value={k.num} decimals={k.decimals} prefix={k.prefix} />
                    <span style={{
                      fontFamily: sans, fontSize: 16, fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginLeft: 6, letterSpacing: 0,
                    }}>{k.unit}</span>
                  </p>
                  <span style={{
                    fontFamily: sans, fontSize: 13, fontWeight: 500,
                    color: arko.primary,
                    letterSpacing: "0.02em",
                  }}>
                    {k.status === "down" && "↓ "}
                    {k.status === "up" && "↑ "}
                    {k.status === "flat" && "→ "}
                    {k.delta}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      <section id="sec-problem" style={{ padding: SECTION_PAD, background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── THE PROBLEM ─────────────────────────────────────────────── */}
        <Reveal>
          <ChapterMark number="02" label="where it hurts" note="the problem, in plain words" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <Reveal className="md:col-span-6">
            <h2 style={{ ...t.h2Section, marginBottom: 24 }}>
              Clients can't visualize a space from a floor plan. That gap{" "}
              <ScribbleUnderline color={arko.primary} strokeWidth={2.4} delay={0.5} offset={-2}>
                costs real money
              </ScribbleUnderline>
              .
            </h2>
            <p style={{ ...t.body, marginBottom: 20 }}>
              Design firms lose an average of 6–8 hours per project on revision cycles caused by
              one root problem: clients cannot visualize a space from a floor plan or mood board alone.
              They say yes in the meeting and change their mind when they see it built.
            </p>
            <p style={{ ...t.body }}>
              The tools don't help: AutoCAD, PDFs, and walkthroughs don't talk to each other,
              and a verbal yes isn't binding when the space actually gets built.
            </p>
          </Reveal>

          {/* Anatomy-of-a-revision — clean list, no rotation, no tape */}
          <Reveal className="md:col-span-6" delay={0.1}>
            <div style={{
              position: "relative",
              padding: "32px 28px",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
            }}>
              <div aria-hidden style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: 2,
                background: arko.primary, opacity: 0.4,
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.16em" }}>
                  Anatomy of a revision
                </p>
                <Clock size={18} color={arko.primary} weight="duotone" />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {([
                  { step: "01", label: "Initial meeting", time: "~60 min" },
                  { step: "02", label: "Verbal 'yes'", time: "0 min" },
                  { step: "03", label: "Build / render", time: "2–3 days" },
                  { step: "04", label: "Client sees it", time: "critical moment" },
                  { step: "05", label: "Revision cycle", time: "6–8 hrs lost", loss: true },
                ] as { step: string; label: string; time: string; loss?: boolean }[]).map((r, i, arr) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--border-light)" : "none",
                  }}>
                    <span style={{
                      ...mono, fontSize: 11,
                      color: "var(--text-muted)", letterSpacing: "0.1em",
                      fontWeight: 500, flexShrink: 0, width: 22,
                    }}>{r.step}</span>
                    <span style={{
                      flex: 1,
                      fontFamily: sans, fontSize: 14,
                      color: r.loss ? "var(--text-primary)" : "var(--text-secondary)",
                      fontWeight: r.loss ? 600 : 400,
                    }}>{r.label}</span>
                    <span style={{
                      ...mono, fontSize: 11,
                      color: r.loss ? arko.primary : "var(--text-muted)",
                      fontWeight: r.loss ? 600 : 400,
                      letterSpacing: "0.1em",
                    }}>{r.time}</span>
                  </div>
                ))}
              </div>

              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--border)",
              }}>
                <span style={{ ...mono, fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.14em" }}>
                  Per-project waste
                </span>
                <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: arko.primary, letterSpacing: "-0.02em" }}>
                  6–8 hrs
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        </div>
      </section>

      <div id="sec-users" className="max-w-7xl mx-auto px-6 md:px-10" style={{ padding: SECTION_PAD }}>

        <Reveal>
          <ChapterMark number="03" label="two humans, two very different days" note="who I actually designed for" />
          <div style={{ marginBottom: 40, maxWidth: 680 }}>
            <h2 style={{ ...t.h2Section }}>
              One platform.{" "}
              <ScribbleUnderline color={arko.primary} strokeWidth={2.4} delay={0.5}>
                Two different contexts
              </ScribbleUnderline>{" "}
              of use.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <UserTabs />
        </Reveal>

        {/* Research depth — clean strip, no tilt */}
        <Reveal delay={0.15}>
          <div style={{ marginTop: 64 }}>
            <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.16em", marginBottom: 24 }}>
              Research Depth · how we got here
            </p>
            <div
              className="grid grid-cols-2 md:grid-cols-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {([
                { big: 12, unit: "designer interviews",    sub: "leads across 4 firms, 60–90 min each" },
                { big: 8,  unit: "client sessions",        sub: "first-time homeowners + repeat developers" },
                { big: 3,  unit: "walkthroughs shadowed",  sub: "observed yes-then-no moments live" },
                { big: 47, unit: "revision emails parsed", sub: "6-month thread audit across 2 firms" },
              ] as { big: number; unit: string; sub: string }[]).map((s, i, arr) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "28px 24px",
                    borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <p style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(36px, 3.8vw, 44px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12,
                  }}>
                    <CountUp value={s.big} />
                  </p>
                  <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.14em", marginBottom: 8 }}>
                    {s.unit}
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {s.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>

      {/* ── KEY INSIGHT — full bleed dark ───────────────────────────── */}
      <section style={{ backgroundColor: "var(--text-primary)", padding: "clamp(72px, 10vw, 120px) 0", position: "relative", overflow: "hidden" }}>
        <Reveal y={16}>
          <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <Quotes size={24} color={arko.light} opacity={0.5} />
              <p style={{ ...mono, fontSize: 11, color: arko.light, letterSpacing: "0.16em" }}>Key Insight</p>
            </div>
            <blockquote style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(28px, 4.2vw, 52px)",
              color: "var(--bg-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.25, quotes: "none", marginBottom: 32, maxWidth: 860,
            }}>
              Clients don't reject designs because they have bad taste.
              They reject them because they{" "}
              <ScribbleUnderline color={arko.light} strokeWidth={2.6} delay={0.6} offset={-4}>
                <em style={{ fontStyle: "italic", color: arko.light }}>
                  couldn't see it clearly enough to say yes
                </em>
              </ScribbleUnderline>{" "}
              the first time.
            </blockquote>
            <p style={{ fontFamily: sans, fontSize: 16, color: "rgba(250,250,250,0.72)", lineHeight: 1.8, maxWidth: 580 }}>
              This reframed the design direction entirely. The goal wasn't to build a better
              design tool; it was to build a better <em>communication</em> tool that
              happened to be powered by design.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="sec-web" style={{ padding: SECTION_PAD, background: arko.surface }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── WEB PLATFORM ────────────────────────────────────────────── */}
        <Reveal>
          <ChapterMark number="04" label="a workspace for the pro" note="the designer's daily canvas" />
          <div style={{ maxWidth: 760, marginBottom: 44 }}>
            <h2 style={{ ...t.h2Section, marginBottom: 20 }}>
              A{" "}
              <ScribbleUnderline color={arko.primary} strokeWidth={2.4} delay={0.5}>
                professional workspace
              </ScribbleUnderline>
              . Dense, powerful, built for daily use.
            </h2>
            <p style={{ ...t.body }}>
              The designer interface doesn't compromise. Sidebar navigation, project management,
              team activity, and AR editing tools — all accessible from a single workspace
              a design lead would open on day one and never want to leave.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <WebGallery screens={[
            { src: "/arko/web-3.png", label: "Fig. 01 · Dashboard · active projects, team stats, pending approvals" },
            { src: "/arko/web-4.png", label: "Fig. 02 · All Projects · filter by status, search, quick access" },
            { src: "/arko/web-5.png", label: "Fig. 03 · Project Detail · rooms, progress bars, live activity log" },
            { src: "/arko/web-6.png", label: "Fig. 04 · Comments View · client feedback pinned in context" },
          ]} />
        </Reveal>

        </div>
      </section>

      <section id="sec-scan" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── SCAN FLOW ───────────────────────────────────────────────── */}

        <Reveal>
          <ChapterMark number="05" label="scan the room, then start playing" note="from empty → furnished" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Reveal>
            <h2 style={{ ...t.h2Section, marginBottom: 20 }}>
              From empty room to{" "}
              <ScribbleUnderline color={arko.primary} strokeWidth={2.4} delay={0.5} offset={-2}>
                furnished space
              </ScribbleUnderline>{" "}
              in minutes.
            </h2>
            <p style={{ ...t.body, marginBottom: 32 }}>
              A pre-scan checklist ensures quality spatial capture. The scanner detects
              floor planes, measures spatial accuracy, and confirms the data before the
              AR editor opens.
            </p>

            {/* Scan performance — clean 3-col divider grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                marginBottom: 36,
                borderTop: "1px solid var(--border)",
              }}
            >
              {([
                { pre: "<", num: 3,  suf: " min",   unit: "avg scan time",      icon: <Clock size={16} color={arko.primary} weight="duotone" /> },
                { pre: "",  num: 92, suf: "%",      unit: "spatial accuracy",   icon: <Aperture size={16} color={arko.primary} weight="duotone" /> },
                { pre: "",  num: 4,  suf: " steps", unit: "pre-scan checklist", icon: <CheckCircle size={16} color={arko.primary} weight="duotone" /> },
              ] as { pre: string; num: number; suf: string; unit: string; icon: React.ReactNode }[]).map((s, i, arr) => (
                <div
                  key={i}
                  style={{
                    padding: "20px 16px",
                    borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    {s.icon}
                    <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 24, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      <CountUp value={s.num} prefix={s.pre} suffix={s.suf} />
                    </p>
                  </div>
                  <p style={{ ...mono, fontSize: 10, color: "var(--text-secondary)", letterSpacing: "0.14em" }}>{s.unit}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ position: "relative" }}>
              <PhoneCarousel slides={[
                { src: "/arko/phone-3.png", label: "01 / 04 · Pre-Scan Checklist" },
                { src: "/arko/phone-4.png", label: "02 / 04 · Detecting Floor" },
                { src: "/arko/phone-5.png", label: "03 / 04 · Floor Confirmed" },
                { src: "/arko/phone-6.png", label: "04 / 04 · 92% Spatial Accuracy" },
              ]} />
            </div>
          </Reveal>
        </div>

        {/* AR Editor */}
        <div style={{ marginTop: 72 }}>
          <Reveal>
            <div style={{ marginBottom: 40, maxWidth: 680 }}>
              <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.16em", marginBottom: 12 }}>
                AR Room Editor
              </p>
              <h3 style={{ ...t.h3Lede }}>
                Canvas first, tools at the edges — place, scale, swap, no modals.
              </h3>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ArEditorStepper steps={[
              {
                src: "/arko/phone-7.png",
                num: "01",
                label: "Room type breadcrumb navigation",
                desc: "Navigate between room types without losing context. The full path stays visible at all times; every step in the hierarchy is one tap to reverse.",
              },
              {
                src: "/arko/phone-8.png",
                num: "02",
                label: "Furniture library · collapsible sidebar",
                desc: "The library collapses when you need the canvas. One tap to open, one tap to confirm. The space stays the focus, not the tool.",
              },
              {
                src: "/arko/phone-10.png",
                num: "03",
                label: "Item selected · Properties panel",
                desc: "Tap any object to reveal its controls inline. Scale, rotate, swap materials; no modal interrupts the flow.",
              },
              {
                src: "/arko/phone-12.png",
                num: "04",
                label: "Preview mode · Send to Client",
                desc: "Strip away every tool and see exactly what the client will see. One tap to share. The revision loop, closed.",
              },
            ]} />
          </Reveal>
        </div>

        </div>
      </section>

      <section id="sec-client" style={{ padding: SECTION_PAD, background: arko.surface }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── CLIENT EXPERIENCE ───────────────────────────────────────── */}
        <Reveal>
          <ChapterMark number="06" label="the client opens a link. that's the whole onboarding." note="no login, no jargon, no app" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Reveal delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <PhoneCarousel slides={[
                { src: "/arko/phone-13.png", label: "01 / 04 · Client Landing" },
                { src: "/arko/phone-14.png", label: "02 / 04 · Room View + Comments" },
                { src: "/arko/phone-15.png", label: "03 / 04 · Pin a Comment" },
                { src: "/arko/phone-16.png", label: "04 / 04 · Design Approved" },
              ]} />
            </motion.div>
          </Reveal>

          <Reveal>
            <h2 style={{ ...t.h2Section, marginBottom: 20 }}>
              No login. No jargon. Just the room, a comment, and an{" "}
              <ScribbleUnderline color={arko.primary} strokeWidth={2.4} delay={0.5}>
                approve
              </ScribbleUnderline>
              .
            </h2>
            <p style={{ ...t.body }}>
              The client opens a link, sees their space in AR, leaves pinned
              spatial feedback, and approves — without downloading an app or creating
              an account. When they approve, the designer gets a notification and a
              timestamped PDF that closes the loop.
            </p>
          </Reveal>
        </div>

        </div>
      </section>

      <section id="sec-decisions" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── DESIGN DECISIONS ────────────────────────────────────────── */}

        <Reveal>
          <ChapterMark number="07" label="the calls I had to make" note="four decisions that shaped the product" />
          <div style={{ maxWidth: 680, marginBottom: 44 }}>
            <h2 style={{ ...t.h2Section }}>
              <ScribbleUnderline color={arko.primary} strokeWidth={2.4} delay={0.5}>
                Four decisions
              </ScribbleUnderline>{" "}
              that defined the product.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <DecisionStepper />
        </Reveal>

        </div>
      </section>

      {/* ── OUTCOMES — blueprint grid-subtle background ──────────────── */}
      <section id="sec-reflection" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <ChapterMark number="08" label="what I learned, what I'd do next" note="the closing notes" />
            <h2 style={{ ...t.h2Section, marginBottom: 20 }}>
              Three workflows. One platform.{" "}
              <ScribbleUnderline color={arko.primary} strokeWidth={2.4} delay={0.5} offset={-2}>
                No compromise
              </ScribbleUnderline>{" "}
              on either user.
            </h2>
            <p style={{ ...t.body, maxWidth: 680, marginBottom: 44 }}>
              Arko consolidates space scanning, interior design, and client approval into one
              platform. The result is a product that serves two very different users without
              compromising either experience.
            </p>
          </Reveal>

          {/* Projected outcomes — editorial bordered grid */}
          <Reveal delay={0.1}>
            <div style={{ marginBottom: 72 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ width: 3, height: 16, background: arko.primary, display: "inline-block" }} aria-hidden />
                <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>
                  Projected outcomes · based on workflow modeling
                </p>
              </div>

              <div
                className="grid grid-cols-2 lg:grid-cols-4"
                style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}
              >
                {([
                  { before: "6–8 hrs",   after: "~45 min",     unit: "per-project revisions",   icon: <Clock size={18} color={arko.dark} weight="regular" /> },
                  { before: "3 tools",   after: "1 platform",  unit: "scan → design → approve", icon: <ArrowsHorizontal size={18} color={arko.dark} weight="regular" /> },
                  { before: "4+ rounds", after: "1.6 rounds",  unit: "avg. approval cycles",    icon: <CheckCircle size={18} color={arko.dark} weight="regular" /> },
                  { before: "verbal",    after: "timestamped", unit: "client sign-off, logged", icon: <PushPin size={18} color={arko.dark} weight="regular" /> },
                ] as { before: string; after: string; unit: string; icon: React.ReactNode }[]).map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: "28px 24px",
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                      background: "var(--bg-elevated)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "line-through", textDecorationColor: "var(--text-muted)" }}>
                        {s.before}
                      </span>
                      {s.icon}
                    </div>
                    <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(32px, 3.2vw, 44px)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 10 }}>
                      {s.after}
                    </p>
                    <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>
                      {s.unit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Reflection — clean editorial cards */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 0, marginBottom: 72, borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
            {([
              {
                label: "What I'd build next",
                body: "An analytics layer for designers: showing which rooms clients spend the most time reviewing, which furniture items get swapped most often, and where comments cluster spatially. Turning client behavior into actionable design intelligence.",
                icon: <LightbulbFilament size={22} color={arko.dark} weight="regular" />,
              },
              {
                label: "What this reinforced",
                body: "The best B2B products are the ones that make the professional look good in front of their client. Every design decision in Arko was made with that in mind.",
                icon: <Sparkle size={22} color={arko.dark} weight="regular" />,
              },
            ] as { label: string; body: string; icon: React.ReactNode }[]).map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "36px 32px",
                    borderRight: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                    {c.icon}
                    <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>
                      {c.label}
                    </p>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8 }}>{c.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Closing line — single editorial sentence */}
          <Reveal>
            <div style={{ paddingTop: 32, borderTop: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 18 }}>
                End · Arko case study
              </p>
              <p style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.4vw, 30px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1.35,
                maxWidth: 680,
                margin: "0 auto",
              }}>
                From architecture to digital product — the loop, finally closed.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NAVIGATION ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-wrap justify-between items-center gap-6"
          style={{ paddingTop: 32, paddingBottom: 64, borderTop: "1px solid var(--border)" }}>
          {adjacent.prev ? (
            <Link to={`/work/${adjacent.prev.slug}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, maxWidth: "45%" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M13 8H3M7 4L3 8l4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p style={{ ...mono, fontSize: 11, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.14em" }}>Previous</p>
                <p style={{ fontFamily: serif, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--text-secondary)", transitionProperty: "color", transitionDuration: "150ms" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
                  {adjacent.prev.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          {adjacent.next ? (
            <Link to={`/work/${adjacent.next.slug}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, maxWidth: "45%", marginLeft: "auto" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ ...mono, fontSize: 11, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.14em" }}>Next</p>
                <p style={{ fontFamily: serif, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--text-secondary)", transitionProperty: "color", transitionDuration: "150ms" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
                  {adjacent.next.title}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </div>

    </motion.div>
  );
}
