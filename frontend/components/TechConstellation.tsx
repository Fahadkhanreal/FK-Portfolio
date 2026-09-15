"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface TechNode {
  name: string;
  fullName: string;
  category: "frontend" | "backend" | "ai" | "database" | "devops";
  desc: string;
}

const TECH_ITEMS: TechNode[] = [
  { name: "Next.js", fullName: "Next.js 16 (App Router)", category: "frontend", desc: "App Router, Server Actions, SSR & Edge Performance" },
  { name: "React", fullName: "React", category: "frontend", desc: "Interactive UI components, custom hooks & state architecture" },
  { name: "TypeScript", fullName: "TypeScript", category: "frontend", desc: "Strict type safety, generic interfaces & robust architectures" },
  { name: "JavaScript", fullName: "JavaScript (ES6+)", category: "frontend", desc: "Modern ECMAScript, asynchronous programming & event loop execution" },
  { name: "Tailwind", fullName: "Tailwind CSS", category: "frontend", desc: "Utility-first responsive styling, design systems & fluid animations" },
  { name: "Node.js", fullName: "Node.js", category: "backend", desc: "High-throughput asynchronous backend runtime & server logic" },
  { name: "Express", fullName: "Express.js", category: "backend", desc: "RESTful web APIs, routing middleware, authentication & webhooks" },
  { name: "REST APIs", fullName: "RESTful APIs", category: "backend", desc: "Clean CRUD endpoints, HTTP status standards & JSON contracts" },
  { name: "Postgres", fullName: "PostgreSQL", category: "database", desc: "Relational database modeling, indexing & ACID transactions" },
  { name: "Prisma", fullName: "Prisma ORM", category: "database", desc: "Type-safe database queries, schema modeling & automated migrations" },
  { name: "Neon DB", fullName: "Neon Database", category: "database", desc: "Serverless Postgres with instant branching & auto-scaling capabilities" },
  { name: "Cloudinary", fullName: "Cloudinary", category: "devops", desc: "Cloud media storage, image optimization & dynamic asset delivery" },
  { name: "RAG", fullName: "RAG Systems", category: "ai", desc: "Retrieval-Augmented Generation, vector context & LLM pipelines" },
  { name: "GitHub", fullName: "Git & GitHub", category: "devops", desc: "Version control, branching workflows, PRs & code collaboration" },
  { name: "Vercel", fullName: "Vercel & Render", category: "devops", desc: "Production CI/CD deployment, cloud hosting & environment configs" },
];

const CATEGORY_COLORS: Record<
  TechNode["category"],
  { dot: string; text: string; border: string; label: string }
> = {
  frontend: { dot: "#63E6BE", text: "text-[#63E6BE]", border: "border-[#63E6BE]/40", label: "FRONTEND" },
  backend: { dot: "#8C7BFF", text: "text-[#8C7BFF]", border: "border-[#8C7BFF]/40", label: "BACKEND" },
  database: { dot: "#FFD166", text: "text-[#FFD166]", border: "border-[#FFD166]/40", label: "DATABASE" },
  ai: { dot: "#FF6B8B", text: "text-[#FF6B8B]", border: "border-[#FF6B8B]/40", label: "AI SYSTEMS" },
  devops: { dot: "#ECE9E2", text: "text-[#ECE9E2]", border: "border-[#ECE9E2]/40", label: "CLOUD & TOOLS" },
};

const SVG_SIZE = 700;
const CENTER = 350;
const RADIUS = 280;

// Single perfect cosmic circular orbit with equal angular distribution
const NODE_COORDS = TECH_ITEMS.map((_, index) => {
  const angle = (index / TECH_ITEMS.length) * 2 * Math.PI - Math.PI / 2;
  return {
    x: Math.round((CENTER + RADIUS * Math.cos(angle)) * 10) / 10,
    y: Math.round((CENTER + RADIUS * Math.sin(angle)) * 10) / 10,
  };
});

export function TechConstellation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeItem = hoveredIndex !== null ? TECH_ITEMS[hoveredIndex] : null;

  return (
    <section
      id="stack"
      className="py-20 md:py-24 px-6 md:px-12 bg-[#0A0A0C] border-b border-[rgba(236,233,226,0.08)] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center space-y-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16161A] border border-[rgba(236,233,226,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF]" />
            <span className="font-mono-custom text-[11px] text-[#8C7BFF] tracking-[0.16em]">
              02 / TECH STACK
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#ECE9E2]">
            FULL STACK &amp; AI CONSTELLATION
          </h2>
          <p className="text-xs md:text-sm text-[#8D8B86] max-w-md mx-auto">
            Hover over any node to inspect its specific role directly in the central core.
          </p>
        </div>

        {/* Mobile View: Clean Categorized Badge Grid (< 768px) */}
        <div className="md:hidden w-full space-y-6 py-2">
          {(["frontend", "backend", "database", "ai", "devops"] as const).map((cat) => {
            const catItems = TECH_ITEMS.filter((item) => item.category === cat);
            const color = CATEGORY_COLORS[cat];
            return (
              <div key={cat} className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color.dot }} />
                  <span className={`font-mono-custom text-[11px] tracking-wider font-semibold ${color.text}`}>
                    {color.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {catItems.map((item) => (
                    <div
                      key={item.name}
                      className="px-3.5 py-2 rounded-xl bg-[#16161A] border border-[rgba(236,233,226,0.1)] text-[#ECE9E2] font-mono-custom text-xs tracking-wider flex items-center gap-2"
                    >
                      <span>{item.fullName}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Interactive Constellation with Live Center HUD (>= 768px) */}
        <div className="hidden md:flex flex-col items-center justify-center relative w-[700px] h-[700px] select-none">
          {/* Celestial SVG Orbit Geometry */}
          <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
            {/* Main Orbit Ring Track */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="rgba(236, 233, 226, 0.08)"
              strokeDasharray="4 6"
            />

            {/* Inner Concentric Glow Ring */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS * 0.65}
              fill="none"
              stroke="rgba(140, 123, 255, 0.1)"
              strokeDasharray="3 5"
            />

            {/* Subtle Center Radar Pulse Ring */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={125}
              fill="none"
              stroke="rgba(99, 230, 190, 0.08)"
            />

            {/* Dynamic Laser Connecting Lines */}
            {TECH_ITEMS.map((item, index) => {
              const { x: nodeX, y: nodeY } = NODE_COORDS[index];
              const isCurrentHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;
              const catColor = CATEGORY_COLORS[item.category].dot;

              return (
                <line
                  key={item.name}
                  x1={CENTER}
                  y1={CENTER}
                  x2={nodeX}
                  y2={nodeY}
                  stroke={
                    isCurrentHovered
                      ? catColor
                      : isAnyHovered
                      ? "rgba(236, 233, 226, 0.02)"
                      : "rgba(236, 233, 226, 0.07)"
                  }
                  strokeWidth={isCurrentHovered ? 2.5 : 1}
                  strokeDasharray={isCurrentHovered ? "none" : "2 4"}
                  className="transition-colors duration-200"
                />
              );
            })}
          </svg>

          {/* Central Live HUD Core Reactor */}
          <div
            className={`relative z-10 w-[215px] h-[215px] rounded-full bg-[#111114]/95 border-2 transition-all duration-300 flex flex-col items-center justify-center text-center p-4 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] ${
              activeItem
                ? "shadow-[0_0_35px_rgba(140,123,255,0.3)]"
                : "border-[#8C7BFF]/70 shadow-[0_0_30px_rgba(140,123,255,0.25)]"
            }`}
            style={{
              borderColor: activeItem ? CATEGORY_COLORS[activeItem.category].dot : "rgba(140, 123, 255, 0.7)",
            }}
          >
            {activeItem ? (
              <motion.div
                key={activeItem.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center justify-center space-y-1"
              >
                {/* Category Badge */}
                <span
                  className={`font-mono-custom text-[9px] px-2 py-0.5 rounded-full border ${
                    CATEGORY_COLORS[activeItem.category].border
                  } ${CATEGORY_COLORS[activeItem.category].text} bg-[#16161A] font-semibold tracking-wider`}
                >
                  {CATEGORY_COLORS[activeItem.category].label}
                </span>

                {/* Tech Full Name */}
                <div className="font-display font-bold text-sm sm:text-[15px] text-[#ECE9E2] uppercase tracking-tight leading-tight">
                  {activeItem.fullName}
                </div>

                {/* Architecture Description */}
                <p className="text-[10.5px] text-[#8D8B86] leading-snug max-w-[185px] px-1 line-clamp-3">
                  {activeItem.desc}
                </p>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#63E6BE] pulse-dot" />
                  <span className="font-mono-custom text-[8.5px] text-[#63E6BE] tracking-widest">
                    TELEMETRY ACTIVE
                  </span>
                </div>
                <div className="font-display font-bold text-sm uppercase tracking-wider text-[#ECE9E2]">
                  FULL STACK
                </div>
                <div className="font-mono-custom text-[10px] font-bold text-[#8C7BFF] tracking-widest">
                  + AI CORE
                </div>
                <div className="font-mono-custom text-[8.5px] text-[#57564F] tracking-wider pt-1 border-t border-[rgba(236,233,226,0.08)] mt-0.5 w-28">
                  HOVER ANY NODE
                </div>
              </div>
            )}
          </div>

          {/* 15 Positioned Interactive Node Pills (Staggered between Outer & Inner Orbits) */}
          {TECH_ITEMS.map((item, index) => {
            const { x: nodeX, y: nodeY } = NODE_COORDS[index];
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            const categoryMeta = CATEGORY_COLORS[item.category];

            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "absolute",
                  left: `${nodeX}px`,
                  top: `${nodeY}px`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`z-20 cursor-pointer px-3 py-1.5 rounded-full border transition-all duration-200 select-none ${
                  isHovered
                    ? "bg-[#8C7BFF] text-[#0A0A0C] border-[#8C7BFF] shadow-[0_0_20px_rgba(140,123,255,0.6)] font-bold scale-110 z-30"
                    : isDimmed
                    ? "opacity-30 bg-[#16161A] text-[#8D8B86] border-[rgba(236,233,226,0.06)]"
                    : "opacity-100 bg-[#16161A]/95 text-[#ECE9E2] border-[rgba(236,233,226,0.12)] hover:border-[#8C7BFF]/70 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors"
                    style={{
                      backgroundColor: isHovered ? "#0A0A0C" : categoryMeta.dot,
                    }}
                  />
                  <span className="font-mono-custom text-[10.5px] tracking-wider whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
