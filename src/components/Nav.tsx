import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { List, X, LinkedinLogo } from "@phosphor-icons/react";

/* ─── Types ──────────────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  external: boolean;
  icon?: React.ElementType;
}

/* ─── Nav items (in user-specified order) ────────────────────────── */
const navItems: NavItem[] = [
  { label: "Home",     href: "/",      external: false },
  { label: "Work",     href: "/",      external: false },
  { label: "About",    href: "/about", external: false },
  { label: "Resume",   href: "https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/niharika-pundlik", external: true, icon: LinkedinLogo },
];

/* ─── Shared mono style ──────────────────────────────────────────── */
const mono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  letterSpacing: "0.12em",
  fontSize: 11,
  textTransform: "uppercase",
};

/* ─── Scroll thresholds ──────────────────────────────────────────── */
const COLLAPSE_AT   = 150;  // collapse after scrolling past this many px
const EXPAND_AFTER  = 80;   // re-expand after scrolling back up by this much

/* ─── Framer Motion variants ─────────────────────────────────────── */
const pillVariants = {
  expanded: {
    width: "auto",
    transition: {
      type: "spring" as const,
      damping: 22,
      stiffness: 280,
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
  collapsed: {
    width: "2.75rem",
    transition: {
      type: "spring" as const,
      damping: 22,
      stiffness: 280,
      when: "afterChildren" as const,
      staggerChildren: 0.04,
      staggerDirection: -1 as const,
    },
  },
};

const brandVar = {
  expanded: { opacity: 1, x: 0,   transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -18, transition: { duration: 0.13 } },
};

const itemVar = {
  expanded: { opacity: 1, x: 0,   transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -10, transition: { duration: 0.13 } },
};

const menuIconVar = {
  expanded: { opacity: 0, scale: 0.5, transition: { duration: 0.12 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, damping: 14, stiffness: 280, delay: 0.1 },
  },
};

/* ─── Component ──────────────────────────────────────────────────── */
export default function Nav() {
  const { pathname } = useLocation();
  const [isExpanded, setExpanded] = useState(true);
  const [menuOpen,   setMenuOpen] = useState(false);

  /* ── Scroll-based collapse/expand (desktop pill only) ── */
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const collapseY   = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (isExpanded && latest > prev && latest > COLLAPSE_AT) {
      setExpanded(false);
      collapseY.current = latest;
    } else if (!isExpanded && latest < prev && (collapseY.current - latest) > EXPAND_AFTER) {
      setExpanded(true);
    }
    lastScrollY.current = latest;
  });

  /* ── Close mobile menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* ── Prevent body scroll while mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Active check helper
       "Home" never shows the active underline — "Work" owns "/" ── */
  const isActive = (item: NavItem) =>
    !item.external && item.label !== "Home" && pathname === item.href;

  /* ──────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Desktop: floating pill nav ─────────────────────────────── */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
        {/* Entrance animation wrapper */}
        <motion.div
          initial={{ y: -52, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Collapse / expand pill */}
          <motion.nav
            role="navigation"
            aria-label="Main navigation"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={pillVariants}
            whileHover={!isExpanded ? { scale: 1.06 } : {}}
            whileTap={!isExpanded ? { scale: 0.97 } : {}}
            onClick={!isExpanded ? () => setExpanded(true) : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              height: 44,
              borderRadius: 9999,
              border: "1px solid var(--border)",
              backgroundColor: "rgba(250,250,250,0.9)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
              cursor: isExpanded ? "default" : "pointer",
              overflow: "hidden",
              position: "relative",
              whiteSpace: "nowrap",
            }}
          >
            {/* ── NP brand mark (left) ── */}
            <motion.div
              variants={brandVar}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                paddingLeft: 16,
                paddingRight: 12,
              }}
            >
              <Link
                to="/"
                onClick={(e) => e.stopPropagation()}
                aria-label="Niharika Pundlik — home"
                style={{
                  ...mono,
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 12,
                }}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                NP
              </Link>
              {/* Divider */}
              <span
                aria-hidden
                style={{
                  width: 1,
                  height: 16,
                  backgroundColor: "var(--border)",
                  marginLeft: 12,
                  flexShrink: 0,
                }}
              />
            </motion.div>

            {/* ── Nav links ── */}
            <motion.ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                paddingRight: 10,
                listStyle: "none",
                margin: 0,
                padding: "0 10px 0 0",
                pointerEvents: isExpanded ? "auto" : "none",
              }}
            >
              {navItems.map((item) => {
                const active = isActive(item);
                const IconComp = item.icon;

                return (
                  <motion.li key={item.label} variants={itemVar}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          ...mono,
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          padding: "4px 10px",
                          borderRadius: 4,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          transitionProperty: "color",
                          transitionDuration: "150ms",
                          transitionTimingFunction: "ease-out",
                        }}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                      >
                        {item.label}
                        {IconComp && <IconComp size={13} weight="regular" />}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          ...mono,
                          color: active ? "var(--text-primary)" : "var(--text-secondary)",
                          textDecoration: "none",
                          padding: "4px 10px",
                          borderRadius: 4,
                          display: "inline-flex",
                          alignItems: "center",
                          position: "relative",
                          transitionProperty: "color",
                          transitionDuration: "150ms",
                          transitionTimingFunction: "ease-out",
                        }}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                        onMouseEnter={(e) => {
                          if (!active) e.currentTarget.style.color = "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          if (!active) e.currentTarget.style.color = "var(--text-secondary)";
                        }}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill-indicator"
                            style={{
                              position: "absolute",
                              bottom: 2,
                              left: 10,
                              right: 10,
                              height: 1,
                              backgroundColor: "var(--accent)",
                            }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* ── Collapsed state: menu icon (absolutely centred) ── */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <motion.div
                variants={menuIconVar}
                animate={isExpanded ? "expanded" : "collapsed"}
              >
                <List size={20} weight="regular" color="var(--text-primary)" />
              </motion.div>
            </div>
          </motion.nav>
        </motion.div>
      </div>

      {/* ── Mobile: full-width header ─────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(250,250,250,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
        }}
      >
        <div className="flex items-center justify-between px-6 h-14">
          <Link
            to="/"
            style={{
              ...mono,
              color: "var(--text-primary)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 12,
            }}
            className="hover-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Niharika Pundlik — home"
          >
            NP
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ color: "var(--text-primary)" }}
            className="flex items-center justify-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {menuOpen
              ? <X size={20} weight="regular" />
              : <List size={20} weight="regular" />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile menu overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 blueprint-grid flex flex-col"
            style={{ paddingTop: 56 }}
            role="dialog"
            aria-modal
            aria-label="Navigation menu"
          >
            {/* Close */}
            <button
              className="absolute top-4 right-6 flex items-center justify-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{ color: "var(--text-primary)" }}
            >
              <X size={20} weight="regular" />
            </button>

            {/* Links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navItems.map((item, i) => {
                const active = isActive(item);
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (i + 1), duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: 36,
                          fontWeight: 700,
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          letterSpacing: "-0.02em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                        className="hover-underline"
                      >
                        {item.label}
                        {IconComp && <IconComp size={28} weight="regular" />}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: 36,
                          fontWeight: 700,
                          color: active ? "var(--text-primary)" : "var(--text-secondary)",
                          textDecoration: "none",
                          letterSpacing: "-0.02em",
                        }}
                        className="hover-underline"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-8 flex justify-center">
              <p style={{ ...mono, color: "var(--text-muted)", fontSize: 10, opacity: 0.6 }}>
                NIHARIKA PUNDLIK © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
