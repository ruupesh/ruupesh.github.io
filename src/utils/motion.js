/* ═══════════════════════════════════════════════════════════════
   MOTION PREFERENCES
   Single source of truth for prefers-reduced-motion so every
   animation in the app answers to the same query.
   ═══════════════════════════════════════════════════════════════ */

const QUERY = "(prefers-reduced-motion: reduce)";

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Subscribes to changes in the motion preference.
 * Returns an unsubscribe function.
 */
export function onMotionPreferenceChange(handler) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(QUERY);
  const listener = (e) => handler(e.matches);
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}
