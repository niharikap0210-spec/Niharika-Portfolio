import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  CursorClickIcon as CursorClick,
  PencilLineIcon as PencilLine,
  UsersIcon as Users,
  PaletteIcon as Palette,
  BrowsersIcon as Browsers,
  SunIcon as Sun,
  CameraIcon as Camera,
  BuildingsIcon as Buildings,
  RulerIcon as Ruler,
  CubeIcon as Cube,
  MapPinIcon as MapPin,
} from "@phosphor-icons/react";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import ArchitectureCard from "../components/ArchitectureCard";
import HandDrawnSketch from "../components/HandDrawnSketch";
import ConnectSection from "../components/ConnectSection";
import { projects } from "../data/projects";

type Tab = "product" | "architecture";

const archProjects = [
  {
    title: "Public Realm: Beyond the Streets",
    subtitle: "Redefining public spaces, reviving community life",
    type: "Architectural Thesis · Urban Design",
    year: "2024",
    tags: ["URBAN DESIGN", "ARCH PLANNING"],
    href: "/architecture/thesis",
    accent: {
      primary: "#9B7A52",
      light: "#B8966D",
      dark: "#6B5238",
      surface: "#F6EEE5",
    },
    visualKind: "thesis" as const,
  },
  {
    title: "Rendered Realities",
    subtitle: "3D modeling and visualization in architecture",
    type: "Architectural Visualization",
    year: "2024",
    tags: ["3D MODELLING", "RENDERING"],
    href: "/architecture/renders",
    accent: {
      primary: "#4E7396",
      light: "#6B90B3",
      dark: "#2E4F6A",
      surface: "#EBF1F8",
    },
    visualKind: "renders" as const,
  },
];

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

/* ─── Tool data ──────────────────────────────────────────────────── */
type BrandTool    = { name: string; kind: "brand";    slug: string };
type PhosphorTool = { name: string; kind: "phosphor"; Icon: React.ElementType };
type ToolEntry    = BrandTool | PhosphorTool;

const PRODUCT_TOOLS: ToolEntry[] = [
  { name: "Figma",          kind: "brand",    slug: "figma" },
  { name: "Framer",         kind: "brand",    slug: "framer" },
  { name: "ProtoPie",       kind: "phosphor", Icon: CursorClick },
  { name: "SwiftUI",        kind: "brand",    slug: "swift" },
  { name: "Rive",           kind: "brand",    slug: "rive" },
  { name: "FigJam",         kind: "phosphor", Icon: PencilLine },
  { name: "User Research",  kind: "phosphor", Icon: Users },
  { name: "Design Systems", kind: "phosphor", Icon: Palette },
  { name: "Prototyping",    kind: "phosphor", Icon: Browsers },
];

const ARCH_TOOLS: ToolEntry[] = [
  { name: "AutoCAD",            kind: "brand",    slug: "autocad" },
  { name: "SketchUp",           kind: "brand",    slug: "sketchup" },
  { name: "Lumion",             kind: "phosphor", Icon: Sun },
  { name: "V-Ray",              kind: "phosphor", Icon: Camera },
  { name: "Urban Planning",     kind: "phosphor", Icon: Buildings },
  { name: "Structural Drawing", kind: "phosphor", Icon: Ruler },
  { name: "Physical Models",    kind: "phosphor", Icon: Cube },
  { name: "Site Analysis",      kind: "phosphor", Icon: MapPin },
];

/* ─── Home Page ──────────────────────────────────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("product");

  const activeCount = activeTab === "product" ? projects.length : archProjects.length;
  const sheetPrefix = activeTab === "product" ? "A" : "B";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.6, 1] }}
      className=""
    >
      {/* Hero */}
      <HeroSection />

      {/* Projects Grid */}
      <section
        id="projects"
        className="relative py-20"
        style={{ scrollMarginTop: 96 }}
      >
        {/* ── Marginalia - hand-drawn sketches & arrows in the outer margins ── */}
        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: 120, right: "9%", opacity: 0.55, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="approvalStamp"
            width={68}
            height={68}
            delay={0.2}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: "44%", left: "8%", opacity: 0.5, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="commentBubble"
            width={86}
            height={70}
            delay={0.3}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ bottom: 110, right: "8%", opacity: 0.55, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="morphTransition"
            width={118}
            height={76}
            delay={0.4}
          />
        </div>

        <div
          aria-hidden
          className="hidden lg:block absolute"
          style={{ top: "52%", right: "9%", opacity: 0.45, pointerEvents: "none" }}
        >
          <HandDrawnSketch
            type="wireframe"
            width={48}
            height={68}
            delay={0.5}
          />
        </div>

        {/* ── Content (max-width constrained) ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          {/* Section header */}
          <div className="mb-14">
            <div
              className="flex items-center justify-between"
              style={{
                borderTop: "0.75px solid var(--border)",
                paddingTop: 14,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.22em",
                  fontWeight: 500,
                }}
              >
                Selected Work
              </span>
              <span
                style={{
                  ...mono,
                  fontSize: 11,
                  color: "var(--text-muted)",
                  letterSpacing: "0.22em",
                }}
              >
                {String(activeCount).padStart(2, "0")} Projects
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(40px, 4.6vw, 56px)",
                color: "var(--text-primary)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Projects<span style={{ color: "var(--accent)" }}>.</span>
            </motion.h2>
          </div>

          {/* ── Intro paragraph + stats row ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14"
            style={{ marginBottom: 56 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.4, 1], delay: 0.1 }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.5vw, 22px)",
                lineHeight: 1.55,
                color: "var(--text-secondary)",
                margin: 0,
                maxWidth: 640,
              }}
            >
              A selection of end-to-end product work spanning enterprise SaaS, consumer
              onboarding, and research-led discovery. Each project a study in translating
              a specific constraint into something people actually reach for.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.4, 1], delay: 0.25 }}
              className="grid grid-cols-3 gap-6"
              style={{
                borderTop: "0.75px solid var(--border)",
                paddingTop: 18,
                alignSelf: "end",
              }}
            >
              {[
                { value: "04", label: "Case Studies" },
                { value: "2022-26", label: "Active Span" },
                { value: "Web + iOS", label: "Surfaces" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(22px, 2vw, 28px)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      ...mono,
                      fontSize: 9,
                      color: "var(--text-muted)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Filter pills ── */}
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                display: "inline-flex",
                border: "0.75px solid var(--border)",
                padding: 3,
                gap: 2,
              }}
            >
              {(["product", "architecture"] as Tab[]).map((tab) => {
                const active = activeTab === tab;
                const label = tab === "product" ? "Product Design" : "Architecture";
                const count = tab === "product"
                  ? String(projects.length).padStart(2, "0")
                  : String(archProjects.length).padStart(2, "0");
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      ...mono,
                      fontSize: 12,
                      letterSpacing: "0.18em",
                      padding: "14px 36px",
                      border: "none",
                      backgroundColor: active ? "var(--text-primary)" : "transparent",
                      color: active ? "#FAFAFA" : "var(--text-secondary)",
                      cursor: "pointer",
                      transitionProperty: "background-color, color",
                      transitionDuration: "220ms",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    {label}
                    <span
                      style={{
                        ...mono,
                        fontSize: 9,
                        letterSpacing: "0.14em",
                        opacity: active ? 0.55 : 0.4,
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-col grid */}
          <AnimatePresence mode="wait">
            {activeTab === "product" ? (
              <motion.div
                key="product"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.4, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {projects.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.4, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {archProjects.map((project, i) => (
                  <ArchitectureCard
                    key={project.title}
                    index={i}
                    title={project.title}
                    subtitle={project.subtitle}
                    type={project.type}
                    year={project.year}
                    tags={project.tags}
                    href={project.href}
                    accent={project.accent}
                    visualKind={project.visualKind}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Tools / Methodologies strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.4, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start"
            style={{
              marginTop: 56,
              paddingTop: 22,
              borderTop: "0.75px solid var(--border)",
              position: "relative",
            }}
          >
            <span style={{ position: "absolute", top: -4, left: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />
            <span style={{ position: "absolute", top: -4, right: 0, width: 1, height: 9, backgroundColor: "var(--construction)" }} />

            <span
              style={{
                ...mono,
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
                whiteSpace: "nowrap",
              }}
            >
              {activeTab === "product" ? "Shared Stack" : "Disciplines"}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + "-tools"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: "16px 0" }}
              >
                {(activeTab === "product" ? PRODUCT_TOOLS : ARCH_TOOLS).map((tool) => (
                  <div
                    key={tool.name}
                    title={tool.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {tool.kind === "brand" ? (
                      <img
                        src={`https://cdn.simpleicons.org/${tool.slug}/9A9A9A`}
                        alt={tool.name}
                        width={26}
                        height={26}
                        style={{ display: "block", objectFit: "contain" }}
                      />
                    ) : (
                      <tool.Icon size={26} color="var(--text-muted)" weight="regular" />
                    )}
                    <span
                      style={{
                        ...mono,
                        fontSize: 8,
                        color: "var(--text-muted)",
                        letterSpacing: "0.14em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tool.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <span
              style={{
                ...mono,
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
                whiteSpace: "nowrap",
              }}
            >
              {activeTab === "product" ? "09 Tools" : "08 Tools"}
            </span>
          </motion.div>

          {/* Section footer - light end marker (tools strip above serves as the ruling line) */}
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 22 }}
          >
            <span
              style={{
                ...mono,
                fontSize: 9,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
                opacity: 0.7,
              }}
            >
              End of Sheet
            </span>
            <span
              style={{
                ...mono,
                fontSize: 9,
                color: "var(--text-muted)",
                letterSpacing: "0.22em",
                opacity: 0.7,
              }}
            >
              {sheetPrefix}-{String(activeCount).padStart(2, "0")} / {sheetPrefix}-{String(activeCount).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* Let's Connect */}
      <ConnectSection />
    </motion.div>
  );
}
