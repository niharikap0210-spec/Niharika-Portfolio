import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon as ArrowLeft, ArrowRightIcon as ArrowRight } from "@phosphor-icons/react";
import DrawingSheetBorder from "../components/DrawingSheetBorder";
import SectionMarker from "../components/SectionMarker";

const accent = {
  primary: "#4E7396",
  light: "#6B90B3",
  dark: "#2E4F6A",
  surface: "#EBF1F8",
};

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 1, 0.4, 1] }}
    >
      {children}
    </motion.div>
  );
}

const allImages = [
  "/renders/villa-01.jpg",
  "/renders/villa-02.jpg",
  "/renders/villa-03.jpg",
  "/renders/villa-04.jpg",
  "/renders/villa-05.jpg",
  "/renders/villa-06.jpg",
  "/renders/villa-07.jpg",
  "/renders/villa-08.jpg",
  "/renders/villa-09.jpg",
  "/renders/villa-10.jpg",
  "/renders/villa-11.jpg",
  "/renders/villa-12.jpg",
  "/renders/villa-13.jpg",
  "/renders/urban-01.jpg",
  "/renders/urban-02.jpg",
  "/renders/urban-03.jpg",
  "/renders/urban-04.jpg",
  "/renders/urban-05.jpg",
  "/renders/urban-06.jpg",
  "/renders/urban-07.jpg",
  "/renders/urban-08.jpg",
  "/renders/urban-09.jpg",
  "/renders/urban-10.jpg",
  "/renders/urban-11.jpg",
  "/renders/urban-12.jpg",
  "/renders/urban-13.jpg",
  "/renders/grameen-01.jpg",
  "/renders/grameen-02.jpg",
  "/renders/grameen-03.jpg",
  "/renders/grameen-04.jpg",
  "/renders/grameen-05.jpg",
  "/renders/grameen-06.jpg",
  "/renders/grameen-07.jpg",
  "/renders/grameen-08.jpg",
];

export default function RendersCase() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-14"
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: "left",
          position: "fixed",
          top: 56,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: accent.primary,
          zIndex: 50,
        }}
      />

      {/* ── Hero ── */}
      <DrawingSheetBorder
        titleBlock={{ name: "NIHARIKA PUNDLIK", sheet: "ARCHITECTURE / VISUALIZATION" }}
        className="blueprint-grid"
        style={{ padding: "clamp(52px, 8vw, 88px) 0 clamp(44px, 6vw, 72px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Architecture · Visualization" letter="R" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em", marginBottom: 20 }}
              >
                B.Arch · SVITS Indore · 2019–2024
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.25, 1, 0.4, 1] }}
                style={{
                  fontFamily: serif,
                  fontWeight: 700,
                  fontSize: "clamp(40px, 5.5vw, 80px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "var(--text-primary)",
                  margin: 0,
                  marginBottom: "clamp(20px, 2.4vw, 32px)",
                }}
              >
                Rendered{" "}
                <span style={{ fontStyle: "italic", color: accent.primary }}>Realities</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  maxWidth: 520,
                }}
              >
                3D modelling and visualisation in architecture — translating
                technical drawings into spatial narratives that communicate
                design intent before a single brick is laid.
              </motion.p>
            </div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div
                className="grid grid-cols-3"
                style={{ borderTop: "1px solid var(--border)", paddingTop: 24, gap: 0 }}
              >
                {[
                  { value: "4", label: "Tools Used" },
                  { value: "5", label: "Stage Process" },
                  { value: "B.Arch", label: "Discipline" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      paddingRight: i < 2 ? "clamp(16px, 3vw, 32px)" : 0,
                      borderRight: i < 2 ? "1px solid var(--border)" : "none",
                      paddingLeft: i > 0 ? "clamp(16px, 3vw, 32px)" : 0,
                    }}
                  >
                    <div style={{
                      fontFamily: serif,
                      fontWeight: 700,
                      fontSize: "clamp(24px, 3vw, 40px)",
                      letterSpacing: "-0.03em",
                      color: "var(--text-primary)",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}>
                      {s.value}
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

      {/* ── Image gallery ── */}
      <section style={{ padding: "clamp(48px, 6vw, 72px) 0 clamp(72px, 9vw, 112px)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(6px, 1vw, 10px)",
            padding: "0 clamp(6px, 1vw, 10px)",
          }}
        >
          {allImages.map((src, i) => (
            <Reveal key={src} delay={i * 0.03}>
              <div
                onClick={() => setLightbox(src)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "zoom-in",
                  backgroundColor: "var(--bg-secondary)",
                  aspectRatio: "16/9",
                }}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transitionProperty: "transform",
                    transitionDuration: "600ms",
                    transitionTimingFunction: "cubic-bezier(0.25, 1, 0.4, 1)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Navigation row ── */}
      <section
        style={{ padding: "clamp(48px, 6vw, 72px) 0" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10"
      >
        <div className="flex items-center justify-between">
          <Link
            to="/architecture/thesis"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              ...mono,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transitionProperty: "color",
              transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accent.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <ArrowLeft size={14} weight="regular" />
            Thesis
          </Link>

          <Link
            to="/architecture"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              ...mono,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transitionProperty: "color",
              transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accent.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            Architecture
            <ArrowRight size={14} weight="regular" />
          </Link>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(26,26,26,0.95)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(16px, 4vw, 40px)",
              cursor: "zoom-out",
            }}
          >
            <motion.img
              src={lightbox}
              alt=""
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.4, 1] }}
              style={{
                maxWidth: "92vw",
                maxHeight: "92vh",
                objectFit: "contain",
                display: "block",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
