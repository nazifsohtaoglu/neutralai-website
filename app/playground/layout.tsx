import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PII Masking Playground',
  description:
    'Try NeutralAI PII masking in a browser playground and see how sensitive prompt data is tokenized before it reaches AI providers.',
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    title: 'NeutralAI PII Masking Playground',
    description:
      'Paste a prompt, mask sensitive data, and preview PII-safe output with entity labels and confidence scores.',
    url: '/playground',
  },
}

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
