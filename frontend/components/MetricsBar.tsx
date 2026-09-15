"use client";

import React from "react";
import { Cpu, Zap, Shield, Sparkles } from "lucide-react";

const STATS = [
  {
    icon: <Cpu size={16} className="text-[#8C7BFF]" />,
    value: "10+",
    label: "FULL-STACK APPS",
    sub: "Next.js, React & AI Builds",
  },
  {
    icon: <Zap size={16} className="text-[#63E6BE]" />,
    value: "Optimized",
    label: "FAST APIS",
    sub: "Node.js & Serverless APIs",
  },
  {
    icon: <Sparkles size={16} className="text-[#8C7BFF]" />,
    value: "AI-READY",
    label: "LLM & RAG",
    sub: "LLM APIs, Vector Search & RAG",
  },
  {
    icon: <Shield size={16} className="text-[#63E6BE]" />,
    value: "TypeScript",
    label: "TYPE SAFETY",
    sub: "Type-Safe Full-Stack Development",
  },
];

export function MetricsBar() {
  return (
    <section className="py-12 bg-[#111114] border-y border-[rgba(236,233,226,0.08)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`space-y-1.5 ${
                i !== 0 ? "lg:border-l lg:border-[rgba(236,233,226,0.08)] lg:pl-8" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                {stat.icon}
                <span className="font-mono-custom text-[10px] text-[#8D8B86] tracking-widest">
                  {stat.label}
                </span>
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#ECE9E2] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-[#57564F]">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
