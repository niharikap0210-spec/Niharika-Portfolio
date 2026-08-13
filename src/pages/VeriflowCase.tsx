import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpIcon as ArrowUp, ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { projects } from "../data/projects";
import { pageTransition } from "../lib/pageTransition";

/* ── Veriflow palette + type, scoped to this page ─────────────────── */
const vf = {
  primary: "#1E40AF",
  light:   "#3B82F6",
  surface: "#EFF4FD",
  subtle:  "rgba(30, 64, 175, 0.10)",
  hair:    "rgba(9, 30, 66, 0.10)",
  muted:   "rgba(30, 64, 175, 0.55)",
};
const FONT = "'Manrope', system-ui, sans-serif";
const mono: React.CSSProperties = { fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.2em" };
const SECTION_PAD = "clamp(80px, 11vw, 150px) 0";
const WRAP = "max-w-6xl mx-auto px-6 md:px-10";
const TOTAL = "08";

const type = {
  h2: { fontFamily: FONT, fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--text-primary)" } as React.CSSProperties,
  lede: { fontFamily: FONT, fontSize: "clamp(20px, 1.9vw, 26px)", lineHeight: 1.55, color: "var(--text-secondary)", fontWeight: 400 } as React.CSSProperties,
  body: { fontFamily: FONT, fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)" } as React.CSSProperties,
  kicker: { ...mono, fontSize: 12, fontWeight: 700, color: vf.primary } as React.CSSProperties,
  label: { ...mono, fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.22em" } as React.CSSProperties,
};

/* ══════════════════════════════════════════════════════════════════
   Backgrounds — dotted hero canvas + drifting blue mesh (CSS in index.css)
══════════════════════════════════════════════════════════════════ */
const MESH_BLOBS = [
  { c: "rgba(59,130,246,0.42)",  x: "14%", y: "20%", s: 560, dx: 92,   dy: 62,  sc: 1.22, d: 18 },
  { c: "rgba(147,197,253,0.50)", x: "82%", y: "16%", s: 520, dx: -104, dy: 76,  sc: 1.26, d: 21 },
  { c: "rgba(30,64,175,0.24)",   x: "72%", y: "84%", s: 600, dx: -82,  dy: -92, sc: 1.18, d: 20 },
  { c: "rgba(96,165,250,0.40)",  x: "24%", y: "86%", s: 480, dx: 98,   dy: -66, sc: 1.24, d: 17 },
  { c: "rgba(191,214,250,0.55)", x: "50%", y: "48%", s: 540, dx: 64,   dy: 84,  sc: 1.20, d: 23 },
];

function AnimatedMesh() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const blobs = gsap.utils.toArray<HTMLElement>(".vf-mesh-blob", el);
        const tweens = blobs.map((b, i) => {
          const cfg = MESH_BLOBS[i];
          return gsap.to(b, {
            x: cfg ? cfg.dx : 0, y: cfg ? cfg.dy : 0, scale: cfg ? cfg.sc : 1.2,
            duration: cfg ? cfg.d : 20, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.6, force3D: true,
          });
        });
        const st = ScrollTrigger.create({
          trigger: el, start: "top bottom", end: "bottom top",
          onToggle: (self) => tweens.forEach((tw) => (self.isActive ? tw.play() : tw.pause())),
        });
        if (!st.isActive) tweens.forEach((tw) => tw.pause());
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="vf-mesh" aria-hidden>
      {MESH_BLOBS.map((b, i) => (
        <span key={i} className="vf-mesh-blob" style={{
          left: b.x, top: b.y, width: b.s, height: b.s, marginLeft: -b.s / 2, marginTop: -b.s / 2,
          background: `radial-gradient(circle, ${b.c} 0%, transparent 68%)`,
        }} />
      ))}
    </div>
  );
}

/* Alternating section shell — clean white, or the blue mesh behind. */
function Section({ tone = "white", id, children }: { tone?: "white" | "blue"; id?: string; children: React.ReactNode }) {
  if (tone === "blue") {
    return (
      <section id={id} style={{ padding: SECTION_PAD, background: "var(--bg-primary)", position: "relative", isolation: "isolate", overflow: "hidden" }}>
        <AnimatedMesh />
        <div className={WRAP} style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </section>
    );
  }
  return (
    <section id={id} style={{ padding: SECTION_PAD, background: "var(--bg-primary)" }}>
      <div className={WRAP}>{children}</div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Primitives — GSAP reveal, image, section header, structured lists
══════════════════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, y = 24, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, { autoAlpha: 0, y, duration: 0.9, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, [delay, y]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* Simple screenshot — rounded, hairline border, soft shadow. */
function Shot({ src, alt, ratio, position = "top center" }: { src: string; alt: string; ratio?: string; position?: string }) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${vf.hair}`, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 24px 60px rgba(15,42,120,0.12)" }}>
      <img src={src} alt={alt} loading="lazy" style={{ width: "100%", display: "block", aspectRatio: ratio, objectFit: "cover", objectPosition: position }} />
    </div>
  );
}

function SectionHeader({ num, phase, title, sub }: { num: string; phase: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div style={{ marginBottom: sub ? 24 : "clamp(40px, 5vw, 60px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <span style={{ ...type.kicker }}>{num} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ {TOTAL}</span></span>
          <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: vf.primary }} />
          <span style={{ ...type.label, color: "var(--text-primary)" }}>{phase}</span>
        </div>
        <h2 style={{ ...type.h2, maxWidth: 900, margin: 0 }}>{title}</h2>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════ */
export default function VeriflowCase() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);
  const others = projects.filter((p) => p.slug !== "veriflow").slice(-2);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clinicSteps = [
    { src: "/veriflow/start-scanning.png",       n: "01", label: "Choose action",     note: "The clinic tablet's home. Two big targets for gloved hands." },
    { src: "/veriflow/sample-association.png",    n: "02", label: "Scan both QRs",     note: "The tube's barcode and the sample ID bind in a single paired scan." },
    { src: "/veriflow/sample-association-4.png",  n: "03", label: "Association saved",  note: "Ten samples accrued. Tally visible on the right, never hidden." },
    { src: "/veriflow/cooler-assignment.png",     n: "04", label: "Assign cooler",     note: "Pick, not type. The last gate before a batch leaves the clinic." },
  ];
  const courierSteps = [
    { src: "/veriflow/home-pin.png",                          n: "01", label: "PIN in",             note: "Four digits on the tablet. Every action is attributable to a named courier." },
    { src: "/veriflow/pickup-dashboard.png",                  n: "02", label: "Ready coolers",      note: "Cards of cooler batches waiting for pickup. One tap claims it." },
    { src: "/veriflow/collect-container.png",                 n: "03", label: "Collect containers", note: "Each container is a separate tap. No batch-confirm shortcut." },
    { src: "/veriflow/exit-validation-pin-for-validation.png", n: "04", label: "Validate at exit",  note: "A PIN gate ties a physical exit to a named operator." },
    { src: "/veriflow/exit-validation-successfull.png",       n: "05", label: "Cross-check",        note: "Tablet cross-checks cooler ID, container count, and courier before releasing." },
    { src: "/veriflow/exit-validation-successfull-2.png",     n: "06", label: "Cleared",            note: "Happy path. The cooler leaves with a logged, authorised handoff." },
  ];
  const override = [
    { src: "/veriflow/validation-failed-rotate-cooler-message.png", t: "T+0s",  label: "Validation fails", note: "Plain-language retry. No blame, no jargon." },
    { src: "/veriflow/after-30-seconds-give-override-button.png",   t: "T+30s", label: "Override appears", note: "Pause is forced. Second attempt earns the option." },
    { src: "/veriflow/override-pin-authentication.png",             t: "T+35s", label: "Supervisor PIN",   note: "A named person accepts responsibility for the exit." },
    { src: "/veriflow/override-confirmation.png",                   t: "T+40s", label: "Cleared",          note: "The cooler leaves. The override leaves a trail." },
  ];
  const surfaces = [
    { label: "Tablet",     role: "The action. PIN, scan, verify, exit.",                  qty: "Kiosk · 10\"",  src: "/veriflow/start-scanning.png" },
    { label: "Web",        role: "The memory. Dashboards, registry, per-sample journey.", qty: "Control tower", src: "/veriflow/dashboard.png" },
    { label: "Ambient TV", role: "The state. Glance, don't click.",                       qty: "Wall mount",    src: "/veriflow/tv-dashboard-1.png" },
  ];
  const principles = [
    { n: "P.01", title: "Linear, not branching",  body: "A fork in a flow is an error waiting to happen. One next step, always visible." },
    { n: "P.02", title: "Gate at every handoff",  body: "A sample leaves one custody only when the next is confirmed. Small gate, always there." },
    { n: "P.03", title: "Forgive the hurry",      body: "A missed scan is a retry, not a failure. Override exists, with a PIN and a record." },
    { n: "P.04", title: "Ambient over alert",     body: "A wall replaces the phone on the counter. Glance, know. No notifications." },
  ];
  const web = [
    { n: "W.01", kicker: "Operations overview", title: "Everything, one glance.",   body: "Compliance rate, active hospitals, RFID reader health, ticket load. Built for a lab director who opens one tab each morning to know whether today is going to be quiet.", src: "/veriflow/dashboard.png" },
    { n: "W.02", kicker: "Sample registry",     title: "Every sample, addressable.", body: "Filterable by clinic, status, and date. The evidence layer for audits, morning standups, and any call that starts with 'where is sample #...'.", src: "/veriflow/all-samples.png" },
    { n: "W.03", kicker: "Single sample",       title: "One sample, whole journey.", body: "A small isometric map of Clinic → Courier → Lab, paired with a vertical timeline of status changes. One glance beats four columns of text when a cooler is overdue.", src: "/veriflow/tracking-individual-sample.png" },
  ];
  const lessons = [
    { n: "L.01", tag: "Design posture", title: "Constraint is the feature.",             body: "In healthcare, flexibility is a liability. A linear flow is the design, not a limitation of it." },
    { n: "L.02", tag: "Failure design", title: "Error pathways are the product.",         body: "The work lives in the moment a cooler is off and someone still needs to move. Happy paths are a warm-up." },
    { n: "L.03", tag: "Calm UX",        title: "Ambient information is calm information.", body: "A wall you glance at beats a phone that nags. Make the status findable, not pushable." },
  ];

  return (
    <motion.div {...pageTransition} className="pt-14">
      {/* fixed nav mask + scroll progress */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 59, background: "var(--bg-primary)", zIndex: 45, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: 56, left: 0, right: 0, height: 2, background: "var(--bg-primary)", zIndex: 49 }}>
        <motion.div style={{ height: "100%", background: vf.primary, scaleX, transformOrigin: "left", opacity: 0.85 }} />
      </div>

      {/* ═══════════════ HERO — dotted canvas ═══════════════ */}
      <section className="vf-hero" style={{ position: "relative", isolation: "isolate", overflow: "hidden", background: "var(--bg-primary)", paddingTop: "clamp(28px, 4vw, 48px)", paddingBottom: "clamp(72px, 10vw, 120px)" }}>
        <div className="vf-hero-dots" aria-hidden />
        <div className="vf-hero-aura" aria-hidden />
        <div className={WRAP} style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingBottom: 18, borderBottom: `1px solid ${vf.hair}` }}
          >
            <Link to="/#projects" className="vf-back" style={{ display: "inline-flex", alignItems: "center", gap: 10, ...mono, fontSize: 11, letterSpacing: "0.22em", color: "var(--text-secondary)", textDecoration: "none", transition: "color 200ms" }}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M14 9H3M6 5L2 9l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Index
            </Link>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["Healthcare", "Enterprise", "Web · Tablet · TV"].map((tag) => (
                <span key={tag} style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>{tag}</span>
              ))}
            </div>
          </motion.div>

          <div style={{ paddingTop: "clamp(40px, 6vw, 80px)", maxWidth: 900 }}>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} style={{ display: "flex", gap: 20, marginBottom: 22, flexWrap: "wrap" }}>
              <span style={{ ...mono, fontSize: 11, color: vf.primary, letterSpacing: "0.22em", fontWeight: 700 }}>Case Study · 02</span>
              <span style={{ ...mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.22em" }}>Healthcare · 2024</span>
            </motion.div>
            <div style={{ overflow: "hidden" }}>
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.12, duration: 1, ease: [0.25, 1, 0.4, 1] }}
                style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(64px, 11vw, 168px)", color: "var(--text-primary)", letterSpacing: "-0.055em", lineHeight: 0.88, margin: 0 }}>
                Veriflow<span style={{ color: vf.primary }}>.</span>
              </motion.h1>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
              style={{ ...type.lede, maxWidth: 640, marginTop: "clamp(24px, 3vw, 36px)" }}>
              Specimen chain-of-custody. <span style={{ color: vf.primary }}>Tap, verify, hand off</span>{" "}
              across a clinic tablet, a web control tower, and a lab wall.
            </motion.p>
          </div>

          {/* meta + hero shot */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
            style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
            <div className="vf-hero-meta" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 24, paddingBottom: "clamp(40px, 5vw, 60px)", marginBottom: "clamp(40px, 5vw, 60px)", borderBottom: `1px solid ${vf.hair}` }}>
              {[["Role", "Product Designer"], ["Surfaces", "Web · Tablet · TV"], ["Timeline", "3 months"], ["Tools", "Figma · FigJam"]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ ...type.label, marginBottom: 10 }}>{k}</div>
                  <div style={{ fontFamily: FONT, fontSize: "clamp(15px, 1.3vw, 18px)", fontWeight: 500, color: "var(--text-primary)" }}>{v}</div>
                </div>
              ))}
            </div>
            <Shot src="/veriflow/dashboard.png" alt="Veriflow web control tower" ratio="16 / 9" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 01 · PROBLEM (white) ═══════════════ */}
      <Section tone="white">
        <SectionHeader num="01" phase="Problem" title="Samples left the clinic. What happened next was mostly a guess." />
        <div className="vf-two" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
          <Reveal>
            <p style={{ ...type.lede, marginBottom: 24 }}>
              Before a diagnosis, a tube passes through five hands and three buildings, logged on paper or not at all. The brief asked for a system that{" "}
              <span style={{ color: "var(--text-primary)" }}>knew where every sample was, right now.</span>
            </p>
            <p style={{ ...type.body, margin: 0 }}>
              Blood is time- and temperature-sensitive. A single lost cooler is a patient re-drawn, a diagnosis delayed, a clinic day lost.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote style={{ margin: 0, paddingLeft: 22, borderLeft: `2px solid ${vf.primary}` }}>
              <p style={{ fontFamily: FONT, fontSize: "clamp(18px, 1.7vw, 22px)", lineHeight: 1.5, color: "var(--text-primary)", fontWeight: 500, margin: "0 0 16px" }}>
                "We don't need another chart. We need to know, right now, whether a cooler actually left the clinic."
              </p>
              <cite style={{ ...type.label, fontStyle: "normal" }}>Lab Operations Lead · Discovery</cite>
            </blockquote>
          </Reveal>
        </div>

        {/* stats — simple three-up */}
        <Reveal delay={0.05}>
          <div className="vf-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "clamp(24px, 4vw, 56px)", marginTop: "clamp(56px, 8vw, 96px)" }}>
            {[
              { n: "5",   k: "hands per sample", v: "between patient draw and pathologist screen." },
              { n: "40m", k: "invisible delay",  v: "before anyone notices a cooler is late." },
              { n: "3",   k: "buildings",        v: "clinic, transit, lab — three custody zones." },
            ].map((s) => (
              <div key={s.k} style={{ paddingTop: 20, borderTop: `2px solid ${vf.primary}` }}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(40px, 4.5vw, 60px)", letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
                <div style={{ ...type.label, color: vf.primary, marginBottom: 10 }}>{s.k}</div>
                <p style={{ ...type.body, margin: 0 }}>{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* three gaps — simple numbered list */}
        <Reveal delay={0.05}>
          <p style={{ ...type.label, color: "var(--text-primary)", marginTop: "clamp(56px, 8vw, 96px)", marginBottom: 8 }}>Three gaps that couldn't be afforded</p>
        </Reveal>
        <div>
          {[
            { k: "No trail",            t: "Handoffs had no record. Couriers scribbled cooler numbers on the same sheet every day." },
            { k: "Manual verification", t: "Pathologists matched sample IDs by eye. One digit off and the wrong lab received the tube." },
            { k: "No live view",        t: "Labs had no forecast of incoming work. Staffing and storage were guesswork until a cooler arrived." },
          ].map((g, i) => (
            <Reveal key={g.k} delay={i * 0.06}>
              <div className="vf-listrow" style={{ display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "baseline", padding: "clamp(24px, 3vw, 34px) 0", borderTop: `1px solid ${vf.hair}` }}>
                <span style={{ ...mono, fontSize: 13, color: vf.primary, fontWeight: 700 }}>0{i + 1}</span>
                <div>
                  <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(22px, 2.2vw, 30px)", letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "0 0 10px" }}>{g.k}</h3>
                  <p style={{ ...type.body, margin: 0, maxWidth: 720 }}>{g.t}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <p style={{ fontFamily: FONT, fontSize: "clamp(22px, 2.4vw, 34px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.35, color: "var(--text-primary)", maxWidth: 900, marginTop: "clamp(56px, 8vw, 88px)" }}>
            Veriflow replaces the clipboard with a <span style={{ color: vf.primary }}>verified tap at every handoff.</span>
          </p>
        </Reveal>
      </Section>

      {/* ═══════════════ 02 · SYSTEM (blue) ═══════════════ */}
      <Section tone="blue">
        <SectionHeader num="02" phase="The system" title="Three surfaces, one unbroken chain." />
        <Reveal>
          <p style={{ ...type.lede, maxWidth: 760, marginBottom: "clamp(48px, 6vw, 72px)" }}>
            A tablet carries the <span style={{ color: vf.primary }}>action</span> at every handoff. A web console carries the <span style={{ color: vf.primary }}>memory</span>. A wall display carries the <span style={{ color: vf.primary }}>current state.</span>
          </p>
        </Reveal>
        <div className="vf-three" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
          {surfaces.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div style={{ height: "100%" }}>
                <Shot src={s.src} alt={s.label} ratio="16 / 10" />
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 20, marginBottom: 8 }}>
                  <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(22px, 2.2vw, 28px)", letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>{s.label}</h3>
                  <span style={{ ...type.label, color: vf.primary }}>{s.qty}</span>
                </div>
                <p style={{ ...type.body, margin: 0 }}>{s.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 03 · PRINCIPLES (white) ═══════════════ */}
      <Section tone="white">
        <SectionHeader num="03" phase="Principles" title="Four rules that shaped every screen." />
        <Reveal>
          <p style={{ ...type.lede, maxWidth: 720, marginBottom: "clamp(48px, 6vw, 72px)" }}>
            Every rule exists so one object — a cooler of blood — never disappears between two people.
          </p>
        </Reveal>
        <div className="vf-two" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "clamp(28px, 3vw, 48px) clamp(40px, 6vw, 88px)" }}>
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={(i % 2) * 0.06}>
              <div style={{ paddingTop: 24, borderTop: `1px solid ${vf.hair}` }}>
                <span style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700 }}>{p.n}</span>
                <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(22px, 2.3vw, 30px)", letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "14px 0 12px" }}>{p.title}</h3>
                <p style={{ ...type.body, margin: 0 }}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 04 · CLINIC FLOW (blue) ═══════════════ */}
      <Section tone="blue">
        <SectionHeader num="04" phase="Flow · Clinic" title="Association. A tube becomes a trackable object." />
        <Reveal>
          <p style={{ ...type.lede, maxWidth: 720, marginBottom: "clamp(48px, 6vw, 72px)" }}>
            A pathologist scans two QR codes and picks a cooler. Four taps, no keyboards.
          </p>
        </Reveal>
        <div className="vf-steps-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "clamp(28px, 4vw, 56px)" }}>
          {clinicSteps.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 0.06}>
              <div>
                <Shot src={s.src} alt={s.label} ratio="16 / 10" />
                <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
                  <span style={{ ...mono, fontSize: 13, color: vf.primary, fontWeight: 700, paddingTop: 2 }}>{s.n}</span>
                  <div>
                    <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(19px, 1.9vw, 24px)", letterSpacing: "-0.015em", color: "var(--text-primary)", margin: "0 0 8px" }}>{s.label}</h3>
                    <p style={{ ...type.body, margin: 0 }}>{s.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 05 · COURIER FLOW + OVERRIDE (white) ═══════════════ */}
      <Section tone="white">
        <SectionHeader num="05" phase="Flow · Courier" title="Pickup, validation, override." />
        <Reveal>
          <p style={{ ...type.lede, maxWidth: 720, marginBottom: "clamp(48px, 6vw, 72px)" }}>
            Same tablet, different role. A courier claims a cooler, collects its containers, and clears a gate before leaving.
          </p>
        </Reveal>
        <div className="vf-steps-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "clamp(24px, 3vw, 44px)" }}>
          {courierSteps.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 0.05}>
              <div>
                <Shot src={s.src} alt={s.label} ratio="16 / 10" />
                <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
                  <span style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700, paddingTop: 2 }}>{s.n}</span>
                  <div>
                    <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(17px, 1.6vw, 20px)", letterSpacing: "-0.01em", color: "var(--text-primary)", margin: "0 0 6px" }}>{s.label}</h3>
                    <p style={{ ...type.body, fontSize: 15, margin: 0 }}>{s.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* override */}
        <Reveal delay={0.05}>
          <div style={{ marginTop: "clamp(72px, 9vw, 120px)", maxWidth: 780 }}>
            <p style={{ ...type.label, color: vf.primary, marginBottom: 18 }}>When validation fails</p>
            <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(26px, 3vw, 40px)", letterSpacing: "-0.025em", lineHeight: 1.15, color: "var(--text-primary)", margin: "0 0 18px" }}>
              A 30-second pause before override is offered.
            </h3>
            <p style={{ ...type.lede, fontSize: "clamp(18px, 1.6vw, 22px)", margin: 0 }}>
              First instinct is to retry. Second is a supervisor PIN. Every override becomes its own audit event.
            </p>
          </div>
        </Reveal>
        <div className="vf-steps-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "clamp(20px, 2.4vw, 32px)", marginTop: "clamp(40px, 5vw, 60px)" }}>
          {override.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <div>
                <Shot src={s.src} alt={s.label} ratio="16 / 10" />
                <div style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>{s.t}</div>
                <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(16px, 1.5vw, 19px)", letterSpacing: "-0.01em", color: "var(--text-primary)", margin: "0 0 6px" }}>{s.label}</h3>
                <p style={{ ...type.body, fontSize: 15, margin: 0 }}>{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 06 · WEB (blue) ═══════════════ */}
      <Section tone="blue">
        <SectionHeader num="06" phase="Beyond the kiosks" title="The kiosks handle the handoff. Everything else lives on the web." />
        <Reveal>
          <p style={{ ...type.lede, maxWidth: 720, marginBottom: "clamp(56px, 7vw, 96px)" }}>
            Three web surfaces for people responsible for the chain, without being at the clinic.
          </p>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(64px, 9vw, 120px)" }}>
          {web.map((w, i) => (
            <Reveal key={w.n} delay={0.04}>
              <div className="vf-webrow" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr)", gap: "clamp(28px, 4vw, 64px)", alignItems: "center", direction: i % 2 === 1 ? "rtl" : "ltr" }}>
                <div style={{ direction: "ltr" }}>
                  <span style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700 }}>{w.n} · {w.kicker}</span>
                  <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px, 2.8vw, 34px)", letterSpacing: "-0.025em", lineHeight: 1.15, color: "var(--text-primary)", margin: "14px 0 16px" }}>{w.title}</h3>
                  <p style={{ ...type.body, margin: 0, maxWidth: 440 }}>{w.body}</p>
                </div>
                <div style={{ direction: "ltr" }}><Shot src={w.src} alt={w.title} ratio="16 / 10" /></div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 07 · TV WALL (white) ═══════════════ */}
      <Section tone="white">
        <SectionHeader num="07" phase="Ambient · The wall" title="Readable across the room." />
        <div className="vf-tv" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }}>
          <Reveal><Shot src="/veriflow/tv-dashboard-1.png" alt="Veriflow ambient wall display" ratio="16 / 9" /></Reveal>
          <Reveal delay={0.08}>
            <div>
              <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px, 2.6vw, 32px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 18px" }}>Glance, don't click.</h3>
              <p style={{ ...type.body, marginBottom: 18 }}>Break room, specimen receiving, the corridor outside the analyzer bay. No login, no filter.</p>
              <p style={{ ...type.body, marginBottom: 24 }}>Color carries the pattern:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {[["#DC2626", "Overdue"], ["#10B981", "Arrived"], ["#F59E0B", "In transit"], [vf.primary, "Picked up"]].map(([c, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: c }} />
                    <span style={{ fontFamily: FONT, fontSize: 16, color: "var(--text-primary)" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 20, borderTop: `1px solid ${vf.hair}` }}>
                <div style={{ ...type.label, color: vf.primary, marginBottom: 10 }}>Design note</div>
                <p style={{ ...type.body, margin: 0 }}>Type sized for a six-foot viewing distance first. The table structure followed the type, not the other way around.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════ 08 · ROLE + TAKEAWAYS (blue) ═══════════════ */}
      <Section tone="blue">
        <SectionHeader num="08" phase="Role · Takeaways" title="What I owned, and what this project taught me." />

        {/* before / after */}
        <Reveal>
          <p style={{ ...type.label, color: "var(--text-primary)", marginBottom: 20 }}>What this replaced</p>
        </Reveal>
        <div className="vf-two" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "clamp(24px, 4vw, 48px)", marginBottom: "clamp(64px, 8vw, 100px)" }}>
          {[
            { k: "Before", title: "A guessed journey.", body: "Clipboards, phone calls, last-mile uncertainty. The cooler left at 9am and you hoped it arrived." },
            { k: "After",  title: "A recorded trip.",   body: "Every handoff signed. Every sample watchable in real time. Every override an audit event." },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.08}>
              <div style={{ paddingTop: 22, borderTop: `2px solid ${i === 0 ? "var(--text-muted)" : vf.primary}` }}>
                <span style={{ ...type.label, color: i === 0 ? "var(--text-muted)" : vf.primary }}>{c.k}</span>
                <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px, 2.8vw, 34px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "14px 0 12px" }}>{c.title}</h3>
                <p style={{ ...type.body, margin: 0 }}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="vf-two" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", gap: "clamp(40px, 6vw, 88px)", alignItems: "start" }}>
          {/* what I owned */}
          <Reveal>
            <div>
              <p style={{ ...type.label, color: vf.primary, marginBottom: 12 }}>Role · Product Designer</p>
              <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px, 2.6vw, 32px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 24px" }}>I owned the chain, end to end.</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Mapped the clinic, courier, lab chain across three roles.",
                  "Designed the tablet kiosks: association, pickup, validation, override.",
                  "Shipped the web control tower (admin, ops, sample journey).",
                  "Laid out the TV wall: six-foot type, color as status encoding.",
                  "Authored the validation-failure plus 30-second override pattern.",
                ].map((line, j) => (
                  <li key={j} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, padding: "16px 0", borderTop: `1px solid ${vf.hair}` }}>
                    <span style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700 }}>0{j + 1}</span>
                    <span style={{ ...type.body, color: "var(--text-primary)" }}>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* three lessons */}
          <Reveal delay={0.08}>
            <div>
              <p style={{ ...type.label, color: vf.primary, marginBottom: 12 }}>Three lessons</p>
              <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px, 2.6vw, 32px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 24px" }}>What this project taught me.</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {lessons.map((l) => (
                  <div key={l.n} style={{ padding: "22px 0", borderTop: `1px solid ${vf.hair}` }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                      <span style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700 }}>{l.n}</span>
                      <span style={{ ...type.label }}>{l.tag}</span>
                    </div>
                    <h4 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(19px, 1.9vw, 24px)", letterSpacing: "-0.015em", color: "var(--text-primary)", margin: "0 0 8px" }}>{l.title}</h4>
                    <p style={{ ...type.body, margin: 0 }}>{l.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════ MORE CASE STUDIES ═══════════════ */}
      <section style={{ padding: "clamp(72px, 9vw, 120px) 0", background: "var(--bg-primary)", borderTop: `1px solid ${vf.hair}` }}>
        <div className={WRAP}>
          <Reveal><p style={{ ...type.label, color: vf.primary, marginBottom: 32 }}>More case studies</p></Reveal>
          <div className="vf-nav" style={{ display: "grid", gridTemplateColumns: others.length > 1 ? "1fr 1fr" : "1fr", gap: "clamp(16px, 2vw, 24px)" }}>
            {others.map((p) => (
              <Reveal key={p.slug}>
                <Link to={`/work/${p.slug}`} className="vf-navcard" onClick={() => window.scrollTo(0, 0)}
                  style={{ display: "block", textDecoration: "none", border: `1px solid ${vf.hair}`, borderRadius: 16, overflow: "hidden", background: "var(--bg-elevated)" }}>
                  <div style={{ aspectRatio: "16 / 8", overflow: "hidden", background: p.accent?.surface || vf.surface }}>
                    <img src={p.heroImage} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                  </div>
                  <div style={{ padding: "clamp(20px, 2.4vw, 30px)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px, 2.6vw, 34px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 6px" }}>{p.title}</h3>
                      <p style={{ ...type.body, fontSize: 15, margin: 0 }}>{p.subtitle}</p>
                    </div>
                    <span className="vf-navarrow" style={{ display: "inline-flex", flexShrink: 0, color: vf.primary }}><ArrowUpRight size={22} weight="bold" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* back to top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
          aria-label="Back to top"
          style={{ position: "fixed", right: "clamp(24px, 4vw, 56px)", bottom: "clamp(24px, 3vw, 44px)", zIndex: 60, width: 50, height: 50, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `1px solid ${vf.primary}`, background: "var(--bg-elevated)", color: vf.primary, cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px rgba(30,64,175,0.18)", transition: "background-color 180ms, color 180ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = vf.primary; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-elevated)"; e.currentTarget.style.color = vf.primary; }}>
          <ArrowUp size={20} weight="bold" color="currentColor" />
        </button>
      )}

      <style>{`
        .vf-back:hover { color: ${vf.primary} !important; }
        .vf-navcard { transition: border-color 240ms, transform 300ms cubic-bezier(0.16,1,0.3,1); }
        .vf-navcard:hover { border-color: ${vf.primary}; transform: translateY(-3px); }
        .vf-navcard:hover .vf-navarrow { transform: translate(2px, -2px); }
        .vf-navarrow { transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        @media (max-width: 900px) {
          .vf-two, .vf-three, .vf-steps-2, .vf-steps-3, .vf-steps-4, .vf-webrow, .vf-tv, .vf-stats, .vf-nav, .vf-hero-meta { grid-template-columns: minmax(0,1fr) !important; }
          .vf-webrow { direction: ltr !important; }
          .vf-hero-meta { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .vf-steps-4 { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
      `}</style>
    </motion.div>
  );
}
