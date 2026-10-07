import SectionIcon from "./SectionIcon";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePortfolio } from "../context/usePortfolio";
import useScrollReveal from "../hooks/useScrollReveal";
import ProjectDetail from "./ProjectDetail";
import { NAV_EVENT } from "../utils/navigate";

const LABELS = ["01 / GENERATIVE AI", "02 / AGENTIC SYSTEMS", "03 / DATA & INTELLIGENCE", "04 / FULLSTACK", "05 / DEVELOPER TOOLS", "06 / AUTOMATION"];
const METRICS = [{ value: "400k+", label: "users" }, { value: "MCP + A2A", label: "agent orchestration" }, { value: "1 month", label: "from concept to functional" }];

function ProjectSketch({ index }) {
  if (index === 0) return <div className="project-sketch rag-sketch" aria-hidden="true">
    <div className="diagram-caption">KNOWLEDGE, CONNECTED.</div>
    <svg viewBox="0 0 480 300" fill="none">
      <path d="M100 68H159V150H230M100 150H230M100 232H159V150M300 150H392" stroke="currentColor" opacity=".5" strokeWidth="1.3" className="diagram-path" />
      {[38, 120, 202].map((y, i) => <g key={y}><rect x="40" y={y} width="72" height="58" rx="3" fill="var(--paper)" stroke="currentColor" /><path d={`M57 ${y+18}H94M57 ${y+28}H94M57 ${y+38}H79`} stroke="currentColor" opacity=".4" /><text x="22" y={y+32} fontSize="9" textAnchor="end">0{i+1}</text></g>)}
      <rect x="221" y="111" width="79" height="79" rx="39.5" fill="var(--accent-soft)" stroke="currentColor" /><path d="M248 139L237 151L248 163M273 139L284 151L273 163M266 136L256 166" stroke="currentColor" strokeWidth="2" />
      <rect x="355" y="120" width="98" height="60" rx="6" fill="var(--paper)" stroke="currentColor" /><path d="M373 140H434M373 151H418M373 162H426" stroke="currentColor" opacity=".5" />
      <text x="260" y="220" textAnchor="middle">RAG</text><text x="404" y="207" textAnchor="middle">CONTEXT</text>
      <circle cx="180" cy="150" r="4" fill="currentColor" /><circle cx="325" cy="150" r="4" fill="currentColor" />
    </svg>
    <span className="diagram-footnote">ORGANIZATIONAL DATA → CONTEXT-AWARE ANSWERS</span>
  </div>;
  if (index === 1) return <div className="project-sketch agent-sketch" aria-hidden="true">
    <div className="diagram-caption">SPECIALISTS. ONE SYSTEM.</div>
    <svg viewBox="0 0 480 300" fill="none">
      <circle cx="240" cy="150" r="108" stroke="currentColor" opacity=".2" strokeDasharray="3 7" />
      <g stroke="currentColor" opacity=".55" className="diagram-path"><path d="M240 150L125 72M240 150L355 72M240 150L125 228M240 150L355 228M240 150H86M240 150H394" /></g>
      {[[125,72,"A2A"],[355,72,"MCP"],[125,228,"LLMs"],[355,228,"FastAPI"]].map(([x,y,label]) => <g key={label}><rect x={x-36} y={y-20} width="72" height="40" rx="3" fill="var(--paper-white)" stroke="currentColor" /><text x={x} y={y+4} textAnchor="middle">{label}</text></g>)}
      <circle cx="240" cy="150" r="43" fill="var(--ink)" /><text x="240" y="148" fill="var(--accent-soft)" textAnchor="middle" fontSize="10">MULTI-AGENT</text><text x="240" y="162" fill="var(--accent-soft)" textAnchor="middle" fontSize="10">SYSTEM</text>
      <circle cx="86" cy="150" r="7" fill="var(--accent-soft)" stroke="currentColor" /><circle cx="394" cy="150" r="7" fill="var(--accent-soft)" stroke="currentColor" />
    </svg>
    <span className="diagram-footnote">CONTEXT ENGINEERING × ORCHESTRATION</span>
  </div>;
  return <div className="project-sketch analytics-sketch" aria-hidden="true">
    <div className="diagram-caption">QUESTIONS INTO CLARITY.</div>
    <svg viewBox="0 0 480 300" fill="none">
      <rect x="52" y="38" width="376" height="222" rx="5" fill="var(--paper)" stroke="currentColor" /><path d="M52 70H428" stroke="currentColor" />
      <circle cx="68" cy="54" r="3" fill="currentColor" /><circle cx="79" cy="54" r="3" fill="currentColor" opacity=".4" /><circle cx="90" cy="54" r="3" fill="currentColor" opacity=".2" />
      <text x="410" y="58" textAnchor="end">SQL / CSV / GRAPHS</text>
      <path d="M82 222H398M82 180H398M82 138H398M82 96H398" stroke="currentColor" opacity=".1" />
      {[48,77,67,110,135,121,150].map((h,i) => <rect key={i} className="chart-bar" style={{"--bar-index":i}} x={88+i*44} y={222-h} width="27" height={h} rx="2" fill={i===6 ? "var(--ink)" : "var(--accent-soft)"} />)}
    </svg>
    <span className="diagram-footnote">NATURAL LANGUAGE → ANALYSIS</span>
  </div>;
}

export default function Projects() {
  const { projects } = usePortfolio();
  const ref = useScrollReveal();
  const cardRefs = useRef([]);
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    const onNavigate = ({ detail }) => {
      if (detail?.section !== "projects" || !detail.projectName) return;
      const index = projects.findIndex((project) => project.name === detail.projectName);
      if (index >= 0) setOpen({ index, el: cardRefs.current[index] });
    };
    window.addEventListener(NAV_EVENT, onNavigate);
    return () => window.removeEventListener(NAV_EVENT, onNavigate);
  }, [projects]);
  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="section-container">
        <div className="section-header project-section-heading" data-index="01">
          <div><p className="subtitle section-kicker gsap-reveal"><SectionIcon section="projects" />What I've Built</p><h2 className="gsap-reveal">Selected <em>work.</em></h2></div>
          <span className="section-side-note gsap-reveal">From a question<br />to something people use. <span>↙</span></span>
        </div>
        <div className="project-stack">
          {projects.slice(0,3).map((project,index) => <button type="button" ref={(el) => {cardRefs.current[index] = el;}} className={`project-feature project-feature-${index}`} key={project.name} style={{"--card-index":index}} onClick={(event) => setOpen({index,el:event.currentTarget})} aria-haspopup="dialog" aria-label={`Explore ${project.name}`}>
            <div className="project-info"><div className="project-kicker">{LABELS[index]}<span>↗</span></div><h3>{project.name}</h3><p className="project-description">{project.description}</p><div className="project-tags">{project.technologies.slice(0,4).map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}<span className="tech-tag">+{project.technologies.length-4}</span></div><div className="project-result"><div><strong>{METRICS[index].value}</strong><span>{METRICS[index].label}</span></div><span className="project-open">Explore project <span>↗</span></span></div></div>
            <ProjectSketch index={index} />
          </button>)}
        </div>
        <div className="more-projects-heading"><span className="eyebrow">MORE THINGS I'VE BUILT</span><span>04 — 06</span></div>
        <div className="projects-grid">{projects.slice(3).map((project,i) => { const index=i+3; return <button type="button" ref={(el) => {cardRefs.current[index]=el;}} className="project-card gsap-reveal" key={project.name} onClick={(event) => setOpen({index,el:event.currentTarget})} aria-haspopup="dialog"><div className="project-kicker">{LABELS[index]}<span>↗</span></div><h3>{project.name}</h3><p className="project-description">{project.description}</p><div className="project-tags">{project.technologies.slice(0,3).map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div><span className="project-card-outcome">{project.highlights[project.highlights.length-2]}</span><span className="project-open">Explore project <span>↗</span></span></button>; })}</div>
      </div>
      {open && <ProjectDetail project={projects[open.index]} originEl={open.el} onClose={close} index={open.index} />}
    </section>
  );
}
