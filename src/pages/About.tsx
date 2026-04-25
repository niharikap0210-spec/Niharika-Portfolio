import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  CoffeeIcon,
  MusicNotesIcon,
  AirplaneIcon,
  PencilSimpleLineIcon,
  ForkKnifeIcon,
  ArrowRightIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import HandDrawnSketch from "../components/HandDrawnSketch";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.16em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";

/* ─── Hero — centered photo, personal greeting ───────────────────── */
function Hero() {
  return (
    <section
      className="blueprint-grid relative"
      style={{
        paddingTop: "clamp(72px, 9vw, 110px)",
        paddingBottom: "clamp(40px, 5vw, 60px)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 28 }}
        >
          ✦ Hello ✦
        </motion.span>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          style={{ marginBottom: 36 }}
        >
          {/* construction-line frame */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -12,
              border: "0.75px solid var(--construction)",
              pointerEvents: "none",
            }}
          />
          {/* corner ticks */}
          {[
            { top: -16, left: -16 },
            { top: -16, right: -16 },
            { bottom: -16, left: -16 },
            { bottom: -16, right: -16 },
          ].map((pos, i) => (
            <div
              key={i}
              aria-hidden
              style={{
                position: "absolute",
                width: 9,
                height: 9,
                border: "0.75px solid var(--accent)",
                ...pos,
              }}
            />
          ))}

          {/* tape */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%) rotate(-3deg)",
              width: 72,
              height: 16,
              backgroundColor: "rgba(200,200,200,0.55)",
              zIndex: 3,
              borderRadius: 2,
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          />

          <div
            style={{
              width: "min(320px, 75vw)",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              position: "relative",
              boxShadow:
                "0 4px 14px rgba(0,0,0,0.08), 0 22px 50px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src="/about/niharika.jpg"
              alt="Niharika Pundlik"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 16%",
                transform: "scale(1.35)",
                transformOrigin: "center 22%",
                display: "block",
              }}
            />
          </div>

          {/* Caveat annotation */}
          <span
            aria-hidden
            className="hidden sm:inline-block"
            style={{
              position: "absolute",
              right: -110,
              top: 28,
              fontFamily: "'Caveat', cursive",
              fontSize: 18,
              color: "var(--text-secondary)",
              opacity: 0.6,
              transform: "rotate(-6deg)",
              whiteSpace: "nowrap",
            }}
          >
            ↙ that's me
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: serif,
            fontWeight: 700,
            fontSize: "clamp(40px, 6vw, 72px)",
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            marginBottom: 18,
          }}
        >
          Hi, I'm{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
            Niharika
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{
            fontFamily: sans,
            fontSize: "clamp(15px, 1.3vw, 17px)",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            maxWidth: "44ch",
          }}
        >
          A product designer adding a little spice and a lot of soul to everything I ship.
        </motion.p>

        {/* Origin · Base inline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-3 mt-6"
        >
          <MapPinIcon size={14} weight="regular" color="var(--text-muted)" />
          <span
            style={{
              ...mono,
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.18em",
            }}
          >
            Indore → Iowa → Virginia
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Personality strip — 4 facts ────────────────────────────────── */
const facts = [
  {
    icon: ForkKnifeIcon,
    label: "Spice lover",
    detail: "If it doesn't burn, I'm not interested.",
  },
  {
    icon: MusicNotesIcon,
    label: "Dancer at heart",
    detail: "Always moving to a beat.",
  },
  {
    icon: AirplaneIcon,
    label: "Adventure seeker",
    detail: "Chasing new cities and street food.",
  },
  {
    icon: PencilSimpleLineIcon,
    label: "Design geek",
    detail: "Obsessed with intuitive, playful UX.",
  },
];

function PersonalityStrip() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: "clamp(48px, 6vw, 80px) 0",
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ border: "0.75px solid var(--border)" }}
        >
          {facts.map((f, i) => {
            const Icon = f.icon;
            const isActive = active === i;
            return (
              <motion.button
                key={f.label}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                style={{
                  border: "0.75px solid",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                  padding: "26px 22px 28px",
                  background: isActive ? "var(--accent-subtle)" : "var(--bg-elevated)",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  transitionProperty: "border-color, background-color, transform",
                  transitionDuration: "200ms",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                  position: "relative",
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
                  }}
                >
                  0{i + 1}
                </span>

                <Icon
                  size={24}
                  weight={isActive ? "bold" : "regular"}
                  color={isActive ? "var(--accent)" : "var(--text-secondary)"}
                  style={{ transitionProperty: "color", transitionDuration: "200ms" }}
                />

                <div>
                  <h3
                    style={{
                      fontFamily: serif,
                      fontWeight: 600,
                      fontSize: 19,
                      letterSpacing: "-0.01em",
                      color: "var(--text-primary)",
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {f.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 12.5,
                      color: "var(--text-secondary)",
                      lineHeight: 1.55,
                    }}
                  >
                    {f.detail}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── The Pivot — compact one-liner ─────────────────────────────── */
function ThePivot() {
  return (
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 88px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Built */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-right"
          >
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 8 }}>
              2018 — 2023
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: "clamp(24px, 2.6vw, 32px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                lineHeight: 1.15,
              }}
            >
              Architecture
            </h3>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: "var(--text-muted)",
                marginTop: 4,
                fontStyle: "italic",
              }}
            >
              walls + light
            </p>
          </motion.div>

          {/* Arrow + sketch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center gap-2"
            aria-hidden
          >
            <span style={{ ...mono, fontSize: 8, color: "var(--accent)" }}>
              same brain
            </span>
            <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
              <path
                d="M4 16 Q 40 4, 76 16"
                stroke="var(--accent)"
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="2 4"
              />
              <path
                d="M68 10 L76 16 L68 22"
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
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 text-center md:text-left"
          >
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 8 }}>
              2023 — Now
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: "clamp(24px, 2.6vw, 32px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                lineHeight: 1.15,
              }}
            >
              Product Design
            </h3>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: "var(--text-muted)",
                marginTop: 4,
                fontStyle: "italic",
              }}
            >
              flows + friction
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Toolkit — compact ribbons ─────────────────────────────────── */
const skillRows = [
  {
    label: "Research",
    tools: ["Dovetail", "Maze", "UserTesting", "Lookback", "Otter AI"],
  },
  { label: "Design", tools: ["Figma", "FigJam", "Framer", "Protopie", "Sketch"] },
  { label: "Code", tools: ["HTML/CSS", "JavaScript", "React", "Python"] },
  { label: "Collab", tools: ["Jira", "Slack", "Miro", "Notion", "Confluence"] },
];

function Toolkit() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section style={{ padding: "clamp(56px, 7vw, 90px) 0" }}>
      <div className="max-w-4xl mx-auto px-6">
        <p
          style={{
            ...mono,
            fontSize: 10,
            color: "var(--text-muted)",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          ✦ Toolkit ✦
        </p>

        <div>
          {skillRows.map((row, i) => {
            const isActive = active === row.label;
            return (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onMouseEnter={() => setActive(row.label)}
                onMouseLeave={() => setActive(null)}
                style={{
                  borderTop: "0.75px solid var(--border)",
                  borderBottom:
                    i === skillRows.length - 1 ? "0.75px solid var(--border)" : "none",
                  padding: "18px 4px",
                  display: "grid",
                  gridTemplateColumns: "minmax(110px, 1fr) 3fr",
                  alignItems: "center",
                  gap: 18,
                  cursor: "default",
                  background: isActive ? "var(--accent-subtle)" : "transparent",
                  transitionProperty: "background-color",
                  transitionDuration: "200ms",
                }}
              >
                <h3
                  style={{
                    fontFamily: serif,
                    fontSize: 19,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: isActive ? "var(--accent)" : "var(--text-primary)",
                    fontStyle: isActive ? "italic" : "normal",
                    transitionProperty: "color",
                    transitionDuration: "200ms",
                  }}
                >
                  {row.label}
                </h3>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {row.tools.map((tool) => (
                    <li
                      key={tool}
                      style={{
                        fontFamily: sans,
                        fontSize: 13,
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

/* ─── Experience — quiet ledger ─────────────────────────────────── */
const experiences = [
  {
    role: "Product Designer",
    company: "Mercor",
    period: "'25 — Now",
  },
  {
    role: "UX/UI Designer",
    company: "PyCube",
    period: "'25 — Now",
  },
  {
    role: "HCI Org",
    company: "Iowa State University",
    period: "'24 — '25",
  },
  {
    role: "UI/UX Designer",
    company: "Sixth Sense Tech",
    period: "'22 — '23",
  },
  {
    role: "UX Designer",
    company: "Qnaptics",
    period: "'22",
  },
];

function Experience() {
  return (
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 90px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <p
          style={{
            ...mono,
            fontSize: 10,
            color: "var(--text-muted)",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          ✦ Where I've worked ✦
        </p>

        <div>
          {experiences.map((exp, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });

            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: 20,
                  padding: "16px 4px",
                  borderTop: i === 0 ? "0.75px solid var(--border)" : "none",
                  borderBottom: "0.75px solid var(--border)",
                  alignItems: "baseline",
                  transitionProperty: "background-color",
                  transitionDuration: "180ms",
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
                  }}
                >
                  {exp.period}
                </span>
                <h3
                  style={{
                    fontFamily: serif,
                    fontSize: "clamp(17px, 1.7vw, 20px)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                    lineHeight: 1.25,
                  }}
                >
                  {exp.role}
                </h3>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    textAlign: "right",
                  }}
                >
                  {exp.company}
                </span>
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
    },
    {
      degree: "B.Arch. Architecture",
      school: "Padmashree Inst. of Architecture",
      period: "2018 — 2023",
      sketch: true,
    },
  ];

  return (
    <section style={{ padding: "clamp(56px, 7vw, 90px) 0" }}>
      <div className="max-w-4xl mx-auto px-6">
        <p
          style={{
            ...mono,
            fontSize: 10,
            color: "var(--text-muted)",
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          ✦ Education ✦
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {items.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative"
              style={{ paddingTop: 12, borderTop: "0.75px solid var(--border)" }}
            >
              <p
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "var(--text-muted)",
                  marginBottom: 10,
                }}
              >
                {edu.period}
              </p>
              <h3
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(19px, 2vw, 24px)",
                  fontWeight: 600,
                  letterSpacing: "-0.018em",
                  color: "var(--text-primary)",
                  lineHeight: 1.25,
                  marginBottom: 4,
                }}
              >
                {edu.degree}
              </h3>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  color: "var(--text-secondary)",
                }}
              >
                {edu.school}
              </p>
              {edu.sketch && (
                <div
                  className="hidden md:block"
                  style={{ position: "absolute", top: 8, right: 0, opacity: 0.55 }}
                  aria-hidden
                >
                  <HandDrawnSketch type="floorPlan" width={56} height={40} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sign-off ──────────────────────────────────────────────────── */
function SignOff() {
  return (
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 90px) 0 clamp(64px, 8vw, 100px)",
        borderTop: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(28px, 3.4vw, 42px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "var(--text-primary)",
              marginBottom: 18,
            }}
          >
            Want to{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              build something
            </span>{" "}
            together?
          </h2>

          <div className="flex items-center justify-center gap-3 mb-8">
            <CoffeeIcon size={16} weight="regular" color="var(--text-muted)" />
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 20,
                color: "var(--text-secondary)",
                opacity: 0.7,
              }}
            >
              coffee — virtually or otherwise.
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                ...mono,
                fontSize: 10,
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
              Resume
              <ArrowRightIcon size={11} weight="bold" />
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
          </div>
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
      <PersonalityStrip />
      <ThePivot />
      <Toolkit />
      <Experience />
      <Education />
      <SignOff />
    </motion.div>
  );
}
