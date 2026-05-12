'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, ShieldCheck, Waypoints } from 'lucide-react'
import BackButton from '../components/BackButton'
import HubSpotLeadForm from '../components/HubSpotLeadForm'
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

const intentCopy = {
  demo: {
    eyebrow: 'Demo request',
    title: 'Tell us what you want to protect',
    description: 'Share the workflow, data types, and deployment context so the first response can be useful.',
    leadSource: 'website_demo_request',
  },
  enterprise: {
    eyebrow: 'Enterprise enquiry',
    title: 'Scope a governed rollout',
    description: 'Share plan interest, provider routing expectations, security review needs, and rollout timing.',
    leadSource: 'website_enterprise_enquiry',
  },
  'security-review': {
    eyebrow: 'Security review',
    title: 'Request the right evidence path',
    description: 'Share the questionnaire, procurement context, or review material your security team needs.',
    leadSource: 'website_security_review',
  },
} as const

type ContactIntent = keyof typeof intentCopy

function normalizeIntent(value: string | null): ContactIntent {
  if (value === 'enterprise' || value === 'security-review') {
    return value
  }

  return 'demo'
}

function getHubSpotFormId(intent: ContactIntent) {
  if (intent === 'enterprise') {
    return siteConfig.hubspot.forms.enterprise || siteConfig.hubspot.forms.contact
  }

  if (intent === 'security-review') {
    return siteConfig.hubspot.forms.securityReview || siteConfig.hubspot.forms.contact
  }

  return siteConfig.hubspot.forms.demo || siteConfig.hubspot.forms.contact
}

function ContactFormPanel({ intent }: { intent: ContactIntent }) {
  const copy = intentCopy[intent]

  return (
    <div className="card p-6 md:p-8">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">{copy.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">{copy.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            {copy.description}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <HubSpotLeadForm formId={getHubSpotFormId(intent)} intent={intent} leadSource={copy.leadSource} />
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-500">
          Prefer email? Reach us at{' '}
          <a href={contactLinks.salesMailto} className="text-primary-light transition-colors hover:text-primary">
            {siteConfig.salesEmail}
          </a>
          .
        </p>
      </div>
    </div>
  )
}

function ContactFormContent() {
  const searchParams = useSearchParams()
  const intent = normalizeIntent(searchParams.get('intent'))

  return <ContactFormPanel intent={intent} />
}

function ContactForm() {
  return (
    <Suspense fallback={<ContactFormPanel intent="demo" />}>
      <ContactFormContent />
    </Suspense>
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
