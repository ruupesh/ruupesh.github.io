import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const Certifications = () => {
  const { certifications } = usePortfolio();

  return (
    <section id="certifications" className="section certifications">
      <div className="section-container">
        <div className="section-header">
          <h2>Certifications</h2>
          <p>Professional certifications and achievements</p>
        </div>
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            cert.url ? (
              <a
                key={index}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card fade-in cert-link"
              >
                <div className="cert-icon">🏆</div>
                <span>{cert.name}</span>
                <div className="external-link-icon">🔗</div>
              </a>
            ) : (
              <div key={index} className="cert-card fade-in">
                <div className="cert-icon">🏆</div>
                <span>{cert.name}</span>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;