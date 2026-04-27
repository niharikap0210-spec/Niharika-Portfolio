import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  MusicNotesIcon,
  AirplaneIcon,
  PencilSimpleLineIcon,
  ForkKnifeIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import HandDrawnSketch from "../components/HandDrawnSketch";
import ConnectSection from "../components/ConnectSection";

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
              transition={{ duration: 0.7, ease: [0.25, 1, 0.4, 1] }}
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
            transition={{ duration: 0.8, ease: [0.25, 1, 0.4, 1] }}
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
                  fontSize: 20,
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
            transition={{ duration: 0.7, ease: [0.25, 1, 0.4, 1] }}
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

        {/* Expand hint */}
        <p
          style={{
            ...mono,
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.18em",
            marginBottom: 24,
            marginTop: -4,
          }}
        >
          — tap any row to expand
        </p>

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
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 1, 0.4, 1] }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr auto 36px",
                    alignItems: "center",
                    columnGap: "clamp(16px, 2vw, 32px)",
                    padding: "clamp(20px, 2.5vw, 28px) 0",
                    borderTop: i === 0 ? "0.75px solid var(--border)" : "none",
                    borderBottom: "0.75px solid var(--border)",
                    background: isOpen ? "var(--bg-secondary)" : "transparent",
                    cursor: "pointer",
                    width: "calc(100% + 24px)",
                    position: "relative",
                    paddingLeft: 12,
                    paddingRight: 12,
                    marginLeft: -12,
                    marginRight: -12,
                    transitionProperty: "background-color",
                    transitionDuration: "200ms",
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
                      fontSize: "clamp(18px, 2vw, 28px)",
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

                  {/* +/− indicator */}
                  <span
                    aria-hidden
                    style={{
                      ...mono,
                      fontSize: 22,
                      color: "var(--accent)",
                      lineHeight: 1,
                      textAlign: "center",
                      transitionProperty: "transform",
                      transitionDuration: "220ms",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      display: "inline-block",
                      opacity: isOpen ? 1 : 0.6,
                    }}
                    className="group-hover:!opacity-100"
                  >
                    +
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
                      transition={{ duration: 0.38, ease: [0.25, 1, 0.4, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "48px 1fr auto 28px",
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
                              fontSize: 20,
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
    role: "UX/UI Designer",
    company: "PyCube",
    period: "Jul 2025 – Present",
    blurb:
      "Healthcare specimen-tracking suite, end-to-end. Reduced lab handoff errors and shipped a clinician-trusted dashboard.",
    logo: "/logos/pycube.png",
  },
  {
    role: "Product Designer",
    company: "Mercor",
    period: "Sep 2025 – Present",
    blurb:
      "AI-driven flows for the talent marketplace, connecting candidates and companies through smart matching and review.",
    logo: "/logos/mercor.png",
  },
  {
    role: "HCI Org Lead",
    company: "Iowa State University",
    period: "Jul 2024 – May 2025",
    blurb:
      "Led the HCI student org: workshops, mentorship, and Figma craft sessions for incoming designers.",
    logo: "/logos/isu.png",
  },
  {
    role: "UX Designer",
    company: "Qnaptics",
    period: "Feb 2023 – Jun 2023",
    blurb:
      "Built a full design system from zero: tokens, components, and patterns for a fledgling product team.",
    logo: "/logos/qnaptics.jpg",
  },
  {
    role: "UI/UX Designer",
    company: "Sixth Sense Tech",
    period: "Oct 2022 – Jan 2023",
    blurb:
      "Consumer interfaces and engineering handoff. Owned design specs from concept through QA.",
    logo: null,
    initials: "SS",
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

        {/* ── Work rows ─────────────────────────────────────────── */}
        <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {stops.map((s, i) => {
            const ref = useRef<HTMLLIElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            return (
              <motion.li
                key={`${s.role}-${s.company}`}
                ref={ref}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 1, 0.4, 1] }}
                whileHover={{ backgroundColor: "rgba(181,146,76,0.05)", transition: { duration: 0.18 } }}
                className="group"
                style={{
                  border: "0.75px solid var(--border)",
                  padding: "clamp(20px, 2.5vw, 28px) clamp(20px, 2.5vw, 32px)",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[96px_1px_1fr_auto] gap-5 lg:gap-8 items-center">

                  {/* Logo / Monogram */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 76 }}>
                    {s.logo ? (
                      <img
                        src={s.logo}
                        alt={s.company}
                        style={{
                          maxWidth: 80,
                          maxHeight: 64,
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          border: "0.75px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "var(--bg-secondary)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: serif,
                            fontStyle: "italic",
                            fontWeight: 700,
                            fontSize: 22,
                            color: "var(--accent)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {s.initials}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Vertical rule */}
                  <div
                    aria-hidden
                    className="hidden lg:block"
                    style={{ width: 1, height: 52, backgroundColor: "var(--border)" }}
                  />

                  {/* Role + Company + Blurb */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ ...mono, fontSize: 10, color: "var(--accent)", letterSpacing: "0.2em" }}>
                      {s.role}
                    </span>
                    <h3
                      style={{
                        fontFamily: serif,
                        fontWeight: 600,
                        fontSize: "clamp(20px, 2vw, 26px)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        color: "var(--text-primary)",
                        margin: 0,
                        transitionProperty: "color",
                        transitionDuration: "200ms",
                      }}
                      className="group-hover:text-[var(--accent)]"
                    >
                      {s.company}
                    </h3>
                    <p
                      style={{
                        fontFamily: sans,
                        fontSize: 17,
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {s.blurb}
                    </p>
                  </div>

                  {/* Period — right col desktop */}
                  <span
                    className="hidden lg:block"
                    style={{
                      ...mono,
                      fontSize: 11,
                      color: "var(--text-muted)",
                      letterSpacing: "0.14em",
                      whiteSpace: "nowrap",
                      alignSelf: "flex-start",
                      paddingTop: 4,
                    }}
                  >
                    {s.period}
                  </span>

                  {/* Period — mobile (below blurb) */}
                  <span
                    className="lg:hidden col-span-full"
                    style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.14em" }}
                  >
                    {s.period}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* ── Education ─────────────────────────────────────────── */}
        <div style={{ marginTop: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div aria-hidden style={{ width: 3, height: 18, backgroundColor: "var(--accent)", flexShrink: 0 }} />
            <span style={{ ...mono, fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.22em" }}>
              Education
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                degree: "M.S. Human-Computer Interaction",
                school: "Iowa State University",
                period: "2023 – 2025",
                note: "the conversion year",
                logo: "/logos/isu.png",
              },
              {
                degree: "B.Arch. Architecture",
                school: "Priyadarshini Inst. of Architecture and Design Studies",
                period: "2018 – 2023",
                note: "where it started ✿",
                logo: "/logos/piads.png",
              },
            ].map((e, i) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.4, 1] }}
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "0.75px solid var(--border)",
                  padding: "clamp(24px, 3vw, 36px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                {/* Top — logo + period */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ height: 56, display: "flex", alignItems: "center" }}>
                    <img
                      src={e.logo}
                      alt={e.school}
                      style={{
                        maxHeight: 52,
                        maxWidth: 110,
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        display: "block",
                      }}
                    />
                  </div>
                  <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.14em", paddingTop: 4 }}>
                    {e.period}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "0.75px solid var(--border)", marginBottom: 20 }} />

                {/* Degree + school + note */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3
                    style={{
                      fontFamily: serif,
                      fontWeight: 600,
                      fontSize: "clamp(18px, 1.8vw, 22px)",
                      letterSpacing: "-0.018em",
                      lineHeight: 1.25,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {e.degree}
                  </h3>
                  <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.55 }}>
                    {e.school}
                  </p>
                  <span style={{ ...caveat, fontSize: 19, color: "var(--accent)", opacity: 0.85, marginTop: 4 }}>
                    {e.note}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── Off-Duty — interest panels ────────────────────────────────── */
const loves = [
  {
    icon: ForkKnifeIcon,
    word: "Spice",
    label: "Cuisine",
    note: "the hotter the better",
    num: "01",
  },
  {
    icon: MusicNotesIcon,
    word: "Dance",
    label: "Movement",
    note: "movement is medicine",
    num: "02",
  },
  {
    icon: AirplaneIcon,
    word: "Travel",
    label: "Wander",
    note: "for the street food, mostly",
    num: "03",
  },
  {
    icon: PencilSimpleLineIcon,
    word: "Sketches",
    label: "Making",
    note: "plans I'll never build",
    num: "04",
  },
];

/* corner tick helper */
function Tick({ top, right, bottom, left }: { top?: number; right?: number; bottom?: number; left?: number }) {
  const isTop = top !== undefined;
  const isLeft = left !== undefined;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: isTop ? top : undefined,
        bottom: !isTop ? bottom : undefined,
        left: isLeft ? left : undefined,
        right: !isLeft ? right : undefined,
        width: 8,
        height: 8,
        borderTop: isTop ? "0.75px solid var(--construction)" : "none",
        borderBottom: !isTop ? "0.75px solid var(--construction)" : "none",
        borderLeft: isLeft ? "0.75px solid var(--construction)" : "none",
        borderRight: !isLeft ? "0.75px solid var(--construction)" : "none",
        pointerEvents: "none",
      }}
    />
  );
}

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
          num="04"
          label="Off-Duty"
          title="When I'm not designing, I'm"
          italic="chasing something"
        />

        {/* Panel grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: "0.75px solid var(--border)", marginTop: 8 }}
        >
          {loves.map((l, i) => {
            const Icon = l.icon;
            const isActive = active === i;
            return (
              <motion.div
                key={l.word}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  position: "relative",
                  padding: "28px 24px 32px",
                  borderRight: i < loves.length - 1 ? "0.75px solid var(--border)" : "none",
                  overflow: "hidden",
                  cursor: "default",
                  minHeight: 220,
                  background: isActive ? "var(--accent-subtle)" : "transparent",
                  transitionProperty: "background-color",
                  transitionDuration: "240ms",
                }}
              >
                {/* Corner ticks */}
                <Tick top={10} left={10} />
                <Tick top={10} right={10} />
                <Tick bottom={10} left={10} />
                <Tick bottom={10} right={10} />

                {/* Ghost background icon */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: -10,
                    right: -10,
                    opacity: isActive ? 0.13 : 0.06,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "300ms",
                    transform: isActive ? "scale(1.06) rotate(-4deg)" : "scale(1) rotate(0deg)",
                    pointerEvents: "none",
                  }}
                >
                  <Icon size={130} weight="thin" color="var(--accent)" />
                </div>

                {/* Number annotation */}
                <span
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: "var(--text-muted)",
                    letterSpacing: "0.22em",
                    opacity: 0.6,
                    display: "block",
                    marginBottom: 32,
                  }}
                >
                  {l.num}
                </span>

                {/* Category label */}
                <span
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    letterSpacing: "0.18em",
                    display: "block",
                    marginBottom: 8,
                    transitionProperty: "color",
                    transitionDuration: "200ms",
                  }}
                >
                  {l.label}
                </span>

                {/* Word */}
                <h3
                  style={{
                    fontFamily: serif,
                    fontStyle: "italic",
                    fontWeight: 700,
                    fontSize: "clamp(26px, 2.8vw, 36px)",
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    lineHeight: 1.05,
                    margin: 0,
                  }}
                >
                  {l.word}
                </h3>

                {/* Note — reveals on hover */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="note"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.22 }}
                      style={{
                        ...caveat,
                        fontSize: 18,
                        color: "var(--accent)",
                        display: "block",
                        marginTop: 10,
                        lineHeight: 1.3,
                      }}
                    >
                      ↗ {l.note}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
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
      <OffDuty />
      <ConnectSection />
    </motion.div>
  );
}
