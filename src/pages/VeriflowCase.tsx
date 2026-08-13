import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpIcon as ArrowUp, ArrowUpRightIcon as ArrowUpRight, ArrowRightIcon as ArrowRight, ArrowLeftIcon as ArrowLeft,
  DeviceTabletIcon as DeviceTablet, MonitorIcon as Monitor, TelevisionIcon as Television,
  HandTapIcon as HandTap, ClockIcon as Clock, BuildingsIcon as Buildings,
  ShieldCheckIcon as ShieldCheck, FileTextIcon as FileText, EyeSlashIcon as EyeSlash, PathIcon as Path,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { projects } from "../data/projects";
import { pageTransition } from "../lib/pageTransition";

/* ── Veriflow palette + type ─────────────────────────────────────── */
const vf = {
  primary: "#1E40AF",
  light:   "#3B82F6",
  surface: "#EFF4FD",
  hair:    "rgba(9, 30, 66, 0.10)",
  soft:    "#F4F7FD",
};
const FONT = "'Manrope', system-ui, sans-serif";
const mono: React.CSSProperties = { fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.2em" };
const WRAP = "max-w-6xl mx-auto px-6 md:px-10";
const SECTION_PAD = "clamp(80px, 11vw, 150px) 0";
const type = {
  h1: { fontFamily: FONT, fontWeight: 700, fontSize: "clamp(40px, 6.4vw, 88px)", letterSpacing: "-0.035em", lineHeight: 1.02, color: "var(--text-primary)" } as React.CSSProperties,
  h2: { fontFamily: FONT, fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 58px)", letterSpacing: "-0.03em", lineHeight: 1.06, color: "var(--text-primary)" } as React.CSSProperties,
  lede: { fontFamily: FONT, fontSize: "clamp(19px, 1.8vw, 24px)", lineHeight: 1.55, color: "var(--text-secondary)", fontWeight: 400 } as React.CSSProperties,
  body: { fontFamily: FONT, fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.7, color: "var(--text-secondary)" } as React.CSSProperties,
  label: { ...mono, fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.22em" } as React.CSSProperties,
};

/* ══ GSAP scroll reveal ══ */
function Reveal({ children, delay = 0, y = 26, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
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

/* ══════════════════════════════════════════════════════════════════
   DEVICE MOCKUPS — dark bezels, soft shadows
══════════════════════════════════════════════════════════════════ */
function TabletFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", padding: "clamp(7px,0.9vw,11px)", background: "linear-gradient(150deg, #262A33 0%, #0C0F14 100%)", borderRadius: "clamp(16px,1.8vw,24px)", boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 34px 80px rgba(15,42,120,0.22), 0 4px 14px rgba(0,0,0,0.08)" }}>
      <div style={{ borderRadius: "clamp(9px,1vw,14px)", overflow: "hidden", background: "#fff", aspectRatio: "640 / 400" }}>
        <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "center" }} />
      </div>
    </div>
  );
}
function AnimatedTabletFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", padding: "clamp(7px,0.9vw,11px)", background: "linear-gradient(150deg, #262A33 0%, #0C0F14 100%)", borderRadius: "clamp(16px,1.8vw,24px)", boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 38px 88px rgba(15,42,120,0.26), 0 4px 14px rgba(0,0,0,0.08)" }}>
      <div style={{ borderRadius: "clamp(9px,1vw,14px)", overflow: "hidden", background: "#fff", aspectRatio: "640 / 400", position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.img key={src} src={src} alt={alt} loading="lazy"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.25, 1, 0.4, 1] }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
        </AnimatePresence>
      </div>
    </div>
  );
}
function LaptopFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", position: "relative", userSelect: "none" }}>
      <div style={{ position: "relative", background: "#1A1A1A", padding: 13, borderRadius: "12px 12px 3px 3px", boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 32px 64px -22px rgba(15,42,120,0.34), 0 4px 10px rgba(0,0,0,0.06)" }}>
        <span aria-hidden style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#3a3a3a" }} />
        <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "#0a0a0a", borderRadius: 2 }}>
          <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
        </div>
      </div>
      <div aria-hidden style={{ position: "relative" }}>
        <div style={{ height: 3, margin: "0 -3%", background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 100%)" }} />
        <div style={{ position: "relative", margin: "0 -5.5%", height: 12, background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 60%, #151515 100%)", borderRadius: "0 0 14px 14px", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.22)" }}>
          <span style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "22%", height: 4, background: "#0e0e0e", borderRadius: "0 0 6px 6px" }} />
        </div>
      </div>
    </div>
  );
}
function TVFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", padding: "clamp(10px,1.2vw,16px)", background: "#14171F", borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 40px 90px rgba(15,42,120,0.28)" }}>
      <div style={{ background: "#fff", borderRadius: 5, overflow: "hidden", aspectRatio: "16 / 9" }}>
        <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
      </div>
    </div>
  );
}
/* Soft blue wash behind a mockup */
function Glow({ o = 0.16 }: { o?: number }) {
  return <div aria-hidden style={{ position: "absolute", inset: "-8% -6%", background: `radial-gradient(58% 58% at 50% 45%, ${vf.light} 0%, ${vf.primary} 42%, rgba(30,64,175,0) 72%)`, filter: "blur(50px)", opacity: o, zIndex: 0, pointerEvents: "none" }} />;
}

/* ══ Section shell — subtle alternating background ══ */
function Section({ tone = "white", id, children }: { tone?: "white" | "soft"; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: SECTION_PAD, background: tone === "soft" ? vf.soft : "var(--bg-primary)" }}>
      <div className={WRAP}>{children}</div>
    </section>
  );
}

/* ══ Reference-style section header: "0X — LABEL" + big headline + optional desc ══ */
function SectionHeader({ num, label, title, desc }: { num: string; label: string; title: string; desc?: string }) {
  return (
    <Reveal>
      <div style={{ marginBottom: "clamp(44px, 6vw, 72px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <span style={{ ...mono, fontSize: 13, color: "var(--text-muted)", fontWeight: 700 }}>{num}</span>
          <span aria-hidden style={{ width: 30, height: 2, background: vf.primary, borderRadius: 2 }} />
          <span style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700, letterSpacing: "0.24em" }}>{label}</span>
        </div>
        <h2 style={{ ...type.h2, maxWidth: 940, margin: 0 }}>{title}</h2>
        {desc && <p style={{ ...type.lede, marginTop: 22, maxWidth: 800 }}>{desc}</p>}
      </div>
    </Reveal>
  );
}

/* ══ Stat card ══ */
function StatCard({ IconC, n, title, desc }: { IconC: Icon; n: string; title: string; desc: string }) {
  return (
    <div style={{ height: "100%", padding: "clamp(28px,3vw,40px)", background: "var(--bg-elevated)", border: `1px solid ${vf.hair}`, borderRadius: 18, position: "relative", overflow: "hidden" }}>
      <span aria-hidden style={{ position: "absolute", top: 0, left: 0, width: 60, height: 3, background: vf.primary }} />
      <div style={{ width: 46, height: 46, borderRadius: 12, background: vf.surface, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 26 }}>
        <IconC size={23} color={vf.primary} weight="regular" />
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(46px,5.4vw,72px)", letterSpacing: "-0.045em", lineHeight: 0.95, color: "var(--text-primary)", marginBottom: 18 }}>{n}</div>
      <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(19px,1.9vw,23px)", letterSpacing: "-0.015em", color: "var(--text-primary)", margin: "0 0 10px" }}>{title}</h3>
      <p style={{ ...type.body, margin: 0 }}>{desc}</p>
    </div>
  );
}

/* ══ Interactive step walkthrough — tabs + tablet mockup + text ══ */
type Step = { n: string; tab: string; note: string; src: string };
function Walkthrough({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const cur = steps[active];
  const navBtn = (dir: "prev" | "next", disabled: boolean, onClick: () => void, label: string) => (
    <button onClick={onClick} disabled={disabled} aria-label={label} className="vf-navbtn"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: dir === "next" ? "12px 20px" : 12, borderRadius: 999,
        background: dir === "next" ? vf.primary : "var(--bg-elevated)", color: dir === "next" ? "#fff" : vf.primary,
        border: `1px solid ${dir === "next" ? vf.primary : vf.hair}`, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1,
        fontFamily: FONT, fontSize: 14, fontWeight: 600, transition: "background 200ms, transform 200ms" }}>
      {dir === "prev" ? <ArrowLeft size={16} weight="bold" /> : <>Next step <ArrowRight size={16} weight="bold" /></>}
    </button>
  );
  return (
    <div>
      <div className="vf-steptabs" style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))`, gap: "clamp(8px,1vw,14px)", marginBottom: "clamp(36px,4.5vw,60px)" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setActive(i)} aria-current={i === active}
            style={{ textAlign: "left", padding: "clamp(12px,1.3vw,18px)", borderRadius: 14, cursor: "pointer",
              background: i === active ? vf.surface : "var(--bg-elevated)", border: `1.5px solid ${i === active ? vf.primary : vf.hair}`,
              transition: "background 220ms, border-color 220ms" }}>
            <div style={{ ...mono, fontSize: 10, color: i === active ? vf.primary : "var(--text-muted)", fontWeight: 700, marginBottom: 8, letterSpacing: "0.16em" }}>STEP {s.n}</div>
            <div style={{ fontFamily: FONT, fontSize: "clamp(13px,1.25vw,16px)", fontWeight: 700, letterSpacing: "-0.01em", color: i === active ? "var(--text-primary)" : "var(--text-secondary)" }}>{s.tab}</div>
          </button>
        ))}
      </div>
      <div className="vf-stepbody" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr)", gap: "clamp(32px,4.5vw,72px)", alignItems: "center" }}>
        <div>
          <div style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700, marginBottom: 16 }}>Step {cur.n} of {String(steps.length).padStart(2, "0")}</div>
          <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(30px,3.4vw,46px)", letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--text-primary)", margin: "0 0 20px" }}>{cur.tab}</h3>
          <p style={{ ...type.lede, fontSize: "clamp(17px,1.5vw,21px)", margin: "0 0 32px", maxWidth: 440 }}>{cur.note}</p>
          <div style={{ display: "flex", gap: 12 }}>
            {navBtn("prev", active === 0, () => setActive((a) => Math.max(0, a - 1)), "Previous step")}
            {navBtn("next", active === steps.length - 1, () => setActive((a) => Math.min(steps.length - 1, a + 1)), "Next step")}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Glow />
          <div style={{ position: "relative", zIndex: 1 }}><AnimatedTabletFrame src={cur.src} alt={cur.tab} /></div>
        </div>
      </div>
    </div>
  );
}

/* ══ Detail card — mockup inside + icon + label + heading + desc ══ */
function DetailCard({ src, kind, IconC, label, title, desc, accent = vf.primary }: { src: string; kind: "tablet" | "laptop" | "tv"; IconC: Icon; label: string; title: string; desc: string; accent?: string }) {
  const frame = kind === "laptop" ? <LaptopFrame src={src} alt={title} /> : kind === "tv" ? <TVFrame src={src} alt={title} /> : <TabletFrame src={src} alt={title} />;
  return (
    <div style={{ height: "100%", padding: "clamp(18px,2.2vw,28px)", background: "var(--bg-elevated)", border: `1px solid ${vf.hair}`, borderRadius: 20, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <span aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: accent }} />
      <div style={{ marginBottom: 26 }}>{frame}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ width: 40, height: 40, borderRadius: 11, background: `${accent}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconC size={20} color={accent} weight="regular" /></span>
        <span style={{ ...mono, fontSize: 11, color: accent, fontWeight: 700 }}>{label}</span>
      </div>
      <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(21px,2.1vw,27px)", letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "0 0 12px" }}>{title}</h3>
      <p style={{ ...type.body, margin: 0 }}>{desc}</p>
    </div>
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

  const clinic: Step[] = [
    { n: "01", tab: "Choose action",     note: "The clinic tablet's home. Two big targets for gloved hands — start scanning or open pickup.", src: "/veriflow/start-scanning.png" },
    { n: "02", tab: "Scan both QRs",     note: "The tube's barcode and the sample ID bind in a single paired scan. One record, one identity.", src: "/veriflow/sample-association.png" },
    { n: "03", tab: "Add samples",       note: "Samples accrue one by one. The running tally stays on the right, never hidden behind a menu.", src: "/veriflow/sample-association-4.png" },
    { n: "04", tab: "Assign container",  note: "Group associated samples into a transport container before they leave the bench.", src: "/veriflow/container-assignment.png" },
    { n: "05", tab: "Confirm container", note: "Add more than one container when a batch is large — the count is always shown.", src: "/veriflow/container-assignment-4.png" },
    { n: "06", tab: "Assign cooler",     note: "Pick, don't type. Choosing the cooler is the last gate before a batch leaves the clinic.", src: "/veriflow/cooler-assignment.png" },
    { n: "07", tab: "Cooler confirmed",  note: "The cooler is paired to the batch. Every sample inside now has a home to travel in.", src: "/veriflow/cooler-assignment-4.png" },
  ];
  const courier: Step[] = [
    { n: "01", tab: "PIN in",            note: "Four digits on the tablet. Every action from here is attributable to a named courier.", src: "/veriflow/home-pin.png" },
    { n: "02", tab: "Signed in",         note: "The PIN is accepted and the courier's shift begins — no passwords, no gloves removed.", src: "/veriflow/home-pin-entered.png" },
    { n: "03", tab: "Ready coolers",     note: "Cards of cooler batches waiting for pickup. One tap claims the one you're taking.", src: "/veriflow/pickup-dashboard.png" },
    { n: "04", tab: "Collect containers", note: "Each container is a separate, deliberate tap. No batch-confirm shortcut to fat-finger.", src: "/veriflow/collect-container.png" },
    { n: "05", tab: "Validate at exit",  note: "A PIN gate at the door ties a physical exit to a named operator.", src: "/veriflow/exit-validation-pin-for-validation.png" },
    { n: "06", tab: "Cross-check",       note: "The tablet cross-checks cooler ID, container count, and courier before it releases.", src: "/veriflow/exit-validation-successfull.png" },
    { n: "07", tab: "Cleared",           note: "Happy path. The cooler leaves with a logged, authorised handoff.", src: "/veriflow/exit-validation-successfull-2.png" },
  ];

  return (
    <motion.div {...pageTransition} className="pt-14">
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 59, background: "var(--bg-primary)", zIndex: 45, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: 56, left: 0, right: 0, height: 2, background: "var(--bg-primary)", zIndex: 49 }}>
        <motion.div style={{ height: "100%", background: vf.primary, scaleX, transformOrigin: "left", opacity: 0.85 }} />
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #EEF3FD 0%, #F7F9FE 62%, var(--bg-primary) 100%)", paddingTop: "clamp(24px, 4vw, 44px)", paddingBottom: "clamp(64px, 9vw, 110px)" }}>
        <div className={WRAP}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingBottom: 18, borderBottom: `1px solid ${vf.hair}` }}>
            <Link to="/#projects" className="vf-back" style={{ display: "inline-flex", alignItems: "center", gap: 10, ...mono, fontSize: 11, letterSpacing: "0.22em", color: "var(--text-secondary)", textDecoration: "none", transition: "color 200ms" }}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M14 9H3M6 5L2 9l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Index
            </Link>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["Healthcare", "Enterprise", "Web · Tablet · TV"].map((t) => (
                <span key={t} style={{ ...mono, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.2em" }}>{t}</span>
              ))}
            </div>
          </motion.div>

          <div style={{ textAlign: "center", maxWidth: 980, margin: "0 auto", paddingTop: "clamp(48px, 7vw, 96px)" }}>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              style={{ ...mono, fontSize: 13, color: vf.primary, fontWeight: 700, letterSpacing: "0.24em", marginBottom: 26 }}>
              Veriflow · Specimen Chain-of-Custody
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 1, 0.4, 1] }} style={{ ...type.h1, margin: 0 }}>
              Specimen chain-of-custody, verified at every handoff.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
              style={{ ...type.lede, maxWidth: 640, margin: "clamp(22px,2.6vw,32px) auto 0" }}>
              A tablet, a web control tower, and a lab wall — replacing handwritten logs with a verified tap at every handoff.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 1, 0.4, 1] }}
            style={{ position: "relative", maxWidth: 1040, margin: "clamp(48px,6vw,84px) auto 0" }}>
            <Glow o={0.2} />
            <div style={{ position: "relative", zIndex: 1 }}><LaptopFrame src="/veriflow/dashboard.png" alt="Veriflow web control tower" /></div>
          </motion.div>

          <div className="vf-meta" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 24, maxWidth: 900, margin: "clamp(56px,7vw,88px) auto 0", paddingTop: "clamp(32px,4vw,44px)", borderTop: `1px solid ${vf.hair}` }}>
            {[["Role", "Product Designer"], ["Surfaces", "Web · Tablet · TV"], ["Timeline", "3 months"], ["Tools", "Figma · FigJam"]].map(([k, v]) => (
              <div key={k}>
                <div style={{ ...type.label, marginBottom: 10 }}>{k}</div>
                <div style={{ fontFamily: FONT, fontSize: "clamp(15px,1.3vw,18px)", fontWeight: 600, color: "var(--text-primary)" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 01 · PROBLEM ═══════════════ */}
      <Section tone="white">
        <SectionHeader num="01" label="The problem"
          title="Samples left the clinic. What happened next was mostly a guess."
          desc="Before a diagnosis, a tube passes through five hands and three buildings, logged on paper or not at all. Blood is time- and temperature-sensitive — a single lost cooler is a patient re-drawn, a diagnosis delayed, a clinic day lost." />

        <Reveal>
          <div className="vf-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "clamp(20px,2.4vw,32px)" }}>
            <StatCard IconC={HandTap}   n="5"   title="Hands per sample" desc="Between patient draw and pathologist screen." />
            <StatCard IconC={Clock}     n="40m" title="Invisible delay"  desc="Before anyone even notices a cooler is late." />
            <StatCard IconC={Buildings} n="3"   title="Custody zones"     desc="Clinic, transit, lab — three separate buildings." />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <blockquote style={{ margin: "clamp(56px,7vw,88px) 0 clamp(56px,7vw,88px)", maxWidth: 900 }}>
            <p style={{ fontFamily: FONT, fontSize: "clamp(24px,2.8vw,38px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.3, color: "var(--text-primary)", margin: "0 0 18px" }}>
              "We don't need another chart. We need to know, right now, whether a cooler actually{" "}
              <span style={{ color: vf.primary }}>left the clinic.</span>"
            </p>
            <cite style={{ ...type.label, fontStyle: "normal" }}>Lab Operations Lead · Discovery</cite>
          </blockquote>
        </Reveal>

        <Reveal><p style={{ ...type.label, color: "var(--text-primary)", marginBottom: 28 }}>Three gaps that couldn't be afforded</p></Reveal>
        <div className="vf-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "clamp(20px,2.4vw,32px)" }}>
          {[
            { IconC: FileText, k: "No trail",            t: "Handoffs had no record. Couriers scribbled cooler numbers on the same sheet every day." },
            { IconC: HandTap,  k: "Manual verification", t: "Pathologists matched sample IDs by eye. One digit off and the wrong lab received the tube." },
            { IconC: EyeSlash, k: "No live view",        t: "Labs had no forecast of incoming work. Staffing and storage were guesswork until a cooler arrived." },
          ].map((g, i) => (
            <Reveal key={g.k} delay={i * 0.06}>
              <div style={{ height: "100%", padding: "clamp(24px,2.8vw,34px)", background: "var(--bg-elevated)", border: `1px solid ${vf.hair}`, borderRadius: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: vf.surface, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  <g.IconC size={22} color={vf.primary} weight="regular" />
                </div>
                <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(20px,2.1vw,26px)", letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "0 0 12px" }}>{g.k}</h3>
                <p style={{ ...type.body, margin: 0 }}>{g.t}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <p style={{ fontFamily: FONT, fontSize: "clamp(24px,2.8vw,38px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.3, color: "var(--text-primary)", maxWidth: 900, marginTop: "clamp(56px,7vw,88px)" }}>
            Veriflow replaces the clipboard with a <span style={{ color: vf.primary }}>verified tap at every handoff.</span>
          </p>
        </Reveal>
      </Section>

      {/* ═══════════════ 02 · SYSTEM ═══════════════ */}
      <Section tone="soft">
        <SectionHeader num="02" label="The system" title="Three surfaces, one unbroken chain."
          desc="A tablet carries the action at every handoff. A web console carries the memory. A wall display carries the current state." />
        <div className="vf-three" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "clamp(20px,2.4vw,32px)" }}>
          <Reveal><DetailCard kind="tablet" src="/veriflow/start-scanning.png" IconC={DeviceTablet} label="Tablet · Kiosk" title="The action" desc="PIN, scan, verify, exit. The tablet is where every physical handoff becomes a record." /></Reveal>
          <Reveal delay={0.08}><DetailCard kind="laptop" src="/veriflow/dashboard.png" IconC={Monitor} label="Web · Control tower" title="The memory" desc="Dashboards, a filterable registry, and a per-sample journey for anyone off-site." /></Reveal>
          <Reveal delay={0.16}><DetailCard kind="tv" src="/veriflow/tv-dashboard-1.png" IconC={Television} label="Ambient · Wall" title="The state" desc="A wall you glance at from across the room. No login, no filter — color carries the pattern." /></Reveal>
        </div>
      </Section>

      {/* ═══════════════ 03 · PRINCIPLES ═══════════════ */}
      <Section tone="white">
        <SectionHeader num="03" label="Principles" title="Four rules that shaped every screen."
          desc="Every rule exists so one object — a cooler of blood — never disappears between two people." />
        <div className="vf-2x2" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "clamp(20px,2.4vw,32px)" }}>
          {[
            { IconC: Path,        n: "P.01", title: "Linear, not branching", body: "A fork in a flow is an error waiting to happen. One next step, always visible." },
            { IconC: ShieldCheck, n: "P.02", title: "Gate at every handoff", body: "A sample leaves one custody only when the next is confirmed. Small gate, always there." },
            { IconC: HandTap,     n: "P.03", title: "Forgive the hurry",     body: "A missed scan is a retry, not a failure. Override exists, with a PIN and a record." },
            { IconC: Television,  n: "P.04", title: "Ambient over alert",    body: "A wall replaces the phone on the counter. Glance, know. No notifications." },
          ].map((p, i) => (
            <Reveal key={p.n} delay={(i % 2) * 0.06}>
              <div style={{ height: "100%", padding: "clamp(28px,3vw,40px)", background: "var(--bg-elevated)", border: `1px solid ${vf.hair}`, borderRadius: 18, display: "flex", gap: "clamp(18px,2vw,28px)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: vf.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <p.IconC size={24} color={vf.primary} weight="regular" />
                </div>
                <div>
                  <div style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700, marginBottom: 10 }}>{p.n}</div>
                  <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(21px,2.2vw,27px)", letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "0 0 10px" }}>{p.title}</h3>
                  <p style={{ ...type.body, margin: 0 }}>{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 04 · CLINIC FLOW ═══════════════ */}
      <Section tone="soft">
        <SectionHeader num="04" label="Flow · Clinic" title="Association — a tube becomes a trackable object."
          desc="At the bench, a pathologist scans two QR codes, groups the samples, and picks a cooler. No keyboards, no branching." />
        <Reveal delay={0.05}><Walkthrough steps={clinic} /></Reveal>
      </Section>

      {/* ═══════════════ 05 · COURIER FLOW + OVERRIDE ═══════════════ */}
      <Section tone="white">
        <SectionHeader num="05" label="Flow · Courier" title="Pickup, validation, override."
          desc="Same tablet, a different role. A courier claims a cooler, collects its containers, and clears a gate before leaving." />
        <Reveal delay={0.05}><Walkthrough steps={courier} /></Reveal>

        <Reveal delay={0.05}>
          <div style={{ marginTop: "clamp(80px,10vw,130px)", maxWidth: 820 }}>
            <p style={{ ...type.label, color: vf.primary, marginBottom: 18 }}>When validation fails</p>
            <h3 style={{ ...type.h2, fontSize: "clamp(28px,3.4vw,44px)", margin: "0 0 18px" }}>A 30-second pause before override is offered.</h3>
            <p style={{ ...type.lede, margin: 0 }}>First instinct is to retry. Second is a supervisor PIN. Every override becomes its own audit event.</p>
          </div>
        </Reveal>
        <div className="vf-4up" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "clamp(18px,2.2vw,28px)", marginTop: "clamp(44px,5.5vw,64px)" }}>
          {[
            { src: "/veriflow/validation-failed-rotate-cooler-message.png", t: "T+0s",  label: "Validation fails", note: "Plain-language retry. No blame, no jargon.", accent: "#DC2626" },
            { src: "/veriflow/after-30-seconds-give-override-button.png",   t: "T+30s", label: "Override appears", note: "The pause is forced. A second attempt earns the option.", accent: "#F59E0B" },
            { src: "/veriflow/override-pin-authentication.png",             t: "T+35s", label: "Supervisor PIN",   note: "A named person accepts responsibility for the exit.", accent: vf.primary },
            { src: "/veriflow/override-confirmation.png",                   t: "T+40s", label: "Cleared",          note: "The cooler leaves. The override leaves a trail.", accent: "#10B981" },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <DetailCard kind="tablet" src={s.src} IconC={ShieldCheck} label={`${s.t} · ${s.label}`} title={s.label} desc={s.note} accent={s.accent} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 06 · WEB ═══════════════ */}
      <Section tone="soft">
        <SectionHeader num="06" label="Beyond the kiosks" title="The kiosks handle the handoff. Everything else lives on the web."
          desc="Three web surfaces for the people responsible for the chain, without being at the clinic." />
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(72px,10vw,130px)" }}>
          {[
            { n: "W.01", kicker: "Operations overview", title: "Everything, one glance.",    body: "Compliance rate, active hospitals, RFID reader health, ticket load. Built for a lab director who opens one tab each morning to know whether today is going to be quiet.", src: "/veriflow/dashboard.png" },
            { n: "W.02", kicker: "Sample registry",     title: "Every sample, addressable.", body: "Filterable by clinic, status, and date. The evidence layer for audits, morning standups, and any call that starts with 'where is sample #…'.", src: "/veriflow/all-samples.png" },
            { n: "W.03", kicker: "Single sample",       title: "One sample, whole journey.", body: "A small isometric map of clinic → courier → lab, paired with a vertical timeline of status changes. One glance beats four columns of text when a cooler is overdue.", src: "/veriflow/tracking-individual-sample.png" },
          ].map((w, i) => (
            <Reveal key={w.n}>
              <div className="vf-webrow" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)", gap: "clamp(28px,4vw,72px)", alignItems: "center", direction: i % 2 === 1 ? "rtl" : "ltr" }}>
                <div style={{ direction: "ltr" }}>
                  <span style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700 }}>{w.n} · {w.kicker}</span>
                  <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)", margin: "14px 0 18px" }}>{w.title}</h3>
                  <p style={{ ...type.body, margin: 0, maxWidth: 440 }}>{w.body}</p>
                </div>
                <div style={{ direction: "ltr", position: "relative" }}><Glow o={0.14} /><div style={{ position: "relative", zIndex: 1 }}><LaptopFrame src={w.src} alt={w.title} /></div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 07 · TV WALL ═══════════════ */}
      <Section tone="white">
        <SectionHeader num="07" label="Ambient · The wall" title="Readable across the room."
          desc="Break room, specimen receiving, the corridor outside the analyzer bay. No login, no filter — the wall just shows the current state." />
        <div className="vf-tv" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
          <Reveal><div style={{ position: "relative" }}><Glow o={0.14} /><div style={{ position: "relative", zIndex: 1 }}><TVFrame src="/veriflow/tv-dashboard-1.png" alt="Veriflow ambient wall display" /></div></div></Reveal>
          <Reveal delay={0.08}>
            <div>
              <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px,2.8vw,34px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 18px" }}>Glance, don't click.</h3>
              <p style={{ ...type.body, marginBottom: 24 }}>Color carries the pattern — sized for a six-foot viewing distance first, with the table structure following the type.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 8 }}>
                {[["#DC2626", "Overdue"], ["#10B981", "Arrived"], ["#F59E0B", "In transit"], [vf.primary, "Picked up"]].map(([c, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--bg-elevated)", border: `1px solid ${vf.hair}`, borderRadius: 12 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 4, background: c, flexShrink: 0 }} />
                    <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════ 08 · ROLE + TAKEAWAYS ═══════════════ */}
      <Section tone="soft">
        <SectionHeader num="08" label="Role · Takeaways" title="What I owned, and what it taught me." />

        <Reveal><p style={{ ...type.label, color: "var(--text-primary)", marginBottom: 22 }}>What this replaced</p></Reveal>
        <div className="vf-two" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "clamp(20px,2.4vw,32px)", marginBottom: "clamp(64px,8vw,100px)" }}>
          {[
            { k: "Before", title: "A guessed journey.", body: "Clipboards, phone calls, last-mile uncertainty. The cooler left at 9am and you hoped it arrived.", accent: "var(--text-muted)" },
            { k: "After",  title: "A recorded trip.",   body: "Every handoff signed. Every sample watchable in real time. Every override an audit event.", accent: vf.primary },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.08}>
              <div style={{ height: "100%", padding: "clamp(28px,3vw,40px)", background: "var(--bg-elevated)", border: `1px solid ${vf.hair}`, borderRadius: 18, borderTop: `3px solid ${c.accent}` }}>
                <span style={{ ...type.label, color: c.accent }}>{c.k}</span>
                <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px,2.8vw,34px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "14px 0 12px" }}>{c.title}</h3>
                <p style={{ ...type.body, margin: 0 }}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="vf-two" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", gap: "clamp(40px,6vw,88px)", alignItems: "start" }}>
          <Reveal>
            <div>
              <p style={{ ...type.label, color: vf.primary, marginBottom: 12 }}>Role · Product Designer</p>
              <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px,2.6vw,32px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 24px" }}>I owned the chain, end to end.</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Mapped the clinic, courier, lab chain across three roles.",
                  "Designed the tablet kiosks: association, pickup, validation, override.",
                  "Shipped the web control tower — admin, ops, sample journey.",
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
          <Reveal delay={0.08}>
            <div>
              <p style={{ ...type.label, color: vf.primary, marginBottom: 12 }}>Three lessons</p>
              <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px,2.6vw,32px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 24px" }}>What this project taught me.</h3>
              <div>
                {[
                  { n: "L.01", tag: "Design posture", title: "Constraint is the feature.",             body: "In healthcare, flexibility is a liability. A linear flow is the design, not a limitation of it." },
                  { n: "L.02", tag: "Failure design", title: "Error pathways are the product.",         body: "The work lives in the moment a cooler is off and someone still needs to move. Happy paths are a warm-up." },
                  { n: "L.03", tag: "Calm UX",        title: "Ambient information is calm information.", body: "A wall you glance at beats a phone that nags. Make the status findable, not pushable." },
                ].map((l) => (
                  <div key={l.n} style={{ padding: "22px 0", borderTop: `1px solid ${vf.hair}` }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                      <span style={{ ...mono, fontSize: 12, color: vf.primary, fontWeight: 700 }}>{l.n}</span>
                      <span style={{ ...type.label }}>{l.tag}</span>
                    </div>
                    <h4 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(19px,1.9vw,24px)", letterSpacing: "-0.015em", color: "var(--text-primary)", margin: "0 0 8px" }}>{l.title}</h4>
                    <p style={{ ...type.body, margin: 0 }}>{l.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════ MORE CASE STUDIES ═══════════════ */}
      <section style={{ padding: "clamp(72px,9vw,120px) 0", background: "var(--bg-primary)", borderTop: `1px solid ${vf.hair}` }}>
        <div className={WRAP}>
          <Reveal><p style={{ ...type.label, color: vf.primary, marginBottom: 32 }}>More case studies</p></Reveal>
          <div className="vf-nav" style={{ display: "grid", gridTemplateColumns: others.length > 1 ? "1fr 1fr" : "1fr", gap: "clamp(16px,2vw,24px)" }}>
            {others.map((p) => (
              <Reveal key={p.slug}>
                <Link to={`/work/${p.slug}`} className="vf-navcard" onClick={() => window.scrollTo(0, 0)}
                  style={{ display: "block", textDecoration: "none", border: `1px solid ${vf.hair}`, borderRadius: 18, overflow: "hidden", background: "var(--bg-elevated)" }}>
                  <div style={{ aspectRatio: "16 / 8", overflow: "hidden", background: p.accent?.surface || vf.surface }}>
                    <img src={p.heroImage} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                  </div>
                  <div style={{ padding: "clamp(20px,2.4vw,30px)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(24px,2.6vw,34px)", letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 6px" }}>{p.title}</h3>
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

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} aria-label="Back to top"
          style={{ position: "fixed", right: "clamp(24px,4vw,56px)", bottom: "clamp(24px,3vw,44px)", zIndex: 60, width: 50, height: 50, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `1px solid ${vf.primary}`, background: "var(--bg-elevated)", color: vf.primary, cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px rgba(30,64,175,0.18)", transition: "background-color 180ms, color 180ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = vf.primary; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-elevated)"; e.currentTarget.style.color = vf.primary; }}>
          <ArrowUp size={20} weight="bold" color="currentColor" />
        </button>
      )}

      <style>{`
        .vf-back:hover { color: ${vf.primary} !important; }
        .vf-navbtn:not(:disabled):hover { transform: translateY(-1px); }
        .vf-navcard { transition: border-color 240ms, transform 300ms cubic-bezier(0.16,1,0.3,1); }
        .vf-navcard:hover { border-color: ${vf.primary}; transform: translateY(-3px); }
        .vf-navcard:hover .vf-navarrow { transform: translate(2px,-2px); }
        .vf-navarrow { transition: transform 260ms cubic-bezier(0.16,1,0.3,1); }
        @media (max-width: 900px) {
          .vf-stats, .vf-three, .vf-2x2, .vf-two, .vf-webrow, .vf-tv, .vf-nav, .vf-stepbody, .vf-4up, .vf-meta { grid-template-columns: minmax(0,1fr) !important; }
          .vf-webrow { direction: ltr !important; }
          .vf-meta { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .vf-steptabs { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (min-width: 901px) and (max-width: 1150px) {
          .vf-4up { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
      `}</style>
    </motion.div>
  );
}
