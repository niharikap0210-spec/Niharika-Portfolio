import { motion } from "framer-motion";
import MiroHero from "../components/MiroHero";
import ProjectsBoard from "../components/ProjectsBoard";

/* ─── Home Page ──────────────────────────────────────────────────── */
/* The "Let's connect" CTA lives in the global Footer (combined connect + footer). */
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.6, 1] }}
    >
      {/* Hero — interactive Miro canvas */}
      <MiroHero />

      {/* Selected work — frames on a board */}
      <ProjectsBoard />
    </motion.div>
  );
}
