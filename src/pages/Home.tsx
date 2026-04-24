import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import HandDrawnSketch from "../components/HandDrawnSketch";
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
        {/* ── Marginalia — hand-drawn sketches & arrows in the outer margins ── */}
        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: 120, right: "2.5%", opacity: 0.55, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="approvalStamp"
            width={68}
            height={68}
            annotation="final review"
            delay={0.2}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: "44%", left: "2%", opacity: 0.5, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="commentBubble"
            width={86}
            height={70}
            annotation="hover to explore"
            delay={0.3}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ bottom: 110, right: "2.5%", opacity: 0.55, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="morphTransition"
            width={118}
            height={76}
            annotation="concept → product"
            delay={0.4}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: "52%", right: "3%", opacity: 0.45, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="wireframe"
            width={48}
            height={68}
            annotation="v2 iteration"
            delay={0.5}
          />
        </div>

        {/* Curved arrow — upper left, gesturing from annotation toward first card */}
        <svg
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: 210, left: "3.5%", opacity: 0.4, pointerEvents: "none" }}
          width="90"
          height="120"
          viewBox="0 0 90 120"
          fill="none"
        >
          <motion.path
            d="M 8 8 Q 42 18 52 58 Q 60 96 24 108"
            stroke="var(--text-secondary)"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ pathLength: { duration: 1.2, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
          />
          <motion.path
            d="M 24 108 L 34 102 M 24 108 L 32 114"
            stroke="var(--text-secondary)"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 1.2, duration: 0.3 }}
          />
        </svg>

        {/* Curved arrow — mid-right, gesturing from comment sketch toward second card */}
        <svg
          aria-hidden
          className="hidden lg:block absolute"
          style={{ bottom: 220, left: "3%", opacity: 0.38, pointerEvents: "none" }}
          width="100"
          height="90"
          viewBox="0 0 100 90"
          fill="none"
        >
          <motion.path
            d="M 10 78 Q 30 40 60 32 Q 82 26 88 12"
            stroke="var(--text-secondary)"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ pathLength: { duration: 1.2, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
          />
          <motion.path
            d="M 88 12 L 80 16 M 88 12 L 84 22"
            stroke="var(--text-secondary)"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 1.2, duration: 0.3 }}
          />
        </svg>

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

          {/* 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          {/* Section footer — drafting rule + end marker */}
          <div
            className="flex items-center justify-between"
            style={{
              marginTop: 56,
              paddingTop: 18,
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
              }}
            >
              End of Sheet
            </span>
            <span
              style={{
                ...mono,
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
              }}
            >
              A—{String(projects.length).padStart(2, "0")} / A—{String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
