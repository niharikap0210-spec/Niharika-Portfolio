import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon as ArrowRight } from "@phosphor-icons/react";

interface ArchAccent {
  primary: string;
  light: string;
  dark: string;
  surface: string;
}

interface ArchitectureCardProps {
  index: number;
  title: string;
  subtitle: string;
  type: string;
  year: string;
  tags: string[];
  href: string;
  accent: ArchAccent;
  visualKind: "thesis" | "renders";
}

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
};

const SPRING = { type: "spring" as const, stiffness: 200, damping: 32, mass: 0.8 };
const EASE = [0.25, 1, 0.4, 1] as const;

export default function ArchitectureCard({
  index, title, subtitle, type, year, tags, href, accent, visualKind,
}: ArchitectureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const indexLabel = `B-${String(index + 1).padStart(2, "0")}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ height: "100%" }}
    >
      <Link
        to={href}
        style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <motion.article
          animate={{ y: hovered ? -6 : 0 }}
          transition={SPRING}
          style={{
            position: "relative",
            height: "100%",
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            padding: "clamp(20px, 2vw, 28px)",
            boxShadow: hovered
              ? `0 2px 6px rgba(0,0,0,0.04), 0 20px 48px ${accent.primary}1a`
              : "0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.025)",
            transitionProperty: "box-shadow, border-color",
            transitionDuration: "300ms",
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
              border: `1px dashed ${hovered ? accent.primary + "55" : "var(--construction)"}`,
              pointerEvents: "none",
              transitionProperty: "border-color",
              transitionDuration: "300ms",
              zIndex: 1,
            }}
          />

          <CornerTicks hovered={hovered} color={accent.primary} />

          <div style={{ position: "relative", zIndex: 2, height: "calc(100% - 20px)", display: "flex", flexDirection: "column" }}>
            {/* Eyebrow row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 12 }}>
              <motion.span
                animate={{ color: hovered ? accent.dark : "var(--text-muted)" }}
                transition={{ duration: 0.3 }}
                style={{
                  ...mono,
                  fontSize: 10,
                  padding: "4px 9px",
                  border: `1px solid ${hovered ? accent.primary + "77" : "var(--border)"}`,
                  backgroundColor: hovered ? accent.surface : "var(--bg-primary)",
                  transitionProperty: "background-color, border-color",
                  transitionDuration: "300ms",
                }}
              >
                {indexLabel}
              </motion.span>

              <span style={{
                ...mono, fontSize: 9, color: "var(--text-muted)", opacity: 0.85,
                flex: 1, textAlign: "center", letterSpacing: "0.16em",
              }}>
                {type}
              </span>

              <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)" }}>{year}</span>
            </div>

            {/* Drafting line */}
            <div aria-hidden style={{ height: 0, borderTop: "1px solid var(--border)", marginBottom: 18, position: "relative" }}>
              <span style={{ position: "absolute", top: -3, left: 0, width: 1, height: 6, backgroundColor: "var(--construction)" }} />
              <span style={{ position: "absolute", top: -3, right: 0, width: 1, height: 6, backgroundColor: "var(--construction)" }} />
            </div>

            {/* Hero visual */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 2", overflow: "hidden" }}>
              {visualKind === "thesis"
                ? <ThesisStage hovered={hovered} />
                : <RendersStage hovered={hovered} />
              }
            </div>

            {/* Title + subtitle */}
            <div style={{ marginTop: 24, flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 2.6vw, 34px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                margin: 0,
                marginBottom: 12,
              }}>
                {title}
                <motion.span
                  aria-hidden
                  animate={{ scale: hovered ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 1.4, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
                  style={{
                    width: 7, height: 7, borderRadius: 999,
                    backgroundColor: accent.primary, opacity: 0.85,
                    display: "inline-block", flexShrink: 0,
                    marginLeft: 10, verticalAlign: "middle",
                  }}
                />
              </h3>

              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                margin: 0,
                marginBottom: 22,
              }}>
                {subtitle}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8 }}>
                <div style={{
                  ...mono, fontSize: 10,
                  color: hovered ? accent.dark : "var(--text-secondary)",
                  transitionProperty: "color", transitionDuration: "300ms",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <span>View Case Study</span>
                  <span aria-hidden style={{ position: "relative", display: "inline-block", width: 48, height: 1, overflow: "hidden" }}>
                    <motion.span
                      initial={false}
                      animate={{ scaleX: hovered ? 1 : 0.25 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{
                        position: "absolute", inset: 0,
                        backgroundColor: hovered ? accent.primary : "var(--border)",
                        transformOrigin: "left center",
                      }}
                    />
                  </span>
                  <ArrowRight
                    size={14}
                    weight="regular"
                    style={{
                      color: hovered ? accent.primary : "currentColor",
                      transitionProperty: "color",
                      transitionDuration: "300ms",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                  {tags.slice(0, 2).map((tag) => (
                    <span key={tag} style={{
                      ...mono, fontSize: 8, color: "var(--text-muted)",
                      letterSpacing: "0.14em", padding: "2px 7px",
                      border: "1px solid var(--border)",
                    }}>
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


/* ── Thesis visual — real project image ───────────────────────── */
function ThesisStage({ hovered }: { hovered: boolean }) {
  return (
    <motion.div
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      animate={{ scale: hovered ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 30, mass: 0.9 }}
    >
      <img
        src="https://framerusercontent.com/images/eq440NR8EZrR2U1JX0rdFpXeA.jpg"
        alt="Public Realm project render"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
          transitionProperty: "opacity", transitionDuration: "400ms",
          opacity: hovered ? 0.6 : 1,
        }}
      />
    </motion.div>
  );
}


/* ── Renders visual — real project image ──────────────────────── */
function RendersStage({ hovered }: { hovered: boolean }) {
  return (
    <motion.div
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      animate={{ scale: hovered ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 30, mass: 0.9 }}
    >
      <img
        src="https://framerusercontent.com/images/2uuxghidYBAIl3mTfzx4LS16YA.jpg"
        alt="Rendered Realities project"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
          transitionProperty: "opacity", transitionDuration: "400ms",
          opacity: hovered ? 0.6 : 1,
        }}
      />
    </motion.div>
  );
}


/* ── Corner construction ticks ─────────────────────────────────────── */
function CornerTicks({ hovered, color }: { hovered: boolean; color: string }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 10, height: 10, zIndex: 3, pointerEvents: "none",
    transitionProperty: "opacity", transitionDuration: "300ms",
    opacity: hovered ? 0.9 : 0,
  };
  const stroke = `1px solid ${color}`;
  return (
    <>
      <span aria-hidden style={{ ...base, top: 4, left: 4, borderTop: stroke, borderLeft: stroke }} />
      <span aria-hidden style={{ ...base, top: 4, right: 4, borderTop: stroke, borderRight: stroke }} />
      <span aria-hidden style={{ ...base, bottom: 4, left: 4, borderBottom: stroke, borderLeft: stroke }} />
      <span aria-hidden style={{ ...base, bottom: 4, right: 4, borderBottom: stroke, borderRight: stroke }} />
    </>
  );
}
