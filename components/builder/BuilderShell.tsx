"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";

export function BuilderShell({
  title,
  subtitle,
  sidebar,
  children,
}: {
  title: string;
  subtitle?: string;
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-mesh">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-nav">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
            Parcelscribe
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/guides" className="text-sm text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors">
              Guides
            </Link>
            <Link href="/pricing" className="text-sm text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors">
              Pricing
            </Link>
            <Link className={buttonClasses("primary", "text-[13px] px-4 py-2")} href="/builder">
              New packet
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="stagger-children">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#0071e3]/5 px-3 py-1 text-[12px] font-medium text-[#0071e3] mb-3">
              Claim Builder
            </p>
            <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#1d1d1f] tracking-tight">{title}</h1>
            {subtitle ? <p className="mt-2 text-[15px] text-[#6e6e73]">{subtitle}</p> : null}
          </div>
          <Card className="p-6 sm:p-8">{children}</Card>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <Card className="p-5 lg:sticky lg:top-24">{sidebar}</Card>
        </div>
      </div>
    </main>
  );
}
