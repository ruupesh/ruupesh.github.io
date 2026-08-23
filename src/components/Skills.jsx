import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  Terminal, Neural, Agent, Server, Layout, Cloud, Architecture, Chart, Tag,
} from "./icons";

const CATEGORY_META = {
  languages: { Icon: Terminal, color: "#00f0ff", label: "Languages" },
  genai: { Icon: Neural, color: "#8b5cf6", label: "Gen AI" },
  agenticai: { Icon: Agent, color: "#00ff88", label: "Agentic AI" },
  backend: { Icon: Server, color: "#f59e0b", label: "Backend" },
  frontend: { Icon: Layout, color: "#ec4899", label: "Frontend" },
  cloud: { Icon: Cloud, color: "#3b82f6", label: "Cloud & DevOps" },
  engineering: { Icon: Architecture, color: "#14b8a6", label: "Engineering" },
  data: { Icon: Chart, color: "#f97316", label: "Data" },
};

export default function Skills() {
  const { skills } = usePortfolio();
  const revealRef = useScrollReveal();

  if (!skills) return null;

  const categories = Object.entries(skills);

  return (
    <section id="skills" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="02">
          <p className="subtitle gsap-reveal">Tech Stack</p>
          <h2 className="gsap-reveal">Skills & Expertise</h2>
        </div>

        <div className="skills-grid">
          {categories.map(([key, items]) => {
            const meta = CATEGORY_META[key] || { Icon: Tag, color: "#00f0ff", label: key };
            const { Icon } = meta;
            return (
              <div
                className="skill-category gsap-reveal"
                key={key}
                style={{ "--cat-color": meta.color }}
              >
                <div className="cat-header">
                  <div className="cat-icon-wrapper">
                    <span className="cat-icon"><Icon /></span>
                  </div>
                  <div className="cat-title-wrapper">
                    <h3>{meta.label}</h3>
                    <span className="skill-count">{items.length} skills</span>
                  </div>
                </div>
                <div className="skill-tags-wrapper">
                  {items.map((skill) => (
                    <span className="skill-tag" key={skill}>
                      <span className="skill-name">{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
