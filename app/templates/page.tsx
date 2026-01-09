import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/content/templates";
import { checklists } from "@/content/checklists";
import { buttonClasses } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Claim Letter Templates",
  description: "UPS/FedEx claim letter templates and evidence checklists for damage or lost packages.",
  alternates: { canonical: "https://parcelscribe.com/templates" },
};

export default function TemplatesIndexPage() {
  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Templates</p>
            <h1 className="text-3xl font-semibold text-gray-900">Claim letter templates and checklists</h1>
            <p className="text-lg text-gray-700">Start from a claim letter or evidence checklist for UPS/FedEx damage or lost claims.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
            <Link className={buttonClasses("secondary")} href="/guides">View guides</Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className="flex h-full flex-col gap-2 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm hover:border-blue-200"
            >
              <p className="text-sm font-semibold text-gray-900">{template.title}</p>
              <p className="text-sm text-gray-700">{template.description}</p>
              <p className="text-xs font-medium text-blue-700">Use template</p>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-gray-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Checklists</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {checklists.map((item) => (
              <Link key={item.slug} className={buttonClasses("secondary", "border-dashed")} href={`/checklist/${item.slug}`}>
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
