import { useEffect, useState } from "react";

/** Track the section crossing the same reading line used by anchor navigation. */
export default function useSectionNavigation(navRef) {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const root = document.documentElement;
    const sections = [...document.querySelectorAll("main > section[id]")];
    let positions = [];
    let frame = 0;
    let anchorFrame = 0;
    let ready = false;
    let disposed = false;
    let interacted = false;
    let activeId = "";
    const initialHash = window.location.hash;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const update = () => {
      frame = 0;
      if (!ready || !positions.length) return;
      const scrollTop = window.scrollY;
      let current = positions[0].id;
      for (const section of positions) {
        if (section.top <= scrollTop + section.offset + 2) current = section.id;
        else break;
      }
      if (scrollTop > 0 && scrollTop + window.innerHeight >= root.scrollHeight - 3) current = positions.at(-1).id;
      if (activeId !== current) { activeId = current; setActive(current); }
      if (window.location.hash !== `#${current}`) {
        // Scrolling updates the current entry, rather than filling Back history.
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${current}`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      const header = navRef.current?.offsetHeight || 0;
      positions = sections.map((section) => ({
        id: section.id,
        top: section.getBoundingClientRect().top + window.scrollY,
        offset: Math.max(header + 12, padding + (parseFloat(getComputedStyle(section).scrollMarginTop) || 0)),
      }));
      schedule();
    };
    const targetFromHash = (hash) => {
      try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
      catch { return null; }
    };
    const initialize = () => {
      if (disposed) return;
      if (!interacted && initialHash && window.location.hash === initialHash) {
        targetFromHash(initialHash)?.scrollIntoView({ behavior: "instant", block: "start" });
      }
      ready = true;
      measure();
    };
    const markInteraction = () => { interacted = true; ready = true; schedule(); };
    const historyNavigation = (event) => {
      // Freeze URL publishing until the requested history anchor has landed.
      // hashchange.newURL remains reliable even if a scroll event was queued.
      ready = false;
      interacted = true;
      cancelAnimationFrame(anchorFrame);
      const hash = event.type === "hashchange" ? new URL(event.newURL).hash : window.location.hash;
      anchorFrame = requestAnimationFrame(() => {
        targetFromHash(hash)?.scrollIntoView({ behavior: "instant", block: "start" });
        anchorFrame = requestAnimationFrame(() => {
          ready = true;
          measure();
        });
      });
    };
    const resize = new ResizeObserver(measure);
    sections.forEach((section) => resize.observe(section));
    resize.observe(document.body);
    if (navRef.current) resize.observe(navRef.current);
    const inputs = ["wheel", "touchstart", "pointerdown", "keydown"];
    inputs.forEach((event) => window.addEventListener(event, markInteraction, { passive: true }));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("hashchange", historyNavigation);
    window.addEventListener("popstate", historyNavigation);
    measure();
    const fonts = document.fonts?.ready || Promise.resolve();
    fonts.then(() => { if (!disposed) anchorFrame = requestAnimationFrame(initialize); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(anchorFrame);
      resize.disconnect();
      inputs.forEach((event) => window.removeEventListener(event, markInteraction));
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("hashchange", historyNavigation);
      window.removeEventListener("popstate", historyNavigation);
      window.history.scrollRestoration = previousRestoration;
    };
  }, [navRef]);
  return active;
}
