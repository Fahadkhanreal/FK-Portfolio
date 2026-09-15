"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitCommit, Sparkles } from "lucide-react";

export function CurrentlyBuilding() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const techBadges = ["Next.js (App Router)", "TypeScript", "Supabase", "PostgreSQL", "AI / RAG", "Tailwind CSS"];

  return (
    <section
      ref={ref}
      className="py-12 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 bg-[#0A0A0C] border-b border-[rgba(236,233,226,0.08)] relative"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-br from-[#16161A] via-[#111114] to-[#16161A] border border-[rgba(140,123,255,0.22)] rounded-2xl sm:rounded-[22px] p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow Inside Card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(140,123,255,0.12)_0%,rgba(140,123,255,0.03)_45%,transparent_70%)] pointer-events-none" />

          {/* Top Row: In Development Pill + Updated This Week */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 pb-3.5 sm:pb-5 border-b border-[rgba(236,233,226,0.08)]">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#111114] border border-[rgba(99,230,190,0.25)]">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#63E6BE] pulse-dot" />
              <span className="font-mono-custom text-[10px] sm:text-[11px] text-[#63E6BE] font-semibold tracking-widest">
                IN ACTIVE DEVELOPMENT
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 font-mono-custom text-[10px] sm:text-[11px] text-[#8D8B86] tracking-wider">
              <GitCommit size={13} className="text-[#8C7BFF] sm:w-[14px] sm:h-[14px]" />
              <span>UPDATED THIS WEEK</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="py-4 sm:py-6 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Sparkles size={20} className="text-[#8C7BFF] sm:w-6 sm:h-6 shrink-0" />
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#ECE9E2]">
                AI CLINIC SAAS
              </h3>
            </div>

            <p className="text-xs sm:text-base text-[#8D8B86] leading-relaxed max-w-2xl">
              Architecting an intelligent clinical operations and patient triage SaaS — automating appointment scheduling, patient intake summarization with AI/RAG, and doctor workflow management built entirely with Next.js and Supabase.
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2.5 pt-1 sm:pt-2">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="font-mono-custom text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-[#0A0A0C] text-[#ECE9E2] border border-[rgba(236,233,226,0.1)] tracking-wider"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Sparkline Activity Graph */}
          <div className="pt-3.5 sm:pt-5 border-t border-[rgba(236,233,226,0.08)] space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between font-mono-custom text-[9px] sm:text-[10px] text-[#57564F] tracking-widest">
              <span>COMMITS &amp; PIPELINE ACTIVITY</span>
              <span className="text-[#8C7BFF]">99.8% VELOCITY</span>
            </div>

            <div className="w-full h-9 sm:h-12 bg-[#0A0A0C]/70 rounded-lg sm:rounded-xl p-1.5 sm:p-2 border border-[rgba(236,233,226,0.05)] flex items-center">
              <svg className="w-full h-6 sm:h-8" viewBox="0 0 400 30" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="activityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8C7BFF" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#8C7BFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#63E6BE" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,22 Q 25,12 50,18 T 100,8 T 150,22 T 200,6 T 250,16 T 300,10 T 350,4 T 400,2"
                  stroke="url(#activityGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
