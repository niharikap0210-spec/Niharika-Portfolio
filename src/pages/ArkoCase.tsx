import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ClockIcon as Clock, ArrowsHorizontalIcon as ArrowsHorizontal, WarningCircleIcon as WarningCircle, QuotesIcon as Quotes, DesktopIcon as Desktop, DeviceMobileCameraIcon as DeviceMobileCamera, ApertureIcon as Aperture, LightbulbFilamentIcon as LightbulbFilament, ArrowBendDownRightIcon as ArrowBendDownRight } from "@phosphor-icons/react";
import SectionMarker from "../components/SectionMarker";
import HandDrawnSketch from "../components/HandDrawnSketch";
import { getAdjacentProjects } from "../data/projects";

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
              border: i === active ? "2px solid var(--accent)" : "1px solid var(--border)",
              borderRadius: 4,
              opacity: i === active ? 1 : 0.55,
              transitionProperty: "opacity, border-color", transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.opacity = "0.55"; }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <img src={s.src} alt={s.label} style={{ width: "100%", display: "block" }} />
          </button>
        ))}
      </div>

      {/* Main image + caption */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ marginBottom: 12 }}>
            <BrowserMockup src={screens[active].src} alt={screens[active].label} />
          </motion.div>
        </AnimatePresence>
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
      label: "Primary — The Designer",
      heading: "The Design Firm",
      body: "A project lead managing 4–8 active client projects simultaneously. Uses Arko daily to scan spaces, place furniture, adjust finishes, and track project status across the team. Needs speed, precision, and a clear handoff mechanism.",
      img: "/arko/web-3.png",
      imgCaption: "Designer dashboard — daily workspace",
      sketch: "floorPlan" as const,
      annotation: "their daily canvas",
      isPhone: false,
    },
    {
      label: "Secondary — The Client",
      heading: "The Client",
      body: "A homeowner or property developer reviewing a design remotely. Not design-literate. Needs to understand the space instantly, leave specific feedback, and approve with confidence — without downloading an app or creating an account.",
      img: "/arko/phone-13.png",
      imgCaption: "Client landing — no login, no friction",
      sketch: "wireframe" as const,
      annotation: "what they see",
      isPhone: true,
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
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <span style={{ ...mono, fontSize: 9, color: tab === i ? "var(--text-primary)" : "var(--text-muted)", display: "block", marginBottom: 4 }}>{t.label}</span>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, color: tab === i ? "var(--text-primary)" : "var(--text-secondary)" }}>{t.heading}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 24 }}>{tabs[tab].body}</p>
              <HandDrawnSketch type={tabs[tab].sketch}
                width={tabs[tab].sketch === "wireframe" ? 90 : 160}
                height={tabs[tab].sketch === "wireframe" ? 116 : 100}
                annotation={tabs[tab].annotation} delay={0.2} />
            </div>
            <div>
              {tabs[tab].isPhone ? (
                <img src={tabs[tab].img} alt={tabs[tab].heading}
                  style={{ width: "clamp(160px, 65%, 240px)", display: "block", margin: "0 auto", filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.22))" }} />
              ) : (
                <BrowserMockup src={tabs[tab].img} alt={tabs[tab].heading} />
              )}
              <p style={{ ...caption, marginTop: 10 }}>{tabs[tab].imgCaption}</p>
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
      body: "The designer interface is dense, powerful, and built for daily professional use — sidebar navigation, project management, team activity, AR editing tools. The client interface strips everything away: no login, no nav, no jargon. Just the room, a comment button, and an approve button. The same product — two completely different contexts of use.",
      img: "/arko/web-5.png",
      landscape: false,
    },
    {
      num: "02", short: "AR editor for\nprofessionals",
      title: "AR editor built for professionals, not consumers",
      body: "The AR room editor puts the canvas first and keeps all tools at the edges — collapsible Furniture Library on the left, Properties panel on the right, minimal toolbar at the bottom. The designer stays focused on the space, not the interface. Every element category is structured as progressive disclosure so the library never overwhelms.",
      img: "/arko/phone-10.png",
      landscape: true,
    },
    {
      num: "03", short: "Approval as the\ncore value",
      title: "The approval flow as the product's core value",
      body: "Most design tools stop at visualization. Arko makes client sign-off a first-class feature — the Share modal, client walkthrough, comment pinning, and one-tap approval are designed as a single seamless flow. When a client approves, the designer gets an instant notification and a timestamped PDF summary. This closes the loop that every other tool leaves open.",
      img: "/arko/phone-16.png",
      landscape: false,
    },
    {
      num: "04", short: "Empty states as\nonboarding",
      title: "Empty states as onboarding",
      body: "Both the dashboard and project detail have fully designed empty states that guide the user to their first action rather than leaving them stranded. For a B2B product where adoption depends on the first session, this matters. A stranded user is a churned user — empty states are a product feature, not an afterthought.",
      img: "/arko/web-3.png",
      landscape: false,
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
              background: active === i ? "var(--bg-elevated)" : "var(--bg-primary)",
              border: "none",
              borderBottom: `2px solid ${active === i ? "var(--text-primary)" : "transparent"}`,
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
              cursor: "pointer", textAlign: "left",
              transitionProperty: "transform, opacity", transitionDuration: "150ms",
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.background = "var(--bg-primary)"; }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: active === i ? "var(--text-primary)" : "var(--border)", display: "block", lineHeight: 1, marginBottom: 8 }}>
              {d.num}
            </span>
            <span style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: active === i ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.3, display: "block", whiteSpace: "pre-line" }}>
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
              <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(20px, 2.5vw, 28px)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 18 }}>
                {decisions[active].title}
              </h3>
              <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.85 }}>
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
   CURVED ARROW — hand-drawn style connecting annotation
══════════════════════════════════════════════════════════════════ */
function CurvedArrow({ label, rotate = 0, className = "" }: { label?: string; rotate?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <div ref={ref} className={`inline-flex flex-col items-center pointer-events-none select-none ${className}`} aria-hidden>
      <svg width="96" height="80" viewBox="0 0 96 80" fill="none" style={{ transform: `rotate(${rotate}deg)`, overflow: "visible" }}>
        <motion.path
          d="M 16 8 C 14 44, 72 44, 80 72"
          stroke="var(--text-secondary)" strokeWidth="2.2" strokeLinecap="round" opacity={0.55}
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.55, transition: { pathLength: { duration: 1.2, ease: "easeInOut" }, opacity: { duration: 0.3 } } } }}
          initial="hidden" animate={inView ? "visible" : "hidden"}
        />
        <motion.path
          d="M 83 63 L 80 72 L 73 65"
          stroke="var(--text-secondary)" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" opacity={0.55}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.55 } : { opacity: 0 }} transition={{ delay: 1.0, duration: 0.3 }}
        />
      </svg>
      {label && (
        <motion.span
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.5, duration: 0.5 }}
          style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: "var(--text-secondary)", opacity: 0.7, marginTop: -4, lineHeight: 1.3 }}>
          {label}
        </motion.span>
      )}
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
        position: "fixed", top: 56, left: 0, right: 0, height: 3,
        background: "var(--bg-primary)", zIndex: 50,
      }}>
        <motion.div style={{
          height: "100%", background: "var(--text-primary)",
          scaleX, transformOrigin: "left", opacity: 0.75,
        }} />
      </div>

            {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid" style={{ position: "relative", overflow: "hidden" }}>

        {/* Inset border */}
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1.8 }}
          style={{ position: "absolute", inset: 10, border: "0.75px solid var(--construction)", pointerEvents: "none", zIndex: 1 }} />
        {/* Corner TL */}
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1.0 }}
          style={{ position: "absolute", top: 18, left: 18, ...mono, fontSize: 7, color: "var(--construction)", lineHeight: 1.4, pointerEvents: "none", zIndex: 2 }}>
          <div>x: 0.00</div><div>y: 0.00</div>
        </motion.div>
        {/* Corner BR */}
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1.0 }}
          style={{ position: "absolute", bottom: 18, right: 18, ...mono, fontSize: 7, color: "var(--construction)", lineHeight: 1.4, textAlign: "right", pointerEvents: "none", zIndex: 2 }}>
          <div>Sheet 01 / Arko</div><div>Product Design · 2025</div>
        </motion.div>

        {/* Back link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
          style={{ position: "absolute", top: 28, left: "clamp(28px, 5vw, 48px)", zIndex: 10 }}>
          <Link to="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, ...mono, fontSize: 10, color: "var(--text-muted)", textDecoration: "none", transitionProperty: "color", transitionDuration: "150ms" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.5 7h-9M5 3.5L1.5 7 5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Work
          </Link>
        </motion.div>

        {/* Two-column grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-10" style={{
          position: "relative", zIndex: 3,
          paddingTop: "clamp(88px, 11vw, 120px)",
          paddingBottom: "clamp(40px, 5vw, 56px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "center",
        }}>

          {/* Left — text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
              {["Product Design", "B2B SaaS", "Web + iOS", "AR / Spatial"].map((t) => (
                <span key={t} style={{ ...mono, fontSize: 9, color: "var(--text-muted)", border: "1px solid var(--border)", padding: "4px 12px", background: "var(--bg-primary)" }}>
                  {t}
                </span>
              ))}
            </motion.div>

            <div style={{ overflow: "hidden", marginBottom: 24 }}>
              <motion.h1
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ delay: 0.06, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(64px, 9vw, 120px)", color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 0.88 }}>
                Arko
              </motion.h1>
            </div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: sans, fontSize: "clamp(14px, 1.4vw, 16px)", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>
              Spatial design platform for interior design firms — scan spaces in AR,
              design digitally, and get client sign-off without the back-and-forth.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44, duration: 0.6 }}
              className="hidden md:grid"
              style={{ gridTemplateColumns: "1fr 1fr", gap: "12px 32px" }}>
              {([
                { label: "Role",     value: "Product Designer" },
                { label: "Platform", value: "Web + iOS" },
                { label: "Timeline", value: "14 weeks" },
                { label: "Tools",    value: "Figma · Framer · Protopie" },
              ] as { label: string; value: string }[]).map((m) => (
                <div key={m.label}>
                  <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 5 }}>{m.label}</p>
                  <p style={{ fontFamily: sans, fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{m.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — device mockup group */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", paddingLeft: "8%" }}>

            {/* Laptop */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
              whileHover={{ y: -14, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } }}
              style={{ position: "relative", zIndex: 2, filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.18))" }}>
              <LaptopMockup src="/arko/web-1.png" alt="Arko designer dashboard" />
            </motion.div>

            {/* Phone — overlapping left */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "loop", delay: 0.6 }}
              whileHover={{ y: -22, scale: 1.04, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } }}
              style={{ position: "absolute", left: "-4%", bottom: "2%", width: "26%", zIndex: 4, filter: "drop-shadow(0 28px 52px rgba(0,0,0,0.36))" }}>
              <img src="/arko/phone-13.png" alt="Client mobile view" style={{ width: "100%", display: "block" }} />
            </motion.div>

            {/* Annotation */}
            <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1.0 }}
              style={{ position: "absolute", top: -24, right: 0, ...mono, fontSize: 7, color: "var(--construction)", textAlign: "right", pointerEvents: "none" }}>
              Final Design
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile meta */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="flex md:hidden flex-col"
          style={{ position: "relative", zIndex: 3, padding: "0 clamp(24px,6vw,40px) 32px" }}>
          {[
            { label: "Role", value: "Product Designer" },
            { label: "Timeline", value: "14 weeks" },
            { label: "Tools",   value: "Figma · Framer · Protopie" },
          ].map((m, i) => (
            <div key={m.label} style={{
              display: "flex", gap: 16, alignItems: "baseline", padding: "10px 0",
              borderTop: i === 0 ? "0.75px solid var(--border)" : "none",
              borderBottom: "0.75px solid var(--border)",
            }}>
              <span style={{ ...mono, fontSize: 8, color: "var(--text-muted)", minWidth: 64, flexShrink: 0 }}>{m.label}</span>
              <span style={{ fontFamily: sans, fontSize: 12, color: "var(--text-secondary)" }}>{m.value}</span>
            </div>
          ))}
        </motion.div>

      </section>

      {/* ══════════════════════════════════════════════════════════════
          OVERVIEW — blueprint grid-subtle background
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(60px, 8vw, 88px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionMarker label="Overview" letter="A" className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <p style={{ fontFamily: sans, fontSize: "clamp(16px, 1.6vw, 18px)", color: "var(--text-secondary)", lineHeight: 1.85, maxWidth: 660 }} className="md:col-span-9">
                Interior designers spend hours chasing client approvals over email, WhatsApp, and
                in-person walkthroughs that still end in miscommunication. Arko is a B2B SaaS platform
                that lets design teams scan physical spaces in AR, furnish and finish them digitally,
                and share interactive walkthroughs with clients for remote review and one-click approval —
                eliminating the back-and-forth entirely.
              </p>
              <div className="md:col-span-3 flex flex-col items-center gap-1" aria-hidden>
                <HandDrawnSketch type="morphTransition" width={200} height={88}
                  annotation="scan → design → approve" delay={0.3} />
                <CurvedArrow label="the full loop" rotate={10} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="blueprint-grid-subtle" style={{ paddingTop: "clamp(60px, 8vw, 88px)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── THE PROBLEM ─────────────────────────────────────────────── */}
        <Reveal>
          <SectionMarker label="Problem" letter="B" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700, fontSize: "clamp(28px, 4vw, 46px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.15, marginBottom: 20, maxWidth: 600,
          }}>
            Clients can't visualize a space from a floor plan. That gap costs real money.
          </h2>
          <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 600, marginBottom: 16 }}>
            Design firms lose an average of 6–8 hours per project on revision cycles caused by
            one root problem — clients cannot visualize a space from a floor plan or mood board alone.
            They say yes in the meeting and change their mind when they see it built.
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 32, marginBottom: 0, flexWrap: "wrap" }}>
            <HandDrawnSketch type="floorPlan" width={170} height={110}
              annotation="the real cost of 'yes'" delay={0.3} />
            <CurvedArrow label="every revision costs this" rotate={-15} />
          </div>
        </Reveal>

        </div>
      </section>

      {/* Problem stats — grid background */}
      <section className="blueprint-grid-subtle" style={{ padding: "clamp(32px, 4vw, 48px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {([
              { number: "6–8 hrs", label: "Lost per project",  detail: "to revision cycles driven by clients who couldn't visualize the space", icon: <Clock size={20} color="var(--text-muted)" opacity={0.45} /> },
              { number: "3 tools", label: "Disconnected",      detail: "AutoCAD, PDFs, walkthroughs — none talk to each other, none work for clients", icon: <ArrowsHorizontal size={20} color="var(--text-muted)" opacity={0.45} /> },
              { number: "₀ binding", label: "In a verbal yes", detail: "Clients approve in the room and change their minds once they see it built", icon: <WarningCircle size={20} color="var(--text-muted)" opacity={0.45} /> },
            ] as { number: string; label: string; detail: string; icon: React.ReactNode }[]).map((s, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div style={{ padding: "24px", border: "1px solid var(--border)", backgroundColor: "var(--bg-elevated)", height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", color: "var(--accent)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {s.number}
                    </p>
                    {s.icon}
                  </div>
                  <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 12 }}>{s.label}</p>
                  <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ padding: "clamp(60px, 8vw, 88px) 0" }}>

        <Reveal>
          <SectionMarker label="Users" letter="C" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 40px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.2, marginBottom: 36, maxWidth: 540,
          }}>
            One platform. Two completely different contexts of use.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <UserTabs />
        </Reveal>

      </div>

      {/* ── KEY INSIGHT — full bleed dark ───────────────────────────── */}
      <section style={{ backgroundColor: "var(--text-primary)", padding: "clamp(72px, 10vw, 120px) 0" }}>
        <Reveal y={16}>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)" }}>Key Insight</p>
              <Quotes size={28} color="var(--text-muted)" opacity={0.25} />
            </div>
            <blockquote style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(24px, 4.5vw, 52px)",
              color: "var(--bg-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.25, quotes: "none", marginBottom: 28, maxWidth: 760,
            }}>
              Clients don't reject designs because they have bad taste.
              They reject them because they{" "}
              <em style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                couldn't see it clearly enough to say yes
              </em>{" "}
              the first time.
            </blockquote>
            <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 500, marginBottom: 28 }}>
              This reframed the design direction entirely. The goal wasn't to build a better
              design tool — it was to build a better <em>communication</em> tool that
              happened to be powered by design.
            </p>
            <HandDrawnSketch type="morphTransition" width={250} height={100}
              annotation="from design tool → communication tool" delay={0.2} />
          </div>
        </Reveal>
      </section>

      <section className="blueprint-grid-subtle" style={{ padding: "clamp(60px, 8vw, 88px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── WEB PLATFORM ────────────────────────────────────────────── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <SectionMarker label="Designer · Web Application" letter="D" />
            <Desktop size={16} color="var(--text-muted)" opacity={0.5} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end" style={{ marginBottom: 36 }}>
            <div>
              <h2 style={{
                fontFamily: serif, fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)",
                color: "var(--text-primary)", letterSpacing: "-0.025em",
                lineHeight: 1.2, marginBottom: 12,
              }}>
                A professional workspace. Dense, powerful, built for daily use.
              </h2>
              <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                The designer interface doesn't compromise. Sidebar navigation, project management,
                team activity, and AR editing tools — all accessible from a single workspace
                a design lead would open on day one and never want to leave.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }} aria-hidden>
              <HandDrawnSketch type="floorPlan" width={170} height={110}
                annotation="the designer's daily view" delay={0.2} />
              <CurvedArrow label="their daily canvas" rotate={20} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <WebGallery screens={[
            { src: "/arko/web-3.png", label: "Fig. 01 — Dashboard · active projects, team stats, pending approvals" },
            { src: "/arko/web-4.png", label: "Fig. 02 — All Projects · filter by status, search, quick access" },
            { src: "/arko/web-5.png", label: "Fig. 03 — Project Detail · rooms, progress bars, live activity log" },
            { src: "/arko/web-6.png", label: "Fig. 04 — Comments View · client feedback pinned in context" },
          ]} />
        </Reveal>

        </div>
      </section>

      <section style={{ padding: "clamp(60px, 8vw, 88px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── SCAN FLOW ───────────────────────────────────────────────── */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <SectionMarker label="Scan Flow" letter="E" />
              <Aperture size={16} color="var(--text-muted)" opacity={0.5} />
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 34px)",
              color: "var(--text-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.2, marginBottom: 16,
            }}>
              From empty room to furnished space in minutes.
            </h2>
            <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              A pre-scan checklist ensures quality spatial capture. The scanner detects
              floor planes, measures spatial accuracy, and confirms the data before the
              AR editor opens.
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
              <HandDrawnSketch type="perspective" width={170} height={108}
                annotation="empty room → furnished space" delay={0.3} />
              <CurvedArrow label="the scan starts here" rotate={-20} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <PhoneCarousel slides={[
              { src: "/arko/phone-3.png", label: "01 / 04 — Pre-Scan Checklist" },
              { src: "/arko/phone-4.png", label: "02 / 04 — Detecting Floor" },
              { src: "/arko/phone-5.png", label: "03 / 04 — Floor Confirmed" },
              { src: "/arko/phone-6.png", label: "04 / 04 — 92% Spatial Accuracy" },
            ]} />
          </Reveal>
        </div>

        {/* AR Editor — alternating image + description layout */}
        <div style={{ marginTop: 64 }}>
          <Reveal>
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 40 }}>
              AR Room Editor — Canvas first, tools at the edges
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
            {([
              {
                src: "/arko/phone-7.png",
                num: "01",
                label: "Room type breadcrumb navigation",
                desc: "Navigate between room types without losing context. The full path stays visible at all times — every step in the hierarchy is one tap to reverse.",
              },
              {
                src: "/arko/phone-8.png",
                num: "02",
                label: "Furniture library — collapsible sidebar",
                desc: "The library collapses when you need the canvas. One tap to open, one tap to confirm. The space stays the focus, not the tool.",
              },
              {
                src: "/arko/phone-10.png",
                num: "03",
                label: "Item selected — Properties panel",
                desc: "Tap any object to reveal its controls inline. Scale, rotate, swap materials — no modal interrupts the flow.",
              },
              {
                src: "/arko/phone-12.png",
                num: "04",
                label: "Preview mode — Send to Client",
                desc: "Strip away every tool and see exactly what the client will see. One tap to share. The revision loop, closed.",
              },
            ] as { src: string; num: string; label: string; desc: string }[]).map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                  {i % 2 === 0 ? (
                    <>
                      <motion.div className="md:col-span-8"
                        whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                        <img src={s.src} alt={s.label}
                          style={{ width: "100%", display: "block", filter: "drop-shadow(0 6px 22px rgba(0,0,0,0.15))" }} />
                      </motion.div>
                      <div className="md:col-span-4">
                        <span style={{ ...mono, fontSize: 22, fontWeight: 700, color: "var(--border)", display: "block", lineHeight: 1, marginBottom: 16 }}>{s.num}</span>
                        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(20px, 2.2vw, 26px)", color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 14 }}>{s.label}</p>
                        <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75 }}>{s.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-4 order-2 md:order-1">
                        <span style={{ ...mono, fontSize: 22, fontWeight: 700, color: "var(--border)", display: "block", lineHeight: 1, marginBottom: 16 }}>{s.num}</span>
                        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(20px, 2.2vw, 26px)", color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 14 }}>{s.label}</p>
                        <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75 }}>{s.desc}</p>
                      </div>
                      <motion.div className="md:col-span-8 order-1 md:order-2"
                        whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                        <img src={s.src} alt={s.label}
                          style={{ width: "100%", display: "block", filter: "drop-shadow(0 6px 22px rgba(0,0,0,0.15))" }} />
                      </motion.div>
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        </div>
      </section>

      <section className="blueprint-grid-subtle" style={{ padding: "clamp(60px, 8vw, 88px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── CLIENT EXPERIENCE ───────────────────────────────────────── */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Reveal delay={0.1}>
            <PhoneCarousel slides={[
              { src: "/arko/phone-13.png", label: "01 / 04 — Client Landing" },
              { src: "/arko/phone-14.png", label: "02 / 04 — Room View + Comments" },
              { src: "/arko/phone-15.png", label: "03 / 04 — Pin a Comment" },
              { src: "/arko/phone-16.png", label: "04 / 04 — Design Approved" },
            ]} />
          </Reveal>

          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <SectionMarker label="Client · Mobile" letter="F" />
              <DeviceMobileCamera size={16} color="var(--text-muted)" opacity={0.5} />
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 34px)",
              color: "var(--text-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.2, marginBottom: 16,
            }}>
              No login. No jargon. Just the room, a comment, and an approve.
            </h2>
            <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              The client opens a link, sees their space in AR, leaves pinned
              spatial feedback, and approves — without downloading an app or creating
              an account. When they approve, the designer gets a notification and a
              timestamped PDF that closes the loop.
            </p>
            <HandDrawnSketch type="wireframe" width={56} height={72}
              annotation="no login. just the room." delay={0.25} />
          </Reveal>
        </div>

        </div>
      </section>

      <section style={{ padding: "clamp(60px, 8vw, 88px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── DESIGN DECISIONS ────────────────────────────────────────── */}

        <Reveal>
          <SectionMarker label="Design Decisions" letter="G" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.2, marginBottom: 40,
          }}>
            Four decisions that defined the product.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <DecisionStepper />
        </Reveal>

        </div>
      </section>

      {/* ── OUTCOMES — blueprint grid-subtle background ──────────────── */}
      <section style={{ padding: "clamp(64px, 9vw, 96px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionMarker label="Reflection" letter="H" className="mb-6" />
            <h2 style={{
              fontFamily: serif, fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--text-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.2, marginBottom: 16,
            }}>
              Three workflows. One platform. No compromise on either user.
            </h2>
            <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 600, marginBottom: 36 }}>
              Arko consolidates space scanning, interior design, and client approval into one
              platform. The result is a product that serves two very different users without
              compromising either experience.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: 52 }}>
            {([
              {
                label: "What I'd build next",
                body: "An analytics layer for designers — showing which rooms clients spend the most time reviewing, which furniture items get swapped most often, and where comments cluster spatially. Turning client behavior into actionable design intelligence.",
                icon: <LightbulbFilament size={22} color="var(--text-muted)" opacity={0.45} />,
              },
              {
                label: "What this reinforced",
                body: "The best B2B products are the ones that make the professional look good in front of their client. Every design decision in Arko was made with that in mind.",
                icon: <Quotes size={22} color="var(--text-muted)" opacity={0.45} />,
              },
            ] as { label: string; body: string; icon: React.ReactNode }[]).map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ padding: "28px 24px", border: "1px solid var(--border)", backgroundColor: "var(--bg-elevated)", height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)" }}>{c.label}</p>
                    {c.icon}
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex justify-center flex-col items-center gap-3" aria-hidden>
            <HandDrawnSketch type="perspective" width={270} height={130}
              annotation="from architecture to digital product" delay={0.2} />
            <CurvedArrow label="the full journey" rotate={15} />
          </div>
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
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>Previous</p>
                <p style={{ fontFamily: serif, fontSize: "clamp(14px, 2vw, 20px)", color: "var(--text-secondary)", transitionProperty: "color", transitionDuration: "150ms" }}
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
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>Next</p>
                <p style={{ fontFamily: serif, fontSize: "clamp(14px, 2vw, 20px)", color: "var(--text-secondary)", transitionProperty: "color", transitionDuration: "150ms" }}
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
