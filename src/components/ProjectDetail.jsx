import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Close } from "./icons";
import { prefersReducedMotion } from "../utils/motion";
import { lockScroll, unlockScroll } from "../utils/scrollLock";

/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL
   Opens from the card that was clicked using FLIP: measure where
   the card is (First), render the panel where it belongs (Last),
   invert the difference and play it out. The card appears to grow
   into the panel rather than a dialog appearing over it.
   ═══════════════════════════════════════════════════════════════ */

export default function ProjectDetail({ project, originRect, originEl, onClose }) {
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const closeRef = useRef(null);

  // FLIP in.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel) return;

    if (prefersReducedMotion() || !originRect) {
      gsap.set([backdrop, panel], { opacity: 1 });
      return;
    }

    const last = panel.getBoundingClientRect();
    const dx = originRect.left + originRect.width / 2 - (last.left + last.width / 2);
    const dy = originRect.top + originRect.height / 2 - (last.top + last.height / 2);
    const sx = originRect.width / last.width;
    const sy = originRect.height / last.height;

    gsap.set(backdrop, { opacity: 0 });
    gsap.set(panel, { x: dx, y: dy, scaleX: sx, scaleY: sy, opacity: 0.6 });

    const tl = gsap.timeline();
    tl.to(backdrop, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0);
    tl.to(
      panel,
      { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: 0.55, ease: "power3.out" },
      0
    );
    // fromTo, not from: a `from` tween reads the element's current value as
    // its end state, so if a previous run was killed mid-flight (StrictMode
    // remounts do exactly that) it would animate 0 → 0 and stay invisible.
    tl.fromTo(
      panel.querySelectorAll(".pd-stagger"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, stagger: 0.045, duration: 0.4, ease: "power2.out" },
      0.22
    );

    return () => tl.kill();
  }, [originRect]);

  // Scroll lock, Escape to dismiss, and focus handling.
  useEffect(() => {
    lockScroll();
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      // Return focus to the card that opened this.
      if (originEl && typeof originEl.focus === "function") originEl.focus();
    };
  }, [onClose, originEl]);

  if (!project) return null;

  return (
    <div className="pd-root" role="dialog" aria-modal="true" aria-label={project.name}>
      <div className="pd-backdrop" ref={backdropRef} onClick={onClose} />

      <article className="pd-panel" ref={panelRef} data-lenis-prevent>
        <button className="pd-close" onClick={onClose} ref={closeRef} aria-label="Close project">
          <Close size="20px" />
        </button>

        <header className="pd-head">
          <h3 className="pd-title pd-stagger">{project.name}</h3>
          <p className="pd-description pd-stagger">{project.description}</p>
        </header>

        {project.technologies?.length > 0 && (
          <div className="pd-tech pd-stagger">
            {project.technologies.map((tech) => (
              <span className="tech-tag" key={tech}>{tech}</span>
            ))}
          </div>
        )}

        {project.highlights?.length > 0 && (
          <ul className="pd-highlights">
            {project.highlights.map((h, i) => (
              <li key={i} className="pd-highlight pd-stagger">
                <span className="pd-highlight-text">{h}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}
