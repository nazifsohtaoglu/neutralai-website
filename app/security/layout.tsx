import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Overview',
  description:
    'Review NeutralAI security architecture for LLM data protection, including PII detection, AES-256-GCM tokenization, audit evidence, and gateway controls.',
  alternates: {
    canonical: '/security',
  },
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
