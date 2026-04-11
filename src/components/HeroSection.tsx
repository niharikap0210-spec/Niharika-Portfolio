import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useAnimationFrame, type MotionValue } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import HandDrawnSketch from "./HandDrawnSketch";
import DrawingSheetBorder from "./DrawingSheetBorder";

/* ─── Shared mono style ─────────────────────────────────────────── */
const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

/* ─── Word Reveal (wipe left→right) ────────────────────────────── */
function RevealWord({
  text,
  delay,
  italic = false,
}: {
  text: string;
  delay: number;
  italic?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        paddingBottom: "0.06em",
        whiteSpace: "pre",
      }}
    >
      <motion.span
        style={{ display: "inline-block", fontStyle: italic ? "italic" : "inherit" }}
        initial={{ x: "-110%" }}
        animate={{ x: 0 }}
        transition={{ delay, duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ─── Construction Guide Line (SVG) ─────────────────────────────── */
function GuideLineH({ y, delay }: { y: string | number; delay: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay, duration: 0.22, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: y,
        height: "0.5px",
        backgroundColor: "var(--construction)",
        transformOrigin: "left",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ─── Figma Selection Box ────────────────────────────────────────── */
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            inset: "-8px -10px",
            border: "1.5px solid var(--selection-blue)",
            borderRadius: 2,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {handles.map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 6,
                height: 6,
                backgroundColor: "var(--bg-elevated)",
                border: "1.5px solid var(--selection-blue)",
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

/* ─── Edge Annotations ───────────────────────────────────────────── */
function EdgeAnnotations() {
  return (
    <>
      {/* Left edge — dimension markers */}
      <div
        aria-hidden
        className="hidden lg:flex flex-col absolute left-6 top-16 bottom-16 justify-between"
        style={{ pointerEvents: "none" }}
      >
        {["0", "120", "240", "360", "480"].map((n) => (
          <div key={n} className="flex items-center gap-1">
            <div style={{ width: 6, height: 0.5, backgroundColor: "var(--text-muted)", opacity: 0.3 }} />
            <span style={{ ...mono, fontSize: 7, color: "var(--text-muted)", opacity: 0.3 }}>{n}</span>
          </div>
        ))}
      </div>

      {/* Top edge — column labels */}
      <div
        aria-hidden
        className="hidden lg:flex absolute top-6 left-20 right-20 justify-between"
        style={{ pointerEvents: "none" }}
      >
        {["A", "B", "C", "D", "E", "F"].map((l) => (
          <span key={l} style={{ ...mono, fontSize: 7, color: "var(--text-muted)", opacity: 0.28 }}>
            {l}
          </span>
        ))}
      </div>

      {/* Top-left: north arrow */}
      <div
        aria-hidden
        className="hidden lg:block absolute"
        style={{ top: 20, left: 20, opacity: 0.3, pointerEvents: "none" }}
      >
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path d="M9 2 L9 18" stroke="var(--text-muted)" strokeWidth="0.75" strokeLinecap="round" />
          <path d="M9 2 L6 8 L9 6.5 L12 8 Z" fill="var(--text-muted)" />
          <text x="9" y="21" textAnchor="middle" style={{ fontFamily: "'Space Mono', monospace", fontSize: "6px", fill: "var(--text-muted)" }}>N</text>
        </svg>
      </div>
    </>
  );
}

/* ─── Animated SVG Grid Pattern ─────────────────────────────────── */
function GridSVGPattern({ id, offsetX, offsetY }: {
  id: string;
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) {
  const patternRef = useRef<SVGPatternElement>(null);

  useEffect(() => {
    const unsubX = offsetX.on("change", (v) => {
      patternRef.current?.setAttribute("x", String(v));
    });
    const unsubY = offsetY.on("change", (v) => {
      patternRef.current?.setAttribute("y", String(v));
    });
    return () => { unsubX(); unsubY(); };
  }, [offsetX, offsetY]);

  return (
    <svg width="100%" height="100%" aria-hidden>
      <defs>
        <pattern
          ref={patternRef}
          id={id}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(180,180,180,1)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─── Main HeroSection ───────────────────────────────────────────── */

// Line 1 words: timing starts at t=0.7s
const L1_WORDS = ["I ", "used ", "to ", "design ", "buildings."];
const L2_WORDS = ["Now ", "I ", "design ", "the ", "spaces ", "between"];
const ROTATING_WORDS = ["taps.", "clicks.", "friction.", "moments.", "intent."];
const WORD_STAGGER = 0.085;
const L1_START = 0.72;
const L1_END = L1_START + L1_WORDS.length * WORD_STAGGER;
const L2_START = L1_END + 0.26; // 260ms pause after line 1
const L2_END = L2_START + L2_WORDS.length * WORD_STAGGER;
const SUBTEXT_START = L2_END + 0.3; // subheading crosshair starts

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Animation state
  const [showGuides, setShowGuides] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [guidesGone, setGuidesGone] = useState(false);
  const [subtextState, setSubtextState] = useState<"hidden" | "gliding" | "placed" | "done">("hidden");
  const [showSelBox, setShowSelBox] = useState(false);
  const [selBoxFaded, setSelBoxFaded] = useState(false);
  const [showMicrocopy, setShowMicrocopy] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showRotatingWord, setShowRotatingWord] = useState(false);

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    const q = (fn: () => void, ms: number) => ids.push(setTimeout(fn, ms));

    q(() => setShowGuides(true), 400);
    q(() => setShowHeadline(true), 650);
    q(() => setGuidesGone(true), (L2_END + 0.1) * 1000);
    q(() => setShowRotatingWord(true), (L2_END + 0.15) * 1000);
    q(() => setSubtextState("gliding"), SUBTEXT_START * 1000);
    q(() => { setSubtextState("placed"); setShowSelBox(true); }, (SUBTEXT_START + 0.85) * 1000);
    q(() => setSelBoxFaded(true), (SUBTEXT_START + 2.4) * 1000);
    q(() => setSubtextState("done"), (SUBTEXT_START + 1.2) * 1000);
    q(() => setShowMicrocopy(true), (SUBTEXT_START + 1.1) * 1000);
    q(() => setShowStatus(true), (SUBTEXT_START + 1.4) * 1000);

    return () => ids.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!showRotatingWord) return;
    const fullText = ROTATING_WORDS[wordIndex];
    const handleTyping = () => {
      if (isDeleting) {
        setDisplayWord((prev) => prev.substring(0, prev.length - 1));
      } else {
        setDisplayWord((prev) => fullText.substring(0, prev.length + 1));
      }
    };
    const speed = isDeleting ? 75 : 150;
    const interval = setInterval(handleTyping, speed);
    if (!isDeleting && displayWord === fullText) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayWord === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }
    return () => clearInterval(interval);
  }, [displayWord, isDeleting, wordIndex, showRotatingWord]);

  /* ── Infinite grid interaction ── */
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.25) % 20);
    gridOffsetY.set((gridOffsetY.get() + 0.25) % 20);
  });

  /* ── Interactive spotlight ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !spotlightRef.current || !parallaxRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Custom cursor
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x - 40}px, ${y - 40}px)`;
      cursorRef.current.style.opacity = "1";
    }

    // Spotlight
    spotlightRef.current.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(255,255,255,0.42), transparent)`;

    // Parallax on background decorations (opposite to cursor)
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = ((x - cx) / rect.width) * 6;
    const dy = ((y - cy) / rect.height) * 4;
    parallaxRef.current.style.transform = `translate(${-dx}px, ${-dy}px)`;
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-9999);
    mouseY.set(-9999);
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
    if (spotlightRef.current) spotlightRef.current.style.background = "transparent";
    if (parallaxRef.current) parallaxRef.current.style.transform = "translate(0, 0)";
  }, [mouseX, mouseY]);

  return (
    <DrawingSheetBorder
      titleBlock={{
        name: "NIHARIKA PUNDLIK",
        title: "PRODUCT DESIGNER • PORTFOLIO",
        scale: "SCALE: 1:1 — DATE: 2026",
        sheet: "01 OF 01",
      }}
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <div
        ref={containerRef}
        className="hero-canvas blueprint-grid relative overflow-hidden"
        style={{ minHeight: "calc(100vh - 56px)" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Grid spotlight overlay */}
        <div
          ref={spotlightRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            transitionProperty: "background",
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
          }}
        />

        {/* Custom architectural crosshair cursor */}
        <div
          ref={cursorRef}
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 80,
            height: 80,
            pointerEvents: "none",
            zIndex: 50,
            opacity: 0,
            willChange: "transform",
            transitionProperty: "opacity",
            transitionDuration: "120ms",
            transitionTimingFunction: "ease-out",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden>
            {/* Top arm */}
            <line x1="40" y1="0" x2="40" y2="33" stroke="var(--text-secondary)" strokeWidth="0.75" strokeLinecap="round" />
            {/* Bottom arm */}
            <line x1="40" y1="47" x2="40" y2="80" stroke="var(--text-secondary)" strokeWidth="0.75" strokeLinecap="round" />
            {/* Left arm */}
            <line x1="0" y1="40" x2="33" y2="40" stroke="var(--text-secondary)" strokeWidth="0.75" strokeLinecap="round" />
            {/* Right arm */}
            <line x1="47" y1="40" x2="80" y2="40" stroke="var(--text-secondary)" strokeWidth="0.75" strokeLinecap="round" />
            {/* Center square */}
            <rect x="33" y="33" width="14" height="14" stroke="var(--text-secondary)" strokeWidth="0.75" fill="none" />
          </svg>
        </div>

        {/* SVG grid base layer — auto-scrolls continuously at low opacity */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.09,
          }}
        >
          <GridSVGPattern id="hero-grid-base" offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </div>

        {/* SVG grid cursor-reveal layer — follows the mouse */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.55,
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <GridSVGPattern id="hero-grid-reveal" offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </motion.div>

        {/* Parallax layer for decorative elements */}
        <div
          ref={parallaxRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            transitionProperty: "transform",
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
          }}
        >
          {/* Sketch — upper right: floor plan */}
          <div className="hidden lg:block absolute" style={{ top: "8%", right: "8%", opacity: 0.8 }}>
            <HandDrawnSketch type="floorPlan" width={130} height={90} annotation="initial layout" delay={0.5} animateOnMount />
          </div>

          {/* Sketch — lower right: perspective */}
          <div className="hidden lg:block absolute" style={{ bottom: "12%", right: "14%", opacity: 0.8 }}>
            <HandDrawnSketch type="perspective" width={120} height={75} annotation="spatial flow" delay={1.0} animateOnMount />
          </div>

          {/* Sketch — mid right: wireframe */}
          <div className="hidden lg:block absolute" style={{ top: "38%", right: "5%", opacity: 0.75 }}>
            <HandDrawnSketch type="wireframe" width={60} height={80} annotation="v3 iteration" delay={1.5} animateOnMount />
          </div>
        </div>

        {/* Edge annotations */}
        <EdgeAnnotations />

        {/* ── HERO CONTENT ── */}
        <div
          className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          style={{ minHeight: "calc(100vh - 56px)", paddingTop: 60, paddingBottom: 120 }}
        >
          {/* Name label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              ...mono,
              fontSize: 12,
              color: "var(--text-secondary)",
              letterSpacing: "0.15em",
              marginBottom: 24,
            }}
          >
            Niharika Pundlik
          </motion.p>

          {/* Headline */}
          <div
            className="relative"
            style={{ marginBottom: 40, maxWidth: "min(680px, 100%)" }}
          >
            {/* Construction guide lines */}
            <AnimatePresence>
              {showGuides && !guidesGone && (
                <>
                  <GuideLineH y="0%" delay={0} />
                  <GuideLineH y="46%" delay={0.08} />
                  <GuideLineH y="50%" delay={0.12} />
                  <GuideLineH y="96%" delay={0.16} />
                </>
              )}
            </AnimatePresence>

            {/* Headline text */}
            <h1
              aria-label="I used to design buildings. Now I design the spaces between."
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(60px, 5.2vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "#1A1A1A",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Line 1 */}
              <span style={{ display: "block", marginBottom: "0.06em" }} aria-hidden>
                {showHeadline &&
                  L1_WORDS.map((w, i) => (
                    <RevealWord key={i} text={w} delay={L1_START + i * WORD_STAGGER - 0.65} />
                  ))}
              </span>

              {/* Line 2 */}
              <span style={{ display: "block", marginBottom: "0.06em" }} aria-hidden>
                {showHeadline &&
                  L2_WORDS.map((w, i) => (
                    <RevealWord
                      key={i}
                      text={w}
                      delay={L2_START + i * WORD_STAGGER - 0.65}
                    />
                  ))}
              </span>

              {/* Line 3 — rotating typewriter word */}
              <span
                style={{ display: "block", minHeight: "1.1em" }}
                aria-live="polite"
                aria-atomic="true"
              >
                <span style={{ fontStyle: "italic", color: "#B5924C" }}>
                  {displayWord}
                </span>
                {showRotatingWord && (
                  <span
                    className="cursor-blink"
                    aria-hidden
                    style={{ fontStyle: "italic", color: "#B5924C" }}
                  >|</span>
                )}
              </span>
            </h1>
          </div>

          {/* Subheading — crosshair drag animation */}
          <div
            className="relative"
            style={{ maxWidth: "min(550px, 90vw)", marginBottom: 24 }}
          >
            {/* Fake crosshair cursor */}
            <AnimatePresence>
              {subtextState === "gliding" && (
                <motion.div
                  key="crosshair"
                  initial={{ x: 260, y: -10, opacity: 1 }}
                  animate={{ x: 0, y: 0, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    top: -8,
                    left: -8,
                    pointerEvents: "none",
                    zIndex: 20,
                  }}
                  aria-hidden
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <line x1="10" y1="2" x2="10" y2="18" stroke="var(--text-muted)" strokeWidth="1" />
                    <line x1="2" y1="10" x2="18" y2="10" stroke="var(--text-muted)" strokeWidth="1" />
                    <circle cx="10" cy="10" r="2" stroke="var(--text-muted)" strokeWidth="1" fill="none" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selection box */}
            <SelectionBox visible={showSelBox && !selBoxFaded} />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, x: 260 }}
              animate={
                subtextState === "hidden"
                  ? { opacity: 0.18, x: 260 }
                  : subtextState === "gliding"
                  ? { opacity: 0.18, x: 0 }
                  : { opacity: 1, x: 0 }
              }
              transition={{
                x: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                opacity: subtextState === "done" ? { duration: 0.25 } : { duration: 0 },
              }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                color: "#6B6B6B",
                lineHeight: 1.65,
                position: "relative",
                zIndex: 1,
              }}
            >
              Product Designer specializing in complex, high-stakes products — enterprise
              tools, mobile apps, and everything in between. I bring an architect's
              precision to every pixel.
            </motion.p>
          </div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={showMicrocopy ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 14,
              color: "#9A9A9A",
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            Currently open to full-time Product Designer roles.
          </motion.p>

          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showStatus ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span
              className="status-pulse"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "var(--status-green)",
                display: "inline-block",
                flexShrink: 0,
              }}
              aria-hidden
            />
            <span
              style={{
                ...mono,
                fontSize: 11,
                fontWeight: 500,
                color: "#9A9A9A",
                letterSpacing: "0.1em",
              }}
            >
              Available for opportunities
            </span>
          </motion.div>
        </div>
      </div>
    </DrawingSheetBorder>
  );
}
