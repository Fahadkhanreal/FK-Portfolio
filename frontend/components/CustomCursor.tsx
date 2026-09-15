"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(pointer: fine)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerPointerSnapshot() {
  return false;
}

/**
 * Option 1: Ambient Spotlight / Flashlight Glow (120fps Hardware-Accelerated)
 * Ultra-lightweight radial atmospheric beam that illuminates the dark portfolio space
 * as the user explores, paired with a sharp precision micro-dot. Zero canvas overhead.
 */
export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const microDotRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const isPointerFine = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );

  useEffect(() => {
    let mouseX = -600;
    let mouseY = -600;
    let lightX = -600;
    let lightY = -600;
    let dotX = -600;
    let dotY = -600;
    let animFrameId: number;
    let lastHoverCheck = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Throttle hover checks to avoid DOM traversals on every pixel
      const now = performance.now();
      if (now - lastHoverCheck > 50) {
        lastHoverCheck = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          const clickable = !!target.closest("a, button, [role='button'], input, textarea, [data-cursor]");
          if (clickable !== isHoveredRef.current) {
            isHoveredRef.current = clickable;
            if (spotlightRef.current && microDotRef.current) {
              if (clickable) {
                spotlightRef.current.classList.add("cursor-hovered-spotlight");
                microDotRef.current.classList.add("cursor-hovered-dot");
              } else {
                spotlightRef.current.classList.remove("cursor-hovered-spotlight");
                microDotRef.current.classList.remove("cursor-hovered-dot");
              }
            }
          }
        }
      }
    };

    const animate = () => {
      // Smooth organic lag for atmospheric spotlight (lerp: 0.14)
      lightX += (mouseX - lightX) * 0.14;
      lightY += (mouseY - lightY) * 0.14;

      // Instant precision response for micro-dot (lerp: 0.78)
      dotX += (mouseX - dotX) * 0.78;
      dotY += (mouseY - dotY) * 0.78;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${lightX}px, ${lightY}px, 0) translate(-50%, -50%)`;
      }
      if (microDotRef.current) {
        microDotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (!isPointerFine) return null;

  return (
    <>
      {/* 1. Atmospheric Ambient Spotlight Beam (Flashlight) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[40] rounded-full transition-[width,height,opacity] duration-300 ease-out will-change-transform w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(140,123,255,0.12)_0%,rgba(99,230,190,0.03)_40%,transparent_70%)] opacity-80 [&.cursor-hovered-spotlight]:w-[580px] [&.cursor-hovered-spotlight]:h-[580px] [&.cursor-hovered-spotlight]:opacity-100"
      />

      {/* 2. Precision Minimalist Micro-Dot */}
      <div
        ref={microDotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full will-change-transform transition-[width,height,background-color,box-shadow] duration-150 ease-out w-1.5 h-1.5 bg-[#ECE9E2] shadow-[0_0_8px_rgba(236,233,226,0.6)] [&.cursor-hovered-dot]:w-2.5 [&.cursor-hovered-dot]:h-2.5 [&.cursor-hovered-dot]:bg-[#8C7BFF] [&.cursor-hovered-dot]:shadow-[0_0_16px_#8C7BFF,0_0_6px_#fff]"
      />
    </>
  );
}
