import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const Skills = () => {
  const { skills } = usePortfolio();

  const skillCategories = [
    {
      name: "Programming Languages",
      icon: "💻",
      list: skills.languages,
      color: "var(--primary)",
      emphasis: "core",
    },
    {
      name: "GenAI",
      icon: "🤖",
      list: skills.genai,
      color: "#10b981",
      emphasis: "primary",
    },
    {
      name: "AgenticAI",
      icon: "🧠",
      list: skills.agenticai,
      color: "#f59e0b",
      emphasis: "primary",
    },
    {
      name: "Backend & APIs",
      icon: "⚙️",
      list: skills.backend,
      color: "var(--secondary)",
      emphasis: "core",
    },
    {
      name: "Cloud & DevOps",
      icon: "☁️",
      list: skills.cloud,
      color: "#0ea5e9",
      emphasis: "core",
    },
    {
      name: "Frontend",
      icon: "🎨",
      list: skills.frontend,
      color: "#ec4899",
      emphasis: "secondary",
    },
    {
      name: "Financial Skills",
      icon: "💰",
      list: skills.financial,
      color: "#22c55e",
      emphasis: "secondary",
    },
    {
      name: "Software Engineering",
      icon: "🛠️",
      list: skills.engineering,
      color: "#8b5cf6",
      emphasis: "core",
    },
    {
      name: "Data",
      icon: "📈",
      list: skills.data,
      color: "#14b8a6",
      emphasis: "secondary",
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>Technical Arsenal</h2>
        </div>
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.name}
              className={`skill-category reveal ${cat.emphasis}`}
              data-emphasis={cat.emphasis}
              style={{ "--cat-color": cat.color }}
            >
              <div className="cat-header">
                <div
                  className="cat-icon-wrapper"
                  style={{ "--cat-color": cat.color }}
                >
                  <span className="cat-icon">{cat.icon}</span>
                </div>
                <div className="cat-title-wrapper">
                  <h3>{cat.name}</h3>
                  <span className="skill-count">{cat.list.length} skills</span>
                </div>
              </div>
              <div className="skill-tags-wrapper">
                {cat.list.map((skill, index) => (
                  <div
                    key={skill}
                    className="skill-tag"
                  >
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;