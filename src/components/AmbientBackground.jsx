import { useEffect, useState } from "react";
import "../styles/ambient.css";

const MOTION_KEY = "portfolio-motion";

function savedPause() {
  try { return window.localStorage.getItem(MOTION_KEY) === "paused"; }
  catch { return false; }
}

const FLOW_PATHS = [
  "M-80 -60C350 50 260 180 102 265S-138 456 54 562 269 730 148 882 64 1041 246 1160",
  "M-108 -60C321 51 231 170 79 260S-164 460 33 574 237 739 127 896 51 1050 224 1160",
  "M-136 -60C292 52 202 160 56 255S-190 464 12 586 205 748 106 910 38 1059 202 1160",
  "M-164 -60C263 53 173 150 33 250S-216 468 -9 598 173 757 85 924 25 1068 180 1160",
  "M-192 -60C234 54 144 140 10 245S-242 472 -30 610 141 766 64 938 12 1077 158 1160",
  "M-220 -60C205 55 115 130 -13 240S-268 476 -51 622 109 775 43 952 -1 1086 136 1160",
];

function FlowLines({ side }) {
  return (
    <svg className={`ambient-flow ambient-flow-${side}`} viewBox="0 0 300 1100" preserveAspectRatio="none" fill="none">
      <g className="ambient-contours">
        {FLOW_PATHS.map((path) => <path key={path} d={path} vectorEffect="non-scaling-stroke" />)}
      </g>
      <path className="ambient-trace" d={FLOW_PATHS[side === "left" ? 1 : 4]} pathLength="1000" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function AmbientBackground() {
  const [userPaused, setUserPaused] = useState(savedPause);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const paused = userPaused || reducedMotion || hidden;

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
    window.dispatchEvent(new CustomEvent("portfolio:motion", { detail: { paused, source: "ambient" } }));
  }, [paused]);

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = (event) => setReducedMotion(event.matches);
    const onVisibilityChange = () => setHidden(document.hidden);
    const onStorageChange = (event) => {
      if (event.key === MOTION_KEY || event.key === null) setUserPaused(event.newValue === "paused");
    };
    const onExternalMotion = (event) => {
      if (event.detail?.source === "ambient" || typeof event.detail?.paused !== "boolean") return;
      const next = event.detail.paused;
      setUserPaused(next);
      try { window.localStorage.setItem(MOTION_KEY, next ? "paused" : "running"); }
      catch { /* A scene-local control can also work without storage. */ }
      // A scene-local resume must not override the visitor's OS preference.
      const effectivePause = next || preference?.matches || document.hidden;
      document.documentElement.dataset.motion = effectivePause ? "paused" : "running";
      if (effectivePause !== next) {
        window.dispatchEvent(new CustomEvent("portfolio:motion", { detail: { paused: effectivePause, source: "ambient" } }));
      }
    };
    preference?.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("storage", onStorageChange);
    window.addEventListener("portfolio:motion", onExternalMotion);
    return () => {
      preference?.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("portfolio:motion", onExternalMotion);
    };
  }, []);

  const toggleMotion = () => {
    if (reducedMotion) return;
    const next = !userPaused;
    try { window.localStorage.setItem(MOTION_KEY, next ? "paused" : "running"); }
    catch { /* The control still works when storage is unavailable. */ }
    setUserPaused(next);
  };

  const label = reducedMotion ? "Motion paused" : userPaused ? "Resume motion" : "Pause motion";

  return (
    <>
      <div className={`ambient-background${paused ? " is-paused" : ""}`} aria-hidden="true">
        <FlowLines side="left" />
        <FlowLines side="right" />
      </div>
      <button
        className="motion-control"
        type="button"
        onClick={toggleMotion}
        disabled={reducedMotion}
        aria-label={reducedMotion ? "Motion paused to respect your reduced motion setting" : label}
        title={reducedMotion ? "Motion is off to respect your system preference" : label}
      >
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {userPaused && !reducedMotion ? <path d="m5 3 7 5-7 5Z" /> : <path d="M5.5 3.5v9m5-9v9" />}
        </svg>
        <span>{label}</span>
      </button>
    </>
  );
}
