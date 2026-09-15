"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  actionLink?: {
    label: string;
    href: string;
  };
  highlights?: string[];
}

function renderMessageText(text: string, isUser: boolean = false) {
  // Regex to match URLs and emails
  const urlOrEmailRegex = /(https?:\/\/[^\s]+|github\.com\/[^\s]+|linkedin\.com\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = text.split(urlOrEmailRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Separate trailing punctuation if attached to URL/email
    let cleanPart = part;
    let trailingPunct = "";
    if (/[.,!?:;]$/.test(cleanPart)) {
      trailingPunct = cleanPart.slice(-1);
      cleanPart = cleanPart.slice(0, -1);
    }

    // Check if email
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleanPart)) {
      return (
        <React.Fragment key={index}>
          <a
            href={`mailto:${cleanPart}`}
            className={
              isUser
                ? "underline underline-offset-4 font-bold text-black hover:opacity-80"
                : "text-[#8C7BFF] hover:text-[#A799FF] underline underline-offset-4 font-semibold inline-flex items-center gap-0.5 hover:opacity-90 transition-all break-all"
            }
          >
            {cleanPart}
          </a>
          {trailingPunct}
        </React.Fragment>
      );
    }

    // Check if URL (github.com, linkedin.com, http...)
    if (/^(https?:\/\/|github\.com\/|linkedin\.com\/|www\.linkedin\.com\/)/i.test(cleanPart)) {
      let fullHref = cleanPart;
      if (cleanPart.startsWith("linkedin.com/in/")) {
        fullHref = `https://www.linkedin.com/in/${cleanPart.replace(/^linkedin\.com\/in\//, "")}`;
      } else if (cleanPart.startsWith("www.linkedin.com/in/")) {
        fullHref = `https://${cleanPart}`;
      } else if (!cleanPart.startsWith("http")) {
        fullHref = `https://${cleanPart}`;
      }

      // Ensure trailing slash on LinkedIn profile URLs
      if (fullHref.includes("linkedin.com/in/") && !fullHref.endsWith("/")) {
        fullHref += "/";
      }

      return (
        <React.Fragment key={index}>
          <a
            href={fullHref}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isUser
                ? "underline underline-offset-4 font-bold text-black hover:opacity-80"
                : "text-[#8C7BFF] hover:text-[#A799FF] underline underline-offset-4 font-semibold inline-flex items-center gap-0.5 hover:opacity-90 transition-all break-all"
            }
          >
            <span>{cleanPart}</span>
            <span className="text-[10px] font-normal opacity-70">↗</span>
          </a>
          {trailingPunct}
        </React.Fragment>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

const QUICK_PROMPTS = [
  {
    label: "🎯 What does Fahad build?",
    query: "What kind of projects and systems does Fahad build?",
  },
  {
    label: "⚡ What is his Tech Stack?",
    query: "What is Fahad's core tech stack and backend tools?",
  },
  {
    label: "💼 Is he available for work?",
    query: "Is Fahad available for freelance, contract, or full-time roles?",
  },
  {
    label: "🤖 What is his AI & RAG experience?",
    query: "How does Fahad integrate AI, LLMs, and RAG in his apps?",
  },
  {
    label: "📬 How do I contact him?",
    query: "How can I get in touch with Fahad for a project?",
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    sender: "ai",
    text: "Hello! 👋 I am Fahad's AI Engineering Copilot. Ask me anything about his technical skills, project builds, tech stack, or how he can help your team build intelligent software. Choose a quick question below or type anything!",
  },
];

export function AIPlayground() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, isTyping]);

  // Intelligent local semantic knowledge engine for Fahad's Portfolio
  const generateAIResponse = (userQuery: string): { text: string; actionLink?: { label: string; href: string } } => {
    const q = userQuery.toLowerCase().trim();

    // Helper regex to test exact standalone words (prevents 'hai' matching 'ai')
    const hasWord = (...words: string[]) => {
      const pattern = new RegExp(`\\b(${words.join("|")})\\b`, "i");
      return pattern.test(q);
    };

    // Detect if the user is asking in Roman Urdu / Hindi
    const isUrduQuery = (() => {
      const urduKeywords = [
        "kya", "hai", "hain", "kese", "kaise", "kesa", "kaisa", "kahan", "kaha", "kidhar",
        "kon", "kaun", "konsa", "kuch", "batao", "btao", "batayein", "rabta", "shadi",
        "umar", "naam", "apka", "aapka", "mera", "meri", "tumhara", "tumhari", "mujhe",
        "mujhko", "hum", "karna", "karo", "karein", "karwana", "banwana", "banaye", "banata",
        "theek", "thik", "salam", "assalam", "aoa", "shukriya", "paise", "khana", "bolo",
        "sunao", "bhai", "yaar", "yr", "bhejo", "chahiye", "karoge", "hoga", "hogi",
        "kiska", "kiski", "milna", "baat", "karni", "seekha", "kisme", "aata", "chal"
      ];
      const pattern = new RegExp(`\\b(${urduKeywords.join("|")})\\b`, "i");
      return pattern.test(q);
    })();

    // 1. Name & Identity Queries (Name kya hai, Who are you, Kon ho, Tumhara naam)
    if (
      hasWord("name", "naam", "identity") ||
      q.includes("name kya") ||
      q.includes("naam kya") ||
      q.includes("who are you") ||
      q.includes("who is fahad") ||
      q.includes("kon ho") ||
      q.includes("kon hai") ||
      q.includes("kiska portfolio")
    ) {
      if (isUrduQuery) {
        return {
          text: "Mera naam Fahad Khan hai! 👨‍💻\n\nMain ek Full-Stack AI Engineer hoon jo high-performance SaaS platforms, Next.js web applications aur smart AI (RAG) systems build karta hoon.\n\nAap mere projects dekh sakte hain ya direct mujhse rabta kar sakte hain!",
          actionLink: {
            label: "WHO I AM (ABOUT) ↓",
            href: "#about",
          },
        };
      }
      return {
        text: "I am Fahad's AI Engineering Copilot! 👨‍💻\n\nFahad Khan is a Full-Stack AI Engineer specializing in modern web applications, scalable backend architectures, and intelligent AI (RAG) systems.\n\nExplore his projects or reach out directly to collaborate!",
        actionLink: {
          label: "WHO I AM (ABOUT) ↓",
          href: "#about",
        },
      };
    }

    // 2. Greetings & Well-being (Hi, Hello, Kesa hai, How are you, Salam)
    if (
      hasWord("hi", "hello", "hey", "salam", "assalam", "aoa", "yo") ||
      q.includes("kesa") ||
      q.includes("kese") ||
      q.includes("kaise") ||
      q.includes("how are you") ||
      q.includes("kya hal") ||
      q.includes("kya haal") ||
      q.includes("what's up") ||
      q.includes("whats up")
    ) {
      if (isUrduQuery) {
        return {
          text: "Main aur Fahad dono bilkul theek aur productive hain! 😊\n\nFahad currently modern full-stack web applications aur smart AI systems build karne mein busy hai.\n\nAap batayein, main Fahad ke skills, projects ya hiring ke baare mein aapki kya madad kar sakta hoon?",
          actionLink: {
            label: "EXPLORE HIS WORK ↓",
            href: "#work",
          },
        };
      }
      return {
        text: "Hello! Thanks for dropping by. Both Fahad and I are doing great and building productive software! 😊\n\nFahad is actively crafting modern full-stack web applications and smart AI solutions.\n\nHow can I assist you today? Feel free to ask about his projects, tech stack, or hiring availability!",
        actionLink: {
          label: "EXPLORE HIS WORK ↓",
          href: "#work",
        },
      };
    }

    // 3. Contact Details, Email, Phone, Socials (GitHub, LinkedIn)
    if (
      hasWord("email", "contact", "phone", "number", "github", "linkedin", "social", "whatsapp", "call") ||
      q.includes("rabta") ||
      q.includes("kaise baat") ||
      q.includes("email kya") ||
      q.includes("reach") ||
      q.includes("talk") ||
      q.includes("touch")
    ) {
      if (isUrduQuery) {
        return {
          text: "Aap Fahad se in channels ke zariye direct rabta kar sakte hain:\n\n📧 Email: fhadikhan00@gmail.com\n🐙 GitHub: github.com/Fahadkhanreal\n💼 LinkedIn: linkedin.com/in/fahad-khan-02a204210/\n\nAap direct email bhej sakte hain!",
          actionLink: {
            label: "SEND DIRECT EMAIL ✉️",
            href: "mailto:fhadikhan00@gmail.com",
          },
        };
      }
      return {
        text: "You can connect directly with Fahad through any of the following channels:\n\n📧 Email: fhadikhan00@gmail.com\n🐙 GitHub: github.com/Fahadkhanreal\n💼 LinkedIn: linkedin.com/in/fahad-khan-02a204210/\n\nClick any link above or compose an email directly!",
        actionLink: {
          label: "SEND DIRECT EMAIL ✉️",
          href: "mailto:fhadikhan00@gmail.com",
        },
      };
    }

    // 4. Tech Stack / Skills / Tools (Next.js, React, Node, Database)
    if (
      hasWord("stack", "tech", "skill", "skills", "tools", "languages", "language", "react", "node", "typescript", "postgres", "prisma", "neon", "tailwind", "express") ||
      q.includes("kisme kaam") ||
      q.includes("kya aata") ||
      q.includes("stack kya")
    ) {
      if (isUrduQuery) {
        return {
          text: "Fahad works with a modern, high-performance Full-Stack ecosystem:\n\n• Frontend: Next.js (App Router), React, TypeScript, JavaScript (ES6+), Tailwind CSS\n• Backend: Node.js, Express.js, REST APIs\n• Databases & ORM: PostgreSQL, Prisma ORM, Neon Database\n• AI & Media: RAG Systems, Cloudinary\n• Deployments: Vercel, Render, Git & GitHub",
          actionLink: {
            label: "EXPLORE TECH CONSTELLATION ↓",
            href: "#stack",
          },
        };
      }
      return {
        text: "Fahad works with a modern, production-grade Full-Stack & AI ecosystem:\n\n• Frontend: Next.js (App Router), React, TypeScript, JavaScript (ES6+), Tailwind CSS\n• Backend: Node.js, Express.js, REST APIs\n• Databases & ORM: PostgreSQL, Prisma ORM, Neon Database\n• AI & Media: RAG Systems, Vector Embeddings, Cloudinary\n• Deployments: Vercel, Render, Git & GitHub",
        actionLink: {
          label: "EXPLORE TECH CONSTELLATION ↓",
          href: "#stack",
        },
      };
    }

    // 5. What he builds / Services / Capabilities
    if (
      hasWord("build", "builds", "service", "services", "create", "capabilities") ||
      q.includes("what does") ||
      q.includes("kya banata") ||
      q.includes("kya karta") ||
      q.includes("kya banaye")
    ) {
      if (isUrduQuery) {
        return {
          text: "Fahad specializes in building high-performance digital products where modern engineering, AI, and design converge:\n\n1. Full-Stack SaaS Platforms: End-to-end web apps with authentication, databases, and responsive UI.\n2. AI-Integrated Applications: Smart search, document assistants, and custom RAG pipelines.\n3. Scalable Backend APIs: Robust Node.js & Express REST APIs with Prisma & PostgreSQL.",
          actionLink: {
            label: "SEE FEATURED PROJECTS ↓",
            href: "#work",
          },
        };
      }
      return {
        text: "Fahad specializes in building high-performance digital products where modern engineering, AI, and design converge:\n\n1. Full-Stack SaaS Platforms: End-to-end web apps with authentication, relational databases, and responsive UI.\n2. AI-Integrated Applications: Intelligent search, document copilots, and custom RAG pipelines.\n3. Scalable Backend APIs: Robust Node.js & Express REST APIs with Prisma ORM & PostgreSQL.",
        actionLink: {
          label: "SEE FEATURED PROJECTS ↓",
          href: "#work",
        },
      };
    }

    // 6. Availability / Hiring / Freelance / Pricing / Rates
    if (
      hasWord("hire", "hiring", "available", "job", "freelance", "pricing", "rate", "cost", "budget") ||
      q.includes("kaam karwana") ||
      q.includes("milna") ||
      q.includes("kitne paise")
    ) {
      if (isUrduQuery) {
        return {
          text: "Fahad is currently AVAILABLE FOR AI & FULL-STACK PROJECTS (2026)! He is open to:\n\n• Full-Stack & Frontend Engineering Roles\n• Freelance & Contract Web / SaaS builds\n• AI & RAG Integration Consulting\n\nPricing aur timeline project ke scope ke mutabiq flexible hai. Details discuss karne ke liye direct email karein!",
          actionLink: {
            label: "EMAIL FAHAD DIRECTLY ✉️",
            href: "mailto:fhadikhan00@gmail.com",
          },
        };
      }
      return {
        text: "Fahad is currently AVAILABLE FOR AI & FULL-STACK PROJECTS (2026)!\n\nHe is open to:\n• Full-Stack & Frontend Engineering Roles\n• Freelance & Contract Web / SaaS builds\n• AI & RAG Integration Consulting\n\nPricing and project timelines are flexible based on scope and technical requirements. Feel free to reach out to discuss your project!",
        actionLink: {
          label: "EMAIL FAHAD DIRECTLY ✉️",
          href: "mailto:fhadikhan00@gmail.com",
        },
      };
    }

    // 7. AI, LLM & RAG Capabilities (using word boundaries so 'hai' doesn't match 'ai')
    if (
      hasWord("ai", "rag", "llm", "llms", "model", "models", "vector", "vectors", "embeddings", "embedding", "gpt", "claude", "gemini") ||
      q.includes("artificial intelligence") ||
      q.includes("machine learning")
    ) {
      if (isUrduQuery) {
        return {
          text: "Fahad builds practical, production-ready AI workflows including:\n\n• RAG (Retrieval-Augmented Generation): Connecting custom company data & PDFs to LLMs for accurate semantic answers.\n• Vector Embeddings & Similarity Search: Fast semantic matching in PostgreSQL & Neon DB.\n• AI Integration: Automating business tasks and workflows through modern AI APIs.",
          actionLink: {
            label: "INSPECT WORK SHOWCASE ↓",
            href: "#work",
          },
        };
      }
      return {
        text: "Fahad builds practical, production-ready AI workflows including:\n\n• RAG (Retrieval-Augmented Generation): Connecting custom business knowledge & documents to LLMs for reliable semantic responses.\n• Vector Embeddings & Similarity Search: Fast semantic matching in PostgreSQL & Neon DB.\n• AI Integration: Automating business tasks and workflows through modern AI APIs and LLM orchestration.",
        actionLink: {
          label: "INSPECT WORK SHOWCASE ↓",
          href: "#work",
        },
      };
    }

    // 8. Past Projects / Work / Portfolio
    if (
      hasWord("project", "projects", "work", "portfolio", "resume", "apps", "app") ||
      q.includes("roast") ||
      q.includes("coffee") ||
      q.includes("restaurant") ||
      q.includes("royal") ||
      q.includes("karachi") ||
      q.includes("vailvogue") ||
      q.includes("ecommerce")
    ) {
      if (isUrduQuery) {
        return {
          text: "Fahad has architected full-stack and AI-driven products, including:\n\n• Roast & Co. (01 ☕): Full-Stack Coffee Shop platform with customer ordering system, admin dashboard, revenue analytics & WhatsApp notifications.\n• VeilVogue (02 👗): Modern modest fashion e-commerce with inventory management & Cloudinary.\n• AI Resume & ATS Builder (03 🤖): Gemini AI-powered ATS resume optimization SaaS.\n• Royal Karachi (04 🍽️): Luxury restaurant web app with dynamic filtered menu & direct WhatsApp ordering.",
          actionLink: {
            label: "INSPECT WORK SHOWCASE ↓",
            href: "#work",
          },
        };
      }
      return {
        text: "Fahad has architected full-stack and AI-driven products, including:\n\n• Roast & Co. (01 ☕): Full-Stack Coffee Shop platform with customer ordering system, admin dashboard, revenue analytics & WhatsApp notifications.\n• VeilVogue (02 👗): Modern modest fashion e-commerce with inventory management & Cloudinary.\n• AI Resume & ATS Builder (03 🤖): Gemini AI-powered ATS resume optimization SaaS.\n• Royal Karachi (04 🍽️): Luxury restaurant web app with dynamic filtered menu & direct WhatsApp ordering.",
        actionLink: {
          label: "INSPECT WORK SHOWCASE ↓",
          href: "#work",
        },
      };
    }

    // 9. Experience & Learning Journey (2022 - Present)
    if (
      hasWord("experience", "journey", "timeline", "history", "learning") ||
      q.includes("kitna experience") ||
      q.includes("kab se") ||
      q.includes("kese seekha") ||
      q.includes("learning journey") ||
      q.includes("experience kitna")
    ) {
      if (isUrduQuery) {
        return {
          text: "Fahad ki 3-Stage Engineering Journey:\n\n🚀 2026 - Present (Full-Stack & AI):\n• Next.js, Node.js, Express, PostgreSQL, Prisma ORM, and RAG architectures.\n• Built AI Gym System, E-Commerce platform, aur currently Next.js + Supabase par AI Clinic Management SaaS develop kar rahe hain.\n\n⚡ 2024 - 2025 (Frontend Specialist):\n• React, JavaScript, Tailwind CSS, Gym Landing Page with WhatsApp integration & responsive design systems.\n\n🌱 2022 - 2023 (Foundations & Self-Learning):\n• HTML, CSS, JavaScript core fundamentals, Git & GitHub workflows.",
          actionLink: {
            label: "SEE EXPERIENCE TIMELINE ↓",
            href: "#experience",
          },
        };
      }
      return {
        text: "Fahad's 3-Stage Engineering Journey:\n\n🚀 2026 - Present (Full-Stack & AI):\n• Next.js, Node.js, Express, PostgreSQL, Prisma ORM, and RAG architectures.\n• Built AI Gym System, E-Commerce platform, and currently engineering an AI Clinic Management SaaS using Next.js & Supabase.\n\n⚡ 2024 - 2025 (Frontend Specialist):\n• React, JavaScript, Tailwind CSS, Gym Landing Page with WhatsApp integration & responsive design systems.\n\n🌱 2022 - 2023 (Foundations & Self-Learning):\n• HTML, CSS, JavaScript core fundamentals, Git & GitHub workflows.",
        actionLink: {
          label: "SEE EXPERIENCE TIMELINE ↓",
          href: "#experience",
        },
      };
    }

    // 10. Personal / Out-of-Scope Questions (Single, Marriage, Age, Personal Life)
    if (
      hasWord("single", "married", "marriage", "shadi", "girlfriend", "gf", "bf", "age", "umar", "personal", "salary", "politics", "religion", "crush", "khana", "food", "movie", "song", "joke") ||
      q.includes("single ha") ||
      q.includes("single hai") ||
      q.includes("shadi hui") ||
      q.includes("shadi kab") ||
      q.includes("kitni age") ||
      q.includes("umar kitni")
    ) {
      if (isUrduQuery) {
        return {
          text: "Mujhe Fahad ki personal life ya private information ka access nahi hai! 😊\n\nMain Fahad ka AI Portfolio Copilot hoon aur sirf uske professional software development, technical skills, projects aur business collaborations ke baare mein trained hoon.\n\nAap Fahad ke Tech Stack, Projects ya Hiring ke baare mein sawal pooch sakte hain!",
          actionLink: {
            label: "CHECK TECH STACK ↓",
            href: "#stack",
          },
        };
      }
      return {
        text: "I do not have access to Fahad's personal life or private information! 😊\n\nI am Fahad's AI Portfolio Copilot and I am trained specifically on his professional software engineering, technical skills, projects, and business collaborations.\n\nFeel free to ask about his Tech Stack, Projects, or hiring availability!",
        actionLink: {
          label: "CHECK TECH STACK ↓",
          href: "#stack",
        },
      };
    }

    // 11. Location / Background / About Fahad
    if (
      q.includes("kahan") ||
      q.includes("location") ||
      q.includes("where") ||
      q.includes("background") ||
      q.includes("study") ||
      q.includes("education")
    ) {
      if (isUrduQuery) {
        return {
          text: "Fahad Khan Karachi, Pakistan mein based ek Full-Stack AI Engineer hain jo global clients aur teams ke sath kaam karte hain. Woh backend systems (Node.js/PostgreSQL) aur modern frontend craftsmanship (Next.js/React/TypeScript) dono ko expertly handle karte hain.",
          actionLink: {
            label: "READ WHOLE STORY ↓",
            href: "#about",
          },
        };
      }
      return {
        text: "Fahad Khan is a Full-Stack AI Engineer based in Karachi, Pakistan, working with clients and teams globally across time zones. He bridges deep backend systems thinking (Node.js/PostgreSQL) with meticulous frontend craftsmanship (Next.js/React/TypeScript).",
        actionLink: {
          label: "READ WHOLE STORY ↓",
          href: "#about",
        },
      };
    }

    // 12. Smart Out-of-Scope Fallback (No access message)
    if (isUrduQuery) {
      return {
        text: "Mere paas is cheez ka access ya information mojood nahi hai.\n\nMain Fahad ka AI Portfolio Assistant hoon aur sirf uske software projects, tech stack (Next.js, Node.js, Express, PostgreSQL, Prisma, RAG), aur business collaborations ke baare mein jawab de sakta hoon.\n\nAap Fahad ke technical work ke baare mein pooch sakte hain ya direct email bhej sakte hain!",
        actionLink: {
          label: "LET'S TALK TO FAHAD →",
          href: "#contact",
        },
      };
    }
    return {
      text: "I don't have specific details on that topic.\n\nI am Fahad's AI Portfolio Assistant, trained on his software projects, tech stack (Next.js, Node.js, Express, PostgreSQL, Prisma, RAG), and engineering capabilities.\n\nFeel free to ask about his technical work or reach out to Fahad directly!",
      actionLink: {
        label: "LET'S TALK TO FAHAD →",
        href: "#contact",
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const response = generateAIResponse(text);

    // Realistic character-by-character streaming effect
    const fullText = response.text;
    let charIndex = 0;
    setStreamingText("");

    const interval = setInterval(() => {
      charIndex += 3;
      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setStreamingText("");
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: fullText,
            actionLink: response.actionLink,
          },
        ]);
      } else {
        setStreamingText(fullText.slice(0, charIndex));
      }
    }, 18);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setStreamingText("");
    setIsTyping(false);
  };

  return (
    <section
      id="playground"
      className="py-14 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 bg-[#0A0A0C] border-b border-[rgba(236,233,226,0.08)] relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(140,123,255,0.08)_0%,rgba(140,123,255,0.02)_45%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-[rgba(236,233,226,0.08)]">
          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF]" />
              <span className="font-mono-custom text-[11px] sm:text-xs text-[#8C7BFF] tracking-[0.2em] font-semibold">
                05 / AI COPILOT
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#ECE9E2]">
              ASK FAHAD&apos;S AI
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8D8B86] max-w-xs sm:max-w-sm">
            Have questions about my engineering stack, availability, or project experience? Ask my interactive AI assistant in real-time.
          </p>
        </div>

        {/* Quick Suggestion Prompts - Horizontal Scroll on Mobile, Wrap on Desktop */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono-custom text-[10px] sm:text-[11px] text-[#57564F] tracking-wider">
            <Sparkles size={12} className="text-[#8C7BFF] shrink-0" />
            <span>SUGGESTED QUICK QUESTIONS (1-TAP):</span>
          </div>
          <div className="flex sm:flex-wrap gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar -mx-1 px-1">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt.label}
                disabled={isTyping}
                onClick={() => handleSendMessage(prompt.query)}
                className="shrink-0 sm:shrink px-3 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#16161A] hover:bg-[#8C7BFF]/15 border border-[rgba(236,233,226,0.1)] hover:border-[#8C7BFF] text-[#ECE9E2] hover:text-[#8C7BFF] font-mono-custom text-[11px] sm:text-xs transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left whitespace-nowrap sm:whitespace-normal"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Chat Window Container - Fixed Balanced Height */}
        <div className="bg-[#111114] border border-[rgba(236,233,226,0.12)] rounded-2xl sm:rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[420px] sm:h-[470px] md:h-[490px]">
          {/* Terminal Window Header Bar */}
          <div className="bg-[#16161A] px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-[rgba(236,233,226,0.08)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] opacity-80" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] opacity-80" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] opacity-80" />
              </div>
              <div className="h-3.5 sm:h-4 w-[1px] bg-[rgba(236,233,226,0.1)]" />
              <div className="flex items-center gap-1.5 sm:gap-2 font-mono-custom text-xs text-[#ECE9E2]">
                <Bot size={13} className="text-[#8C7BFF] sm:w-[14px] sm:h-[14px]" />
                <span className="font-semibold">FAHAD.AI</span>
                <span className="hidden sm:inline text-[#57564F]">— VIRTUAL COPILOT</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 font-mono-custom text-[9px] sm:text-[10px] text-[#63E6BE] bg-[#0A0A0C] px-2 sm:px-2.5 py-0.5 rounded-full border border-[rgba(99,230,190,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#63E6BE] pulse-dot" />
                <span>ONLINE</span>
              </div>

              <button
                onClick={handleReset}
                title="Reset Conversation"
                className="p-1 sm:p-1.5 rounded-lg text-[#8D8B86] hover:text-[#ECE9E2] hover:bg-[#16161A] transition-colors"
              >
                <RotateCcw size={13} className="sm:w-[14px] sm:h-[14px]" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body - Scroll locked without jitter */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-3.5 sm:p-5 overflow-y-auto space-y-2.5 sm:space-y-3 font-mono-custom text-xs sm:text-sm overscroll-contain"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`flex gap-2 sm:gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#16161A] border border-[rgba(140,123,255,0.4)] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7BFF]">
                    <Bot size={13} className="sm:w-[14px] sm:h-[14px]" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-3 sm:p-4 leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-[#8C7BFF] text-[#0A0A0C] font-medium shadow-[0_4px_20px_rgba(140,123,255,0.3)] rounded-br-none text-xs sm:text-sm"
                      : "bg-[#16161A] text-[#ECE9E2] border border-[rgba(236,233,226,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.4)] rounded-tl-none space-y-2 sm:space-y-3 text-xs sm:text-sm"
                  }`}
                >
                  <p>{renderMessageText(msg.text, msg.sender === "user")}</p>

                  {/* Optional Action Button Link */}
                  {msg.actionLink && (
                    <div className="pt-1.5 sm:pt-2 border-t border-[rgba(236,233,226,0.08)]">
                      <a
                        href={msg.actionLink.href}
                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#111114] hover:bg-[#8C7BFF] text-[#8C7BFF] hover:text-[#0A0A0C] font-mono-custom text-[10px] sm:text-[11px] font-bold tracking-wider transition-all border border-[rgba(140,123,255,0.3)] hover:border-[#8C7BFF]"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ArrowRight size={11} className="sm:w-3 sm:h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8C7BFF] flex items-center justify-center shrink-0 mt-0.5 text-[#0A0A0C]">
                    <User size={13} className="sm:w-[14px] sm:h-[14px]" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Live Streaming Response State */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2 sm:gap-3 justify-start"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#16161A] border border-[rgba(140,123,255,0.4)] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7BFF]">
                  <Bot size={13} className="sm:w-[14px] sm:h-[14px]" />
                </div>
                <div className="max-w-[88%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-[#16161A] text-[#ECE9E2] border border-[rgba(236,233,226,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.4)] rounded-tl-none leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                  <span>{renderMessageText(streamingText, false)}</span>
                  <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-[#8C7BFF] ml-1 cursor-blink align-middle" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Interactive Chat Input Bar */}
          <div className="p-2.5 sm:p-4 bg-[#16161A] border-t border-[rgba(236,233,226,0.08)] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Fahad's AI anything..."
                disabled={isTyping}
                className="flex-1 bg-[#111114] border border-[rgba(236,233,226,0.12)] focus:border-[#8C7BFF] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#ECE9E2] placeholder-[#57564F] focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#8C7BFF] hover:bg-white text-[#0A0A0C] font-bold transition-all duration-200 disabled:opacity-40 disabled:hover:bg-[#8C7BFF] disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-[0_0_15px_rgba(140,123,255,0.4)]"
                aria-label="Send message"
              >
                <Send size={14} className="sm:w-[15px] sm:h-[15px]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
