/* ═══════════════════════════════════════════════════════════════
   SCROLL LOCK
   Lenis owns page scrolling, so an overlay can't just set
   overflow:hidden — it has to tell Lenis to stand down. This keeps
   a single reference to the running instance for that purpose.
   ═══════════════════════════════════════════════════════════════ */

let lenis = null;

export function registerLenis(instance) {
  lenis = instance;
}

export function lockScroll() {
  lenis?.stop();
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  lenis?.start();
  document.body.style.overflow = "";
}
