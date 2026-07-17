import type { Metadata } from 'next'
import GuidancePage from '../GuidancePage'
import { guidanceEntries } from '../content'
import { siteConfig } from '../../site'

const entry = guidanceEntries.find((item) => item.slug === 'sra-ai-risk-outlook')!

export const metadata: Metadata = {
  title: "SRA AI Risk Outlook, Explained",
  description: "What the SRA's Risk Outlook report on AI in the legal market actually says: adoption is expected, the risk is adopting without controls.",
  alternates: {
    canonical: '/compliance/sra-ai-risk-outlook',
  },
  openGraph: {
    title: "SRA AI Risk Outlook, Explained",
    description: "What the SRA's Risk Outlook report on AI in the legal market actually says: adoption is expected, the risk is adopting without controls.",
    url: `${siteConfig.url}/compliance/sra-ai-risk-outlook`,
  },
}

export default function SraAiRiskOutlookPage() {
  return <GuidancePage entry={entry} />
}
