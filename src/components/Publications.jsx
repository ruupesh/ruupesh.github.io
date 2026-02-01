import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const Publications = () => {
  const { publications } = usePortfolio();

  return (
    <section id="publications" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>Publications</h2>
        </div>
        <div className="publications-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {publications.map((pub, i) => (
            <a
              key={i}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-card reveal"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(6, 182, 212, 0.05))',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                padding: '1.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.3 }}>
                  {pub.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {pub.description}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(139, 92, 246, 0.1)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>
                  {pub.platform}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {pub.date}
                </span>
                <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
