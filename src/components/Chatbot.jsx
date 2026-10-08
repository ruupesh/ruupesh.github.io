import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Agent, Rocket, Terminal, Mail, Close, Send } from "./icons";
import portfolioData from "../data";
import { routeFromText, navigateTo } from "../utils/navigate";

const apiUrl = import.meta.env.VITE_PORTFOLIO_BE_CHAT_API;

const getFallbackResponse = (message) => {
  const lowerMessage = (message || "").toLowerCase();

  // GenAI Experience (explicit question)
  if (lowerMessage.includes("genai") && lowerMessage.includes("experience")) {
    return ` GenAI Experience:
Built 5+ GenAI, Agentic AI and multi-agent systems. Expertise in prompt engineering (accuracy improved from 50% to 99%). Worked with OpenAI, Claude, AWS Bedrock, LangChain, Google ADK, Copilot, Codex and more.`;
  }

  // Python Experience
  if (lowerMessage.includes("python") && lowerMessage.includes("experience")) {
    return ` Python Experience:
~4 years building backend APIs, ETL systems, and AI solutions using Django, FastAPI, Pandas, and cloud platforms.`;
  }
  // Contact
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
    return `**Contact Information**

**Email:** [${portfolioData.personal.email}](mailto:${portfolioData.personal.email})
**Phone:** ${portfolioData.personal.phone}
**LinkedIn:** [${portfolioData.personal.linkedin.replace("https://www.", "")}](${portfolioData.personal.linkedin})
**GitHub:** [${portfolioData.personal.github.replace("https://", "")}](${portfolioData.personal.github})
`;
  }

  // Awards
  if (lowerMessage.includes("award")) {
    return ` **Awards**

- Star Award (CLSA): Exceptional performance and innovative projects
- Spot Award (Hashedin by Deloitte): Impactful GenAI project delivery
- Spot Award (Hashedin by Deloitte): Improved GenAI accuracy from 50% to 99%
- Top Impactor Award: High-impact contributions across frontend, backend, DevOps, and GenAI
`;
  }

  // Certifications
  if (lowerMessage.includes("certif")) {
    return ` **Certifications**

- AWS Certified Developer - Associate
- AWS Partner: Accreditation (Technical) & AWS Technical Essentials
- Google Cloud Certified Professional Cloud DevOps Engineer
- Anthropic Claude with Amazon Bedrock
- GenAI Essential Training (Hashedin By Deloitte)
`;
  }

  // Skills
  if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("language")) {
    return ` **Skills**

- **Programming Languages:** Python, SQL (Postgres, Oracle)
- **GenAI:** LLMs (like OpenAI & Claude), AWS Bedrock, Prompt Engineering, Vector Databases, LangChain, RAG
- **AgenticAI:** MultiAgent Architecture, Context Engineering, DeepAgents, LangGraph, MCP, A2A Protocol, Google ADK
- **Backend & APIs:** Django REST Framework, FastAPI, Celery, Redis
- **Frontend:** React.js
- **Cloud & DevOps:** AWS, Azure, GCP, Docker, Github, Github Actions, Jenkins, Nginx
- **Financial skills:** Calypso Software, Regulatory Reporting, FICC and EQD products
- **Software Engineering:** API Design, Data Structures, System Design, Microservices and Event-based Architectures, SDLC, AI Tools
- **Data:** Pandas, Numpy, Airflow
`;
  }

  // Experience
  if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job")) {
    return ` **Experience**

**Electronic Arts | SDE 2 - AI Engineer**
Pune, India | June 2026 – Present
- Owning end-to-end AI features from design to production, reducing days of work to minutes
- Architecting scalable enterprise AI integrations across AWS and Azure
- Driving rapid feature delivery and business impact with AI-driven automation

**Hashedin by Deloitte | Software Engineer 2 (AI & Backend)**
Pune, India | Jan 2025 – May 2026
- Developed 3 enterprise GenAI & Agentic applications: ITSM Agent, Multi-Agent System, Data Analytics Agent
- Lead developer of RAG microservice, MultiAgent System, and Data Analytics Agent
- Designed centralized MultiAgent Orchestrator with Google-ADK, A2A and MCP protocols

**CLSA | Software Engineer (Fullstack)**
Pune, India | July 2022 – Dec 2024
- High-performance ETL system (8 hours / 5 minutes)
- Two full-stack apps from scratch to production
- Automated ETL pipelines for regulatory reporting

**Persistent Systems | Intern**
Pune, India | Jan 2022 - June 2022
- Java, Spring Boot, React.js, MySQL
`;
  }

  // Education
  if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("university")) {
    return ` **Education**

**Bachelor of Engineering - Computer Science**
Savitribai Phule Pune University
Aug 2018 - May 2022
- CGPA: 8.91/10
- Honors Course in AI & Machine Learning (2 years)
`;
  }
  // Projects
  if (lowerMessage.includes("project")) {
    return ` **Projects**

**Enterprise Chatbot & API Service**
Technologies: Python, Django, AWS Bedrock (Claude), OpenAI GPT, LangChain, AWS App Runner, PostgreSQL, FAISS, NLP
- Built secure RAG-based chatbots for enterprise knowledge access.

**Multi-Agent System POC**
Technologies: Python, Context Engineering, Prompt Engineering, DeepAgents, LangChain, LLMs, FastMCP
- Designed and implemented a multi-agent system, initially as a POC and subsequently productionized as a standalone microservice

**FileSharing WebApp**
Technologies: Python, Django REST, React.js, Nginx, Docker, SFTP, PostgreSQL
- Secure online SFTP platform, improved support productivity by 75%.

**Data Comparator WebApp**
Technologies: Python, Django REST Framework, React.js, Nginx, Docker, Pandas, OpenCV
- File comparison app, reduced manual regression testing by 99%.

**PyPoller Automation Application**
Technologies: Python, sFTP, React.js, Django REST Framework, Paramiko
- Automated secure file transfers, saved 8 hours/day, reduced operational risk by 90%.

**Data Analytics Chatbot**
Technologies: Python, FastAPI, LangChain Agent, Prompt Engineering, Plotly, Pandas, AWS S3
- Enterprise data analytics chatbot for SQL queries, CSV generation, and graph plotting.
`;
  }

  // Publications/Articles
  if (lowerMessage.includes("publication") || lowerMessage.includes("article") || lowerMessage.includes("blog") || lowerMessage.includes("writing")) {
    return ` **Publications**

- **Building a Multi-Agent System with Google ADK: A Deep Dive into the MultiAgent Project**
Platform: Medium | 2026
Explore the architecture, design, and implementation of a scalable multi-agent system using Google ADK. Practical insights into building advanced agentic AI systems in production.
[Read on Medium](https://medium.com/@ruupesh/building-a-multi-agent-system-with-google-adk-a-deep-dive-into-the-multiagent-project-16bbadb7e13c)


- **Beyond Tool Calling: Building a Real Multi-Agent System with Google ADK, MCP, and A2A**
Platform: Medium | 2026
This article breaks down how to design and build a production-grade multi-agent system, going beyond simple prompt-based agents to a structured runtime architecture. It explains how Google ADK, MCP, and A2A work together to enable remote multi-agent discovery & orchestration, tool integration, and real communication between remote agents. The focus is on both high-level design and low-level implementation, including authentication, routing, state management, and scalable agent collaboration.
[Read on Medium](https://medium.com/@ruupesh/beyond-tool-calling-building-a-real-multi-agent-system-with-google-adk-mcp-and-a2a-aa0fd7d64754)
`;
  }

  // About
  if (lowerMessage.includes("about")) {
    return ` **About Rupesh**

Rupesh is a Fullstack AI Engineer with ~4 years of experience building and shipping end-to-end backend and AgenticAI applications using diverse Python frameworks. Experienced in rapidly developing microservices, event-driven architectures, and multi-agent & GenAI systems on cloud-native infrastructure. Comfortable owning features from design to production, integrating LLMs, APIs, frontend components, and DevOps pipelines to deliver scalable products.
`;
  }



  // Greeting — checked last, and on whole words only. Substring matching
  // meant any message containing "hi" ("Hashedin", "which", "architecture")
  // short-circuited to the greeting before reaching the specific branches.
  if (/(^|\W)(hi|hey|hello|yo)(\W|$)/i.test(lowerMessage)) {
    return ` Hi! I'm Rupesh's AI assistant. Rupesh is an Fullstack AI Engineer with ~4 years of experience building backend and GenAI solutions. Feel free to ask about Rupesh's experience, skills, projects, or anything else from his portfolio!`;
  }

  // Default
  return `That's a great question!

Explore different sections of Rupesh's portfolio:

** Quick Links**
-  **[About](#about)** - Rupesh's background
-  **[Skills](#skills)** - Technical expertise
-  **[Experience](#experience)** - Work history
-  **[Projects](#projects)** - What Rupesh has built
-  **[Publications](#publications)** - Rupesh's articles
-  **[Contact](#contact)** - Get in touch

Or ask me something specific about Rupesh's experience!`;
};

const quickActions = [
  { Icon: Agent, label: "GenAI Experience", message: "What's your experience with GenAI?" },
  { Icon: Rocket, label: "Projects", message: "Tell me about your projects" },
  { Icon: Terminal, label: "Tech Stack", message: "What technologies do you work with?" },
  { Icon: Mail, label: "Contact Info", message: "How can I contact you?" },
];

const portfolioSections = new Set([
  "hero", "impact", "about", "skills", "experience", "projects",
  "education", "achievements", "publications", "contact",
]);

// Older backend responses also return the Quick Links as bold text.
const linkQuickSections = (content) => {
  if (!content.includes("Quick Links")) return content;
  return content.replace(
    /^(\s*[-*]\s+[^\n]*?)\*\*(About|Skills|Experience|Projects|Publications|Contact)\*\*/gm,
    (_, prefix, label) => `${prefix}**[${label}](#${label.toLowerCase()})**`,
  );
};

const sectionFromHref = (href) => {
  if (!href) return null;
  try {
    const url = new URL(href, window.location.href);
    const section = url.hash.slice(1);
    return url.origin === window.location.origin
      && url.pathname === window.location.pathname
      && !url.search
      && portfolioSections.has(section) ? section : null;
  } catch {
    return null;
  }
};

const MAX_MESSAGES = 60;

const Chatbot = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const requestRef = useRef(null);
  const nextMessageId = useRef(2);
  const [messages, setMessages] = useState([
    { id: 0, role: "bot", content: " Hi! I'm Rupesh's AI assistant. How can I help you learn more about Rupesh's work?" },
    { id: 1, role: "bot", content: "Feel free to ask about Rupesh's experience, projects, or technical skills!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const markdownComponents = useMemo(() => ({
    a: ({ href, title, children }) => {
      const section = sectionFromHref(href);
      return section ? (
        <a href={`#${section}`} title={title} onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onClose();
          navigateTo({ section });
          const destination = document.getElementById(section);
          destination?.setAttribute("tabindex", "-1");
          destination?.focus({ preventScroll: true });
        }}>{children}</a>
      ) : (
        <a href={href} title={title} target="_blank" rel="noopener noreferrer">{children}</a>
      );
    },
  }), [onClose]);

  // Scroll only the conversation, never an ancestor or the portfolio itself.
  useEffect(() => {
    if (isOpen && messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  useEffect(() => () => requestRef.current?.abort(), []);

  const submitMessage = async (content) => {
    const text = content.trim();
    if (!text || requestRef.current) return;

    const request = new AbortController();
    requestRef.current = request;
    const userMessage = { id: nextMessageId.current++, role: "user", content: text };
    const nextMessages = [...messages, userMessage].slice(-MAX_MESSAGES);
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);
    setAnnouncement("Preparing a response.");

    let reply = getFallbackResponse(text);
    try {
      // A missing backend uses the portfolio answers directly, without a request.
      if (apiUrl) {
        const response = await axios.post(apiUrl, {
          messages: nextMessages.map((message) => ({
            role: message.role === "bot" ? "assistant" : message.role,
            content: message.content,
          })),
        }, { timeout: 20000, signal: request.signal });
        if (typeof response?.data?.response === "string" && response.data.response.trim()) {
          reply = response.data.response;
        }
      }
    } catch {
      // The same portfolio answers remain available if the service is unreachable.
    } finally {
      if (!request.signal.aborted) {
        const botMessage = {
          id: nextMessageId.current++,
          role: "bot",
          content: reply,
          route: routeFromText(text, portfolioData),
        };
        setMessages((previous) => [...previous, botMessage].slice(-MAX_MESSAGES));
        setAnnouncement(reply);
        setIsTyping(false);
      }
      if (requestRef.current === request) requestRef.current = null;
    }
  };

  // Preserve conversation state when closed, with no hidden focusable controls.
  if (!isOpen) return null;

  return (
    <section
      className="chatbot-window"
      id="portfolio-assistant"
      role="dialog"
      aria-labelledby="assistant-title"
      aria-describedby="assistant-description"
      data-lenis-prevent
    >
      <header className="chatbot-header">
        <div className="chatbot-header-info">
          <span className="chatbot-avatar" aria-hidden="true">RB</span>
          <div>
            <p className="chatbot-eyebrow">A little more about me</p>
            <h2 id="assistant-title">Rupesh’s assistant</h2>
          </div>
        </div>
        <button className="chatbot-close" type="button" onClick={onClose} aria-label="Close assistant">
          <Close size="20px" />
        </button>
      </header>
      <p className="chatbot-description" id="assistant-description">Explore my work. Follow your curiosity.</p>

      <div className="chatbot-messages" ref={messagesRef} aria-label="Conversation" tabIndex={0}>
        {messages.map((message) => (
          <div key={message.id} className={`chatbot-message ${message.role === "user" ? "user-message" : "bot-message"}`}>
            <span className="message-label">{message.role === "user" ? "You" : "Assistant"}</span>
            <div className="message-bubble">
              {message.role === "bot" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
                  {linkQuickSections(message.content)}
                </ReactMarkdown>
              ) : message.content}
            </div>
            {message.route && (
              <button
                type="button"
                className="chatbot-view-section"
                onClick={() => { onClose(); navigateTo(message.route); }}
              >
                View {message.route.section}
              </button>
            )}
          </div>
        ))}
        {isTyping && <p className="chatbot-thinking">Thinking through your question…</p>}
      </div>
      <p className="assistant-sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>

      <div className="chatbot-quick-actions" aria-label="Suggested questions">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="quick-action-btn"
            onClick={() => submitMessage(action.message)}
            disabled={isTyping}
          >
            <action.Icon size="14px" />{action.label}
          </button>
        ))}
      </div>
      <form className="chatbot-input-area" onSubmit={(event) => { event.preventDefault(); submitMessage(input); }}>
        <input
          type="text"
          id="chatbot-input"
          name="message"
          aria-label="Ask about Rupesh"
          className="chatbot-input"
          placeholder="What are you curious about?"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          maxLength={2000}
          ref={inputRef}
        />
        <button className="chatbot-send" type="submit" aria-label="Send message" disabled={isTyping || !input.trim()}>
          <Send size="18px" />
        </button>
      </form>
      <p className="chatbot-footnote">AI assistant · For a human conversation, <a href={`mailto:${portfolioData.personal.email}`}>email me</a></p>
    </section>
  );
};

export default Chatbot;
