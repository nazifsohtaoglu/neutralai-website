import type { Metadata } from 'next'
import AnswerPage from '../AnswerPage'
import { answerEntries } from '../content'
import { siteConfig } from '../../site'

const entry = answerEntries.find((item) => item.slug === 'dlp-for-llms-explained')!

export const metadata: Metadata = {
  title: "DLP for LLMs, Explained",
  description: "Traditional DLP watches files and email - the prompt box is a gap. What data loss prevention means for LLM workflows, and how mask-and-forward differs from block-and-flag.",
  alternates: {
    canonical: '/answers/dlp-for-llms-explained',
  },
  openGraph: {
    title: "DLP for LLMs, Explained",
    description: "Traditional DLP watches files and email - the prompt box is a gap. What data loss prevention means for LLM workflows, and how mask-and-forward differs from block-and-flag.",
    url: `${siteConfig.url}/answers/dlp-for-llms-explained`,
  },
}

export default function DlpForLlmsPage() {
  return <AnswerPage entry={entry} />
}
