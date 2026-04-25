import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon as ArrowLeft, ArrowRightIcon as ArrowRight } from "@phosphor-icons/react";
import SectionMarker from "../components/SectionMarker";
import DrawingSheetBorder from "../components/DrawingSheetBorder";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 1, 0.4, 1] as const } },
};

const projects = [
  {
    id: "01",
    title: "Transit Hub, Indore",
    year: "2023",
    type: "Public Infrastructure",
    desc: "A multi-modal transit interchange designed around pedestrian flow and legibility at scale. The program resolved a 4-level grade change across a 1.2-hectare site.",
    tags: ["Infrastructure", "Urban Design", "Public Space"],
  },
  {
    id: "02",
    title: "Community Centre, Bhopal",
    year: "2022",
    type: "Civic Architecture",
    desc: "A flexible community anchor built around a central courtyard. The section plays with natural light to eliminate the need for artificial lighting during daytime hours.",
    tags: ["Civic", "Passive Design", "Community"],
  },
  {
    id: "03",
    title: "Rural Housing Prototype",
    year: "2022",
    type: "Housing",
    desc: "A low-cost, self-buildable housing typology for semi-arid climates. Developed in collaboration with a local NGO; prototyped at 1:1 in Rajasthan.",
    tags: ["Housing", "Self-Build", "Climate"],
  },
  {
    id: "04",
    title: "Adaptive Reuse, Old Mill",
    year: "2021",
    type: "Heritage + Reuse",
    desc: "Conversion of a decommissioned textile mill into a mixed-use cultural campus. Structural expression and material memory were central to the design argument.",
    tags: ["Heritage", "Adaptive Reuse", "Mixed-Use"],
  },
];

const stats = [
  { value: "5", label: "Years B.Arch" },
  { value: "12+", label: "Built & Academic Projects" },
  { value: "1:1", label: "Prototype Built" },
];

export default function Architecture() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-14"
    >
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <DrawingSheetBorder
        titleBlock={{ name: "NIHARIKA PUNDLIK", sheet: "ARCHITECTURE / WORK" }}
        className="blueprint-grid"
        style={{ padding: "clamp(52px, 8vw, 88px) 0 clamp(44px, 6vw, 72px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Architecture" letter="A" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em", marginBottom: 20 }}
              >
                B.Arch · SVITS Indore · 2019–2024
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.25, 1, 0.4, 1] }}
                style={{
                  fontFamily: serif,
                  fontWeight: 700,
                  fontSize: "clamp(44px, 6vw, 88px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "var(--text-primary)",
                  margin: 0,
                  marginBottom: "clamp(20px, 2.4vw, 32px)",
                }}
              >
                Before screens,{" "}
                <span style={{ fontStyle: "italic", color: "var(--accent)" }}>buildings</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                style={{
                  fontFamily: sans,
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  maxWidth: 520,
                }}
              >
                Five years of B.Arch training taught me to think in section, light, and
                human scale — before I ever opened a prototype tool. The discipline didn't
                change when I moved to HCI. The medium did.
              </motion.p>
            </div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div
                className="grid grid-cols-3"
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 24,
                  gap: 0,
                }}
              >
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      paddingRight: i < 2 ? "clamp(16px, 3vw, 32px)" : 0,
                      borderRight: i < 2 ? "1px solid var(--border)" : "none",
                      paddingLeft: i > 0 ? "clamp(16px, 3vw, 32px)" : 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: serif,
                        fontWeight: 700,
                        fontSize: "clamp(28px, 3.5vw, 44px)",
                        letterSpacing: "-0.03em",
                        color: "var(--text-primary)",
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {s.value}
                    </div>
                    <div style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.16em" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </DrawingSheetBorder>

      {/* ── Projects ─────────────────────────────────────────────── */}
      <section
        style={{ padding: "clamp(64px, 9vw, 112px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-48px" }}
        >
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              borderTop: "1px solid var(--border)",
              paddingTop: 14,
              marginBottom: "clamp(40px, 5vw, 64px)",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span style={{ ...mono, fontSize: 11, color: "var(--accent)", letterSpacing: "0.22em", fontWeight: 700 }}>
              Selected Work
            </span>
            <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.16em" }}>
              2019 – 2024
            </span>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0px, 0vw, 0px)" }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                variants={itemVariants}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr auto",
                  gap: "clamp(16px, 3vw, 40px)",
                  alignItems: "start",
                  padding: "clamp(24px, 3vw, 36px) 0",
                  borderBottom: "1px solid var(--border)",
                  borderTop: i === 0 ? "none" : undefined,
                }}
              >
                {/* Number */}
                <div style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em", paddingTop: 4 }}>
                  {p.id}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
                    <h2
                      style={{
                        fontFamily: serif,
                        fontWeight: 700,
                        fontSize: "clamp(20px, 2.4vw, 28px)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {p.title}
                    </h2>
                    <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.2em" }}>
                      {p.type}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 18,
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                      margin: 0,
                      maxWidth: 540,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          ...mono,
                          fontSize: 8,
                          letterSpacing: "0.18em",
                          color: "var(--text-muted)",
                          border: "0.75px solid var(--border)",
                          padding: "4px 10px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Year */}
                <div
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: "var(--text-muted)",
                    letterSpacing: "0.16em",
                    paddingTop: 4,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.year}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Note strip ───────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "clamp(32px, 4vw, 48px) 0",
          backgroundColor: "var(--bg-secondary)",
        }}
        className="blueprint-grid-subtle"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p style={{ ...mono, fontSize: 9, color: "var(--accent)", letterSpacing: "0.22em", marginBottom: 14 }}>
                A NOTE ON DOCUMENTATION
              </p>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  color: "var(--text-primary)",
                  lineHeight: 1.5,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                Full drawings, models, and documentation for each project are being
                compiled and will be added here shortly.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 18,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                If you'd like to see specific work — a particular building type, a
                structural drawing set, or a portfolio PDF — reach out directly. I'm
                happy to share.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation row ───────────────────────────────────────── */}
      <section
        style={{ padding: "clamp(48px, 6vw, 72px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            to="/#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              ...mono,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transitionProperty: "color",
              transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <ArrowLeft size={14} weight="regular" />
            Product Design
          </Link>

          <Link
            to="/resume"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              ...mono,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transitionProperty: "color",
              transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            Resume & Contact
            <ArrowRight size={14} weight="regular" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
