import type { Metadata } from 'next'
import Link from 'next/link'
import { ClipboardCheck, ShieldCheck } from 'lucide-react'
import { contactLinks } from '../../site'

export const metadata: Metadata = {
  title: 'AI Confidentiality Checklist for Law Firms',
  description:
    'A practical checklist for law firms reviewing AI use, client-data exposure, technical masking controls, and audit evidence.',
  // Gated lead-magnet asset: reached via the /compliance hub form, kept out of search.
  robots: { index: false, follow: false },
}

type ChecklistSection = {
  title: string
  intro: string
  questions: string[]
  aside?: { label: string; text: string }
}

const sections: ChecklistSection[] = [
  {
    title: '1. AI usage discovery',
    intro: 'Before improving AI controls, the firm needs to know where AI is already being used.',
    questions: [
      'Do we know which AI tools people are using for legal work?',
      'Do we know whether staff use ChatGPT, Claude, Copilot, Gemini, or other tools with client-related material?',
      'Is AI use approved, banned, informal, or handled team by team?',
      'Do partners, associates, paralegals, and support staff follow the same AI process?',
      'Do we have a named owner for AI usage policy and review?',
    ],
  },
  {
    title: '2. Client-data exposure',
    intro: 'Legal documents often contain information the model does not need to see.',
    questions: [
      'Could client names be included in AI prompts or uploaded documents?',
      'Could addresses, phone numbers, email addresses, or personal identifiers be included?',
      'Could contracts, matter notes, financial values, case facts, or settlement details be included?',
      'Could privileged or confidential context be copied into AI tools?',
      'Do we have a process for deciding what information should be removed before AI use?',
    ],
    aside: {
      label: 'Practical test',
      text: 'Take one sample legal document or matter note. Highlight every detail that an external AI model does not need in order to perform the task.',
    },
  },
  {
    title: '3. Policy and consent',
    intro: 'Policy is useful, but it should be specific enough for daily work.',
    questions: [
      'Do we have an AI policy that explains what client data must not be shared?',
      'Does the policy cover documents, prompts, summaries, emails, and attachments?',
      'Does the policy explain approved tools versus unapproved tools?',
      'Do users know when client consent, partner approval, or further review may be needed?',
      'Do we review AI use when opening new matters or adopting new tools?',
    ],
    aside: {
      label: 'Watch-out',
      text: 'If the policy depends only on users remembering what not to paste, the firm may still have a technical control gap.',
    },
  },
  {
    title: '4. Technical controls',
    intro: 'The strongest AI workflow usually combines policy with a technical privacy step.',
    questions: [
      'Is sensitive information masked or redacted before AI use?',
      'Are client names, contact details, matter IDs, financial values, and document references detected before model exposure?',
      'Are approved AI tools enforced technically, or only suggested in policy?',
      'Can users run a safe sample document through an approved privacy workflow?',
      'Can the firm distinguish between raw client content and audit-safe metadata?',
    ],
    aside: {
      label: 'Example safer workflow',
      text: 'Document or prompt → sensitive data detected → client-identifiable details masked → masked version sent for AI review → audit-friendly record kept.',
    },
  },
  {
    title: '5. Audit evidence',
    intro:
      'If a client, insurer, regulator, or internal reviewer asks how AI was controlled, the firm should be able to show evidence without exposing raw client content again.',
    questions: [
      'Can we show that a masking or redaction control ran before AI use?',
      'Can we show which categories were detected, such as names, emails, addresses, matter IDs, or financial values?',
      'Can we show the policy applied, timestamp, user or team, destination, and status?',
      'Can we produce an audit summary without copying raw client data into the report?',
      'Can partners, DPOs, IT, or compliance owners review AI usage at team level?',
    ],
  },
  {
    title: '6. Incident readiness',
    intro: 'If client data is exposed through AI, the first questions will be practical.',
    questions: [
      'Do we know who investigates an AI-related data exposure concern?',
      'Do we know what evidence should be collected in the first 24 hours?',
      'Can we identify whether a prompt or document was masked before AI use?',
      'Can we tell whether the issue was user error, tool misuse, policy failure, or missing technical control?',
      'Do we have a review path for repeat issues or high-risk workflows?',
    ],
    aside: {
      label: 'Prompt for internal discussion',
      text: 'If a client asked whether their information was used in AI, who could answer and what evidence would they use?',
    },
  },
]

const scoring = [
  { range: '0–5', interpretation: 'You may already have a defined AI control path, but review whether evidence is easy to produce.' },
  { range: '6–12', interpretation: 'There may be gaps between policy, daily behaviour, and technical controls.' },
  { range: '13+', interpretation: 'The firm may be relying heavily on user discipline without enough visibility or evidence.' },
] as const

export default function ComplianceChecklistPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="section">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
            <ClipboardCheck className="h-3.5 w-3.5" />
            Checklist
          </div>
          <h1 className="mt-5 font-heading text-4xl font-bold md:text-6xl">
            AI Confidentiality Checklist for Law Firms
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Use this checklist before your firm uses AI on client documents, prompts, matter notes, contracts, emails,
            or research material. It helps partners, operations teams, DPOs, compliance owners, and legal technology
            leads answer one practical question: are we using AI on client work safely, and do we have evidence of the
            controls we apply?
          </p>
          <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-400">
            This checklist is not legal advice and does not prove compliance. It is a practical starting point for
            reviewing AI confidentiality risk, technical controls, and audit evidence. Mark each question yes, no, or
            not sure.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[24px] border border-white/10 bg-background/80 p-6 md:p-8">
                <h2 className="font-heading text-2xl font-semibold text-white">{section.title}</h2>
                <p className="mt-2 text-base leading-7 text-slate-300">{section.intro}</p>
                <ul className="mt-5 space-y-3">
                  {section.questions.map((question) => (
                    <li key={question} className="flex items-start gap-3 text-base leading-7 text-slate-200">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 flex-shrink-0 rounded border border-white/25 bg-white/5"
                      />
                      {question}
                    </li>
                  ))}
                </ul>
                {section.aside && (
                  <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
                      {section.aside.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{section.aside.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[24px] border border-white/10 bg-background/80 p-6 md:p-8">
            <h2 className="font-heading text-2xl font-semibold text-white">Score your current position</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Count how many questions were answered no or not sure.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              {scoring.map((row) => (
                <div key={row.range} className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[0.2fr_1fr]">
                  <div className="px-5 py-4 font-heading text-lg font-semibold text-white">{row.range}</div>
                  <div className="px-5 py-4 text-sm leading-6 text-slate-300">{row.interpretation}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              This scoring is not a compliance assessment. It is a conversation starter for internal review.
            </p>
          </div>

          <div className="mt-12 rounded-[24px] border border-primary/20 bg-primary/10 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-primary-light" />
              <div>
                <h2 className="font-heading text-2xl font-semibold text-white">Where NeutralAI fits</h2>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  NeutralAI helps law firms use AI on legal documents with less client-identifiable data exposed to the
                  model, and with audit-friendly evidence of the control applied: sensitive fields are detected and
                  masked before the prompt leaves the browser, and the record of that control is kept without turning
                  raw client content into another reporting risk. It is not a guarantee of compliance or privilege
                  protection, and it does not replace legal review.
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  If you want to review one workflow, start small: bring one low-risk legal workflow — contract review,
                  matter summaries, discovery triage — and we will walk through where masking, audit evidence, and
                  deployment controls would fit.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link href={contactLinks.demo} className="btn btn-cta px-6 py-3 text-sm">
                    Book a 20-minute risk review
                  </Link>
                  <Link href="/compliance" className="btn btn-secondary px-6 py-3 text-sm">
                    Back to the compliance hub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
