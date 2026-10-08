import { useEffect } from "react";

/** GSAP owns scroll choreography; content and native scrolling work independently. */
export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let loading = false;
    let mediaContext;
    let engine;
    let plugin;
    let refreshTimer;
    let resizeObserver;
    let progressFrame = 0;
    let pageHeight = root.scrollHeight - innerHeight;

    const paintProgress = () => {
      progressFrame = 0;
      root.style.setProperty("--page-progress", String(Math.min(1, scrollY / Math.max(1, pageHeight))));
    };
    const scrollProgress = () => { if (!disposed && !progressFrame) progressFrame = requestAnimationFrame(paintProgress); };
    const measure = () => {
      pageHeight = root.scrollHeight - innerHeight;
      scrollProgress();
      refreshTimer?.kill();
      if (engine && !disposed) refreshTimer = engine.delayedCall(.2, () => plugin.refresh());
    };
    const visibility = () => {
      if (!engine) return;
      engine.globalTimeline.paused(document.hidden);
      if (document.hidden) engine.ticker.sleep();
      else { engine.ticker.wake(); plugin.update(); }
    };

    const initialize = async () => {
      if (disposed || loading || mediaContext || preference.matches) return;
      loading = true;
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (disposed) return;
        engine = gsap;
        plugin = ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        gsap.config({ autoSleep: 30 });
        ScrollTrigger.config({ ignoreMobileResize: true });
        root.dataset.motionEngine = "gsap";
        mediaContext = gsap.matchMedia();
        mediaContext.add({ mobile: "(max-width: 760px)", desktop: "(min-width: 761px)", motion: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
          if (!conditions.motion) return;
          const mobile = conditions.mobile;
          const amount = mobile ? .6 : 1;
          const contextCleanups = [];
          const sectionNames = { hero: "portrait-turn", impact: "metric-assembly", projects: "exploded-systems", about: "ink-and-evidence", experience: "career-spine", skills: "panel-unfold", education: "archive-layers", achievements: "credential-fan", publications: "journal-pages", contact: "invitation" };
          Object.entries(sectionNames).forEach(([id, effect]) => {
            const section = document.getElementById(id);
            if (section) section.dataset.motionEffect = effect;
          });

          const scrub = (trigger, start = "top 92%", end = "top 48%") => ({ trigger, start, end, scrub: .4, invalidateOnRefresh: true });
          const arrive = (target, from = {}, trigger = target) => {
            const elements = gsap.utils.toArray(target);
            if (!elements.length) return;
            return gsap.fromTo(elements,
              { y: 30 * amount, rotationX: 10 * amount, opacity: .72, transformPerspective: 900, ...from },
              { y: 0, x: 0, rotationX: 0, rotationY: 0, rotation: 0, scale: 1, opacity: 1, ease: "power2.out", scrollTrigger: scrub(trigger) });
          };

          // Section titles rise from a tilted plane, then stay still for reading.
          gsap.utils.toArray("main > section .section-header").forEach((header) => {
            const heading = header.querySelector("h2");
            if (heading) arrive(heading, { y: 34 * amount, rotationX: 18 * amount }, header);
          });

          // Hero: scroll turns the photograph. Pointer tilt is mouse-only.
          gsap.fromTo(".portrait-stage", { "--scene-progress": 0 }, { "--scene-progress": 1, ease: "none", scrollTrigger: { trigger: ".portrait-stage", start: "top bottom", end: "bottom top", scrub: .5 } });
          const portrait = document.querySelector(".portrait-stage");
          if (!mobile && portrait) {
            const setX = gsap.quickTo(portrait, "--pointer-x", { duration: .5, ease: "power3.out" });
            const setY = gsap.quickTo(portrait, "--pointer-y", { duration: .5, ease: "power3.out" });
            const move = (event) => {
              if (event.pointerType !== "mouse") return;
              const bounds = portrait.getBoundingClientRect();
              setX((event.clientX - bounds.left) / bounds.width * 2 - 1);
              setY((event.clientY - bounds.top) / bounds.height * 2 - 1);
            };
            const leave = () => { setX(0); setY(0); };
            portrait.addEventListener("pointermove", move, { passive: true });
            portrait.addEventListener("pointerleave", leave, { passive: true });
            contextCleanups.push(() => { portrait.removeEventListener("pointermove", move); portrait.removeEventListener("pointerleave", leave); });
          }
          arrive(".hero-personal-note", { y: 24 * amount, rotationX: 8 * amount }, ".hero-summary");

          // Impact: actual numbers stay intact; their panels assemble around them.
          gsap.utils.toArray(".impact-item").forEach((item, index) => {
            arrive(item, { y: (26 + index * 10) * amount, rotationX: 8 * amount, rotationY: (index - 1) * 5 * amount }, item);
            gsap.fromTo(item, { "--metric-line": 0 }, { "--metric-line": 1, ease: "none", scrollTrigger: scrub(item) });
            arrive(item.querySelector(".impact-number strong"), { y: 20 * amount, scale: .92 }, item);
          });

          // Projects retain their dimensional system studies on desktop and phone.
          gsap.utils.toArray(".project-chapter").forEach((chapter) => {
            const artwork = chapter.querySelector(".project-artwork");
            gsap.fromTo(artwork, { "--scene-progress": 0 }, { "--scene-progress": 1, ease: "none", scrollTrigger: mobile
              ? { trigger: artwork, start: "top bottom", end: "bottom top", scrub: .35 }
              : { trigger: chapter, start: "top 50%", end: (self) => self.start + chapter.offsetHeight - innerHeight * .15, scrub: .45, invalidateOnRefresh: true } });
          });
          gsap.utils.toArray(".project-card").forEach((card, index) => arrive(card, { rotationY: (index - 1) * 9 * amount, y: 36 * amount }, card));

          // About: a reading highlight sweeps through the real biography.
          gsap.utils.toArray(".about-statement mark").forEach((mark) => gsap.fromTo(mark, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", ease: "none", scrollTrigger: scrub(mark, "top 85%", "top 45%") }));
          gsap.utils.toArray(".stat-card").forEach((card, index) => arrive(card, { y: (30 + index * 9) * amount, rotationX: 12 * amount, rotationY: index % 2 ? -4 * amount : 4 * amount }, card));
          gsap.fromTo(".about-personal-line em", { "--ink-line": 0 }, { "--ink-line": 1, ease: "none", scrollTrigger: scrub(".about-personal-line") });

          // Career: trace an actual timeline, while every accordion stays usable.
          gsap.fromTo(".career-ledger", { "--spine-progress": 0 }, { "--spine-progress": 1, ease: "none", scrollTrigger: { trigger: ".career-ledger", start: "top 70%", end: "bottom 60%", scrub: .5, invalidateOnRefresh: true } });
          gsap.utils.toArray(".career-summary").forEach((summary) => {
            arrive(summary.querySelector(".career-identity"), { x: -22 * amount, y: 12 * amount, rotationY: -6 * amount }, summary);
            arrive(summary.querySelector(".career-period"), { y: 18 * amount, rotationX: 0 }, summary);
          });

          // Skills: each category folds open like a small instrument panel.
          gsap.utils.toArray(".expertise-cell").forEach((cell, index) => {
            arrive(cell, { rotationY: (index % 2 ? -1 : 1) * 12 * amount, rotationX: 7 * amount, y: 28 * amount, scale: .97 }, cell);
            gsap.fromTo(cell, { "--panel-line": 0 }, { "--panel-line": 1, ease: "none", scrollTrigger: scrub(cell) });
          });

          // Education: a layered archival card opens, with the grade as its anchor.
          gsap.utils.toArray(".academic-record").forEach((record) => {
            arrive(record, { rotationX: 9 * amount, rotation: 1.4 * amount, y: 32 * amount, scale: .985 }, record);
            arrive(record.querySelector(".academic-grade-value"), { y: 24 * amount, scale: .86, rotationX: 0 }, record);
            gsap.fromTo(record, { "--archive-depth": 0 }, { "--archive-depth": 1, ease: "none", scrollTrigger: scrub(record) });
          });

          // Credentials: cards unfurl in sequence; the medal slowly turns in space.
          gsap.utils.toArray(".recognition-certificate").forEach((card, index) => arrive(card, { x: (index % 2 ? 18 : -18) * amount, rotationX: 10 * amount, rotation: (index % 2 ? 1.1 : -1.1) * amount, y: 26 * amount }, card));
          arrive(".recognition-awards", { y: 38 * amount, rotationY: -9 * amount, rotation: -2 * amount }, ".recognition-awards");
          gsap.fromTo(".recognition-awards-mark", { rotationY: -28, rotationZ: -8 }, { rotationY: 28, rotationZ: 8, transformPerspective: 700, ease: "none", scrollTrigger: { trigger: ".recognition-awards", start: "top bottom", end: "bottom 15%", scrub: .6 } });

          // Writing: journal pages turn into place, without splitting readable text.
          gsap.utils.toArray(".reading-entry").forEach((entry, index) => {
            arrive(entry, { rotationY: (index % 2 ? -1 : 1) * 7 * amount, rotation: (index % 2 ? 1 : -1) * .8 * amount, y: 35 * amount }, entry);
            gsap.fromTo(entry, { "--page-rule": 0 }, { "--page-rule": 1, ease: "none", scrollTrigger: scrub(entry) });
          });

          // Contact: the two columns settle together; icons turn gently into their row.
          arrive(".connect-heading", { y: 28 * amount, rotationX: 12 * amount }, ".connect-details");
          const contact = gsap.timeline({ scrollTrigger: scrub(".connect-details", "top 90%", "top 42%") });
          contact.fromTo(".connect-socials a", { y: 24 * amount, rotationY: 55 * amount, opacity: .65 }, { y: 0, rotationY: 0, opacity: 1, duration: .7, stagger: .055, transformPerspective: 600, ease: "power2.out" }, 0)
            .fromTo(".connect-email", { y: 20 * amount, opacity: .7 }, { y: 0, opacity: 1, duration: .7, ease: "power2.out" }, .12)
            .fromTo(".connect-resume", { y: 14 * amount, opacity: .7 }, { y: 0, opacity: 1, duration: .6 }, .2);
          gsap.fromTo(".connect-section", { "--invitation-progress": 0 }, { "--invitation-progress": 1, ease: "none", scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom bottom", scrub: .6 } });
          arrive(".colophon-content", { y: 14, rotationX: 0 }, ".colophon-footer");

          // The background travels with the entire page rather than looping while idle.
          const world = gsap.timeline({ scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .8, invalidateOnRefresh: true } });
          world.fromTo(".ambient-field", { rotation: -12, xPercent: -8, yPercent: -12, scale: .95 }, { rotation: 32, xPercent: 9, yPercent: 18, scale: 1.12, ease: "none" }, 0)
            .fromTo(".ambient-ribbon-blue", { rotation: -18, scaleY: .8 }, { rotation: 75, scaleY: 1.25, svgOrigin: "1010 480", ease: "none" }, 0)
            .fromTo(".ambient-ribbon-red", { y: -110, x: -80 }, { y: 160, x: 110, ease: "none" }, 0)
            .fromTo(".ambient-halo", { xPercent: -35, yPercent: 0, scale: .9 }, { xPercent: 15, yPercent: 55, scale: 1.15, ease: "none" }, 0)
            .fromTo(".ambient-flow-left", { yPercent: -5 }, { yPercent: 16, ease: "none" }, 0)
            .fromTo(".ambient-flow-right", { yPercent: 5 }, { yPercent: -16, ease: "none" }, 0)
            .fromTo(".ambient-trace", { strokeDashoffset: 1000 }, { strokeDashoffset: -1000, ease: "none" }, 0);

          return () => contextCleanups.forEach((cleanup) => cleanup());
        });
        visibility();
        document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
      } catch {
        mediaContext?.revert();
        delete root.dataset.motionEngine;
        // All original content remains visible if the optional animation code fails.
      } finally { loading = false; }
    };
    resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", scrollProgress, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", initialize);
    measure();
    initialize();
    return () => {
      disposed = true;
      cancelAnimationFrame(progressFrame);
      refreshTimer?.kill();
      resizeObserver.disconnect();
      mediaContext?.revert();
      engine?.globalTimeline.paused(false);
      delete root.dataset.motionEngine;
      window.removeEventListener("scroll", scrollProgress);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", initialize);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
