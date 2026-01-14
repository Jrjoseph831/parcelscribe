import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

const price = "9.99";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Parcelscribe claim packet PDF",
  description: "Carrier-ready UPS/FedEx claim packet with cover letter, timeline, and evidence checklist.",
  brand: {
    "@type": "Organization",
    name: "Parcelscribe",
  },
  offers: {
    "@type": "Offer",
    price: price,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://www.parcelscribe.com/pricing",
  },
};

export const metadata: Metadata = {
  title: "Pricing",
  description: "Parcelscribe costs $9.99 per claim packet PDF. Pay only when you download.",
  alternates: { canonical: "https://www.parcelscribe.com/pricing" },
};

export default function PricingPage() {
  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Pricing</p>
          <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">Simple pricing for UPS/FedEx claim packets</h1>
          <p className="text-lg text-gray-700">One price, no tiers. Pay when you download your packet PDF.</p>
        </header>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Parcelscribe claim packet</p>
              <p className="text-sm text-gray-700">Damage, lost, or missing-contents claims for UPS and FedEx.</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-semibold text-gray-900">${price}</p>
              <p className="text-xs uppercase tracking-wide text-gray-600">per packet PDF</p>
            </div>
          </div>
          <ul className="mt-4 grid gap-2 text-sm text-gray-800 md:grid-cols-2">
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />Carrier-ready cover letter</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />Incident timeline with timestamps</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />Evidence checklist (photos, receipts, proof of value)</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />Downloadable PDF ready for UPS/FedEx portals</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
            <Link className={buttonClasses("secondary")} href="/guides">Read guides</Link>
          </div>
        </section>

        <section className="grid gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">What is included</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
            <li>Plain-language cover letter tuned for UPS and FedEx review.</li>
            <li>Incident timeline that matches tracking and delivery events.</li>
            <li>Checklist to attach photos, receipts, tracking, and proof of value.</li>
            <li>Ready-to-upload PDF; no design or formatting needed.</li>
          </ul>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Only pay when you download</p>
            <p className="text-sm text-gray-700">Draft free. Pay $9.99 when you are ready to submit to UPS or FedEx.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </main>
  );
}
