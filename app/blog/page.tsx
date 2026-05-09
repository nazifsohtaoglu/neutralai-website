import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3, FileText } from 'lucide-react'
import BackButton from '../components/BackButton'
import { siteConfig } from '../site'
import { getAllPosts } from './posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'NeutralAI articles on PII masking, AI governance, privacy engineering, and secure enterprise AI adoption.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'NeutralAI Blog',
    description:
      'Practical guidance for PII-safe LLM adoption, privacy engineering, and AI governance.',
    url: `${siteConfig.url}/blog`,
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const featured = posts[0]

  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(249,115,22,0.14),transparent_22%)]" />
        <div className="container-custom relative z-10">
          <BackButton />

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">NeutralAI Blog</p>
              <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-[0.98] md:text-6xl">
                Practical notes for secure enterprise AI adoption.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Guides on PII masking, AI governance, browser-based AI risk, and the controls regulated teams need before broad rollout.
              </p>
            </div>

            {featured ? (
              <Link
                href={`/blog/${featured.slug}`}
                className="rounded-[30px] border border-primary/25 bg-background-secondary/80 p-6 shadow-2xl shadow-cyan-950/20 transition hover:border-primary"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                  <FileText className="h-4 w-4" />
                  Featured
                </div>
                <h2 className="mt-5 font-heading text-3xl font-bold">{featured.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">{featured.description}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">{featured.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {featured.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {featured.readingTime}
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-light">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section bg-background-secondary">
        <div className="container-custom">
          <div className="mb-8 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#fdba74]">Latest Articles</p>
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">Start with the controls that unblock AI.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-[24px] border border-white/10 bg-background p-6 transition hover:border-primary/50 hover:-translate-y-1"
              >
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-light">
                  {post.category}
                </span>
                <h3 className="mt-5 font-heading text-2xl font-semibold text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{post.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4 text-xs text-slate-500">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
