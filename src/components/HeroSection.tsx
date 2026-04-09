import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINE1 = "Hi, I'm Niharika.";
const LINE2 = "I design products.";
const SUBTEXT =
  "Product Designer with a background in architecture and HCI. I transform complex problems into intuitive, research-driven experiences.";

// ── Blinking text cursor ───────────────────────────────────────────────────────
function TypeCursor({ blinking }: { blinking: boolean }) {
  return (
    <motion.span
      animate={blinking ? { opacity: [1, 0, 1, 0, 1, 0, 0] } : { opacity: 1 }}
      transition={
        blinking
          ? {
              duration: 1.4,
              times: [0, 0.14, 0.28, 0.43, 0.57, 0.71, 1],
              ease: "linear",
            }
          : {}
      }
      style={{
        display: "inline-block",
        width: "0.1em",
        minWidth: 3,
        height: "0.82em",
        backgroundColor: "var(--ink-900)",
        marginLeft: "0.12em",
        verticalAlign: "middle",
        borderRadius: 1,
      }}
    />
  );
}

// ── Figma-style selection box ──────────────────────────────────────────────────
function SelectionBox({ visible }: { visible: boolean }) {
  const handles: React.CSSProperties[] = [
    { top: -4, left: -4 },
    { top: -4, left: "calc(50% - 3px)" },
    { top: -4, right: -4 },
    { top: "calc(50% - 3px)", right: -4 },
    { bottom: -4, right: -4 },
    { bottom: -4, left: "calc(50% - 3px)" },
    { bottom: -4, left: -4 },
    { top: "calc(50% - 3px)", left: -4 },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: "-10px -12px",
            border: "1.5px solid var(--violet)",
            borderRadius: 2,
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {handles.map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 6,
                height: 6,
                backgroundColor: "var(--surface)",
                border: "1.5px solid var(--violet)",
                borderRadius: 1,
                ...pos,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Fake collaborative cursor ──────────────────────────────────────────────────
interface FakeCursorProps {
  name: string;
  color: string;
  left: string;
  top: string;
  driftX: number[];
  driftY: number[];
  delay: number;
  duration: number;
}

function FakeCursor({ name, color, left, top, driftX, driftY, delay, duration }: FakeCursorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: driftX, y: driftY }}
      transition={{
        opacity: { delay, duration: 0.5, ease: "easeOut" },
        x: {
          delay,
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
        y: {
          delay: delay + 0.6,
          duration: duration * 0.87,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      }}
      style={{
        position: "absolute",
        left,
        top,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path
          d="M1 1L1 15.5L5 11.5L7.5 18L10 17L7.5 10.5L12.5 10.5L1 1Z"
          fill={color}
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 17,
          left: 9,
          backgroundColor: color,
          color: "white",
          fontSize: 10,
          fontWeight: 600,
          fontFamily: "Inter, system-ui, sans-serif",
          padding: "2px 7px",
          borderRadius: 4,
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}
      >
        {name}
      </div>
    </motion.div>
  );
}

// ── macOS window chrome + toolbar ──────────────────────────────────────────────
function WindowChrome() {
  const tools = [
    // Move (arrow)
    <svg key="v" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M1.5 1L2 11.5l3-3L7.5 15l2-.9L7 8.5l4.5.5L1.5 1z" />
    </svg>,
    // Text (T)
    <svg key="t" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M2 3.5h10v1.4H8.2v6.6H5.8V4.9H2V3.5z" />
    </svg>,
    // Rectangle
    <svg key="r" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="2.5" width="9" height="9" rx="1.5" />
    </svg>,
    // Frame (#)
    <svg key="f" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="4" y1="1.5" x2="4" y2="12.5" />
      <line x1="10" y1="1.5" x2="10" y2="12.5" />
      <line x1="1.5" y1="4" x2="12.5" y2="4" />
      <line x1="1.5" y1="10" x2="12.5" y2="10" />
    </svg>,
  ];

  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid var(--ink-100)",
        backgroundColor: "rgba(249,248,247,0.96)",
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* macOS traffic lights */}
      <div style={{ display: "flex", gap: 6 }}>
        {["#FF5F57", "#FFBD2E", "#28CA41"].map((c, i) => (
          <div
            key={i}
            style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }}
          />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 3 }}>
        {tools.map((icon, i) => (
          <div
            key={i}
            style={{
              width: 30,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              backgroundColor: i === 0 ? "rgba(124,58,237,0.1)" : "rgba(17,17,16,0.05)",
              color: i === 0 ? "var(--violet)" : "var(--ink-500)",
              cursor: "default",
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />
    </div>
  );
}

// ── Layers panel ───────────────────────────────────────────────────────────────
interface Layer {
  label: string;
  type: "frame" | "text" | "rect" | "group";
  indent: number;
  active?: boolean;
}

const LAYERS: Layer[] = [
  { label: "Portfolio Frame", type: "frame", indent: 0 },
  { label: "Hero Heading", type: "text", indent: 1, active: true },
  { label: "Subtext", type: "text", indent: 1 },
  { label: "Background", type: "rect", indent: 1 },
  { label: "Dot Grid", type: "group", indent: 1 },
];

function LayerIcon({ type, active }: { type: Layer["type"]; active?: boolean }) {
  const color = active ? "var(--violet)" : "var(--ink-300)";
  switch (type) {
    case "frame":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={color} strokeWidth="1.3">
          <line x1="3" y1="0" x2="3" y2="10" />
          <line x1="7" y1="0" x2="7" y2="10" />
          <line x1="0" y1="3" x2="10" y2="3" />
          <line x1="0" y1="7" x2="10" y2="7" />
        </svg>
      );
    case "text":
      return (
        <span style={{ fontSize: 9, fontWeight: 700, color, fontFamily: "Georgia, serif", lineHeight: 1 }}>
          T
        </span>
      );
    case "rect":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={color} strokeWidth="1.3">
          <rect x="1" y="1" width="8" height="8" rx="1" />
        </svg>
      );
    default:
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={color} strokeWidth="1.3">
          <circle cx="5" cy="5" r="3.5" />
        </svg>
      );
  }
}

function LayersPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="hidden md:block"
      style={{
        position: "absolute",
        right: "2.5%",
        top: "50%",
        transform: "translateY(-50%)",
        width: 172,
        backgroundColor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid var(--ink-100)",
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)",
        overflow: "hidden",
        zIndex: 5,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "7px 10px",
          borderBottom: "1px solid var(--ink-100)",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <rect x="0.5" y="0.5" width="4.2" height="4.2" rx="0.5" fill="#B0AEAC" />
          <rect x="6.3" y="0.5" width="4.2" height="4.2" rx="0.5" fill="#B0AEAC" />
          <rect x="0.5" y="6.3" width="4.2" height="4.2" rx="0.5" fill="#B0AEAC" />
          <rect x="6.3" y="6.3" width="4.2" height="4.2" rx="0.5" fill="#B0AEAC" />
        </svg>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "var(--ink-500)",
            letterSpacing: "0.06em",
            fontFamily: "Inter, system-ui, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Layers
        </span>
      </div>

      {/* Layer rows */}
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            paddingLeft: 10 + layer.indent * 10,
            backgroundColor: layer.active ? "rgba(124,58,237,0.07)" : "transparent",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", width: 12, flexShrink: 0 }}>
            <LayerIcon type={layer.type} active={layer.active} />
          </span>
          <span
            style={{
              fontSize: 11,
              color: layer.active ? "var(--violet)" : "var(--ink-700)",
              fontFamily: "Inter, system-ui, sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {layer.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [activeLine, setActiveLine] = useState<1 | 2 | null>(null);
  const [cursorBlinking, setCursorBlinking] = useState(false);
  const [cursorGone, setCursorGone] = useState(false);
  const [showSelBox, setShowSelBox] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [selBoxFaded, setSelBoxFaded] = useState(false);

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    const q = (fn: () => void, ms: number) => ids.push(setTimeout(fn, ms));

    // Pre-compute all random delays once so re-renders don't reseed
    const d1 = Array.from({ length: LINE1.length }, () => 55 + Math.random() * 35);
    const d2 = Array.from({ length: LINE2.length }, () => 55 + Math.random() * 35);

    let t = 850;

    // Show cursor on line 1, start typing
    q(() => setActiveLine(1), t);
    for (let i = 0; i < LINE1.length; i++) {
      t += d1[i];
      const n = i + 1;
      q(() => setLine1(LINE1.slice(0, n)), t);
    }

    // Brief pause → switch cursor to line 2
    t += 500;
    q(() => setActiveLine(2), t);

    // Type line 2
    for (let i = 0; i < LINE2.length; i++) {
      t += d2[i];
      const n = i + 1;
      q(() => setLine2(LINE2.slice(0, n)), t);
    }

    // Blink cursor × 3 then vanish
    t += 60;
    q(() => setCursorBlinking(true), t);
    t += 1400;
    q(() => { setCursorGone(true); setActiveLine(null); }, t);

    // Figma selection box appears
    t += 300;
    q(() => setShowSelBox(true), t);

    // Subtext fades in
    t += 380;
    q(() => setShowSubtext(true), t);

    // Selection box fades away
    t += 1800;
    q(() => setSelBoxFaded(true), t);

    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-8 pt-6 md:pt-8 pb-10 md:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          border: "1px solid var(--ink-100)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 48px rgba(0,0,0,0.08)",
        }}
      >
        <WindowChrome />

        {/* Canvas */}
        <div
          style={{
            position: "relative",
            height: "clamp(400px, calc(100vh - 180px), 560px)",
            backgroundColor: "#F4F3F1",
            backgroundImage: "radial-gradient(circle, #C6C4C0 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
            overflow: "hidden",
          }}
        >
          {/* Heading + subtext */}
          <div
            style={{
              position: "absolute",
              left: "6%",
              top: "50%",
              transform: "translateY(-50%)",
              width: "min(48%, 420px)",
            }}
          >
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(36px, 4.8vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "var(--ink-900)",
                marginBottom: 22,
              }}
            >
              <span style={{ display: "block", minHeight: "1.12em" }}>
                {line1}
                {activeLine === 1 && !cursorGone && (
                  <TypeCursor blinking={cursorBlinking} />
                )}
              </span>
              <span style={{ display: "block", minHeight: "1.12em" }}>
                {line2}
                {activeLine === 2 && !cursorGone && (
                  <TypeCursor blinking={cursorBlinking} />
                )}
              </span>
            </h1>

            {/* Subtext with Figma selection overlay */}
            <div style={{ position: "relative", width: 340 }}>
              <SelectionBox visible={showSelBox && !selBoxFaded} />
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={showSubtext ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: "clamp(13px, 1.3vw, 15px)",
                  color: "var(--ink-500)",
                  lineHeight: 1.7,
                  fontFamily: "Inter, system-ui, sans-serif",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {SUBTEXT}
              </motion.p>
            </div>
          </div>

          {/* Layers panel — desktop only */}
          <LayersPanel />

          {/* Collaborative cursors */}
          <FakeCursor
            name="Recruiter"
            color="#10B981"
            left="56%"
            top="16%"
            driftX={[-22, 16, -18, 20, -22]}
            driftY={[-14, 18, -10, 14, -14]}
            delay={1.2}
            duration={10.5}
          />
          <FakeCursor
            name="Design Lead"
            color="#EC4899"
            left="68%"
            top="64%"
            driftX={[14, -20, 22, -16, 14]}
            driftY={[18, -14, 10, -18, 18]}
            delay={2.2}
            duration={12}
          />
          <FakeCursor
            name="You"
            color="#7C3AED"
            left="30%"
            top="83%"
            driftX={[-16, 14, -20, 16, -16]}
            driftY={[-10, 16, -8, 12, -10]}
            delay={0.5}
            duration={8.5}
          />
        </div>
      </motion.div>
    </div>
  );
}
