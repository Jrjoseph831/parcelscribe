export type TemplateEntry = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  templateText: string;
  howToUse: string[];
  carrierNotes?: string[];
  relatedGuides?: string[];
};

export const templates: TemplateEntry[] = [
  {
    slug: "damaged-package-claim-letter",
    title: "Damaged Package Claim Letter (UPS/FedEx)",
    metaTitle: "Damaged Package Claim Letter Template",
    metaDescription: "Copyable UPS/FedEx damaged package claim letter with evidence list and reimbursement request.",
    templateText: `Subject: Damage Claim – Tracking {{TRACKING_NUMBER}}

To the Claims Department,

I am filing a damage claim for shipment {{TRACKING_NUMBER}} sent on {{SHIP_DATE}} to {{RECIPIENT_NAME}}, {{RECIPIENT_ADDRESS}}. The package arrived damaged on {{DELIVERY_DATE}}.

What happened:
- Package condition on delivery: {{PACKAGE_CONDITION}}
- Damage observed: {{DAMAGE_SUMMARY}}

Evidence attached:
- Photos: box exterior, label, inner packing, and damaged item
- Proof of value: {{PROOF_OF_VALUE}}
- Proof of shipment: {{PROOF_OF_SHIPMENT_IF_NEEDED}}

Requested reimbursement: {{REQUESTED_AMOUNT}} (item value and any insured amount, if applicable).

The item and packaging are retained for inspection. Please confirm receipt of this claim and advise next steps.

Thank you,
{{YOUR_NAME}}
{{YOUR_CONTACT}}
`,
    howToUse: [
      "Replace placeholders with your tracking number, ship date, and recipient details.",
      "Reference specific photos and receipts you will upload in the claim portal.",
      "Keep bullets short; carriers prefer concise summaries.",
      "Retain packaging until the carrier closes the claim.",
    ],
    carrierNotes: [
      "UPS may request inspection—keep the box and item.",
      "FedEx often asks for clear photos of inner packing; include them up front.",
    ],
    relatedGuides: ["ups-damage-claim", "fedex-damage-claim", "packing-photos-to-include"],
  },
  {
    slug: "lost-package-claim-letter",
    title: "Lost Package Claim Letter (UPS/FedEx)",
    metaTitle: "Lost Package Claim Letter Template",
    metaDescription: "Short UPS/FedEx lost package claim letter with proof of shipment and value checklist.",
    templateText: `Subject: Lost Package Claim – Tracking {{TRACKING_NUMBER}}

To the Claims Department,

I am filing a lost package claim for shipment {{TRACKING_NUMBER}} sent on {{SHIP_DATE}} to {{RECIPIENT_NAME}}, {{RECIPIENT_ADDRESS}}. The last scan was {{LAST_SCAN}} and the package did not arrive.

Evidence attached:
- Proof of shipment (label/receipt): {{PROOF_OF_SHIPMENT}}
- Proof of value: {{PROOF_OF_VALUE}}
- Tracking timeline with last scan and expected delivery date

Requested reimbursement: {{REQUESTED_AMOUNT}} for the shipped contents.

Please confirm receipt of this claim and advise next steps. I will provide any additional details promptly.

Thank you,
{{YOUR_NAME}}
{{YOUR_CONTACT}}
`,
    howToUse: [
      "State the last scan and expected delivery date clearly.",
      "Attach both proof of shipment and proof of value; these are the top denial reasons.",
      "Include recipient contact info so the carrier can verify delivery status.",
      "Follow up weekly if the claim status does not change.",
    ],
    carrierNotes: [
      "UPS often requires proof of shipment; include the label or drop-off receipt.",
      "FedEx may ask for recipient contact confirmation—provide it up front.",
    ],
    relatedGuides: ["ups-lost-package-claim", "fedex-lost-package-claim", "how-long-claims-take"],
  },
];

export function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug);
}
