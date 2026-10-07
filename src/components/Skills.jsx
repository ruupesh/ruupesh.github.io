import SectionIcon from "./SectionIcon";
import { usePortfolio } from "../context/usePortfolio";
import useScrollReveal from "../hooks/useScrollReveal";

const CATEGORY_LABELS = {
  languages: "Languages",
  genai: "Gen AI",
  agenticai: "Agentic AI",
  backend: "Backend",
  frontend: "Frontend",
  cloud: "Cloud & DevOps",
  engineering: "Engineering",
  data: "Data",
};

export default function Skills() {
  const { skills } = usePortfolio();
  const revealRef = useScrollReveal();
  if (!skills) return null;

  return (
    <section id="skills" className="section expertise-section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="04">
          <p className="subtitle section-kicker gsap-reveal"><SectionIcon section="skills" />Tech Stack</p>
          <h2 className="gsap-reveal">Skills &<br /> Expertise</h2>
        </div>
        <div className="expertise-matrix">
          {Object.entries(skills).map(([category, items], index) => (
            <div className="expertise-cell gsap-reveal" key={category}>
              <div className="expertise-category">
                <span className="expertise-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{CATEGORY_LABELS[category] || category}</h3>
                <span className="expertise-count">{items.length} skills</span>
              </div>
              <ul className="expertise-items">
                {items.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
