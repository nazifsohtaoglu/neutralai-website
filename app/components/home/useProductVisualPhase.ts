import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { rawPromptCharCount, sanitizedPromptCharCount } from './promptAnimation'

type Phase = 'typingRaw' | 'highlightRaw' | 'sending' | 'typingSanitized' | 'audit' | 'pauseSanitized'

export function useProductVisualPhase() {
  const [phase, setPhase] = useState<Phase>('typingRaw')
  const [rawTypedChars, setRawTypedChars] = useState(0)
  const [sanitizedTypedChars, setSanitizedTypedChars] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const phaseOrder = ['Detect', 'Mask', 'Route', 'Audit'] as const

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

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
          setPhase('audit')
        }, 700)
      }
    }

    if (phase === 'audit') {
      timer = setTimeout(() => {
        setPhase('pauseSanitized')
      }, 1700)
    }

    if (phase === 'pauseSanitized') {
      timer = setTimeout(() => {
        setRawTypedChars(0)
        setSanitizedTypedChars(0)
        setPhase('typingRaw')
      }, 1100)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [phase, rawTypedChars, sanitizedTypedChars, shouldReduceMotion])

  const displayPhase = shouldReduceMotion ? 'pauseSanitized' : phase
  const displayRawTypedChars = shouldReduceMotion ? rawPromptCharCount : rawTypedChars
  const displaySanitizedTypedChars = shouldReduceMotion
    ? sanitizedPromptCharCount
    : sanitizedTypedChars
  const rawHighlightVisible =
    shouldReduceMotion || (displayPhase !== 'typingRaw' && displayRawTypedChars === rawPromptCharCount)
  const showFlights = !shouldReduceMotion && displayPhase === 'sending'
  const rawPanelActive =
    !shouldReduceMotion &&
    (displayPhase === 'typingRaw' || displayPhase === 'highlightRaw' || displayPhase === 'sending')
  const sanitizedPanelActive =
    !shouldReduceMotion &&
    (displayPhase === 'typingSanitized' || displayPhase === 'audit' || displayPhase === 'pauseSanitized')
  const auditVisible =
    shouldReduceMotion || displayPhase === 'audit' || displayPhase === 'pauseSanitized'
  const beamDotAnimate = shouldReduceMotion
    ? { x: 0, opacity: 0.2 }
    : showFlights
      ? { x: ['-64%', '64%'], opacity: [0.35, 1, 0.35] }
      : { x: '-64%', opacity: 0.2 }
  const beamDotTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 1.1, repeat: showFlights ? Infinity : 0, ease: 'easeInOut' as const }
  const activePhaseIndex = shouldReduceMotion
    ? 3
    : phase === 'typingRaw' || phase === 'highlightRaw'
      ? 0
      : phase === 'sending'
        ? 1
        : phase === 'typingSanitized'
          ? 2
          : 3

  return {
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
  }
}
