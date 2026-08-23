import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   TRACE RAIL
   Left-edge rail carrying scroll progress and a section index.
   Each section is a tick; the one you are in widens and lights up,
   and labels appear on hover. Desktop only — it needs the margin to
   live in, and the top nav already covers narrow screens.
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: "hero", label: "hero" },
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
  { id: "achievements", label: "achievements" },
  { id: "projects", label: "projects" },
  { id: "publications", label: "publications" },
  { id: "contact", label: "contact" },
];

export default function TraceRail() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;

    const read = () => {
      frame = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);

      // The last section whose top has crossed 40% of the viewport.
      const line = window.innerHeight * 0.4;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });

      // React bails out when the value is unchanged, so no guard needed.
      setActive(current);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jump = (id) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className="trace-rail" aria-label="Section trace">
      <span className="trace-progress" style={{ "--p": progress }} aria-hidden="true" />

      <ol className="trace-ticks">
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={`trace-tick${i === active ? " is-active" : ""}${
                i < active ? " is-past" : ""
              }`}
              onClick={jump(s.id)}
              aria-current={i === active ? "true" : undefined}
            >
              <span className="trace-tick-mark" aria-hidden="true" />
              <span className="trace-tick-label">{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
