import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const firstRef = useRef(true);

  useEffect(() => {
    // We own scroll position — stop the browser restoring it on reload (avoids a flash
    // of restored scroll before our reset).
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const isFirst = firstRef.current;
    firstRef.current = false;

    if (hash) {
      const id = hash.slice(1);
      let cancelled = false;
      let attempts = 0;

      const tryScroll = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (attempts++ < 60) {
          requestAnimationFrame(tryScroll);
        }
      };

      requestAnimationFrame(tryScroll);
      return () => {
        cancelled = true;
      };
    }

    // First load: reset to top now. Subsequent route changes are reset by App's
    // onExitComplete (after the outgoing page unmounts), so nothing snaps mid-transition.
    if (isFirst) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, key]);

  return null;
}
