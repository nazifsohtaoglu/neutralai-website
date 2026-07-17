import type { Metadata } from 'next'
import AnswerPage from '../AnswerPage'
import { answerEntries } from '../content'
import { siteConfig } from '../../site'

const entry = answerEntries.find((item) => item.slug === 'uk-tribunal-chatgpt-client-data-ruling')!

export const metadata: Metadata = {
  title: "The UK Tribunal Ruling on ChatGPT and Client Data, Explained",
  description: "Munir v SSHD [2026] UKUT 81: a legal representative pasted client letters into ChatGPT, and the Upper Tribunal treated it as placing them in the public domain.",
  alternates: {
    canonical: '/answers/uk-tribunal-chatgpt-client-data-ruling',
  },
  openGraph: {
    title: "The UK Tribunal Ruling on ChatGPT and Client Data, Explained",
    description: "Munir v SSHD [2026] UKUT 81: a legal representative pasted client letters into ChatGPT, and the Upper Tribunal treated it as placing them in the public domain.",
    url: `${siteConfig.url}/answers/uk-tribunal-chatgpt-client-data-ruling`,
  },
}

export default function UkTribunalRulingPage() {
  return <AnswerPage entry={entry} />
}
