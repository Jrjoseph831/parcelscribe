import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { loadMdxDocument } from "@/lib/content/mdxLoader";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const guideAliases: Record<string, string> = {
  "how-to-file-ups-damage-claim": "ups-damage-claim",
  "how-to-file-fedex-damage-claim": "fedex-damage-claim",
  "how-to-file-ups-lost-package-claim": "ups-lost-package-claim",
  "how-to-file-fedex-lost-package-claim": "fedex-lost-package-claim",
};

function resolveGuideSlug(slug: string) {
  return guideAliases[slug] ?? slug;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const canonicalSlug = resolveGuideSlug(params.slug);
  const guide = await loadMdxDocument({ type: "guides", slug: canonicalSlug });
  if (!guide) return {};
  const data = guide.data as { title?: string; metaTitle?: string; metaDescription?: string };
  return {
    title: data.metaTitle ?? data.title ?? canonicalSlug,
    description: data.metaDescription,
    alternates: { canonical: `https://parcelscribe.com/guides/${canonicalSlug}` },
  };
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const canonicalSlug = resolveGuideSlug(params.slug);
  const guide = await loadMdxDocument({ type: "guides", slug: canonicalSlug });

  if (!guide) {
    console.error(`[guides] Missing guide for slug: ${canonicalSlug}`);
    notFound();
  }

  if (params.slug !== canonicalSlug) {
    redirect(`/guides/${canonicalSlug}`);
  }

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-xs text-gray-600">
          <Link href="/guides" className="text-blue-700">Guides</Link> <span className="text-gray-400">/</span> <span className="text-gray-800">{(guide.data as any).title ?? canonicalSlug}</span>
        </nav>

        <header className="space-y-3">
          <Link href="/guides" className="text-xs font-semibold uppercase tracking-wide text-blue-600 underline-offset-2 hover:underline">
            Guides
          </Link>
          <h1 className="text-3xl font-semibold text-gray-900">{(guide.data as any).title ?? canonicalSlug}</h1>
          <p className="text-lg text-gray-700">{(guide.data as any).metaDescription ?? ""}</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Generate your packet PDF</Link>
            <Link className={buttonClasses("secondary")} href="/pricing">Pricing</Link>
          </div>
        </header>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <article className="prose prose-gray max-w-none">
            {guide.content}
          </article>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Generate your claim packet</p>
            <p className="text-sm text-gray-700">Damage, lost, or missing-contents—built for UPS and FedEx.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>
      </div>
    </main>
  );
}
