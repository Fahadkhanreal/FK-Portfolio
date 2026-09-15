"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0C] border-t border-[rgba(236,233,226,0.08)] py-12 px-6 md:px-12 lg:px-16 text-[#8D8B86]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Column: Stacked Name / Title */}
        <div className="space-y-1 text-center md:text-left">
          <div className="font-display text-sm font-bold text-[#ECE9E2] tracking-tight uppercase">
            FAHAD KHAN
          </div>
          <div className="font-mono-custom text-[11px] text-[#57564F] tracking-[0.14em]">
            FULL-STACK AI ENGINEER
          </div>
        </div>

        {/* Center Column: Built With */}
        <div className="text-center font-mono-custom text-[10.5px] tracking-[0.16em] text-[#8D8B86] border-y md:border-y-0 py-3 md:py-0 border-[rgba(236,233,226,0.04)]">
          BUILT WITH — NEXT.JS · REACT · TYPESCRIPT · AI
        </div>

        {/* Right Column: Status & Copyright */}
        <div className="flex items-center justify-center md:justify-end gap-2.5 text-center md:text-right">
          <span className="w-2 h-2 rounded-full bg-[#63E6BE] pulse-dot" />
          <span className="font-mono-custom text-[10.5px] tracking-[0.12em] text-[#ECE9E2]">
            AVAILABLE FOR AI &amp; FULL-STACK PROJECTS · &copy; 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
