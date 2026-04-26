import { motion } from "framer-motion";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
    href: "/architecture/thesis",
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
    href: "/architecture/renders",
    accent: {
      primary: "#4E7396",
      light: "#6B90B3",
      dark: "#2E4F6A",
      surface: "#EBF1F8",
    },
    visualKind: "renders" as const,
  },
];

const heroStats = [
  { value: "5", label: "Years B.Arch" },
  { value: "12+", label: "Projects" },
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
                B.Arch · 2018–2023
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
                human scale, before I ever opened a prototype tool. The discipline didn't
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
                {heroStats.map((s, i) => (
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
        id="projects"
        className="relative"
        style={{ padding: "clamp(64px, 9vw, 96px) 0" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">

          {/* Section header — mirrors Home page */}
          <div className="mb-14">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "0.75px solid var(--border)",
                paddingTop: 14,
                marginBottom: 28,
                position: "relative",
              }}
            >
              <span style={{ position: "absolute", top: -4, left: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
              <span style={{ position: "absolute", top: -4, right: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
              <span style={{ ...mono, fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.22em", fontWeight: 500 }}>
                Selected Work
              </span>
              <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>
                {String(archProjects.length).padStart(2, "0")} Projects
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
              style={{
                fontFamily: serif,
                fontWeight: 700,
                fontSize: "clamp(40px, 4.6vw, 56px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Architecture<span style={{ color: "var(--accent)" }}>.</span>
            </motion.h2>
          </div>

          {/* Intro paragraph + disciplines stats row */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14"
            style={{ marginBottom: 56 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.4, 1], delay: 0.1 }}
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.5vw, 22px)",
                lineHeight: 1.55,
                color: "var(--text-secondary)",
                margin: 0,
                maxWidth: 640,
              }}
            >
              A selection of academic and thesis work from five years of B.Arch training,
              where every section cut, structural drawing, and site plan taught me
              how to read space before designing for it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.4, 1], delay: 0.25 }}
              className="grid grid-cols-3 gap-6"
              style={{
                borderTop: "0.75px solid var(--border)",
                paddingTop: 18,
                alignSelf: "end",
              }}
            >
              {[
                { value: "02", label: "Case Studies" },
                { value: "2019–24", label: "Active Span" },
                { value: "Arch + 3D", label: "Disciplines" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: serif,
                      fontSize: "clamp(22px, 2vw, 28px)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.18em" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
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

          {/* Disciplines / tools strip — mirrors Home's "Shared Stack" */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start"
            style={{
              marginTop: 56,
              paddingTop: 22,
              borderTop: "0.75px solid var(--border)",
              position: "relative",
            }}
          >
            <span style={{ position: "absolute", top: -4, left: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
            <span style={{ position: "absolute", top: -4, right: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />

            <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.22em", whiteSpace: "nowrap" }}>
              Disciplines
            </span>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                "AutoCAD",
                "SketchUp",
                "Lumion",
                "V-Ray",
                "Urban Planning",
                "Structural Drawing",
                "Physical Models",
                "Site Analysis",
              ].map((tool, i, arr) => (
                <span key={tool} style={{ display: "inline-flex", alignItems: "center", gap: 20 }}>
                  <span
                    style={{
                      fontFamily: sans,
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {tool}
                  </span>
                  {i < arr.length - 1 && (
                    <span
                      aria-hidden
                      style={{
                        width: 3,
                        height: 3,
                        backgroundColor: "var(--text-muted)",
                        opacity: 0.5,
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </span>
              ))}
            </div>

            <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.22em", whiteSpace: "nowrap" }}>
              08 Tools
            </span>
          </motion.div>

          {/* Sheet end marker */}
          <div className="flex items-center justify-between" style={{ marginTop: 22 }}>
            <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", opacity: 0.7 }}>
              End of Sheet
            </span>
            <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", opacity: 0.7 }}>
              B-{String(archProjects.length).padStart(2, "0")} / B-{String(archProjects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* ── Navigation row ───────────────────────────────────────── */}
      <nav style={{ borderTop: "0.75px solid var(--border)" }}>
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Left — Product Design */}
          <NavLink to="/#projects" align="left">
            <ArrowLeft size={14} weight="regular" />
            <span>
              <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", display: "block", marginBottom: 5 }}>
                Prev
              </span>
              <span style={{ ...mono, fontSize: 13, letterSpacing: "0.18em" }}>
                Product Design
              </span>
            </span>
          </NavLink>

          {/* Right — Resume & Contact */}
          <NavLink to="/resume" align="right">
            <span style={{ textAlign: "right" }}>
              <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", display: "block", marginBottom: 5 }}>
                Next
              </span>
              <span style={{ ...mono, fontSize: 13, letterSpacing: "0.18em" }}>
                Resume & Contact
              </span>
            </span>
            <ArrowRight size={14} weight="regular" />
          </NavLink>
        </div>
      </nav>
    </motion.div>
  );
}

function NavLink({
  to,
  align,
  children,
}: {
  to: string;
  align: "left" | "right";
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <RouterLink
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        padding: "clamp(20px, 3vw, 32px) 0",
        textDecoration: "none",
        color: hovered ? "var(--accent)" : "var(--text-secondary)",
        transitionProperty: "color",
        transitionDuration: "200ms",
      }}
    >
      {children}
    </RouterLink>
  );
}
