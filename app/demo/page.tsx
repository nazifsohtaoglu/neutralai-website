import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays, CirclePlay, FileText, Gauge, MonitorPlay, ShieldCheck } from 'lucide-react'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'On-Demand Demo | NeutralAI',
  description:
    'Watch the NeutralAI product walkthrough for PII masking, detection evidence, reversible token handling, browser workflows, and governed AI rollout.',
  alternates: {
    canonical: '/demo',
  },
  openGraph: {
    title: 'NeutralAI On-Demand Demo',
    description:
      'A product walkthrough for teams evaluating PII-safe AI adoption, prompt masking, and audit-ready governance.',
    url: `${siteConfig.url}/demo`,
    images: ['/og-default.png'],
  },
}

const walkthroughChapters = [
  {
    title: 'Prompt masking in the playground',
    body: 'Paste a realistic support, claims, or case-summary prompt and see sensitive spans masked before the request is sent onward.',
    icon: ShieldCheck,
  },
  {
    title: 'Detection evidence and confidence',
    body: 'Review entity types, masked values, and confidence context so security and legal teams can understand what happened.',
    icon: Gauge,
  },
  {
    title: 'Reversible token governance',
    body: 'Show how governed restore workflows keep raw identifiers out of normal model traffic while preserving controlled business use.',
    icon: FileText,
  },
  {
    title: 'Browser and rollout path',
    body: 'Cover extension usage, API handoff, policy controls, and what a regulated rollout needs before teams adopt AI broadly.',
    icon: MonitorPlay,
  },
] as const

const videoIsConfigured = siteConfig.demoVideoEmbedUrl.length > 0

export default function DemoPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Product walkthrough</p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight md:text-6xl">
              See how NeutralAI controls sensitive data before AI usage spreads.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              The demo flow is designed for buyers who want to understand masking, evidence, restore controls, and rollout options before committing to a live call.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={siteConfig.signupUrl} className="btn btn-cta justify-center px-8 py-4">
                Try Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="btn btn-secondary justify-center px-8 py-4">
                Book Live Demo
                <CalendarDays className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-secondary py-12 md:py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#020617] shadow-[0_32px_90px_rgba(2,8,23,0.55)]">
            {videoIsConfigured ? (
              <div className="aspect-video bg-black">
                <iframe
                  src={siteConfig.demoVideoEmbedUrl}
                  title="NeutralAI product walkthrough"
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="grid min-h-[420px] place-items-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] px-6 py-12 text-center">
                <div className="max-w-2xl">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary-light">
                    <CirclePlay className="h-10 w-10" />
                  </div>
                  <h2 className="mt-7 font-heading text-3xl font-semibold text-white md:text-4xl">
                    Explore the self-guided demo path.
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    Start with the interactive masking playground, or book a live walkthrough for browser, API, and rollout planning.
                  </p>
                  <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/playground" className="btn btn-cta justify-center px-7 py-4">
                      Try Playground
                    </Link>
                    <Link href="/contact" className="btn btn-secondary justify-center px-7 py-4">
                      Book Live Demo
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">What the demo should cover</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-white md:text-5xl">
              A buyer-ready walkthrough, not a feature dump.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The recording should show real product surfaces and explain why each control matters to security, legal, and operational teams.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {walkthroughChapters.map((chapter) => (
              <article key={chapter.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
                <chapter.icon className="h-6 w-6 text-primary-light" />
                <h3 className="mt-4 font-heading text-xl font-semibold text-white">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{chapter.body}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-[28px] border border-primary/20 bg-primary/10 p-6 text-center md:p-8">
            <h2 className="font-heading text-2xl font-semibold text-white">Ready to evaluate with your own workflow?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Bring a representative prompt, document, or browser workflow and the team can walk through the control model with you.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={siteConfig.signupUrl} className="btn btn-cta justify-center px-7 py-4">
                Try Free
              </Link>
              <Link href="/contact" className="btn btn-secondary justify-center px-7 py-4">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
