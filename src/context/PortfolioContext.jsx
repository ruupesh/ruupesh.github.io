import React, { createContext, useContext } from "react";
import portfolioData from "../data.js";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const data = portfolioData || {};
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);