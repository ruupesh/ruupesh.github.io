import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const Awards = () => {
  const { awards } = usePortfolio();

  return (
    <section id="awards" className="section awards">
      <div className="section-container">
        <div className="section-header">
          <h2>Awards & Achievements</h2>
          <p>Recognition for exceptional performance and contributions</p>
        </div>
        <div className="awards-grid">
          {awards.map((award, index) => (
            <div key={index} className="award-card fade-in">
              <div className="award-icon">⭐</div>
              <span>{award}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;