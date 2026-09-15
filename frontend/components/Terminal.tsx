"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "status-ok" | "status-info" | "final-prompt";
  color?: string;
}

const TERMINAL_SEQUENCE: TerminalLine[] = [
  { text: "> whoami", type: "command" },
  { text: "fahad_khan — full-stack AI engineer", type: "output" },
  { text: "SYSTEM STATUS: ONLINE", type: "status-ok", color: "#63E6BE" },
  { text: "AI SYSTEMS: ACTIVE", type: "status-ok", color: "#63E6BE" },
  { text: "PROJECTS: 12", type: "status-info", color: "#ECE9E2" },
  { text: "STACK: FULL", type: "status-info", color: "#8C7BFF" },
  { text: "DEPLOYMENT: READY", type: "status-ok", color: "#63E6BE" },
  { text: "> build --future", type: "final-prompt" },
];

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [visibleLinesCount, setVisibleLinesCount] = useState<number>(0);
  const [currentLineText, setCurrentLineText] = useState<string>("");

  useEffect(() => {
    if (!isInView) return;

    let lineIdx = 0;
    let charIdx = 0;
    let isCancelled = false;

    const typeNext = () => {
      if (isCancelled || lineIdx >= TERMINAL_SEQUENCE.length) return;

      const fullLine = TERMINAL_SEQUENCE[lineIdx].text;

      // Type character by character for commands and final prompt, faster for output
      const isCommand =
        TERMINAL_SEQUENCE[lineIdx].type === "command" ||
        TERMINAL_SEQUENCE[lineIdx].type === "final-prompt";

      if (isCommand && charIdx < fullLine.length) {
        charIdx++;
        setCurrentLineText(fullLine.slice(0, charIdx));
        setTimeout(typeNext, 45);
      } else {
        // Complete current line
        setVisibleLinesCount((prev) => prev + 1);
        setCurrentLineText("");
        lineIdx++;
        charIdx = 0;
        const delay = isCommand ? 220 : 110;
        setTimeout(typeNext, delay);
      }
    };

    const initialTimer = setTimeout(typeNext, 400);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimer);
    };
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="py-24 px-6 md:px-12 bg-[#0A0A0C] border-b border-[rgba(236,233,226,0.08)] relative"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section Label */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF]" />
            <span className="font-mono-custom text-xs text-[#8C7BFF] tracking-[0.2em] font-semibold">
              06 / TERMINAL DIAGNOSTICS
            </span>
          </div>
          <span className="font-mono-custom text-xs text-[#57564F]">SYS_VER 2.6.4</span>
        </div>

        {/* macOS Style Terminal Window */}
        <div className="bg-[#111114] border border-[rgba(236,233,226,0.12)] rounded-[18px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Terminal Title Bar with 3-dot traffic lights */}
          <div className="bg-[#16161A] px-5 py-3.5 border-b border-[rgba(236,233,226,0.08)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
            </div>

            <div className="flex items-center gap-2 font-mono-custom text-xs text-[#8D8B86]">
              <TerminalIcon size={13} className="text-[#8C7BFF]" />
              <span>fahad.os — zsh</span>
            </div>

            <div className="w-12 text-right font-mono-custom text-[10px] text-[#57564F]">
              UTF-8
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono-custom text-xs sm:text-sm space-y-3 min-h-[300px] leading-relaxed">
            {TERMINAL_SEQUENCE.slice(0, visibleLinesCount).map((line, idx) => {
              if (line.type === "command") {
                return (
                  <div key={idx} className="text-[#8C7BFF] font-semibold pt-1">
                    {line.text}
                  </div>
                );
              }
              if (line.type === "output") {
                return (
                  <div key={idx} className="text-[#ECE9E2] pl-2 pb-2">
                    {line.text}
                  </div>
                );
              }
              if (line.type === "status-ok" || line.type === "status-info") {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 pl-2"
                    style={{ color: line.color || "#ECE9E2" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: line.color }} />
                    <span>{line.text}</span>
                  </div>
                );
              }
              if (line.type === "final-prompt") {
                return (
                  <div key={idx} className="text-[#8C7BFF] font-semibold pt-3 flex items-center">
                    <span>{line.text}</span>
                    <span className="inline-block w-2.5 h-4 bg-[#8C7BFF] ml-1.5 cursor-blink" />
                  </div>
                );
              }
              return null;
            })}

            {/* Currently typing line */}
            {visibleLinesCount < TERMINAL_SEQUENCE.length && (
              <div
                className={`flex items-center ${
                  TERMINAL_SEQUENCE[visibleLinesCount].type === "command" ||
                  TERMINAL_SEQUENCE[visibleLinesCount].type === "final-prompt"
                    ? "text-[#8C7BFF] font-semibold"
                    : "text-[#ECE9E2] pl-2"
                }`}
              >
                <span>{currentLineText}</span>
                <span className="inline-block w-2.5 h-4 bg-[#8C7BFF] ml-1.5 cursor-blink" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
