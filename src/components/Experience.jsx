import SectionIcon from "./SectionIcon";
import InkTrace from "./InkTrace";
import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "../context/usePortfolio";
import useScrollReveal from "../hooks/useScrollReveal";
import { NAV_EVENT } from "../utils/navigate";

const COMPANY_URLS = {
  "Electronic Arts": "https://www.ea.com",
  "Hashedin by Deloitte": "https://hashedin.com",
  CLSA: "https://www.clsa.com",
  "Persistent Systems": "https://www.persistent.com",
};

export default function Experience() {
  const { experience } = usePortfolio();
  const revealRef = useScrollReveal();
  const rolesRef = useRef([]);
  const [highlighted, setHighlighted] = useState(null);

  useEffect(() => {
    const onNavigate = (event) => {
      const index = event.detail?.roleIndex;
      if (typeof index !== "number" || !rolesRef.current[index]) return;
      rolesRef.current[index].open = true;
      setHighlighted(index);
    };
    window.addEventListener(NAV_EVENT, onNavigate);
    return () => window.removeEventListener(NAV_EVENT, onNavigate);
  }, []);

  useEffect(() => {
    if (highlighted == null) return;
    const timeout = window.setTimeout(() => setHighlighted(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [highlighted]);

  if (!experience?.length) return null;

  return (
    <section id="experience" className="section career-section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="03">
          <p className="subtitle section-kicker gsap-reveal"><SectionIcon section="experience" />Career Journey</p>
          <h2 className="gsap-reveal">Experience<span className="career-heading-dot" aria-hidden="true">.</span></h2>
          <InkTrace />
        </div>

        <div className="career-ledger">
          {experience.map((entry, index) => {
            const isCurrent = entry.duration?.includes("Present");
            const companyUrl = COMPANY_URLS[entry.company];
            return (
              <details
                className={`career-entry gsap-reveal${highlighted === index ? " is-highlighted" : ""}`}
                id={`role-${index}`}
                key={`${entry.company}-${entry.duration}`}
                ref={(element) => { rolesRef.current[index] = element; }}
                open={isCurrent}
              >
                <summary className="career-summary">
                  <span className="career-period">{entry.duration}</span>
                  <span className="career-identity">
                    <span className="career-company">{entry.company}</span>
                    <span className="career-position">{entry.position}</span>
                  </span>
                  <span className="career-state">
                    {isCurrent && <span className="career-current"><span aria-hidden="true" />Current</span>}
                    <span className="career-toggle" aria-hidden="true"><span /><span /></span>
                  </span>
                </summary>
                <div className="career-details">
                  <div className="career-context">
                    <span>{entry.location}</span>
                    {companyUrl && (
                      <a href={companyUrl} target="_blank" rel="noopener noreferrer">
                        {entry.company}
                      </a>
                    )}
                  </div>
                  {entry.responsibilities?.length > 0 && (
                    <div className="career-contributions">
                      <h3>Key Contributions</h3>
                      <ul>
                        {entry.responsibilities.map((responsibility, responsibilityIndex) => (
                          <li key={responsibilityIndex}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
