import type { Metadata } from 'next'
import GuidancePage from '../GuidancePage'
import { guidanceEntries } from '../content'
import { siteConfig } from '../../site'

const entry = guidanceEntries.find((item) => item.slug === 'judiciary-ai-guidance')!

export const metadata: Metadata = {
  title: "Judiciary AI Guidance: Published to All the World",
  description: "The judiciary's AI guidance treats anything entered into a public AI chatbot as published to all the world - the clearest line in UK legal AI.",
  alternates: {
    canonical: '/compliance/judiciary-ai-guidance',
  },
  openGraph: {
    title: "Judiciary AI Guidance: Published to All the World",
    description: "The judiciary's AI guidance treats anything entered into a public AI chatbot as published to all the world - the clearest line in UK legal AI.",
    url: `${siteConfig.url}/compliance/judiciary-ai-guidance`,
  },
}

export default function JudiciaryAiGuidancePage() {
  return <GuidancePage entry={entry} />
}
