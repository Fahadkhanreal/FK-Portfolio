"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, ProjectData } from "./ProjectCard";
import { Coffee, UtensilsCrossed, FileText, ShoppingBag, ExternalLink } from "lucide-react";

function GithubIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const PROJECTS: ProjectData[] = [
  {
    id: "roast-and-co",
    number: "01",
    title: "Roast & Co.",
    category: "Full-Stack Coffee Shop Platform + Admin Dashboard",
    description:
      "Complete coffee shop e-commerce platform with customer ordering system and comprehensive admin dashboard featuring product management, category ordering, revenue analytics, customer insights, and WhatsApp integration for order notifications.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "WhatsApp API"],
    metrics: "ORDER MANAGEMENT · REVENUE ANALYTICS",
    accentIcon: <Coffee size={20} className="text-[#8C7BFF]" />,
    imageSrc: "/roast-co.png",
    liveUrl: "https://roast-co-coffee-eegorigzu-fahadkhans-projects.vercel.app/",
    githubUrl: "https://github.com/Fahadkhanreal/Roast---Co-Coffee-Web/tree/main/frontend",
  },
  {
    id: "veilvogue",
    number: "02",
    title: "VeilVogue",
    category: "Full-Stack E-Commerce + Admin Dashboard",
    description:
      "A full-stack modest fashion e-commerce platform featuring dynamic multi-attribute product filtering, persistent cart state, and multi-payment checkout (COD & Mobile Wallets). Built with a dedicated Admin Control Panel for real-time inventory management, Cloudinary media handling, and automated transactional email dispatching via Resend.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Node.js", "Express 5", "Prisma ORM", "PostgreSQL", "Zustand", "Cloudinary", "Resend API", "JWT Auth"],
    metrics: "INVENTORY ENGINE · RESEND EMAILS",
    accentIcon: <ShoppingBag size={20} className="text-[#8C7BFF]" />,
    imageSrc: "/vailvague.png",
    liveUrl: "https://vail-vogue-full-stack-e-commerce-we.vercel.app/",
    githubUrl: "https://github.com/Fahadkhanreal/VailVogue-Full-Stack-E-Commerce-Website",
  },
  {
    id: "ai-resume-builder",
    number: "03",
    title: "AI Resume & ATS Builder",
    category: "Full Stack / AI SaaS Application",
    description:
      "An AI-powered SaaS application that helps job seekers build professional, ATS-optimized resumes in real time. Features Gemini AI for automated bullet-point enhancements, an intelligent ATS scoring engine with keyword job-matching, drag-and-drop customization, and instant multi-template PDF exports.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Gemini AI",
      "Neon PostgreSQL",
      "Prisma ORM",
      "Clerk Auth",
      "Upstash Redis",
      "@react-pdf",
    ],
    metrics: "GEMINI AI · ATS SCORING ENGINE",
    accentIcon: <FileText size={20} className="text-[#8C7BFF]" />,
    imageSrc: "/ai-resume.png",
    liveUrl: "https://ai-resume-ats-builder-qz7l7s4pv-fahadkhans-projects.vercel.app/",
    githubUrl: "https://github.com/Fahadkhanreal/AI-Resume-ATS-Builder/tree/main/frontend",
  },
  {
    id: "royal-karachi",
    number: "04",
    title: "Royal Karachi",
    category: "Luxury Dining & Online Food Ordering Platform",
    description:
      "A high-performance, responsive luxury restaurant web app built with Next.js 16 and Tailwind CSS. Features dynamic category-filtered digital menu with one-click direct WhatsApp ordering, animated customer testimonials carousel, interactive lightbox photo gallery, and Google Maps integration.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Hook Form",
      "WhatsApp API",
    ],
    metrics: "WHATSAPP ORDERING · DYNAMIC MENU",
    accentIcon: <UtensilsCrossed size={20} className="text-[#8C7BFF]" />,
    imageSrc: "/restaurant.png",
    liveUrl: "https://royal-karachi-landing-page.vercel.app/",
    githubUrl: "https://github.com/Fahadkhanreal/royal-karachi-landing-page",
  },
];

export function WorkShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProject = PROJECTS[activeIdx];

  return (
    <section
      id="work"
      className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#0A0A0C] border-b border-[rgba(236,233,226,0.08)] relative"
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-3.5 sm:pb-5 border-b border-[rgba(236,233,226,0.08)]">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF]" />
              <span className="font-mono-custom text-xs text-[#8C7BFF] tracking-[0.2em] font-semibold">
                01 / SELECTED WORK
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#ECE9E2]">
              FEATURED PROJECTS
            </h2>
          </div>

          <div className="font-mono-custom text-[11px] text-[#57564F] tracking-widest hidden sm:block">
            SELECT PROJECT BELOW TO EXPLORE
          </div>
        </div>

        {/* 4-Project Grid Selector (Clean compact grid on mobile & desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {PROJECTS.map((p, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={p.id}
                onClick={() => setActiveIdx(i)}
                className={`text-left p-2.5 sm:p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? "bg-[#16161A] border-[#8C7BFF] shadow-[0_0_20px_rgba(140,123,255,0.2)] ring-1 ring-[#8C7BFF]/40"
                    : "bg-[#111114] border-[rgba(236,233,226,0.07)] hover:border-[rgba(236,233,226,0.2)] hover:bg-[#141418]"
                }`}
              >
                {/* Active Glowing Top Accent Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#8C7BFF] shadow-[0_0_10px_#8C7BFF]" />
                )}

                <div className="flex items-center justify-between pb-1 sm:pb-1.5 font-mono-custom text-xs">
                  <span
                    className={`font-bold tracking-wider ${
                      isActive ? "text-[#8C7BFF]" : "text-[#57564F] group-hover:text-[#8D8B86]"
                    }`}
                  >
                    {p.number}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#63E6BE] pulse-dot" />
                    )}
                    <span className="text-[9px] sm:text-[9.5px] text-[#8D8B86] truncate max-w-[80px] sm:max-w-[120px]">
                      {p.category.split("+")[0].trim()}
                    </span>
                  </div>
                </div>

                <div
                  className={`font-display font-semibold text-xs sm:text-sm truncate transition-colors ${
                    isActive ? "text-[#ECE9E2]" : "text-[#8D8B86] group-hover:text-[#ECE9E2]"
                  }`}
                >
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Project Highlight View */}
        <div className="bg-[#111114] border border-[rgba(236,233,226,0.09)] rounded-2xl sm:rounded-[22px] p-4 sm:p-6 lg:p-7 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center"
            >
              {/* Left Column: Project Info (5 Cols on desktop) */}
              <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="font-mono-custom text-xl sm:text-3xl font-bold text-[#8C7BFF]">
                    {activeProject.number}
                  </span>
                  <span className="h-3.5 sm:h-4 w-[1px] bg-[rgba(236,233,226,0.15)]" />
                  <span className="font-mono-custom text-[10px] sm:text-[11px] tracking-[0.14em] text-[#8D8B86] uppercase truncate">
                    {activeProject.category}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-bold text-[#ECE9E2] uppercase tracking-tight">
                  {activeProject.title}
                </h3>

                {/* Mobile Preview Image (Integrated right under title on mobile, hidden on desktop) */}
                <div className="lg:hidden w-full pt-1 pb-1">
                  <ProjectCard project={activeProject} />
                </div>

                <p className="text-xs sm:text-sm text-[#8D8B86] leading-relaxed font-normal">
                  {activeProject.description}
                </p>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                  {activeProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-custom text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-[#16161A] text-[#ECE9E2] border border-[rgba(236,233,226,0.1)] tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Action Links (Live Demo + GitHub) */}
                <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#8C7BFF] text-[#0A0A0C] font-mono-custom text-xs font-bold tracking-[0.14em] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all flex-1 sm:flex-initial"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#16161A] hover:bg-[#202026] text-[#ECE9E2] font-mono-custom text-xs tracking-wider border border-[rgba(236,233,226,0.12)] hover:border-[#8C7BFF]/50 transition-all flex-1 sm:flex-initial"
                    >
                      <GithubIcon size={13} />
                      <span>GITHUB CODE</span>
                    </a>
                  )}

                  <span className="font-mono-custom text-[9.5px] sm:text-[10px] text-[#57564F] ml-auto hidden sm:block">
                    {activeProject.metrics}
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Mockup Card (7 Cols on desktop, hidden on mobile) */}
              <div className="hidden lg:flex lg:col-span-7 justify-center w-full">
                <ProjectCard project={activeProject} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
