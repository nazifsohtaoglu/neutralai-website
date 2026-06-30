'use client'

import { useCallback, useId, useReducer } from 'react'
import { ArrowRight, Eye, EyeOff, RotateCcw, Sparkles } from 'lucide-react'
import { contactLinks } from '../../site'

// ---------------------------------------------------------------------------
// Client-side PII detection (marketing preview — regex heuristics only).
// Production uses Presidio + NER. Do not claim parity.
// ---------------------------------------------------------------------------

type EntityType =
  | 'EMAIL'
  | 'PHONE'
  | 'CREDIT_CARD'
  | 'IBAN'
  | 'NI_NUMBER'
  | 'POSTCODE'
  | 'IP_ADDRESS'
  | 'PERSON'

interface DetectedEntity {
  type: EntityType
  value: string
  start: number
  end: number
}

const PATTERNS: Array<{ type: EntityType; regex: RegExp }> = [
  {
    type: 'EMAIL',
    regex: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
  },
  {
    type: 'CREDIT_CARD',
    regex: /\b(?:\d[ \-]?){13,18}\b/g,
  },
  {
    type: 'IBAN',
    regex: /\b[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}(?:[A-Z0-9]{0,16})?\b/g,
  },
  {
    type: 'NI_NUMBER',
    regex: /\b[A-CEGHJ-PR-TW-Z]{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?[A-D]\b/gi,
  },
  {
    type: 'POSTCODE',
    regex: /\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/gi,
  },
  {
    type: 'IP_ADDRESS',
    regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  },
  {
    type: 'PHONE',
    regex: /(?:\+?\d[\d\s\-().]{8,}(?:\d))/g,
  },
]

const NAME_REGEX =
  /\b(?:(?:Mr|Mrs|Ms|Dr|Prof)\.?\s+)?([A-Z][a-z]{1,20})(?:\s+[A-Z][a-z]{1,20}){1,3}\b/g

const ENTITY_COLORS: Record<EntityType, { badge: string; highlight: string }> = {
  EMAIL:       { badge: 'bg-primary/20 text-primary-light border-primary/30',            highlight: 'bg-primary/15 border-b border-primary/40' },
  PHONE:       { badge: 'bg-secondary/20 text-secondary-light border-secondary/30',      highlight: 'bg-secondary/15 border-b border-secondary/40' },
  CREDIT_CARD: { badge: 'bg-accent-cta/20 text-[#fdba74] border-accent-cta/30',         highlight: 'bg-accent-cta/10 border-b border-accent-cta/40' },
  IBAN:        { badge: 'bg-accent-cta/20 text-[#fdba74] border-accent-cta/30',         highlight: 'bg-accent-cta/10 border-b border-accent-cta/40' },
  NI_NUMBER:   { badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',              highlight: 'bg-rose-500/10 border-b border-rose-500/40' },
  POSTCODE:    { badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',            highlight: 'bg-amber-500/10 border-b border-amber-500/40' },
  IP_ADDRESS:  { badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30',        highlight: 'bg-violet-500/10 border-b border-violet-500/40' },
  PERSON:      { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',     highlight: 'bg-emerald-500/10 border-b border-emerald-500/40' },
}

function detectEntities(text: string): DetectedEntity[] {
  const raw: DetectedEntity[] = []

  for (const { type, regex } of PATTERNS) {
    regex.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
      if (type === 'CREDIT_CARD') {
        const digits = match[0].replace(/\D/g, '')
        if (digits.length < 13) continue
      }
      if (type === 'PHONE') {
        const digits = match[0].replace(/\D/g, '')
        if (digits.length < 10) continue
      }
      raw.push({ type, value: match[0], start: match.index, end: match.index + match[0].length })
    }
  }

  const sorted = raw.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start))
  const merged: DetectedEntity[] = []
  for (const entity of sorted) {
    const last = merged[merged.length - 1]
    if (last && entity.start < last.end) continue
    merged.push(entity)
  }

  // Collect non-matched ranges for name detection
  const nonMatchedRanges: Array<[number, number]> = []
  let cursor = 0
  for (const e of merged) {
    if (cursor < e.start) nonMatchedRanges.push([cursor, e.start])
    cursor = e.end
  }
  if (cursor < text.length) nonMatchedRanges.push([cursor, text.length])

  const nameEntities: DetectedEntity[] = []
  for (const [rangeStart, rangeEnd] of nonMatchedRanges) {
    const slice = text.slice(rangeStart, rangeEnd)
    NAME_REGEX.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = NAME_REGEX.exec(slice)) !== null) {
      nameEntities.push({
        type: 'PERSON',
        value: m[0],
        start: rangeStart + m.index,
        end: rangeStart + m.index + m[0].length,
      })
    }
  }

  const all = [...merged, ...nameEntities].sort((a, b) => a.start - b.start)
  const final: DetectedEntity[] = []
  for (const e of all) {
    const last = final[final.length - 1]
    if (last && e.start < last.end) continue
    final.push(e)
  }
  return final
}

function buildMasked(text: string, entities: DetectedEntity[]): string {
  let result = ''
  let cursor = 0
  for (const entity of entities) {
    result += text.slice(cursor, entity.start)
    result += `<${entity.type}>`
    cursor = entity.end
  }
  result += text.slice(cursor)
  return result
}

function buildSegments(
  text: string,
  entities: DetectedEntity[],
): Array<{ text: string; entity?: DetectedEntity }> {
  const segments: Array<{ text: string; entity?: DetectedEntity }> = []
  let cursor = 0
  for (const entity of entities) {
    if (cursor < entity.start) segments.push({ text: text.slice(cursor, entity.start) })
    segments.push({ text: text.slice(entity.start, entity.end), entity })
    cursor = entity.end
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) })
  return segments
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const DEFAULT_TEXT =
  "Hi, I'm John Doe, email john.doe@acme.com, card 4111 1111 1111 1111, NI number AB 12 34 56 C, phone +44 7700 900 123."

type State = { text: string; showHighlights: boolean }
type Action = { type: 'SET_TEXT'; text: string } | { type: 'RESET' } | { type: 'TOGGLE_HIGHLIGHTS' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TEXT':          return { ...state, text: action.text }
    case 'RESET':             return { ...state, text: DEFAULT_TEXT }
    case 'TOGGLE_HIGHLIGHTS': return { ...state, showHighlights: !state.showHighlights }
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LiveMaskingDemo() {
  const inputId = useId()
  const [state, dispatch] = useReducer(reducer, { text: DEFAULT_TEXT, showHighlights: true })

  const entities = detectEntities(state.text)
  const maskedOutput = buildMasked(state.text, entities)
  const segments = buildSegments(state.text, entities)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_TEXT', text: e.target.value })
  }, [])

  const entitySummary = entities.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] ?? 0) + 1
    return acc
  }, {})

  return (
    <section id="live-demo" className="section" aria-label="Interactive live masking demo">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.97)),radial-gradient(circle_at_14%_12%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_88%_18%,rgba(249,115,22,0.14),transparent_24%)] p-6 shadow-[0_28px_76px_rgba(2,8,23,0.46)] md:p-8">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden="true" />

          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent-success animate-pulse" aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">
                  Live Preview — No Signup
                </p>
              </div>
              <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
                See masking <span className="gradient-text-warm">in action</span>
              </h2>
              <p className="mt-2 max-w-xl text-slate-300">
                Type or paste any text containing sensitive data below. Watch PII get masked in
                real time — no account, no network call.
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
              <a
                href="/playground"
                className="btn btn-cta whitespace-nowrap"
                data-analytics-event="cta_click"
                data-analytics-label="Try Full Playground"
                data-analytics-placement="homepage_live_demo"
              >
                Try Full Playground
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={contactLinks.demo}
                className="btn btn-secondary whitespace-nowrap"
                data-analytics-event="cta_click"
                data-analytics-label="Book Demo"
                data-analytics-placement="homepage_live_demo"
              >
                Book Demo
              </a>
            </div>
          </div>

          {/* Panels */}
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {/* Input */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={inputId}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400"
                >
                  Input — Your Text
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'TOGGLE_HIGHLIGHTS' })}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300 transition hover:border-primary/30 hover:text-primary-light"
                    aria-pressed={state.showHighlights}
                    aria-label={state.showHighlights ? 'Hide entity highlights' : 'Show entity highlights'}
                  >
                    {state.showHighlights ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    Highlights
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300 transition hover:border-primary/30 hover:text-primary-light"
                    aria-label="Reset to example text"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                </div>
              </div>

              <div className="relative">
                {/* Visual highlight overlay */}
                {state.showHighlights && entities.length > 0 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px] p-4 font-mono text-sm leading-6 whitespace-pre-wrap break-words text-transparent"
                  >
                    {segments.map((seg, i) =>
                      seg.entity ? (
                        <mark
                          key={i}
                          className={`rounded px-0.5 text-transparent ${ENTITY_COLORS[seg.entity.type].highlight}`}
                        >
                          {seg.text}
                        </mark>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    )}
                  </div>
                )}

                <textarea
                  id={inputId}
                  value={state.text}
                  onChange={handleChange}
                  rows={6}
                  spellCheck={false}
                  className="relative w-full resize-none rounded-[18px] border border-white/10 bg-background-secondary/70 p-4 font-mono text-sm leading-6 text-slate-100 placeholder-slate-500 outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                  placeholder="Type or paste text with PII here…"
                  aria-label="Input text to mask"
                  aria-describedby="demo-disclaimer"
                />
              </div>

              {/* Entity badge summary */}
              <div
                className="flex min-h-[2rem] flex-wrap gap-2"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`${entities.length} PII entities detected`}
              >
                {Object.entries(entitySummary).map(([type, count]) => (
                  <span
                    key={type}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${ENTITY_COLORS[type as EntityType].badge}`}
                  >
                    {count}× {type}
                  </span>
                ))}
                {entities.length === 0 && (
                  <span className="text-[11px] text-slate-500">No PII detected yet — try typing a name or email</span>
                )}
              </div>
            </div>

            {/* Masked output */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">
                  Masked Output
                </p>
                <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-light">
                  <Sparkles className="h-3 w-3" />
                  {entities.length} entit{entities.length === 1 ? 'y' : 'ies'} masked
                </span>
              </div>

              <div
                role="region"
                aria-label="Masked output text"
                aria-live="polite"
                aria-atomic="true"
                className="min-h-[9.5rem] w-full rounded-[18px] border border-primary/20 bg-[rgba(8,145,178,0.06)] p-4 font-mono text-sm leading-6 text-slate-100 whitespace-pre-wrap break-words"
              >
                {maskedOutput || (
                  <span className="text-slate-500">Masked text will appear here…</span>
                )}
              </div>

              {/* Entity detail list */}
              {entities.length > 0 && (
                <div className="rounded-[16px] border border-accent-cta/20 bg-[rgba(249,115,22,0.06)] p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#fdba74]">
                    Detected &amp; masked
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {entities.map((e, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        <span
                          className={`inline-block shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] ${ENTITY_COLORS[e.type].badge}`}
                        >
                          {e.type}
                        </span>
                        <span className="truncate text-slate-400 font-mono">&ldquo;{e.value}&rdquo;</span>
                        <span className="shrink-0 text-slate-500">→</span>
                        <code className="shrink-0 rounded bg-primary/10 px-1 text-primary-light text-[10px]">
                          &lt;{e.type}&gt;
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <p
            id="demo-disclaimer"
            className="mt-5 text-center text-xs text-slate-500"
          >
            Live preview uses client-side regex heuristics only.{' '}
            <span className="text-slate-400">
              The gateway uses Presidio + NER for production-grade detection.
            </span>{' '}
            <a
              href="/playground"
              className="text-primary-light underline-offset-2 hover:underline"
              data-analytics-event="cta_click"
              data-analytics-label="Try Full Playground (disclaimer)"
              data-analytics-placement="homepage_live_demo_footer"
            >
              Try the full playground
            </a>{' '}
            for server-side accuracy.
          </p>
        </div>
      </div>
    </section>
  )
}
