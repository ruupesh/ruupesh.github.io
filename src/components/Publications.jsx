import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Publications() {
  const { publications } = usePortfolio();
  const revealRef = useScrollReveal();

  if (!publications || publications.length === 0) return null;

  return (
    <section id="publications" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header">
          <p className="subtitle gsap-reveal">Thought Leadership</p>
          <h2 className="gsap-reveal">Publications</h2>
        </div>

        <div className="publications-grid">
          {publications.map((pub, idx) => (
            <a
              className="publication-card gsap-reveal"
              key={idx}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <h3>{pub.title}</h3>
                <p className="pub-description">{pub.description}</p>
              </div>
              <div className="pub-footer">
                <div>
                  <span className="pub-platform">{pub.platform}</span>
                  {pub.date && <span className="pub-date"> · {pub.date}</span>}
                </div>
                <span className="pub-arrow">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
