import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="group block rounded-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 4px 20px rgba(124,58,237,0.04)",
          transitionProperty: "box-shadow, transform, border-color",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          textDecoration: "none",
          display: "block",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.06), 0 16px 48px rgba(124,58,237,0.10)";
          el.style.transform = "translateY(-4px)";
          el.style.borderColor = "rgba(124,58,237,0.22)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.03), 0 4px 20px rgba(124,58,237,0.04)";
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--border)";
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(0.99)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
      >
        {/* Thumbnail */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/10" }}
        >
          {/* Gradient background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: project.gradient,
            }}
          />

          {/* Blueprint grid overlay on card */}
          <div
            className="blueprint-grid-subtle absolute inset-0"
            style={{
              transitionProperty: "opacity",
              transitionDuration: "300ms",
            }}
          />

          {/* Hand-drawn sketch overlay (appears on hover) */}
          <div
            className="absolute inset-0 flex items-end justify-start p-6 opacity-0 group-hover:opacity-100"
            style={{
              transitionProperty: "opacity",
              transitionDuration: "350ms",
            }}
            aria-hidden
          >
            <div style={{ opacity: 0.12 }}>
              <svg width="90" height="60" viewBox="0 0 90 60" fill="none" stroke="var(--text-primary)" strokeWidth="0.75" strokeLinecap="round">
                {/* Quick wireframe sketch */}
                <rect x="5" y="5" width="80" height="50" />
                <line x1="5" y1="18" x2="85" y2="18" />
                <rect x="10" y="23" width="35" height="25" />
                <rect x="50" y="23" width="35" height="10" />
                <line x1="50" y1="37" x2="85" y2="37" />
                <line x1="50" y1="41" x2="80" y2="41" />
                <line x1="50" y1="45" x2="75" y2="45" />
              </svg>
            </div>
          </div>

          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 55%)",
            }}
          />

          {/* Project number — top right */}
          <span
            aria-hidden
            style={{
              ...mono,
              position: "absolute",
              top: 14,
              right: 14,
              fontSize: 9,
              color: "var(--text-muted)",
              backgroundColor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              padding: "3px 7px",
              letterSpacing: "0.15em",
            }}
          >
            Project {String(index + 1).padStart(2, "0")}
          </span>

          {/* Year badge */}
          <span
            style={{
              position: "absolute",
              bottom: 14,
              left: 14,
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "var(--text-muted)",
              backgroundColor: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(4px)",
              padding: "3px 7px",
              letterSpacing: "0.1em",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Card body */}
        <div style={{ padding: "24px 28px 28px" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.2vw, 28px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 10,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: 16,
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  ...mono,
                  fontSize: 9,
                  color: "var(--text-muted)",
                  letterSpacing: "0.12em",
                  padding: "3px 8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-primary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow link */}
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0,
              transitionProperty: "opacity, transform",
              transitionDuration: "200ms",
            }}
            // Handled via group-hover in parent
          >
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -4 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              View Case Study
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
