import React, { useEffect, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

const Hero = () => {
  const { personal } = usePortfolio();

  // Typing effect phrases (parity with styles/main.js)
  const phrases = [
    "AI-Enabled Software Engineer",
    "GenAI Specialist",
    "Full-Stack Developer",
    "Cloud Architecture Expert",
  ];

  const [typed, setTyped] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const atWordEnd = !isDeleting && charIndex === current.length;
    const atWordStart = isDeleting && charIndex === 0;

    const typeSpeed = isDeleting ? 50 : 100;
    const delay = atWordEnd ? 2000 : atWordStart ? 500 : typeSpeed;

    const timer = setTimeout(() => {
      if (atWordEnd) {
        setIsDeleting(true);
      } else if (atWordStart) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      } else {
        const nextIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        setTyped(current.substring(0, nextIndex));
        setCharIndex(nextIndex);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  // Kick off typing on mount
  useEffect(() => {
    if (typed.length === 0 && !isDeleting) {
      setTyped(phrases[0].substring(0, 1));
      setCharIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <span className="hero-badge">Available for Collaboration</span>
        <h1>{personal.name}</h1>
        <p className="subtitle typing">{typed || phrases[0]}</p>
        <p className="hero-description">
          Transforming complex AI requirements into production-grade solutions. Specialized in Backend Development, GenAI, Agentic Systems, and Cloud-Native Architecture.
        </p>
        <div className="hero-buttons">
          <a href="/projects" className="btn btn-primary">My Work</a>
          <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">📄 Download Resume</a>
          <a href="/contact" className="btn btn-outline">Contact Me</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;