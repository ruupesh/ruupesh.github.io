import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const About = () => {
  const { personal } = usePortfolio();

  return (
    <section id="about" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>About Me</h2>
          <p className="subtitle">Transforming Ideas into Reality</p>
        </div>

        <div className="about-content">
          <div className="about-text reveal">
            <p>
              <span className="highlight">AI-enabled Software Engineer</span> with{" "}
              <span className="highlight">3.5+ years</span> of experience building and shipping end-to-end backend and{" "}
              <span className="highlight">AgenticAI solutions</span> using diverse Python frameworks.
            </p>
            <p>
              Experienced in rapidly developing <span className="highlight">microservices</span>,{" "}
              <span className="highlight">event-driven architectures</span>, and{" "}
              <span className="highlight">multi-agent GenAI systems</span> on cloud-native infrastructure.
            </p>
            <p>
              Comfortable owning features from design to production, integrating <span className="highlight">LLMs</span>,{" "}
              <span className="highlight">APIs</span>, frontend components, and{" "}
              <span className="highlight">DevOps pipelines</span> to deliver scalable products.
            </p>
          </div>

          <div className="stats-showcase">
            <div className="stat-card tilt-card reveal" data-tilt>
              <div className="stat-icon">💼</div>
              <div className="stat-number" data-target="3.5">0</div>
              <div className="stat-label">Years Experience</div>
              <div className="stat-glow"></div>
            </div>
            <div className="stat-card tilt-card reveal" data-tilt>
              <div className="stat-icon">🚀</div>
              <div className="stat-number" data-target="5">0</div>
              <div className="stat-label">Projects Delivered</div>
              <div className="stat-glow"></div>
            </div>
            <div className="stat-card tilt-card reveal" data-tilt>
              <div className="stat-icon">🎯</div>
              <div className="stat-number" data-target="99">0</div>
              <div className="stat-label">Accuracy Rate using Prompt Engineering</div>
              <div className="stat-glow"></div>
            </div>
            <div className="stat-card tilt-card reveal" data-tilt>
              <div className="stat-icon">⚡</div>
              <div className="stat-number" data-target="50">0</div>
              <div className="stat-label">Faster with AI Tools</div>
              <div className="stat-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;