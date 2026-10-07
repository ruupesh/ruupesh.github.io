import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

function storedPreference() {
  try {
    const preference = window.localStorage.getItem(STORAGE_KEY);
    return preference === "dark" || preference === "light" ? preference : null;
  } catch {
    // A private or embedded browser may disallow persistent storage.
    return null;
  }
}

function initialTheme() {
  if (typeof document === "undefined") return "light";
  const applied = document.documentElement.dataset.theme;
  if (applied === "dark" || applied === "light") return applied;
  return storedPreference() || (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme);
  const explicitPreference = useRef(typeof window === "undefined" ? null : storedPreference());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.documentElement.style.backgroundColor = theme === "dark" ? "#141923" : "#f7f5f0";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#141923" : "#f7f5f0");
    window.dispatchEvent(new CustomEvent("portfolio:theme", { detail: { theme } }));
  }, [theme]);

  useEffect(() => {
    const systemTheme = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onSystemChange = (event) => {
      if (!explicitPreference.current) setTheme(event.matches ? "dark" : "light");
    };
    const onStorageChange = (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      const next = event.newValue === "dark" || event.newValue === "light" ? event.newValue : null;
      explicitPreference.current = next;
      setTheme(next || (systemTheme?.matches ? "dark" : "light"));
    };
    systemTheme?.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorageChange);
    return () => {
      systemTheme?.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    explicitPreference.current = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Still honor the choice for this visit if storage is unavailable.
    }
    setTheme(next);
  };

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {theme === "light" ? (
            <path d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5 8.8 8.8 0 1 0 20.5 14.2Z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </>
          )}
        </svg>
      </span>
      <span className="theme-toggle-label">{nextTheme === "dark" ? "Lights off" : "Lights on"}</span>
    </button>
  );
}
