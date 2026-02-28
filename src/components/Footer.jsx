export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>© {year} Rupesh Bodkhe. All rights reserved.</p>
      <p className="footer-vibe">
        Built with React, FastAPI and LangChain.
      </p>
    </footer>
  );
}
