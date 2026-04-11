import { motion, useInView } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { useRef } from "react";
import { getProjectBySlug, getAdjacentProjects } from "../data/projects";
import SectionMarker from "../components/SectionMarker";
import DrawingSheetBorder from "../components/DrawingSheetBorder";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

/* ─── Drawing Sheet wrapper ─────────────────────────────────────── */
function DrawingSheet({
  sheetNumber,
  sheetTitle,
  letter,
  children,
}: {
  sheetNumber: string;
  sheetTitle: string;
  letter: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <DrawingSheetBorder
        titleBlock={{ sheet: sheetNumber }}
        className="blueprint-grid-subtle"
        style={{
          padding: "56px 0 64px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionMarker label={sheetTitle} letter={letter} className="mb-8" />
          {children}
        </div>
      </DrawingSheetBorder>
    </motion.section>
  );
}

/* ─── Case Study Page ────────────────────────────────────────────── */
export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;
  const adjacent = slug ? getAdjacentProjects(slug) : { prev: null, next: null };

  if (!project) return <Navigate to="/" replace />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-14"
    >
      {/* Hero banner */}
      <DrawingSheetBorder
        titleBlock={{
          project: project.title,
          role: project.role,
          duration: project.duration,
          sheet: "01 OF 04",
        }}
        className="blueprint-grid"
        style={{ padding: "80px 0 64px" }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: 48,
              display: "inline-flex",
              transitionProperty: "color",
              transitionDuration: "150ms",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.5 7h-9M5 3.5L1.5 7 5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  ...mono,
                  fontSize: 9,
                  color: "var(--accent)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  backgroundColor: "rgba(124,58,237,0.05)",
                  padding: "3px 8px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(40px, 5.5vw, 68px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "clamp(16px, 1.6vw, 20px)",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: 40,
              maxWidth: 600,
            }}
          >
            {project.subtitle}
          </motion.p>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6"
            style={{ borderTop: "0.75px solid var(--border)", borderBottom: "0.75px solid var(--border)" }}
          >
            {[
              { label: "Role", value: project.role },
              { label: "Team", value: project.team },
              { label: "Duration", value: project.duration },
              { label: "Year", value: project.year },
            ].map((meta) => (
              <div key={meta.label}>
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 6 }}>{meta.label}</p>
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4 }}>{meta.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap gap-2 mt-5"
          >
            {project.tools.map((tool) => (
              <span
                key={tool}
                style={{
                  ...mono,
                  fontSize: 9,
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  padding: "3px 8px",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </DrawingSheetBorder>

      {/* Hero image */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              aspectRatio: "16/7",
              background: project.gradient,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={`https://placehold.co/1200x525/F8F6FF/7C3AED?text=`}
              alt={`${project.title} hero`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.15), transparent 60%)" }} />
          </div>
        </motion.div>
      </div>

      {/* Sheet 01 — Overview */}
      <DrawingSheet sheetNumber="01 OF 04" sheetTitle="Overview" letter="A">
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3vw, 38px)",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          Overview
        </h2>
        <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 32 }}>
          {project.overview}
        </p>

        <div
          style={{
            padding: "20px 24px",
            backgroundColor: "rgba(124,58,237,0.04)",
            border: "1px solid rgba(124,58,237,0.12)",
          }}
        >
          <p style={{ ...mono, fontSize: 9, color: "var(--accent)", marginBottom: 8 }}>The Problem</p>
          <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 16, color: "var(--text-primary)", fontWeight: 500, lineHeight: 1.7 }}>
            {project.problem}
          </p>
        </div>

        {project.problemStats && (
          <div className="mt-8 space-y-3">
            {project.problemStats.map((stat, i) => (
              <div key={i} className="flex gap-3">
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "rgba(124,58,237,0.1)",
                    color: "var(--accent)",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65 }}>{stat}</p>
              </div>
            ))}
          </div>
        )}
      </DrawingSheet>

      {/* Handwritten note between sheets */}
      <div className="flex justify-center py-4" aria-hidden>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: "var(--text-secondary)", opacity: 0.35 }}>
          see next sheet →
        </span>
      </div>

      {/* Sheet 02 — Research */}
      <DrawingSheet sheetNumber="02 OF 04" sheetTitle="Research" letter="B">
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3vw, 38px)",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          Research Findings
        </h2>

        {project.researchHighlights ? (
          <div className="space-y-4">
            {project.researchHighlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  padding: "20px 24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginBottom: 10, lineHeight: 1.4 }}>
                  {item.finding}
                </p>
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.7 }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            Research insights and findings will be detailed here.
          </p>
        )}

        {/* Research image placeholder */}
        <div className="mt-10" style={{ overflow: "hidden", border: "1px solid var(--border)" }}>
          <img
            src="https://placehold.co/800x400/F8F6FF/9CA3AF?text=Research+Artifacts"
            alt="Research artifacts"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", padding: "8px 12px" }}>
            Fig. 01 — Research artifacts, affinity maps, and user insights
          </p>
        </div>
      </DrawingSheet>

      <div className="flex justify-center py-4" aria-hidden>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: "var(--text-secondary)", opacity: 0.35 }}>
          continued...
        </span>
      </div>

      {/* Sheet 03 — Design */}
      <DrawingSheet sheetNumber="03 OF 04" sheetTitle="Design Process" letter="C">
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3vw, 38px)",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          Design Process
        </h2>

        <ol className="space-y-6">
          {project.process.map((step, i) => {
            const [label, ...rest] = step.split(": ");
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="flex gap-5"
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "0.75px solid var(--construction)",
                    backgroundColor: "var(--bg-elevated)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--text-muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginBottom: 3 }}>
                    {label}
                  </p>
                  {rest.length > 0 && (
                    <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                      {rest.join(": ")}
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Design screens placeholder */}
        <div className="mt-10" style={{ overflow: "hidden", border: "1px solid var(--border)" }}>
          <img
            src="https://placehold.co/800x500/F8F6FF/9CA3AF?text=Design+Screens"
            alt="Design screens"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", padding: "8px 12px" }}>
            Fig. 02 — Wireframes, iterations, and high-fidelity screens
          </p>
        </div>
      </DrawingSheet>

      <div className="flex justify-center py-4" aria-hidden>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: "var(--text-secondary)", opacity: 0.35 }}>
          see next sheet →
        </span>
      </div>

      {/* Sheet 04 — Outcome */}
      <DrawingSheet sheetNumber="04 OF 04" sheetTitle="Outcome & Learnings" letter="D">
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3vw, 38px)",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          Outcome
        </h2>

        <div
          style={{
            padding: "24px 28px",
            backgroundColor: "rgba(124,58,237,0.04)",
            border: "1px solid rgba(124,58,237,0.12)",
            marginBottom: 40,
          }}
        >
          <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 17, color: "var(--text-primary)", fontWeight: 500, lineHeight: 1.75 }}>
            {project.outcome}
          </p>
        </div>

        <h3
          style={{
            ...mono,
            fontSize: 10,
            color: "var(--text-muted)",
            marginBottom: 20,
          }}
        >
          Key Takeaways
        </h3>

        <div className="space-y-4">
          {project.keyTakeaways.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex gap-4"
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9,
                  color: "var(--accent)",
                  flexShrink: 0,
                  paddingTop: 3,
                  minWidth: "1.5rem",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </DrawingSheet>

      {/* Project navigation */}
      <div
        className="max-w-4xl mx-auto px-6 md:px-10 py-16 flex justify-between items-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {adjacent.prev ? (
          <Link
            to={`/work/${adjacent.prev.slug}`}
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            style={{ textDecoration: "none" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 3 }}>Previous</p>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20,
                  color: "var(--text-secondary)",
                  transitionProperty: "color",
                  transitionDuration: "150ms",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
              >
                {adjacent.prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {adjacent.next && (
          <Link
            to={`/work/${adjacent.next.slug}`}
            className="group flex items-center gap-3 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            style={{ textDecoration: "none" }}
          >
            <div>
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 3 }}>Next</p>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20,
                  color: "var(--text-secondary)",
                  transitionProperty: "color",
                  transitionDuration: "150ms",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
              >
                {adjacent.next.title}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
