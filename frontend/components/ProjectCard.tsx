"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Activity, Sparkles, Layers } from "lucide-react";

function GithubIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  metrics: string;
  accentIcon: React.ReactNode;
  mockupType?: "dashboard" | "ai-chat" | "fashion" | "kitchen" | "image";
  imageSrc?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({ project }: { project: ProjectData }) {
  // If an image is provided, render Full Clickable Browser Mockup linking directly to Live App
  if (project.imageSrc) {
    return (
      <a
        href={project.liveUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="VISIT"
        className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#16161A] border border-[rgba(236,233,226,0.12)] hover:border-[#8C7BFF] transition-all duration-300 shadow-[0_16px_45px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_55px_rgba(140,123,255,0.3)] flex flex-col cursor-pointer block"
      >
        {/* Sleek Browser Titlebar */}
        <div className="flex items-center justify-between px-3 sm:px-3.5 py-1.5 sm:py-2 bg-[#111114] border-b border-[rgba(236,233,226,0.08)] group-hover:bg-[#16161A] transition-colors gap-2">
          {/* Traffic Lights + Centered URL Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>

            {/* Realistic URL Address Bar Pill */}
            <div className="flex items-center gap-1.5 bg-[#0A0A0C]/90 border border-[rgba(236,233,226,0.08)] rounded-md px-2 sm:px-2.5 py-0.5 min-w-0 max-w-[140px] sm:max-w-[240px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#63E6BE] shrink-0 opacity-80" />
              <span className="font-mono-custom text-[10px] sm:text-[10.5px] text-[#8D8B86] tracking-wider truncate">
                {project.liveUrl
                  ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                  : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.vercel.app`}
              </span>
            </div>
          </div>

          {/* Right Live Preview Badge (Balanced & responsive) */}
          <div className="flex items-center gap-1 font-mono-custom text-[9.5px] sm:text-[10px] text-[#63E6BE] group-hover:text-[#0A0A0C] group-hover:bg-[#8C7BFF] group-hover:border-[#8C7BFF] bg-[#16161A] px-2 sm:px-2.5 py-0.5 rounded-full border border-[rgba(99,230,190,0.25)] transition-all shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#63E6BE] group-hover:bg-[#0A0A0C] pulse-dot shrink-0" />
            <span className="font-bold tracking-wider">LIVE PREVIEW</span>
            <ExternalLink size={10} className="shrink-0" />
          </div>
        </div>

        {/* Responsive Compact Image Container */}
        <div className="relative w-full aspect-[16/9.5] sm:h-[270px] lg:h-[320px] bg-[#0A0A0C] overflow-hidden">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
            priority
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Quick Floating Click Hint Overlay */}
          <div className="absolute inset-0 bg-[#0A0A0C]/0 group-hover:bg-[#0A0A0C]/20 transition-all flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-full bg-[#8C7BFF] text-[#0A0A0C] font-mono-custom text-xs font-bold shadow-[0_0_30px_rgba(140,123,255,0.7)] flex items-center gap-1.5">
              <span>VISIT LIVE WEBSITE</span>
              <ExternalLink size={13} />
            </div>
          </div>
        </div>
      </a>
    );
  }

  // Fallback for code simulation cards
  return (
    <div
      className="group relative w-full bg-[#16161A] border border-[rgba(236,233,226,0.12)] hover:border-[#8C7BFF]/60 rounded-[20px] p-6 sm:p-7 transition-all duration-300 shadow-[0_16px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_60px_rgba(140,123,255,0.2)] flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(236,233,226,0.08)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <span className="font-mono-custom text-[11px] text-[#8D8B86] ml-2 tracking-wider truncate max-w-[140px] sm:max-w-[200px]">
            {project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ai
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono-custom text-[10.5px] text-[#63E6BE] bg-[#111114] px-2.5 py-1 rounded-full border border-[rgba(99,230,190,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#63E6BE] pulse-dot" />
          <span>PRODUCTION</span>
        </div>
      </div>

      <div className="py-6 space-y-4">
        {project.mockupType === "dashboard" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#111114] border border-[rgba(236,233,226,0.06)]">
              <div>
                <div className="font-mono-custom text-[10px] text-[#8D8B86]">RETENTION ENGINE</div>
                <div className="font-display font-bold text-xl text-[#ECE9E2] mt-0.5">
                  98.4% Accuracy
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#16161A] text-[#8C7BFF] border border-[rgba(140,123,255,0.2)]">
                <Activity size={20} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#111114] border border-[rgba(236,233,226,0.05)]">
                <div className="font-mono-custom text-[9.5px] text-[#8D8B86]">BIOMETRIC TELEMETRY</div>
                <div className="font-mono-custom text-sm text-[#ECE9E2] font-semibold mt-1">1,240 msg/s</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111114] border border-[rgba(236,233,226,0.05)]">
                <div className="font-mono-custom text-[9.5px] text-[#8D8B86]">INFERENCE LATENCY</div>
                <div className="font-mono-custom text-sm text-[#63E6BE] font-semibold mt-1">18ms Ultra-low</div>
              </div>
            </div>
          </div>
        ) : project.mockupType === "fashion" ? (
          <div className="space-y-3 py-2">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#111114] border border-[rgba(236,233,226,0.06)]">
              <div>
                <div className="font-mono-custom text-[10px] text-[#8D8B86]">VECTOR CATALOG</div>
                <div className="font-display font-bold text-xl text-[#ECE9E2] mt-0.5">
                  50,000+ Embeddings
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#16161A] text-[#8C7BFF] border border-[rgba(140,123,255,0.2)]">
                <Layers size={20} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#111114] border border-[rgba(236,233,226,0.05)] flex items-center justify-between font-mono-custom text-[10.5px]">
              <span className="text-[#8D8B86]">RAG COSINE SIMILARITY:</span>
              <span className="text-[#8C7BFF] font-bold">0.9628</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            <div className="p-4 rounded-xl bg-[#111114] border border-[rgba(236,233,226,0.06)] space-y-2">
              <div className="flex items-center gap-2 font-mono-custom text-[10.5px] text-[#8C7BFF]">
                <Sparkles size={14} />
                <span>CLAUDE 3.5 SONNET SYNTHESIS</span>
              </div>
              <p className="text-xs text-[#ECE9E2] leading-relaxed">
                &quot;Executive summary transformed with quantified ROI impact metrics. ATS readiness score maximized.&quot;
              </p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#111114] border border-[rgba(236,233,226,0.05)] font-mono-custom text-[10.5px]">
              <span className="text-[#8D8B86]">ATS PARSE CONFIDENCE:</span>
              <span className="text-[#63E6BE] font-bold">97 / 100</span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[rgba(236,233,226,0.08)] flex items-center justify-between font-mono-custom text-xs">
        <span className="text-[10px] text-[#8D8B86] tracking-wider truncate max-w-[180px]">
          {project.metrics}
        </span>
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#8D8B86] hover:text-[#ECE9E2] hover:bg-[#111114] transition-colors"
            >
              <GithubIcon size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
