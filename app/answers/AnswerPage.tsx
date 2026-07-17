import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, HelpCircle } from 'lucide-react'
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

      <section className="section">
        <div className="container-custom max-w-4xl">
          <Link
            href="/answers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All questions
          </Link>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
            <HelpCircle className="h-3.5 w-3.5" />
            {entry.category}
          </div>
          <h1 className="mt-5 font-heading text-4xl font-bold md:text-5xl">{entry.question}</h1>

          <div className="mt-8 rounded-[24px] border border-primary/20 bg-primary/[0.07] p-6">
            <p className="text-base leading-8 text-slate-200">{entry.directAnswer}</p>
          </div>

          {entry.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mt-12 font-heading text-3xl font-bold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {entry.keyPoints && entry.keyPoints.length > 0 && (
            <>
              <h2 className="mt-12 font-heading text-3xl font-bold">The short version</h2>
              <ul className="mt-6 space-y-3">
                {entry.keyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary-light" />
                    {point}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-12 font-heading text-3xl font-bold">Related questions</h2>
          <div className="mt-6 space-y-4">
            {entry.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-background/80 p-5">
                <h3 className="font-heading text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>

          {entry.sources && entry.sources.length > 0 && (
            <div className="mt-12 rounded-[24px] border border-white/10 bg-background/80 p-6">
              <h2 className="font-heading text-xl font-semibold text-white">Sources</h2>
              <ul className="mt-4 space-y-2">
                {entry.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary"
                    >
                      {source.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {entry.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[24px] border border-white/10 bg-background/80 p-5 transition hover:border-primary/40"
              >
                <p className="text-sm font-semibold text-white group-hover:text-primary-light">{item.label}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-light">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-xs leading-6 text-slate-500">
            This page is general information, not legal advice. Where third-party guidance or law is summarised, read
            the originals via the source links before relying on them. Last reviewed: {entry.lastReviewed}.
          </div>

          <div className="mt-10 rounded-[24px] border border-primary/20 bg-primary/10 p-6">
            <h3 className="font-heading text-xl font-semibold text-white">See the control in action</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Paste a sample prompt into the playground and watch identifiable data get masked before it would ever
              reach an AI provider — or bring one low-risk workflow to a 20-minute review.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/playground" className="btn btn-cta px-6 py-3 text-sm">
                Try the playground
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
