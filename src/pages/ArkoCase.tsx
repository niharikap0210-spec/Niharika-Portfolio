import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue, animate, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ClockIcon as Clock, QuotesIcon as Quotes, DeviceMobileCameraIcon as DeviceMobileCamera, ApertureIcon as Aperture, LightbulbFilamentIcon as LightbulbFilament, CheckCircleIcon as CheckCircle, UsersThreeIcon as UsersThree, SparkleIcon as Sparkle, PushPinIcon as PushPin, CubeIcon as Cube, CompassIcon as Compass, ArrowUpIcon as ArrowUp, MicrophoneIcon as Microphone, ChatCircleDotsIcon as ChatCircleDots, EyeIcon as Eye, EnvelopeSimpleIcon as Envelope, SquaresFourIcon as SquaresFour, FolderOpenIcon as FolderOpen, ClipboardTextIcon as ClipboardText } from "@phosphor-icons/react";
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
    fontSize: "clamp(18px, 1.4vw, 21px)",
    lineHeight: 1.75,
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  body: {
    fontFamily: sans,
    fontSize: 18,
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

/* ══════════════════════════════════════════════════════════════════
   SECTION HEADER — replaces the old decorative ChapterMark
   Clean editorial eyebrow: number · section · phase + rule line
══════════════════════════════════════════════════════════════════ */
function SectionHeader({
  num, title, phase, total = "09",
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
            ...mono, fontSize: 14, color: arko.primary,
            letterSpacing: "0.22em", fontWeight: 700,
          }}>
          {num} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {total}</span>
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
          height: 1, background: arko.primary, transformOrigin: "left",
          opacity: 0.6,
        }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LAPTOP MOCKUP — inline CSS chassis, no external SVG.
   Minimal flat frame with a thin dark bezel, screen cutout, and a
   tapered base + hinge shelf below. Matches the architectural aesthetic.
══════════════════════════════════════════════════════════════════ */
function LaptopMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", userSelect: "none", position: "relative" }}>
      {/* Lid · bezel + screen */}
      <div
        style={{
          position: "relative",
          background: "#1A1A1A",
          padding: "14px 14px 14px",
          borderRadius: "12px 12px 3px 3px",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 48px -20px rgba(26,26,26,0.35), 0 4px 10px rgba(0,0,0,0.06)",
        }}
      >
        {/* Camera dot */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#3a3a3a",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        />
        {/* Screen cutout */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 10",
            overflow: "hidden",
            background: "#0a0a0a",
            borderRadius: 1,
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Base · hinge shelf + tapered deck */}
      <div aria-hidden style={{ position: "relative" }}>
        {/* Hinge shadow strip */}
        <div
          style={{
            height: 3,
            margin: "0 -3%",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 100%)",
          }}
        />
        {/* Deck */}
        <div
          style={{
            position: "relative",
            margin: "0 -5.5%",
            height: 12,
            background:
              "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 60%, #151515 100%)",
            borderRadius: "0 0 14px 14px",
            boxShadow:
              "0 10px 22px -8px rgba(0,0,0,0.22), 0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {/* Trackpad groove indent */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "22%",
              height: 4,
              background: "#0e0e0e",
              borderRadius: "0 0 6px 6px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LOOP CARD — single integrated "before state" visualization.
   Replaces the earlier stacked workflow + anatomy table.
══════════════════════════════════════════════════════════════════ */
function LoopCard() {
  const [active, setActive] = useState(0);

  const stages = [
    {
      marker: "01", label: "Design",      tool: "AutoCAD",     time: "60 min",
      why: { k: "Plan, not space", t: "Clients approve a drawing they cannot mentally render." },
    },
    {
      marker: "02", label: "Handoff",     tool: "PDF · email", time: "instant",
      why: { k: "No shared surface", t: "Feedback lives in email threads. Every round restarts the export." },
    },
    {
      marker: "03", label: "Walkthrough", tool: "On-site",     time: "2–3 days",
      why: { k: "Days of drift", t: "The 3D visual arrives days later. Memory of the plan has already faded." },
    },
    {
      marker: "04", label: "Result",      tool: "Revision",    time: "6–8 hrs", bad: true,
      why: { k: "The compound effect", t: "Every gap between plan and render becomes another round of edits." },
    },
  ];

  const current = stages[active];

  return (
    <div style={{
      border: "1px solid var(--border)",
      background: "var(--bg-elevated)",
      overflow: "hidden",
    }}>
      {/* Four-stage flow — the focal object */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        position: "relative",
      }}>
        {stages.map((s, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={s.marker}
              onHoverStart={() => setActive(i)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
              style={{
                padding: "40px 28px 36px",
                borderRight: i < stages.length - 1 ? "1px solid var(--border-light)" : "none",
                background: isActive ? arko.subtle : "transparent",
                cursor: "default",
                position: "relative",
                transition: "background-color 260ms ease-out",
                minWidth: 0,
              }}
            >
              {/* Active rail */}
              <span
                aria-hidden
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: arko.primary,
                  transformOrigin: "left center",
                  transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 350ms ease-out",
                }}
              />
              {/* Label */}
              <p style={{
                ...mono, fontSize: 12, color: "var(--text-muted)",
                letterSpacing: "0.22em", marginBottom: 14,
              }}>
                {s.label}
              </p>
              {/* Tool */}
              <p style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(22px, 2vw, 30px)",
                color: isActive || s.bad ? arko.dark : "var(--text-primary)",
                letterSpacing: "-0.02em", lineHeight: 1.1,
                marginBottom: 20,
                transition: "color 250ms ease-out",
              }}>
                {s.tool}
              </p>
              {/* Time */}
              <span style={{
                ...mono, fontSize: 13,
                color: isActive ? arko.primary : "var(--text-secondary)",
                letterSpacing: "0.14em", fontWeight: isActive ? 700 : 500,
                transition: "color 240ms ease-out",
              }}>
                {s.time}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic reason band — updates with active stage */}
      <div style={{
        padding: "32px 36px 36px",
        borderTop: "1px solid var(--border)",
        background: arko.subtle,
        display: "flex", alignItems: "baseline", gap: 28,
        flexWrap: "wrap",
      }}>
        <div style={{ flex: 1, minWidth: 280, position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(22px, 2vw, 28px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.015em", lineHeight: 1.25,
                marginBottom: 8,
              }}>
                {current.why.k}
              </p>
              <p style={{
                fontFamily: sans, fontSize: "clamp(18px, 1.4vw, 21px)",
                color: "var(--text-secondary)",
                lineHeight: 1.6, maxWidth: 720,
              }}>
                {current.why.t}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", alignItems: "flex-end",
          gap: 6, flexShrink: 0,
        }}>
          <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
            Total lost
          </span>
          <span style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: "clamp(30px, 2.6vw, 38px)",
            color: arko.dark, letterSpacing: "-0.02em", lineHeight: 1,
          }}>
            6–8 hrs
          </span>
          <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.18em" }}>
            per project
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   WEB GALLERY
══════════════════════════════════════════════════════════════════ */
function WebGallery({
  screens,
}: {
  screens: { src: string; label: string; Icon?: typeof SquaresFour }[];
}) {
  const [active, setActive] = useState(0);

  const tabs = screens.map((s) => {
    const parts = s.label.split(" · ");
    return { fig: parts[0] ?? "", name: parts[1] ?? "", tail: parts.slice(2).join(" · "), Icon: s.Icon };
  });

  const slugFor = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
  const host = `arko.app / ${slugFor(tabs[active].name)}`;
  const current = screens[active];

  return (
    <div style={{ width: "100%" }}>
      {/* Editorial tab row — UserTabs pattern */}
      <div
        style={{
          position: "relative",
          marginBottom: 32,
        }}
      >
        {/* Faded white surface — softens into the page at the edges */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-4px -2% 0",
            background: "var(--bg-elevated)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      <div
        role="tablist"
        aria-label="Workspace screens"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
      >
        {tabs.map((tab, i) => {
          const isActive = active === i;
          const TabIcon = tab.Icon;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`;
                (e.currentTarget as HTMLElement).style.outlineOffset = "-2px";
              }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}
              style={{
                position: "relative",
                padding: "26px 26px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transitionProperty: "color",
                transitionDuration: "220ms",
                minWidth: 0,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="webgallery-rail"
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: arko.primary,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span
                style={{
                  ...mono,
                  fontSize: 14,
                  color: isActive ? arko.primary : "var(--text-muted)",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                }}
              >
                {tab.fig}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                {TabIcon && (
                  <TabIcon
                    size={24}
                    color={isActive ? arko.primary : "var(--text-secondary)"}
                    weight={isActive ? "duotone" : "regular"}
                    style={{ flexShrink: 0 }}
                  />
                )}
                <span
                  style={{
                    fontFamily: serif,
                    fontWeight: 700,
                    fontSize: 22,
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transitionProperty: "color",
                    transitionDuration: "220ms",
                  }}
                >
                  {tab.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      </div>

      {/* Browser-chrome frame */}
      <div
        style={{
          width: "100%",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "10px 10px 6px 6px",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 28px 60px -28px rgba(26,26,26,0.22)",
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "11px 16px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-secondary)",
          }}
        >
          {/* Traffic lights */}
          <span aria-hidden style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E86B63" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E4B04A" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#4DB06A" }} />
          </span>
          {/* URL pill */}
          <div
            style={{
              flex: 1,
              maxWidth: 420,
              padding: "6px 12px",
              background: "var(--bg-primary)",
              border: "0.75px solid var(--border)",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 0,
            }}
          >
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <rect x="1.5" y="5.5" width="8" height="6" rx="1" stroke="var(--text-muted)" strokeWidth="1" />
              <path d="M3.5 5.5V3.5C3.5 2.39543 4.39543 1.5 5.5 1.5V1.5C6.60457 1.5 7.5 2.39543 7.5 3.5V5.5" stroke="var(--text-muted)" strokeWidth="1" />
            </svg>
            <span
              style={{
                ...mono,
                fontSize: 11.5,
                color: "var(--text-secondary)",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {host}
            </span>
          </div>
          {/* Right meta */}
          <span
            aria-hidden
            style={{
              ...mono,
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.22em",
              marginLeft: "auto",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: arko.primary }} />
            {tabs[active].fig}
          </span>
        </div>

        {/* Screen */}
        <div style={{ background: "#FAFAFA", position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={current.src}
              alt={current.label}
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", display: "block" }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Caption — centered */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`cap-${active}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...caption, textAlign: "center", marginTop: 22 }}
        >
          {current.label}
        </motion.p>
      </AnimatePresence>
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
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 44 }}>
        {tabs.map((x, i) => (
          <button key={i} onClick={() => setTab(i as 0 | 1)}
            style={{
              padding: "22px 32px", background: "none", border: "none",
              borderBottom: `2px solid ${tab === i ? arko.primary : "transparent"}`,
              cursor: "pointer", textAlign: "left", flex: "0 0 auto",
              transitionProperty: "border-color, color", transitionDuration: "180ms",
            }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <span style={{ ...mono, fontSize: 12, color: tab === i ? arko.primary : "var(--text-muted)", display: "block", marginBottom: 10, letterSpacing: "0.2em", fontWeight: 600 }}>
              {x.label}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              <x.Icon size={22} color={tab === i ? arko.primary : "var(--text-secondary)"} weight={tab === i ? "duotone" : "regular"} />
              <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 24, color: tab === i ? "var(--text-primary)" : "var(--text-secondary)", letterSpacing: "-0.02em" }}>
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
              <p style={{ ...t.bodyLg, marginBottom: 30 }}>
                {tabs[tab].body}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border)" }}>
                {tabs[tab].needs.map((n, j) => (
                  <li key={j} style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-light)",
                  }}>
                    <span style={{ ...mono, fontSize: 12, color: "var(--text-muted)", width: 36, flexShrink: 0, letterSpacing: "0.16em", fontWeight: 600 }}>
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 17, color: "var(--text-primary)", lineHeight: 1.5 }}>
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
                <LaptopMockup src={tabs[tab].img} alt={tabs[tab].heading} />
              )}
              <p style={{ ...caption, fontSize: 14, marginTop: 18, textAlign: "center" }}>{tabs[tab].imgCaption}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   INSIGHT QUOTE — scroll-linked word-by-word reveal.
   Drives opacity of each word off the section's scroll progress so the
   quote "types in" as the user scrolls past it.
══════════════════════════════════════════════════════════════════ */
function InsightWord({
  word, i, total, progress, em,
}: {
  word: string;
  i: number;
  total: number;
  progress: MotionValue<number>;
  em?: boolean;
}) {
  const start = i / total;
  const end = Math.min(1, (i + 2) / total);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span
      style={{
        opacity,
        color: em ? arko.light : "inherit",
        fontStyle: em ? "italic" : "normal",
        willChange: "opacity",
      }}
    >
      {word}{" "}
    </motion.span>
  );
}

function InsightQuote() {
  const ref = useRef<HTMLQuoteElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  const plainWords = "Clients don't reject designs because they have bad taste.".split(" ");
  const emWords = "They reject them because they couldn't see it clearly enough to say yes the first time.".split(" ");
  const total = plainWords.length + emWords.length;

  return (
    <blockquote
      ref={ref}
      style={{
        fontFamily: serif,
        fontWeight: 700,
        fontSize: "clamp(32px, 4.6vw, 60px)",
        color: "var(--bg-primary)",
        letterSpacing: "-0.03em",
        lineHeight: 1.15,
        quotes: "none",
        marginBottom: 40,
        maxWidth: 960,
      }}
    >
      {plainWords.map((w, i) => (
        <InsightWord key={`p-${i}`} word={w} i={i} total={total} progress={scrollYProgress} />
      ))}
      {emWords.map((w, i) => (
        <InsightWord
          key={`e-${i}`}
          word={w}
          i={plainWords.length + i}
          total={total}
          progress={scrollYProgress}
          em
        />
      ))}
    </blockquote>
  );
}

/* ══════════════════════════════════════════════════════════════════
   RESEARCH LEDGER — editorial research-depth block.
   4 method tiles with icons, counters, hover lift + olive top-rail.
══════════════════════════════════════════════════════════════════ */
function ResearchLedger() {
  const [hover, setHover] = useState<number | null>(null);

  const methods = [
    { Icon: Microphone,     big: 12, unit: "Designer interviews",    sub: "Leads across 4 firms, 60–90 min each" },
    { Icon: ChatCircleDots, big: 8,  unit: "Client sessions",        sub: "First-time homeowners + repeat developers" },
    { Icon: Eye,            big: 3,  unit: "Walkthroughs shadowed",  sub: "Observed yes-then-no moments live" },
    { Icon: Envelope,       big: 47, unit: "Revision emails parsed", sub: "6-month thread audit across 2 firms" },
  ];

  return (
    <div style={{ marginTop: 88 }}>
      {/* Header band */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, marginBottom: 24, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span aria-hidden style={{ width: 3, height: 16, background: arko.primary, display: "inline-block" }} />
          <p style={{ ...mono, fontSize: 13, color: arko.dark, letterSpacing: "0.22em", fontWeight: 600 }}>
            Research depth · how I got here
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ ...mono, fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.18em" }}>
            70 touchpoints
          </span>
          <span aria-hidden style={{ width: 16, height: 1, background: arko.light }} />
          <span style={{ ...mono, fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.18em" }}>
            4 firms · mixed methods
          </span>
        </div>
      </div>

      {/* Ledger */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{
          border: "1px solid var(--border)",
          background: "var(--bg-elevated)",
        }}
      >
        {methods.map((m, i) => {
          const isHover = hover === i;
          return (
            <motion.div
              key={i}
              onHoverStart={() => setHover(i)}
              onHoverEnd={() => setHover(null)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              style={{
                padding: "32px 28px 30px",
                borderRight: i < methods.length - 1 ? "1px solid var(--border-light)" : "none",
                borderBottom: "none",
                position: "relative",
                cursor: "default",
                background: isHover ? arko.subtle : "transparent",
                transition: "background-color 260ms ease-out",
                minWidth: 0,
              }}
            >
              {/* Top accent rail */}
              <span
                aria-hidden
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: arko.primary,
                  transformOrigin: "left center",
                  transform: isHover ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 320ms ease-out",
                }}
              />
              {/* Method index + icon */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 20,
              }}>
                <span style={{
                  ...mono, fontSize: 11, fontWeight: 600,
                  color: isHover ? arko.primary : "var(--text-muted)",
                  letterSpacing: "0.22em",
                  transition: "color 240ms ease-out",
                }}>
                  M.0{i + 1}
                </span>
                <m.Icon
                  size={22}
                  color={arko.primary}
                  weight={isHover ? "fill" : "duotone"}
                />
              </div>
              {/* Big count */}
              <p style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(48px, 5vw, 64px)",
                color: arko.primary,
                letterSpacing: "-0.035em", lineHeight: 1,
                marginBottom: 14,
              }}>
                <CountUp value={m.big} />
              </p>
              {/* Unit */}
              <p style={{
                ...mono, fontSize: 13,
                color: "var(--text-primary)",
                letterSpacing: "0.16em",
                marginBottom: 10, fontWeight: 600,
              }}>
                {m.unit}
              </p>
              {/* Sub */}
              <p style={{
                fontFamily: sans, fontSize: 14.5,
                color: "var(--text-secondary)", lineHeight: 1.6,
              }}>
                {m.sub}
              </p>
            </motion.div>
          );
        })}
      </div>
      <p style={{
        ...mono, fontSize: 11, color: "var(--text-muted)",
        letterSpacing: "0.2em", marginTop: 16, textAlign: "right",
      }}>
        Fig. 03.1 · field log · weeks 03–04
      </p>
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
      <div
        role="tablist"
        aria-label="Design decisions"
        className="grid grid-cols-2 md:grid-cols-4 gap-0"
        style={{ borderBottom: "1px solid var(--border)", position: "relative" }}
      >
        {decisions.map((d, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              style={{
                position: "relative",
                padding: "22px 24px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transitionProperty: "color",
                transitionDuration: "220ms",
                minWidth: 0,
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`;
                (e.currentTarget as HTMLElement).style.outlineOffset = "-2px";
              }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}
            >
              {isActive && (
                <motion.span
                  layoutId="decision-rail"
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: arko.primary,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span
                style={{
                  ...mono,
                  fontSize: 14,
                  color: isActive ? arko.primary : "var(--text-muted)",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                }}
              >
                {d.num}
              </span>
              <span style={{ display: "inline-flex", alignItems: "flex-start", gap: 14, minWidth: 0 }}>
                <d.Icon
                  size={24}
                  color={isActive ? arko.primary : "var(--text-secondary)"}
                  weight={isActive ? "duotone" : "regular"}
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
                <span
                  style={{
                    fontFamily: serif,
                    fontSize: 22,
                    fontWeight: 700,
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                    transitionProperty: "color",
                    transitionDuration: "220ms",
                  }}
                >
                  {d.short}
                </span>
              </span>
            </button>
          );
        })}
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
              <p style={{ ...t.bodyLg }}>
                {decisions[active].body}
              </p>
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              {decisions[active].img.includes("web-") ? (
                <LaptopMockup src={decisions[active].img} alt={decisions[active].title} />
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
/* ══════════════════════════════════════════════════════════════════
   SCAN FLOW STEPPER — vertical timeline of iOS scan stages.
   Auto-advances every 5s; pauses on hover. Each stage carries its
   own metric inline, so the top grid of stats can go away entirely.
══════════════════════════════════════════════════════════════════ */
function ScanFlowStepper({
  stages,
}: {
  stages: {
    num: string;
    title: string;
    caption: string;
    src: string;
    metric: { value: string; label: string; Icon: typeof Clock };
  }[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % stages.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [paused, inView, stages.length]);

  const progress = ((active + 1) / stages.length) * 100;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start"
    >
      {/* LEFT · timeline */}
      <div className="md:col-span-6">
        {/* Header strip — progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <span style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", fontWeight: 700 }}>
            {String(active + 1).padStart(2, "0")} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {String(stages.length).padStart(2, "0")}</span>
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)", position: "relative", overflow: "hidden" }}>
            <motion.span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: arko.primary,
                transformOrigin: "left center",
              }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
            {paused ? "Paused" : "Auto"}
          </span>
        </div>

        {/* Timeline list */}
        <ol style={{ position: "relative", listStyle: "none", padding: 0, margin: 0 }}>
          {/* Rail · base */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 21,
              top: 22,
              bottom: 22,
              width: 1,
              background: "var(--border)",
            }}
          />
          {/* Rail · fill */}
          <motion.span
            aria-hidden
            style={{
              position: "absolute",
              left: 21,
              top: 22,
              width: 1,
              background: arko.primary,
              transformOrigin: "top center",
              height: "calc(100% - 44px)",
            }}
            animate={{ scaleY: stages.length > 1 ? active / (stages.length - 1) : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {stages.map((s, i) => {
            const isActive = active === i;
            const isDone = active > i;
            const StageIcon = s.metric.Icon;
            return (
              <li key={i}>
                <button
                  onClick={() => setActive(i)}
                  aria-current={isActive}
                  style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 18,
                    width: "100%",
                    padding: "14px 0",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    alignItems: "start",
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`;
                    (e.currentTarget as HTMLElement).style.outlineOffset = "4px";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.outline = "none";
                  }}
                >
                  {/* Node square — solid fill so it covers the rail cleanly */}
                  <motion.span
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      backgroundColor: isActive || isDone ? arko.primary : "var(--bg-elevated)",
                      borderColor: isActive || isDone ? arko.primary : "var(--border)",
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      border: "1px solid",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: isActive ? `0 6px 20px -6px ${arko.muted}` : "none",
                    }}
                  >
                    <StageIcon
                      size={20}
                      weight={isActive ? "duotone" : isDone ? "bold" : "regular"}
                      color={isActive || isDone ? "#FAFAFA" : "var(--text-muted)"}
                    />
                  </motion.span>

                  {/* Body */}
                  <div style={{ minWidth: 0, paddingTop: 2 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                      <span
                        style={{
                          ...mono,
                          fontSize: 11,
                          color: isActive ? arko.primary : "var(--text-muted)",
                          letterSpacing: "0.22em",
                          fontWeight: 700,
                          transition: "color 220ms ease-out",
                        }}
                      >
                        Stage {s.num}
                      </span>
                      <span
                        style={{
                          ...mono,
                          fontSize: 10,
                          color: arko.dark,
                          letterSpacing: "0.18em",
                          opacity: isActive ? 1 : 0,
                          transition: "opacity 220ms ease-out",
                        }}
                      >
                        {s.metric.value} · {s.metric.label}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: serif,
                        fontWeight: 700,
                        fontSize: "clamp(18px, 1.7vw, 22px)",
                        color: isActive ? "var(--text-primary)" : isDone ? "var(--text-secondary)" : "var(--text-muted)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                        marginTop: 6,
                        transition: "color 260ms ease-out",
                      }}
                    >
                      {s.title}
                    </p>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p
                            style={{
                              fontFamily: sans,
                              fontSize: 15,
                              color: "var(--text-secondary)",
                              lineHeight: 1.7,
                              marginTop: 10,
                              maxWidth: 420,
                            }}
                          >
                            {s.caption}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* RIGHT · phone canvas */}
      <div
        className="md:col-span-6"
        style={{
          position: "relative",
          minHeight: 620,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 18,
        }}
      >
        {/* Top · viewfinder label strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            paddingBottom: 12,
            borderBottom: "0.75px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: arko.primary,
                boxShadow: `0 0 0 3px ${arko.subtle}`,
              }}
              className="status-pulse"
            />
            <span style={{ ...mono, fontSize: 11, color: "var(--text-primary)", letterSpacing: "0.22em", fontWeight: 700 }}>
              Active Spatial Scan
            </span>
          </div>
          <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
            Grey Residence · Room 02
          </span>
        </div>

        {/* Main canvas — phone + flanking chips */}
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 16,
            minHeight: 440,
          }}
        >
          {/* LEFT gutter · STAGE pill */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "100%", paddingBottom: "18%" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`pill-${active}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                style={{
                  background: arko.primary,
                  padding: "10px 14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: `0 14px 30px -12px ${arko.muted}`,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#FAFAFA",
                    boxShadow: "0 0 0 3px rgba(250,250,250,0.25)",
                  }}
                  className="status-pulse"
                />
                <span style={{ ...mono, fontSize: 10, color: "#FAFAFA", letterSpacing: "0.22em", fontWeight: 700 }}>
                  Stage {stages[active].num}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER · phone with crosshair brackets */}
          <div style={{ position: "relative", width: "clamp(220px, 30vw, 280px)", margin: "0 auto" }}>
            {/* Soft radial halo */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-10% -14%",
                background: `radial-gradient(ellipse at center, ${arko.subtle} 0%, transparent 68%)`,
                pointerEvents: "none",
              }}
            />

            {/* Corner brackets · top-left / top-right / bottom-left / bottom-right */}
            {[
              { top: -16, left: -16, br: "2px 0 0 2px", bt: "0.75px solid" },
              { top: -16, right: -16, bl: "0 2px 2px 0", bt: "0.75px solid" },
              { bottom: -16, left: -16, br: "0 0 0 2px", bt: "0.75px solid" },
              { bottom: -16, right: -16, bl: "0 0 2px 0", bt: "0.75px solid" },
            ].map((_, ci) => {
              const isTop = ci < 2;
              const isLeft = ci % 2 === 0;
              return (
                <span
                  key={ci}
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: isTop ? -14 : "auto",
                    bottom: !isTop ? -14 : "auto",
                    left: isLeft ? -14 : "auto",
                    right: !isLeft ? -14 : "auto",
                    width: 18,
                    height: 18,
                    borderTop: isTop ? `1px solid ${arko.primary}` : "none",
                    borderBottom: !isTop ? `1px solid ${arko.primary}` : "none",
                    borderLeft: isLeft ? `1px solid ${arko.primary}` : "none",
                    borderRight: !isLeft ? `1px solid ${arko.primary}` : "none",
                    opacity: 0.55,
                  }}
                />
              );
            })}

            {/* Phone image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={stages[active].src}
                alt={stages[active].title}
                initial={{ opacity: 0, y: 20, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.99 }}
                transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  display: "block",
                  position: "relative",
                  filter: "drop-shadow(0 32px 56px rgba(26,26,26,0.18)) drop-shadow(0 10px 18px rgba(26,26,26,0.08))",
                }}
              />
            </AnimatePresence>
          </div>

          {/* RIGHT gutter · LIVE metric chip */}
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", height: "100%", paddingTop: "18%" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`metric-${active}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  padding: "12px 14px",
                  boxShadow: "0 12px 30px -10px rgba(26,26,26,0.18)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minWidth: 120,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {(() => {
                    const Ico = stages[active].metric.Icon;
                    return <Ico size={14} color={arko.primary} weight="duotone" />;
                  })()}
                  <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", fontWeight: 600 }}>
                    Live
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: serif,
                    fontWeight: 700,
                    fontSize: 22,
                    color: arko.dark,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {stages[active].metric.value}
                </span>
                <span style={{ ...mono, fontSize: 9, color: "var(--text-secondary)", letterSpacing: "0.18em" }}>
                  {stages[active].metric.label}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom · scan spec strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "0.75px solid var(--border)",
            paddingTop: 14,
          }}
        >
          {[
            { k: "Area",      v: "8.8 m²" },
            { k: "Depth pts", v: "7,696" },
            { k: "Ceiling",   v: "3.1 m" },
            { k: "Device",    v: "LiDAR" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                padding: "0 10px",
                borderLeft: i === 0 ? "none" : "0.75px solid var(--border-light)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                {s.k}
              </span>
              <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CLIENT JOURNEY REEL — dark-themed 4-up stepper for the
   Approval · Client section. Phones sit on the olive-dark surface,
   no containing rectangle. Active card expands with caption + metric.
══════════════════════════════════════════════════════════════════ */
function ClientJourneyReel() {
  const stages = [
    {
      num: "01",
      title: "Link opened",
      caption: "One tap from the designer's email. Opens in Safari, no App Store detour.",
      src: "/arko/phone-13.png",
      Icon: Envelope,
      meta: "No account",
    },
    {
      num: "02",
      title: "Walk the room",
      caption: "The client sees their own space rendered with placed furniture, rotatable in-browser.",
      src: "/arko/phone-14.png",
      Icon: Cube,
      meta: "AR · browser",
    },
    {
      num: "03",
      title: "Pin a comment",
      caption: "Tap any object to leave spatial feedback. Every comment is anchored to the room.",
      src: "/arko/phone-15.png",
      Icon: PushPin,
      meta: "Contextual",
    },
    {
      num: "04",
      title: "Approved",
      caption: "A single tap seals it. The designer gets a notification and a timestamped PDF.",
      src: "/arko/phone-16.png",
      Icon: CheckCircle,
      meta: "Timestamped",
    },
  ];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % stages.length);
    }, 5600);
    return () => window.clearInterval(id);
  }, [paused, inView, stages.length]);

  const progress = ((active + 1) / stages.length) * 100;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Progress header strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14, marginBottom: 40,
      }}>
        <span style={{ ...mono, fontSize: 12, color: "#FAFAFA", letterSpacing: "0.22em", fontWeight: 700 }}>
          {String(active + 1).padStart(2, "0")}
          <span style={{ color: "rgba(250,250,250,0.55)", fontWeight: 400 }}>
            {" "}/ {String(stages.length).padStart(2, "0")}
          </span>
        </span>
        <div style={{
          flex: 1, height: 1,
          background: "rgba(250,250,250,0.22)",
          position: "relative", overflow: "hidden",
        }}>
          <motion.span
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              background: arko.light,
              transformOrigin: "left center",
            }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span style={{ ...mono, fontSize: 10, color: "rgba(250,250,250,0.55)", letterSpacing: "0.22em" }}>
          {paused ? "Paused" : "Auto"}
        </span>
      </div>

      {/* 4-up phone gallery */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ gap: 24 }}
      >
        {stages.map((s, i) => {
          const isActive = active === i;
          const StageIcon = s.Icon;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-current={isActive}
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                alignItems: "stretch",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.light}`;
                (e.currentTarget as HTMLElement).style.outlineOffset = "6px";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.outline = "none";
              }}
            >
              {/* Top rail · accent on active */}
              <div style={{
                position: "relative",
                height: 1,
                background: "rgba(250,250,250,0.22)",
                marginBottom: 10,
              }}>
                <motion.span
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: arko.light,
                    transformOrigin: "left center",
                  }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Step header — number + icon */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <motion.span
                    animate={{ scale: isActive ? 1.08 : 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "inline-flex" }}
                  >
                    <StageIcon
                      size={22}
                      color={isActive ? arko.light : "rgba(250,250,250,0.58)"}
                      weight={isActive ? "duotone" : "regular"}
                    />
                  </motion.span>
                  <span style={{
                    ...mono,
                    fontSize: 12,
                    color: isActive ? arko.light : "rgba(250,250,250,0.58)",
                    letterSpacing: "0.22em",
                    fontWeight: 700,
                    transition: "color 240ms ease-out",
                  }}>
                    {s.num}
                  </span>
                </div>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      ...mono,
                      fontSize: 9,
                      color: arko.light,
                      letterSpacing: "0.22em",
                      fontWeight: 600,
                      padding: "4px 8px",
                      border: `1px solid ${arko.light}`,
                    }}
                  >
                    {s.meta}
                  </motion.span>
                )}
              </div>

              {/* Phone · no container, soft halo behind active */}
              <div style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                minHeight: 380,
              }}>
                {/* Halo behind active */}
                <motion.div
                  aria-hidden
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    inset: "-8% -14%",
                    background: `radial-gradient(ellipse at center, rgba(139,173,106,0.18) 0%, transparent 65%)`,
                    pointerEvents: "none",
                  }}
                />
                <motion.img
                  src={s.src}
                  alt={s.title}
                  animate={{
                    scale: isActive ? 1.04 : 0.92,
                    opacity: isActive ? 1 : 0.58,
                    y: isActive ? -4 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: "100%",
                    maxWidth: 260,
                    display: "block",
                    position: "relative",
                    filter: isActive
                      ? "drop-shadow(0 30px 50px rgba(0,0,0,0.45)) drop-shadow(0 10px 18px rgba(0,0,0,0.28))"
                      : "drop-shadow(0 14px 30px rgba(0,0,0,0.3))",
                  }}
                />
              </div>

              {/* Title + caption */}
              <div style={{ minHeight: 120 }}>
                <p style={{
                  fontFamily: serif,
                  fontWeight: 700,
                  fontSize: "clamp(22px, 2vw, 28px)",
                  color: isActive ? "#FAFAFA" : "rgba(250,250,250,0.72)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: 12,
                  transition: "color 260ms ease-out",
                }}>
                  {s.title}
                </p>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: sans,
                        fontSize: 16.5,
                        color: "rgba(250,250,250,0.92)",
                        lineHeight: 1.65,
                        overflow: "hidden",
                      }}
                    >
                      {s.caption}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ArEditorStepper({
  steps,
}: {
  steps: { src: string; num: string; label: string; desc: string; Icon?: typeof Compass }[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div
        role="tablist"
        aria-label="AR editor steps"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
          borderBottom: "1px solid var(--border)",
          marginBottom: 32,
          position: "relative",
        }}
      >
        {steps.map((s, i) => {
          const isActive = active === i;
          const StepIcon = s.Icon;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              style={{
                position: "relative",
                padding: "22px 24px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transitionProperty: "color",
                transitionDuration: "220ms",
                minWidth: 0,
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.outline = `2px solid ${arko.primary}`;
                (e.currentTarget as HTMLElement).style.outlineOffset = "-2px";
              }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}
            >
              {isActive && (
                <motion.span
                  layoutId="ar-rail"
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: arko.primary,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span
                style={{
                  ...mono,
                  fontSize: 14,
                  color: isActive ? arko.primary : "var(--text-muted)",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                }}
              >
                {s.num}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                {StepIcon && (
                  <StepIcon
                    size={24}
                    color={isActive ? arko.primary : "var(--text-secondary)"}
                    weight={isActive ? "duotone" : "regular"}
                    style={{ flexShrink: 0 }}
                  />
                )}
                <span
                  className="hidden md:inline"
                  style={{
                    fontFamily: serif,
                    fontSize: 22,
                    fontWeight: 700,
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transitionProperty: "color",
                    transitionDuration: "220ms",
                  }}
                >
                  {s.label.split(" · ")[0]}
                </span>
              </span>
            </button>
          );
        })}
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
              <p style={{ ...t.bodyLg }}>
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

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <section className="blueprint-grid" style={{
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
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = arko.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M14 9H3M6 5L2 9l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Index
          </Link>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {["Product Design", "B2B SaaS", "Web + iOS", "AR · Spatial"].map((tag) => (
              <span key={tag} style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero body — 2-column: text left, laptop right, all in viewport */}
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
            {/* LEFT — title, subtitle */}
            <div className="md:col-span-5" style={{ minWidth: 0 }}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}
                style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, maxWidth: 460 }}
              >
                <span style={{ ...mono, fontSize: 11, color: arko.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                  Case Study · 01
                </span>
                <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
                  2025
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
                  Arko<span style={{ color: arko.primary, fontStyle: "italic" }}>.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                style={{
                  fontFamily: serif, fontStyle: "italic",
                  fontSize: "clamp(21px, 1.9vw, 28px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5, maxWidth: 520,
                  marginBottom: "clamp(32px, 3.4vw, 48px)",
                  letterSpacing: "-0.01em",
                }}
              >
                A spatial design platform that turns client approvals from a week of emails into a single tap:
                <span style={{ color: arko.primary }}> scan, design, approve, </span>
                in one closed loop.
              </motion.p>

              {/* Meta row — compact, below subtitle */}
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
                  { label: "Role",     value: "Product Designer" },
                  { label: "Platform", value: "Web + iOS" },
                  { label: "Timeline", value: "14 weeks" },
                  { label: "Tools",    value: "Figma · Framer" },
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

            {/* RIGHT — laptop + phone mockup with olive blur backdrop */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", width: "100%", minWidth: 0 }}
            >
              {/* Olive radial blur — sits behind the mockups */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: "-8% -6%",
                  background: `radial-gradient(55% 55% at 55% 50%, ${arko.light} 0%, ${arko.primary} 40%, rgba(110,143,78,0) 72%)`,
                  filter: "blur(60px)",
                  opacity: 0.55,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-10%",
                  top: "15%",
                  width: "55%",
                  height: "55%",
                  background: `radial-gradient(circle, ${arko.primary} 0%, rgba(110,143,78,0) 70%)`,
                  filter: "blur(48px)",
                  opacity: 0.4,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              {/* Laptop — main focal object */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ y: -14, scale: 1.025, transition: { type: "spring", stiffness: 220, damping: 18 } }}
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: "94%",
                  marginLeft: "6%",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <div style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))" }}>
                  <LaptopMockup src="/arko/web-1.png" alt="Arko designer dashboard" />
                </div>
              </motion.div>

              {/* Phone — overlaps bottom-right of laptop */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                whileHover={{ y: -18, scale: 1.04, transition: { type: "spring", stiffness: 240, damping: 18 } }}
                style={{
                  position: "absolute",
                  right: "-4%",
                  bottom: "-10%",
                  width: "32%",
                  zIndex: 3,
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <div style={{ filter: "drop-shadow(0 20px 36px rgba(0,0,0,0.28))" }}>
                  <img
                    src="/arko/phone-13.png"
                    alt="Arko client mobile view"
                    style={{ width: "100%", display: "block" }}
                  />
                </div>
              </motion.div>
            </motion.div>
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
              <h2 style={{ ...t.h2Section, marginBottom: 24 }}>
                One loop.{" "}
                <em style={{ fontStyle: "italic", color: arko.primary }}>
                  Zero back-and-forth.
                </em>
              </h2>
              <p style={{ ...t.bodyLg, marginBottom: 40 }}>
                Arko turns spatial design approvals from a week of emails into a single tap.
                It is a B2B platform that replaces the three-tool handoff (design software, PDF exports,
                on-site walkthroughs) with one continuous product.
              </p>

              {/* Pull-line — the thesis in one breath */}
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                paddingTop: 28,
                borderTop: "1px solid var(--border)",
              }}>
                <span style={{
                  width: 3,
                  alignSelf: "stretch",
                  backgroundColor: arko.primary,
                  flexShrink: 0,
                }} />
                <p style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  lineHeight: 1.5,
                  color: "var(--text-primary)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}>
                  A week of back-and-forth collapses into one continuous session,
                  without a single email, without a single re-export.
                </p>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.1}>
              <div style={{
                position: "relative",
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
                padding: "clamp(24px, 2.8vw, 36px) clamp(28px, 3vw, 40px)",
              }}>
                {/* Corner ticks */}
                {[
                  { top: -1, left: -1 },
                  { top: -1, right: -1 },
                  { bottom: -1, left: -1 },
                  { bottom: -1, right: -1 },
                ].map((pos, i) => (
                  <span key={i} aria-hidden style={{
                    position: "absolute", ...pos,
                    width: 9, height: 9,
                    borderTop: pos.top !== undefined ? `1.5px solid ${arko.dark}` : "none",
                    borderBottom: pos.bottom !== undefined ? `1.5px solid ${arko.dark}` : "none",
                    borderLeft: pos.left !== undefined ? `1.5px solid ${arko.dark}` : "none",
                    borderRight: pos.right !== undefined ? `1.5px solid ${arko.dark}` : "none",
                  }} />
                ))}

                {/* Top meta band: figure tag + source */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  paddingBottom: 12,
                  borderBottom: "0.75px solid var(--border)",
                  marginBottom: 24,
                }}>
                  <span style={{ ...mono, fontSize: 10, color: arko.dark, letterSpacing: "0.22em" }}>
                    Fig. 01.1
                  </span>
                  <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                    hrs / project
                  </span>
                </div>

                {/* The number with measurement bracket */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "clamp(10px, 1.4vw, 18px)",
                  marginBottom: 20,
                }}>
                  {/* Left bracket */}
                  <svg width="18" height="90" viewBox="0 0 18 90" aria-hidden style={{ flexShrink: 0 }}>
                    <line x1="17" y1="2" x2="6" y2="2" stroke={arko.primary} strokeWidth="1.25"/>
                    <line x1="6" y1="2" x2="6" y2="88" stroke={arko.primary} strokeWidth="1.25"/>
                    <line x1="17" y1="88" x2="6" y2="88" stroke={arko.primary} strokeWidth="1.25"/>
                    <line x1="1" y1="45" x2="10" y2="45" stroke={arko.primary} strokeWidth="1.25"/>
                  </svg>
                  <span style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(72px, 9vw, 128px)",
                    color: arko.primary, letterSpacing: "-0.05em",
                    lineHeight: 0.9,
                  }}>
                    6–8
                  </span>
                  {/* Right bracket */}
                  <svg width="18" height="90" viewBox="0 0 18 90" aria-hidden style={{ flexShrink: 0 }}>
                    <line x1="1" y1="2" x2="12" y2="2" stroke={arko.primary} strokeWidth="1.25"/>
                    <line x1="12" y1="2" x2="12" y2="88" stroke={arko.primary} strokeWidth="1.25"/>
                    <line x1="1" y1="88" x2="12" y2="88" stroke={arko.primary} strokeWidth="1.25"/>
                    <line x1="8" y1="45" x2="17" y2="45" stroke={arko.primary} strokeWidth="1.25"/>
                  </svg>
                </div>

                {/* Unit label, centered */}
                <p style={{
                  ...mono, fontSize: 11, color: "var(--text-primary)",
                  letterSpacing: "0.2em", fontWeight: 600,
                  textAlign: "center",
                  marginBottom: 28,
                }}>
                  Hours lost per project
                </p>

                {/* Breakdown bars — where those hours go */}
                <div style={{
                  display: "flex", flexDirection: "column", gap: 10,
                  paddingTop: 20,
                  borderTop: "0.75px solid var(--border)",
                }}>
                  <p style={{ ...mono, fontSize: 9.5, color: "var(--text-muted)", letterSpacing: "0.22em", marginBottom: 4 }}>
                    Where the hours go
                  </p>
                  {[
                    { label: "Email + revision cycles", value: 3.0, pct: 0.42 },
                    { label: "Client walkthroughs",     value: 2.5, pct: 0.36 },
                    { label: "Re-exports + markups",    value: 1.5, pct: 0.22 },
                  ].map((row) => (
                    <div key={row.label} style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 70px 36px",
                      alignItems: "center",
                      gap: 12,
                    }}>
                      <span style={{ fontFamily: sans, fontSize: 12.5, color: "var(--text-primary)" }}>
                        {row.label}
                      </span>
                      <div style={{
                        position: "relative",
                        height: 4, background: "var(--border-light)",
                      }}>
                        <div style={{
                          position: "absolute", left: 0, top: 0, bottom: 0,
                          width: `${row.pct * 100}%`,
                          background: arko.primary,
                        }}/>
                      </div>
                      <span style={{ ...mono, fontSize: 11, color: arko.dark, fontWeight: 600, textAlign: "right" }}>
                        {row.value.toFixed(1)}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          02 · CONTEXT — the broken workflow
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="02" title="Context" phase="Weeks 02 · 03" />
          </Reveal>

          <Reveal>
            <h2 style={{ ...t.h2Section, maxWidth: 820, marginBottom: 20 }}>
              Clients can't visualize a space from a floor plan.{" "}
              <em style={{ fontStyle: "italic", color: arko.primary }}>That gap costs real money.</em>
            </h2>
            <p style={{ ...t.bodyLg, maxWidth: 760, marginBottom: 48 }}>
              A verbal yes in the meeting doesn't stick once the space is rendered. By the time
              the 3D visual arrives days later, the client's mental image has already drifted, and
              every mismatch triggers another round of edits. The work is done; the approval,
              never really given. Every interior firm loses 6–8 hours per project to this loop.
            </p>
          </Reveal>

          {/* The revision loop — single integrated card */}
          <Reveal delay={0.08}>
            <LoopCard />
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

          {/* Research depth — ledger-style card with icons + hover interactions */}
          <Reveal delay={0.15}>
            <ResearchLedger />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          04 · INSIGHT — full bleed dark
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: "var(--text-primary)",
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 0.5px, transparent 0.5px, transparent 20px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 0.5px, transparent 0.5px, transparent 20px),
          repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.07) 0.5px, transparent 0.5px, transparent 80px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.07) 0.5px, transparent 0.5px, transparent 80px)
        `,
        padding: "clamp(88px, 12vw, 140px) 0",
        position: "relative", overflow: "hidden",
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}
          >
            <Quotes size={30} color={arko.light} opacity={0.7} weight="duotone" />
            <p style={{ ...mono, fontSize: 15, color: arko.light, letterSpacing: "0.22em", fontWeight: 600 }}>
              04 / 09 · Key insight
            </p>
          </motion.div>
          <InsightQuote />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...t.bodyLg, color: "rgba(250,250,250,0.72)", maxWidth: 620 }}
          >
            This reframed the entire design direction. The goal was never to build a better
            design tool. It was to build a better <em>communication</em> tool that
            happened to be powered by design.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          05 · WORKSPACE · WEB — desk-side platform for the designer
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="05" title="Workspace · Web" phase="Weeks 05 · 08" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start" style={{ marginBottom: 56 }}>
            <Reveal className="md:col-span-7">
              <h2 style={{ ...t.h2Section, marginBottom: 22 }}>
                A professional workspace.{" "}
                <em style={{ fontStyle: "italic", color: arko.primary }}>Dense, powerful, built for daily use.</em>
              </h2>
              <p style={{ ...t.bodyLg }}>
                The designer interface doesn't compromise. Sidebar navigation, project management,
                team activity, and AR editing tools, all accessible from a single workspace a design
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
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "18px 0",
                    borderBottom: "1px solid var(--border-light)",
                  }}>
                    <CheckCircle size={18} color={arko.primary} weight="regular" />
                    <span style={{ fontFamily: sans, fontSize: 17, color: "var(--text-primary)", lineHeight: 1.55 }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <WebGallery screens={[
              { src: "/arko/web-3.png", label: "Fig. 06.1 · Dashboard · active projects, team stats, pending approvals", Icon: SquaresFour },
              { src: "/arko/web-4.png", label: "Fig. 06.2 · All Projects · filter by status, search, quick access", Icon: FolderOpen },
              { src: "/arko/web-5.png", label: "Fig. 06.3 · Project Detail · rooms, progress bars, live activity log", Icon: ClipboardText },
              { src: "/arko/web-6.png", label: "Fig. 06.4 · Comments view · client feedback pinned in context", Icon: ChatCircleDots },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          06 · CAPTURE · iOS — scan flow + AR editor
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="06" title="Capture · iOS" phase="Weeks 06 · 09" />
          </Reveal>

          <Reveal>
            <div style={{ maxWidth: 760, marginBottom: 64 }}>
              <h2 style={{ ...t.h2Section, marginBottom: 22 }}>
                From empty room to{" "}
                <em style={{ fontStyle: "italic", color: arko.primary }}>furnished space</em>{" "}
                in minutes.
              </h2>
              <p style={{ ...t.bodyLg }}>
                A guided four-stage scan confirms spatial data before the AR editor opens.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div style={{ marginBottom: 96 }}>
              <ScanFlowStepper
                stages={[
                  {
                    num: "01",
                    title: "Pre-scan checklist",
                    caption: "Four lighting and surface checks ensure every capture meets the quality threshold.",
                    src: "/arko/phone-3.png",
                    metric: { value: "4 steps", label: "Checklist", Icon: CheckCircle },
                  },
                  {
                    num: "02",
                    title: "Detecting floor planes",
                    caption: "ARKit locks onto horizontal surfaces. The camera anchors a live scan mesh in place.",
                    src: "/arko/phone-4.png",
                    metric: { value: "< 3 min", label: "Avg scan", Icon: Clock },
                  },
                  {
                    num: "03",
                    title: "Floor confirmed",
                    caption: "The room's footprint is captured. A single tap promotes it into the editable canvas.",
                    src: "/arko/phone-5.png",
                    metric: { value: "Locked", label: "Floor plane", Icon: PushPin },
                  },
                  {
                    num: "04",
                    title: "Spatial accuracy",
                    caption: "Measurements reconcile against the original plan. Anything below 90% prompts a re-scan.",
                    src: "/arko/phone-6.png",
                    metric: { value: "92%", label: "Accuracy", Icon: Aperture },
                  },
                ]}
              />
            </div>
          </Reveal>

          {/* AR Editor */}
          <Reveal>
            <div style={{ marginBottom: 40, maxWidth: 720 }}>
              <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", marginBottom: 14, fontWeight: 600 }}>
                AR room editor
              </p>
              <h3 style={{ ...t.h3Lede }}>
                Canvas first, tools at the edges: place, scale, swap, no modals.
              </h3>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ArEditorStepper steps={[
              {
                src: "/arko/phone-7.png", num: "01",
                label: "Room type breadcrumb navigation",
                desc: "Navigate between room types without losing context. The full path stays visible at all times; every step in the hierarchy is one tap to reverse.",
                Icon: Compass,
              },
              {
                src: "/arko/phone-8.png", num: "02",
                label: "Furniture library · collapsible sidebar",
                desc: "The library collapses when you need the canvas. One tap to open, one tap to confirm. The space stays the focus, not the tool.",
                Icon: Cube,
              },
              {
                src: "/arko/phone-10.png", num: "03",
                label: "Item selected · Properties panel",
                desc: "Tap any object to reveal its controls inline. Scale, rotate, swap materials; no modal interrupts the flow.",
                Icon: PushPin,
              },
              {
                src: "/arko/phone-12.png", num: "04",
                label: "Preview mode · Send to Client",
                desc: "Strip away every tool and see exactly what the client will see. One tap to share. The revision loop, closed.",
                Icon: Eye,
              },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          07 · APPROVAL — full-bleed olive client surface
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: SECTION_PAD,
        backgroundColor: arko.dark,
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0, rgba(255,255,255,0.045) 0.5px, transparent 0.5px, transparent 20px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0, rgba(255,255,255,0.045) 0.5px, transparent 0.5px, transparent 20px),
          repeating-linear-gradient(0deg, rgba(255,255,255,0.09) 0, rgba(255,255,255,0.09) 0.5px, transparent 0.5px, transparent 80px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0, rgba(255,255,255,0.09) 0.5px, transparent 0.5px, transparent 80px)
        `,
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
                <span style={{ ...mono, fontSize: 14, color: "#FAFAFA", letterSpacing: "0.22em", fontWeight: 700 }}>
                  07 <span style={{ color: "rgba(250,250,250,0.55)", fontWeight: 400 }}>/ 09</span>
                </span>
                <span style={{ ...mono, fontSize: 14, color: "#FAFAFA", letterSpacing: "0.22em", fontWeight: 600 }}>
                  Approval · Client
                </span>
                <span style={{ ...mono, fontSize: 13, color: "rgba(250,250,250,0.65)", letterSpacing: "0.2em", marginLeft: "auto" }}>
                  Weeks 09 · 11
                </span>
              </div>
              <div style={{ height: 1, background: "rgba(250,250,250,0.55)", transformOrigin: "left" }} />
            </div>
          </Reveal>

          {/* Hero block — statement + lede */}
          <Reveal>
            <div style={{ maxWidth: 860, marginBottom: 56 }}>
              <h2 style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(32px, 4.6vw, 58px)",
                color: "#FAFAFA", letterSpacing: "-0.035em",
                lineHeight: 1.08, marginBottom: 28,
              }}>
                No login. No jargon.{" "}
                <em style={{ fontStyle: "italic", color: "#D4E4B8" }}>
                  Just the room, a comment, and an approve.
                </em>
              </h2>
              <p style={{
                ...t.bodyLg,
                color: "rgba(250,250,250,0.82)",
                maxWidth: 680,
              }}>
                The client opens a link, sees their space in AR, pins spatial feedback, and approves.
                No download, no account. The designer gets a notification and a timestamped PDF.
              </p>
            </div>
          </Reveal>

          {/* Inline feature pills */}
          <Reveal delay={0.05}>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 72,
            }}>
              {[
                { Icon: Envelope,     label: "Link-based access" },
                { Icon: PushPin,      label: "Spatial comments" },
                { Icon: CheckCircle,  label: "One-tap approval" },
                { Icon: ClipboardText, label: "Timestamped PDF" },
              ].map((f, i) => (
                <div key={i} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  border: "1px solid rgba(250,250,250,0.22)",
                  background: "rgba(250,250,250,0.04)",
                  borderRadius: 999,
                }}>
                  <f.Icon size={16} color={arko.light} weight="duotone" />
                  <span style={{
                    ...mono,
                    fontSize: 11,
                    color: "#FAFAFA",
                    letterSpacing: "0.22em",
                    fontWeight: 600,
                  }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Client Journey Reel — 4-up dark stepper */}
          <Reveal delay={0.08}>
            <ClientJourneyReel />
          </Reveal>

          {/* Closing signature strip */}
          <Reveal delay={0.12}>
            <div style={{
              marginTop: 64,
              paddingTop: 24,
              borderTop: "0.75px solid rgba(250,250,250,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  aria-hidden
                  style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: arko.light,
                    boxShadow: "0 0 0 3px rgba(139,173,106,0.25)",
                  }}
                  className="status-pulse"
                />
                <span style={{
                  ...mono,
                  fontSize: 12,
                  color: "#FAFAFA",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                }}>
                  Loop closed · designer notified
                </span>
              </div>
              <span style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 1.6vw, 22px)",
                color: "rgba(250,250,250,0.78)",
                letterSpacing: "-0.015em",
              }}>
                Approved in minutes, not weeks.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          08 · DECISIONS
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="08" title="Design Decisions" phase="Weeks 10 · 12" />
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
          09 · OUTCOMES
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="09" title="Outcomes & Reflection" phase="Weeks 13 · 14" />
          </Reveal>

          <Reveal>
            <h2 style={{ ...t.h2Section, marginBottom: 22, maxWidth: 860 }}>
              Three workflows. One platform.{" "}
              <em style={{ fontStyle: "italic", color: arko.primary }}>No compromise</em>{" "}
              on either user.
            </h2>
            <p style={{ ...t.bodyLg, maxWidth: 760, marginBottom: 72 }}>
              Arko consolidates space scanning, interior design, and client approval into one
              platform. A single product that serves two very different users without compromising
              either experience.
            </p>
          </Reveal>

          {/* Editorial impact banner — one strip, no card borders */}
          <Reveal delay={0.08}>
            <div style={{ marginBottom: 96 }}>
              {/* Eyebrow */}
              <div style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 36,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span aria-hidden style={{ width: 3, height: 14, background: arko.primary }} />
                  <p style={{ ...mono, fontSize: 12, color: arko.dark, letterSpacing: "0.22em", fontWeight: 700 }}>
                    Impact
                  </p>
                </div>
                <p style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
                  Pilot study · 30 days · 4 teams · 12 projects
                </p>
              </div>

              {/* Metrics row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  borderTop: `1px solid ${arko.primary}`,
                  borderBottom: `1px solid ${arko.primary}`,
                }}
              >
                {([
                  { label: "Approval time",    num: 45,   decimals: 0, prefix: "",  unit: "min", delta: "↓ 92%",      tone: "down" as const, note: "from 6–8 hrs" },
                  { label: "Revision cycles",  num: 1.2,  decimals: 1, prefix: "",  unit: "avg", delta: "↓ 72%",      tone: "down" as const, note: "from 4+ rounds" },
                  { label: "Spatial accuracy", num: 92,   decimals: 0, prefix: "",  unit: "%",   delta: "→ target",   tone: "flat" as const, note: "90% threshold" },
                  { label: "Client NPS",       num: 38,   decimals: 0, prefix: "+", unit: "pts", delta: "↑ 24 pts",   tone: "up"   as const, note: "baseline +14" },
                ] as { label: string; num: number; decimals: number; prefix: string; unit: string; delta: string; tone: "up" | "down" | "flat"; note: string }[]).map((k, i) => (
                  <motion.div
                    key={k.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: "40px 28px 36px",
                      borderLeft: i === 0 ? "none" : "1px solid var(--border-light)",
                      position: "relative",
                    }}
                  >
                    <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.22em", marginBottom: 22, fontWeight: 700 }}>
                      {k.label}
                    </p>
                    <p style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(56px, 6vw, 84px)",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 14,
                    }}>
                      <CountUp value={k.num} decimals={k.decimals} prefix={k.prefix} />
                      <span style={{
                        fontFamily: sans, fontSize: "clamp(14px, 1.1vw, 17px)", fontWeight: 500,
                        color: "var(--text-secondary)", marginLeft: 8, letterSpacing: 0,
                      }}>{k.unit}</span>
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                      <span style={{
                        ...mono,
                        fontSize: 12,
                        color: arko.primary,
                        letterSpacing: "0.16em",
                        fontWeight: 700,
                      }}>
                        {k.delta}
                      </span>
                      <span style={{
                        ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.18em",
                      }}>
                        {k.note}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Reflection — two pull-quote editorial cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 32, marginBottom: 88 }}
          >
            {([
              {
                label: "What I'd build next",
                body: "An analytics layer for designers. Which rooms clients spend the most time reviewing, which furniture items get swapped most often, where comments cluster spatially. Turning client behavior into actionable design intelligence.",
                Icon: LightbulbFilament,
              },
              {
                label: "What this reinforced",
                body: "The best B2B products make the professional look good in front of their client. Every design decision in Arko was made with that in mind.",
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
                    position: "relative",
                    padding: "44px 36px 40px",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  {/* Accent top bar */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 0, left: 0,
                      width: 64, height: 3,
                      background: arko.primary,
                    }}
                  />
                  {/* Oversized background quote mark */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 18, right: 20,
                      fontFamily: serif,
                      fontSize: 140,
                      fontWeight: 700,
                      color: arko.subtle,
                      lineHeight: 0.7,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    “
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <c.Icon size={22} color={arko.primary} weight="duotone" />
                    <p style={{ ...mono, fontSize: 12, color: arko.dark, letterSpacing: "0.22em", fontWeight: 700 }}>
                      {c.label}
                    </p>
                  </div>
                  <p style={{
                    ...t.bodyLg,
                    color: "var(--text-primary)",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    {c.body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Closing line — cinematic */}
          <Reveal>
            <div style={{
              paddingTop: 56,
              borderTop: "1px solid var(--border)",
              position: "relative",
            }}>
              {/* Corner brackets */}
              {[
                { top: 40, left: 0 },
                { top: 40, right: 0 },
              ].map((pos, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    width: 18, height: 18,
                    borderTop: `1px solid ${arko.primary}`,
                    borderLeft: pos.left !== undefined ? `1px solid ${arko.primary}` : "none",
                    borderRight: pos.right !== undefined ? `1px solid ${arko.primary}` : "none",
                    opacity: 0.6,
                  }}
                />
              ))}
              <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
                <p style={{ ...mono, fontSize: 11, color: arko.dark, letterSpacing: "0.24em", marginBottom: 26, fontWeight: 700 }}>
                  Fin · Arko case study
                </p>
                <p style={{
                  fontFamily: serif, fontStyle: "italic",
                  fontSize: "clamp(28px, 3.4vw, 42px)",
                  color: "var(--text-primary)", letterSpacing: "-0.02em",
                  lineHeight: 1.22,
                }}>
                  From architecture to digital product:{" "}
                  <span style={{ color: arko.primary }}>the loop, finally closed.</span>
                </p>
              </div>
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
              border: `1px solid ${arko.primary}`,
              background: "var(--bg-elevated)",
              color: arko.primary,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px rgba(110,143,78,0.18)",
              transitionProperty: "background-color, color, border-color",
              transitionDuration: "180ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = arko.primary;
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-elevated)";
              (e.currentTarget as HTMLElement).style.color = arko.primary;
            }}
          >
            <ArrowUp size={20} weight="bold" color="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
