import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const Education = () => {
  const { education } = usePortfolio();

  return (
    <section id="education" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>Education</h2>
        </div>
        <div className="timeline">
          {education.map((edu, i) => {
            const universityInitial = edu.institution
              .split(" ")
              .map((w) => w.charAt(0))
              .join("")
              .substring(0, 4);

            const cgpaMatch = edu.achievements?.find((a) =>
              a.toLowerCase().includes("cgpa")
            );
            const honorsMatch = edu.achievements?.find((a) =>
              a.toLowerCase().includes("honors")
            );

            return (
              <div
                key={edu.institution}
                className="education-card reveal"
              >
                <div className="edu-header-wrapper">
                  <div className="university-badge">
                    <span className="university-icon">🎓</span>
                    <span className="university-initial">{universityInitial}</span>
                  </div>
                  <div className="edu-info">
                    <div className="degree-wrapper">
                      <div className="degree-title">{edu.degree}</div>
                      <div className="edu-field">{edu.field}</div>
                    </div>
                    <div className="university-name">{edu.institution}</div>
                    <div className="edu-date">
                      <span className="date-icon">📅</span> {edu.year}
                    </div>
                  </div>
                </div>

                <div className="edu-achievements">
                  {cgpaMatch ? (
                    <div className="cgpa-highlight">
                      <div className="cgpa-label">Academic Excellence</div>
                      <div className="cgpa-value">{cgpaMatch}</div>
                    </div>
                  ) : null}

                  {honorsMatch ? (
                    <div className="honors-badge">
                      <span className="honors-icon">⭐</span>
                      <span className="honors-text">{honorsMatch}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;