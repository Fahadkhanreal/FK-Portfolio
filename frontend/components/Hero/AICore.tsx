"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Database, Terminal, ShieldCheck } from "lucide-react";

export function AICore() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[540px] lg:h-[600px] flex items-center justify-center select-none"
    >
      <div className="relative w-[440px] h-[440px] lg:w-[520px] lg:h-[520px] flex items-center justify-center">
        {/* Ambient Aurora Glow Reactor (Intensifies on hover) */}
        <div
          className={`absolute w-[460px] h-[460px] lg:w-[520px] lg:h-[520px] rounded-full transition-all duration-700 pointer-events-none ${
            isHovered
              ? "bg-[radial-gradient(circle_at_center,rgba(140,123,255,0.35)_0%,rgba(99,230,190,0.12)_35%,rgba(140,123,255,0.03)_55%,transparent_70%)] scale-110"
              : "bg-[radial-gradient(circle_at_center,rgba(140,123,255,0.20)_0%,rgba(140,123,255,0.04)_45%,transparent_70%)] scale-100"
          }`}
        />

        {/* Ring 1: Celestial Outer Orbit (440px / 500px) */}
        <div
          className={`absolute w-[420px] h-[420px] lg:w-[490px] lg:h-[490px] rounded-full border border-[rgba(236,233,226,0.1)] pointer-events-none transition-colors duration-500 ${
            isHovered ? "border-[#8C7BFF]/40" : ""
          } animate-spin-slow`}
        >
          {/* Orbiting Particle Comet 1 */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#8C7BFF] shadow-[0_0_20px_#8C7BFF,0_0_8px_#fff]" />
            <div className="absolute w-8 h-8 rounded-full bg-[#8C7BFF]/20 animate-ping" />
          </div>
          {/* Orbiting Particle Comet 2 */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ECE9E2] shadow-[0_0_10px_#ECE9E2]" />
        </div>

        {/* Ring 2: Counter-Rotating Dashed Mint Orbit (340px / 400px) */}
        <div
          className={`absolute w-[340px] h-[340px] lg:w-[400px] lg:h-[400px] rounded-full border border-dashed border-[rgba(140,123,255,0.35)] pointer-events-none transition-colors duration-500 ${
            isHovered ? "border-[#63E6BE]/60" : ""
          } animate-spin-reverse-slow`}
        >
          {/* Orbiting Particle 3 */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#63E6BE] shadow-[0_0_16px_#63E6BE]" />
        </div>

        {/* Ring 3: Segmented Gyroscopic Radar Ring (260px / 310px) */}
        <div className="absolute w-[260px] h-[260px] lg:w-[310px] lg:h-[310px] rounded-full border border-[rgba(236,233,226,0.18)] animate-spin-medium pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8C7BFF]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8C7BFF]" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#63E6BE]" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#63E6BE]" />
        </div>

        {/* Ring 4: Inner High-Frequency Core Halo (180px / 220px) */}
        <div className="absolute w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] rounded-full border border-dashed border-[rgba(236,233,226,0.25)] animate-spin-slow pointer-events-none" />

        {/* 4 Cybernetic HUD Corner Brackets */}
        <div className="absolute w-[330px] h-[330px] lg:w-[390px] lg:h-[390px] pointer-events-none">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#8C7BFF] opacity-70" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#8C7BFF] opacity-70" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#63E6BE] opacity-70" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#63E6BE] opacity-70" />
        </div>

        {/* Central Glowing Quantum Singularity Core */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-20 w-[140px] h-[140px] lg:w-[170px] lg:h-[170px] rounded-full flex items-center justify-center transition-all duration-500 ${
            isHovered
              ? "shadow-[0_0_80px_rgba(140,123,255,0.7),inset_0_0_40px_rgba(255,255,255,0.4)] scale-110"
              : "shadow-[0_0_60px_rgba(140,123,255,0.5),inset_0_0_30px_rgba(236,233,226,0.3)] scale-100"
          } bg-[radial-gradient(circle_at_35%_35%,#ECE9E2_0%,#8C7BFF_40%,#111114_90%)]`}
        >
          {/* Inner Glass Prism */}
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[#0A0A0C]/60 backdrop-blur-md border border-[rgba(236,233,226,0.4)] flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(140,123,255,0.5)]">
            <Cpu className="text-[#8C7BFF] animate-pulse" size={24} />
            <span className="font-mono-custom text-[8.5px] font-extrabold text-[#ECE9E2] tracking-widest mt-1">
              AI CORE
            </span>
          </div>
        </motion.div>

        {/* Floating Holographic Satellite HUD Nodes */}

        {/* Satellite 1: AI ARCHITECT (Top Right) */}
        <motion.div
          animate={{ y: [-8, 8, -8], x: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3 right-4 lg:right-0 z-30 bg-[#16161A]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[rgba(140,123,255,0.5)] shadow-[0_0_25px_rgba(140,123,255,0.35)] flex items-center gap-2"
        >
          <Sparkles size={14} className="text-[#8C7BFF]" />
          <span className="font-mono-custom text-xs font-bold text-[#ECE9E2]">
            AI ARCHITECT
          </span>
        </motion.div>

        {/* Satellite 2: FULL STACK SYSTEMS (Top Left) */}
        <motion.div
          animate={{ y: [6, -8, 6], x: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 -left-6 lg:-left-10 z-30 bg-[#16161A]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[rgba(99,230,190,0.35)] shadow-[0_0_20px_rgba(99,230,190,0.25)] flex items-center gap-2"
        >
          <Terminal size={14} className="text-[#63E6BE]" />
          <span className="font-mono-custom text-xs font-bold text-[#63E6BE]">
            &lt;/&gt; SYSTEMS
          </span>
        </motion.div>

        {/* Satellite 3: RAG PIPELINES (Bottom Right) */}
        <motion.div
          animate={{ y: [-9, 5, -9], x: [4, -4, 4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 right-4 lg:right-2 z-30 bg-[#16161A]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[rgba(236,233,226,0.2)] shadow-[0_4px_20px_rgba(0,0,0,0.7)] flex items-center gap-2"
        >
          <Database size={13} className="text-[#8C7BFF]" />
          <span className="font-mono-custom text-xs font-semibold text-[#ECE9E2]">
            RAG PIPELINES
          </span>
        </motion.div>

        {/* Satellite 4: TYPE-SAFE (Bottom Left) */}
        <motion.div
          animate={{ y: [7, -7, 7], x: [-4, 4, -4] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 -left-4 lg:-left-8 z-30 bg-[#16161A]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[rgba(99,230,190,0.3)] shadow-[0_0_20px_rgba(99,230,190,0.2)] flex items-center gap-2"
        >
          <ShieldCheck size={14} className="text-[#63E6BE]" />
          <span className="font-mono-custom text-xs font-bold text-[#ECE9E2]">
            100% TYPE-SAFE
          </span>
        </motion.div>
      </div>
    </div>
  );
}
