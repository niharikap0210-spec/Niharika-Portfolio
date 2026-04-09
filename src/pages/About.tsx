import { motion } from "framer-motion";

const skills = [
  "UX Research", "User Experience Design", "User Interface Design",
  "Design Thinking", "Prototyping", "Usability Testing",
  "Information Architecture", "Figma", "FigJam", "Miro",
  "AutoCAD", "SketchUp", "Accessibility", "Human-Computer Interaction",
];

const facts = [
  { emoji: "📍", text: "From Indore, India" },
  { emoji: "🌶️", text: "Culinary adventurer — the spicier, the better" },
  { emoji: "💃", text: "Dancer" },
  { emoji: "✈️", text: "Travel enthusiast chasing local food and new places" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <div className="pt-14">
      <div className="max-w-5xl mx-auto px-6 md:px-8 pt-20 pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
        >
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.p variants={itemVariants} className="text-xs font-semibold uppercase text-ink-300 mb-8" style={{ letterSpacing: "0.1em" }}>
              About
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl text-ink-900 mb-8"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
            >
              <em>I design intuitive</em>
              <br />
              experiences that bridge
              <br />
              <em>innovation and human needs.</em>
            </motion.h1>

            <motion.div variants={itemVariants} className="space-y-5 text-ink-500" style={{ lineHeight: "1.75" }}>
              <p>
                I&apos;m a Product Designer with a dual background in{" "}
                <span className="text-ink-900 font-medium">Human-Computer Interaction</span>{" "}
                and{" "}
                <span className="text-ink-900 font-medium">Architecture</span>.
                That combination gives me an unusual lens — I think about digital
                products the way an architect thinks about space: how people move
                through it, how it makes them feel, what friction they encounter
                without realizing it.
              </p>
              <p>
                My process is grounded in deep user research. I believe good design
                starts with understanding behavior, not assumptions. I use that
                understanding to solve real pain points and build experiences that feel
                effortless.
              </p>
              <p>
                I transitioned from designing physical spaces in architecture to digital
                experiences, and I&apos;ve found that the disciplines share more than
                people expect: both prioritize accessibility, human-centered thinking,
                and the iterative pursuit of clarity.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 space-y-2">
              {facts.map((f) => (
                <p key={f.text} className="text-sm text-ink-500">
                  <span className="mr-2">{f.emoji}</span>{f.text}
                </p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/50"
                style={{
                  backgroundColor: "var(--violet)",
                  transitionProperty: "background-color, transform, box-shadow",
                  transitionDuration: "150ms",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(124,58,237,0.3)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--violet-dark)";
                  el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.12), 0 8px 20px rgba(124,58,237,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--violet)";
                  el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(124,58,237,0.3)";
                }}
              >
                View Resume
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/niharika-pundlik-63a9a1288/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-ink-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/50"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--ink-100)",
                  transitionProperty: "background-color, border-color, transform",
                  transitionDuration: "150ms",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(124,58,237,0.25)";
                  el.style.backgroundColor = "rgba(124,58,237,0.04)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--ink-100)";
                  el.style.backgroundColor = "var(--surface)";
                }}
              >
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-xs font-semibold uppercase text-ink-300 mb-4" style={{ letterSpacing: "0.1em" }}>Craft</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="text-sm px-3 py-1.5 rounded-full text-ink-700"
                    style={{ backgroundColor: "var(--surface)", border: "1px solid var(--ink-100)" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xs font-semibold uppercase text-ink-300 mb-5" style={{ letterSpacing: "0.1em" }}>Education</h2>
              <div className="space-y-5">
                <div className="py-4" style={{ borderBottom: "1px solid var(--ink-100)" }}>
                  <p className="text-sm font-medium text-ink-900">M.S. Human-Computer Interaction</p>
                  <p className="text-sm text-ink-500 mt-0.5">Iowa State University</p>
                </div>
                <div className="py-4">
                  <p className="text-sm font-medium text-ink-900">B.Arch. Architecture</p>
                  <p className="text-sm text-ink-500 mt-0.5">Architecture program</p>
                  <p className="text-xs text-ink-300 mt-0.5">Foundation in spatial design, 3D modeling, and placemaking</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xs font-semibold uppercase text-ink-300 mb-4" style={{ letterSpacing: "0.1em" }}>How I Work</h2>
              <div className="space-y-3">
                {[
                  "Deep user research focused on behavioral understanding",
                  "Human-centered design that prioritizes real user needs",
                  "Rapid prototyping and testing for iterative refinement",
                  "Purpose-driven design for accessibility and engagement",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: "var(--violet)" }} />
                    <p className="text-sm text-ink-500" style={{ lineHeight: "1.65" }}>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
