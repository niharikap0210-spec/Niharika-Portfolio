import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { Project, ProjectAccent } from "../data/projects";

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

            {/* Hero composition */}
            <HeroStage project={project} hovered={hovered} />

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
   Hero stage — ambient backdrop + per-project creative composition
══════════════════════════════════════════════════════════════════ */
function HeroStage({ project, hovered }: { project: Project; hovered: boolean }) {
  const { accent } = project;

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
      {/* Soft grid texture */}
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
          zIndex: 4,
        }}
      >
        FIG. {project.slug.slice(0, 3).toUpperCase()}-01
      </span>

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
          zIndex: 4,
        }}
      >
        {project.heroMockupKind === "photo" ? "FIELD" : project.heroMockupKind.toUpperCase()}
      </span>

      {/* Composition — swapped by slug */}
      <motion.div
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.7 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
        }}
      >
        {project.slug === "arko" && <ArkoComposition accent={accent} />}
        {project.slug === "veriflow" && <VeriflowComposition accent={accent} />}
        {project.slug === "locallift" && <LocalLiftComposition accent={accent} />}
        {project.slug === "shelfie" && <ShelfieComposition accent={accent} />}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Per-project creative compositions
══════════════════════════════════════════════════════════════════ */

/* ── Arko: laptop + overlapping phone (mirrors case-study hero) ── */
function ArkoComposition({ accent }: { accent: ProjectAccent }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "26px 38px 32px" }}>
      {/* Laptop — main, left-biased, slow float */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "6%",
          top: "12%",
          width: "72%",
          zIndex: 2,
        }}
      >
        <LaptopFrame src="/arko/web-1.png" alt="Arko designer dashboard" accent={accent.primary} />
      </motion.div>

      {/* Phone — pre-rendered mockup PNG (used directly, not wrapped) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{
          position: "absolute",
          right: "6%",
          bottom: "2%",
          width: "22%",
          zIndex: 3,
          filter: `drop-shadow(0 18px 30px ${accent.primary}40) drop-shadow(0 6px 12px rgba(0,0,0,0.18))`,
        }}
      >
        <img
          src="/arko/phone-13.png"
          alt="Arko client view"
          style={{ width: "100%", display: "block" }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}

/* ── Veriflow: laptop + overlapping tablet (mirrors case-study hero) ── */
function VeriflowComposition({ accent }: { accent: ProjectAccent }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "22px 40px 30px" }}>
      {/* Laptop — left-biased, slow float */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "2%",
          top: "10%",
          width: "68%",
          zIndex: 2,
        }}
      >
        <LaptopFrame src="/veriflow/home.png" alt="Veriflow admin dashboard" accent={accent.primary} />
      </motion.div>

      {/* Tablet — overlaps bottom-right, slight rotation */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-1.2, -0.4, -1.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        style={{
          position: "absolute",
          right: "2%",
          bottom: "-2%",
          width: "38%",
          zIndex: 3,
        }}
      >
        <TabletFrame src="/veriflow/pickup-dashboard.png" alt="Veriflow pickup dashboard" accent={accent.primary} />
      </motion.div>
    </div>
  );
}

/* ── LocalLift: 3-phone fan — mirrors case-study hero proportions ── */
function LocalLiftComposition({ accent }: { accent: ProjectAccent }) {
  const phoneShadow = `drop-shadow(0 16px 28px ${accent.primary}3a) drop-shadow(0 6px 12px rgba(0,0,0,0.16))`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Back-left phone — tilt -6, same proportions as hero */}
      <motion.img
        src="/locallift/hifi-explore.png"
        alt="LocalLift login screen"
        loading="lazy"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{
          position: "absolute",
          left: "10%",
          top: "50%",
          width: "22%",
          transform: "translateY(-50%) rotate(-6deg)",
          transformOrigin: "center center",
          filter: `${phoneShadow} saturate(0.92)`,
          zIndex: 1,
          display: "block",
        }}
      />

      {/* Center phone — focal, flows in flex center so it's always fully visible */}
      <motion.img
        src="/locallift/hifi-splash.png"
        alt="LocalLift splash screen"
        loading="lazy"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "relative",
          width: "26%",
          filter: phoneShadow,
          zIndex: 3,
          display: "block",
          maxHeight: "94%",
          objectFit: "contain",
        }}
      />

      {/* Back-right phone — tilt +6 */}
      <motion.img
        src="/locallift/hifi-community.png"
        alt="LocalLift confirmation screen"
        loading="lazy"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        style={{
          position: "absolute",
          right: "10%",
          top: "50%",
          width: "22%",
          transform: "translateY(-50%) rotate(6deg)",
          transformOrigin: "center center",
          filter: `${phoneShadow} saturate(0.92)`,
          zIndex: 1,
          display: "block",
        }}
      />
    </div>
  );
}

/* ── Shelfie: feathered research photo with soft teal glow ─────── */
function ShelfieComposition({ accent }: { accent: ProjectAccent }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Soft radial glow behind figure */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-10%",
          background: `radial-gradient(50% 50% at 50% 50%, ${accent.light} 0%, ${accent.primary} 38%, transparent 72%)`,
          filter: "blur(80px)",
          opacity: 0.28,
          zIndex: 1,
        }}
      />

      <motion.img
        src="/shelfie/expiration-reader.jpg"
        alt="A shopper trying to read an expiration date"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: "min(100%, 380px)",
          height: "auto",
          maxHeight: "82%",
          objectFit: "contain",
          zIndex: 2,
          // feather all edges so the rectangle dissolves into the stage
          maskImage:
            "radial-gradient(ellipse 72% 80% at 50% 50%, #000 30%, rgba(0,0,0,0.85) 55%, transparent 96%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 80% at 50% 50%, #000 30%, rgba(0,0,0,0.85) 55%, transparent 96%)",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Device frames — static, take a single src
══════════════════════════════════════════════════════════════════ */

function LaptopFrame({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          backgroundColor: "#1A1A1A",
          borderRadius: "10px 10px 2px 2px",
          padding: 6,
          boxShadow: `
            0 0 0 0.75px rgba(0,0,0,0.2),
            0 14px 36px ${accent}22,
            0 4px 10px rgba(0,0,0,0.10)
          `,
          position: "relative",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 2,
            left: "50%",
            transform: "translateX(-50%)",
            width: 3,
            height: 3,
            backgroundColor: "#3A3A3A",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "#0A0A0A",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            loading="lazy"
          />
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
      <div
        style={{
          width: "108%",
          height: 9,
          background: "linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 40%, #0F0F0F 100%)",
          borderRadius: "0 0 10px 10px",
          position: "relative",
          boxShadow: "0 6px 12px rgba(0,0,0,0.18)",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 52,
            height: 3,
            backgroundColor: "#0A0A0A",
            borderRadius: "0 0 4px 4px",
          }}
        />
      </div>
    </div>
  );
}

function TabletFrame({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        backgroundColor: "#141414",
        borderRadius: 14,
        padding: 8,
        boxShadow: `
          0 0 0 0.75px rgba(0,0,0,0.25),
          0 20px 48px ${accent}22,
          0 6px 14px rgba(0,0,0,0.12)
        `,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 3,
          top: "50%",
          transform: "translateY(-50%)",
          width: 3,
          height: 3,
          backgroundColor: "#333",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 7,
          overflow: "hidden",
          backgroundColor: "#0A0A0A",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
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
