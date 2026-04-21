import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import { ClockIcon as Clock, ArrowsHorizontalIcon as ArrowsHorizontal, QuotesIcon as Quotes, DeviceMobileCameraIcon as DeviceMobileCamera, ApertureIcon as Aperture, LightbulbFilamentIcon as LightbulbFilament, CheckCircleIcon as CheckCircle, UsersThreeIcon as UsersThree, SparkleIcon as Sparkle, PushPinIcon as PushPin, CubeIcon as Cube, CompassIcon as Compass, ArrowRightIcon as ArrowRight } from "@phosphor-icons/react";
import { getAdjacentProjects } from "../data/projects";

/* ── Arko brand palette (scoped to this page only) ─────────────── */
const arko = {
  primary: "#6E8F4E",         // Arko olive green
  light:   "#8BAD6A",         // tint
  dark:    "#4F6B35",         // shade
  surface: "#F0F4E8",         // very light tint for soft backgrounds
  subtle:  "rgba(110, 143, 78, 0.08)",
  muted:   "rgba(110, 143, 78, 0.55)",
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
    letterSpacing: "0.18em",
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  eyebrowAccent: {
    ...mono,
    fontSize: 11,
    letterSpacing: "0.18em",
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
};

/* Section vertical rhythm */
const SECTION_PAD = "clamp(72px, 9vw, 120px) 0";

/* ══════════════════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════════════════ */
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

function CountUp({
  value, prefix = "", suffix = "", decimals = 0, duration = 1.4, className = "", style,
}: {
  value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number;
  className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, mv]);
  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}

function ArrowBtn({ onClick, dir }: { onClick: () => void; dir: "left" | "right" }) {
  return (
    <button onClick={onClick}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid var(--border)", background: "var(--bg-elevated)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "var(--text-secondary)", flexShrink: 0,
        transitionProperty: "transform, opacity, border-color, color", transitionDuration: "150ms",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = arko.primary; el.style.color = arko.primary; }}
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

function Dots({ count, active, onGo }: { count: number; active: number; onGo: (i: number) => void }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onGo(i)} aria-label={`Go to slide ${i + 1}`}
          style={{
            height: 6, width: i === active ? 22 : 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer",
            background: i === active ? arko.primary : "var(--border)",
            transitionProperty: "transform, opacity, width, background-color", transitionDuration: "250ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION HEADER — replaces the old decorative ChapterMark
   Clean editorial eyebrow: number · section · phase + rule line
══════════════════════════════════════════════════════════════════ */
function SectionHeader({
  num, title, phase, total = "10",
}: {
  num: string; title: string; phase: string; total?: string;
}) {
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
            ...mono, fontSize: 12, color: arko.primary,
            letterSpacing: "0.22em", fontWeight: 700,
          }}>
          {num} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {total}</span>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...mono, fontSize: 12, color: "var(--text-primary)",
            letterSpacing: "0.22em", fontWeight: 600,
          }}>
          {title}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.55 }}
          style={{
            ...mono, fontSize: 11, color: "var(--text-muted)",
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
          height: 1, background: arko.primary, transformOrigin: "left",
          opacity: 0.6,
        }} />
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
              <img src={slides[active].src} alt={slides[active].label} style={{ width: "100%", display: "block", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.18))" }} />
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
   BROWSER MOCKUP — macOS browser chrome
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
   LAPTOP MOCKUP — SVG MacBook frame
══════════════════════════════════════════════════════════════════ */
function LaptopMockup({ src, alt }: { src: string; alt: string }) {
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
          <clipPath id="lm-clip">
            <rect x="18" y="30" width="924" height="522" rx="3" ry="3"/>
          </clipPath>
          <filter id="lm-dropshadow" x="-8%" y="-4%" width="116%" height="130%">
            <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#000" floodOpacity="0.24"/>
            <feDropShadow dx="0" dy="4"  stdDeviation="6"  floodColor="#000" floodOpacity="0.10"/>
          </filter>
        </defs>
        <g filter="url(#lm-dropshadow)">
          <rect x="0" y="0" width="960" height="578" rx="14" ry="14" fill="url(#lm-lid)"/>
          <rect x="436" y="0" width="88" height="20" rx="10" ry="10" fill="#1D1D1F"/>
          <circle cx="480" cy="12" r="6"   fill="#28282A"/>
          <circle cx="480" cy="12" r="4"   fill="#1A1A1C"/>
          <circle cx="480" cy="12" r="2.5" fill="#323234"/>
          <rect x="12" y="24" width="936" height="542" rx="6" ry="6" fill="#000"/>
          <foreignObject x="18" y="30" width="924" height="522" clipPath="url(#lm-clip)">
            <div style={{ width: "100%", height: "100%", overflow: "hidden", background: "#000" }}>
              <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
            </div>
          </foreignObject>
          <rect x="18" y="30" width="924" height="60" fill="url(#lm-bezel)" rx="3"/>
          <rect x="-4" y="578" width="968" height="6" fill="url(#lm-hinge)"/>
          <path d="M-12,584 L972,584 L984,618 L-24,618 Z" fill="url(#lm-base)"/>
          <path d="M-12,584 L972,584 L974,589 L-14,589 Z" fill="rgba(255,255,255,0.55)"/>
          <path d="M-24,615 L984,615 L984,618 L-24,618 Z" fill="rgba(0,0,0,0.10)"/>
          <rect x="384" y="592" width="192" height="18" rx="4" ry="4"
            fill="rgba(0,0,0,0.07)" stroke="rgba(0,0,0,0.09)" strokeWidth="0.6"/>
          <rect x="56" y="618" width="848" height="5" rx="2.5" ry="2.5" fill="url(#lm-foot)"/>
        </g>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   WEB GALLERY
══════════════════════════════════════════════════════════════════ */
function WebGallery({ screens }: { screens: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
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
          <AnimatePresence mode="wait">
            <motion.div
              key={`pill-${active}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", top: 14, right: 14,
                padding: "6px 10px",
                background: "rgba(26,26,26,0.82)",
                backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                border: `1px solid ${arko.muted}`,
                display: "flex", alignItems: "center", gap: 8,
                pointerEvents: "none",
              }}
            >
              <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: arko.light }} />
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
   USER TABS — editorial, no sketches/hand-labels/sparkles
══════════════════════════════════════════════════════════════════ */
function UserTabs() {
  const [tab, setTab] = useState<0 | 1>(0);
  const tabs = [
    {
      label: "Primary",
      heading: "The Design Firm",
      role: "Project lead · 4–8 active projects",
      body: "A project lead managing 4–8 active client projects simultaneously. Uses Arko daily to scan spaces, place furniture, adjust finishes, and track project status across the team. Needs speed, precision, and a clear handoff mechanism.",
      needs: ["Speed across parallel projects", "Precise spatial tooling", "Traceable client sign-off"],
      img: "/arko/web-3.png",
      imgCaption: "Designer dashboard · the daily workspace",
      isPhone: false,
      Icon: UsersThree,
    },
    {
      label: "Secondary",
      heading: "The Client",
      role: "Homeowner · reviewing remotely",
      body: "A homeowner or property developer reviewing a design remotely. Not design-literate. Needs to understand the space instantly, leave specific feedback, and approve with confidence, without downloading an app or creating an account.",
      needs: ["Zero-friction first view", "Plain-language feedback", "Confident one-tap approval"],
      img: "/arko/phone-13.png",
      imgCaption: "Client landing · no login, no friction",
      isPhone: true,
      Icon: DeviceMobileCamera,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 36 }}>
        {tabs.map((x, i) => (
          <button key={i} onClick={() => setTab(i as 0 | 1)}
            style={{
              padding: "18px 26px", background: "none", border: "none",
              borderBottom: `2px solid ${tab === i ? arko.primary : "transparent"}`,
              cursor: "pointer", textAlign: "left", flex: "0 0 auto",
              transitionProperty: "border-color, color", transitionDuration: "180ms",
            }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <span style={{ ...mono, fontSize: 10, color: tab === i ? arko.primary : "var(--text-muted)", display: "block", marginBottom: 8, letterSpacing: "0.2em", fontWeight: 600 }}>
              {x.label}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <x.Icon size={18} color={tab === i ? arko.primary : "var(--text-secondary)"} weight={tab === i ? "duotone" : "regular"} />
              <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 20, color: tab === i ? "var(--text-primary)" : "var(--text-secondary)" }}>
                {x.heading}
              </span>
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
            <div className="md:col-span-6">
              <p style={{ ...mono, fontSize: 10, color: arko.dark, letterSpacing: "0.2em", marginBottom: 14 }}>
                {tabs[tab].role}
              </p>
              <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 24 }}>
                {tabs[tab].body}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border)" }}>
                {tabs[tab].needs.map((n, j) => (
                  <li key={j} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 0",
                    borderBottom: "1px solid var(--border-light)",
                  }}>
                    <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", width: 32, flexShrink: 0, letterSpacing: "0.16em" }}>
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 15, color: "var(--text-primary)", lineHeight: 1.5 }}>
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-6">
              {tabs[tab].isPhone ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={tabs[tab].img} alt={tabs[tab].heading}
                    style={{ width: "clamp(200px, 60%, 280px)", display: "block", filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.22))" }} />
                </div>
              ) : (
                <BrowserMockup src={tabs[tab].img} alt={tabs[tab].heading} />
              )}
              <p style={{ ...caption, marginTop: 14 }}>{tabs[tab].imgCaption}</p>
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
        style={{ borderBottom: "1px solid var(--border)" }}>
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
   AR EDITOR STEPPER
══════════════════════════════════════════════════════════════════ */
function ArEditorStepper({
  steps,
}: {
  steps: { src: string; num: string; label: string; desc: string }[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div>
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
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.background = arko.subtle; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`;
              (e.currentTarget as HTMLElement).style.outlineOffset = "-2px";
            }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}
          >
            <span
              style={{
                ...mono, fontSize: 12, fontWeight: 700,
                color: active === i ? arko.primary : "var(--text-secondary)",
                display: "block", marginBottom: 6, lineHeight: 1, letterSpacing: "0.14em",
              }}
            >
              {s.num}
            </span>
            <span
              className="hidden md:block"
              style={{
                fontFamily: serif, fontSize: 15, fontWeight: 600,
                color: active === i ? "var(--text-primary)" : "var(--text-secondary)",
                lineHeight: 1.3, display: "block",
              }}
            >
              {s.label.split(" · ")[0]}
            </span>
          </button>
        ))}
      </div>
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
                style={{ width: "100%", display: "block", filter: "drop-shadow(0 14px 40px rgba(0,0,0,0.18))" }}
              />
            </motion.div>
            <div className="md:col-span-5">
              <span style={{ ...mono, fontSize: 11, color: arko.dark, display: "block", marginBottom: 14, letterSpacing: "0.14em" }}>
                Step {steps[active].num} · of {String(steps.length).padStart(2, "0")}
              </span>
              <p style={{
                fontFamily: serif, fontStyle: "italic",
                fontSize: "clamp(22px, 2.6vw, 30px)",
                color: "var(--text-primary)", lineHeight: 1.3,
                marginBottom: 18, letterSpacing: "-0.01em",
              }}>
                {steps[active].label}
              </p>
              <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8 }}>
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
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function ArkoCase() {
  const adjacent = getAdjacentProjects("arko");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }} className="pt-14"
    >
      {/* Top mask for fixed nav */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 59,
        background: "var(--bg-primary)", zIndex: 45,
        pointerEvents: "none",
      }} />

      {/* Scroll progress */}
      <div style={{
        position: "fixed", top: 56, left: 0, right: 0, height: 2,
        background: "var(--bg-primary)", zIndex: 49,
      }}>
        <motion.div style={{
          height: "100%", background: arko.primary,
          scaleX, transformOrigin: "left", opacity: 0.85,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          00 · HERO — editorial monograph cover
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-primary)",
      }}>
        {/* Top bar — back link + meta strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05, duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            width: "100%",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: "clamp(20px, 2.4vw, 32px)",
            flexWrap: "wrap", gap: 16,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 16,
          }}
        >
          <Link to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              ...mono, fontSize: 11, letterSpacing: "0.22em",
              color: "var(--text-secondary)", textDecoration: "none",
              transitionProperty: "color", transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = arko.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M14 9H3M6 5L2 9l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Index
          </Link>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
            {["Product Design", "B2B SaaS", "Web + iOS", "AR · Spatial"].map((tag) => (
              <span key={tag} style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero body — grid: oversized title, meta column, media */}
        <div
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{
            flex: 1, width: "100%",
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            paddingTop: "clamp(40px, 5vw, 72px)",
            paddingBottom: "clamp(32px, 4vw, 56px)",
          }}
        >
          {/* Monogram + study number */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}
            style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 28, flexWrap: "wrap", gap: 12,
            }}
          >
            <span style={{ ...mono, fontSize: 11, color: arko.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
              Case Study · 01
            </span>
            <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
              2025 · Monograph
            </span>
          </motion.div>

          {/* Display title */}
          <div style={{ overflow: "hidden", marginBottom: "clamp(20px, 2.4vw, 32px)" }}>
            <motion.h1
              initial={{ y: "110%" }} animate={{ y: 0 }}
              transition={{ delay: 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(96px, 16vw, 240px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.06em", lineHeight: 0.85,
                margin: 0,
              }}>
              Arko<span style={{ color: arko.primary, fontStyle: "italic" }}>.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            style={{
              fontFamily: serif, fontStyle: "italic",
              fontSize: "clamp(20px, 2vw, 28px)",
              color: "var(--text-secondary)",
              lineHeight: 1.4, maxWidth: 720,
              marginBottom: "clamp(36px, 4vw, 56px)",
              letterSpacing: "-0.01em",
            }}
          >
            A spatial design platform that turns client approvals from a week of emails into a single tap —
            <span style={{ color: arko.primary }}> scan, design, approve, </span>
            in one closed loop.
          </motion.p>

          {/* Hero media — clean, centered, no tilt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", width: "100%", maxWidth: 1040, margin: "0 auto 36px" }}
          >
            <LaptopMockup src="/arko/web-1.png" alt="Arko designer dashboard" />
          </motion.div>

          {/* Meta row — role, platform, timeline, tools */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.6 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {([
              { label: "Role",     value: "Product Designer" },
              { label: "Platform", value: "Web + iOS" },
              { label: "Timeline", value: "14 weeks" },
              { label: "Tools",    value: "Figma · Framer" },
            ] as { label: string; value: string }[]).map((m, i, arr) => (
              <div key={m.label} style={{
                padding: "18px 20px",
                borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em", marginBottom: 6 }}>
                  {m.label}
                </p>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
                  {m.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          01 · PREMISE — the whole thesis
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="01" title="Premise" phase="Weeks 01 · 02" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <Reveal className="md:col-span-7">
              <h2 style={{ ...t.h1Display, marginBottom: 28 }}>
                One loop.{" "}
                <em style={{ fontStyle: "italic", color: arko.primary }}>
                  Zero back-and-forth.
                </em>
              </h2>
              <p style={{ ...t.bodyLg, marginBottom: 20 }}>
                Arko is a B2B platform that turns spatial design approvals from a week of emails
                into a single tap. It replaces the three-tool handoff that every interior firm lives with
                — design software, PDF exports, and on-site walkthroughs — with a single continuous product.
              </p>
              <p style={{ ...t.body }}>
                The thesis is not "a better design tool." It is a better communication tool that
                happens to be powered by design.
              </p>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.1}>
              <div style={{
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
                padding: "clamp(28px, 3vw, 44px)",
              }}>
                <p style={{ ...mono, fontSize: 10, color: arko.dark, letterSpacing: "0.22em", marginBottom: 20 }}>
                  The number that started it
                </p>
                <p style={{
                  fontFamily: serif, fontWeight: 700,
                  fontSize: "clamp(88px, 11vw, 160px)",
                  color: arko.primary, letterSpacing: "-0.05em",
                  lineHeight: 0.9, marginBottom: 18,
                }}>
                  6–8
                </p>
                <p style={{ ...mono, fontSize: 11, color: "var(--text-primary)", letterSpacing: "0.18em", fontWeight: 600, marginBottom: 14 }}>
                  Hours lost / project
                </p>
                <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Average time interior firms burn on revision cycles caused by one root problem:
                  clients can't visualize a space from a floor plan. Every closed loop in this project
                  traces back to this number.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          02 · CONTEXT — the broken workflow
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="02" title="Context" phase="Weeks 02 · 03" />
          </Reveal>

          <Reveal>
            <h2 style={{ ...t.h2Section, maxWidth: 820, marginBottom: 20 }}>
              Clients can't visualize a space from a floor plan.{" "}
              <em style={{ fontStyle: "italic", color: arko.primary }}>That gap costs real money.</em>
            </h2>
            <p style={{ ...t.body, maxWidth: 720, marginBottom: 48 }}>
              Design firms lose hours per project on revision cycles caused by a single root problem.
              Clients say yes in the meeting and change their mind when they see it built —
              because a verbal yes isn't binding when the space actually gets rendered.
            </p>
          </Reveal>

          {/* Before-state workflow diagram */}
          <Reveal delay={0.08}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span aria-hidden style={{ width: 3, height: 14, background: arko.primary, display: "inline-block" }} />
                <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", fontWeight: 600 }}>
                  Before state · three tools, no connection
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
                  alignItems: "stretch",
                  gap: 10,
                  padding: "22px 20px",
                  border: "0.75px solid var(--border)",
                  background: "var(--bg-elevated)",
                }}
              >
                {([
                  { label: "Design",      tool: "AutoCAD",      note: "the pro's canvas" },
                  { label: "Handoff",     tool: "PDF · email",  note: "flattened, static" },
                  { label: "Walkthrough", tool: "on-site",      note: "delayed, verbal" },
                  { label: "Result",      tool: "Revision",     note: "6–8 hrs, every time", bad: true },
                ] as { label: string; tool: string; note: string; bad?: boolean }[]).map((b, i, arr) => (
                  <Fragment key={b.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: 0.12 + i * 0.08, duration: 0.5 }}
                      style={{
                        display: "flex", flexDirection: "column", justifyContent: "space-between",
                        gap: 10, padding: "16px 14px",
                        border: "0.75px dashed var(--border)",
                        background: b.bad ? arko.subtle : "transparent",
                        minWidth: 0,
                      }}
                    >
                      <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                        {b.label}
                      </span>
                      <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(18px, 1.6vw, 22px)", color: b.bad ? arko.dark : "var(--text-primary)", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
                        {b.tool}
                      </p>
                      <span style={{ fontFamily: sans, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {b.note}
                      </span>
                    </motion.div>
                    {i < arr.length - 1 && (
                      <motion.svg
                        aria-hidden
                        width="28" height="16" viewBox="0 0 28 16" fill="none"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                        style={{ alignSelf: "center", flexShrink: 0 }}
                      >
                        <path
                          d="M1 8h20M18 3l5 5-5 5"
                          stroke={i === arr.length - 2 ? arko.primary : "var(--text-muted)"}
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray={i === arr.length - 2 ? "0" : "3 3"}
                          opacity={i === arr.length - 2 ? 0.85 : 0.55}
                        />
                      </motion.svg>
                    )}
                  </Fragment>
                ))}
              </div>
              <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em", marginTop: 12, textAlign: "right" }}>
                Fig. 02.1 · the broken loop — dashed lines mark every missing handoff
              </p>
            </div>
          </Reveal>

          {/* Anatomy of a revision — inline editorial list */}
          <Reveal delay={0.12}>
            <div style={{
              border: "1px solid var(--border)",
              background: "var(--bg-elevated)",
            }}>
              <div style={{
                padding: "22px 28px",
                borderBottom: "1px solid var(--border)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", fontWeight: 600 }}>
                  Anatomy of a revision
                </p>
                <Clock size={18} color={arko.primary} weight="duotone" />
              </div>
              <div>
                {([
                  { step: "01", label: "Initial meeting — designer presents floor plan + mood boards", time: "~60 min" },
                  { step: "02", label: "Verbal 'yes' — client signs off without seeing it built", time: "0 min" },
                  { step: "03", label: "Build / render — designer produces final visual", time: "2–3 days" },
                  { step: "04", label: "Client sees it — gap between expected and actual surfaces", time: "critical" },
                  { step: "05", label: "Revision cycle — back and forth until approved", time: "6–8 hrs lost", loss: true },
                ] as { step: string; label: string; time: string; loss?: boolean }[]).map((r, i, arr) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 24,
                    padding: "18px 28px",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--border-light)" : "none",
                    background: r.loss ? arko.subtle : "transparent",
                  }}>
                    <span style={{
                      ...mono, fontSize: 11, color: r.loss ? arko.primary : "var(--text-muted)",
                      letterSpacing: "0.16em", fontWeight: r.loss ? 700 : 500, flexShrink: 0, width: 32,
                    }}>{r.step}</span>
                    <span style={{
                      flex: 1, fontFamily: sans, fontSize: 15,
                      color: r.loss ? "var(--text-primary)" : "var(--text-secondary)",
                      fontWeight: r.loss ? 600 : 400, lineHeight: 1.5,
                    }}>{r.label}</span>
                    <span style={{
                      ...mono, fontSize: 11, color: r.loss ? arko.primary : "var(--text-muted)",
                      fontWeight: r.loss ? 700 : 400, letterSpacing: "0.14em", flexShrink: 0,
                    }}>{r.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          03 · USERS — two contexts
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="03" title="Users & Research" phase="Weeks 03 · 04" />
          </Reveal>

          <Reveal>
            <h2 style={{ ...t.h2Section, maxWidth: 720, marginBottom: 56 }}>
              One platform.{" "}
              <em style={{ fontStyle: "italic", color: arko.primary }}>Two different contexts</em>{" "}
              of use.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <UserTabs />
          </Reveal>

          {/* Research depth */}
          <Reveal delay={0.15}>
            <div style={{ marginTop: 72 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span aria-hidden style={{ width: 3, height: 14, background: arko.primary, display: "inline-block" }} />
                <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", fontWeight: 600 }}>
                  Research depth · how we got here
                </p>
              </div>
              <div
                className="grid grid-cols-2 md:grid-cols-4"
                style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}
              >
                {([
                  { big: 12, unit: "Designer interviews",    sub: "Leads across 4 firms, 60–90 min each" },
                  { big: 8,  unit: "Client sessions",        sub: "First-time homeowners + repeat developers" },
                  { big: 3,  unit: "Walkthroughs shadowed",  sub: "Observed yes-then-no moments live" },
                  { big: 47, unit: "Revision emails parsed", sub: "6-month thread audit across 2 firms" },
                ] as { big: number; unit: string; sub: string }[]).map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: "32px 24px",
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <p style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(44px, 4.4vw, 56px)",
                      color: arko.primary,
                      letterSpacing: "-0.035em", lineHeight: 1, marginBottom: 14,
                    }}>
                      <CountUp value={s.big} />
                    </p>
                    <p style={{ ...mono, fontSize: 11, color: "var(--text-primary)", letterSpacing: "0.16em", marginBottom: 8, fontWeight: 600 }}>
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
      </section>

      {/* ══════════════════════════════════════════════════════════════
          04 · INSIGHT — full bleed dark
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--text-primary)", padding: "clamp(88px, 12vw, 140px) 0", position: "relative", overflow: "hidden" }}>
        <Reveal y={16}>
          <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
              <Quotes size={26} color={arko.light} opacity={0.6} />
              <p style={{ ...mono, fontSize: 11, color: arko.light, letterSpacing: "0.22em", fontWeight: 600 }}>
                04 / 10 · Key insight
              </p>
            </div>
            <blockquote style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(32px, 4.6vw, 60px)",
              color: "var(--bg-primary)", letterSpacing: "-0.03em",
              lineHeight: 1.15, quotes: "none", marginBottom: 40, maxWidth: 960,
            }}>
              Clients don't reject designs because they have bad taste.{" "}
              <em style={{ fontStyle: "italic", color: arko.light }}>
                They reject them because they couldn't see it clearly enough to say yes the first time.
              </em>
            </blockquote>
            <p style={{ fontFamily: sans, fontSize: 17, color: "rgba(250,250,250,0.72)", lineHeight: 1.75, maxWidth: 620 }}>
              This reframed the entire design direction. The goal was never to build a better
              design tool — it was to build a better <em>communication</em> tool that
              happened to be powered by design.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          05 · THE LOOP — full-bleed olive transition slide
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(72px, 9vw, 120px) 0",
        backgroundColor: arko.primary,
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <span aria-hidden style={{ width: 20, height: 1, background: "rgba(250,250,250,0.7)", display: "inline-block" }} />
              <p style={{ ...mono, fontSize: 11, color: "rgba(250,250,250,0.85)", letterSpacing: "0.22em", fontWeight: 600 }}>
                05 / 10 · The product
              </p>
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(40px, 6.2vw, 84px)",
              color: "#FAFAFA", letterSpacing: "-0.04em",
              lineHeight: 1.05, marginBottom: 20, maxWidth: 980,
            }}>
              Three products.{" "}
              <em style={{ fontStyle: "italic", color: "rgba(250,250,250,0.8)" }}>One loop.</em>
            </h2>
            <p style={{
              fontFamily: sans, fontSize: "clamp(16px, 1.3vw, 19px)",
              color: "rgba(250,250,250,0.82)", lineHeight: 1.7, maxWidth: 640, marginBottom: 56,
            }}>
              A web workspace for the pro, an iPhone scanner for the space,
              a client view for the approval. Each is a product in its own right —
              together they close the loop that every other tool leaves open.
            </p>
          </Reveal>

          {/* The three moves */}
          <Reveal delay={0.1}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr auto 1fr",
                alignItems: "stretch",
                gap: 20,
              }}
            >
              {([
                { Icon: Aperture,    step: "01", title: "Scan",    sub: "AR spatial capture on iPhone. Floor planes detected in under 3 min." },
                { Icon: Cube,        step: "02", title: "Design",  sub: "Drop furniture into the live scan. Swap finishes, adjust scale, place pins." },
                { Icon: CheckCircle, step: "03", title: "Approve", sub: "Share a link. Client sees the room, taps a comment or approves." },
              ] as { Icon: typeof Aperture; step: string; title: string; sub: string }[]).map((n, i) => (
                <Fragment key={n.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.55 }}
                    style={{
                      display: "flex", flexDirection: "column", gap: 16, minWidth: 0,
                      padding: "28px 26px",
                      background: "rgba(250,250,250,0.10)",
                      border: "1px solid rgba(250,250,250,0.18)",
                      backdropFilter: "blur(4px)",
                      WebkitBackdropFilter: "blur(4px)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <n.Icon size={26} color="#FAFAFA" weight="duotone" />
                      <span style={{ ...mono, fontSize: 10, color: "rgba(250,250,250,0.7)", letterSpacing: "0.22em" }}>
                        {n.step}
                      </span>
                    </div>
                    <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(28px, 2.6vw, 34px)", color: "#FAFAFA", letterSpacing: "-0.025em", lineHeight: 1 }}>
                      {n.title}
                    </p>
                    <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(250,250,250,0.82)", lineHeight: 1.65 }}>
                      {n.sub}
                    </p>
                  </motion.div>
                  {i < 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                      style={{ alignSelf: "center", flexShrink: 0 }}
                    >
                      <ArrowRight size={24} color="rgba(250,250,250,0.85)" weight="regular" />
                    </motion.div>
                  )}
                </Fragment>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          06 · WORKSPACE — web platform
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="06" title="Workspace · Web" phase="Weeks 05 · 08" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start" style={{ marginBottom: 56 }}>
            <Reveal className="md:col-span-7">
              <h2 style={{ ...t.h2Section, marginBottom: 22 }}>
                A professional workspace.{" "}
                <em style={{ fontStyle: "italic", color: arko.primary }}>Dense, powerful, built for daily use.</em>
              </h2>
              <p style={{ ...t.body }}>
                The designer interface doesn't compromise. Sidebar navigation, project management,
                team activity, and AR editing tools — all accessible from a single workspace a design
                lead would open on day one and never want to leave.
              </p>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.08}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border)" }}>
                {[
                  "Dashboard with active projects, team stats, approvals",
                  "Project detail with rooms, progress, activity log",
                  "Pinned client comments in spatial context",
                  "One-click handoff to mobile AR editor",
                ].map((f, j) => (
                  <li key={j} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 0",
                    borderBottom: "1px solid var(--border-light)",
                  }}>
                    <CheckCircle size={16} color={arko.primary} weight="regular" />
                    <span style={{ fontFamily: sans, fontSize: 14, color: "var(--text-primary)", lineHeight: 1.5 }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <WebGallery screens={[
              { src: "/arko/web-3.png", label: "Fig. 06.1 · Dashboard · active projects, team stats, pending approvals" },
              { src: "/arko/web-4.png", label: "Fig. 06.2 · All Projects · filter by status, search, quick access" },
              { src: "/arko/web-5.png", label: "Fig. 06.3 · Project Detail · rooms, progress bars, live activity log" },
              { src: "/arko/web-6.png", label: "Fig. 06.4 · Comments view · client feedback pinned in context" },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          07 · CAPTURE — scan flow + AR editor
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="07" title="Capture · iOS" phase="Weeks 06 · 09" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start" style={{ marginBottom: 72 }}>
            <Reveal>
              <h2 style={{ ...t.h2Section, marginBottom: 22 }}>
                From empty room to{" "}
                <em style={{ fontStyle: "italic", color: arko.primary }}>furnished space</em>{" "}
                in minutes.
              </h2>
              <p style={{ ...t.body, marginBottom: 36 }}>
                A pre-scan checklist ensures quality spatial capture. The scanner detects
                floor planes, measures spatial accuracy, and confirms the data before the
                AR editor opens.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  borderTop: "1px solid var(--border)",
                  borderLeft: "1px solid var(--border)",
                }}
              >
                {([
                  { pre: "<", num: 3,  suf: " min",   unit: "Avg scan time",      Icon: Clock },
                  { pre: "",  num: 92, suf: "%",      unit: "Spatial accuracy",   Icon: Aperture },
                  { pre: "",  num: 4,  suf: " steps", unit: "Pre-scan checklist", Icon: CheckCircle },
                ] as { pre: string; num: number; suf: string; unit: string; Icon: typeof Clock }[]).map((s, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "22px 18px",
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                      background: "var(--bg-elevated)",
                    }}
                  >
                    <s.Icon size={16} color={arko.primary} weight="duotone" />
                    <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(26px, 2.4vw, 30px)", color: "var(--text-primary)", letterSpacing: "-0.025em", lineHeight: 1, marginTop: 12, marginBottom: 10 }}>
                      <CountUp value={s.num} prefix={s.pre} suffix={s.suf} />
                    </p>
                    <p style={{ ...mono, fontSize: 10, color: "var(--text-secondary)", letterSpacing: "0.16em" }}>{s.unit}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{
                padding: "28px 20px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
              }}>
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
          <Reveal>
            <div style={{ marginBottom: 40, maxWidth: 720 }}>
              <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", marginBottom: 14, fontWeight: 600 }}>
                AR room editor
              </p>
              <h3 style={{ ...t.h3Lede }}>
                Canvas first, tools at the edges — place, scale, swap, no modals.
              </h3>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ArEditorStepper steps={[
              {
                src: "/arko/phone-7.png", num: "01",
                label: "Room type breadcrumb navigation",
                desc: "Navigate between room types without losing context. The full path stays visible at all times; every step in the hierarchy is one tap to reverse.",
              },
              {
                src: "/arko/phone-8.png", num: "02",
                label: "Furniture library · collapsible sidebar",
                desc: "The library collapses when you need the canvas. One tap to open, one tap to confirm. The space stays the focus, not the tool.",
              },
              {
                src: "/arko/phone-10.png", num: "03",
                label: "Item selected · Properties panel",
                desc: "Tap any object to reveal its controls inline. Scale, rotate, swap materials; no modal interrupts the flow.",
              },
              {
                src: "/arko/phone-12.png", num: "04",
                label: "Preview mode · Send to Client",
                desc: "Strip away every tool and see exactly what the client will see. One tap to share. The revision loop, closed.",
              },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          08 · APPROVAL — full-bleed olive client surface
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: SECTION_PAD,
        backgroundColor: arko.dark,
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
              <div style={{
                display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap",
                paddingBottom: 14,
              }}>
                <span style={{ ...mono, fontSize: 12, color: "#FAFAFA", letterSpacing: "0.22em", fontWeight: 700 }}>
                  08 <span style={{ color: "rgba(250,250,250,0.55)", fontWeight: 400 }}>/ 10</span>
                </span>
                <span style={{ ...mono, fontSize: 12, color: "#FAFAFA", letterSpacing: "0.22em", fontWeight: 600 }}>
                  Approval · Client
                </span>
                <span style={{ ...mono, fontSize: 11, color: "rgba(250,250,250,0.65)", letterSpacing: "0.2em", marginLeft: "auto" }}>
                  Weeks 09 · 11
                </span>
              </div>
              <div style={{ height: 1, background: "rgba(250,250,250,0.55)", transformOrigin: "left" }} />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <Reveal className="md:col-span-7">
              <h2 style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(30px, 4.2vw, 54px)",
                color: "#FAFAFA", letterSpacing: "-0.035em",
                lineHeight: 1.1, marginBottom: 28,
              }}>
                No login. No jargon.{" "}
                <em style={{ fontStyle: "italic", color: arko.light }}>
                  Just the room, a comment, and an approve.
                </em>
              </h2>
              <p style={{
                fontFamily: sans, fontSize: 17,
                color: "rgba(250,250,250,0.82)", lineHeight: 1.8, marginBottom: 36, maxWidth: 580,
              }}>
                The client opens a link, sees their space in AR, leaves pinned
                spatial feedback, and approves — without downloading an app or creating
                an account. When they approve, the designer gets a notification and a
                timestamped PDF that closes the loop.
              </p>

              <div style={{
                display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                borderTop: "1px solid rgba(250,250,250,0.25)",
                borderLeft: "1px solid rgba(250,250,250,0.25)",
                maxWidth: 520,
              }}>
                {[
                  { k: "01", v: "Opens link · no account" },
                  { k: "02", v: "Walks through space in AR" },
                  { k: "03", v: "Pins spatial comments" },
                  { k: "04", v: "One-tap approval" },
                ].map((item) => (
                  <div key={item.k} style={{
                    padding: "18px 18px",
                    borderRight: "1px solid rgba(250,250,250,0.25)",
                    borderBottom: "1px solid rgba(250,250,250,0.25)",
                  }}>
                    <span style={{ ...mono, fontSize: 11, color: arko.light, letterSpacing: "0.22em", display: "block", marginBottom: 6, fontWeight: 700 }}>
                      {item.k}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 14, color: "#FAFAFA", lineHeight: 1.5 }}>
                      {item.v}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.1}>
              <div style={{
                padding: "28px 20px",
                background: "rgba(250,250,250,0.06)",
                border: "1px solid rgba(250,250,250,0.18)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}>
                <PhoneCarousel slides={[
                  { src: "/arko/phone-13.png", label: "01 / 04 · Client landing" },
                  { src: "/arko/phone-14.png", label: "02 / 04 · Room view + comments" },
                  { src: "/arko/phone-15.png", label: "03 / 04 · Pin a comment" },
                  { src: "/arko/phone-16.png", label: "04 / 04 · Design approved" },
                ]} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          09 · DECISIONS
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="09" title="Design Decisions" phase="Weeks 10 · 12" />
          </Reveal>

          <Reveal>
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <h2 style={{ ...t.h2Section }}>
                <em style={{ fontStyle: "italic", color: arko.primary }}>Four decisions</em>{" "}
                that defined the product.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <DecisionStepper />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          10 · OUTCOMES
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="10" title="Outcomes & Reflection" phase="Weeks 13 · 14" />
          </Reveal>

          <Reveal>
            <h2 style={{ ...t.h2Section, marginBottom: 22, maxWidth: 820 }}>
              Three workflows. One platform.{" "}
              <em style={{ fontStyle: "italic", color: arko.primary }}>No compromise</em>{" "}
              on either user.
            </h2>
            <p style={{ ...t.body, maxWidth: 720, marginBottom: 56 }}>
              Arko consolidates space scanning, interior design, and client approval into one
              platform. The result is a product that serves two very different users without
              compromising either experience.
            </p>
          </Reveal>

          {/* Headline stats */}
          <Reveal delay={0.08}>
            <div
              className="grid grid-cols-2 lg:grid-cols-4"
              style={{
                borderTop: "1px solid var(--border)",
                borderLeft: "1px solid var(--border)",
                marginBottom: 56,
              }}
            >
              {([
                { label: "Approval time",    num: 45,   decimals: 0, prefix: "",  unit: "min", delta: "−92%",    status: "down" as const },
                { label: "Revision cycles",  num: 1.2,  decimals: 1, prefix: "",  unit: "avg", delta: "−72%",    status: "down" as const },
                { label: "Spatial accuracy", num: 92,   decimals: 0, prefix: "",  unit: "%",   delta: "target met", status: "flat" as const },
                { label: "Client NPS",       num: 38,   decimals: 0, prefix: "+", unit: "pts", delta: "+24 pts", status: "up"   as const },
              ] as { label: string; num: number; decimals: number; prefix: string; unit: string; delta: string; status: "up" | "down" | "flat" }[]).map((k, i) => (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "32px 24px",
                    borderRight: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                  }}
                >
                  <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.18em", marginBottom: 14, fontWeight: 600 }}>
                    {k.label}
                  </p>
                  <p style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(44px, 4.8vw, 58px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.035em", lineHeight: 1, marginBottom: 10,
                  }}>
                    <CountUp value={k.num} decimals={k.decimals} prefix={k.prefix} />
                    <span style={{
                      fontFamily: sans, fontSize: 16, fontWeight: 500,
                      color: "var(--text-secondary)", marginLeft: 6, letterSpacing: 0,
                    }}>{k.unit}</span>
                  </p>
                  <span style={{
                    fontFamily: sans, fontSize: 13, fontWeight: 500,
                    color: arko.primary, letterSpacing: "0.02em",
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

          {/* Before → after comparison */}
          <Reveal delay={0.1}>
            <div style={{ marginBottom: 72 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span aria-hidden style={{ width: 3, height: 14, background: arko.primary, display: "inline-block" }} />
                <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", fontWeight: 600 }}>
                  Before → after · workflow modeling
                </p>
              </div>
              <div
                className="grid grid-cols-2 lg:grid-cols-4"
                style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}
              >
                {([
                  { before: "6–8 hrs",   after: "~45 min",     unit: "Per-project revisions",   Icon: Clock },
                  { before: "3 tools",   after: "1 platform",  unit: "Scan → design → approve", Icon: ArrowsHorizontal },
                  { before: "4+ rounds", after: "1.6 rounds",  unit: "Avg. approval cycles",    Icon: CheckCircle },
                  { before: "verbal",    after: "timestamped", unit: "Client sign-off, logged", Icon: PushPin },
                ] as { before: string; after: string; unit: string; Icon: typeof Clock }[]).map((s, i) => (
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
                      <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.18em", textDecoration: "line-through", textDecorationColor: "var(--text-muted)" }}>
                        {s.before}
                      </span>
                      <s.Icon size={18} color={arko.dark} weight="regular" />
                    </div>
                    <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(28px, 2.8vw, 38px)", color: "var(--text-primary)", letterSpacing: "-0.025em", lineHeight: 1, marginBottom: 12 }}>
                      {s.after}
                    </p>
                    <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.16em", fontWeight: 500 }}>
                      {s.unit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Reflection */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 0, marginBottom: 64, borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
            {([
              {
                label: "What I'd build next",
                body: "An analytics layer for designers — showing which rooms clients spend the most time reviewing, which furniture items get swapped most often, and where comments cluster spatially. Turning client behavior into actionable design intelligence.",
                Icon: LightbulbFilament,
              },
              {
                label: "What this reinforced",
                body: "The best B2B products are the ones that make the professional look good in front of their client. Every design decision in Arko was made with that in mind.",
                Icon: Sparkle,
              },
            ] as { label: string; body: string; Icon: typeof LightbulbFilament }[]).map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "40px 32px",
                    borderRight: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <c.Icon size={22} color={arko.primary} weight="regular" />
                    <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", fontWeight: 600 }}>
                      {c.label}
                    </p>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8 }}>{c.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Closing line */}
          <Reveal>
            <div style={{ paddingTop: 40, borderTop: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em", marginBottom: 22 }}>
                End · Arko case study
              </p>
              <p style={{
                fontFamily: serif, fontStyle: "italic",
                fontSize: "clamp(24px, 2.6vw, 32px)",
                color: "var(--text-primary)", letterSpacing: "-0.01em",
                lineHeight: 1.35, maxWidth: 720, margin: "0 auto",
              }}>
                From architecture to digital product — the loop, finally closed.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          NAVIGATION — prev / next
      ══════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-wrap justify-between items-center gap-6"
          style={{ paddingTop: 40, paddingBottom: 72, borderTop: "1px solid var(--border)" }}>
          {adjacent.prev ? (
            <Link to={`/work/${adjacent.prev.slug}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, maxWidth: "45%" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M13 8H3M7 4L3 8l4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p style={{ ...mono, fontSize: 11, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.18em" }}>Previous</p>
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
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, maxWidth: "45%", marginLeft: "auto" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ ...mono, fontSize: 11, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.18em" }}>Next</p>
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
