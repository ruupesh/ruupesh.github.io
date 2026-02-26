// Portfolio Data - Centralized data store for Rupesh Bodkhe's portfolio

const portfolioData = {
    personal: {
        name: "Rupesh Bodkhe",
        title: "AI & Backend Engineer",
        email: "rupeshbodkhe2302@gmail.com",
        linkedin: "https://www.linkedin.com/in/rupeshbodkhe",
        github: "https://github.com/ruupesh",
        leetcode: "https://leetcode.com/ruupesh",
        medium: "https://medium.com/@ruupesh",
        phone: "+91-9604996583",
        location: "Pune, India",
        resumeUrl: import.meta.env.VITE_RESUME_URL,
        summary: "AI and Backend Engineer with ~4 years of experience building and shipping end-to-end backend and AgenticAI applications using diverse Python frameworks. Experienced in rapidly developing microservices, event-driven architectures, and multi-agent & GenAI systems on cloud-native infrastructure. Comfortable owning features from design to production, integrating LLMs, APIs, frontend components, and DevOps pipelines to deliver scalable products."
    },
    
    skills: {
        languages: ["Python", "SQL (Postgres, Oracle)"],
        genai: ["LLMs (like OpenAI & Claude)", "Azure AI Foundry", "AWS Bedrock", "NLP", "Prompt Engineering", "Vector Databases", "LangChain", "RAG"],
        agenticai: ["MultiAgent Architecture", "Context Engineering", "DeepAgents", "LangGraph", "MCP", "A2A Protocol", "Google ADK"],
        backend: ["Django REST Framework", "FastAPI", "Celery", "Redis"],
        frontend: ["React.js"],
        cloud: ["AWS", "Azure", "GCP", "Docker", "Github", "Github Actions", "Jenkins", "Nginx"],
        engineering: ["API Design and Development", "Data Structures and Algorithms", "System Design", "Microservices and Event-based Architectures", "SDLC", "AI Tools"],
        data: ["Pandas", "Numpy", "Airflow"]
    },

    experience: [
        {
            company: "Hashedin by Deloitte",
            position: "Software Engineer 2 (AI & Backend)",
            duration: "Jan 2025 – Present",
            location: "Pune, India",
            responsibilities: [
                "Worked on developing 3 enterprise GenAI & Agentic applications: ITSM Agent, Multi-Agent System, Data Analytics Agent.",
                "Authored ~75,000 tokens of production-grade natural language prompts for diverse GenAI tasks (retrieval, evaluation, reasoning, and summarization, etc) to significantly reduce LLM hallucinations and improve response accuracy from 50% to 99% in a Fortune 500 facing ITSM SaaS application.",
                "Lead developer of RAG microservice, Knowledge Article Generator microservice (cloud agnostic asynchronous event based), Prompt Engineering, MultiAgent System and Data Analytics Agent.",
                "Designed and productionized a centralized MultiAgent Orchestrator System with advanced Context Engineering leveraging Google-ADK, A2A and MCP protocols on a FastAPI backend.",
                "Led the design and development of Data Analytics Assistant from scratch to production in record 1 month, enabling analysts to generate SQL results, CSV files, and plotting graphs, significantly reducing repetitive manual work.",
                "Architected and developed a cloud-agnostic microservice by migrating an existing Flask and Airflow DAG using asynchronous event based architecture centered on FastAPI, Celery, Redis and PostgreSQL.",
                "Designed, developed, and deployed two auto-scaling LLM-powered RAG chatbot web applications, serving internal leadership and over 400,000 global employees.",
                "Leveraged Anthropic Claude and OpenAI LLMs to build secure, context-aware conversational systems using RAG grounded exclusively in organizational data.",
                "Hosted the Django backend on AWS App Runner to leverage serverless architecture for efficient deployment, cost optimization and auto-scaling.",
                "Collaborated cross-functionally with project managers, frontend developers, QA, and DevOps teams to define APIs, align chatbot behavior expectations, and ensure smooth scaling and deployment pipelines."
            ]
        },
        {
            company: "CLSA",
            position: "Software Engineer (Fullstack)",
            duration: "July 2022 – Dec 2024",
            location: "Pune, India",
            responsibilities: [
                "Developed a high-performance ETL system with Python, Pandas, and Oracle SQL, reducing data processing time from 8 hours to under 5 minutes (>98% improvement) and significantly accelerating BAU operations.",
                "Designed, developed, and deployed two full-stack applications (monitoring & scheduling platform and file-sharing system) from scratch to production, improving team productivity and operational efficiency.",
                "Automated ETL pipelines for data extraction from Calypso to regulatory repositories (HKTR, MAS), eliminating manual intervention and ensuring 100% compliance with global reporting standards.",
                "Led a team of developers, guided three new members and two graduates, and additionally served as a code reviewer."
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
                "CGPA: 8.91/10",
                "Honors in Artificial Intelligence and Machine Learning (2 years)"
            ]
        }
    ],

    projects: [
        {
            name: "Enterprise Chatbot & API Service",
            description: "Secure, production-grade enterprise web platform with RAG-based chatbots",
            technologies: ["Python", "Django", "MSAL", "JWT", "AWS Bedrock (Claude)", "OpenAI GPT", "LangChain", "AWS App Runner", "PostgreSQL", "Embeddings", "Prompt Engineering", "FAISS", "NLP"],
            highlights: [
                "Developed a secure, production-grade enterprise web platform with RAG-based chatbots (AWS Bedrock, OpenAI, FAISS, FastAPI)",
                "Deployed on an auto-scaling cloud architecture to enable context-aware knowledge retrieval grounded in organizational data",
                "Implemented MSAL and JWT for enterprise authentication"
            ]
        },
        {
            name: "Multi-Agent System Orchestrator Microservice",
            description: "Multi-agent system capable of orchestrating hundreds of MCP tools and remote A2A compatible Agents",
            technologies: ["A2A Protocol", "MCP Protocol", "LLMs", "Python", "FastAPI", "Context Engineering", "Prompt Engineering"],
            highlights: [
                "Designed and implemented a multi-agent system, initially as a POC and subsequently productionized as a standalone microservice",
                "Capable of orchestrating hundreds of MCP tools and remote A2A compatible Agents",
                "Approved by stakeholders and adopted as foundation for production-grade agentic system"
            ]
        },
        {
            name: "Data Analytics Chatbot",
            description: "Enterprise data analytics chatbot for generating SQL queries, CSV files, and graphs",
            technologies: ["Python", "FastAPI", "LangChain Agent", "Prompt Engineering", "Plotly", "Pandas", "AWS S3"],
            highlights: [
                "Built a fully functional enterprise data analytics chatbot within a month",
                "Helps data analysts generate complex SQL queries, convert data to CSV and generate graphs",
                "Significantly reduced repetitive manual work for data analysts"
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
        "Spot Award - Leading the development of a GenAI project and delivering it on time at Hashedin by Deloitte",
        "Spot Award - Significant impact in improving accuracy of entire GenAI application from 50% to 99% using prompt engineering at Hashedin by Deloitte",
        "Top Impactor Award - High-impact contributions, timely delivery, and leadership across frontend, backend, DevOps and GenAI initiatives"
    ],

    publications: [
        {
            title: "Building a Multi-Agent System with Google ADK: A Deep Dive into the MultiAgent Project",
            description: "This article walks through building a multi-agent system using Google’s Agent Development Kit (ADK). It explains the core concepts of agent orchestration, communication, and specialization, and breaks down the architecture of a real multi-agent project with practical examples and code insights.",
            url: "https://medium.com/@ruupesh/building-a-multi-agent-system-with-google-adk-a-deep-dive-into-the-multiagent-project-16bbadb7e13c",
            platform: "Medium",
            date: "January, 2026"
        }
    ]
};

export default portfolioData;