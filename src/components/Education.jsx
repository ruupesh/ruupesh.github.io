import SectionIcon from "./SectionIcon";
import InkTrace from "./InkTrace";
import { usePortfolio } from "../context/usePortfolio";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Education() {
  const { education } = usePortfolio();
  const revealRef = useScrollReveal();
  if (!education?.length) return null;

  return (
    <section id="education" className="section academic-section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="05">
          <p className="subtitle section-kicker gsap-reveal"><SectionIcon section="education" />Academic Background</p>
          <h2 className="gsap-reveal">Education</h2>
          <InkTrace />
        </div>
        <div className="academic-records">
          {education.map((entry) => (
            <article className="academic-record gsap-reveal" key={`${entry.institution}-${entry.degree}`}>
              <div className="academic-main">
                <span className="academic-date">{entry.year}</span>
                <h3>{entry.degree}</h3>
                <p className="academic-field">{entry.field}</p>
                <p className="academic-institution">{entry.institution}</p>
              </div>
              {entry.achievements?.length > 0 && (
                <ul className="academic-achievements">
                  {entry.achievements.map((achievement) => {
                    const isGrade = /^CGPA:\s*/i.test(achievement);
                    return (
                      <li key={achievement} className={isGrade ? "academic-grade" : "academic-honors"}>
                        {isGrade ? (
                          <>
                            <span className="academic-grade-label">CGPA:</span>
                            <span className="academic-grade-value">{achievement.replace(/^CGPA:\s*/i, "")}</span>
                          </>
                        ) : (
                          <><span>{achievement}</span></>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
