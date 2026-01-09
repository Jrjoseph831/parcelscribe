import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { templates, getTemplate } from "@/content/templates";
import { checklists } from "@/content/checklists";
import { buttonClasses } from "@/components/ui/Button";

export async function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const template = getTemplate(params.slug);
  if (!template) return {};
  return {
    title: template.title,
    description: template.description,
    alternates: { canonical: `https://parcelscribe.com/templates/${template.slug}` },
  };
}

export default function TemplatePage({ params }: { params: { slug: string } }) {
  const template = getTemplate(params.slug);

  if (!template) {
    notFound();
  }

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-xs text-gray-600">
          <Link href="/" className="text-blue-700">Home</Link> <span className="text-gray-400">/</span> <Link href="/templates" className="text-blue-700">Templates</Link> <span className="text-gray-400">/</span> <span className="text-gray-800">{template.title}</span>
        </nav>

        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Template</p>
          <h1 className="text-3xl font-semibold text-gray-900">{template.title}</h1>
          <p className="text-lg text-gray-700">{template.hero}</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Generate your packet PDF</Link>
            <Link className={buttonClasses("secondary")} href="/pricing">Pricing</Link>
          </div>
        </header>

        <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {template.sections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">{section.heading}</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {template.tags?.length ? (
          <div className="flex flex-wrap gap-2 text-xs text-blue-700">
            {template.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 font-semibold">{tag.toUpperCase()}</span>
            ))}
          </div>
        ) : null}

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Drop this into your claim packet</p>
            <p className="text-sm text-gray-700">Download the PDF for UPS or FedEx after you add photos and proof.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>

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
