import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: "🧠", label: "YOE in AI/Backend", target: 4, suffix: "+" },
  { icon: "🤖", label: "(5 AI) Apps Designed, Developed & Deployed", target: 7, suffix: "+" },
  { icon: "👥", label: "Users Served", target: 400, suffix: "K+" },
  { icon: "☁️", label: "Cloud & AI Certs", target: 5, suffix: "" },
];

export default function About() {
  const { personal } = usePortfolio();
  const revealRef = useScrollReveal();
  const countersRef = useRef([]);

  // Animated counters
  useEffect(() => {
    countersRef.current.forEach((el, i) => {
      if (!el) return;
      const tgt = STATS[i].target;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: tgt,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
        onUpdate: () => {
          el.textContent = Math.round(obj.val);
        },
      });
    });
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
        <div className="section-header">
          <p className="subtitle gsap-reveal">Who I Am</p>
          <h2 className="gsap-reveal">About Me</h2>
        </div>

        <div className="about-content">
          <div className="about-text gsap-reveal">
            {highlightSummary(personal?.summary)}
          </div>

          <div className="stats-showcase">
            {STATS.map((stat, i) => (
              <div className="stat-card gsap-reveal" key={stat.label}>
                <span className="stat-icon">{stat.icon}</span>
                <div className="stat-number">
                  <span ref={(el) => (countersRef.current[i] = el)}>0</span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
