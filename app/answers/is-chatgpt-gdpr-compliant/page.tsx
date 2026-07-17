import type { Metadata } from 'next'
import AnswerPage from '../AnswerPage'
import { answerEntries } from '../content'
import { siteConfig } from '../../site'

const entry = answerEntries.find((item) => item.slug === 'is-chatgpt-gdpr-compliant')!

export const metadata: Metadata = {
  title: "Is ChatGPT GDPR Compliant?",
  description: "A tool cannot be 'GDPR compliant' by itself - compliance belongs to your processing. What OpenAI actually commits to on training, retention, and DPAs, tier by tier.",
  alternates: {
    canonical: '/answers/is-chatgpt-gdpr-compliant',
  },
  openGraph: {
    title: "Is ChatGPT GDPR Compliant?",
    description: "A tool cannot be 'GDPR compliant' by itself - compliance belongs to your processing. What OpenAI actually commits to on training, retention, and DPAs, tier by tier.",
    url: `${siteConfig.url}/answers/is-chatgpt-gdpr-compliant`,
  },
}

export default function IsChatgptGdprCompliantPage() {
  return <AnswerPage entry={entry} />
}
