"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [copied, setCopied] = useState(false);

  const email = "fhadikhan00@gmail.com";
  const links = [
    { label: "GITHUB", value: "github.com/Fahadkhanreal", href: "https://github.com/Fahadkhanreal" },
    { label: "LINKEDIN", value: "linkedin.com/in/fahad-khan-02a204210", href: "https://www.linkedin.com/in/fahad-khan-02a204210/" },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 md:py-44 px-6 md:px-12 bg-[#0A0A0C] relative overflow-hidden text-center"
    >
      {/* Background Soft Glow Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(140,123,255,0.12)_0%,rgba(140,123,255,0.02)_45%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16161A] border border-[rgba(236,233,226,0.1)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF]" />
          <span className="font-mono-custom text-xs text-[#8C7BFF] tracking-[0.2em] font-semibold">
            HAVE AN IDEA?
          </span>
        </motion.div>

        {/* Giant Headline */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#ECE9E2] uppercase tracking-[-0.03em] leading-[1.05]"
          >
            LET&apos;S BUILD SOMETHING{" "}
            <span className="text-[#8C7BFF] drop-shadow-[0_0_35px_rgba(140,123,255,0.5)]">
              IMPOSSIBLE.
            </span>
          </motion.h2>
        </div>

        {/* Interactive Magnetic CTA & One-Click Copy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="pt-6 pb-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            href={`mailto:${email}`}
            className="group px-8 sm:px-12 py-5 rounded-full bg-[#16161A] text-[#ECE9E2] border border-[rgba(236,233,226,0.2)] hover:border-[#8C7BFF] hover:bg-[#8C7BFF] hover:text-[#0A0A0C] hover:shadow-[0_0_40px_rgba(140,123,255,0.6)] text-xs sm:text-sm font-bold"
          >
            <span className="flex items-center gap-3">
              <span>START A PROJECT</span>
              <span className="text-[#8C7BFF] group-hover:text-[#0A0A0C] group-hover:translate-x-1 transition-all">
                →
              </span>
            </span>
          </MagneticButton>

          {/* Quick Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="px-6 py-4 rounded-full bg-[#111114] text-[#8D8B86] hover:text-[#ECE9E2] border border-[rgba(236,233,226,0.08)] hover:border-[#8C7BFF]/50 font-mono-custom text-xs tracking-wider flex items-center gap-2.5 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#63E6BE]" />
                <span className="text-[#63E6BE] font-bold">EMAIL COPIED!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-[#8C7BFF]" />
                <span>COPY DIRECT EMAIL</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Plain Text Direct Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-8 border-t border-[rgba(236,233,226,0.08)]"
        >
          <a
            href={`mailto:${email}`}
            className="group flex items-center gap-1.5 font-mono-custom text-xs lowercase text-[#ECE9E2] hover:text-[#8C7BFF] transition-colors py-1 tracking-normal"
          >
            <Mail size={13} className="text-[#8C7BFF]" />
            <span className="lowercase">{email}</span>
          </a>

          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 font-mono-custom text-xs tracking-widest text-[#8D8B86] hover:text-[#ECE9E2] transition-colors py-1"
            >
              <span>{link.label}</span>
              <ArrowUpRight
                size={13}
                className="text-[#57564F] group-hover:text-[#8C7BFF] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
