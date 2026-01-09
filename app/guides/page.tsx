import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { listGuides, listTemplates } from "@/lib/content/content";

export const metadata: Metadata = {
  title: "UPS/FedEx Claim Guides",
  description: "Guides for UPS and FedEx damage, lost, and missing-contents claims. Step-by-step checklists and templates.",
  alternates: { canonical: "https://parcelscribe.com/guides" },
};

export default async function GuidesIndexPage() {
  const [guides, templates] = await Promise.all([listGuides(), listTemplates()]);

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link href="/guides" className="text-xs font-semibold uppercase tracking-wide text-blue-600 underline-offset-2 hover:underline">
              Guides
            </Link>
            <h1 className="text-3xl font-semibold text-gray-900">UPS/FedEx claim guides</h1>
            <p className="text-lg text-gray-700">Concise answers for damaged, lost, or missing-contents claims.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
            <Link className={buttonClasses("secondary")} href="/templates">View templates</Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="flex h-full flex-col gap-2 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm hover:border-blue-200"
            >
              <p className="text-sm font-semibold text-gray-900">{guide.title}</p>
              <p className="text-sm text-gray-700">{guide.metaDescription}</p>
              <p className="text-xs font-medium text-blue-700">Read guide</p>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-gray-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Need a template?</h2>
          <p className="mt-2 text-sm text-gray-700">Start from a claim letter template or evidence checklist.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {templates.map((template) => (
              <Link
                key={template.slug}
                className={buttonClasses("secondary")}
                href={`/templates/${template.slug}`}
              >
                {template.title}
              </Link>
            ))}
            <Link className={buttonClasses("secondary", "border-dashed")} href="/checklists/shipping-damage-evidence-checklist">
              Evidence checklist
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
