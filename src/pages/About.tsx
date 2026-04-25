import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  CoffeeIcon,
  MusicNotesIcon,
  AirplaneIcon,
  PencilSimpleLineIcon,
  ForkKnifeIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import HandDrawnSketch from "../components/HandDrawnSketch";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";

/* ─── Hero with editorial split ──────────────────────────────────── */
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={containerRef}
      className="blueprint-grid relative"
      style={{
        paddingTop: "clamp(80px, 11vw, 140px)",
        paddingBottom: "clamp(60px, 9vw, 110px)",
        overflow: "hidden",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="status-pulse"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "var(--status-green)",
                  border: "1.5px solid var(--accent)",
                  display: "inline-block",
                }}
                aria-hidden
              />
              <span style={{ ...mono, fontSize: 10, color: "var(--text-secondary)" }}>
                Hello — I'm Niharika
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: serif,
                fontWeight: 700,
                fontSize: "clamp(48px, 7.5vw, 104px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.035em",
                lineHeight: 0.98,
              }}
            >
              I design{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                quiet
              </span>
              <br />
              software
              <br />
              that{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                feels
              </span>{" "}
              loud.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                fontFamily: sans,
                fontSize: "clamp(16px, 1.45vw, 19px)",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginTop: 28,
                maxWidth: "44ch",
              }}
            >
              Architect by training, product designer by practice. I bring an architect's rigor for
              detail and a researcher's empathy to every flow I touch.
            </motion.p>

            {/* Inline meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10"
            >
              {[
                { k: "Now", v: "Mercor + PyCube" },
                { k: "Base", v: "Virginia, US" },
                { k: "Origin", v: "Indore, India" },
              ].map((m) => (
                <div key={m.k} className="flex items-baseline gap-2">
                  <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)" }}>
                    {m.k} /
                  </span>
                  <span
                    style={{
                      fontFamily: sans,
                      fontSize: 13,
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {m.v}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: photoY }}
          >
            <div className="relative">
              {/* construction frame */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: -14,
                  border: "0.75px solid var(--construction)",
                  pointerEvents: "none",
                }}
              />
              {/* corner ticks */}
              {[
                { top: -18, left: -18 },
                { top: -18, right: -18 },
                { bottom: -18, left: -18 },
                { bottom: -18, right: -18 },
              ].map((pos, i) => (
                <div
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute",
                    width: 10,
                    height: 10,
                    border: "0.75px solid var(--accent)",
                    ...pos,
                  }}
                />
              ))}

              <div
                style={{
                  width: "min(440px, 78vw)",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.08), 0 24px 56px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src="/about/niharika.jpg"
                  alt="Niharika Pundlik"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 14%",
                    transform: "scale(1.18)",
                    transformOrigin: "center 22%",
                    display: "block",
                  }}
                />
              </div>

              {/* hand-written annotation */}
              <div
                aria-hidden
                className="hidden md:flex"
                style={{
                  position: "absolute",
                  top: 32,
                  left: -120,
                  alignItems: "center",
                  gap: 6,
                  transform: "rotate(-4deg)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 17,
                    color: "var(--text-secondary)",
                    opacity: 0.65,
                    whiteSpace: "nowrap",
                  }}
                >
                  this is me ↘
                </span>
              </div>

              {/* dimension tag bottom right */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: -32,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ ...mono, fontSize: 8, color: "var(--text-muted)" }}>
                  N.P · 2026
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Editorial bio ──────────────────────────────────────────────── */
function EditorialBio() {
  return (
    <section
      style={{
        padding: "clamp(72px, 10vw, 130px) 0",
      }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: serif,
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "clamp(24px, 2.6vw, 36px)",
            lineHeight: 1.4,
            letterSpacing: "-0.015em",
            color: "var(--text-primary)",
            marginBottom: 48,
          }}
        >
          I think in <span style={{ color: "var(--accent)" }}>systems</span>, space, and
          structure — I just trade walls for wireframes now.
        </motion.p>

        <div className="space-y-7">
          {[
            <>
              I grew up in Indore drawing floor plans before I knew what to call them. By the
              time I finished my B.Arch., I'd realized the buildings I cared most about were the
              ones <em>people forgot they were inside of</em> — the ones that just worked.
            </>,
            <>
              That obsession followed me to Iowa State, where my master's in HCI gave me a new
              kind of canvas: pixels instead of plans, but the same question — how do people
              actually move through this thing?
            </>,
            <>
              Today I'm shipping product at <strong>Mercor</strong> and <strong>PyCube</strong>
              {" "}— turning research into interfaces that feel obvious in hindsight.
            </>,
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                fontFamily: sans,
                fontSize: "clamp(15px, 1.3vw, 17px)",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-wrap gap-3 mt-12"
        >
          <a
            href="https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              ...mono,
              fontSize: 10,
              color: "var(--bg-elevated)",
              backgroundColor: "var(--text-primary)",
              padding: "13px 22px",
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
            <ArrowRightIcon size={12} weight="bold" />
          </a>
          <a
            href="https://www.linkedin.com/in/niharika-pundlik-63a9a1288/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              ...mono,
              fontSize: 10,
              color: "var(--text-primary)",
              backgroundColor: "transparent",
              border: "0.75px solid var(--text-primary)",
              padding: "13px 22px",
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
    </section>
  );
}

/* ─── The Pivot — flowing horizontal lockup ─────────────────────── */
function ThePivot() {
  return (
    <section
      className="relative blueprint-grid-subtle"
      style={{
        padding: "clamp(72px, 10vw, 120px) 0",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 18 }}>
            ⟶ The pivot
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(34px, 4vw, 56px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              maxWidth: "20ch",
              margin: "0 auto",
            }}
          >
            Same instincts.{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              Different canvas.
            </span>
          </h2>
        </motion.div>

        {/* Horizontal flow */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6">
          {/* Built */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center md:text-left"
          >
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 14 }}>
              2018 — 2023
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: 10,
              }}
            >
              Architecture
            </h3>
            <p
              style={{
                fontFamily: sans,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "28ch",
                margin: "0 auto",
              }}
              className="md:!ml-0"
            >
              Walls, light, the way bodies bend around a corner.
            </p>
            <div className="mt-6 flex justify-center md:justify-start opacity-70">
              <HandDrawnSketch type="floorPlan" width={130} height={90} />
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex md:flex-col items-center gap-3"
            aria-hidden
          >
            <svg width="80" height="44" viewBox="0 0 80 44" fill="none" className="hidden md:block">
              <path
                d="M4 22 Q 40 4, 76 22"
                stroke="var(--accent)"
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="2 4"
              />
              <path
                d="M68 16 L76 22 L68 28"
                stroke="var(--accent)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <svg width="44" height="60" viewBox="0 0 44 60" fill="none" className="md:hidden">
              <path
                d="M22 4 Q 4 30, 22 56"
                stroke="var(--accent)"
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="2 4"
              />
              <path
                d="M16 48 L22 56 L28 48"
                stroke="var(--accent)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Digital */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 text-center md:text-right"
          >
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 14 }}>
              2023 — Now
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: 10,
              }}
            >
              Product Design
            </h3>
            <p
              style={{
                fontFamily: sans,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "28ch",
                margin: "0 auto",
              }}
              className="md:!mr-0"
            >
              Flows, friction, the way thumbs scroll past or stop.
            </p>
            <div className="mt-6 flex justify-center md:justify-end opacity-70">
              <HandDrawnSketch type="wireframe" width={70} height={90} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills — flowing ribbons, not a grid ──────────────────────── */
const skillRows = [
  {
    label: "Research",
    tools: ["Dovetail", "Maze", "UserTesting", "Lookback", "Otter AI", "Optimal Workshop"],
  },
  { label: "Design", tools: ["Figma", "FigJam", "Framer", "Protopie", "Adobe XD", "Sketch"] },
  { label: "Code", tools: ["HTML/CSS", "JavaScript", "React", "Python"] },
  { label: "Collaboration", tools: ["Jira", "Slack", "Miro", "Notion", "Confluence"] },
];

function SkillRibbons() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section style={{ padding: "clamp(72px, 10vw, 120px) 0" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex items-end justify-between gap-6 flex-wrap"
        >
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 3.6vw, 48px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              maxWidth: "16ch",
            }}
          >
            Things I{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>reach for</span>{" "}
            most.
          </h2>
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)" }}>
            Toolkit · 04 disciplines
          </p>
        </motion.div>

        <div className="space-y-0">
          {skillRows.map((row, i) => {
            const isActive = active === row.label;
            return (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                onMouseEnter={() => setActive(row.label)}
                onMouseLeave={() => setActive(null)}
                style={{
                  borderTop: "0.75px solid var(--border)",
                  borderBottom:
                    i === skillRows.length - 1 ? "0.75px solid var(--border)" : "none",
                  padding: "26px 0",
                  display: "grid",
                  gridTemplateColumns: "minmax(140px, 1fr) 3fr",
                  alignItems: "center",
                  gap: 24,
                  cursor: "default",
                  transitionProperty: "background-color",
                  transitionDuration: "200ms",
                  background: isActive ? "var(--accent-subtle)" : "transparent",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      ...mono,
                      fontSize: 9,
                      color: "var(--text-muted)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: serif,
                      fontSize: "clamp(20px, 2vw, 26px)",
                      fontWeight: 500,
                      letterSpacing: "-0.015em",
                      color: isActive ? "var(--accent)" : "var(--text-primary)",
                      transitionProperty: "color",
                      transitionDuration: "200ms",
                      fontStyle: isActive ? "italic" : "normal",
                    }}
                  >
                    {row.label}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {row.tools.map((tool) => (
                    <li
                      key={tool}
                      style={{
                        fontFamily: sans,
                        fontSize: 14,
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
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
        </div>
      </div>
    </section>
  );
}

/* ─── Experience — quiet list ───────────────────────────────────── */
const experiences = [
  {
    role: "Product Designer",
    company: "Mercor",
    period: "2025 — Now",
    description: "AI-driven flows for the talent marketplace — match quality, candidate UX.",
  },
  {
    role: "UX/UI Designer",
    company: "PyCube",
    period: "2025 — Now",
    description: "Enterprise specimen-tracking systems for healthcare, end-to-end.",
  },
  {
    role: "HCI Student Org",
    company: "Iowa State University",
    period: "2024 — 2025",
    description: "Led design workshops; mentored peers on UX research and Figma craft.",
  },
  {
    role: "UI/UX Designer",
    company: "Sixth Sense Technologies",
    period: "2022 — 2023",
    description: "Consumer interfaces; partnered with engineering on handoff.",
  },
  {
    role: "UX Designer",
    company: "Qnaptics",
    period: "2022",
    description: "Built a design system from zero; standardized patterns across surfaces.",
  },
];

function ExperienceList() {
  return (
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(72px, 10vw, 120px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex items-end justify-between gap-6 flex-wrap"
        >
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 3.6vw, 48px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
            }}
          >
            Where I've{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>built things</span>.
          </h2>
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)" }}>
            Experience · 05 chapters
          </p>
        </motion.div>

        <div>
          {experiences.map((exp, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });

            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group"
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 32,
                  padding: "26px 0",
                  borderTop: i === 0 ? "0.75px solid var(--border)" : "none",
                  borderBottom: "0.75px solid var(--border)",
                  alignItems: "baseline",
                  transitionProperty: "background-color",
                  transitionDuration: "200ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--accent-subtle)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <span
                  style={{
                    ...mono,
                    fontSize: 10,
                    color: "var(--text-muted)",
                    letterSpacing: "0.14em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {exp.period}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                    <h3
                      style={{
                        fontFamily: serif,
                        fontSize: "clamp(20px, 2vw, 24px)",
                        fontWeight: 500,
                        letterSpacing: "-0.015em",
                        color: "var(--text-primary)",
                        lineHeight: 1.25,
                      }}
                    >
                      {exp.role}
                    </h3>
                    <span
                      style={{
                        fontFamily: sans,
                        fontSize: 14,
                        color: "var(--text-secondary)",
                      }}
                    >
                      · {exp.company}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      maxWidth: "60ch",
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
    </section>
  );
}

/* ─── Education — minimal twin ──────────────────────────────────── */
function Education() {
  const items = [
    {
      degree: "M.S. Human-Computer Interaction",
      school: "Iowa State University",
      period: "2023 — 2025",
      note: "UX Research, Interaction Design, Information Architecture, Cognitive Psychology.",
    },
    {
      degree: "B.Arch. Architecture",
      school: "Padmashree Inst. of Architecture & Design",
      period: "2018 — 2023",
      note: "Spatial design, structures, 3D modeling, urban design, placemaking.",
      sketch: true,
    },
  ];

  return (
    <section style={{ padding: "clamp(72px, 10vw, 120px) 0" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 12 }}>
            Education
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 3.6vw, 48px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
            }}
          >
            Two degrees, one{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>throughline</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {items.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
              style={{ paddingTop: 14, borderTop: "0.75px solid var(--border)" }}
            >
              <p
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "var(--text-muted)",
                  marginBottom: 12,
                  letterSpacing: "0.16em",
                }}
              >
                {edu.period}
              </p>
              <h3
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  marginBottom: 6,
                  lineHeight: 1.25,
                }}
              >
                {edu.degree}
              </h3>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  marginBottom: 12,
                }}
              >
                {edu.school}
              </p>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  maxWidth: "44ch",
                }}
              >
                {edu.note}
              </p>
              {edu.sketch && (
                <div
                  className="hidden md:block"
                  style={{ position: "absolute", top: 8, right: 0, opacity: 0.55 }}
                  aria-hidden
                >
                  <HandDrawnSketch
                    type="floorPlan"
                    width={70}
                    height={48}
                    annotation="where it started"
                    annotationPosition="below"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Off the clock — soft interactive cards ────────────────────── */
const hobbies = [
  { icon: ForkKnifeIcon, label: "Spicy food", detail: "The hotter, the better." },
  { icon: MusicNotesIcon, label: "Dance", detail: "Movement clears the head." },
  { icon: AirplaneIcon, label: "Travel", detail: "Street food is the brief." },
  { icon: PencilSimpleLineIcon, label: "Sketching", detail: "Plans I'll never build." },
];

function OffTheClock() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(72px, 10vw, 120px) 0 clamp(80px, 10vw, 130px)",
        borderTop: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 12 }}>
            Off the clock
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 3.6vw, 48px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              maxWidth: "20ch",
            }}
          >
            When I'm not pushing{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>pixels</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                style={{
                  position: "relative",
                  padding: "26px 22px 28px",
                  background: "var(--bg-elevated)",
                  border: "0.75px solid",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                  cursor: "default",
                  minHeight: 168,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transitionProperty: "border-color, transform",
                  transitionDuration: "200ms",
                  transform: isActive ? "translateY(-3px)" : "translateY(0)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    ...mono,
                    position: "absolute",
                    top: 12,
                    right: 14,
                    fontSize: 8,
                    color: "var(--text-muted)",
                    letterSpacing: "0.16em",
                  }}
                >
                  0{i + 1}
                </span>

                <Icon
                  size={26}
                  weight={isActive ? "bold" : "regular"}
                  color={isActive ? "var(--accent)" : "var(--text-secondary)"}
                  style={{ transitionProperty: "color", transitionDuration: "200ms" }}
                />

                <div style={{ marginTop: 24 }}>
                  <h3
                    style={{
                      fontFamily: serif,
                      fontWeight: 600,
                      fontSize: 22,
                      letterSpacing: "-0.015em",
                      color: "var(--text-primary)",
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {h.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {h.detail}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-20 flex items-center justify-center gap-3"
        >
          <CoffeeIcon size={18} weight="regular" color="var(--text-muted)" />
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 22,
              color: "var(--text-secondary)",
              opacity: 0.75,
            }}
          >
            let's grab coffee — virtually or otherwise.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-14"
    >
      <Hero />
      <EditorialBio />
      <ThePivot />
      <SkillRibbons />
      <ExperienceList />
      <Education />
      <OffTheClock />
    </motion.div>
  );
}
