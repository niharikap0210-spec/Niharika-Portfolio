import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
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

/* ── Scroll-triggered fade ──────────────────────────────────────── */
import { useInView } from "framer-motion";
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

/* ── Section divider ─────────────────────────────────────────────── */
function Rule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4"
      style={{ margin: "clamp(60px, 8vw, 88px) 0 clamp(44px, 6vw, 60px)" }}>
      <div style={{ flex: 1, height: "0.75px", backgroundColor: "var(--border)" }} />
      <span style={{ ...mono, fontSize: 9, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: "0.75px", backgroundColor: "var(--border)" }} />
    </div>
  );
}

/* ── Arrow button ────────────────────────────────────────────────── */
function ArrowBtn({ onClick, dir }: { onClick: () => void; dir: "left" | "right" }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid var(--border)",
        background: "var(--bg-elevated)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "var(--text-secondary)", flexShrink: 0,
        transitionProperty: "transform, opacity", transitionDuration: "150ms",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--text-secondary)";
        el.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.color = "var(--text-secondary)";
      }}
      onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.93)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {dir === "left" ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11.5 4.5L6.5 9l5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6.5 4.5L11.5 9l-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

/* ── Pill dot indicator ──────────────────────────────────────────── */
function Dots({ count, active, onGo }: { count: number; active: number; onGo: (i: number) => void }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onGo(i)}
          aria-label={`Go to slide ${i + 1}`}
          style={{
            height: 6, width: i === active ? 22 : 6,
            borderRadius: 3, border: "none", padding: 0, cursor: "pointer",
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
   PHONE CAROUSEL — screens already include device frames
══════════════════════════════════════════════════════════════════ */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -40 }),
};

function PhoneCarousel({ slides }: { slides: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <ArrowBtn dir="left"  onClick={() => go(active === 0 ? slides.length - 1 : active - 1)} />

        <div style={{ flex: 1, overflow: "hidden", display: "flex", justifyContent: "center", minHeight: 420 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "clamp(190px, 30vw, 280px)" }}
            >
              <img src={slides[active].src} alt={slides[active].label}
                style={{ width: "100%", display: "block" }} />
            </motion.div>
          </AnimatePresence>
        </div>

        <ArrowBtn dir="right" onClick={() => go(active === slides.length - 1 ? 0 : active + 1)} />
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={active} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          style={{ ...mono, fontSize: 9, color: "var(--text-muted)", textAlign: "center", margin: "14px 0 12px" }}>
          {slides[active].label}
        </motion.p>
      </AnimatePresence>

      <Dots count={slides.length} active={active} onGo={go} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   WEB GALLERY — featured screenshot + thumbnail strip
══════════════════════════════════════════════════════════════════ */
function WebGallery({ screens }: { screens: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Featured */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <img src={screens[active].src} alt={screens[active].label}
              style={{
                width: "100%", display: "block",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 56px rgba(0,0,0,0.09)",
              }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 14 }}>
          {screens[active].label}
        </motion.p>
      </AnimatePresence>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: 8 }}>
        {screens.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              flex: 1, padding: 0, background: "none", cursor: "pointer", overflow: "hidden",
              border: i === active ? "2px solid var(--text-primary)" : "1px solid var(--border)",
              opacity: i === active ? 1 : 0.5,
              transitionProperty: "transform, opacity", transitionDuration: "200ms",
            }}
            onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
            onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.opacity = "0.5"; }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}
          >
            <img src={s.src} alt={s.label} style={{ width: "100%", display: "block" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   USER TABS — toggle between Designer / Client
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
    },
    {
      label: "Secondary — The Client",
      heading: "The Client",
      body: "A homeowner or property developer reviewing a design remotely. Not design-literate. Needs to understand the space instantly, leave specific feedback, and approve with confidence — without downloading an app or creating an account.",
      img: "/arko/phone-13.png",
      imgCaption: "Client landing — no login, no friction",
      sketch: "wireframe" as const,
    },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 36 }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i as 0 | 1)}
            style={{
              padding: "14px 24px",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${tab === i ? "var(--text-primary)" : "transparent"}`,
              cursor: "pointer",
              textAlign: "left",
              transitionProperty: "transform, opacity",
              transitionDuration: "150ms",
            }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}
          >
            <span style={{
              ...mono, fontSize: 9,
              color: tab === i ? "var(--text-primary)" : "var(--text-muted)",
              display: "block", marginBottom: 4,
            }}>
              {t.label}
            </span>
            <span style={{
              fontFamily: serif, fontWeight: 700, fontSize: 18,
              color: tab === i ? "var(--text-primary)" : "var(--text-secondary)",
              transitionProperty: "transform, opacity", transitionDuration: "150ms",
            }}>
              {t.heading}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 24 }}>
                {tabs[tab].body}
              </p>
              <HandDrawnSketch
                type={tabs[tab].sketch}
                width={tabs[tab].sketch === "wireframe" ? 60 : 110}
                height={tabs[tab].sketch === "wireframe" ? 80 : 70}
                annotation={tab === 0 ? "their daily canvas" : "what they see"}
                delay={0.2}
              />
            </div>
            <div>
              <img
                src={tabs[tab].img}
                alt={tabs[tab].heading}
                style={{
                  width: "100%", display: "block",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.07)",
                }}
              />
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginTop: 9 }}>
                {tabs[tab].imgCaption}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DESIGN DECISION STEPPER — 4-tab step navigator
══════════════════════════════════════════════════════════════════ */
function DecisionStepper() {
  const [active, setActive] = useState(0);

  const decisions = [
    {
      num: "01",
      short: "Two separate\nexperiences",
      title: "Two entirely separate experiences",
      body: "The designer interface is dense, powerful, and built for daily professional use — sidebar navigation, project management, team activity, AR editing tools. The client interface strips everything away: no login, no nav, no jargon. Just the room, a comment button, and an approve button. The same product — two completely different contexts of use.",
      img: "/arko/web-5.png",
    },
    {
      num: "02",
      short: "AR editor for\nprofessionals",
      title: "AR editor built for professionals, not consumers",
      body: "The AR room editor puts the canvas first and keeps all tools at the edges — collapsible Furniture Library on the left, Properties panel on the right, minimal toolbar at the bottom. The designer stays focused on the space, not the interface. Every element category (Elements → Furniture → Room Type → Category) is structured as a progressive disclosure so the library never overwhelms.",
      img: "/arko/phone-10.png",
    },
    {
      num: "03",
      short: "Approval as the\ncore value",
      title: "The approval flow as the product's core value",
      body: "Most design tools stop at visualization. Arko makes client sign-off a first-class feature — the Share modal, client walkthrough, comment pinning, and one-tap approval are designed as a single seamless flow. When a client approves, the designer gets an instant notification and a timestamped PDF summary. This closes the loop that every other tool leaves open.",
      img: "/arko/phone-16.png",
    },
    {
      num: "04",
      short: "Empty states as\nonboarding",
      title: "Empty states as onboarding",
      body: "Both the dashboard and project detail have fully designed empty states that guide the user to their first action rather than leaving them stranded. For a B2B product where adoption depends on the first session, this matters. A stranded user is a churned user — empty states are a product feature, not an afterthought.",
      img: "/arko/web-3.png",
    },
  ];

  return (
    <div>
      {/* Step tabs */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-0"
        style={{ borderBottom: "1px solid var(--border)", marginBottom: 0 }}
      >
        {decisions.map((d, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "20px 16px",
              background: active === i ? "var(--bg-elevated)" : "var(--bg-primary)",
              border: "none",
              borderBottom: `2px solid ${active === i ? "var(--text-primary)" : "transparent"}`,
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
              cursor: "pointer",
              textAlign: "left",
              transitionProperty: "transform, opacity", transitionDuration: "150ms",
            }}
            onMouseEnter={(e) => {
              if (i !== active) (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
            }}
            onMouseLeave={(e) => {
              if (i !== active) (e.currentTarget as HTMLElement).style.background = "var(--bg-primary)";
            }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.outline = "2px solid var(--accent)"; (e.currentTarget as HTMLElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}
          >
            <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: active === i ? "var(--text-primary)" : "var(--border)", display: "block", lineHeight: 1, marginBottom: 8 }}>
              {d.num}
            </span>
            <span style={{
              fontFamily: serif, fontSize: 14, fontWeight: 700,
              color: active === i ? "var(--text-primary)" : "var(--text-secondary)",
              lineHeight: 1.3, display: "block", whiteSpace: "pre-line",
            }}>
              {d.short}
            </span>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: "44px 0",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <h3 style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: "clamp(20px, 2.5vw, 28px)",
                color: "var(--text-primary)", letterSpacing: "-0.02em",
                lineHeight: 1.25, marginBottom: 18,
              }}>
                {decisions[active].title}
              </h3>
              <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.85 }}>
                {decisions[active].body}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={decisions[active].img}
                alt={decisions[active].title}
                style={{
                  width: "100%", display: "block",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)",
                }}
              />
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

  /* Scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-14"
    >
      {/* ── Scroll progress bar ─────────────────────────────────── */}
      <motion.div
        style={{
          position: "fixed", top: 56, left: 0, right: 0, height: 2,
          background: "var(--text-primary)", scaleX,
          transformOrigin: "left", zIndex: 50,
          opacity: 0.7,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section style={{ paddingTop: "clamp(52px, 8vw, 88px)", paddingBottom: "clamp(48px, 7vw, 72px)" }}>

          <Link to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              ...mono, fontSize: 10, color: "var(--text-muted)",
              textDecoration: "none", marginBottom: 48,
              transitionProperty: "color", transitionDuration: "150ms",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.5 7h-9M5 3.5L1.5 7 5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Work
          </Link>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {["Product Design", "B2B SaaS", "Web + iOS", "AR / Spatial"].map((t) => (
              <span key={t} style={{ ...mono, fontSize: 9, color: "var(--text-muted)", border: "1px solid var(--border)", padding: "3px 9px" }}>
                {t}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: serif, fontWeight: 700,
              fontSize: "clamp(52px, 9vw, 100px)",
              color: "var(--text-primary)", letterSpacing: "-0.035em",
              lineHeight: 0.92, marginBottom: 24,
            }}>
            Arko
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.19, duration: 0.6 }}
            style={{
              fontFamily: sans, fontSize: "clamp(16px, 1.8vw, 20px)",
              color: "var(--text-secondary)", lineHeight: 1.65,
              marginBottom: 48, maxWidth: 560,
            }}>
            Spatial design platform for interior design firms — scan spaces in AR,
            design them digitally, and get client sign-off without the back-and-forth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <img src="/arko/web-1.png" alt="Arko — design rooms your clients can actually walk through"
              style={{
                width: "100%", display: "block",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 16px 56px rgba(0,0,0,0.10)",
              }} />
          </motion.div>
        </section>

        {/* ── META STRIP ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0"
          style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)", marginBottom: "clamp(64px, 9vw, 96px)" }}>
          {[
            { label: "Role",     value: "Product Designer\n(End-to-end)" },
            { label: "Platform", value: "Web + iOS" },
            { label: "Timeline", value: "14 weeks" },
            { label: "Tools",    value: "Figma · Framer\nProtopie" },
          ].map((m) => (
            <div key={m.label}
              style={{ padding: "22px 20px", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 6 }}>{m.label}</p>
              <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.55, whiteSpace: "pre-line" }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── OVERVIEW ────────────────────────────────────────────── */}
        <Reveal>
          <SectionMarker label="Overview" letter="A" className="mb-6" />
          <p style={{ fontFamily: sans, fontSize: "clamp(16px, 1.6vw, 18px)", color: "var(--text-secondary)", lineHeight: 1.85, maxWidth: 660 }}>
            Interior designers spend hours chasing client approvals over email, WhatsApp, and in-person
            walkthroughs that still end in miscommunication. Arko is a B2B SaaS platform that lets
            design teams scan physical spaces in AR, furnish and finish them digitally, and share
            interactive walkthroughs with clients for remote review and one-click approval —
            eliminating the back-and-forth entirely.
          </p>
        </Reveal>

        {/* ── THE PROBLEM ─────────────────────────────────────────── */}
        <Rule label="The Problem" />

        <Reveal>
          <SectionMarker label="Problem" letter="B" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 46px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.15, marginBottom: 20, maxWidth: 600,
          }}>
            Clients can't visualize a space from a floor plan. That gap costs real money.
          </h2>
          <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 600, marginBottom: 44 }}>
            Design firms lose an average of 6–8 hours per project on revision cycles caused by
            one root problem — clients cannot visualize a space from a floor plan or mood board alone.
            They say yes in the meeting and change their mind when they see it built. The existing
            tools are either too technical for clients to interpret or too costly to arrange repeatedly.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { number: "6–8 hrs", label: "Lost per project", detail: "to revision cycles driven by clients who couldn't visualize the space" },
            { number: "3 tools", label: "Disconnected", detail: "AutoCAD, PDFs, walkthroughs — none talk to each other, none work for clients" },
            { number: "₀ binding", label: "In a verbal yes", detail: "Clients approve in the room and change their minds once they see it built" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.09}>
              <div style={{ padding: "24px", border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)", height: "100%" }}>
                <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6 }}>
                  {s.number}
                </p>
                <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)", marginBottom: 12 }}>{s.label}</p>
                <p style={{ fontFamily: sans, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── THE USERS (TABBED) ───────────────────────────────────── */}
        <Rule label="The Users" />

        <Reveal>
          <SectionMarker label="Users" letter="C" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: "clamp(26px, 3.5vw, 40px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.2, marginBottom: 36, maxWidth: 540,
          }}>
            One platform. Two completely different contexts of use.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <UserTabs />
        </Reveal>

      </div>{/* /max-w-4xl */}

      {/* ── KEY INSIGHT — full bleed ─────────────────────────────── */}
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
            <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 500 }}>
              This reframed the design direction entirely. The goal wasn't to build a better
              design tool — it was to build a better <em>communication</em> tool that
              happened to be powered by design.
            </p>
          </div>
        </Reveal>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* ── WEB PLATFORM — gallery ───────────────────────────────── */}
        <Reveal>
          <SectionMarker label="Designer · Web Application" letter="D" className="mb-6" />
          <h2 style={{
            fontFamily: serif, fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)",
            color: "var(--text-primary)", letterSpacing: "-0.025em",
            lineHeight: 1.2, marginBottom: 12,
          }}>
            A professional workspace. Dense, powerful, built for daily use.
          </h2>
          <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 560, marginBottom: 36 }}>
            The designer interface doesn't compromise. Sidebar navigation, project management,
            team activity, and AR editing tools — all accessible from a single workspace
            a design lead would open on day one and never want to leave.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <WebGallery screens={[
            { src: "/arko/web-3.png", label: "Fig. 01 — Dashboard · active projects, team stats, pending approvals" },
            { src: "/arko/web-4.png", label: "Fig. 02 — All Projects · filter by status, search, quick access" },
            { src: "/arko/web-5.png", label: "Fig. 03 — Project Detail · rooms, progress bars, live activity log" },
            { src: "/arko/web-6.png", label: "Fig. 04 — Comments View · client feedback pinned in the room, in context" },
          ]} />
        </Reveal>

        {/* ── MOBILE SCAN FLOW — carousel ─────────────────────────── */}
        <Rule label="Designer · iOS — Scan to AR Editor" />

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
            <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              A pre-scan checklist ensures quality spatial capture. The scanner detects
              floor planes, measures spatial accuracy, and confirms the data before the
              AR editor opens.
            </p>
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

        {/* AR Editor — 2×2 grid */}
        <div style={{ marginTop: 56 }}>
          <Reveal>
            <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 16 }}>
              AR Room Editor — Canvas first, tools at the edges
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { src: "/arko/phone-7.png",  label: "Room type breadcrumb navigation" },
              { src: "/arko/phone-8.png",  label: "Furniture library — collapsible sidebar" },
              { src: "/arko/phone-10.png", label: "Item selected — Properties panel" },
              { src: "/arko/phone-12.png", label: "Preview mode — Send to Client" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={s.src} alt={s.label} style={{
                    width: "100%", display: "block",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
                    marginBottom: 8,
                  }} />
                  <p style={{ ...mono, fontSize: 8, color: "var(--text-muted)" }}>{s.label}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── CLIENT EXPERIENCE — carousel ────────────────────────── */}
        <Rule label="Client · Mobile Experience" />

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
            <p style={{ fontFamily: sans, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              The client opens a link, sees their space in AR, leaves pinned
              spatial feedback, and approves — without downloading an app or creating
              an account. When they approve, the designer gets a notification and a
              timestamped PDF that closes the loop.
            </p>
          </Reveal>
        </div>

        {/* ── DESIGN DECISIONS — stepper ──────────────────────────── */}
        <Rule label="Design Decisions" />

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

        {/* ── OUTCOMES ─────────────────────────────────────────────── */}
        <Rule label="Outcomes & Reflection" />

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: 56 }}>
          {[
            {
              label: "What I'd build next",
              body: "An analytics layer for designers — showing which rooms clients spend the most time reviewing, which furniture items get swapped most often, and where comments cluster spatially. Turning client behavior into actionable design intelligence.",
              bg: "var(--bg-secondary)",
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

        <div className="flex justify-center" aria-hidden style={{ marginBottom: 40 }}>
          <HandDrawnSketch type="perspective" width={200} height={96}
            annotation="from architecture to digital product" delay={0.2} />
        </div>

        {/* ── NAVIGATION ───────────────────────────────────────────── */}
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

      </div>{/* /max-w-4xl */}
    </motion.div>
  );
}
