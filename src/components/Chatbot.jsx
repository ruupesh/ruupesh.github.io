import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Agent, Rocket, Terminal, Mail, Message, Close, Send } from "./icons";
import portfolioData from "../data";
import { routeFromText, navigateTo } from "../utils/navigate";

const apiUrl = import.meta.env.VITE_PORTFOLIO_BE_CHAT_API;

const getFallbackResponse = (message) => {
  const lowerMessage = (message || "").toLowerCase();

  // GenAI Experience (explicit question)
  if (lowerMessage.includes("genai") && lowerMessage.includes("experience")) {
    return `🤖 GenAI Experience:
Built 5+ GenAI, Agentic AI and multi-agent systems. Expertise in prompt engineering (accuracy improved from 50% to 99%). Worked with OpenAI, Claude, AWS Bedrock, LangChain, Google ADK, Copilot, Codex and more.`;
  }

  // Python Experience
  if (lowerMessage.includes("python") && lowerMessage.includes("experience")) {
    return `🐍 Python Experience:
~4 years building backend APIs, ETL systems, and AI solutions using Django, FastAPI, Pandas, and cloud platforms.`;
  }
  // Contact
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
    return `**Contact Information** 📧

**Email:** [rupeshbodkhe2302@gmail.com](mailto:rupeshbodkhe2302@gmail.com)
**Phone:** +91-9604996583
**LinkedIn:** [linkedin.com/in/rupeshbodkhe](https://www.linkedin.com/in/rupeshbodkhe)
**GitHub:** [github.com/rupeshbodkhe](https://github.com/rupeshbodkhe)
`;
  }

  // Awards
  if (lowerMessage.includes("award")) {
    return `🏆 **Awards**

- Star Award (CLSA): Exceptional performance and innovative projects
- Spot Award (Hashedin by Deloitte): Impactful GenAI project delivery
- Spot Award (Hashedin by Deloitte): Improved GenAI accuracy from 50% to 99%
- Top Impactor Award: High-impact contributions across frontend, backend, DevOps, and GenAI
`;
  }

  // Certifications
  if (lowerMessage.includes("certif")) {
    return `📜 **Certifications**

- AWS Certified Developer - Associate
- AWS Partner: Accreditation (Technical) & AWS Technical Essentials
- Google Cloud Certified Professional Cloud DevOps Engineer
- Anthropic Claude with Amazon Bedrock
- GenAI Essential Training (Hashedin By Deloitte)
`;
  }

  // Skills
  if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("language")) {
    return `💻 **Skills**

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
    return `💼 **Experience**

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
- High-performance ETL system (8 hours → 5 minutes)
- Two full-stack apps from scratch to production
- Automated ETL pipelines for regulatory reporting

**Persistent Systems | Intern**
Pune, India | Jan 2022 - June 2022
- Java, Spring Boot, React.js, MySQL
`;
  }

  // Education
  if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("university")) {
    return `🎓 **Education**

**Bachelor of Engineering - Computer Science**
Savitribai Phule Pune University
Aug 2018 - May 2022
- CGPA: 8.91/10
- Honors Course in AI & Machine Learning (2 years)
`;
  }
  // Projects
  if (lowerMessage.includes("project")) {
    return `🚀 **Projects**

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
    return `📝 **Publications**

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
    return `👤 **About Rupesh**

Rupesh is an AI and Backend Engineer with ~4 years of experience building and shipping end-to-end backend and AgenticAI applications using diverse Python frameworks. Experienced in rapidly developing microservices, event-driven architectures, and multi-agent & GenAI systems on cloud-native infrastructure. Comfortable owning features from design to production, integrating LLMs, APIs, frontend components, and DevOps pipelines to deliver scalable products.
`;
  }



  // Greeting — checked last, and on whole words only. Substring matching
  // meant any message containing "hi" ("Hashedin", "which", "architecture")
  // short-circuited to the greeting before reaching the specific branches.
  if (/(^|\W)(hi|hey|hello|yo)(\W|$)/i.test(lowerMessage)) {
    return `👋 Hi! I'm Rupesh's AI assistant. Rupesh is an AI & Backend Engineer with ~4 years of experience building backend and GenAI solutions. Feel free to ask about Rupesh's experience, skills, projects, or anything else from his portfolio!`;
  }

  // Default
  return `That's a great question! 😊

Explore different sections of Rupesh's portfolio:

**📌 Quick Links**
- 👤 **About** - Rupesh's background
- 💻 **Skills** - Technical expertise
- 💼 **Experience** - Work history
- 🚀 **Projects** - What Rupesh has built
- 📝 **Publications** - Rupesh's articles
- 📧 **Contact** - Get in touch

Or ask me something specific about Rupesh's experience!`;
};

const quickActions = [
  { Icon: Agent, label: "GenAI Experience", message: "What's your experience with GenAI?" },
  { Icon: Rocket, label: "Projects", message: "Tell me about your projects" },
  { Icon: Terminal, label: "Tech Stack", message: "What technologies do you work with?" },
  { Icon: Mail, label: "Contact Info", message: "How can I contact you?" },
];

const markdownComponents = {
  a: ({ node, ...props }) => (
    <a {...props} target="_blank" rel="noopener noreferrer" />
  ),
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: "bot", content: "👋 Hi! I'm Rupesh's AI assistant. How can I help you learn more about Rupesh's work?" },
    { role: "bot", content: "Feel free to ask about Rupesh's experience, projects, or technical skills!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // ⌘K / Ctrl+K opens the assistant from anywhere; Escape closes it.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus the field when it opens, so ⌘K lands you ready to type.
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 260);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const toggleChat = () => setIsOpen((o) => !o);

  /** A question that names a company, project, or section moves the page. */
  const drivePage = (text) => {
    const route = routeFromText(text, portfolioData);
    if (route) navigateTo(route);
  };

  const addUserMessage = (content) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
  };

  const addBotMessage = (content) => {
    setMessages((prev) => [...prev, { role: "bot", content }]);
  };

  const sendToApiOrFallback = async (nextMessages) => {
    setIsTyping(true);
    try {
      const response = await axios.post(apiUrl, {
        messages: nextMessages.map((m) => ({
          role: m.role === "bot" ? "assistant" : m.role,
          content: m.content,
        })),
      });
      if (response?.data?.response) {
        addBotMessage(response.data.response);
      } else {
        const lastUser = nextMessages.filter((m) => m.role === "user").slice(-1)[0]?.content || "";
        addBotMessage(getFallbackResponse(lastUser));
      }
    } catch (e) {
      const lastUser = nextMessages.filter((m) => m.role === "user").slice(-1)[0]?.content || "";
      addBotMessage(getFallbackResponse(lastUser));
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addUserMessage(text);
    drivePage(text);
    const nextMessages = [...messages, { role: "user", content: text }];
    await sendToApiOrFallback(nextMessages);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleQuickAction = async (msg) => {
    addUserMessage(msg);
    drivePage(msg);
    const nextMessages = [...messages, { role: "user", content: msg }];
    await sendToApiOrFallback(nextMessages);
  };

  return (
    <div className="chatbot-container">
      <button
        className={`chatbot-toggle ${isOpen ? "active" : ""}`}
        onClick={toggleChat}
        title="Chat with me"
        aria-label={isOpen ? "Close chat" : "Chat with me"}
        aria-expanded={isOpen}
      >
        <span className="orbit-ring orbit-ring-1" />
        <span className="orbit-ring orbit-ring-2" />
        <span className="chatbot-icon"><Message size="24px" /></span>
        <span className="chatbot-close-icon"><Close size="22px" /></span>
      </button>

      {!isOpen && (
        <span className="chatbot-kbd" aria-hidden="true">
          <kbd>⌘</kbd><kbd>K</kbd>
        </span>
      )}

      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">RB</div>
            <div className="chatbot-header-text">

              <p className="chatbot-status">
                <span className="status-dot"></span>
                Available to chat
              </p>
            </div>
          </div>
          <button className="chatbot-minimize" onClick={toggleChat}>−</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chatbot-message ${msg.role === "user" ? "user-message" : "bot-message"} show`}
            >
              <div className="message-content">
                {msg.role !== "user" && <div className="message-avatar">RB</div>}
                <div className="message-bubble">
                  {msg.role !== "user" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      components={markdownComponents}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : msg.content}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-message bot-message typing-indicator show">
              <div className="message-content">
                <div className="message-avatar">RB</div>
                <div className="message-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            type="text"
            id="chatbot-input"
            name="message"
            aria-label="Ask me anything"
            className="chatbot-input"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="off"
            ref={inputRef}
          />
          <button className="chatbot-send" onClick={sendMessage} aria-label="Send message">
            <Send size="18px" />
          </button>
        </div>

        <div className="chatbot-quick-actions">
          {quickActions.map(({ Icon, label, message }) => (
            <button
              key={label}
              className="quick-action-btn"
              onClick={() => handleQuickAction(message)}
              data-message={message}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;