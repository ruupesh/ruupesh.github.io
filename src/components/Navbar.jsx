import SectionIcon from "./SectionIcon";
import { useState, useEffect, useRef } from "react";
import { usePortfolio } from "../context/usePortfolio";
import useSectionNavigation from "../hooks/useSectionNavigation";

const LINKS = [
  { id: "hero", label: "Intro" },
  { id: "impact", label: "Impact" },
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "publications", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { personal } = usePortfolio();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const active = useSectionNavigation(navRef);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.type === "pointerdown" && !navRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", close); };
  }, [open]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1360px)");
    const close = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);
  const navigate = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const { hash } = event.currentTarget;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    setOpen(false);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (window.location.hash !== hash) window.history.pushState(window.history.state, "", hash);
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };
  return (
    <header className="navbar" ref={navRef}>
      <nav className="nav-container" aria-label="Main navigation">
        <a href="/#impact" className="nav-brand" onClick={navigate}>See the impact </a>
        <div className={`nav-links${open ? " is-open" : ""}`} id="navigation-links">
          {LINKS.map(({ id, label }) => <a key={id} href={`/#${id}`} onClick={navigate} aria-current={active === id ? "location" : undefined}><SectionIcon section={id} />{label}<span className="nav-active-dot" aria-hidden="true" /></a>)}
          <a href={personal.resumeUrl || "/Rupesh_Bodkhe-SDE2.pdf"} target="_blank" rel="noopener noreferrer" className="nav-resume">Résumé</a>
        </div>
        <div className="nav-controls"><button ref={toggleRef} className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="navigation-links" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? "Close" : "Menu"}</button></div>
      </nav>
    </header>
  );
}
