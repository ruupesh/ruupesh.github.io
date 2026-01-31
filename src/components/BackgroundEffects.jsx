import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * BackgroundEffects
 * Implements visual/interactive parity with styles/main.js:
 * - Reveal on scroll for elements with .reveal
 * - Parallax for .hero-content
 * - Particles backdrop (.particles + .particle children)
 * - Floating tech icons (.floating-icons + .floating-icon children)
 * - 3D tilt for cards with .tilt-card
 * - Animated counters for .stat-number[data-target]
 * - Magnetic hover effect for .btn
 * - Cursor glow follower
 * - URL path synchronization
 */
const BackgroundEffects = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    // ---------- Initial Scroll based on URL path ----------
    const path = window.location.pathname.replace(/^\//, "");
    if (path && path !== "") {
      setTimeout(() => {
        const target = document.getElementById(path);
        if (target) {
          const navbar = document.querySelector(".navbar");
          const offset = navbar ? navbar.offsetHeight : 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    }

    // ---------- Helpers ----------
    const on = (el, evt, handler, opts) => el && el.addEventListener(evt, handler, opts);
    const off = (el, evt, handler) => el && el.removeEventListener(evt, handler);

    // ---------- Animated counters for .stat-number[data-target] ----------
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const tick = () => {
        current += step;
        if (current < target) {
          el.textContent = `${Math.floor(current)}`;
          requestAnimationFrame(tick);
        } else {
          el.textContent = Number.isInteger(target) ? `${target}` : `${target.toFixed(1)}`;
        }
      };
      tick();
    };

    // ---------- Reveal on scroll (IntersectionObserver) ----------
    const sections = Array.from(document.querySelectorAll("section"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal");
            reveals.forEach((el) => el.classList.add("active"));
            
            const stats = entry.target.querySelectorAll(".stat-number[data-target]");
            stats.forEach(s => {
              if (s.textContent === "0") animateCounter(s);
            });

            // Update URL path without triggering re-render if possible
            const id = entry.target.id;
            if (id) {
              const newPath = id === "home" ? "/" : `/${id}`;
              if (window.location.pathname !== newPath) {
                window.history.replaceState(null, "", newPath);
              }
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    sections.forEach((el) => revealObserver.observe(el));
    const loneReveals = Array.from(document.querySelectorAll(".reveal")).filter(el => !el.closest('section'));
    loneReveals.forEach(el => revealObserver.observe(el));

    // ---------- Parallax for hero content ----------
    const heroContent = document.querySelector(".hero-content");
    const parallaxHandler = () => {
      if (!heroContent) return;
      const scrolled = window.pageYOffset || 0;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = String(1 - scrolled / window.innerHeight);
      }
    };
    on(window, "scroll", parallaxHandler, { passive: true });
    parallaxHandler();

    // ---------- Particles Backdrop ----------
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles";
    document.body.appendChild(particlesContainer);
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.width = `${Math.random() * 10 + 5}px`;
      p.style.height = `${Math.random() * 10 + 5}px`;
      p.style.animationDelay = `${Math.random() * 20}s`;
      p.style.animationDuration = `${Math.random() * 10 + 15}s`;
      particlesContainer.appendChild(p);
    }

    // ---------- Floating Icons ----------
    const floatingContainer = document.createElement("div");
    floatingContainer.className = "floating-icons";
    document.body.appendChild(floatingContainer);
    ["💻", "🚀", "⚡", "🎯", "🔧", "☁️", "🤖", "📊", "🧠", "⚙️"].forEach((icon, i) => {
      const el = document.createElement("div");
      el.className = "floating-icon";
      el.textContent = icon;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.animationDelay = `${i * 2.5}s`;
      floatingContainer.appendChild(el);
    });

    // ---------- Tilt Cards ----------
    const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
    const handleTiltMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const centerX = rect.width / 2, centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10, rotateY = (centerX - x) / 10;
      e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };
    const handleTiltLeave = (e) => {
      e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    };
    tiltCards.forEach(card => {
      on(card, "mousemove", handleTiltMove);
      on(card, "mouseleave", handleTiltLeave);
    });

    // ---------- Magnetic Buttons ----------
    const buttons = Array.from(document.querySelectorAll(".btn"));
    const handleBtnMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2, y = e.clientY - rect.top - rect.height / 2;
      e.currentTarget.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    const handleBtnLeave = (e) => { e.currentTarget.style.transform = "translate(0, 0)"; };
    buttons.forEach(btn => {
      on(btn, "mousemove", handleBtnMove);
      on(btn, "mouseleave", handleBtnLeave);
    });

    // ---------- Cursor Glow ----------
    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    Object.assign(cursorGlow.style, {
      position: "fixed", width: "400px", height: "400px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)",
      pointerEvents: "none", zIndex: "9999", transform: "translate(-50%, -50%)",
      transition: "opacity 0.3s", opacity: "0"
    });
    document.body.appendChild(cursorGlow);
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    const mouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; cursorGlow.style.opacity = "1"; };
    const mouseLeave = () => { cursorGlow.style.opacity = "0"; };
    on(document, "mousemove", mouseMove);
    on(document, "mouseleave", mouseLeave);
    let rafId = requestAnimationFrame(function animate() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      rafId = requestAnimationFrame(animate);
    });

    // ---------- Global Link Handler ----------
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor || anchor.target || anchor.getAttribute("href")?.includes(":")) return;
      const href = anchor.getAttribute("href");
      if (href && (href.startsWith("/") || href.startsWith("#"))) {
        const id = href.replace("/", "").replace("#", "");
        const target = document.getElementById(id === "" ? "home" : id);
        if (target) {
          e.preventDefault();
          const offset = document.querySelector(".navbar")?.offsetHeight || 80;
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
          const newPath = id === "" ? "/" : `/${id}`;
          window.history.replaceState(null, "", newPath);
          document.querySelector(".nav-links")?.classList.remove("active");
        }
      }
    };
    on(document, "click", handleLinkClick);

    // ---------- Cleanup ----------
    return () => {
      revealObserver.disconnect();
      off(window, "scroll", parallaxHandler);
      off(document, "click", handleLinkClick);
      off(document, "mousemove", mouseMove);
      off(document, "mouseleave", mouseLeave);
      cancelAnimationFrame(rafId);
      [particlesContainer, floatingContainer, cursorGlow].forEach(el => el?.remove());
    };
  }, []);

  // No DOM markup required; CSS handles visuals, JS above handles dynamic nodes
  return null;
};

export default BackgroundEffects;