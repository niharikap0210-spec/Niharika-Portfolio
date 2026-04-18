import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import SectionMarker from "../components/SectionMarker";
import HandDrawnSketch from "../components/HandDrawnSketch";
import { getAdjacentProjects } from "../data/projects";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
};
const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";
const caption: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontStyle: "italic",
  fontSize: 13,
  color: "var(--text-muted)",
  lineHeight: 1.5,
};

/* ── Scroll-triggered fade ──────────────────────────────────────── */
function Reveal({
  children, delay = 0, y = 20, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Section break — clean rule, no centered label ───────────────── */
function SectionBreak() {
  return (
    <div style={{ margin: "clamp(72px, 10vw, 104px) 0 clamp(52px, 7vw, 72px)", borderTop: "1px solid var(--border)" }} />
  );
}

/* ── Arrow button ────────────────────────────────────────────────── */
function ArrowBtn({ onClick, dir }: { onClick: () => void; dir: "left" | "right" }) {
  return (
    <button onClick={onClick}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid var(--border)", background: "var(--bg-elevated)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "var(--text-secondary)", flexShrink: 0,
        transitionProperty: "transform, opacity", transitionDuration: "150ms",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--text-secondary)"; el.style.color = "var(--text-primary)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-secondary)"; }}
      onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.93)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {dir === "left" ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11.5 4.5L6.5 9l5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.5 4.5L11.5 9l-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
    </button>
  );
}

/* ── Pill dot indicator ──────────────────────────────────────────── */
function Dots({ count, active, onGo }: { count: number; active: number; onGo: (i: number) => void }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onGo(i)} aria-label={`Go to slide ${i + 1}`}
          style={{
            height: 6, width: i === active ? 22 : 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer",
            background: i === active ? "var(--text-primary)" : "var(--border)",
            transitionProperty: "transform, opacity", transitionDuration: "250ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PHONE CAROUSEL
══════════════════════════════════════════════════════════════════ */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit:  (d: number) => ({ opacity: 0, x: d * -40 }),
};

function PhoneCarousel({ slides }: { slides: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const go = (i: number) => { setDir(i > active ? 1 : -1); setActive(i); };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <ArrowBtn dir="left"  onClick={() => go(active === 0 ? slides.length - 1 : active - 1)} />
        <div style={{ flex: 1, overflow: "hidden", display: "flex", justifyContent: "center", minHeight: 420 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={active} custom={dir} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "clamp(190px, 30vw, 280px)" }}>
              <img src={slides[active].src} alt={slides[active].label} style={{ width: "100%", display: "block" }} />
            </motion.div>
          </AnimatePresence>
        </div>
        <ArrowBtn dir="right" onClick={() => go(active === slides.length - 1 ? 0 : active + 1)} />
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={active} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          style={{ ...caption, textAlign: "center", margin: "14px 0 12px" }}>
          {slides[active].label}
        </motion.p>
      </AnimatePresence>
      <Dots count={slides.length} active={active} onGo={go} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   WEB GALLERY
══════════════════════════════════════════════════════════════════ */
function WebGallery({ screens }: { screens: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <img src={screens[active].src} alt={screens[active].label}
              style={{ width: "100%", display: "block", border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 56px rgba(0,0,0,0.09)" }} />
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          style={{ ...caption, marginBottom: 14 }}>
          {screens[active].label}
        </motion.p>
      </AnimatePresence>
      <div style={{ display: "flex", gap: 8 }}>
        {screens.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{
              flex: 1, padding: 0, background: "none", cursor: "pointer", overflow: "hidden",
              border: i === active ? "2px solid var(--text-primary)" : "1px solid var(--border)",
              opacity: i === active ? 1 : 0.5,
              transitionProperty: "transform, opacity", transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.opacity = "0.5"; }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <img src={s.src} alt={s.label} style={{ width: "100%", display: "block" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   USER TABS
══════════════════════════════════════════════════════════════════ */
function UserTabs() {
  const [tab, setTab] = useState<0 | 1>(0);
  const tabs = [
    {
      label: "Primary — The Designer",
      heading: "The Design Firm",
      body: "A project lead managing 4–8 active client projects simultaneously. Uses Arko daily to scan spaces, place furniture, adjust finishes, and track project status across the team. Needs speed, precision, and a clear handoff mechanism.",
      img: "/arko/web-3.png",
      imgCaption: "Designer dashboard — daily workspace",
      sketch: "floorPlan" as const,
      annotation: "their daily canvas",
      isPhone: false,
    },
    {
      label: "Secondary — The Client",
      heading: "The Client",
      body: "A homeowner or property developer reviewing a design remotely. Not design-literate. Needs to understand the space instantly, leave specific feedback, and approve with confidence — without downloading an app or creating an account.",
      img: "/arko/phone-13.png",
      imgCaption: "Client landing — no login, no friction",
      sketch: "wireframe" as const,
      annotation: "what they see",
      isPhone: true,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 36 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i as 0 | 1)}
            style={{
              padding: "14px 24px", background: "none", border: "none",
              borderBottom: `2px solid ${tab === i ? "var(--text-primary)" : "transparent"}`,
              cursor: "pointer", textAlign: "left",
              transitionProperty: "transform, opacity", transitionDuration: "150ms",
            }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <span style={{ ...mono, fontSize: 9, color: tab === i ? "var(--text-primary)" : "var(--text-muted)", display: "block", marginBottom: 4 }}>{t.label}</span>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, color: tab === i ? "var(--text-primary)" : "var(--text-secondary)" }}>{t.heading}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 24 }}>{tabs[tab].body}</p>
              <HandDrawnSketch type={tabs[tab].sketch}
                width={tabs[tab].sketch === "wireframe" ? 60 : 110}
                height={tabs[tab].sketch === "wireframe" ? 80 : 70}
                annotation={tabs[tab].annotation} delay={0.2} />
            </div>
            <div>
              <img src={tabs[tab].img} alt={tabs[tab].heading}
                style={{
                  width: "100%", display: "block",
                  ...(tabs[tab].isPhone
                    ? { filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.16))" }
                    : { border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.07)" }
                  ),
                }} />
              <p style={{ ...caption, marginTop: 10 }}>{tabs[tab].imgCaption}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DESIGN DECISION STEPPER
══════════════════════════════════════════════════════════════════ */
function DecisionStepper() {
  const [active, setActive] = useState(0);
  const decisions = [
    {
      num: "01", short: "Two separate\nexperiences",
      title: "Two entirely separate experiences",
      body: "The designer interface is dense, powerful, and built for daily professional use — sidebar navigation, project management, team activity, AR editing tools. The client interface strips everything away: no login, no nav, no jargon. Just the room, a comment button, and an approve button. The same product — two completely different contexts of use.",
      img: "/arko/web-5.png",
    },
    {
      num: "02", short: "AR editor for\nprofessionals",
      title: "AR editor built for professionals, not consumers",
      body: "The AR room editor puts the canvas first and keeps all tools at the edges — collapsible Furniture Library on the left, Properties panel on the right, minimal toolbar at the bottom. The designer stays focused on the space, not the interface. Every element category is structured as progressive disclosure so the library never overwhelms.",
      img: "/arko/phone-10.png",
    },
    {
      num: "03", short: "Approval as the\ncore value",
      title: "The approval flow as the product's core value",
      body: "Most design tools stop at visualization. Arko makes client sign-off a first-class feature — the Share modal, client walkthrough, comment pinning, and one-tap approval are designed as a single seamless flow. When a client approves, the designer gets an instant notification and a timestamped PDF summary. This closes the loop that every other tool leaves open.",
      img: "/arko/phone-16.png",
    },
    {
      num: "04", short: "Empty states as\nonboarding",
      title: "Empty states as onboarding",
      body: "Both the dashboard and project detail have fully designed empty states that guide the user to their first action rather than leaving them stranded. For a B2B product where adoption depends on the first session, this matters. A stranded user is a churned user — empty states are a product feature, not an afterthought.",
      img: "/arko/web-3.png",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0"
        style={{ borderBottom: "1px solid var(--border)", marginBottom: 0 }}>
        {decisions.map((d, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{
              padding: "20px 16px",
              background: active === i ? "var(--bg-elevated)" : "var(--bg-primary)",
              border: "none",
              borderBottom: `2px solid ${active === i ? "var(--text-primary)" : "transparent"}`,
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
              cursor: "pointer", textAlign: "left",
              transitionProperty: "transform, opacity", transitionDuration: "150ms",
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.background = "var(--bg-primary)"; }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}>
            <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: active === i ? "var(--text-primary)" : "var(--border)", display: "block", lineHeight: 1, marginBottom: 8 }}>
              {d.num}
            </span>
            <span style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: active === i ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.3, display: "block", whiteSpace: "pre-line" }}>
              {d.short}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: "44px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(20px, 2.5vw, 28px)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 18 }}>
                {decisions[active].title}
              </h3>
              <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.85 }}>
                {decisions[active].body}
              </p>
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <img src={decisions[active].img} alt={decisions[active].title}
                style={{ width: "100%", display: "block", border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)" }} />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function ArkoCase() {
  const adjacent = getAdjacentProjects("arko");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }} className="pt-14"
    >
      {/* ── Full-width top mask — hides content scrolling into nav zone ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 59,
        background: "var(--bg-primary)", zIndex: 45,
        pointerEvents: "none",
      }} />

      {/* ── Progress bar ─────────────────────────────────────────────── */}
      <div style={{
        position: "fixed", top: 56, left: 0, right: 0, height: 3,
        background: "var(--bg-primary)", zIndex: 50,
      }}>
        <motion.div style={{
          height: "100%", background: "var(--text-primary)",
          scaleX, transformOrigin: "left", opacity: 0.75,
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          HERO — centered editorial with integrated product showcase
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="blueprint-grid"
        style={{
          position: "relative", overflow: "hidden",
          paddingTop: "clamp(96px, 12vw, 128px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
        }}
      >
        {/* Inset architectural border */}
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.6 }}
          style={{ position: "absolute", inset: 10, border: "0.75px solid var(--construction)", pointerEvents: "none" }}
        />
        {/* Corner TL */}
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.0 }}
          style={{ position: "absolute", top: 18, left: 18, ...mono, fontSize: 7, color: "var(--construction)", lineHeight: 1.4, pointerEvents: "none" }}>
          <div>x: 0.00</div><div>y: 0.00</div>
        </motion.div>
        {/* Corner BR */}
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.0 }}
          style={{ position: "absolute", bottom: 18, right: 18, ...mono, fontSize: 7, color: "var(--construction)", lineHeight: 1.4, textAlign: "right", pointerEvents: "none" }}>
          <div>Sheet 01 / Arko</div><div>Product Design · 2025</div>
        </motion.div>

        {/* Back link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
          style={{ position: "absolute", top: 28, left: "clamp(28px, 5vw, 48px)", zIndex: 2 }}>
          <Link to="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, ...mono, fontSize: 10, color: "var(--text-muted)", textDecoration: "none", transitionProperty: "color", transitionDuration: "150ms" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.5 7h-9M5 3.5L1.5 7 5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Work
          </Link>
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 md:px-10" style={{ position: "relative", zIndex: 1 }}>

          {/* Tags — centered */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
            {["Product Design", "B2B SaaS", "Web + iOS", "AR / Spatial"].map((t) => (
              <span key={t} style={{ ...mono, fontSize: 9, color: "var(--text-muted)", border: "1px solid var(--border)", padding: "3px 10px", background: "var(--bg-primary)" }}>
                {t}
              </span>
            ))}
          </motion.div>

          {/* Title — centered, huge, slide-up reveal */}
          <div style={{ textAlign: "center", overflow: "hidden", marginBottom: 20 }}>
            <motion.h1
              initial={{ y: "108%" }} animate={{ y: 0 }}
              transition={{ delay: 0.08, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(80px, 13vw, 136px)",
                color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 0.9,
              }}>
              Arko
            </motion.h1>
          </div>

          {/* Tagline — centered */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34, duration: 0.7 }}
            style={{
              textAlign: "center", fontFamily: sans,
              fontSize: "clamp(13px, 1.4vw, 17px)",
              color: "var(--text-secondary)", lineHeight: 1.75,
              maxWidth: 480, margin: "0 auto 40px",
            }}>
            Spatial design platform for interior design firms — scan spaces in AR,
            design them digitally, and get client sign-off without the back-and-forth.
          </motion.p>

          {/* Meta strip — horizontal rule with 4 items */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44, duration: 0.6 }}
            className="hidden md:flex"
            style={{
              justifyContent: "center",
              borderTop: "0.75px solid var(--border)", borderBottom: "0.75px solid var(--border)",
              marginBottom: 56,
            }}>
            {([
              { label: "Role",     value: "Product Designer" },
              { label: "Platform", value: "Web + iOS" },
              { label: "Timeline", value: "14 weeks" },
              { label: "Tools",    value: "Figma · Framer · Protopie" },
            ] as { label: string; value: string }[]).map((m, i, arr) => (
              <div key={m.label} style={{
                padding: "14px clamp(16px, 3.5vw, 48px)",
                borderRight: i < arr.length - 1 ? "0.75px solid var(--border)" : "none",
                textAlign: "center",
              }}>
                <p style={{ ...mono, fontSize: 7, color: "var(--text-muted)", marginBottom: 5 }}>{m.label}</p>
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 500, color: "var(--text-primary)" }}>{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Mobile meta — simple list */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44, duration: 0.6 }}
            className="flex md:hidden flex-col"
            style={{ gap: 0, marginBottom: 40 }}>
            {[
              { label: "Role",     value: "Product Designer" },
              { label: "Timeline", value: "14 weeks" },
              { label: "Tools",    value: "Figma · Framer · Protopie" },
            ].map((m, i) => (
              <div key={m.label} style={{
                display: "flex", gap: 16, alignItems: "baseline",
                padding: "10px 0",
                borderTop: i === 0 ? "0.75px solid var(--border)" : "none",
                borderBottom: "0.75px solid var(--border)",
              }}>
                <span style={{ ...mono, fontSize: 8, color: "var(--text-muted)", minWidth: 60, flexShrink: 0 }}>{m.label}</span>
                <span style={{ fontFamily: sans, fontSize: 12, color: "var(--text-secondary)" }}>{m.value}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── Product showcase — Sous-inspired rounded container ───────── */}
      <div style={{ padding: "0 clamp(16px, 4vw, 48px) clamp(48px, 7vw, 80px)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--bg-secondary)",
              borderRadius: 20,
              border: "1px solid var(--border)",
              padding: "clamp(32px, 5vw, 52px) clamp(20px, 4vw, 44px) 0",
              overflow: "hidden",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "clamp(10px, 2.5vw, 24px)",
            }}>

              {/* Left phone */}
              <motion.div
                style={{ width: "clamp(90px, 17%, 168px)", flexShrink: 0 }}
                initial={{ opacity: 0, y: 56 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.68, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                <img src="/arko/phone-13.png" alt="Client landing"
                  style={{ width: "100%", display: "block", filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.18))" }} />
              </motion.div>

              {/* Center — web screenshot, tallest/most prominent */}
              <motion.div
                style={{ flex: 1, maxWidth: "clamp(300px, 58%, 640px)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                <img src="/arko/web-1.png" alt="Arko web app"
                  style={{
                    width: "100%", display: "block",
                    border: "1px solid var(--border)",
                    borderBottom: "none",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.12)",
                  }} />
              </motion.div>

              {/* Right phone */}
              <motion.div
                style={{ width: "clamp(90px, 17%, 168px)", flexShrink: 0 }}
                initial={{ opacity: 0, y: 56 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                <img src="/arko/phone-16.png" alt="Design approved"
                  style={{ width: "100%", display: "block", filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.18))" }} />
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          OVERVIEW — blueprint grid-subtle background
      ══════════════════════════════════════════════════════════════ */}
      <section className="blueprint-grid-subtle" style={{ padding: "clamp(60px, 8vw, 88px) 0" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionMarker label="Overview" letter="A" className="mb-6" />
            <p style={{ fontFamily: sans, fontSize: "clamp(16px, 1.6vw, 18px)", color: "var(--text-secondary)", lineHeight: 1.85, maxWidth: 660 }}>
              Interior designers spend hours chasing client approvals over email, WhatsApp, and
              in-person walkthroughs that still end in miscommunication. Arko is a B2B SaaS platform
              that lets design teams scan physical spaces in AR, furnish and finish them digitally,
              and share interactive walkthroughs with clients for remote review and one-click approval —
              eliminating the back-and-forth entirely.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* ── THE PROBLEM ─────────────────────────────────────────────── */}
        <SectionBreak />

        <Reveal>
          <SectionMarker label="Problem" letter="B" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700, fontSize: "clamp(28px, 4vw, 46px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.15, marginBottom: 20, maxWidth: 600,
          }}>
            Clients can't visualize a space from a floor plan. That gap costs real money.
          </h2>
          <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 600, marginBottom: 16 }}>
            Design firms lose an average of 6–8 hours per project on revision cycles caused by
            one root problem — clients cannot visualize a space from a floor plan or mood board alone.
            They say yes in the meeting and change their mind when they see it built.
          </p>
          <div style={{ marginBottom: 40 }}>
            <HandDrawnSketch type="floorPlan" width={100} height={65}
              annotation="the real cost of 'yes'" delay={0.3} />
          </div>
        </Reveal>

      </div>

      {/* Problem stats — grid background */}
      <section className="blueprint-grid-subtle" style={{ padding: "clamp(44px, 6vw, 64px) 0" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { number: "6–8 hrs", label: "Lost per project",  detail: "to revision cycles driven by clients who couldn't visualize the space" },
              { number: "3 tools", label: "Disconnected",      detail: "AutoCAD, PDFs, walkthroughs — none talk to each other, none work for clients" },
              { number: "₀ binding", label: "In a verbal yes", detail: "Clients approve in the room and change their minds once they see it built" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div style={{ padding: "24px", border: "1px solid var(--border)", backgroundColor: "var(--bg-elevated)", height: "100%" }}>
                  <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6 }}>
                    {s.number}
                  </p>
                  <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 12 }}>{s.label}</p>
                  <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* ── THE USERS ───────────────────────────────────────────────── */}
        <SectionBreak />

        <Reveal>
          <SectionMarker label="Users" letter="C" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 40px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.2, marginBottom: 36, maxWidth: 540,
          }}>
            One platform. Two completely different contexts of use.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <UserTabs />
        </Reveal>

      </div>

      {/* ── KEY INSIGHT — full bleed dark ───────────────────────────── */}
      <section style={{ backgroundColor: "var(--text-primary)", padding: "clamp(72px, 10vw, 120px) 0", margin: "clamp(64px, 9vw, 96px) 0" }}>
        <Reveal y={16}>
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 28 }}>Key Insight</p>
            <blockquote style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(24px, 4.5vw, 52px)",
              color: "var(--bg-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.25, quotes: "none", marginBottom: 28, maxWidth: 760,
            }}>
              Clients don't reject designs because they have bad taste.
              They reject them because they{" "}
              <em style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                couldn't see it clearly enough to say yes
              </em>{" "}
              the first time.
            </blockquote>
            <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 500, marginBottom: 28 }}>
              This reframed the design direction entirely. The goal wasn't to build a better
              design tool — it was to build a better <em>communication</em> tool that
              happened to be powered by design.
            </p>
            <HandDrawnSketch type="morphTransition" width={180} height={72}
              annotation="from design tool → communication tool" delay={0.2} />
          </div>
        </Reveal>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* ── WEB PLATFORM ────────────────────────────────────────────── */}
        <Reveal>
          <SectionMarker label="Designer · Web Application" letter="D" className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end" style={{ marginBottom: 36 }}>
            <div>
              <h2 style={{
                fontFamily: serif, fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)",
                color: "var(--text-primary)", letterSpacing: "-0.025em",
                lineHeight: 1.2, marginBottom: 12,
              }}>
                A professional workspace. Dense, powerful, built for daily use.
              </h2>
              <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                The designer interface doesn't compromise. Sidebar navigation, project management,
                team activity, and AR editing tools — all accessible from a single workspace
                a design lead would open on day one and never want to leave.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} aria-hidden>
              <HandDrawnSketch type="floorPlan" width={110} height={70}
                annotation="the designer's daily view" delay={0.2} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <WebGallery screens={[
            { src: "/arko/web-3.png", label: "Fig. 01 — Dashboard · active projects, team stats, pending approvals" },
            { src: "/arko/web-4.png", label: "Fig. 02 — All Projects · filter by status, search, quick access" },
            { src: "/arko/web-5.png", label: "Fig. 03 — Project Detail · rooms, progress bars, live activity log" },
            { src: "/arko/web-6.png", label: "Fig. 04 — Comments View · client feedback pinned in context" },
          ]} />
        </Reveal>

        {/* ── SCAN FLOW ───────────────────────────────────────────────── */}
        <SectionBreak />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Reveal>
            <SectionMarker label="Scan Flow" letter="E" className="mb-6" />
            <h2 style={{
              fontFamily: serif, fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 34px)",
              color: "var(--text-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.2, marginBottom: 16,
            }}>
              From empty room to furnished space in minutes.
            </h2>
            <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              A pre-scan checklist ensures quality spatial capture. The scanner detects
              floor planes, measures spatial accuracy, and confirms the data before the
              AR editor opens.
            </p>
            <HandDrawnSketch type="perspective" width={110} height={68}
              annotation="empty room → furnished space" delay={0.3} />
          </Reveal>

          <Reveal delay={0.1}>
            <PhoneCarousel slides={[
              { src: "/arko/phone-3.png", label: "01 / 04 — Pre-Scan Checklist" },
              { src: "/arko/phone-4.png", label: "02 / 04 — Detecting Floor" },
              { src: "/arko/phone-5.png", label: "03 / 04 — Floor Confirmed" },
              { src: "/arko/phone-6.png", label: "04 / 04 — 92% Spatial Accuracy" },
            ]} />
          </Reveal>
        </div>

        {/* AR Editor — alternating image + description layout */}
        <div style={{ marginTop: 64 }}>
          <Reveal>
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 40 }}>
              AR Room Editor — Canvas first, tools at the edges
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
            {([
              {
                src: "/arko/phone-7.png",
                num: "01",
                label: "Room type breadcrumb navigation",
                desc: "Navigate between room types without losing context. The full path stays visible at all times — every step in the hierarchy is one tap to reverse.",
              },
              {
                src: "/arko/phone-8.png",
                num: "02",
                label: "Furniture library — collapsible sidebar",
                desc: "The library collapses when you need the canvas. One tap to open, one tap to confirm. The space stays the focus, not the tool.",
              },
              {
                src: "/arko/phone-10.png",
                num: "03",
                label: "Item selected — Properties panel",
                desc: "Tap any object to reveal its controls inline. Scale, rotate, swap materials — no modal interrupts the flow.",
              },
              {
                src: "/arko/phone-12.png",
                num: "04",
                label: "Preview mode — Send to Client",
                desc: "Strip away every tool and see exactly what the client will see. One tap to share. The revision loop, closed.",
              },
            ] as { src: string; num: string; label: string; desc: string }[]).map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                  {i % 2 === 0 ? (
                    <>
                      <motion.div className="md:col-span-8"
                        whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                        <img src={s.src} alt={s.label}
                          style={{ width: "100%", display: "block", filter: "drop-shadow(0 6px 22px rgba(0,0,0,0.15))" }} />
                      </motion.div>
                      <div className="md:col-span-4">
                        <span style={{ ...mono, fontSize: 22, fontWeight: 700, color: "var(--border)", display: "block", lineHeight: 1, marginBottom: 16 }}>{s.num}</span>
                        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(16px, 1.8vw, 20px)", color: "var(--text-primary)", lineHeight: 1.35, marginBottom: 14 }}>{s.label}</p>
                        <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.75 }}>{s.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-4 order-2 md:order-1">
                        <span style={{ ...mono, fontSize: 22, fontWeight: 700, color: "var(--border)", display: "block", lineHeight: 1, marginBottom: 16 }}>{s.num}</span>
                        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(16px, 1.8vw, 20px)", color: "var(--text-primary)", lineHeight: 1.35, marginBottom: 14 }}>{s.label}</p>
                        <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.75 }}>{s.desc}</p>
                      </div>
                      <motion.div className="md:col-span-8 order-1 md:order-2"
                        whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                        <img src={s.src} alt={s.label}
                          style={{ width: "100%", display: "block", filter: "drop-shadow(0 6px 22px rgba(0,0,0,0.15))" }} />
                      </motion.div>
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── CLIENT EXPERIENCE ───────────────────────────────────────── */}
        <SectionBreak />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Reveal delay={0.1}>
            <PhoneCarousel slides={[
              { src: "/arko/phone-13.png", label: "01 / 04 — Client Landing" },
              { src: "/arko/phone-14.png", label: "02 / 04 — Room View + Comments" },
              { src: "/arko/phone-15.png", label: "03 / 04 — Pin a Comment" },
              { src: "/arko/phone-16.png", label: "04 / 04 — Design Approved" },
            ]} />
          </Reveal>

          <Reveal>
            <SectionMarker label="Client · Mobile" letter="F" className="mb-6" />
            <h2 style={{
              fontFamily: serif, fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 34px)",
              color: "var(--text-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.2, marginBottom: 16,
            }}>
              No login. No jargon. Just the room, a comment, and an approve.
            </h2>
            <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              The client opens a link, sees their space in AR, leaves pinned
              spatial feedback, and approves — without downloading an app or creating
              an account. When they approve, the designer gets a notification and a
              timestamped PDF that closes the loop.
            </p>
            <HandDrawnSketch type="wireframe" width={56} height={72}
              annotation="no login. just the room." delay={0.25} />
          </Reveal>
        </div>

        {/* ── DESIGN DECISIONS ────────────────────────────────────────── */}
        <SectionBreak />

        <Reveal>
          <SectionMarker label="Design Decisions" letter="G" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.2, marginBottom: 40,
          }}>
            Four decisions that defined the product.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <DecisionStepper />
        </Reveal>

      </div>

      {/* ── OUTCOMES — blueprint grid-subtle background ──────────────── */}
      <section className="blueprint-grid-subtle" style={{ padding: "clamp(64px, 9vw, 96px) 0", marginTop: "clamp(72px, 10vw, 104px)" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionMarker label="Reflection" letter="H" className="mb-6" />
            <h2 style={{
              fontFamily: serif, fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--text-primary)", letterSpacing: "-0.025em",
              lineHeight: 1.2, marginBottom: 16,
            }}>
              Three workflows. One platform. No compromise on either user.
            </h2>
            <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 600, marginBottom: 36 }}>
              Arko consolidates space scanning, interior design, and client approval into one
              platform. The result is a product that serves two very different users without
              compromising either experience.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: 48 }}>
            {[
              {
                label: "What I'd build next",
                body: "An analytics layer for designers — showing which rooms clients spend the most time reviewing, which furniture items get swapped most often, and where comments cluster spatially. Turning client behavior into actionable design intelligence.",
                bg: "var(--bg-elevated)",
              },
              {
                label: "What this reinforced",
                body: "The best B2B products are the ones that make the professional look good in front of their client. Every design decision in Arko was made with that in mind.",
                bg: "var(--bg-elevated)",
              },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ padding: "28px 24px", border: "1px solid var(--border)", backgroundColor: c.bg, height: "100%" }}>
                  <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 14 }}>{c.label}</p>
                  <p style={{ fontFamily: sans, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex justify-center" aria-hidden>
            <HandDrawnSketch type="perspective" width={200} height={96}
              annotation="from architecture to digital product" delay={0.2} />
          </div>
        </div>
      </section>

      {/* ── NAVIGATION ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="flex flex-wrap justify-between items-center gap-6"
          style={{ paddingTop: 32, paddingBottom: 64, borderTop: "1px solid var(--border)" }}>
          {adjacent.prev ? (
            <Link to={`/work/${adjacent.prev.slug}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, maxWidth: "45%" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M13 8H3M7 4L3 8l4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>Previous</p>
                <p style={{ fontFamily: serif, fontSize: "clamp(14px, 2vw, 20px)", color: "var(--text-secondary)", transitionProperty: "color", transitionDuration: "150ms" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
                  {adjacent.prev.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          {adjacent.next ? (
            <Link to={`/work/${adjacent.next.slug}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, maxWidth: "45%", marginLeft: "auto" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 4 }}>Next</p>
                <p style={{ fontFamily: serif, fontSize: "clamp(14px, 2vw, 20px)", color: "var(--text-secondary)", transitionProperty: "color", transitionDuration: "150ms" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
                  {adjacent.next.title}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </div>

    </motion.div>
  );
}
