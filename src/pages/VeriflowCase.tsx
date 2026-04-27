import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpIcon as ArrowUp,
  QuotesIcon as Quotes,
  ArrowRightIcon as ArrowRight,
  ArrowLeftIcon as ArrowLeft,
  ShieldCheckIcon as ShieldCheck,
  HandTapIcon as HandTap,
  TelevisionIcon as Television,
  DeviceTabletIcon as Tablet,
  MonitorIcon as Monitor,
  WarningCircleIcon as WarningCircle,
  ClockCountdownIcon as ClockCountdown,
  FileTextIcon as FileText,
  EyeSlashIcon as EyeSlash,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { projects, type Project } from "../data/projects";
import { ProjectHeroStage } from "../components/ProjectHeroStage";

/* ── Veriflow palette, scoped to this page ──────────────────────── */
const vf = {
  primary: "#1E40AF",
  light:   "#3B82F6",
  dark:    "#0F2A78",
  surface: "#EFF4FD",
  subtle:  "rgba(30, 64, 175, 0.08)",
  muted:   "rgba(30, 64, 175, 0.55)",
  ink:     "#0A1028",
  status:  "#10B981",
  warn:    "#F59E0B",
  flag:    "#DC2626",
};

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";
const t = {
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
const TOTAL_SECTIONS = "08";

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
      transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.4, 1] }}
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
      duration, ease: [0.25, 1, 0.4, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, value, duration, mv]);
  return <span ref={ref}>{display}{suffix}</span>;
}

function SectionHeader({
  num, title, phase, total = TOTAL_SECTIONS,
}: { num: string; title: string; phase: string; total?: string }) {
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
          transition={{ duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
          style={{ ...mono, fontSize: 14, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700 }}
        >
          {num} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {total}</span>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
          style={{ ...mono, fontSize: 14, color: "var(--text-primary)", letterSpacing: "0.22em", fontWeight: 600 }}
        >
          {phase}
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.25, 1, 0.4, 1] }}
          style={{ flex: 1, height: 1, background: vf.primary, opacity: 0.55, transformOrigin: "left", minWidth: 40 }}
        />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.22, duration: 0.8, ease: [0.25, 1, 0.4, 1] }}
        style={{ ...t.h2Section, marginTop: 20, maxWidth: 860 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DEVICE MOCKUPS
══════════════════════════════════════════════════════════════════ */

/** Tablet, landscape, 640/400. */
function TabletFrame({ src, alt, slim = false }: { src: string; alt: string; slim?: boolean }) {
  const pad = slim ? "clamp(4px, 0.5vw, 6px)" : "clamp(7px, 0.9vw, 11px)";
  const radius = slim ? "clamp(10px, 1.2vw, 14px)" : "clamp(14px, 1.8vw, 22px)";
  const inner = slim ? "clamp(6px, 0.8vw, 9px)" : "clamp(8px, 1vw, 12px)";
  const dotTop = slim ? "clamp(6px, 0.7vw, 8px)" : "clamp(10px, 1.2vw, 14px)";
  const dotSize = slim ? 3 : 5;
  return (
    <div style={{
      width: "100%",
      padding: pad,
      background: "linear-gradient(145deg, #1B1F26 0%, #0C1014 100%)",
      borderRadius: radius,
      boxShadow: `0 1px 2px rgba(0,0,0,0.06), 0 24px 60px rgba(15, 42, 120, 0.18), 0 4px 14px rgba(0,0,0,0.08)`,
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: dotTop, left: "50%", transform: "translateX(-50%)",
        width: dotSize, height: dotSize, borderRadius: "50%", background: "#2A2F38", zIndex: 2,
      }} />
      <div style={{
        borderRadius: inner,
        overflow: "hidden",
        background: "#fff",
        aspectRatio: "640 / 400",
      }}>
        <img
          src={src} alt={alt} loading="lazy"
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "center" }}
        />
      </div>
    </div>
  );
}

/** Animated tablet: cross-fades when src changes. */
function AnimatedTabletFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{
      width: "100%",
      padding: "clamp(7px, 0.9vw, 11px)",
      background: "linear-gradient(145deg, #1B1F26 0%, #0C1014 100%)",
      borderRadius: "clamp(14px, 1.8vw, 22px)",
      boxShadow: `0 1px 2px rgba(0,0,0,0.06), 0 32px 80px rgba(15, 42, 120, 0.22), 0 4px 14px rgba(0,0,0,0.08)`,
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: "clamp(10px, 1.2vw, 14px)", left: "50%", transform: "translateX(-50%)",
        width: 5, height: 5, borderRadius: "50%", background: "#2A2F38", zIndex: 2,
      }} />
      <div style={{
        borderRadius: "clamp(8px, 1vw, 12px)",
        overflow: "hidden",
        background: "#fff",
        aspectRatio: "640 / 400",
        position: "relative",
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={src}
            src={src} alt={alt} loading="lazy"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.4, 1] }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", objectFit: "cover" }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Laptop MacBook-style frame. Used for any screen with left-nav. */
function LaptopFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", position: "relative", userSelect: "none" }}>
      <div style={{
        position: "relative",
        background: "#1A1A1A",
        padding: "13px 13px 13px",
        borderRadius: "11px 11px 3px 3px",
        boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 52px -20px rgba(15,42,120,0.3), 0 4px 10px rgba(0,0,0,0.06)",
      }}>
        <span aria-hidden style={{
          position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
          width: 4, height: 4, borderRadius: "50%", background: "#3a3a3a",
        }} />
        <div style={{
          position: "relative",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          background: "#0a0a0a",
          borderRadius: 1,
        }}>
          <img
            src={src} alt={alt} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
          />
        </div>
      </div>
      <div aria-hidden style={{ position: "relative" }}>
        <div style={{ height: 3, margin: "0 -3%", background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 100%)" }} />
        <div style={{
          position: "relative", margin: "0 -5.5%", height: 12,
          background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 60%, #151515 100%)",
          borderRadius: "0 0 14px 14px",
          boxShadow: "0 10px 22px -8px rgba(0,0,0,0.22), 0 2px 4px rgba(0,0,0,0.08)",
        }}>
          <span style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "22%", height: 4, background: "#0e0e0e", borderRadius: "0 0 6px 6px",
          }} />
        </div>
      </div>
    </div>
  );
}

/** TV wall frame, 16/9. */
function TVFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{
      width: "100%",
      padding: "clamp(10px, 1.2vw, 14px)",
      background: vf.ink,
      borderRadius: 10,
      boxShadow: `0 1px 2px rgba(0,0,0,0.08), 0 32px 80px rgba(15, 42, 120, 0.24)`,
    }}>
      <div style={{
        background: "#fff", borderRadius: 4, overflow: "hidden",
        aspectRatio: "16 / 9", position: "relative",
      }}>
        <img src={src} alt={alt} loading="lazy" style={{
          width: "100%", height: "100%", display: "block", objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", top: 14, right: 18,
          ...mono, fontSize: 10, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700,
          background: "rgba(255,255,255,0.88)",
          padding: "3px 8px", borderRadius: 3, backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <motion.span
            aria-hidden
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: vf.flag }}
          />
          LAB · LIVE
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TABLET STEPPER: interactive walkthrough
══════════════════════════════════════════════════════════════════ */
type Step = { src: string; label: string; note: string };

function TabletStepper({ steps, figPrefix }: { steps: Step[]; figPrefix: string }) {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <div className="stepper-grid" style={{
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 340px)",
      gap: "clamp(28px, 3.5vw, 56px)",
      alignItems: "start",
    }}>
      <div style={{ position: "relative" }}>
        <div aria-hidden style={{
          position: "absolute", inset: "-10% -5%",
          background: `radial-gradient(50% 50% at 50% 50%, ${vf.light} 0%, ${vf.primary} 40%, rgba(30,64,175,0) 72%)`,
          filter: "blur(40px)", opacity: 0.18, zIndex: 0, pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <AnimatedTabletFrame src={current.src} alt={current.label} />
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 22, gap: 14, flexWrap: "wrap",
        }}>
          <span style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
            {figPrefix}.{String(active + 1).padStart(2, "0")} · {current.label}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <StepperBtn disabled={active === 0} onClick={() => setActive(Math.max(0, active - 1))} dir="prev" />
            <StepperBtn disabled={active === steps.length - 1} onClick={() => setActive(Math.min(steps.length - 1, active + 1))} dir="next" />
          </div>
        </div>
      </div>

      <div>
        <div style={{
          ...mono, fontSize: 13, color: vf.muted, letterSpacing: "0.22em", fontWeight: 700,
          marginBottom: 22, display: "flex", alignItems: "center", gap: 10,
        }}>
          <span aria-hidden style={{ width: 3, height: 14, background: vf.primary, display: "inline-block" }} />
          Walkthrough · {steps.length} steps
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={i}>
                <button
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-current={isActive}
                  style={{
                    width: "100%", textAlign: "left",
                    padding: "18px 18px 18px 16px",
                    background: isActive ? vf.subtle : "transparent",
                    border: "none",
                    borderLeft: `2px solid ${isActive ? vf.primary : "var(--border-light)"}`,
                    cursor: "pointer",
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    gap: 14,
                    transition: "background-color 220ms ease-out, border-color 220ms ease-out",
                  }}
                >
                  <span style={{
                    ...mono, fontSize: 13, fontWeight: 700,
                    color: isActive ? vf.primary : "var(--text-muted)",
                    letterSpacing: "0.18em", paddingTop: 3,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: sans, fontSize: 18, fontWeight: isActive ? 600 : 500,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      marginBottom: 6, transition: "color 200ms", lineHeight: 1.3,
                    }}>
                      {s.label}
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: [0.25, 1, 0.4, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, paddingTop: 4 }}>
                            {s.note}
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
      <style>{`
        @media (max-width: 860px) {
          .stepper-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

function StepperBtn({ disabled, onClick, dir }: { disabled: boolean; onClick: () => void; dir: "prev" | "next" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous step" : "Next step"}
      style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "var(--bg-elevated)",
        border: `1px solid ${disabled ? "var(--border-light)" : vf.subtle}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background-color 200ms, border-color 200ms, transform 200ms",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = vf.primary;
        e.currentTarget.style.borderColor = vf.primary;
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.querySelector("svg")?.setAttribute("color", "#fff");
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "var(--bg-elevated)";
        e.currentTarget.style.borderColor = vf.subtle;
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.querySelector("svg")?.setAttribute("color", vf.primary);
      }}
    >
      {dir === "prev" ? <ArrowLeft size={16} color={vf.primary} /> : <ArrowRight size={16} color={vf.primary} />}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════
   OVERRIDE TIMELINE: failure path - forensic log treatment
══════════════════════════════════════════════════════════════════ */
function OverrideTimeline() {
  const stages: {
    src: string; badge: string; color: string; label: string; caption: string; actor: string;
  }[] = [
    { src: "/veriflow/validation-failed-rotate-cooler-message.png", badge: "T+0s",  color: vf.flag,    label: "Validation fails",  caption: "Plain-language retry. No blame, no jargon.", actor: "Courier · retries" },
    { src: "/veriflow/after-30-seconds-give-override-button.png",   badge: "T+30s", color: vf.warn,    label: "Override appears",  caption: "Pause is forced. Second attempt earns the option.", actor: "System · waits" },
    { src: "/veriflow/override-pin-authentication.png",             badge: "T+35s", color: vf.primary, label: "Supervisor PIN",    caption: "A named person accepts responsibility for the exit.", actor: "Supervisor · signs" },
    { src: "/veriflow/override-confirmation.png",                   badge: "T+40s", color: vf.status,  label: "Cleared",           caption: "The cooler leaves. The override leaves a trail.", actor: "Audit log · written" },
  ];
  return (
    <div style={{ position: "relative" }}>
      {/* Top timeline rail with ticks */}
      <div aria-hidden style={{
        position: "relative", height: 44, marginBottom: 12,
      }}>
        <div style={{
          position: "absolute", left: "6%", right: "6%", top: 22, height: 1,
          background: `linear-gradient(90deg, ${vf.flag} 0%, ${vf.warn} 33%, ${vf.primary} 66%, ${vf.status} 100%)`,
          opacity: 0.35,
        }} />
        <div className="timeline-ticks" style={{
          position: "absolute", inset: 0,
          display: "grid", gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
          gap: "clamp(14px, 1.8vw, 22px)",
        }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
            }}>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 * i + 0.2, duration: 0.5, ease: [0.25, 1, 0.4, 1] }}
                style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: "#fff", border: `2px solid ${s.color}`,
                  boxShadow: `0 0 0 4px ${s.color}14`,
                  marginTop: 15,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-grid" style={{
        display: "grid",
        gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
        gap: "clamp(14px, 1.8vw, 22px)",
      }}>
        {stages.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.25, 1, 0.4, 1] }}
            style={{
              background: "var(--bg-elevated)",
              border: `1px solid ${vf.subtle}`,
              borderRadius: 8,
              padding: "clamp(18px, 1.8vw, 26px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span aria-hidden style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color,
            }} />
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 16, gap: 10,
            }}>
              <span style={{
                ...mono, fontSize: 13, color: s.color, letterSpacing: "0.18em", fontWeight: 700,
                padding: "4px 10px", border: `1px solid ${s.color}`, borderRadius: 3,
                background: `${s.color}12`,
              }}>
                {s.badge}
              </span>
              <span style={{
                ...mono, fontSize: 11, color: vf.muted, letterSpacing: "0.22em", fontWeight: 700,
              }}>
                STAGE · 0{i + 1}
              </span>
            </div>

            <TabletFrame src={s.src} alt={s.label} slim />

            <div style={{ marginTop: 20 }}>
              <div style={{
                fontFamily: serif, fontWeight: 600,
                fontSize: "clamp(22px, 2.1vw, 26px)",
                letterSpacing: "-0.01em", lineHeight: 1.25,
                color: "var(--text-primary)", marginBottom: 10,
              }}>
                {s.label}
              </div>
              <p style={{
                fontFamily: sans, fontSize: 18, lineHeight: 1.6,
                color: "var(--text-secondary)", margin: 0, marginBottom: 16,
              }}>
                {s.caption}
              </p>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                paddingTop: 14, borderTop: `1px dashed ${vf.subtle}`,
              }}>
                <span aria-hidden style={{
                  width: 7, height: 7, borderRadius: "50%", background: s.color, flexShrink: 0,
                }} />
                <span style={{
                  ...mono, fontSize: 12, color: vf.muted, letterSpacing: "0.16em",
                  textTransform: "uppercase", fontWeight: 600,
                }}>
                  {s.actor}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        <style>{`
          @media (max-width: 980px) {
            .timeline-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .timeline-ticks { display: none !important; }
          }
          @media (max-width: 560px) {
            .timeline-grid { grid-template-columns: minmax(0, 1fr) !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BEFORE → AFTER BAND: wide editorial contrast
══════════════════════════════════════════════════════════════════ */
function BeforeAfterBand() {
  const [hover, setHover] = useState<"before" | "after" | null>(null);
  return (
    <div style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
      <div style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <span aria-hidden style={{ width: 3, height: 14, background: vf.primary, display: "inline-block" }} />
        WHAT THIS REPLACED
      </div>
      <div className="ba-band" style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "stretch",
        gap: 0,
        border: `1px solid ${vf.subtle}`,
        borderRadius: 8,
        background: "var(--bg-elevated)",
        overflow: "hidden",
      }}>
        {/* BEFORE */}
        <motion.div
          onHoverStart={() => setHover("before")}
          onHoverEnd={() => setHover(null)}
          style={{
            padding: "clamp(28px, 3.2vw, 44px)",
            position: "relative",
            background: hover === "before" ? `${vf.flag}08` : "transparent",
            transition: "background 300ms",
          }}
        >
          <span aria-hidden style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: vf.flag,
            transform: hover === "before" ? "scaleY(1)" : "scaleY(0.25)",
            transformOrigin: "top", transition: "transform 400ms ease-out",
          }} />
          <div style={{
            ...mono, fontSize: 12, color: vf.flag, letterSpacing: "0.22em", fontWeight: 700,
            marginBottom: 14, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: vf.flag,
              animation: hover === "before" ? "status-pulse 1.8s ease-in-out infinite" : "none",
            }} />
            BEFORE
          </div>
          <div style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: "clamp(26px, 2.8vw, 34px)",
            letterSpacing: "-0.02em", lineHeight: 1.2,
            color: "var(--text-primary)", marginBottom: 12,
          }}>
            A guessed journey.
          </div>
          <p style={{
            fontFamily: sans, fontSize: 18, lineHeight: 1.65,
            color: "var(--text-secondary)", margin: 0,
          }}>
            Clipboards, phone calls, last-mile uncertainty. The cooler left at 9am and you hoped it arrived.
          </p>
        </motion.div>

        {/* DIVIDER with arrow */}
        <div className="ba-divider" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "clamp(20px, 2.4vw, 32px) 0",
          borderLeft: `1px solid ${vf.subtle}`,
          borderRight: `1px solid ${vf.subtle}`,
          background: "var(--bg-primary)",
          minWidth: 72,
        }}>
          <motion.div
            animate={{ x: hover ? 4 : 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.4, 1] }}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: vf.primary, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 4px 14px ${vf.primary}40`,
            }}
          >
            <ArrowRight size={20} color="#fff" weight="bold" />
          </motion.div>
        </div>

        {/* AFTER */}
        <motion.div
          onHoverStart={() => setHover("after")}
          onHoverEnd={() => setHover(null)}
          style={{
            padding: "clamp(28px, 3.2vw, 44px)",
            position: "relative",
            background: hover === "after" ? `${vf.status}08` : "transparent",
            transition: "background 300ms",
          }}
        >
          <span aria-hidden style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: 3, background: vf.status,
            transform: hover === "after" ? "scaleY(1)" : "scaleY(0.25)",
            transformOrigin: "top", transition: "transform 400ms ease-out",
          }} />
          <div style={{
            ...mono, fontSize: 12, color: vf.status, letterSpacing: "0.22em", fontWeight: 700,
            marginBottom: 14, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: vf.status,
              animation: hover === "after" ? "status-pulse 1.8s ease-in-out infinite" : "none",
            }} />
            AFTER
          </div>
          <div style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: "clamp(26px, 2.8vw, 34px)",
            letterSpacing: "-0.02em", lineHeight: 1.2,
            color: "var(--text-primary)", marginBottom: 12,
          }}>
            A recorded trip.
          </div>
          <p style={{
            fontFamily: sans, fontSize: 18, lineHeight: 1.65,
            color: "var(--text-secondary)", margin: 0,
          }}>
            Every handoff signed. Every sample watchable in real time. Every override an audit event.
          </p>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .ba-band { grid-template-columns: minmax(0, 1fr) !important; }
          .ba-divider { border-left: none !important; border-right: none !important; border-top: 1px solid ${vf.subtle}; border-bottom: 1px solid ${vf.subtle}; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ROLE ROW: interactive list row
══════════════════════════════════════════════════════════════════ */
function RoleRow({ index, line }: { index: number; line: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 20,
        alignItems: "center",
        padding: "20px 18px 20px 0",
        borderBottom: `1px solid var(--border-light)`,
        position: "relative",
        cursor: "default",
        transition: "padding-left 300ms ease-out",
        paddingLeft: hovered ? 16 : 0,
      }}
    >
      <span aria-hidden style={{
        position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
        width: 3, height: hovered ? "70%" : "0%", background: vf.primary,
        transition: "height 320ms ease-out",
      }} />
      <span style={{
        ...mono, fontSize: 13, fontWeight: 700,
        color: hovered ? vf.primary : "var(--text-muted)",
        letterSpacing: "0.18em", width: 32, flexShrink: 0,
        transition: "color 240ms",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span style={{
        fontFamily: sans, fontSize: 18,
        color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
        lineHeight: 1.55, fontWeight: hovered ? 500 : 400,
        transition: "color 240ms, font-weight 240ms",
      }}>
        {line}
      </span>
    </li>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LESSON CARD: hover-expand takeaway
══════════════════════════════════════════════════════════════════ */
function LessonCard({ index, title, body, tag }: { index: number; title: string; body: string; tag: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "clamp(20px, 2.4vw, 28px)",
        background: "var(--bg-elevated)",
        border: `1px solid ${hovered ? vf.primary : vf.subtle}`,
        borderRadius: 6,
        cursor: "default",
        transition: "border-color 240ms",
        overflow: "hidden",
      }}
      animate={{ y: hovered ? -3 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.4, 1] }}
    >
      <span aria-hidden style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: vf.primary,
        transform: hovered ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "center", transition: "transform 380ms ease-out",
      }} />
      <div style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        marginBottom: 14, gap: 12,
      }}>
        <span style={{
          ...mono, fontSize: 13, fontWeight: 700,
          color: vf.primary, letterSpacing: "0.18em",
        }}>
          L.0{index + 1}
        </span>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
          transition={{ duration: 0.3 }}
          style={{
            ...mono, fontSize: 11, fontWeight: 700,
            color: vf.muted, letterSpacing: "0.22em",
          }}
        >
          {tag}
        </motion.span>
      </div>
      <div style={{
        fontFamily: serif, fontWeight: 700,
        fontSize: "clamp(20px, 2vw, 24px)",
        letterSpacing: "-0.01em", lineHeight: 1.25,
        color: "var(--text-primary)", marginBottom: 10,
      }}>
        {title}
      </div>
      <p style={{
        fontFamily: sans, fontSize: 18, lineHeight: 1.75,
        color: "var(--text-secondary)", margin: 0,
      }}>
        {body}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SYSTEM DIAGRAM: three surfaces with preview thumbnails
══════════════════════════════════════════════════════════════════ */
function SystemDiagram() {
  const [hover, setHover] = useState<number | null>(null);
  const nodes: { label: string; role: string; Icon: Icon; qty: string; preview: string }[] = [
    { label: "Tablet",     role: "The action. PIN, scan, verify, exit.",                  Icon: Tablet,     qty: "kiosk · 10\"",    preview: "/veriflow/start-scanning.png" },
    { label: "Web",        role: "The memory. Dashboards, registry, per-sample journey.", Icon: Monitor,    qty: "control tower",   preview: "/veriflow/dashboard.png" },
    { label: "Ambient TV", role: "The state. Glance, don't click.",                       Icon: Television, qty: "wall mount",      preview: "/veriflow/tv-dashboard-1.png" },
  ];
  return (
    <div style={{
      padding: "clamp(28px, 4vw, 44px)",
      background: "var(--bg-elevated)",
      border: `1px solid ${vf.subtle}`,
      borderRadius: 8, position: "relative",
    }}>
      <div style={{
        ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700,
        marginBottom: 32, display: "flex", alignItems: "center", gap: 10,
      }}>
        <span aria-hidden style={{ width: 3, height: 14, background: vf.primary }} />
        FIG. 03 · THREE SURFACES, ONE CHAIN
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "clamp(20px, 2.2vw, 28px)",
      }}>
        {nodes.map((n, i) => {
          const pad = "clamp(22px, 2.2vw, 30px)";
          return (
          <motion.div
            key={n.label}
            onHoverStart={() => setHover(i)}
            onHoverEnd={() => setHover(null)}
            style={{
              background: "#fff",
              border: `1px solid ${hover === i ? vf.primary : vf.subtle}`, borderRadius: 6,
              position: "relative",
              transition: "border-color 240ms, transform 240ms",
              transform: hover === i ? "translateY(-4px)" : "translateY(0)",
              cursor: "default",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: pad, paddingBottom: 0 }}>
              <div style={{
                position: "absolute", top: 14, right: 16,
                ...mono, fontSize: 11, color: vf.muted, letterSpacing: "0.14em",
              }}>
                S.0{i + 1}
              </div>
              <div style={{
                width: 52, height: 52, borderRadius: 6,
                background: vf.subtle, display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 18,
              }}>
                <n.Icon size={26} color={vf.primary} weight="regular" />
              </div>
              <div style={{
                fontFamily: serif, fontWeight: 600, fontSize: "clamp(22px, 2.2vw, 28px)",
                color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.2,
              }}>
                {n.label}
              </div>
              <div style={{
                fontFamily: sans, fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.75,
                marginBottom: 16,
              }}>
                {n.role}
              </div>
              <div style={{
                ...mono, fontSize: 12, color: vf.primary, letterSpacing: "0.18em", fontWeight: 700,
                marginBottom: 20,
              }}>
                {n.qty}
              </div>
            </div>
            <div style={{
              aspectRatio: "16/10",
              overflow: "hidden",
              borderTop: `1px solid ${vf.subtle}`,
              background: "#FAFAFA",
            }}>
              <img src={n.preview} alt="" style={{
                width: "100%", height: "100%", objectFit: "cover",
                transform: hover === i ? "scale(1.04)" : "scale(1)",
                transition: "transform 500ms ease-out",
              }} />
            </div>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LAPTOP SPREAD: full-width laptop + alternating text column
══════════════════════════════════════════════════════════════════ */
function LaptopSpread({
  fig, title, body, src, kicker, reverse = false,
}: {
  fig: string; title: string; body: string; src: string; kicker: string; reverse?: boolean;
}) {
  return (
    <div className="laptop-spread" style={{
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 380px)",
      gap: "clamp(36px, 5vw, 72px)",
      alignItems: "center",
      direction: reverse ? "rtl" : "ltr",
    }}>
      <div className="laptop-spread-img" style={{ direction: "ltr", position: "relative" }}>
        <div aria-hidden style={{
          position: "absolute", inset: "-6% -4%",
          background: `radial-gradient(60% 60% at 50% 50%, ${vf.light} 0%, ${vf.primary} 45%, rgba(30,64,175,0) 75%)`,
          filter: "blur(40px)", opacity: 0.18, zIndex: 0, pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <LaptopFrame src={src} alt={title} />
        </div>
      </div>
      <div style={{ direction: "ltr" }}>
        <div style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 12 }}>
          {fig} · {kicker}
        </div>
        <h3 style={{
          fontFamily: serif, fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 34px)",
          letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--text-primary)",
          marginBottom: 18,
        }}>
          {title}
        </h3>
        <p style={{ fontFamily: sans, fontSize: 19, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          {body}
        </p>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .laptop-spread { grid-template-columns: minmax(0, 1fr) !important; direction: ltr !important; }
          .laptop-spread-img { padding: 0 clamp(12px, 5vw, 32px); }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PRINCIPLE CARD
══════════════════════════════════════════════════════════════════ */
function PrincipleCard({
  num, title, description, IconComp,
}: {
  num: string; title: string; description: string; IconComp: Icon;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "clamp(24px, 3vw, 32px)",
        background: "var(--bg-elevated)",
        border: `1px solid ${hovered ? vf.primary : vf.subtle}`, borderRadius: 6,
        position: "relative", height: "100%",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color 240ms, transform 240ms",
        cursor: "default",
      }}
    >
      <span aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: vf.primary,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 320ms ease-out",
      }} />
      <div style={{
        position: "absolute", top: 16, right: 18,
        ...mono, fontSize: 12, color: vf.muted, letterSpacing: "0.16em",
      }}>
        {num}
      </div>
      <div style={{
        width: 48, height: 48, borderRadius: 6,
        background: hovered ? vf.primary : vf.subtle,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 22, transition: "background 240ms",
      }}>
        <IconComp size={24} color={hovered ? "#fff" : vf.primary} weight="regular" />
      </div>
      <div style={{
        fontFamily: serif, fontWeight: 600, fontSize: "clamp(20px, 1.9vw, 24px)",
        color: "var(--text-primary)", marginBottom: 12, letterSpacing: "-0.01em", lineHeight: 1.25,
      }}>
        {title}
      </div>
      <div style={{
        fontFamily: sans, fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.75,
      }}>
        {description}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GAP ROW: editorial row (big numeral · title · body · icon)
══════════════════════════════════════════════════════════════════ */
function GapRow({
  index, Icon: IconComp, k, t,
}: {
  index: number; Icon: Icon; k: string; t: string;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 1, 0.4, 1] }}
      className="vf-gap-row"
      style={{
        display: "grid",
        gridTemplateColumns: "clamp(96px, 10vw, 140px) minmax(0, 1fr) auto",
        gap: "clamp(24px, 3vw, 48px)",
        alignItems: "center",
        padding: "clamp(28px, 3.5vw, 40px) 0",
        borderBottom: `1px solid ${vf.subtle}`,
        position: "relative",
      }}
    >
      {/* Sweep indicator on hover */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.4, 1] }}
        style={{
          position: "absolute", left: 0, right: 0, bottom: -1, height: 2,
          background: vf.flag, transformOrigin: "left",
        }}
      />
      {/* Big serif numeral in flag color */}
      <motion.div
        animate={{ x: hovered ? 6 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.4, 1] }}
        style={{
          fontFamily: serif, fontWeight: 700,
          fontSize: "clamp(64px, 7.5vw, 104px)",
          color: vf.flag, letterSpacing: "-0.045em", lineHeight: 0.9,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* Title + body */}
      <div>
        <div style={{ ...mono, fontSize: 13, color: vf.flag, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 10 }}>
          GAP {String(index + 1).padStart(2, "0")}
        </div>
        <h3 style={{
          fontFamily: serif, fontWeight: 700,
          fontSize: "clamp(22px, 2.2vw, 30px)",
          letterSpacing: "-0.02em", lineHeight: 1.25,
          color: "var(--text-primary)", marginBottom: 10,
        }}>
          {k}
        </h3>
        <p style={{
          fontFamily: sans, fontSize: 19, lineHeight: 1.7,
          color: "var(--text-secondary)", margin: 0, maxWidth: 680,
        }}>
          {t}
        </p>
      </div>

      {/* Icon ornament, circular outlined */}
      <motion.div
        animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.4, 1] }}
        style={{
          width: 60, height: 60, borderRadius: "50%",
          border: `1px solid ${hovered ? vf.flag : vf.subtle}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "border-color 240ms",
        }}
      >
        <IconComp size={24} color={hovered ? vf.flag : vf.primary} weight="regular" />
      </motion.div>

      <style>{`
        @media (max-width: 720px) {
          .vf-gap-row {
            grid-template-columns: clamp(72px, 18vw, 96px) minmax(0, 1fr) !important;
          }
          .vf-gap-row > :last-child { display: none !important; }
        }
      `}</style>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   JOURNEY ILLUSTRATION: clinic → courier → lab
══════════════════════════════════════════════════════════════════ */
function JourneyIllustration() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const nodes = [
    { x: 140, label: "CLINIC",  sub: "patient draw"      },
    { x: 500, label: "COURIER", sub: "pickup + transit"  },
    { x: 860, label: "LAB",     sub: "receive + analyse" },
  ];
  const handLabels = ["HAND 01", "HAND 03", "HAND 05"];

  return (
    <div style={{
      padding: "clamp(24px, 3vw, 40px)",
      background: "var(--bg-elevated)",
      border: `1px solid ${vf.subtle}`,
      borderRadius: 6, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700,
        marginBottom: 22, display: "flex", alignItems: "center", gap: 10,
      }}>
        <span aria-hidden style={{ width: 3, height: 14, background: vf.primary }} />
        FIG. 01 · FIVE HANDS, THREE BUILDINGS
      </div>
      <svg ref={ref} viewBox="0 0 1000 340" preserveAspectRatio="xMidYMid meet" style={{
        width: "100%", height: "auto", display: "block",
      }}>
        <defs>
          <pattern id="vf-grid-sm" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={vf.subtle} strokeWidth="1" />
          </pattern>
          <pattern id="vf-grid-lg" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={vf.subtle} strokeWidth="1" />
          </pattern>
          <marker id="vf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={vf.primary} />
          </marker>
        </defs>
        <rect x="0" y="0" width="1000" height="340" fill="url(#vf-grid-sm)" opacity="0.8" />
        <rect x="0" y="0" width="1000" height="340" fill="url(#vf-grid-lg)" opacity="0.6" />

        {/* Guide line between first and last node */}
        <motion.line
          x1={nodes[0].x + 60} y1="170"
          x2={nodes[nodes.length - 1].x - 60} y2="170"
          stroke={vf.primary} strokeWidth="1.2" strokeDasharray="2 6" opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.25, 1, 0.4, 1], delay: 0.2 }}
        />

        {/* HAND labels, well clear of the circles, high-contrast primary */}
        {handLabels.map((label, i) => (
          <motion.g
            key={label}
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.25, 1, 0.4, 1] }}
          >
            <line
              x1={nodes[i].x} y1="72"
              x2={nodes[i].x} y2="120"
              stroke={vf.primary} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.55"
            />
            <rect
              x={nodes[i].x - 44} y="38" width="88" height="28" rx="3"
              fill={vf.surface} stroke={vf.primary} strokeWidth="1"
            />
            <text
              x={nodes[i].x} y="57" textAnchor="middle"
              style={{ ...mono, fontSize: 14, fill: vf.primary, letterSpacing: "0.22em", fontWeight: 700 }}
            >
              {label}
            </text>
          </motion.g>
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 + i * 0.16, duration: 0.7, ease: [0.25, 1, 0.4, 1] }}
          >
            <circle cx={n.x} cy="170" r="48" fill={vf.surface} stroke={vf.primary} strokeWidth="1.4" />
            <circle cx={n.x} cy="170" r="7" fill={vf.primary} />
            <text x={n.x} y="254" textAnchor="middle"
              style={{ ...mono, fontSize: 17, fill: vf.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
              {n.label}
            </text>
            <text x={n.x} y="282" textAnchor="middle"
              style={{ fontFamily: sans, fontSize: 17, fill: "var(--text-primary)", fontWeight: 500 }}>
              {n.sub}
            </text>
          </motion.g>
        ))}

        {/* Arrows between nodes */}
        {nodes.slice(0, -1).map((n, i) => (
          <motion.line
            key={`arrow-${i}`}
            x1={n.x + 52} y1="170"
            x2={nodes[i + 1].x - 54} y2="170"
            stroke={vf.primary} strokeWidth="1.6"
            markerEnd="url(#vf-arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.75 } : {}}
            transition={{ delay: 1.0 + i * 0.18, duration: 0.9, ease: [0.25, 1, 0.4, 1] }}
          />
        ))}

        {/* Travelling cooler: sits at Hand 01 → travels to Hand 03 → Hand 05 → loops */}
        <motion.g
          initial={{ x: 0, opacity: 0 }}
          animate={inView ? {
            x:       [0, 0,    nodes[1].x - nodes[0].x, nodes[1].x - nodes[0].x, nodes[2].x - nodes[0].x, nodes[2].x - nodes[0].x, nodes[2].x - nodes[0].x],
            opacity: [1, 1,    1,                        1,                        1,                        1,                        0],
          } : {}}
          transition={{
            duration: 6.4,
            times:   [0, 0.08, 0.38,                     0.5,                      0.82,                     0.92,                     1],
            ease: [0.25, 1, 0.4, 1],
            repeat: Infinity,
            repeatDelay: 0.4,
            delay: 1.6,
          }}
        >
          <rect x={nodes[0].x - 18} y="155" width="36" height="30" rx="3"
            fill={vf.primary} opacity="0.95" />
          <rect x={nodes[0].x - 11} y="150" width="22" height="5" rx="1" fill={vf.primary} />
          <line x1={nodes[0].x - 7} y1="167" x2={nodes[0].x + 7} y2="167"
            stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
          <line x1={nodes[0].x - 7} y1="175" x2={nodes[0].x + 7} y2="175"
            stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
        </motion.g>
      </svg>
      <div style={{
        marginTop: 18, ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em",
        textAlign: "center", fontWeight: 600, opacity: 0.85,
      }}>
        A TUBE'S JOURNEY · 5 HANDS · 3 BUILDINGS · PAPER CHAIN
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO MOCKUPS: laptop + tablet with mouse-parallax
══════════════════════════════════════════════════════════════════ */
function HeroMockups() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const laptopX = useSpring(mx, { stiffness: 60, damping: 18 });
  const laptopY = useSpring(my, { stiffness: 60, damping: 18 });
  const tabletX = useSpring(mx, { stiffness: 80, damping: 16 });
  const tabletY = useSpring(my, { stiffness: 80, damping: 16 });

  const handleMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    mx.set(nx);
    my.set(ny);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="md:col-span-7"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1.0, ease: [0.25, 1, 0.4, 1] }}
      style={{ position: "relative", width: "100%", minWidth: 0 }}
    >
      <div aria-hidden style={{
        position: "absolute", inset: "-8% -6%",
        background: `radial-gradient(55% 55% at 55% 50%, ${vf.light} 0%, ${vf.primary} 40%, rgba(30,64,175,0) 72%)`,
        filter: "blur(40px)", opacity: 0.4, zIndex: 0, pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", left: "-10%", top: "15%",
        width: "55%", height: "55%",
        background: `radial-gradient(circle, ${vf.primary} 0%, rgba(30,64,175,0) 70%)`,
        filter: "blur(40px)", opacity: 0.35, zIndex: 0, pointerEvents: "none",
      }} />

      {/* Laptop: main focal object, subtle cursor-parallax */}
      <motion.div
        style={{
          position: "relative", zIndex: 2,
          width: "94%", marginLeft: "6%",
          willChange: "transform",
          x: useTransform(laptopX, (v) => v * 10),
          y: useTransform(laptopY, (v) => v * 8),
          rotateX: useTransform(laptopY, (v) => v * -2),
          rotateY: useTransform(laptopX, (v) => v * 2),
          transformPerspective: 1200,
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 24px 48px rgba(15,42,120,0.2))" }}
        >
          <LaptopFrame src="/veriflow/home.png" alt="Veriflow admin, multi-hospital dashboard" />
        </motion.div>
      </motion.div>

      {/* Tablet, overlaps bottom-right, larger to feel proportionate to the laptop */}
      <motion.div
        className="vf-hero-tablet"
        style={{
          position: "absolute",
          right: "-5%", bottom: "-18%",
          width: "50%",
          zIndex: 3,
          willChange: "transform",
          transformOrigin: "center",
          x: useTransform(tabletX, (v) => v * -16),
          y: useTransform(tabletY, (v) => v * -14),
          rotateX: useTransform(tabletY, (v) => v * 3),
          rotateY: useTransform(tabletX, (v) => v * -3),
          transformPerspective: 1000,
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-1.2, -0.4, -1.2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          style={{ filter: "drop-shadow(0 28px 56px rgba(15,42,120,0.32))" }}
        >
          <TabletFrame src="/veriflow/start-scanning.png" alt="Veriflow clinic tablet" />
        </motion.div>
      </motion.div>
      <style>{`
        @media (max-width: 767px) {
          .vf-hero-section { height: auto !important; min-height: calc(100svh - 56px); overflow: visible !important; padding-bottom: 28px; }
          .vf-hero-tablet { bottom: -4% !important; right: 0% !important; }
        }
      `}</style>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   COOLER SKETCH: hand-drawn blueprint-style illustration
══════════════════════════════════════════════════════════════════ */
function CoolerSketch() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div style={{
      padding: "clamp(28px, 3.5vw, 44px)",
      background: "var(--bg-elevated)",
      border: `1px solid ${vf.subtle}`,
      borderRadius: 6, position: "relative", overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(30,64,175,0.05) 0, rgba(30,64,175,0.05) 1px, transparent 1px, transparent 24px)," +
          "repeating-linear-gradient(90deg, rgba(30,64,175,0.05) 0, rgba(30,64,175,0.05) 1px, transparent 1px, transparent 24px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(180px, 260px)",
        gap: "clamp(24px, 3vw, 40px)", alignItems: "center",
      }} className="sketch-grid">
        <svg ref={ref} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" style={{
          width: "100%", height: "auto", display: "block",
        }}>
          <defs>
            <pattern id="vf-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke={vf.primary} strokeWidth="0.6" opacity="0.3" />
            </pattern>
          </defs>

          {/* Cooler body */}
          <motion.g
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.4, 1] }}
          >
            <rect x="80" y="90" width="240" height="140" rx="6"
              fill="url(#vf-hatch)" stroke={vf.primary} strokeWidth="1.4" />
            {/* Lid */}
            <rect x="76" y="78" width="248" height="20" rx="4"
              fill={vf.surface} stroke={vf.primary} strokeWidth="1.4" />
            {/* Handle */}
            <path d="M 160 78 Q 160 56, 200 56 Q 240 56, 240 78"
              fill="none" stroke={vf.primary} strokeWidth="1.4" strokeLinecap="round" />
            {/* QR sticker */}
            <rect x="110" y="132" width="44" height="44" rx="2"
              fill="#fff" stroke={vf.primary} strokeWidth="1" />
            <rect x="116" y="138" width="12" height="12" fill={vf.primary} />
            <rect x="136" y="138" width="12" height="12" fill={vf.primary} />
            <rect x="116" y="158" width="12" height="12" fill={vf.primary} />
            <rect x="138" y="158" width="4"  height="4"  fill={vf.primary} />
            <rect x="146" y="160" width="4"  height="4"  fill={vf.primary} />
            {/* Label */}
            <rect x="180" y="148" width="110" height="18" rx="2"
              fill="#fff" stroke={vf.primary} strokeWidth="0.8" />
            <line x1="186" y1="156" x2="280" y2="156" stroke={vf.primary} strokeWidth="0.6" opacity="0.5" />
            <line x1="186" y1="160" x2="260" y2="160" stroke={vf.primary} strokeWidth="0.6" opacity="0.5" />
          </motion.g>

          {/* Callout lines */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <line x1="132" y1="132" x2="60" y2="60" stroke={vf.primary} strokeWidth="0.8" strokeDasharray="2 3" />
            <circle cx="60" cy="60" r="3" fill={vf.primary} />
            <text x="18" y="50" style={{ ...mono, fontSize: 9, fill: vf.primary, letterSpacing: "0.2em", fontWeight: 700 }}>
              QR · PAIRED
            </text>

            <line x1="235" y1="157" x2="370" y2="50" stroke={vf.primary} strokeWidth="0.8" strokeDasharray="2 3" />
            <circle cx="370" cy="50" r="3" fill={vf.primary} />
            <text x="316" y="40" style={{ ...mono, fontSize: 9, fill: vf.primary, letterSpacing: "0.2em", fontWeight: 700 }}>
              COOLER ID
            </text>

            <line x1="200" y1="78" x2="200" y2="30" stroke={vf.primary} strokeWidth="0.8" strokeDasharray="2 3" />
            <circle cx="200" cy="30" r="3" fill={vf.primary} />
            <text x="160" y="22" style={{ ...mono, fontSize: 9, fill: vf.primary, letterSpacing: "0.2em", fontWeight: 700 }}>
              TEMP-LOCK
            </text>
          </motion.g>

          {/* Dimension ticks */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <line x1="80" y1="248" x2="320" y2="248" stroke={vf.muted} strokeWidth="0.6" />
            <line x1="80" y1="244" x2="80" y2="252" stroke={vf.muted} strokeWidth="0.6" />
            <line x1="320" y1="244" x2="320" y2="252" stroke={vf.muted} strokeWidth="0.6" />
            <text x="200" y="258" textAnchor="middle" style={{ ...mono, fontSize: 8, fill: vf.muted, letterSpacing: "0.22em" }}>
              ONE UNIT OF TRUST
            </text>
          </motion.g>
        </svg>
        <div>
          <div style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 14 }}>
            FIG. 02 · THE COOLER
          </div>
          <p style={{ fontFamily: sans, fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
            Every rule on this page exists so this one object never disappears between two people.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .sketch-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════════
   NAV CARD - visual "more case studies" tile (project gradient hero)
══════════════════════════════════════════════════════════════════ */
function NavCard({ project }: { project: Project }) {
  const [hover, setHover] = useState(false);
  const accent = `hsl(${project.accentHue}, 38%, 48%)`;
  const pa = project.accent;

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
        background: `
          radial-gradient(140% 60% at 50% 0%, ${pa.surface} 0%, ${pa.primary}0d 55%, ${pa.surface} 100%),
          linear-gradient(180deg, ${pa.surface} 0%, ${pa.primary}10 100%)
        `,
        transition: "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, ${pa.primary}10 0, ${pa.primary}10 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(90deg, ${pa.primary}10 0, ${pa.primary}10 1px, transparent 1px, transparent 48px)
          `,
          opacity: hover ? 0.7 : 0.45,
          transitionProperty: "opacity",
          transitionDuration: "400ms",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", zIndex: 2 }}>
        <ProjectHeroStage project={project} hovered={hover} bare />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(18px, 2vw, 26px) clamp(22px, 2.4vw, 32px) clamp(22px, 2.4vw, 30px)",
        }}
      >
        <motion.p
          animate={{ y: hover ? -2 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          style={{
            fontFamily: serif,
            fontWeight: 700,
            fontSize: "clamp(28px, 3vw, 42px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            margin: 0,
            marginBottom: 14,
          }}
        >
          {project.title}
        </motion.p>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: "0.22em",
              fontWeight: 700,
              color: hover ? accent : "var(--text-primary)",
              transition: "color 260ms ease-out",
            }}
          >
            View case study
          </span>
          <motion.span
            animate={{ x: hover ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ display: "inline-flex", color: hover ? accent : "var(--text-primary)", transition: "color 260ms ease-out" }}
          >
            <ArrowRight size={14} weight="regular" />
          </motion.span>
        </div>
      </div>
    </Link>
  );
}

export default function VeriflowCase() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);
  const otherProjects = projects.filter((p) => p.slug !== "veriflow").slice(-2);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowTop(window.scrollY > 800);
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
        background: "var(--bg-primary)", zIndex: 45, pointerEvents: "none",
      }} />

      {/* Scroll progress */}
      <div style={{
        position: "fixed", top: 56, left: 0, right: 0, height: 2,
        background: "var(--bg-primary)", zIndex: 49,
      }}>
        <motion.div style={{
          height: "100%", background: vf.primary,
          scaleX, transformOrigin: "left", opacity: 0.85,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          00 · HERO: laptop (admin web) + tablet overlay
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid vf-hero-section" style={{
        position: "relative",
        height: "calc(var(--vh, 1vh) * 100 - 56px)",
        minHeight: 640,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
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
          <Link to="/#projects"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              ...mono, fontSize: 11, letterSpacing: "0.22em",
              color: "var(--text-secondary)", textDecoration: "none",
              transitionProperty: "color", transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = vf.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M14 9H3M6 5L2 9l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Index
          </Link>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {["Healthcare", "Enterprise", "Web + Tablet + TV"].map((tag) => (
              <span key={tag} style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

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
            {/* LEFT: copy */}
            <div className="md:col-span-5" style={{ minWidth: 0 }}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}
                style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, maxWidth: 460 }}
              >
                <span style={{ ...mono, fontSize: 11, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                  Case Study · 02
                </span>
                <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
                  Healthcare · 2024
                </span>
              </motion.div>

              <div style={{ overflow: "hidden", marginBottom: "clamp(24px, 2.6vw, 36px)" }}>
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.15, duration: 1.0, ease: [0.25, 1, 0.4, 1] }}
                  style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(56px, 8.2vw, 120px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.055em", lineHeight: 0.9,
                    margin: 0,
                  }}>
                  Veriflow<span style={{ color: vf.primary, fontStyle: "italic" }}>.</span>
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
                  marginBottom: "clamp(28px, 3vw, 42px)",
                  letterSpacing: "-0.01em",
                }}
              >
                Specimen chain-of-custody. <span style={{ color: vf.primary }}>Tap, verify, hand off</span>
                across a clinic tablet, a web control tower, and a lab wall.
              </motion.p>

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
                  { label: "Surfaces", value: "Web · Tablet · TV" },
                  { label: "Timeline", value: "3 months" },
                  { label: "Tools",    value: "Figma · FigJam" },
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

            {/* RIGHT: laptop (admin web) + floating tablet overlay, both react to cursor */}
            <HeroMockups />
          </div>
        </div>

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
          01 · PROBLEM  (merged: context + gaps + journey illustration)
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="01" phase="Problem" title="Samples left the clinic. What happened next was mostly a guess." />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
            <Reveal className="md:col-span-7">
              <p style={{ ...t.bodyLg, marginBottom: 22 }}>
                Before a diagnosis, a tube passes through five hands and three buildings, logged on paper
                or not at all. The brief asked for a system that
                <em style={{ color: vf.primary, fontStyle: "italic" }}> knew where every sample was, right now.</em>
              </p>
              <p style={{ ...t.body, marginBottom: 22 }}>
                Blood is time- and temperature-sensitive. A single lost cooler is a patient re-drawn,
                a diagnosis delayed, a clinic day lost.
              </p>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.1}>
              <div style={{
                padding: "clamp(28px, 3.4vw, 40px)",
                background: "var(--bg-elevated)",
                border: `1px solid ${vf.subtle}`,
              }}>
                <Quotes size={22} color={vf.primary} weight="regular" style={{ marginBottom: 14 }} />
                <p style={{
                  fontFamily: serif, fontStyle: "italic",
                  fontSize: "clamp(19px, 1.9vw, 23px)",
                  lineHeight: 1.55, color: "var(--text-primary)", marginBottom: 18,
                }}>
                  "We don't need another chart. We need to know, right now, whether a cooler actually left the clinic."
                </p>
                <div style={{ ...mono, fontSize: 11, color: vf.muted, letterSpacing: "0.18em" }}>
                  LAB OPERATIONS LEAD · DISCOVERY
                </div>
              </div>
            </Reveal>
          </div>

          {/* Journey illustration: clinic → courier → lab */}
          <Reveal delay={0.08}>
            <div style={{ marginTop: "clamp(56px, 7vw, 80px)" }}>
              <JourneyIllustration />
            </div>
          </Reveal>

          {/* Three gaps */}
          <Reveal>
            <div style={{
              marginTop: "clamp(56px, 7vw, 80px)",
              display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 24,
            }}>
              <WarningCircle size={20} color={vf.flag} weight="regular" />
              <span style={{ ...mono, fontSize: 12, color: vf.flag, letterSpacing: "0.22em", fontWeight: 700 }}>
                THREE GAPS THAT COULDN'T BE AFFORDED
              </span>
              <span aria-hidden style={{ flex: 1, height: 1, background: vf.subtle, minWidth: 40 }} />
            </div>
          </Reveal>

          {/* Editorial gap list: big numerals, horizontal rules, not cards */}
          <div style={{ borderTop: `1px solid ${vf.subtle}` }}>
            {[
              { Icon: FileText, k: "No trail",            t: "Handoffs had no record. Couriers scribbled cooler numbers on the same sheet every day." },
              { Icon: HandTap,  k: "Manual verification", t: "Pathologists matched sample IDs by eye. One digit off and the wrong lab received the tube." },
              { Icon: EyeSlash, k: "No live view",        t: "Labs had no forecast of incoming work. Staffing and storage were guesswork until a cooler arrived." },
            ].map((g, i) => (
              <GapRow key={g.k} index={i} {...g} />
            ))}
          </div>

          {/* Stat band: one flat horizontal band with thin dividers, no cards */}
          <Reveal delay={0.08}>
            <div className="vf-stat-band" style={{
              marginTop: "clamp(40px, 5vw, 64px)",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              padding: "clamp(32px, 4vw, 56px) 0",
              borderTop: `1px solid ${vf.subtle}`,
              borderBottom: `1px solid ${vf.subtle}`,
              position: "relative",
            }}>
              {[
                { n: 5,  suffix: "",   k: "Hands per sample",    v: "between patient draw and pathologist screen." },
                { n: 40, suffix: "m",  k: "Invisible delay",     v: "before anyone notices a cooler is late." },
                { n: 3,  suffix: "",   k: "Buildings",           v: "clinic, transit, lab. Three custody zones." },
              ].map((c, i) => (
                <motion.div
                  key={c.k}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 1, 0.4, 1] }}
                  style={{
                    padding: "0 clamp(18px, 3vw, 40px)",
                    borderLeft: i > 0 ? `1px solid ${vf.subtle}` : undefined,
                    display: "flex", flexDirection: "column", gap: 12,
                  }}
                >
                  <div style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(56px, 7vw, 96px)",
                    color: vf.flag, letterSpacing: "-0.045em", lineHeight: 0.95,
                  }}>
                    <CountUp value={c.n} suffix={c.suffix} />
                  </div>
                  <div style={{ ...mono, fontSize: 13, color: vf.flag, letterSpacing: "0.22em", fontWeight: 700 }}>
                    {c.k}
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 18, color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>
                    {c.v}
                  </p>
                </motion.div>
              ))}
              <style>{`
                @media (max-width: 820px) {
                  .vf-stat-band { grid-template-columns: minmax(0, 1fr) !important; }
                  .vf-stat-band > div { border-left: none !important; padding: 24px 0 !important; }
                  .vf-stat-band > div + div { border-top: 1px solid ${vf.subtle}; }
                }
              `}</style>
            </div>
          </Reveal>

          {/* Mission rule */}
          <Reveal delay={0.1}>
            <div style={{
              marginTop: "clamp(48px, 6vw, 72px)",
              display: "flex", alignItems: "flex-start", gap: 16,
              paddingTop: 22, borderTop: "1px solid var(--border)",
            }}>
              <span style={{ width: 3, alignSelf: "stretch", background: vf.primary, flexShrink: 0 }} />
              <p style={{
                fontFamily: serif, fontStyle: "italic",
                fontSize: "clamp(20px, 1.9vw, 26px)",
                lineHeight: 1.45, color: "var(--text-primary)", margin: 0,
                maxWidth: 820,
              }}>
                Veriflow replaces the clipboard with a verified tap at every handoff.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          02 · SYSTEM
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal><SectionHeader num="02" phase="The system" title="Three surfaces, one unbroken chain." /></Reveal>

          <Reveal>
            <p style={{ ...t.bodyLg, maxWidth: 780, marginBottom: 40 }}>
              A tablet carries the <em style={{ color: vf.primary, fontStyle: "italic" }}>action</em> at every handoff.
              A web console carries the <em style={{ color: vf.primary, fontStyle: "italic" }}>memory</em>.
              A wall display carries the <em style={{ color: vf.primary, fontStyle: "italic" }}>current state.</em>
            </p>
          </Reveal>

          <Reveal delay={0.1}><SystemDiagram /></Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          03 · PRINCIPLES
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal><SectionHeader num="03" phase="Principles" title="Four rules that shaped every screen." /></Reveal>

          <Reveal delay={0.05}>
            <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
              <CoolerSketch />
            </div>
          </Reveal>

          <div style={{
            display: "grid", gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}>
            <Reveal delay={0}>
              <PrincipleCard num="P.01" title="Linear, not branching"
                description="A fork in a flow is an error waiting to happen. One next step, always visible."
                IconComp={ArrowRight} />
            </Reveal>
            <Reveal delay={0.08}>
              <PrincipleCard num="P.02" title="Gate at every handoff"
                description="A sample leaves one custody only when the next is confirmed. Small gate, always there."
                IconComp={ShieldCheck} />
            </Reveal>
            <Reveal delay={0.16}>
              <PrincipleCard num="P.03" title="Forgive the hurry"
                description="A missed scan is a retry, not a failure. Override exists, with a PIN and a record."
                IconComp={HandTap} />
            </Reveal>
            <Reveal delay={0.24}>
              <PrincipleCard num="P.04" title="Ambient over alert"
                description="A wall replaces the phone on the counter. Glance, know. No notifications."
                IconComp={Television} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          04 · CLINIC FLOW
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="04" phase="Flow · Clinic" title="A. Association. Tube becomes a trackable object." />
          </Reveal>

          <Reveal>
            <p style={{ ...t.bodyLg, maxWidth: 720, marginBottom: "clamp(40px, 5vw, 64px)" }}>
              A pathologist scans two QR codes and picks a cooler. Four taps, no keyboards.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <TabletStepper
              figPrefix="FIG. 04"
              steps={[
                { src: "/veriflow/start-scanning.png",         label: "Choose action",       note: "The clinic tablet's home. Two big targets for gloved hands." },
                { src: "/veriflow/sample-association.png",     label: "Scan both QRs",       note: "The tube's barcode and the sample ID bind in a single paired scan." },
                { src: "/veriflow/sample-association-4.png",   label: "Association saved",   note: "Ten samples accrued. Tally visible on the right, never hidden." },
                { src: "/veriflow/cooler-assignment.png",      label: "Assign cooler",       note: "Pick, not type. The last gate before a batch leaves the clinic." },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          05 · COURIER FLOW + OVERRIDE
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="05" phase="Flow · Courier" title="B. Pickup, validation, override." />
          </Reveal>

          <Reveal>
            <p style={{ ...t.bodyLg, maxWidth: 720, marginBottom: "clamp(40px, 5vw, 64px)" }}>
              Same tablet, different role. A courier claims a cooler, collects its containers, and clears a gate before leaving.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <TabletStepper
              figPrefix="FIG. 05"
              steps={[
                { src: "/veriflow/home-pin.png",                         label: "PIN in",             note: "Four digits on the tablet. Every action is attributable to a named courier." },
                { src: "/veriflow/pickup-dashboard.png",                 label: "Ready coolers",      note: "Cards of cooler batches waiting for pickup. One tap claims it." },
                { src: "/veriflow/collect-container.png",                label: "Collect containers", note: "Each container is a separate tap. No batch-confirm shortcut." },
                { src: "/veriflow/exit-validation-pin-for-validation.png", label: "Validate at exit", note: "A PIN gate ties a physical exit to a named operator." },
                { src: "/veriflow/exit-validation-successfull.png",      label: "Cross-check",        note: "Tablet cross-checks cooler ID, container count, and courier before releasing." },
                { src: "/veriflow/exit-validation-successfull-2.png",    label: "Cleared",            note: "Happy path. The cooler leaves with a logged, authorised handoff." },
              ]}
            />
          </Reveal>

          {/* Override timeline callout */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: "clamp(64px, 8vw, 96px)" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap",
              }}>
                <ClockCountdown size={22} color={vf.primary} weight="regular" />
                <span style={{ ...mono, fontSize: 14, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700 }}>
                  WHEN VALIDATION FAILS
                </span>
                <span aria-hidden style={{ flex: 1, height: 1, background: vf.subtle, minWidth: 40 }} />
              </div>
              <h3 style={{
                fontFamily: serif, fontWeight: 700, fontSize: "clamp(28px, 3.2vw, 40px)",
                letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--text-primary)",
                marginBottom: 18, maxWidth: 820,
              }}>
                A 30-second pause before override is offered.
              </h3>
              <p style={{ ...t.bodyLg, maxWidth: 780, marginBottom: "clamp(40px, 5vw, 56px)" }}>
                First instinct is to retry. Second is a supervisor PIN. Every override becomes its own audit event.
              </p>
              <OverrideTimeline />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          06 · BEYOND THE KIOSKS (web, laptop mockups)
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="06" phase="Beyond the kiosks" title="The kiosks handle the handoff. Everything else lives on the web." />
          </Reveal>

          <Reveal>
            <p style={{ ...t.bodyLg, maxWidth: 760, marginBottom: "clamp(56px, 7vw, 88px)" }}>
              Three web surfaces for people responsible for the chain, without being at the clinic.
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(80px, 10vw, 140px)" }}>
            <Reveal>
              <LaptopSpread
                fig="W.01"
                kicker="Operations overview"
                title="Everything, one glance."
                body="Compliance rate, active hospitals, RFID reader health, ticket load. Built for a lab director who opens one tab each morning to know whether today is going to be quiet."
                src="/veriflow/dashboard.png"
              />
            </Reveal>
            <Reveal>
              <LaptopSpread
                fig="W.02"
                kicker="Sample registry"
                title="Every sample, addressable."
                body="Filterable by clinic, status, and date. The evidence layer for audits, morning standups, and any call that starts with 'where is sample #...'."
                src="/veriflow/all-samples.png"
                reverse
              />
            </Reveal>
            <Reveal>
              <LaptopSpread
                fig="W.03"
                kicker="Single sample"
                title="One sample, whole journey."
                body="A small isometric map of Clinic → Courier → Lab, paired with a vertical timeline of status changes. One glance beats four columns of text when a cooler is overdue."
                src="/veriflow/tracking-individual-sample.png"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          07 · AMBIENT TV
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: SECTION_PAD, background: vf.ink, color: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div style={{
              display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap", paddingBottom: 14,
            }}>
              <span style={{ ...mono, fontSize: 14, color: vf.light, letterSpacing: "0.22em", fontWeight: 700 }}>
                07 <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/ {TOTAL_SECTIONS}</span>
              </span>
              <span style={{ ...mono, fontSize: 14, color: "#fff", letterSpacing: "0.22em", fontWeight: 600 }}>
                AMBIENT · THE WALL
              </span>
              <div style={{ flex: 1, height: 1, background: vf.light, opacity: 0.4, minWidth: 40 }} />
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(30px, 3.6vw, 44px)",
              letterSpacing: "-0.025em", lineHeight: 1.2,
              color: "#fff", marginTop: 20, maxWidth: 860,
            }}>
              Readable across the room.
            </h2>
          </div>

          <div className="tv-grid" style={{
            display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(260px, 1fr)",
            gap: "clamp(32px, 4vw, 56px)", alignItems: "start",
          }}>
            <Reveal>
              <TVFrame src="/veriflow/tv-dashboard-1.png" alt="TV wall · Live Container Tracker" />
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h3 style={{
                  fontFamily: serif, fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 34px)",
                  letterSpacing: "-0.02em", lineHeight: 1.25, color: "#fff", marginBottom: 18,
                }}>
                  Glance, don't click.
                </h3>
                <p style={{ fontFamily: sans, fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.82)", marginBottom: 20 }}>
                  Break room, specimen receiving, the corridor outside the analyzer bay. No login, no filter.
                </p>
                <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.68)", marginBottom: 28 }}>
                  Color carries the pattern. Red overdue, green arrived, yellow in-transit, blue picked up.
                </p>
                <div style={{
                  padding: "18px 22px", background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 4,
                }}>
                  <div style={{ ...mono, fontSize: 12, color: vf.light, letterSpacing: "0.2em", fontWeight: 700, marginBottom: 10 }}>
                    DESIGN NOTE
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>
                    Type sized for a six-foot viewing distance first. The table structure followed the type, not the other way around.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <style>{`
            @media (max-width: 860px) { .tv-grid { grid-template-columns: minmax(0, 1fr) !important; } }
          `}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          08 · ROLE + TAKEAWAYS
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid-subtle" style={{ padding: SECTION_PAD }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal><SectionHeader num="08" phase="Role · Takeaways" title="What I owned, and what this project taught me." /></Reveal>

          {/* ── BEFORE → AFTER: wide contrast band ─────────────────── */}
          <Reveal>
            <BeforeAfterBand />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start" style={{ marginTop: "clamp(56px, 7vw, 88px)" }}>
            {/* ── LEFT: what I owned (interactive rows) ───────────── */}
            <Reveal className="md:col-span-6">
              <div style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <span aria-hidden style={{ width: 3, height: 14, background: vf.primary, display: "inline-block" }} />
                ROLE · PRODUCT DESIGNER
              </div>
              <h3 style={{
                fontFamily: serif, fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 34px)",
                letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--text-primary)",
                marginBottom: 28, maxWidth: 520,
              }}>
                I owned the chain, end to end.
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Mapped the clinic, courier, lab chain across three roles.",
                  "Designed the tablet kiosks: association, pickup, validation, override.",
                  "Shipped the web control tower (admin, ops, sample journey).",
                  "Laid out the TV wall: six-foot type, color as status encoding.",
                  "Authored the validation-failure plus 30-second override pattern.",
                ].map((line, j) => (
                  <RoleRow key={j} index={j} line={line} />
                ))}
              </ul>
            </Reveal>

            {/* ── RIGHT: what I learned (flip cards) ──────────────── */}
            <Reveal className="md:col-span-6" delay={0.1}>
              <div style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <span aria-hidden style={{ width: 3, height: 14, background: vf.primary, display: "inline-block" }} />
                THREE LESSONS
              </div>
              <h3 style={{
                fontFamily: serif, fontWeight: 700, fontSize: "clamp(26px, 2.8vw, 34px)",
                letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--text-primary)",
                marginBottom: 28, maxWidth: 520,
              }}>
                What this project taught me.
              </h3>
              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { title: "Constraint is the feature.", body: "In healthcare, flexibility is a liability. A linear flow is the design, not a limitation of it.", tag: "DESIGN POSTURE" },
                  { title: "Error pathways are the product.", body: "The work lives in the moment a cooler is off and someone still needs to move. Happy paths are a warm-up.", tag: "FAILURE DESIGN" },
                  { title: "Ambient information is calm information.", body: "A wall you glance at beats a phone that nags. Make the status findable, not pushable.", tag: "CALM UX" },
                ].map((x, i) => (
                  <LessonCard key={i} index={i} {...x} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MORE CASE STUDIES - editorial gradient tiles
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(64px, 8vw, 104px) 0", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 36 }}>
            <span aria-hidden style={{ width: 3, height: 14, background: vf.primary }} />
            <p style={{ ...mono, fontSize: 12, color: vf.primary, letterSpacing: "0.22em", fontWeight: 600 }}>
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
          Back to top - floating action, bottom-right
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
            transition={{ duration: 0.28, ease: [0.25, 1, 0.4, 1] }}
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
              border: `1px solid ${vf.primary}`,
              background: "var(--bg-elevated)",
              color: vf.primary,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px rgba(30,64,175,0.18)",
              transitionProperty: "background-color, color, border-color",
              transitionDuration: "180ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = vf.primary;
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-elevated)";
              (e.currentTarget as HTMLElement).style.color = vf.primary;
            }}
          >
            <ArrowUp size={20} weight="bold" color="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
