import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/content/guides";
import { templates } from "@/content/templates";
import { buttonClasses } from "@/components/ui/Button";

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `https://parcelscribe.com/guides/${guide.slug}` },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);

  if (!guide) {
    notFound();
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const relatedLinks = guide.related ?? [];

  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-xs text-gray-600">
          <Link href="/" className="text-blue-700">Home</Link> <span className="text-gray-400">/</span> <Link href="/guides" className="text-blue-700">Guides</Link> <span className="text-gray-400">/</span> <span className="text-gray-800">{guide.title}</span>
        </nav>

        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Guide</p>
          <h1 className="text-3xl font-semibold text-gray-900">{guide.title}</h1>
          <p className="text-lg text-gray-700">{guide.hero}</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Generate your packet PDF</Link>
            <Link className={buttonClasses("secondary")} href="/pricing">Pricing</Link>
          </div>
        </header>

        <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {guide.sections.map((section) => (
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

        {guide.faqs.length ? (
          <section className="grid gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">FAQ</h2>
            <div className="grid gap-3">
              {guide.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="font-semibold text-gray-900">{faq.question}</p>
                  <p className="mt-2 text-sm text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Generate your claim packet</p>
            <p className="text-sm text-gray-700">Damage, lost, or missing-contents—built for UPS and FedEx.</p>
          </div>
          <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
        </section>

        {relatedLinks.length ? (
          <section className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Related</h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((slug) => {
                const relatedGuide = getGuide(slug);
                const relatedTemplate = templates.find((tpl) => tpl.slug === slug);

                if (relatedGuide) {
                  return (
                    <Link key={slug} className={buttonClasses("secondary", "border-dashed")} href={`/guides/${slug}`}>
                      {relatedGuide.title}
                    </Link>
                  );
                }

                if (relatedTemplate) {
                  return (
                    <Link key={slug} className={buttonClasses("secondary", "border-dashed")} href={`/templates/${slug}`}>
                      {relatedTemplate.title}
                    </Link>
                  );
                }

                return null;
              })}
            </div>
          </section>
        ) : null}
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
