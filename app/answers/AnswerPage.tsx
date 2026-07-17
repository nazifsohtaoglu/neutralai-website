import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react'
import MaskDemo from '../components/MaskDemo'
import { contactLinks } from '../site'
import type { AnswerEntry } from './content'

// Static, developer-authored JSON-LD only (no user input). The < escape keeps
// any literal "<" in content from terminating the script tag (XSS hardening).
function toJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function faqStructuredData(entry: AnswerEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: { '@type': 'Answer', text: entry.directAnswer },
      },
      ...entry.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    ],
  }
}

export default function AnswerPage({ entry }: { entry: AnswerEntry }) {
  return (
    <main className="min-h-screen pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqStructuredData(entry)) }} />

      <section className="relative overflow-hidden py-14 md:py-16">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.14),transparent_32%)]" />
        <div className="container-custom relative z-10 max-w-4xl">
          <Link
            href="/answers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All questions
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
              {entry.category}
            </span>
            <span className="font-mono text-xs text-slate-400">Reviewed {entry.lastReviewed}</span>
          </div>
          <h1 className="mt-5 font-heading text-4xl font-bold [text-wrap:balance] md:text-6xl">{entry.question}</h1>
        </div>
      </section>

      <section className="pb-6">
        <div className="container-custom max-w-4xl">
          <div className="rounded-2xl border border-primary/25 bg-primary/[0.08] p-7 md:p-9">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary-light">The short answer</span>
            <p className="mt-4 text-lg leading-8 text-slate-100 [text-wrap:pretty] md:text-xl md:leading-9">
              {entry.directAnswer}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom max-w-4xl">
          {entry.sections.map((section, index) => (
            <div key={section.heading} className={index > 0 ? 'mt-14' : ''}>
              <h2 className="font-heading text-3xl font-bold [text-wrap:balance] md:text-4xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-5 max-w-[70ch] text-base leading-8 text-slate-200 [text-wrap:pretty]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {entry.keyPoints && entry.keyPoints.length > 0 && (
            <div className="mt-14 rounded-2xl border border-accent-success/25 bg-accent-success/[0.06] p-7">
              <h2 className="font-heading text-2xl font-bold text-white">The short version</h2>
              <ul className="mt-5 space-y-4">
                {entry.keyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent-success" />
                    <span className="text-base leading-8 text-slate-200">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="pb-14">
        <div className="container-custom max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Related questions</h2>
          <div className="mt-7 space-y-4">
            {entry.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-background-secondary/50 p-6 md:p-7">
                <h3 className="font-heading text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-base leading-8 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {entry.sources && entry.sources.length > 0 && (
        <section className="pb-14">
          <div className="container-custom max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-background-secondary/50 p-6 md:p-7">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-primary-light">Sources</h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {entry.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-2 text-base font-medium leading-7 text-slate-200 transition-colors hover:text-primary-light"
                    >
                      <ExternalLink className="mt-1.5 h-4 w-4 flex-shrink-0 text-primary-light" />
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <div className="grid gap-4 md:grid-cols-2">
            {entry.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-background-secondary/50 p-5 transition hover:border-primary/40 hover:bg-primary/[0.05]"
              >
                <span className="text-base font-semibold leading-7 text-slate-100 group-hover:text-primary-light">
                  {item.label}
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-primary-light" />
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm leading-7 text-slate-400">
            This page is general information, not legal advice. Where third-party guidance or law is summarised, read
            the originals via the source links before relying on them. Last reviewed: {entry.lastReviewed}.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom max-w-4xl">
          <div className="rounded-2xl border border-primary/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(3,7,18,0.95)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_30%)] p-7 md:p-9">
            <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">This is the control in action</h3>
            <p className="mt-3 max-w-[65ch] text-base leading-8 text-slate-300">
              Identifiable data is masked in the browser before the prompt ever leaves — try it yourself with a sample
              prompt, or bring one low-risk workflow to a 20-minute review.
            </p>
            <div className="mt-6">
              <MaskDemo />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/playground" className="btn btn-cta px-6 py-3 text-sm">
                Try the playground
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={contactLinks.demo} className="btn btn-secondary px-6 py-3 text-sm">
                Book a risk review
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
