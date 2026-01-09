export type ChecklistEntry = {
  slug: string;
  title: string;
  description: string;
  items: string[];
  cta?: string;
};

export const checklists: ChecklistEntry[] = [
  {
    slug: "shipping-damage-evidence-checklist",
    title: "Shipping Damage Evidence Checklist",
    description: "Quick checklist of photos and documents to attach for UPS/FedEx damage claims.",
    items: [
      "Full box exterior photo with label visible",
      "Close-up of shipping label and tracking number",
      "Inner packing and cushioning photos",
      "Damaged item from multiple angles",
      "Proof of value (receipt, invoice, or order confirmation)",
      "Proof of shipment (label PDF, manifest, or drop-off receipt)",
      "Weight or dimensions if relevant",
      "Timeline summary of when damage was found",
    ],
    cta: "Attach these to a Parcelscribe packet PDF and submit to the carrier.",
  },
];

export function getChecklist(slug: string) {
  return checklists.find((entry) => entry.slug === slug);
}
