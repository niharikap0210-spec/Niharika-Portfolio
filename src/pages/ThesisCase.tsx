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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 1, 0.4, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Reusable image block with drawing-sheet border treatment */
function SheetImage({
  src, alt, label, caption, delay = 0, aspect,
}: {
  src: string; alt: string; label: string; caption?: string;
  delay?: number; aspect?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.4, 1] }}
      style={{ margin: 0, position: "relative" }}
    >
      {/* Drawing-sheet eyebrow */}
      <div style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        borderTop: `0.75px solid ${accent.primary}55`,
        paddingTop: 8,
        marginBottom: 10,
      }}>
        <span style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.2em" }}>
          {label}
        </span>
        <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.14em" }}>
          B.ARCH THESIS · 2024
        </span>
      </div>

      {/* Image wrapper */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid var(--border)",
        aspectRatio: aspect ?? "auto",
      }}>
        {/* Corner ticks */}
        {[
          { top: 0, left: 0, borderTop: `0.75px solid ${accent.primary}66`, borderLeft: `0.75px solid ${accent.primary}66` },
          { top: 0, right: 0, borderTop: `0.75px solid ${accent.primary}66`, borderRight: `0.75px solid ${accent.primary}66` },
          { bottom: 0, left: 0, borderBottom: `0.75px solid ${accent.primary}66`, borderLeft: `0.75px solid ${accent.primary}66` },
          { bottom: 0, right: 0, borderBottom: `0.75px solid ${accent.primary}66`, borderRight: `0.75px solid ${accent.primary}66` },
        ].map((style, i) => (
          <span key={i} aria-hidden style={{ position: "absolute", width: 10, height: 10, zIndex: 2, pointerEvents: "none", ...style }} />
        ))}

        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Bottom gradient overlay per design system */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
      </div>

      {caption && (
        <figcaption style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--text-muted)",
          lineHeight: 1.5,
          marginTop: 10,
        }}>
          {caption}
        </figcaption>
      )}
    </motion.figure>
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
          top: 56, left: 0, right: 0,
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
              <div className="grid grid-cols-3" style={{ borderTop: "1px solid var(--border)", paddingTop: 24, gap: 0 }}>
                {[
                  { value: "20", label: "Week Thesis" },
                  { value: "1:1", label: "Lead Role" },
                  { value: "B.Arch", label: "Discipline" },
                ].map((s, i) => (
                  <div key={s.label} style={{
                    paddingRight: i < 2 ? "clamp(16px, 3vw, 32px)" : 0,
                    borderRight: i < 2 ? "1px solid var(--border)" : "none",
                    paddingLeft: i > 0 ? "clamp(16px, 3vw, 32px)" : 0,
                  }}>
                    <div style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(24px, 3vw, 40px)",
                      letterSpacing: "-0.03em",
                      color: "var(--text-primary)",
                      lineHeight: 1, marginBottom: 8,
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

      {/* ── Hero render — full-width aerial ── */}
      <div style={{ position: "relative", width: "100%", maxHeight: "72vh", overflow: "hidden" }}>
        <motion.img
          src="/thesis/img-11.jpg"
          alt="Aerial render of the Public Realm thesis project — full site view"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.4, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", maxHeight: "72vh" }}
        />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 30%)",
        }} />
        <div style={{
          position: "absolute", bottom: "clamp(16px, 3vw, 28px)", left: "clamp(16px, 5vw, 40px)",
          ...mono, fontSize: 9, color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em",
        }}>
          Aerial View · Sonegao, Nagpur · 2024
        </div>
      </div>

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
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 40px)",
                letterSpacing: "-0.025em", lineHeight: 1.15,
                color: "var(--text-primary)", margin: 0,
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
                lineHeight: 1.8, marginBottom: 24,
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

        {/* Introduction sheet */}
        <div style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
          <SheetImage
            src="/thesis/img-05.png"
            alt="Thesis introduction and synopsis sheet"
            label="Sheet 01 · Introduction & Synopsis"
            caption="Placemaking framework, design principles, objectives, and the case for public realm intervention."
            delay={0.1}
          />
        </div>
      </section>

      {/* ── Site Plan ── */}
      <div style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "clamp(64px, 8vw, 96px) 0",
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <Reveal>
            <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 40 }}>
              02 / Site Plan
            </div>
          </Reveal>

          <SheetImage
            src="/thesis/img-10.png"
            alt="Site plan and aerial view of the full thesis project"
            label="Sheet 07 · Site Plan & View · Sonegao, Nagpur"
            caption="Master site plan showing programme distribution, site boundaries, and the aerial render of the proposed public realm."
          />
        </div>
      </div>

      {/* ── Site Analysis ── */}
      <section
        style={{ padding: "clamp(64px, 8vw, 96px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <Reveal>
          <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 40 }}>
            03 / Site Analysis
          </div>
        </Reveal>

        <SheetImage
          src="/thesis/img-04.png"
          alt="Site analysis sheet for Sonegao, Nagpur"
          label="Sheet 06 · Site Analysis · Sonegao, Nagpur"
          caption="Climate, geology, SWOT analysis, soil conditions, and site surroundings informing the design response."
        />
      </section>

      {/* ── Case Study Research ── */}
      <div style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "clamp(64px, 8vw, 96px) 0",
      }} className="blueprint-grid-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <Reveal>
            <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 12 }}>
              04 / Case Studies
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(26px, 3vw, 40px)",
              letterSpacing: "-0.025em", lineHeight: 1.2,
              color: "var(--text-primary)", margin: 0,
              marginBottom: "clamp(36px, 4vw, 56px)",
            }}>
              Learning from existing{" "}
              <span style={{ fontStyle: "italic", color: accent.primary }}>public realms</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SheetImage
              src="/thesis/img-15.png"
              alt="Case study — Dilli Haat INA, Delhi"
              label="Sheet 02 · Case Study · Dilli Haat INA, Delhi"
              caption="Analysis of integrated cultural marketplace — site response, user groups, section through the mallah."
              delay={0}
              aspect="4/3"
            />
            <SheetImage
              src="/thesis/img-14.png"
              alt="Case study — Riverfront Development, Ahmedabad"
              label="Sheet 03 · Case Study · Riverfront Development, Ahmedabad"
              caption="Master plan, street network, recreation zones, and development sites along the Sabarmati."
              delay={0.08}
              aspect="4/3"
            />
            <SheetImage
              src="/thesis/img-02.png"
              alt="Case study — Manek Chowk, Sarafa, Chandni Chowk"
              label="Sheet 04 · Case Study · Manek Chowk · Sarafa · Chandni Chowk"
              caption="Urban chowk analysis across Ahmedabad, Indore, and Delhi — character, activity, and design elements."
              delay={0.04}
              aspect="4/3"
            />
            <SheetImage
              src="/thesis/img-07.png"
              alt="Case study — Select City Walk and Chappan, Indore"
              label="Sheet 05 · Case Study · Select City Walk · Chappan"
              caption="Design elements, footfall patterns, and pedestrian experience across two contrasting public places."
              delay={0.12}
              aspect="4/3"
            />
          </div>
        </div>
      </div>

      {/* ── Building Programmes ── */}
      <section
        style={{ padding: "clamp(64px, 8vw, 96px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <Reveal>
          <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 40 }}>
            05 / Building Programmes
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: "clamp(32px, 4vw, 48px)" }}>
          <SheetImage
            src="/thesis/img-08.png"
            alt="Activity Centre plans, sections, and renders"
            label="Sheet 08 · Activity Centre"
            caption="Circular form, vertical RCC fins, spiralling roof plan, and terrace seating — rendered exterior view."
            delay={0}
          />
          <SheetImage
            src="/thesis/img-01.png"
            alt="Yoga & Meditation Centre with sensory garden"
            label="Sheet 09 · Yoga & Meditation Centre"
            caption="Waffle slab detail, elevation, section, floor plan, and sensory garden renders."
            delay={0.08}
          />
        </div>

        <SheetImage
          src="/thesis/img-12.png"
          alt="Book Cafe, Event Centre, and Workshop plans and renders"
          label="Sheet 10 · Book Cafe · Event Centre · Workshop"
          caption="Sunken workshop, glass-grooved roof, folded plate structure — plans, sections, and exterior renders."
          delay={0.12}
        />
      </section>

      {/* ── Views & Renders ── */}
      <div style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "clamp(64px, 8vw, 96px) 0",
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <Reveal>
            <div style={{ ...mono, fontSize: 9, color: accent.primary, letterSpacing: "0.22em", marginBottom: 12 }}>
              06 / Views & Renders
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(26px, 3vw, 40px)",
              letterSpacing: "-0.025em", lineHeight: 1.2,
              color: "var(--text-primary)", margin: 0,
              marginBottom: "clamp(36px, 4vw, 56px)",
            }}>
              The space{" "}
              <span style={{ fontStyle: "italic", color: accent.primary }}>as rendered</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SheetImage
              src="/thesis/img-03.png"
              alt="Rendered views — entrance pavilion, sculpture garden, HAT, celebration pavilion, levels and steps seating"
              label="Sheet 11 · Views — Pavilions & Landscape"
              caption="Entrance pavilion, sculpture garden, HAT, celebration pavilion, and levels & steps seating with landscape."
              delay={0}
            />
            <SheetImage
              src="/thesis/img-06.png"
              alt="Rendered views — fountain, pit, skate park, aerial site view"
              label="Sheet 12 · Views — Active Zones & Aerial"
              caption="Fountain, pit, skate park, view from the skate park, and aerial overview of the full site."
              delay={0.08}
            />
          </div>

          {/* Street plan */}
          <div style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
            <SheetImage
              src="/thesis/img-09.png"
              alt="Street plan — proposed module, characteristics, and renders"
              label="Sheet 13 · Street Plan"
              caption="Proposed street module with hardscape elements, softscape planters, and street furniture integration."
              delay={0.12}
            />
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
            07 / Disciplines
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
                  fontFamily: serif, fontWeight: 700,
                  fontSize: "clamp(17px, 1.6vw, 20px)",
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)", marginBottom: 10,
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
              08 / Key Takeaways
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(28px, 3.2vw, 44px)",
              letterSpacing: "-0.025em", lineHeight: 1.2,
              color: "var(--text-primary)", margin: 0,
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
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(18px, 2vw, 24px)",
                      letterSpacing: "-0.015em", lineHeight: 1.25,
                      color: "var(--text-primary)", margin: 0, marginBottom: 12,
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
              display: "inline-flex", alignItems: "center", gap: 10,
              ...mono, fontSize: 11, letterSpacing: "0.2em",
              color: "var(--text-secondary)", textDecoration: "none",
              transitionProperty: "color", transitionDuration: "200ms",
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
              display: "inline-flex", alignItems: "center", gap: 10,
              ...mono, fontSize: 11, letterSpacing: "0.2em",
              color: "var(--text-secondary)", textDecoration: "none",
              transitionProperty: "color", transitionDuration: "200ms",
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
