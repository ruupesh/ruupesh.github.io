import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerLenis } from "../utils/scrollLock";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis Smooth Scroll wrapper — syncs with GSAP ScrollTrigger
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      prevent: (node) =>
        node.closest &&
        (node.closest(".chatbot-window") !== null ||
          node.closest("[data-lenis-prevent]") !== null),
    });

    lenisRef.current = lenis;
    registerLenis(lenis);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Keep a reference to the exact callback — removing `lenis.raf`
    // instead would leave this ticker running against a destroyed instance.
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      registerLenis(null);
    };
  }, []);

  return <>{children}</>;
}
