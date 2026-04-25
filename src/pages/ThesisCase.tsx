import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon as ArrowLeft, ArrowRightIcon as ArrowRight } from "@phosphor-icons/react";
import DrawingSheetBorder from "../components/DrawingSheetBorder";
import SectionMarker from "../components/SectionMarker";

const accent = {
  primary: "#9B7A52",
  light: "#B8966D",
  dark: "#6B5238",
  surface: "#F6EEE5",
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

export default function ThesisCase() {
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
        titleBlock={{ name: "NIHARIKA PUNDLIK", sheet: "ARCHITECTURE / THESIS" }}
        className="blueprint-grid"
        style={{ padding: "clamp(52px, 8vw, 88px) 0 clamp(44px, 6vw, 72px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Architecture · Thesis" letter="T" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em", marginBottom: 20 }}
              >
                B.Arch Thesis · SVITS Indore · 2024 · 20 Weeks
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
                Public Realm:{" "}
                <span style={{ fontStyle: "italic", color: accent.primary }}>Beyond</span>
                {" "}the Streets
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
                Redefining public spaces, reviving community life — an architectural
                thesis exploring how underutilised urban land can become a catalyst
                for social cohesion and belonging.
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
                  { value: "20", label: "Week Thesis" },
                  { value: "1:1", label: "Lead Role" },
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
                01 / Overview
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
                The Project
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
                An architectural initiative aimed at revitalising urban spaces by creating
                inclusive, sustainable, and vibrant public areas that foster community
                interactions and enhance quality of life.
              </p>
              <p style={{ fontFamily: sans, fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.75 }}>
                This thesis explores transforming underutilised urban spaces into vibrant
                public realms through placemaking, sustainable design, and inclusive spatial
                planning — to foster community interactions, enhance social cohesion, and
                improve urban life quality.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Project metadata strip ── */}
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
              { label: "Role", value: "Lead Architect, Researcher & Designer" },
              { label: "Type", value: "Individual Thesis" },
              { label: "Timeline", value: "20 Weeks" },
              { label: "Tools", value: "AutoCAD · SketchUp · Lumion · Photoshop" },
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

      {/* ── Disciplines ── */}
      <section
        style={{ padding: "clamp(72px, 9vw, 112px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <Reveal>
          <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 40 }}>
            02 / Disciplines
          </div>
        </Reveal>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            {
              label: "Urban Design",
              desc: "Designing at the scale of the street, the block, and the neighbourhood — prioritising movement, gathering, and legibility.",
            },
            {
              label: "Conceptualization",
              desc: "Developing a design argument from first principles — translating research insight into spatial form and programme.",
            },
            {
              label: "Architectural Planning",
              desc: "Coordinating programme, structure, and systems into a coherent built proposal across multiple scales.",
            },
            {
              label: "3D Modelling",
              desc: "Building detailed spatial models in SketchUp to test section, massing, and material relationships before committing to drawings.",
            },
            {
              label: "Rendering",
              desc: "Communicating design intent through photorealistic Lumion renders with accurate light, material, and landscape conditions.",
            },
            {
              label: "Placemaking",
              desc: "Designing for identity and belonging — ensuring the space reflects and strengthens the community it serves.",
            },
          ].map((d, i) => (
            <Reveal key={d.label} delay={i * 0.05}>
              <div style={{
                padding: "clamp(24px, 3vw, 36px) clamp(16px, 2.5vw, 28px)",
                borderBottom: "1px solid var(--border)",
                borderRight: (i % 3 !== 2) ? "1px solid var(--border)" : "none",
              }}>
                <div style={{
                  fontFamily: serif,
                  fontWeight: 700,
                  fontSize: "clamp(17px, 1.6vw, 20px)",
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)",
                  marginBottom: 10,
                }}>
                  {d.label}
                </div>
                <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                  {d.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Key takeaways ── */}
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
              03 / Key Takeaways
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
              Where architecture{" "}
              <span style={{ fontStyle: "italic", color: accent.primary }}>meets design thinking</span>
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              {
                num: "01",
                title: "Placemaking prioritises engagement",
                body: "Just as UX design centres the user, architectural placemaking centres the inhabitant — every spatial decision is tested against how people will actually dwell, move, and interact with the space.",
              },
              {
                num: "02",
                title: "Sustainability and efficiency align",
                body: "Passive design strategies — orientation, natural ventilation, daylight — reduce energy load without compromising quality. The most sustainable solution is often the most elegant one.",
              },
              {
                num: "03",
                title: "Human-centered thinking drives both disciplines",
                body: "The translation from architecture to HCI was natural because both share a core methodology: observe how people behave in a space, identify friction, redesign until the friction disappears.",
              },
              {
                num: "04",
                title: "Context informs meaningful design",
                body: "A public space cannot be lifted from one city and planted in another. Site history, climate, culture, and existing movement patterns are the raw material — not constraints to work around.",
              },
              {
                num: "05",
                title: "Iteration refines functionality",
                body: "No design survives contact with a real site unchanged. Iteration — through model, section, and drawing — is how spatial hypotheses get pressure-tested and resolved.",
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 0.06}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: "clamp(16px, 3vw, 32px)",
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
                      marginBottom: 12,
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: sans, fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
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
            <ArrowLeft size={14} weight="regular" />
            Architecture
          </Link>

          <Link
            to="/architecture/renders"
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
            Rendered Realities
            <ArrowRight size={14} weight="regular" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
