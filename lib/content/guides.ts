export type GuideEntry = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  body: string;
};

export const guides: GuideEntry[] = [
  {
    slug: "ups-damage-claim",
    title: "UPS Damage Claim",
    description: "Photos to take, proof to attach, and how to answer UPS follow-ups.",
    keywords: ["UPS", "damage", "photos", "proof of value"],
    body: "What to gather: tracking number, photos of box/label/packing/damage, proof of value.\n\nSteps: shoot exterior, label, inner packing before moving anything; add multiple angles of damage. File the claim online with a short summary and attach proof of value. Keep packaging for possible inspection and reply to UPS within 24 hours.\n\nCommon mistakes: only one blurry photo, no proof of value, throwing away the box, long paragraphs instead of bullets.",
  },
  {
    slug: "fedex-damage-claim",
    title: "FedEx Damage Claim",
    description: "Clear photo set, proof of value, and concise narrative for FedEx reviewers.",
    keywords: ["FedEx", "damage", "photos", "proof of value"],
    body: "What to gather: tracking number, delivery date, photos of exterior, label, packing, and damage, plus proof of value.\n\nSteps: photograph box + label, then inner packing before moving items; capture damage from multiple angles. Submit the claim with a brief summary and attach all photos and proof of value. Keep packaging until FedEx closes or waives inspection. Respond to follow-ups within a day.\n\nCommon mistakes: missing inner-packing photos, no proof of value, waiting for the recipient before filing, discarding packaging early.",
  },
  {
    slug: "ups-lost-package-claim",
    title: "UPS Lost Package Claim",
    description: "Proof of shipment + proof of value + tracking timeline for stalled UPS shipments.",
    keywords: ["UPS", "lost", "proof of shipment", "tracking"],
    body: "What to gather: tracking history with last scan, proof of shipment (label or drop receipt), proof of value, recipient contact.\n\nSteps: summarize timeline and last scan; file the claim with attachments and contact info. Follow up weekly and answer UPS info requests quickly. Appeal with clearer proof if denied.\n\nCommon mistakes: waiting weeks to file, no proof of shipment, no proof of value, leaving out contact details.",
  },
  {
    slug: "fedex-lost-package-claim",
    title: "FedEx Lost Package Claim",
    description: "How to file fast when FedEx tracking stalls or stops updating.",
    keywords: ["FedEx", "lost", "tracking", "proof of value"],
    body: "What to gather: last scan, expected delivery date, proof of shipment, proof of value, recipient contact.\n\nSteps: collect shipment + value proof; submit claim with a concise reimbursement request; respond to FedEx requests within 24 hours; appeal with clearer evidence if denied.\n\nCommon mistakes: waiting for more scans before filing, long narratives, missing proof of value, no contact details.",
  },
  {
    slug: "usps-damage-claim",
    title: "USPS Damage Claim",
    description: "Photo checklist and proof list for USPS damage claims.",
    keywords: ["USPS", "damage", "photos", "proof of value"],
    body: "What to gather: tracking, proof of shipment, proof of value, photos of exterior/interior damage.\n\nSteps: photograph exterior box, interior packing, and damaged item; compile timeline and value docs; file online and respond quickly; schedule inspection if asked.\n\nCommon mistakes: no interior packaging photos, missing proof of value, overlong narrative, waiting for USPS to reach out first.",
  },
  {
    slug: "usps-lost-package-claim",
    title: "USPS Lost Package Claim",
    description: "Missing mail search + claim steps for USPS when tracking stalls.",
    keywords: ["USPS", "lost", "tracking", "missing mail"],
    body: "What to gather: tracking with last scan, proof of shipment, proof of value, recipient contact.\n\nSteps: confirm last scan and expected delivery; file missing mail search, then submit the claim with attachments; respond to follow-ups within 24 hours; appeal with clearer evidence if denied.\n\nCommon mistakes: filing without proof of value, skipping missing mail search, long paragraphs instead of bullets, waiting too long to file.",
  },
];
