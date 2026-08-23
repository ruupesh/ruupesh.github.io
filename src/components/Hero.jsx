import { useEffect, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { gsap } from "gsap";
import DenoiseText from "./DenoiseText";
import Typewriter from "./Typewriter";
import { prefersReducedMotion } from "../utils/motion";

const ROLES = [
  "AI & Backend Engineer",
  "Building Agentic AI Systems",
  "Prompt Engineering Expert",
  "Cloud-Native Developer",
];

const NAME_DENOISE_DELAY = 260;
const NAME_DENOISE_DURATION = 1150;

export default function Hero() {
  const { personal } = usePortfolio();
  const sectionRef = useRef(null);

  // Entrance. The name is handled by DenoiseText; everything else
  // settles around it.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const els = {
      badge: root.querySelector(".hero-badge"),
      subtitle: root.querySelector(".hero-subtitle"),
      typing: root.querySelector(".typing-wrapper"),
      desc: root.querySelector(".hero-description"),
      btns: root.querySelectorAll(".hero-buttons .btn"),
      scroll: root.querySelector(".scroll-indicator"),
    };

    const targets = [
      els.badge,
      els.subtitle,
      els.typing,
      els.desc,
      ...(els.btns || []),
      els.scroll,
    ].filter(Boolean);

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      if (els.scroll) gsap.set(els.scroll, { opacity: 0.4 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.2 });
    if (els.badge) tl.to(els.badge, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    // Held back so the name has resolved before the supporting copy lands.
    if (els.subtitle) tl.to(els.subtitle, { opacity: 1, y: 0, duration: 0.6 }, 1.05);
    if (els.typing) tl.to(els.typing, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");
    if (els.desc) tl.to(els.desc, { opacity: 1, y: 0, duration: 0.6 }, "-=0.25");
    if (els.btns?.length) tl.to(els.btns, { opacity: 1, y: 0, stagger: 0.09, duration: 0.5 }, "-=0.3");
    if (els.scroll) tl.to(els.scroll, { opacity: 0.4, y: 0, duration: 0.5 }, "-=0.15");

    return () => tl.kill();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-content">
        <div className="hero-badge">Open to Opportunities</div>

        <h1 className="hero-name">
          <DenoiseText
            text={personal?.name || "Rupesh Bodkhe"}
            delay={NAME_DENOISE_DELAY}
            duration={NAME_DENOISE_DURATION}
          />
        </h1>

        <p className="hero-subtitle">{personal?.title || "AI & Backend Engineer"}</p>

        <div className="typing-wrapper">
          <Typewriter phrases={ROLES} />
        </div>

        <p className="hero-description">
            Transforming complex AI requirements into production-grade solutions. Specialized in Backend Development, GenAI, Agentic Systems, and Cloud-Native Architecture.
        </p>

        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary" onClick={scrollTo("contact")}>
            Get in Touch
          </a>
          <a href="#experience" className="btn btn-outline" onClick={scrollTo("experience")}>
            View Experience
          </a>
          {personal?.resumeUrl && (
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Resume ↗
            </a>
          )}
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="chevron" />
      </div>
    </section>
  );
}
