import { useEffect } from "react";

/** Native scrolling with scoped, reversible choreography. */
export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pageHeight = root.scrollHeight - window.innerHeight;
    let heroHeight = window.innerHeight;
    let disposed = false;
    let animationContext;
    let loading = false;
    let refreshAnimations;
    let animationEngine;
    let scrollPlugin;
    let pluginDisabled = false;
    const desktop = window.matchMedia("(min-width: 761px) and (min-height: 651px)");
    const canAnimate = () => !media.matches && root.dataset.motion !== "paused" && desktop.matches;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--page-progress", String(Math.min(1, window.scrollY / Math.max(1, pageHeight))));
      root.style.setProperty("--hero-scroll", canAnimate() ? String(Math.min(1, window.scrollY / heroHeight)) : "0");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const measure = () => {
      pageHeight = root.scrollHeight - window.innerHeight;
      heroHeight = document.getElementById("hero")?.offsetHeight || window.innerHeight;
      schedule();
      refreshAnimations?.();
    };

    const choreograph = async () => {
      if (disposed || loading || animationContext || !canAnimate()) return;
      loading = true;
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"), import("gsap/ScrollTrigger"),
        ]);
        if (disposed || !canAnimate()) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.config({ autoSleep: 30 });
        animationEngine = gsap;
        scrollPlugin = ScrollTrigger;
        if (pluginDisabled) { ScrollTrigger.enable(); pluginDisabled = false; }
        animationContext = gsap.matchMedia();
        animationContext.add("(min-width: 761px) and (min-height: 651px)", () => {
          const exit = { trigger: "#hero", start: "top top", end: "bottom top", scrub: .6 };
          gsap.fromTo(".hero-polaroid", { rotation: -3 }, { rotation: 1, y: -18, ease: "none", scrollTrigger: exit });

          const cards = gsap.utils.toArray(".project-feature");
          cards.slice(0, -1).forEach((card, index) => {
            gsap.to(card, {
              scale: .958, rotation: index % 2 ? .8 : -.8,
              transformOrigin: "50% 0%", ease: "none",
              scrollTrigger: { trigger: cards[index + 1], start: "top 82%", end: "top 22%", scrub: .45 },
            });
          });

        });
        refreshAnimations = () => ScrollTrigger.refresh(true);
        document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
      } catch {
        // All content and native sticky cards remain usable if motion cannot load.
      } finally {
        loading = false;
      }
    };
    const motionChange = () => {
      animationContext?.revert();
      animationContext = null;
      refreshAnimations = null;
      if (!canAnimate()) {
        scrollPlugin?.disable();
        pluginDisabled = true;
        animationEngine?.ticker.sleep();
      }
      schedule();
      choreograph();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    const motionObserver = new MutationObserver(motionChange);
    motionObserver.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    media.addEventListener("change", motionChange);
    desktop.addEventListener("change", motionChange);
    measure();
    choreograph();
    return () => {
      disposed = true;
      observer.disconnect();
      motionObserver.disconnect();
      cancelAnimationFrame(frame);
      animationContext?.revert();
      scrollPlugin?.disable();
      animationEngine?.ticker.sleep();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", motionChange);
      desktop.removeEventListener("change", motionChange);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
