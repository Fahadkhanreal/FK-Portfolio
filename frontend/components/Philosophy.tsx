"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="w-full py-24 md:py-32 px-6 md:px-12 bg-[#111114] border-y border-[rgba(236,233,226,0.08)] relative overflow-hidden"
    >
      {/* Subtle ambient lighting accent */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(140,123,255,0.06)_0%,rgba(140,123,255,0.015)_45%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF]" />
          <span className="font-mono-custom text-xs text-[#8C7BFF] tracking-[0.18em]">
            03 / PHILOSOPHY
          </span>
        </motion.div>

        {/* Huge Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ECE9E2] uppercase tracking-[-0.02em] leading-[1.1]"
        >
          DESIGN ISN&apos;T DECORATION.{" "}
          <span className="text-[#8C7BFF] drop-shadow-[0_0_20px_rgba(140,123,255,0.4)]">
            ENGINEERING
          </span>{" "}
          ISN&apos;T JUST CODE.
        </motion.h2>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-[#8D8B86] max-w-3xl leading-relaxed font-normal"
        >
          I combine product thinking, modern engineering, AI and visual design to build
          digital experiences that are fast, intelligent and memorable.
        </motion.p>
      </div>
    </section>
  );
}
