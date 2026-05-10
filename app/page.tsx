'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  Globe,
  KeyRound,
  Languages,
  Lock,
  Monitor,
  Network,
  ScanSearch,
  Server,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from 'lucide-react'
import { siteConfig } from './site'

type Card = {
  icon: LucideIcon
  title: string
  description: string
}

const importanceCards: Card[] = [
  {
    icon: AlertTriangle,
    title: 'Sensitive data leaves first',
    description:
      'Names, emails, claim references, transcripts, and internal context often leave the boundary before policy is applied.',
  },
  {
    icon: Gauge,
    title: 'Security becomes the blocker',
    description:
      'Without a visible control point, legal and security teams have no safe way to say yes.',
  },
  {
    icon: Lock,
    title: 'Shadow AI becomes normal',
    description:
      'When approved workflows lag behind demand, people improvise with unmanaged tools and risk compounds fast.',
  },
] as const

const steps = [
  {
    icon: Network,
    title: 'Intercept',
    description: 'Traffic hits NeutralAI before it reaches the external model.',
  },
  {
    icon: KeyRound,
    title: 'Neutralize',
    description: 'Sensitive values become safer tokens or sanitized references.',
  },
  {
    icon: ShieldCheck,
    title: 'Forward',
    description: 'Only the cleaned request continues downstream.',
  },
] as const

const trustCards: Card[] = [
  {
    icon: ShieldCheck,
    title: 'Compliance evidence automation',
    description: 'NeutralAI gives teams a control point that can produce audit-ready proof instead of leaving AI usage invisible.',
  },
  {
    icon: KeyRound,
    title: 'Reversible vault tokenization',
    description: 'Sensitive values can be replaced with encrypted tokens before model egress, then restored only through governed paths.',
  },
  {
    icon: Building2,
    title: 'Managed, private cloud, or on-prem',
    description: 'Teams can start with managed SaaS and move toward stricter deployment models as governance demands increase.',
  },
] as const

const pricingSnapshots = [
  {
    label: 'Evaluate',
    price: 'Free or £29',
    detail: 'Sandbox and Starter paths for proving the masking flow with small managed AI credits.',
  },
  {
    label: 'Operate',
    price: '£99 Team',
    detail: 'Real usage with audit history and BYOK guidance for production provider spend.',
  },
  {
    label: 'Govern',
    price: '£299+',
    detail: 'Business and Enterprise paths for policy controls, evidence exports, SSO/SIEM, and rollout planning.',
  },
] as const

const trustBadges = [
  'AES-256-GCM vault',
  'SOC2 readiness',
  'GDPR-aligned controls',
  'Cyber Essentials evidence',
  '20+ PII entity types',
  '10-language benchmark',
] as const

const technicalTrustDetails = [
  {
    icon: ScanSearch,
    title: 'Two-stage detection',
    detail: 'Presidio NER and pattern matching with semantic validation using Qdrant.',
  },
  {
    icon: Lock,
    title: 'Encrypted token vault',
    detail: 'AES-256-GCM-backed reversible tokenization for governed restore paths.',
  },
  {
    icon: FileText,
    title: 'Entity coverage',
    detail: 'EMAIL, PHONE_NUMBER, PERSON, CREDIT_CARD, IBAN, SSN, TR_ID_NUMBER, UK_NHS_NUMBER, and custom rules.',
  },
  {
    icon: Languages,
    title: 'Policy tuning',
    detail: 'Configurable confidence thresholds per entity type and multilingual detection coverage.',
  },
] as const

const entityTypes = [
  'EMAIL',
  'PHONE_NUMBER',
  'PERSON',
  'CREDIT_CARD',
  'IBAN',
  'IP_ADDRESS',
  'SSN',
  'UK_NHS_NUMBER',
  'TR_ID_NUMBER',
  'TR_VAT_NUMBER',
  'Custom rules',
] as const

const detectionStages = [
  {
    eyebrow: 'Stage 1',
    title: 'Presidio NER + Pattern Matching',
    description:
      'Real-time recognizers catch common personal, financial, regional, and network identifiers before the request moves downstream.',
    accent: 'cyan',
  },
  {
    eyebrow: 'Stage 2',
    title: 'Semantic Validation via Qdrant vector DB',
    description:
      'Context checks help reduce false positives before policy decisions, with confidence thresholds configurable per entity type.',
    accent: 'orange',
  },
] as const

const languageCoverage = [
  { code: 'EN', label: 'English' },
  { code: 'TR', label: 'Turkish' },
  { code: 'DE', label: 'German' },
  { code: 'FR', label: 'French' },
  { code: 'ES', label: 'Spanish' },
  { code: 'IT', label: 'Italian' },
  { code: 'PT', label: 'Portuguese' },
  { code: 'AR', label: 'Arabic' },
  { code: 'NL', label: 'Dutch' },
  { code: 'PL', label: 'Polish' },
] as const

const maskingModes = [
  {
    mode: 'Irreversible',
    sample: '<EMAIL>',
    detail: 'Sensitive value is removed from the prompt path.',
  },
  {
    mode: 'Reversible',
    sample: '<EMAIL_token_abc123>',
    detail: 'Token is stored in an encrypted vault and retrievable only with authorization.',
  },
] as const

const complianceProofs = [
  {
    icon: ClipboardCheck,
    label: 'Auto evidence',
    value: 'SOC2 / ISO / CE',
  },
  {
    icon: Lock,
    label: 'Token vault',
    value: 'AES-256-GCM',
  },
  {
    icon: Timer,
    label: 'Measured overhead',
    value: '~41 ms',
  },
] as const

// Source of truth: nazifsohtaoglu/neutralai-gateway benchmark artifacts listed in website issue #16.
const benchmarkProof = {
  publicOverallF1: '99.8%',
  holdoutOverallF1: '98.4%',
  personHoldoutF1: '92.7%',
  appBenchmarkUrl: `${siteConfig.appBaseUrl}/pii-benchmark`,
} as const

type DeploymentCard = {
  icon: LucideIcon
  title: string
  audience: string
  description: string
}

const deploymentCards: DeploymentCard[] = [
  {
    icon: Globe,
    title: 'SaaS',
    audience: 'Fastest path for teams that want managed rollout',
    description:
      'Use NeutralAI as a managed service when you want speed, lower operational overhead, and a simpler path into protected AI usage.',
  },
  {
    icon: Building2,
    title: 'Private Cloud',
    audience: 'For teams that need stronger environment control',
    description:
      'Run NeutralAI in a customer-controlled cloud environment when governance, network boundaries, or data posture require more separation.',
  },
  {
    icon: Server,
    title: 'On-Prem',
    audience: 'For regulated deployments with strict infrastructure requirements',
    description:
      'Deploy NeutralAI inside your own infrastructure when policy, compliance, or customer obligations demand the highest level of control.',
  },
] as const

type PromptPart = {
  text: string
  tone?: 'danger' | 'safe'
}

type PromptLine = PromptPart[]

const rawPromptLines: PromptLine[] = [
  [{ text: 'Draft a reply to ' }, { text: 'emma@client.com', tone: 'danger' }],
  [{ text: 'about claim ' }, { text: 'POL-44918', tone: 'danger' }],
  [{ text: 'and include phone ' }, { text: '+44 07...', tone: 'danger' }],
] as const

const sanitizedPromptLines: PromptLine[] = [
  [{ text: 'Draft a reply to ' }, { text: 'EMAIL_TOKEN', tone: 'safe' }],
  [{ text: 'about claim ' }, { text: 'CLAIM_REFERENCE', tone: 'safe' }],
  [{ text: 'and include phone ' }, { text: 'PHONE_TOKEN', tone: 'safe' }],
] as const

function countPromptChars(lines: readonly PromptLine[]) {
  return lines.reduce(
    (total, line) => total + line.reduce((lineTotal, part) => lineTotal + part.text.length, 0),
    0
  )
}

const rawPromptCharCount = countPromptChars(rawPromptLines)
const sanitizedPromptCharCount = countPromptChars(sanitizedPromptLines)

function renderPromptLines({
  lines,
  typedChars,
  highlightTokens,
  showCaret,
}: {
  lines: readonly PromptLine[]
  typedChars: number
  highlightTokens: boolean
  showCaret: boolean
}) {
  let consumedChars = 0

  return lines.map((line, lineIndex) => {
    const lineLength = line.reduce((total, part) => total + part.text.length, 0)
    const lineVisibleChars = Math.max(0, Math.min(lineLength, typedChars - consumedChars))
    const isCurrentLine =
      showCaret &&
      typedChars > consumedChars &&
      typedChars <= consumedChars + lineLength &&
      typedChars < countPromptChars(lines)

    consumedChars += lineLength

    if (lineVisibleChars <= 0) {
      return <div key={`line-${lineIndex}`} className="min-h-[1.9rem] md:min-h-[2.1rem]" />
    }

    let remainingChars = lineVisibleChars
    const parts = line.map((part, partIndex) => {
      if (remainingChars <= 0) {
        return null
      }

      const visibleLength = Math.min(remainingChars, part.text.length)
      const visibleText = part.text.slice(0, visibleLength)
      const partIsComplete = visibleLength === part.text.length
      remainingChars -= visibleLength

      if (part.tone && partIsComplete && highlightTokens) {
        return (
          <span
            key={`part-${lineIndex}-${partIndex}`}
            className={part.tone === 'danger' ? 'token-danger' : 'token-safe'}
          >
            {part.text}
          </span>
        )
      }

      return <span key={`part-${lineIndex}-${partIndex}`}>{visibleText}</span>
    })

    return (
      <div key={`line-${lineIndex}`} className="min-h-[1.9rem] break-words md:min-h-[2.1rem]">
        {parts}
        {isCurrentLine ? <span className="typing-caret ml-1" /> : null}
      </div>
    )
  })
}

function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">{eyebrow}</p>
      <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">{title}</h2>
      <p className="mt-5 text-lg text-slate-400">{description}</p>
    </div>
  )
}

function ProductVisual() {
  const [phase, setPhase] = useState<'typingRaw' | 'highlightRaw' | 'sending' | 'typingSanitized' | 'pauseSanitized'>('typingRaw')
  const [rawTypedChars, setRawTypedChars] = useState(0)
  const [sanitizedTypedChars, setSanitizedTypedChars] = useState(0)

  useEffect(() => {
    const typingSpeedMs = 34
    let timer: ReturnType<typeof setTimeout> | undefined

    if (phase === 'typingRaw') {
      if (rawTypedChars < rawPromptCharCount) {
        timer = setTimeout(() => {
          setRawTypedChars((current) => current + 1)
        }, typingSpeedMs)
      } else {
        timer = setTimeout(() => {
          setPhase('highlightRaw')
        }, 550)
      }
    }

    if (phase === 'highlightRaw') {
      timer = setTimeout(() => {
        setPhase('sending')
      }, 650)
    }

    if (phase === 'sending') {
      timer = setTimeout(() => {
        setPhase('typingSanitized')
      }, 1550)
    }

    if (phase === 'typingSanitized') {
      if (sanitizedTypedChars < sanitizedPromptCharCount) {
        timer = setTimeout(() => {
          setSanitizedTypedChars((current) => current + 1)
        }, typingSpeedMs)
      } else {
        timer = setTimeout(() => {
          setPhase('pauseSanitized')
        }, 900)
      }
    }

    if (phase === 'pauseSanitized') {
      timer = setTimeout(() => {
        setRawTypedChars(0)
        setSanitizedTypedChars(0)
        setPhase('typingRaw')
      }, 1200)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [phase, rawTypedChars, sanitizedTypedChars])

  const rawHighlightVisible = phase !== 'typingRaw' && rawTypedChars === rawPromptCharCount
  const showFlights = phase === 'sending'

  return (
    <div className="signal-simple-shell rounded-[30px] p-4 md:p-6 xl:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3 md:pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Live Narrative</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">How NeutralAI works in one view</h2>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-light">
          api.neutralai.co.uk
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden md:mt-6">
        <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
          <motion.div
            className="token-flight token-flight-danger"
            style={{ top: '37%', left: '10%' }}
            animate={showFlights ? { x: [0, 42, 96, 148], opacity: [0, 1, 1, 0] } : { x: 0, opacity: 0 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          >
            emma@client.com
          </motion.div>
          <motion.div
            className="token-flight token-flight-danger"
            style={{ top: '51%', left: '10%' }}
            animate={showFlights ? { x: [0, 42, 96, 148], opacity: [0, 1, 1, 0] } : { x: 0, opacity: 0 }}
            transition={{ duration: 1.3, delay: 0.18, ease: 'easeInOut' }}
          >
            POL-44918
          </motion.div>
          <motion.div
            className="token-flight token-flight-danger"
            style={{ top: '65%', left: '10%' }}
            animate={showFlights ? { x: [0, 42, 96, 148], opacity: [0, 1, 1, 0] } : { x: 0, opacity: 0 }}
            transition={{ duration: 1.3, delay: 0.36, ease: 'easeInOut' }}
          >
            +44 07...
          </motion.div>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_118px_minmax(0,1.16fr)] md:items-stretch md:gap-3 xl:grid-cols-[minmax(0,1.03fr)_132px_minmax(0,1.2fr)] xl:gap-4">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          className="grid min-w-0 grid-rows-[auto_1fr] rounded-[22px] border border-red-500/20 bg-red-950/10 p-3 md:p-4"
        >
          <p className="text-sm font-semibold text-slate-100">Raw input</p>
          <div className="prompt-editor-shell mt-3 min-w-0 font-mono text-sm text-slate-300 md:mt-4 md:text-[15px]">
            <div className="mb-4 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            </div>
            <div className="space-y-3 leading-7 md:leading-8">
              {renderPromptLines({
                lines: rawPromptLines,
                typedChars: rawTypedChars,
                highlightTokens: rawHighlightVisible,
                showCaret: phase === 'typingRaw',
              })}
            </div>
          </div>
        </motion.div>

          <div className="flex items-center justify-center py-2 md:py-0">
          <div className="beam-wrapper">
            <div className="beam-line" />
            <motion.div
              animate={showFlights ? { x: ['-64%', '64%'], opacity: [0.35, 1, 0.35] } : { x: '-64%', opacity: 0.2 }}
              transition={{ duration: 1.1, repeat: showFlights ? Infinity : 0, ease: 'easeInOut' }}
              className="beam-dot"
            />
            <motion.div
              animate={showFlights ? { scale: [1, 1.08, 1], boxShadow: ['0 0 0 rgba(34,211,238,0.0)', '0 0 30px rgba(34,211,238,0.2)', '0 0 0 rgba(34,211,238,0.0)'] } : { scale: 1 }}
              transition={{ duration: 1.1, repeat: showFlights ? Infinity : 0, ease: 'easeInOut' }}
              className="gateway-core"
            >
              <ShieldCheck className="h-8 w-8 text-primary-light" />
              <p className="mt-3 font-heading text-base font-semibold text-slate-50">NeutralAI</p>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="grid min-w-0 grid-rows-[auto_1fr] rounded-[22px] border border-emerald-500/20 bg-emerald-950/10 p-3 md:p-4"
        >
          <p className="text-sm font-semibold text-slate-100">Sanitized prompt</p>
          <div className="prompt-editor-shell prompt-editor-shell-safe mt-3 min-w-0 font-mono text-sm text-slate-300 md:mt-4 md:text-[15px]">
            <div className="mb-4 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-800/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-800/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-800/70" />
            </div>
            <div className="space-y-3 leading-7 md:leading-8">
              {renderPromptLines({
                lines: sanitizedPromptLines,
                typedChars: sanitizedTypedChars,
                highlightTokens: true,
                showCaret: phase === 'typingSanitized',
              })}
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />

      <div className="container-custom relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.84fr_1.16fr] xl:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary-light">
              <span className="h-2 w-2 rounded-full bg-accent-success animate-pulse" />
              AI Security Gateway - Now Available
            </div>

            <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight md:text-6xl xl:text-7xl">
              Mask sensitive prompt data <span className="gradient-text-warm">before it leaves AI apps.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
              NeutralAI adds a compliance-first control layer for browser AI and app traffic, with masking, encrypted tokenization, and audit-ready proof for regulated teams.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={siteConfig.signupUrl} className="btn btn-cta w-full px-8 py-4 text-base sm:w-auto">
                Try Free
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="/contact" className="btn btn-secondary w-full px-8 py-4 text-base sm:w-auto">
                Book Demo
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="/install-extension" className="text-primary-light transition-colors hover:text-primary">
                Install browser extension
              </a>
              <span className="hidden text-slate-600 sm:inline">•</span>
              <a
                href={siteConfig.apiHealthUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-slate-200"
              >
                View live API health
              </a>
            </div>

            <div className="mt-10 space-y-3">
              {[
                'Stops raw PII and business identifiers before they reach external models',
                'Generates compliance evidence for AI usage instead of relying on manual screenshots',
                'Supports browser extension, managed gateway, private cloud, and on-prem rollout paths',
                'Helps legal and security approve AI adoption without blocking everyday workflows',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {complianceProofs.map((proof) => (
                <div key={proof.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <proof.icon className="h-5 w-5 text-primary-light" />
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{proof.label}</p>
                  <p className="mt-1 font-heading text-lg font-semibold text-slate-100">{proof.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:-mt-3 xl:-mt-4">
            <ProductVisual />
          </div>
        </div>
      </div>
      <div className="container-custom relative z-10 mt-12">
        <div className="marquee rounded-full border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="marquee-track gap-3">
            {[...trustBadges, ...trustBadges].map((badge, index) => (
              <span
                key={`${badge}-${index}`}
                className="inline-flex whitespace-nowrap rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary-light"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyItMatters() {
  return (
    <section id="problem" className="section">
      <div className="container-custom">
        <div className="accent-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Why It Matters</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                AI usage grows faster than <span className="gradient-text-warm">approval paths.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                The real problem is not just privacy. It is losing the ability to approve AI usage with confidence before shadow workflows become normal.
              </p>
              <div className="mt-6 inline-flex rounded-full border border-accent-cta/20 bg-[rgba(249,115,22,0.12)] px-4 py-2 text-sm text-[#fdba74]">
                NeutralAI creates the yes-path, not just another warning.
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
              {importanceCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`accent-card rounded-[24px] p-6 ${index === 1 ? 'border-accent-cta/25 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.94))]' : ''} ${index === 2 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                    <card.icon className={`h-6 w-6 ${index === 1 ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductSurface() {
  return (
    <section className="section bg-background-secondary">
      <div className="container-custom">
        <div className="accent-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Adoption Without Friction</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                Secure AI usage <span className="gradient-text-warm">without changing habits</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                NeutralAI works best when adoption does not require a behaviour reset. Teams keep familiar browser-based AI tools while NeutralAI adds prompt protection, auth context, and policy support in the background.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  'No retraining project just to start using AI more safely',
                  'No forced portal switch for teams already working in browser-based tools',
                  'A better rollout story because security arrives without workflow drag',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="accent-card rounded-[28px] p-5 md:p-6">
              <div className="flex items-center gap-2 text-xs text-primary-light">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-cta" />
                Browser extension
              </div>

              <div className="mt-4">
                <h3 className="font-heading text-2xl font-semibold text-slate-50">
                  Same tab. <span className="gradient-text-warm">Same prompt box.</span> Protected underneath.
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  NeutralAI can protect browser-based AI usage in the flow people already know, which is exactly why adoption can move faster.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a href={siteConfig.signupUrl} className="btn btn-cta w-full sm:w-auto">
                    Try Free
                  </a>
                  <a href="/install-extension" className="btn btn-secondary w-full sm:w-auto">
                    Install Browser Extension
                  </a>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-background/85 p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <div className="ml-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-primary-light">
                    Extension active
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-primary/15 bg-background-secondary/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary-light">User Experience</p>
                  <p className="mt-3 text-lg text-slate-100">People keep the workflow. NeutralAI adds the protection layer.</p>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-primary/15 bg-background-secondary/70 p-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-primary-light" />
                      <p className="text-xs uppercase tracking-[0.2em] text-primary-light">What Users Feel</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      No workflow disruption, no extra friction, and no new daily habit to learn.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-accent-cta/20 bg-[rgba(249,115,22,0.08)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#fdba74]">What Security Gets</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      A real control point over browser-based AI usage instead of hoping people self-police prompts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Deployment Options</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              One product, <span className="gradient-text-warm">multiple deployment paths</span>
            </h2>
            <p className="mt-5 text-lg text-slate-400">
              NeutralAI is not a single hosting story. Teams can choose the operating model that fits their risk posture, infrastructure constraints, and rollout speed.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {deploymentCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="accent-card rounded-[24px] p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                    <card.icon className="h-6 w-6 text-primary-light" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
                    NeutralAI
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm font-medium text-[#fdba74]">{card.audience}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-background-secondary">
      <div className="container-custom">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96)),radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_26%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_24%)] p-6 shadow-[0_28px_70px_rgba(2,8,23,0.42)] md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">How It Works</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              Three steps. <span className="gradient-text-warm">One control layer.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-300">
              NeutralAI sits between the workflow and the model, intercepting traffic before raw sensitive values continue downstream.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-white/10 bg-background/85 p-6"
              >
                <div className="absolute right-5 top-5 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-600">
                  0{index + 1}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? 'bg-[rgba(249,115,22,0.14)]' : 'bg-primary/10'}`}>
                  <step.icon className={`h-6 w-6 ${index === 1 ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{step.description}</p>
                <div className={`mt-6 h-1 w-16 rounded-full ${index === 1 ? 'bg-[linear-gradient(90deg,#f97316,#fdba74)]' : 'bg-[linear-gradient(90deg,#22d3ee,#7dd3fc)]'}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DetectionEngine() {
  return (
    <section id="detection-engine" className="section">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.97)),radial-gradient(circle_at_14%_12%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_88%_18%,rgba(249,115,22,0.16),transparent_24%)] p-6 shadow-[0_28px_76px_rgba(2,8,23,0.46)] md:p-8">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Detection Engine</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                The technical detail buyers ask for, <span className="gradient-text-warm">without the wall of docs.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                NeutralAI combines real-time recognizers, semantic validation, tenant rules, and masking mode controls so security teams can understand what happens before prompt egress.
              </p>

              <div className="mt-8 grid gap-4">
                {detectionStages.map((stage, index) => (
                  <div
                    key={stage.title}
                    className={`relative overflow-hidden rounded-[24px] border p-5 ${
                      stage.accent === 'orange'
                        ? 'border-accent-cta/25 bg-[rgba(249,115,22,0.08)]'
                        : 'border-primary/20 bg-primary/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                        stage.accent === 'orange' ? 'bg-[rgba(249,115,22,0.14)]' : 'bg-primary/10'
                      }`}>
                        {index === 0 ? (
                          <ScanSearch className={`h-6 w-6 ${stage.accent === 'orange' ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                        ) : (
                          <Network className={`h-6 w-6 ${stage.accent === 'orange' ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                        )}
                      </div>
                      <div>
                        <p className={`font-mono text-xs uppercase tracking-[0.24em] ${stage.accent === 'orange' ? 'text-[#fdba74]' : 'text-primary-light'}`}>
                          {stage.eyebrow}
                        </p>
                        <h3 className="mt-2 font-heading text-xl font-semibold text-slate-50">{stage.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{stage.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[26px] border border-white/10 bg-background/80 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary-light">Entity Types Grid</p>
                    <h3 className="mt-2 font-heading text-2xl font-semibold">Visible coverage for common PII classes</h3>
                  </div>
                  <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary-light">
                    tenant rules
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {entityTypes.map((entity) => (
                    <div
                      key={entity}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-200"
                    >
                      {entity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[26px] border border-white/10 bg-background/80 p-5">
                  <Languages className="h-6 w-6 text-primary-light" />
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-primary-light">Benchmark Coverage</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {languageCoverage.map((language) => (
                      <div key={language.code} className="flex min-h-14 flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2">
                        <span className="font-mono text-xs text-primary-light">{language.code}</span>
                        <span className="mt-1 text-xs text-slate-200">{language.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-slate-400">
                    Current multilingual benchmark scope covers 10 target languages; additional packs should be promoted after approved benchmark releases.
                  </p>
                </div>

                <div className="rounded-[26px] border border-accent-cta/20 bg-[rgba(249,115,22,0.08)] p-5">
                  <KeyRound className="h-6 w-6 text-[#fdba74]" />
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-[#fdba74]">Masking Modes</p>
                  <div className="mt-4 space-y-3">
                    {maskingModes.map((mode) => (
                      <div key={mode.mode} className="rounded-2xl border border-white/10 bg-background/80 p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-heading text-base font-semibold text-slate-100">{mode.mode}</p>
                          <code className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-primary-light">
                            {mode.sample}
                          </code>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{mode.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {technicalTrustDetails.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <item.icon className="h-5 w-5 text-primary-light" />
                    <h4 className="mt-3 font-heading text-lg font-semibold text-slate-100">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section id="trust" className="section">
      <div className="container-custom">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96)),radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_86%_12%,rgba(249,115,22,0.14),transparent_22%)] p-6 shadow-[0_28px_70px_rgba(2,8,23,0.42)] md:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Why Trust NeutralAI</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
                Proof your security team <span className="gradient-text-warm">can trust.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                NeutralAI goes beyond masking by combining policy enforcement, encrypted tokenization, audit-ready evidence, and deployment options built for regulated AI adoption.
              </p>
            </div>

            <div className="grid gap-4">
              {trustCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`rounded-[22px] border p-5 ${index === 1 ? 'border-accent-cta/25 bg-[rgba(249,115,22,0.08)]' : 'border-white/10 bg-background/80'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${index === 1 ? 'bg-[rgba(249,115,22,0.14)]' : 'bg-primary/10'}`}>
                      <card.icon className={`h-5 w-5 ${index === 1 ? 'text-[#fdba74]' : 'text-primary-light'}`} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div id="benchmark-proof" className="mt-10 scroll-mt-28 overflow-hidden rounded-[28px] border border-primary/20 bg-[linear-gradient(135deg,rgba(6,182,212,0.12),rgba(15,23,42,0.94)_42%,rgba(249,115,22,0.10))] p-6">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Benchmark proof</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold">Measured against a reproducible Presidio-vanilla baseline.</h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                NeutralAI combines proven open-source detection primitives with multilingual calibration, masking, and enforcement layers. The gateway repo remains the measurement source of truth, while the website links buyers to the published methodology and benchmark surface.
              </p>
              <p className="mt-3 text-xs leading-6 text-slate-500">
                Product benchmark, not a third-party independent evaluation.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Public overall F1', benchmarkProof.publicOverallF1],
                ['Holdout overall F1', benchmarkProof.holdoutOverallF1],
                ['Holdout PERSON F1', benchmarkProof.personHoldoutF1],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-background/80 p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
                  <p className="mt-2 font-heading text-3xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={benchmarkProof.appBenchmarkUrl} className="btn btn-cta justify-center px-6 py-3 text-sm">
              Open benchmark
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/presidio-alternative" className="btn btn-secondary justify-center px-6 py-3 text-sm">
              Read Presidio comparison
            </a>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-accent-cta/20 bg-[linear-gradient(180deg,rgba(249,115,22,0.08),rgba(15,23,42,0.92))] p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Operational Signals</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold">Live runtime. Measured product proof.</h3>
              <p className="mt-4 max-w-3xl text-slate-300">
                The public signal is simple: the runtime is live on <span className="text-primary-light">api.neutralai.co.uk</span>, the benchmark pages are published, and the gateway overhead is measured separately from model generation time.
              </p>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="rounded-2xl border border-border bg-background/80 px-4 py-3 text-slate-200">
                GET {siteConfig.apiHealthUrl.replace('https://', '')}
              </div>
              <div className="rounded-2xl border border-border bg-background/80 px-4 py-3 text-slate-200">
                GET {siteConfig.apiReadyUrl.replace('https://', '')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="section bg-background-secondary">
      <div className="container-custom">
        <SectionIntro
          eyebrow="Pricing"
          title="A quick pricing snapshot, not the full catalog"
          description="Use this as the homepage buying signal. The dedicated pricing page carries the detailed plan table, annual billing view, masking quotas, and BYOK/top-up explanation."
          centered
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {pricingSnapshots.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="card p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary-light">{item.label}</p>
              <p className="mt-3 font-heading text-3xl font-bold text-slate-50">{item.price}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-[28px] border border-primary/20 bg-primary/10 p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-heading text-xl font-semibold text-slate-50">Need the actual plan table?</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                The pricing page now owns the detailed catalog: monthly and annual prices, masking quotas, managed AI
                credit limits, BYOK expectations, Business controls, and Enterprise rollout posture.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a href="/pricing" className="btn btn-cta">
                View Detailed Pricing
              </a>
              <a href={siteConfig.signupUrl} className="btn btn-secondary">
                Start Free
              </a>
            </div>
          </div>
          <p className="mt-5 border-t border-primary/20 pt-4 text-sm leading-6 text-slate-300">
            Plans include masking requests. Managed AI credits are deliberately small for evaluation; production model
            usage should run through BYOK, customer provider accounts, or prepaid top-ups.
          </p>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-[10%] top-[18%] h-52 w-52 rounded-full bg-[rgba(249,115,22,0.14)] blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.97)),radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_22%)] px-6 py-10 text-center shadow-[0_32px_80px_rgba(2,8,23,0.5)] md:px-10 md:py-12">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Final CTA</p>
          <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
            Put the <span className="gradient-text-warm">control layer</span> in place before the rollout gets messy
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-300">
            NeutralAI is for teams that already know AI usage is happening and want a credible way to reduce prompt risk without slowing everyone down.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={siteConfig.signupUrl} className="btn btn-cta w-full px-8 py-4 text-lg sm:w-auto">
              Try Free
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="/contact" className="btn btn-secondary w-full px-8 py-4 text-lg sm:w-auto">
              Talk to Sales
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Need a security or commercial conversation first?{' '}
            <a href="/contact" className="text-primary-light hover:text-primary">
              Contact NeutralAI
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductSurface />
      <WhyItMatters />
      <HowItWorks />
      <DetectionEngine />
      <Trust />
      <Pricing />
      <FinalCta />
    </main>
  )
}
