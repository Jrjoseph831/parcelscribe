export type TemplateEntry = {
  slug: string;
  title: string;
  description: string;
  body: string;
};

export const templates: TemplateEntry[] = [
  {
    slug: "basic-claim-letter",
    title: "Basic Claim Letter",
    description: "Short cover letter for damage or lost-package claim refunds with evidence checklist.",
    body: "Subject: Claim for Tracking {{trackingNumber}}\n\nHello,\nI am filing a claim for tracking {{trackingNumber}} shipped on {{shipDate}} and expected {{expectedDelivery}}.\n\nWhat happened: {{briefIssue}}\n\nAttachments:\n- Proof of shipment\n- Proof of value\n- Photos (if damaged)\n- Tracking timeline\n\nRequest: Reimburse (refund) the item value and eligible charges.\n\nThank you,\n{{yourName}}\n{{contactInfo}}",
  },
  {
    slug: "appeal-letter",
    title: "Appeal Letter",
    description: "Use after a denial - restate facts and attach clearer proof for refund.",
    body: "Subject: Appeal for Tracking {{trackingNumber}}\n\nHello,\nI am appealing the denial of claim for tracking {{trackingNumber}}. Shipment date {{shipDate}}; expected {{expectedDelivery}}.\n\nSummary: {{briefIssue}}\nKey evidence attached:\n- Proof of shipment\n- Proof of value\n- Photos (if damaged)\n- Tracking timeline showing last scan\n\nRequest: Reconsider and approve reimbursement (refund).\n\nThank you,\n{{yourName}}\n{{contactInfo}}",
  },
];
