import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type SketchType = "floorPlan" | "perspective" | "wireframe" | "morphTransition";

interface HandDrawnSketchProps {
  type: SketchType;
  width?: number;
  height?: number;
  annotation?: string;
  annotationPosition?: "above" | "below" | "right" | "left";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** If true, animate on mount rather than scroll-into-view */
  animateOnMount?: boolean;
}

const pathVariants = (delay: number) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay, duration: 1.2, ease: "easeInOut" }, opacity: { delay, duration: 0.3 } },
  },
});

/* ─── Floor Plan Fragment ─────────────────────────────────────── */
function FloorPlanSketch({ delay }: { delay: number }) {
  const paths = [
    "M 10 10 L 10 70 L 90 70 L 90 10 Z", // outer room
    "M 10 40 L 55 40",                     // interior wall horizontal
    "M 55 10 L 55 70",                     // interior wall vertical
    "M 10 10 L 90 10",                     // top wall (redundant but adds stroke)
    "M 70 40 L 90 40",                     // door opening hint
    "M 70 40 Q 90 40 90 60",              // door swing arc
  ];

  return (
    <svg viewBox="0 0 100 80" fill="none" stroke="var(--text-secondary)" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="0.8"
          opacity={0.15}
          variants={pathVariants(delay + i * 0.12)}
          initial="hidden"
          animate="visible"
        />
      ))}
    </svg>
  );
}

/* ─── One-Point Perspective ────────────────────────────────────── */
function PerspectiveSketch({ delay }: { delay: number }) {
  const paths = [
    "M 5 70 L 60 35",   // bottom-left to VP
    "M 5 20 L 60 35",   // top-left to VP
    "M 115 70 L 60 35", // bottom-right to VP
    "M 115 20 L 60 35", // top-right to VP
    "M 5 20 L 5 70",    // left edge
    "M 115 20 L 115 70",// right edge
    "M 25 55 L 25 32",  // inner vertical
    "M 90 55 L 90 32",  // inner vertical
    "M 25 32 L 90 32",  // inner top
    "M 25 55 L 90 55",  // inner bottom
  ];

  return (
    <svg viewBox="0 0 120 80" fill="none" stroke="var(--text-secondary)" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="0.75"
          opacity={0.14}
          variants={pathVariants(delay + i * 0.08)}
          initial="hidden"
          animate="visible"
        />
      ))}
    </svg>
  );
}

/* ─── Mobile Wireframe ─────────────────────────────────────────── */
function WireframeSketch({ delay }: { delay: number }) {
  const paths = [
    "M 15 5 Q 15 2 18 2 L 42 2 Q 45 2 45 5 L 45 75 Q 45 78 42 78 L 18 78 Q 15 78 15 75 Z", // phone
    "M 15 12 L 45 12",  // status bar
    "M 15 65 L 45 65",  // bottom bar
    "M 20 17 L 40 17 L 40 32 L 20 32 Z", // hero area
    "M 20 36 L 38 36",  // text line 1
    "M 20 40 L 35 40",  // text line 2
    "M 20 44 L 37 44",  // text line 3
    "M 20 50 L 32 53 L 20 56 Z", // play button / arrow icon
    "M 27 68 L 33 68",  // home indicator
  ];

  return (
    <svg viewBox="0 0 60 80" fill="none" stroke="var(--text-secondary)" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="0.8"
          opacity={0.15}
          variants={pathVariants(delay + i * 0.1)}
          initial="hidden"
          animate="visible"
        />
      ))}
    </svg>
  );
}

/* ─── Morph Transition (floor plan → wireframe) ────────────────── */
function MorphTransitionSketch({ delay }: { delay: number }) {
  const paths = [
    // Floor plan side (left)
    "M 5 15 L 5 65 L 55 65 L 55 15 Z",
    "M 5 40 L 35 40",
    "M 35 15 L 35 65",
    // Transition arrows
    "M 60 40 L 80 40",
    "M 74 34 L 80 40 L 74 46",
    // Wireframe side (right)
    "M 88 8 Q 88 5 91 5 L 115 5 Q 118 5 118 8 L 118 72 Q 118 75 115 75 L 91 75 Q 88 75 88 72 Z",
    "M 88 14 L 118 14",
    "M 93 18 L 113 18 L 113 30 L 93 30 Z",
    "M 93 34 L 111 34",
    "M 93 38 L 108 38",
    "M 93 42 L 110 42",
  ];

  return (
    <svg viewBox="0 0 125 80" fill="none" stroke="var(--text-secondary)" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="0.8"
          opacity={0.18}
          variants={pathVariants(delay + i * 0.1)}
          initial="hidden"
          animate="visible"
        />
      ))}
    </svg>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function HandDrawnSketch({
  type,
  width = 120,
  height = 80,
  annotation,
  annotationPosition = "below",
  delay = 0,
  className = "",
  style,
  animateOnMount = false,
}: HandDrawnSketchProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const shouldAnimate = animateOnMount || inView;

  const sketchMap: Record<SketchType, React.ReactNode> = {
    floorPlan: <FloorPlanSketch delay={shouldAnimate ? delay : 9999} />,
    perspective: <PerspectiveSketch delay={shouldAnimate ? delay : 9999} />,
    wireframe: <WireframeSketch delay={shouldAnimate ? delay : 9999} />,
    morphTransition: <MorphTransitionSketch delay={shouldAnimate ? delay : 9999} />,
  };

  const annotationEl = annotation && (
    <motion.span
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: delay + 1.0, duration: 0.6 }}
      style={{
        fontFamily: "'Caveat', cursive",
        fontSize: 18,
        color: "var(--text-secondary)",
        opacity: 0.65,
        display: "block",
        textAlign: "center",
        lineHeight: 1.3,
      }}
    >
      {annotation}
    </motion.span>
  );

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-1 pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden
    >
      {annotationPosition === "above" && annotationEl}
      <div style={{ width, height }}>
        {sketchMap[type]}
      </div>
      {(annotationPosition === "below" || !annotationPosition) && annotationEl}
    </div>
  );
}
