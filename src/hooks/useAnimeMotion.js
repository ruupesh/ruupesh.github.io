import { useEffect } from "react";

/** Load the detail engine only when motion is allowed. Each mount owns its scope. */
export default function useAnimeMotion(setup, ref) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let loading = false;
    let cleanup;
    const initialize = async () => {
      if (disposed || loading || cleanup || preference.matches) return;
      loading = true;
      try {
        const module = await import("../animation/animeMotion");
        if (!disposed) cleanup = module[setup](ref?.current);
      } catch {
        // The page and its controls remain complete without decorative motion.
      } finally {
        loading = false;
      }
    };
    preference.addEventListener("change", initialize);
    initialize();
    return () => {
      disposed = true;
      preference.removeEventListener("change", initialize);
      cleanup?.();
    };
  }, [setup, ref]);
}
