export type GuideSection = {
  heading: string;
  bullets: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideEntry = {
  slug: string;
  title: string;
  description: string;
  hero: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  related?: string[];
  cta?: string;
};

export const guides: GuideEntry[] = [
  {
    slug: "how-to-file-ups-damage-claim",
    title: "How to File a UPS Damage Claim",
    description: "Step-by-step UPS damage claim instructions with photos, proof of value, and required forms.",
    hero: "File a UPS damage claim with the exact photos, receipts, and description UPS asks for.",
    sections: [
      { heading: "What you need", bullets: ["Tracking number and delivery date", "Photos of the box, label, and damage", "Proof of value (receipt or invoice)", "Proof of mailing and weight if available"] },
      { heading: "Common mistakes", bullets: ["Only showing the damaged item without packaging photos", "Missing serial or model numbers", "Submitting before you have receipts ready", "Waiting past 60 days from delivery"] },
      { heading: "What to say", bullets: ["Lead with tracking number and shipment date", "State the condition on delivery and visible damage", "List attached evidence: photos, proof of value, timeline", "Keep it factual—no emotional language"] },
      { heading: "Timeline", bullets: ["Day 0: Report damage and photograph everything", "Day 1-2: Submit UPS claim with packet PDF", "Week 1: Respond to UPS info requests quickly", "Week 2-3: Monitor status; appeal if denied"] },
    ],
    faqs: [
      { question: "How long do I have to file?", answer: "File within 60 days of delivery for damage. File as soon as you spot damage to avoid denial." },
      { question: "Do I need to keep the box?", answer: "Yes. UPS can request inspection. Keep packaging until the claim is closed." },
    ],
    related: ["packing-photos-what-to-include", "proof-of-value-for-ups-claim", "damaged-package-claim-letter"],
    cta: "Generate a UPS-ready packet PDF in minutes.",
  },
  {
    slug: "how-to-file-fedex-damage-claim",
    title: "How to File a FedEx Damage Claim",
    description: "What FedEx wants to see for damage claims: photos, invoices, and a concise incident summary.",
    hero: "Submit a FedEx damage claim with the exact evidence FedEx reviewers look for.",
    sections: [
      { heading: "What you need", bullets: ["Tracking number and ship date", "Photos of outer box, inner packing, and damage", "Proof of value (invoice or receipt)", "Any inspection notes from delivery"] },
      { heading: "Common mistakes", bullets: ["No inner-packing photos", "Missing proof of value", "Only uploading one photo", "Waiting for the recipient to respond before filing"] },
      { heading: "What to say", bullets: ["Start with tracking and delivery status", "Explain damage discovered and when", "List attached photos, invoice, and packing details", "Use short sentences and bullet points"] },
      { heading: "Timeline", bullets: ["Day 0: Capture photos and file the claim", "Day 1-3: Upload any missing docs FedEx requests", "Week 1-2: Check claim portal; respond within 24 hours", "Week 3+: Appeal if denied with added evidence"] },
    ],
    faqs: [
      { question: "Can the recipient file?", answer: "Yes. Either shipper or recipient can file, but include matching contact info and receipts." },
      { question: "Do I need to ship the item back?", answer: "FedEx may request inspection; keep the item and packaging until closure." },
    ],
    related: ["packing-photos-what-to-include", "damaged-package-claim-letter", "how-long-do-ups-fedex-claims-take"],
    cta: "Build a FedEx claim packet with photos and proof attached.",
  },
  {
    slug: "ups-lost-package-claim",
    title: "UPS Lost Package Claim",
    description: "File a UPS lost package claim with proof of value, proof of shipment, and tracking history.",
    hero: "Make a UPS lost-package claim that documents value, shipment, and missing delivery.",
    sections: [
      { heading: "What you need", bullets: ["Tracking number and shipment date", "Proof of value (invoice/receipt)", "Proof of shipment (label, manifest, drop-off receipt)", "Recipient contact info"] },
      { heading: "Common mistakes", bullets: ["Waiting for scans to update instead of filing", "No proof of value attached", "Leaving out delivery address and contact", "Not including timeline of tracking events"] },
      { heading: "What to say", bullets: ["Lead with tracking and delivery expectation", "State it never delivered and last scan", "List attachments: proof of value, proof of shipment, communication", "Ask for investigation and reimbursement"] },
      { heading: "Timeline", bullets: ["Day 0: File claim once package is overdue", "Day 1-2: Upload documents and photos of label", "Week 1: UPS investigates; respond fast", "Week 2-3: Appeal with added evidence if needed"] },
    ],
    faqs: [
      { question: "When can I file?", answer: "You can file as soon as the package is marked lost or overdue beyond the delivery window." },
      { question: "Do I need photos?", answer: "Photos help if you have them, but proof of value and shipment are required." },
    ],
    related: ["how-long-do-ups-fedex-claims-take", "lost-package-claim-letter", "proof-of-value-for-ups-claim"],
    cta: "Assemble a UPS lost-package claim packet now.",
  },
  {
    slug: "fedex-lost-package-claim",
    title: "FedEx Lost Package Claim",
    description: "Everything to include for a FedEx lost package claim: invoice, label, and contact details.",
    hero: "File a FedEx lost-package claim with proof of shipment and value.",
    sections: [
      { heading: "What you need", bullets: ["Tracking number", "Invoice or receipt for contents", "Label photo or digital label", "Recipient contact and delivery address"] },
      { heading: "Common mistakes", bullets: ["Submitting without proof of value", "No label or drop-off proof", "Only describing the item without cost", "Waiting more than 60 days"] },
      { heading: "What to say", bullets: ["Share tracking, last scan, and expected delivery date", "State it never arrived and you need reimbursement", "List attached invoice, label, correspondence", "Keep it concise—3-4 sentences plus bullets"] },
      { heading: "Timeline", bullets: ["Day 0: File claim once overdue", "Day 1-2: Upload docs and confirm contacts", "Week 1: Watch for FedEx follow-up", "Week 2-4: Appeal with more proof if denied"] },
    ],
    faqs: [
      { question: "Can FedEx deny for missing proof?", answer: "Yes—most denials cite missing proof of value or shipment. Attach both in the first submission." },
      { question: "Should I wait for more scans?", answer: "No. File when overdue; you can update the claim if it later scans." },
    ],
    related: ["lost-package-claim-letter", "how-long-do-ups-fedex-claims-take", "packing-photos-what-to-include"],
    cta: "Generate your FedEx lost-claim packet.",
  },
  {
    slug: "missing-contents-claim-ups-fedex",
    title: "Missing Contents Claim (UPS & FedEx)",
    description: "If contents are missing, document packaging, seals, and proof of value for UPS/FedEx claims.",
    hero: "Handle missing contents claims with packaging photos and a clear timeline.",
    sections: [
      { heading: "What you need", bullets: ["Tracking number and delivery date", "Photos of unopened and opened packaging", "Proof of value for missing items", "Weight from label vs. actual weight"] },
      { heading: "Common mistakes", bullets: ["Throwing away packaging", "Not noting weight discrepancies", "Submitting without itemized values", "Skipping a police/incident report when relevant"] },
      { heading: "What to say", bullets: ["Describe package condition and seals on arrival", "List missing items with prices", "Attach photos, weight evidence, and invoice", "Keep tone factual and brief"] },
      { heading: "Timeline", bullets: ["Day 0: Photograph before discarding packaging", "Day 1: File claim with evidence list", "Week 1: Respond to carrier questions", "Week 2-3: Appeal with added proof if needed"] },
    ],
    faqs: [
      { question: "Do I need a police report?", answer: "Optional unless theft is suspected, but it can strengthen the claim." },
      { question: "Is weight proof helpful?", answer: "Yes. A lighter-than-labeled weight supports missing contents claims." },
    ],
    related: ["packing-photos-what-to-include", "proof-of-value-for-ups-claim", "shipping-damage-evidence-checklist"],
    cta: "Create a packet that documents missing contents clearly.",
  },
  {
    slug: "proof-of-value-for-ups-claim",
    title: "Proof of Value for UPS Claims",
    description: "Exactly what counts as proof of value for UPS: receipts, invoices, screenshots, and appraisals.",
    hero: "Show UPS proof of value with receipts, invoices, or appraisals that match your shipment.",
    sections: [
      { heading: "What you need", bullets: ["Receipt, invoice, or order confirmation", "If handmade: material costs + sale price", "If resale: marketplace listing and payout", "If insured: policy or declared value"] },
      { heading: "Common mistakes", bullets: ["Submitting bank statements only", "Cropping out item details", "Values not matching declared value", "No proof for multiple items"] },
      { heading: "What to say", bullets: ["State the item, value, and date of purchase", "Match the name and address to shipment when possible", "Attach clear, uncropped documents", "Call out serial/model numbers if relevant"] },
      { heading: "Timeline", bullets: ["Collect docs before filing", "Upload with the initial claim", "Respond within 24 hours to UPS requests", "Add clarifying doc if value questioned"] },
    ],
    faqs: [
      { question: "Can I use screenshots?", answer: "Yes, if they show item, price, date, and your name. Avoid partial or blurred shots." },
      { question: "What if it was a gift?", answer: "Use sender receipt or appraisal; include explanation in the narrative." },
    ],
    related: ["how-to-file-ups-damage-claim", "missing-contents-claim-ups-fedex", "damaged-package-claim-letter"],
    cta: "Attach proof of value inside a clean packet PDF.",
  },
  {
    slug: "packing-photos-what-to-include",
    title: "Packing Photos to Include",
    description: "Which packing photos carriers expect: outer box, label, cushioning, and damaged item angles.",
    hero: "Shoot the packing photos UPS/FedEx reviewers want to see.",
    sections: [
      { heading: "What you need", bullets: ["Full box exterior with label", "Close-up of label and tracking", "Inner packing and cushioning", "Item damage from multiple angles"] },
      { heading: "Common mistakes", bullets: ["Only taking one photo", "No inner-packing shots", "Blurry or dark images", "Leaving out the label in photos"] },
      { heading: "What to say", bullets: ["Caption photos with what they show", "Reference photo numbers in your narrative", "Note if packaging was intact or crushed", "Mention if you kept packaging for inspection"] },
      { heading: "Timeline", bullets: ["Photograph immediately on delivery", "Keep packaging until claim closes", "Upload labeled photos with the claim", "Add any new photos requested"] },
    ],
    faqs: [
      { question: "How many photos do I need?", answer: "Aim for 6-10 covering exterior, label, packing, and damage." },
      { question: "Do I need video?", answer: "Optional, but short clips can help if damage is hard to capture." },
    ],
    related: ["how-to-file-fedex-damage-claim", "missing-contents-claim-ups-fedex", "shipping-damage-evidence-checklist"],
    cta: "Drop your labeled photos into a ready-to-send packet.",
  },
  {
    slug: "ups-claim-denied-appeal",
    title: "UPS Claim Denied? How to Appeal",
    description: "Appeal a UPS claim denial with added evidence, tighter narrative, and point-by-point rebuttal.",
    hero: "Reopen a UPS denial with better evidence and a concise rebuttal.",
    sections: [
      { heading: "What you need", bullets: ["Original claim number", "Denial reason from UPS", "Added photos or proof of value", "Timeline clarifications"] },
      { heading: "Common mistakes", bullets: ["Arguing without new evidence", "Ignoring the denial reason", "Long paragraphs instead of bullets", "Missing deadlines"] },
      { heading: "What to say", bullets: ["Restate the denial reason then rebut with evidence", "Attach new photos, receipts, or weight proof", "Keep bullets short and reference attachments", "Ask for reconsideration with specific documents"] },
      { heading: "Timeline", bullets: ["Day 0: Read denial and note deadlines", "Day 1: Add missing evidence to packet", "Day 2: Submit appeal with clear bullets", "Week 1-2: Follow up if no response"] },
    ],
    faqs: [
      { question: "How fast must I appeal?", answer: "Appeal immediately—within 5-7 days while records are fresh." },
      { question: "What if packaging is gone?", answer: "Provide photos you do have plus proof of value and tracking history." },
    ],
    related: ["how-to-file-ups-damage-claim", "proof-of-value-for-ups-claim", "damaged-package-claim-letter"],
    cta: "Appeal with a clean, organized packet PDF.",
  },
  {
    slug: "fedex-claim-denied-appeal",
    title: "FedEx Claim Denied? Appeal Steps",
    description: "How to appeal a FedEx claim denial with added evidence and concise responses.",
    hero: "Appeal a FedEx denial with targeted evidence and a short rebuttal.",
    sections: [
      { heading: "What you need", bullets: ["Claim number and denial letter", "Any missing photos or invoices", "Tracking history and delivery notes", "Weight or dimension proof if relevant"] },
      { heading: "Common mistakes", bullets: ["Submitting same packet without changes", "No proof of value", "Ignoring the stated denial reason", "Overlong explanations"] },
      { heading: "What to say", bullets: ["Quote the denial reason first", "Attach specific documents that fix the gap", "Use bullets and cite each attachment", "Ask for reconsideration with a short request"] },
      { heading: "Timeline", bullets: ["Day 0: Gather denial details", "Day 1: Add missing documents", "Day 2: Submit concise appeal", "Week 1-2: Follow up if no update"] },
    ],
    faqs: [
      { question: "Do I need new evidence?", answer: "Yes. Add photos, invoices, or weight proof to address the denial." },
      { question: "Can I call FedEx?", answer: "You can, but upload the evidence in the claim portal so reviewers see it." },
    ],
    related: ["how-to-file-fedex-damage-claim", "packing-photos-what-to-include", "damaged-package-claim-letter"],
    cta: "Appeal with a packet that fixes the gaps.",
  },
  {
    slug: "how-long-do-ups-fedex-claims-take",
    title: "How Long UPS/FedEx Claims Take",
    description: "Typical timelines for UPS and FedEx damage or loss claims and how to speed them up.",
    hero: "Know the UPS/FedEx claim timeline and what speeds approval.",
    sections: [
      { heading: "What you need", bullets: ["Tracking number", "Proof of value", "Photos or label (for damage)", "Contact details for shipper/recipient"] },
      { heading: "Common mistakes", bullets: ["Waiting to file", "Not responding to info requests", "No proof of value", "Using long narratives instead of bullets"] },
      { heading: "What to say", bullets: ["State when you filed and what is attached", "Mention you can provide inspection if needed", "Confirm contact info and availability", "Ask for status after key checkpoints"] },
      { heading: "Timeline", bullets: ["Day 0: File with complete packet", "Week 1: First review; respond within 24 hours", "Week 2-3: Approval/denial typical", "Week 4+: Appeal or escalate if stuck"] },
    ],
    faqs: [
      { question: "Can I speed it up?", answer: "Yes—submit all evidence up front and respond within 24 hours to carrier requests." },
      { question: "What if it is overdue?", answer: "Follow up weekly and include a concise summary of what is outstanding." },
    ],
    related: ["ups-lost-package-claim", "fedex-lost-package-claim", "how-to-file-fedex-damage-claim"],
    cta: "File faster with a pre-built packet.",
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
