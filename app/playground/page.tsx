'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Eraser,
  Gauge,
  Loader2,
  LockKeyhole,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { siteConfig } from '../site'

type MaskingMode = 'irreversible' | 'reversible'
type ResultSource = 'live' | 'demo'
type EntityType =
  | 'EMAIL_ADDRESS'
  | 'PHONE_NUMBER'
  | 'PERSON'
  | 'CREDIT_CARD'
  | 'IBAN'
  | 'UK_NHS'
  | 'DATE_TIME'

type Finding = {
  id: string
  entityType: EntityType
  text: string
  start: number
  end: number
  confidence: number
}

type TokenFinding = {
  id: string
  entityType: EntityType
  text: string
  start: number
  end: number
}

type ApiMaskResponse = {
  status?: string
  masked_text?: string
}

const MAX_PROMPT_LENGTH = 1200
const REQUEST_COOLDOWN_MS = 2500

const samplePrompts = [
  {
    label: 'Insurance claim',
    value:
      'Summarize Sarah Patel claim CR-20491 for the adjuster. Email sarah@acme.co.uk and call +44 7123 456 789.',
  },
  {
    label: 'Finance review',
    value:
      'Review the payment note for Michael Grant. IBAN GB82 WEST 1234 5698 7654 32 is linked to card 4111 1111 1111 1111.',
  },
  {
    label: 'Healthcare note',
    value:
      'Draft a patient update for Amelia Stone. NHS number 943 476 5919 and phone 07123 456 789 should not leave the trust.',
  },
  {
    label: 'Legal review',
    value:
      'Prepare a contract risk summary for Daniel Morgan at daniel.morgan@lawfirm.co.uk. Reference matter LT-8821 and remove client identifiers.',
  },
  {
    label: 'HR case note',
    value:
      'Rewrite an HR case note for Olivia Chen. Contact olivia.chen@company.co.uk or +44 7700 900 123 about employee record ER-4420.',
  },
  {
    label: 'Public sector',
    value:
      'Create a short briefing for James Walker. Citizen record PS-10992 includes phone 07123 456 789 and email james.walker@gov.example.',
  },
] as const

const entityLabels: Record<EntityType, string> = {
  EMAIL_ADDRESS: 'EMAIL',
  PHONE_NUMBER: 'PHONE',
  PERSON: 'PERSON',
  CREDIT_CARD: 'CARD',
  IBAN: 'IBAN',
  UK_NHS: 'NHS',
  DATE_TIME: 'DATE',
}

const entityStyles: Record<EntityType, { original: string; masked: string; dot: string }> = {
  EMAIL_ADDRESS: {
    original: 'border-sky-400/40 bg-sky-400/15 text-sky-100',
    masked: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-100',
    dot: 'bg-sky-300',
  },
  PHONE_NUMBER: {
    original: 'border-cyan-400/40 bg-cyan-400/15 text-cyan-100',
    masked: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-100',
    dot: 'bg-cyan-300',
  },
  PERSON: {
    original: 'border-orange-300/45 bg-orange-400/15 text-orange-100',
    masked: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-100',
    dot: 'bg-orange-300',
  },
  CREDIT_CARD: {
    original: 'border-rose-300/45 bg-rose-400/15 text-rose-100',
    masked: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-100',
    dot: 'bg-rose-300',
  },
  IBAN: {
    original: 'border-violet-300/45 bg-violet-400/15 text-violet-100',
    masked: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-100',
    dot: 'bg-violet-300',
  },
  UK_NHS: {
    original: 'border-amber-300/45 bg-amber-400/15 text-amber-100',
    masked: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-100',
    dot: 'bg-amber-300',
  },
  DATE_TIME: {
    original: 'border-fuchsia-300/45 bg-fuchsia-400/15 text-fuchsia-100',
    masked: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-100',
    dot: 'bg-fuchsia-300',
  },
}

const patterns: Array<{ entityType: EntityType; regex: RegExp; confidence: number }> = [
  { entityType: 'EMAIL_ADDRESS', regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, confidence: 0.99 },
  { entityType: 'IBAN', regex: /\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]){11,30}\b/g, confidence: 0.96 },
  { entityType: 'PHONE_NUMBER', regex: /(?:\+44\s?)?(?:0|\(?0\)?)?7\d{3}\s?\d{3}\s?\d{3}\b/g, confidence: 0.93 },
  { entityType: 'CREDIT_CARD', regex: /\b(?:\d[ -]?){13,19}\b/g, confidence: 0.94 },
  { entityType: 'UK_NHS', regex: /\b\d{3}\s?\d{3}\s?\d{4}\b/g, confidence: 0.9 },
  { entityType: 'DATE_TIME', regex: /\b\d{1,2}\s+(?:Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|Sept|September|Oct|October|Nov|November|Dec|December)\s+\d{4}\b/gi, confidence: 0.86 },
]

const personStopWords = new Set([
  'Check',
  'Draft',
  'Email',
  'Summarize',
  'Summarise',
  'Call',
  'Before',
  'After',
])

function overlaps(candidate: Finding, findings: Finding[]) {
  return findings.some((finding) => candidate.start < finding.end && candidate.end > finding.start)
}

function detectFindings(text: string): Finding[] {
  const findings: Finding[] = []

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern.regex)) {
      if (typeof match.index !== 'number') {
        continue
      }

      const value = match[0]
      const candidate = {
        id: `${pattern.entityType}-${match.index}-${value}`,
        entityType: pattern.entityType,
        text: value,
        start: match.index,
        end: match.index + value.length,
        confidence: pattern.confidence,
      }

      if (!overlaps(candidate, findings)) {
        findings.push(candidate)
      }
    }
  }

  for (const match of text.matchAll(/(?=\b([A-Z][a-z]+)\s+([A-Z][a-z]+)\b)/g)) {
    if (typeof match.index !== 'number' || !match[1] || !match[2] || personStopWords.has(match[1])) {
      continue
    }

    const value = `${match[1]} ${match[2]}`
    const candidate = {
      id: `PERSON-${match.index}-${value}`,
      entityType: 'PERSON' as const,
      text: value,
      start: match.index,
      end: match.index + value.length,
      confidence: 0.87,
    }

    if (!overlaps(candidate, findings)) {
      findings.push(candidate)
    }
  }

  return findings.sort((a, b) => a.start - b.start)
}

function tokenForFinding(finding: Finding, reversible: boolean, index: number) {
  if (!reversible) {
    return `<${finding.entityType}>`
  }

  return `<${finding.entityType}_demo_${String(index + 1).padStart(2, '0')}>`
}

function maskLocally(text: string, reversible: boolean) {
  const findings = detectFindings(text)
  let maskedText = text

  findings
    .slice()
    .reverse()
    .forEach((finding, reverseIndex) => {
      const forwardIndex = findings.length - reverseIndex - 1
      maskedText = `${maskedText.slice(0, finding.start)}${tokenForFinding(finding, reversible, forwardIndex)}${maskedText.slice(finding.end)}`
    })

  return { maskedText, findings }
}

function tokenEntityType(token: string): EntityType {
  const normalized = token.replace(/[<>]/g, '')
  const matchingEntity = (Object.keys(entityLabels) as EntityType[])
    .sort((a, b) => b.length - a.length)
    .find((entityType) => normalized === entityType || normalized.startsWith(`${entityType}_`))

  if (matchingEntity) {
    return matchingEntity
  }

  return 'PERSON'
}

function detectTokens(text: string): TokenFinding[] {
  return Array.from(text.matchAll(/<[A-Z_]+(?:_[A-Za-z0-9-]+)?>/g)).map((match, index) => ({
    id: `token-${index}-${match.index ?? 0}`,
    entityType: tokenEntityType(match[0]),
    text: match[0],
    start: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }))
}

function renderHighlightedText(
  text: string,
  ranges: Array<Finding | TokenFinding>,
  tone: 'original' | 'masked'
) {
  if (ranges.length === 0) {
    return text
  }

  const segments: React.ReactNode[] = []
  let cursor = 0

  ranges.forEach((range) => {
    if (range.start > cursor) {
      segments.push(text.slice(cursor, range.start))
    }

    segments.push(
      <mark
        key={range.id}
        className={`rounded-md border px-1.5 py-0.5 leading-normal ${entityStyles[range.entityType][tone]}`}
      >
        {text.slice(range.start, range.end)}
      </mark>
    )
    cursor = range.end
  })

  if (cursor < text.length) {
    segments.push(text.slice(cursor))
  }

  return segments
}

function summarizeEntities(findings: Finding[]) {
  return findings.reduce<Record<string, number>>((summary, finding) => {
    const label = entityLabels[finding.entityType]
    summary[label] = (summary[label] ?? 0) + 1
    return summary
  }, {})
}

function shouldCallLiveApi() {
  return !['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)
}

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState<string>('')
  const [mode, setMode] = useState<MaskingMode>('irreversible')
  const [maskedText, setMaskedText] = useState('')
  const [source, setSource] = useState<ResultSource>('demo')
  const [statusText, setStatusText] = useState('Waiting for prompt')
  const [isLoading, setIsLoading] = useState(false)
  const [isInCooldown, setIsInCooldown] = useState(false)

  const localPreview = useMemo(() => maskLocally(prompt, mode === 'reversible'), [prompt, mode])
  const hasResult = maskedText.length > 0
  const visibleMaskedText = hasResult ? maskedText : ''
  const findings = hasResult ? localPreview.findings : []
  const tokens = useMemo(() => detectTokens(visibleMaskedText), [visibleMaskedText])
  const entitySummary = summarizeEntities(findings)
  const isOverLimit = prompt.length > MAX_PROMPT_LENGTH
  const canSubmit = prompt.trim().length > 0 && !isLoading && !isOverLimit && !isInCooldown

  async function runMasking() {
    if (!canSubmit) {
      return
    }

    setIsLoading(true)
    setStatusText('Masking prompt')
    setIsInCooldown(true)
    window.setTimeout(() => setIsInCooldown(false), REQUEST_COOLDOWN_MS)

    if (!shouldCallLiveApi()) {
      window.setTimeout(() => {
        setMaskedText(localPreview.maskedText)
        setSource('demo')
        setStatusText('Demo preview ready')
        setIsLoading(false)
      }, 300)
      return
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 8000)

    try {
      const response = await fetch(`${siteConfig.apiBaseUrl}/v1/shield/mask`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          reversible: mode === 'reversible',
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Mask request failed with ${response.status}`)
      }

      const payload = (await response.json()) as ApiMaskResponse
      setMaskedText(payload.masked_text || localPreview.maskedText)
      setSource(payload.masked_text ? 'live' : 'demo')
      setStatusText(payload.masked_text ? 'Masked by live API' : 'Demo preview ready')
    } catch {
      setMaskedText(localPreview.maskedText)
      setSource('demo')
      setStatusText('Demo preview ready')
    } finally {
      window.clearTimeout(timeout)
      setIsLoading(false)
    }
  }

  function resetPrompt() {
    setPrompt('')
    setMaskedText('')
    setSource('demo')
    setStatusText('Waiting for prompt')
  }

  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_6%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_88%_12%,rgba(249,115,22,0.14),transparent_24%)]" />
        <div className="container-custom relative z-10">
          <BackButton />

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[0.98] md:text-6xl">
                Try PII masking before your prompt reaches AI.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Paste a prompt, choose reversible or irreversible masking, and preview the sanitized output with entity labels and confidence scores.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#playground-demo" className="btn btn-cta justify-center px-8 py-4">
                  Try a sample
                  <Play className="h-5 w-5" />
                </Link>
                <Link href={siteConfig.signupUrl} className="btn btn-secondary justify-center px-8 py-4">
                  Get your free API key
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="rounded-[28px] border border-white/10 bg-background-secondary/80 p-5 shadow-2xl shadow-cyan-950/20"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <ShieldCheck className="h-5 w-5 text-primary-light" />
                  <span>{statusText}</span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400">
                  {hasResult ? (source === 'live' ? 'Live API' : 'Preview') : 'Not run yet'}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {Object.entries(entitySummary).map(([label, count]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-background/80 px-4 py-3">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-light">{label}</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{count}</div>
                  </div>
                ))}
                {findings.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-sm text-slate-400 sm:col-span-3">
                    Write your prompt or choose a sample, then press Mask prompt.
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="playground-demo" className="section bg-background-secondary">
        <div className="container-custom">
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[28px] border border-border bg-background p-5 md:p-6">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-white">Raw prompt</h2>
                  <p className="mt-2 text-sm text-slate-400">Input stays in your browser until you run the mask request.</p>
                </div>
                <div className="flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
                  {(['irreversible', 'reversible'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setMode(option)
                        setMaskedText('')
                        setStatusText('Ready to mask')
                      }}
                      className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                        mode === option ? 'bg-primary text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {option === 'irreversible' ? 'Irreversible' : 'Reversible'}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={prompt}
                onChange={(event) => {
                  setPrompt(event.target.value)
                  setMaskedText('')
                  setStatusText('Ready to mask')
                }}
                rows={10}
                maxLength={MAX_PROMPT_LENGTH + 200}
                className="mt-5 min-h-[260px] w-full resize-y rounded-2xl border border-white/10 bg-[#020617] p-4 font-mono text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-primary"
                placeholder="Write your prompt here, or choose a sample prompt below."
              />

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-5">
                  <span className={isOverLimit ? 'text-orange-300' : undefined}>
                    {prompt.length}/{MAX_PROMPT_LENGTH} recommended characters
                  </span>
                  <button type="button" onClick={resetPrompt} className="inline-flex items-center gap-2 text-primary-light transition hover:text-primary">
                    <RotateCcw className="h-4 w-4" />
                    Clear prompt
                  </button>
                </div>
                <button type="button" onClick={runMasking} disabled={!canSubmit} className="btn btn-cta justify-center px-7 py-3 disabled:cursor-not-allowed disabled:opacity-60">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Eraser className="h-5 w-5" />}
                  Mask prompt
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {samplePrompts.map((sample) => (
                  <button
                    key={sample.label}
                    type="button"
                    onClick={() => {
                      setPrompt(sample.value)
                      setMaskedText('')
                      setStatusText('Ready to mask')
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-primary/50 hover:text-white"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[28px] border border-primary/20 bg-background p-5 md:p-6">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-heading text-2xl font-semibold text-white">Detection view</h2>
                    <p className="mt-2 text-sm text-slate-400">Results appear after you run masking from the raw prompt panel.</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#020617] p-4">
                    <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-orange-300">
                      <Clipboard className="h-4 w-4" />
                      Original
                    </div>
                    <div className="min-h-[150px] whitespace-pre-wrap break-words font-mono text-sm leading-7 text-slate-200">
                      {hasResult ? renderHighlightedText(prompt, findings, 'original') : (
                        <span className="font-body text-sm leading-6 text-slate-500">
                          Write a prompt or choose a sample, then press Mask prompt.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-emerald-400/20 bg-[#020617] p-4">
                    <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
                      <LockKeyhole className="h-4 w-4" />
                      Sanitized
                    </div>
                    <div className="min-h-[150px] whitespace-pre-wrap break-words font-mono text-sm leading-7 text-slate-200">
                      {hasResult ? renderHighlightedText(visibleMaskedText, tokens, 'masked') : (
                        <span className="font-body text-sm leading-6 text-slate-500">
                          Sanitized output will appear here.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-background p-5 md:p-6">
                <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-heading text-2xl font-semibold text-white">Entities and confidence</h2>
                    <p className="mt-2 text-sm text-slate-400">Each detection is grouped by type so teams can review what was masked.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-light">
                    <Gauge className="h-3.5 w-3.5" />
                    {findings.length} findings
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {findings.map((finding) => (
                    <div key={finding.id} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 md:grid-cols-[150px_1fr_90px] md:items-center">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${entityStyles[finding.entityType].dot}`} />
                        <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
                          {entityLabels[finding.entityType]}
                        </span>
                      </div>
                      <div className="min-w-0 truncate font-mono text-sm text-slate-200">{finding.text}</div>
                      <div className="text-sm font-semibold text-primary-light">{Math.round(finding.confidence * 100)}%</div>
                    </div>
                  ))}
                  {findings.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-400">
                      Add an email, phone number, person name, card number, IBAN, or NHS number to see entity details.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="rounded-[30px] border border-primary/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96))] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-light">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="mt-5 max-w-xl font-heading text-3xl font-bold text-white md:text-4xl">
                  Like what you see? Take the same control into your own workflow.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Get a free API key to test NeutralAI with your application, browser workflow, or evaluation environment.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {['Mask before model calls', 'Review audit-safe output', 'Move to API keys when ready'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
                    <CheckCircle2 className="mb-3 h-5 w-5 text-primary-light" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={siteConfig.signupUrl} className="btn btn-cta justify-center px-8 py-4">
                Get your free API key
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="btn btn-secondary justify-center px-8 py-4">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
