import type { Metadata } from 'next'
import GuidancePage from '../GuidancePage'
import { guidanceEntries } from '../content'
import { siteConfig } from '../../site'

const entry = guidanceEntries.find((item) => item.slug === 'data-use-and-access-act')!

export const metadata: Metadata = {
  title: "DUAA 2025: The Law That Actually Governs Your AI Use",
  description: "No UK AI Act exists - the Data (Use and Access) Act 2025 amends the data protection rules that govern AI use, with main provisions in force since February 2026.",
  alternates: {
    canonical: '/compliance/data-use-and-access-act',
  },
  openGraph: {
    title: "DUAA 2025: The Law That Actually Governs Your AI Use",
    description: "No UK AI Act exists - the Data (Use and Access) Act 2025 amends the data protection rules that govern AI use, with main provisions in force since February 2026.",
    url: `${siteConfig.url}/compliance/data-use-and-access-act`,
  },
}

export default function DataUseAndAccessActPage() {
  return <GuidancePage entry={entry} />
}
