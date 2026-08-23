import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Neural, Agent, Users, Cloud } from "./icons";
import { prefersReducedMotion } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { Icon: Neural, label: "YOE in AI/Backend", target: 4, suffix: "+" },
  { Icon: Agent, label: "(5 AI) Apps Designed, Developed & Deployed", target: 7, suffix: "+" },
  { Icon: Users, label: "Users Served", target: 400, suffix: "K+" },
  { Icon: Cloud, label: "Cloud & AI Certs", target: 5, suffix: "" },
];

export default function About() {
  const { personal } = usePortfolio();
  const revealRef = useScrollReveal();
  const countersRef = useRef([]);

  // Animated counters
  useEffect(() => {
    // With reduced motion the numbers are simply correct from the start.
    if (prefersReducedMotion()) {
      countersRef.current.forEach((el, i) => {
        if (el) el.textContent = STATS[i].target;
      });
      return;
    }

    const tweens = countersRef.current.map((el, i) => {
      if (!el) return null;
      const tgt = STATS[i].target;
      const obj = { val: 0 };
      return gsap.to(obj, {
        val: tgt,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
        onUpdate: () => {
          el.textContent = Math.round(obj.val);
        },
      });
    });

    return () => {
      tweens.forEach((t) => {
        if (!t) return;
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  const highlightSummary = (text) => {
    if (!text) return null;
    const keywords = [
      "AI and Backend Engineer",
      "~4 years",
      "AgenticAI",
      "microservices",
      "multi-agent",
      "GenAI",
      "cloud-native",
      "LLMs",
      "scalable products",
    ];
    let result = text;
    keywords.forEach((kw) => {
      result = result.replace(
        new RegExp(`(${kw})`, "gi"),
        `<span class="highlight">$1</span>`
      );
    });
    return <p dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section id="about" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="01">
          <p className="subtitle gsap-reveal">Who I Am</p>
          <h2 className="gsap-reveal">About Me</h2>
        </div>

        <div className="about-content">
          <div className="about-text gsap-reveal">
            {highlightSummary(personal?.summary)}
          </div>

          <div className="stats-showcase">
            {STATS.map(({ Icon, label, suffix }, i) => (
              <div className="stat-card gsap-reveal" key={label}>
                <span className="stat-icon"><Icon /></span>
                <div className="stat-number">
                  <span ref={(el) => (countersRef.current[i] = el)}>0</span>
                  <span className="stat-suffix">{suffix}</span>
                </div>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
