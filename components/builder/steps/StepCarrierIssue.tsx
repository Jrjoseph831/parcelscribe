"use client";

import { Label } from "@/components/ui/Form";
import { claimStageOptions, carrierOptions, filerRoleOptions, issueTypeOptions } from "@/lib/packets/mapping";
import type { PacketDraft } from "@/lib/packets/types";

export function StepCarrierIssue({
  draft,
  errors,
  onChange,
}: {
  draft: PacketDraft;
  errors: Record<string, string>;
  onChange: <K extends keyof PacketDraft>(key: K, value: PacketDraft[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldSelect
          label="Carrier"
          value={draft.carrier}
          onChange={(value) => onChange("carrier", value)}
          options={carrierOptions}
          error={errors.carrier}
        />
        <FieldSelect
          label="Issue"
          value={draft.issue_type}
          onChange={(value) => onChange("issue_type", value)}
          options={issueTypeOptions}
          error={errors.issue_type}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldSelect
          label="Your role"
          value={draft.filer_role}
          onChange={(value) => onChange("filer_role", value)}
          options={filerRoleOptions}
          error={errors.filer_role}
        />
        <FieldSelect
          label="Claim stage"
          value={draft.claim_stage}
          onChange={(value) => onChange("claim_stage", value)}
          options={claimStageOptions}
        />
      </div>
    </div>
  );
}

function FieldSelect<T extends string>({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  error?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-800">{label}</Label>
      <select
        className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
