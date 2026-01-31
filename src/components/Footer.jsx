import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const Footer = () => {
  const { personal } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2rem",
        color: "var(--text-muted)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p>&copy; {year} {personal.name}. Crafted with Code.</p>
    </footer>
  );
};

export default Footer;