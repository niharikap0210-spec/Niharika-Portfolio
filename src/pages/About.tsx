import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  CompassIcon,
  CoffeeIcon,
  MusicNotesIcon,
  AirplaneIcon,
  PencilSimpleLineIcon,
  ForkKnifeIcon,
} from "@phosphor-icons/react";
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
              transitionProperty: "border-color, background-color",
              transitionDuration: "200ms",
              cursor: "default",
              background: isHovered
                ? "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(181,146,76,0.05) 8px, rgba(181,146,76,0.05) 9px)"
                : "transparent",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-5">
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
    description: "Designing AI-driven flows for the talent marketplace — match quality UX, candidate experience.",
  },
  {
    role: "UX/UI Designer",
    company: "PyCube",
    period: "2025 – Present",
    description: "Redesigning enterprise specimen-tracking systems for healthcare, end-to-end.",
  },
  {
    role: "HCI Student Org",
    company: "Iowa State University",
    period: "2024 – 2025",
    description: "Led design workshops and mentored peers on UX research and Figma craft.",
  },
  {
    role: "UI/UX Designer",
    company: "Sixth Sense Technologies",
    period: "2022 – 2023",
    description: "Designed consumer interfaces and partnered with engineering on handoff.",
  },
  {
    role: "UX Designer",
    company: "Qnaptics",
    period: "2022",
    description: "Built a design system from scratch and standardized patterns across surfaces.",
  },
];

function ExperienceTimeline() {
  return (
    <div className="relative">
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
              className="flex gap-4 sm:gap-8 group"
              style={{ paddingLeft: 0, paddingBottom: i < experiences.length - 1 ? 32 : 0 }}
            >
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
                  className="transition-colors duration-200 group-hover:!border-[var(--accent)]"
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

              <div style={{ paddingTop: 0, flex: 1 }}>
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

/* ─── Off the clock — interactive hobby cards ──────────────────── */
const hobbies = [
  {
    icon: ForkKnifeIcon,
    label: "Spicy food",
    detail: "The hotter, the better.",
  },
  {
    icon: MusicNotesIcon,
    label: "Dance",
    detail: "Movement clears the head.",
  },
  {
    icon: AirplaneIcon,
    label: "Travel",
    detail: "Street food is the brief.",
  },
  {
    icon: PencilSimpleLineIcon,
    label: "Sketching",
    detail: "Floor plans I'll never build.",
  },
];

function OffTheClockGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-0"
      style={{ border: "0.75px solid var(--construction)" }}
    >
      {hobbies.map((h, i) => {
        const Icon = h.icon;
        const isActive = active === i;
        return (
          <motion.button
            key={h.label}
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              border: "0.75px solid",
              borderColor: isActive ? "var(--accent)" : "var(--construction)",
              padding: "28px 22px 32px",
              position: "relative",
              minHeight: 180,
              cursor: "default",
              background: isActive
                ? "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(181,146,76,0.05) 8px, rgba(181,146,76,0.05) 9px)"
                : "var(--bg-elevated)",
              transitionProperty: "border-color, background-color",
              transitionDuration: "200ms",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <span
              aria-hidden
              style={{
                ...mono,
                position: "absolute",
                top: 12,
                right: 14,
                fontSize: 9,
                color: isActive ? "var(--accent)" : "var(--text-muted)",
                letterSpacing: "0.16em",
                transitionProperty: "color",
                transitionDuration: "200ms",
              }}
            >
              0{i + 1}
            </span>

            <Icon
              size={28}
              weight={isActive ? "bold" : "regular"}
              color={isActive ? "var(--accent)" : "var(--text-secondary)"}
              style={{ transitionProperty: "color", transitionDuration: "200ms" }}
            />

            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  marginBottom: 6,
                }}
              >
                {h.label}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                }}
              >
                {h.detail}
              </p>
            </div>
          </motion.button>
        );
      })}
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
      {/* ── Hero ─────────────────────────────────────────────── */}
      <DrawingSheetBorder
        titleBlock={{ name: "NIHARIKA PUNDLIK", sheet: "ABOUT", scale: "SCALE: 1:1" }}
        className="blueprint-grid"
        style={{ padding: "clamp(56px, 9vw, 96px) 0 clamp(48px, 7vw, 72px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="About" letter="B" className="mb-10" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-2 mb-6"
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "var(--status-green)",
                border: "1.5px solid var(--accent)",
                display: "inline-block",
              }}
              className="status-pulse"
              aria-hidden
            />
            <span style={{ ...mono, fontSize: 10, color: "var(--text-secondary)" }}>
              Based in Virginia · Open to roles
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(44px, 6.5vw, 88px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              maxWidth: "16ch",
            }}
          >
            From floor plans
            <br />
            to{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              flows
            </span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "clamp(16px, 1.5vw, 19px)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginTop: 28,
              maxWidth: "52ch",
            }}
          >
            Product Designer with an architect's rigor and a researcher's empathy. I design intuitive
            experiences that bridge innovation and human needs.
          </motion.p>
        </div>
      </DrawingSheetBorder>

      {/* ── Photo + condensed bio ──────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative inline-block">
              {/* Tape decoration */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%) rotate(-2deg)",
                  width: 72,
                  height: 16,
                  backgroundColor: "rgba(200,200,200,0.5)",
                  zIndex: 3,
                  borderRadius: 2,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                }}
              />

              {/* Construction-line frame backdrop */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: -10,
                  border: "0.75px solid var(--construction)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  width: "min(360px, 80vw)",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  position: "relative",
                  zIndex: 1,
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src="/about/niharika.jpg"
                  alt="Niharika Pundlik"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 25%",
                    display: "block",
                  }}
                />
              </div>

              {/* Hand-drawn annotation */}
              <div
                aria-hidden
                className="hidden lg:flex"
                style={{
                  position: "absolute",
                  bottom: 18,
                  right: -120,
                  alignItems: "center",
                  gap: 8,
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 0.75,
                    backgroundColor: "var(--text-muted)",
                    opacity: 0.4,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 16,
                    color: "var(--text-secondary)",
                    opacity: 0.55,
                    whiteSpace: "nowrap",
                  }}
                >
                  hi, I'm Niharika
                </span>
              </div>

              {/* Dimension marker */}
              <div
                aria-hidden
                className="hidden lg:block"
                style={{
                  position: "absolute",
                  top: 10,
                  left: -36,
                  bottom: 10,
                  width: 18,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "50%",
                    width: 0.75,
                    backgroundColor: "var(--construction)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 0.75,
                    backgroundColor: "var(--construction)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 0.75,
                    backgroundColor: "var(--construction)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Bio + currently */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-5"
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                }}
              >
                I think in <em style={{ color: "var(--accent)" }}>systems, space, and structure</em> —
                I just trade walls for wireframes now.
              </p>

              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                Trained as an architect in Indore. Re-trained as an HCI designer in Iowa. Today I'm
                shipping product at <strong>Mercor</strong> and <strong>PyCube</strong> — turning
                research into pixels people can actually feel.
              </p>
            </motion.div>

            {/* Currently grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-0"
              style={{ border: "0.75px solid var(--border)" }}
            >
              {[
                { label: "Now", value: "Designing at Mercor + PyCube" },
                { label: "Based", value: "Virginia, US" },
                { label: "Reading", value: "The Design of Everyday Things" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    border: "0.75px solid var(--border)",
                    padding: "16px 18px",
                  }}
                >
                  <p
                    style={{
                      ...mono,
                      fontSize: 9,
                      color: "var(--text-muted)",
                      marginBottom: 6,
                      letterSpacing: "0.18em",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 13,
                      color: "var(--text-primary)",
                      lineHeight: 1.45,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <a
                href="https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--bg-elevated)",
                  backgroundColor: "var(--text-primary)",
                  padding: "12px 22px",
                  textDecoration: "none",
                  transitionProperty: "background-color, transform",
                  transitionDuration: "180ms",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--accent)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--text-primary)";
                  el.style.transform = "translateY(0)";
                }}
              >
                View Resume
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6h8M7 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/niharika-pundlik-63a9a1288/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "0.75px solid var(--text-primary)",
                  padding: "12px 22px",
                  textDecoration: "none",
                  transitionProperty: "color, border-color, transform",
                  transitionDuration: "180ms",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--accent)";
                  el.style.borderColor = "var(--accent)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text-primary)";
                  el.style.borderColor = "var(--text-primary)";
                  el.style.transform = "translateY(0)";
                }}
              >
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── The Pivot — built environments → digital ─────── */}
      <section
        className="blueprint-grid-subtle"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "64px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="The Pivot" letter="C" className="mb-10" />

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
              marginBottom: 40,
              maxWidth: "22ch",
            }}
          >
            Same instincts. Different canvas.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-center">
            {/* Built */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: "0.75px solid var(--construction)",
                padding: "28px",
                backgroundColor: "var(--bg-elevated)",
                position: "relative",
              }}
            >
              <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 14 }}>
                2018 – 2023 · Built
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 26,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  marginBottom: 18,
                  color: "var(--text-primary)",
                }}
              >
                Architecture
              </h3>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <HandDrawnSketch type="floorPlan" width={140} height={100} />
              </div>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginTop: 8,
                }}
              >
                Floor plans, structures, how people actually move through space.
              </p>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex md:flex-col items-center justify-center gap-2"
              aria-hidden
            >
              <span style={{ ...mono, fontSize: 9, color: "var(--accent)" }}>SHIFT</span>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="hidden md:block">
                <path
                  d="M10 22h24M28 14l8 8-8 8"
                  stroke="var(--accent)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="md:hidden">
                <path
                  d="M22 10v24M14 28l8 8 8-8"
                  stroke="var(--accent)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Digital */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: "0.75px solid var(--construction)",
                padding: "28px",
                backgroundColor: "var(--bg-elevated)",
                position: "relative",
              }}
            >
              <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 14 }}>
                2023 – Now · Digital
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 26,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  marginBottom: 18,
                  color: "var(--text-primary)",
                }}
              >
                Product Design
              </h3>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <HandDrawnSketch type="wireframe" width={70} height={100} />
              </div>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginTop: 8,
                }}
              >
                User flows, interfaces, how people move through products.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills floor plan ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-20">
        <SectionMarker label="Toolkit" letter="D" className="mb-10" />
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
      </section>

      {/* ── Experience ──────────────────────────────────────── */}
      <section
        className="blueprint-grid-subtle"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "60px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Experience" letter="E" className="mb-10" />
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
        </div>
      </section>

      {/* ── Education ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-20">
        <SectionMarker label="Education" letter="F" className="mb-10" />
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
            marginBottom: 40,
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
              note: "UX Research, Interaction Design, Information Architecture, Cognitive Psychology.",
              sketch: null as null,
              annotation: null as null,
            },
            {
              degree: "B.Arch. Architecture",
              school: "Padmashree Inst. of Architecture & Design",
              period: "2018 – 2023",
              note: "Spatial design, structures, 3D modeling, urban design, placemaking.",
              sketch: "floorPlan" as const,
              annotation: "where it started",
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
                <div style={{ position: "absolute", bottom: 16, right: 16 }} aria-hidden>
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
      </section>

      {/* ── Off the clock ──────────────────────────────────── */}
      <section
        className="blueprint-grid-subtle"
        style={{
          borderTop: "1px solid var(--border)",
          padding: "64px 0 80px",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Off the Clock" letter="G" className="mb-10" />
          <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
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
              }}
            >
              When I'm not designing
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-2"
            >
              <CompassIcon size={16} weight="regular" color="var(--text-muted)" />
              <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)" }}>
                Always exploring
              </span>
            </motion.div>
          </div>
          <OffTheClockGrid />

          {/* Sign-off */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-16 flex items-center justify-center gap-3"
          >
            <CoffeeIcon size={18} weight="regular" color="var(--text-muted)" />
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 22,
                color: "var(--text-secondary)",
                opacity: 0.7,
              }}
            >
              let's grab coffee — virtually or otherwise.
            </span>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
