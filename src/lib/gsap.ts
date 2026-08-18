/* Central GSAP setup — registers plugins once and applies global ScrollTrigger
   config before any trigger is created. Imported for its side effect in main.tsx
   so it runs ahead of every component mount. */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ignoreMobileResize: don't recompute every trigger when the mobile address bar
// shows/hides (that viewport-height change otherwise makes scroll reveals jump
// mid-scroll). Load/resize auto-refresh stays on for real layout changes.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
