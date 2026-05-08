import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
import { siteConfig } from '../../site'

export const metadata: Metadata = {
  title: 'Why Presidio Alone Is Not Enough for Regulated Industries',
  description:
    'A technical explanation of why regulated AI teams usually need more than Microsoft Presidio alone: policy, vaulting, audit evidence, tenancy, SSO, extension enforcement, and operations.',
  keywords: [
    'presidio alternative',
    'pii masking for llm',
    'ai compliance gateway',
    'regulated AI PII masking',
  ],
  alternates: {
    canonical: '/insights/presidio-alone-regulated-industries',
  },
}

export default function PresidioRegulatedIndustriesPage() {
  return (
    <main className="min-h-screen pt-24">
      <article className="container-custom max-w-4xl py-16 md:py-20">
        <Link href="/presidio-alternative" className="inline-flex items-center gap-2 text-sm font-medium text-primary-light hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to comparison
        </Link>

        <header className="mt-10 border-b border-border pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
            <ShieldCheck className="h-3.5 w-3.5" />
            Technical note
          </div>
          <h1 className="mt-5 font-heading text-4xl font-bold md:text-6xl">
            Why Presidio alone is not enough for regulated industries
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Presidio is a capable open-source foundation for detecting and anonymizing PII. In regulated AI workflows,
            the hard part is turning that foundation into a governed product boundary that users, auditors, and security
            teams can trust every day.
          </p>
        </header>

        <div className="mt-10 space-y-10 text-base leading-8 text-slate-300">
          <section>
            <h2 className="font-heading text-3xl font-semibold text-white">The build starts after detection</h2>
            <p className="mt-4">
              Presidio provides analyzer and anonymizer components, customizable recognizers, and anonymization
              operators. That is useful engineering leverage. It is not the same thing as a full AI compliance gateway.
              A regulated rollout still needs authentication, tenant boundaries, policy decisions, reversible token
              handling, audit evidence, customer-facing controls, and operational ownership.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-3xl font-semibold text-white">Accuracy has to be product accuracy</h2>
            <p className="mt-4">
              NeutralAI publishes a gateway-owned benchmark page for the current product configuration and a
              Presidio-vanilla baseline. The important point is not that Presidio is weak; it is that enterprise
              deployments usually need tuned recognizers, contextual rules, regression packs, and product-level
              enforcement around the library.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-3xl font-semibold text-white">Regulated teams need evidence</h2>
            <p className="mt-4">
              Security review usually asks what was masked, where policy was applied, which tenant and user path was in
              scope, and what proof can be shown without leaking raw sensitive text. Those questions are outside a pure
              recognizer library. They belong to the gateway, vault, audit, and deployment layers.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-3xl font-semibold text-white">Operations becomes the real cost center</h2>
            <p className="mt-4">
              A do-it-yourself Presidio deployment means owning dependency updates, NLP model drift, browser extension
              support, scaling, incident response, benchmark maintenance, and customer-facing documentation. Those costs
              are why a build-vs-buy decision should include the full operating surface, not just the license cost of an
              open-source component.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-3xl font-semibold text-white">Where NeutralAI fits</h2>
            <p className="mt-4">
              NeutralAI uses proven open-source detection foundations and adds the policy boundary, encrypted
              tokenization layer, audit evidence, multi-tenant controls, user-facing chat and extension flows, and
              deployment choices that regulated teams need when AI usage moves from experiment to production.
            </p>
          </section>
        </div>

        <section className="mt-10 grid gap-4 border-t border-border pt-8 md:grid-cols-3">
          <a
            href="https://github.com/microsoft/presidio"
            className="rounded-2xl border border-white/12 bg-white/5 p-5 text-sm leading-7 text-slate-300 transition hover:border-primary/40"
          >
            Microsoft Presidio GitHub
          </a>
          <a
            href="https://microsoft.github.io/presidio/"
            className="rounded-2xl border border-white/12 bg-white/5 p-5 text-sm leading-7 text-slate-300 transition hover:border-primary/40"
          >
            Microsoft Presidio docs
          </a>
          <a
            href={`${siteConfig.appBaseUrl}/pii-benchmark`}
            className="rounded-2xl border border-white/12 bg-white/5 p-5 text-sm leading-7 text-slate-300 transition hover:border-primary/40"
          >
            NeutralAI benchmark
          </a>
        </section>

        <section className="mt-10 rounded-[32px] border border-primary/20 bg-primary/10 p-7">
          <h2 className="font-heading text-2xl font-semibold text-white">For buyers evaluating a Presidio alternative</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Ask whether the solution stops at PII detection, or whether it includes the gateway, vault, evidence, policy,
            tenant, browser, and operational controls needed for live AI usage.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/presidio-alternative" className="btn btn-cta w-full justify-center px-8 py-4 text-base sm:w-auto">
              Compare build vs buy
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="btn btn-secondary w-full justify-center px-8 py-4 text-base sm:w-auto">
              Talk to Sales
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
