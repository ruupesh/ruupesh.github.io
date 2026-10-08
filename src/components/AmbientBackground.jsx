import { useEffect } from "react";
import "../styles/ambient.css";

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
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      // Old manual-pause preferences no longer govern the experience.
      const paused = preference.matches || document.hidden;
      document.documentElement.dataset.motion = paused ? "paused" : "running";
      window.dispatchEvent(new CustomEvent("portfolio:motion", { detail: { paused, source: "system" } }));
    };
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-halo" />
      <svg className="ambient-field" viewBox="0 0 1600 1000" fill="none">
        <g className="ambient-ribbon ambient-ribbon-blue">
          {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={1010 + i * 7} cy={480 - i * 5} rx={380 - i * 12} ry={250 - i * 10} />)}
        </g>
        <g className="ambient-ribbon ambient-ribbon-red">
          {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M-100 ${550+i*18}C220 ${180+i*25} 520 ${1050-i*22} 930 ${700-i*15}S1390 ${250+i*12} 1750 ${510+i*16}`} />)}
        </g>
        <g className="ambient-weave">
          {Array.from({ length: 3 }, (_, i) => <path key={i} d={`M-80 ${480 + i * 24}C270 ${150 + i * 30} 520 ${820 - i * 18} 800 ${520 + i * 12}C1080 ${220 + i * 20} 1330 ${760 - i * 24} 1680 ${390 + i * 18}`} />)}
        </g>
      </svg>
      <FlowLines side="left" />
      <FlowLines side="right" />
    </div>
  );
}
