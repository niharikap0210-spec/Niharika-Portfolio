import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/", external: true },
];

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(249, 248, 247, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(229, 228, 224, 0.6)",
        boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font-sans font-medium text-sm text-ink-900 hover:text-violet transition-colors duration-200"
          style={{ letterSpacing: "-0.01em", transitionProperty: "color" }}
        >
          Niharika Pundlik
        </Link>

        <ul className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = !link.external && pathname === link.href;
            return (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-3 py-1.5 text-sm font-medium rounded-md text-ink-500 hover:text-ink-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 active:scale-95"
                    style={{ transitionProperty: "color, transform" }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 active:scale-95 ${
                      isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-900"
                    }`}
                    style={{ transitionProperty: "color, transform" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-md"
                        style={{ backgroundColor: "rgba(124, 58, 237, 0.08)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
