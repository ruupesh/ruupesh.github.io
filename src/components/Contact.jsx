import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import linkedinIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";
import leetcodeIcon from "../assets/leetcode.svg";
import gmailIcon from "../assets/Gmail.svg";
import whatsappIcon from "../assets/WhatsApp.svg";

const Contact = () => {
  const { personal } = usePortfolio();

  return (
    <section id="contact" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>Let's Connect</h2>
        </div>
        <div
          className="contact-card reveal"
        >
          <p className="contact-text">
            Let's discuss how we can work together on innovative AI solutions.
            Whether you have a question or want to explore potential
            collaborations, feel free to reach out!
          </p>

          <a href={`mailto:${personal.email}`} className="email-big">
            {personal.email}
          </a>

          <div className="socials">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title="LinkedIn"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title="GitHub"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a
              href={personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title="LeetCode"
            >
              <img src={leetcodeIcon} alt="LeetCode" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="social-icon"
              title="Email"
            >
              <img src={gmailIcon} alt="Email" />
            </a>
            <a
              href="https://wa.me/919604996583"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title="WhatsApp"
            >
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon resume-download"
              title="Download Resume"
            >
              📄
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;