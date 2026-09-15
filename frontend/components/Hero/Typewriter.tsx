"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  onComplete?: () => void;
}

export function Typewriter({ onComplete }: TypewriterProps) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [roleText, setRoleText] = useState("");
  const [phase, setPhase] = useState<"line1" | "line2" | "role" | "done">("line1");

  const targetLine1 = "FAHAD";
  const targetLine2 = "KHAN";
  const targetRole = "FULL-STACK AI ENGINEER";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (phase === "line1") {
      if (line1.length < targetLine1.length) {
        timeoutId = setTimeout(() => {
          setLine1(targetLine1.slice(0, line1.length + 1));
        }, 110);
      } else {
        timeoutId = setTimeout(() => {
          setPhase("line2");
        }, 220);
      }
    } else if (phase === "line2") {
      if (line2.length < targetLine2.length) {
        timeoutId = setTimeout(() => {
          setLine2(targetLine2.slice(0, line2.length + 1));
        }, 110);
      } else {
        timeoutId = setTimeout(() => {
          setPhase("role");
        }, 280);
      }
    } else if (phase === "role") {
      if (roleText.length < targetRole.length) {
        timeoutId = setTimeout(() => {
          setRoleText(targetRole.slice(0, roleText.length + 1));
        }, 55);
      } else {
        timeoutId = setTimeout(() => {
          setPhase("done");
          if (onComplete) onComplete();
        }, 300);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [phase, line1, line2, roleText, onComplete]);

  // Render role text with AI highlighted once finished or typing past it
  const renderRoleWithAI = () => {
    if (!roleText.includes("AI")) {
      return <span className="whitespace-pre">{roleText}</span>;
    }
    const parts = roleText.split("AI");
    return (
      <span className="whitespace-pre">
        <span>{parts[0]}</span>
        <span
          className={`transition-colors duration-500 font-bold ${
            phase === "done" ? "text-[#8C7BFF] drop-shadow-[0_0_12px_rgba(140,123,255,0.6)]" : "text-[#ECE9E2]"
          }`}
        >
          AI
        </span>
        <span>{parts[1] || ""}</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Huge Two-Line Name */}
      <h1 className="font-display font-semibold tracking-[-0.03em] leading-[0.9] text-[#ECE9E2] text-[clamp(52px,10vw,132px)] uppercase select-none">
        <div className="flex items-center">
          <span>{line1}</span>
          {phase === "line1" && (
            <span className="inline-block w-[0.45em] h-[0.85em] bg-[#8C7BFF] ml-2 cursor-blink" />
          )}
        </div>
        <div className="flex items-center">
          <span>{line2}</span>
          {phase === "line2" && (
            <span className="inline-block w-[0.45em] h-[0.85em] bg-[#8C7BFF] ml-2 cursor-blink" />
          )}
        </div>
      </h1>

      {/* Role Line */}
      <div className="pt-2 min-h-[32px] flex items-center font-mono-custom text-sm md:text-lg lg:text-xl tracking-[0.14em] text-[#ECE9E2] whitespace-pre">
        <div className="flex items-center">
          {renderRoleWithAI()}
          {(phase === "role" || phase === "done") && (
            <span
              className={`inline-block w-2.5 h-4.5 bg-[#8C7BFF] ml-2 ${
                phase === "done" ? "cursor-blink" : ""
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
