import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing", external: true },
];

const monoStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  letterSpacing: "0.12em",
  fontSize: 11,
  textTransform: "uppercase",
};

export default function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled
            ? "rgba(250, 250, 250, 0.92)"
            : "rgba(250, 250, 250, 0.75)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid",
          borderColor: scrolled ? "var(--border)" : "transparent",
          boxShadow: scrolled
            ? "0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.03)"
            : "none",
          transitionProperty: "background-color, border-color, box-shadow",
          transitionDuration: "250ms",
          transitionTimingFunction: "ease-out",
        }}
      >
        <nav
          className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo / Name */}
          <Link
            to="/"
            style={{ ...monoStyle, color: "var(--text-primary)", textDecoration: "none" }}
            className="hover-underline focus-visible:outline-none focus-visible:ring-2 rounded"
            aria-label="Niharika Pundlik — home"
          >
            Niharika Pundlik
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center" style={{ gap: 4 }}>
            {navLinks.map((link) => {
              const isActive = !link.external && pathname === link.href;
              const linkEl = link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...monoStyle,
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: 4,
                    display: "block",
                    transitionProperty: "color",
                    transitionDuration: "150ms",
                  }}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded hover:text-text-primary"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    ...monoStyle,
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: 4,
                    display: "block",
                    position: "relative",
                    transitionProperty: "color",
                    transitionDuration: "150ms",
                  }}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: 2,
                        left: 12,
                        right: 12,
                        height: 1,
                        backgroundColor: "var(--accent)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
              return <li key={link.href}>{linkEl}</li>;
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ color: "var(--text-primary)" }}
          >
            {menuOpen ? (
              /* X close icon */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              /* Hamburger */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 blueprint-grid flex flex-col"
            style={{ paddingTop: 56 }}
            role="dialog"
            aria-modal
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-6 flex items-center justify-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{ color: "var(--text-primary)" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => {
                const isActive = !link.external && pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (i + 1), duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: 36,
                          fontWeight: 700,
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          letterSpacing: "-0.02em",
                        }}
                        className="hover-underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: 36,
                          fontWeight: 700,
                          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                          textDecoration: "none",
                          letterSpacing: "-0.02em",
                        }}
                        className="hover-underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer of overlay */}
            <div className="p-8 flex justify-center">
              <p style={{ ...monoStyle, color: "var(--text-muted)", fontSize: 10, opacity: 0.6 }}>
                NIHARIKA PUNDLIK © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
