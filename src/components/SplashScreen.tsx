import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

/* ─── Construction line path ────────────────────────────────────── */
function ConstructionLine({
  d,
  delay,
  duration = 0.3,
}: {
  d: string;
  delay: number;
  duration?: number;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(180,180,180,0.55)"
      strokeWidth="0.4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { delay, duration, ease: "easeInOut" },
        opacity: { delay, duration: 0.1 },
      }}
    />
  );
}

/* ─── Crosshair mark ────────────────────────────────────────────── */
function CrosshairMark({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.15 }}
    >
      <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} stroke="rgba(180,180,180,0.55)" strokeWidth="0.4" />
      <line x1={cx} y1={cy - 3} x2={cx} y2={cy + 3} stroke="rgba(180,180,180,0.55)" strokeWidth="0.4" />
    </motion.g>
  );
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"lines" | "letters" | "fadeout">("lines");
  const [lettersPhase, setLettersPhase] = useState<"n" | "p" | "both">("n");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("letters"), 1300);
    const t2 = setTimeout(() => setLettersPhase("p"), 1800);
    const t3 = setTimeout(() => setLettersPhase("both"), 2200);
    const t4 = setTimeout(() => setPhase("fadeout"), 2500);
    const t5 = setTimeout(onComplete, 3200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--bg-primary)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* SVG canvas - coordinate space 0 0 160 90 (16:9) */}
      <svg
        viewBox="0 0 160 90"
        style={{ width: "min(90vw, 600px)", height: "auto" }}
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── Construction lines (Phase 1) ── */}
        <AnimatePresence>
          {phase !== "fadeout" && (
            <motion.g
              key="construction"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Horizontals */}
              <ConstructionLine d="M 0 28 L 160 28" delay={0.3} />
              <ConstructionLine d="M 0 45 L 160 45" delay={0.45} />
              <ConstructionLine d="M 0 62 L 160 62" delay={0.6} />

              {/* Verticals */}
              <ConstructionLine d="M 55 0 L 55 90" delay={0.72} />
              <ConstructionLine d="M 105 0 L 105 90" delay={0.82} />

              {/* Diagonals */}
              <ConstructionLine d="M 0 0 L 160 90" delay={0.92} duration={0.4} />
              <ConstructionLine d="M 160 0 L 0 90" delay={1.0} duration={0.4} />

              {/* Crosshair marks at intersections */}
              <CrosshairMark cx={55} cy={28} delay={1.1} />
              <CrosshairMark cx={105} cy={28} delay={1.13} />
              <CrosshairMark cx={55} cy={62} delay={1.16} />
              <CrosshairMark cx={105} cy={62} delay={1.19} />
              <CrosshairMark cx={80} cy={45} delay={1.22} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── NP Initials (Phase 2) ── */}
        <AnimatePresence>
          {phase !== "lines" && phase !== "fadeout" && (
            <motion.g
              key="letters"
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: "easeIn" }}
              style={{ transformOrigin: "80px 45px" }}
            >
              {/* N - single-stroke architectural letterform */}
              {/* Path: bottom-left → top-left → bottom-right → top-right */}
              <motion.path
                d="M 59 61 L 59 29 L 76 61 L 76 29"
                fill="none"
                stroke="var(--text-primary)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  lettersPhase === "n" || lettersPhase === "p" || lettersPhase === "both"
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: { duration: 0.55, ease: "easeInOut" },
                  opacity: { duration: 0.15 },
                }}
              />

              {/* P - single-stroke: up from bottom, arc for bowl */}
              {/* Path: bottom → top → bowl arc back to middle */}
              <motion.path
                d="M 83 61 L 83 29 C 101 29 101 45 83 45"
                fill="none"
                stroke="var(--text-primary)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  lettersPhase === "p" || lettersPhase === "both"
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: { duration: 0.55, ease: "easeInOut" },
                  opacity: { duration: 0.15 },
                }}
              />

              {/* Underline - subtle architectural rule */}
              <motion.path
                d="M 59 65 L 101 65"
                fill="none"
                stroke="rgba(180,180,180,0.4)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  lettersPhase === "both"
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ pathLength: { duration: 0.3, ease: "easeOut" }, opacity: { duration: 0.2 } }}
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
}
