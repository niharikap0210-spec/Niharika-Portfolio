import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon as ArrowLeft, ArrowRightIcon as ArrowRight } from "@phosphor-icons/react";
import DrawingSheetBorder from "../components/DrawingSheetBorder";
import SectionMarker from "../components/SectionMarker";

const accent = {
  primary: "#4E7396",
  light: "#6B90B3",
  dark: "#2E4F6A",
  surface: "#EBF1F8",
};

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 1, 0.4, 1] }}
    >
      {children}
    </motion.div>
  );
}

const tools = [
  {
    name: "AutoCAD",
    role: "Technical drawing & drafting",
    desc: "Floor plans, sections, elevations, and construction details drawn to scale. AutoCAD is the base layer — every render starts from a dimensionally accurate drawing.",
  },
  {
    name: "SketchUp",
    role: "3D modelling & massing",
    desc: "Spatial models built from the AutoCAD base. SketchUp handles massing, form exploration, and the construction of scene-ready geometry for rendering.",
  },
  {
    name: "Lumion",
    role: "Real-time rendering",
    desc: "Photorealistic output with accurate lighting, atmospheric effects, and landscape conditions. Lumion converts SketchUp geometry into presentation-quality renders.",
  },
  {
    name: "Photoshop",
    role: "Post-production & compositing",
    desc: "Colour grading, people and context overlays, entourage, and final image polish. The gap between a render and a compelling visual is closed here.",
  },
];

const workflow = [
  { num: "01", step: "Technical Drawing", tool: "AutoCAD", desc: "Begin with dimensionally accurate plans and sections. Every spatial decision is grounded in measurable reality — not approximation." },
  { num: "02", step: "3D Massing", tool: "SketchUp", desc: "Extrude the plan into three dimensions. Test massing relationships, roof forms, and section profiles before committing to a final scheme." },
  { num: "03", step: "Scene Setup", tool: "Lumion", desc: "Import the model and assign materials. Configure sun angle, time of day, and atmospheric conditions to match the intended design narrative." },
  { num: "04", step: "Rendering", tool: "Lumion", desc: "Generate high-resolution outputs across key views — exterior approach, interior perspective, aerial massing, and detail shots." },
  { num: "05", step: "Post-Production", tool: "Photoshop", desc: "Add people, vehicles, and entourage. Grade colour, adjust contrast, and composite layers to produce a final image that communicates both space and atmosphere." },
];

export default function RendersCase() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-14"
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: "left",
          position: "fixed",
          top: 56,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: accent.primary,
          zIndex: 50,
        }}
      />

      {/* ── Hero ── */}
      <DrawingSheetBorder
        titleBlock={{ name: "NIHARIKA PUNDLIK", sheet: "ARCHITECTURE / VISUALIZATION" }}
        className="blueprint-grid"
        style={{ padding: "clamp(52px, 8vw, 88px) 0 clamp(44px, 6vw, 72px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Architecture · Visualization" letter="R" className="mb-8" />

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
                  fontSize: "clamp(40px, 5.5vw, 80px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "var(--text-primary)",
                  margin: 0,
                  marginBottom: "clamp(20px, 2.4vw, 32px)",
                }}
              >
                Rendered{" "}
                <span style={{ fontStyle: "italic", color: accent.primary }}>Realities</span>
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
                3D modelling and visualisation in architecture — translating
                technical drawings into spatial narratives that communicate
                design intent before a single brick is laid.
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
                style={{ borderTop: "1px solid var(--border)", paddingTop: 24, gap: 0 }}
              >
                {[
                  { value: "4", label: "Tools Used" },
                  { value: "5", label: "Stage Process" },
                  { value: "B.Arch", label: "Discipline" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      paddingRight: i < 2 ? "clamp(16px, 3vw, 32px)" : 0,
                      borderRight: i < 2 ? "1px solid var(--border)" : "none",
                      paddingLeft: i > 0 ? "clamp(16px, 3vw, 32px)" : 0,
                    }}
                  >
                    <div style={{
                      fontFamily: serif,
                      fontWeight: 700,
                      fontSize: "clamp(24px, 3vw, 40px)",
                      letterSpacing: "-0.03em",
                      color: "var(--text-primary)",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}>
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

      {/* ── Overview ── */}
      <section
        style={{ padding: "clamp(72px, 9vw, 112px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 16 }}>
                01 / About
              </div>
              <h2 style={{
                fontFamily: serif,
                fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 40px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "var(--text-primary)",
                margin: 0,
              }}>
                The Craft
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <p style={{
                fontFamily: sans,
                fontSize: "clamp(17px, 1.4vw, 20px)",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: 24,
              }}>
                Architectural visualisation is the discipline of making the unbuilt
                legible. Before construction begins, a design exists only as drawings,
                models, and the imagination of the people looking at them.
              </p>
              <p style={{ fontFamily: sans, fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.75 }}>
                These renders were produced across studio projects during the B.Arch
                programme — each image a translation of technical drawing into spatial
                narrative. The goal was never photorealism for its own sake, but
                clarity: helping clients, juries, and collaborators inhabit a space
                before it existed.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Metadata strip ── */}
      <div style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}>
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
          style={{ padding: "clamp(32px, 4vw, 48px) clamp(16px, 5vw, 40px)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Modelling", value: "AutoCAD + SketchUp" },
              { label: "Rendering", value: "Lumion" },
              { label: "Post-Production", value: "Photoshop" },
              { label: "Output", value: "Photorealistic Stills" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.2em", marginBottom: 8 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: sans, fontSize: 15, color: "var(--text-primary)", lineHeight: 1.5 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tools ── */}
      <section
        style={{ padding: "clamp(72px, 9vw, 112px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <Reveal>
          <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 40 }}>
            02 / Tools
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 0.07}>
              <div style={{
                padding: "clamp(24px, 3vw, 36px)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                position: "relative",
              }}>
                {/* Corner tick */}
                <span aria-hidden style={{
                  position: "absolute", top: 8, left: 8,
                  width: 8, height: 8,
                  borderTop: `0.75px solid ${accent.primary}55`,
                  borderLeft: `0.75px solid ${accent.primary}55`,
                }} />
                <span aria-hidden style={{
                  position: "absolute", bottom: 8, right: 8,
                  width: 8, height: 8,
                  borderBottom: `0.75px solid ${accent.primary}55`,
                  borderRight: `0.75px solid ${accent.primary}55`,
                }} />

                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                  <h3 style={{
                    fontFamily: serif,
                    fontWeight: 700,
                    fontSize: "clamp(20px, 2vw, 26px)",
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}>
                    {tool.name}
                  </h3>
                  <span style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.18em" }}>
                    {tool.role}
                  </span>
                </div>
                <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                  {tool.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Workflow ── */}
      <div
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "clamp(64px, 8vw, 96px) 0",
        }}
        className="blueprint-grid-subtle"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <Reveal>
            <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 12 }}>
              03 / Workflow
            </div>
            <h2 style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(28px, 3.2vw, 44px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              color: "var(--text-primary)",
              margin: 0,
              marginBottom: "clamp(40px, 5vw, 64px)",
            }}>
              Drawing to{" "}
              <span style={{ fontStyle: "italic", color: accent.primary }}>rendered reality</span>
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {workflow.map((item, i) => (
              <Reveal key={item.num} delay={i * 0.06}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr auto",
                  gap: "clamp(16px, 3vw, 32px)",
                  alignItems: "start",
                  padding: "clamp(24px, 3vw, 36px) 0",
                  borderBottom: "1px solid var(--border)",
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{ ...mono, fontSize: 11, color: accent.primary, letterSpacing: "0.22em", paddingTop: 4 }}>
                    {item.num}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: serif,
                      fontWeight: 700,
                      fontSize: "clamp(18px, 2vw, 24px)",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                      color: "var(--text-primary)",
                      margin: 0,
                      marginBottom: 10,
                    }}>
                      {item.step}
                    </h3>
                    <p style={{ fontFamily: sans, fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                  <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.16em", paddingTop: 6, whiteSpace: "nowrap" }}>
                    {item.tool}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Navigation row ── */}
      <section
        style={{ padding: "clamp(48px, 6vw, 72px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <div className="flex items-center justify-between">
          <Link
            to="/architecture/thesis"
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
            onMouseEnter={(e) => (e.currentTarget.style.color = accent.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <ArrowLeft size={14} weight="regular" />
            Thesis
          </Link>

          <Link
            to="/architecture"
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
            onMouseEnter={(e) => (e.currentTarget.style.color = accent.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            Architecture
            <ArrowRight size={14} weight="regular" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
