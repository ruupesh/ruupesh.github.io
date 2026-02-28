import { usePortfolio } from "../context/PortfolioContext";
import useScrollReveal from "../hooks/useScrollReveal";
import linkedinIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";
import leetcodeIcon from "../assets/leetcode.svg";
import mediumIcon from "../assets/medium.svg";
import gmailIcon from "../assets/Gmail.svg";
import whatsappIcon from "../assets/WhatsApp.svg";

export default function Contact() {
  const { personal } = usePortfolio();
  const revealRef = useScrollReveal();

  const socials = [
    { icon: linkedinIcon, url: personal?.linkedin, label: "LinkedIn" },
    { icon: githubIcon, url: personal?.github, label: "GitHub" },
    { icon: leetcodeIcon, url: personal?.leetcode, label: "LeetCode" },
    { icon: mediumIcon, url: personal?.medium, label: "Medium" },
    { icon: gmailIcon, url: `mailto:${personal?.email}`, label: "Email" },
    { icon: whatsappIcon, url: `https://wa.me/${personal?.phone?.replace(/[^0-9]/g, '')}`, label: "WhatsApp" },
  ];

  return (
    <section id="contact" className="section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header">
          <p className="subtitle gsap-reveal">Let's Connect</p>
          <h2 className="gsap-reveal">Get in Touch</h2>
        </div>

        <div className="contact-card gsap-reveal">
          <p className="contact-text">
            I'm always open to discussing AI engineering, agentic systems, or
            exciting opportunities. Feel free to reach out!
          </p>

          <a href={`mailto:${personal?.email}`} className="email-big">
            {personal?.email}
          </a>

          <div className="socials">
            {socials.map(
              (s) =>
                s.url && (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <img src={s.icon} alt={s.label} />
                  </a>
                )
            )}
            {personal?.resumeUrl && (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon resume-download"
                aria-label="Download Resume"
                title="Resume"
              >
                📄
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
