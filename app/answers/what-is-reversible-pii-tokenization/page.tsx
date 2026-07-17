import type { Metadata } from 'next'
import AnswerPage from '../AnswerPage'
import { answerEntries } from '../content'
import { siteConfig } from '../../site'

const entry = answerEntries.find((item) => item.slug === 'what-is-reversible-pii-tokenization')!

export const metadata: Metadata = {
  title: "What Is Reversible PII Tokenization?",
  description: "Reversible PII tokenization replaces identifiers with placeholders before AI processing and restores them after - masking without losing the answer.",
  alternates: {
    canonical: '/answers/what-is-reversible-pii-tokenization',
  },
  openGraph: {
    title: "What Is Reversible PII Tokenization?",
    description: "Reversible PII tokenization replaces identifiers with placeholders before AI processing and restores them after - masking without losing the answer.",
    url: `${siteConfig.url}/answers/what-is-reversible-pii-tokenization`,
  },
}

export default function ReversiblePiiTokenizationPage() {
  return <AnswerPage entry={entry} />
}
