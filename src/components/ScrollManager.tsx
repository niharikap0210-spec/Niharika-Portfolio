import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "../lib/gsap";

/* Owns scroll behaviour for every client-side navigation:
   - #hash routes (e.g. Work -> /#projects) land on the target section once it mounts
   - plain routes reset to the top
   - ScrollTrigger.refresh() runs AFTER the new page has painted, so GSAP scroll
     reveals measure against the correct layout (fixes content staying hidden until a
     manual reload).

   A freshly-mounted page keeps shifting its layout for a moment (route fade, WebGL
   canvases, images), which silently cancels a smooth scroll issued right away. So we
   scroll INSTANTLY and re-pin a few times while it settles — reliable, and reads as
   the section simply appearing. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    let cancelled = false;
    const timers: number[] = [];

    if (hash) {
      const id = hash.slice(1);
      let attempts = 0;

      const scrollNow = () => {
        const el = document.getElementById(id);
        if (!el || cancelled) return;
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        const top = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - margin));
        window.scrollTo({ top, left: 0, behavior: "instant" as ScrollBehavior });
      };

      const waitForEl = () => {
        if (cancelled) return;
        if (document.getElementById(id)) {
          scrollNow();
          [90, 220, 380, 600].forEach((d) => timers.push(window.setTimeout(scrollNow, d)));
          timers.push(window.setTimeout(() => { if (!cancelled) ScrollTrigger.refresh(); }, 680));
          return;
        }
        if (attempts++ < 120) requestAnimationFrame(waitForEl);
      };

      requestAnimationFrame(waitForEl);
      return () => { cancelled = true; timers.forEach(clearTimeout); };
    }

    // Plain route change: reset to the top instantly, then refresh triggers after paint.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => { if (!cancelled) ScrollTrigger.refresh(); })
    );
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [pathname, hash, key]);

  return null;
}
