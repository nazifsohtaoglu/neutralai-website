import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useCases } from '../../use-cases/content'
import SectionIntro from './SectionIntro'

const indexLink = { label: 'All use cases', href: '/use-cases' } as const
const useCaseLinks = [
  { label: 'Financial services', href: '/use-cases/financial-services' },
  { label: 'Healthcare', href: '/use-cases/healthcare' },
  { label: 'Legal', href: '/use-cases/legal' },
] as const

export default function UseCasesSection() {
  return (
    <section id="industries" className="section">
      <div className="container-custom">
        <SectionIntro
          eyebrow="Industries"
          title="Use cases buyers can recognize."
          description="Industry pages help regulated teams map NeutralAI to the workflows, identifiers, and review questions they already face."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <Link
              key={useCase.href}
              href={useCase.href}
              className="group rounded-[24px] border border-white/10 bg-background-secondary p-5 transition hover:border-primary/40 hover:bg-white/[0.04]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#fdba74]">{useCase.title}</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-white">{useCase.content.proofLabel}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{useCase.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-light">
                View use case
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <Link href={indexLink.href} className="text-primary-light hover:text-primary">
            {indexLink.label}
          </Link>
          {useCaseLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-primary-light hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
