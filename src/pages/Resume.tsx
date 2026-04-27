import { motion } from "framer-motion";
import SectionMarker from "../components/SectionMarker";
import DrawingSheetBorder from "../components/DrawingSheetBorder";

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

const contactItems = [
  {
    label: "Email",
    value: "niharikap0210@gmail.com",
    href: "mailto:niharikap0210@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/niharika-pundlik",
    href: "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/",
  },
  {
    label: "Resume",
    value: "View full resume (PDF)",
    href: "https://drive.google.com/file/d/1gzV1UkzDv2-DndTFPsqzfXLW4CPCtlwP/view?usp=sharing",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.4, 1] as const } },
};

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-14"
    >
      {/* Hero */}
      <DrawingSheetBorder
        titleBlock={{ name: "NIHARIKA PUNDLIK", sheet: "RESUME / CONTACT" }}
        className="blueprint-grid"
        style={{ padding: "clamp(48px, 8vw, 80px) 0 clamp(40px, 6vw, 64px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <SectionMarker label="Resume & Contact" letter="R" className="mb-8" />
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.4, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 64px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              marginBottom: 16,
            }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 520,
            }}
          >
            I'm currently open to full-time Product Designer roles. I'd love to chat
            about opportunities, collaborations, or just connect.
          </motion.p>
        </div>
      </DrawingSheetBorder>

      {/* Contact + Resume section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 32,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: 32,
              }}
            >
              Contact
            </motion.h2>

            <div className="space-y-4">
              {contactItems.map((item) => (
                <motion.a
                  key={item.label}
                  variants={itemVariants}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded p-1"
                  style={{
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      border: "0.75px solid var(--construction)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--text-muted)" }}>
                      <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 4 }}>
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 15,
                        color: "var(--text-secondary)",
                        transitionProperty: "color",
                        transitionDuration: "150ms",
                      }}
                      className="group-hover:text-text-primary"
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Resume embed / preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 1, 0.4, 1] }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 32,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: 32,
              }}
            >
              Resume
            </h2>

            {/* Resume preview card */}
            <div
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-elevated)",
                padding: 32,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Blueprint grid background */}
              <div
                className="blueprint-grid-subtle absolute inset-0"
                style={{ opacity: 0.5 }}
                aria-hidden
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", marginBottom: 16 }}>
                  Document - Resume
                </p>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Niharika Pundlik
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    marginBottom: 24,
                  }}
                >
                  Product Designer · HCI · Architecture
                </p>

                {/* Placeholder lines */}
                {[100, 80, 90, 65, 85, 70].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 2,
                      width: `${w}%`,
                      backgroundColor: "var(--border)",
                      marginBottom: 8,
                      borderRadius: 1,
                    }}
                    aria-hidden
                  />
                ))}

                <a
                  href="https://drive.google.com/file/d/1gzV1UkzDv2-DndTFPsqzfXLW4CPCtlwP/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--bg-elevated)",
                    backgroundColor: "var(--accent)",
                    padding: "10px 20px",
                    textDecoration: "none",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 4px 14px rgba(124,58,237,0.28)",
                    transitionProperty: "background-color, transform",
                    transitionDuration: "150ms",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "var(--accent-dark)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "var(--accent)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  Open Resume
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Availability strip */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "28px 0",
          backgroundColor: "rgba(124,58,237,0.03)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left">
          <span
            className="status-pulse"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "var(--status-green)",
              flexShrink: 0,
            }}
            aria-hidden
          />
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(9px, 2vw, 11px)",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Available for full-time Product Designer roles - open to relocation
          </p>
        </div>
      </div>
    </motion.div>
  );
}
