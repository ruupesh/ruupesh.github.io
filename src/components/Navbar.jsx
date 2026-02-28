import { useState, useEffect, useCallback } from "react";
import { usePortfolio } from "../context/PortfolioContext";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["hero", "about", "skills", "experience", "education", "achievements", "projects", "publications", "contact"];

export default function Navbar() {
  const { personal } = usePortfolio();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [photoPreview, setPhotoPreview] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-based hash tracking + active nav highlighting
  // (works with lazy-loaded sections since it checks DOM dynamically)
  useEffect(() => {
    const activeSectionRef = { current: "" };
    const updateHash = () => {
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = id;
          }
        }
      }
      if (current && current !== activeSectionRef.current) {
        activeSectionRef.current = current;
        setActiveSection(current);
        const hash = current === "hero" ? "" : `#${current}`;
        history.replaceState(null, "", hash || window.location.pathname);
      }
    };

    window.addEventListener("scroll", updateHash, { passive: true });
    // Run once after lazy components mount
    const timer = setTimeout(updateHash, 500);
    return () => { window.removeEventListener("scroll", updateHash); clearTimeout(timer); };
  }, []);

  // Smooth scroll to section & close menu
  const handleNav = useCallback((e, sectionId) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${sectionId}`);
    }
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo-area">
            <button
              className="nav-logo-btn"
              onClick={() => setPhotoPreview(true)}
              aria-label="View profile photo"
            >
              <img
                src="/og-image.png"
                alt={personal?.name || "Rupesh Bodkhe"}
                className="nav-logo-img"
              />
            </button>
          </div>

          <div className={`nav-links${mobileOpen ? " active" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === item.href.slice(1) ? "active" : ""}
                onClick={(e) => handleNav(e, item.href.slice(1))}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Instagram-style photo preview */}
      {photoPreview && (
        <div className="avatar-preview-overlay" onClick={() => setPhotoPreview(false)}>
          <div className="avatar-preview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="avatar-preview-close" onClick={() => setPhotoPreview(false)}>✕</button>
            <img
              src="/og-image.png"
              alt={personal?.name || "Rupesh Bodkhe"}
              className="avatar-preview-img"
            />
            <p className="avatar-preview-name">{personal?.name || "Rupesh Bodkhe"}</p>
          </div>
        </div>
      )}
    </>
  );
}
