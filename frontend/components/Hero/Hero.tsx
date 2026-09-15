"use client";

import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "./Typewriter";
import { AICore } from "./AICore";
import { ArrowRight, Bot, Code2, Database, ShieldCheck } from "lucide-react";

const CORE_FOCUS = [
  {
    icon: <Bot size={15} className="text-[#8C7BFF]" />,
    title: "AI & LLM Systems",
    desc: "Autonomous agents, RAG, Claude & GPT-4o pipelines",
  },
  {
    icon: <Code2 size={15} className="text-[#63E6BE]" />,
    title: "Full-Stack Architecture",
    desc: "Next.js App Router, TypeScript, React & Node.js",
  },
  {
    icon: <Database size={15} className="text-[#ECE9E2]" />,
    title: "Database & Cloud Deployments",
    desc: "PostgreSQL, Neon DB, Prisma, Vercel & Render",
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between pt-24 pb-10 lg:pt-28 lg:pb-12 px-6 sm:px-10 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Mobile Ambient Glow Backdrop */}
      <div className="lg:hidden absolute top-10 right-0 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(140,123,255,0.14)_0%,rgba(140,123,255,0.03)_45%,transparent_70%)] pointer-events-none" />
      <div className="lg:hidden absolute bottom-20 left-0 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,230,190,0.08)_0%,rgba(99,230,190,0.02)_45%,transparent_70%)] pointer-events-none" />

      {/* Desktop subtle ambient background accent */}
      <div className="hidden lg:block absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(140,123,255,0.08)_0%,rgba(140,123,255,0.02)_45%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto z-10">
        {/* Left Column: Eyebrow, Name, Role, Statement, Mobile Cards */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#16161A] border border-[rgba(236,233,226,0.12)] w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#63E6BE] pulse-dot" />
            <span className="font-mono-custom text-[10px] sm:text-[11px] tracking-[0.14em] text-[#8C7BFF] font-medium">
              AVAILABLE FOR AI &amp; FULL-STACK PROJECTS
            </span>
          </motion.div>

          {/* Sequential Typewriter for Name & Role */}
          <Typewriter />

          {/* Statement Paragraph (fades in) */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="text-base sm:text-lg lg:text-xl text-[#8D8B86] max-w-xl leading-relaxed font-normal"
          >
            Building intelligent digital products where engineering, AI and design converge.
          </motion.p>

          {/* Mobile-Only: Core Capabilities & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="lg:hidden space-y-5 pt-2"
          >
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="px-6 py-3 rounded-full bg-[#8C7BFF] text-[#0A0A0C] font-mono-custom text-xs font-bold tracking-wider flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(140,123,255,0.4)]"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="#contact"
                className="px-5 py-3 rounded-full bg-[#16161A] text-[#ECE9E2] border border-[rgba(236,233,226,0.12)] font-mono-custom text-xs tracking-wider hover:border-[#8C7BFF]"
              >
                LET&apos;S TALK
              </a>
            </div>

            {/* Core Capabilities Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#111114]/95 border border-[rgba(236,233,226,0.1)] shadow-[0_12px_35px_rgba(0,0,0,0.6)] space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(236,233,226,0.06)]">
                <span className="font-mono-custom text-[10.5px] text-[#8C7BFF] font-semibold tracking-wider">
                  CORE ENGINEERING FOCUS
                </span>
                <div className="flex items-center gap-1.5 font-mono-custom text-[10px] text-[#63E6BE]">
                  <ShieldCheck size={13} />
                  <span>PRODUCTION READY</span>
                </div>
              </div>

              {/* 3 Core Expertise Items */}
              <div className="space-y-2.5">
                {CORE_FOCUS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-2.5 rounded-xl bg-[#16161A] border border-[rgba(236,233,226,0.05)]"
                  >
                    <div className="p-1.5 rounded-lg bg-[#111114] shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-display font-semibold text-xs text-[#ECE9E2]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#8D8B86] leading-tight">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Desktop Glowing Generative AI Core */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
          <AICore />
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-[rgba(236,233,226,0.06)]"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-[1.5px] h-8 bg-[rgba(236,233,226,0.15)] overflow-hidden">
            <motion.div
              animate={{ y: [-32, 32] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-3.5 bg-[#8C7BFF]"
            />
          </div>
          <span className="font-mono-custom text-[10px] tracking-[0.2em] text-[#57564F]">
            SCROLL
          </span>
        </div>

        <div className="font-mono-custom text-[10px] tracking-[0.14em] text-[#57564F] hidden sm:block">
          LATENCY: OPTIMAL · LOC: 24.8607° N, 67.0011° E
        </div>
      </motion.div>
    </section>
  );
}
