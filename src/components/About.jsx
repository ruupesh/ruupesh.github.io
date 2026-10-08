import SectionIcon from "./SectionIcon";
import InkTrace from "./InkTrace";
import { usePortfolio } from "../context/usePortfolio";
import useScrollReveal from "../hooks/useScrollReveal";
import CuriosityStrip from "./CuriosityStrip";

const STATS = [
  { value: "4+", label: "YOE in AI/Backend" },
  { value: "7+", label: "(5 AI) Apps Designed, Developed & Deployed" },
  { value: "400K+", label: "Users Served" },
  { value: "5", label: "Cloud & AI Certs" },
];

export default function About() {
  const { personal } = usePortfolio();
  const ref = useScrollReveal();
  const parts = personal.summary.split(/(building and shipping|multi-agent & GenAI systems|design to production|scalable products)/g);
  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="section-container">
        <div className="about-editorial">
          <div className="about-left">
            <div className="section-header" data-index="02"><p className="subtitle section-kicker gsap-reveal"><SectionIcon section="about" />The human behind the systems</p><h2 className="gsap-reveal">A little<br /><em>about me.</em></h2><InkTrace /></div>
          </div>
          <div className="about-body"><p className="about-personal-line gsap-reveal">The part I keep coming back to?<br /><em>Finding out what’s possible.</em></p><p className="about-statement gsap-reveal">{parts.map((part, i) => i % 2 ? <mark key={i}>{part}</mark> : part)}</p><div className="about-interests gsap-reveal"><span>Building Agentic AI Systems</span><span>Prompt Engineering Expert</span><span>Cloud-Native Developer</span></div><a href="#publications" className="text-link gsap-reveal">What I’ve been thinking about </a></div>
        </div>
        <div className="stats-showcase">{STATS.map((stat, i) => <div className="stat-card gsap-reveal" key={stat.label}><span className="stat-index">0{i + 1} /</span><strong className="stat-number">{stat.value}</strong><span className="stat-label">{stat.label}</span></div>)}</div>
      </div>
      <CuriosityStrip />
    </section>
  );
}
