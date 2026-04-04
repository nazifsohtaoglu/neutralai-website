'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, ShieldCheck, Waypoints } from 'lucide-react'
import BackButton from '../components/BackButton'
import { contactLinks, siteConfig } from '../site'

const contactCards = [
  {
    icon: Mail,
    title: 'General enquiries',
    description: 'Use this route for pilot requests, rollout questions, browser extension pilots, and early commercial conversations.',
    label: siteConfig.contactEmail,
    href: contactLinks.betaAccessMailto,
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
    description: 'Validate the public beta runtime before reaching out, including simple health and readiness checks.',
    label: 'api.neutralai.co.uk/health',
    href: siteConfig.apiHealthUrl,
  },
] as const

const onboardingSteps = [
  'Share the models, applications, or workflows you want to protect.',
  'We align on pilot scope, data handling expectations, and launch posture.',
  'If the fit is right, we move into beta onboarding with the right deployment and review path.',
] as const

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
              Start the conversation before you start the rollout
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              NeutralAI is currently onboarding pilots directly. Reach out with your target workflow, model usage, browser extension needs, and compliance expectations so we can scope the right starting point.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
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

      <section className="section bg-background-secondary">
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
                  <span>Whether you are validating a pilot, rolling out the extension, or planning a stricter production path</span>
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
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Beta flow</p>
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
