'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { advancedPricingPlans, primaryPricingPlans } from '../../data/homepage'
import { contactLinks, siteConfig } from '../../site'
import SectionIntro from './SectionIntro'
import PlanBadges from './PlanBadges'
import PricingComparisonTable from './PricingComparisonTable'
import PricingFaq from './PricingFaq'

export default function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(false)

  if (!siteConfig.showPublicPricing) {
    return (
      <section id="pricing" className="section">
        <div className="container-custom">
          <SectionIntro
            eyebrow="Pricing"
            title="Pricing is being finalised"
            description="We are finalising our published pricing ahead of commercial launch. Plans start free, and paid tiers are sized for small and mid-sized regulated teams — talk to us for current plans and early-access pricing."
            centered
          />
          <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href={contactLinks.demo} className="btn btn-cta px-8 py-4" data-analytics-event="cta_click" data-analytics-label="Talk to us about pricing" data-analytics-placement="pricing_hidden_notice" data-analytics-cta-id="pricing_contact">
              Talk to us about pricing
            </a>
            <a href={siteConfig.signupUrl} className="btn btn-secondary px-8 py-4" data-analytics-event="cta_click" data-analytics-label="Start free" data-analytics-placement="pricing_hidden_notice" data-analytics-cta-id="pricing_start_free">
              Start free
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="section">
      <div className="container-custom">
        <SectionIntro
          eyebrow="Pricing"
          title="Public pricing for secure AI rollout"
          description="Plans include NeutralAI masking and governance usage. Managed AI credits are intentionally small for evaluation, while production model usage can run through BYOK or customer-owned provider accounts."
          centered
        />

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-3 sm:flex-row">
          <div className="text-center text-sm text-slate-300 sm:text-left">
            <span className="font-semibold text-slate-100">Annual billing saves 20%</span>
            <span className="block text-slate-400">Compare monthly list price with annual monthly equivalent.</span>
          </div>
          <div className="inline-flex rounded-full border border-white/10 bg-background/80 p-1">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                annualBilling ? 'text-slate-300 hover:text-slate-100' : 'bg-white text-background'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                annualBilling ? 'bg-primary text-background' : 'text-slate-300 hover:text-slate-100'
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-4xl text-center text-sm leading-6 text-slate-400">
          Plans include masking requests. Managed AI usage is covered by small included credits for evaluation. Production model usage can run through BYOK, customer provider accounts, or prepaid top-ups.
        </p>
        <p className="mx-auto mt-2 max-w-4xl text-center text-xs leading-6 text-slate-400">
          All listed GBP prices are excluding VAT. VAT may apply based on billing country and entity status.
        </p>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {primaryPricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`card flex h-full flex-col p-6 ${plan.featured ? 'border-primary shadow-[0_0_40px_rgba(6,182,212,0.12)]' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">{plan.eyebrow}</p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold">{plan.name}</h3>
                </div>
                {plan.featured ? (
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary-light">
                    Most Popular
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-slate-400">{plan.summary}</p>
              <div className="mt-6">
                <div className="flex items-end gap-2">
                  <span className="font-heading text-4xl font-bold text-slate-50">
                    {annualBilling ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.name !== 'Enterprise' ? <span className="pb-1 text-sm text-slate-400">GBP</span> : null}
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  {annualBilling && 'annualBilled' in plan ? plan.annualBilled : plan.priceNote}
                </p>
                <p className="mt-3 rounded-2xl border border-primary/15 bg-primary/10 px-3 py-2 text-sm text-primary-light">
                  {plan.usage}
                </p>
                <div className="mt-3 space-y-2 text-sm text-slate-300">
                  <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">{plan.managedAiCredit}</p>
                  <p className="rounded-2xl border border-white/10 bg-background/70 px-3 py-2">{plan.modelUsage}</p>
                </div>
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`btn mt-8 w-full ${plan.featured ? 'btn-cta' : 'btn-secondary'}`}
                data-analytics-event="pricing_plan_click"
                data-analytics-label={`${plan.name} ${plan.cta}`}
                data-analytics-placement="homepage_pricing_primary"
                data-analytics-cta-id="pricing_start_trial"
                data-analytics-plan={plan.name.toLowerCase()}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-6xl">
          <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary-light">Advanced controls</p>
              <h3 className="mt-2 font-heading text-2xl font-semibold">Business and Enterprise add governed rollout features</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Higher tiers are where provider routing, evidence export, SSO/SIEM posture, and managed deployment planning become part of the buying decision.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-5 grid max-w-6xl gap-4 lg:grid-cols-2">
          {advancedPricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
            >
              <div className="grid h-full gap-5 lg:grid-rows-[auto_1fr_auto]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">{plan.eyebrow}</p>
                  <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
                    <h3 className="font-heading text-2xl font-semibold">{plan.name}</h3>
                    <span className="font-heading text-2xl font-bold text-slate-50">
                      {annualBilling ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    {plan.name !== 'Enterprise' ? <span className="pb-1 text-sm text-slate-400">GBP</span> : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    {annualBilling && 'annualBilled' in plan ? plan.annualBilled : plan.priceNote}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{plan.summary}</p>
                  <PlanBadges planName={plan.name} />
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-primary-light">
                      {plan.usage}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-slate-300">
                      {plan.managedAiCredit}
                    </span>
                    <span className="rounded-full border border-white/10 bg-background/70 px-3 py-1.5 text-slate-300">
                      {plan.modelUsage}
                    </span>
                  </div>
                </div>
                <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  className="btn btn-secondary w-full"
                  data-analytics-event="pricing_plan_click"
                  data-analytics-label={`${plan.name} ${plan.cta}`}
                  data-analytics-placement="homepage_pricing_advanced"
                  data-analytics-plan={plan.name.toLowerCase()}
                  data-analytics-cta-id={`pricing_${plan.name.toLowerCase()}_cta`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <PricingComparisonTable />

        <PricingFaq />
      </div>
    </section>
  )
}
