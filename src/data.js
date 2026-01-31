// Portfolio Data - Centralized data store for Rupesh Bodkhe's portfolio

const portfolioData = {
    personal: {
        name: "Rupesh Bodkhe",
        title: "AI-enabled Software Engineer",
        email: "rupeshbodkhe2302@gmail.com",
        linkedin: "https://www.linkedin.com/in/rupeshbodkhe",
        github: "https://github.com/ruupesh",
        leetcode: "https://leetcode.com/ruupesh",
        phone: "+91-9604996583",
        location: "Pune, India",
        resumeUrl: import.meta.env.VITE_RESUME_URL,
        summary: "AI-enabled Software Engineer with 3.5+ years of experience building and shipping end-to-end backend and AgenticAI solutions using diverse Python frameworks. Experienced in rapidly developing microservices, event-driven architectures, and multi-agent GenAI systems on cloud-native infrastructure. Comfortable owning features from design to production, integrating LLMs, APIs, frontend components, and DevOps pipelines to deliver scalable products."
    },
    
    skills: {
        languages: ["Python", "SQL (Postgres, Oracle)", "JavaScript"],
        genai: ["LLMs (OpenAI & Claude)", "Azure AI Foundry", "AWS Bedrock", "NLP", "Prompt Engineering", "Vector Databases", "Embeddings", "LangChain", "RAG"],
        agenticai: ["MultiAgent Architecture", "Context Engineering", "DeepAgents", "LangGraph", "FastMCP", "A2A", "Google ADK"],
        backend: ["Django REST Framework", "FastAPI", "Celery", "Redis"],
        frontend: ["React.js"],
        cloud: ["AWS", "Azure", "GCP", "Docker", "Github", "Github Actions", "Jenkins", "Nginx"],
        financial: ["Calypso Software", "Regulatory Reporting", "FICC and EQD products"],
        engineering: ["API Design and Development", "Data Structures and Algorithms", "System Design", "Microservices", "Event-based Architectures", "SDLC", "Vibe Coding"],
        data: ["Pandas", "Numpy", "Airflow"]
    },

    experience: [
        {
            company: "Hashedin by Deloitte",
            position: "Software Engineer 2",
            duration: "Jan 2025 – Present",
            location: "Pune, India",
            responsibilities: [
                "Designed, developed, and deployed intelligent AI-powered chatbots for two enterprise websites using LLMs and vector databases, serving internal leadership and over 400,000 global employees.",
                "Utilized LLMs such as AWS Bedrock (Claude Sonnet & Haiku) and OpenAI GPT (gpt 4 & gpt 4o) to ensure secure, relevant, and context-aware conversational experiences.",
                "Developed secure, scalable backend APIs using Django, hosted on AWS App Runner leveraging serverless architecture for efficient deployment and cost optimization.",
                "Authored ~75,000 tokens of production-grade natural language prompts for diverse GenAI tasks to improve response accuracy from 50% to 99%.",
                "Architected cloud-agnostic microservice using asynchronous event-based architecture centered on FastAPI, Celery, Redis and PostgreSQL.",
                "Lead developer of RAG microservice, Knowledge Article Generator microservice, and Prompt Engineering in SaaS project team.",
                "Designed POC for converting APIs into LangChain tools, enabling rapid integration of legacy modules via scalable multi-agent architecture.",
                "Currently leading development of production-grade scalable MultiAgent System and its Context Engineering."
            ]
        },
        {
            company: "CLSA",
            position: "Software Engineer",
            duration: "July 2022 – Dec 2024",
            location: "Pune, India",
            responsibilities: [
                "Developed high-performance ETL system with Python, Pandas, and Oracle SQL, reducing data processing time from 8 hours to under 5 mins, optimizing data throughput by over 90%.",
                "Designed, developed, and deployed multiple scalable applications using Django REST Framework and React.js, building robust APIs and launching three full-scale applications.",
                "Managed architecture, CI/CD, and infrastructure setup using Gunicorn, Nginx, GitHub, Docker, and PostgreSQL, adhering to microservice architecture and SDLC best practices.",
                "Automated ETL pipelines for data extraction from Calypso to regulatory repositories (HKTR, MAS), ensuring 100% compliance with global reporting standards.",
                "Led cross-functional technical initiatives with network security, server, and IAM teams, optimizing infrastructure security and scalability.",
                "Led a team of developers, guided three new members and two graduates, and served as a code reviewer."
            ]
        },
        {
            company: "Persistent Systems",
            position: "Intern",
            duration: "Jan 2022 - June 2022",
            location: "Pune, India",
            responsibilities: [
                "Successfully finished an extensive curriculum that included Java, Spring Boot, React.js, MySQL, Git, and Object-Oriented Programming."
            ]
        }
    ],

    education: [
        {
            degree: "Bachelor of Engineering",
            field: "Computer Science",
            institution: "Savitribai Phule Pune University",
            year: "Aug 2018 - May 2022",
            achievements: [
                "CGPA of 8.91 (on a scale of 10)",
                "Honors Course of 2 years in Artificial Intelligence and Machine Learning"
            ]
        }
    ],

    projects: [
        {
            name: "Enterprise Chatbot & API Service",
            description: "Secure RAG-based chatbots for enterprise knowledge access",
            technologies: ["Python", "Django", "AWS Bedrock (Claude)", "OpenAI GPT", "LangChain", "AWS App Runner", "PostgreSQL", "FAISS", "NLP"],
            highlights: [
                "Built secure RAG-based chatbots using AWS Bedrock, OpenAI, FAISS, and FastAPI",
                "Implemented MSAL and JWT for enterprise authentication",
                "Utilized embeddings and prompt engineering for context-aware responses"
            ]
        },
        {
            name: "Multi-Agent System POC",
            description: "Scalable multi-agent architecture capable of orchestrating hundreds of tools and sub-agents",
            technologies: ["Python", "Context Engineering", "Prompt Engineering", "DeepAgents", "LangChain", "LLMs", "FastMCP", "A2A", "Google ADK"],
            highlights: [
                "Designed and implemented multi-agent POC orchestrating hundreds of tools and sub-agents",
                "Integrated legacy APIs and MCP tools",
                "Approved by stakeholders and adopted as foundation for production-grade agentic system"
            ]
        },
        {
            name: "FileSharing WebApp",
            description: "Secure online SFTP-based file-sharing platform to replace WinSCP",
            technologies: ["Python", "Django REST", "React.js", "Nginx", "Docker", "SFTP", "PostgreSQL", "Gunicorn"],
            highlights: [
                "Built secure SFTP-based file-sharing platform",
                "Enabled efficient server config sharing across teams",
                "Improved support productivity by 75%"
            ]
        },
        {
            name: "Data Comparator WebApp",
            description: "File comparison app supporting multiple formats for regression testing",
            technologies: ["Python", "Django REST Framework", "React.js", "Nginx", "Docker", "Pandas", "OpenCV"],
            highlights: [
                "Developed file comparison supporting .csv, .txt, .xlsx, .json, .png, and .jpg formats",
                "Reduced manual regression testing effort by up to 99%",
                "Implemented complex comparison logic for various data types"
            ]
        },
        {
            name: "PyPoller Automation Application",
            description: "Automated secure file transfers and scheduling system",
            technologies: ["Python", "sFTP", "React.js", "Django REST Framework", "Nginx", "Gunicorn", "Paramiko"],
            highlights: [
                "Automated secure file transfers and scheduling",
                "Saved 8 hours/day of manual work",
                "Reduced operational risk by 90%"
            ]
        }
    ],

    certifications: [
        { name: "AWS Certified Developer - Associate (Amazon)", url: "https://cp.certmetrics.com/amazon/en/public/verify/credential/38c7e9457efa457a92563e75b7cb22f9" },
        { name: "AWS Partner: Accreditation (Technical) & AWS Technical Essentials (Amazon)", url: "https://www.credly.com/badges/6adc2d24-0d73-40d0-8076-9f72c92f3ddb/linked_in_profile" },
        { name: "Google Cloud Certified Professional Cloud DevOps Engineer (Google)", url: "https://www.credly.com/badges/e7bf50ec-6f9d-4ef1-a1c4-befb05810e4e/public_url" },
        { name: "Anthropic Claude with Amazon Bedrock (Anthropic)", url: "http://verify.skilljar.com/c/skfmbw8xq94g" },
        { name: "GenAI Essential Training (Hashedin By Deloitte)", url: null }
    ],

    awards: [
        "Star Award - Exceptional performance and innovative projects at CLSA",
        "Spot Award - Leading GenAI project development and timely delivery at Hashedin by Deloitte",
        "Spot Award - Improving GenAI application accuracy from 50% to 99% using prompt engineering at Hashedin by Deloitte",
        "Top Impactor Award - High-impact contributions, timely delivery, and leadership across frontend, backend, DevOps and GenAI initiatives"
    ]
};

export default portfolioData;