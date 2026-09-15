"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TIMELINE = [
  {
    year: "2022 - 2023",
    role: "Foundations & Web Basics",
    desc: "HTML, CSS, JavaScript fundamentals, Git/GitHub version control & responsive UI structuring.",
  },
  {
    year: "2024 - 2025",
    role: "Frontend Specialist",
    desc: "React, component architecture, Tailwind CSS design systems & client landing pages.",
  },
  {
    year: "2026 - Present",
    role: "Full-Stack & AI Systems",
    desc: "Next.js, Node.js, Express, PostgreSQL, Prisma ORM, Cloudinary, and RAG architectures deployed on Vercel & Render.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 px-6 md:px-12 bg-[#0A0A0C] border-b border-[rgba(236,233,226,0.08)] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Split Layout: Left label, Right story & timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Mono Label */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              transition={{ duration: 0.6 }}
              className="sticky top-28 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF]" />
                <span className="font-mono-custom text-xs text-[#8C7BFF] tracking-[0.2em] font-semibold">
                  04 / WHO I AM
                </span>
              </div>
              <div className="font-mono-custom text-[11px] text-[#57564F] tracking-wider hidden lg:block">
                BACKGROUND &amp; TRAJECTORY
              </div>
            </motion.div>
          </div>

          {/* Right Column: Story Paragraph + Timeline */}
          <div className="lg:col-span-9 space-y-16">
            {/* Story Paragraph with bold accent terms */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-6"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-[#ECE9E2] font-normal leading-relaxed">
                I am a{" "}
                <span className="text-[#8C7BFF] font-semibold">
                  full-stack engineer
                </span>{" "}
                specializing in high-performance{" "}
                <span className="text-[#8C7BFF] font-semibold">
                  SaaS platforms
                </span>{" "}
                and resilient{" "}
                <span className="text-[#8C7BFF] font-semibold">
                  AI-integrated systems
                </span>
                .
              </p>
              <p className="text-base sm:text-lg text-[#8D8B86] leading-relaxed">
                My approach bridges deep backend systems thinking with meticulous frontend craftsmanship. 
                I focus on architecting scalable digital infrastructure that turns complex AI models into seamless, 
                blazing-fast software experiences that users love to touch.
              </p>
            </motion.div>

            {/* 3-Column Timeline Row with Top Hairline Dividers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {TIMELINE.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
                  className="pt-6 border-t border-[rgba(236,233,226,0.12)] space-y-3"
                >
                  <div className="flex items-center gap-2 font-mono-custom text-xs">
                    <span className="text-[#8C7BFF] font-bold tracking-wider">{item.year}</span>
                    <span className="text-[#57564F]">→</span>
                    <span className="text-[#ECE9E2] font-semibold tracking-wider">{item.role}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#8D8B86] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
