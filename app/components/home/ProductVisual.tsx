'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import {
  rawPromptCharCount,
  rawPromptLines,
  renderPromptLines,
  sanitizedPromptCharCount,
  sanitizedPromptLines,
} from './promptAnimation'

export default function ProductVisual() {
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
