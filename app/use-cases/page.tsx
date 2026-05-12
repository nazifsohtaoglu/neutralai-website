import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { siteConfig } from '../site'
import { useCases } from './content'

export const metadata: Metadata = {
  title: 'AI Use Cases for Regulated Teams',
  description:
    'Explore NeutralAI use cases for financial services, healthcare, and legal teams protecting sensitive data before AI prompt egress.',
  alternates: {
    canonical: '/use-cases',
  },
  openGraph: {
    title: 'AI Use Cases for Regulated Teams',
    description:
      'Industry pages for financial services, healthcare, and legal teams adopting AI with PII masking and audit evidence.',
    url: `${siteConfig.url}/use-cases`,
  },
}

export default function UseCasesIndexPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(249,115,22,0.15),transparent_24%)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
              <ShieldCheck className="h-3.5 w-3.5" />
              Industries
            </div>
            <h1 className="mt-5 font-heading text-5xl font-bold md:text-7xl">
              AI use cases for regulated teams.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              NeutralAI gives finance, healthcare, and legal teams a practical gateway pattern for masking sensitive data before AI prompts reach external model providers.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <Link
                key={useCase.href}
                href={useCase.href}
                className="group rounded-[28px] border border-white/10 bg-background-secondary p-6 transition hover:border-primary/40 hover:bg-white/[0.04]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#fdba74]">{useCase.title}</p>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-white">{useCase.content.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">{useCase.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-light">
                  View use case
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
