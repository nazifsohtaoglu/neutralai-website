import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BadgeCheck, CheckCircle2, ShieldCheck } from 'lucide-react'
import { siteConfig } from '../site'

export type UseCasePageContent = {
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
  proofLabel: string
  proofTitle: string
  proofBody: string
  painPoints: string[]
  workflow: {
    title: string
    body: string
  }[]
  entities: string[]
  complianceMapping: {
    label: string
    body: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
  faqStructuredData: {
    '@context': 'https://schema.org'
    '@type': 'FAQPage'
    mainEntity: {
      '@type': 'Question'
      name: string
      acceptedAnswer: {
        '@type': 'Answer'
        text: string
      }
    }[]
  }
  trustSignals: {
    icon: LucideIcon
    title: string
    body: string
  }[]
  disclaimer: string
}

export default function UseCasePage({ content }: { content: UseCasePageContent }) {
  return (
    <main className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(content.faqStructuredData) }}
      />
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(249,115,22,0.15),transparent_24%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="container-custom relative z-10 grid gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
              <ShieldCheck className="h-3.5 w-3.5" />
              {content.eyebrow}
            </div>
            <h1 className="mt-5 max-w-4xl font-heading text-5xl font-bold md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {content.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
                {content.primaryCta}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/playground" className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                {content.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] p-6 shadow-[0_24px_80px_rgba(2,6,23,0.45)]">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#fdba74]">{content.proofLabel}</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">{content.proofTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{content.proofBody}</p>
            <div className="mt-6 grid gap-3">
              {content.painPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-light" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Protected workflow</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                Put masking before AI prompts leave the trusted path.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                NeutralAI is positioned between internal users, browser AI tools, application prompts, and external model providers so sensitive values can be removed or tokenized before egress.
              </p>
            </div>

            <div className="grid gap-4">
              {content.workflow.map((step, index) => (
                <div key={step.title} className="grid gap-4 rounded-[24px] border border-white/10 bg-background-secondary p-5 sm:grid-cols-[auto_1fr]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 font-mono text-sm text-primary-light">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div className="rounded-[28px] border border-white/10 bg-background/80 p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Entity coverage</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">Industry examples buyers recognize</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {content.entities.map((entity) => (
                  <span key={entity} className="rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-primary-light">
                    {entity}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {content.trustSignals.map((signal) => (
                <div key={signal.title} className="rounded-[24px] border border-white/10 bg-background/80 p-5">
                  <signal.icon className="h-5 w-5 text-primary-light" />
                  <h3 className="mt-4 font-heading text-xl font-semibold">{signal.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{signal.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-slate-400">
            <BadgeCheck className="mb-3 h-5 w-5 text-primary-light" />
            {content.disclaimer}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Compliance mapping</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                Translate the gateway into review language.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                These mappings are practical review prompts, not automatic compliance guarantees. They help buyers connect masking, routing, and evidence to the controls their industry already discusses.
              </p>
            </div>

            <div className="grid gap-4">
              {content.complianceMapping.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-background-secondary p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#fdba74]">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">FAQ</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Questions buyers ask first</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4">
            {content.faq.map((item) => (
              <article key={item.question} className="rounded-[24px] border border-white/10 bg-background/80 p-5 md:p-6">
                <h3 className="font-heading text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.97)),radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_22%)] px-6 py-10 text-center md:px-10">
            <h2 className="font-heading text-3xl font-bold md:text-5xl">Map NeutralAI to your AI rollout.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
              Bring one workflow and one approval concern. We will show where masking, audit evidence, and deployment controls fit.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
                Talk to Sales
              </Link>
              <Link href={siteConfig.signupUrl} className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                Try Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
