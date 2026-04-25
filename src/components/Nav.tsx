import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { List, X, CaretDown } from "@phosphor-icons/react";

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
  { label: "Resume",   href: "https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/niharika-pundlik", external: true },
];

/* Work sub-items */
const workSubItems = [
  { label: "Product Design", href: "/#projects",    desc: "Case studies" },
  { label: "Architecture",   href: "/architecture", desc: "Buildings & space" },
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
  expanded: { opacity: 1, x: 0,   transition: { type: "spring" as const, damping: 24, stiffness: 220 } },
  collapsed: { opacity: 0, x: -20, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

const itemVar = {
  expanded: { opacity: 1, x: 0,   transition: { type: "spring" as const, damping: 24, stiffness: 220 } },
  collapsed: { opacity: 0, x: -10, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

const menuIconVar = {
  expanded: { opacity: 0, scale: 0.5, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } },
  collapsed: {
    opacity: 1, scale: 1,
    transition: { type: "spring" as const, damping: 26, stiffness: 200, delay: 0.1 },
  },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.18, ease: [0.25, 1, 0.4, 1] },
  },
  exit: {
    opacity: 0, y: -6, scale: 0.97,
    transition: { duration: 0.14, ease: [0.4, 0, 1, 1] },
  },
};

/* ─── Work dropdown portal ───────────────────────────────────────── */
function WorkDropdown({
  pos,
  onEnter,
  onLeave,
  onSelect,
  activeHref,
}: {
  pos: { x: number; y: number };
  onEnter: () => void;
  onLeave: () => void;
  onSelect: () => void;
  activeHref: string;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return createPortal(
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        transform: "translateX(-50%)",
        zIndex: 9999,
        backgroundColor: "rgba(250,250,250,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid #E5E5E5",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)",
        padding: 6,
        minWidth: 172,
      }}
    >
      {workSubItems.map((sub) => {
        const isActive = activeHref === sub.href;
        const isHov = hoveredItem === sub.label;
        return (
          <Link
            key={sub.label}
            to={sub.href}
            onClick={onSelect}
            onMouseEnter={() => setHoveredItem(sub.label)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "9px 14px",
              borderRadius: 8,
              textDecoration: "none",
              backgroundColor: isHov ? "rgba(181,146,76,0.06)" : "transparent",
              transitionProperty: "background-color",
              transitionDuration: "150ms",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? C_ACTIVE : isHov ? C_HOVER : C_DEFAULT,
                letterSpacing: "0.01em",
                transitionProperty: "color",
                transitionDuration: "150ms",
              }}
            >
              {sub.label}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: isHov ? "rgba(181,146,76,0.7)" : "#9A9A9A",
                transitionProperty: "color",
                transitionDuration: "150ms",
              }}
            >
              {sub.desc}
            </span>
          </Link>
        );
      })}
    </motion.div>,
    document.body
  );
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function Nav() {
  const { pathname, hash } = useLocation();
  const [isExpanded, setExpanded] = useState(true);
  const [menuOpen,   setMenuOpen] = useState(false);
  const [hovered,    setHovered]  = useState<string | null>(null);
  const [workOpen,   setWorkOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
  const workRef      = useRef<HTMLLIElement>(null);
  const leaveTimer   = useRef<ReturnType<typeof setTimeout>>();

  /* ── Scroll collapse / expand ── */
  const { scrollY } = useScroll();
  const lastY    = useRef(0);
  const collapseY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastY.current;
    if (isExpanded && latest > prev && latest > COLLAPSE_AT) {
      setExpanded(false);
      collapseY.current = latest;
    } else if (!isExpanded && latest < prev && (collapseY.current - latest) > EXPAND_AFTER) {
      setExpanded(true);
    }
    lastY.current = latest;
  });

  useEffect(() => { setMenuOpen(false); setMobileWorkOpen(false); }, [pathname, hash]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Work dropdown handlers ── */
  const handleWorkEnter = () => {
    if (workRef.current) {
      const rect = workRef.current.getBoundingClientRect();
      setDropdownPos({ x: rect.left + rect.width / 2, y: rect.bottom + 10 });
    }
    clearTimeout(leaveTimer.current);
    setWorkOpen(true);
  };

  const handleWorkLeave = () => {
    leaveTimer.current = setTimeout(() => setWorkOpen(false), 130);
  };

  /* ── Helpers ── */
  const isActive = (item: NavItem) => {
    if (item.external) return false;
    if (item.label === "Home") return false;
    if (item.label === "Work") {
      return (
        pathname.startsWith("/work/") ||
        pathname === "/architecture" ||
        (pathname === "/" && hash === "#projects")
      );
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

  const activeHref = pathname === "/" && hash === "#projects"
    ? "/#projects"
    : pathname === "/architecture"
    ? "/architecture"
    : "";

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
                const active  = isActive(item);
                const color   = linkColor(item);
                const weight  = linkWeight(item);
                const IconComp = item.icon;
                const isWork  = item.label === "Work";

                return (
                  <motion.li
                    key={item.label}
                    variants={itemVar}
                    ref={isWork ? workRef : undefined}
                    style={{ position: "relative" }}
                    onMouseEnter={isWork ? handleWorkEnter : () => setHovered(item.label)}
                    onMouseLeave={isWork ? handleWorkLeave : () => setHovered(null)}
                  >
                    {isWork ? (
                      /* Work: button that opens dropdown */
                      <button
                        onClick={(e) => { e.stopPropagation(); handleWorkEnter(); }}
                        aria-haspopup="true"
                        aria-expanded={workOpen}
                        style={{
                          ...linkBase,
                          color,
                          fontWeight: weight,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          gap: 4,
                        }}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        {item.label}
                        <motion.span
                          animate={{ rotate: workOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: [0.25, 1, 0.4, 1] }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <CaretDown size={10} weight="bold" color={color} />
                        </motion.span>
                      </button>
                    ) : item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => setHovered(item.label)}
                        onMouseLeave={() => setHovered(null)}
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
                        onMouseEnter={() => setHovered(item.label)}
                        onMouseLeave={() => setHovered(null)}
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

      {/* ── Work dropdown portal ──────────────────────────────────── */}
      <AnimatePresence>
        {workOpen && (
          <WorkDropdown
            key="work-dropdown"
            pos={dropdownPos}
            onEnter={() => { clearTimeout(leaveTimer.current); setWorkOpen(true); }}
            onLeave={handleWorkLeave}
            onSelect={() => setWorkOpen(false)}
            activeHref={activeHref}
          />
        )}
      </AnimatePresence>

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
                const active  = isActive(item);
                const IconComp = item.icon;
                const isWork  = item.label === "Work";

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (i + 1), duration: 0.5, ease: [0.25, 1, 0.4, 1] }}
                  >
                    {isWork ? (
                      /* Work: expandable with sub-items */
                      <div className="flex flex-col items-center gap-4">
                        <button
                          onClick={() => setMobileWorkOpen((o) => !o)}
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 36,
                            fontWeight: 700,
                            color: active ? C_ACTIVE : C_DEFAULT,
                            textDecoration: "none",
                            letterSpacing: "-0.02em",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          Work
                          <motion.span
                            animate={{ rotate: mobileWorkOpen ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 1, 0.4, 1] }}
                            style={{ display: "flex", alignItems: "center", marginTop: 4 }}
                          >
                            <CaretDown size={22} weight="bold" color={active ? C_ACTIVE : C_DEFAULT} />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {mobileWorkOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.28, ease: [0.25, 1, 0.4, 1] }}
                              style={{ overflow: "hidden" }}
                              className="flex flex-col items-center gap-3"
                            >
                              {workSubItems.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.href}
                                  style={{
                                    fontFamily: "'Inter', system-ui, sans-serif",
                                    fontSize: 18,
                                    fontWeight: 400,
                                    color: pathname === sub.href || (sub.href === "/#projects" && pathname === "/" && hash === "#projects") ? C_ACTIVE : C_DEFAULT,
                                    textDecoration: "none",
                                    letterSpacing: "0.01em",
                                    transitionProperty: "color",
                                    transitionDuration: "150ms",
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.color = C_HOVER)}
                                  onMouseLeave={(e) => (e.currentTarget.style.color = C_DEFAULT)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : item.external ? (
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
