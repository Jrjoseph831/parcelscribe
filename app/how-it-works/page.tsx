import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How Parcelscribe Works",
  description: "See how Parcelscribe builds UPS/FedEx claim packets: collect details, upload photos, generate a PDF, and submit to the carrier.",
  alternates: { canonical: "https://www.parcelscribe.com/how-it-works" },
};

const steps = [
  {
    title: "Collect shipment details",
    body: "Tracking number, ship date, carrier, item value, and what happened (damage, loss, or missing contents).",
  },
  {
    title: "Upload photos and proof",
    body: "Box, label, packing, damage shots, plus proof of value or proof of shipment for lost packages.",
  },
  {
    title: "Generate your packet",
    body: "Parcelscribe builds the cover letter, incident timeline, and evidence checklist into a PDF.",
  },
  {
    title: "Submit to UPS/FedEx",
    body: "Upload the PDF to the carrier portal and respond quickly to any follow-up questions.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Process</p>
          <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">How Parcelscribe builds your carrier-ready claim packet</h1>
          <p className="text-lg text-gray-700 md:text-xl">Four steps to generate a UPS/FedEx claim packet with evidence attached.</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
            <Link className={buttonClasses("secondary")} href="/pricing">See pricing</Link>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-900">{step.title}</p>
              <p className="mt-2 text-sm text-gray-700">{step.body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 rounded-2xl border border-gray-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">What you get</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
            <li>Carrier-specific cover letter with tracking, shipment facts, and requested amount.</li>
            <li>Incident timeline for damage or loss with clear timestamps.</li>
            <li>Evidence checklist with links for photos, receipts, tracking, and proof of value.</li>
            <li>Ready-to-upload PDF for UPS or FedEx claims portals.</li>
          </ul>
        </section>

        <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Best practices to speed approval</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
            <li>File as soon as damage or loss is confirmed; do not wait for more scans.</li>
            <li>Keep packaging until the claim closes in case inspection is requested.</li>
            <li>Respond to carrier follow-ups within 24 hours with concise bullets.</li>
            <li>Include proof of value and proof of shipment in the initial packet.</li>
          </ul>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Ready to generate your packet?</p>
            <p className="text-sm text-gray-700">Start now and download for $9.99 when you are ready.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>
      </div>
    </main>
  );
}
