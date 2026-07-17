import type { Metadata } from 'next'
import AnswerPage from '../AnswerPage'
import { answerEntries } from '../content'
import { siteConfig } from '../../site'

const entry = answerEntries.find((item) => item.slug === 'can-law-firms-use-chatgpt-with-client-data')!

export const metadata: Metadata = {
  title: "Can Law Firms Use ChatGPT With Client Data?",
  description: "What UK guidance and the Upper Tribunal actually say about law firms using ChatGPT with client data - and the technical control that changes the answer.",
  alternates: {
    canonical: '/answers/can-law-firms-use-chatgpt-with-client-data',
  },
  openGraph: {
    title: "Can Law Firms Use ChatGPT With Client Data?",
    description: "What UK guidance and the Upper Tribunal actually say about law firms using ChatGPT with client data - and the technical control that changes the answer.",
    url: `${siteConfig.url}/answers/can-law-firms-use-chatgpt-with-client-data`,
  },
}

export default function CanLawFirmsUseChatgptPage() {
  return <AnswerPage entry={entry} />
}
