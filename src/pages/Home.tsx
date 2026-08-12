import { motion } from "framer-motion";
import MiroHero from "../components/MiroHero";
import ProjectsBoard from "../components/ProjectsBoard";
import { pageTransition } from "../lib/pageTransition";

/* ─── Home Page ──────────────────────────────────────────────────── */
/* The "Let's connect" CTA lives in the global Footer (combined connect + footer). */
export default function Home() {
  return (
    <motion.div {...pageTransition}>
      {/* Hero — interactive Miro canvas */}
      <MiroHero />

      {/* Selected work — frames on a board */}
      <ProjectsBoard />
    </motion.div>
  );
}
