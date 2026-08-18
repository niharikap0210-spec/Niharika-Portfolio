import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
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
  ClockCountdownIcon as ClockCountdown,
  FileTextIcon as FileText,
  EyeSlashIcon as EyeSlash,
  MagnifyingGlassIcon as MagnifyingGlass,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { projects, type Project } from "../data/projects";
import { ProjectHeroStage } from "../components/ProjectHeroStage";
import { GradientBackground } from "../components/GradientBackground";
import LiquidBackground from "../components/LiquidBackground";
import { SectionHeader } from "../components/CaseSectionHeader";

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
  fontFamily: "'Manrope', monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
};
const serif = "'Manrope', Georgia, serif";
const sans  = "'Manrope', system-ui, sans-serif";
const t = {
  h2Section: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(32px, 3.9vw, 48px)",
    letterSpacing: "-0.025em", lineHeight: 1.18,
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

function TabletStepper({ steps }: { steps: Step[] }) {
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
          <span style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.2em", fontWeight: 700, display: "inline-flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            {current.label}
            <span style={{ color: vf.muted, letterSpacing: "0.14em", fontWeight: 600 }}>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
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
          Tap by tap
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
                    color: isActive ? vf.primary : "var(--text-secondary)",
                    letterSpacing: "0.18em", paddingTop: 3,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: sans, fontSize: 19, fontWeight: isActive ? 600 : 500,
                      color: "var(--text-primary)",
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
                          <p style={{ fontFamily: sans, fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.6, paddingTop: 4 }}>
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
  const rootRef = useRef<HTMLDivElement>(null);
  const stages: { src: string; badge: string; color: string; label: string; caption: string; actor: string }[] = [
    { src: "/veriflow/validation-failed-rotate-cooler-message.png", badge: "T + 0s",  color: vf.flag,    label: "Validation fails",  caption: "Plain-language retry. No blame, no jargon.",             actor: "Courier retries" },
    { src: "/veriflow/after-30-seconds-give-override-button.png",   badge: "T + 30s", color: vf.warn,    label: "Override appears",  caption: "The pause is forced. A second attempt earns the option.", actor: "System waits" },
    { src: "/veriflow/override-pin-authentication.png",             badge: "T + 35s", color: vf.primary, label: "Supervisor PIN",    caption: "A named person accepts responsibility for the exit.",     actor: "Supervisor signs" },
    { src: "/veriflow/override-confirmation.png",                   badge: "T + 40s", color: vf.status,  label: "Cleared",           caption: "The cooler leaves. The override leaves a trail.",         actor: "Audit log written" },
  ];
  const gaps = ["30-second pause", "+5s", "+5s"];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const line = q(".ovr-line")[0] as HTMLElement;
      const nodes = q(".ovr-node") as HTMLElement[];
      const segs = q(".ovr-seg") as HTMLElement[];
      const cols = q(".ovr-col") as HTMLElement[];
      const dot = q(".ovr-pause-dot")[0] as HTMLElement;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(line, { scaleX: 1 });
        gsap.set([nodes, segs, cols], { opacity: 1, y: 0, scale: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
        gsap.set(segs, { opacity: 0, y: 4 });
        gsap.set(cols, { opacity: 0, y: 24 });

        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 78%", once: true } });
        tl.to(line, { scaleX: 1, duration: 0.9, ease: "power2.out" }, 0);
        tl.to(nodes, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.16, ease: "back.out(1.7)" }, 0.2);
        tl.to(segs, { opacity: 1, y: 0, duration: 0.4, stagger: 0.16, ease: "power2.out" }, 0.3);
        tl.to(cols, { opacity: 1, y: 0, duration: 0.65, stagger: 0.14, ease: "power2.out" }, 0.35);

        if (dot) gsap.to(dot, { scale: 1.5, opacity: 0.4, duration: 1.3, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 50%" });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="ovr">
      <div className="ovr-rail" aria-hidden>
        <div className="ovr-line" />
        {stages.map((s, i) => (
          <span key={i} className="ovr-node" style={{ left: `${12.5 + i * 25}%`, borderColor: s.color, boxShadow: `0 0 0 4px ${s.color}1f` }} />
        ))}
        {gaps.map((g, i) => (
          <span key={i} className={`ovr-seg${i === 0 ? " ovr-seg-pause" : ""}`} style={{ left: `${25 + i * 25}%` }}>
            {i === 0 ? (
              <>
                <ClockCountdown size={15} color={vf.warn} weight="regular" />
                {g}
                <span className="ovr-pause-dot" style={{ background: vf.warn }} />
              </>
            ) : g}
          </span>
        ))}
      </div>

      <div className="ovr-grid">
        {stages.map((s, i) => (
          <div key={i} className="ovr-col">
            <div className="ovr-badge" style={{ color: s.color }}>{s.badge}</div>
            <div className="ovr-screen"><TabletMock src={s.src} alt={`${s.label}, ${s.badge}`} /></div>
            <h4 className="ovr-title">{s.label}</h4>
            <p className="ovr-caption">{s.caption}</p>
            <div className="ovr-actor" style={{ color: s.color }}>
              <span className="ovr-actor-dot" style={{ background: s.color }} />{s.actor}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ovr { position: relative; }
        .ovr-rail { position: relative; height: 46px; margin-bottom: clamp(8px, 1.2vw, 16px); }
        .ovr-line { position: absolute; left: 12.5%; right: 12.5%; top: 30px; height: 2px; margin-top: -1px; border-radius: 2px;
          background: linear-gradient(90deg, ${vf.flag} 0%, ${vf.warn} 34%, ${vf.primary} 67%, ${vf.status} 100%); opacity: 0.45; }
        .ovr-node { position: absolute; top: 30px; width: 14px; height: 14px; margin-top: -7px; margin-left: -7px; border-radius: 50%; background: var(--bg-elevated); border: 2px solid; }
        .ovr-seg { position: absolute; top: 0; transform: translateX(-50%); font-family: 'Manrope', monospace; text-transform: uppercase; font-size: 11px; letter-spacing: 0.14em; font-weight: 700; color: var(--text-muted); white-space: nowrap; }
        .ovr-seg-pause { font-size: 12px; color: ${vf.warn}; letter-spacing: 0.12em; display: inline-flex; align-items: center; gap: 6px; }
        .ovr-pause-dot { width: 5px; height: 5px; border-radius: 50%; display: inline-block; }
        .ovr-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(18px, 2.4vw, 34px); }
        .ovr-col { display: flex; flex-direction: column; outline: none; }
        .ovr-badge { font-family: 'Manrope', monospace; text-transform: uppercase; font-size: 14px; letter-spacing: 0.14em; font-weight: 700; margin-bottom: clamp(12px, 1.4vw, 16px); }
        .ovr-screen { margin-bottom: clamp(24px, 2.8vw, 34px); }
        .ovr-title { font-family: ${serif}; font-weight: 700; font-size: clamp(22px, 2.1vw, 27px); letter-spacing: -0.015em; line-height: 1.2; color: var(--text-primary); margin: 0 0 15px; }
        .ovr-caption { font-family: ${sans}; font-size: 18px; line-height: 1.6; color: var(--text-secondary); margin: 0 0 24px; }
        .ovr-actor { margin-top: auto; font-family: 'Manrope', monospace; text-transform: uppercase; font-size: 12px; letter-spacing: 0.14em; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; }
        .ovr-actor-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
        @media (max-width: 980px) {
          .ovr-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(28px, 5vw, 40px); }
          .ovr-rail { display: none; }
        }
        @media (max-width: 540px) {
          .ovr-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SYSTEM DIAGRAM: three surfaces with preview thumbnails
══════════════════════════════════════════════════════════════════ */
/* Thin, purpose-built device mockups for the System diagram. */
function TabletMock({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", background: "#15171c", borderRadius: "clamp(13px, 1.5vw, 19px)", padding: "clamp(5px, 0.55vw, 7px)", boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 22px 46px -18px rgba(15,42,120,0.30)", position: "relative" }}>
      <span aria-hidden style={{ position: "absolute", top: "50%", right: 4, transform: "translateY(-50%)", width: 3, height: 3, borderRadius: "50%", background: "#41454e" }} />
      <div style={{ aspectRatio: "16 / 10", borderRadius: "clamp(9px, 1vw, 13px)", overflow: "hidden", background: "#000" }}>
        <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
      </div>
    </div>
  );
}

function LaptopMock({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ background: "#15171c", borderRadius: "9px 9px 4px 4px", padding: "clamp(5px, 0.55vw, 7px)", boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 22px 46px -18px rgba(15,42,120,0.28)" }}>
        <div style={{ aspectRatio: "16 / 10", borderRadius: 4, overflow: "hidden", background: "#000" }}>
          <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
        </div>
      </div>
      <div aria-hidden style={{ position: "relative", height: "clamp(9px, 1.1vw, 13px)", margin: "0 -6.5%", background: "linear-gradient(180deg, #2b2e35 0%, #16181d 75%)", borderRadius: "0 0 12px 12px", boxShadow: "0 10px 20px -8px rgba(0,0,0,0.22)" }}>
        <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(0,0,0,0.28)" }} />
        <span style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "18%", height: 5, background: "#0e0f13", borderRadius: "0 0 6px 6px" }} />
      </div>
    </div>
  );
}

function TVMock({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ background: "#0e1015", borderRadius: 9, padding: "clamp(4px, 0.5vw, 6px)", paddingBottom: "clamp(13px, 1.5vw, 19px)", boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 30px 66px -22px rgba(15,42,120,0.32)", position: "relative" }}>
        <div style={{ aspectRatio: "16 / 9", borderRadius: 3, overflow: "hidden", background: "#000" }}>
          <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
        </div>
        <span aria-hidden style={{ position: "absolute", bottom: "clamp(4px, 0.5vw, 7px)", left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: vf.light, boxShadow: `0 0 7px ${vf.light}` }} />
      </div>
      <div aria-hidden style={{ width: "17%", height: "clamp(7px, 0.9vw, 11px)", margin: "0 auto", background: "linear-gradient(180deg, #191c22 0%, #0e1015 100%)", borderRadius: "0 0 3px 3px" }} />
      <div aria-hidden style={{ width: "40%", height: "clamp(4px, 0.5vw, 6px)", margin: "0 auto", background: "#14161b", borderRadius: 4 }} />
    </div>
  );
}

function SystemDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const surfaces: { role: string; name: string; desc: string; tag: string; Mock: (p: { src: string; alt: string }) => JSX.Element; src: string }[] = [
    { role: "Action", name: "Tablet",     desc: "PIN, scan, verify, exit. The clinic's kiosk.",      tag: "Kiosk · 10\"",  Mock: TabletMock,  src: "/veriflow/sample-association-4.png" },
    { role: "Memory", name: "Web",        desc: "Dashboards, registry, and every sample's journey.", tag: "Control tower", Mock: LaptopMock,  src: "/veriflow/dashboard.png" },
    { role: "State",  name: "Ambient TV", desc: "The live state of the lab. Glance, don't click.",   tag: "Lab · 55\"",    Mock: TVMock,      src: "/veriflow/tv-dashboard-1.png" },
  ];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const devs = q(".vf-surf-dev") as HTMLElement[];
      const metas = q(".vf-surf-meta") as HTMLElement[];
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...devs, ...metas], { opacity: 1, y: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([...devs, ...metas], { opacity: 0, y: 30 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 78%", once: true } });
        tl.to(devs, { opacity: 1, y: 0, duration: 0.75, stagger: 0.16, ease: "power2.out" }, 0);
        tl.to(metas, { opacity: 1, y: 0, duration: 0.65, stagger: 0.16, ease: "power2.out" }, 0.14);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="vf-surfaces">
      <div className="vf-surf-grid">
        {surfaces.map((s, i) => (
          <Fragment key={s.name}>
            <div
              className="vf-surf-dev" style={{ gridColumn: i + 1, gridRow: 1, alignSelf: "end" }}
              tabIndex={0}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)} onBlur={() => setHover(null)}
            >
              <div className="vf-surf-glow" aria-hidden style={{ opacity: hover === i ? 0.42 : 0 }} />
              <div className="vf-surf-device" style={{ transform: hover === i ? "translateY(-9px)" : "none" }}>
                <s.Mock src={s.src} alt={`${s.name}, ${s.role}`} />
              </div>
            </div>
            <div
              className="vf-surf-meta" style={{ gridColumn: i + 1, gridRow: 2, alignSelf: "start" }}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            >
              <div className="vf-surf-role">{"0" + (i + 1)} · {s.role}</div>
              <h3 className="vf-surf-name" style={{ color: hover === i ? vf.primary : "var(--text-primary)" }}>{s.name}</h3>
              <p className="vf-surf-desc">{s.desc}</p>
              <div className="vf-surf-tag">{s.tag}</div>
            </div>
          </Fragment>
        ))}
      </div>

      <style>{`
        .vf-surfaces { position: relative; }
        .vf-surf-grid { display: grid; grid-template-columns: 0.8fr 1fr 1.22fr; column-gap: clamp(24px, 3.6vw, 56px); row-gap: clamp(20px, 2.4vw, 30px); }
        .vf-surf-dev { position: relative; display: flex; align-items: flex-end; justify-content: center; outline: none; }
        .vf-surf-glow { position: absolute; left: -8%; right: -8%; top: 2%; bottom: -8%; z-index: 0; pointer-events: none; background: radial-gradient(55% 55% at 50% 60%, ${vf.light} 0%, ${vf.primary} 42%, rgba(30,64,175,0) 74%); filter: blur(40px); transition: opacity 420ms ease; }
        .vf-surf-device { position: relative; z-index: 1; width: 100%; transition: transform 420ms cubic-bezier(0.25,1,0.4,1); }
        .vf-surf-role { font-family: 'Manrope', monospace; text-transform: uppercase; font-size: 14px; color: ${vf.primary}; letter-spacing: 0.2em; font-weight: 700; margin-bottom: 13px; }
        .vf-surf-name { font-family: ${serif}; font-weight: 700; font-size: clamp(25px, 2.5vw, 32px); letter-spacing: -0.02em; line-height: 1.15; margin: 0 0 11px; transition: color 240ms; }
        .vf-surf-desc { font-family: ${sans}; font-size: 18px; line-height: 1.6; color: var(--text-secondary); margin: 0 0 15px; }
        .vf-surf-tag { font-family: 'Manrope', monospace; text-transform: uppercase; font-size: 12.5px; color: var(--text-secondary); letter-spacing: 0.16em; font-weight: 700; }
        @media (max-width: 860px) {
          .vf-surf-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; row-gap: 10px; }
          .vf-surf-grid > * { grid-column: 1 !important; grid-row: auto !important; align-self: auto !important; }
          .vf-surf-dev { margin-bottom: 22px; }
          .vf-surf-meta { margin-bottom: 40px; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LAPTOP SPREAD: full-width laptop + alternating text column
══════════════════════════════════════════════════════════════════ */
function LaptopSpread({
  title, body, src, kicker, reverse = false,
}: {
  title: string; body: string; src: string; kicker: string; reverse?: boolean;
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
          {kicker}
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
/* ══════════════════════════════════════════════════════════════════
   STAT RULER: three problem metrics measured out by a swept caliper
══════════════════════════════════════════════════════════════════ */
function StatRuler() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stations = [
    { n: 5,  suffix: "",  label: "Hands per sample", sub: "between patient draw and pathologist screen." },
    { n: 40, suffix: "m", label: "Delay",            sub: "before anyone even notices a cooler is late." },
    { n: 3,  suffix: "",  label: "Custody zones",    sub: "clinic, transit, lab." },
  ];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const nums    = q(".vf-rl-num") as HTMLElement[];
      const majors  = q(".vf-rl-major") as HTMLElement[];
      const labels  = q(".vf-rl-label") as HTMLElement[];
      const caliper = q(".vf-rl-caliper")[0] as HTMLElement;
      const axis    = q(".vf-rl-axisline")[0] as HTMLElement;
      const baseline = q(".vf-rl-base")[0] as HTMLElement;
      const mission = q(".vf-rl-mission")[0] as HTMLElement;
      const offsets = [1 / 6, 1 / 2, 5 / 6];
      const counters = stations.map(() => ({ v: 0 }));
      const setNum = (i: number, v: number) => { if (nums[i]) nums[i].textContent = String(Math.round(v)) + stations[i].suffix; };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        stations.forEach((s, i) => setNum(i, s.n));
        gsap.set(majors, { scaleY: 1, backgroundColor: vf.primary });
        gsap.set(labels, { color: vf.primary });
        gsap.set(baseline, { scaleX: 1 });
        gsap.set(caliper, { left: "100%", x: -14, opacity: 1 });
        gsap.set(mission, { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(baseline, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(majors, { scaleY: 0.35, backgroundColor: vf.muted, transformOrigin: "50% 100%" });
        gsap.set(labels, { color: "var(--text-secondary)" });
        gsap.set(caliper, { x: 0, opacity: 1 });
        gsap.set(mission, { opacity: 0, y: 14 });
        stations.forEach((_, i) => setNum(i, 0));

        gsap.to(baseline, {
          scaleX: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 74%", end: "top 34%", scrub: 0.6, invalidateOnRefresh: true },
        });
        tl.fromTo(caliper, { x: 0 }, {
          x: () => Math.max(0, axis.clientWidth - caliper.offsetWidth),
          ease: "none", duration: 1,
        }, 0);
        stations.forEach((s, i) => {
          const off = offsets[i];
          tl.to(counters[i], { v: s.n, duration: 0.14, ease: "none", onUpdate: () => setNum(i, counters[i].v) }, Math.max(0, off - 0.05));
          tl.to(majors[i], { scaleY: 1, backgroundColor: vf.primary, duration: 0.12, ease: "power2.out" }, off);
          tl.to(labels[i], { color: vf.primary, duration: 0.12 }, off);
        });
        tl.to(mission, { opacity: 1, y: 0, duration: 0.16, ease: "power3.out" }, 0.9);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="vf-ruler">
      <div style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.2em", fontWeight: 700, marginBottom: "clamp(28px, 3.5vw, 44px)" }}>
        The old handoff, measured
      </div>

      <div className="vf-rl-stations">
        {stations.map((s) => (
          <div key={s.label} className="vf-rl-station" tabIndex={0}>
            <div className="vf-rl-num">{s.n}{s.suffix}</div>
            <div className="vf-rl-label" style={{ ...mono, fontSize: 14, letterSpacing: "0.18em", fontWeight: 700 }}>{s.label}</div>
            <div className="vf-rl-brk" aria-hidden />
            <p className="vf-rl-sub">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="vf-rl-axisline" aria-hidden>
        <div className="vf-rl-base" />
        {stations.map((s, i) => (
          <span key={s.label} className="vf-rl-major-wrap" style={{ left: `${((2 * i + 1) / 6) * 100}%` }}>
            <span className="vf-rl-major" />
          </span>
        ))}
        <div className="vf-rl-caliper"><span className="vf-rl-caliper-head" /></div>
      </div>

      <div className="vf-rl-mission">
        <span className="vf-rl-mission-rule" aria-hidden />
        <p>Veriflow replaces the clipboard with a <em>verified tap</em> at every handoff.</p>
      </div>

      <style>{`
        .vf-ruler { margin-top: clamp(40px, 5vw, 64px); }
        .vf-rl-stations { display: grid; grid-template-columns: repeat(3, 1fr); }
        .vf-rl-station { text-align: center; padding: 0 clamp(10px, 2vw, 28px); position: relative; outline: none; }
        .vf-rl-station:focus-visible { outline: 2px solid ${vf.primary}; outline-offset: 6px; border-radius: 2px; }
        .vf-rl-num { font-family: ${serif}; font-weight: 700; font-size: clamp(52px, 7vw, 92px); color: ${vf.ink}; letter-spacing: -0.045em; line-height: 0.9; font-variant-numeric: tabular-nums; }
        .vf-rl-label { margin-top: 14px; color: var(--text-secondary); transition: color 240ms; }
        .vf-rl-brk { height: 2px; width: 0; margin: 12px auto 0; background: ${vf.primary}; transition: width 360ms cubic-bezier(0.25,1,0.4,1); }
        .vf-rl-station:hover .vf-rl-brk, .vf-rl-station:focus-visible .vf-rl-brk { width: 44px; }
        .vf-rl-sub { font-family: ${sans}; font-size: 17px; line-height: 1.55; color: var(--text-secondary); margin: 12px auto 0; max-width: 260px; opacity: 0; transform: translateY(6px); transition: opacity 360ms, transform 360ms; }
        .vf-rl-station:hover .vf-rl-sub, .vf-rl-station:focus-visible .vf-rl-sub { opacity: 1; transform: none; }
        .vf-rl-axisline { position: relative; height: 40px; margin-top: clamp(22px, 3vw, 34px); }
        .vf-rl-axisline::before { content: ""; position: absolute; left: 0; right: 0; top: 14px; height: 12px; background-image: repeating-linear-gradient(90deg, ${vf.subtle} 0 1px, transparent 1px, transparent 14px); }
        .vf-rl-base { position: absolute; left: 0; right: 0; top: 20px; height: 1px; background: ${vf.primary}; opacity: 0.55; transform: scaleX(0); transform-origin: left center; }
        .vf-rl-major-wrap { position: absolute; top: 8px; transform: translateX(-50%); }
        .vf-rl-major { display: block; width: 2px; height: 24px; background: ${vf.muted}; }
        .vf-rl-caliper { position: absolute; left: 0; top: 2px; width: 14px; height: 36px; display: flex; flex-direction: column; align-items: center; pointer-events: none; }
        .vf-rl-caliper::before { content: ""; width: 1.5px; height: 100%; background: ${vf.light}; }
        .vf-rl-caliper-head { position: absolute; top: 0; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 9px solid ${vf.primary}; }
        .vf-rl-mission { margin-top: clamp(44px, 6vw, 68px); display: flex; align-items: flex-start; gap: 16px; }
        .vf-rl-mission-rule { width: 3px; align-self: stretch; background: ${vf.primary}; flex-shrink: 0; }
        .vf-rl-mission p { font-family: ${serif}; font-style: italic; font-size: clamp(20px, 1.9vw, 26px); line-height: 1.45; color: var(--text-primary); margin: 0; max-width: 820px; }
        .vf-rl-mission em { color: ${vf.primary}; font-style: italic; }
        @media (max-width: 720px) {
          .vf-rl-stations { grid-template-columns: 1fr; gap: 28px; text-align: left; }
          .vf-rl-station { padding: 0; }
          .vf-rl-brk { margin-left: 0; margin-right: auto; }
          .vf-rl-sub { margin-left: 0; opacity: 1; transform: none; }
          .vf-rl-axisline { display: none; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GAP CARDS: the old process's three blind spots, as cards
══════════════════════════════════════════════════════════════════ */
function GapCards() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cards = [
    { Icon: FileText, title: "No trail",            status: "None",   body: "Handoffs left no record. Couriers scribbled cooler numbers on the same sheet, every day." },
    { Icon: HandTap,  title: "Manual verification", status: "By eye", body: "Pathologists matched sample IDs by hand. One digit off, and the wrong lab received the tube." },
    { Icon: EyeSlash, title: "No live view",        status: "Blind",  body: "Labs had no forecast of incoming work. Staffing and storage stayed guesswork until a cooler arrived." },
  ];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const cardEls = q(".vf-gap-card") as HTMLElement[];
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cardEls, { opacity: 1, y: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cardEls, { opacity: 0, y: 22 });
        gsap.to(cardEls, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="vf-gaps" style={{ marginTop: "clamp(56px, 7vw, 80px)" }}>
      <div style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.2em", fontWeight: 700, marginBottom: "clamp(22px, 3vw, 34px)" }}>
        Three blind spots
      </div>

      <div className="vf-gap-cards">
        {cards.map((c) => (
          <div key={c.title} className="vf-gap-card" tabIndex={0}>
            <div className="vf-gap-card-top">
              <span className="vf-gap-icon"><c.Icon size={26} weight="regular" color="currentColor" /></span>
              <span className="vf-gap-status">{c.status}</span>
            </div>
            <h3 className="vf-gap-title">{c.title}</h3>
            <p className="vf-gap-body">{c.body}</p>
          </div>
        ))}
      </div>

      <style>{`
        .vf-gap-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 1.8vw, 24px); }
        .vf-gap-card {
          display: flex; flex-direction: column;
          background: var(--bg-elevated);
          border: 1px solid rgba(30,64,175,0.14);
          border-radius: 14px;
          padding: clamp(24px, 2.6vw, 34px);
          outline: none;
          transition: transform 380ms cubic-bezier(0.25,1,0.4,1), border-color 300ms, box-shadow 380ms;
        }
        .vf-gap-card:hover, .vf-gap-card:focus-visible {
          transform: translateY(-5px);
          border-color: ${vf.primary};
          box-shadow: 0 1px 2px rgba(15,42,120,0.05), 0 18px 40px rgba(15,42,120,0.12);
        }
        .vf-gap-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: clamp(22px, 2.6vw, 32px); }
        .vf-gap-icon { color: ${vf.primary}; display: inline-flex; }
        .vf-gap-status {
          font-family: 'Manrope', monospace; text-transform: uppercase; letter-spacing: 0.1em;
          font-size: 11px; font-weight: 700; color: ${vf.primary};
          background: ${vf.surface}; border: 1px solid rgba(30,64,175,0.16);
          padding: 5px 12px; border-radius: 100px; white-space: nowrap;
        }
        .vf-gap-title { font-family: ${serif}; font-weight: 700; font-size: clamp(21px, 2vw, 25px); letter-spacing: -0.02em; line-height: 1.2; color: var(--text-primary); margin: 0 0 13px; }
        .vf-gap-body { font-family: ${sans}; font-size: 16px; line-height: 1.62; color: var(--text-secondary); margin: 0; }
        @media (max-width: 780px) {
          .vf-gap-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TICK-MEASURED PATH: the sample's journey as a ruler of five hands
══════════════════════════════════════════════════════════════════ */
function DiagramTickPath() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const hands = [
    { x: 120, n: "01", verb: "draw",    detail: "Blood drawn, tube labelled by hand." },
    { x: 250, n: "02", verb: "log",     detail: "Cooler number written on the day's sheet." },
    { x: 470, n: "03", verb: "pickup",  detail: "Courier collects the cooler from reception." },
    { x: 600, n: "04", verb: "transit", detail: "In the van. No scan, no signal." },
    { x: 880, n: "05", verb: "receive", detail: "Lab logs the tube, if the paperwork survived." },
  ];
  const zones = [
    { label: "CLINIC",  cx: 185 },
    { label: "COURIER", cx: 535 },
    { label: "LAB",     cx: 880 },
  ];
  const X0 = 90, X1 = 930, Y = 92;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const drawn = q(".vf-pt-drawn")[0] as unknown as SVGElement;
      const ticks = q(".vf-pt-tick") as unknown as SVGElement[];
      const nums  = q(".vf-pt-num") as unknown as SVGElement[];
      const verbs = q(".vf-pt-verb") as unknown as SVGElement[];
      const zlabels = q(".vf-pt-zone") as unknown as SVGElement[];
      const token = q(".vf-pt-token")[0] as unknown as SVGElement;
      const len = X1 - X0;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(drawn, { strokeDasharray: len, strokeDashoffset: 0 });
        gsap.set(ticks, { scaleY: 1, opacity: 1 });
        gsap.set([...nums, ...verbs, ...zlabels], { opacity: 1, y: 0 });
        gsap.set(token, { x: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(drawn, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(ticks, { scaleY: 0, opacity: 0, transformOrigin: "50% 100%" });
        gsap.set(nums, { opacity: 0, y: 6 });
        gsap.set(verbs, { opacity: 0, y: 6 });
        gsap.set(zlabels, { opacity: 0, y: 8 });
        gsap.set(token, { x: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root, start: "top 80%", end: "bottom 58%", scrub: 0.6, invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(hands.length - 1, Math.floor(self.progress * hands.length));
              gsap.set(token, { x: hands[idx].x - hands[0].x });
            },
          },
        });
        tl.to(zlabels, { opacity: 1, y: 0, duration: 0.14, stagger: 0.1, ease: "power2.out" }, 0);
        tl.to(drawn, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
        hands.forEach((h, i) => {
          const off = ((h.x - X0) / len) * 0.9;
          tl.to(ticks[i], { scaleY: 1, opacity: 1, duration: 0.1, ease: "power3.out" }, off);
          tl.to(nums[i], { opacity: 1, y: 0, duration: 0.12 }, off + 0.02);
          tl.to(verbs[i], { opacity: 1, y: 0, duration: 0.12 }, off + 0.03);
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="vf-path" style={{ marginTop: "clamp(56px, 7vw, 80px)", paddingTop: "clamp(24px, 3vw, 34px)", borderTop: "1px solid var(--border)" }}>
      <div style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.2em", fontWeight: 700, marginBottom: "clamp(18px, 2.4vw, 30px)" }}>
        One tube, clinic to lab
      </div>

      <svg viewBox="0 0 1000 165" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
        {/* zone labels */}
        {zones.map((z) => (
          <text key={z.label} className="vf-pt-zone" x={z.cx} y="38" textAnchor="middle"
            style={{ ...mono, fontSize: 16.5, fill: vf.primary, letterSpacing: "0.18em", fontWeight: 700 }}>
            {z.label}
          </text>
        ))}

        {/* guide underlay + drawn hairline */}
        <line x1={X0} y1={Y} x2={X1} y2={Y} stroke={vf.subtle} strokeWidth="1" />
        <line className="vf-pt-drawn" x1={X0} y1={Y} x2={X1} y2={Y} stroke={vf.muted} strokeWidth="1.4" />

        {/* ticks + numbers + verbs + interaction hit-areas */}
        {hands.map((h, i) => (
          <g key={h.n}>
            <line className="vf-pt-tick" x1={h.x} y1={active === i ? 72 : 78} x2={h.x} y2={106}
              stroke={vf.primary} strokeWidth="1.6" />
            <text className="vf-pt-num" x={h.x} y="130" textAnchor="middle"
              style={{ ...mono, fontSize: 16, fill: active === i ? vf.primary : "var(--text-primary)", letterSpacing: "0.08em", fontWeight: 700 }}>
              {h.n}
            </text>
            <text className="vf-pt-verb" x={h.x} y="150" textAnchor="middle"
              style={{ fontFamily: sans, fontSize: 14.5, fill: active === i ? "var(--text-primary)" : "var(--text-muted)", fontWeight: 500 }}>
              {h.verb}
            </text>
            <rect x={h.x - 26} y="60" width="52" height="96" fill="transparent" tabIndex={0}
              role="button" aria-label={`Hand ${h.n}, ${h.verb}`} style={{ cursor: "pointer", outline: "none" }}
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)} onBlur={() => setActive(null)} />
          </g>
        ))}

        {/* travelling sample token */}
        <rect className="vf-pt-token" x={hands[0].x - 5} y={Y - 5} width="10" height="10" rx="1.5" fill={vf.primary} />
      </svg>

      <div style={{ marginTop: 18, minHeight: 22, textAlign: "center" }}>
        {active === null ? (
          <span style={{ ...mono, fontSize: 13, color: vf.muted, letterSpacing: "0.2em", fontWeight: 600 }}>
            A paper chain with no live tracking
          </span>
        ) : (
          <span style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)" }}>
            <strong style={{ ...mono, fontSize: 13, color: vf.primary, letterSpacing: "0.14em", marginRight: 10 }}>HAND {hands[active].n}</strong>
            {hands[active].detail}
          </span>
        )}
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
function PrincipleRow({
  title, description, IconComp,
}: {
  title: string; description: string; IconComp: Icon;
}) {
  return (
    <div className="vf-prin-row" tabIndex={0}>
      <span className="vf-prin-icon"><IconComp size={22} weight="regular" color="currentColor" /></span>
      <div className="vf-prin-main">
        <h3 className="vf-prin-title">{title}</h3>
        <p className="vf-prin-desc">{description}</p>
      </div>
    </div>
  );
}

function CoolerBlueprint() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const cooler = q(".cb-cooler");
      const leaders = q(".cb-leader");
      const labels = q(".cb-label");
      const dim = q(".cb-dim");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([cooler, labels, dim], { opacity: 1, y: 0 });
        gsap.set(leaders, { strokeDashoffset: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cooler, { opacity: 0, y: 16 });
        gsap.set(leaders, { strokeDashoffset: 1 });
        gsap.set(labels, { opacity: 0, y: 6 });
        gsap.set(dim, { opacity: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
        tl.to(cooler, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
        tl.to(leaders, { strokeDashoffset: 0, duration: 0.6, stagger: 0.12, ease: "power1.inOut" }, 0.35);
        tl.to(labels, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" }, 0.55);
        tl.to(dim, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.9);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="vf-cooler">
      <div className="vf-cooler-cap">The cooler</div>
      <svg viewBox="0 0 460 360" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
        {/* cooler */}
        <g className="cb-cooler">
          <rect x="98" y="152" width="264" height="156" rx="10" fill={vf.surface} stroke={vf.primary} strokeWidth="1.6" />
          <line x1="106" y1="196" x2="354" y2="196" stroke={vf.primary} strokeWidth="0.7" opacity="0.3" />
          <line x1="106" y1="288" x2="354" y2="288" stroke={vf.primary} strokeWidth="0.7" opacity="0.3" />
          <rect x="90" y="130" width="280" height="28" rx="6" fill="#fff" stroke={vf.primary} strokeWidth="1.6" />
          <path d="M 186 130 Q 186 102, 230 102 Q 274 102, 274 130" fill="none" stroke={vf.primary} strokeWidth="1.6" strokeLinecap="round" />
          <rect x="94" y="154" width="9" height="14" rx="1.5" fill="#fff" stroke={vf.primary} strokeWidth="1.2" />
          <rect x="357" y="154" width="9" height="14" rx="1.5" fill="#fff" stroke={vf.primary} strokeWidth="1.2" />
          {/* QR sticker */}
          <rect x="128" y="196" width="54" height="54" rx="3" fill="#fff" stroke={vf.primary} strokeWidth="1" />
          <rect x="134" y="202" width="13" height="13" fill="none" stroke={vf.primary} strokeWidth="2" />
          <rect x="138" y="206" width="5" height="5" fill={vf.primary} />
          <rect x="163" y="202" width="13" height="13" fill="none" stroke={vf.primary} strokeWidth="2" />
          <rect x="167" y="206" width="5" height="5" fill={vf.primary} />
          <rect x="134" y="231" width="13" height="13" fill="none" stroke={vf.primary} strokeWidth="2" />
          <rect x="138" y="235" width="5" height="5" fill={vf.primary} />
          <rect x="163" y="231" width="4" height="4" fill={vf.primary} />
          <rect x="171" y="231" width="4" height="4" fill={vf.primary} />
          <rect x="163" y="239" width="4" height="4" fill={vf.primary} />
          <rect x="171" y="239" width="4" height="4" fill={vf.primary} />
          {/* label plate */}
          <rect x="206" y="204" width="128" height="42" rx="3" fill="#fff" stroke={vf.primary} strokeWidth="0.9" />
          <line x1="214" y1="216" x2="326" y2="216" stroke={vf.primary} strokeWidth="0.7" opacity="0.45" />
          <line x1="214" y1="225" x2="300" y2="225" stroke={vf.primary} strokeWidth="0.7" opacity="0.45" />
          <line x1="214" y1="234" x2="314" y2="234" stroke={vf.primary} strokeWidth="0.7" opacity="0.45" />
          {/* temp pill */}
          <rect x="266" y="262" width="76" height="25" rx="12.5" fill={vf.primary} />
          <text x="304" y="279" textAnchor="middle" style={{ ...mono, fontSize: 11, fill: "#fff", letterSpacing: "0.06em", fontWeight: 700 }}>2–8°C</text>
        </g>

        {/* callout leaders */}
        <line className="cb-leader" x1="155" y1="196" x2="82" y2="98" stroke={vf.primary} strokeWidth="0.9" strokeDasharray="1 1" pathLength={1} />
        <line className="cb-leader" x1="270" y1="204" x2="392" y2="98" stroke={vf.primary} strokeWidth="0.9" strokeDasharray="1 1" pathLength={1} />
        <line className="cb-leader" x1="342" y1="274" x2="408" y2="250" stroke={vf.primary} strokeWidth="0.9" strokeDasharray="1 1" pathLength={1} />

        {/* callout dots + labels */}
        <g className="cb-label">
          <circle cx="82" cy="98" r="2.6" fill={vf.primary} />
          <text x="40" y="90" style={{ ...mono, fontSize: 10, fill: vf.primary, letterSpacing: "0.18em", fontWeight: 700 }}>QR · PAIRED</text>
        </g>
        <g className="cb-label">
          <circle cx="392" cy="98" r="2.6" fill={vf.primary} />
          <text x="352" y="90" textAnchor="middle" style={{ ...mono, fontSize: 10, fill: vf.primary, letterSpacing: "0.18em", fontWeight: 700 }}>CHAIN · ID</text>
        </g>
        <g className="cb-label">
          <circle cx="408" cy="250" r="2.6" fill={vf.primary} />
          <text x="414" y="254" style={{ ...mono, fontSize: 10, fill: vf.primary, letterSpacing: "0.18em", fontWeight: 700 }}>TEMP · LOCK</text>
        </g>

        {/* dimension */}
        <g className="cb-dim">
          <line x1="98" y1="330" x2="362" y2="330" stroke={vf.muted} strokeWidth="0.7" />
          <line x1="98" y1="325" x2="98" y2="335" stroke={vf.muted} strokeWidth="0.7" />
          <line x1="362" y1="325" x2="362" y2="335" stroke={vf.muted} strokeWidth="0.7" />
          <text x="230" y="348" textAnchor="middle" style={{ ...mono, fontSize: 9, fill: vf.muted, letterSpacing: "0.22em", fontWeight: 600 }}>ONE UNIT OF TRUST</text>
        </g>
      </svg>

      <style>{`
        .vf-cooler { position: relative; padding: clamp(22px, 3vw, 40px); border: 1px solid ${vf.subtle}; border-radius: 10px; background:
          radial-gradient(circle, rgba(30,64,175,0.08) 1px, transparent 1.6px) -11px -11px / 22px 22px,
          var(--bg-elevated); overflow: hidden; }
        .vf-cooler-cap { position: absolute; top: clamp(18px, 2.2vw, 26px); left: clamp(22px, 3vw, 40px); font-family: 'Manrope', monospace; text-transform: uppercase; font-size: 12px; color: ${vf.primary}; letter-spacing: 0.2em; font-weight: 700; }

        /* Principles layout */
        .vf-prin-layout { display: grid; grid-template-columns: minmax(0, 1.04fr) minmax(0, 1fr); gap: clamp(32px, 4vw, 64px); align-items: start; }
        .vf-cooler-lede { font-family: ${serif}; font-style: italic; font-size: clamp(18px, 1.6vw, 22px); line-height: 1.55; color: var(--text-primary); margin: clamp(22px, 2.6vw, 30px) 0 0; max-width: 460px; }
        .vf-cooler-lede em { color: ${vf.primary}; font-style: italic; }
        @media (max-width: 900px) { .vf-prin-layout { grid-template-columns: 1fr; gap: clamp(28px, 5vw, 44px); } .vf-cooler-lede { max-width: none; } }

        /* Principles list */
        .vf-prin-list { display: flex; flex-direction: column; }
        .vf-prin-row { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: clamp(16px, 1.6vw, 22px); align-items: start; padding: clamp(20px, 2.2vw, 28px) clamp(8px, 1vw, 14px); border-top: 1px solid ${vf.subtle}; outline: none; transition: background 260ms; }
        .vf-prin-row:last-child { border-bottom: 1px solid ${vf.subtle}; }
        .vf-prin-row:hover, .vf-prin-row:focus-visible { background: ${vf.surface}; }
        .vf-prin-icon { width: 46px; height: 46px; border-radius: 8px; background: ${vf.subtle}; color: ${vf.primary}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 260ms, color 260ms; }
        .vf-prin-row:hover .vf-prin-icon, .vf-prin-row:focus-visible .vf-prin-icon { background: ${vf.primary}; color: #fff; }
        .vf-prin-title { font-family: ${serif}; font-weight: 700; font-size: clamp(21px, 2vw, 25px); letter-spacing: -0.015em; line-height: 1.2; color: var(--text-primary); margin: 0 0 10px; }
        .vf-prin-desc { font-family: ${sans}; font-size: 18px; line-height: 1.6; color: var(--text-secondary); margin: 0; }
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
      transition={{ duration: 0.4 }}
    >
      {/* ══════════════════════════════════════════════════════════════
          00 · HERO: laptop (admin web) + tablet overlay
      ══════════════════════════════════════════════════════════════ */}
      <section className="vf-hero-section" style={{
        position: "relative",
        isolation: "isolate",
        minHeight: "calc(var(--vh, 1vh) * 100)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg-primary)",
        paddingTop: "clamp(96px, 10vw, 128px)",
        paddingBottom: "clamp(40px, 5vw, 72px)",
      }}>
        {/* Blue noisy-gradient hero background (replaces the blueprint grid) */}
        <GradientBackground
          gradientType="radial-gradient"
          gradientSize="150% 130%"
          gradientOrigin="top-middle"
          colors={[
            { color: "rgba(59,130,246,0.20)", stop: "0%" },
            { color: "rgba(96,165,250,0.12)", stop: "34%" },
            { color: "rgba(147,197,253,0.07)", stop: "62%" },
            { color: "rgba(239,244,253,0)", stop: "100%" },
          ]}
          noisePatternAlpha={26}
          noiseIntensity={1}
          noisePatternRefreshInterval={1}
          noisePatternSize={100}
          style={{ zIndex: 0 }}
        />
        {/* Subtle dotted Miro-canvas grid, over the gradient, behind the content */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(30,64,175,0.07) 1px, transparent 1.5px)",
          backgroundSize: "23px 23px",
          backgroundPosition: "-11px -11px",
          WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
        }} />
        <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: "clamp(32px, 4.5vw, 60px)", alignItems: "center", width: "100%" }}>
            {/* LEFT: copy (left-aligned) */}
            <div className="md:col-span-5" style={{ minWidth: 0 }}>
              <div style={{ overflow: "hidden", marginBottom: "clamp(24px, 2.6vw, 36px)" }}>
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 1.0, ease: [0.25, 1, 0.4, 1] }}
                  style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(52px, 7.6vw, 112px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.055em", lineHeight: 0.92,
                    margin: 0, whiteSpace: "nowrap",
                  }}>
                  Veriflow<span style={{ color: vf.primary, fontStyle: "italic" }}>.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                style={{
                  fontFamily: serif, fontStyle: "italic",
                  fontSize: "clamp(18px, 1.7vw, 24px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5, maxWidth: 500,
                  marginBottom: "clamp(34px, 4.5vw, 52px)",
                  letterSpacing: "-0.01em",
                }}
              >
                Specimen chain-of-custody. <span style={{ color: vf.primary }}>Tap, verify, hand off</span>{" "}
                across a clinic tablet, a web control tower, and a lab wall.
              </motion.p>

              {/* Meta - airy 2-column: label whispers above value, no ornament */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
                style={{
                  maxWidth: 440,
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  justifyContent: "start",
                  columnGap: "clamp(44px, 6vw, 84px)",
                  rowGap: "clamp(24px, 3vw, 32px)",
                }}
              >
                {([
                  { label: "Role",     value: "Product Designer" },
                  { label: "Surfaces", value: "Web · Tablet · TV" },
                  { label: "Timeline", value: "3 months" },
                  { label: "Tools",    value: "Figma · FigJam" },
                ] as { label: string; value: string }[]).map((m) => (
                  <div key={m.label}>
                    <div style={{ ...mono, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.18em", color: vf.muted, marginBottom: 9 }}>{m.label}</div>
                    <div style={{ fontFamily: sans, fontSize: "clamp(17px, 1.5vw, 20px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{m.value}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: laptop (admin web) + floating tablet, cursor-reactive */}
            <HeroMockups />
          </div>
        </div>
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
              <p style={{ ...t.bodyLg, marginBottom: 22 }}>
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

          {/* Journey - tick-measured path */}
          <DiagramTickPath />

          {/* Three gaps - blind-spot audit */}
          <GapCards />

          {/* Stats + mission - measured ruler */}
          <StatRuler />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          02 · SYSTEM
      ══════════════════════════════════════════════════════════════ */}
      <section className="vf-liquid-section" style={{ padding: SECTION_PAD }}>
        <LiquidBackground c0="eff5fe" c1="dae8fc" c2="aecaf0" fade={0} lift={0.28} grain={0.055} speed={0.1} />
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

          <div className="vf-prin-layout">
            <Reveal delay={0.05}>
              <div>
                <CoolerBlueprint />
                <p className="vf-cooler-lede">Every rule on this page exists so this one object never <em>disappears</em> between two people.</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="vf-prin-list">
                <PrincipleRow title="Linear, not branching"
                  description="A fork in a flow is an error waiting to happen. One next step, always visible."
                  IconComp={ArrowRight} />
                <PrincipleRow title="Gate at every handoff"
                  description="A sample leaves one custody only when the next is confirmed. Small gate, always there."
                  IconComp={ShieldCheck} />
                <PrincipleRow title="Forgive the hurry"
                  description="A missed scan is a retry, not a failure. Override exists, with a PIN and a record."
                  IconComp={HandTap} />
                <PrincipleRow title="Ambient over alert"
                  description="A wall replaces the phone on the counter. Glance, know. No notifications."
                  IconComp={Television} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          04 · CLINIC FLOW
      ══════════════════════════════════════════════════════════════ */}
      <section className="vf-liquid-section" style={{ padding: SECTION_PAD }}>
        <LiquidBackground c0="eff5fe" c1="dae8fc" c2="aecaf0" fade={0} lift={0.28} grain={0.055} speed={0.1} />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeader num="04" phase="Flow · Clinic" title="Association. Tube becomes a trackable object." />
          </Reveal>

          <Reveal>
            <p style={{ ...t.bodyLg, maxWidth: 720, marginBottom: "clamp(40px, 5vw, 64px)" }}>
              A pathologist scans two QR codes and picks a cooler. Four taps, no keyboards.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <TabletStepper
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
            <SectionHeader num="05" phase="Flow · Courier" title="Pickup, validation, override." />
          </Reveal>

          <Reveal>
            <p style={{ ...t.bodyLg, maxWidth: 720, marginBottom: "clamp(40px, 5vw, 64px)" }}>
              Same tablet, different role. A courier claims a cooler, collects its containers, and clears a gate before leaving.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <TabletStepper
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
      <section className="vf-liquid-section" style={{ padding: SECTION_PAD }}>
        <LiquidBackground c0="eff5fe" c1="dae8fc" c2="aecaf0" fade={0} lift={0.28} grain={0.055} speed={0.1} />
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
                kicker="Operations overview"
                title="Everything, one glance."
                body="Compliance rate, active hospitals, RFID reader health, ticket load. Built for a lab director who opens one tab each morning to know whether today is going to be quiet."
                src="/veriflow/dashboard.png"
              />
            </Reveal>
            <Reveal>
              <LaptopSpread
                kicker="Sample registry"
                title="Every sample, addressable."
                body="Filterable by clinic, status, and date. The evidence layer for audits, morning standups, and any call that starts with 'where is sample #...'."
                src="/veriflow/all-samples.png"
                reverse
              />
            </Reveal>
            <Reveal>
              <LaptopSpread
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
          <SectionHeader num="07" phase="Ambient · the wall" title="Readable across the room." accent="#fff" titleColor="#fff" />


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
      <section className="vf-liquid-section" style={{ padding: SECTION_PAD }}>
        <LiquidBackground c0="eff5fe" c1="dae8fc" c2="aecaf0" fade={0} lift={0.28} grain={0.055} speed={0.1} />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal><SectionHeader num="08" phase="Role · Takeaways" title="What I owned, and what this project taught me." /></Reveal>

          {/* Impact - before → after, distilled */}
          <Reveal>
            <div className="vf-impact">
              <div className="vf-impact-cell">
                <span className="vf-impact-tag" style={{ color: "var(--text-muted)" }}>Before</span>
                <span className="vf-impact-line" style={{ color: "var(--text-secondary)" }}>A guessed journey.</span>
              </div>
              <span aria-hidden className="vf-impact-arrow"><ArrowRight size={24} color={vf.primary} weight="bold" /></span>
              <div className="vf-impact-cell">
                <span className="vf-impact-tag" style={{ color: vf.primary }}>After</span>
                <span className="vf-impact-line" style={{ color: "var(--text-primary)" }}>A recorded trip.</span>
              </div>
            </div>
          </Reveal>

          <div className="vf-close-grid">
            <Reveal>
              <div>
                <div className="vf-close-eyebrow">Role · Product Designer</div>
                <ol className="vf-owned">
                  {[
                    "Mapped the clinic, courier, and lab chain across three roles.",
                    "Designed the tablet kiosks: association, pickup, validation, override.",
                    "Shipped the web control tower for admin, ops, and sample journeys.",
                    "Laid out the TV wall: six-foot type, colour as status.",
                    "Authored the validation-failure and 30-second override pattern.",
                  ].map((line, j) => (
                    <li key={j} className="vf-owned-row">
                      <span className="vf-owned-num">{String(j + 1).padStart(2, "0")}</span>
                      <span className="vf-owned-text">{line}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="vf-close-eyebrow">What I learned</div>
                <div className="vf-lessons">
                  {[
                    { title: "Constraint is the feature.", body: "In healthcare, flexibility is a liability. A linear flow is the design, not a limitation of it." },
                    { title: "Error pathways are the product.", body: "The work lives in the moment a cooler is off and someone still needs to move. Happy paths are a warm-up." },
                    { title: "Ambient information is calm information.", body: "A wall you glance at beats a phone that nags. Make the status findable, not pushable." },
                  ].map((x, i) => (
                    <div key={i} className="vf-lesson">
                      <h4 className="vf-lesson-title">{x.title}</h4>
                      <p className="vf-lesson-body">{x.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <style>{`
            .vf-impact { display: flex; align-items: center; gap: clamp(22px, 3.4vw, 48px); flex-wrap: wrap; margin: clamp(2px, 0.8vw, 10px) 0 clamp(52px, 7vw, 88px); }
            .vf-impact-cell { display: flex; flex-direction: column; gap: 9px; }
            .vf-impact-tag { font-family: 'Manrope', monospace; text-transform: uppercase; font-size: 12px; letter-spacing: 0.2em; font-weight: 700; }
            .vf-impact-line { font-family: ${serif}; font-weight: 700; font-size: clamp(25px, 2.7vw, 36px); letter-spacing: -0.02em; line-height: 1.12; }
            .vf-impact-arrow { display: inline-flex; }
            .vf-close-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 96px); align-items: start; }
            .vf-close-eyebrow { font-family: 'Manrope', monospace; text-transform: uppercase; font-size: 13px; color: ${vf.primary}; letter-spacing: 0.2em; font-weight: 700; margin-bottom: clamp(22px, 3vw, 34px); }
            .vf-owned { list-style: none; padding: 0; margin: 0; }
            .vf-owned-row { display: grid; grid-template-columns: 34px 1fr; gap: 16px; align-items: baseline; padding: clamp(15px, 1.7vw, 20px) 0; border-top: 1px solid ${vf.subtle}; }
            .vf-owned-row:last-child { border-bottom: 1px solid ${vf.subtle}; }
            .vf-owned-num { font-family: 'Manrope', monospace; font-size: 13px; font-weight: 700; color: ${vf.muted}; letter-spacing: 0.14em; }
            .vf-owned-text { font-family: ${sans}; font-size: 18px; line-height: 1.55; color: var(--text-primary); }
            .vf-lessons { display: flex; flex-direction: column; gap: clamp(28px, 3.2vw, 40px); }
            .vf-lesson-title { font-family: ${serif}; font-weight: 700; font-size: clamp(21px, 2vw, 25px); letter-spacing: -0.015em; line-height: 1.2; color: var(--text-primary); margin: 0 0 11px; }
            .vf-lesson-body { font-family: ${sans}; font-size: 18px; line-height: 1.6; color: var(--text-secondary); margin: 0; }
            @media (max-width: 860px) { .vf-close-grid { grid-template-columns: 1fr; gap: clamp(44px, 9vw, 60px); } }
          `}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MORE CASE STUDIES - editorial gradient tiles
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(64px, 8vw, 104px) 0", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ marginBottom: "clamp(36px, 4.5vw, 56px)", maxWidth: 560 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.03em", lineHeight: 1.12, color: "var(--text-primary)", margin: 0 }}>
              Keep exploring<span style={{ color: vf.primary, fontStyle: "italic" }}>.</span>
            </h2>
            <p style={{ fontFamily: sans, fontSize: "clamp(17px, 1.4vw, 19px)", color: "var(--text-secondary)", lineHeight: 1.6, margin: "16px 0 0" }}>
              Two more case studies, start to finish.
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
