import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  CoffeeIcon,
  MusicNotesIcon,
  AirplaneIcon,
  PencilSimpleLineIcon,
  ForkKnifeIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  MapPinIcon,
  CompassToolIcon,
  EyeIcon,
  HandHeartIcon,
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

/* ─── Section Header — small label + numbered title ─────────────── */
function SectionHeader({
  num,
  label,
  title,
  italic,
}: {
  num: string;
  label: string;
  title: string;
  italic: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55 }}
      className="mb-12"
    >
      <div
        className="flex items-center justify-between"
        style={{
          borderTop: "0.75px solid var(--border)",
          paddingTop: 12,
          marginBottom: 22,
        }}
      >
        <div className="flex items-center gap-3">
          <span
            style={{
              ...mono,
              fontSize: 13,
              color: "var(--accent)",
              letterSpacing: "0.22em",
            }}
          >
            {num}
          </span>
          <span
            style={{
              ...mono,
              fontSize: 13,
              color: "var(--text-muted)",
              letterSpacing: "0.22em",
            }}
          >
            / {label}
          </span>
        </div>
      </div>
      <h2
        style={{
          fontFamily: serif,
          fontWeight: 700,
          fontSize: "clamp(34px, 4.4vw, 56px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "var(--text-primary)",
          maxWidth: "20ch",
          margin: 0,
        }}
      >
        {title}{" "}
        <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
          {italic}
        </span>
        .
      </h2>
    </motion.div>
  );
}

/* ─── Hero — preserved ──────────────────────────────────────────── */
function Hero() {
  return (
    <section
      className="blueprint-grid relative"
      style={{
        paddingTop: "clamp(64px, 8vw, 100px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
    >
      <div
        aria-hidden
        className="hidden md:block absolute"
        style={{ top: 90, left: "6%", opacity: 0.45, pointerEvents: "none" }}
      >
        <HandDrawnSketch type="approvalStamp" width={68} height={68} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
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
              ( ni-ha-ree-ka ) ✦
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-3 mt-8"
            >
              <MapPinIcon size={14} weight="regular" color="var(--text-muted)" />
              <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)" }}>
                Indore, IN <span style={{ color: "var(--accent)" }}>→</span> Iowa, US{" "}
                <span style={{ color: "var(--accent)" }}>→</span> Virginia, US
              </span>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: -12,
                  border: "0.75px solid var(--construction)",
                  pointerEvents: "none",
                }}
              />
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
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08), 0 22px 50px rgba(0,0,0,0.08)",
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

/* ─── My Story — two-col: image left, text right ────────────────── */
function MyStory() {
  return (
    <section
      id="story"
      style={{ padding: "clamp(56px, 7vw, 96px) 0", scrollMarginTop: 96 }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          num="01"
          label="My Story"
          title="From walls"
          italic="to flows"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Construction frame */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: -10,
                border: "0.75px solid var(--construction)",
                pointerEvents: "none",
              }}
            />
            {/* Corner ticks */}
            {[
              { top: -14, left: -14 },
              { top: -14, right: -14 },
              { bottom: -14, left: -14 },
              { bottom: -14, right: -14 },
            ].map((pos, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  width: 8,
                  height: 8,
                  border: "0.75px solid var(--accent)",
                  ...pos,
                }}
              />
            ))}

            <div
              style={{
                width: "min(320px, 78vw)",
                aspectRatio: "10 / 19",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.07), 0 20px 48px rgba(0,0,0,0.07)",
              }}
            >
              <img
                src="/about/niharika-arch.jpg"
                alt="Niharika presenting architecture work"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 18%",
                  display: "block",
                }}
              />
            </div>

            <span
              aria-hidden
              style={{
                ...caveat,
                position: "absolute",
                bottom: -32,
                left: 4,
                fontSize: 17,
                color: "var(--text-secondary)",
                opacity: 0.65,
                transform: "rotate(-2deg)",
                whiteSpace: "nowrap",
              }}
            >
              architecture thesis presentation ✿
            </span>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 22 }}
          >
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(20px, 1.8vw, 24px)",
                lineHeight: 1.5,
                color: "var(--text-primary)",
                letterSpacing: "-0.005em",
              }}
            >
              I started in architecture, drawing buildings before screens.
            </p>

            <p
              style={{
                fontFamily: sans,
                fontSize: 18,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
              }}
            >
              Five years of B.Arch in Indore taught me to think in systems, light, and
              human scale. Along the way, I realized the same care I put into a corridor,
              I wanted to put into a tap. The materials changed; the discipline didn't.
            </p>

            <p
              style={{
                fontFamily: sans,
                fontSize: 18,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
              }}
            >
              I moved to Iowa for an M.S. in Human-Computer Interaction at Iowa State,
              and the pivot stuck. The vocabulary swapped (pixels for stone, frames for
              plans), but I still measure twice, still sweat the gutters, still draw on
              paper before opening Figma. Architecture school left me with a suspicion of
              ornament and a respect for constraints; both translate well.
            </p>

            <p
              style={{
                fontFamily: sans,
                fontSize: 18,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
              }}
            >
              Today I'm a Product Designer working across AI, healthcare,
              and consumer flows. I care about the spaces between taps: the quiet
              moments where a product proves it understood you. If you're building
              something thoughtful, I'd love to hear about it.
            </p>

            <p
              style={{
                ...caveat,
                fontSize: 22,
                color: "var(--accent)",
                opacity: 0.85,
                marginTop: 8,
              }}
            >
              same hands, new tools ✦
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── My Approach — accordion rows ──────────────────────────────── */
const principles = [
  {
    num: "01",
    title: "Research before pixels",
    tag: "listen before you draw",
    body: "Every flow starts with a real human problem. If I can't name the user, the pain, and the moment, I'm not ready to draw.",
  },
  {
    num: "02",
    title: "Quiet over clever",
    tag: "invisible is best",
    body: "The best UI is the one nobody notices. I'd rather solve a problem invisibly than show off a pattern.",
  },
  {
    num: "03",
    title: "Add a little spice",
    tag: "joy is intentional",
    body: "Joy is a function, not a flourish. A small surprise (a soft motion, an honest empty state) turns a tool into a memory.",
  },
  {
    num: "04",
    title: "Measure twice, cut once",
    tag: "precision compounds",
    body: "Architectural rigor on every decision. I sweat the gutters, the type scale, the dead pixels at 11pm, because details compound.",
  },
  {
    num: "05",
    title: "Build in plain sight",
    tag: "show your work",
    body: "Prototype rough, share early, ship the smallest honest thing. Feedback loops beat pitch decks.",
  },
];

function MyApproach() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section
      id="approach"
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 96px) 0",
        scrollMarginTop: 96,
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          num="02"
          label="Approach"
          title="Five things I"
          italic="believe"
        />

        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {principles.map((p, i) => {
            const ref = useRef<HTMLLIElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            const isOpen = open === i;

            return (
              <motion.li
                key={p.num}
                ref={ref}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr auto",
                    alignItems: "center",
                    columnGap: "clamp(16px, 2vw, 32px)",
                    padding: "clamp(20px, 2.5vw, 28px) 0",
                    borderTop: i === 0 ? "0.75px solid var(--border)" : "none",
                    borderBottom: "0.75px solid var(--border)",
                    background: "transparent",
                    cursor: "pointer",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {/* Accent left bar on hover/open */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: -16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 2,
                      height: isOpen ? "60%" : "0%",
                      backgroundColor: "var(--accent)",
                      transitionProperty: "height, opacity",
                      transitionDuration: "300ms",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      opacity: isOpen ? 1 : 0,
                    }}
                    className="hidden lg:block group-hover:!opacity-100 group-hover:!h-[60%]"
                  />

                  {/* Number */}
                  <span
                    style={{
                      ...mono,
                      fontSize: 13,
                      letterSpacing: "0.18em",
                      color: isOpen ? "var(--accent)" : "var(--text-muted)",
                      transitionProperty: "color",
                      transitionDuration: "200ms",
                    }}
                    className="group-hover:!text-[var(--accent)]"
                  >
                    {p.num}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: serif,
                      fontWeight: 700,
                      fontSize: "clamp(22px, 2.8vw, 38px)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.15,
                      color: isOpen ? "var(--accent)" : "var(--text-primary)",
                      fontStyle: isOpen ? "italic" : "normal",
                      transitionProperty: "color, font-style",
                      transitionDuration: "200ms",
                      margin: 0,
                    }}
                    className={`group-hover:text-[var(--accent)] group-hover:italic`}
                  >
                    {p.title}.
                  </h3>

                  {/* Tag — hides when open */}
                  <span
                    style={{
                      ...mono,
                      fontSize: 13,
                      letterSpacing: "0.16em",
                      color: "var(--text-muted)",
                      opacity: isOpen ? 0 : 1,
                      transitionProperty: "opacity",
                      transitionDuration: "200ms",
                      whiteSpace: "nowrap",
                      textAlign: "right",
                    }}
                    className="hidden sm:block group-hover:opacity-0"
                  >
                    {p.tag}
                  </span>
                </button>

                {/* Expandable body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "48px 1fr auto",
                          columnGap: "clamp(16px, 2vw, 32px)",
                          paddingBottom: "clamp(20px, 2.5vw, 28px)",
                        }}
                      >
                        <span />
                        <div>
                          <p
                            style={{
                              fontFamily: sans,
                              fontSize: 18,
                              color: "var(--text-secondary)",
                              lineHeight: 1.75,
                              margin: 0,
                              maxWidth: "62ch",
                              paddingTop: 12,
                            }}
                          >
                            {p.body}
                          </p>
                          <p
                            style={{
                              ...caveat,
                              fontSize: 18,
                              color: "var(--accent)",
                              opacity: 0.8,
                              marginTop: 10,
                            }}
                          >
                            {p.tag} ✦
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ─── Experience — vertical list ────────────────────────────────── */
const stops = [
  {
    role: "Product Designer",
    company: "Mercor",
    period: "2025 – Now",
    blurb:
      "AI-driven flows for the talent marketplace, connecting candidates and companies through smart matching and review.",
  },
  {
    role: "UX/UI Designer",
    company: "PyCube",
    period: "2025 – Now",
    blurb:
      "Healthcare specimen-tracking suite, end-to-end. Reduced lab handoff errors and shipped a clinician-trusted dashboard.",
  },
  {
    role: "HCI Org Lead",
    company: "Iowa State University",
    period: "2024 – 2025",
    blurb:
      "Led the HCI student org: workshops, mentorship, and Figma craft sessions for incoming designers.",
  },
  {
    role: "UI/UX Designer",
    company: "Sixth Sense Tech",
    period: "2022 – 2023",
    blurb:
      "Consumer interfaces and engineering handoff. Owned design specs from concept through QA.",
  },
  {
    role: "UX Designer",
    company: "Qnaptics",
    period: "2022",
    blurb:
      "Built a full design system from zero: tokens, components, and patterns for a fledgling product team.",
  },
];

function Experience() {
  return (
    <section
      id="experience"
      style={{ padding: "clamp(56px, 7vw, 96px) 0", scrollMarginTop: 96 }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          num="03"
          label="Experience"
          title="Where I've"
          italic="built things"
        />

        <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
          {stops.map((s, i) => {
            const ref = useRef<HTMLLIElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            return (
              <motion.li
                key={`${s.role}-${s.company}`}
                ref={ref}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  borderTop: "0.75px solid var(--border)",
                  padding: "clamp(24px, 3vw, 36px) 0",
                }}
              >
                {/* Inner two-col grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-12">

                  {/* Left — index + period + company */}
                  <div>
                    <span
                      style={{
                        ...mono,
                        fontSize: 11,
                        color: "var(--text-muted)",
                        letterSpacing: "0.2em",
                        display: "block",
                        marginBottom: 10,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} / {s.period}
                    </span>
                    <h3
                      style={{
                        fontFamily: serif,
                        fontWeight: 700,
                        fontSize: "clamp(28px, 3.2vw, 42px)",
                        letterSpacing: "-0.025em",
                        lineHeight: 1.1,
                        color: "var(--text-primary)",
                        margin: 0,
                        transitionProperty: "color, font-style",
                        transitionDuration: "220ms",
                      }}
                      className="group-hover:text-[var(--accent)] group-hover:italic"
                    >
                      {s.company}
                    </h3>
                  </div>

                  {/* Right — role + blurb */}
                  <div className="flex flex-col justify-center gap-3">
                    <span
                      style={{
                        ...mono,
                        fontSize: 11,
                        color: "var(--accent)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {s.role}
                    </span>
                    <p
                      style={{
                        fontFamily: sans,
                        fontSize: 18,
                        color: "var(--text-secondary)",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {s.blurb}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
          {/* closing rule */}
          <li style={{ borderTop: "0.75px solid var(--border)" }} aria-hidden />
        </ul>
      </div>
    </section>
  );
}

/* ─── Education — compact two rows ──────────────────────────────── */
const educations = [
  {
    degree: "M.S. Human-Computer Interaction",
    school: "Iowa State University",
    period: "2023 – 2025",
    note: "the conversion year",
  },
  {
    degree: "B.Arch. Architecture",
    school: "Padmashree Inst. of Architecture",
    period: "2018 – 2023",
    note: "where it started ✿",
  },
];

function Education() {
  return (
    <section
      id="education"
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 96px) 0",
        scrollMarginTop: 96,
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          num="04"
          label="Education"
          title="Two degrees,"
          italic="one throughline"
        />

        <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
          {educations.map((e, i) => {
            const ref = useRef<HTMLLIElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            return (
              <motion.li
                key={e.degree}
                ref={ref}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group"
                style={{
                  padding: "24px 0",
                  borderBottom:
                    i === educations.length - 1
                      ? "none"
                      : "0.75px solid var(--border)",
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h3
                    style={{
                      fontFamily: serif,
                      fontWeight: 600,
                      fontSize: "clamp(19px, 1.8vw, 23px)",
                      letterSpacing: "-0.015em",
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                      margin: 0,
                      transitionProperty: "color",
                      transitionDuration: "220ms",
                    }}
                    className="group-hover:text-[var(--accent)]"
                  >
                    {e.degree}
                  </h3>
                  <span
                    style={{
                      ...mono,
                      fontSize: 10,
                      color: "var(--text-muted)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {e.period}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  {e.school}
                </p>
                <p
                  style={{
                    ...caveat,
                    fontSize: 18,
                    color: "var(--accent)",
                    opacity: 0.8,
                    marginTop: 8,
                  }}
                >
                  {e.note}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ─── Toolbox — categorized skills ──────────────────────────────── */
const skillCols = [
  {
    label: "Research",
    icon: EyeIcon,
    tools: ["Dovetail", "Maze", "UserTesting", "Lookback", "Otter AI"],
  },
  {
    label: "Design",
    icon: PencilSimpleLineIcon,
    tools: ["Figma", "FigJam", "Framer", "Protopie", "Sketch"],
  },
  {
    label: "Code",
    icon: CompassToolIcon,
    tools: ["HTML/CSS", "JavaScript", "React", "Python"],
  },
  {
    label: "Collab",
    icon: HandHeartIcon,
    tools: ["Jira", "Slack", "Miro", "Notion", "Confluence"],
  },
];

function Toolbox() {
  return (
    <section
      id="toolbox"
      style={{ padding: "clamp(56px, 7vw, 96px) 0", scrollMarginTop: 96 }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <SectionHeader
            num="05"
            label="Toolbox"
            title="What I"
            italic="reach for"
          />
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: "0.75px solid var(--text-primary)" }}
        >
          {skillCols.map((col, i) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  padding: "20px 18px 24px",
                  borderRight:
                    i < skillCols.length - 1 ? "0.75px dashed var(--border)" : "none",
                  borderBottom: "0.75px solid var(--text-primary)",
                  position: "relative",
                  transitionProperty: "background-color",
                  transitionDuration: "200ms",
                }}
                className="group hover:bg-[var(--accent-subtle)]"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    style={{
                      ...mono,
                      fontSize: 9,
                      color: "var(--text-muted)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <Icon
                    size={16}
                    weight="regular"
                    color="var(--text-muted)"
                    className="group-hover:text-[var(--accent)] transition-colors duration-200"
                  />
                </div>

                <h3
                  style={{
                    fontFamily: serif,
                    fontSize: "clamp(20px, 2.2vw, 26px)",
                    fontWeight: 600,
                    letterSpacing: "-0.018em",
                    color: "var(--text-primary)",
                    marginBottom: 14,
                    lineHeight: 1.15,
                  }}
                >
                  {col.label}
                </h3>

                <ul className="flex flex-col gap-1.5">
                  {col.tools.map((tool) => (
                    <li
                      key={tool}
                      className="flex items-baseline gap-2"
                      style={{
                        fontFamily: sans,
                        fontSize: 13,
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          backgroundColor: "var(--text-muted)",
                          flexShrink: 0,
                          transform: "translateY(-2px)",
                        }}
                      />
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

/* ─── Off-Duty — chips with reveal ──────────────────────────────── */
const loves = [
  { icon: ForkKnifeIcon, word: "spice", note: "the hotter the better" },
  { icon: MusicNotesIcon, word: "dance", note: "movement is medicine" },
  { icon: AirplaneIcon, word: "travel", note: "for the street food, mostly" },
  { icon: PencilSimpleLineIcon, word: "sketches", note: "plans I'll never build" },
];

function OffDuty() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="off-duty"
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(56px, 7vw, 96px) 0",
        scrollMarginTop: 96,
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          num="06"
          label="Off-Duty"
          title="When I'm not designing, I'm"
          italic="chasing something"
        />

        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 mt-2">
          {loves.map((l, i) => {
            const Icon = l.icon;
            const isActive = active === i;
            return (
              <motion.button
                key={l.word}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                style={{
                  padding: "10px 18px 12px",
                  border: "0.75px solid",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                  background: isActive ? "var(--accent-subtle)" : "var(--bg-elevated)",
                  cursor: "default",
                  borderRadius: 999,
                  transitionProperty: "border-color, background-color, transform",
                  transitionDuration: "200ms",
                  transform: isActive ? "translateY(-2px) rotate(-1deg)" : "translateY(0)",
                }}
              >
                <Icon
                  size={16}
                  weight={isActive ? "bold" : "regular"}
                  color={isActive ? "var(--accent)" : "var(--text-secondary)"}
                />
                <span
                  style={{
                    fontFamily: serif,
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 22,
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                    lineHeight: 1,
                  }}
                >
                  {l.word}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div style={{ marginTop: 20, minHeight: 28 }}>
          <motion.span
            key={active ?? "default"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              ...caveat,
              fontSize: 22,
              color: "var(--text-secondary)",
              opacity: 0.75,
              display: "inline-block",
            }}
          >
            {active !== null ? `↗ ${loves[active].note}` : "hover any word ✦"}
          </motion.span>
        </div>
      </div>
    </section>
  );
}

/* ─── Connect — invitation ──────────────────────────────────────── */
function Connect() {
  return (
    <section
      id="connect"
      className="blueprint-grid relative"
      style={{
        padding: "clamp(72px, 9vw, 120px) 0",
        scrollMarginTop: 96,
        borderTop: "0.75px solid var(--border)",
      }}
    >
      <div
        aria-hidden
        className="hidden md:block absolute"
        style={{ bottom: 30, right: "8%", opacity: 0.3, pointerEvents: "none" }}
      >
        <HandDrawnSketch type="commentBubble" width={90} height={64} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          num="07"
          label="Connect"
          title="Let's build"
          italic="something"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <p
            style={{
              fontFamily: sans,
              fontSize: 18,
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "52ch",
              marginBottom: 28,
            }}
          >
            If you're working on something thoughtful (AI, healthcare, consumer, or
            anything in between), I'd love to hear about it. Coffee chats welcome.
          </p>

          <div className="flex flex-wrap gap-3">
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
              <ArrowUpRightIcon size={11} weight="bold" />
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
      <MyStory />
      <MyApproach />
      <Experience />
      <Education />
      <Toolbox />
      <OffDuty />
      <Connect />
    </motion.div>
  );
}
