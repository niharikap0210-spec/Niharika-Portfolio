import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useEffect } from "react";
import { ScrollTrigger } from "./lib/gsap";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import About from "./pages/About";
import CaseStudy from "./pages/CaseStudy";
import ArkoCase from "./pages/ArkoCase";
import VeriflowCase from "./pages/VeriflowCase";
import ShelfieCase from "./pages/ShelfieCase";
import LocalLiftCase from "./pages/LocalLiftCase";
import Resume from "./pages/Resume";
import ThesisCase from "./pages/ThesisCase";
import RendersCase from "./pages/RendersCase";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // mode="wait": the outgoing page fully unmounts before the incoming one mounts,
    // so ScrollTrigger reveals always measure against the correct single-page layout.
    // onExitComplete + double-rAF: refresh all triggers once the new page has
    // committed + painted (keeps the persistent Footer's trigger correct too).
    <AnimatePresence
      mode="wait"
      onExitComplete={() =>
        requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
      }
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/arko" element={<ArkoCase />} />
        <Route path="/work/veriflow" element={<VeriflowCase />} />
        <Route path="/work/shelfie" element={<ShelfieCase />} />
        <Route path="/work/locallift" element={<LocalLiftCase />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/architecture/thesis" element={<ThesisCase />} />
        <Route path="/architecture/renders" element={<RendersCase />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppShell() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main className="min-h-screen" id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  );
}

/* Sets --vh CSS variable to actual viewport height — fixes 100vh on iOS Safari.
   rAF-throttled so the mobile address-bar resize stream writes at most once/frame. */
function useViewportHeight() {
  useEffect(() => {
    let raf = 0;
    const write = () =>
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; write(); });
    };
    write();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/* Adds .keyboard-nav to body on Tab key — removes on mousedown/touchstart
   This makes focus outlines appear ONLY for keyboard users, not mouse clicks.
   More reliable than :focus-visible alone, especially on Windows Chrome. */
function useKeyboardNav() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") document.body.classList.add("keyboard-nav");
    };
    const onPointer = () => document.body.classList.remove("keyboard-nav");
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("touchstart", onPointer);
    };
  }, []);
}

export default function App() {
  useViewportHeight();
  useKeyboardNav();

  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AppShell />
      </MotionConfig>
    </BrowserRouter>
  );
}
