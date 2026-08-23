import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/styles.css'
import './styles/chatbot.css'
import App from './App.jsx'

// Single-page vertical scroll — no routes. The router was never used;
// section anchors are plain hashes handled by Navbar.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)