import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

const faqs = [
  {
    q: "Does this help with UPS and FedEx refunds?",
    a: "Yes. Parcelscribe builds a claim packet that matches what UPS and FedEx request for refunds due to damage, loss, or missing contents.",
  },
  {
    q: "What is inside the packet?",
    a: "A cover letter, incident timeline, checklist of evidence, and space for receipts, photos, tracking, and proof of value.",
  },
  {
    q: "Do I need design skills?",
    a: "No. We give you the structure and text prompts—just paste your details and upload photos.",
  },
  {
    q: "How much does it cost?",
    a: "$9.99 per packet. You only pay when you are ready to download the PDF.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Parcelscribe",
  url: "https://www.parcelscribe.com",
  logo: "https://www.parcelscribe.com/icon.png",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata: Metadata = {
  title: "UPS/FedEx Claim Packet Builder",
  description:
    "Create a UPS or FedEx claim packet for refunds (damage, loss, missing contents) with photos, receipts, and narrative in minutes.",
  alternates: { canonical: "https://www.parcelscribe.com/" },
};

export default function Home() {
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
            <Link href="/pricing" className="text-sm text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors">
              Pricing
            </Link>
            <Link className={buttonClasses("primary", "text-[13px] px-4 py-2")} href="/builder">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center stagger-children">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#0071e3]/5 px-4 py-1.5 text-[13px] font-medium text-[#0071e3] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3] animate-pulse-soft" />
              UPS & FedEx claim packets
            </p>
            <h1 className="text-[44px] md:text-[56px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#1d1d1f]">
              Get your carrier refund.
              <br />
              <span className="text-gradient-blue">Without the hassle.</span>
            </h1>
            <p className="mt-6 text-[19px] md:text-[21px] text-[#6e6e73] leading-relaxed max-w-2xl mx-auto">
              Parcelscribe creates a professional PDF packet with your cover letter, timeline, photos, and proof of value—exactly what UPS and FedEx need to approve your claim.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link className={buttonClasses("primary", "text-[15px] px-8 py-3")} href="/builder">
                Start a claim packet
              </Link>
              <Link className={buttonClasses("secondary", "text-[15px] px-8 py-3")} href="/pricing">
                See pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Preview Card */}
        <section className="pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="glass-card rounded-3xl p-8 hover-lift">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[17px] font-semibold text-[#1d1d1f]">Claim Packet PDF</p>
                      <p className="text-[13px] text-[#86868b]">Ready for UPS or FedEx submission</p>
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-[#0071e3]/10 px-3 py-1 text-[12px] font-medium text-[#0071e3]">
                  Preview
                </span>
              </div>
              <div className="space-y-3 rounded-2xl border border-[#e8e8ed] bg-[#fafafa] p-5">
                <p className="text-[15px] font-medium text-[#1d1d1f]">What's inside your packet</p>
                <div className="grid gap-2 text-[14px] text-[#6e6e73]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#30d158]/10 text-[#30d158] text-[11px]">1</span>
                    <span>Carrier-specific cover letter with all required facts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#30d158]/10 text-[#30d158] text-[11px]">2</span>
                    <span>Timestamped incident timeline for damage or loss</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#30d158]/10 text-[#30d158] text-[11px]">3</span>
                    <span>Evidence checklist: photos, receipts, tracking info</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#30d158]/10 text-[#30d158] text-[11px]">4</span>
                    <span>Export-ready PDF for carrier claim portals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 border-t border-[#e8e8ed]">
          <div className="text-center mb-16">
            <p className="text-[13px] font-medium text-[#0071e3] uppercase tracking-wide mb-3">How it works</p>
            <h2 className="text-[32px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-tight">
              Four simple steps to your claim
            </h2>
            <p className="mt-4 text-[17px] text-[#6e6e73] max-w-xl mx-auto">
              Collect, upload, generate, submit. Get a carrier-ready PDF in minutes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 stagger-children">
            <StepCard
              number="01"
              title="Collect details"
              body="Tracking number, ship date, item value, and what went wrong with your package."
            />
            <StepCard
              number="02"
              title="Upload evidence"
              body="Box condition, shipping label, packing materials, and damage photos."
            />
            <StepCard
              number="03"
              title="Generate packet"
              body="Parcelscribe creates your cover letter, timeline, and evidence list automatically."
            />
            <StepCard
              number="04"
              title="Submit claim"
              body="Download the PDF and upload to the UPS or FedEx claims portal."
            />
          </div>
          <div className="mt-12 text-center">
            <Link className={buttonClasses("primary", "text-[15px] px-8 py-3")} href="/builder">
              Start your packet
            </Link>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-20 border-t border-[#e8e8ed]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-[13px] font-medium text-[#0071e3] uppercase tracking-wide mb-3">Resources</p>
              <h2 className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight">
                Claim guides & templates
              </h2>
              <p className="mt-2 text-[17px] text-[#6e6e73]">
                Everything you need to know about UPS and FedEx claims.
              </p>
            </div>
            <Link className={buttonClasses("secondary")} href="/guides">
              View all guides
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <GuideLink href="/ups-refund" title="UPS refund guide" description="Complete walkthrough for UPS damage and loss claims" />
            <GuideLink href="/fedex-refund" title="FedEx refund guide" description="Step-by-step FedEx claim submission process" />
            <GuideLink href="/guides#ups-damage-claim" title="UPS damage claim" description="Document damage for maximum refund approval" />
            <GuideLink href="/guides#fedex-damage-claim" title="FedEx damage claim" description="FedEx-specific damage documentation tips" />
            <GuideLink href="/guides#ups-lost-package-claim" title="UPS lost package" description="How to file when your package never arrived" />
            <GuideLink href="/guides#fedex-lost-package-claim" title="FedEx lost package" description="FedEx lost package claim requirements" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-[#e8e8ed]">
          <div className="text-center mb-12">
            <p className="text-[13px] font-medium text-[#0071e3] uppercase tracking-wide mb-3">FAQ</p>
            <h2 className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            {faqs.map((item) => (
              <div key={item.q} className="glass-card rounded-2xl p-6 hover-lift">
                <p className="text-[15px] font-semibold text-[#1d1d1f] mb-2">{item.q}</p>
                <p className="text-[14px] text-[#6e6e73] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-[#e8e8ed]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[32px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-tight">
              Ready to get your refund?
            </h2>
            <p className="mt-4 text-[17px] text-[#6e6e73]">
              Start building your claim packet now. Only pay when you download.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link className={buttonClasses("primary", "text-[15px] px-8 py-3")} href="/builder">
                Start a claim packet
              </Link>
              <Link className={buttonClasses("ghost", "text-[15px] px-8 py-3")} href="/pricing">
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-[#e8e8ed]">
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

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}

function StepCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover-lift group">
      <span className="text-[13px] font-semibold text-[#0071e3] mb-4 block">{number}</span>
      <p className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{title}</p>
      <p className="text-[14px] text-[#6e6e73] leading-relaxed">{body}</p>
    </div>
  );
}

function GuideLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      className="glass-card rounded-2xl p-5 hover-lift group flex flex-col gap-2"
      href={href}
    >
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-[#1d1d1f]">{title}</span>
        <span className="text-[#0071e3] group-hover:translate-x-1 transition-transform">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
      <p className="text-[13px] text-[#6e6e73]">{description}</p>
    </Link>
  );
}
