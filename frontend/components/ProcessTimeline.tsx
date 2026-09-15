"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  sparklinePoints: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Problem space & business logic audit",
    description:
      "Understanding client requirements, breaking down features, mapping database relations, and establishing clean project architecture specifications.",
    tools: ["User Flow Mapping", "Technical Specs", "Feasibility Audit"],
    sparklinePoints: "0,25 30,22 60,18 90,14 120,19 150,10 180,6",
  },
  {
    number: "02",
    title: "Architect",
    subtitle: "Database schema & REST API design",
    description:
      "Designing relational data structures in PostgreSQL, defining Prisma models, and planning structured RESTful API endpoints.",
    tools: ["PostgreSQL Schema", "Prisma ORM", "Express.js REST APIs"],
    sparklinePoints: "0,20 30,16 60,22 90,12 120,8 150,14 180,4",
  },
  {
    number: "03",
    title: "Design",
    subtitle: "Responsive UI & design tokens",
    description:
      "Crafting modern, accessible, and mobile-friendly user interfaces with utility-first Tailwind CSS and fluid micro-animations.",
    tools: ["Tailwind CSS", "Responsive Design", "Framer Motion", "A11y"],
    sparklinePoints: "0,26 30,18 60,12 90,16 120,6 150,8 180,2",
  },
  {
    number: "04",
    title: "Build",
    subtitle: "Full-stack implementation & media",
    description:
      "Developing reactive frontend components with Next.js App Router & React, integrating Node.js backend controllers, and handling media with Cloudinary.",
    tools: ["Next.js", "React", "Node.js", "Cloudinary"],
    sparklinePoints: "0,28 30,20 60,15 90,10 120,7 150,4 180,2",
  },
  {
    number: "05",
    title: "Integrate AI",
    subtitle: "RAG pipelines & semantic search",
    description:
      "Connecting AI language models with custom company data using RAG (Retrieval-Augmented Generation) and vector search in Neon DB.",
    tools: ["RAG Pipelines", "Vector Search", "LLM APIs", "Neon DB"],
    sparklinePoints: "0,24 30,14 60,18 90,6 120,12 150,3 180,1",
  },
  {
    number: "06",
    title: "Deploy",
    subtitle: "Continuous deployment & cloud hosting",
    description:
      "Deploying frontend applications to Vercel and backend services to Render with Git & GitHub automated CI/CD workflows.",
    tools: ["Vercel Hosting", "Render Backend", "Git & GitHub", "Production ENV"],
    sparklinePoints: "0,22 30,18 60,10 90,14 120,5 150,2 180,1",
  },
  {
    number: "07",
    title: "Optimize",
    subtitle: "Type safety, performance & testing",
    description:
      "Ensuring strict TypeScript type safety, optimizing database queries, compressing assets, and maintaining fast sub-50ms API responses.",
    tools: ["TypeScript Strict", "Prisma Queries", "Asset Optimization", "Fast Load Speed"],
    sparklinePoints: "0,20 30,12 60,8 90,5 120,4 150,2 180,0",
  },
];

export function ProcessTimeline() {
  // First step open by default
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section
      id="experience"
      className="py-28 px-6 md:px-12 bg-[#0A0A0C] border-b border-[rgba(236,233,226,0.08)] relative"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[rgba(236,233,226,0.08)] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF]" />
              <span className="font-mono-custom text-xs text-[#8C7BFF] tracking-[0.2em] font-semibold">
                05 / PROCESS &amp; PIPELINE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#ECE9E2]">
              HOW I ENGINEER SYSTEMS
            </h2>
          </div>
          <div className="font-mono-custom text-xs text-[#57564F]">
            7-STAGE METHODOLOGY
          </div>
        </div>

        {/* 7-Step Interactive Accordion */}
        <div className="divide-y divide-[rgba(236,233,226,0.08)] border-b border-[rgba(236,233,226,0.08)]">
          {PROCESS_STEPS.map((step, index) => {
            const isOpen = openIdx === index;

            return (
              <div key={step.number} className="transition-colors duration-200">
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span
                      className={`font-mono-custom text-lg md:text-xl font-bold transition-colors ${
                        isOpen ? "text-[#8C7BFF]" : "text-[#57564F] group-hover:text-[#8D8B86]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3
                        className={`font-display text-xl md:text-2xl font-bold uppercase tracking-tight transition-colors ${
                          isOpen ? "text-[#ECE9E2]" : "text-[#8D8B86] group-hover:text-[#ECE9E2]"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <span className="font-mono-custom text-[11px] text-[#57564F] hidden sm:block mt-0.5">
                        {step.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 rounded-full border border-[rgba(236,233,226,0.1)] text-[#8D8B86] group-hover:border-[#8C7BFF] group-hover:text-[#8C7BFF] transition-all">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-12 md:pl-20 pr-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-8 space-y-4">
                          <p className="text-sm md:text-base text-[#8D8B86] leading-relaxed">
                            {step.description}
                          </p>

                          {/* Tag pills */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {step.tools.map((tool) => (
                              <span
                                key={tool}
                                className="font-mono-custom text-[10.5px] px-3 py-1 bg-[#16161A] text-[#ECE9E2] rounded-md border border-[rgba(236,233,226,0.1)]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Inline Animated Sparkline SVG */}
                        <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center">
                          <div className="bg-[#111114] p-3.5 rounded-xl border border-[rgba(236,233,226,0.08)] w-full max-w-[220px]">
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[rgba(236,233,226,0.06)]">
                              <span className="font-mono-custom text-[9px] text-[#8D8B86]">VELOCITY</span>
                              <span className="font-mono-custom text-[9px] text-[#63E6BE]">100% CADENCE</span>
                            </div>
                            <svg
                              className="w-full h-8 overflow-visible"
                              viewBox="0 0 180 30"
                              fill="none"
                            >
                              <polyline
                                points={step.sparklinePoints}
                                stroke="#8C7BFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
