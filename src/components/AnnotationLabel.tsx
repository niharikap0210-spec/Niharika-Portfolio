import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnnotationLabelProps {
  text: string;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnnotationLabel({
  text,
  direction = "right",
  delay = 0,
  className = "",
  style,
}: AnnotationLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`flex items-center gap-1.5 pointer-events-none select-none ${direction === "left" ? "flex-row-reverse" : ""} ${className}`}
      style={style}
      aria-hidden
    >
      {/* Dot */}
      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: "var(--text-muted)",
          opacity: 0.4,
          flexShrink: 0,
        }}
      />
      {/* Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: delay + 0.2, duration: 0.4, ease: "easeOut" }}
        style={{
          width: 20,
          height: 0.75,
          backgroundColor: "var(--text-muted)",
          opacity: 0.4,
          transformOrigin: direction === "right" ? "left" : "right",
          flexShrink: 0,
        }}
      />
      {/* Text */}
      <span
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 12,
          color: "var(--text-secondary)",
          opacity: 0.4,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}
