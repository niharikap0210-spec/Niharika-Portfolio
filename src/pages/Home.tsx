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

function CropMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const size = 16;
  const offset = 18;
  const stroke = "0.75px solid var(--construction)";
  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
    zIndex: 2,
  };
  const styles: Record<typeof position, React.CSSProperties> = {
    tl: { ...base, top: offset, left: offset, borderTop: stroke, borderLeft: stroke },
    tr: { ...base, top: offset, right: offset, borderTop: stroke, borderRight: stroke },
    bl: { ...base, bottom: offset, left: offset, borderBottom: stroke, borderLeft: stroke },
    br: { ...base, bottom: offset, right: offset, borderBottom: stroke, borderRight: stroke },
  };
  return <span aria-hidden style={styles[position]} />;
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

      {/* Projects — blueprint sheet */}
      <div
        style={{
          position: "relative",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Blueprint grid */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(0deg, var(--grid-secondary) 0, var(--grid-secondary) 0.5px, transparent 0.5px, transparent 48px),
              repeating-linear-gradient(90deg, var(--grid-secondary) 0, var(--grid-secondary) 0.5px, transparent 0.5px, transparent 48px),
              repeating-linear-gradient(0deg, var(--grid-primary) 0, var(--grid-primary) 0.75px, transparent 0.75px, transparent 240px),
              repeating-linear-gradient(90deg, var(--grid-primary) 0, var(--grid-primary) 0.75px, transparent 0.75px, transparent 240px)
            `,
            opacity: 0.75,
            pointerEvents: "none",
          }}
        />

        {/* Soft radial wash for dimension */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(80% 60% at 50% 0%, var(--bg-primary) 0%, transparent 70%), radial-gradient(60% 50% at 50% 100%, var(--bg-primary) 0%, transparent 70%)",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        {/* Corner crop marks */}
        <CropMark position="tl" />
        <CropMark position="tr" />
        <CropMark position="bl" />
        <CropMark position="br" />

        {/* Sheet annotation */}
        <span
          aria-hidden
          style={{
            ...mono,
            position: "absolute",
            top: 18,
            right: 24,
            fontSize: 9,
            color: "var(--text-muted)",
            opacity: 0.55,
            letterSpacing: "0.18em",
          }}
        >
          SHEET · A / 04
        </span>

        <section
          className="max-w-6xl mx-auto px-6 md:px-10 py-20"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Section header */}
          <div className="mb-12" style={{ paddingTop: 32 }}>
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
      </div>
    </motion.div>
  );
}
