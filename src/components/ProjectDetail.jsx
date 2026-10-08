import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useAnimeMotion from "../hooks/useAnimeMotion";

export default function ProjectDetail({ project, originEl, onClose, index }) {
  const dialogRef = useRef(null);
  useAnimeMotion("mountProjectMotion", dialogRef);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      originEl?.focus({ preventScroll: true });
    };
  }, [originEl]);
  const trapFocus = (event) => {
    if (event.key !== "Tab") return;
    const controls = [...dialogRef.current.querySelectorAll('button, a[href], [tabindex="0"]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  };
  return createPortal(
    <dialog ref={dialogRef} className="pd-panel" onKeyDown={trapFocus} aria-labelledby="project-dialog-title" onCancel={(event) => {event.preventDefault(); onClose();}} onClick={(event) => {if(event.target === event.currentTarget) { const rect=event.currentTarget.getBoundingClientRect(); if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) onClose(); }}}>
      <div className="pd-top"><span className="eyebrow">PROJECT / 0{index+1}</span><button className="pd-close" onClick={onClose} autoFocus aria-label="Close project">Close <span>×</span></button></div>
      <header className="pd-head"><h2 id="project-dialog-title">{project.name}</h2><p>{project.description}</p></header>
      <h3 className="eyebrow">THE STACK</h3><div className="pd-tech">{project.technologies.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div>
      <h3 className="eyebrow">THE DETAILS</h3><ul className="pd-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      <a className="btn btn-primary pd-contact" href="#contact" onClick={onClose}>Let’s talk </a>
    </dialog>, document.body
  );
}
