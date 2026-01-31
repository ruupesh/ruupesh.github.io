import React from "react";
import { PortfolioProvider } from "./context/PortfolioContext";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import About from "./components/About";

import Navbar from "./components/Navbar";
import BackgroundEffects from "./components/BackgroundEffects";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

function App() {
  return (
    <PortfolioProvider>
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Achievements />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </PortfolioProvider>
  );
}

export default App