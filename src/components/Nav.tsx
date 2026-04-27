import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { List, X } from "@phosphor-icons/react";

/* ─── Types ──────────────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  external: boolean;
  icon?: React.ElementType;
}

/* ─── Nav items ─────────────────────────────────────────────────── */
const navItems: NavItem[] = [
  { label: "Home",     href: "/",              external: false },
  { label: "Work",     href: "/#projects",     external: false },
  { label: "About",    href: "/about",         external: false },
  { label: "Resume",   href: "https://drive.google.com/file/d/1gzV1UkzDv2-DndTFPsqzfXLW4CPCtlwP/view?usp=sharing", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/niharika-pundlik", external: true },
];

/* ─── Color tokens ───────────────────────────────────────────────── */
const C_DEFAULT = "#6B6B6B";
const C_ACTIVE  = "#1A1A1A";
const C_HOVER   = "#B5924C";

/* ─── Scroll thresholds ─────────────────────────────────────────── */
const COLLAPSE_AT  = 150;
const EXPAND_AFTER = 80;

/* ─── Framer Motion variants ─────────────────────────────────────── */
const pillVariants = {
  expanded: {
    width: "auto",
    transition: {
      type: "spring" as const, damping: 30, stiffness: 220,
      staggerChildren: 0.055, delayChildren: 0.08,
    },
  },
  collapsed: {
    width: "2.75rem",
    transition: {
      type: "spring" as const, damping: 30, stiffness: 220,
      when: "afterChildren" as const, staggerChildren: 0.04, staggerDirection: -1 as const,
    },
  },
};

const brandVar = {
  expanded:  { opacity: 1, transition: { duration: 0.2,  ease: [0.25, 1, 0.4, 1] } },
  collapsed: { opacity: 0, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } },
};

const itemVar = {
  expanded:  { opacity: 1, transition: { duration: 0.2,  ease: [0.25, 1, 0.4, 1] } },
  collapsed: { opacity: 0, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } },
};

const menuIconVar = {
  expanded: { opacity: 0, scale: 0.5, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } },
  collapsed: {
    opacity: 1, scale: 1,
    transition: { type: "spring" as const, damping: 26, stiffness: 200, delay: 0.1 },
  },
};

/* ─── Component ──────────────────────────────────────────────────── */
export default function Nav() {
  const { pathname, hash } = useLocation();
  const [isExpanded, setExpanded] = useState(true);
  const [menuOpen,   setMenuOpen] = useState(false);
  const [hovered,    setHovered]  = useState<string | null>(null);

  /* ── Scroll collapse / expand ── */
  const { scrollY } = useScroll();
  const lastY      = useRef(0);
  const collapseY  = useRef(0);
  const lastToggle = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastY.current;
    const now  = Date.now();
    if (now - lastToggle.current < 700) { lastY.current = latest; return; }
    if (isExpanded && latest > prev && latest > COLLAPSE_AT) {
      setExpanded(false);
      collapseY.current = latest;
      lastToggle.current = now;
    } else if (!isExpanded && latest < prev && (collapseY.current - latest) > EXPAND_AFTER) {
      setExpanded(true);
      lastToggle.current = now;
    }
    lastY.current = latest;
  });

  useEffect(() => { setMenuOpen(false); }, [pathname, hash]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Helpers ── */
  const isActive = (item: NavItem) => {
    if (item.external) return false;
    if (item.label === "Home") return false;
    if (item.label === "Work") {
      return pathname.startsWith("/work/") || (pathname === "/" && hash === "#projects");
    }
    return pathname === item.href;
  };

  const linkColor = (item: NavItem) => {
    if (isActive(item))          return C_ACTIVE;
    if (hovered === item.label)  return C_HOVER;
    return C_DEFAULT;
  };

  const linkWeight = (item: NavItem) => isActive(item) ? 500 : 400;

  /* ── Shared link style ── */
  const linkBase: React.CSSProperties = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: 14,
    letterSpacing: "0.01em",
    textDecoration: "none",
    padding: "4px 12px",
    borderRadius: 4,
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0.25, 1, 0.4, 1)",
  };

  /* ───────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Desktop: floating pill ─────────────────────────────────── */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: -52, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.25, 1, 0.4, 1] }}
        >
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
              height: 48,
              borderRadius: 9999,
              border: "1px solid #E5E5E5",
              backgroundColor: "rgba(250,250,250,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.07)",
              cursor: isExpanded ? "default" : "pointer",
              overflow: "hidden",
              position: "relative",
              whiteSpace: "nowrap",
            }}
          >
            {/* ── Brand mark ── */}
            <motion.div
              variants={brandVar}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                paddingLeft: 20,
                paddingRight: 14,
              }}
            >
              <Link
                to="/"
                onClick={(e) => e.stopPropagation()}
                aria-label="Niharika Pundlik - home"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                  color: C_ACTIVE,
                  textDecoration: "none",
                }}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                NP
              </Link>
              <span
                aria-hidden
                style={{
                  width: 1,
                  height: 18,
                  backgroundColor: "#E5E5E5",
                  marginLeft: 14,
                  flexShrink: 0,
                }}
              />
            </motion.div>

            {/* ── Nav links ── */}
            <motion.ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                padding: "0 12px 0 0",
                margin: 0,
                listStyle: "none",
                pointerEvents: isExpanded ? "auto" : "none",
              }}
            >
              {navItems.map((item) => {
                const color    = linkColor(item);
                const weight   = linkWeight(item);
                const IconComp = item.icon;

                return (
                  <motion.li
                    key={item.label}
                    variants={itemVar}
                    style={{ position: "relative" }}
                    onMouseEnter={() => setHovered(item.label)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ ...linkBase, color, fontWeight: weight }}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        {item.label}
                        {IconComp && <IconComp size={13} weight="regular" />}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={(e) => e.stopPropagation()}
                        style={{ ...linkBase, color, fontWeight: weight }}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* ── Collapsed menu icon ── */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <motion.div
                variants={menuIconVar}
                animate={isExpanded ? "expanded" : "collapsed"}
              >
                <List size={20} weight="regular" color={C_ACTIVE} />
              </motion.div>
            </div>
          </motion.nav>
        </motion.div>
      </div>

      {/* ── Mobile: full-width header ─────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.4, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(250,250,250,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid #E5E5E5",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between px-6 h-14">
          <Link
            to="/"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.01em",
              color: C_ACTIVE,
              textDecoration: "none",
            }}
            aria-label="Niharika Pundlik - home"
          >
            NP
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ color: C_ACTIVE }}
            className="flex items-center justify-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {menuOpen ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
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
            transition={{ duration: 0.38, ease: [0.25, 1, 0.4, 1] }}
            className="md:hidden fixed inset-0 z-40 blueprint-grid flex flex-col"
            style={{ paddingTop: 56 }}
            role="dialog"
            aria-modal
            aria-label="Navigation menu"
          >
            <button
              className="absolute top-4 right-6 flex items-center justify-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{ color: C_ACTIVE }}
            >
              <X size={20} weight="regular" />
            </button>

            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navItems.map((item, i) => {
                const active   = isActive(item);
                const IconComp = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (i + 1), duration: 0.5, ease: [0.25, 1, 0.4, 1] }}
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
                          color: C_DEFAULT,
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
                          color: active ? C_ACTIVE : C_DEFAULT,
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

            <div className="p-8 flex justify-center">
              <p style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.12em",
                fontSize: 10,
                textTransform: "uppercase",
                color: "#9A9A9A",
                opacity: 0.6,
              }}>
                NIHARIKA PUNDLIK © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
