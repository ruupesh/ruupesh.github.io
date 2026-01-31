import React from "react";

const Stats = () => {
  const stats = [
    { number: "3.5+", label: "Years Experience" },
    { number: "5+", label: "Projects Delivered" },
    { number: "5+", label: "Certifications" },
    { number: "4", label: "Awards Won" },
  ];

  return (
    <div className="about-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card fade-in">
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;