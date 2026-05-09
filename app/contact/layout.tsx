import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact NeutralAI',
  description:
    'Contact NeutralAI to discuss AI compliance gateway deployment, PII masking for LLM workflows, browser extension rollout, and security review needs.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
