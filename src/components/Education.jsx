import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";
import { GraduationCap, Calendar, Medal } from "./icons";

export default function Education() {
  const { education } = usePortfolio();
  const revealRef = useScrollReveal();

  if (!education || education.length === 0) return null;
  const edu = education[0];

  const cgpaLine = edu.achievements?.find((a) => a.toLowerCase().includes("cgpa"));
  const honorsLine = edu.achievements?.find((a) => a.toLowerCase().includes("honors"));

  return (
    <section id="education" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="04">
          <p className="subtitle gsap-reveal">Academic Background</p>
          <h2 className="gsap-reveal">Education</h2>
        </div>

        <div className="education-card gsap-reveal">
          <div className="edu-header-wrapper">
            <div className="university-badge">
              <span className="university-icon"><GraduationCap /></span>
              <span className="university-initial">SPPU</span>
            </div>
            <div className="edu-info">
              <h3 className="degree-title">{edu.degree}</h3>
              <span className="edu-field">{edu.field}</span>
              <span className="university-name">{edu.institution}</span>
              <div className="edu-date">
                <span className="date-icon"><Calendar /></span>
                <span>{edu.year}</span>
              </div>
            </div>
          </div>

          <div className="edu-achievements">
            {cgpaLine && (
              <div className="cgpa-highlight">
                <div className="cgpa-label">CGPA</div>
                <div className="cgpa-value">{cgpaLine.replace("CGPA: ", "")}</div>
              </div>
            )}
            {honorsLine && (
              <div className="honors-badge">
                <span className="honors-icon"><Medal /></span>
                <span className="honors-text">{honorsLine}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
