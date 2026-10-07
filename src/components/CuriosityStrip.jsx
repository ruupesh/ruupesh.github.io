import { useEffect, useRef } from "react";

const WORDS = ["always curious", "tech savvy", "thoughtfully built", "still exploring", "ideas into code", "human at heart"];

export default function CuriosityStrip() {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="curiosity-line" ref={ref} aria-hidden="true">
      <div className="curiosity-line-track">
        {[0, 1].map((copy) => <div className="curiosity-line-group" key={copy}>{WORDS.map((word) => <span className="curiosity-word" key={word}>{word}<span className="curiosity-arrow">↗</span></span>)}</div>)}
      </div>
    </div>
  );
}
