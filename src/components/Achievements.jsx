import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const vendorColor = (vendor) => {
  if (!vendor) return "#06b6d4";
  if (/amazon|aws/i.test(vendor)) return "#FF9900";
  if (/google/i.test(vendor)) return "#4285F4";
  if (/anthropic/i.test(vendor)) return "#8b5cf6";
  if (/deloitte/i.test(vendor)) return "#86BC25";
  return "#06b6d4";
};

const Achievements = () => {
  const { certifications, awards } = usePortfolio();

  const parsedCerts = certifications.map((cert) => {
    const vendorMatch = cert.name.match(/\(([^)]+)\)/);
    const vendor = vendorMatch ? vendorMatch[1] : "Professional";
    const name = cert.name.replace(/\s*\([^)]+\)\s*/, "");
    return {
      vendor,
      name,
      url: cert.url,
      color: vendorColor(vendor),
    };
  });

  const getAwardType = (text) => {
    if (/Star Award/i.test(text)) return { type: "star", icon: "⭐" };
    if (/Spot Award/i.test(text)) return { type: "spot", icon: "💎" };
    if (/Top Impactor/i.test(text)) return { type: "impactor", icon: "🚀" };
    return { type: "recognition", icon: "🏅" };
  };

  return (
    <section id="achievements" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>Certifications & Awards</h2>
        </div>

        <div className="achievements-wrapper">
          {/* Certifications */}
          <div className="certifications-section reveal">
            <div className="section-title-badge">
              <span className="badge-icon">📜</span>
              <h3>Professional Certifications</h3>
              <span className="cert-count">{parsedCerts.length} Certifications</span>
            </div>
            <div className="certifications-grid">
              {parsedCerts.map((cert, idx) => (
                <div
                  key={`${cert.name}-${idx}`}
                  className="cert-card"
                >
                  <div
                    className="cert-vendor"
                    style={{ ["--vendor-color"]: cert.color }}
                  >
                    <span className="vendor-badge">{cert.vendor}</span>
                  </div>
                  <div className="cert-content">
                    <div className="cert-name">{cert.name}</div>
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                      >
                        <span>View Credential</span>
                        <span className="link-arrow">→</span>
                      </a>
                    ) : (
                      <div className="cert-verified">✓ Verified</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="awards-section reveal">
            <div className="section-title-badge">
              <span className="badge-icon">🏆</span>
              <h3>Awards & Recognition</h3>
              <span className="cert-count">{awards.length} Awards</span>
            </div>
            <div className="awards-grid">
              {awards.map((award, idx) => {
                const { type, icon } = getAwardType(award);
                return (
                  <div
                    key={`${type}-${idx}`}
                    className={`award-card ${type}`}
                  >
                    <div className="award-icon-wrapper">
                      <span className="award-icon">{icon}</span>
                    </div>
                    <div className="award-text">{award}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;