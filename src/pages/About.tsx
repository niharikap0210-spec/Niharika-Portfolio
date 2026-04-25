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
  CompassToolIcon,
  EyeIcon,
  HandHeartIcon,
  RulerIcon,
  SparkleIcon,
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

/* ─── Manifesto — How I design ──────────────────────────────────── */
const principles = [
  {
    icon: EyeIcon,
    rom: "I",
    title: "Research before pixels.",
    body: "Every flow starts with a real human problem. If I can't name the user, the pain, and the moment — I'm not ready to draw.",
    aside: "watch first, sketch second",
  },
  {
    icon: SparkleIcon,
    rom: "II",
    title: "Quiet over clever.",
    body: "The best UI is the one nobody notices. I'd rather solve a problem invisibly than show off a pattern.",
    aside: "remove, don't add",
  },
  {
    icon: HandHeartIcon,
    rom: "III",
    title: "Add a little spice.",
    body: "Joy is a function, not a flourish. A small surprise — a Caveat note, a soft motion, an honest empty state — turns a tool into a memory.",
    aside: "delight is data",
  },
  {
    icon: RulerIcon,
    rom: "IV",
    title: "Measure twice, cut once.",
    body: "Architectural rigor on every decision. I sweat the gutters, the type scale, the dead pixels at 11pm — because details compound.",
    aside: "the brief is sacred",
  },
  {
    icon: CompassToolIcon,
    rom: "V",
    title: "Build in plain sight.",
    body: "Prototype rough, share early, ship the smallest honest thing. Feedback loops > pitch decks.",
    aside: "rough draft beats no draft",
  },
];

function Manifesto() {
  return (
    <section
      className="blueprint-grid-subtle relative"
      style={{
        padding: "clamp(72px, 9vw, 120px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div
        aria-hidden
        className="hidden md:block absolute"
        style={{ top: 60, right: "7%", opacity: 0.35, pointerEvents: "none" }}
      >
        <HandDrawnSketch type="commentBubble" width={92} height={64} />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 14 }}>
            ✦ How I design ✦ · A short manifesto
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(34px, 4.4vw, 60px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
              maxWidth: "20ch",
            }}
          >
            Five things I{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>believe</span>.
          </h2>
        </motion.div>

        <ol className="relative" style={{ paddingLeft: 0 }}>
          {/* Vertical accent rule */}
          <span
            aria-hidden
            className="hidden md:block"
            style={{
              position: "absolute",
              left: 56,
              top: 12,
              bottom: 12,
              width: 0.75,
              backgroundColor: "var(--construction)",
            }}
          />
          {principles.map((p, i) => {
            const ref = useRef<HTMLLIElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            const Icon = p.icon;
            return (
              <motion.li
                key={p.rom}
                ref={ref}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group relative"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(60px, 96px) 1fr",
                  columnGap: 32,
                  rowGap: 6,
                  padding: "26px 0",
                  borderBottom:
                    i === principles.length - 1 ? "none" : "0.75px dashed var(--border)",
                }}
              >
                {/* Roman + icon */}
                <div className="flex flex-col items-start md:items-center md:justify-start gap-3">
                  <span
                    style={{
                      fontFamily: serif,
                      fontStyle: "italic",
                      fontWeight: 700,
                      fontSize: 30,
                      color: "var(--accent)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      transitionProperty: "transform",
                      transitionDuration: "200ms",
                    }}
                    className="group-hover:translate-x-[-2px]"
                  >
                    {p.rom}.
                  </span>
                  <Icon
                    size={18}
                    weight="regular"
                    color="var(--text-muted)"
                    className="hidden md:block"
                  />
                </div>

                {/* Body */}
                <div>
                  <h3
                    style={{
                      fontFamily: serif,
                      fontWeight: 600,
                      fontSize: "clamp(22px, 2.4vw, 30px)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      color: "var(--text-primary)",
                      marginBottom: 8,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: "clamp(14px, 1.25vw, 16px)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      maxWidth: "58ch",
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
                    — {p.aside}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ─── Studio Log — daily contractor-style status ────────────────── */
const logEntries = [
  {
    icon: BriefcaseIcon,
    label: "Designing",
    value: "Mercor + PyCube",
    note: "AI flows · healthcare UX",
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
    value: "Bollywood + lo-fi",
    note: "always moving to a beat",
  },
  {
    icon: ForkKnifeIcon,
    label: "Sipping",
    value: "Way too much chai",
    note: "if it doesn't burn, I'm out",
  },
];

function StudioLog() {
  return (
    <section style={{ padding: "clamp(72px, 9vw, 110px) 0" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
        >
          {/* Log header — like a stamped title block */}
          <div
            style={{
              borderTop: "0.75px solid var(--text-primary)",
              borderBottom: "0.75px solid var(--text-primary)",
              padding: "12px 0",
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div className="flex items-center gap-3">
              <span style={{ ...mono, fontSize: 10, color: "var(--text-primary)" }}>
                ✦ Studio Log
              </span>
              <span
                style={{
                  ...mono,
                  fontSize: 9,
                  color: "var(--text-muted)",
                  letterSpacing: "0.18em",
                }}
              >
                · Entry 042
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)" }}>
                2026 · Q2 · Virginia
              </span>
              <span
                className="status-pulse"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "var(--status-green)",
                  border: "1.25px solid var(--accent)",
                  display: "inline-block",
                }}
                aria-hidden
              />
            </div>
          </div>

          <div>
            {logEntries.map((entry, i) => {
              const Icon = entry.icon;
              return (
                <motion.div
                  key={entry.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px minmax(110px, 140px) 1fr auto",
                    alignItems: "center",
                    gap: 18,
                    padding: "18px 0",
                    borderBottom: "0.75px solid var(--border)",
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
                  <Icon size={18} weight="regular" color="var(--text-muted)" />
                  <span
                    style={{
                      ...mono,
                      fontSize: 10,
                      color: "var(--text-muted)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {entry.label}
                  </span>
                  <span
                    style={{
                      fontFamily: serif,
                      fontWeight: 500,
                      fontStyle: "italic",
                      fontSize: "clamp(17px, 1.7vw, 21px)",
                      letterSpacing: "-0.01em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {entry.value}
                  </span>
                  <span
                    style={{
                      ...caveat,
                      fontSize: 16,
                      color: "var(--text-secondary)",
                      opacity: 0.7,
                      textAlign: "right",
                    }}
                    className="hidden sm:block"
                  >
                    {entry.note}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Off-duty — typographic poster ─────────────────────────────── */
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
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(72px, 9vw, 120px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 18 }}
        >
          ✦ Off-duty
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: serif,
            fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 80px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            marginBottom: 28,
          }}
        >
          When I'm not designing,
          <br />
          I'm{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
            chasing
          </span>{" "}
          something.
        </motion.h2>

        {/* Word chips, large */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 mt-12">
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
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                style={{
                  padding: "12px 22px 14px",
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
                  size={18}
                  weight={isActive ? "bold" : "regular"}
                  color={isActive ? "var(--accent)" : "var(--text-secondary)"}
                />
                <span
                  style={{
                    fontFamily: serif,
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 26,
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

        {/* Caveat reveal */}
        <div style={{ marginTop: 32, minHeight: 30 }}>
          <motion.span
            key={active ?? "default"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              ...caveat,
              fontSize: 24,
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

/* ─── The Pivot — framed elevation drawing ──────────────────────── */
function ThePivot() {
  return (
    <section style={{ padding: "clamp(72px, 9vw, 120px) 0" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative"
          style={{
            border: "0.75px solid var(--construction)",
            padding: "clamp(28px, 4vw, 56px)",
            position: "relative",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          {/* Title block */}
          <div
            style={{
              position: "absolute",
              top: -1,
              left: -1,
              right: -1,
              borderBottom: "0.75px solid var(--construction)",
              padding: "10px 18px",
              backgroundColor: "var(--bg-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)" }}>
              ELEVATION · The Pivot
            </span>
            <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)" }}>
              SCALE 1:1 · 2018—NOW
            </span>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center"
            style={{ marginTop: 36 }}
          >
            {/* Architecture */}
            <div className="text-center md:text-right">
              <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 8 }}>
                2018 — 2023
              </p>
              <h3
                style={{
                  fontFamily: serif,
                  fontWeight: 700,
                  fontSize: "clamp(26px, 3vw, 36px)",
                  letterSpacing: "-0.025em",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                }}
              >
                Architecture
              </h3>
              <p
                style={{
                  ...caveat,
                  fontSize: 18,
                  color: "var(--accent)",
                  opacity: 0.8,
                  marginTop: 4,
                }}
              >
                walls + light
              </p>
              <div className="mt-5 flex justify-center md:justify-end opacity-70">
                <HandDrawnSketch type="floorPlan" width={100} height={70} />
              </div>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center gap-2" aria-hidden>
              <span style={{ ...mono, fontSize: 8, color: "var(--accent)" }}>
                same brain
              </span>
              <svg width="92" height="36" viewBox="0 0 92 36" fill="none" className="hidden md:block">
                <path
                  d="M4 18 Q 46 4, 88 18"
                  stroke="var(--accent)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="2 4"
                />
                <path
                  d="M80 12 L88 18 L80 24"
                  stroke="var(--accent)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <svg width="36" height="80" viewBox="0 0 36 80" fill="none" className="md:hidden">
                <path
                  d="M18 4 Q 4 40, 18 76"
                  stroke="var(--accent)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="2 4"
                />
                <path
                  d="M12 68 L18 76 L24 68"
                  stroke="var(--accent)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Product */}
            <div className="text-center md:text-left">
              <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 8 }}>
                2023 — Now
              </p>
              <h3
                style={{
                  fontFamily: serif,
                  fontWeight: 700,
                  fontSize: "clamp(26px, 3vw, 36px)",
                  letterSpacing: "-0.025em",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                }}
              >
                Product Design
              </h3>
              <p
                style={{
                  ...caveat,
                  fontSize: 18,
                  color: "var(--accent)",
                  opacity: 0.8,
                  marginTop: 4,
                }}
              >
                flows + friction
              </p>
              <div className="mt-5 flex justify-center md:justify-start opacity-70">
                <HandDrawnSketch type="wireframe" width={56} height={70} />
              </div>
            </div>
          </div>

          {/* Bottom title-block */}
          <div
            style={{
              position: "absolute",
              bottom: -1,
              left: -1,
              right: -1,
              borderTop: "0.75px solid var(--construction)",
              padding: "8px 18px",
              backgroundColor: "var(--bg-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ ...mono, fontSize: 8, color: "var(--text-muted)" }}>
              SHEET 02 · TRANSITION
            </span>
            <span style={{ ...caveat, fontSize: 14, color: "var(--accent)", opacity: 0.8 }}>
              same hands, new tools
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Toolkit — drawing legend / spec sheet ─────────────────────── */
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

function Toolkit() {
  return (
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(72px, 9vw, 110px) 0",
        borderTop: "0.75px solid var(--border)",
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 14 }}>
            ✦ Toolkit · Drawing legend
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
            }}
          >
            What I{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>reach for</span>.
          </h2>
        </motion.div>

        {/* 4 columns spec sheet */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: "0.75px solid var(--text-primary)" }}
        >
          {skillCols.map((col, i) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  padding: "20px 18px 24px",
                  borderRight:
                    i < skillCols.length - 1 ? "0.75px dashed var(--border)" : "none",
                  borderBottom: "0.75px solid var(--text-primary)",
                  position: "relative",
                }}
                className="group hover:bg-[var(--accent-subtle)] transition-colors duration-200"
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
                    marginBottom: 16,
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

/* ─── Track Record — stamped vertical log ───────────────────────── */
const stops = [
  {
    role: "Product Designer",
    company: "Mercor",
    period: "'25 — Now",
    blurb: "AI-driven flows for the talent marketplace.",
    initial: "M",
  },
  {
    role: "UX/UI Designer",
    company: "PyCube",
    period: "'25 — Now",
    blurb: "Healthcare specimen-tracking, end-to-end.",
    initial: "P",
  },
  {
    role: "HCI Org Lead",
    company: "Iowa State University",
    period: "'24 — '25",
    blurb: "Workshops, mentorship, Figma craft.",
    initial: "I",
  },
  {
    role: "UI/UX Designer",
    company: "Sixth Sense Tech",
    period: "'22 — '23",
    blurb: "Consumer interfaces; eng handoff.",
    initial: "S",
  },
  {
    role: "UX Designer",
    company: "Qnaptics",
    period: "'22",
    blurb: "Built a design system from zero.",
    initial: "Q",
  },
];

function TrackRecord() {
  return (
    <section style={{ padding: "clamp(72px, 9vw, 110px) 0" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 14 }}>
            ✦ Track record · 05 stops
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
            }}
          >
            Where I've{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>built things</span>.
          </h2>
        </motion.div>

        <div className="relative">
          {/* connector line */}
          <span
            aria-hidden
            className="hidden sm:block"
            style={{
              position: "absolute",
              left: 28,
              top: 28,
              bottom: 28,
              width: 0.75,
              backgroundColor: "var(--construction)",
              opacity: 0.6,
            }}
          />

          {stops.map((s, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group"
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  columnGap: 22,
                  alignItems: "start",
                  padding: "22px 0",
                  borderBottom:
                    i === stops.length - 1 ? "none" : "0.75px solid var(--border)",
                  transitionProperty: "background-color",
                  transitionDuration: "200ms",
                }}
              >
                {/* Stamp */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    border: "0.75px solid var(--construction)",
                    backgroundColor: "var(--bg-elevated)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 1,
                    transitionProperty: "border-color, background-color",
                    transitionDuration: "200ms",
                  }}
                  className="group-hover:!border-[var(--accent)] group-hover:!bg-[var(--accent-subtle)]"
                >
                  <span
                    style={{
                      fontFamily: serif,
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: 22,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                    }}
                    className="group-hover:!text-[var(--accent)] transition-colors duration-200"
                  >
                    {s.initial}
                  </span>
                  {/* outer ring tick */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      border: "0.5px dashed var(--construction)",
                      opacity: 0.5,
                    }}
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <h3
                      style={{
                        fontFamily: serif,
                        fontWeight: 600,
                        fontSize: "clamp(18px, 1.8vw, 22px)",
                        letterSpacing: "-0.015em",
                        color: "var(--text-primary)",
                        lineHeight: 1.25,
                      }}
                    >
                      {s.role}
                    </h3>
                    <span
                      style={{
                        fontFamily: sans,
                        fontSize: 14,
                        color: "var(--text-secondary)",
                      }}
                    >
                      · {s.company}
                    </span>
                    <span
                      style={{
                        ...mono,
                        fontSize: 9,
                        color: "var(--text-muted)",
                        marginLeft: "auto",
                      }}
                    >
                      {s.period}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      maxWidth: "60ch",
                    }}
                  >
                    {s.blurb}
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

/* ─── Education — credential seals ──────────────────────────────── */
function Education() {
  const items = [
    {
      degree: "M.S. Human-Computer Interaction",
      school: "Iowa State University",
      period: "2023 — 2025",
      seal: "MS",
      caveat: "the conversion year",
    },
    {
      degree: "B.Arch. Architecture",
      school: "Padmashree Inst. of Architecture",
      period: "2018 — 2023",
      seal: "BA",
      caveat: "where it started ✿",
    },
  ];

  return (
    <section
      className="blueprint-grid-subtle"
      style={{
        padding: "clamp(72px, 9vw, 110px) 0",
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
          className="mb-12"
        >
          <p style={{ ...mono, fontSize: 10, color: "var(--text-muted)", marginBottom: 14 }}>
            ✦ Education · 02 credentials
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
            }}
          >
            Two degrees,{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              one throughline
            </span>
            .
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                position: "relative",
                padding: "28px 28px 32px",
                backgroundColor: "var(--bg-elevated)",
                border: "0.75px solid var(--border)",
                transitionProperty: "border-color",
                transitionDuration: "200ms",
              }}
              className="group hover:!border-[var(--accent)]"
            >
              {/* corner ticks */}
              {[
                { top: 8, left: 8 },
                { top: 8, right: 8 },
                { bottom: 8, left: 8 },
                { bottom: 8, right: 8 },
              ].map((pos, j) => (
                <span
                  key={j}
                  aria-hidden
                  style={{
                    position: "absolute",
                    width: 6,
                    height: 6,
                    border: "0.75px solid var(--construction)",
                    ...pos,
                  }}
                />
              ))}

              {/* Seal */}
              <div className="flex items-start justify-between mb-5">
                <p
                  style={{
                    ...mono,
                    fontSize: 10,
                    color: "var(--text-muted)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {edu.period}
                </p>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "0.75px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      border: "0.5px dashed var(--construction)",
                      opacity: 0.6,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: serif,
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: 14,
                      color: "var(--accent)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {edu.seal}
                  </span>
                </div>
              </div>

              <h3
                style={{
                  fontFamily: serif,
                  fontWeight: 600,
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  letterSpacing: "-0.018em",
                  color: "var(--text-primary)",
                  lineHeight: 1.25,
                  marginBottom: 6,
                }}
              >
                {edu.degree}
              </h3>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  marginBottom: 14,
                }}
              >
                {edu.school}
              </p>
              <p
                style={{
                  ...caveat,
                  fontSize: 18,
                  color: "var(--accent)",
                  opacity: 0.8,
                }}
              >
                — {edu.caveat}
              </p>
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
      style={{ padding: "clamp(80px, 10vw, 130px) 0" }}
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
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>something</span>.
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
      <Manifesto />
      <StudioLog />
      <OffDuty />
      <ThePivot />
      <Toolkit />
      <TrackRecord />
      <Education />
      <SignOff />
    </motion.div>
  );
}
