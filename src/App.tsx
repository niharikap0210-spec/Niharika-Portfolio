import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import CaseStudy from "./pages/CaseStudy";
import ArkoCase from "./pages/ArkoCase";
import VeriflowCase from "./pages/VeriflowCase";
import ShelfieCase from "./pages/ShelfieCase";
import Resume from "./pages/Resume";
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
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppShell() {
  return (
    <>
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

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("np-splash-seen", "1");
    setShowSplash(false);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <AppShell key="app" />
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
