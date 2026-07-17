import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Map } from 'lucide-react'
import { siteConfig, contactLinks } from '../../site'
import { controlMapRows } from '../content'

export const metadata: Metadata = {
  title: 'UK AI Guidance Map — Controls Mapped to Regulator Expectations',
  description:
    'One table mapping NeutralAI controls — mask-before-send, reversible vault, audit trail, whitelist, BYOK, on-prem, SSO — to Law Society, SRA, Bar Council, judiciary, ICO, DUAA, and FCA guidance.',
  alternates: {
    canonical: '/compliance/uk-guidance-map',
  },
  openGraph: {
    title: 'UK AI Guidance Map',
    description: 'Every NeutralAI control mapped to the UK guidance lines it addresses.',
    url: `${siteConfig.url}/compliance/uk-guidance-map`,
  },
}

export default function UkGuidanceMapPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="section">
        <div className="container-custom">
          <Link
            href="/compliance"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            UK compliance hub
          </Link>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
            <Map className="h-3.5 w-3.5" />
            Cross-regulator map
          </div>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold md:text-6xl">
            Seven controls, seven sources of guidance — one map
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            UK guidance on AI and confidential data converges on a small set of expectations: keep identifiable data
            out of public tools, minimise what providers receive, stay accountable, and keep evidence. This table maps
            each NeutralAI control to the guidance lines it addresses. Lines are paraphrased for brevity — the verbatim
            quotes and source links live on each guidance page.
          </p>

          <div className="mt-12 space-y-6">
            {controlMapRows.map((row) => (
              <div key={row.control} className="overflow-hidden rounded-[24px] border border-white/10 bg-background/80">
                <div className="border-b border-white/10 bg-white/[0.04] px-6 py-5">
                  <h2 className="font-heading text-xl font-semibold text-white">{row.control}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{row.description}</p>
                </div>
                <div>
                  {row.guidanceLines.map((line) => (
                    <Link
                      key={`${row.control}-${line.shortName}`}
                      href={`/compliance/${line.slug}`}
                      className="group grid border-b border-white/10 transition last:border-b-0 hover:bg-primary/[0.05] md:grid-cols-[0.22fr_1fr_auto]"
                    >
                      <div className="px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-primary-light">
                        {line.shortName}
                      </div>
                      <div className="px-6 py-4 text-sm leading-6 text-slate-300 md:px-0">{line.line}</div>
                      <div className="hidden items-center px-6 md:flex">
                        <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:text-primary-light" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-xs leading-6 text-slate-500">
            This map summarises third-party guidance for convenience and is not legal advice, a compliance guarantee,
            or a claim of endorsement by any regulator. Read the originals via the source links on each guidance page.
            Last reviewed: 17 July 2026.
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/compliance#checklist" className="btn btn-cta px-6 py-3 text-sm">
              Get the AI Confidentiality Checklist
            </Link>
            <Link href={contactLinks.demo} className="btn btn-secondary px-6 py-3 text-sm">
              Book a 20-minute risk review
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
