import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const apiUrl = "http://localhost:8000/chat";

const getFallbackResponse = (message) => {
  const lowerMessage = (message || "").toLowerCase();

  // GenAI Experience (explicit question)
  if (lowerMessage.includes("genai") && lowerMessage.includes("experience")) {
    return `🤖 GenAI Experience:
3.5+ years building GenAI chatbots, multi-agent systems, and prompt engineering (accuracy improved from 50% to 99%). Worked with OpenAI, Claude, AWS Bedrock, and LangChain.`;
  }

  // Python Experience
  if (lowerMessage.includes("python") && lowerMessage.includes("experience")) {
    return `🐍 Python Experience:
3.5+ years building backend APIs, ETL systems, and AI solutions using Django, FastAPI, Pandas, and cloud platforms.`;
  }
  // Hi/Hello
  if (lowerMessage.includes("hi") || lowerMessage.includes("hello")) {
    return `👋 Hi! I'm Rupesh Bodkhe, an AI-enabled Software Engineer with 3.5+ years of experience building backend and GenAI solutions. Feel free to ask about my experience, skills, projects, or anything else from my portfolio!`;
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

**Programming Languages:** Python, SQL (Postgres, Oracle), JavaScript
**GenAI:** LLMs (OpenAI & Claude), AWS Bedrock, Prompt Engineering, Vector Databases, LangChain, RAG
**AgenticAI:** MultiAgent Architecture, Context Engineering, DeepAgents, LangGraph, FastMCP, A2A, Google ADK
**Backend & APIs:** Django REST Framework, FastAPI, Celery, Redis
**Frontend:** React.js
**Cloud & DevOps:** AWS, Azure, GCP, Docker, Github, Github Actions, Jenkins, Nginx
**Financial skills:** Calypso Software, Regulatory Reporting, FICC and EQD products
**Software Engineering:** API Design, Data Structures, System Design, Microservices, SDLC
**Data:** Pandas, Numpy, Airflow
`;
  }

  // Experience
  if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job")) {
    return `💼 **Experience**

**Hashedin by Deloitte | Software Engineer 2**
Pune, India | Jan 2025 – Present
- Enterprise web app with LLM-based chatbot
- SaaS ITSM GenAI Agent (Prompt Engineering, MultiAgent System)

**CLSA | Software Engineer**
Pune, India | July 2022 – Dec 2024
- High-performance ETL system
- Scalable applications with Django REST & React.js
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
- Designed and implemented a multi-agent POC for scalable production systems.

**FileSharing WebApp**
Technologies: Python, Django REST, React.js, Nginx, Docker, SFTP, PostgreSQL
- Secure online SFTP platform, improved support productivity by 75%.

**Data Comparator WebApp**
Technologies: Python, Django REST Framework, React.js, Nginx, Docker, Pandas, OpenCV
- File comparison app, reduced manual regression testing by 99%.

**PyPoller Automation Application**
Technologies: Python, sFTP, React.js, Django REST Framework, Paramiko
- Automated secure file transfers, saved 8 hours/day, reduced operational risk by 90%.
`;
  }
  // About
  if (lowerMessage.includes("about")) {
    return `👤 **About Me**

AI-enabled Software Engineer with 3.5+ years of experience building and shipping end-to-end backend and AgenticAI solutions using diverse Python frameworks. Experienced in rapidly developing microservices, event-driven architectures, and multi-agent GenAI systems on cloud-native infrastructure. Comfortable owning features from design to production, integrating LLMs, APIs, frontend components, and DevOps pipelines to deliver scalable products.
`;
  }



  // Default
  return `That's a great question! 😊

Explore different sections of my portfolio:

**📌 Quick Links**
- 👤 **About** - My background
- 💻 **Skills** - Technical expertise
- 💼 **Experience** - Work history
- 🚀 **Projects** - What I've built
- 📧 **Contact** - Get in touch

Or ask me something specific about my experience!`;
};

const quickActions = [
  { label: "🤖 GenAI Experience", message: "What's your experience with GenAI?" },
  { label: "🚀 Projects", message: "Tell me about your projects" },
  { label: "💻 Tech Stack", message: "What technologies do you work with?" },
  { label: "📧 Contact Info", message: "How can I contact you?" },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "👋 Hi! I'm Rupesh's AI assistant. How can I help you learn more about my work?" },
    { role: "bot", content: "Feel free to ask about my experience, projects, or technical skills!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => setIsOpen((o) => !o);

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
    const nextMessages = [...messages, { role: "user", content: text }];
    await sendToApiOrFallback(nextMessages);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleQuickAction = async (msg) => {
    addUserMessage(msg);
    const nextMessages = [...messages, { role: "user", content: msg }];
    await sendToApiOrFallback(nextMessages);
  };

  return (
    <div className="chatbot-container">
      <button
        className={`chatbot-toggle ${isOpen ? "active" : ""}`}
        onClick={toggleChat}
        title="Chat with me"
      >
        <span className="chatbot-icon">💬</span>
        <span className="chatbot-close-icon">✕</span>
      </button>

      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">RB</div>
            <div className="chatbot-header-text">
              <h4>Rupesh Bodkhe</h4>
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
                  {msg.role !== "user" ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
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
            className="chatbot-input"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />
          <button className="chatbot-send" onClick={sendMessage}>
            <span>➤</span>
          </button>
        </div>

        <div className="chatbot-quick-actions">
          {quickActions.map((qa) => (
            <button
              key={qa.label}
              className="quick-action-btn"
              onClick={() => handleQuickAction(qa.message)}
              data-message={qa.message}
            >
              {qa.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;