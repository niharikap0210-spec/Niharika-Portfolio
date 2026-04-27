import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  CaretLeftIcon as CaretLeft,
  CaretRightIcon as CaretRight,
} from "@phosphor-icons/react";
import DrawingSheetBorder from "../components/DrawingSheetBorder";
import SectionMarker from "../components/SectionMarker";

/* ── Brand palette ────────────────────────────────────────────────── */
const thesis = {
  primary: "#9B7A52",
  light:   "#B8966D",
  dark:    "#6B5238",
  surface: "#F6EEE5",
  subtle:  "rgba(155, 122, 82, 0.08)",
  muted:   "rgba(155, 122, 82, 0.55)",
};

/* ── Type scale ───────────────────────────────────────────────────── */
const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";

const t = {
  eyebrow: {
    ...mono, fontSize: 11, letterSpacing: "0.18em",
    color: "var(--text-secondary)",
  } as React.CSSProperties,
  h1Display: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(40px, 5.2vw, 64px)",
    letterSpacing: "-0.035em", lineHeight: 1.05,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  h2Section: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(30px, 3.6vw, 44px)",
    letterSpacing: "-0.025em", lineHeight: 1.2,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  h3Lede: {
    fontFamily: serif, fontWeight: 700,
    fontSize: "clamp(22px, 2.4vw, 28px)",
    letterSpacing: "-0.02em", lineHeight: 1.3,
    color: "var(--text-primary)",
  } as React.CSSProperties,
  bodyLg: {
    fontFamily: sans, fontSize: "clamp(18px, 1.4vw, 21px)",
    lineHeight: 1.75, color: "var(--text-secondary)",
  } as React.CSSProperties,
  body: {
    fontFamily: sans, fontSize: 18,
    lineHeight: 1.75, color: "var(--text-secondary)",
  } as React.CSSProperties,
  bodySm: {
    fontFamily: sans, fontSize: 16,
    lineHeight: 1.7, color: "var(--text-secondary)",
  } as React.CSSProperties,
};

const EASE = [0.25, 1, 0.4, 1] as const;
const SECTION_PAD = "clamp(72px, 9vw, 120px) 0";

/* ── Mobile breakpoint ────────────────────────────────────────────── */
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return mobile;
}

/* ── Reveal helper ────────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, y = 20, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── CountUp ──────────────────────────────────────────────────────── */
function CountUp({
  value, suffix = "", duration = 1.4, style,
}: { value: number; suffix?: string; duration?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration, ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, value, duration, mv]);
  return <span ref={ref} style={style}>{display}{suffix}</span>;
}

/* ── Section header ───────────────────────────────────────────────── */
function SectionHeader({ num, title, phase, total = "04" }: {
  num: string; title: string; phase: string; total?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap", paddingBottom: 14 }}>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ ...mono, fontSize: 14, color: thesis.primary, letterSpacing: "0.22em", fontWeight: 700 }}
        >
          {num} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {total}</span>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.55, ease: EASE }}
          style={{ ...mono, fontSize: 14, color: "var(--text-primary)", letterSpacing: "0.22em", fontWeight: 600 }}
        >
          {title}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.55 }}
          style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.2em", marginLeft: "auto" }}
        >
          {phase}
        </motion.span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
        style={{ height: 1, background: thesis.primary, transformOrigin: "left", opacity: 0.6 }}
      />
    </div>
  );
}

/* ── Sheet data ───────────────────────────────────────────────────── */
const SHEETS = [
  { src: "/thesis/img-05.png", label: "Sheet 01", title: "Introduction & Synopsis", caption: "Placemaking framework, design principles for public realm, objectives and scope of the thesis." },
  { src: "/thesis/img-15.png", label: "Sheet 02", title: "Case Study · Dilli Haat INA, Delhi", caption: "Site surroundings, activity generators, user groups, site response, and section through the mallah." },
  { src: "/thesis/img-14.png", label: "Sheet 03", title: "Case Study · Riverfront Development, Ahmedabad", caption: "Master plan, street network, recreation zones, development sites, and general facilities along the Sabarmati." },
  { src: "/thesis/img-02.png", label: "Sheet 04", title: "Case Study · Manek Chowk, Sarafa & Chandni Chowk", caption: "Urban chowk analysis across Ahmedabad, Indore, and Delhi: character, activity, and design elements." },
  { src: "/thesis/img-07.png", label: "Sheet 05", title: "Case Study · Select City Walk & Chappan", caption: "Design elements, footfall patterns, and pedestrian experience across two contrasting public places." },
  { src: "/thesis/img-04.png", label: "Sheet 06", title: "Site Analysis · Sonegao, Nagpur", caption: "Climate, geology, soil conditions, site profile, SWOT analysis and site surroundings." },
  { src: "/thesis/img-10.png", label: "Sheet 07", title: "Site Plan & View", caption: "Master site plan with programme distribution, legend, and aerial render of the proposed public realm." },
  { src: "/thesis/img-08.png", label: "Sheet 08", title: "Activity Centre", caption: "Circular form, vertical RCC fins, spiralling roof, form development, and rendered exterior views." },
  { src: "/thesis/img-01.png", label: "Sheet 09", title: "Yoga & Meditation Centre", caption: "Waffle slab detail, elevation, section AA, floor plan, sensory garden renders." },
  { src: "/thesis/img-12.png", label: "Sheet 10", title: "Book Cafe, Event Centre & Workshop", caption: "Sunken workshop, glass-grooved roof, folded plate structure; plans, sections, and exterior renders." },
  { src: "/thesis/img-03.png", label: "Sheet 11", title: "Views · Pavilions & Landscape", caption: "Entrance pavilion, sculpture garden, HAT, celebration pavilion, levels & steps seating." },
  { src: "/thesis/img-06.png", label: "Sheet 12", title: "Views · Active Zones & Aerial", caption: "Fountain, pit, skate park, view from the skate park, and aerial overview of the full site." },
  { src: "/thesis/img-09.png", label: "Sheet 13", title: "Street Plan", caption: "Proposed street module with hardscape, softscape planters, street furniture and lighting." },
  { src: "/thesis/img-11.jpg", label: "Final Render", title: "Aerial Site View", caption: "Photorealistic aerial render of the completed public realm. Sonegao, Nagpur, 2023." },
];

/* ══════════════════════════════════════════════════════════════════
   SHEET CAROUSEL — sliding track, active card centered, adjacent peek
══════════════════════════════════════════════════════════════════ */
function SheetCarousel() {
  const [active, setActive] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  /* measure container width */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (next: number) => {
    if (next === active) return;
    setActive(next);
  };
  const prev = () => active > 0 && go(active - 1);
  const next = () => active < SHEETS.length - 1 && go(active + 1);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  /* card width = 78% of container; gap between cards = 20px */
  const CARD_W = containerW * (isMobile ? 0.88 : 0.78);
  const GAP = 8;
  /* translateX so active card is centered in container */
  const trackX = containerW > 0
    ? (containerW - CARD_W) / 2 - active * (CARD_W + GAP)
    : 0;

  return (
    <div className="blueprint-grid-subtle" style={{ backgroundColor: "var(--bg-secondary)" }}>

      {/* ── Sliding track ── */}
      <div
        ref={containerRef}
        style={{
          overflow: "hidden",
          position: "relative",
          padding: isMobile ? "28px 0" : "40px 0",
          height: isMobile ? "clamp(320px, 66vw, 520px)" : "clamp(600px, 86vh, 900px)",
        }}
      >
        <motion.div
          animate={{ x: trackX }}
          transition={{ duration: 0.48, ease: EASE }}
          style={{ display: "flex", gap: GAP, alignItems: "center", height: "100%", willChange: "transform" }}
        >
          {SHEETS.map((sheet, i) => (
            <div
              key={i}
              onClick={() => go(i)}
              style={{
                width: CARD_W,
                flexShrink: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: i === active ? 1 : 0.22,
                cursor: i !== active ? "pointer" : "default",
                transitionProperty: "opacity",
                transitionDuration: "320ms",
              }}
            >
              <img
                src={sheet.src}
                alt={i === active ? sheet.title : ""}
                loading="lazy"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                  userSelect: "none",
                  boxShadow: i === active
                    ? "0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)"
                    : "none",
                }}
              />
            </div>
          ))}
        </motion.div>

        {/* Prev arrow — sits just inside the left edge of center card */}
        <button
          onClick={prev}
          disabled={active === 0}
          aria-label="Previous sheet"
          style={{
            position: "absolute",
            left: containerW > 0 ? Math.max(8, (containerW - CARD_W) / 2 + 12) : "13%",
            top: "50%", transform: "translateY(-50%)",
            width: 36, height: 36, borderRadius: "50%",
            border: `1px solid ${active === 0 ? "var(--border)" : thesis.primary}`,
            background: active === 0 ? "transparent" : thesis.subtle,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: active === 0 ? "var(--text-muted)" : thesis.primary,
            cursor: active === 0 ? "default" : "pointer",
            transitionProperty: "background, color, border-color",
            transitionDuration: "200ms",
            zIndex: 5,
          }}
        >
          <CaretLeft size={15} weight="regular" />
        </button>

        {/* Next arrow — sits just inside the right edge of center card */}
        <button
          onClick={next}
          disabled={active === SHEETS.length - 1}
          aria-label="Next sheet"
          style={{
            position: "absolute",
            right: containerW > 0 ? Math.max(8, (containerW - CARD_W) / 2 + 12) : "13%",
            top: "50%", transform: "translateY(-50%)",
            width: 36, height: 36, borderRadius: "50%",
            border: `1px solid ${active === SHEETS.length - 1 ? "var(--border)" : thesis.primary}`,
            background: active === SHEETS.length - 1 ? "transparent" : thesis.subtle,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: active === SHEETS.length - 1 ? "var(--text-muted)" : thesis.primary,
            cursor: active === SHEETS.length - 1 ? "default" : "pointer",
            transitionProperty: "background, color, border-color",
            transitionDuration: "200ms",
            zIndex: 5,
          }}
        >
          <CaretRight size={15} weight="regular" />
        </button>
      </div>

      {/* ── Bottom info ── */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 14,
        padding: isMobile ? "14px 24px 28px" : "18px 0 36px",
      }}>

        {/* Dot navigation */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {SHEETS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to sheet ${i + 1}`}
              style={{
                width: i === active ? 22 : 7,
                height: 7,
                borderRadius: 4,
                border: "none",
                padding: 0,
                background: i === active ? thesis.primary : "var(--border)",
                cursor: "pointer",
                transitionProperty: "width, background",
                transitionDuration: "280ms",
              }}
            />
          ))}
        </div>

        {/* Sheet label + italic title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26 }}
            style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}
          >
            <span style={{ ...mono, fontSize: 9, color: thesis.muted, letterSpacing: "0.26em" }}>
              {SHEETS[active].label}&nbsp;&nbsp;{String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(SHEETS.length).padStart(2, "0")}
            </span>
            <span style={{
              fontFamily: serif, fontStyle: "italic",
              fontSize: isMobile ? 14 : 16,
              color: "var(--text-secondary)",
              lineHeight: 1.4,
            }}>
              {SHEETS[active].title}
            </span>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function ThesisCase() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-14"
    >
      {/* Top mask — solid white behind nav pill */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 59,
        background: "var(--bg-primary)", zIndex: 45,
        pointerEvents: "none",
      }} />

      {/* Scroll progress bar — sits behind nav pill (z-index 49 < nav 50) */}
      <div style={{
        position: "fixed", top: 56, left: 0, right: 0, height: 2,
        background: "var(--bg-primary)", zIndex: 49,
      }}>
        <motion.div style={{
          height: "100%", background: thesis.primary,
          scaleX, transformOrigin: "left", opacity: 0.85,
        }} />
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <DrawingSheetBorder
        titleBlock={{ name: "NIHARIKA PUNDLIK", sheet: "ARCHITECTURE / THESIS" }}
        className="blueprint-grid overflow-hidden"
        style={{ padding: "clamp(52px, 8vw, 88px) 0 clamp(44px, 6vw, 72px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Architecture · Thesis" letter="T" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ ...t.eyebrow, marginBottom: 20, letterSpacing: "0.22em" }}
              >
                B.Arch Thesis · 2023 · 20 Weeks
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE }}
                style={{ ...t.h1Display, margin: 0, marginBottom: "clamp(20px, 2.4vw, 32px)" }}
              >
                Public Realm:{" "}
                <span style={{ fontStyle: "italic", color: thesis.primary }}>Beyond</span>
                {" "}the Streets
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                style={{ ...t.bodyLg, maxWidth: 520 }}
              >
                Redefining public spaces, reviving community life. An architectural
                thesis exploring how underutilised urban land becomes a catalyst for
                social cohesion and belonging.
              </motion.p>
            </div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="grid grid-cols-3" style={{ borderTop: "1px solid var(--border)", paddingTop: 24, gap: 0 }}>
                {[
                  { value: 20, suffix: "", label: "Week Thesis" },
                  { value: 13, suffix: "+", label: "Project Sheets" },
                  { value: 4, suffix: "", label: "Case Studies" },
                ].map((s, i) => (
                  <div key={s.label} style={{
                    paddingRight: i < 2 ? "clamp(16px, 3vw, 32px)" : 0,
                    borderRight: i < 2 ? "1px solid var(--border)" : "none",
                    paddingLeft: i > 0 ? "clamp(16px, 3vw, 32px)" : 0,
                  }}>
                    <div style={{
                      fontFamily: serif, fontWeight: 700,
                      fontSize: "clamp(24px, 3vw, 40px)",
                      letterSpacing: "-0.03em",
                      color: thesis.primary, lineHeight: 1, marginBottom: 8,
                    }}>
                      <CountUp value={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.16em" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </DrawingSheetBorder>

      {/* ── Hero aerial render ───────────────────────────────────────── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        marginLeft: 0,
        maxHeight: isMobile ? "45vw" : "68vh",
      }}>
        <motion.img
          src="/thesis/img-11.jpg"
          alt="Aerial render, Public Realm thesis, Sonegao Nagpur"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ width: "100%", maxHeight: isMobile ? "45vw" : "68vh", objectFit: "cover", display: "block" }}
        />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 28%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "clamp(16px, 3vw, 28px)",
          left: "clamp(16px, 5vw, 40px)",
          ...mono, fontSize: 9, color: "rgba(255,255,255,0.72)", letterSpacing: "0.22em",
        }}>
          Aerial Render
        </div>
      </div>

      {/* ── Metadata strip ──────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div
          className="max-w-6xl mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          }}
        >
          {[
            { label: "Role", value: "Lead Architect, Researcher & Designer" },
            { label: "Type", value: "Individual Thesis" },
            { label: "Timeline", value: "20 Weeks · 2022–23" },
            { label: "Tools", value: "AutoCAD · SketchUp · Lumion · Photoshop" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.07}>
              <div style={{
                padding: isMobile ? "20px 16px" : "clamp(24px, 3.5vw, 40px) clamp(16px, 3vw, 36px)",
                borderRight: isMobile
                  ? (i % 2 === 0 ? "1px solid var(--border)" : "none")
                  : (i < 3 ? "1px solid var(--border)" : "none"),
                borderBottom: isMobile && i < 2 ? "1px solid var(--border)" : "none",
                height: "100%",
                display: "flex", flexDirection: "column", gap: 8,
              }}>
                <span style={{
                  ...mono, fontSize: 9, letterSpacing: "0.22em",
                  color: thesis.primary, fontWeight: 700,
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontFamily: sans,
                  fontSize: isMobile ? 14 : "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 500, lineHeight: 1.55,
                  color: "var(--text-primary)",
                }}>
                  {item.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── 01 / Overview ───────────────────────────────────────────── */}
      <section style={{ padding: SECTION_PAD }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionHeader num="01" title="Overview" phase="Context & Intent" total="03" />

          {/* Full-width lede */}
          <Reveal>
            <p style={{
              ...t.bodyLg,
              fontSize: "clamp(20px, 1.8vw, 26px)",
              maxWidth: 820,
              marginBottom: "clamp(36px, 5vw, 56px)",
            }}>
              An architectural initiative aimed at revitalising urban spaces by
              creating inclusive, sustainable, and vibrant public areas that
              foster community interactions and enhance quality of life.
            </p>
          </Reveal>

          {/* Ruled divider */}
          <Reveal delay={0.08}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(36px, 5vw, 56px)" }}>
              <div style={{ width: 32, height: 2, background: thesis.primary }} />
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
          </Reveal>

          {/* Body + Project Brief */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal delay={0.12}>
                <p style={{ ...t.body, fontSize: "clamp(18px, 1.4vw, 21px)" }}>
                  This thesis explores transforming underutilised urban spaces into
                  vibrant public realms through placemaking, sustainable design, and
                  inclusive spatial planning, fostering social cohesion and improving
                  urban life quality.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.2}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  borderTop: "1px solid var(--border)",
                }}>
                  {[
                    { value: "20", suffix: " wks", label: "Thesis Duration" },
                    { value: "3,770", suffix: " sq.m", label: "Site Area" },
                    { value: "5", suffix: "", label: "Programme Elements" },
                    { value: "4", suffix: "", label: "Case Studies" },
                  ].map((s, i) => (
                    <div key={s.label} style={{
                      padding: "clamp(24px, 3vw, 36px) clamp(16px, 2vw, 28px)",
                      borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                      borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                    }}>
                      <div style={{
                        fontFamily: serif, fontWeight: 700,
                        fontSize: "clamp(32px, 3.5vw, 48px)",
                        letterSpacing: "-0.035em", lineHeight: 1,
                        color: thesis.primary, marginBottom: 10,
                      }}>
                        {s.value}
                        <span style={{ fontSize: "0.45em", fontWeight: 400, letterSpacing: "0.04em", color: thesis.muted }}>
                          {s.suffix}
                        </span>
                      </div>
                      <div style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.18em" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </section>

      {/* ── 02 / Project Sheets ─────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        {/* Section header — light area */}
        <div className="blueprint-grid-subtle" style={{
          backgroundColor: "var(--bg-secondary)",
          padding: "clamp(72px, 9vw, 120px) 0 clamp(40px, 5vw, 60px)",
        }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
            <SectionHeader num="02" title="Project Sheets" phase="Documentation" total="03" />
          </div>
        </div>
        {/* Full-bleed dark carousel */}
        <SheetCarousel />
      </div>

      {/* ── 03 / Key Takeaways ──────────────────────────────────────── */}
      <div style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: SECTION_PAD,
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionHeader num="03" title="Key Takeaways" phase="Architecture → HCI" total="03" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16" style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div className="lg:col-span-5">
              <Reveal>
                <h2 style={t.h2Section}>
                  Where architecture{" "}
                  <span style={{ fontStyle: "italic", color: thesis.primary }}>
                    meets design thinking
                  </span>
                </h2>
              </Reveal>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { num: "01", title: "Placemaking prioritises engagement", body: "Just as UX design centres the user, architectural placemaking centres the inhabitant. Every spatial decision is tested against how people will actually dwell, move, and interact with the space." },
              { num: "02", title: "Sustainability and efficiency align", body: "Passive design strategies (orientation, natural ventilation, daylight) reduce energy load without compromising quality. The most sustainable solution is often the most elegant one." },
              { num: "03", title: "Human-centered thinking drives both disciplines", body: "The translation from architecture to HCI was natural because both share a core methodology: observe how people behave in a space, identify friction, redesign until the friction disappears." },
              { num: "04", title: "Context informs meaningful design", body: "A public space cannot be lifted from one city and planted in another. Site history, climate, culture, and existing movement patterns are the raw material, not constraints to work around." },
              { num: "05", title: "Iteration refines functionality", body: "No design survives contact with a real site unchanged. Iteration through model, section, and drawing is how spatial hypotheses get pressure-tested and resolved." },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 0.06}>
                <div style={{
                  display: "grid", gridTemplateColumns: isMobile ? "32px 1fr" : "48px 1fr",
                  gap: isMobile ? 12 : "clamp(16px, 3vw, 32px)",
                  padding: "clamp(20px, 3vw, 36px) 0",
                  borderBottom: "1px solid var(--border)",
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{ ...mono, fontSize: isMobile ? 16 : 11, color: thesis.primary, letterSpacing: "0.22em", paddingTop: 4 }}>
                    {item.num}
                  </span>
                  <div>
                    <h3 style={{ ...t.h3Lede, ...(isMobile ? { fontSize: 18 } : {}), margin: 0, marginBottom: 12 }}>{item.title}</h3>
                    <p style={{ ...t.body, ...(isMobile ? { fontSize: 15 } : {}), margin: 0 }}>{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────────────── */}
      <nav style={{ borderTop: "1px solid var(--border)" }}>
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <ThesisNavLink to="/#projects" align="left">
            <ArrowLeft size={14} weight="regular" />
            <span>
              <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", display: "block", marginBottom: 5 }}>
                Prev
              </span>
              <span style={{ ...mono, fontSize: 13, letterSpacing: "0.18em" }}>
                Home
              </span>
            </span>
          </ThesisNavLink>

          <ThesisNavLink to="/architecture/renders" align="right">
            <span style={{ textAlign: "right" }}>
              <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", display: "block", marginBottom: 5 }}>
                Next
              </span>
              <span style={{ ...mono, fontSize: 13, letterSpacing: "0.18em" }}>
                Rendered Realities
              </span>
            </span>
            <ArrowRight size={14} weight="regular" />
          </ThesisNavLink>
        </div>
      </nav>
    </motion.div>
  );
}

function ThesisNavLink({
  to,
  align,
  children,
}: {
  to: string;
  align: "left" | "right";
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <RouterLink
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        padding: "clamp(20px, 3vw, 32px) 0",
        textDecoration: "none",
        color: hovered ? "var(--accent)" : "var(--text-secondary)",
        transitionProperty: "color",
        transitionDuration: "200ms",
      }}
    >
      {children}
    </RouterLink>
  );
}
