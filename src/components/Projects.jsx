import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Projects() {
  const { projects } = usePortfolio();
  const revealRef = useScrollReveal();

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header">
          <p className="subtitle gsap-reveal">What I've Built</p>
          <h2 className="gsap-reveal">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div className="project-card gsap-reveal" key={idx}>
              <div className="project-top">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-tags">
                  {project.technologies?.map((tech) => (
                    <span className="tech-tag" key={tech}>{tech}</span>
                  ))}
                </div>
              </div>

              {project.highlights?.length > 0 && (
                <div className="project-content">
                  <ul className="highlight-list">
                    {project.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
