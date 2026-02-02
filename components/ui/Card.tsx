"use client";

import type { ReactNode } from "react";

export function Card({ children, className = "", variant = "default" }: { children: ReactNode; className?: string; variant?: "default" | "glass" | "elevated" }) {
  const variants = {
    default: "bg-white border border-[#e8e8ed] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)]",
    glass: "glass-card",
    elevated: "bg-white border border-[#e8e8ed] shadow-elevated",
  };

  return (
    <div className={`rounded-2xl transition-all duration-200 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
