import SectionIcon from "./SectionIcon";
import InkTrace from "./InkTrace";
import { usePortfolio } from "../context/usePortfolio";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Achievements() {
  const { certifications, awards } = usePortfolio();
  const revealRef = useScrollReveal();

  return (
    <section id="achievements" className="section recognition-section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="06">
          <p className="subtitle section-kicker gsap-reveal"><SectionIcon section="achievements" />Recognition & Credentials</p>
          <h2 className="gsap-reveal">Achievements</h2>
          <InkTrace />
        </div>
        <div className="recognition-layout">
          {certifications?.length > 0 && (
            <div className="recognition-credentials gsap-reveal">
              <div className="recognition-group-heading">
                <h3>Certifications</h3>
                <span>{certifications.length} earned</span>
              </div>
              <ol className="recognition-certificate-list">
                {certifications.map((certificate, index) => (
                  <li className="recognition-certificate" key={certificate.name}>
                    <span className="recognition-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{certificate.name}</h4>
                      {certificate.url ? (
                        <a href={certificate.url} target="_blank" rel="noopener noreferrer">
                          Verify Credential
                          <span className="recognition-sr-only">: {certificate.name}</span>
                        </a>
                      ) : <span className="recognition-complete">Completed</span>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {awards?.length > 0 && (
            <aside className="recognition-awards gsap-reveal" aria-labelledby="recognition-awards-title">
              <div className="recognition-awards-mark" aria-hidden="true"><SectionIcon section="awards" /></div>
              <div className="recognition-group-heading">
                <h3 id="recognition-awards-title">Awards</h3>
                <span>{awards.length} received</span>
              </div>
              <ul>
                {awards.map((award) => <li key={award}>{award}</li>)}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
