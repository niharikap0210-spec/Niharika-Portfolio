import { motion } from "framer-motion";
import MiroHero from "../components/MiroHero";
import ProjectsDeck from "../components/ProjectsDeck";
import ConnectSection from "../components/ConnectSection";

/* ─── Home Page ──────────────────────────────────────────────────── */
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

      {/* Selected work — presentation-mode deck (continues the board) */}
      <ProjectsDeck />

      {/* Let's Connect */}
      <ConnectSection />
    </motion.div>
  );
}
