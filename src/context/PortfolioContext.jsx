import { PortfolioContext } from "./usePortfolio";
import portfolioData from "../data.js";

export const PortfolioProvider = ({ children }) => (
  <PortfolioContext.Provider value={portfolioData}>{children}</PortfolioContext.Provider>
);
