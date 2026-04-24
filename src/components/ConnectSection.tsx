import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { EnvelopeSimple, LinkedinLogo, FileText, ArrowUpRight } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
};

const SPRING = { type: "spring" as const, stiffness: 260, damping: 24, mass: 0.6 };

interface Contact {
  index: string;
  label: string;
  value: string;
  display: string;
  href: string;
  icon: Icon;
  external: boolean;
}

const contacts: Contact[] = [
  {
    index: "01",
    label: "Email",
    value: "niharikap0210@gmail.com",
    display: "niharikap0210@gmail.com",
    href: "mailto:niharikap0210@gmail.com",
    icon: EnvelopeSimple,
    external: false,
  },
  {
    index: "02",
    label: "LinkedIn",
    value: "in/niharika-pundlik",
    display: "niharika-pundlik",
    href: "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/",
    icon: LinkedinLogo,
    external: true,
  },
  {
    index: "03",
    label: "Resume",
    value: "Download PDF",
    display: "View PDF",
    href: "https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing",
    icon: FileText,
    external: true,
  },
];

/* ─── Animated cursor-reactive grid ──────────────────────────────── */
function CursorRevealGrid({
  mouseX,
  mouseY,
  offsetX,
  offsetY,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
}) {
  const maskImage = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, black, transparent 70%)`;
  const x = useMotionTemplate`${offsetX}px`;
  const y = useMotionTemplate`${offsetY}px`;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.7,
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <motion.pattern
            id="connect-grid-reveal"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(181,146,76,0.45)" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="1" fill="rgba(181,146,76,0.35)" />
          </motion.pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#connect-grid-reveal)" />
      </svg>
    </motion.div>
  );
}

/* ─── Single contact card ────────────────────────────────────────── */
function ContactCard({ contact, index }: { contact: Contact; index: number }) {
  const [hovered, setHovered] = useState(false);
  const IconComp = contact.icon;

  return (
    <motion.a
      href={contact.href}
      target={contact.external ? "_blank" : undefined}
      rel={contact.external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      animate={{ y: hovered ? -6 : 0 }}
      className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      style={{
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderColor: hovered ? "#B5924C88" : "var(--border)",
        padding: 24,
        transitionProperty: "border-color, box-shadow",
        transitionDuration: "320ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: hovered
          ? "0 2px 6px rgba(0,0,0,0.04), 0 18px 40px rgba(181,146,76,0.14)"
          : "0 1px 3px rgba(0,0,0,0.03), 0 6px 20px rgba(0,0,0,0.025)",
      }}
    >
      {/* Corner construction ticks - reveal on hover */}
      <CornerTicks hovered={hovered} />

      {/* Inner dashed frame */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 8,
          border: `0.75px dashed ${hovered ? "#B5924C55" : "var(--construction)"}`,
          pointerEvents: "none",
          transitionProperty: "border-color",
          transitionDuration: "320ms",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Top row: index + external-arrow */}
        <div className="flex items-center justify-between" style={{ marginBottom: 28 }}>
          <span
            style={{
              ...mono,
              fontSize: 10,
              color: hovered ? "#B5924C" : "var(--text-muted)",
              letterSpacing: "0.2em",
              transitionProperty: "color",
              transitionDuration: "320ms",
            }}
          >
            {contact.index} / 03
          </span>
          <motion.div
            animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0, rotate: hovered ? 0 : 0 }}
            transition={SPRING}
            style={{ color: hovered ? "#B5924C" : "var(--text-muted)" }}
          >
            <ArrowUpRight size={18} weight="regular" />
          </motion.div>
        </div>

        {/* Icon */}
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={SPRING}
          style={{
            display: "inline-flex",
            padding: 14,
            border: `0.75px solid ${hovered ? "#B5924C66" : "var(--border)"}`,
            backgroundColor: hovered ? "#B5924C10" : "var(--bg-primary)",
            marginBottom: 20,
            transitionProperty: "background-color, border-color",
            transitionDuration: "320ms",
          }}
        >
          <IconComp
            size={24}
            weight={hovered ? "bold" : "regular"}
            color={hovered ? "#B5924C" : "var(--text-primary)"}
          />
        </motion.div>

        {/* Label */}
        <p
          style={{
            ...mono,
            fontSize: 9,
            color: "var(--text-muted)",
            letterSpacing: "0.22em",
            marginBottom: 8,
          }}
        >
          {contact.label}
        </p>

        {/* Value */}
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(20px, 1.8vw, 24px)",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          {contact.display}
        </p>

        {/* Animated underline */}
        <div
          aria-hidden
          style={{
            marginTop: 18,
            height: 1,
            backgroundColor: "var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={false}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#B5924C",
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>
    </motion.a>
  );
}

/* ─── Corner ticks that reveal on hover ──────────────────────────── */
function CornerTicks({ hovered }: { hovered: boolean }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 10,
    height: 10,
    pointerEvents: "none",
    transitionProperty: "opacity",
    transitionDuration: "320ms",
    opacity: hovered ? 0.9 : 0,
  };
  const stroke = "0.75px solid #B5924C";
  return (
    <>
      <span aria-hidden style={{ ...base, top: 3, left: 3, borderTop: stroke, borderLeft: stroke }} />
      <span aria-hidden style={{ ...base, top: 3, right: 3, borderTop: stroke, borderRight: stroke }} />
      <span aria-hidden style={{ ...base, bottom: 3, left: 3, borderBottom: stroke, borderLeft: stroke }} />
      <span aria-hidden style={{ ...base, bottom: 3, right: 3, borderBottom: stroke, borderRight: stroke }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main ConnectSection
═══════════════════════════════════════════════════════════════════ */
export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  useAnimationFrame(() => {
    offsetX.set((offsetX.get() + 0.2) % 28);
    offsetY.set((offsetY.get() + 0.2) % 28);
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative overflow-hidden"
      style={{ scrollMarginTop: 96, paddingTop: 96, paddingBottom: 96 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base blueprint grid - always visible, subtle */}
      <div
        aria-hidden
        className="blueprint-grid-subtle"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
          zIndex: 0,
        }}
      />

      {/* Cursor-reveal warm accent grid on top */}
      <CursorRevealGrid mouseX={mouseX} mouseY={mouseY} offsetX={offsetX} offsetY={offsetY} />

      {/* Soft radial warm glow from top */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(181,146,76,0.10) 0%, rgba(181,146,76,0.03) 40%, transparent 80%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative" style={{ zIndex: 2 }}>
        {/* Eyebrow */}
        <div
          className="flex items-center justify-between"
          style={{
            borderTop: "0.75px solid var(--border)",
            paddingTop: 14,
            marginBottom: 28,
            position: "relative",
          }}
        >
          <span style={{ position: "absolute", top: -4, left: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
          <span style={{ position: "absolute", top: -4, right: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
          <span
            style={{
              ...mono,
              fontSize: 11,
              color: "var(--text-secondary)",
              letterSpacing: "0.22em",
              fontWeight: 500,
            }}
          >
            Contact // 05
          </span>
          <span
            style={{
              ...mono,
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.22em",
            }}
          >
            03 Channels
          </span>
        </div>

        {/* Heading + intro */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14"
          style={{ marginBottom: 64, alignItems: "end" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(44px, 5.4vw, 72px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.028em",
              lineHeight: 1.02,
              margin: 0,
            }}
          >
            Let's build<br />
            something<br />
            <span style={{ fontStyle: "italic" }}>together</span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.5vw, 22px)",
                lineHeight: 1.55,
                color: "var(--text-secondary)",
                margin: 0,
                maxWidth: 520,
              }}
            >
              Open to full-time Product Design roles, thoughtful side projects, and
              conversations about turning architectural thinking into digital products.
            </p>

            {/* Status strip */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="status-pulse"
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  backgroundColor: "var(--status-green)",
                  border: "1px solid #B5924C",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.2em",
                }}
              >
                Available · Virginia, US · GMT-5
              </span>
            </div>
          </motion.div>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((c, i) => (
            <ContactCard key={c.label} contact={c} index={i} />
          ))}
        </div>

        {/* Bottom rule + sheet marker */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: 56, paddingTop: 18, borderTop: "0.75px solid var(--border)", position: "relative" }}
        >
          <span style={{ position: "absolute", top: -4, left: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
          <span style={{ position: "absolute", top: -4, right: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
          <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", opacity: 0.75 }}>
            End of Sheet
          </span>
          <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.22em", opacity: 0.75 }}>
            A-05 / A-05
          </span>
        </div>
      </div>
    </section>
  );
}
