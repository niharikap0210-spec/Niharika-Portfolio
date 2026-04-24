import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
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
      <section id="projects" className="max-w-6xl mx-auto px-6 md:px-10 py-20" style={{ scrollMarginTop: 96 }}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
