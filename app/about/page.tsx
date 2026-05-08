'use client'

import { motion } from 'framer-motion'
import { Compass, Lock, Scale, Shield, Sparkles, Waypoints } from 'lucide-react'
import BackButton from '../components/BackButton'

const principles = [
  {
    icon: Shield,
    title: 'Security before convenience',
    description:
      'We would rather explain a staged rollout honestly than present a product as more mature than it is.',
  },
  {
    icon: Lock,
    title: 'Sensitive data deserves boundaries',
    description:
      'NeutralAI is being built around the idea that AI enablement should not require teams to surrender control of regulated data.',
  },
  {
    icon: Scale,
    title: 'Compliance is operational work',
    description:
      'Readiness depends on evidence, deployment posture, and review processes, not just feature lists.',
  },
  {
    icon: Sparkles,
    title: 'Clear product stories matter',
    description:
      'The website should feel ambitious without inventing customer logos, fake testimonials, or unsupported growth claims.',
  },
] as const

const focusAreas = [
  'Helping teams place a security gateway in front of external model providers',
  'Making production rollouts easier to validate with health and readiness checks',
  'Building toward stronger production controls, including immutable evidence paths',
] as const

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_24%)]" />

        <div className="container-custom relative z-10">
          <BackButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">About NeutralAI</p>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-6xl">
              Building a safer way to adopt AI
            </h1>
            <p className="mt-6 text-xl text-slate-400">
              NeutralAI is focused on one job: helping teams use modern AI systems without treating sensitive data handling as an afterthought or leaving rollout decisions to guesswork.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Compass className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold">What we are building</h2>
              <div className="mt-5 space-y-4 text-slate-400">
                <p>
                  NeutralAI is being shaped as a gateway layer that stands between customer applications, browser-based AI usage, and external model providers. The goal is straightforward: let teams adopt AI while applying policy before sensitive data moves beyond the trusted boundary.
                </p>
                <p>
                  That means the product story has to stay credible. We prefer clear operating posture, guided onboarding, and visible hardening milestones over generic enterprise promises.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="card p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Waypoints className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-bold">Current focus</h2>
              <ul className="mt-6 space-y-4">
                {focusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Principles</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">How we want the company to show up</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <principle.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Want to evaluate the gateway?</h2>
            <p className="mt-5 text-lg text-slate-400">
              The best next step is a rollout conversation that matches your current deployment stage, browser-extension needs, and review requirements.
            </p>
            <a href="/contact" className="btn btn-cta mt-8 px-8 py-4 text-lg">
              Contact NeutralAI
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
