import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Braces,
  CheckCircle2,
  Code2,
  KeyRound,
  Layers3,
  PackageCheck,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react'
import { siteConfig } from '../site'

export const metadata: Metadata = {
  title: 'Developers',
  description:
    'Build with NeutralAI Gateway using the masking API, API-key authentication, SDK package roadmap, and integration examples for regulated AI workflows.',
  alternates: {
    canonical: '/developers',
  },
  openGraph: {
    title: 'NeutralAI Developers',
    description:
      'Quickstart guides, API reference links, SDK status, and integration patterns for masking sensitive data before AI prompt egress.',
    url: `${siteConfig.url}/developers`,
  },
}

const quickstartSteps = [
  {
    label: 'Get an API key',
    text: 'Create a sandbox account and generate a scoped API key for server-side calls.',
  },
  {
    label: 'Call the masking endpoint',
    text: 'Send prompt text to the gateway with an x-api-key header. Keep keys out of browsers and public repos.',
  },
  {
    label: 'Forward sanitized text',
    text: 'Use the masked output in your LLM request, workflow, or internal review process.',
  },
] as const

const apiQuickstart = `curl -X POST "${siteConfig.apiBaseUrl}/v1/shield/mask" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: nai_live_your_key" \\
  -d '{
    "prompt": "My email is john@acme.com",
    "reversible": true
  }'`

const apiResponse = `{
  "status": "ok",
  "masked_text": "My email is <EMAIL_ADDRESS_demo_01>"
}`

const pythonPreview = `from neutralai_sdk import NeutralAIClient

client = NeutralAIClient(
    base_url="${siteConfig.apiBaseUrl}",
    api_key="nai_live_your_key",
)

result = client.mask(
    "My email is john@acme.com",
    reversible=True,
)

print(result.masked_text)`

const nodePreview = `import { NeutralAIClient } from "neutralai-node-sdk";

const client = new NeutralAIClient({
  baseUrl: "${siteConfig.apiBaseUrl}",
  apiKey: "nai_live_your_key",
});

const result = await client.mask({
  prompt: "My email is john@acme.com",
  reversible: true,
});

console.log(result.maskedText);`

const integrations = [
  {
    icon: Layers3,
    title: 'LangChain integration',
    text: 'Mask user or document context before it enters a chain, then pass sanitized text into the model step.',
  },
  {
    icon: Braces,
    title: 'OpenAI SDK wrapper',
    text: 'Wrap chat completion calls so sensitive fields are removed before requests leave your trust boundary.',
  },
  {
    icon: ShieldCheck,
    title: 'Browser extension',
    text: 'Use the managed extension path for browser-based AI usage where teams need policy before prompt egress.',
  },
  {
    icon: TerminalSquare,
    title: 'Direct API',
    text: 'Call the masking endpoint from backend services, internal tools, and agent workflows using API-key auth.',
  },
] as const

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050814]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">{label}</span>
        <Code2 className="h-4 w-4 text-primary-light" />
      </div>
      <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words p-4 text-sm leading-7 text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function DevelopersPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(249,115,22,0.14),transparent_24%)]" />

        <div className="container-custom relative z-10">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
                <TerminalSquare className="h-3.5 w-3.5" />
                Developers
              </div>
              <h1 className="mt-5 font-heading text-5xl font-bold md:text-7xl">
                Mask sensitive data before your AI request leaves.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Use NeutralAI Gateway as a server-side control point for prompt masking, API-key authenticated calls, and integration patterns that fit regulated AI workflows.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={siteConfig.signupUrl}
                  className="btn btn-cta w-full px-6 py-4 sm:w-auto"
                  data-analytics-event="CTA Click"
                  data-analytics-label="Get your free API key"
                  data-analytics-placement="developers_hero"
                >
                  Get your free API key
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`${siteConfig.apiBaseUrl}/docs`} className="btn btn-secondary w-full px-6 py-4 sm:w-auto">
                  API reference
                  <BookOpen className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="min-w-0 rounded-[28px] border border-white/10 bg-background-secondary/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.36)]">
              <CodeBlock label="Mask request" code={apiQuickstart} />
              <div className="mt-4">
                <CodeBlock label="Response" code={apiResponse} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary/40">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Quickstart</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Three steps to a masked prompt.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {quickstartSteps.map((step, index) => (
              <div key={step.label} className="rounded-[24px] border border-white/10 bg-background-secondary p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-mono text-sm font-bold text-primary-light">
                  {index + 1}
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-white">{step.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">SDKs</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Python and Node SDKs are prepared for publication.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                The gateway repo contains Python and Node SDK clients. Public package publication is still in progress, so this page keeps install guidance API-first until the registry release is confirmed.
              </p>
              <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
                Public package names are reserved, but registry install commands are intentionally withheld until publication checks pass.
              </div>
            </div>

            <div className="grid min-w-0 gap-4">
              <div className="min-w-0 rounded-[24px] border border-white/10 bg-background-secondary p-5">
                <div className="mb-4 flex items-center gap-3">
                  <PackageCheck className="h-5 w-5 text-primary-light" />
                  <h3 className="font-heading text-xl font-semibold">Python preview</h3>
                </div>
                <CodeBlock label="Python client shape" code={pythonPreview} />
              </div>
              <div className="min-w-0 rounded-[24px] border border-white/10 bg-background-secondary p-5">
                <div className="mb-4 flex items-center gap-3">
                  <PackageCheck className="h-5 w-5 text-primary-light" />
                  <h3 className="font-heading text-xl font-semibold">Node preview</h3>
                </div>
                <CodeBlock label="Node client shape" code={nodePreview} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary/40">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">Authentication</p>
              <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Keep API keys server-side.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                API calls use the <code className="rounded bg-white/10 px-1.5 py-0.5 text-primary-light">x-api-key</code> header. Treat keys as backend secrets, rotate them through the app, and avoid logging prompts or credentials.
              </p>
              <Link href={siteConfig.signupUrl} className="btn btn-cta mt-8 w-full px-6 py-4 sm:w-auto">
                Get your free API key
                <KeyRound className="h-4 w-4" />
              </Link>
            </div>
            <div className="min-w-0 rounded-[28px] border border-white/10 bg-background-secondary p-6">
              <h3 className="font-heading text-2xl font-semibold">Integration examples</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {integrations.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <item.icon className="h-6 w-6 text-primary-light" />
                    <h4 className="mt-4 font-heading text-lg font-semibold text-white">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="rounded-[28px] border border-primary/20 bg-[linear-gradient(135deg,rgba(6,182,212,0.16),rgba(15,23,42,0.95)_42%,rgba(249,115,22,0.13))] p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary-light">
                  <CheckCircle2 className="h-5 w-5" />
                  Ready for a sandbox key
                </div>
                <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Start with the masking API, then layer SDKs as they publish.</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                  The direct API path is the safest integration baseline today: one endpoint, explicit auth, and sanitized output ready for downstream AI workflows.
                </p>
              </div>
              <Link href={siteConfig.signupUrl} className="btn btn-cta w-full px-6 py-4 sm:w-auto">
                Get your free API key
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
