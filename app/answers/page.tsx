import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, HelpCircle, MessageCircleQuestion } from 'lucide-react'
import { siteConfig } from '../site'
import { answerEntries, answersHubFaq } from './content'

export const metadata: Metadata = {
  title: 'Answers — Plain-English Questions About AI, PII, and Compliance',
  description:
    'Direct answers to the questions regulated teams actually ask: ChatGPT and client data, GDPR, shadow AI, reversible tokenization, DLP for LLMs, and the UK tribunal ruling.',
  alternates: {
    canonical: '/answers',
  },
  openGraph: {
    title: 'Answers — AI, PII, and Compliance Questions',
    description: 'Direct, sourced answers to the questions regulated teams ask about AI and sensitive data.',
    url: `${siteConfig.url}/answers`,
  },
}

const categories = Array.from(new Set(answerEntries.map((entry) => entry.category)))

export default function AnswersHubPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.16),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
            <MessageCircleQuestion className="h-3.5 w-3.5" />
            Answers
          </div>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl font-bold md:text-7xl">
            The questions regulated teams actually ask
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Direct answers first, depth after. Every page opens with a ~100-word answer, cites primary sources, and
            shows when it was last reviewed — because most of these questions now get asked to an AI assistant, and
            the assistant deserves a source worth citing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">{category}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {answerEntries
                  .filter((entry) => entry.category === category)
                  .map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/answers/${entry.slug}`}
                      className="group rounded-[24px] border border-white/10 bg-background/80 p-6 transition hover:border-primary/40 hover:bg-primary/[0.06]"
                    >
                      <h3 className="font-heading text-xl font-semibold text-white group-hover:text-primary-light">
                        {entry.question}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400 line-clamp-3">{entry.directAnswer}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-light">
                        Read the answer
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-custom max-w-4xl">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">About these pages</h2>
          <div className="mt-8 space-y-4">
            {answersHubFaq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-background/80 p-6">
                <h3 className="flex items-start gap-3 font-heading text-lg font-semibold text-white">
                  <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[24px] border border-primary/20 bg-primary/10 p-6">
            <h3 className="font-heading text-xl font-semibold text-white">Looking for the regulator detail?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              The UK compliance hub maps Law Society, SRA, Bar Council, judiciary, ICO, DUAA, and FCA guidance to
              concrete technical controls — with verbatim lines and source links.
            </p>
            <Link
              href="/compliance"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-light hover:text-primary"
            >
              Open the compliance hub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
