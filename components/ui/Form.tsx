"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

export function Label({ className = "", ...props }: ComponentPropsWithoutRef<"label">) {
  return <label className={`text-sm font-medium text-gray-900 ${className}`} {...props} />;
}

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export function Help({ children }: { children: ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

export function ErrorText({ children }: { children: ReactNode }) {
  return <p className="text-sm text-red-600">{children}</p>;
}
