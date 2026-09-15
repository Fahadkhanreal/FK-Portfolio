"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "WORK", href: "#work", id: "work" },
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "STACK", href: "#stack", id: "stack" },
  { label: "EXPERIENCE", href: "#experience", id: "experience" },
  { label: "CONTACT", href: "#contact", id: "contact" },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Zero-reflow Scroll Spy using native IntersectionObserver
  useEffect(() => {
    const sectionIds = ["work", "about", "stack", "experience", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-25% 0px -50% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 2. Ultra-lightweight scroll handler for navbar appearance
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentY > 40);

          if (currentY > lastY && currentY > 120) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3.5 bg-[#0A0A0C]/80 backdrop-blur-xl border-b border-[rgba(236,233,226,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-1.5 focus:outline-none"
            aria-label="Fahad Khan Home"
          >
            <span className="font-display text-xl font-bold tracking-tight text-[#ECE9E2] group-hover:text-white transition-colors">
              FK
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7BFF] animate-pulse" />
          </a>

          {/* Desktop Nav Links (hidden < 900px) */}
          <nav className="hidden min-[900px]:flex items-center gap-8 bg-[#16161A]/60 px-6 py-2 rounded-full border border-[rgba(236,233,226,0.07)] backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative font-mono-custom text-[11px] tracking-[0.14em] transition-colors py-1 ${
                    isActive ? "text-[#ECE9E2]" : "text-[#8D8B86] hover:text-[#ECE9E2]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#8C7BFF] rounded-full shadow-[0_0_8px_rgba(140,123,255,0.7)] origin-center"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile trigger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              data-cursor="EXPLORE"
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#16161A] text-[#ECE9E2] border border-[rgba(236,233,226,0.12)] hover:border-[#8C7BFF] hover:bg-[#8C7BFF]/10 text-xs font-mono-custom tracking-[0.12em] transition-all duration-300"
            >
              <span>LET&apos;S BUILD</span>
              <span className="text-[#8C7BFF] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* Mobile Menu Button (<900px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[900px]:hidden p-2 text-[#8D8B86] hover:text-[#ECE9E2] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#0A0A0C]/95 backdrop-blur-2xl border-b border-[rgba(236,233,226,0.1)] px-6 py-6 min-[900px]:hidden"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono-custom text-sm tracking-[0.16em] py-2 border-b border-[rgba(236,233,226,0.05)] ${
                    activeSection === link.id ? "text-[#8C7BFF]" : "text-[#8D8B86]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
