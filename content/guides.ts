export type GuideEntry = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  steps: string[];
  whatYouNeed: string[];
  commonMistakes: string[];
  nextSteps?: string[];
  relatedGuides?: string[];
  relatedTemplates?: string[];
  disclaimer?: string;
};

export const guides: GuideEntry[] = [
  {
    slug: "ups-damage-claim",
    title: "UPS Damage Claim Guide",
    metaTitle: "How to File a UPS Damage Claim (Photos + Proof)",
    metaDescription: "Step-by-step UPS damage claim guide: photos, proof of value, timeline, and what to say.",
    intro: "File as soon as you confirm damage. Document the box, label, packing, and the item from multiple angles.",
    steps: [
      "Take photos of the outer box, label, inner packing, and damaged item.",
      "Gather proof of value (receipt, invoice, or order confirmation) and declared value if insured.",
      "Start the UPS claim online; upload photos and proof of value with a short incident summary.",
      "Keep packaging available in case UPS requests inspection.",
      "Respond to any UPS follow-up within 24 hours; add missing documents if asked.",
    ],
    whatYouNeed: [
      "Tracking number and delivery date",
      "Photos of box, label, inner packing, and damage",
      "Proof of value (receipt/invoice/order confirmation)",
      "If insured: declared value or insurance info",
    ],
    commonMistakes: [
      "Only showing the damaged item without packaging shots",
      "Uploading one blurry photo instead of a set",
      "No proof of value attached",
      "Throwing away the packaging before the claim closes",
    ],
    nextSteps: [
      "If UPS denies for missing proof, add clearer photos or receipts and re-submit quickly.",
      "If inspection is requested, keep the box and item unchanged until told otherwise.",
    ],
    relatedGuides: ["packing-photos-to-include", "proof-of-value-ups", "ups-claim-denied-appeal"],
    relatedTemplates: ["damaged-package-claim-letter"],
    disclaimer: "Carrier requirements can change. Verify current UPS instructions in the claim portal before submitting.",
  },
  {
    slug: "fedex-damage-claim",
    title: "FedEx Damage Claim Guide",
    metaTitle: "How to File a FedEx Damage Claim",
    metaDescription: "FedEx damage claim steps: packing photos, proof of value, and concise narrative.",
    intro: "Capture the box, label, cushioning, and damage before moving anything. File quickly with all evidence attached.",
    steps: [
      "Photograph outer box, label, inner packing, and the damaged item (multiple angles).",
      "Collect proof of value (invoice/receipt) and any delivery notes or door tags.",
      "Submit the FedEx claim with a brief summary and attach all photos and proof of value.",
      "Keep packaging until FedEx confirms the claim is closed or inspection is waived.",
      "Reply to FedEx requests within a day; add missing documents promptly.",
    ],
    whatYouNeed: [
      "Tracking number and ship/delivery date",
      "Photos of box, label, packing, and damage",
      "Proof of value (invoice/receipt)",
      "Any delivery notes or inspection tags",
    ],
    commonMistakes: [
      "Only one photo or none of the inner packing",
      "Submitting without proof of value",
      "Waiting for the recipient to respond before filing",
      "Discarding packaging too early",
    ],
    nextSteps: [
      "If asked for more proof, add clearer photos, invoice pages, or serial/model numbers.",
      "If denied, add missing evidence and refile with a concise bullet summary.",
    ],
    relatedGuides: ["packing-photos-to-include", "fedex-claim-denied-appeal", "how-long-claims-take"],
    relatedTemplates: ["damaged-package-claim-letter"],
    disclaimer: "Carrier requirements can change. Verify current FedEx instructions in the claim portal before submitting.",
  },
  {
    slug: "ups-lost-package-claim",
    title: "UPS Lost Package Claim",
    metaTitle: "UPS Lost Package Claim: Proof of Value + Shipment",
    metaDescription: "File a UPS lost package claim with proof of shipment, value, and tracking timeline.",
    intro: "File once the package is overdue or marked lost. Provide proof of shipment, proof of value, and the tracking timeline.",
    steps: [
      "Collect proof of shipment (label PDF, drop-off receipt, manifest) and proof of value.",
      "Summarize tracking history with last scan and expected delivery date.",
      "Submit the claim with attachments; include recipient contact info.",
      "Follow up weekly and respond to UPS info requests quickly.",
      "If found/delivered later, update UPS; if denied, appeal with clearer proof.",
    ],
    whatYouNeed: [
      "Tracking number and expected delivery date",
      "Proof of shipment (label, scan, drop-off receipt)",
      "Proof of value (invoice/receipt)",
      "Recipient contact and address",
    ],
    commonMistakes: [
      "Waiting too long to file while scans stall",
      "No proof of shipment or value attached",
      "Leaving out delivery address and recipient contact",
      "Not including a concise tracking timeline",
    ],
    nextSteps: [
      "Appeal with clearer shipment proof, value docs, and a timeline if denied.",
    ],
    relatedGuides: ["how-long-claims-take", "proof-of-value-ups"],
    relatedTemplates: ["lost-package-claim-letter"],
    disclaimer: "Verify UPS claim windows and document requirements in the portal before filing.",
  },
  {
    slug: "fedex-lost-package-claim",
    title: "FedEx Lost Package Claim",
    metaTitle: "FedEx Lost Package Claim Guide",
    metaDescription: "FedEx lost package claim steps with proof of shipment, value, and tracking timeline.",
    intro: "When tracking stalls, file promptly with proof of shipment and value. Keep the summary short and factual.",
    steps: [
      "Gather proof of shipment (label PDF, drop-off receipt) and proof of value (invoice/receipt).",
      "List last scan, expected delivery date, and who is filing (shipper/recipient).",
      "Submit the claim with attachments and a brief request for reimbursement.",
      "Respond to any FedEx requests within 24 hours and add missing documents.",
      "Appeal with clearer evidence if denied.",
    ],
    whatYouNeed: [
      "Tracking number and last scan",
      "Proof of shipment (label, drop receipt)",
      "Proof of value (invoice/receipt)",
      "Recipient contact details",
    ],
    commonMistakes: [
      "Waiting for more scans instead of filing",
      "No proof of value",
      "Submitting long paragraphs instead of bullet points",
      "Leaving out contact details",
    ],
    nextSteps: [
      "If denied, add clearer shipment proof, value docs, and a concise timeline, then refile.",
    ],
    relatedGuides: ["how-long-claims-take", "packing-photos-to-include"],
    relatedTemplates: ["lost-package-claim-letter"],
    disclaimer: "Check the FedEx claim portal for current windows and required documents before filing.",
  },
  {
    slug: "missing-contents-claim",
    title: "Missing Contents Claim (UPS/FedEx)",
    metaTitle: "Missing Contents Claim: What to Submit",
    metaDescription: "How to document missing contents for UPS/FedEx claims with photos, weight, and proof of value.",
    intro: "Photograph packaging before discarding it. Highlight seals, weight differences, and itemized values.",
    steps: [
      "Photograph the box sealed and opened; include label and packing.",
      "List missing items with prices; attach proof of value for each.",
      "If weight differs, note label weight vs. actual weight.",
      "File the claim with photos, proof of value, and a concise timeline.",
      "Respond to follow-ups quickly; keep packaging until closure.",
    ],
    whatYouNeed: [
      "Tracking number and delivery date",
      "Photos of sealed and opened packaging",
      "Itemized proof of value",
      "Weight evidence if available",
    ],
    commonMistakes: [
      "Throwing away packaging before photographing",
      "No itemized values",
      "Skipping weight notes when useful",
      "Submitting a long story instead of concise bullets",
    ],
    nextSteps: [
      "If questioned, add clearer item photos, receipts, and weight notes.",
      "File a police/incident report if theft is suspected and include the report number.",
    ],
    relatedGuides: ["packing-photos-to-include", "proof-of-value-ups"],
    relatedTemplates: ["damaged-package-claim-letter"],
    disclaimer: "Verify current UPS/FedEx documentation requests in the portal; requirements can change.",
  },
  {
    slug: "proof-of-value-ups",
    title: "Proof of Value for UPS/FedEx Claims",
    metaTitle: "Proof of Value Examples for UPS/FedEx Claims",
    metaDescription: "What counts as proof of value for carrier claims: receipts, invoices, screenshots, appraisals.",
    intro: "Carriers want clear proof showing item, price, date, and who paid. Provide uncropped docs that match the shipment.",
    steps: [
      "Use receipts, invoices, or order confirmations that show item, price, and date.",
      "For handmade/resale, provide material costs plus sale price or marketplace payout.",
      "Match names/addresses to the shipment when possible; include serial/model numbers if relevant.",
      "Upload clear, uncropped PDFs or screenshots; avoid banking-only statements.",
    ],
    whatYouNeed: [
      "Receipt/invoice/order confirmation",
      "If handmade: material costs + sale price",
      "If resale: listing + payout screenshot",
      "If insured: declared value or policy snippet",
    ],
    commonMistakes: [
      "Bank statements without item detail",
      "Cropped screenshots missing price/date",
      "Values that don't match declared value",
      "One proof for multiple items without itemization",
    ],
    nextSteps: [
      "If questioned, add serial/model numbers or a clearer invoice page.",
      "Include a short note explaining any mismatch (gift, resale, handmade).",
    ],
    relatedGuides: ["ups-damage-claim", "missing-contents-claim"],
    relatedTemplates: ["damaged-package-claim-letter"],
    disclaimer: "Check the carrier portal for acceptable proof formats; requirements can change.",
  },
  {
    slug: "packing-photos-to-include",
    title: "Packing Photos to Include",
    metaTitle: "Packing Photos UPS/FedEx Reviewers Expect",
    metaDescription: "Which photos to upload for carrier claims: box, label, packing, and damage angles.",
    intro: "Good photo sets speed approvals. Cover the exterior, label, inner packing, and the item from multiple angles.",
    steps: [
      "Shoot the box exterior with the label visible, then a close-up of the label.",
      "Photograph inner packing/cushioning before moving items.",
      "Take multiple angles of the damage or missing area.",
      "Label photos or reference them in your narrative for clarity.",
    ],
    whatYouNeed: [
      "Camera/phone with good lighting",
      "Box exterior + label photos",
      "Inner packing photos",
      "Item damage or missing contents photos",
    ],
    commonMistakes: [
      "Only one photo",
      "No inner-packing shots",
      "Blurry/dark images",
      "Not showing the label or tracking",
    ],
    nextSteps: [
      "If asked for more photos, add angles that show scale and label clearly.",
    ],
    relatedGuides: ["ups-damage-claim", "fedex-damage-claim", "missing-contents-claim"],
    relatedTemplates: ["damaged-package-claim-letter"],
    disclaimer: "Carrier photo expectations can vary; check the claim portal if they request specific views.",
  },
  {
    slug: "ups-claim-denied-appeal",
    title: "UPS Claim Denied? Appeal Steps",
    metaTitle: "How to Appeal a UPS Claim Denial",
    metaDescription: "Appeal a UPS denial with added evidence, concise rebuttal, and faster responses.",
    intro: "Read the denial reason closely. Refile with clearer evidence and a short point-by-point response.",
    steps: [
      "Note the denial reason and missing evidence called out by UPS.",
      "Add clearer photos, proof of value, or weight evidence that address the gap.",
      "Submit a concise appeal: restate the reason, rebut with evidence, and list attachments.",
      "Respond quickly to any follow-up; keep packaging until closure.",
    ],
    whatYouNeed: [
      "Denial letter or portal note",
      "Claim number",
      "New or clearer photos",
      "Proof of value and shipment",
    ],
    commonMistakes: [
      "Resubmitting without new evidence",
      "Long arguments instead of bullets",
      "Ignoring the specific denial reason",
      "Missing deadlines",
    ],
    nextSteps: [
      "If still denied, escalate with supervisor support and a concise summary of evidence provided.",
    ],
    relatedGuides: ["proof-of-value-ups", "packing-photos-to-include"],
    relatedTemplates: ["damaged-package-claim-letter"],
    disclaimer: "Timelines and escalation paths can change—confirm current UPS appeal steps in the portal.",
  },
  {
    slug: "fedex-claim-denied-appeal",
    title: "FedEx Claim Denied? Appeal Steps",
    metaTitle: "Appeal a FedEx Claim Denial",
    metaDescription: "Add evidence and a concise rebuttal to appeal a FedEx claim denial.",
    intro: "Address the denial reason directly. Add missing documents and keep the rebuttal short.",
    steps: [
      "Identify the denial reason (missing proof, late filing, unclear photos).",
      "Attach clearer photos, receipts, or weight evidence that fix the gap.",
      "Appeal with bullets: state the reason, list new evidence, request reconsideration.",
      "Follow up in the portal and by phone if requested; keep packaging until closure.",
    ],
    whatYouNeed: [
      "Denial note or email",
      "Claim number",
      "New or clearer evidence (photos, receipts, weight)",
      "Proof of shipment/value",
    ],
    commonMistakes: [
      "Appealing without new evidence",
      "Overlong paragraphs",
      "No specific response to the denial reason",
      "Missing contact info",
    ],
    nextSteps: [
      "If denied again, ask what specific evidence is needed and provide it promptly.",
    ],
    relatedGuides: ["packing-photos-to-include", "proof-of-value-ups"],
    relatedTemplates: ["damaged-package-claim-letter"],
    disclaimer: "Confirm current FedEx appeal steps in the claim portal; processes can change.",
  },
  {
    slug: "how-long-claims-take",
    title: "How Long UPS/FedEx Claims Take",
    metaTitle: "UPS/FedEx Claim Timeline: What to Expect",
    metaDescription: "Typical timelines for UPS and FedEx claims and how to avoid delays.",
    intro: "Most claims resolve in 2–4 weeks if evidence is complete. File early and respond fast to stay on track.",
    steps: [
      "Day 0: File with photos, proof of value, and a clear incident summary.",
      "Week 1: Expect first review; respond to requests within 24 hours.",
      "Week 2–3: Typical approval/denial window; add evidence if asked.",
      "Week 4+: Appeal or escalate with added proof if stalled.",
    ],
    whatYouNeed: [
      "Complete packet (photos, proof of value, shipment details)",
      "Claim number and contact info",
      "Tracking timeline",
    ],
    commonMistakes: [
      "Filing late",
      "Slow responses to carrier requests",
      "Submitting without proof of value",
      "Long narratives without bullets",
    ],
    nextSteps: [
      "If delayed, follow up weekly with a concise summary and list of provided evidence.",
    ],
    relatedGuides: ["ups-damage-claim", "fedex-damage-claim"],
    relatedTemplates: ["damaged-package-claim-letter", "lost-package-claim-letter"],
    disclaimer: "Timelines vary; check the carrier portal for current processing estimates.",
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
