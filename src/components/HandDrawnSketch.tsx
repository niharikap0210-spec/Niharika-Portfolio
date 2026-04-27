import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type SketchType = "floorPlan" | "perspective" | "wireframe" | "morphTransition" | "furnitureRoom" | "phoneInHand" | "approvalStamp" | "commentBubble";

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
  /** Override stroke color (e.g. for dark backgrounds). Defaults to var(--text-secondary). */
  strokeColor?: string;
  /** Override opacity (default ~0.15). */
  opacity?: number;
  /** Override annotation color (e.g. for dark backgrounds). */
  annotationColor?: string;
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
    <svg viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
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
    <svg viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="1"
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
    <svg viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
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
    <svg viewBox="0 0 125 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
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

/* ─── Furniture Room (couch, chair, table in a room) ────────────── */
function FurnitureRoomSketch({ delay }: { delay: number }) {
  const paths = [
    "M 8 15 L 8 72 L 112 72 L 112 15 Z",         // room
    "M 8 15 L 112 15",                             // top wall emphasis
    "M 22 48 L 22 66 L 56 66 L 56 48 Z",           // couch body
    "M 22 48 Q 22 44 26 44 L 52 44 Q 56 44 56 48", // couch back
    "M 26 66 L 26 70",                             // couch leg L
    "M 52 66 L 52 70",                             // couch leg R
    "M 72 50 L 72 66 L 90 66 L 90 50 Z",           // chair
    "M 72 50 L 90 50",                             // chair back line
    "M 74 66 L 74 70",                             // chair leg L
    "M 88 66 L 88 70",                             // chair leg R
    "M 96 28 L 108 28 L 108 40 L 96 40 Z",         // painting/window
    "M 96 28 L 108 40",                            // X on painting
    "M 108 28 L 96 40",                            // X on painting
    "M 38 30 Q 46 18 54 30",                       // pendant lamp arc
    "M 46 18 L 46 28",                             // lamp cord
  ];

  return (
    <svg viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="0.8"
          opacity={0.16}
          variants={pathVariants(delay + i * 0.08)}
          initial="hidden"
          animate="visible"
        />
      ))}
    </svg>
  );
}

/* ─── Phone In Hand (phone held up by a hand) ───────────────────── */
function PhoneInHandSketch({ delay }: { delay: number }) {
  const paths = [
    "M 30 10 Q 30 6 34 6 L 66 6 Q 70 6 70 10 L 70 58 Q 70 62 66 62 L 34 62 Q 30 62 30 58 Z", // phone
    "M 30 14 L 70 14",                          // top bar
    "M 30 54 L 70 54",                          // bottom bar
    "M 36 20 L 64 20 L 64 32 L 36 32 Z",        // screen content
    "M 36 36 L 60 36",                          // text line
    "M 36 40 L 56 40",                          // text line
    "M 36 44 L 58 44",                          // text line
    "M 46 58 L 54 58",                          // home indicator
    // hand (thumb and fingers cradling bottom of phone)
    "M 22 62 Q 16 66 18 74 Q 24 78 36 74",      // thumb curve
    "M 70 62 Q 78 64 80 70 Q 80 76 68 76",      // other hand side
    "M 36 74 L 68 76",                          // palm edge
  ];

  return (
    <svg viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="0.8"
          opacity={0.17}
          variants={pathVariants(delay + i * 0.1)}
          initial="hidden"
          animate="visible"
        />
      ))}
    </svg>
  );
}

/* ─── Approval Stamp (checkmark in circle with rays) ─────────────── */
function ApprovalStampSketch({ delay }: { delay: number }) {
  const paths = [
    "M 40 14 a 26 26 0 1 1 0 52 a 26 26 0 1 1 0 -52",  // outer circle
    "M 40 20 a 20 20 0 1 1 0 40 a 20 20 0 1 1 0 -40",  // inner circle
    "M 30 40 L 37 48 L 52 32",                          // checkmark
    // rays / sparkles around
    "M 8 40 L 14 40",        // left ray
    "M 66 40 L 72 40",       // right ray
    "M 40 8 L 40 14",        // top ray
    "M 40 66 L 40 72",       // bottom ray
    "M 18 18 L 22 22",        // diagonal TL
    "M 58 58 L 62 62",        // diagonal BR
    "M 58 22 L 62 18",        // diagonal TR
    "M 18 62 L 22 58",        // diagonal BL
  ];

  return (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="0.9"
          opacity={0.18}
          variants={pathVariants(delay + i * 0.09)}
          initial="hidden"
          animate="visible"
        />
      ))}
    </svg>
  );
}

/* ─── Comment Bubble (speech bubble with lines inside) ───────────── */
function CommentBubbleSketch({ delay }: { delay: number }) {
  const paths = [
    "M 10 14 Q 10 8 16 8 L 84 8 Q 90 8 90 14 L 90 46 Q 90 52 84 52 L 34 52 L 24 62 L 28 52 L 16 52 Q 10 52 10 46 Z", // bubble w/ tail
    "M 20 22 L 70 22",  // line 1
    "M 20 30 L 78 30",  // line 2
    "M 20 38 L 60 38",  // line 3
    // pin drop on tail
    "M 24 66 a 3 3 0 1 1 0 6 a 3 3 0 1 1 0 -6",
  ];

  return (
    <svg viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth="0.85"
          opacity={0.17}
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
  strokeColor,
  opacity,
  annotationColor,
}: HandDrawnSketchProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const shouldAnimate = animateOnMount || inView;

  const sketchMap: Record<SketchType, React.ReactNode> = {
    floorPlan: <FloorPlanSketch delay={shouldAnimate ? delay : 9999} />,
    perspective: <PerspectiveSketch delay={shouldAnimate ? delay : 9999} />,
    wireframe: <WireframeSketch delay={shouldAnimate ? delay : 9999} />,
    morphTransition: <MorphTransitionSketch delay={shouldAnimate ? delay : 9999} />,
    furnitureRoom: <FurnitureRoomSketch delay={shouldAnimate ? delay : 9999} />,
    phoneInHand: <PhoneInHandSketch delay={shouldAnimate ? delay : 9999} />,
    approvalStamp: <ApprovalStampSketch delay={shouldAnimate ? delay : 9999} />,
    commentBubble: <CommentBubbleSketch delay={shouldAnimate ? delay : 9999} />,
  };

  const annotationEl = annotation && (
    <motion.span
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: delay + 1.0, duration: 0.6 }}
      style={{
        fontFamily: "'Caveat', cursive",
        fontSize: 18,
        color: annotationColor ?? "var(--text-secondary)",
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
      <div style={{ width, height, color: strokeColor ?? "var(--text-secondary)", opacity: opacity ?? 1 }}>
        {sketchMap[type]}
      </div>
      {(annotationPosition === "below" || !annotationPosition) && annotationEl}
    </div>
  );
}
