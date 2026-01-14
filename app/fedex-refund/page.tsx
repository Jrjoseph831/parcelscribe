import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

const faqs = [
  {
    q: "How do I request a FedEx refund?",
    a: "FedEx refunds for lost or damaged packages are processed as claims. Submit a claim with proof of shipment, proof of value, and a reimbursement request.",
  },
  {
    q: "What should I include in a FedEx refund request?",
    a: "Include tracking, a short timeline, and a clear request to reimburse the item value and eligible charges.",
  },
  {
    q: "Does FedEx refund shipping costs?",
    a: "Refund policies vary by service level and situation. Include shipping charges in your request if eligible.",
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
      name: "FedEx Refund Guide",
      item: "https://www.parcelscribe.com/fedex-refund",
    },
  ],
};

export const metadata: Metadata = {
  title: "FedEx Refund Guide",
  description:
    "FedEx refund guide for lost or damaged packages. Learn how refunds work as claims and what to include for reimbursement.",
  alternates: { canonical: "https://www.parcelscribe.com/fedex-refund" },
};

export default function FedexRefundPage() {
  return (
    <main className="bg-white px-4 py-10 sm:py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 underline-offset-2 hover:underline">
              FedEx refunds
            </Link>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">FedEx refund guide</h1>
            <p className="text-base text-gray-700 sm:text-lg">
              FedEx refunds for loss or damage are processed as claims. Use this checklist to request reimbursement with the right evidence.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link className={`${buttonClasses("primary")} w-full sm:w-auto`} href="/builder">Build a claim packet</Link>
            <Link className={`${buttonClasses("secondary")} w-full sm:w-auto`} href="/fedex-claim">View FedEx claim guide</Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">FedEx refund steps</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-700 sm:text-base">
              <li>Collect tracking, proof of shipment, and proof of value.</li>
              <li>Document damage with photos of the box, label, and packing.</li>
              <li>File the claim in the FedEx portal with a short summary.</li>
              <li>Request reimbursement for item value and eligible charges.</li>
              <li>Reply quickly to FedEx follow-up requests.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Evidence to include</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 sm:text-base">
              <li>Tracking history and exception scan.</li>
              <li>Proof of shipment and proof of value.</li>
              <li>Damage photos and packaging photos.</li>
              <li>Recipient contact details and delivery address.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Sample refund request wording</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 sm:text-base">
              <li>State the tracking number and shipment date.</li>
              <li>Summarize the loss or damage in one paragraph.</li>
              <li>Request reimbursement for the item value and shipping costs if eligible.</li>
              <li>List the attachments in the order FedEx expects.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Refund resources</h2>
            <div className="mt-3 space-y-2">
              <Link className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-blue-200" href="/templates">
                <span>Claim letter templates</span>
                <span className="text-xs font-medium text-blue-600">View</span>
              </Link>
              <Link className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-blue-200" href="/guides#fedex-lost-package-claim">
                <span>FedEx lost package guide</span>
                <span className="text-xs font-medium text-blue-600">View</span>
              </Link>
              <Link className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-blue-200" href="/guides#fedex-damage-claim">
                <span>FedEx damage claim guide</span>
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
