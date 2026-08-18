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
import { GradientBackground } from "../components/GradientBackground";
import LiquidBackground from "../components/LiquidBackground";
import { SectionHeader } from "../components/CaseSectionHeader";

/* ── Brand palette ────────────────────────────────────────────────── */
const thesis = {
  primary: "#4262FF",
  light:   "#6E86FF",
  dark:    "#2A3AB0",
  surface: "#EEF1FF",
  subtle:  "rgba(66, 98, 255, 0.08)",
  muted:   "rgba(66, 98, 255, 0.55)",
};

/* ── Type scale ───────────────────────────────────────────────────── */
const mono: React.CSSProperties = {
  fontFamily: "'Manrope', monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
};
const serif = "'Manrope', Georgia, serif";
const sans  = "'Manrope', system-ui, sans-serif";

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
    <div style={{ backgroundColor: "var(--bg-secondary)", backgroundImage: "radial-gradient(circle, rgba(66,98,255,0.09) 1px, transparent 1.5px)", backgroundSize: "22px 22px", backgroundPosition: "-11px -11px" }}>

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
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-14"
    >
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        background: "var(--bg-primary)",
        marginTop: "-56px",
        padding: "calc(56px + clamp(48px, 6vw, 80px)) 0 clamp(48px, 6vw, 76px)",
      }}>
        {/* Blue noisy-gradient hero background */}
        <GradientBackground
          gradientType="radial-gradient"
          gradientSize="150% 130%"
          gradientOrigin="top-middle"
          colors={[
            { color: "rgba(66,98,255,0.18)", stop: "0%" },
            { color: "rgba(110,134,255,0.11)", stop: "34%" },
            { color: "rgba(150,168,255,0.06)", stop: "62%" },
            { color: "rgba(238,241,255,0)", stop: "100%" },
          ]}
          noisePatternAlpha={26}
          noiseIntensity={1}
          noisePatternRefreshInterval={1}
          noisePatternSize={100}
          style={{ zIndex: 0 }}
        />
        {/* Dotted grid overlay */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(66,98,255,0.09) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "-11px -11px",
          WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
        }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
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
      </section>

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
          <SectionHeader
            num="01"
            phase="Context & intent"
            title={<>Turning underused urban land into<span style={{ fontStyle: "italic", color: thesis.primary }}> shared public life.</span></>}
            accent={thesis.primary}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p style={{ ...t.bodyLg, maxWidth: 680 }}>
                  The thesis reimagines underutilised urban spaces as inclusive, sustainable public
                  realms — using placemaking, passive design, and context-led spatial planning to
                  foster social cohesion and lift everyday quality of life.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Minimal stat row */}
          <Reveal delay={0.18}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "clamp(24px, 3vw, 48px)",
              marginTop: "clamp(48px, 5.5vw, 76px)",
              borderTop: "1px solid var(--border)",
              paddingTop: "clamp(32px, 3.5vw, 44px)",
            }}>
              {([
                { value: "20",    suffix: " wks",  label: "Thesis duration" },
                { value: "3,770", suffix: " sq.m", label: "Site area" },
                { value: "5",     suffix: "",      label: "Programme elements" },
                { value: "4",     suffix: "",      label: "Case studies" },
              ] as { value: string; suffix: string; label: string }[]).map((st) => (
                <div key={st.label}>
                  <div style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(34px, 3.6vw, 48px)",
                    letterSpacing: "-0.035em", lineHeight: 1,
                    color: thesis.primary, marginBottom: 10,
                  }}>
                    {st.value}
                    <span style={{ fontSize: "0.42em", fontWeight: 400, letterSpacing: "0.03em", color: thesis.muted }}>{st.suffix}</span>
                  </div>
                  <div style={{ ...mono, fontSize: 10.5, color: "var(--text-muted)", letterSpacing: "0.16em", fontWeight: 600 }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 / Project Sheets ─────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        {/* Section header — light area */}
        <div style={{
          backgroundColor: "var(--bg-secondary)",
          backgroundImage: "radial-gradient(circle, rgba(66,98,255,0.09) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "-11px -11px",
          padding: "clamp(72px, 9vw, 120px) 0 clamp(40px, 5vw, 60px)",
        }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
            <SectionHeader num="02" phase="Documentation" title={<>The thesis,<span style={{ fontStyle: "italic", color: thesis.primary }}> sheet by sheet.</span></>} accent={thesis.primary} />
          </div>
        </div>
        {/* Full-bleed dark carousel */}
        <SheetCarousel />
      </div>

      {/* ── 03 / Key Takeaways ──────────────────────────────────────── */}
      <section className="thesis-liquid-section" style={{
        borderTop: "1px solid rgba(42, 58, 176, 0.18)",
        borderBottom: "1px solid rgba(42, 58, 176, 0.18)",
        padding: SECTION_PAD,
      }}>
        <LiquidBackground c0="eef1ff" c1="dbe1ff" c2="aeb9ff" fade={0} lift={0.28} grain={0.055} speed={0.1} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionHeader
            num="03"
            phase="Architecture → HCI"
            title={<>Where architecture meets<span style={{ fontStyle: "italic", color: thesis.primary }}> design thinking.</span></>}
            accent={thesis.primary}
          />

          <div>
            {([
              { title: "Placemaking prioritises engagement", body: "Just as UX design centres the user, architectural placemaking centres the inhabitant. Every spatial decision is tested against how people will actually dwell, move, and interact with the space." },
              { title: "Sustainability and efficiency align", body: "Passive design strategies — orientation, natural ventilation, daylight — reduce energy load without compromising quality. The most sustainable solution is often the most elegant one." },
              { title: "Human-centred thinking drives both disciplines", body: "The translation from architecture to HCI was natural: both share a core method — observe how people behave in a space, find the friction, and redesign until it disappears." },
              { title: "Context informs meaningful design", body: "A public space cannot be lifted from one city and planted in another. Site history, climate, culture, and existing movement patterns are the raw material, not constraints to work around." },
              { title: "Iteration refines functionality", body: "No design survives contact with a real site unchanged. Iteration through model, section, and drawing is how spatial hypotheses get pressure-tested and resolved." },
            ] as { title: string; body: string }[]).map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 5fr) minmax(0, 7fr)",
                  gap: isMobile ? 10 : "clamp(24px, 4vw, 56px)",
                  padding: "clamp(24px, 3vw, 34px) 0",
                  borderTop: "1px solid rgba(42, 58, 176, 0.32)",
                }}>
                  <h3 style={{
                    fontFamily: serif, fontWeight: 700,
                    fontSize: "clamp(20px, 1.9vw, 25px)",
                    letterSpacing: "-0.02em", lineHeight: 1.25,
                    color: "var(--text-primary)", margin: 0,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ ...t.body, margin: 0 }}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Navigation ──────────────────────────────────────────────── */}
      <nav style={{ borderTop: "1px solid var(--border)" }}>
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", padding: "clamp(32px, 4.5vw, 56px) 0" }}
        >
          <ThesisNavLink to="/#projects" dir="prev" title="Home" />
          <ThesisNavLink to="/architecture/renders" dir="next" title="Rendered Realities" />
        </div>
      </nav>
    </motion.div>
  );
}

function ThesisNavLink({
  to, dir, title,
}: {
  to: string;
  dir: "prev" | "next";
  title: string;
}) {
  const [hovered, setHovered] = useState(false);
  const isNext = dir === "next";
  const Arrow = isNext ? ArrowRight : ArrowLeft;
  const arrow = (
    <motion.span
      aria-hidden
      animate={{ x: hovered ? (isNext ? 4 : -4) : 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      style={{
        display: "inline-flex", flexShrink: 0,
        color: hovered ? "#1A1A1A" : "var(--text-muted)",
        transition: "color 200ms ease",
      }}
    >
      <Arrow size={20} weight="regular" />
    </motion.span>
  );
  return (
    <RouterLink
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 12,
        padding: "10px 16px", margin: "0 -16px", borderRadius: 12,
        textDecoration: "none",
        color: "var(--text-primary)",
        background: hovered ? "rgba(66,98,255,0.14)" : "transparent",
        transition: "background 200ms ease",
      }}
    >
      {!isNext && arrow}
      <span style={{
        fontFamily: serif, fontWeight: 700,
        fontSize: "clamp(20px, 2vw, 28px)",
        letterSpacing: "-0.02em", lineHeight: 1.1,
      }}>
        {title}
      </span>
      {isNext && arrow}
    </RouterLink>
  );
}
