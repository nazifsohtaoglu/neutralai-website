import type { Metadata } from 'next'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'How NeutralAI detects, masks, and audits sensitive data before it reaches external AI models — the egress and ingress flow, policy actions, retention posture, detection pipeline, and deployment shapes.',
  alternates: {
    canonical: '/how-it-works',
  },
  openGraph: {
    title: 'How NeutralAI Works',
    description:
      'A control layer between your workflow and external models: detect and neutralize sensitive values on the way out, resolve them safely on the way back, and leave an auditable record of every event.',
    url: `${siteConfig.url}/how-it-works`,
  },
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
