/* ═══════════════════════════════════════════════════════════════
   ICON SYSTEM
   One line set. 24×24 grid, 1.5px stroke, round caps/joins,
   currentColor. No fills, no emoji, no second optical size.
   ═══════════════════════════════════════════════════════════════ */

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

/**
 * Builds an icon component from raw SVG children.
 * Size is driven by `em` so icons inherit the type scale they sit in.
 */
function icon(name, children) {
  const Component = ({ size = "1em", className = "", ...rest }) => (
    <svg
      {...BASE}
      width={size}
      height={size}
      className={`icon icon-${name}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </svg>
  );
  Component.displayName = `Icon(${name})`;
  return Component;
}

/* ── AI / domain ── */

// A neural node cluster — reads as "model" far better than a literal brain.
export const Neural = icon("neural", (
  <>
    <circle cx="6" cy="7" r="2" />
    <circle cx="18" cy="7" r="2" />
    <circle cx="12" cy="17.5" r="2" />
    <circle cx="12" cy="11" r="1.6" />
    <path d="M7.65 8.35 10.7 10.2M16.35 8.35 13.3 10.2M12 12.6v2.9" />
  </>
));

export const Agent = icon("agent", (
  <>
    <rect x="4" y="8.5" width="16" height="11.5" rx="3" />
    <path d="M12 8.5V5.2" />
    <circle cx="12" cy="4" r="1.3" />
    <path d="M9 13.4h.01M15 13.4h.01" />
    <path d="M9.8 16.8h4.4" />
  </>
));

export const Sparkle = icon("sparkle", (
  <>
    <path d="M10.5 3.5 12.2 8.3 17 10l-4.8 1.7-1.7 4.8-1.7-4.8L4 10l4.8-1.7Z" />
    <path d="m17.8 14.6.75 2.05 2.05.75-2.05.75-.75 2.05-.75-2.05L15 17.4l2.05-.75Z" />
  </>
));

/* ── Craft / stack ── */

export const Terminal = icon("terminal", (
  <>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="m7.6 10.2 2.6 2.6-2.6 2.6" />
    <path d="M13.2 15.4h3.4" />
  </>
));

export const Server = icon("server", (
  <>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </>
));

export const Layout = icon("layout", (
  <>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 9.6h18M9.4 9.6V20" />
  </>
));

// System architecture — a parent fanning out to two services.
export const Architecture = icon("architecture", (
  <>
    <rect x="9" y="3" width="6" height="5" rx="1.5" />
    <rect x="2.5" y="16" width="6" height="5" rx="1.5" />
    <rect x="15.5" y="16" width="6" height="5" rx="1.5" />
    <path d="M12 8v3.6M5.5 16v-2.9a1.5 1.5 0 0 1 1.5-1.5h10a1.5 1.5 0 0 1 1.5 1.5V16" />
  </>
));

export const Chart = icon("chart", (
  <>
    <path d="M3.5 20.5h17" />
    <path d="M7 20.5v-5.8M12 20.5V7.2M17 20.5v-9.1" />
  </>
));

export const Cloud = icon("cloud", (
  <path d="M17.2 18.5a3.75 3.75 0 0 0 .3-7.48 5.75 5.75 0 0 0-10.95-1.6A4.4 4.4 0 0 0 7.2 18.5Z" />
));

export const Tag = icon("tag", (
  <>
    <path d="M3.5 10.6V4.6a1.1 1.1 0 0 1 1.1-1.1h6l9.4 9.4a1.6 1.6 0 0 1 0 2.2l-4.8 4.8a1.6 1.6 0 0 1-2.2 0Z" />
    <circle cx="8" cy="8" r="1.3" />
  </>
));

/* ── People / place / time ── */

export const Users = icon("users", (
  <>
    <circle cx="9.8" cy="8" r="3.6" />
    <path d="M16 19.5v-1.6a3.6 3.6 0 0 0-3.6-3.6H7.2a3.6 3.6 0 0 0-3.6 3.6v1.6" />
    <path d="M15.4 4.7a3.6 3.6 0 0 1 0 6.6" />
    <path d="M20.4 19.5v-1.6a3.6 3.6 0 0 0-2.7-3.48" />
  </>
));

export const MapPin = icon("map-pin", (
  <>
    <path d="M19 10.4c0 5.2-7 11.1-7 11.1s-7-5.9-7-11.1a7 7 0 0 1 14 0Z" />
    <circle cx="12" cy="10.4" r="2.5" />
  </>
));

export const Calendar = icon("calendar", (
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10.2h17M8.4 3v4.2M15.6 3v4.2" />
  </>
));

/* ── Signals / recognition ── */

// Contribution list — dotted leaders, not a lightbulb.
export const Contributions = icon("contributions", (
  <>
    <circle cx="4.6" cy="6.5" r="1.1" />
    <circle cx="4.6" cy="12" r="1.1" />
    <circle cx="4.6" cy="17.5" r="1.1" />
    <path d="M9 6.5h11M9 12h11M9 17.5h7" />
  </>
));

export const Star = icon("star", (
  <path d="m12 3.4 2.63 5.55 5.97.83-4.35 4.2 1.07 6.02L12 17.14 6.68 20l1.07-6.02L3.4 9.78l5.97-.83Z" />
));

export const Target = icon("target", (
  <>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.4" />
    <circle cx="12" cy="12" r="1" />
  </>
));

export const Rocket = icon("rocket", (
  <>
    <path d="M12 2.6c3.02 2.28 4.78 5.78 4.78 9.66L15.1 18h-6.2L7.22 12.26C7.22 8.38 8.98 4.88 12 2.6Z" />
    <path d="M7.5 12.4 4.6 14.8l.6 3.9 2.55-1.5M16.5 12.4l2.9 2.4-.6 3.9-2.55-1.5" />
    <circle cx="12" cy="10" r="1.75" />
    <path d="M10.3 20.9c.55.9 1.12 1.35 1.7 1.35s1.15-.45 1.7-1.35" />
  </>
));

export const Trophy = icon("trophy", (
  <>
    <path d="M7.6 4h8.8v5.4a4.4 4.4 0 0 1-8.8 0Z" />
    <path d="M7.6 5.6H5.3a2.05 2.05 0 0 0 0 4.1h2.5M16.4 5.6h2.3a2.05 2.05 0 0 1 0 4.1h-2.5" />
    <path d="M12 13.8v3.6M8.6 20.4h6.8" />
  </>
));

export const Medal = icon("medal", (
  <>
    <circle cx="12" cy="14.8" r="5.7" />
    <path d="M8.7 9.5 6.1 3.6h11.8l-2.6 5.9" />
    <path d="M12 12.8v.01M12 16.6v.01" />
  </>
));

export const Certificate = icon("certificate", (
  <>
    <path d="M6 3.6h7.6L19 8.9v11.5H6Z" />
    <path d="M13.6 3.6v5.3H19" />
    <circle cx="12.5" cy="14.4" r="2.3" />
    <path d="m10.9 16.3-.7 3.2 2.3-1.3 2.3 1.3-.7-3.2" />
  </>
));

export const Check = icon("check", <path d="m5.2 12.6 4.5 4.5 9.1-10" />);

/* ── Interface chrome ── */

export const Document = icon("document", (
  <>
    <path d="M6.5 3.6h7.1l4.9 5.1v11.7h-12Z" />
    <path d="M13.6 3.6v5.1h4.9" />
    <path d="M9.6 13.2h5M9.6 16.6h5" />
  </>
));

export const Menu = icon("menu", <path d="M4 7h16M4 12h16M4 17h16" />);

export const Close = icon("close", <path d="m6.2 6.2 11.6 11.6M17.8 6.2 6.2 17.8" />);

export const Message = icon("message", (
  <path d="M20.5 11.7c0 4.05-3.8 7.35-8.5 7.35a9.9 9.9 0 0 1-2.6-.34L4.6 20.5l1.3-3.4a7 7 0 0 1-2.4-5.4c0-4.05 3.8-7.35 8.5-7.35s8.5 3.3 8.5 7.35Z" />
));

export const Send = icon("send", (
  <>
    <path d="M20.6 3.4 3.5 10.2l6.7 2.8 2.8 6.7Z" />
    <path d="M10.2 13 20.6 3.4" />
  </>
));

export const Mail = icon("mail", (
  <>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.9 6.9 7.1 5.2a1.7 1.7 0 0 0 2 0l7.1-5.2" />
  </>
));

export const GraduationCap = icon("graduation-cap", (
  <>
    <path d="M12 4.2 2.6 9 12 13.8 21.4 9Z" />
    <path d="M6.6 11.1v4.6c0 1.66 2.42 3 5.4 3s5.4-1.34 5.4-3v-4.6" />
    <path d="M21.4 9v5.6" />
  </>
));
