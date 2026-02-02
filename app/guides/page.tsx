import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { guides } from "@/lib/content/guides";

export const metadata: Metadata = {
  title: "UPS/FedEx Claim Guides",
  description: "Guides for UPS and FedEx damage, lost, and missing-contents claims. Step-by-step checklists and templates.",
  alternates: { canonical: "https://www.parcelscribe.com/guides" },
};

export default function GuidesIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-mesh">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
            Parcelscribe
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/guides" className="text-sm text-[#1d1d1f] font-medium">
              Guides
            </Link>
            <Link href="/pricing" className="text-sm text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-[#0071e3] hover:text-[#0077ed] transition-colors font-medium">
              Sign in
            </Link>
            <Link className={buttonClasses("primary", "text-[13px] px-4 py-2")} href="/builder">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="stagger-children">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#0071e3]/5 px-4 py-1.5 text-[13px] font-medium text-[#0071e3] mb-4">
              Resources
            </p>
            <h1 className="text-[36px] md:text-[44px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
              Claim guides & resources
            </h1>
            <p className="mt-3 text-[17px] text-[#6e6e73] max-w-xl">
              Everything you need to know about filing UPS and FedEx claims for damage, loss, or missing contents.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link className={buttonClasses("primary")} href="/builder">Start a claim packet</Link>
            <Link className={buttonClasses("secondary")} href="/templates">View templates</Link>
          </div>
        </header>

        {/* Refund Guides Section */}
        <section className="glass-card rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div>
              <p className="text-[13px] font-medium text-[#0071e3] uppercase tracking-wide mb-2">Featured</p>
              <h2 className="text-[24px] font-semibold text-[#1d1d1f]">Refund & reimbursement guides</h2>
              <p className="mt-2 text-[15px] text-[#6e6e73]">Complete walkthroughs for UPS and FedEx refund claims.</p>
            </div>
            <Link className={buttonClasses("secondary", "text-[13px]")} href="/templates">Use templates</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link className="glass-card rounded-2xl px-5 py-4 hover-lift flex items-center justify-between group" href="/ups-refund">
              <span className="text-[15px] font-medium text-[#1d1d1f]">UPS refund guide</span>
              <span className="text-[#0071e3] group-hover:translate-x-1 transition-transform">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link className="glass-card rounded-2xl px-5 py-4 hover-lift flex items-center justify-between group" href="/fedex-refund">
              <span className="text-[15px] font-medium text-[#1d1d1f]">FedEx refund guide</span>
              <span className="text-[#0071e3] group-hover:translate-x-1 transition-transform">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link className="glass-card rounded-2xl px-5 py-4 hover-lift flex items-center justify-between group" href="/ups-claim">
              <span className="text-[15px] font-medium text-[#1d1d1f]">UPS claim and refund steps</span>
              <span className="text-[#0071e3] group-hover:translate-x-1 transition-transform">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link className="glass-card rounded-2xl px-5 py-4 hover-lift flex items-center justify-between group" href="/fedex-claim">
              <span className="text-[15px] font-medium text-[#1d1d1f]">FedEx claim and refund steps</span>
              <span className="text-[#0071e3] group-hover:translate-x-1 transition-transform">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* Guide Cards Grid */}
        <section className="grid gap-4 md:grid-cols-2 mb-12">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides#${guide.slug}`}
              className="glass-card rounded-2xl p-6 hover-lift group flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <p className="text-[17px] font-semibold text-[#1d1d1f]">{guide.title}</p>
                <span className="text-[#0071e3] group-hover:translate-x-1 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <p className="text-[14px] text-[#6e6e73] leading-relaxed">{guide.description}</p>
            </Link>
          ))}
        </section>

        {/* Full Guide Content */}
        <div className="grid gap-10 lg:grid-cols-[1fr,280px]">
          <div className="space-y-8">
            {guides.map((guide) => (
              <section key={guide.slug} id={guide.slug} className="glass-card rounded-3xl p-8 scroll-mt-24">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[13px] font-medium text-[#0071e3] uppercase tracking-wide mb-2">Guide</p>
                    <h2 className="text-[24px] font-semibold text-[#1d1d1f]">{guide.title}</h2>
                    <p className="mt-2 text-[15px] text-[#6e6e73]">{guide.description}</p>
                  </div>
                  <Link className={buttonClasses("secondary", "text-[13px] whitespace-nowrap")} href="/builder">Start packet</Link>
                </div>
                <div className="space-y-4 text-[15px] text-[#6e6e73] leading-relaxed">
                  {guide.body.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {guide.keywords.map((kw) => (
                    <span key={kw} className="rounded-full bg-[#0071e3]/5 px-3 py-1 text-[12px] font-medium text-[#0071e3]">{kw}</span>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="glass-card rounded-2xl p-5 sticky top-24">
              <p className="text-[13px] font-medium text-[#0071e3] uppercase tracking-wide mb-4">On this page</p>
              <ul className="space-y-3">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      className="text-[14px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors block"
                      href={`/guides#${guide.slug}`}
                    >
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#e8e8ed] space-y-3 text-[12px] text-[#86868b]">
                <p>Not affiliated with UPS/FedEx.</p>
                <p>Data stays private until download.</p>
                <p>Transparent pricing: $9.99 per packet.</p>
                <Link className="text-[#0071e3] hover:underline block mt-4" href="mailto:hello@parcelscribe.com">
                  Contact support
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="py-12 mt-16 border-t border-[#e8e8ed]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[13px] text-[#86868b]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>Not affiliated with UPS or FedEx</span>
              <span className="hidden md:inline">·</span>
              <span>Data stays private until download</span>
              <span className="hidden md:inline">·</span>
              <span>$9.99 per packet</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="mailto:hello@parcelscribe.com" className="hover:text-[#1d1d1f] transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-[#1d1d1f] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#1d1d1f] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
