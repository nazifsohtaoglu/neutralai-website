import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpenCheck, ExternalLink, ShieldCheck } from 'lucide-react'
import { contactLinks } from '../site'
import type { GuidanceEntry } from './content'

// Static, developer-authored JSON-LD only (no user input). The < escape keeps
// any literal "<" in content from terminating the script tag (XSS hardening).
function toJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function faqStructuredData(entry: GuidanceEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entry.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export default function GuidancePage({ entry }: { entry: GuidanceEntry }) {
  return (
    <main className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqStructuredData(entry)) }}
      />

      <section className="section">
        <div className="container-custom max-w-4xl">
          <Link
            href="/compliance"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            UK compliance hub
          </Link>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
            <BookOpenCheck className="h-3.5 w-3.5" />
            {entry.publisher}
          </div>
          <h1 className="mt-5 font-heading text-4xl font-bold md:text-5xl">{entry.pageTitle}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span>
              Guidance: <span className="text-slate-200">{entry.title}</span>
            </span>
            <span>Published {entry.firstPublished}</span>
            {entry.lastUpdated && <span>Updated {entry.lastUpdated}</span>}
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary-light hover:text-primary"
            >
              Read the original
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-8 rounded-[24px] border border-primary/20 bg-primary/[0.07] p-6">
            <p className="text-base leading-8 text-slate-200">{entry.directAnswer}</p>
          </div>

          <h2 className="mt-12 font-heading text-3xl font-bold">What the guidance says</h2>
          <div className="mt-6 space-y-4">
            {entry.whatItSays.map((item) => (
              <div key={item.point} className="rounded-2xl border border-white/10 bg-background/80 p-5">
                <p className="text-sm leading-7 text-slate-200">{item.point}</p>
                {item.quote && (
                  <blockquote className="mt-3 border-l-2 border-primary/50 pl-4 text-sm italic leading-7 text-slate-300">
                    “{item.quote}”
                    <span className="mt-1 block text-xs not-italic text-slate-500">— {entry.publisher}</span>
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-heading text-3xl font-bold">What this means for your firm</h2>
          <ul className="mt-6 space-y-3">
            {entry.whatItMeans.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
                <ShieldCheck className="mt-1 h-4 w-4 flex-shrink-0 text-primary-light" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-heading text-3xl font-bold">Mapping the guidance to technical controls</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            How each expectation in this guidance maps to a NeutralAI control. The full cross-regulator table lives on
            the{' '}
            <Link href="/compliance/uk-guidance-map" className="font-semibold text-primary-light hover:text-primary">
              UK guidance map
            </Link>
            .
          </p>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-background/80">
            <div className="grid border-b border-white/10 bg-white/[0.04] text-sm font-semibold text-slate-200 md:grid-cols-[1fr_0.7fr_1fr]">
              <div className="px-5 py-4">Guidance expectation</div>
              <div className="px-5 py-4">NeutralAI control</div>
              <div className="px-5 py-4">How it works</div>
            </div>
            {entry.controlMapping.map((row) => (
              <div key={row.expectation} className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[1fr_0.7fr_1fr]">
                <div className="px-5 py-4 text-sm leading-6 text-slate-300">{row.expectation}</div>
                <div className="px-5 py-4 text-sm font-semibold leading-6 text-white">{row.control}</div>
                <div className="px-5 py-4 text-sm leading-6 text-slate-400">{row.how}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-heading text-3xl font-bold">Common questions</h2>
          <div className="mt-6 space-y-4">
            {entry.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-background/80 p-5">
                <h3 className="font-heading text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-xs leading-6 text-slate-500">
            This page summarises third-party guidance for convenience and is not legal advice. Summaries can go stale —
            always read the original at the source link above before relying on it. Last reviewed:{' '}
            {entry.lastReviewed}.
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-primary/20 bg-primary/10 p-6">
              <h3 className="font-heading text-xl font-semibold text-white">Review your own AI exposure</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The AI Confidentiality Checklist walks through usage discovery, exposure, policy, controls, and
                evidence.
              </p>
              <Link
                href="/compliance#checklist"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-light hover:text-primary"
              >
                Get the checklist
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-background/80 p-6">
              <h3 className="font-heading text-xl font-semibold text-white">Talk it through</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Bring one low-risk workflow and we will show where masking and audit evidence fit — 20 minutes, no
                commitment.
              </p>
              <Link
                href={contactLinks.demo}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-light hover:text-primary"
              >
                Book a risk review
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
