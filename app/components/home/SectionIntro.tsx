type SectionIntroProps = {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionIntroProps) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div className={`flex items-center gap-2.5 ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-6 bg-primary/60" aria-hidden="true" />
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary-light">{eyebrow}</p>
      </div>
      <h2 className="mt-4 text-balance font-heading text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-5 text-pretty text-lg leading-relaxed text-slate-300">{description}</p>
    </div>
  )
}
