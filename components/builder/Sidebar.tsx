"use client";

import type { PacketDraft } from "@/lib/packets/types";
import { completeness, validateStep } from "@/lib/packets/validation";

function IconCheck() {
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-[10px] font-semibold text-green-700"
      aria-hidden
    >
      ✓
    </span>
  );
}

function IconCircle() {
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300"
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
    <div className="space-y-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">Completeness</p>
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${completenessResult.percent}%` }}
              aria-label="Completion percent"
            />
          </div>
          <span className="ml-3 text-sm font-medium text-gray-900">
            {completenessResult.percent}%
          </span>
        </div>
        {completenessResult.missing.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
            {completenessResult.missing.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
            {completenessResult.missing.length > 4 ? (
              <li className="text-gray-500">
                +{completenessResult.missing.length - 4} more
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="text-sm text-green-600">Looking good.</p>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-900">Outline</p>
        <div className="space-y-2">
          {steps.map((step, index) => {
            const validated = draft ? validateStep(index, draft).ok : false;
            const isActive = index === currentStep;
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => onStepChange?.(index)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isActive ? "bg-blue-50 text-blue-900" : "hover:bg-gray-50"
                }`}
              >
                {validated ? <IconCheck /> : <IconCircle />}
                <span className={isActive ? "font-semibold" : "text-gray-700"}>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
