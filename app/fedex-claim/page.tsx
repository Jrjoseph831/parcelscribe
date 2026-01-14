import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

const faqs = [
  {
    q: "Is a FedEx refund handled through a claim?",
    a: "Yes. FedEx refunds for lost, damaged, or missing contents shipments are handled through the claims process with a reimbursement request.",
  },
  {
    q: "What should I include with a FedEx refund request?",
    a: "Include tracking details, proof of shipment, proof of value, and photos of the packaging and damage when relevant.",
  },
  {
    q: "How long does a FedEx claim refund take?",
    a: "Timelines vary, but fast responses to FedEx follow-up requests usually keep the claim moving.",
  },
  {
    q: "Can I appeal a FedEx claim denial?",
    a: "Yes. Provide clearer proof, a short timeline, and resubmit through the FedEx claims portal.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.parcelscribe.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FedEx Claim and Refund",
      item: "https://www.parcelscribe.com/fedex-claim",
    },
  ],
};

export const metadata: Metadata = {
  title: "FedEx Claim and Refund Guide",
  description:
    "FedEx claim and refund checklist for lost, damaged, or missing contents shipments. Evidence list, refund wording, and reimbursement steps.",
  alternates: { canonical: "https://www.parcelscribe.com/fedex-claim" },
};

export default function FedexClaimPage() {
  return (
    <main className="bg-white px-4 py-10 sm:py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 underline-offset-2 hover:underline">
              FedEx claims
            </Link>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">FedEx claim and refund guide</h1>
            <p className="text-base text-gray-700 sm:text-lg">
              Step-by-step checklist to request a FedEx refund or reimbursement for lost, damaged, or missing contents packages.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link className={`${buttonClasses("primary")} w-full sm:w-auto`} href="/builder">Build a claim packet</Link>
            <Link className={`${buttonClasses("secondary")} w-full sm:w-auto`} href="/templates">Use claim templates</Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">FedEx refund checklist</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 sm:text-base">
              <li>Tracking number and delivery or exception scan.</li>
              <li>Proof of shipment (label, drop receipt, or invoice).</li>
              <li>Proof of value (receipt, invoice, or order confirmation).</li>
              <li>Photos of the box, label, packing materials, and damage.</li>
              <li>Short timeline and contact details for shipper/recipient.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Common FedEx denial reasons</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 sm:text-base">
              <li>Missing proof of value or proof of shipment.</li>
              <li>Damage photos without packaging photos.</li>
              <li>Slow responses to FedEx follow-up requests.</li>
              <li>Incomplete timeline or inconsistent dates.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Refund request wording</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 sm:text-base">
              <li>State the tracking number and shipment date.</li>
              <li>Describe what happened in 1 to 2 sentences.</li>
              <li>Request reimbursement for item value and eligible charges.</li>
              <li>List attachments: photos, receipts, and tracking timeline.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Related FedEx guides</h2>
            <div className="mt-3 space-y-2">
              <Link className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-blue-200" href="/guides#fedex-damage-claim">
                <span>FedEx damage claim checklist</span>
                <span className="text-xs font-medium text-blue-600">View</span>
              </Link>
              <Link className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-blue-200" href="/guides#fedex-lost-package-claim">
                <span>FedEx lost package claim checklist</span>
                <span className="text-xs font-medium text-blue-600">View</span>
              </Link>
              <Link className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-blue-200" href="/fedex-refund">
                <span>FedEx refund guide</span>
                <span className="text-xs font-medium text-blue-600">View</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">FAQ</p>
            <h2 className="text-2xl font-semibold text-gray-900">FedEx refund questions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-lg border border-gray-200 bg-slate-50 p-4">
                <p className="font-semibold text-gray-900">{item.q}</p>
                <p className="mt-2 text-sm text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="rounded-2xl border border-gray-200 bg-slate-50 p-6 text-sm text-gray-700">
          <div className="flex flex-wrap gap-4">
            <span>Not affiliated with UPS/FedEx.</span>
            <span>Data stays private until you download.</span>
            <span>Transparent pricing: $9.99 per packet.</span>
            <Link className="text-blue-700 underline-offset-2 hover:underline" href="mailto:hello@parcelscribe.com">Contact</Link>
            <Link className="text-blue-700 underline-offset-2 hover:underline" href="#">Privacy</Link>
            <Link className="text-blue-700 underline-offset-2 hover:underline" href="#">Terms</Link>
          </div>
        </footer>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
