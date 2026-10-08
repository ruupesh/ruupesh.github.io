import SectionIcon from "./SectionIcon";
import InkTrace from "./InkTrace";
import { usePortfolio } from "../context/usePortfolio";
import useScrollReveal from "../hooks/useScrollReveal";
import linkedInIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";
import leetcodeIcon from "../assets/leetcode.svg";
import mediumIcon from "../assets/medium.svg";
import gmailIcon from "../assets/Gmail.svg";
import whatsappIcon from "../assets/WhatsApp.svg";

export default function Contact() {
  const { personal } = usePortfolio();
  const revealRef = useScrollReveal();
  const socials = [
    { url: personal?.linkedin, label: "LinkedIn", icon: linkedInIcon },
    { url: personal?.github, label: "GitHub", icon: githubIcon },
    { url: personal?.leetcode, label: "LeetCode", icon: leetcodeIcon },
    { url: personal?.medium, label: "Medium", icon: mediumIcon },
    { url: personal?.email && `mailto:${personal.email}`, label: "Email", icon: gmailIcon },
    { url: personal?.phone && `https://wa.me/${personal.phone.replace(/[^0-9]/g, "")}`, label: "WhatsApp", icon: whatsappIcon },
  ];

  return (
    <section id="contact" className="section connect-section" ref={revealRef}>
      <div className="section-container">
        <div className="section-header" data-index="08">
          <p className="subtitle section-kicker gsap-reveal"><SectionIcon section="contact" />Let's Connect</p>
          <InkTrace />
        </div>
        <div className="connect-details gsap-reveal">
          <div className="connect-intro">
            <h2 className="connect-heading">Get in<br /><span>Touch</span></h2>
            <p className="connect-introduction">
              I'm always open to discussing AI engineering, agentic systems, or
              exciting opportunities. Feel free to reach out!
            </p>
          </div>
          <div className="connect-actions">
            <nav className="connect-socials" aria-label="Social links">
              {socials.filter((social) => social.url).map((social) => (
                <a key={social.label} href={social.url} aria-label={social.label} title={social.label}
                  target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}>
                  <img src={social.icon} alt="" width="24" height="24" loading="lazy" />
                </a>
              ))}
            </nav>
            {personal?.email && (
              <a href={`mailto:${personal.email}`} className="connect-email">
                <span>{personal.email}</span>
              </a>
            )}
            {(
              <a href={personal.resumeUrl || "/Rupesh_Bodkhe-SDE2.pdf"} target="_blank" rel="noopener noreferrer" className="connect-resume">
                Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
