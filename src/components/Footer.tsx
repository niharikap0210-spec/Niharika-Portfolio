const monoStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  letterSpacing: "0.12em",
  fontSize: 10,
  textTransform: "uppercase",
  color: "var(--text-muted)",
};

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/" },
  { label: "Email", href: "mailto:niharikap0210@gmail.com" },
  { label: "Resume", href: "https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing" },
];

export default function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left: copyright */}
          <p style={{ ...monoStyle, opacity: 0.7 }}>
            Niharika Pundlik © 2026
          </p>

          {/* Center: craft note */}
          <div className="hidden md:flex items-center gap-2" aria-hidden>
            <div
              style={{
                width: 16,
                height: 0.75,
                backgroundColor: "var(--text-muted)",
                opacity: 0.35,
              }}
            />
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "var(--text-muted)",
                opacity: 0.35,
              }}
            />
            <p style={{ ...monoStyle, fontSize: 9, opacity: 0.5, letterSpacing: "0.1em" }}>
              Designed with precision & a lot of ☕
            </p>
          </div>

          {/* Right: links */}
          <ul className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    ...monoStyle,
                    textDecoration: "none",
                    opacity: 0.6,
                    transitionProperty: "opacity, color",
                    transitionDuration: "150ms",
                  }}
                  className="hover-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Drawing sheet detail - bottom right corner */}
        <div className="flex justify-end mt-4">
          <p
            aria-hidden
            style={{
              ...monoStyle,
              fontSize: 8,
              opacity: 0.3,
              letterSpacing: "0.12em",
            }}
          >
            Sheet: 01 of 01 • Rev: Final
          </p>
        </div>
      </div>
    </footer>
  );
}
