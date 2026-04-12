import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import SectionMarker from "../components/SectionMarker";
import HandDrawnSketch from "../components/HandDrawnSketch";
import { projects } from "../data/projects";
import { Link } from "react-router-dom";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

/* ─── About Preview section ─────────────────────────────────────── */
function AboutPreview() {
  return (
    <section
      className="blueprint-grid relative overflow-hidden"
      style={{
        padding: "80px 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Inset border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 10,
          border: "0.75px solid var(--construction)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — bio */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionMarker label="About" letter="B" className="mb-8" />

            <blockquote
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(22px, 2.6vw, 32px)",
                color: "var(--text-primary)",
                lineHeight: 1.4,
                letterSpacing: "-0.02em",
                marginBottom: 28,
                quotes: "none",
              }}
            >
              I'm a Product Designer who started in architecture — designing buildings,
              understanding materials, thinking in systems and space. Now I bring that
              same rigor to digital products. I obsess over the details that make
              interfaces feel inevitable.
            </blockquote>

            <Link
              to="/about"
              className="hover-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded inline-flex items-center gap-2"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 15,
                color: "var(--accent)",
                textDecoration: "none",
                transitionProperty: "color",
                transitionDuration: "150ms",
              }}
            >
              Learn more
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

          {/* Right — sketch */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center gap-3 hidden lg:flex"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            <HandDrawnSketch
              type="morphTransition"
              width={200}
              height={90}
              annotation="from buildings to interfaces"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        {/* Section header */}
        <div
          className="mb-12"
          style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}
        >
          <div className="flex items-end justify-between mb-6">
            <SectionMarker label="Selected Work" letter="A" />
            <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", opacity: 0.6 }}>
              {projects.length} Projects
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
              fontSize: "clamp(36px, 4.2vw, 52px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            Projects
          </motion.h2>
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* About Preview */}
      <AboutPreview />
    </motion.div>
  );
}
