"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

export function Label({ className = "", ...props }: ComponentPropsWithoutRef<"label">) {
  return <label className={`text-sm font-medium text-[#1d1d1f] tracking-[-0.01em] ${className}`} {...props} />;
}

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/10 hover:border-[#86868b] ${className}`}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<"textarea">>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/10 hover:border-[#86868b] resize-none ${className}`}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";

export function Help({ children }: { children: ReactNode }) {
  return <p className="text-[13px] text-[#86868b] leading-relaxed">{children}</p>;
}

export function ErrorText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] text-[#ff453a] font-medium flex items-center gap-1.5">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ff453a]/10 text-[10px]">!</span>
      {children}
    </p>
  );
}
