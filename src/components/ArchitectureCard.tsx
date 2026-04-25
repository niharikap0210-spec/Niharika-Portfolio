import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

interface ArchAccent {
  primary: string;
  light: string;
  dark: string;
  surface: string;
}

interface ArchitectureCardProps {
  index: number;
  title: string;
  subtitle: string;
  type: string;
  year: string;
  tags: string[];
  href: string;
  accent: ArchAccent;
  visualKind: "thesis" | "renders";
}

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
};

const SPRING = { type: "spring" as const, stiffness: 200, damping: 32, mass: 0.8 };
const EASE = [0.25, 1, 0.4, 1] as const;

export default function ArchitectureCard({
  index, title, subtitle, type, year, tags, href, accent, visualKind,
}: ArchitectureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const indexLabel = `B-${String(index + 1).padStart(2, "0")}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <motion.article
          animate={{ y: hovered ? -6 : 0 }}
          transition={SPRING}
          style={{
            position: "relative",
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            padding: "clamp(20px, 2vw, 28px)",
            boxShadow: hovered
              ? `0 2px 6px rgba(0,0,0,0.04), 0 20px 48px ${accent.primary}1a`
              : "0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.025)",
            transitionProperty: "box-shadow, border-color",
            transitionDuration: "300ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            borderColor: hovered ? `${accent.primary}55` : "var(--border)",
          }}
        >
          {/* Inset dashed construction border */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 10,
              border: `0.75px dashed ${hovered ? accent.primary + "55" : "var(--construction)"}`,
              pointerEvents: "none",
              transitionProperty: "border-color",
              transitionDuration: "300ms",
              zIndex: 1,
            }}
          />

          <CornerTicks hovered={hovered} color={accent.primary} />

          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Eyebrow row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 12 }}>
              <motion.span
                animate={{ color: hovered ? accent.dark : "var(--text-muted)" }}
                transition={{ duration: 0.3 }}
                style={{
                  ...mono,
                  fontSize: 10,
                  padding: "4px 9px",
                  border: `0.75px solid ${hovered ? accent.primary + "77" : "var(--border)"}`,
                  backgroundColor: hovered ? accent.surface : "var(--bg-primary)",
                  transitionProperty: "background-color, border-color",
                  transitionDuration: "300ms",
                }}
              >
                {indexLabel}
              </motion.span>

              <span style={{
                ...mono, fontSize: 9, color: "var(--text-muted)", opacity: 0.85,
                flex: 1, textAlign: "center", letterSpacing: "0.16em",
              }}>
                {type}
              </span>

              <span style={{ ...mono, fontSize: 10, color: "var(--text-muted)" }}>{year}</span>
            </div>

            {/* Drafting line */}
            <div aria-hidden style={{ height: 0, borderTop: "0.75px solid var(--border)", marginBottom: 18, position: "relative" }}>
              <span style={{ position: "absolute", top: -3, left: 0, width: 1, height: 6, backgroundColor: "var(--construction)" }} />
              <span style={{ position: "absolute", top: -3, right: 0, width: 1, height: 6, backgroundColor: "var(--construction)" }} />
            </div>

            {/* Hero visual */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 2", overflow: "hidden" }}>
              {visualKind === "thesis"
                ? <ThesisStage accent={accent} hovered={hovered} />
                : <RendersStage accent={accent} hovered={hovered} />
              }
            </div>

            {/* Title + subtitle */}
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(26px, 2.6vw, 34px)",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  margin: 0,
                }}>
                  {title}
                </h3>
                <motion.span
                  aria-hidden
                  animate={{ scale: hovered ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 1.4, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
                  style={{
                    width: 7, height: 7, borderRadius: 999,
                    backgroundColor: accent.primary, opacity: 0.85,
                    display: "inline-block", flexShrink: 0,
                  }}
                />
              </div>

              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                margin: 0,
                marginBottom: 22,
              }}>
                {subtitle}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                <div style={{
                  ...mono, fontSize: 10,
                  color: hovered ? accent.dark : "var(--text-secondary)",
                  transitionProperty: "color", transitionDuration: "300ms",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <span>View Project</span>
                  <span aria-hidden style={{ position: "relative", display: "inline-block", width: 48, height: 1, overflow: "hidden" }}>
                    <motion.span
                      initial={false}
                      animate={{ scaleX: hovered ? 1 : 0.25 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{
                        position: "absolute", inset: 0,
                        backgroundColor: hovered ? accent.primary : "var(--border)",
                        transformOrigin: "left center",
                      }}
                    />
                  </span>
                  <ArrowUpRight
                    size={14}
                    weight="regular"
                    style={{
                      color: hovered ? accent.primary : "currentColor",
                      transitionProperty: "color",
                      transitionDuration: "300ms",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                  {tags.slice(0, 2).map((tag) => (
                    <span key={tag} style={{
                      ...mono, fontSize: 8, color: "var(--text-muted)",
                      letterSpacing: "0.14em", padding: "2px 7px",
                      border: "0.5px solid var(--border)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </a>
    </motion.div>
  );
}


/* ── Thesis visual — urban site plan ─────────────────────────────── */
function ThesisStage({ accent, hovered }: { accent: ArchAccent; hovered: boolean }) {
  const p = accent.primary;
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(120% 80% at 50% 0%, ${accent.surface} 0%, ${p}0d 60%, transparent 100%),
                   linear-gradient(180deg, ${accent.surface} 0%, ${p}0a 100%)`,
      border: `0.75px solid ${p}22`,
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, ${p}12 0, ${p}12 0.5px, transparent 0.5px, transparent 30px),
          repeating-linear-gradient(90deg, ${p}12 0, ${p}12 0.5px, transparent 0.5px, transparent 30px)
        `,
        opacity: hovered ? 0.85 : 0.55,
        transitionProperty: "opacity", transitionDuration: "400ms",
      }} />

      <motion.svg
        viewBox="0 0 400 267"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 30, mass: 0.9 }}
      >
        <defs>
          <clipPath id="publicSpaceClip">
            <rect x="118" y="93" width="164" height="108" />
          </clipPath>
        </defs>

        {/* Site boundary */}
        <rect x="28" y="18" width="344" height="231" fill="none"
          stroke={p} strokeWidth="1.5" strokeDasharray="9 5" opacity="0.35" />

        {/* Surrounding urban fabric */}
        {([
          [44, 33, 56, 46], [110, 33, 48, 37], [170, 33, 58, 46],
          [240, 33, 68, 40], [320, 33, 48, 46],
          [44, 200, 54, 40], [110, 205, 62, 34], [188, 203, 44, 34], [308, 198, 58, 41],
          [44, 104, 40, 72], [348, 98, 16, 76],
        ] as [number, number, number, number][]).map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h}
            fill={`${p}10`} stroke={`${p}38`} strokeWidth="0.75" />
        ))}

        {/* Central public space */}
        <rect x="118" y="93" width="164" height="108"
          fill={`${p}16`} stroke={p} strokeWidth="1.5" opacity={hovered ? 1 : 0.75} />

        {/* Diagonal hatching */}
        {Array.from({ length: 22 }, (_, i) => (
          <line key={`hatch-${i}`}
            x1={118 + i * 14} y1="93" x2={118 + i * 14 - 108} y2="201"
            stroke={`${p}18`} strokeWidth="0.5" clipPath="url(#publicSpaceClip)" />
        ))}

        {/* Trees */}
        {([
          [152, 124, 9], [196, 147, 11], [245, 131, 8], [170, 170, 8], [228, 172, 9],
        ] as [number, number, number][]).map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill={`${p}18`} stroke={p} strokeWidth="0.75" />
        ))}

        {/* Circulation axes */}
        <line x1="200" y1="18" x2="200" y2="93" stroke={`${p}55`} strokeWidth="1" strokeDasharray="5 3" />
        <line x1="200" y1="201" x2="200" y2="249" stroke={`${p}55`} strokeWidth="1" strokeDasharray="5 3" />
        <line x1="28" y1="147" x2="118" y2="147" stroke={`${p}55`} strokeWidth="1" strokeDasharray="5 3" />
        <line x1="282" y1="147" x2="372" y2="147" stroke={`${p}55`} strokeWidth="1" strokeDasharray="5 3" />

        {/* North arrow */}
        <g transform="translate(352, 48)">
          <line x1="0" y1="11" x2="0" y2="-11" stroke={`${p}80`} strokeWidth="1" />
          <polygon points="0,-11 -3.5,-2 3.5,-2" fill={p} opacity="0.65" />
          <text x="0" y="19" textAnchor="middle" fontSize="6"
            fill={`${p}80`} fontFamily="Space Mono, monospace">N</text>
        </g>

        {/* Scale bar */}
        <g transform="translate(38, 253)">
          <line x1="0" y1="0" x2="52" y2="0" stroke={`${p}60`} strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke={`${p}60`} strokeWidth="1" />
          <line x1="52" y1="-3" x2="52" y2="3" stroke={`${p}60`} strokeWidth="1" />
          <line x1="26" y1="-2" x2="26" y2="2" stroke={`${p}60`} strokeWidth="0.75" />
          <text x="26" y="-6" textAnchor="middle" fontSize="5.5"
            fill={`${p}70`} fontFamily="Space Mono, monospace">50 m</text>
        </g>

        {/* Labels */}
        <text x="118" y="86" fontSize="6" fill={`${p}80`}
          fontFamily="Space Mono, monospace" letterSpacing="1.5">SITE PLAN — 1:500</text>
        <text x="200" y="143" textAnchor="middle" fontSize="7" fill={`${p}80`}
          fontFamily="Space Mono, monospace" letterSpacing="1">PUBLIC REALM</text>
      </motion.svg>
    </div>
  );
}


/* ── Renders visual — elevation + render layers ───────────────────── */
function RendersStage({ accent, hovered }: { accent: ArchAccent; hovered: boolean }) {
  const p = accent.primary;
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(120% 80% at 40% 0%, ${accent.surface} 0%, ${p}0d 60%, transparent 100%),
                   linear-gradient(180deg, ${accent.surface} 0%, ${p}0a 100%)`,
      border: `0.75px solid ${p}22`,
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, ${p}10 0, ${p}10 0.5px, transparent 0.5px, transparent 36px),
          repeating-linear-gradient(90deg, ${p}10 0, ${p}10 0.5px, transparent 0.5px, transparent 36px)
        `,
        opacity: hovered ? 0.75 : 0.45,
        transitionProperty: "opacity", transitionDuration: "400ms",
      }} />

      <motion.svg
        viewBox="0 0 400 267"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 30, mass: 0.9 }}
      >
        {/* ── Building Elevation (left side) ── */}
        <line x1="32" y1="222" x2="230" y2="222" stroke={`${p}60`} strokeWidth="1.5" />
        <rect x="44" y="222" width="170" height="4" fill={`${p}15`} />

        {/* Main body */}
        <rect x="44" y="82" width="170" height="140"
          fill={`${p}10`} stroke={p} strokeWidth="1.25" />
        {/* Shadow plane */}
        <rect x="158" y="82" width="56" height="140" fill={`${p}12`} />

        {/* Roof parapet */}
        <rect x="38" y="74" width="182" height="10"
          fill={`${p}14`} stroke={p} strokeWidth="1" />

        {/* Upper setback */}
        <rect x="68" y="40" width="122" height="42"
          fill={`${p}12`} stroke={p} strokeWidth="1" />
        <rect x="152" y="40" width="38" height="42" fill={`${p}10`} />

        {/* Lower windows */}
        {([
          [58, 100], [58, 132], [58, 164], [58, 196],
          [92, 100], [92, 132], [92, 164], [92, 196],
          [126, 100], [126, 132], [126, 164], [126, 196],
        ] as [number, number][]).map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="22" height="22"
            fill={`${p}16`} stroke={`${p}45`} strokeWidth="0.75" />
        ))}

        {/* Upper windows */}
        {([
          [82, 52], [116, 52], [150, 52],
        ] as [number, number][]).map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="20" height="18"
            fill={`${p}14`} stroke={`${p}40`} strokeWidth="0.75" />
        ))}

        {/* Entry door */}
        <rect x="110" y="183" width="38" height="39"
          fill={`${p}18`} stroke={p} strokeWidth="1" />
        <line x1="129" y1="183" x2="129" y2="222" stroke={`${p}50`} strokeWidth="0.75" />

        <text x="129" y="242" textAnchor="middle" fontSize="6" fill={`${p}75`}
          fontFamily="Space Mono, monospace" letterSpacing="1.5">SOUTH ELEVATION — 1:100</text>

        {/* ── Render layer panels (right side) ── */}
        {/* 01 Wireframe */}
        <g transform="translate(248, 38)">
          <rect x="0" y="0" width="118" height="66"
            fill="none" stroke={`${p}55`} strokeWidth="0.75" />
          <rect x="12" y="10" width="94" height="46"
            fill="none" stroke={`${p}45`} strokeWidth="0.5" />
          <line x1="12" y1="28" x2="106" y2="28" stroke={`${p}30`} strokeWidth="0.5" />
          <line x1="12" y1="42" x2="106" y2="42" stroke={`${p}30`} strokeWidth="0.5" />
          <line x1="38" y1="10" x2="38" y2="56" stroke={`${p}30`} strokeWidth="0.5" />
          <line x1="64" y1="10" x2="64" y2="56" stroke={`${p}30`} strokeWidth="0.5" />
          <line x1="90" y1="10" x2="90" y2="56" stroke={`${p}30`} strokeWidth="0.5" />
          <text x="59" y="-4" textAnchor="middle" fontSize="5.5"
            fill={`${p}65`} fontFamily="Space Mono, monospace" letterSpacing="1">01 · WIREFRAME</text>
        </g>

        {/* 02 Clay render */}
        <g transform="translate(256, 118)">
          <rect x="0" y="0" width="118" height="66"
            fill={`${p}0a`} stroke={`${p}60`} strokeWidth="0.75" />
          <rect x="12" y="10" width="94" height="46"
            fill={`${p}18`} stroke={`${p}40`} strokeWidth="0.5" />
          <rect x="80" y="10" width="26" height="46" fill={`${p}14`} />
          {([
            [18, 16], [18, 32], [38, 16], [38, 32], [58, 16], [58, 32],
          ] as [number, number][]).map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="14" height="10"
              fill={`${p}22`} stroke={`${p}30`} strokeWidth="0.5" />
          ))}
          <text x="59" y="-4" textAnchor="middle" fontSize="5.5"
            fill={`${p}70`} fontFamily="Space Mono, monospace" letterSpacing="1">02 · CLAY RENDER</text>
        </g>

        {/* 03 Final render */}
        <g transform="translate(264, 198)">
          <rect x="0" y="0" width="118" height="55"
            fill={`${p}14`} stroke={p} strokeWidth="1" />
          <rect x="8" y="6" width="102" height="44"
            fill={`${p}20`} stroke={`${p}50`} strokeWidth="0.5" />
          <rect x="8" y="6" width="102" height="20" fill={`${p}0d`} />
          <rect x="84" y="6" width="26" height="44" fill={`${p}15`} />
          <rect x="8" y="42" width="102" height="8" fill={`${p}18`} />
          {([
            [16, 14], [16, 26], [34, 14], [34, 26], [52, 14], [52, 26],
          ] as [number, number][]).map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="12" height="8"
              fill={p} opacity="0.25" stroke={`${p}40`} strokeWidth="0.4" />
          ))}
          <text x="59" y="-4" textAnchor="middle" fontSize="5.5"
            fill={p} fontFamily="Space Mono, monospace" letterSpacing="1">03 · FINAL RENDER</text>
        </g>

        {/* Connector dashes */}
        <line x1="214" y1="152" x2="248" y2="71" stroke={`${p}30`} strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="214" y1="152" x2="256" y2="151" stroke={`${p}30`} strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="214" y1="152" x2="264" y2="225" stroke={`${p}30`} strokeWidth="0.75" strokeDasharray="3 3" />
      </motion.svg>
    </div>
  );
}


/* ── Corner construction ticks ─────────────────────────────────────── */
function CornerTicks({ hovered, color }: { hovered: boolean; color: string }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 10, height: 10, zIndex: 3, pointerEvents: "none",
    transitionProperty: "opacity", transitionDuration: "300ms",
    opacity: hovered ? 0.9 : 0,
  };
  const stroke = `0.75px solid ${color}`;
  return (
    <>
      <span aria-hidden style={{ ...base, top: 4, left: 4, borderTop: stroke, borderLeft: stroke }} />
      <span aria-hidden style={{ ...base, top: 4, right: 4, borderTop: stroke, borderRight: stroke }} />
      <span aria-hidden style={{ ...base, bottom: 4, left: 4, borderBottom: stroke, borderLeft: stroke }} />
      <span aria-hidden style={{ ...base, bottom: 4, right: 4, borderBottom: stroke, borderRight: stroke }} />
    </>
  );
}
