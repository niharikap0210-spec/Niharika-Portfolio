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
    subtitle: "Enterprise specimen tracking for healthcare",
    description: "Redesigning the end-to-end specimen management system for a leading healthcare provider — reducing critical errors and improving lab technician workflows.",
    tagline: "Enterprise specimen tracking for healthcare",
    year: "2025",
    role: "Lead UX/UI Designer",
    team: "3 designers, 2 engineers",
    duration: "3 months",
    tools: ["Figma", "FigJam", "Maze", "Jira"],
    tags: ["UX RESEARCH", "UI DESIGN", "DESIGN SYSTEMS", "HEALTHCARE"],
    accentHue: "220",
    gradient: "linear-gradient(135deg, #E8EEF8 0%, #D1DCF0 100%)",
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
    slug: "locallift",
    title: "LocalLift",
    subtitle: "Empowering small businesses with digital tools",
    description: "Empowering small businesses with mentorship, digital tools, and community support. Users found relevant results 40% faster after design iterations.",
    tagline: "Empowering small businesses with digital tools",
    year: "2024",
    role: "UX Researcher / Designer",
    team: "5 members (collaboration with Namibia University)",
    duration: "10 weeks",
    tools: ["Figma", "FigJam", "Miro"],
    tags: ["UX RESEARCH", "UX DESIGN", "UI DESIGN", "DESIGN THINKING"],
    accentHue: "262",
    gradient: "linear-gradient(135deg, #EDE8FA 0%, #DDD3F5 100%)",
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
  },
  {
    slug: "thesis",
    title: "Public Realm",
    subtitle: "Redefining urban public spaces",
    description: "Redefining public spaces and reviving community life through human-centered architectural design and placemaking research.",
    tagline: "Redefining urban public spaces (architecture thesis)",
    year: "2023",
    role: "Lead Architect, Researcher & Designer",
    team: "Individual thesis project",
    duration: "20 weeks",
    tools: ["AutoCAD", "SketchUp", "Lumion", "Photoshop"],
    tags: ["URBAN DESIGN", "ARCHITECTURE", "RESEARCH", "PLACEMAKING"],
    accentHue: "210",
    gradient: "linear-gradient(135deg, #E8F1F8 0%, #C8DCF0 100%)",
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
