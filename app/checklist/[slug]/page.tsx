import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { checklists, getChecklist } from "@/content/checklists";
import { buttonClasses } from "@/components/ui/Button";

export async function generateStaticParams() {
  return checklists.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getChecklist(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `https://parcelscribe.com/checklist/${item.slug}` },
  };
}

export default function ChecklistPage({ params }: { params: { slug: string } }) {
  const item = getChecklist(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-xs text-gray-600">
          <Link href="/" className="text-blue-700">Home</Link> <span className="text-gray-400">/</span> <Link href="/templates" className="text-blue-700">Templates</Link> <span className="text-gray-400">/</span> <span className="text-gray-800">{item.title}</span>
        </nav>

        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Checklist</p>
          <h1 className="text-3xl font-semibold text-gray-900">{item.title}</h1>
          <p className="text-lg text-gray-700">{item.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Generate your packet PDF</Link>
            <Link className={buttonClasses("secondary")} href="/guides">Read guides</Link>
          </div>
        </header>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
            {item.items.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Ready to attach these to a PDF?</p>
            <p className="text-sm text-gray-700">Parcelscribe organizes your photos, receipts, and proof of value for the carrier.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>
      </div>
    </main>
  );
}
