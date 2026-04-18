import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
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

/* ── Fade in on scroll ──────────────────────────────────────────── */
function Reveal({
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Thin section divider with label ────────────────────────────── */
function Divider({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-4"
      style={{ margin: "clamp(56px, 7vw, 80px) 0 clamp(40px, 5vw, 56px)" }}
    >
      <div
        style={{ flex: 1, height: "0.75px", backgroundColor: "var(--border)" }}
      />
      <span
        style={{ ...mono, fontSize: 9, color: "var(--text-muted)", whiteSpace: "nowrap" }}
      >
        {label}
      </span>
      <div
        style={{ flex: 1, height: "0.75px", backgroundColor: "var(--border)" }}
      />
    </div>
  );
}

/* ── Screen image — web screenshot ──────────────────────────────── */
function Screen({
  src,
  alt,
  caption,
  style: extraStyle,
}: {
  src: string;
  alt: string;
  caption?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={extraStyle}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          display: "block",
          border: "1px solid var(--border)",
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.07), 0 24px 64px rgba(0,0,0,0.04)",
        }}
      />
      {caption && (
        <p
          style={{
            ...mono,
            fontSize: 9,
            color: "var(--text-muted)",
            marginTop: 10,
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

/* ── Phone image (device frame is already baked into asset) ─────── */
function Phone({
  src,
  alt,
  label,
  width = 200,
}: {
  src: string;
  alt: string;
  label?: string;
  width?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
        width,
      }}
    >
      <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
      {label && (
        <p
          style={{
            ...mono,
            fontSize: 8,
            color: "var(--text-muted)",
            textAlign: "center",
            lineHeight: 1.5,
            whiteSpace: "pre-line",
          }}
        >
          {label}
        </p>
      )}
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
      transition={{ duration: 0.4 }}
      className="pt-14"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section style={{ paddingTop: "clamp(52px, 8vw, 88px)", paddingBottom: "clamp(48px, 7vw, 72px)" }}>

          {/* Back */}
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.5 7h-9M5 3.5L1.5 7 5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Work
          </Link>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}
          >
            {["Product Design", "B2B SaaS", "Web + iOS", "AR / Spatial"].map((t) => (
              <span
                key={t}
                style={{
                  ...mono,
                  fontSize: 9,
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  padding: "3px 9px",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(52px, 9vw, 100px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.035em",
              lineHeight: 0.92,
              marginBottom: 24,
            }}
          >
            Arko
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.19, duration: 0.6 }}
            style={{
              fontFamily: sans,
              fontSize: "clamp(16px, 1.8vw, 20px)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: 48,
              maxWidth: 560,
            }}
          >
            Spatial design platform for interior design firms and architecture
            studios — scan, design, and get client sign-off without leaving the
            platform.
          </motion.p>

          {/* Hero cover image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/arko/web-1.png"
              alt="Arko — design rooms your clients can actually walk through"
              style={{
                width: "100%",
                display: "block",
                border: "1px solid var(--border)",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.05), 0 16px 56px rgba(0,0,0,0.10), 0 40px 96px rgba(0,0,0,0.05)",
              }}
            />
          </motion.div>
        </section>

        {/* ── META STRIP ───────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--border)",
            borderLeft: "1px solid var(--border)",
            marginBottom: "clamp(64px, 9vw, 96px)",
          }}
          className="md:grid-cols-4"
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
                padding: "22px 20px",
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 6 }}>
                {m.label}
              </p>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── OVERVIEW ─────────────────────────────────────────── */}
        <Reveal>
          <SectionMarker label="Overview" letter="A" className="mb-6" />
          <p
            style={{
              fontFamily: sans,
              fontSize: "clamp(16px, 1.6vw, 18px)",
              color: "var(--text-secondary)",
              lineHeight: 1.85,
              maxWidth: 660,
            }}
          >
            Interior designers spend hours chasing client approvals over email,
            WhatsApp, and in-person walkthroughs that still end in
            miscommunication. Arko is a B2B SaaS platform that lets design
            teams scan physical spaces in AR, furnish and finish them digitally,
            and share interactive walkthroughs with clients for remote review
            and one-click approval — eliminating the back-and-forth entirely.
          </p>
        </Reveal>

        {/* ── THE PROBLEM ──────────────────────────────────────── */}
        <Divider label="The Problem" />

        <Reveal>
          <SectionMarker label="Problem" letter="B" className="mb-8" />
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginBottom: 24,
              maxWidth: 620,
            }}
          >
            Clients can't visualize a space from a floor plan. That
            miscommunication costs real money.
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 16,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: 600,
              marginBottom: 48,
            }}
          >
            Design firms lose an average of 6–8 hours per project on revision
            cycles caused by one root problem — clients cannot visualize a
            space from a floor plan or mood board alone. They say yes in the
            meeting and change their mind when they see it built. The existing
            tools — AutoCAD exports, PDF presentations, physical walkthroughs —
            are either too technical for clients to interpret or too costly to
            arrange repeatedly.
          </p>
        </Reveal>

        {/* Three stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 0 }}>
          {[
            {
              number: "6–8 hrs",
              label: "Lost per project",
              detail: "to revision cycles driven by clients who couldn't visualize the space",
            },
            {
              number: "3 tools",
              label: "Disconnected",
              detail: "AutoCAD exports, PDF boards, physical walkthroughs — none talk to each other",
            },
            {
              number: "₀ binding",
              label: "In a verbal yes",
              detail: "Clients approve in the room and change their minds once they see it built",
            },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.09}>
              <div
                style={{
                  padding: "24px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    fontFamily: serif,
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
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 12 }}>
                  {s.label}
                </p>
                <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {s.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── THE USERS ────────────────────────────────────────── */}
        <Divider label="The Users" />

        <Reveal>
          <SectionMarker label="Users" letter="C" className="mb-8" />
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(26px, 3.5vw, 40px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: 32,
              maxWidth: 540,
            }}
          >
            One platform. Two completely different contexts of use.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              role: "Primary — The Designer",
              title: "The Design Firm",
              desc: "A project lead managing 4–8 active client projects simultaneously. Uses Arko daily to scan spaces, place furniture, adjust finishes, and track project status across the team. Needs speed, precision, and a clear handoff mechanism.",
              sketch: "floorPlan" as const,
              note: "designer workspace",
            },
            {
              role: "Secondary — The Client",
              title: "The Client",
              desc: "A homeowner or property developer reviewing a design remotely. Not design-literate. Needs to understand the space instantly, leave specific feedback, and approve with confidence — without downloading an app or creating an account.",
              sketch: "wireframe" as const,
              note: "client view",
            },
          ].map((u, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: "28px 24px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-elevated)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)" }}>{u.role}</p>
                <p
                  style={{
                    fontFamily: serif,
                    fontWeight: 700,
                    fontSize: 22,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {u.title}
                </p>
                <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, flex: 1 }}>
                  {u.desc}
                </p>
                <HandDrawnSketch
                  type={u.sketch}
                  width={u.sketch === "wireframe" ? 60 : 100}
                  height={u.sketch === "wireframe" ? 80 : 64}
                  annotation={u.note}
                  delay={0.3 + i * 0.1}
                />
              </div>
            </Reveal>
          ))}
        </div>

      </div>{/* /max-w-4xl */}

      {/* ── KEY INSIGHT — full bleed dark ────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--text-primary)",
          padding: "clamp(72px, 10vw, 120px) 0",
          margin: "clamp(64px, 9vw, 96px) 0",
        }}
      >
        <Reveal y={16}>
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 28 }}>
              Key Insight
            </p>
            <blockquote
              style={{
                fontFamily: serif,
                fontWeight: 700,
                fontSize: "clamp(24px, 4.5vw, 52px)",
                color: "var(--bg-primary)",
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
                quotes: "none",
                marginBottom: 28,
                maxWidth: 760,
              }}
            >
              Clients don't reject designs because they have bad taste.
              They reject them because they{" "}
              <em style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                couldn't see it clearly enough to say yes
              </em>{" "}
              the first time.
            </blockquote>
            <p
              style={{
                fontFamily: sans,
                fontSize: 16,
                color: "var(--text-muted)",
                lineHeight: 1.75,
                maxWidth: 520,
              }}
            >
              This reframed the design direction entirely. The goal wasn't to
              build a better design tool — it was to build a better{" "}
              <em>communication</em> tool that happened to be powered by design.
            </p>
          </div>
        </Reveal>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* ── DESIGNER — WEB ───────────────────────────────────── */}
        <Reveal>
          <SectionMarker label="Designer · Web Application" letter="D" className="mb-6" />
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            A professional-grade workspace. Dense, powerful, built for daily use.
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: 580,
              marginBottom: 40,
            }}
          >
            The designer interface doesn't simplify. Sidebar navigation, project
            management, team activity, AR editing tools — all accessible, nothing
            hidden. The goal was a workspace a design lead would open on day one
            and never want to leave.
          </p>
        </Reveal>

        {/* Dashboard full width */}
        <Reveal>
          <Screen
            src="/arko/web-3.png"
            alt="Arko Dashboard"
            caption="Fig. 01 — Dashboard · active projects, team stats, pending approvals"
            style={{ marginBottom: 20 }}
          />
        </Reveal>

        {/* All Projects + Project Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: 20 }}>
          <Reveal delay={0.05}>
            <Screen
              src="/arko/web-4.png"
              alt="All Projects"
              caption="Fig. 02 — All Projects · status filters, search, quick access"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Screen
              src="/arko/web-5.png"
              alt="Project Detail"
              caption="Fig. 03 — Project Detail · rooms, progress bars, live activity"
            />
          </Reveal>
        </div>

        {/* Comments view full width */}
        <Reveal>
          <Screen
            src="/arko/web-6.png"
            alt="AR Comments view"
            caption="Fig. 04 — Comments View · client feedback pinned in the room, resolved in context"
            style={{ marginBottom: 0 }}
          />
        </Reveal>

        {/* ── DESIGNER — MOBILE SCAN ───────────────────────────── */}
        <Divider label="Designer · iOS — Scan to AR Editor" />

        <Reveal>
          <SectionMarker label="Designer · iOS" letter="E" className="mb-6" />
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            From empty room to furnished space in minutes.
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            A pre-scan checklist ensures quality spatial capture before the AR
            session begins. The scanner detects floor planes, measures accuracy,
            and confirms the data before the editor opens. The room editor keeps
            the canvas front and center — tools at the edges, space in focus.
          </p>
        </Reveal>

        {/* Scan flow — phone horizontal strip */}
        <Reveal>
          <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 16 }}>
            Scan Flow — Pre-Scan Checklist → Scan Step 1 → Floor Detected → Spatial Accuracy
          </p>
        </Reveal>

        <div
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            paddingBottom: 12,
            marginBottom: 12,
            scrollbarWidth: "none",
          }}
        >
          {[
            { src: "/arko/phone-3.png", label: "Pre-Scan\nChecklist" },
            { src: "/arko/phone-4.png", label: "Detecting\nFloor" },
            { src: "/arko/phone-5.png", label: "Floor\nConfirmed" },
            { src: "/arko/phone-6.png", label: "92% Spatial\nAccuracy" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ flexShrink: 0, width: "clamp(150px, 20vw, 210px)" }}
            >
              <Phone src={s.src} alt={s.label} label={s.label} width={undefined as unknown as number} />
            </motion.div>
          ))}
        </div>

        {/* AR Editor — landscape screens */}
        <Reveal>
          <p
            style={{
              ...mono,
              fontSize: 9,
              color: "var(--text-muted)",
              marginTop: 36,
              marginBottom: 16,
            }}
          >
            AR Room Editor — Canvas first, tools at the edges
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { src: "/arko/phone-7.png", caption: "Fig. 05 — Room type breadcrumb navigation" },
            { src: "/arko/phone-8.png", caption: "Fig. 06 — Furniture library, collapsible sidebar" },
            { src: "/arko/phone-10.png", caption: "Fig. 07 — Item selected, Properties panel" },
            { src: "/arko/phone-12.png", caption: "Fig. 08 — Preview mode, Send to Client" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <Screen src={s.src} alt={s.caption} caption={s.caption} />
            </Reveal>
          ))}
        </div>

        {/* ── CLIENT EXPERIENCE ────────────────────────────────── */}
        <Divider label="Client · Mobile Experience" />

        <Reveal>
          <SectionMarker label="Client · Mobile" letter="F" className="mb-6" />
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            No login. No jargon. Just the room, a comment, and an approve.
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            The client interface strips everything away. A link, their space,
            a comment button, and an approve button. No app download. No account.
            When a client approves, the designer gets an instant notification
            and a timestamped PDF summary — closing the loop every other tool
            leaves open.
          </p>
        </Reveal>

        <Reveal>
          <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 16 }}>
            Client Flow — Landing → Room View → Comment Input → Approval Confirmation
          </p>
        </Reveal>

        <div
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            paddingBottom: 12,
            marginBottom: 12,
            scrollbarWidth: "none",
          }}
        >
          {[
            { src: "/arko/phone-13.png", label: "Client\nLanding" },
            { src: "/arko/phone-14.png", label: "Room View +\nComments" },
            { src: "/arko/phone-15.png", label: "Comment\nInput" },
            { src: "/arko/phone-16.png", label: "Design\nApproved" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ flexShrink: 0, width: "clamp(150px, 20vw, 210px)" }}
            >
              <Phone src={s.src} alt={s.label} label={s.label} width={undefined as unknown as number} />
            </motion.div>
          ))}
        </div>

        {/* ── DESIGN DECISIONS ─────────────────────────────────── */}
        <Divider label="Design Decisions" />

        <Reveal>
          <SectionMarker label="Design Decisions" letter="G" className="mb-8" />
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: 48,
            }}
          >
            Four decisions that defined the product.
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            {
              num: "01",
              title: "Two entirely separate experiences",
              body: "The designer interface is dense, powerful, and built for daily professional use — sidebar navigation, project management, team activity, AR editing tools. The client interface strips everything away: no login, no nav, no jargon. Just the room, a comment button, and an approve button. The same product. Two completely different contexts of use.",
              img: "/arko/web-5.png",
            },
            {
              num: "02",
              title: "AR editor built for professionals, not consumers",
              body: "The AR room editor puts the canvas first and keeps all tools at the edges — collapsible Furniture Library on the left, Properties panel on the right, minimal toolbar at the bottom. Every element category (Elements → Furniture → Room Type → Category) is structured as progressive disclosure so the library never overwhelms the space.",
              img: "/arko/phone-10.png",
            },
            {
              num: "03",
              title: "The approval flow as the product's core value",
              body: "Most design tools stop at visualization. Arko makes client sign-off a first-class feature — the Share modal, client walkthrough, comment pinning, and one-tap approval are designed as a single seamless flow. When a client approves, the designer gets a notification and a timestamped PDF. This closes the loop that every other tool leaves open.",
              img: "/arko/phone-16.png",
            },
            {
              num: "04",
              title: "Empty states as onboarding",
              body: "Both the dashboard and project detail have fully designed empty states that guide the user to their first action rather than leaving them stranded. For a B2B product where adoption depends on the first session, a stranded user is a churned user. Empty states are a product feature — not an afterthought.",
              img: "/arko/web-3.png",
            },
          ].map((d, i) => (
            <Reveal key={i} delay={0.04}>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
                style={{
                  padding: "44px 0",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {/* Text */}
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 14,
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 40,
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
                        fontFamily: serif,
                        fontWeight: 700,
                        fontSize: "clamp(17px, 2vw, 22px)",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.015em",
                        lineHeight: 1.3,
                      }}
                    >
                      {d.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.85,
                    }}
                  >
                    {d.body}
                  </p>
                </div>

                {/* Screenshot */}
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <img
                    src={d.img}
                    alt={d.title}
                    style={{
                      width: "100%",
                      display: "block",
                      border: "1px solid var(--border)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.07)",
                      maxHeight: 280,
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── OUTCOMES ─────────────────────────────────────────── */}
        <Divider label="Outcomes & Reflection" />

        <Reveal>
          <SectionMarker label="Reflection" letter="H" className="mb-8" />
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Three workflows. One platform. No compromise on either user.
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: 600,
              marginBottom: 40,
            }}
          >
            Arko consolidates space scanning, interior design, and client
            approval into one platform. The result is a product that serves
            two very different users without compromising either experience.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: 56 }}>
          <Reveal delay={0.05}>
            <div
              style={{
                padding: "28px 24px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-secondary)",
                height: "100%",
              }}
            >
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 14 }}>
                What I'd build next
              </p>
              <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                An analytics layer for designers — showing which rooms clients
                spend the most time reviewing, which furniture items get swapped
                most often, and where comments cluster spatially. Turning client
                behavior into actionable design intelligence.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                padding: "28px 24px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-elevated)",
                height: "100%",
              }}
            >
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 14 }}>
                What this reinforced
              </p>
              <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                The best B2B products are the ones that make the professional
                look good in front of their client. Every design decision in
                Arko was made with that in mind.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Sketch decoration before nav */}
        <div className="flex justify-center" aria-hidden style={{ marginBottom: 40 }}>
          <HandDrawnSketch
            type="perspective"
            width={200}
            height={96}
            annotation="from architecture to digital product"
            delay={0.2}
          />
        </div>

        {/* ── NAVIGATION ───────────────────────────────────────── */}
        <div
          className="flex flex-wrap justify-between items-center gap-6"
          style={{
            paddingTop: 32,
            paddingBottom: 64,
            borderTop: "1px solid var(--border)",
          }}
        >
          {adjacent.prev ? (
            <Link
              to={`/work/${adjacent.prev.slug}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, maxWidth: "45%" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M13 8H3M7 4L3 8l4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>Previous</p>
                <p
                  style={{ fontFamily: serif, fontSize: "clamp(14px, 2vw, 20px)", color: "var(--text-secondary)", transitionProperty: "color", transitionDuration: "150ms" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                >
                  {adjacent.prev.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          {adjacent.next ? (
            <Link
              to={`/work/${adjacent.next.slug}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, maxWidth: "45%", marginLeft: "auto" }}
            >
              <div style={{ textAlign: "right" }}>
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>Next</p>
                <p
                  style={{ fontFamily: serif, fontSize: "clamp(14px, 2vw, 20px)", color: "var(--text-secondary)", transitionProperty: "color", transitionDuration: "150ms" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                >
                  {adjacent.next.title}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : <div />}
        </div>

      </div>{/* /max-w-4xl */}
    </motion.div>
  );
}
