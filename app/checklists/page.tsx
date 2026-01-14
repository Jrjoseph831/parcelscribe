import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { listChecklists } from "@/lib/content/content";

export const metadata: Metadata = {
  title: "Evidence Checklists",
  description: "Evidence checklists for UPS/FedEx damage or lost package claims.",
  alternates: { canonical: "https://www.parcelscribe.com/checklists" },
};

export default async function ChecklistsIndexPage() {
  const checklists = await listChecklists();

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Checklists</p>
            <h1 className="text-3xl font-semibold text-gray-900">Evidence checklists</h1>
            <p className="text-lg text-gray-700">Attach every proof the carrier expects before you submit.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
            <Link className={buttonClasses("secondary")} href="/guides">View guides</Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {checklists.map((item) => (
            <Link
              key={item.slug}
              href={`/checklists/${item.slug}`}
              className="flex h-full flex-col gap-2 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm hover:border-blue-200"
            >
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-700">{item.metaDescription}</p>
              <p className="text-xs font-medium text-blue-700">View checklist</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
