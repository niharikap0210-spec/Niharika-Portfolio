import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
};

const SPRING = { type: "spring" as const, stiffness: 260, damping: 26, mass: 0.6 };
const EASE = [0.16, 1, 0.3, 1] as const;

/** Respect reduced-motion preference. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const accent = project.accent;
  const indexLabel = `A-${String(index + 1).padStart(2, "0")}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link
        to={`/work/${project.slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <motion.article
          animate={{ y: hovered ? -6 : 0 }}
          transition={SPRING}
          style={{
            position: "relative",
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            padding: "clamp(20px, 2vw, 28px)",
            boxShadow: hovered
              ? `0 2px 6px rgba(0,0,0,0.04), 0 20px 48px ${accent.primary}1a`
              : "0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.025)",
            transitionProperty: "box-shadow, border-color",
            transitionDuration: "320ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            borderColor: hovered ? `${accent.primary}55` : "var(--border)",
          }}
        >
          {/* Inset dashed construction border */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 10,
              border: `0.75px dashed ${hovered ? accent.primary + "55" : "var(--construction)"}`,
              pointerEvents: "none",
              transitionProperty: "border-color",
              transitionDuration: "320ms",
              zIndex: 1,
            }}
          />

          {/* Corner construction ticks */}
          <CornerTicks hovered={hovered} color={accent.primary} />

          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Eyebrow row */}
            <div className="flex items-center justify-between" style={{ marginBottom: 14, gap: 12 }}>
              <motion.span
                animate={{ color: hovered ? accent.dark : "var(--text-muted)" }}
                transition={{ duration: 0.3 }}
                style={{
                  ...mono,
                  fontSize: 10,
                  padding: "4px 9px",
                  border: `0.75px solid ${hovered ? accent.primary + "77" : "var(--border)"}`,
                  backgroundColor: hovered ? accent.surface : "var(--bg-primary)",
                  transitionProperty: "background-color, border-color",
                  transitionDuration: "320ms",
                }}
              >
                {indexLabel}
              </motion.span>

              <span
                style={{
                  ...mono,
                  fontSize: 9,
                  color: "var(--text-muted)",
                  opacity: 0.85,
                  flex: 1,
                  textAlign: "center",
                  letterSpacing: "0.16em",
                }}
              >
                {project.discipline}
              </span>

              <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)" }}>
                {project.year}
              </span>
            </div>

            {/* Drafting line */}
            <div
              aria-hidden
              style={{
                height: 0,
                borderTop: "0.75px solid var(--border)",
                marginBottom: 18,
                position: "relative",
              }}
            >
              <span style={{ position: "absolute", top: -3, left: 0, width: 1, height: 6, backgroundColor: "var(--construction)" }} />
              <span style={{ position: "absolute", top: -3, right: 0, width: 1, height: 6, backgroundColor: "var(--construction)" }} />
            </div>

            {/* Hero mockup stage */}
            <MockupStage project={project} hovered={hovered} />

            {/* Title + subtitle */}
            <div style={{ marginTop: 24 }}>
              <div className="flex items-baseline gap-3 mb-3">
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(26px, 2.6vw, 34px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  {project.title}
                </h3>
                <motion.span
                  aria-hidden
                  animate={{ scale: hovered ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 1.4, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    backgroundColor: accent.primary,
                    opacity: 0.85,
                    display: "inline-block",
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                  margin: 0,
                  marginBottom: 22,
                }}
              >
                {project.subtitle}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
                <div
                  className="flex items-center"
                  style={{
                    ...mono,
                    fontSize: 10,
                    color: hovered ? accent.dark : "var(--text-secondary)",
                    transitionProperty: "color",
                    transitionDuration: "320ms",
                    gap: 14,
                  }}
                >
                  <span>View Case Study</span>
                  <span aria-hidden style={{ position: "relative", display: "inline-block", width: 48, height: 1, overflow: "hidden" }}>
                    <motion.span
                      initial={false}
                      animate={{ scaleX: hovered ? 1 : 0.25 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: hovered ? accent.primary : "var(--border)",
                        transformOrigin: "left center",
                      }}
                    />
                  </span>
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    animate={{ x: hovered ? 4 : 0 }}
                    transition={SPRING}
                  >
                    <path
                      d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                      stroke={hovered ? accent.primary : "currentColor"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>

                <div className="hidden sm:flex" style={{ gap: 6 }}>
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        ...mono,
                        fontSize: 8,
                        color: "var(--text-muted)",
                        letterSpacing: "0.14em",
                        padding: "2px 7px",
                        border: "0.5px solid var(--border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Mockup stage — renders a realistic device frame and auto-cycles
   screens inside it.
══════════════════════════════════════════════════════════════════ */
function MockupStage({ project, hovered }: { project: Project; hovered: boolean }) {
  const { accent, heroScreens, heroMockupKind } = project;
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || hovered || heroScreens.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % heroScreens.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [hovered, heroScreens.length, reducedMotion]);

  useEffect(() => {
    heroScreens.slice(1).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [heroScreens]);

  // ── Ambient stage backdrop ──────────────────────────────────────
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        background: `
          radial-gradient(120% 80% at 50% 0%, ${accent.surface} 0%, ${accent.primary}0d 60%, transparent 100%),
          linear-gradient(180deg, ${accent.surface} 0%, ${accent.primary}0a 100%)
        `,
        border: `0.75px solid ${accent.primary}22`,
      }}
    >
      {/* Very soft grid (background texture, not architectural) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, ${accent.primary}10 0, ${accent.primary}10 0.5px, transparent 0.5px, transparent 48px),
            repeating-linear-gradient(90deg, ${accent.primary}10 0, ${accent.primary}10 0.5px, transparent 0.5px, transparent 48px)
          `,
          opacity: hovered ? 0.8 : 0.5,
          transitionProperty: "opacity",
          transitionDuration: "400ms",
        }}
      />

      {/* FIG label */}
      <motion.span
        key={active}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 0.65, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          ...mono,
          position: "absolute",
          top: 12,
          left: 14,
          fontSize: 8,
          color: accent.dark,
          letterSpacing: "0.18em",
          zIndex: 3,
        }}
      >
        FIG. {project.slug.slice(0, 3).toUpperCase()}-{String(active + 1).padStart(2, "0")}
      </motion.span>

      {/* Kind label */}
      <span
        style={{
          ...mono,
          position: "absolute",
          top: 12,
          right: 14,
          fontSize: 8,
          color: accent.dark,
          opacity: 0.5,
          letterSpacing: "0.16em",
          zIndex: 3,
        }}
      >
        {heroMockupKind === "photo" ? "FIELD" : heroMockupKind.toUpperCase()}
      </span>

      {/* Device frame — picks appropriate mockup for kind */}
      <motion.div
        animate={{ scale: hovered ? 1.03 : 1, y: hovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.7 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: heroMockupKind === "phone" ? "22px 0 28px" : "34px 44px 40px",
          zIndex: 2,
        }}
      >
        {heroMockupKind === "laptop" && (
          <LaptopFrame screens={heroScreens} active={active} accent={accent.primary} title={project.title} />
        )}
        {heroMockupKind === "tablet" && (
          <TabletFrame screens={heroScreens} active={active} accent={accent.primary} title={project.title} />
        )}
        {heroMockupKind === "phone" && (
          <PhoneFrame screens={heroScreens} active={active} accent={accent.primary} title={project.title} />
        )}
        {heroMockupKind === "photo" && (
          <PolaroidFrame screens={heroScreens} active={active} accent={accent} title={project.title} />
        )}
      </motion.div>

      {/* Progress ticks */}
      <ProgressTicks count={heroScreens.length} active={active} color={accent.primary} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Device frames — minimal, modern, built from divs + subtle details
══════════════════════════════════════════════════════════════════ */

/* ── Laptop (macbook-style) ──────────────────────────────────────── */
function LaptopFrame({
  screens,
  active,
  accent,
  title,
}: {
  screens: string[];
  active: number;
  accent: string;
  title: string;
}) {
  return (
    <div style={{ width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Lid with screen */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          backgroundColor: "#1A1A1A",
          borderRadius: "10px 10px 2px 2px",
          padding: 7,
          boxShadow: `
            0 0 0 0.75px rgba(0,0,0,0.2),
            0 14px 36px ${accent}22,
            0 4px 10px rgba(0,0,0,0.10)
          `,
          position: "relative",
        }}
      >
        {/* Camera dot */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 3,
            left: "50%",
            transform: "translateX(-50%)",
            width: 3,
            height: 3,
            backgroundColor: "#3A3A3A",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />
        {/* Screen */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "#0A0A0A",
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.05)",
          }}
        >
          <ScreenStack screens={screens} active={active} alt={title} fit="cover" />
          {/* Subtle screen sheen */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Base / keyboard deck */}
      <div
        style={{
          width: "108%",
          height: 10,
          background: "linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 40%, #0F0F0F 100%)",
          borderRadius: "0 0 10px 10px",
          position: "relative",
          boxShadow: "0 6px 12px rgba(0,0,0,0.18)",
        }}
      >
        {/* Trackpad notch */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 56,
            height: 3,
            backgroundColor: "#0A0A0A",
            borderRadius: "0 0 4px 4px",
          }}
        />
      </div>
    </div>
  );
}

/* ── Tablet (iPad-style landscape) ───────────────────────────────── */
function TabletFrame({
  screens,
  active,
  accent,
  title,
}: {
  screens: string[];
  active: number;
  accent: string;
  title: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        aspectRatio: "4 / 3",
        backgroundColor: "#141414",
        borderRadius: 16,
        padding: 10,
        boxShadow: `
          0 0 0 0.75px rgba(0,0,0,0.25),
          0 20px 48px ${accent}22,
          0 6px 14px rgba(0,0,0,0.12)
        `,
      }}
    >
      {/* Camera dot (left edge, centered) */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 4,
          top: "50%",
          transform: "translateY(-50%)",
          width: 3,
          height: 3,
          backgroundColor: "#333",
          borderRadius: "50%",
        }}
      />
      {/* Screen */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "#0A0A0A",
          boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.05)",
        }}
      >
        <ScreenStack screens={screens} active={active} alt={title} fit="cover" />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

/* ── Phone (modern with dynamic-island notch) ────────────────────── */
function PhoneFrame({
  screens,
  active,
  accent,
  title,
}: {
  screens: string[];
  active: number;
  accent: string;
  title: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "min(34%, 175px)",
        aspectRatio: "9 / 19",
        borderRadius: 30,
        background: "linear-gradient(145deg, #232323 0%, #0A0A0A 100%)",
        padding: 5,
        boxShadow: `
          0 0 0 0.75px rgba(0,0,0,0.3),
          0 24px 56px ${accent}33,
          0 8px 18px rgba(0,0,0,0.18)
        `,
      }}
    >
      {/* Side buttons */}
      <span aria-hidden style={{ position: "absolute", left: -1.5, top: "18%", width: 2, height: 20, backgroundColor: "#1A1A1A", borderRadius: 1 }} />
      <span aria-hidden style={{ position: "absolute", left: -1.5, top: "28%", width: 2, height: 34, backgroundColor: "#1A1A1A", borderRadius: 1 }} />
      <span aria-hidden style={{ position: "absolute", left: -1.5, top: "38%", width: 2, height: 34, backgroundColor: "#1A1A1A", borderRadius: 1 }} />
      <span aria-hidden style={{ position: "absolute", right: -1.5, top: "24%", width: 2, height: 48, backgroundColor: "#1A1A1A", borderRadius: 1 }} />

      {/* Screen */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 25,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <ScreenStack screens={screens} active={active} alt={title} fit="cover" />

        {/* Dynamic Island */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 7,
            left: "50%",
            transform: "translateX(-50%)",
            width: "34%",
            height: 14,
            backgroundColor: "#000",
            borderRadius: 10,
            zIndex: 3,
          }}
        />

        {/* Subtle screen sheen */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

/* ── Polaroid (for field research photos) ───────────────────────── */
function PolaroidFrame({
  screens,
  active,
  accent,
  title,
}: {
  screens: string[];
  active: number;
  accent: { primary: string; dark: string };
  title: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        transform: "rotate(-1.2deg)",
        width: "min(70%, 320px)",
        padding: "10px 10px 34px",
        backgroundColor: "#FDFBF6",
        boxShadow: `
          0 0 0 0.5px rgba(0,0,0,0.06),
          0 18px 36px ${accent.primary}26,
          0 6px 14px rgba(0,0,0,0.10)
        `,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          backgroundColor: "#1A1A1A",
          overflow: "hidden",
        }}
      >
        <ScreenStack screens={screens} active={active} alt={title} fit="cover" />
        {/* Film-like warm overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent 0%, ${accent.dark}12 100%)`,
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />
      </div>
      {/* Handwritten-style caption */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: 11,
          color: "#6B6B6B",
          letterSpacing: "0.02em",
        }}
      >
        field observation · {String(active + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ScreenStack — absolutely stacked screens, crossfaded + slid
══════════════════════════════════════════════════════════════════ */
function ScreenStack({
  screens,
  active,
  alt,
  fit = "cover",
}: {
  screens: string[];
  active: number;
  alt: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {screens.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt={i === 0 ? `${alt} screen` : ""}
          aria-hidden={i !== active}
          initial={false}
          animate={{
            opacity: i === active ? 1 : 0,
            y: i === active ? 0 : 8,
          }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: fit,
            display: "block",
            pointerEvents: "none",
          }}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}

/* ── Progress ticks ──────────────────────────────────────────────── */
function ProgressTicks({
  count,
  active,
  color,
}: {
  count: number;
  active: number;
  color: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 12,
        left: 14,
        display: "flex",
        alignItems: "center",
        gap: 6,
        zIndex: 3,
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <motion.span
            key={i}
            aria-hidden
            animate={{
              width: isActive ? 18 : 6,
              opacity: isActive ? 1 : 0.35,
            }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              height: 2,
              backgroundColor: color,
              display: "inline-block",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Corner construction ticks ─────────────────────────────────────── */
function CornerTicks({ hovered, color }: { hovered: boolean; color: string }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 10,
    height: 10,
    zIndex: 3,
    pointerEvents: "none",
    transitionProperty: "opacity",
    transitionDuration: "320ms",
    opacity: hovered ? 0.9 : 0,
  };
  const stroke = `0.75px solid ${color}`;
  return (
    <>
      <span aria-hidden style={{ ...base, top: 4, left: 4, borderTop: stroke, borderLeft: stroke }} />
      <span aria-hidden style={{ ...base, top: 4, right: 4, borderTop: stroke, borderRight: stroke }} />
      <span aria-hidden style={{ ...base, bottom: 4, left: 4, borderBottom: stroke, borderLeft: stroke }} />
      <span aria-hidden style={{ ...base, bottom: 4, right: 4, borderBottom: stroke, borderRight: stroke }} />
    </>
  );
}
