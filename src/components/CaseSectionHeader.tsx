import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode, CSSProperties } from "react";

/* Shared case-study section system — one source of truth so section headers,
   titles, and sub-eyebrows are identical across every project page.
   Everything is Manrope; brand accent is passed in per project. */

const SERIF = "'Manrope', Georgia, serif";
const MONO: CSSProperties = { fontFamily: "'Manrope', monospace", textTransform: "uppercase", letterSpacing: "0.12em" };

/** Canonical section-title (h2) style, used by SectionHeader and available for body headings. */
export const CASE_H2: CSSProperties = {
  fontFamily: SERIF,
  fontWeight: 700,
  fontSize: "clamp(32px, 3.9vw, 48px)",
  letterSpacing: "-0.025em",
  lineHeight: 1.18,
  color: "var(--text-primary)",
};

/** Canonical small section sub-eyebrow style (e.g. "Three blind spots"). */
export function caseEyebrow(accent: string): CSSProperties {
  return { ...MONO, fontSize: 13, color: accent, letterSpacing: "0.2em", fontWeight: 700 };
}

export function SectionHeader({
  num, phase, title, accent = "#1E40AF", meta, titleMaxWidth = 820, titleColor,
}: {
  num: string;
  phase: string;
  title: ReactNode;
  accent?: string;
  /** optional right-aligned meta in the top row, e.g. a week range */
  meta?: string;
  titleMaxWidth?: number;
  /** override the title color (e.g. "#fff" on a dark section) */
  titleColor?: string;
  /** accepted for call-site compatibility; not rendered */
  total?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(16px, 2.2vw, 26px)", marginBottom: "clamp(18px, 2.4vw, 30px)" }}>
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.4, 1] }}
          style={{
            fontFamily: SERIF, fontWeight: 700,
            fontSize: "clamp(46px, 5.4vw, 74px)",
            lineHeight: 0.75, letterSpacing: "-0.045em",
            color: "transparent", WebkitTextStroke: `1.4px ${accent}`,
            flexShrink: 0, userSelect: "none",
          }}
        >
          {num}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
          style={{ ...MONO, fontSize: 14, color: accent, letterSpacing: "0.22em", fontWeight: 700, paddingBottom: "clamp(8px, 1vw, 14px)" }}
        >
          {phase}
        </motion.div>
        {meta ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.16, duration: 0.55 }}
            style={{ ...MONO, fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.2em", fontWeight: 500, marginLeft: "auto", paddingBottom: "clamp(9px, 1.1vw, 15px)" }}
          >
            {meta}
          </motion.div>
        ) : null}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.16, duration: 0.75, ease: [0.25, 1, 0.4, 1] }}
        style={{ ...CASE_H2, margin: 0, maxWidth: titleMaxWidth, ...(titleColor ? { color: titleColor } : null) }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
