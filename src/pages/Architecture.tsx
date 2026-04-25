import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon as ArrowLeft, ArrowRightIcon as ArrowRight } from "@phosphor-icons/react";
import SectionMarker from "../components/SectionMarker";
import DrawingSheetBorder from "../components/DrawingSheetBorder";
import ArchitectureCard from "../components/ArchitectureCard";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";


const archProjects = [
  {
    title: "Public Realm: Beyond the Streets",
    subtitle: "Redefining public spaces, reviving community life",
    type: "Architectural Thesis · Urban Design",
    year: "2024",
    tags: ["URBAN DESIGN", "ARCH PLANNING"],
    href: "https://uxniharika.framer.website/projects/thesis",
    accent: {
      primary: "#9B7A52",
      light: "#B8966D",
      dark: "#6B5238",
      surface: "#F6EEE5",
    },
    visualKind: "thesis" as const,
  },
  {
    title: "Rendered Realities",
    subtitle: "3D modeling and visualization in architecture",
    type: "Architectural Visualization",
    year: "2024",
    tags: ["3D MODELLING", "RENDERING"],
    href: "https://uxniharika.framer.website/projects/renders",
    accent: {
      primary: "#4E7396",
      light: "#6B90B3",
      dark: "#2E4F6A",
      surface: "#EBF1F8",
    },
    visualKind: "renders" as const,
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
        {/* Section header */}
        <div
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
        </div>

        {/* 2-col card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {archProjects.map((project, i) => (
            <ArchitectureCard
              key={project.title}
              index={i}
              title={project.title}
              subtitle={project.subtitle}
              type={project.type}
              year={project.year}
              tags={project.tags}
              href={project.href}
              accent={project.accent}
              visualKind={project.visualKind}
            />
          ))}
        </div>
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
