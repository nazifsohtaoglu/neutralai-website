import type { Metadata } from 'next'
import GuidancePage from '../GuidancePage'
import { guidanceEntries } from '../content'
import { siteConfig } from '../../site'

const entry = guidanceEntries.find((item) => item.slug === 'ico-generative-ai')!

export const metadata: Metadata = {
  title: "The ICO on Generative AI and Personal Data",
  description: "The ICO's consultation response and AI strategy: UK GDPR applies to AI prompts today, with a statutory AI code in development.",
  alternates: {
    canonical: '/compliance/ico-generative-ai',
  },
  openGraph: {
    title: "The ICO on Generative AI and Personal Data",
    description: "The ICO's consultation response and AI strategy: UK GDPR applies to AI prompts today, with a statutory AI code in development.",
    url: `${siteConfig.url}/compliance/ico-generative-ai`,
  },
}

export default function IcoGenerativeAiPage() {
  return <GuidancePage entry={entry} />
}
