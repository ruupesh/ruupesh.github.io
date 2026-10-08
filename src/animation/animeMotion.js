import { animate, createAnimatable, createScope, createTimeline, spring, stagger, svg } from "animejs";

const MEDIA = {
  reduced: "(prefers-reduced-motion: reduce)",
  compact: "(max-width: 760px)",
  pointer: "(hover: hover) and (pointer: fine)",
};

/** Anime owns strokes, child elements and interaction variables, never GSAP's planes. */
export function mountPortfolioMotion() {
  const root = document.documentElement;
  const scope = createScope({ root: document.body, mediaQueries: MEDIA }).add(({ matches }) => {
    if (matches.reduced) return;
    root.dataset.detailMotion = "animejs";
    const distance = matches.compact ? 8 : 14;
    const cleanups = [];
    const strokes = new Map();
    const entrants = new Map();
    const strokeAttributes = ["pathLength", "draw", "stroke-dasharray", "stroke-dashoffset"];
    const listen = (element, type, callback, options) => {
      element.addEventListener(type, callback, options);
      cleanups.push(() => element.removeEventListener(type, callback, options));
    };
    const drawable = (elements) => {
      elements.forEach((element) => {
        if (!strokes.has(element)) strokes.set(element, {
          attributes: strokeAttributes.map((name) => [name, element.getAttribute(name)]),
          cap: element.style.strokeLinecap,
        });
      });
      return svg.createDrawable(elements, 0, 1);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting || document.hidden) return;
        entrants.get(target)?.();
        entrants.delete(target);
        observer.unobserve(target);
      });
    }, { threshold: .12, rootMargin: "0px 0px -5% 0px" });
    const enter = (element, callback) => {
      entrants.set(element, callback);
      observer.observe(element);
    };
    listen(document, "visibilitychange", () => {
      if (document.hidden) return;
      // Revisit entries that became visible while the tab was suspended.
      entrants.forEach((_, element) => { observer.unobserve(element); observer.observe(element); });
    });
    const sequence = (block, selector, options = {}) => {
      const targets = [...block.querySelectorAll(selector)];
      if (!targets.length) return;
      const animation = animate(targets, {
        y: [distance, 0], opacity: [.65, 1],
        delay: stagger(45), duration: 620, ease: "out(4)", autoplay: false,
        ...options,
      });
      enter(block, () => animation.play());
    };

    // These strokes are irregular pencil marks, including the portrait signature.
    document.querySelectorAll(".ink-trace").forEach((ink) => {
      const drawing = animate(drawable([...ink.querySelectorAll("path")]), {
        draw: ["0 0", "0 1"], delay: stagger(180),
        duration: ink.classList.contains("ink-trace-portrait") ? 1250 : 850,
        ease: "inOut(3)", autoplay: false,
      });
      enter(ink.parentElement, () => drawing.play());
    });

    document.querySelectorAll(".section-kicker .section-icon").forEach((icon) => {
      const animation = animate(icon, { rotate: [-18, 0], scale: [.8, 1], opacity: [.5, 1], duration: 720, ease: spring({ duration: 380, bounce: .18 }), autoplay: false });
      enter(icon, () => animation.play());
    });

    // The systems' existing diagrams draw their connections, then resolve the chart.
    document.querySelectorAll(".project-feature").forEach((feature) => {
      const lines = [...feature.querySelectorAll("path.diagram-path, .diagram-path path, .artifact-layer-middle > svg path, .artifact-layer-middle > svg circle")];
      const diagram = createTimeline({ autoplay: false });
      if (lines.length) diagram.add(drawable(lines), { draw: ["0 0", "0 1"], delay: stagger(65), duration: 1100, ease: "inOut(3)" }, 0);
      const bars = feature.querySelectorAll(".chart-bar");
      if (bars.length) diagram.add(bars, { scaleY: [.06, 1], delay: stagger(65), duration: 850, ease: "out(4)" }, 100);
      const legend = feature.querySelectorAll(".artifact-legend > span");
      diagram.add(legend, { y: [distance, 0], opacity: [.5, 1], delay: stagger(80), duration: 600, ease: "out(4)" }, 180);
      enter(feature.querySelector(".project-artwork"), () => diagram.play());
      if (matches.pointer) listen(feature, "pointerenter", () => diagram.restart());
      listen(feature, "focus", () => diagram.restart());
    });
    document.querySelectorAll(".project-tags").forEach((block) => sequence(block, ".tech-tag", { rotateX: [18, 0] }));
    document.querySelectorAll(".expertise-items").forEach((block) => sequence(block, "li", { x: [-distance, 0], y: 0, delay: stagger(38) }));
    document.querySelectorAll(".impact-item").forEach((block) => sequence(block, "h3, p, .impact-source"));
    document.querySelectorAll(".about-interests").forEach((block) => sequence(block, "span"));
    document.querySelectorAll(".academic-record").forEach((block) => sequence(block, ".academic-date, .academic-field, .academic-institution, .academic-honors"));
    document.querySelectorAll(".recognition-certificate").forEach((block) => sequence(block, ".recognition-number, h4, a, .recognition-complete"));
    document.querySelectorAll(".recognition-awards").forEach((block) => sequence(block, "li", { delay: stagger(90) }));
    document.querySelectorAll(".reading-entry").forEach((block) => sequence(block, ".reading-meta, .reading-content > p, .reading-link", { delay: stagger(80) }));

    // Native disclosure still opens immediately; its contents settle in afterwards.
    document.querySelectorAll(".career-entry").forEach((entry) => {
      const content = animate(entry.querySelectorAll(".career-context, .career-contributions h3, .career-contributions li"), {
        x: [-distance, 0], opacity: [.6, 1], delay: stagger(40),
        duration: 600, ease: "out(4)", autoplay: false,
      });
      listen(entry, "toggle", () => { if (entry.open) content.restart(); });
      enter(entry, () => { if (entry.open) content.play(); });
    });

    // One finite reflection crosses the photograph. It does not run while idle.
    const photograph = document.querySelector(".hero-polaroid");
    if (photograph) {
      const reflection = animate(photograph, { "--photo-sheen": [0, 1], duration: 1500, ease: "inOutSine", autoplay: false });
      enter(photograph, () => reflection.play());
      if (matches.pointer) listen(photograph, "pointerenter", () => reflection.restart());
    }

    // A small border response uses reusable animatables, rather than allocating on move.
    document.querySelectorAll(".project-feature, .project-card, .expertise-cell, .academic-record, .recognition-certificate, .reading-entry").forEach((surface) => {
      const material = createAnimatable(surface, { "--surface-focus": 280, ease: "out(3)" });
      const active = () => material["--surface-focus"](1);
      const resting = () => material["--surface-focus"](0);
      if (matches.pointer) {
        listen(surface, "pointerenter", active);
        listen(surface, "pointerleave", resting);
      }
      listen(surface, "focusin", active);
      listen(surface, "focusout", (event) => { if (!surface.contains(event.relatedTarget)) resting(); });
      listen(surface, "pointerdown", active, { passive: true });
      listen(surface, "pointerup", resting, { passive: true });
      listen(surface, "pointercancel", resting, { passive: true });
    });

    const settle = spring({ duration: 360, bounce: .22 });
    document.querySelectorAll(".connect-socials a").forEach((link, index) => {
      const icon = createAnimatable(link.querySelector("img"), { y: settle.settlingDuration, rotate: settle.settlingDuration, scale: settle.settlingDuration, ease: settle.ease });
      const lift = () => { icon.y(-5); icon.rotate(index % 2 ? 7 : -7); icon.scale(1.12); };
      const rest = () => { icon.y(0); icon.rotate(0); icon.scale(1); };
      if (matches.pointer) {
        listen(link, "pointerenter", lift);
        listen(link, "pointerleave", rest);
      }
      listen(link, "focus", lift);
      listen(link, "blur", rest);
      listen(link, "pointerdown", () => icon.scale(.86, 100, "out(3)"), { passive: true });
      listen(link, "pointerup", rest, { passive: true });
      listen(link, "pointercancel", rest, { passive: true });
    });

    document.querySelectorAll(".hero-buttons .btn, .reading-link, .connect-resume").forEach((button) => {
      const sheen = animate(button, { "--button-sheen": [0, 1], duration: 720, ease: "inOutSine", autoplay: false });
      if (matches.pointer) listen(button, "pointerenter", () => sheen.restart());
      listen(button, "focus", () => sheen.restart());
      listen(button, "pointerdown", () => sheen.restart(), { passive: true });
    });

    // Three background curves change shape as the reader enters a different chapter.
    // They sit inside GSAP's scrolling field, and return to rest after each passage.
    const weave = [...document.querySelectorAll(".ambient-weave path")];
    const originalPaths = weave.map((path) => path.getAttribute("d"));
    const passage = createTimeline({ autoplay: false })
      .add(weave, { d: (_, i) => [originalPaths[i], `M-80 ${540 + i * 24}C270 ${750 - i * 30} 520 ${130 + i * 18} 800 ${460 + i * 12}C1080 ${880 - i * 20} 1330 ${190 + i * 24} 1680 ${450 + i * 18}`], delay: stagger(100), duration: 1400, ease: "inOutSine" }, 0)
      .add(weave, { d: (_, i) => originalPaths[i], duration: 1600, ease: "inOutSine" }, 1500);
    let chapter;
    const chapterObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting && chapter !== target && !document.hidden) {
          chapter = target;
          passage.restart();
        }
      });
    }, { rootMargin: "-35% 0px -45% 0px" });
    document.querySelectorAll("main > section").forEach((section) => chapterObserver.observe(section));

    return () => {
      observer.disconnect();
      chapterObserver.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      strokes.forEach(({ attributes, cap }, element) => {
        attributes.forEach(([name, value]) => value === null ? element.removeAttribute(name) : element.setAttribute(name, value));
        if (cap) element.style.strokeLinecap = cap;
        else element.style.removeProperty("stroke-linecap");
      });
      weave.forEach((path, i) => path.setAttribute("d", originalPaths[i]));
      delete root.dataset.detailMotion;
    };
  });
  return () => scope.revert();
}

/** A dialog owns its own scope, including every dynamically mounted detail. */
export function mountProjectMotion(dialog) {
  const scope = createScope({ root: dialog, mediaQueries: MEDIA }).add(({ matches }) => {
    if (matches.reduced) return;
    createTimeline()
      .add(dialog, { opacity: [.85, 1], y: [20, 0], scale: [.97, 1], duration: 480, ease: "out(4)" }, 0)
      .add(".pd-head, .pd-tech .tech-tag", { y: [12, 0], opacity: [.6, 1], duration: 500, delay: stagger(35), ease: "out(4)" }, 80)
      .add(".pd-highlights li", { x: [-10, 0], opacity: [.65, 1], duration: 500, delay: stagger(35), ease: "out(4)" }, 160);
  });
  return () => scope.revert();
}
