import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

const price = "9.99";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Parcelscribe claim packet PDF",
  description: "Carrier-ready UPS/FedEx claim packet with cover letter, timeline, and evidence checklist.",
  brand: {
    "@type": "Organization",
    name: "Parcelscribe",
  },
  offers: {
    "@type": "Offer",
    price: price,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://www.parcelscribe.com/pricing",
  },
};

export const metadata: Metadata = {
  title: "Pricing",
  description: "Parcelscribe costs $9.99 per claim packet PDF. Pay only when you download.",
  alternates: { canonical: "https://www.parcelscribe.com/pricing" },
};

const features = [
  {
    title: "Carrier-ready cover letter",
    description: "Professional format that matches UPS and FedEx requirements",
  },
  {
    title: "Incident timeline",
    description: "Timestamped events that align with tracking data",
  },
  {
    title: "Evidence checklist",
    description: "Organized sections for photos, receipts, and proof of value",
  },
  {
    title: "Export-ready PDF",
    description: "Download and upload directly to carrier claim portals",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-mesh">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-nav">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
            Parcelscribe
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/guides" className="text-sm text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors">
              Guides
            </Link>
            <Link href="/pricing" className="text-sm text-[#1d1d1f] font-medium">
              Pricing
            </Link>
            <Link className={buttonClasses("primary", "text-[13px] px-4 py-2")} href="/builder">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex w-full max-w-4xl flex-col px-6 py-20">
        {/* Header */}
        <header className="text-center mb-16 stagger-children">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#0071e3]/5 px-4 py-1.5 text-[13px] font-medium text-[#0071e3] mb-6">
            Simple pricing
          </p>
          <h1 className="text-[40px] md:text-[48px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f]">
            One price. No tiers.
          </h1>
          <p className="mt-4 text-[19px] text-[#6e6e73] max-w-xl mx-auto">
            Pay only when you download your finished claim packet PDF.
          </p>
        </header>

        {/* Pricing Card */}
        <section className="mb-16">
          <div className="glass-card rounded-3xl p-8 md:p-10 hover-lift">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[19px] font-semibold text-[#1d1d1f]">Claim Packet PDF</p>
                    <p className="text-[14px] text-[#86868b]">UPS or FedEx • Damage, loss, or missing contents</p>
                  </div>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[48px] font-semibold text-[#1d1d1f] leading-none tracking-tight">${price}</p>
                <p className="text-[13px] text-[#86868b] mt-1 uppercase tracking-wide">per packet</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#30d158]/10 text-[#30d158] flex-shrink-0 mt-0.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-[#1d1d1f]">{feature.title}</p>
                    <p className="text-[13px] text-[#6e6e73]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link className={buttonClasses("primary", "text-[15px] px-8 py-3 flex-1 sm:flex-none")} href="/builder">
                Start a claim packet
              </Link>
              <Link className={buttonClasses("secondary", "text-[15px] px-8 py-3")} href="/guides">
                Read guides first
              </Link>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="mb-16">
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-[24px] font-semibold text-[#1d1d1f] mb-6">What's included</h2>
            <div className="space-y-4 text-[15px] text-[#6e6e73]">
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold flex-shrink-0 mt-0.5">1</span>
                <p>Plain-language cover letter tuned specifically for UPS and FedEx claim reviewers.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold flex-shrink-0 mt-0.5">2</span>
                <p>Incident timeline that matches tracking events and delivery milestones.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold flex-shrink-0 mt-0.5">3</span>
                <p>Checklist sections to attach photos, receipts, tracking screenshots, and proof of value.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold flex-shrink-0 mt-0.5">4</span>
                <p>Ready-to-upload PDF format—no design or formatting skills needed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="glass-card rounded-3xl p-8 bg-gradient-to-br from-[#0071e3]/5 to-[#5e5ce6]/5 border-[#0071e3]/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Draft for free</p>
              <p className="text-[15px] text-[#6e6e73]">
                Build your entire claim packet before paying. Only $9.99 when you're ready to download.
              </p>
            </div>
            <Link className={buttonClasses("primary", "text-[15px] px-8 py-3 whitespace-nowrap")} href="/builder">
              Start a claim packet
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 mt-12 border-t border-[#e8e8ed]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[13px] text-[#86868b]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>Not affiliated with UPS or FedEx</span>
              <span className="hidden md:inline">·</span>
              <span>Data stays private until download</span>
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

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </main>
  );
}
