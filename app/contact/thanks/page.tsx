import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import BackButton from '../../components/BackButton'
import { contactLinks, siteConfig } from '../../site'

export const metadata: Metadata = {
  title: 'Contact Request Sent',
  description:
    'Confirmation page for NeutralAI contact requests about AI compliance gateway deployment, PII masking, and security review conversations.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactThanksPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <BackButton />

          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary-light" />
            </div>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Message sent</p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              We&apos;ll get back to you within 1 business day
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              Thanks for reaching out. The team will review your workflow, company context, and deployment needs before replying.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/contact" className="btn btn-secondary px-8 py-4">
                Back to Contact
              </a>
              <a href={contactLinks.salesMailto} className="btn btn-cta px-8 py-4">
                Email {siteConfig.salesEmail}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
