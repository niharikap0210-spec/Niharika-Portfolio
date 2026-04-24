export interface ResearchHighlight {
  finding: string;
  quote: string;
}

export interface ProjectAccent {
  primary: string;
  light: string;
  dark: string;
  surface: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  role: string;
  team: string;
  duration: string;
  tools: string[];
  tags: string[];
  tagline: string; // for cards
  discipline: string; // short card eyebrow (e.g. "PRODUCT DESIGN")
  overview: string;
  problem: string;
  problemStats?: string[];
  researchHighlights?: ResearchHighlight[];
  process: string[];
  outcome: string;
  keyTakeaways: string[];
  accentHue: string;
  gradient: string; // card thumbnail fallback
  heroImage: string; // card mockup path (under /public)
  heroMockupKind: "laptop" | "tablet" | "phone" | "photo"; // framing
  accent: ProjectAccent; // per-project palette pulled from case-study page
}

export const projects: Project[] = [
  {
    slug: "arko",
    title: "Arko",
    subtitle: "Spatial design platform for interior design firms",
    description: "B2B SaaS consolidating AR space scanning, interior design, and client approval into one platform — eliminating the revision cycles that cost design firms 6–8 hours per project.",
    tagline: "Spatial design platform · B2B SaaS · Web + iOS",
    discipline: "PRODUCT DESIGN",
    year: "2025",
    role: "Product Designer (End-to-end)",
    team: "Individual project",
    duration: "14 weeks",
    tools: ["Figma", "Framer", "Protopie"],
    tags: ["PRODUCT DESIGN", "B2B SAAS", "AR / SPATIAL", "WEB + IOS"],
    accentHue: "130",
    gradient: "linear-gradient(135deg, #1C2B1C 0%, #243824 50%, #2D4A2D 100%)",
    heroImage: "/arko/web-1.png",
    heroMockupKind: "laptop",
    accent: {
      primary: "#6E8F4E",
      light:   "#8BAD6A",
      dark:    "#4F6B35",
      surface: "#F0F4E8",
    },
    overview: "Interior designers spend hours chasing client approvals over email and WhatsApp that still end in miscommunication. Arko is a B2B SaaS platform that lets design teams scan physical spaces in AR, furnish and finish them digitally, and share interactive walkthroughs with clients for remote review and one-click approval.",
    problem: "Design firms lose an average of 6–8 hours per project on revision cycles caused by one root problem — clients cannot visualize a space from a floor plan or mood board alone. They say yes in the meeting and change their mind when they see it built. By then, it's expensive.",
    problemStats: [
      "6–8 hours lost per project to revision cycles caused by client miscommunication",
      "Existing tools — AutoCAD exports, PDFs, walkthroughs — are either too technical or too costly to arrange repeatedly",
      "Clients say yes in the meeting and change their mind when they see it built. By then, it's expensive.",
    ],
    process: [
      "Problem Framing: Mapped the client approval workflow across 5 interior design studios to identify the highest-friction moments",
      "User Research: Interviewed 8 project leads and 6 clients to understand how each side experiences the approval loop",
      "Persona Definition: Defined two primary archetypes — the Studio Designer (power user, daily use) and the Client (occasional, non-design-literate)",
      "Key Insight: Reframed the product from 'better design tool' to 'better communication tool powered by design'",
      "Information Architecture: Mapped two parallel experience trees — designer web app and client mobile view — to ensure neither compromised the other",
      "Design System: Built a component library spanning both surfaces before any screens, ensuring consistency across web and iOS",
      "AR Editor Design: Designed the room editor with canvas-first priority — collapsible panels, progressive disclosure, minimal chrome",
      "Approval Flow: Designed share modal → client walkthrough → pinned comments → one-tap approval as a single seamless loop",
      "Empty State Design: Fully designed empty states for dashboard and project detail to guide users to their first action",
      "Prototype & Review: Built interactive prototypes in Framer and Protopie for stakeholder walkthroughs and design critique",
    ],
    outcome: "Arko consolidates three disconnected workflows — space scanning, interior design, and client approval — into one platform. The result is a product that serves two very different users without compromising either experience.",
    keyTakeaways: [
      "The best B2B products make the professional look good in front of their client — every Arko decision was made with that lens",
      "Designing for two radically different users on one platform requires explicit product architecture, not just UI variation",
      "The approval flow is the product's core value proposition — making it first-class was the right call",
      "Empty states are onboarding — for B2B tools where adoption depends on the first session, they cannot be an afterthought",
      "Communication is the hardest UX problem in professional services — and the most valuable one to solve",
    ],
  },
  {
    slug: "veriflow",
    title: "Veriflow",
    subtitle: "Specimen chain-of-custody for hospitals",
    description: "An end-to-end specimen tracking platform — a clinic tablet, a pickup flow, a web control tower, and an ambient TV — replacing handwritten logs with verified taps at every handoff.",
    tagline: "Specimen chain-of-custody for hospitals",
    discipline: "ENTERPRISE · HEALTHCARE",
    year: "2024",
    role: "Product Designer",
    team: "Design + Engineering (Enterprise Healthcare)",
    duration: "3 months",
    tools: ["Figma", "FigJam", "Jira"],
    tags: ["ENTERPRISE", "HEALTHCARE", "UI DESIGN", "DESIGN SYSTEMS"],
    accentHue: "220",
    gradient: "linear-gradient(135deg, #EFF4FD 0%, #C9DAFA 100%)",
    heroImage: "/veriflow/dashboard.png",
    heroMockupKind: "tablet",
    accent: {
      primary: "#1E40AF",
      light:   "#3B82F6",
      dark:    "#0F2A78",
      surface: "#EFF4FD",
    },
    overview: "Veriflow is an enterprise specimen tracking platform used by lab technicians and clinical staff at a major healthcare network. The existing system suffered from ambiguous status indicators, high error rates during specimen handoff, and a UI designed for desktop that was being used on tablets in the field. I led the redesign from discovery to design system.",
    problem: "Lab technicians were experiencing critical specimen mismatches and status confusion — directly impacting patient safety. The legacy system had been built incrementally over 8 years with inconsistent patterns, no design system, and zero mobile consideration despite 70% of usage happening on tablets.",
    problemStats: [
      "23% of specimen handoffs resulted in a status confirmation error requiring manual correction",
      "Lab technicians averaged 4.2 taps to complete a single status update — target was 2",
      "0 existing design system components — every screen had been built independently",
    ],
    researchHighlights: [
      { finding: "Status ambiguity is the root cause of most errors", quote: "Half the time I'm not sure if the scan went through. I tap it again just in case — and then it logs twice." },
      { finding: "Tablet use is the primary context, not an edge case", quote: "I'm never at my desk. I'm at the bench, at the refrigerator, in the corridor. I need both hands free most of the time." },
      { finding: "Handoff protocols create the highest-risk moments", quote: "When I'm handing off to the next shift, we're both tired. If the screen isn't crystal clear, something gets missed." },
    ],
    process: [
      "Contextual Inquiry: Observed 6 lab technicians across 3 shifts; documented error-prone moments and workarounds",
      "Affinity Mapping: Clustered 140 observations into 5 core themes around status, handoff, mobility, error recovery, and trust",
      "Journey Mapping: Mapped the full specimen lifecycle from collection to disposal, identifying 11 friction points",
      "Design Principles: Established 4 guiding principles — Clarity First, One-Handed Operation, Forgiveness, and Speed",
      "Component Library: Built a 60-component design system covering all states (empty, loading, error, success) before any screens",
      "Lo-Fi Wireframes: Validated 3 navigation models with 8 technicians through paper prototype sessions",
      "Hi-Fi Design: Designed 40+ screens across the specimen lifecycle with full accessibility annotations",
      "Usability Testing: Moderated 5 task-based sessions; iterated on status indicators and handoff confirmations",
    ],
    outcome: "The redesigned system reduced specimen handoff errors by 31% in pilot testing. Status confirmation taps dropped from 4.2 to 1.8. The design system reduced engineer implementation time by an estimated 40% by providing pre-built, specification-complete components.",
    keyTakeaways: [
      "In healthcare, clarity isn't a nice-to-have — it's a patient safety requirement",
      "Observational research in context reveals workarounds that no survey will surface",
      "A design system isn't overhead — it's the foundation that makes quality at scale possible",
      "Designing for the least favorable condition (tired, one-handed, in motion) makes the design better for everyone",
      "Numbers without context mislead; research without numbers can't advocate — you need both",
    ],
  },
  {
    slug: "locallift",
    title: "LocalLift",
    subtitle: "A mentorship platform for small business owners",
    description: "A research-led mentorship and digital-tools platform closing the gap between small business owners and the digital economy — 40% faster search, 20% faster information absorption.",
    tagline: "Mentorship platform · Cross-cultural UX research",
    discipline: "UX RESEARCH · SERVICE DESIGN",
    year: "2024",
    role: "UX Researcher / Designer",
    team: "5 members",
    duration: "10 weeks",
    tools: ["Figma", "FigJam", "Miro"],
    tags: ["UX RESEARCH", "SERVICE DESIGN", "SMB", "CROSS-CULTURAL"],
    accentHue: "222",
    gradient: "linear-gradient(135deg, #EDF0F7 0%, #B9C4DC 100%)",
    heroImage: "/locallift/hifi-explore.png",
    heroMockupKind: "phone",
    accent: {
      primary: "#3B4F7B",
      light:   "#6577A0",
      dark:    "#1E2A45",
      surface: "#EDF0F7",
    },
    overview: "LocalLift is a mentorship and digital-tools platform for small business owners. It connects them with industry-specific mentors, peer networks, and localised resources — reframing digital adoption as a supported, social act rather than a solo one.",
    problem: "Most SMB-facing platforms are either too technical, too abstract, or too generic to help a specific owner in a specific market make a specific decision. Small business owners need mentorship grounded in their industry and geography, not enterprise software retrofitted for them.",
    problemStats: [
      "Digital tools feel built for enterprise scale, not for a single-location small business",
      "Peer networks and industry mentorship sit outside most SMB platforms",
      "Generic advice fails in local markets — owners need city- and industry-specific guidance",
    ],
    researchHighlights: [
      { finding: "Mentorship must be industry-specific and actionable", quote: "I need someone who's been in my shoes to tell me exactly what works and what doesn't." },
      { finding: "Digital tools must be simplified, not scaled down", quote: "There are so many tools, but they feel built for big companies, not me." },
      { finding: "Peer networking is a missing backbone", quote: "I'm figuring everything out alone. Connecting with other owners would help me avoid mistakes." },
      { finding: "Local context outperforms generic advice", quote: "I need insights relevant to my city and industry, not generic business tips." },
    ],
    process: [
      "User Research: Interviews with small business owners across industries and stages",
      "Affinity Mapping: Clustered findings into four themes — mentorship, tools, peer networks, local context",
      "Personas: Defined two archetypes — early-stage owner and growth-oriented owner",
      "Information Architecture: User flow diagram mapping onboarding through ongoing use",
      "Wireframing: Lo-fi to hi-fi iterations pressure-tested against the four themes",
      "Three Design Iterations: Refined card density, progress affordances, and search based on usability feedback",
      "Design System: Component library and style guide built alongside the hi-fi screens",
    ],
    outcome: "Users absorbed information 20% faster from cleaner card layouts, felt 20% less confused thanks to explicit progress affordances, and found relevant results 40% faster after search was restructured around industry and locality.",
    keyTakeaways: [
      "Ethnographic research drives adoption — the design followed the owner, not the other way around",
      "Small iterations compound — three rounds of usability feedback produced the outcome, not one big redesign",
      "Visual hierarchy is cognitive load management — fewer density choices made cards readable in seconds",
      "Accessibility and inclusion scale the product — designing for the least-resourced owner raised the floor for all",
      "A platform is a community — mentorship and peer networks turn a tool into a place owners return to",
    ],
  },
  {
    slug: "shelfie",
    title: "Shelfie",
    subtitle: "Redesigning the most ignored text on a grocery shelf",
    description: "A field study into why consumers misread expiration dates — and a set of label and tool concepts that close the gap between what packaging says and what people understand.",
    tagline: "Mixed-methods UX research on expiration date comprehension",
    discipline: "UX RESEARCH · FIELD STUDY",
    year: "2023",
    role: "UX Researcher",
    team: "5-person research team",
    duration: "12 weeks",
    tools: ["Field Study", "Controlled Experiment", "Survey", "Affinity Mapping"],
    tags: ["UX RESEARCH", "FIELD STUDY", "PACKAGING DESIGN", "CONSUMER"],
    accentHue: "12",
    gradient: "linear-gradient(135deg, #FBEDE6 0%, #E8B5A1 100%)",
    heroImage: "/shelfie/shopper-aisle.jpg",
    heroMockupKind: "photo",
    accent: {
      primary: "#1F5F5C",
      light:   "#4A8985",
      dark:    "#143F3D",
      surface: "#E8F1EF",
    },
    overview: "Expiration dates are arguably the most-read line of text in a grocery aisle — and one of the most consistently misread. Shelfie is a 12-week mixed-methods research project investigating why a single line of safety information drives roughly 30% of household food waste and a measurable share of foodborne illness, and what better label systems and consumer tools could look like.",
    problem: "Expiration dates are read by nearly every shopper, yet only ~32% interpret them correctly. Confusing terminology (\"sell by,\" \"use by,\" \"best before\"), random placement, and low-contrast printing turn a safety signal into a guessing game — leading to both unnecessary waste and avoidable illness.",
    problemStats: [
      "Up to 30% of U.S. food waste is caused by date-label confusion (ReFED, 2022)",
      "Only ~32% of consumers correctly interpret \"sell by\" and \"use by\" labels (Norden, 2017)",
      "30% of foodborne illnesses in the U.S. are tied to consumption of spoiled food (CDC, 2015)",
    ],
    researchHighlights: [
      { finding: "Terminology is the first point of failure", quote: "Honestly I just guess. \"Best by,\" \"sell by\" — I treat them all the same. If it smells fine I keep it." },
      { finding: "Placement and contrast quietly defeat readability", quote: "On the oil bottle the date was the same yellow as the oil. I had to tilt it under the light to even find it." },
      { finding: "The riskiest moment is after the package is opened", quote: "Once I open something, that printed date doesn't matter anymore — I'm just hoping I remember when I opened it." },
    ],
    process: [
      "Literature review: Synthesised prior research on date-label comprehension, food waste, and foodborne illness to ground the study in existing evidence",
      "Cognitive framing: Mapped each label failure to a named principle — Hick's Law, Miller's Law, cognitive load, visual hierarchy, affordance, mental models, ergonomics",
      "Field study: Naturalistic observation of 25 grocery shoppers across age groups, shopping habits, and vision profiles, varied across times of day",
      "Controlled experiment: Timed each participant locating the expiration date on 4 product types — boxed candy, jarred sauce, condiment bottle, snack bag",
      "User survey: Post-observation questionnaire on checking habits, prior illness from expired food, and label-improvement preferences",
      "Synthesis: Clustered behavioural observations and survey responses into 8 reusable design insights tied back to specific cognitive principles",
      "Concept design: Translated insights into 4 proposed solutions spanning passive packaging, smart packaging, and a consumer-side companion tool",
    ],
    outcome: "The study produced a structured map between specific label failures and the cognitive principles they violate, plus four design proposals that span industry-side fixes (a universal freshness icon, a passive time-strip) and consumer-side support (an open-by overlay and Shelfie, a household tracking concept).",
    keyTakeaways: [
      "A label is a system, not a sticker — terminology, placement, contrast, and post-open behavior all have to be designed together",
      "Field research reveals failures that surveys flatter away — people say they check dates carefully, but the timing data tells a different story",
      "Vulnerable users set the floor — designing for tired eyes and bad lighting raises the floor for everyone",
      "Fixes have to live on both sides of the package — better printing helps the aisle, better tools help the pantry",
      "Behind every \"obvious\" interface decision sits a cognitive principle worth naming — making them explicit makes the case defensible",
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug: string): { prev: Project | null; next: Project | null } => {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
};
