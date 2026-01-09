import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

const faqs = [
  {
    q: "Does this work for UPS and FedEx?",
    a: "Yes. Parcelscribe builds a claim packet that matches what UPS and FedEx request for damage, loss, or missing contents claims.",
  },
  {
    q: "What is inside the packet?",
    a: "A cover letter, incident timeline, checklist of evidence, and space for receipts, photos, tracking, and proof of value.",
  },
  {
    q: "Do I need design skills?",
    a: "No. We give you the structure and text prompts—just paste your details and upload photos.",
  },
  {
    q: "How much does it cost?",
    a: "$9.99 per packet. You only pay when you are ready to download the PDF.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Parcelscribe",
  url: "https://parcelscribe.com",
  logo: "https://parcelscribe.com/icon.png",
};

export const metadata: Metadata = {
  title: "UPS/FedEx Claim Packet Builder",
  description:
    "Create a UPS or FedEx claim packet (damage, loss, missing contents) with photos, receipts, and narrative in minutes.",
  alternates: { canonical: "https://parcelscribe.com/" },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">UPS / FedEx claim packets</p>
            <h1 className="text-4xl font-semibold leading-tight text-gray-900 md:text-5xl">
              Build a carrier-ready claim packet for damaged or lost packages
            </h1>
            <p className="text-lg text-gray-700 md:text-xl">
              Parcelscribe creates a PDF with your cover letter, timeline, photos, and proof of value so UPS or FedEx reviewers get exactly what they need.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className={buttonClasses("primary")} href="/builder">
                Start a claim packet
              </Link>
              <Link className={buttonClasses("secondary")} href="/pricing">
                See pricing
              </Link>
              <Link className={buttonClasses("secondary", "border-dashed")} href="/guides">
                Read guides
              </Link>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <FeatureRow label="Cover letter + incident timeline" />
              <FeatureRow label="Damage, loss, or missing contents" />
              <FeatureRow label="Photos, receipts, proof of value" />
              <FeatureRow label="Export-ready PDF for carrier portals" />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-gray-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Claim packet PDF</p>
                <p className="text-xs text-gray-600">UPS / FedEx ready • Damage or loss</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Preview</span>
            </div>
            <div className="space-y-2 rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-800">
              <p className="font-semibold text-gray-900">Inside your PDF</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Carrier-specific cover letter with requested facts.</li>
                <li>Timestamped incident timeline for damage or loss.</li>
                <li>Evidence checklist: photos, receipts, tracking, proof of value.</li>
                <li>Ready to upload to UPS or FedEx claims portal.</li>
              </ul>
            </div>
            <p className="text-xs text-gray-600">You focus on proof; Parcelscribe keeps the structure tight.</p>
          </div>
        </section>

        <section className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">How it works</p>
            <h2 className="text-2xl font-semibold text-gray-900">Collect, upload, generate, submit</h2>
            <p className="text-base text-gray-700">Simple steps to get a carrier-ready PDF.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <StepCard title="Collect details" body="Tracking, ship date, item value, and what went wrong." />
            <StepCard title="Upload photos" body="Box, label, packing, and damage (or proof of shipment for loss)." />
            <StepCard title="Generate packet" body="Parcelscribe builds the cover letter, timeline, and evidence list." />
            <StepCard title="Submit to carrier" body="Upload the PDF to UPS or FedEx and reply fast to follow-ups." />
          </div>
          <div>
            <Link className={buttonClasses("primary")} href="/builder">
              Start your packet
            </Link>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Guides</p>
              <h2 className="text-2xl font-semibold text-gray-900">UPS/FedEx claim guides</h2>
              <p className="text-base text-gray-700">Reddit-style answers to common UPS and FedEx claim questions.</p>
            </div>
            <Link className={buttonClasses("secondary")} href="/guides">
              View all guides
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <GuideLink href="/guides/how-to-file-ups-damage-claim" title="How to file a UPS damage claim" />
            <GuideLink href="/guides/how-to-file-fedex-damage-claim" title="How to file a FedEx damage claim" />
            <GuideLink href="/guides/ups-lost-package-claim" title="UPS lost package claim" />
            <GuideLink href="/guides/fedex-lost-package-claim" title="FedEx lost package claim" />
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">FAQ</p>
            <h2 className="text-2xl font-semibold text-gray-900">Claim packet FAQs</h2>
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
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </main>
  );
}

function FeatureRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm">
      <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

function StepCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-2 text-sm text-gray-700">{body}</p>
    </div>
  );
}

function GuideLink({ href, title }: { href: string; title: string }) {
  return (
    <Link className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-blue-200" href={href}>
      <span>{title}</span>
      <span className="text-xs font-medium text-blue-600">Read</span>
    </Link>
  );
}
