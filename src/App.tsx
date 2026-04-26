import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
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
    <AnimatePresence mode="wait">
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

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(
    () => !sessionStorage.getItem("np-splash-seen")
  );
  const [splashDone, setSplashDone] = useState<boolean>(
    () => !!sessionStorage.getItem("np-splash-seen")
  );

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("np-splash-seen", "1");
    setShowSplash(false);
    setSplashDone(true);
  }, []);

  return (
    <BrowserRouter>
      {/* App renders underneath — invisible until splash exits */}
      <motion.div
        initial={{ opacity: splashDone ? 1 : 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.4, 1] }}
      >
        <AppShell />
      </motion.div>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
