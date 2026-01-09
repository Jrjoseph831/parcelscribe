"use client";

import { Input, Label } from "@/components/ui/Form";
import type { PacketDraft } from "@/lib/packets/types";
import type { ReactNode } from "react";

export function StepContentsValue({
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
        <Field label="Item description" error={errors.item_description}>
          <Input
            value={draft.item_description}
            onChange={(e) => onChange("item_description", e.target.value)}
            placeholder="What was shipped"
          />
        </Field>
        <Field label="Quantity" error={errors.item_qty}>
          <Input
            type="number"
            min={1}
            value={draft.item_qty}
            onChange={(e) => onChange("item_qty", Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Item value total" error={errors.item_value_total}>
          <Input
            type="number"
            min={0}
            value={draft.item_value_total}
            onChange={(e) => onChange("item_value_total", Number(e.target.value))}
          />
        </Field>
        <Field label="Requested amount" error={errors.requested_amount}>
          <Input
            type="number"
            min={0}
            value={draft.requested_amount}
            onChange={(e) => onChange("requested_amount", Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Shipping cost (optional)">
          <Input
            type="number"
            min={0}
            value={draft.shipping_cost ?? ""}
            onChange={(e) => onChange("shipping_cost", e.target.value === "" ? null : Number(e.target.value))}
          />
        </Field>
        <Field label="Taxes (optional)">
          <Input
            type="number"
            min={0}
            value={draft.tax ?? ""}
            onChange={(e) => onChange("tax", e.target.value === "" ? null : Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Declared value (optional)">
          <Input
            type="number"
            min={0}
            value={draft.declared_value ?? ""}
            onChange={(e) => onChange("declared_value", e.target.value === "" ? null : Number(e.target.value))}
          />
        </Field>
        <Field label="Is the shipment insured?">
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={draft.is_insured ?? ""}
            onChange={(e) => onChange("is_insured", (e.target.value || null) as PacketDraft["is_insured"])}
          >
            <option value="">Not sure</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not_sure">Not sure</option>
          </select>
        </Field>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-gray-800">Notes (optional)</Label>
        <textarea
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          rows={3}
          value={draft.user_notes ?? ""}
          onChange={(e) => onChange("user_notes", e.target.value || null)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-gray-800">Narrative (optional)</Label>
        <textarea
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          rows={4}
          value={draft.narrative ?? ""}
          onChange={(e) => onChange("narrative", e.target.value || null)}
          placeholder="Walk through what happened..."
        />
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-800">{label}</Label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
