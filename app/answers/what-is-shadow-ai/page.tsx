import type { Metadata } from 'next'
import AnswerPage from '../AnswerPage'
import { answerEntries } from '../content'
import { siteConfig } from '../../site'

const entry = answerEntries.find((item) => item.slug === 'what-is-shadow-ai')!

export const metadata: Metadata = {
  title: "What Is Shadow AI?",
  description: "Shadow AI is staff using AI tools outside sanctioned channels - invisible to IT and compliance. Why bans make it worse and how to measure your actual exposure.",
  alternates: {
    canonical: '/answers/what-is-shadow-ai',
  },
  openGraph: {
    title: "What Is Shadow AI?",
    description: "Shadow AI is staff using AI tools outside sanctioned channels - invisible to IT and compliance. Why bans make it worse and how to measure your actual exposure.",
    url: `${siteConfig.url}/answers/what-is-shadow-ai`,
  },
}

export default function WhatIsShadowAiPage() {
  return <AnswerPage entry={entry} />
}
