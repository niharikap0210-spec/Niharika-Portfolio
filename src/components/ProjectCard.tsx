import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const accent = project.accent;
  const indexLabel = `A-${String(index + 1).padStart(2, "0")}`;
  const isPhone = project.heroMockupKind === "phone";

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
          {/* ── Inset dashed construction border ─────────────────── */}
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

          {/* ── Corner ticks (architectural drawing marks) ───────── */}
          <CornerTicks hovered={hovered} color={accent.primary} />

          {/* ── Content wrapper (above border) ───────────────────── */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* ── Eyebrow row: index · discipline · year ────────── */}
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: 14, gap: 12 }}
            >
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

              <span
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "var(--text-muted)",
                }}
              >
                {project.year}
              </span>
            </div>

            {/* ── Drafting line ──────────────────────────────────── */}
            <div
              aria-hidden
              style={{
                height: 0,
                borderTop: "0.75px solid var(--border)",
                marginBottom: 18,
                position: "relative",
              }}
            >
              {/* tick marks */}
              <span
                style={{
                  position: "absolute",
                  top: -3,
                  left: 0,
                  width: 1,
                  height: 6,
                  backgroundColor: "var(--construction)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: -3,
                  right: 0,
                  width: 1,
                  height: 6,
                  backgroundColor: "var(--construction)",
                }}
              />
            </div>

            {/* ── Hero mockup stage ──────────────────────────────── */}
            <MockupStage
              project={project}
              hovered={hovered}
              isPhone={isPhone}
            />

            {/* ── Title + subtitle ───────────────────────────────── */}
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
                {/* pulse dot in project accent */}
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

              {/* ── CTA: arrow with line-draw animation ───────── */}
              <div
                className="flex items-center justify-between"
                style={{ marginTop: 8 }}
              >
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
                  {/* animated line */}
                  <span
                    aria-hidden
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: 48,
                      height: 1,
                      overflow: "hidden",
                    }}
                  >
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

                {/* tiny tag preview — minimal */}
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

/* ── Mockup stage: blueprint-tinted canvas with hovering mockup ───── */
function MockupStage({
  project,
  hovered,
  isPhone,
}: {
  project: Project;
  hovered: boolean;
  isPhone: boolean;
}) {
  const { accent } = project;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        backgroundColor: accent.surface,
        border: `0.75px solid ${accent.primary}22`,
      }}
    >
      {/* Blueprint grid tinted to project accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, ${accent.primary}14 0, ${accent.primary}14 0.5px, transparent 0.5px, transparent 20px),
            repeating-linear-gradient(90deg, ${accent.primary}14 0, ${accent.primary}14 0.5px, transparent 0.5px, transparent 20px),
            repeating-linear-gradient(0deg, ${accent.primary}26 0, ${accent.primary}26 0.5px, transparent 0.5px, transparent 80px),
            repeating-linear-gradient(90deg, ${accent.primary}26 0, ${accent.primary}26 0.5px, transparent 0.5px, transparent 80px)
          `,
          opacity: hovered ? 0.9 : 0.6,
          transitionProperty: "opacity",
          transitionDuration: "400ms",
        }}
      />

      {/* Top-left annotation */}
      <span
        style={{
          ...mono,
          position: "absolute",
          top: 12,
          left: 14,
          fontSize: 8,
          color: accent.dark,
          opacity: 0.6,
          letterSpacing: "0.18em",
          zIndex: 3,
        }}
      >
        FIG. {String(project.slug).slice(0, 3).toUpperCase()}-01
      </span>

      {/* Top-right kind label */}
      <span
        style={{
          ...mono,
          position: "absolute",
          top: 12,
          right: 14,
          fontSize: 8,
          color: accent.dark,
          opacity: 0.55,
          letterSpacing: "0.16em",
          zIndex: 3,
        }}
      >
        {project.heroMockupKind === "photo" ? "FIELD" : project.heroMockupKind.toUpperCase()}
      </span>

      {/* Mockup image with parallax-ish float */}
      <motion.div
        animate={{
          scale: hovered ? 1.04 : 1,
          y: hovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.7 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isPhone ? "24px 0" : "36px",
          zIndex: 2,
        }}
      >
        {isPhone ? (
          <PhoneFrame src={project.heroImage} accent={accent.primary} alt={project.title} />
        ) : (
          <img
            src={project.heroImage}
            alt={`${project.title} mockup`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: 4,
              boxShadow: `0 10px 30px ${accent.dark}33, 0 2px 6px rgba(0,0,0,0.08)`,
            }}
            loading="lazy"
          />
        )}
      </motion.div>

      {/* Soft bottom vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, ${accent.dark}18 0%, transparent 45%)`,
          mixBlendMode: "multiply",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── Minimal phone frame wrapper ───────────────────────────────────── */
function PhoneFrame({ src, accent, alt }: { src: string; accent: string; alt: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "min(32%, 180px)",
        aspectRatio: "9 / 19",
        borderRadius: 24,
        backgroundColor: "#111",
        padding: 6,
        boxShadow: `0 20px 50px ${accent}33, 0 4px 12px rgba(0,0,0,0.18)`,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 18,
          display: "block",
        }}
        loading="lazy"
      />
      {/* notch */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 44,
          height: 4,
          backgroundColor: "#000",
          borderRadius: 2,
          zIndex: 2,
        }}
      />
    </div>
  );
}

/* ── Corner construction ticks (fade in on hover) ─────────────────── */
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
