import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTemplate } from "@/content/templates";
import { checklists } from "@/content/checklists";
import { buttonClasses } from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const template = getTemplate(params.slug);
  if (!template) return {};
  return {
    title: template.metaTitle,
    description: template.metaDescription,
    alternates: { canonical: `https://parcelscribe.com/templates/${template.slug}` },
  };
}

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const template = getTemplate(params.slug);

  if (!template) {
    notFound();
  }

  const relatedGuides = template.relatedGuides ?? [];

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-xs text-gray-600">
          <Link href="/" className="text-blue-700">Home</Link> <span className="text-gray-400">/</span> <Link href="/templates" className="text-blue-700">Templates</Link> <span className="text-gray-400">/</span> <span className="text-gray-800">{template.title}</span>
        </nav>

        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Template</p>
          <h1 className="text-3xl font-semibold text-gray-900">{template.title}</h1>
          <p className="text-lg text-gray-700">{template.metaDescription}</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Generate your packet PDF</Link>
            <Link className={buttonClasses("secondary")} href="/pricing">Pricing</Link>
          </div>
        </header>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">Copy and paste</h2>
            <p className="text-sm text-gray-700">Replace the placeholders, keep bullets tight, and attach the evidence you reference.</p>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl border border-gray-100 bg-slate-50 p-4 text-sm text-gray-900">{template.templateText}</pre>
        </section>

        <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">How to use</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
              {template.howToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {template.carrierNotes?.length ? (
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-900">Carrier notes</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
                {template.carrierNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Drop this into your claim packet</p>
            <p className="text-sm text-gray-700">Download the PDF for UPS or FedEx after you add photos and proof.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>

        {relatedGuides.length ? (
          <section className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Related guides</h2>
            <div className="flex flex-wrap gap-3">
              {relatedGuides.map((slug) => (
                <Link key={slug} className={buttonClasses("secondary", "border-dashed")} href={`/guides/${slug}`}>
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Related checklists</h2>
          <div className="flex flex-wrap gap-3">
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
