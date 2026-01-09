"use client";

import { Input, Label } from "@/components/ui/Form";
import type { PacketDraft } from "@/lib/packets/types";
import type { ReactNode } from "react";

export function StepShipmentDetails({
  draft,
  errors,
  onChange,
}: {
  draft: PacketDraft;
  errors: Record<string, string>;
  onChange: <K extends keyof PacketDraft>(key: K, value: PacketDraft[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tracking number" error={errors.tracking_number}>
          <Input
            value={draft.tracking_number}
            onChange={(e) => onChange("tracking_number", e.target.value)}
            placeholder="1Z..."
          />
        </Field>
        <Field label="Service level (optional)">
          <Input
            value={draft.service_level ?? ""}
            onChange={(e) => onChange("service_level", e.target.value || null)}
            placeholder="Ground, 2-day, etc."
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ship date" error={errors.ship_date}>
          <Input
            type="date"
            value={draft.ship_date}
            onChange={(e) => onChange("ship_date", e.target.value)}
          />
        </Field>
        <Field label="Delivery date (optional)">
          <Input
            type="date"
            value={draft.delivery_date ?? ""}
            onChange={(e) => onChange("delivery_date", e.target.value || null)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Origin" error={errors.origin_text}>
          <Input
            value={draft.origin_text}
            onChange={(e) => onChange("origin_text", e.target.value)}
            placeholder="City, ST"
          />
        </Field>
        <Field label="Destination" error={errors.destination_text}>
          <Input
            value={draft.destination_text}
            onChange={(e) => onChange("destination_text", e.target.value)}
            placeholder="City, ST"
          />
        </Field>
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
