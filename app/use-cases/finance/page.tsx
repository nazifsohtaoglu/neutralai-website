import type { Metadata } from 'next'
import { siteConfig } from '../../site'

export const metadata: Metadata = {
  title: 'Finance use case moved',
  description:
    'The finance alias route has moved to the canonical financial services use-case page.',
  alternates: {
    canonical: '/use-cases/financial-services',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'AI Data Protection for Financial Services',
    description:
      'Mask customer and payment identifiers before financial services prompts reach external AI providers.',
    url: `${siteConfig.url}/use-cases/financial-services`,
  },
}

export default function FinanceUseCaseAliasPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-4 px-6 py-20 text-slate-100">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Route updated</p>
        <h1 className="text-3xl font-semibold leading-tight text-balance md:text-4xl">This page has moved</h1>
        <p className="max-w-prose text-base leading-relaxed text-slate-200">
          The finance use-case route now lives at{' '}
          <a className="font-semibold text-cyan-300 underline decoration-cyan-400/60 underline-offset-4" href="/use-cases/financial-services">
            /use-cases/financial-services
          </a>
          .
        </p>
        <a className="btn btn-primary px-6 py-3 text-sm font-semibold" href="/use-cases/financial-services">
          Go to Financial Services Use Case
        </a>
      </section>
    </main>
  )
}
