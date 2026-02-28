import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { gsap } from "gsap";
import SplitType from "split-type";

const ROLES = [
  "AI & Backend Engineer",
  "Building Agentic AI Systems",
  "Prompt Engineering Expert",
  "Cloud-Native Developer",
];

export default function Hero() {
  const { personal } = usePortfolio();
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    const els = {
      badge: sectionRef.current?.querySelector(".hero-badge"),
      name: nameRef.current,
      subtitle: sectionRef.current?.querySelector(".hero-subtitle"),
      typing: sectionRef.current?.querySelector(".typing-wrapper"),
      desc: sectionRef.current?.querySelector(".hero-description"),
      btns: sectionRef.current?.querySelectorAll(".hero-buttons .btn"),
      scroll: sectionRef.current?.querySelector(".scroll-indicator"),
    };

    const targets = [els.badge, els.subtitle, els.typing, els.desc, ...(els.btns || []), els.scroll].filter(Boolean);
    gsap.set(targets, { opacity: 0, y: 20 });

    // SplitType character reveal for name
    let split;
    if (els.name) {
      split = new SplitType(els.name, { types: "chars" });
      // Style each char for hover interaction
      split.chars.forEach((ch) => {
        ch.style.display = "inline-block";
        ch.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s, text-shadow 0.3s";
        ch.style.cursor = "default";
        ch.addEventListener("mouseenter", () => {
          gsap.to(ch, { y: -12, scale: 1.15, color: "#a0d8ef", textShadow: "0 0 16px rgba(0,200,240,0.35), 0 0 32px rgba(0,200,240,0.15)", duration: 0.25, ease: "back.out(1.7)" });
        });
        ch.addEventListener("mouseleave", () => {
          gsap.to(ch, { y: 0, scale: 1, color: "", textShadow: "", duration: 0.4, ease: "power2.out" });
        });
      });
      gsap.set(split.chars, { opacity: 0, y: 50 });
    }

    const tl = gsap.timeline({ delay: 0.3 });
    if (els.badge) tl.to(els.badge, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    if (split?.chars) tl.to(split.chars, { opacity: 1, y: 0, stagger: 0.03, duration: 0.5, ease: "power4.out" }, "-=0.3");
    if (els.subtitle) tl.to(els.subtitle, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
    if (els.typing) tl.to(els.typing, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    if (els.desc) tl.to(els.desc, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
    if (els.btns?.length) tl.to(els.btns, { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 }, "-=0.2");
    if (els.scroll) tl.to(els.scroll, { opacity: 0.4, y: 0, duration: 0.5 }, "-=0.1");

    return () => { tl.kill(); if (split) split.revert(); };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 30 : 70;

    if (!isDeleting && text === current) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-content">
        <div className="hero-badge">Open to Opportunities</div>

        <h1 ref={nameRef}>{personal?.name || "Rupesh Bodkhe"}</h1>

        <p className="hero-subtitle">{personal?.title || "AI & Backend Engineer"}</p>

        <div className="typing-wrapper">
          <span className="typing-text">{text}</span>
          <span className="typing-cursor" />
        </div>

        <p className="hero-description">
            Transforming complex AI requirements into production-grade solutions. Specialized in Backend Development, GenAI, Agentic Systems, and Cloud-Native Architecture.
        </p>

        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); history.replaceState(null, "", "#contact"); }}>
            Get in Touch
          </a>
          <a href="#experience" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); history.replaceState(null, "", "#experience"); }}>
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
