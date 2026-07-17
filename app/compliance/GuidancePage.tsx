import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'
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

function FactBand({ entry }: { entry: GuidanceEntry }) {
  const facts: { label: string; value: string }[] = [
    { label: 'Issued by', value: entry.publisher },
    { label: 'Published', value: entry.firstPublished },
  ]
  if (entry.lastUpdated) facts.push({ label: 'Updated', value: entry.lastUpdated })
  facts.push({ label: 'We reviewed', value: entry.lastReviewed })

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-background-secondary/60">
      <dl className="grid grid-cols-2 divide-white/10 max-md:divide-y md:grid-cols-[repeat(4,1fr)_auto] md:divide-x">
        {facts.map((fact) => (
          <div key={fact.label} className="px-5 py-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary-light">{fact.label}</dt>
            <dd className="mt-1.5 text-sm font-semibold leading-5 text-slate-100">{fact.value}</dd>
          </div>
        ))}
        <div className="col-span-2 flex items-center px-5 py-4 md:col-span-1">
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light transition-colors hover:text-primary"
          >
            Read the original
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </dl>
    </div>
  )
}

export default function GuidancePage({ entry }: { entry: GuidanceEntry }) {
  return (
    <main className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqStructuredData(entry)) }}
      />

      <section className="relative overflow-hidden py-14 md:py-16">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.14),transparent_32%)]" />
        <div className="container-custom relative z-10 max-w-4xl">
          <Link
            href="/compliance"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            UK compliance hub
          </Link>

          <h1 className="mt-6 font-heading text-4xl font-bold [text-wrap:balance] md:text-6xl">{entry.pageTitle}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{entry.title}</p>

          <FactBand entry={entry} />
        </div>
      </section>

      <section className="pb-6">
        <div className="container-custom max-w-4xl">
          <div className="rounded-2xl border border-primary/25 bg-primary/[0.08] p-7 md:p-9">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                <ShieldCheck className="h-5 w-5 text-primary-light" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary-light">In one minute</span>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-100 [text-wrap:pretty] md:text-xl md:leading-9">
              {entry.directAnswer}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">What the guidance says</h2>
          <div className="mt-8 space-y-10">
            {entry.whatItSays.map((item) =>
              item.quote ? (
                <figure key={item.point} className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-3 -top-8 select-none font-heading text-[7rem] leading-none text-primary/15 md:-left-8"
                  >
                    “
                  </span>
                  <blockquote className="relative font-heading text-2xl font-semibold leading-snug text-white [text-wrap:balance] md:text-3xl">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-primary-light">
                      {entry.publisher}
                    </span>
                    <span className="text-base leading-7 text-slate-300">{item.point}</span>
                  </figcaption>
                </figure>
              ) : (
                <div key={item.point} className="rounded-2xl border border-white/10 bg-background-secondary/50 p-6">
                  <p className="text-base leading-8 text-slate-200">{item.point}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="container-custom max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">What this means for your firm</h2>
          <ul className="mt-7 space-y-5">
            {entry.whatItMeans.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-4 w-4 text-primary-light" />
                </span>
                <span className="text-base leading-8 text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-14">
        <div className="container-custom max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Guidance → control, line by line</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
            How each expectation maps to a NeutralAI control. The full cross-regulator table lives on the{' '}
            <Link href="/compliance/uk-guidance-map" className="font-semibold text-primary-light hover:text-primary">
              UK guidance map
            </Link>
            .
          </p>
          <div className="mt-7 overflow-hidden rounded-2xl border border-white/10">
            {entry.controlMapping.map((row, index) => (
              <div
                key={row.expectation}
                className={`grid gap-x-6 gap-y-3 p-6 md:grid-cols-[1fr_1.1fr] ${
                  index % 2 === 0 ? 'bg-background-secondary/60' : 'bg-background/60'
                } ${index > 0 ? 'border-t border-white/10' : ''}`}
              >
                <div>
                  <p className="text-base font-medium leading-7 text-slate-100">{row.expectation}</p>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-[13px] font-semibold text-primary-light">
                    {row.control}
                  </span>
                  <p className="mt-2.5 text-base leading-7 text-slate-300">{row.how}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="container-custom max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Common questions</h2>
          <div className="mt-7 space-y-4">
            {entry.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-background-secondary/50 p-6 md:p-7">
                <h3 className="font-heading text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-base leading-8 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm leading-7 text-slate-400">
            This page summarises third-party guidance for convenience and is not legal advice. Summaries can go stale —
            always read the original at the source link above before relying on it. Last reviewed: {entry.lastReviewed}.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom max-w-4xl">
          <div className="rounded-2xl border border-primary/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(3,7,18,0.95)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_30%)] p-7 md:p-9">
            <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                  See what this control looks like in practice
                </h3>
                <p className="mt-3 text-base leading-8 text-slate-300">
                  The AI Confidentiality Checklist walks through usage discovery, exposure, policy, controls, and
                  evidence in about 20 minutes — or bring one low-risk workflow to a live review.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/compliance#checklist" className="btn btn-cta px-6 py-3 text-sm">
                    Get the checklist
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={contactLinks.demo} className="btn btn-secondary px-6 py-3 text-sm">
                    Book a risk review
                  </Link>
                </div>
              </div>
              <div className="max-md:order-first">
                <div className="rounded-2xl border border-white/10 bg-background/80 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">The control</p>
                  <p className="mt-3 font-mono text-sm leading-7 text-slate-200">
                    <span className="text-slate-400">detect →</span>{' '}
                    <span className="rounded bg-primary/15 px-1.5 py-0.5 font-semibold text-primary-light">mask</span>{' '}
                    <span className="text-slate-400">→ send →</span>{' '}
                    <span className="rounded bg-accent-success/15 px-1.5 py-0.5 font-semibold text-accent-success">
                      restore
                    </span>
                    <span className="text-slate-400"> → audit</span>
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Reversible vault, 15-minute TTL. The model only ever sees placeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
