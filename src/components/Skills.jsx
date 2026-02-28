import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";

const CATEGORY_META = {
  languages: { icon: "💻", color: "#00f0ff", label: "Languages" },
  genai: { icon: "🧠", color: "#8b5cf6", label: "Gen AI" },
  agenticai: { icon: "🤖", color: "#00ff88", label: "Agentic AI" },
  backend: { icon: "⚙️", color: "#f59e0b", label: "Backend" },
  frontend: { icon: "🎨", color: "#ec4899", label: "Frontend" },
  cloud: { icon: "☁️", color: "#3b82f6", label: "Cloud & DevOps" },
  engineering: { icon: "🏗️", color: "#14b8a6", label: "Engineering" },
  data: { icon: "📊", color: "#f97316", label: "Data" },
};

export default function Skills() {
  const { skills } = usePortfolio();
  const revealRef = useScrollReveal();

  if (!skills) return null;

  const categories = Object.entries(skills);

  return (
    <section id="skills" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header">
          <p className="subtitle gsap-reveal">Tech Stack</p>
          <h2 className="gsap-reveal">Skills & Expertise</h2>
        </div>

        <div className="skills-grid">
          {categories.map(([key, items]) => {
            const meta = CATEGORY_META[key] || { icon: "📌", color: "#00f0ff", label: key };
            return (
              <div
                className="skill-category gsap-reveal"
                key={key}
                style={{ "--cat-color": meta.color }}
              >
                <div className="cat-header">
                  <div className="cat-icon-wrapper">
                    <span className="cat-icon">{meta.icon}</span>
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
