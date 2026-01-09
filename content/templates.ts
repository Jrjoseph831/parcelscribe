export type TemplateSection = {
  heading: string;
  bullets: string[];
};

export type TemplateEntry = {
  slug: string;
  title: string;
  description: string;
  hero: string;
  sections: TemplateSection[];
  tags?: string[];
  cta?: string;
};

export const templates: TemplateEntry[] = [
  {
    slug: "damaged-package-claim-letter",
    title: "Damaged Package Claim Letter (UPS/FedEx)",
    description: "Claim letter template covering damage description, evidence list, and reimbursement request.",
    hero: "A concise claim letter template for damaged UPS or FedEx shipments.",
    sections: [
      { heading: "What you need", bullets: ["Tracking number and ship date", "Damage photos and packaging photos", "Proof of value (receipt or invoice)", "Recipient contact information"] },
      { heading: "Common mistakes", bullets: ["Writing long paragraphs instead of bullets", "Skipping packaging photos", "Leaving out the reimbursement amount", "Not matching the declared value"] },
      { heading: "What to say", bullets: ["State tracking, ship date, and delivery condition", "Describe damage briefly and reference attached photos", "List proof of value and requested amount", "Offer to provide inspection if needed"] },
      { heading: "Timeline", bullets: ["Day 0: Capture photos and draft letter", "Day 1: Submit letter with packet PDF", "Week 1: Respond to carrier follow-ups", "Week 2-3: Appeal with added evidence if required"] },
    ],
    tags: ["ups", "fedex", "damage"],
    cta: "Generate a claim packet PDF with this letter included.",
  },
  {
    slug: "lost-package-claim-letter",
    title: "Lost Package Claim Letter (UPS/FedEx)",
    description: "Use this template to request investigation and reimbursement for lost packages.",
    hero: "Request reimbursement for a lost UPS or FedEx shipment with a short, clear letter.",
    sections: [
      { heading: "What you need", bullets: ["Tracking number and last scan", "Proof of value (invoice/receipt)", "Proof of shipment (label or drop-off receipt)", "Recipient contact info"] },
      { heading: "Common mistakes", bullets: ["No proof of shipment", "Missing requested amount", "Waiting too long to file", "Not including contact info"] },
      { heading: "What to say", bullets: ["State tracking, last scan, and expected delivery", "Note the package is lost and request investigation", "List attached proof of value and shipment", "Include requested reimbursement amount"] },
      { heading: "Timeline", bullets: ["Day 0: Draft letter and file claim", "Day 1-2: Upload documents to portal", "Week 1: Follow up with claim number", "Week 2-3: Appeal if no movement"] },
    ],
    tags: ["ups", "fedex", "lost"],
    cta: "Pair this letter with a complete packet PDF.",
  },
];

export function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug);
}
