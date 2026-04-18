import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Desktop,
  DeviceMobile,
  Users,
  Lightbulb,
  CheckCircle,
  Star,
  ShareNetwork,
  CornersOut,
  ChartBar,
} from "@phosphor-icons/react";
import { getAdjacentProjects } from "../data/projects";

/* ── Arko product colors (local, don't touch global tokens) ─────── */
const A = {
  dark:      "#131A13",
  darkMid:   "#1E2B1E",
  green:     "#3D5C35",
  greenMid:  "#4A6741",
  greenLight:"#5C7F52",
  cream:     "#F4EFE6",
  creamMid:  "#E8E3D8",
  text:      "#E2DDD4",
  textMuted: "#8A9A82",
};

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
};

/* ── Fade-in on scroll ──────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  y = 24,
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

/* ── Section label in mono caps ─────────────────────────────────── */
function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        ...mono,
        fontSize: 10,
        color: light ? A.textMuted : "var(--text-muted)",
        marginBottom: 14,
      }}
    >
      {children}
    </p>
  );
}

/* ── Browser chrome mockup ──────────────────────────────────────── */
function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.04) inset, 0 28px 80px rgba(0,0,0,0.32)",
      }}
    >
      <div
        style={{
          background: "#242424",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div
              key={c}
              style={{ width: 11, height: 11, borderRadius: "50%", background: c }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 22,
            borderRadius: 5,
            background: "#333",
            margin: "0 10px",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 10, color: "#666" }}>
            app.arko.io
          </span>
        </div>
      </div>
      <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
    </div>
  );
}

/* ── iPhone frame (portrait) ────────────────────────────────────── */
function PhoneFrame({
  src,
  alt,
  scale = 1,
}: {
  src: string;
  alt: string;
  scale?: number;
}) {
  const w = 240 * scale;
  const r = 38 * scale;
  return (
    <div
      style={{
        width: w,
        borderRadius: r,
        background: "#18181B",
        padding: `${12 * scale}px ${9 * scale}px`,
        boxShadow: `inset 0 0 0 ${1.5 * scale}px #2A2A2E, 0 ${24 * scale}px ${64 * scale}px rgba(0,0,0,0.45)`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 * scale }}>
        <div
          style={{
            width: 88 * scale,
            height: 28 * scale,
            borderRadius: 20 * scale,
            background: "#000",
          }}
        />
      </div>
      <div style={{ borderRadius: 26 * scale, overflow: "hidden" }}>
        <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 * scale }}>
        <div
          style={{
            width: 96 * scale,
            height: 4 * scale,
            borderRadius: 3 * scale,
            background: "#3A3A3E",
          }}
        />
      </div>
    </div>
  );
}

/* ── Landscape screenshot (AR editor screens) ───────────────────── */
function LandscapeScreen({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <FadeIn>
      <div>
        <div
          style={{
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          }}
        >
          <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
        </div>
        <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginTop: 9 }}>
          {label}
        </p>
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
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

      {/* ───────────────────────────────────────────────────────────
          01 · HERO
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: A.dark,
          paddingTop: "clamp(64px, 10vw, 112px)",
          paddingBottom: 0,
          overflow: "hidden",
        }}
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
              color: A.textMuted,
              textDecoration: "none",
              marginBottom: 48,
              transitionProperty: "color",
              transitionDuration: "150ms",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = A.creamMid)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = A.textMuted)
            }
          >
            <ArrowLeft size={14} />
            All Work
          </Link>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}
          >
            {["B2B SaaS", "Web + iOS", "Product Design", "AR / Spatial"].map((t) => (
              <span
                key={t}
                style={{
                  ...mono,
                  fontSize: 9,
                  color: A.greenMid,
                  border: `1px solid ${A.greenMid}55`,
                  background: `${A.greenMid}18`,
                  padding: "4px 10px",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.13, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(56px, 8vw, 96px)",
              color: A.cream,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              marginBottom: 22,
            }}
          >
            Arko
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              color: A.textMuted,
              lineHeight: 1.65,
              maxWidth: 520,
              marginBottom: 60,
            }}
          >
            Spatial design platform for interior design firms and
            architecture studios — scan, design, and get client approval
            without leaving the platform.
          </motion.p>

          {/* Hero browser frame */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transform: "perspective(1400px) rotateX(3deg)",
              transformOrigin: "bottom center",
            }}
          >
            <BrowserFrame src="/arko/web-3.png" alt="Arko dashboard" />
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          02 · META STRIP
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-primary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderLeft: "1px solid var(--border)" }}
          >
            {[
              { label: "Role", value: "Product Designer\n(End-to-end)" },
              { label: "Platform", value: "Web + iOS" },
              { label: "Timeline", value: "14 weeks" },
              { label: "Tools", value: "Figma · Framer\nProtopie" },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  padding: "28px 24px",
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <p
                  style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 8 }}
                >
                  {m.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.55,
                    whiteSpace: "pre-line",
                  }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          03 · THE PROBLEM
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 96px) 0",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <Label>The Problem</Label>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3.5vw, 44px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 48,
                maxWidth: 620,
              }}
            >
              Clients can't visualize a space from a floor plan. And that
              miscommunication is expensive.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                number: "6–8 hrs",
                tag: "Lost per project",
                body: "Average time design firms waste on revision cycles driven by one root cause: clients can't read a floor plan.",
                icon: <ChartBar size={20} weight="bold" />,
              },
              {
                number: "3 tools",
                tag: "None of which work",
                body: "AutoCAD exports, PDF mood boards, physical walkthroughs — too technical, too costly, or both.",
                icon: <Desktop size={20} weight="bold" />,
              },
              {
                number: "₀ value",
                tag: "Of a verbal yes",
                body: "Clients agree in the meeting and change their mind when they see it built. By then, rework is expensive.",
                icon: <CheckCircle size={20} weight="bold" />,
              },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.09}>
                <div
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    padding: "28px 24px",
                    height: "100%",
                  }}
                >
                  <div style={{ color: A.greenMid, marginBottom: 18 }}>{s.icon}</div>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(34px, 4vw, 48px)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {s.number}
                  </p>
                  <p style={{ ...mono, fontSize: 9, color: A.greenMid, marginBottom: 14 }}>
                    {s.tag}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          04 · TWO USERS
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 96px) 0",
          background: "var(--bg-primary)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <Label>The Users</Label>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3.5vw, 44px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 40,
              }}
            >
              One product. Two completely different contexts of use.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Designer — dark card */}
            <FadeIn delay={0.05}>
              <div
                style={{
                  background: A.dark,
                  padding: "36px 32px",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: `${A.green}18`,
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: `${A.greenMid}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: A.greenMid,
                    }}
                  >
                    <Desktop size={20} />
                  </div>
                  <div>
                    <p style={{ ...mono, fontSize: 8, color: A.textMuted }}>
                      Primary User
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: A.cream,
                        lineHeight: 1.2,
                      }}
                    >
                      The Designer
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    color: A.textMuted,
                    lineHeight: 1.75,
                    marginBottom: 24,
                  }}
                >
                  A project lead at an interior design firm managing 4–8 active
                  client projects simultaneously. Uses Arko daily.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "Scans spaces in AR and places furniture digitally",
                    "Tracks project status across team and clients",
                    "Needs a clear, fast handoff mechanism",
                    "Values speed, precision, and professional credibility",
                  ].map((n) => (
                    <div key={n} style={{ display: "flex", gap: 10 }}>
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: A.greenMid,
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: 14,
                          color: A.text,
                          lineHeight: 1.6,
                        }}
                      >
                        {n}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Client — cream card */}
            <FadeIn delay={0.12}>
              <div
                style={{
                  background: A.cream,
                  padding: "36px 32px",
                  height: "100%",
                  border: "1px solid rgba(0,0,0,0.07)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: -50,
                    left: -50,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.04)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#5A4A3A",
                    }}
                  >
                    <Users size={20} />
                  </div>
                  <div>
                    <p style={{ ...mono, fontSize: 8, color: "#9A8A7A" }}>
                      Secondary User
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#1A1410",
                        lineHeight: 1.2,
                      }}
                    >
                      The Client
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    color: "#5A4A3A",
                    lineHeight: 1.75,
                    marginBottom: 24,
                  }}
                >
                  A homeowner or property developer reviewing a design remotely.
                  Not design-literate. Uses Arko occasionally.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "Needs to understand the space immediately",
                    "Wants to leave specific, pinned spatial feedback",
                    "Approves with confidence from their phone",
                    "No app install, no account — zero friction",
                  ].map((n) => (
                    <div key={n} style={{ display: "flex", gap: 10 }}>
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#8A7A6A",
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: 14,
                          color: "#3A2A1A",
                          lineHeight: 1.6,
                        }}
                      >
                        {n}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          05 · KEY INSIGHT
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: A.dark,
          padding: "clamp(72px, 10vw, 120px) 0",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 32,
              }}
            >
              <Lightbulb size={16} style={{ color: A.greenMid }} />
              <p style={{ ...mono, fontSize: 9, color: A.greenMid }}>Key Insight</p>
            </div>
            <blockquote
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(24px, 4vw, 50px)",
                color: A.cream,
                lineHeight: 1.3,
                letterSpacing: "-0.025em",
                marginBottom: 32,
                quotes: "none",
              }}
            >
              Clients don't reject designs because they have bad taste.{" "}
              <span style={{ color: A.greenMid }}>
                They reject them because they couldn't see it clearly enough to
                say yes the first time.
              </span>
            </blockquote>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 16,
                color: A.textMuted,
                lineHeight: 1.75,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              This reframed the design direction entirely. The goal wasn't a
              better design tool — it was a better{" "}
              <em style={{ color: A.creamMid }}>communication</em> tool powered
              by design.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          06 · DESIGNER WEB EXPERIENCE
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 96px) 0",
          background: "var(--bg-primary)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Desktop size={18} style={{ color: A.greenMid }} />
              <Label>Designer · Web App</Label>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 40px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              A professional workspace. No compromises.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 560,
                marginBottom: 44,
              }}
            >
              Dense, powerful, and built for daily professional use — sidebar
              navigation, project management, team activity, and spatial
              editing tools without sacrificing clarity.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                src: "/arko/web-3.png",
                label: "Dashboard — Active projects, team activity, stats at a glance",
              },
              {
                src: "/arko/web-4.png",
                label: "All Projects — Filter by status, search, one-click access",
              },
              {
                src: "/arko/web-5.png",
                label: "Project Detail — Room progress, live activity log, Share CTA",
              },
              {
                src: "/arko/web-6.png",
                label: "Comments View — Pinned spatial feedback from the client",
              },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div>
                  <BrowserFrame src={s.src} alt={s.label} />
                  <p
                    style={{
                      ...mono,
                      fontSize: 9,
                      color: "var(--text-muted)",
                      marginTop: 10,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          07 · MOBILE SCAN + AR EDITOR
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 96px) 0",
          background: "var(--bg-secondary)",
          overflow: "hidden",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <CornersOut size={18} style={{ color: A.greenMid }} />
              <Label>Designer · iOS — Scan to AR Editor</Label>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 40px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              From empty room to furnished space in minutes.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 560,
                marginBottom: 48,
              }}
            >
              A pre-scan checklist ensures quality capture before the AR
              session begins. The editor then keeps the canvas front and
              center — tools at the edges, space in focus.
            </p>
          </FadeIn>

          {/* Scan flow — portrait phones horizontal strip */}
          <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 20 }}>
            Scan Flow
          </p>
          <div
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 16,
              scrollbarWidth: "none",
            }}
          >
            {[
              { src: "/arko/phone-3.png", label: "Pre-scan checklist" },
              { src: "/arko/phone-4.png", label: "Floor detection" },
              { src: "/arko/phone-5.png", label: "Floor confirmed" },
              { src: "/arko/phone-6.png", label: "92% spatial accuracy" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <PhoneFrame src={s.src} alt={s.label} scale={0.88} />
                <p
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: "var(--text-muted)",
                    textAlign: "center",
                    maxWidth: 200,
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* AR Editor — landscape screenshots */}
          <div style={{ marginTop: 56 }}>
            <p
              style={{
                ...mono,
                fontSize: 9,
                color: "var(--text-muted)",
                marginBottom: 20,
              }}
            >
              AR Room Editor (Landscape)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LandscapeScreen
                src="/arko/phone-7.png"
                alt="Room type selection"
                label="Room Type — Progressive breadcrumb navigation"
              />
              <LandscapeScreen
                src="/arko/phone-8.png"
                alt="Furniture library"
                label="Furniture Library — Collapsible sidebar, full canvas"
              />
              <LandscapeScreen
                src="/arko/phone-10.png"
                alt="Item placed with properties"
                label="Item Selected — Properties panel slides in on select"
              />
              <LandscapeScreen
                src="/arko/phone-12.png"
                alt="Preview mode"
                label="Preview Mode — Client-ready view, Send to Client CTA"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          08 · CLIENT EXPERIENCE
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 96px) 0",
          background: A.dark,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Users size={18} style={{ color: A.greenMid }} />
              <p style={{ ...mono, fontSize: 10, color: A.textMuted }}>
                Client · Mobile Experience
              </p>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 40px)",
                color: A.cream,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              No login. No jargon. Just the room, a comment, and an approve.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 16,
                color: A.textMuted,
                lineHeight: 1.7,
                maxWidth: 560,
                marginBottom: 52,
              }}
            >
              The client opens a link, sees their space in AR, leaves pinned
              spatial feedback, and approves — without downloading an app or
              creating an account.
            </p>
          </FadeIn>

          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                src: "/arko/phone-13.png",
                label: "Client Landing\nDesigner info + View Design",
              },
              {
                src: "/arko/phone-14.png",
                label: "Review Mode\nComments + Approve button",
              },
              {
                src: "/arko/phone-15.png",
                label: "Pin a Comment\nSpatial feedback on the room",
              },
              {
                src: "/arko/phone-16.png",
                label: "Design Approved\nTimestamped PDF summary",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <PhoneFrame src={s.src} alt={s.label} />
                <p
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: A.textMuted,
                    textAlign: "center",
                    maxWidth: 200,
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          09 · DESIGN DECISIONS
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 96px) 0",
          background: "var(--bg-primary)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <Label>Design Decisions</Label>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 40px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 56,
              }}
            >
              Four decisions that defined the product.
            </h2>
          </FadeIn>

          {[
            {
              num: "01",
              icon: <Desktop size={22} />,
              title: "Two entirely separate experiences",
              body: "The designer interface is dense, powerful, and built for daily professional use — sidebar navigation, project management, AR editing. The client interface strips everything away: no login, no nav, no jargon. Just the room, a comment, and an approve. Same platform. Two completely different contexts of use.",
              image: "/arko/web-5.png",
              type: "browser",
            },
            {
              num: "02",
              icon: <CornersOut size={22} />,
              title: "AR editor built for professionals, not consumers",
              body: "The canvas is always first — tools live at the edges. Collapsible Furniture Library left, Properties panel right, minimal toolbar bottom. Navigation uses progressive disclosure: Elements → Furniture → Room Type → Category. The library never overwhelms the space the designer is working in.",
              image: "/arko/phone-10.png",
              type: "phone",
            },
            {
              num: "03",
              icon: <ShareNetwork size={22} />,
              title: "The approval flow as the product's core value",
              body: "Most design tools stop at visualization. Arko makes client sign-off a first-class feature. Share modal → client walkthrough → comment pinning → one-tap approval is one seamless loop. When a client approves, the designer gets an instant notification and a timestamped PDF that closes the loop every other tool leaves open.",
              image: "/arko/phone-16.png",
              type: "phone",
            },
            {
              num: "04",
              icon: <Lightbulb size={22} />,
              title: "Empty states as onboarding",
              body: "Both the dashboard and project detail have fully designed empty states that guide users to their first action. For a B2B product where adoption depends entirely on the first session, a stranded user is a churned user. Empty states are a product feature — not an afterthought.",
              image: "/arko/web-3.png",
              type: "browser",
            },
          ].map((d, i) => {
            const isEven = i % 2 === 0;
            const textBlock = (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 32,
                      fontWeight: 700,
                      color: "var(--border)",
                      lineHeight: 1,
                    }}
                  >
                    {d.num}
                  </span>
                  <div style={{ color: A.greenMid }}>{d.icon}</div>
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(20px, 2.2vw, 28px)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    marginBottom: 16,
                  }}
                >
                  {d.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                  }}
                >
                  {d.body}
                </p>
              </div>
            );
            const imageBlock = (
              <div>
                {d.type === "browser" ? (
                  <BrowserFrame src={d.image} alt={d.title} />
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <PhoneFrame src={d.image} alt={d.title} scale={0.88} />
                  </div>
                )}
              </div>
            );
            return (
              <FadeIn key={i} delay={0.04}>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                  style={{
                    padding: "52px 0",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div className={isEven ? "" : "md:order-2"}>{textBlock}</div>
                  <div className={isEven ? "" : "md:order-1"}>{imageBlock}</div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          10 · OUTCOMES
      ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 96px) 0",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <Label>Outcomes & Reflection</Label>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 40px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 40,
              }}
            >
              Three workflows. One platform. No compromise on either user.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FadeIn delay={0.05}>
              <div
                style={{
                  background: A.dark,
                  padding: "32px 28px",
                  height: "100%",
                }}
              >
                <div style={{ color: A.greenMid, marginBottom: 16 }}>
                  <ChartBar size={22} />
                </div>
                <p style={{ ...mono, fontSize: 9, color: A.textMuted, marginBottom: 14 }}>
                  What I'd Build Next
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 15,
                    color: A.text,
                    lineHeight: 1.8,
                  }}
                >
                  An analytics layer for designers — showing which rooms clients
                  spend the most time reviewing, which furniture gets swapped
                  most often, and where comments cluster spatially. Turning
                  client behavior into actionable design intelligence.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  padding: "32px 28px",
                  height: "100%",
                }}
              >
                <div style={{ color: A.greenMid, marginBottom: 16 }}>
                  <Star size={22} />
                </div>
                <p
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: "var(--text-muted)",
                    marginBottom: 14,
                  }}
                >
                  What This Reinforced
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                  }}
                >
                  The best B2B products are the ones that make the professional
                  look good in front of their client. Every decision in Arko
                  was tested against that lens — not "is this useful to the
                  designer?" but "does this make the designer's client feel
                  confident and understood?"
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          11 · NAVIGATION
      ─────────────────────────────────────────────────────────── */}
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
            <ArrowLeft size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <div>
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>
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
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
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
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>
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
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                }
              >
                {adjacent.next.title}
              </p>
            </div>
            <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          </Link>
        ) : (
          <div />
        )}
      </div>

    </motion.div>
  );
}
