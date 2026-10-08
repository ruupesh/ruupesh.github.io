export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="colophon-footer">
      <div className="section-container colophon-content">
        <p>© {year} Rupesh Bodkhe. All rights reserved.</p>
        <p>Built with React, FastAPI and LangChain.</p>
        <a href="#hero">Back to top </a>
      </div>
    </footer>
  );
}
