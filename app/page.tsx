"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    slug: "biteback",
    title: "BiteBack",
    description:
      "Connecting surplus food with those in need through an intuitive donation platform. Improved SUS score from 72% to 86% across two usability test rounds.",
    tags: ["UX Research", "UX Design", "Usability Testing", "Prototyping"],
    year: "2024",
    accentHue: "142",
  },
  {
    slug: "locallift",
    title: "LocalLift",
    description:
      "Empowering small businesses with mentorship, digital tools, and community support. Users found relevant results 40% faster after design iterations.",
    tags: ["UX Research", "UX Design", "UI Design", "Design Thinking"],
    year: "2024",
    accentHue: "262",
  },
  {
    slug: "thesis",
    title: "Public Realm: Beyond the Streets",
    description:
      "Redefining public spaces and reviving community life through human-centered architectural design and placemaking research.",
    tags: ["Urban Design", "Architecture", "Research", "3D Modeling"],
    year: "2023",
    accentHue: "210",
  },
  {
    slug: "renders",
    title: "Rendered Realities",
    description:
      "3D modeling and architectural visualization exploring how digital rendering techniques communicate spatial design intent.",
    tags: ["SketchUp", "Lumion", "AutoCAD", "Photoshop"],
    year: "2022",
    accentHue: "28",
  },
];

export default function HomePage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-8">
            <span
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: "rgba(124, 58, 237, 0.08)",
                color: "var(--violet)",
                border: "1px solid rgba(124, 58, 237, 0.15)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-current"
                style={{
                  boxShadow: "0 0 0 3px rgba(124,58,237,0.2)",
                  animation: "pulse 2s infinite",
                }}
              />
              Open to opportunities
            </span>
          </div>

          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl text-ink-900 mb-6"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: "1.08",
            }}
          >
            <em>Designing</em> with empathy,
            <br />
            <span>researching with</span>
            <br />
            <em>curiosity.</em>
          </h1>

          <p
            className="text-lg text-ink-500 max-w-xl"
            style={{ lineHeight: "1.7" }}
          >
            Hi, I&apos;m{" "}
            <span className="text-ink-900 font-medium">Niharika Pundlik</span> — a
            Product Designer with a background in HCI and Architecture. I bridge
            research, creativity, and problem-solving to build intuitive
            experiences that feel as good as they work.
          </p>
        </motion.div>
      </section>

      {/* Divider */}
      <div
        className="max-w-5xl mx-auto px-6 md:px-8 mb-10"
        style={{ borderTop: "1px solid var(--ink-100)" }}
      />

      {/* Projects */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-baseline justify-between mb-8"
        >
          <h2
            className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-300"
            style={{ letterSpacing: "0.1em" }}
          >
            Selected Work
          </h2>
          <span className="text-xs text-ink-300">{projects.length} projects</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} {...project} index={i} />
          ))}
        </div>
      </section>

      {/* Pulse animation keyframe */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
