import { useCallback, useEffect, useRef, useState } from "react";
import { Close, Message } from "./icons";

export default function AssistantLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [Assistant, setAssistant] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const launcherRef = useRef(null);
  const previousFocus = useRef(null);
  const loadPromise = useRef(null);

  const close = useCallback(() => {
    setIsOpen(false);
    const target = previousFocus.current?.isConnected ? previousFocus.current : launcherRef.current;
    target?.focus({ preventScroll: true });
  }, []);

  const open = useCallback(() => {
    previousFocus.current = document.activeElement;
    setIsOpen(true);
    setLoadError(false);
    if (!Assistant && !loadPromise.current) {
      loadPromise.current = import("./Chatbot")
        .then((module) => setAssistant(() => module.default))
        .catch(() => setLoadError(true))
        .finally(() => { loadPromise.current = null; });
    }
  }, [Assistant]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        if (document.querySelector("dialog[open]")) return;
        event.preventDefault();
        if (isOpen) close();
        else open();
      } else if (isOpen && event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    const onOpen = () => { if (!isOpen) open(); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("portfolio:assistant", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("portfolio:assistant", onOpen);
    };
  }, [isOpen, close, open]);

  return (
    <div className="chatbot-container">
      <button
        type="button"
        className={`assistant-launcher${isOpen ? " is-open" : ""}`}
        ref={launcherRef}
        onClick={isOpen ? close : open}
        aria-label={isOpen ? "Close assistant" : "Ask about me"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "portfolio-assistant" : undefined}
        aria-keyshortcuts="Meta+K Control+K"
      >
        {isOpen ? <Close size="18px" /> : <Message size="18px" />}
        <span>{isOpen ? "Close assistant" : "Ask about me"}</span>
        <kbd aria-hidden="true">⌘ K</kbd>
      </button>
      {Assistant ? <Assistant isOpen={isOpen} onClose={close} /> : isOpen && (
        <section id="portfolio-assistant" className="chatbot-window chatbot-loading" role="dialog" aria-label="Rupesh’s assistant">
          <button className="chatbot-close" type="button" onClick={close} aria-label="Close assistant"><Close size="20px" /></button>
          <p role="status">{loadError ? "Couldn’t load the assistant. Please try again." : "Opening a conversation…"}</p>
          {loadError && <button type="button" className="quick-action-btn" onClick={open}>Try again ↗</button>}
        </section>
      )}
    </div>
  );
}
