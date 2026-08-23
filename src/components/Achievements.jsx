import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";
import { Star, Target, Rocket, Trophy, Certificate, Check } from "./icons";

const VENDOR_COLORS = {
  Amazon: "#ff9900",
  Google: "#4285f4",
  Anthropic: "#d4a574",
  "Hashedin By Deloitte": "#86bc25",
};

function getVendor(certName) {
  const match = certName.match(/\(([^)]+)\)\s*$/);
  return match ? match[1] : "";
}

function getAwardType(text) {
  const lower = text.toLowerCase();
  if (lower.includes("star")) return { Icon: Star, type: "star" };
  if (lower.includes("spot")) return { Icon: Target, type: "spot" };
  if (lower.includes("impactor")) return { Icon: Rocket, type: "impactor" };
  return { Icon: Trophy, type: "" };
}

export default function Achievements() {
  const { certifications, awards } = usePortfolio();
  const revealRef = useScrollReveal();

  return (
    <section id="achievements" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="05">
          <p className="subtitle gsap-reveal">Recognition & Credentials</p>
          <h2 className="gsap-reveal">Achievements</h2>
        </div>

        <div className="achievements-wrapper">
          {/* Certifications */}
          {certifications?.length > 0 && (
            <div className="gsap-reveal">
              <div className="section-title-badge">
                <span className="badge-icon"><Certificate /></span>
                <h3>Certifications</h3>
                <span className="cert-count">{certifications.length} earned</span>
              </div>

              <div className="certifications-grid">
                {certifications.map((cert, i) => {
                  const vendor = getVendor(cert.name);
                  const vendorColor = VENDOR_COLORS[vendor] || "#00f0ff";
                  const cleanName = cert.name.replace(/\s*\([^)]+\)\s*$/, "");

                  return (
                    <div
                      className="cert-card"
                      key={i}
                      style={{ "--vendor-color": vendorColor }}
                    >
                      <div className="cert-vendor">
                        <span className="vendor-badge">{vendor || "Cert"}</span>
                      </div>
                      <div className="cert-content">
                        <h4 className="cert-name">{cleanName}</h4>
                        {cert.url ? (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cert-link"
                          >
                            Verify Credential <span className="link-arrow">→</span>
                          </a>
                        ) : (
                          <span className="cert-verified"><Check /> Completed</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Awards */}
          {awards?.length > 0 && (
            <div className="gsap-reveal">
              <div className="section-title-badge">
                <span className="badge-icon"><Trophy /></span>
                <h3>Awards</h3>
                <span className="cert-count">{awards.length} received</span>
              </div>

              <div className="awards-grid">
                {awards.map((award, i) => {
                  const { Icon, type } = getAwardType(award);
                  return (
                    <div className={`award-card${type ? ` ${type}` : ""}`} key={i}>
                      <div className="award-icon-wrapper">
                        <span className="award-icon"><Icon /></span>
                      </div>
                      <p className="award-text">{award}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
