'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, FileCheck2 } from 'lucide-react'
import { rawPromptLines, renderPromptLines, sanitizedPromptLines } from './promptAnimation'
import { useProductVisualPhase } from './useProductVisualPhase'

export default function ProductVisual() {
  const {
    shouldReduceMotion,
    phaseOrder,
    activePhaseIndex,
    displayPhase,
    displayRawTypedChars,
    displaySanitizedTypedChars,
    rawHighlightVisible,
    showFlights,
    rawPanelActive,
    sanitizedPanelActive,
    auditVisible,
    beamDotAnimate,
    beamDotTransition,
  } = useProductVisualPhase()

  return (
    <div className="signal-simple-shell rounded-[28px] p-3 sm:p-4 md:p-6 xl:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3 md:pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">Live Narrative</p>
          <h2 className="mt-2 font-heading text-xl font-semibold sm:text-2xl">
            How NeutralAI works in one view
          </h2>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-light">
          {shouldReduceMotion ? 'Reduced motion mode' : 'api.neutralai.co.uk'}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 md:mt-4 md:gap-3">
        {phaseOrder.map((step, index) => (
          <div
            key={step}
            className={`rounded-xl border px-2.5 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px] ${
              index <= activePhaseIndex
                ? 'border-primary/40 bg-primary/10 text-primary-light'
                : 'border-white/10 bg-white/[0.02] text-slate-400'
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="relative mt-4 overflow-hidden md:mt-6">
        {!shouldReduceMotion ? (
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
        ) : null}

        <div className="grid gap-2 sm:gap-3 md:grid-cols-[minmax(0,1fr)_118px_minmax(0,1.16fr)] md:items-stretch md:gap-3 xl:grid-cols-[minmax(0,1.03fr)_132px_minmax(0,1.2fr)] xl:gap-4">
          <div
            className={`grid min-w-0 grid-rows-[auto_1fr] rounded-[20px] border p-2.5 transition-all duration-500 sm:p-3 md:rounded-[22px] md:p-4 ${
              rawPanelActive
                ? 'border-red-400/35 bg-red-950/20 ring-1 ring-red-300/30'
                : 'border-red-500/20 bg-red-950/10'
            }`}
          >
            <p className="text-sm font-semibold text-slate-100">Raw input</p>
            <div className="prompt-editor-shell mt-2 min-w-0 font-mono text-xs text-slate-300 sm:mt-3 sm:text-sm md:mt-4 md:text-[15px]">
              <div className="mb-3 flex gap-2 md:mb-4">
                <span className="h-2 w-2 rounded-full bg-slate-700 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-slate-700 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-slate-700 sm:h-2.5 sm:w-2.5" />
              </div>
              <div className="space-y-2.5 leading-6 sm:space-y-3 sm:leading-7 md:leading-8">
                {renderPromptLines({
                  lines: rawPromptLines,
                  typedChars: displayRawTypedChars,
                  highlightTokens: rawHighlightVisible,
                  showCaret: !shouldReduceMotion && displayPhase === 'typingRaw',
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-1 sm:py-2 md:py-0">
            <div className="beam-wrapper">
              <div className="beam-line" />
              <motion.div
                animate={beamDotAnimate}
                transition={beamDotTransition}
                className="beam-dot"
              />
              <motion.div
                animate={
                  showFlights
                    ? {
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          '0 0 0 rgba(34,211,238,0.0)',
                          '0 0 30px rgba(34,211,238,0.2)',
                          '0 0 0 rgba(34,211,238,0.0)',
                        ],
                      }
                    : { scale: 1 }
                }
                transition={{ duration: 1.1, repeat: showFlights ? Infinity : 0, ease: 'easeInOut' }}
                className="gateway-core"
              >
                <ShieldCheck className="h-7 w-7 text-primary-light md:h-8 md:w-8" />
                <p className="mt-2 hidden font-heading text-sm font-semibold text-slate-50 sm:block md:mt-3 md:text-base">
                  NeutralAI
                </p>
              </motion.div>
            </div>
          </div>

          <div
            className={`grid min-w-0 grid-rows-[auto_1fr] rounded-[20px] border p-2.5 transition-all duration-500 sm:p-3 md:rounded-[22px] md:p-4 ${
              sanitizedPanelActive
                ? 'border-emerald-400/35 bg-emerald-950/22 ring-1 ring-emerald-300/30'
                : 'border-emerald-500/20 bg-emerald-950/10'
            }`}
          >
            <p className="text-sm font-semibold text-slate-100">Sanitized prompt</p>
            <div className="prompt-editor-shell prompt-editor-shell-safe mt-2 min-w-0 font-mono text-xs text-slate-300 sm:mt-3 sm:text-sm md:mt-4 md:text-[15px]">
              <div className="mb-3 flex gap-2 md:mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-800/70 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-emerald-800/70 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-emerald-800/70 sm:h-2.5 sm:w-2.5" />
              </div>
              <div className="space-y-2.5 leading-6 sm:space-y-3 sm:leading-7 md:leading-8">
                {renderPromptLines({
                  lines: sanitizedPromptLines,
                  typedChars: displaySanitizedTypedChars,
                  highlightTokens: true,
                  showCaret: !shouldReduceMotion && displayPhase === 'typingSanitized',
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit / evidence beat — completes the Detect → Mask → Route → Audit story */}
      <motion.div
        initial={false}
        animate={auditVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-3 flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-950/20 px-3.5 py-3 md:mt-4 md:px-4"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10">
          <FileCheck2 className="h-5 w-5 text-emerald-300" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-100">Audit evidence recorded</p>
          <p className="truncate font-mono text-[11px] text-emerald-300/90 sm:text-xs">
            3 entities tokenized · policy PII-Mask-v3 · export-ready
          </p>
        </div>
      </motion.div>
    </div>
  )
}
