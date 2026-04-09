import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="pt-14 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6"
      >
        <p className="text-xs font-semibold uppercase text-ink-300 mb-4" style={{ letterSpacing: "0.1em" }}>404</p>
        <h1 className="font-display text-4xl text-ink-900 mb-4 italic">Page not found.</h1>
        <p className="text-ink-500 mb-8">This page doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white"
          style={{ backgroundColor: "var(--violet)", boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(124,58,237,0.3)" }}
        >
          Back home
        </Link>
      </motion.div>
    </div>
  );
}
