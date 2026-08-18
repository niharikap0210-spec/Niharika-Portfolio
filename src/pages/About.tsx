import { motion } from "framer-motion";
import { pageTransition } from "../lib/pageTransition";
import { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { GradientBackground } from "../components/GradientBackground";

const serif = "'Manrope', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";
const mono: React.CSSProperties = {
  fontFamily: "'Manrope', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.16em",
};
const ACCENT = "#4262FF";

const para: React.CSSProperties = {
  fontFamily: sans,
  fontSize: "clamp(15px, 1.4vw, 18.5px)",
  lineHeight: 1.72,
  color: "var(--text-secondary)",
  margin: 0,
};

/* Miro-board style skill note — a floating card with a dashed connector to the portrait. */
function SkillNote({
  text,
  rot,
  conn,
  css,
}: {
  text: string;
  rot: number;
  conn: { ox: number; oy: number; angle: number; len: number };
  css: React.CSSProperties;
}) {
  const rad = (conn.angle * Math.PI) / 180;
  const endX = Math.cos(rad) * conn.len;
  const endY = Math.sin(rad) * conn.len;
  return (
    <div aria-hidden className="hidden lg:block hero-note" style={{ position: "absolute", zIndex: 3, pointerEvents: "none", ...css }}>
      {/* dashed connector line — a simple tick pointing toward the portrait */}
      <div
        style={{
          position: "absolute",
          left: `${conn.ox}%`,
          top: `${conn.oy}%`,
          width: conn.len,
          height: 0,
          borderTop: "2px dashed rgba(66, 98, 255, 0.55)",
          transformOrigin: "left center",
          transform: `rotate(${conn.angle}deg)`,
        }}
      />
      {/* small endpoint dot */}
      <div
        style={{
          position: "absolute",
          left: `calc(${conn.ox}% + ${endX}px)`,
          top: `calc(${conn.oy}% + ${endY}px)`,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: ACCENT,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* card */}
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          transform: `rotate(${rot}deg)`,
          background: "#fff",
          border: "1px solid rgba(9, 30, 66, 0.07)",
          borderRadius: 13,
          padding: "10px 16px 10px 13px",
          boxShadow: "0 2px 5px rgba(9, 30, 66, 0.05), 0 16px 34px rgba(9, 30, 66, 0.13)",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 7,
            background: "rgba(66, 98, 255, 0.11)",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: 2, background: ACCENT }} />
        </span>
        <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
          {text}
        </span>
      </div>
    </div>
  );
}

const RM =
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (RM || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".hero-line", { opacity: 0, y: 18, duration: 0.6, stagger: 0.07 }, 0)
        .fromTo(
          ".hero-portrait",
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.95 },
          0.15
        );

      // Skill notes — pop in, then drift gently so the board feels alive
      gsap.from(".hero-note", { opacity: 0, scale: 0.85, duration: 0.5, stagger: 0.08, ease: "back.out(1.6)", delay: 0.7 });
      gsap.utils.toArray<HTMLElement>(".hero-note").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? "+=12" : "-=12",
          rotation: i % 2 === 0 ? 1.2 : -1.2,
          duration: 2.6 + (i % 3) * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2 + i * 0.18,
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <motion.div {...pageTransition} className="pt-14">
      <section
        ref={root}
        style={{
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          minHeight: "100svh",
          background: "var(--bg-primary)",
          marginTop: "-56px",
          display: "flex",
        }}
      >
        {/* Blue noisy-gradient background */}
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
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: "radial-gradient(circle, rgba(66,98,255,0.09) 1px, transparent 1.5px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "-11px -11px",
            WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)",
          }}
        />

        <div
          className="max-w-6xl mx-auto px-6 md:px-10 w-full relative"
          style={{
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "calc(56px + clamp(18px, 2.6vw, 36px))",
            paddingBottom: "clamp(28px, 3.5vw, 52px)",
          }}
        >
          {/* Copy */}
          <div className="relative z-10 w-full lg:max-w-[50%] order-1">
            <h1
              className="hero-line"
              style={{
                fontFamily: serif,
                fontWeight: 800,
                fontSize: "clamp(44px, 7.4vw, 106px)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                lineHeight: 0.86,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Niharika
              <br />
              Pundlik<span style={{ color: ACCENT }}>.</span>
            </h1>

            <p
              className="hero-line"
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(21px, 2.6vw, 34px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
                marginTop: "clamp(18px, 2.2vw, 30px)",
                color: "var(--text-primary)",
              }}
            >
              Product designer,{" "}
              <span style={{ color: ACCENT }}>architect by training.</span>
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(14px, 1.6vw, 20px)",
                marginTop: "clamp(26px, 3vw, 40px)",
                maxWidth: "58ch",
              }}
            >
              <p className="hero-line" style={para}>
                I came to screens through buildings. Five years of architecture school taught me
                to think in systems, light, and human scale, and a master's in Human-Computer
                Interaction turned that instinct toward people and products. I still measure
                twice, sweat every detail, and sketch on paper before I open Figma. The medium
                changed from stone to screens; the discipline didn't.
              </p>
              <p className="hero-line" style={para}>
                I design across healthcare, security, and AI tooling, and I work end to end:
                interviewing stakeholders, running usability studies, and turning tangled
                workflows into interfaces that feel obvious. I build design systems from the
                ground up so a product stays coherent as it grows, prototype in code when it
                sharpens a decision, and sweat accessibility and the handoff between design and
                engineering. At PyCube I reshaped a hospital specimen-tracking tool into a calm,
                barcode-first experience that clinicians actually trust. What I care about most
                are the quiet moments where a product shows it understands you.
              </p>
            </div>

            <div style={{ marginTop: "clamp(24px, 2.8vw, 38px)", display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 30px)" }}>
              <div className="hero-line flex flex-wrap" style={{ gap: 10 }}>
                {["3+ years shipping", "GPA 4.0 · HCI", "WCAG 2.1 AA accessible"].map((c) => (
                  <span
                    key={c}
                    style={{
                      fontFamily: sans,
                      fontSize: "clamp(13px, 1.15vw, 15px)",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      border: "1px solid rgba(66, 98, 255, 0.32)",
                      background: "rgba(66, 98, 255, 0.05)",
                      borderRadius: 999,
                      padding: "9px 18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <RouterLink
                to="/#projects"
                className="hero-line group"
                style={{ display: "inline-flex", flexDirection: "column", gap: 8, textDecoration: "none", width: "fit-content" }}
              >
                <span
                  className="group-hover:text-[#4262FF]"
                  style={{
                    fontFamily: serif,
                    fontWeight: 700,
                    fontSize: "clamp(15px, 1.25vw, 18px)",
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                    transition: "color 200ms ease",
                  }}
                >
                  See selected work
                </span>
                <span
                  aria-hidden
                  className="group-hover:bg-[#4262FF]"
                  style={{ width: 108, height: 2, background: "var(--text-primary)", transition: "background-color 200ms ease" }}
                />
              </RouterLink>
            </div>
          </div>

          {/* Miro-board skill notes floating around the portrait (desktop) */}
          <SkillNote text="Design systems" rot={-3} conn={{ ox: 50, oy: 100, angle: 90, len: 22 }} css={{ right: "4%", bottom: "94vh" }} />
          <SkillNote text="Vibe coding" rot={4} conn={{ ox: 100, oy: 52, angle: 15, len: 26 }} css={{ right: "27%", bottom: "92vh" }} />
          <SkillNote text="User research" rot={-2} conn={{ ox: 100, oy: 55, angle: 12, len: 24 }} css={{ right: "26%", bottom: "79vh" }} />
          <SkillNote text="Prototyping" rot={3} conn={{ ox: 100, oy: 50, angle: 5, len: 26 }} css={{ right: "28%", bottom: "62vh" }} />
          <SkillNote text="AI-assisted design" rot={-2} conn={{ ox: 100, oy: 48, angle: 0, len: 28 }} css={{ right: "30%", bottom: "45vh" }} />

          {/* Illustrated portrait · larger centerpiece */}
          <img
            className="hero-portrait order-2 mx-auto mt-10 block lg:order-none lg:mx-0 lg:mt-0 lg:absolute lg:-right-12 lg:bottom-0"
            src="/about/cartoon1.png"
            alt="Illustration of Niharika Pundlik"
            style={{
              height: "clamp(440px, 92vh, 920px)",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
        </div>
      </section>
    </motion.div>
  );
}
