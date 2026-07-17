import type { Metadata } from 'next'
import AnswerPage from '../AnswerPage'
import { answerEntries } from '../content'
import { siteConfig } from '../../site'

const entry = answerEntries.find((item) => item.slug === 'does-the-eu-ai-act-apply-to-uk-firms')!

export const metadata: Metadata = {
  title: "Does the EU AI Act Apply to UK Firms?",
  description: "Merely using ChatGPT does not bring a UK firm under the EU AI Act - but two scope triggers can. The territorial rules, the staged timeline, and what governs UK firms instead.",
  alternates: {
    canonical: '/answers/does-the-eu-ai-act-apply-to-uk-firms',
  },
  openGraph: {
    title: "Does the EU AI Act Apply to UK Firms?",
    description: "Merely using ChatGPT does not bring a UK firm under the EU AI Act - but two scope triggers can. The territorial rules, the staged timeline, and what governs UK firms instead.",
    url: `${siteConfig.url}/answers/does-the-eu-ai-act-apply-to-uk-firms`,
  },
}

export default function EuAiActUkFirmsPage() {
  return <AnswerPage entry={entry} />
}
