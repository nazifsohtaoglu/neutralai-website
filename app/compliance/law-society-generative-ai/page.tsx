import type { Metadata } from 'next'
import GuidancePage from '../GuidancePage'
import { guidanceEntries } from '../content'
import { siteConfig } from '../../site'

const entry = guidanceEntries.find((item) => item.slug === 'law-society-generative-ai')!

export const metadata: Metadata = {
  title: "Law Society Generative AI Guidance for Law Firms",
  description: "What the Law Society's 'Generative AI - the essentials' guide says about client data and public AI tools, and how firms can meet it with technical controls.",
  alternates: {
    canonical: '/compliance/law-society-generative-ai',
  },
  openGraph: {
    title: "Law Society Generative AI Guidance for Law Firms",
    description: "What the Law Society's 'Generative AI - the essentials' guide says about client data and public AI tools, and how firms can meet it with technical controls.",
    url: `${siteConfig.url}/compliance/law-society-generative-ai`,
  },
}

export default function LawSocietyGenerativeAiPage() {
  return <GuidancePage entry={entry} />
}
