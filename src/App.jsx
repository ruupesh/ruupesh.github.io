import { lazy, Suspense } from "react";
import { PortfolioProvider } from "./context/PortfolioContext";
import NeuralBackground from "./components/NeuralBackground";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import TraceRail from "./components/TraceRail";
import Hero from "./components/Hero";

const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Achievements = lazy(() => import("./components/Achievements"));
const Projects = lazy(() => import("./components/Projects"));
const Publications = lazy(() => import("./components/Publications"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Chatbot = lazy(() => import("./components/Chatbot"));

function App() {
  return (
    <PortfolioProvider>
      <SmoothScroll>
        <NeuralBackground />
        <Navbar />
        <TraceRail />
        {/* Single main landmark wrapping the page content. */}
        <main id="main">
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Skills />
            <Experience />
            <Education />
            <Achievements />
            <Projects />
            <Publications />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <Chatbot />
        </Suspense>
      </SmoothScroll>
    </PortfolioProvider>
  );
}

export default App;