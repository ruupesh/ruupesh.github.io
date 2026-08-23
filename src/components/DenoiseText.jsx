import { useLayoutEffect, useMemo, useRef } from "react";
import { prefersReducedMotion } from "../utils/motion";

/* ═══════════════════════════════════════════════════════════════
   DENOISE
   Text arrives as a high-entropy glyph field and resolves into
   letterforms on a noise-seeded order — characters settle out of
   sequence, not left to right, so it reads as a decode step
   rather than as typing.
   ═══════════════════════════════════════════════════════════════ */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>{}[]#%&*+=~^";
const SCRAMBLE_MS = 45;

/** Fisher–Yates. Re-seeded per mount so no two loads resolve alike. */
function shuffledIndices(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

export default function DenoiseText({
  text = "",
  className = "",
  delay = 0,
  duration = 1250,
}) {
  const chars = useMemo(() => Array.from(text), [text]);
  const charRefs = useRef([]);

  // Layout effect so the first scramble lands before paint —
  // otherwise the correct text flashes for a frame.
  useLayoutEffect(() => {
    const els = charRefs.current;
    if (!els.length) return;

    if (prefersReducedMotion()) {
      els.forEach((el, i) => {
        if (!el) return;
        el.textContent = chars[i];
        el.dataset.state = "settled";
        el.style.width = "";
      });
      return;
    }

    const order = shuffledIndices(chars.length);
    const settleAt = new Array(chars.length);
    order.forEach((charIdx, position) => {
      const t = chars.length > 1 ? position / (chars.length - 1) : 0;
      settleAt[charIdx] = delay + t * duration;
    });

    const done = new Array(chars.length).fill(false);

    // Pin every slot to the width of its FINAL glyph, so cycling through
    // random characters never reflows the line.
    //
    // Pinned in em, not px. The heading is sized with clamp(), so a px pin
    // measured at one viewport keeps its old width when the font-size
    // changes on resize — which is what spaced the letters out on narrow
    // screens. Pins are released entirely once the text has settled.
    let cancelled = false;
    let settledAll = false;

    /** Hand the line back to normal text layout once nothing is cycling. */
    const releaseWidths = () => {
      settledAll = true;
      els.forEach((el) => {
        if (el) el.style.width = "";
      });
    };

    const lockWidths = () => {
      // Nothing left to stabilise — pinning now would only strand a stale
      // width on a heading that resizes with the viewport.
      if (cancelled || settledAll) return;
      // Measure against the real character, then restore the noise glyph.
      const restore = [];
      els.forEach((el, i) => {
        if (!el || chars[i] === " ") return;
        restore[i] = el.textContent;
        el.textContent = chars[i];
      });

      const sizeSource = els.find(Boolean);
      const fontSize = sizeSource
        ? parseFloat(window.getComputedStyle(sizeSource).fontSize) || 0
        : 0;

      els.forEach((el, i) => {
        if (!el || chars[i] === " ") return;
        const w = el.getBoundingClientRect().width;
        if (w && fontSize) el.style.width = `${(w / fontSize).toFixed(4)}em`;
      });

      els.forEach((el, i) => {
        if (!el || chars[i] === " " || done[i]) return;
        el.textContent = restore[i];
      });
    };

    let raf;
    let start = null;
    let lastScramble = -Infinity;

    const step = (now) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const scramble = now - lastScramble >= SCRAMBLE_MS;
      if (scramble) lastScramble = now;

      let remaining = false;

      for (let i = 0; i < chars.length; i++) {
        if (done[i]) continue;
        const el = els[i];
        if (!el) continue;

        if (elapsed >= settleAt[i]) {
          el.textContent = chars[i];
          el.dataset.state = "settled";
          done[i] = true;
        } else {
          remaining = true;
          if (scramble) el.textContent = randomGlyph();
        }
      }

      if (remaining) {
        raf = requestAnimationFrame(step);
      } else {
        // Every slot holds its real character now, so the pins have done
        // their job. Releasing them lets the heading reflow naturally at
        // any viewport width and honours the font's optical sizing.
        releaseWidths();
      }
    };

    /* Measure, scramble, animate — in that order, and only once the webfont
       is in. Measuring against the fallback face and correcting later meant
       pinning twice, and the correction itself was a layout shift. Until
       this runs the heading simply shows its real text. */
    let begun = false;
    const begin = () => {
      // fonts.ready and the fallback timer race; whichever lands first wins.
      if (begun || cancelled || settledAll) return;
      begun = true;
      lockWidths();
      els.forEach((el, i) => {
        if (el && chars[i] !== " ") el.textContent = randomGlyph();
      });
      raf = requestAnimationFrame(step);
    };

    let fallbackTimer;
    if (document.fonts?.ready) {
      document.fonts.ready.then(begin);
      // Never let a stalled font load cost the animation entirely.
      fallbackTimer = setTimeout(begin, 900);
    } else {
      begin();
    }

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(raf);
    };
  }, [chars, delay, duration]);

  // Group characters into words. Each char is its own inline-block, so
  // without a nowrap wrapper the browser will happily break mid-word.
  const words = [];
  let current = [];
  chars.forEach((ch, i) => {
    if (ch === " ") {
      if (current.length) words.push(current);
      words.push(" ");
      current = [];
    } else {
      current.push(i);
    }
  });
  if (current.length) words.push(current);

  return (
    <span className={`denoise ${className}`.trim()}>
      {/* Real text for assistive tech; the glyph field is decorative. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) =>
          word === " " ? (
            <span key={`s${w}`} className="dn-space"> </span>
          ) : (
            <span key={`w${w}`} className="dn-word">
              {word.map((i) => (
                <span
                  key={i}
                  ref={(el) => (charRefs.current[i] = el)}
                  className="dn-char"
                  data-state="noise"
                >
                  {chars[i]}
                </span>
              ))}
            </span>
          )
        )}
      </span>
    </span>
  );
}
