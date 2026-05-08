'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Mail, ShieldCheck, Waypoints } from 'lucide-react'
import BackButton from '../components/BackButton'
import { contactLinks, siteConfig } from '../site'

const contactCards = [
  {
    icon: Mail,
    title: 'General enquiries',
    description: 'Use this route for demo requests, rollout questions, browser extension planning, and commercial conversations.',
    label: siteConfig.salesEmail,
    href: contactLinks.demoMailto,
  },
  {
    icon: ShieldCheck,
    title: 'Security enquiries',
    description: 'Use the security mailbox for reviews, questionnaires, and responsible disclosure conversations.',
    label: siteConfig.securityEmail,
    href: contactLinks.securityMailto,
  },
  {
    icon: Waypoints,
    title: 'Live endpoint checks',
    description: 'Validate the live runtime before reaching out, including simple health and readiness checks.',
    label: 'api.neutralai.co.uk/health',
    href: siteConfig.apiHealthUrl,
  },
] as const

const onboardingSteps = [
  'Share the models, applications, or workflows you want to protect.',
  'We align on scope, data handling expectations, and rollout posture.',
  'If the fit is right, we move into governed onboarding with the right deployment and review path.',
] as const

const companySizes = ['1-10', '11-50', '51-200', '200+'] as const

const referralOptions = [
  'Search',
  'LinkedIn',
  'Referral',
  'GitHub',
  'Security review',
  'Other',
] as const

function ContactForm() {
  return (
    <form action={siteConfig.contactFormUrl} method="POST" className="card p-6 md:p-8">
      <input type="hidden" name="_subject" value="NeutralAI website contact request" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={`${siteConfig.url}/contact/thanks/`} />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Demo request</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">Tell us what you want to protect</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Share the workflow, data types, and deployment context so the first response can be useful.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Full name</span>
          <input
            required
            name="full_name"
            autoComplete="name"
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-primary"
            placeholder="Jane Smith"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-200">Work email</span>
          <input
            required
            type="email"
            name="work_email"
            autoComplete="email"
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-primary"
            placeholder="jane@company.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-200">Company name</span>
          <input
            required
            name="company_name"
            autoComplete="organization"
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-primary"
            placeholder="Company Ltd"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-200">Company size</span>
          <select
            required
            name="company_size"
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-slate-100 outline-none transition-colors focus:border-primary"
            defaultValue=""
          >
            <option value="" disabled>
              Select size
            </option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-slate-200">Message / use case</span>
          <textarea
            required
            name="message"
            rows={6}
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-primary"
            placeholder="Tell us which AI workflows, models, and sensitive data types you need to protect."
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-slate-200">How did you hear about us?</span>
          <select
            name="referral_source"
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-slate-100 outline-none transition-colors focus:border-primary"
            defaultValue=""
          >
            <option value="">Optional</option>
            {referralOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-500">
          Prefer email? Reach us at{' '}
          <a href={contactLinks.salesMailto} className="text-primary-light transition-colors hover:text-primary">
            {siteConfig.salesEmail}
          </a>
          .
        </p>
        <button type="submit" className="btn btn-cta w-full px-8 py-4 sm:w-auto">
          Send Message
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_26%)]" />

        <div className="container-custom relative z-10">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Contact NeutralAI</p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              Schedule a demo for your AI security rollout
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              See NeutralAI in action with your target workflow, model usage, browser extension needs, and compliance expectations so we can scope the right deployment path.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <ContactForm />
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Other routes</p>
            <h2 className="mt-4 font-heading text-3xl font-bold">Email and runtime checks</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {contactCards.map((card, index) => {
              const isExternal = card.href.startsWith('http')

              return (
                <motion.a
                  key={card.title}
                  href={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="card group block p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="mt-5 font-heading text-2xl font-semibold">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{card.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary-light">
                    <span>{card.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">What to include</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">Make your first message useful</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>Your target AI workflows, web apps, or model providers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>The kinds of sensitive data you need to neutralize</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>Whether you are validating the product, rolling out the extension, or planning a stricter production path</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="card p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Evaluation flow</p>
              <h2 className="mt-4 font-heading text-3xl font-bold">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {onboardingSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm text-primary-light">
                      0{index + 1}
                    </div>
                    <p className="pt-1 text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
