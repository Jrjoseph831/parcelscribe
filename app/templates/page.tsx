import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { templates } from "@/lib/content/templates";

export const metadata: Metadata = {
  title: "Claim Letter Templates",
  description: "UPS/FedEx claim letter templates and evidence checklists for damage or lost packages.",
};

export default function TemplatesIndexPage() {
  return (
    <main className="bg-white px-4 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 underline-offset-2 hover:underline">Templates</Link>
            <h1 className="text-3xl font-semibold text-gray-900">Claim letter templates and checklists</h1>
            <p className="text-lg text-gray-700">Copy-ready letters in one place for UPS and FedEx claims.</p>
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
              href={`/templates#${template.slug}`}
              className="flex h-full flex-col gap-2 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm hover:border-blue-200"
            >
              <p className="text-sm font-semibold text-gray-900">{template.title}</p>
              <p className="text-sm text-gray-700">{template.description}</p>
              <p className="text-xs font-medium text-blue-700">Jump to template</p>
            </Link>
          ))}
        </section>

        <div className="grid gap-10 lg:grid-cols-[1fr,260px]">
          <div className="space-y-10">
            {templates.map((template) => (
              <section key={template.slug} id={template.slug} className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Template</p>
                    <h2 className="text-2xl font-semibold text-gray-900">{template.title}</h2>
                    <p className="text-sm text-gray-700">{template.description}</p>
                  </div>
                  <CopyButton text={template.body} />
                </div>
                <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-gray-100 bg-slate-50 p-4 text-sm text-gray-900">{template.body}</pre>
              </section>
            ))}
          </div>

          <aside className="hidden lg:block sticky top-24 h-fit rounded-2xl border border-gray-200 bg-slate-50 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">On this page</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-800">
              {templates.map((template) => (
                <li key={template.slug}>
                  <Link className="hover:text-blue-700" href={`/templates#${template.slug}`}>{template.title}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 text-xs text-gray-600">
              <p>Not affiliated with UPS/FedEx.</p>
              <p>Data stays private until you download.</p>
              <p>Transparent pricing: $9.99 per packet.</p>
              <Link className="text-blue-700" href="mailto:hello@parcelscribe.com">Contact support</Link>
            </div>
          </aside>
        </div>

        <footer className="rounded-2xl border border-gray-200 bg-slate-50 p-6 text-sm text-gray-700">
          <div className="flex flex-wrap gap-4">
            <span>Not affiliated with UPS/FedEx.</span>
            <span>Data stays private until you download.</span>
            <span>Transparent pricing: $9.99 per packet.</span>
            <Link className="text-blue-700 underline-offset-2 hover:underline" href="mailto:hello@parcelscribe.com">Contact</Link>
            <Link className="text-blue-700 underline-offset-2 hover:underline" href="#">Privacy</Link>
            <Link className="text-blue-700 underline-offset-2 hover:underline" href="#">Terms</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
