import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  CoffeeIcon,
  MusicNotesIcon,
  AirplaneIcon,
  PencilSimpleLineIcon,
  ForkKnifeIcon,
  ArrowRightIcon,
  BookOpenIcon,
  HeadphonesIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import HandDrawnSketch from "../components/HandDrawnSketch";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.16em",
};
const caveat: React.CSSProperties = {
  fontFamily: "'Caveat', cursive",
};
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";

/* ─── Hero — sketchbook spread ───────────────────────────────────── */
function Hero() {
  return (
    <section
      className="blueprint-grid relative"
      style={{
        paddingTop: "clamp(64px, 8vw, 100px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
    >
      {/* Marginalia: top-left handwritten sparkle */}
      <div
        aria-hidden
        className="hidden md:block absolute"
        style={{ top: 90, left: "6%", opacity: 0.45, pointerEvents: "none" }}
      >
        <HandDrawnSketch type="approvalStamp" width={68} height={68} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <span
                className="status-pulse"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "var(--status-green)",
                  border: "1.5px solid var(--accent)",
                }}
                aria-hidden
              />
              <span style={{ ...mono, fontSize: 10, color: "var(--text-secondary)" }}>
                Hello, friend
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: serif,
                fontWeight: 700,
                fontSize: "clamp(48px, 7vw, 96px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
              }}
            >
              I'm{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Niharika
              </span>
              .
            </motion.h1>

            {/* Caveat sub-greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                ...caveat,
                fontSize: 26,
                color: "var(--text-secondary)",
                opacity: 0.7,
                marginTop: 6,
              }}
            >
              — pronounced nih-har-ee-kah ✦
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              style={{
                fontFamily: sans,
                fontSize: "clamp(16px, 1.4vw, 19px)",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginTop: 28,
                maxWidth: "44ch",
              }}
            >
              Architect-turned product designer, adding a little spice and a lot of soul to
              everything I ship.
            </motion.p>

            {/* Origin → Now trail */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-3 mt-8"
            >
              <MapPinIcon size={14} weight="regular" color="var(--text-muted)" />
              <span
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "var(--text-muted)",
                }}
              >
                Indore, IN <span style={{ color: "var(--accent)" }}>→</span> Iowa, US{" "}
                <span style={{ color: "var(--accent)" }}>→</span> Virginia, US
              </span>
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* construction frame */}
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

              {/* tape pin */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -9,
                  left: "50%",
                  transform: "translateX(-50%) rotate(-3deg)",
                  width: 78,
                  height: 16,
                  backgroundColor: "rgba(200,200,200,0.55)",
                  zIndex: 3,
                  borderRadius: 2,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                }}
              />

              <div
                style={{
                  width: "min(320px, 78vw)",
                  aspectRatio: "10 / 19",
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
                    objectPosition: "center 40%",
                    display: "block",
                  }}
                />
              </div>

              {/* Caveat label below */}
              <span
                aria-hidden
                style={{
                  ...caveat,
                  position: "absolute",
                  bottom: -34,
                  right: 10,
                  fontSize: 18,
                  color: "var(--text-secondary)",
                  opacity: 0.7,
                  transform: "rotate(-3deg)",
                  whiteSpace: "nowrap",
                }}
              >
                graduation, '25 ✿
              </span>

              {/* mono tag top-left */}
              <span
                aria-hidden
                style={{
                  ...mono,
                  position: "absolute",
                  top: 14,
                  left: -50,
                  fontSize: 8,
                  color: "var(--text-muted)",
                  letterSpacing: "0.18em",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
                className="hidden lg:block"
              >
                ABOUT · 01
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Now Board — what I'm currently doing ──────────────────────── */
const nowItems = [
  {
    icon: BriefcaseIcon,
    label: "Designing",
    value: "Mercor + PyCube",
    note: "AI flows + healthcare UX",
  },
  {
    icon: BookOpenIcon,
    label: "Reading",
    value: "Don Norman",
    note: "The Design of Everyday Things",
  },
  {
    icon: HeadphonesIcon,
    label: "Listening",
    value: "Bollywood + Lo-fi",
    note: "Always moving to a beat",
  },
  {
    icon: ForkKnifeIcon,
    label: "Eating",
    value: "Anything spicy",
    note: "If it doesn't burn, I'm out",
  },
];

function NowBoard() {
  return (
    <section style={{ padding: "clamp(56px, 7vw, 90px) 0 clamp(40px, 5vw, 60px)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline justify-between gap-4 mb-7"
        >
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(20px, 2.2vw, 26px)",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.015em",
            }}
          >
            Right{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>now</span> —
          </h2>
          <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)" }}>
            updated · 04.26
          </span>
        </motion.div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ border: "0.75px solid var(--border)" }}
        >
          {nowItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
                style={{
                  border: "0.75px solid var(--border)",
                  padding: "22px 20px 24px",
                  backgroundColor: "var(--bg-elevated)",
                  position: "relative",
                  transitionProperty: "background-color",
                  transitionDuration: "200ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--accent-subtle)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--bg-elevated)";
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon size={18} weight="regular" color="var(--text-secondary)" />
                  <span
                    style={{
                      ...mono,
                      fontSize: 9,
                      color: "var(--text-muted)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: serif,
                    fontWeight: 600,
                    fontSize: 19,
                    letterSpacing: "-0.015em",
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                    marginBottom: 6,
                  }}
                >
                  {item.value}
                </p>
                <p
                  style={{
                    ...caveat,
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    opacity: 0.7,
                    lineHeight: 1.3,
                  }}
                >
                  {item.note}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Things I love — soft horizontal strip ─────────────────────── */
const loves = [
  { icon: ForkKnifeIcon, word: "spice", note: "the hotter the better" },
  { icon: MusicNotesIcon, word: "dance", note: "movement is medicine" },
  { icon: AirplaneIcon, word: "travel", note: "for the street food, mostly" },
  { icon: PencilSimpleLineIcon, word: "sketches", note: "plans I'll never build" },
];

function ThingsILove() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 88px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          style={{
            fontFamily: serif,
            fontSize: "clamp(28px, 3.4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            marginBottom: 36,
          }}
        >
          A few{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
            soft spots
          </span>
          .
        </motion.h2>

        <div className="flex flex-wrap gap-3">
          {loves.map((l, i) => {
            const Icon = l.icon;
            const isActive = active === i;
            return (
              <motion.div
                key={l.word}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="inline-flex items-center gap-3"
                style={{
                  padding: "14px 22px",
                  border: "0.75px solid",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                  backgroundColor: isActive
                    ? "var(--accent-subtle)"
                    : "var(--bg-elevated)",
                  cursor: "default",
                  transitionProperty: "border-color, background-color, transform",
                  transitionDuration: "200ms",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                <Icon
                  size={18}
                  weight={isActive ? "bold" : "regular"}
                  color={isActive ? "var(--accent)" : "var(--text-secondary)"}
                />
                <span
                  style={{
                    fontFamily: serif,
                    fontSize: 22,
                    fontWeight: 600,
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                  }}
                >
                  {l.word}
                </span>
                <span
                  style={{
                    ...caveat,
                    fontSize: 16,
                    color: "var(--text-secondary)",
                    opacity: 0.65,
                    marginLeft: 4,
                  }}
                >
                  — {l.note}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── The Pivot — compact horizontal lockup ─────────────────────── */
function ThePivot() {
  return (
    <section style={{ padding: "clamp(56px, 7vw, 90px) 0" }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-right"
          >
            <p
              style={{
                ...mono,
                fontSize: 9,
                color: "var(--text-muted)",
                marginBottom: 8,
              }}
            >
              2018 — 2023
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: "clamp(22px, 2.4vw, 30px)",
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
                ...caveat,
                fontSize: 17,
                color: "var(--text-secondary)",
                opacity: 0.7,
                marginTop: 4,
              }}
            >
              walls + light
            </p>
            <div className="mt-5 flex justify-center md:justify-end opacity-60">
              <HandDrawnSketch type="floorPlan" width={86} height={60} />
            </div>
          </motion.div>

          {/* Connector */}
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

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 text-center md:text-left"
          >
            <p
              style={{
                ...mono,
                fontSize: 9,
                color: "var(--text-muted)",
                marginBottom: 8,
              }}
            >
              2023 — Now
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: "clamp(22px, 2.4vw, 30px)",
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
                ...caveat,
                fontSize: 17,
                color: "var(--text-secondary)",
                opacity: 0.7,
                marginTop: 4,
              }}
            >
              flows + friction
            </p>
            <div className="mt-5 flex justify-center md:justify-start opacity-60">
              <HandDrawnSketch type="wireframe" width={50} height={66} />
            </div>
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
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 90px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="flex items-baseline justify-between gap-4 mb-8"
        >
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(28px, 3.4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
            }}
          >
            Tools I{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>live in</span>.
          </h2>
          <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)" }}>04 · stacks</span>
        </motion.div>

        <div>
          {skillRows.map((row, i) => {
            const isActive = active === row.label;
            return (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                onMouseEnter={() => setActive(row.label)}
                onMouseLeave={() => setActive(null)}
                style={{
                  borderTop: "0.75px solid var(--border)",
                  borderBottom:
                    i === skillRows.length - 1 ? "0.75px solid var(--border)" : "none",
                  padding: "20px 4px",
                  display: "grid",
                  gridTemplateColumns: "minmax(120px, 1fr) 3fr",
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
                    fontSize: 20,
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

/* ─── Where I've worked — minimal ledger ────────────────────────── */
const experiences = [
  { role: "Product Designer", company: "Mercor", period: "'25 — Now" },
  { role: "UX/UI Designer", company: "PyCube", period: "'25 — Now" },
  { role: "HCI Org Lead", company: "Iowa State University", period: "'24 — '25" },
  { role: "UI/UX Designer", company: "Sixth Sense Tech", period: "'22 — '23" },
  { role: "UX Designer", company: "Qnaptics", period: "'22" },
];

function WhereIveWorked() {
  return (
    <section style={{ padding: "clamp(56px, 7vw, 90px) 0" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="flex items-baseline justify-between gap-4 mb-8"
        >
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(28px, 3.4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
            }}
          >
            A few places I've{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              built things
            </span>
            .
          </h2>
          <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)" }}>05 · stops</span>
        </motion.div>

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
                  gridTemplateColumns: "90px 1fr auto",
                  gap: 20,
                  padding: "18px 4px",
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
                <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)" }}>
                  {exp.period}
                </span>
                <h3
                  style={{
                    fontFamily: serif,
                    fontSize: "clamp(17px, 1.7vw, 21px)",
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
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 90px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          style={{
            fontFamily: serif,
            fontSize: "clamp(28px, 3.4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginBottom: 32,
          }}
        >
          Two degrees,{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
            one throughline
          </span>
          .
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {items.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative"
              style={{ paddingTop: 14, borderTop: "0.75px solid var(--border)" }}
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
                  fontSize: "clamp(20px, 2.2vw, 26px)",
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

/* ─── Sign-off — invitation ─────────────────────────────────────── */
function SignOff() {
  return (
    <section
      className="blueprint-grid relative"
      style={{
        padding: "clamp(72px, 9vw, 110px) 0 clamp(72px, 9vw, 110px)",
      }}
    >
      <div
        aria-hidden
        className="hidden md:block absolute"
        style={{ bottom: 30, right: "8%", opacity: 0.3, pointerEvents: "none" }}
      >
        <HandDrawnSketch type="commentBubble" width={90} height={64} />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              ...caveat,
              fontSize: 22,
              color: "var(--text-secondary)",
              opacity: 0.7,
              display: "block",
              marginBottom: 14,
            }}
          >
            still here? say hi ↓
          </span>

          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: 28,
            }}
          >
            Let's build{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              something
            </span>
            .
          </h2>

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
                padding: "13px 24px",
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
                padding: "13px 24px",
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
            <a
              href="mailto:niharikap0210@gmail.com"
              className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                ...mono,
                fontSize: 10,
                color: "var(--text-secondary)",
                padding: "13px 24px",
                textDecoration: "none",
                transitionProperty: "color, transform",
                transitionDuration: "180ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--accent)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-secondary)";
                el.style.transform = "translateY(0)";
              }}
            >
              <CoffeeIcon size={14} weight="regular" />
              Email
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
      <NowBoard />
      <ThingsILove />
      <ThePivot />
      <Toolkit />
      <WhereIveWorked />
      <Education />
      <SignOff />
    </motion.div>
  );
}
