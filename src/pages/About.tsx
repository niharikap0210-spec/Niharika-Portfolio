import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionMarker from "../components/SectionMarker";
import HandDrawnSketch from "../components/HandDrawnSketch";
import DrawingSheetBorder from "../components/DrawingSheetBorder";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

/* ─── Skills floor plan ─────────────────────────────────────────── */
const skillRooms = [
  {
    label: "Research",
    tools: ["Dovetail", "Maze", "UserTesting", "Lookback", "Otter AI", "Optimal Workshop"],
  },
  {
    label: "Design",
    tools: ["Figma", "FigJam", "Framer", "Protopie", "Adobe XD", "Sketch"],
  },
  {
    label: "Code",
    tools: ["HTML/CSS", "JavaScript", "React", "Python"],
  },
  {
    label: "Collaboration",
    tools: ["Jira", "Slack", "Miro", "Notion", "Confluence"],
  },
];

function SkillsFloorPlan() {
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-0"
      style={{ border: "0.75px solid var(--construction)" }}
      role="list"
      aria-label="Skills and tools"
    >
      {skillRooms.map((room) => {
        const isHovered = hovered === room.label;
        return (
          <motion.div
            key={room.label}
            role="listitem"
            onMouseEnter={() => setHovered(room.label)}
            onMouseLeave={() => setHovered(null)}
            style={{
              border: "0.75px solid",
              borderColor: isHovered ? "var(--accent)" : "var(--construction)",
              padding: "20px 16px 24px",
              position: "relative",
              transitionProperty: "border-color",
              transitionDuration: "200ms",
              cursor: "default",
              background: isHovered
                ? "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(124,58,237,0.035) 8px, rgba(124,58,237,0.035) 9px)"
                : "transparent",
            }}
          >
            {/* Room label - centered like architectural floor plan label */}
            <div
              className="flex items-center justify-center gap-2 mb-5"
            >
              <div
                style={{
                  flex: 1,
                  height: 0.75,
                  backgroundColor: isHovered ? "var(--accent)" : "var(--construction)",
                  opacity: 0.6,
                  transitionProperty: "background-color",
                  transitionDuration: "200ms",
                }}
              />
              <p
                style={{
                  ...mono,
                  fontSize: 9,
                  color: isHovered ? "var(--accent)" : "var(--text-muted)",
                  letterSpacing: "0.18em",
                  transitionProperty: "color",
                  transitionDuration: "200ms",
                }}
              >
                {room.label}
              </p>
              <div
                style={{
                  flex: 1,
                  height: 0.75,
                  backgroundColor: isHovered ? "var(--accent)" : "var(--construction)",
                  opacity: 0.6,
                  transitionProperty: "background-color",
                  transitionDuration: "200ms",
                }}
              />
            </div>

            {/* Tool names */}
            <ul className="flex flex-col gap-1.5">
              {room.tools.map((tool) => (
                <li
                  key={tool}
                  style={{
                    ...mono,
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    color: isHovered ? "var(--text-primary)" : "var(--text-muted)",
                    textAlign: "center",
                    lineHeight: 1.6,
                    transitionProperty: "color",
                    transitionDuration: "200ms",
                  }}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Experience timeline ────────────────────────────────────────── */
const experiences = [
  {
    role: "Product Designer",
    company: "Mercor",
    period: "2025 – Present",
    description: "Designing AI-driven product experiences. Working on core flows for the talent marketplace, improving match quality UX and candidate experience.",
  },
  {
    role: "UX/UI Designer",
    company: "PyCube",
    period: "2025 – Present",
    description: "Redesigning enterprise specimen tracking systems for healthcare. Led end-to-end UX from discovery to design system implementation.",
  },
  {
    role: "HCI Student Organization",
    company: "Iowa State University",
    period: "2024 – 2025",
    description: "Led design workshops and mentored peers on UX research methods, Figma best practices, and portfolio development.",
  },
  {
    role: "UI/UX Designer",
    company: "Sixth Sense Technologies",
    period: "2022 – 2023",
    description: "Designed interfaces for consumer-facing products. Collaborated with engineering on design-to-code handoff.",
  },
  {
    role: "UX Designer",
    company: "Qnaptics",
    period: "2022",
    description: "Built design system components from scratch. Standardized patterns across product surfaces and documented component specs.",
  },
];

function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Datum line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 28,
          top: 8,
          bottom: 8,
          width: 0.75,
          backgroundColor: "var(--construction)",
        }}
      />

      <div className="space-y-0">
        {experiences.map((exp, i) => {
          const ref = useRef<HTMLDivElement>(null);
          const inView = useInView(ref, { once: true, margin: "-40px" });

          return (
            <motion.div
              key={i}
              ref={ref}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 sm:gap-8"
              style={{ paddingLeft: 0, paddingBottom: i < experiences.length - 1 ? 32 : 0 }}
            >
              {/* Elevation marker */}
              <div
                style={{
                  flexShrink: 0,
                  width: 56,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  paddingTop: 2,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: "0.75px solid var(--construction)",
                    backgroundColor: "var(--bg-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 7,
                      color: "var(--text-muted)",
                      lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ paddingTop: 0 }}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h4
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: 17,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {exp.role}
                  </h4>
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 15,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {exp.company}
                  </span>
                  <span
                    style={{
                      ...mono,
                      fontSize: 10,
                      color: "var(--text-muted)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {exp.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── About Page ─────────────────────────────────────────────────── */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-14"
    >
      {/* Hero */}
      <DrawingSheetBorder
        titleBlock={{ name: "NIHARIKA PUNDLIK", sheet: "ABOUT", scale: "SCALE: 1:1" }}
        className="blueprint-grid"
        style={{ padding: "clamp(48px, 8vw, 80px) 0 clamp(40px, 6vw, 64px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="About" letter="B" className="mb-8" />
          <motion.h1
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 64px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            About
          </motion.h1>
        </div>
      </DrawingSheetBorder>

      {/* Photo + bio */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Photo col */}
          <motion.div
            className="lg:col-span-4 flex justify-center lg:block"
            custom={2}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative inline-block w-full lg:w-auto">
              {/* Tape decoration */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -10,
                  left: "50%",
                  transform: "translateX(-50%) rotate(-2deg)",
                  width: 60,
                  height: 14,
                  backgroundColor: "rgba(200,200,200,0.45)",
                  zIndex: 2,
                  borderRadius: 2,
                }}
              />

              <img
                src="https://placehold.co/440x540/F0F0F0/9CA3AF?text=Photo"
                alt="Niharika Pundlik"
                style={{
                  width: "100%",
                  maxWidth: 360,
                  height: "auto",
                  display: "block",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.06)",
                  position: "relative",
                  zIndex: 1,
                }}
              />

              {/* Annotation - only safe to show when photo column is narrow enough (lg grid layout) */}
              <div
                aria-hidden
                className="hidden lg:flex"
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: -32,
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div style={{ width: 20, height: 0.75, backgroundColor: "var(--text-muted)", opacity: 0.3 }} />
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: "var(--text-secondary)", opacity: 0.4, whiteSpace: "nowrap" }}>
                  HCI + Architecture
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio col */}
          <div className="lg:col-span-8 space-y-6">
            {[
              <>I'm <strong>Niharika Pundlik</strong> - a Product Designer based in Virginia with a Master's in Human-Computer Interaction from Iowa State University and a Bachelor's in Architecture.</>,
              <>My path from architecture to product design wasn't a pivot - it was an <strong>evolution</strong>. I still think in systems, space, and structure. I still obsess over how people move through environments. The environments just happen to be digital now.</>,
              <>I've designed enterprise tools at PyCube, AI-driven products at Mercor, and built design systems from scratch at Qnaptics. I bring an architect's <strong>rigor for detail</strong> and a researcher's empathy for users to everything I design.</>,
              <>When I'm not pushing pixels, I'm probably sketching floor plans I'll never build, experimenting with 3D renders, or exploring new coffee shops.</>,
            ].map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                {para}
              </motion.p>
            ))}

            {/* CTA buttons */}
            <motion.div
              custom={4}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 pt-4"
            >
              <a
                href="https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--bg-elevated)",
                  backgroundColor: "var(--accent)",
                  padding: "10px 20px",
                  textDecoration: "none",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 4px 14px rgba(124,58,237,0.3)",
                  transitionProperty: "background-color, box-shadow, transform",
                  transitionDuration: "150ms",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--accent-dark)";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.12), 0 8px 24px rgba(124,58,237,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--accent)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1), 0 4px 14px rgba(124,58,237,0.3)";
                }}
              >
                View Resume
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/niharika-pundlik-63a9a1288/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  padding: "10px 20px",
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  transitionProperty: "border-color, background-color, transform",
                  transitionDuration: "150ms",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(124,58,237,0.3)";
                  el.style.backgroundColor = "rgba(124,58,237,0.04)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.backgroundColor = "var(--bg-elevated)";
                  el.style.transform = "translateY(0)";
                }}
              >
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills floor plan */}
      <section
        className="blueprint-grid-subtle"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "60px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Toolkit" letter="C" className="mb-10" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}
          >
            Skills & Tools
          </motion.h2>
          <SkillsFloorPlan />
        </div>
      </section>

      {/* Experience timeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20">
        <SectionMarker label="Experience" letter="D" className="mb-10" />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3vw, 40px)",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: 48,
          }}
        >
          Experience
        </motion.h2>
        <ExperienceTimeline />
      </section>

      {/* Education */}
      <section
        className="blueprint-grid-subtle"
        style={{
          borderTop: "1px solid var(--border)",
          padding: "60px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Education" letter="E" className="mb-10" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: 48,
            }}
          >
            Education
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                degree: "M.S. Human-Computer Interaction",
                school: "Iowa State University",
                period: "2023 – 2025",
                note: "Coursework in UX Research, Interaction Design, Information Architecture, and Cognitive Psychology.",
                sketch: null as null,
                annotation: null as null,
              },
              {
                degree: "B.Arch. Architecture",
                school: "Padmashree Inst. of Architecture & Design Studies",
                period: "2018 – 2023",
                note: "Foundation in spatial design, structures, 3D modeling, urban design, and placemaking.",
                sketch: "floorPlan" as const,
                annotation: "where it all started",
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  border: "0.75px solid var(--border)",
                  padding: "28px 28px 32px",
                  backgroundColor: "var(--bg-elevated)",
                  position: "relative",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 10 }}>
                  {edu.period}
                </p>
                <h3
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--text-primary)",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {edu.degree}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    marginBottom: 12,
                  }}
                >
                  {edu.school}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {edu.note}
                </p>
                {edu.sketch && (
                  <div
                    style={{ position: "absolute", bottom: 16, right: 16 }}
                    aria-hidden
                  >
                    <HandDrawnSketch
                      type={edu.sketch}
                      width={70}
                      height={48}
                      annotation={edu.annotation ?? undefined}
                      annotationPosition="below"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
