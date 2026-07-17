import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpenCheck, ClipboardCheck, Map, ShieldCheck } from 'lucide-react'
import { siteConfig, contactLinks } from '../site'
import { guidanceEntries, hubFaq } from './content'
import ChecklistLeadForm from './ChecklistLeadForm'

export const metadata: Metadata = {
  title: 'UK AI Compliance Hub — What Regulators Say About AI and Client Data',
  description:
    'What the Law Society, SRA, Bar Council, judiciary, ICO, DUAA 2025, and FCA actually say about AI and confidential data — mapped to practical technical controls.',
  keywords: [
    'UK AI compliance',
    'law firm AI guidance',
    'Law Society generative AI',
    'SRA AI guidance',
    'ICO generative AI',
    'DUAA 2025',
    'FCA AI approach',
  ],
  alternates: {
    canonical: '/compliance',
  },
  openGraph: {
    title: 'UK AI Compliance Hub',
    description:
      'Every major UK source of AI guidance for regulated firms, summarised with verbatim lines and mapped to technical controls.',
    url: `${siteConfig.url}/compliance`,
  },
}

// Static, developer-authored JSON-LD only (no user input). The < escape keeps
// any literal "<" in content from terminating the script tag (XSS hardening).
function toJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: hubFaq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function ComplianceHubPage() {
  return (
    <main className="min-h-screen pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqStructuredData) }} />

      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.16),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
            <BookOpenCheck className="h-3.5 w-3.5" />
            UK compliance hub
          </div>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl font-bold md:text-7xl">
            The regulators have already written the rules for AI and client data
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            There is no single UK AI Act — instead, the Law Society, SRA, Bar Council, the judiciary, the ICO, the Data
            (Use and Access) Act 2025, and the FCA each set expectations for how regulated teams use AI with
            confidential data. This hub summarises each source with verbatim lines, links to the originals, and maps
            every expectation to a practical technical control. Each page carries the date it was last reviewed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#guidance" className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
              Browse the guidance
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link href="/compliance/uk-guidance-map" className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
              <Map className="h-5 w-5" />
              Open the guidance map
            </Link>
          </div>
        </div>
      </section>

      <section id="guidance" className="section">
        <div className="container-custom">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">The seven sources that matter</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            Each page: what the guidance says (verbatim), what it means for your firm, and how it maps to technical
            controls.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {guidanceEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/compliance/${entry.slug}`}
                className="group rounded-[24px] border border-white/10 bg-background/80 p-6 transition hover:border-primary/40 hover:bg-primary/[0.06]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">{entry.shortName}</p>
                  <span className="text-xs text-slate-500">
                    {entry.lastUpdated ? `Updated ${entry.lastUpdated}` : `Published ${entry.firstPublished}`}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-xl font-semibold text-white group-hover:text-primary-light">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{entry.oneLineSummary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-light">
                  Read the summary
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}

            <Link
              href="/compliance/uk-guidance-map"
              className="group rounded-[24px] border border-primary/25 bg-primary/10 p-6 transition hover:border-primary/50"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">Cross-regulator</p>
                <Map className="h-4 w-4 text-primary-light" />
              </div>
              <h3 className="mt-3 font-heading text-xl font-semibold text-white">UK guidance map</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                One table: every NeutralAI control mapped to the guidance lines it addresses, across all seven sources.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-light">
                Open the map
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section id="checklist" className="section">
        <div className="container-custom">
          <div className="rounded-[32px] border border-primary/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.97)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_24%)] px-6 py-10 md:px-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Free checklist
                </div>
                <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                  AI Confidentiality Checklist for Law Firms
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  Thirty practical questions across usage discovery, client-data exposure, policy, technical controls,
                  audit evidence, and incident readiness — with a scoring guide. Built for partners, COLPs, DPOs, and
                  IT leads who need a structured 20-minute review, not a compliance lecture.
                </p>
                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Not legal advice; the checklist is a practical starting point for reviewing AI confidentiality risk.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/12 bg-background/85 p-6">
                <ChecklistLeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">Common questions</h2>
          <div className="mt-8 space-y-4">
            {hubFaq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-background/80 p-6">
                <h3 className="font-heading text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-primary-light" />
              <div>
                <h3 className="font-heading text-xl font-semibold text-white">
                  Want to see the controls behind the mapping?
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  NeutralAI masks client-identifiable data in prompts and uploads before they reach AI tools, keeps a
                  reversible vault with a 15-minute TTL, and logs audit-friendly evidence of every control. See the
                  published accuracy benchmark, or bring one low-risk workflow to a 20-minute review.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link href="/benchmark" className="btn btn-secondary px-6 py-3 text-sm">
                    View the benchmark
                  </Link>
                  <Link href={contactLinks.demo} className="btn btn-cta px-6 py-3 text-sm">
                    Book a risk review
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs leading-6 text-slate-500">
            This hub summarises third-party guidance for convenience and is not legal advice. Sources are linked on
            every page — read the originals before relying on them. Last reviewed: 17 July 2026.
          </p>
        </div>
      </section>
    </main>
  )
}
