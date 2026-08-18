/* Shared route-level fade — one source of truth so every page transitions with
   identical timing/easing. Ease-out (fast start, gentle settle) reads snappier
   than an ease-in-out for an element appearing. */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: [0.25, 1, 0.4, 1] as [number, number, number, number] },
};
