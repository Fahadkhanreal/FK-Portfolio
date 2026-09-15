"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function StatementReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-12 border-y border-[rgba(236,233,226,0.08)] bg-[#0A0A0C] overflow-hidden"
    >
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[radial-gradient(ellipse_at_center,rgba(140,123,255,0.08)_0%,rgba(140,123,255,0.02)_45%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-6">
        {/* Line 1: Dim/muted color */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-semibold text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl text-[#8D8B86] uppercase tracking-tight leading-tight"
          >
            I DON&apos;T JUST BUILD WEBSITES.
          </motion.h2>
        </div>

        {/* Line 2: Large, bright ink color */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 45, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 45, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="font-display font-bold text-[2.35rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#ECE9E2] uppercase tracking-tight leading-[1.1] drop-shadow-[0_4px_24px_rgba(236,233,226,0.08)]"
          >
            I BUILD DIGITAL SYSTEMS.
          </motion.h2>
        </div>

        {/* Line 3: Small mono, accent color, wide tracking */}
        <div className="pt-2 sm:pt-4 overflow-hidden">
          <motion.p
            initial={{ y: 25, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="font-mono-custom text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.24em] text-[#8C7BFF] font-semibold uppercase leading-relaxed max-w-xl mx-auto"
          >
            FROM IDEA → INTERFACE → INTELLIGENCE → PRODUCTION.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
