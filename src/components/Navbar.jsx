import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState(false);

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
    <>
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo-area">
          <button className="nav-logo-btn" onClick={() => setImgPreview(true)} title="View profile photo">
            <img src="/og-image.png" alt="Rupesh Bodkhe" className="nav-logo-img" />
          </button>
        </div>
        <button className="mobile-menu-btn" aria-label="Toggle menu">☰</button>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/skills">Skills</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/education">Education</a></li>
          <li><a href="/achievements">Achievements</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/publications">Publications</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>

    {imgPreview && (
      <div className="avatar-preview-overlay" onClick={() => setImgPreview(false)}>
        <div className="avatar-preview-modal" onClick={(e) => e.stopPropagation()}>
          <button className="avatar-preview-close" onClick={() => setImgPreview(false)}>✕</button>
          <img src="/og-image.png" alt="Rupesh Bodkhe" className="avatar-preview-img" />
          <p className="avatar-preview-name">Rupesh Bodkhe</p>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;