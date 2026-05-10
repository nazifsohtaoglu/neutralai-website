'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Building2, Check, HelpCircle, Shield, Sparkles } from 'lucide-react'
import type { PricingTier, PricingTierId, PublicPricingCatalog } from './publicCatalog'
import { siteConfig } from '../site'

const planHighlights: Record<PricingTierId, string[]> = {
  free: [
    '1,000 masking requests per month',
    '£1 managed AI trial credit',
    'Managed sandbox only',
    'Cheap model allowlist with hard caps',
  ],
  starter: [
    '10K masking requests per month',
    '£3 managed AI credit',
    'Basic API key management',
    'Managed evaluation only',
  ],
  team: [
    '100K masking requests per month',
    '£10 managed AI credit',
    'BYOK handoff for production AI spend',
    'Team usage and audit history',
  ],
  business: [
    '500K masking requests per month',
    '£25 managed AI credit',
    'Full API key lifecycle controls',
    'BYOK or customer provider expected',
    'Policy controls and evidence exports',
  ],
  enterprise: [
    'Custom commercial agreement',
    'Required SSO and SIEM export posture',
    'Managed browser extension rollout',
    'Private endpoint or on-prem planning',
  ],
}

const comparisonRows = [
  { label: 'Masking requests', free: '1k', starter: '10K', team: '100K', business: '500K', enterprise: 'Custom' },
  { label: 'Managed AI credit', free: '£1', starter: '£3', team: '£10', business: '£25', enterprise: 'Custom or none' },
  { label: 'Provider spend model', free: 'Managed sandbox', starter: 'Managed eval', team: 'BYOK recommended', business: 'BYOK expected', enterprise: 'Customer-owned' },
  { label: 'API key management', free: 'Basic', starter: 'Basic', team: 'Team', business: 'Full lifecycle', enterprise: 'Scoped controls' },
  { label: 'SSO / SIEM path', free: 'No', starter: 'No', team: 'Roadmap', business: 'Export path', enterprise: 'Required' },
] as const

const pricingFaqs = [
  {
    question: 'Why show pricing before a sales call?',
    answer:
      'Security buyers still want a fast commercial read. The page shows which path is self-serve, which path is enterprise, and where a procurement review starts.',
  },
  {
    question: 'What does Free or Starter include?',
    answer:
      'Free and Starter are evaluation paths with masking requests included and small managed AI credits. They are not unlimited model-usage bundles.',
  },
  {
    question: 'When should a team move from Business to Enterprise?',
    answer:
      'Enterprise is the right fit when rollout requires managed extension deployment, required SSO posture, SIEM export, private endpoint routing, or custom commercial review.',
  },
  {
    question: 'How does annual billing work?',
    answer:
      'Annual billing reduces the effective monthly price by the configured discount. The page shows the monthly equivalent and yearly prepaid amount so finance and procurement can compare both shapes quickly.',
  },
] as const

function formatGbp(value: number | null | undefined) {
  if (value == null) return 'Custom'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

function formatQuota(value: number | null) {
  return value == null ? 'Custom' : value.toLocaleString('en-GB')
}

function tierEyebrow(tierId: PricingTierId) {
  if (tierId === 'free') return 'Sandbox'
  if (tierId === 'starter') return 'Start controlled'
  if (tierId === 'team') return 'Most popular'
  if (tierId === 'business') return 'Scale safely'
  return 'Governed rollout'
}

function ctaLabel(tier: PricingTier) {
  if (tier.cta_mode === 'contact-sales') return 'Talk to Sales'
  if (tier.tier_id === 'free') return 'Start Free'
  return 'Get Started'
}

function tierPriceLabel(tier: PricingTier, annualSelected: boolean) {
  if (tier.tier_id === 'enterprise') {
    return {
      primary: 'Custom',
      secondary: 'Commercial review and rollout planning',
    }
  }

  if (annualSelected) {
    return {
      primary: formatGbp(tier.billing.annual_monthly_equivalent_gbp),
      secondary:
        tier.tier_id === 'free'
          ? 'still free'
          : `${formatGbp(tier.billing.annual_billed_upfront_gbp)} billed yearly`,
    }
  }

  return {
    primary: formatGbp(tier.billing.monthly_price_gbp),
    secondary: tier.tier_id === 'free' ? 'sandbox path' : 'per month',
  }
}

function PricingCard({ tier, annualSelected }: { tier: PricingTier; annualSelected: boolean }) {
  const price = tierPriceLabel(tier, annualSelected)
  const isPrimary = tier.tier_id === 'team'

  return (
    <article
      className={`flex h-full flex-col justify-between rounded-[26px] border p-5 shadow-[0_24px_80px_rgba(2,6,23,0.35)] ${
        isPrimary
          ? 'border-primary/40 bg-primary/10'
          : 'border-white/10 bg-background-secondary/80'
      }`}
    >
      <div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">{tierEyebrow(tier.tier_id)}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white">{tier.title}</h2>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-300">{tier.description}</p>

        <div className="mt-6">
          <div className="flex items-end gap-2">
            <span className="font-heading text-4xl font-semibold text-white">{price.primary}</span>
            {tier.tier_id !== 'enterprise' ? <span className="pb-1 text-sm text-slate-400">GBP</span> : null}
          </div>
          <p className="mt-2 text-sm text-slate-300">{price.secondary}</p>
          <p className="mt-3 rounded-2xl border border-primary/15 bg-primary/10 px-3 py-2 text-sm text-primary-light">
            {formatQuota(tier.billing.masking_requests_monthly)} masking requests / month
          </p>
          <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300">
            {tier.billing.managed_ai_credit_gbp == null
              ? 'Customer-owned model spend'
              : `${formatGbp(tier.billing.managed_ai_credit_gbp)} managed AI credit`}
          </p>
        </div>

        <ul className="mt-6 space-y-3 text-sm text-slate-200">
          {planHighlights[tier.tier_id].map((item) => (
            <li key={item} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-light" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={tier.cta.href}
        className={`mt-8 inline-flex items-center justify-between gap-3 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
          isPrimary ? 'bg-primary text-slate-950 hover:bg-primary-light' : 'bg-white text-slate-950 hover:bg-slate-100'
        }`}
      >
        {ctaLabel(tier)}
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  )
}

export default function PricingClient({ catalog }: { catalog: PublicPricingCatalog }) {
  const [annualSelected, setAnnualSelected] = useState(true)
  const tiers = useMemo(() => [...catalog.tiers].sort((a, b) => a.order - b.order), [catalog.tiers])
  const annualDiscount = catalog.commercial_terms.annual_discount_percent

  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_24%)]" />
        <div className="container-custom relative z-10">
          <div className="rounded-[32px] border border-white/10 bg-background-secondary/75 p-6 shadow-[0_28px_80px_rgba(2,8,23,0.45)] md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
                  <Shield className="h-3.5 w-3.5" />
                  Public Pricing
                </div>
                <h1 className="mt-5 max-w-5xl font-heading text-4xl font-bold md:text-6xl">
                  Pick the rollout path that matches your AI governance needs.
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                  Plans include NeutralAI masking requests. Managed AI credits are intentionally small for evaluation,
                  while production model usage should run through BYOK, customer provider accounts, or prepaid top-ups.
                </p>
              </div>

              <div className="rounded-[24px] border border-accent-success/20 bg-accent-success/10 p-5 text-sm text-emerald-100">
                <p className="font-semibold">Annual billing saves {annualDiscount}%</p>
                <p className="mt-2 leading-6 text-emerald-100/80">
                  Compare monthly list price with annual monthly equivalent before billing handoff.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="inline-flex w-full rounded-full border border-white/10 bg-background/80 p-1 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setAnnualSelected(false)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition sm:flex-none ${
                    !annualSelected ? 'bg-white text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setAnnualSelected(true)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition sm:flex-none ${
                    annualSelected ? 'bg-primary text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Annual
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Sparkles className="h-4 w-4 text-primary-light" />
                  Catalog owner: {catalog.owner}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <BadgeCheck className="h-4 w-4 text-primary-light" />
                  {catalog.catalog_version}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-8 md:pb-20">
        <div className="container-custom">
          <div className="grid gap-5 lg:grid-cols-3 xl:grid-cols-5">
            {tiers.map((tier) => (
              <PricingCard key={tier.tier_id} tier={tier} annualSelected={annualSelected} />
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-primary/20 bg-primary/10 p-5 text-sm leading-7 text-slate-200">
            <BadgeCheck className="mb-3 h-5 w-5 text-primary-light" />
            {catalog.commercial_terms.model_spend_policy}
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
            <article className="rounded-[28px] border border-white/10 bg-background/80 p-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary-light" />
                <h2 className="font-heading text-2xl font-semibold text-white">Tier comparison</h2>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm text-slate-200">
                  <thead>
                    <tr className="text-slate-400">
                      <th className="px-4 py-2 font-medium">Capability</th>
                      <th className="px-4 py-2 font-medium">Free</th>
                      <th className="px-4 py-2 font-medium">Starter</th>
                      <th className="px-4 py-2 font-medium">Team</th>
                      <th className="px-4 py-2 font-medium">Business</th>
                      <th className="px-4 py-2 font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.label} className="bg-white/[0.04]">
                        <td className="rounded-l-2xl px-4 py-3 text-white">{row.label}</td>
                        <td className="px-4 py-3">{row.free}</td>
                        <td className="px-4 py-3">{row.starter}</td>
                        <td className="px-4 py-3">{row.team}</td>
                        <td className="px-4 py-3">{row.business}</td>
                        <td className="rounded-r-2xl px-4 py-3">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="rounded-[28px] border border-white/10 bg-background/80 p-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-primary-light" />
                <h2 className="font-heading text-2xl font-semibold text-white">FAQ</h2>
              </div>
              <div className="mt-5 space-y-5">
                {pricingFaqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-sm font-semibold text-white">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.97)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_24%)] p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Need proof first?</p>
                <h2 className="mt-3 font-heading text-3xl font-bold">Review benchmark and API surfaces before procurement.</h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                  Pricing stays tied to the gateway-owned catalog. Proof and integration details stay linked to the trust
                  and API surfaces reviewers naturally ask for.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <a href={`${siteConfig.appBaseUrl}/pii-benchmark`} className="btn btn-cta justify-center px-6 py-3">
                  View benchmark
                </a>
                <a href={`${siteConfig.apiBaseUrl}/docs`} className="btn btn-secondary justify-center px-6 py-3">
                  Open API docs
                </a>
                <Link href="/trust-center" className="btn btn-secondary justify-center px-6 py-3 sm:col-span-2 lg:col-span-1">
                  Trust Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
