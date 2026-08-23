import { useEffect, useMemo, useState } from "react";
import { prefersReducedMotion } from "../utils/motion";

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER
   Cycles a list of phrases, typing and retracting one character at
   a time. Under reduced motion it simply shows the first phrase.
   ═══════════════════════════════════════════════════════════════ */

export default function Typewriter({
  phrases = [],
  typeMs = 62,
  deleteMs = 28,
  holdMs = 2000,
  className = "",
}) {
  const reduced = prefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = phrases[index % phrases.length] || "";
  // Array.from so multi-unit characters are never split mid-glyph.
  const chars = useMemo(() => Array.from(phrase), [phrase]);

  useEffect(() => {
    if (reduced || !chars.length) return;

    // Finished typing — hold, then retract.
    if (!deleting && count >= chars.length) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }

    // Fully retracted — advance to the next phrase on the next beat.
    // Scheduled rather than set inline so the effect never triggers a
    // synchronous cascading render.
    if (deleting && count <= 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((p) => (p + 1) % phrases.length);
      }, deleteMs);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setCount((c) => c + (deleting ? -1 : 1)),
      deleting ? deleteMs : typeMs
    );
    return () => clearTimeout(t);
  }, [count, deleting, chars.length, phrases.length, reduced, typeMs, deleteMs, holdMs]);

  const shown = reduced ? phrase : chars.slice(0, count).join("");

  return (
    <span className={`typewriter ${className}`.trim()}>
      <span className="sr-only">{phrase}</span>
      <span aria-hidden="true">
        {shown}
        <span className="type-caret" />
      </span>
    </span>
  );
}
