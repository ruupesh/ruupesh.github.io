/** A small pencil stroke, rather than another decorative symbol. */
export default function InkTrace({ portrait = false }) {
  return (
    <svg className={`ink-trace${portrait ? " ink-trace-portrait" : ""}`} viewBox="0 0 160 18" fill="none" aria-hidden="true" focusable="false">
      <path d={portrait ? "M4 11C35 5 82 13 119 8S155 7 151 12C148 16 132 15 128 11" : "M3 11C40 6 89 13 156 8"} />
      <path d="M14 15C49 12 81 15 119 13" />
    </svg>
  );
}
