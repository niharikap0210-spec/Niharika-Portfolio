import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import SectionMarker from "../components/SectionMarker";
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
    </motion.div>
  );
}
