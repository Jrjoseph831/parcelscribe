import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { getTemplate, listChecklists } from "@/lib/content/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const template = await getTemplate(params.slug);
  if (!template) return {};
  return {
    title: template.metaTitle ?? template.title,
    description: template.metaDescription,
    alternates: { canonical: `https://parcelscribe.com/templates/${template.slug}` },
  };
}

export default async function TemplatePage({ params }: { params: { slug: string } }) {
  const template = await getTemplate(params.slug);
  const checklists = await listChecklists();

  if (!template) {
    console.error(`[templates] Missing template for slug: ${params.slug}`);
    notFound();
  }

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-xs text-gray-600">
          <Link href="/templates" className="text-blue-700">Templates</Link> <span className="text-gray-400">/</span> <span className="text-gray-800">{template.title}</span>
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

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <article className="prose prose-gray max-w-none">
            {template.content}
          </article>
        </section>

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
              <Link key={item.slug} className={buttonClasses("secondary", "border-dashed")} href={`/checklists/${item.slug}`}>
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
