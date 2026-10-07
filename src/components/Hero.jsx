import { usePortfolio } from "../context/usePortfolio";

export default function Hero() {
  const { personal, experience } = usePortfolio();
  return (
    <section id="hero" className="hero">
      <div className="hero-topline">
        <p className="hero-hello">A small corner of the internet, by me.</p>
        <span className="hero-location">{personal.location} <span aria-hidden="true">↗</span></span>
      </div>
      <div className="hero-grid">
        <div className="hero-content">
          <figure className="hero-polaroid">
            <img src="/personal_photo.jpg" alt="Portrait of Rupesh Bodkhe" width="360" height="360" fetchPriority="high" />
            <figcaption><h1>{personal.name}</h1><p>{personal.title}</p></figcaption>
          </figure>
        </div>
        <div className="hero-summary">
          <blockquote className="hero-personal-note"><span className="hero-quote-mark">“</span>The art of developers lies in solving problems by wrapping functionality in layers upon layers of abstraction, <span>wrappers on top of wrappers</span>, until complexity transforms into a seamless solution (or at least looks like one).<span className="hero-quote-mark">”</span></blockquote>
          <p className="hero-description">Transforming complex AI requirements into production-grade solutions. Specialized in Backend Development, GenAI, Agentic Systems, and Cloud-Native Architecture.</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">A few things I’ve built <span aria-hidden="true">↗</span></a>
            <a href={personal.resumeUrl || "/Rupesh_Bodkhe-SDE2.pdf"} className="text-link" target="_blank" rel="noopener noreferrer">My résumé <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-current"><span className="availability-dot" aria-hidden="true" /><span>{experience[0].position} at <strong>{experience[0].company}</strong><small>Open to Opportunities</small></span></div>
        </div>
      </div>
      <div className="hero-foot">
        <a href="#impact" className="scroll-cue"><span aria-hidden="true">↓</span> Follow the thread.</a>
        <p className="hero-foot-note">A curious mind, a little code,<br />and the things that happen next.</p>
      </div>
    </section>
  );
}
