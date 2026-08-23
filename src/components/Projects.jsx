import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";
import ProjectDetail from "./ProjectDetail";

export default function Projects() {
  const { projects } = usePortfolio();
  const revealRef = useScrollReveal();
  const [open, setOpen] = useState(null); // { index, rect }

  if (!projects || projects.length === 0) return null;

  const openProject = (index) => (event) => {
    // The card is both the FLIP origin and where focus returns to.
    // Safari doesn't focus a button on click, so keep the node rather
    // than trusting document.activeElement later.
    const el = event.currentTarget;
    setOpen({ index, rect: el.getBoundingClientRect(), el });
  };

  return (
    <section id="projects" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="06">
          <p className="subtitle gsap-reveal">What I've Built</p>
          <h2 className="gsap-reveal">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            // The two lead projects are the flagship tier — a hiring manager
            // should be able to see which work matters most without reading.
            <button
              type="button"
              className={`project-card gsap-reveal${idx < 2 ? " is-flagship" : ""}`}
              key={project.name}
              onClick={openProject(idx)}
              aria-haspopup="dialog"
            >
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

              <span className="project-open" aria-hidden="true">Open</span>
            </button>
          ))}
        </div>
      </div>

      {open != null && (
        <ProjectDetail
          project={projects[open.index]}
          originRect={open.rect}
          originEl={open.el}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
