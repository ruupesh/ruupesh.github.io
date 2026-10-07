import SectionIcon from "./SectionIcon";
import useScrollReveal from "../hooks/useScrollReveal";
import { navigateTo } from "../utils/navigate";

const OUTCOMES = [
  { before: "50%", after: "99%", label: "GenAI response accuracy", context: "Hashedin by Deloitte · Prompt engineering for a Fortune 500-facing ITSM application.", roleIndex: 1 },
  { after: "400k+", label: "Users served", context: "Hashedin by Deloitte · Two auto-scaling, LLM-powered RAG chatbot applications.", roleIndex: 1 },
  { before: "8 hours", after: "<5 min", label: "ETL processing time", context: "CLSA · A high-performance ETL system built with Python, Pandas and Oracle SQL.", roleIndex: 2 },
];
export default function Impact() {
  const ref = useScrollReveal();
  return (
    <section className="impact-section" id="impact" ref={ref} aria-labelledby="impact-heading">
      <div className="section-container">
        <div className="impact-intro gsap-reveal"><div><p className="subtitle section-kicker impact-kicker"><SectionIcon section="impact" />Impact</p><h2 id="impact-heading">Curiosity is the start.<br /><em>Here’s where it led.</em></h2></div><p>A few outcomes from the work.<br />Every number has a story.</p></div>
        <div className="impact-grid">{OUTCOMES.map((outcome) => <a className="impact-item gsap-reveal" href={`#role-${outcome.roleIndex}`} key={outcome.label} onClick={(event) => { event.preventDefault(); navigateTo({ section: "experience", roleIndex: outcome.roleIndex }); }}><div className="impact-number">{outcome.before && <><span className="impact-before">{outcome.before}</span><span className="impact-arrow" aria-hidden="true">→</span></>}<strong>{outcome.after}</strong></div><h3>{outcome.label}</h3><p>{outcome.context}</p><span className="impact-source">The story behind it <span aria-hidden="true">↗</span></span></a>)}</div>
      </div>
    </section>
  );
}
