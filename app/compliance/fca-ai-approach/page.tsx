import type { Metadata } from 'next'
import GuidancePage from '../GuidancePage'
import { guidanceEntries } from '../content'
import { siteConfig } from '../../site'

const entry = guidanceEntries.find((item) => item.slug === 'fca-ai-approach')!

export const metadata: Metadata = {
  title: "The FCA's AI Approach: Existing Rules Apply",
  description: "The FCA plans no AI-specific rulebook: Consumer Duty and SM&CR already cover AI use, and accountability sits with named senior managers.",
  alternates: {
    canonical: '/compliance/fca-ai-approach',
  },
  openGraph: {
    title: "The FCA's AI Approach: Existing Rules Apply",
    description: "The FCA plans no AI-specific rulebook: Consumer Duty and SM&CR already cover AI use, and accountability sits with named senior managers.",
    url: `${siteConfig.url}/compliance/fca-ai-approach`,
  },
}

export default function FcaAiApproachPage() {
  return <GuidancePage entry={entry} />
}
