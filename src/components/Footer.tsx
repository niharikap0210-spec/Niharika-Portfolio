import { Link } from "react-router-dom";
import {
  LinkedinLogo,
  EnvelopeSimple,
  FileArrowDown,
} from "@phosphor-icons/react";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
  internal?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    icon: <LinkedinLogo size={18} weight="regular" color="currentColor" />,
    href: "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/",
    label: "LinkedIn",
  },
  {
    icon: <EnvelopeSimple size={18} weight="regular" color="currentColor" />,
    href: "mailto:niharikap0210@gmail.com",
    label: "Email",
  },
  {
    icon: <FileArrowDown size={18} weight="regular" color="currentColor" />,
    href: "https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing",
    label: "Resume",
  },
];

const mainLinks: NavLink[] = [
  { href: "/", label: "Work", internal: true },
  { href: "/about", label: "About", internal: true },
  { href: "/resume", label: "Resume", internal: true },
  { href: "mailto:niharikap0210@gmail.com", label: "Contact" },
];

const legalLinks: NavLink[] = [
  { href: "#top", label: "Back to top" },
];

const copyright = {
  text: "© 2026 Niharika Pundlik",
  license: "Product Designer · Architect by training",
};

const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

/* ── NP monogram — architectural drafting mark ─────────────────── */
function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      style={{ color: "var(--text-primary)" }}
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="3"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <text
        x="14"
        y="18"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="13"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        NP
      </text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--bg-primary)",
      }}
      className="pb-6 pt-12 lg:pb-10 lg:pt-16"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Top: brand + social ─────────────────────────────── */}
        <div className="md:flex md:items-start md:justify-between">
          <Link
            to="/"
            className="flex items-center gap-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Niharika Pundlik - home"
            style={{ textDecoration: "none" }}
          >
            <LogoMark />
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              Niharika Pundlik<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </Link>

          <ul className="flex list-none mt-6 md:mt-0 gap-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg-elevated)",
                    color: "var(--text-secondary)",
                    transitionProperty: "background-color, color, border-color",
                    transitionDuration: "200ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--accent)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--bg-elevated)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Divider + grid: copyright / main links / legal ──── */}
        <div
          className="mt-8 pt-8 lg:mt-6 lg:pt-10 lg:grid lg:grid-cols-10 lg:gap-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* Main nav — top-right block */}
          <nav className="lg:col-[4/11]">
            <ul className="list-none flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  {link.internal ? (
                    <Link
                      to={link.href}
                      className="hover-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      style={{
                        ...mono,
                        fontSize: 13,
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        transitionProperty: "color",
                        transitionDuration: "150ms",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hover-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      style={{
                        ...mono,
                        fontSize: 13,
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        transitionProperty: "color",
                        transitionDuration: "150ms",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal / meta — second right-side row */}
          <div className="mt-5 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="hover-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                    style={{
                      ...mono,
                      fontSize: 12,
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transitionProperty: "color",
                      transitionDuration: "150ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright — spans both rows, left block */}
          <div
            className="mt-6 lg:mt-0 lg:row-[1/3] lg:col-[1/4]"
            style={{
              ...mono,
              fontSize: 12,
              color: "var(--text-muted)",
              lineHeight: 1.8,
            }}
          >
            <div>{copyright.text}</div>
            {copyright.license && (
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  fontStyle: "normal",
                  fontWeight: 400,
                  letterSpacing: "0",
                  textTransform: "none",
                  marginTop: 4,
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {copyright.license}
              </div>
            )}
          </div>
        </div>

        {/* ── Drawing sheet detail — architectural easter egg ── */}
        <div className="flex justify-end mt-8">
          <p
            aria-hidden
            style={{
              ...mono,
              fontSize: 10,
              opacity: 0.35,
              letterSpacing: "0.14em",
            }}
          >
            Sheet: 01 of 01 • Rev: Final
          </p>
        </div>
      </div>
    </footer>
  );
}
