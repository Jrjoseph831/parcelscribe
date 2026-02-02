"use client";

import type { PacketDraft } from "@/lib/packets/types";
import { completeness, validateStep } from "@/lib/packets/validation";

function IconCheck() {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#30d158]/10 text-[#30d158]"
      aria-hidden
    >
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function IconCircle() {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#d2d2d7]"
      aria-hidden
    />
  );
}

export function Sidebar({
  draft,
  steps,
  currentStep,
  onStepChange,
}: {
  draft: PacketDraft | null;
  steps: { title: string }[];
  currentStep: number;
  onStepChange?: (index: number) => void;
}) {
  const completenessResult = draft ? completeness(draft) : { percent: 0, missing: [] };

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold text-[#1d1d1f]">Progress</p>
          <span className="text-[14px] font-semibold text-[#0071e3]">
            {completenessResult.percent}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#e8e8ed]">
          <div
            className="h-full bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] transition-all duration-500 ease-out"
            style={{ width: `${completenessResult.percent}%` }}
            aria-label="Completion percent"
          />
        </div>
        {completenessResult.missing.length > 0 ? (
          <div className="space-y-1.5 text-[13px] text-[#86868b]">
            {completenessResult.missing.slice(0, 3).map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#86868b]" />
                <span>{item}</span>
              </div>
            ))}
            {completenessResult.missing.length > 3 ? (
              <p className="text-[#6e6e73] ml-3">
                +{completenessResult.missing.length - 3} more items
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-[13px] text-[#30d158] font-medium flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            All sections complete
          </p>
        )}
      </div>

      {/* Steps Section */}
      <div className="space-y-3">
        <p className="text-[14px] font-semibold text-[#1d1d1f]">Sections</p>
        <div className="space-y-1">
          {steps.map((step, index) => {
            const validated = draft ? validateStep(index, draft).ok : false;
            const isActive = index === currentStep;
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => onStepChange?.(index)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-[#0071e3]/5 shadow-[inset_0_0_0_1px_rgba(0,113,227,0.1)]"
                    : "hover:bg-[#f5f5f7]"
                }`}
              >
                {validated ? <IconCheck /> : <IconCircle />}
                <span className={`text-[14px] ${isActive ? "font-semibold text-[#0071e3]" : "text-[#6e6e73]"}`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
