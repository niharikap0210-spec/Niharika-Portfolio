import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import HandDrawnSketch from "../components/HandDrawnSketch";
import ConnectSection from "../components/ConnectSection";
import { projects } from "../data/projects";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

/* ─── Home Page ──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=""
    >
      {/* Hero */}
      <HeroSection />

      {/* Projects Grid */}
      <section
        id="projects"
        className="relative py-20"
        style={{ scrollMarginTop: 96 }}
      >
        {/* ── Marginalia - hand-drawn sketches & arrows in the outer margins ── */}
        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: 120, right: "9%", opacity: 0.55, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="approvalStamp"
            width={68}
            height={68}
            delay={0.2}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: "44%", left: "8%", opacity: 0.5, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="commentBubble"
            width={86}
            height={70}
            delay={0.3}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ bottom: 110, right: "8%", opacity: 0.55, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="morphTransition"
            width={118}
            height={76}
            delay={0.4}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: "52%", right: "9%", opacity: 0.45, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="wireframe"
            width={48}
            height={68}
            delay={0.5}
          />
        </div>

        {/* ── Content (max-width constrained) ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          {/* Section header */}
          <div className="mb-14">
            <div
              className="flex items-center justify-between"
              style={{
                borderTop: "0.75px solid var(--border)",
                paddingTop: 14,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.22em",
                  fontWeight: 500,
                }}
              >
                Selected Work
              </span>
              <span
                style={{
                  ...mono,
                  fontSize: 11,
                  color: "var(--text-muted)",
                  letterSpacing: "0.22em",
                }}
              >
                {String(projects.length).padStart(2, "0")} Projects
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(40px, 4.6vw, 56px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Projects<span style={{ color: "var(--accent)" }}>.</span>
            </motion.h2>
          </div>

          {/* ── Intro paragraph + stats row ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14"
            style={{ marginBottom: 56 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.5vw, 22px)",
                lineHeight: 1.55,
                color: "var(--text-secondary)",
                margin: 0,
                maxWidth: 640,
              }}
            >
              A selection of end-to-end product work spanning enterprise SaaS, consumer
              onboarding, and research-led discovery. Each project a study in translating
              a specific constraint into something people actually reach for.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="grid grid-cols-3 gap-6"
              style={{
                borderTop: "0.75px solid var(--border)",
                paddingTop: 18,
                alignSelf: "end",
              }}
            >
              {[
                { value: "04", label: "Case Studies" },
                { value: "2022-26", label: "Active Span" },
                { value: "Web + iOS", label: "Surfaces" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(22px, 2vw, 28px)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      ...mono,
                      fontSize: 9,
                      color: "var(--text-muted)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          {/* ── Tools / Methodologies strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start"
            style={{
              marginTop: 56,
              paddingTop: 22,
              borderTop: "0.75px solid var(--border)",
              position: "relative",
            }}
          >
            <span style={{ position: "absolute", top: -4, left: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
            <span style={{ position: "absolute", top: -4, right: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />

            <span
              style={{
                ...mono,
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
                whiteSpace: "nowrap",
              }}
            >
              Shared Stack
            </span>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                "Figma",
                "Framer",
                "Protopie",
                "SwiftUI",
                "Rive",
                "FigJam",
                "User Research",
                "Design Systems",
                "Prototyping",
              ].map((tool, i, arr) => (
                <span key={tool} style={{ display: "inline-flex", alignItems: "center", gap: 20 }}>
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {tool}
                  </span>
                  {i < arr.length - 1 && (
                    <span
                      aria-hidden
                      style={{
                        width: 3,
                        height: 3,
                        backgroundColor: "var(--text-muted)",
                        opacity: 0.5,
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </span>
              ))}
            </div>

            <span
              style={{
                ...mono,
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
                whiteSpace: "nowrap",
              }}
            >
              09 Tools
            </span>
          </motion.div>

          {/* Section footer - light end marker (tools strip above serves as the ruling line) */}
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 22 }}
          >
            <span
              style={{
                ...mono,
                fontSize: 9,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
                opacity: 0.7,
              }}
            >
              End of Sheet
            </span>
            <span
              style={{
                ...mono,
                fontSize: 9,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
                opacity: 0.7,
              }}
            >
              A-{String(projects.length).padStart(2, "0")} / A-{String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* Let's Connect */}
      <ConnectSection />
    </motion.div>
  );
}
