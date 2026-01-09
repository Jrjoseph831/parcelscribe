import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { getChecklist } from "@/lib/content/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const checklist = await getChecklist(params.slug);
  if (!checklist) return {};
  return {
    title: checklist.metaTitle ?? checklist.title,
    description: checklist.metaDescription,
    alternates: { canonical: `https://parcelscribe.com/checklists/${checklist.slug}` },
  };
}

export default async function ChecklistPage({ params }: { params: { slug: string } }) {
  const checklist = await getChecklist(params.slug);

  if (!checklist) {
    console.error(`[checklists] Missing checklist for slug: ${params.slug}`);
    notFound();
  }

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-xs text-gray-600">
          <Link href="/checklists" className="text-blue-700">Checklists</Link> <span className="text-gray-400">/</span> <span className="text-gray-800">{checklist.title}</span>
        </nav>

        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Checklist</p>
          <h1 className="text-3xl font-semibold text-gray-900">{checklist.title}</h1>
          <p className="text-lg text-gray-700">{checklist.metaDescription}</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Generate your packet PDF</Link>
            <Link className={buttonClasses("secondary")} href="/pricing">Pricing</Link>
          </div>
        </header>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <article className="prose prose-gray max-w-none">
            {checklist.content}
          </article>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Attach proof before you submit</p>
            <p className="text-sm text-gray-700">Photos, value proof, and shipment proof in one packet.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>
      </div>
    </main>
  );
}
