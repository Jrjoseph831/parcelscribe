import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <section className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">PARCELSCRIBE</p>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold leading-tight text-gray-900">Build your UPS/FedEx claim packet</h1>
              <p className="text-lg text-gray-700">
                Build a carrier-ready claim packet in minutes. We keep your cover letter, incident
                timeline, and evidence checklist clean and organized.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link className={buttonClasses("primary")} href="/builder">
                Start a packet
              </Link>
              <Link className={buttonClasses("secondary")} href="/login">
                Log in
              </Link>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <FeatureChip>Cover letter & claim summary</FeatureChip>
              <FeatureChip>Incident timeline with timestamps</FeatureChip>
              <FeatureChip>Evidence checklist and receipts</FeatureChip>
              <FeatureChip>Export-ready for carrier portals</FeatureChip>
            </div>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Claim packet preview</p>
                  <p className="text-xs text-gray-500">Tailored for UPS & FedEx submissions</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Draft
                </span>
              </div>
              <div className="space-y-3 rounded-lg border border-dashed border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">What you&apos;ll produce</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Carrier-ready cover letter that hits every required point.</li>
                  <li>Chronological incident timeline with shipment details.</li>
                  <li>Evidence checklist with receipts, photos, and tracking.</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                PARCELSCRIBE keeps the structure tight so you can focus on the details.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

function FeatureChip({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm">
      <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
