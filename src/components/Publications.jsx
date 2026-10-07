import SectionIcon from "./SectionIcon";
import { usePortfolio } from "../context/usePortfolio";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Publications() {
  const { publications } = usePortfolio();
  const revealRef = useScrollReveal();
  if (!publications?.length) return null;

  return (
    <section id="publications" className="section reading-section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="07">
          <p className="subtitle section-kicker gsap-reveal"><SectionIcon section="publications" />Thinking out loud</p>
          <h2 className="gsap-reveal">Notes from<br /><em>the rabbit hole.</em></h2>
        </div>
        <div className="reading-list">
          {publications.map((publication, index) => (
            <article className="reading-entry gsap-reveal" key={publication.url}>
              <div className="reading-meta">
                <span className="reading-number" aria-hidden="true">({String(index + 1).padStart(2, "0")})</span>
                <span>{publication.platform}</span>
                {publication.date && <span>{publication.date}</span>}
              </div>
              <div className="reading-content">
                <h3>
                  <a href={publication.url} target="_blank" rel="noopener noreferrer">
                    {publication.title}<span className="reading-arrow" aria-hidden="true">↗</span>
                  </a>
                </h3>
                <p>{publication.description}</p>
                <a className="reading-link" href={publication.url} target="_blank" rel="noopener noreferrer">
                  Read article <span aria-hidden="true">↗</span>
                  <span className="recognition-sr-only">: {publication.title}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
