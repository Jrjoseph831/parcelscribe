import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { guides, getGuide } from "@/content/guides";
import { templates } from "@/content/templates";
import { buttonClasses } from "@/components/ui/Button";

const guideAliases: Record<string, string> = {
  "how-to-file-ups-damage-claim": "ups-damage-claim",
  "how-to-file-fedex-damage-claim": "fedex-damage-claim",
  "how-to-file-ups-lost-package-claim": "ups-lost-package-claim",
  "how-to-file-fedex-lost-package-claim": "fedex-lost-package-claim",
};

function resolveGuideSlug(slug: string) {
  return guideAliases[slug] ?? slug;
}

export async function generateStaticParams() {
  const aliasSlugs = Object.keys(guideAliases);
  return [...guides.map((guide) => guide.slug), ...aliasSlugs].map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const canonicalSlug = resolveGuideSlug(params.slug);
  const guide = getGuide(canonicalSlug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `https://parcelscribe.com/guides/${guide.slug}` },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const canonicalSlug = resolveGuideSlug(params.slug);
  const guide = getGuide(canonicalSlug);

  if (!guide) {
    notFound();
  }

  if (params.slug !== canonicalSlug) {
    redirect(`/guides/${canonicalSlug}`);
  }

  const relatedGuides = guide.relatedGuides ?? [];
  const relatedTemplates = guide.relatedTemplates ?? [];

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-xs text-gray-600">
          <Link href="/" className="text-blue-700">Home</Link> <span className="text-gray-400">/</span> <Link href="/guides" className="text-blue-700">Guides</Link> <span className="text-gray-400">/</span> <span className="text-gray-800">{guide.title}</span>
        </nav>

        <header className="space-y-3">
          <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 underline-offset-2 hover:underline">
            Guides
          </Link>
          <h1 className="text-3xl font-semibold text-gray-900">{guide.title}</h1>
          <p className="text-lg text-gray-700">{guide.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Generate your packet PDF</Link>
            <Link className={buttonClasses("secondary")} href="/pricing">Pricing</Link>
          </div>
        </header>

        <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">Steps</h2>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-800">
              {guide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">What you need</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
              {guide.whatYouNeed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">Common mistakes</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
              {guide.commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {guide.nextSteps?.length ? (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Next steps</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-800">
                {guide.nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Generate your claim packet</p>
            <p className="text-sm text-gray-700">Damage, lost, or missing-contents—built for UPS and FedEx.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>

        {relatedGuides.length || relatedTemplates.length ? (
          <section className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Related</h2>
            <div className="flex flex-wrap gap-3">
              {relatedGuides.map((slug) => {
                const relatedGuide = getGuide(slug);
                if (!relatedGuide) return null;
                return (
                  <Link key={slug} className={buttonClasses("secondary", "border-dashed")} href={`/guides/${slug}`}>
                    {relatedGuide.title}
                  </Link>
                );
              })}

              {relatedTemplates.map((slug) => {
                const relatedTemplate = templates.find((tpl) => tpl.slug === slug);
                if (!relatedTemplate) return null;
                return (
                  <Link key={slug} className={buttonClasses("secondary", "border-dashed")} href={`/templates/${slug}`}>
                    {relatedTemplate.title}
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {guide.disclaimer ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">Reminder</p>
            <p className="mt-1">{guide.disclaimer}</p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
