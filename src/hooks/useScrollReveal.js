import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { prefersReducedMotion } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook: animate elements in when they scroll into view.
 * Usage: const ref = useScrollReveal(); then <div ref={ref}>
 * Options: { y, duration, delay, stagger, start, splitHeadings }
 */
export default function useScrollReveal(opts = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: resolve everything straight to its final state.
    // .gsap-reveal starts at opacity 0 in CSS, so this must still run.
    if (prefersReducedMotion()) {
      const targets = el.querySelectorAll(".gsap-reveal");
      gsap.set(targets.length > 0 ? targets : el, { opacity: 1, y: 0 });
      return;
    }

    const {
      y = 40,
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      start = "top 85%",
      splitHeadings = true,
    } = opts;

    const splits = [];
    const tweens = [];

    // SplitType reveal for section headings
    if (splitHeadings) {
      const headings = el.querySelectorAll(".section-header h2");
      headings.forEach((h) => {
        const split = new SplitType(h, { types: "chars" });
        splits.push(split);
        // Preserve gradient text on split chars
        const hStyle = window.getComputedStyle(h);
        if (hStyle.webkitTextFillColor === "rgba(0, 0, 0, 0)" || hStyle.backgroundClip === "text") {
          split.chars.forEach((ch) => {
            ch.style.background = hStyle.backgroundImage;
            ch.style.webkitBackgroundClip = "text";
            ch.style.backgroundClip = "text";
            ch.style.webkitTextFillColor = "transparent";
          });
        }
        gsap.set(split.chars, { opacity: 0, y: 30, rotateX: -60 });
        const tw = gsap.to(split.chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.03,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: h,
            start,
            toggleActions: "play none none none",
          },
        });
        tweens.push(tw);
      });
    }

    // If the element has children with .gsap-reveal, animate those
    const targets = el.querySelectorAll(".gsap-reveal");
    const toAnimate = targets.length > 0 ? targets : el;

    gsap.set(toAnimate, { opacity: 0, y });

    const tween = gsap.to(toAnimate, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tweens.forEach((tw) => { tw.kill(); if (tw.scrollTrigger) tw.scrollTrigger.kill(); });
      splits.forEach((s) => s.revert());
    };
  }, []);

  return ref;
}
