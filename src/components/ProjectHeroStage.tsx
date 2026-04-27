import { motion } from "framer-motion";
import type { Project, ProjectAccent } from "../data/projects";

interface ProjectHeroStageProps {
  project: Project;
  hovered?: boolean;
  /**
   * When true, the composition is inset to leave breathing room at top & bottom
   * so foreground text (eyebrow + title + CTA) doesn't collide with it. Used in
   * case-study NavCards where text is overlaid on the stage.
   */
  textOverlay?: boolean;
  /**
   * When true, skips the gradient/grid/border wrapper and renders only the
   * composition — lets the parent paint the surface so there's no seam.
   */
  bare?: boolean;
}

export function ProjectHeroStage({ project, hovered = false, textOverlay = false, bare = false }: ProjectHeroStageProps) {
  const { accent } = project;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: bare
          ? "transparent"
          : `
              radial-gradient(120% 80% at 50% 0%, ${accent.surface} 0%, ${accent.primary}0d 60%, transparent 100%),
              linear-gradient(180deg, ${accent.surface} 0%, ${accent.primary}0a 100%)
            `,
        border: bare || textOverlay ? "none" : `0.75px solid ${accent.primary}22`,
      }}
    >
      {!bare && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(0deg, ${accent.primary}10 0, ${accent.primary}10 1px, transparent 1px, transparent 48px),
              repeating-linear-gradient(90deg, ${accent.primary}10 0, ${accent.primary}10 1px, transparent 1px, transparent 48px)
            `,
            opacity: hovered ? 0.8 : 0.5,
            transitionProperty: "opacity",
            transitionDuration: "400ms",
          }}
        />
      )}

      {/* Composition - swapped by slug */}
      <motion.div
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 30, mass: 0.9 }}
        style={{
          position: "absolute",
          inset: textOverlay ? "22% 14% 24%" : 22,
          zIndex: 2,
        }}
      >
        {project.slug === "arko" && <ArkoComposition accent={accent} />}
        {project.slug === "veriflow" && <VeriflowComposition accent={accent} />}
        {project.slug === "locallift" && <LocalLiftComposition accent={accent} />}
        {project.slug === "shelfie" && <ShelfieComposition accent={accent} />}
      </motion.div>
    </div>
  );
}

/* ── Arko: laptop + overlapping phone (mirrors case-study hero) ── */
function ArkoComposition({ accent }: { accent: ProjectAccent }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "10% 12% 12%" }}>
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", left: "6%", top: "12%", width: "72%", zIndex: 2 }}
      >
        <LaptopFrame src="/arko/web-1.png" alt="Arko designer dashboard" accent={accent.primary} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{
          position: "absolute",
          right: "4%",
          bottom: "-2%",
          width: "28%",
          zIndex: 3,
          filter: `drop-shadow(0 18px 30px ${accent.primary}40) drop-shadow(0 6px 12px rgba(0,0,0,0.18))`,
        }}
      >
        <img src="/arko/phone-13.png" alt="Arko client view" style={{ width: "100%", display: "block" }} loading="lazy" />
      </motion.div>
    </div>
  );
}

/* ── Veriflow: laptop + overlapping tablet ── */
function VeriflowComposition({ accent }: { accent: ProjectAccent }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "8% 14% 12%" }}>
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", left: "2%", top: "10%", width: "68%", zIndex: 2 }}
      >
        <LaptopFrame src="/veriflow/home.png" alt="Veriflow admin dashboard" accent={accent.primary} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-1.2, -0.4, -1.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        style={{ position: "absolute", right: "2%", bottom: "-2%", width: "38%", zIndex: 3 }}
      >
        <TabletFrame src="/veriflow/pickup-dashboard.png" alt="Veriflow pickup dashboard" accent={accent.primary} />
      </motion.div>
    </div>
  );
}

/* ── LocalLift: 3 phones, center in front, outer two overlap behind ── */
function LocalLiftComposition({ accent }: { accent: ProjectAccent }) {
  const phoneShadow = `drop-shadow(0 16px 28px ${accent.primary}3a) drop-shadow(0 6px 12px rgba(0,0,0,0.16))`;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", left: "15%", top: "50%", width: "26%", transform: "translateY(-50%)", zIndex: 1 }}>
        <motion.img
          src="/locallift/hifi/hifi-session.png"
          alt="LocalLift live mentor session"
          loading="lazy"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          style={{
            width: "100%",
            display: "block",
            transform: "perspective(800px) rotateY(24deg)",
            transformOrigin: "right center",
            filter: `${phoneShadow} brightness(0.96)`,
          }}
        />
      </div>

      <div style={{ position: "absolute", left: "50%", top: "50%", width: "30%", transform: "translate(-50%, -50%)", zIndex: 3 }}>
        <motion.img
          src="/locallift/hifi/hifi-explore.png"
          alt="LocalLift course browse feed"
          loading="lazy"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "100%", display: "block", filter: phoneShadow }}
        />
      </div>

      <div style={{ position: "absolute", right: "15%", top: "50%", width: "26%", transform: "translateY(-50%)", zIndex: 1 }}>
        <motion.img
          src="/locallift/hifi/hifi-profile-founder.png"
          alt="LocalLift founder profile"
          loading="lazy"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          style={{
            width: "100%",
            display: "block",
            transform: "perspective(800px) rotateY(-24deg)",
            transformOrigin: "left center",
            filter: `${phoneShadow} brightness(0.96)`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Shelfie: feathered research photo with soft glow ── */
function ShelfieComposition({ accent }: { accent: ProjectAccent }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-10%",
          background: `radial-gradient(50% 50% at 50% 50%, ${accent.light} 0%, ${accent.primary} 38%, transparent 72%)`,
          filter: "blur(80px)",
          opacity: 0.28,
          zIndex: 1,
        }}
      />
      <motion.img
        src="/shelfie/expiration-reader.jpg"
        alt="A shopper trying to read an expiration date"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: "min(100%, 380px)",
          height: "auto",
          maxHeight: "82%",
          objectFit: "contain",
          zIndex: 2,
          maskImage: "radial-gradient(ellipse 72% 80% at 50% 50%, #000 30%, rgba(0,0,0,0.85) 55%, transparent 96%)",
          WebkitMaskImage: "radial-gradient(ellipse 72% 80% at 50% 50%, #000 30%, rgba(0,0,0,0.85) 55%, transparent 96%)",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Device frames
══════════════════════════════════════════════════════════════════ */

export function LaptopFrame({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          backgroundColor: "#1A1A1A",
          borderRadius: "10px 10px 2px 2px",
          padding: 6,
          boxShadow: `0 0 0 0.75px rgba(0,0,0,0.2), 0 14px 36px ${accent}22, 0 4px 10px rgba(0,0,0,0.10)`,
          position: "relative",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 2,
            left: "50%",
            transform: "translateX(-50%)",
            width: 3,
            height: 3,
            backgroundColor: "#3A3A3A",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 3, overflow: "hidden", backgroundColor: "#0A0A0A" }}>
          <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "108%",
          height: 9,
          background: "linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 40%, #0F0F0F 100%)",
          borderRadius: "0 0 10px 10px",
          position: "relative",
          boxShadow: "0 6px 12px rgba(0,0,0,0.18)",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 52,
            height: 3,
            backgroundColor: "#0A0A0A",
            borderRadius: "0 0 4px 4px",
          }}
        />
      </div>
    </div>
  );
}

export function TabletFrame({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        backgroundColor: "#141414",
        borderRadius: 14,
        padding: 8,
        boxShadow: `0 0 0 0.75px rgba(0,0,0,0.25), 0 20px 48px ${accent}22, 0 6px 14px rgba(0,0,0,0.12)`,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 3,
          top: "50%",
          transform: "translateY(-50%)",
          width: 3,
          height: 3,
          backgroundColor: "#333",
          borderRadius: "50%",
        }}
      />
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 7, overflow: "hidden", backgroundColor: "#0A0A0A" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
