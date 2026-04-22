export interface ResearchHighlight {
  finding: string;
  quote: string;
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
  overview: string;
  problem: string;
  problemStats?: string[];
  researchHighlights?: ResearchHighlight[];
  process: string[];
  outcome: string;
  keyTakeaways: string[];
  accentHue: string;
  gradient: string; // for card thumbnail
}

export const projects: Project[] = [
  {
    slug: "veriflow",
    title: "Veriflow",
    subtitle: "Specimen chain-of-custody for hospitals",
    description: "An end-to-end specimen tracking platform — a clinic tablet, a pickup flow, a web control tower, and an ambient TV — replacing handwritten logs with verified taps at every handoff.",
    tagline: "Specimen chain-of-custody for hospitals",
    year: "2024",
    role: "Product Design Intern",
    team: "Design + Engineering (Enterprise Healthcare)",
    duration: "3 months",
    tools: ["Figma", "FigJam", "Jira"],
    tags: ["ENTERPRISE", "HEALTHCARE", "UI DESIGN", "DESIGN SYSTEMS"],
    accentHue: "220",
    gradient: "linear-gradient(135deg, #EFF4FD 0%, #C9DAFA 100%)",
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
    slug: "biteback",
    title: "BiteBack",
    subtitle: "Connecting surplus food with those in need",
    description: "Connecting surplus food with those in need through an intuitive donation platform. Improved SUS score from 72% to 86% across two usability test rounds.",
    tagline: "Connecting surplus food with those in need",
    year: "2024",
    role: "UX Researcher / Designer",
    team: "4 members",
    duration: "6 weeks",
    tools: ["Figma", "FigJam", "Taguette", "Otter AI"],
    tags: ["UX RESEARCH", "UX DESIGN", "USABILITY TESTING", "PROTOTYPING"],
    accentHue: "142",
    gradient: "linear-gradient(135deg, #E6F4EE 0%, #C8E6D6 100%)",
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
  },
  {
    slug: "shelfie",
    title: "Shelfie",
    subtitle: "Redesigning the most ignored text on a grocery shelf",
    description: "A human factors investigation into why consumers misread expiration dates — and a set of label and tool concepts that close the gap between what packaging says and what people understand.",
    tagline: "A human factors study on expiration date comprehension",
    year: "2023",
    role: "UX Researcher (Human Factors)",
    team: "5 researchers · IE 577 Human Factors",
    duration: "12 weeks",
    tools: ["Field Study", "Controlled Experiment", "Survey", "Affinity Mapping"],
    tags: ["UX RESEARCH", "HUMAN FACTORS", "FIELD STUDY", "PACKAGING DESIGN"],
    accentHue: "12",
    gradient: "linear-gradient(135deg, #FBEDE6 0%, #E8B5A1 100%)",
    overview: "Shelfie began as a graduate human factors investigation at Iowa State, looking at why a single line of text on a package — the expiration date — quietly drives 30% of household food waste and a measurable share of foodborne illness. We ran a 25-participant mixed-methods study in a Walmart in Ames, Iowa, then translated the findings into a small set of label and consumer-side design proposals.",
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
      "Literature Review: Synthesized prior research on date-label comprehension, food waste, and foodborne illness to ground the study in existing evidence",
      "Human Factors Framing: Mapped the problem to 9 cognitive and ergonomic principles — Hick's Law, Miller's Law, cognitive load, visual hierarchy, affordance, mental models, visual + physical ergonomics",
      "Field Study: Naturalistic observation of 25 Walmart shoppers across age groups, shopping habits, and vision profiles, varied across times of day",
      "Controlled Experiment: Timed each participant locating the expiration date on 4 product types — boxed candy, jarred sauce, condiment bottle, snack bag",
      "User Survey: Post-observation questionnaire on checking habits, prior illness from expired food, and label-improvement preferences",
      "Synthesis: Clustered behavioral observations and survey responses into 8 reusable design insights tied back to specific human factors principles",
      "Concept Design: Translated insights into 4 proposed solutions spanning passive packaging, smart packaging, and a consumer-side companion tool",
    ],
    outcome: "The study produced a structured map between specific label failures and the human factors principles they violate, plus four design proposals that span industry-side fixes (a universal freshness icon, a passive time-strip) and consumer-side support (an open-by overlay and Shelfie, a household tracking concept). Findings were submitted as the team's IE 577 final report.",
    keyTakeaways: [
      "A label is a system, not a sticker — terminology, placement, contrast, and post-open behavior all have to be designed together",
      "Field research reveals failures that surveys flatter away — people say they check dates carefully, but the timing data tells a different story",
      "Vulnerable users set the floor — designing for tired eyes and bad lighting raises the floor for everyone",
      "Fixes have to live on both sides of the package — better printing helps the aisle, better tools help the pantry",
      "Behind every \"obvious\" interface decision sits a cognitive principle worth naming — making them explicit makes the case defensible",
    ],
  },
  {
    slug: "arko",
    title: "Arko",
    subtitle: "Spatial design platform for interior design firms",
    description: "B2B SaaS consolidating AR space scanning, interior design, and client approval into one platform — eliminating the revision cycles that cost design firms 6–8 hours per project.",
    tagline: "Spatial design platform · B2B SaaS · Web + iOS",
    year: "2025",
    role: "Product Designer (End-to-end)",
    team: "Individual project",
    duration: "14 weeks",
    tools: ["Figma", "Framer", "Protopie"],
    tags: ["PRODUCT DESIGN", "B2B SAAS", "AR / SPATIAL", "WEB + IOS"],
    accentHue: "130",
    gradient: "linear-gradient(135deg, #1C2B1C 0%, #243824 50%, #2D4A2D 100%)",
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
