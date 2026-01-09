import type { PacketDraft } from "@/lib/packets/types";

export type ValidationResult = { ok: boolean; errors: Record<string, string> };
export type CompletenessResult = { percent: number; missing: string[] };

const PLACEHOLDER_STRINGS = new Set([
  "tbd",
  "origin tbd",
  "destination tbd",
  "item description",
]);

const REQUIRED_FIELDS: { key: keyof PacketDraft; label: string }[] = [
  { key: "carrier", label: "Carrier" },
  { key: "issue_type", label: "Issue type" },
  { key: "filer_role", label: "Filer role" },
  { key: "tracking_number", label: "Tracking number" },
  { key: "ship_date", label: "Ship date" },
  { key: "origin_text", label: "Origin" },
  { key: "destination_text", label: "Destination" },
  { key: "item_description", label: "Item description" },
  { key: "item_qty", label: "Item quantity" },
  { key: "item_value_total", label: "Item value" },
  { key: "requested_amount", label: "Requested amount" },
];

export function validateStep(stepIndex: number, draft: PacketDraft): ValidationResult {
  const errors: Record<string, string> = {};

  if (stepIndex === 0) {
    if (!draft.carrier) errors.carrier = "Choose a carrier";
    if (!draft.issue_type) errors.issue_type = "Choose an issue";
    if (!draft.filer_role) errors.filer_role = "Choose a role";
  }

  if (stepIndex === 1) {
    if (!draft.tracking_number.trim()) errors.tracking_number = "Tracking is required";
    if (!draft.ship_date) errors.ship_date = "Ship date is required";
    if (!draft.origin_text.trim()) errors.origin_text = "Origin is required";
    if (!draft.destination_text.trim()) errors.destination_text = "Destination is required";
  }

  if (stepIndex === 2) {
    if (!draft.item_description.trim()) errors.item_description = "Describe the item";
    if (!draft.item_qty || draft.item_qty < 1) errors.item_qty = "Quantity must be at least 1";
    if (!draft.item_value_total || draft.item_value_total <= 0)
      errors.item_value_total = "Item value must be greater than 0";
    if (!draft.requested_amount || draft.requested_amount <= 0)
      errors.requested_amount = "Requested amount must be greater than 0";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function completeness(draft: PacketDraft): CompletenessResult {
  const missing: string[] = [];
  let satisfied = 0;

  REQUIRED_FIELDS.forEach(({ key, label }) => {
    const value = draft[key];

    if (key === "item_qty") {
      if (typeof value === "number" && value >= 1) satisfied++;
      else missing.push(label);
      return;
    }

    if ((key === "item_value_total" || key === "requested_amount") && typeof value === "number") {
      if (value > 0) satisfied++;
      else missing.push(label);
      return;
    }

    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (normalized.length > 0 && !PLACEHOLDER_STRINGS.has(normalized)) satisfied++;
      else missing.push(label);
      return;
    }

    if (value) satisfied++;
    else missing.push(label);
  });

  const percent = Math.round((satisfied / REQUIRED_FIELDS.length) * 100);

  return { percent, missing };
}
