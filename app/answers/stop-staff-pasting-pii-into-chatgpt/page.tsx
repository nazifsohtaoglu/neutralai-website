import type { Metadata } from 'next'
import AnswerPage from '../AnswerPage'
import { answerEntries } from '../content'
import { siteConfig } from '../../site'

const entry = answerEntries.find((item) => item.slug === 'stop-staff-pasting-pii-into-chatgpt')!

export const metadata: Metadata = {
  title: "How to Stop Staff Pasting PII Into ChatGPT",
  description: "Policy and training fail under deadline pressure. The four options for stopping PII reaching ChatGPT - bans, training, enterprise contracts, and prompt-layer masking - compared honestly.",
  alternates: {
    canonical: '/answers/stop-staff-pasting-pii-into-chatgpt',
  },
  openGraph: {
    title: "How to Stop Staff Pasting PII Into ChatGPT",
    description: "Policy and training fail under deadline pressure. The four options for stopping PII reaching ChatGPT - bans, training, enterprise contracts, and prompt-layer masking - compared honestly.",
    url: `${siteConfig.url}/answers/stop-staff-pasting-pii-into-chatgpt`,
  },
}

export default function StopStaffPastingPiiPage() {
  return <AnswerPage entry={entry} />
}
