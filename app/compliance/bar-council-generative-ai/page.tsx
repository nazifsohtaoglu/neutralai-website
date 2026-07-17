import type { Metadata } from 'next'
import GuidancePage from '../GuidancePage'
import { guidanceEntries } from '../content'
import { siteConfig } from '../../site'

const entry = guidanceEntries.find((item) => item.slug === 'bar-council-generative-ai')!

export const metadata: Metadata = {
  title: "Bar Council ChatGPT and LLM Considerations, Explained",
  description: "The Bar Council's considerations for using ChatGPT and LLM-based tools: extreme vigilance with privileged information and no personal data in prompts.",
  alternates: {
    canonical: '/compliance/bar-council-generative-ai',
  },
  openGraph: {
    title: "Bar Council ChatGPT and LLM Considerations, Explained",
    description: "The Bar Council's considerations for using ChatGPT and LLM-based tools: extreme vigilance with privileged information and no personal data in prompts.",
    url: `${siteConfig.url}/compliance/bar-council-generative-ai`,
  },
}

export default function BarCouncilGenerativeAiPage() {
  return <GuidancePage entry={entry} />
}
