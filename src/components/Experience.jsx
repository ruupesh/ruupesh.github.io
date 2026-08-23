import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COMPANY_URLS = {
  "Electronic Arts": "https://www.ea.com",
  "Hashedin by Deloitte": "https://hashedin.com",
  CLSA: "https://www.clsa.com",
  "Persistent Systems": "https://www.persistent.com",
};

const hasMetric = (text) => /\d+%|\d+x|\d+\s*(hours?|minutes?|days?)|\d+K?\+?/i.test(text);

export default function Experience() {
  const { experience } = usePortfolio();
  const revealRef = useScrollReveal();
  const lineRef = useRef(null);

  // Timeline line fill animation
  useEffect(() => {
    if (!lineRef.current) return;
    const tween = gsap.to(lineRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: lineRef.current.parentElement,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      },
    });
    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, [experience]);

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header">
          <p className="subtitle gsap-reveal">Career Journey</p>
          <h2 className="gsap-reveal">Experience</h2>
        </div>

        <div className="timeline">
          <div className="timeline-line">
            <div className="timeline-line-fill" ref={lineRef} />
          </div>

          {experience.map((exp, idx) => {
            const isCurrent = idx === 0 && exp.duration?.includes("Present");
            const initial = exp.company?.charAt(0) || "?";
            const companyUrl = COMPANY_URLS[exp.company];

            return (
              <div className="timeline-item gsap-reveal" key={idx}>
                <div className={`timeline-dot${isCurrent ? " current" : ""}`} />
                <div className="timeline-content">
                  <div className="experience-header-wrapper">
                    <div className="company-badge">
                      <span className="company-initial">{initial}</span>
                    </div>
                    <div className="timeline-header">
                      <div className="role-info">
                        <div className="role-title-wrapper">
                          <h3 className="role-title">{exp.position}</h3>
                          {isCurrent && <span className="current-badge">Current</span>}
                        </div>
                        <span className="company-name">
                          {companyUrl ? (
                            <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="company-link">
                              {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )}
                        </span>
                        <div className="location-date">
                          <span className="location-icon">📍</span>
                          <span>{exp.location}</span>
                          <span className="date-separator">|</span>
                          <span className="timeline-date">{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {exp.responsibilities?.length > 0 && (
                    <div className="responsibilities-section">
                      <div className="resp-label">
                        <span className="resp-icon">💡</span>
                        Key Contributions
                      </div>
                      <div className="responsibility-list">
                        {exp.responsibilities.map((resp, ri) => (
                          <div className="responsibility-item" key={ri}>
                            <span className={`resp-bullet${hasMetric(resp) ? " metric" : ""}`} />
                            <span className="resp-text">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
