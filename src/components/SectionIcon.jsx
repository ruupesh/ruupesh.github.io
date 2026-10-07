// Selected official @mui/icons-material 9.4.0 outlined SVG paths.
// Kept local so decorative icons need no icon font or styling runtime.
// License: /third-party-licenses/mui-icons-material.txt
const ICONS = {
  "hero": {
    "name": "HomeOutlined",
    "paths": [
      "m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z"
    ]
  },
  "impact": {
    "name": "InsightsOutlined",
    "paths": [
      "M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2",
      "m15 9 .94-2.07L18 6l-2.06-.93L15 3l-.92 2.07L12 6l2.08.93zM3.5 11 4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9z"
    ]
  },
  "projects": {
    "name": "AccountTreeOutlined",
    "paths": [
      "M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3zM7 9H4V5h3zm10 6h3v4h-3zm0-10h3v4h-3z"
    ]
  },
  "about": {
    "name": "PersonOutlined",
    "paths": [
      "M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
    ]
  },
  "experience": {
    "name": "WorkOutlineOutlined",
    "paths": [
      "M14 6V4h-4v2zM4 8v11h16V8zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2z"
    ]
  },
  "skills": {
    "name": "CodeOutlined",
    "paths": [
      "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z"
    ]
  },
  "education": {
    "name": "SchoolOutlined",
    "paths": [
      "M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9zm6.82 6L12 12.72 5.18 9 12 5.28zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73z"
    ]
  },
  "achievements": {
    "name": "EmojiEventsOutlined",
    "paths": [
      "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2M5 8V7h2v3.82C5.84 10.4 5 9.3 5 8m7 6c-1.65 0-3-1.35-3-3V5h6v6c0 1.65-1.35 3-3 3m7-6c0 1.3-.84 2.4-2 2.82V7h2z"
    ]
  },
  "awards": {
    "name": "WorkspacePremiumOutlined",
    "paths": [
      "M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28m-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6m0 15-4 1.02v-3.1c1.18.68 2.54 1.08 4 1.08s2.82-.4 4-1.08v3.1z"
    ]
  },
  "publications": {
    "name": "AutoStoriesOutlined",
    "paths": [
      "M22.47 5.2c-.47-.24-.96-.44-1.47-.61v12.03c-1.14-.41-2.31-.62-3.5-.62-1.9 0-3.78.54-5.5 1.58V5.48C10.38 4.55 8.51 4 6.5 4c-1.79 0-3.48.44-4.97 1.2-.33.16-.53.51-.53.88v12.08c0 .58.47.99 1 .99q.24 0 .48-.12C3.69 18.4 5.05 18 6.5 18c2.07 0 3.98.82 5.5 2 1.52-1.18 3.43-2 5.5-2 1.45 0 2.81.4 4.02 1.04q.24.12.48.12c.52 0 1-.41 1-.99V6.08c0-.37-.2-.72-.53-.88M10 16.62C8.86 16.21 7.69 16 6.5 16s-2.36.21-3.5.62V6.71C4.11 6.24 5.28 6 6.5 6c1.2 0 2.39.25 3.5.72zM19 .5l-5 5V15l5-4.5z"
    ]
  },
  "contact": {
    "name": "AlternateEmailOutlined",
    "paths": [
      "M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10m0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3"
    ]
  }
};

export default function SectionIcon({ section, className = "" }) {
  const icon = ICONS[section];
  if (!icon) return null;
  return (
    <svg className={`section-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" data-material-icon={icon.name}>
      {icon.paths.map((path) => <path key={path} d={path} />)}
    </svg>
  );
}
