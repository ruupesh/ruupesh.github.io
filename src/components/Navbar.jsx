import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");
    const mobileBtn = document.querySelector(".mobile-menu-btn");

    const handleScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      navbar.style.setProperty("--scroll-progress", `${progress}%`);
    };

    const toggleMobile = () => {
      navLinks?.classList.toggle("active");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    mobileBtn?.addEventListener("click", toggleMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileBtn?.removeEventListener("click", toggleMobile);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="nav-logo" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          navigate("/", { replace: true });
        }}>
          RB
        </a>
        <button className="mobile-menu-btn" aria-label="Toggle menu">☰</button>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/skills">Skills</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/education">Education</a></li>
          <li><a href="/achievements">Achievements</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;