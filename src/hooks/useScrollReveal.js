import { useEffect, useRef } from "react";

/** One-time reveals with no animation loop or hidden-content dependency. */
export default function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [...root.querySelectorAll(".gsap-reveal")];
    let observer;
    const revealAll = () => {
      observer?.disconnect();
      targets.forEach((target) => target.classList.remove("reveal-pending"));
    };
    if (!media.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.remove("reveal-pending");
          observer.unobserve(target);
        });
      }, { threshold: 0.06, rootMargin: "0px 0px -28px 0px" });
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top > window.innerHeight * 0.92) {
          target.classList.add("reveal-pending");
          observer.observe(target);
        }
      });
    }
    media.addEventListener("change", revealAll);
    return () => { revealAll(); media.removeEventListener("change", revealAll); };
  }, []);
  return ref;
}
