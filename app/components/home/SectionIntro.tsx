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
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">{eyebrow}</p>
      <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">{title}</h2>
      <p className="mt-5 text-lg text-slate-400">{description}</p>
    </div>
  )
}
