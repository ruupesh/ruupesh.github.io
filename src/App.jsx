import { PortfolioProvider } from "./context/PortfolioContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Publications from "./components/Publications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AssistantLauncher from "./components/AssistantLauncher";
import ScrollMotion from "./components/ScrollMotion";
import Impact from "./components/Impact";
import AmbientBackground from "./components/AmbientBackground";

export default function App() {
  return (
    <PortfolioProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <AmbientBackground /><ScrollMotion />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero /><Impact /><Projects /><About /><Experience /><Skills />
        <Education /><Achievements /><Publications /><Contact />
      </main>
      <Footer />
      <AssistantLauncher />
    </PortfolioProvider>
  );
}
