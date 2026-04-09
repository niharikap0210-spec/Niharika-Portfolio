import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import HeroSection from "../components/HeroSection";

const projects = [
  {
    slug: "biteback",
    title: "BiteBack",
    description: "Connecting surplus food with those in need through an intuitive donation platform. Improved SUS score from 72% to 86% across two usability test rounds.",
    tags: ["UX Research", "UX Design", "Usability Testing", "Prototyping"],
    year: "2024",
    accentHue: "142",
  },
  {
    slug: "locallift",
    title: "LocalLift",
    description: "Empowering small businesses with mentorship, digital tools, and community support. Users found relevant results 40% faster after design iterations.",
    tags: ["UX Research", "UX Design", "UI Design", "Design Thinking"],
    year: "2024",
    accentHue: "262",
  },
  {
    slug: "thesis",
    title: "Public Realm: Beyond the Streets",
    description: "Redefining public spaces and reviving community life through human-centered architectural design and placemaking research.",
    tags: ["Urban Design", "Architecture", "Research", "3D Modeling"],
    year: "2023",
    accentHue: "210",
  },
  {
    slug: "renders",
    title: "Rendered Realities",
    description: "3D modeling and architectural visualization exploring how digital rendering techniques communicate spatial design intent.",
    tags: ["SketchUp", "Lumion", "AutoCAD", "Photoshop"],
    year: "2022",
    accentHue: "28",
  },
];

export default function Home() {
  return (
    <div className="pt-14">
      <HeroSection />

      <div className="max-w-5xl mx-auto px-6 md:px-8 mb-10" style={{ borderTop: "1px solid var(--ink-100)" }} />

      <section className="max-w-5xl mx-auto px-6 md:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-baseline justify-between mb-8"
        >
          <h2 className="font-sans text-xs font-semibold uppercase text-ink-300" style={{ letterSpacing: "0.1em" }}>
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
    </div>
  );
}
