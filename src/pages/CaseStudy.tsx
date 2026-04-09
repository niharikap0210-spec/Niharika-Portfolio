import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";

const projects: Record<string, {
  title: string; subtitle: string; year: string; role: string; team: string;
  duration: string; tools: string[]; tags: string[]; overview: string;
  problem: string; problemStats?: string[];
  researchHighlights?: { quote: string; finding: string }[];
  process: string[]; outcome: string; keyTakeaways: string[]; accentHue: string;
}> = {
  biteback: {
    title: "BiteBack",
    subtitle: "Connecting surplus food with those in need through an intuitive donation platform.",
    year: "2024", role: "UX Researcher / Designer", team: "4 members", duration: "6 weeks",
    tools: ["Figma", "FigJam", "Taguette", "Otter AI"],
    tags: ["UX Research", "UX Design", "Usability Testing", "Prototyping"],
    overview: "BiteBack is a mobile platform designed to reduce food waste and promote food security by connecting local restaurants that have surplus food to individuals and organizations in need. It facilitates real-time food donation listings, enhances accessibility, and fosters a community-driven approach to responsible consumption.",
    problem: "Food donations lack accessibility, efficiency, and visibility — leading to missed opportunities for both donors and recipients. Every year, one-third of all food produced is wasted while 34 million people in the U.S. face hunger (USDA, 2023). Restaurants generate excess food, but logistics, liability concerns, and lack of streamlined donation systems prevent efficient redistribution.",
    problemStats: [
      "70% of restaurant owners want to donate but face logistical barriers",
      "65% of food-insecure users find it hard to locate surplus food donations",
      "90% of users prefer a mobile app with real-time listings and notifications",
    ],
    researchHighlights: [
      { finding: "Access to surplus food is limited and inconsistent", quote: "Sometimes, I don't even know where to look for food donations. I hear about them too late, or they're too far away." },
      { finding: "Logistics and time constraints hinder restaurant donations", quote: "We're already busy closing at night. Packing up donations and figuring out where to take them is just extra work." },
      { finding: "Food safety and liability concerns create hesitation", quote: "I want to help, but I don't want to be responsible if something goes wrong with the food after it leaves my restaurant." },
    ],
    process: [
      "User Interviews: Conducted interviews with 5 food recipients and 2 restaurant owners to identify pain points and motivations",
      "Thematic Analysis: Used Taguette to analyze transcripts and identify recurring patterns in user behavior",
      "Affinity Mapping: Sorted insights into themes and prioritized features using a color-coded system",
      "User Flows & Sketches: Mapped ideal journeys for both donors and receivers before moving to wireframes",
      "Lo-Fi → Hi-Fi: Designed low-fidelity wireframes, then iterated to high-fidelity with real UI components",
      "Usability Testing V1: Tested with 8 users — SUS score of 72%; identified navigation gaps and missing feedback cues",
      "Iteration: Added gamification/rewards, enhanced filters, and improved visual cues based on V1 insights",
      "Usability Testing V2: Retested with same 8 users — SUS score improved to 86%",
    ],
    outcome: "SUS score improved from 72% to 86% across two testing rounds. Faster task completion with streamlined flows. Users appreciated personalized notifications, better item filtering, and the Rewards & Points system.",
    keyTakeaways: [
      "User needs shape design — research and usability testing guided every development decision",
      "Iteration drives usability — refining navigation and interaction flows significantly enhanced efficiency",
      "Simplicity encourages adoption — a clean interface reduced friction for both donors and recipients",
      "Trust and transparency matter — freshness indicators and pickup scheduling built user confidence",
      "Community engagement enhances impact — social features reinforced the mission of reducing food waste",
    ],
    accentHue: "142",
  },
  locallift: {
    title: "LocalLift",
    subtitle: "Empowering small businesses with mentorship, digital tools, and community support.",
    year: "2024", role: "UX Researcher / Designer", team: "5 members (collaboration with Namibia University)", duration: "10 weeks",
    tools: ["Figma", "FigJam", "Miro"],
    tags: ["UX Research", "UX Design", "UI Design", "Design Thinking"],
    overview: "LocalLift is a platform designed to empower small business owners by bridging the digital skills gap, providing mentorship, and fostering a supportive entrepreneurial ecosystem. I designed key features including a mentorship matching system and community networking tools, working in collaboration with students from Namibia University.",
    problem: "Small business owners struggle with digital adoption and lack accessible mentorship, limiting their growth and sustainability. Research shows small businesses struggle with digital tools, marketing, and operations — with no centralized platform connecting them to relevant, industry-specific guidance.",
    problemStats: [
      "Entrepreneurs struggle to find industry-specific mentorship with actionable steps",
      "Existing digital tools feel overwhelming and designed for large companies, not small businesses",
      "Business owners report feeling isolated — no community to learn from peers who've faced the same challenges",
    ],
    researchHighlights: [
      { finding: "Small business owners need structured, specific mentorship", quote: "I don't just need motivation — I need someone who's actually been in my shoes to tell me exactly what works and what doesn't." },
      { finding: "Digital tools must be simple and built for their context", quote: "There are so many digital tools out there, but they all feel like they're built for big companies. I need something straightforward." },
      { finding: "Community support plays a crucial role in business success", quote: "I feel like I'm figuring everything out alone. If I could connect with other small business owners, I'd probably avoid making a lot of mistakes." },
    ],
    process: [
      "User Research: Interviewed small business owners and entrepreneurs to understand digital adoption challenges and mentorship gaps",
      "Affinity Mapping: Categorized insights into four themes — Mentorship & Guidance, Digital Tools, Operational Efficiency, and Community Support",
      "How Might We's: Framed 5 design challenges to guide ideation",
      "User Personas: Created two personas spanning Early-Stage Entrepreneur to Growth-Oriented Business Owner",
      "User Stories: Paired each persona with platform features to align design with real use cases",
      "Information Architecture: Mapped navigation flow across authentication, onboarding, mentorship, search, and learning resources",
      "Lo-Fi Wireframes: Structured key flows — onboarding, authentication, and profile navigation",
      "Hi-Fi Design + Iteration: 3 major improvements — cleaner card design, progress bars, optimized search",
    ],
    outcome: "Users absorbed information 20% faster from the redesigned card interface. Users felt 20% less confused with the progress bar addition. Users found relevant results 40% faster after optimized search and filtering.",
    keyTakeaways: [
      "User-centric design drives adoption — ethnographic research ensured alignment with real-world workflows",
      "Small iterations create big impact — refining navigation and progress indicators significantly improved experience",
      "Clear visual hierarchy matters — streamlining information presentation reduced cognitive load",
      "Accessibility and inclusion are essential — designing for diverse entrepreneurs made the platform scalable",
      "Continuous feedback shapes better solutions — regular iterations based on mentor and entrepreneur input",
    ],
    accentHue: "262",
  },
  thesis: {
    title: "Public Realm: Beyond the Streets",
    subtitle: "Redefining public spaces and reviving community life through human-centered architectural design.",
    year: "2023", role: "Lead Architect, Researcher & Designer", team: "Individual thesis project", duration: "20 weeks",
    tools: ["AutoCAD", "SketchUp", "Lumion", "Photoshop"],
    tags: ["Urban Design", "Architecture", "Research", "Placemaking"],
    overview: "An architectural thesis initiative exploring how underutilized urban spaces can be transformed into vibrant public areas that strengthen community interactions and improve quality of life. The project applies human-centered design principles from both architecture and UX to the challenge of public placemaking.",
    problem: "Urban spaces are increasingly underutilized — physically present but socially inert. Public areas that should naturally bring communities together instead sit empty, used at a fraction of their potential due to poor design, accessibility barriers, and a lack of intentional placemaking thinking.",
    process: [
      "Literature Review: Researched placemaking theory, urban design precedents, and community engagement methods",
      "Site Analysis: Studied underutilized urban spaces to identify structural and social barriers to engagement",
      "Community Research: Analyzed how communities actually use (and avoid) public space",
      "Conceptual Design: Developed spatial concepts grounded in accessibility, sustainability, and social cohesion",
      "3D Modeling & Visualization: Built detailed models in SketchUp and produced renderings in Lumion",
      "Iteration: Refined design based on feedback from architectural review sessions",
    ],
    outcome: "A comprehensive architectural thesis demonstrating how placemaking and UX design share core priorities — accessibility, human-centered thinking, contextual understanding, and iterative refinement. The work established a foundation for my transition into digital product design.",
    keyTakeaways: [
      "Architecture and UX share a DNA — both disciplines center human behavior in space",
      "Placemaking requires contextual empathy, not just aesthetic vision",
      "Accessibility and sustainability aren't constraints — they're design drivers",
      "Iteration and feedback loops are as essential in physical design as in digital",
      "Understanding how people move through spaces translates directly to designing digital flows",
    ],
    accentHue: "210",
  },
  renders: {
    title: "Rendered Realities",
    subtitle: "3D modeling and architectural visualization exploring how digital rendering communicates spatial design intent.",
    year: "2022", role: "Architect & Visualization Designer", team: "Individual project", duration: "Ongoing",
    tools: ["AutoCAD", "SketchUp", "Lumion", "Photoshop"],
    tags: ["3D Modeling", "Visualization", "Architecture", "Rendering"],
    overview: "A collection of architectural 3D modeling and visualization work demonstrating proficiency with industry-standard tools. The project explores how rendered imagery bridges the gap between architectural concept and built reality.",
    problem: "Architectural drawings communicate plan and structure but fail to convey atmosphere, material quality, and the lived experience of a space. Visualization work fills this gap — translating abstract design intent into images that clients and collaborators can emotionally connect with.",
    process: [
      "Conceptual Modeling: Built precise 3D models from architectural drawings in AutoCAD and SketchUp",
      "Environmental Setup: Defined lighting conditions, material properties, and context",
      "Rendering: Produced high-quality visualizations in Lumion to communicate spatial atmosphere",
      "Post-Production: Refined and composited renders in Photoshop for presentation quality",
    ],
    outcome: "A portfolio of architectural visualizations demonstrating technical proficiency and an eye for communicating spatial experience. This work sharpened my ability to think visually and translate design intent — skills that carry directly into UX through wireframing and prototyping.",
    keyTakeaways: [
      "Visual communication is as important as the design itself",
      "Rendering taught me to think about light, hierarchy, and how a user experiences a space before it exists",
      "Technical rigor in modeling translates to precision in digital design work",
      "Post-production is iteration — the final image is rarely the first",
    ],
    accentHue: "28",
  },
};

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projects[slug] : null;
  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="pt-14">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <div className="max-w-5xl mx-auto px-6 md:px-8 pt-16 pb-12">
          <motion.div variants={itemVariants} className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-ink-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 rounded"
              style={{ transitionProperty: "color" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.5 7h-9M5 3.5L1.5 7 5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All work
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(124,58,237,0.08)", color: "var(--violet)", border: "1px solid rgba(124,58,237,0.15)" }}>
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-ink-900 mb-4"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.08", fontStyle: "italic" }}
          >
            {project.title}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-ink-500 mb-10 max-w-2xl" style={{ lineHeight: "1.6" }}>
            {project.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 max-w-2xl"
            style={{ borderTop: "1px solid var(--ink-100)" }}
          >
            {[
              { label: "Role", value: project.role },
              { label: "Team", value: project.team },
              { label: "Duration", value: project.duration },
              { label: "Year", value: project.year },
            ].map((meta) => (
              <div key={meta.label}>
                <p className="text-xs font-semibold uppercase text-ink-300 mb-1" style={{ letterSpacing: "0.08em" }}>{meta.label}</p>
                <p className="text-sm font-medium text-ink-900">{meta.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-2">
            {project.tools.map((tool) => (
              <span key={tool} className="text-xs px-2.5 py-1 rounded-full text-ink-500"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--ink-100)" }}>
                {tool}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div variants={itemVariants} className="max-w-5xl mx-auto px-6 md:px-8 mb-16">
          <div className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/7", background: `hsl(${project.accentHue}, 50%, 95%)`, border: "1px solid var(--ink-100)" }}>
            <img src="https://placehold.co/1200x525/F5F3FF/7C3AED?text=" alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 60%)" }} />
            <div className="absolute inset-0 mix-blend-multiply opacity-15" style={{ background: `hsl(${project.accentHue}, 80%, 40%)` }} />
          </div>
        </motion.div>

        {/* Body */}
        <div className="max-w-5xl mx-auto px-6 md:px-8 pb-24">
          <div className="max-w-2xl mx-auto space-y-14">

            <motion.section variants={itemVariants}>
              <h2 className="text-xs font-semibold uppercase text-ink-300 mb-4" style={{ letterSpacing: "0.1em" }}>Overview</h2>
              <p className="text-ink-700" style={{ lineHeight: "1.75" }}>{project.overview}</p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xs font-semibold uppercase text-ink-300 mb-4" style={{ letterSpacing: "0.1em" }}>The Problem</h2>
              <p className="text-ink-700 mb-5" style={{ lineHeight: "1.75" }}>{project.problem}</p>
              {project.problemStats && (
                <div className="space-y-3 mt-4">
                  {project.problemStats.map((stat, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: "var(--violet)" }} />
                      <p className="text-sm text-ink-500" style={{ lineHeight: "1.65" }}>{stat}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>

            {project.researchHighlights && (
              <motion.section variants={itemVariants}>
                <h2 className="text-xs font-semibold uppercase text-ink-300 mb-6" style={{ letterSpacing: "0.1em" }}>Research Findings</h2>
                <div className="space-y-4">
                  {project.researchHighlights.map((item, i) => (
                    <div key={i} className="rounded-xl p-5"
                      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--ink-100)", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                      <p className="text-sm font-semibold text-ink-900 mb-2">{item.finding}</p>
                      <p className="text-sm text-ink-500 italic" style={{ lineHeight: "1.65" }}>&ldquo;{item.quote}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            <motion.section variants={itemVariants}>
              <h2 className="text-xs font-semibold uppercase text-ink-300 mb-6" style={{ letterSpacing: "0.1em" }}>Process</h2>
              <ol className="space-y-4">
                {project.process.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5"
                      style={{ backgroundColor: "rgba(124,58,237,0.1)", color: "var(--violet)" }}>
                      {i + 1}
                    </span>
                    <p className="text-ink-700 pt-0.5" style={{ lineHeight: "1.65" }}>{step}</p>
                  </li>
                ))}
              </ol>
            </motion.section>

            <motion.div variants={itemVariants}>
              <div className="w-full rounded-xl overflow-hidden"
                style={{ aspectRatio: "4/3", background: `hsl(${project.accentHue}, 40%, 97%)`, border: "1px solid var(--ink-100)" }}>
                <img src="https://placehold.co/800x600/F5F3FF/7C3AED?text=" alt="Design screens" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-ink-300 mt-3 text-center">Wireframes, prototypes, and final screens coming soon</p>
            </motion.div>

            <motion.section variants={itemVariants}>
              <h2 className="text-xs font-semibold uppercase text-ink-300 mb-4" style={{ letterSpacing: "0.1em" }}>Outcome</h2>
              <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)" }}>
                <p className="text-ink-700 font-medium" style={{ lineHeight: "1.75" }}>{project.outcome}</p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xs font-semibold uppercase text-ink-300 mb-5" style={{ letterSpacing: "0.1em" }}>Key Takeaways</h2>
              <div className="space-y-3">
                {project.keyTakeaways.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="shrink-0 text-xs font-semibold text-violet mt-0.5" style={{ minWidth: "1.25rem", color: "var(--violet)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-ink-500" style={{ lineHeight: "1.65" }}>{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.div
              variants={itemVariants}
              className="pt-8 flex justify-between items-center"
              style={{ borderTop: "1px solid var(--ink-100)" }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors duration-150 rounded"
                style={{ transitionProperty: "color" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.5 7h-9M5 3.5L1.5 7 5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All projects
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors duration-150 rounded"
                style={{ transitionProperty: "color" }}>
                About me
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M9 3.5L12.5 7 9 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
