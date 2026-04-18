import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import SectionMarker from "../components/SectionMarker";
import DrawingSheetBorder from "../components/DrawingSheetBorder";
import HandDrawnSketch from "../components/HandDrawnSketch";
import AnnotationLabel from "../components/AnnotationLabel";
import { getAdjacentProjects } from "../data/projects";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
};

/* ── Fade in on scroll ──────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Architectural dimension line annotation ────────────────────── */
function DimensionAnnotation({ label }: { label: string }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6 }}
      aria-hidden
    >
      <svg viewBox="0 0 8 20" width={8} height={20} fill="none">
        <line x1="4" y1="0" x2="4" y2="20" stroke="var(--text-muted)" strokeWidth="0.75" opacity="0.45" />
        <line x1="0" y1="0" x2="8" y2="0" stroke="var(--text-muted)" strokeWidth="0.75" opacity="0.45" />
        <line x1="0" y1="20" x2="8" y2="20" stroke="var(--text-muted)" strokeWidth="0.75" opacity="0.45" />
      </svg>
      <span
        style={{
          ...mono,
          fontSize: 8,
          color: "var(--text-muted)",
          opacity: 0.55,
          writingMode: "vertical-rl" as const,
          transform: "rotate(180deg)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Room wireframe illustration ────────────────────────────────── */
function RoomWireframe() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const paths = [
    "M 10 75 L 60 25",
    "M 110 75 L 60 25",
    "M 10 75 L 110 75",
    "M 10 15 L 60 25",
    "M 110 15 L 60 25",
    "M 10 15 L 110 15",
    "M 10 15 L 10 75",
    "M 110 15 L 110 75",
    "M 82 22 L 82 48 L 106 48 L 106 22",
    "M 94 22 L 94 48",
    "M 30 65 L 78 65 L 78 55 L 30 55 Z",
    "M 30 55 L 30 51",
    "M 78 55 L 78 51",
    "M 30 51 L 78 51",
  ];
  return (
    <div ref={ref} aria-hidden style={{ opacity: 0.18 }}>
      <svg
        viewBox="0 0 120 90"
        fill="none"
        width="100%"
        stroke="var(--text-secondary)"
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      pathLength: { delay: i * 0.06, duration: 0.7, ease: "easeInOut" },
                      opacity: { delay: i * 0.06, duration: 0.2 },
                    },
                  }
                : {}
            }
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Simple flow diagram ─────────────────────────────────────────── */
function FlowDiagram() {
  const steps = ["Scan", "Design", "Share", "Approve"];
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 0 }}
      aria-hidden
    >
      {steps.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "0.75px solid var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.35,
              }}
            >
              <span style={{ ...mono, fontSize: 7, color: "var(--text-muted)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 11,
                color: "var(--text-secondary)",
                opacity: 0.45,
              }}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <svg
              viewBox="0 0 32 12"
              width={32}
              height={12}
              fill="none"
              style={{ marginBottom: 16 }}
            >
              <line
                x1="0"
                y1="6"
                x2="26"
                y2="6"
                stroke="var(--text-muted)"
                strokeWidth="0.75"
                strokeDasharray="3 2"
                opacity="0.3"
              />
              <path
                d="M 22 3 L 26 6 L 22 9"
                stroke="var(--text-muted)"
                strokeWidth="0.75"
                opacity="0.3"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function ArkoCase() {
  const adjacent = getAdjacentProjects("arko");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-14"
    >

      {/* ═══════════════════════════════════════════════════════
          SHEET 01 — OVERVIEW
      ═══════════════════════════════════════════════════════ */}
      <DrawingSheetBorder
        titleBlock={{
          project: "Arko",
          role: "Product Designer",
          duration: "14 Weeks",
          sheet: "01 OF 05",
        }}
        className="blueprint-grid"
        style={{ padding: "clamp(56px, 8vw, 88px) 0 clamp(48px, 7vw, 72px)" }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          {/* Back link */}
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              ...mono,
              fontSize: 10,
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: 48,
              transitionProperty: "color",
              transitionDuration: "150ms",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
            }
          >
            <ArrowLeft size={14} />
            All Work
          </Link>

          {/* Asymmetric grid: title left, hero screenshot right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

            {/* Left — Title block */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Tags */}
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}
                >
                  {["B2B SaaS", "Web + iOS", "14 Weeks"].map((t) => (
                    <span
                      key={t}
                      style={{
                        ...mono,
                        fontSize: 9,
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                        padding: "3px 8px",
                        backgroundColor: "var(--bg-elevated)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h1
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(52px, 8vw, 88px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.95,
                    marginBottom: 20,
                  }}
                >
                  Arko
                </h1>

                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "clamp(15px, 1.6vw, 18px)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: 36,
                    maxWidth: 380,
                  }}
                >
                  Spatial design platform letting interior design firms scan
                  spaces in AR, design them digitally, and get client approval
                  — without the back-and-forth.
                </p>

                {/* Meta */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px 24px",
                    paddingTop: 24,
                    borderTop: "0.75px solid var(--border)",
                    marginBottom: 32,
                  }}
                >
                  {[
                    { label: "Role", value: "Product Designer" },
                    { label: "Platform", value: "Web + iOS" },
                    { label: "Timeline", value: "14 weeks" },
                    { label: "Tools", value: "Figma · Framer · Protopie" },
                  ].map((m) => (
                    <div key={m.label}>
                      <p
                        style={{
                          ...mono,
                          fontSize: 8,
                          color: "var(--text-muted)",
                          marginBottom: 4,
                        }}
                      >
                        {m.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          lineHeight: 1.4,
                        }}
                      >
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Hand-drawn decoration */}
                <HandDrawnSketch
                  type="morphTransition"
                  width={180}
                  height={72}
                  annotation="from physical to digital"
                  delay={0.5}
                />
              </motion.div>
            </div>

            {/* Right — Hero screenshot */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src="/arko/web-1.png"
                  alt="Arko — Design rooms your clients can actually walk through"
                  style={{
                    width: "100%",
                    display: "block",
                    border: "1px solid var(--border)",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.04), 0 16px 56px rgba(0,0,0,0.10)",
                  }}
                />
                <AnnotationLabel
                  text="marketing landing page"
                  direction="left"
                  delay={0.7}
                  style={{ position: "absolute", bottom: -24, right: 0 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </DrawingSheetBorder>

      {/* ═══════════════════════════════════════════════════════
          SHEET 02 — THE PROBLEM & USERS
      ═══════════════════════════════════════════════════════ */}
      <DrawingSheetBorder
        titleBlock={{ sheet: "02 OF 05" }}
        className="blueprint-grid-subtle"
        style={{
          padding: "clamp(56px, 8vw, 88px) 0 clamp(48px, 7vw, 72px)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          <FadeIn>
            <SectionMarker label="The Problem" letter="A" className="mb-10" />
          </FadeIn>

          {/* Three stats with dimension annotation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ marginBottom: 48 }}>
            {[
              {
                number: "6–8 hrs",
                label: "Lost per project",
                note: "to revision cycles caused by clients who couldn't visualize the space",
              },
              {
                number: "3 tools",
                label: "That don't talk to each other",
                note: "AutoCAD exports, PDF boards, physical walkthroughs — all disconnected",
              },
              {
                number: "₀ binding",
                label: "In a verbal yes",
                note: "Clients approve in the meeting and change their minds when they see it built",
              },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    padding: "28px 24px",
                    display: "flex",
                    gap: 12,
                  }}
                >
                  <DimensionAnnotation label={`0${i + 1}`} />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        fontSize: "clamp(32px, 4vw, 44px)",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {s.number}
                    </p>
                    <p
                      style={{
                        ...mono,
                        fontSize: 8,
                        color: "var(--text-muted)",
                        marginBottom: 10,
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.65,
                      }}
                    >
                      {s.note}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Handwritten note between problem and users */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 48,
            }}
            aria-hidden
          >
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 14,
                color: "var(--text-secondary)",
                opacity: 0.35,
              }}
            >
              → two very different people needed to use this product
            </span>
          </div>

          {/* Two Users */}
          <FadeIn>
            <SectionMarker label="The Users" letter="B" className="mb-8" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Designer */}
            <FadeIn delay={0.05}>
              <div
                style={{
                  padding: "32px 28px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-elevated)",
                  borderRight: "none",
                  position: "relative",
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 6 }}>
                    Primary
                  </p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "var(--text-primary)",
                      marginBottom: 12,
                    }}
                  >
                    The Designer
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                    }}
                  >
                    A project lead managing 4–8 active clients. Uses Arko daily
                    to scan spaces, place furniture, adjust finishes, and track
                    project status. Needs speed, precision, and a clear handoff.
                  </p>
                </div>
                <HandDrawnSketch
                  type="floorPlan"
                  width={100}
                  height={64}
                  annotation="designer's workspace"
                  delay={0.3}
                />
              </div>
            </FadeIn>

            {/* Client */}
            <FadeIn delay={0.12}>
              <div
                style={{
                  padding: "32px 28px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-primary)",
                  position: "relative",
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 6 }}>
                    Secondary
                  </p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "var(--text-primary)",
                      marginBottom: 12,
                    }}
                  >
                    The Client
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                    }}
                  >
                    A homeowner or developer reviewing remotely. Not
                    design-literate. Needs to understand the space instantly,
                    leave specific feedback, and approve with confidence — no
                    app download, no account.
                  </p>
                </div>
                <HandDrawnSketch
                  type="wireframe"
                  width={60}
                  height={80}
                  annotation="client's view"
                  delay={0.4}
                />
              </div>
            </FadeIn>
          </div>

          {/* Key Insight */}
          <FadeIn delay={0.1}>
            <div
              style={{
                marginTop: 48,
                padding: "36px 32px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-elevated)",
                position: "relative",
              }}
            >
              {/* Corner marks */}
              {[
                { top: 8, left: 8 },
                { top: 8, right: 8 },
                { bottom: 8, left: 8 },
                { bottom: 8, right: 8 },
              ].map((pos, i) => (
                <div
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute",
                    width: 10,
                    height: 10,
                    borderTop: i < 2 ? "0.75px solid var(--construction)" : undefined,
                    borderBottom: i >= 2 ? "0.75px solid var(--construction)" : undefined,
                    borderLeft: i % 2 === 0 ? "0.75px solid var(--construction)" : undefined,
                    borderRight: i % 2 === 1 ? "0.75px solid var(--construction)" : undefined,
                    ...pos,
                  }}
                />
              ))}

              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 16 }}>
                Key Insight
              </p>
              <blockquote
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(20px, 2.8vw, 32px)",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  quotes: "none",
                  marginBottom: 12,
                }}
              >
                Clients don't reject designs because they have bad taste.
                They reject them because they{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: "var(--accent)",
                  }}
                >
                  couldn't see it clearly enough
                </em>{" "}
                to say yes the first time.
              </blockquote>
              <p
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  opacity: 0.5,
                }}
              >
                → this reframed the entire design direction
              </p>
            </div>
          </FadeIn>
        </div>
      </DrawingSheetBorder>

      {/* ═══════════════════════════════════════════════════════
          SHEET 03 — DESIGNER · WEB PLATFORM
      ═══════════════════════════════════════════════════════ */}
      <DrawingSheetBorder
        titleBlock={{ sheet: "03 OF 05" }}
        style={{
          padding: "clamp(56px, 8vw, 88px) 0 clamp(48px, 7vw, 72px)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          <FadeIn>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <SectionMarker label="Designer · Web Application" letter="C" />
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  opacity: 0.4,
                }}
              >
                dense, powerful, built for daily professional use
              </span>
            </div>
          </FadeIn>

          {/* Dashboard — full width */}
          <FadeIn>
            <div style={{ marginBottom: 8 }}>
              <img
                src="/arko/web-3.png"
                alt="Arko Dashboard — Good morning, Sarah"
                style={{
                  width: "100%",
                  display: "block",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.07)",
                }}
              />
            </div>
            <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 24 }}>
              Fig. 01 — Dashboard · active projects, team activity, approval stats
            </p>
          </FadeIn>

          {/* All Projects + Project Detail — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: 24 }}>
            {[
              { src: "/arko/web-4.png", fig: "02", label: "All Projects · filter by status, one-click access" },
              { src: "/arko/web-5.png", fig: "03", label: "Project Detail · rooms, progress, activity log, Share CTA" },
            ].map((s) => (
              <FadeIn key={s.fig}>
                <div>
                  <img
                    src={s.src}
                    alt={s.label}
                    style={{
                      width: "100%",
                      display: "block",
                      border: "1px solid var(--border)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06)",
                      marginBottom: 8,
                    }}
                  />
                  <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)" }}>
                    Fig. {s.fig} — {s.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* AR Comments view — full width */}
          <FadeIn>
            <div style={{ position: "relative", marginBottom: 8 }}>
              <img
                src="/arko/web-6.png"
                alt="AR Comments view — client feedback pinned in the room"
                style={{
                  width: "100%",
                  display: "block",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.07)",
                }}
              />
              <AnnotationLabel
                text="client comments pinned in 3D space"
                direction="left"
                delay={0.3}
                style={{ position: "absolute", bottom: -22, right: 0 }}
              />
            </div>
            <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>
              Fig. 04 — AR Comments · spatial feedback from the client, visible in context
            </p>
          </FadeIn>
        </div>
      </DrawingSheetBorder>

      {/* ═══════════════════════════════════════════════════════
          SHEET 04 — MOBILE EXPERIENCE
      ═══════════════════════════════════════════════════════ */}
      <DrawingSheetBorder
        titleBlock={{ sheet: "04 OF 05" }}
        className="blueprint-grid-subtle"
        style={{
          padding: "clamp(56px, 8vw, 88px) 0 clamp(48px, 7vw, 72px)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          {/* — Scan Flow — */}
          <FadeIn>
            <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
              <div>
                <SectionMarker label="Designer · iOS — Scan Flow" letter="D" className="mb-4" />
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    maxWidth: 440,
                  }}
                >
                  A pre-scan checklist ensures quality capture before AR begins.
                  The scanner detects floor planes, measures accuracy, and
                  confirms spatial data before the editor opens.
                </p>
              </div>
              <div className="hidden md:block">
                <RoomWireframe />
              </div>
            </div>
          </FadeIn>

          {/* Phone screens — horizontal strip (screens include device frames) */}
          <div
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 8,
              scrollbarWidth: "none",
              marginBottom: 12,
            }}
          >
            {[
              { src: "/arko/phone-3.png", label: "Pre-scan checklist" },
              { src: "/arko/phone-4.png", label: "Detecting floor" },
              { src: "/arko/phone-5.png", label: "Floor confirmed" },
              { src: "/arko/phone-6.png", label: "92% spatial accuracy" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flexShrink: 0,
                  width: "clamp(160px, 22vw, 220px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <img src={s.src} alt={s.label} style={{ width: "100%", display: "block" }} />
                <p
                  style={{
                    ...mono,
                    fontSize: 8,
                    color: "var(--text-muted)",
                    textAlign: "center",
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "44px 0",
            }}
            aria-hidden
          >
            <div style={{ flex: 1, height: "0.75px", backgroundColor: "var(--border)" }} />
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 13,
                color: "var(--text-secondary)",
                opacity: 0.35,
                whiteSpace: "nowrap",
              }}
            >
              AR Room Editor
            </span>
            <div style={{ flex: 1, height: "0.75px", backgroundColor: "var(--border)" }} />
          </div>

          {/* AR Editor — landscape (phone already shows landscape device) */}
          <FadeIn>
            <SectionMarker label="AR Room Editor" letter="E" className="mb-6" />
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: 28,
              }}
            >
              Canvas first. Tools at the edges — progressive disclosure keeps
              the furniture library from overwhelming the space.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { src: "/arko/phone-7.png", fig: "05", label: "Room Type — breadcrumb navigation in the editor" },
              { src: "/arko/phone-8.png", fig: "06", label: "Furniture Library — collapsible sidebar, full canvas" },
              { src: "/arko/phone-10.png", fig: "07", label: "Item Selected — Properties panel slides in on tap" },
              { src: "/arko/phone-12.png", fig: "08", label: "Preview Mode — client-ready view, Send to Client CTA" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div>
                  <img
                    src={s.src}
                    alt={s.label}
                    style={{
                      width: "100%",
                      display: "block",
                      border: "1px solid var(--border)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.05)",
                      marginBottom: 8,
                    }}
                  />
                  <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)" }}>
                    Fig. {s.fig} — {s.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "44px 0",
            }}
            aria-hidden
          >
            <div style={{ flex: 1, height: "0.75px", backgroundColor: "var(--border)" }} />
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 13,
                color: "var(--text-secondary)",
                opacity: 0.35,
                whiteSpace: "nowrap",
              }}
            >
              Client Experience
            </span>
            <div style={{ flex: 1, height: "0.75px", backgroundColor: "var(--border)" }} />
          </div>

          {/* Client Flow */}
          <FadeIn>
            <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
              <div>
                <SectionMarker label="Client · Mobile" letter="F" className="mb-4" />
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    maxWidth: 440,
                  }}
                >
                  No login. No jargon. The client opens a link, sees their room,
                  leaves a pinned comment, and approves — all without creating
                  an account.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <FlowDiagram />
              </div>
            </div>
          </FadeIn>

          {/* Client phone screens horizontal strip */}
          <div
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 8,
              scrollbarWidth: "none",
              marginBottom: 12,
            }}
          >
            {[
              { src: "/arko/phone-13.png", label: "Client landing\nDesigner info + View Design" },
              { src: "/arko/phone-14.png", label: "Review mode\nComments + Approve button" },
              { src: "/arko/phone-15.png", label: "Pin a comment\nSpatial feedback on room" },
              { src: "/arko/phone-16.png", label: "Design approved\nTimestamped PDF summary" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flexShrink: 0,
                  width: "clamp(160px, 22vw, 220px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <img src={s.src} alt={s.label} style={{ width: "100%", display: "block" }} />
                <p
                  style={{
                    ...mono,
                    fontSize: 8,
                    color: "var(--text-muted)",
                    textAlign: "center",
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 14,
                color: "var(--text-secondary)",
                opacity: 0.35,
              }}
              aria-hidden
            >
              approved in one tap →
            </span>
          </div>
        </div>
      </DrawingSheetBorder>

      {/* ═══════════════════════════════════════════════════════
          SHEET 05 — DECISIONS & OUTCOMES
      ═══════════════════════════════════════════════════════ */}
      <DrawingSheetBorder
        titleBlock={{ sheet: "05 OF 05" }}
        style={{
          padding: "clamp(56px, 8vw, 88px) 0 clamp(48px, 7vw, 72px)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          <FadeIn>
            <SectionMarker label="Design Decisions" letter="G" className="mb-10" />
          </FadeIn>

          {/* 2×2 decision cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: 64 }}>
            {[
              {
                num: "01",
                title: "Two entirely separate experiences",
                body: "Designer interface: dense, powerful, built for daily professional use. Client interface: no login, no nav, no jargon — just the room and an approve button.",
                img: "/arko/web-5.png",
              },
              {
                num: "02",
                title: "AR editor built for professionals",
                body: "Canvas first, tools at the edges. Progressive disclosure through Elements → Furniture → Room Type → Category means the library never overwhelms.",
                img: "/arko/phone-10.png",
              },
              {
                num: "03",
                title: "Approval flow as a first-class feature",
                body: "Share modal → walkthrough → pinned comments → one-tap approve is one seamless loop. The designer gets a timestamped PDF. The loop closes.",
                img: "/arko/phone-16.png",
              },
              {
                num: "04",
                title: "Empty states as onboarding",
                body: "For B2B tools where adoption hinges on the first session, a stranded user is a churned user. Empty states guide — they don't leave users to figure it out.",
                img: "/arko/web-3.png",
              },
            ].map((d, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg-elevated)",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 32,
                        fontWeight: 700,
                        color: "var(--border)",
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {d.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        fontSize: "clamp(16px, 1.8vw, 20px)",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {d.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {d.body}
                  </p>
                  <div
                    style={{
                      marginTop: "auto",
                      border: "1px solid var(--border)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={d.img}
                      alt={d.title}
                      style={{ width: "100%", display: "block", maxHeight: 140, objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Outcomes */}
          <FadeIn>
            <SectionMarker label="Outcomes & Reflection" letter="H" className="mb-10" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* What's next */}
            <FadeIn delay={0.05} className="md:col-span-5">
              <div
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  padding: "28px 24px",
                }}
              >
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 12 }}>
                  What I'd Build Next
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                  }}
                >
                  An analytics layer for designers — which rooms clients spend
                  most time reviewing, which furniture gets swapped most, where
                  comments cluster spatially. Turning client behavior into
                  design intelligence.
                </p>
              </div>
            </FadeIn>

            {/* Perspective sketch + reflection */}
            <div className="md:col-span-7">
              <FadeIn delay={0.1}>
                <div style={{ marginBottom: 24 }}>
                  <HandDrawnSketch
                    type="perspective"
                    width={200}
                    height={96}
                    annotation="architecture → digital product"
                    delay={0.2}
                  />
                </div>
                <blockquote
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(18px, 2.2vw, 26px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.4,
                    quotes: "none",
                    borderLeft: "2px solid var(--border)",
                    paddingLeft: 20,
                  }}
                >
                  The best B2B products make the professional look good in
                  front of their client. Every decision in Arko was made with
                  that in mind.
                </blockquote>
              </FadeIn>
            </div>
          </div>
        </div>
      </DrawingSheetBorder>

      {/* ═══════════════════════════════════════════════════════
          NAVIGATION
      ═══════════════════════════════════════════════════════ */}
      <div
        className="max-w-5xl mx-auto px-6 md:px-10 py-12 flex flex-wrap justify-between items-center gap-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {adjacent.prev ? (
          <Link
            to={`/work/${adjacent.prev.slug}`}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              maxWidth: "45%",
            }}
          >
            <ArrowLeft
              size={16}
              style={{ color: "var(--text-muted)", flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  ...mono,
                  fontSize: 8,
                  color: "var(--text-muted)",
                  marginBottom: 4,
                }}
              >
                Previous
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(14px, 2vw, 20px)",
                  color: "var(--text-secondary)",
                  transitionProperty: "color",
                  transitionDuration: "150ms",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)")
                }
              >
                {adjacent.prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {adjacent.next ? (
          <Link
            to={`/work/${adjacent.next.slug}`}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              maxWidth: "45%",
              marginLeft: "auto",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  ...mono,
                  fontSize: 8,
                  color: "var(--text-muted)",
                  marginBottom: 4,
                }}
              >
                Next
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(14px, 2vw, 20px)",
                  color: "var(--text-secondary)",
                  transitionProperty: "color",
                  transitionDuration: "150ms",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)")
                }
              >
                {adjacent.next.title}
              </p>
            </div>
            <ArrowRight
              size={16}
              style={{ color: "var(--text-muted)", flexShrink: 0 }}
            />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
  );
}
