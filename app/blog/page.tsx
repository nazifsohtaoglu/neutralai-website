import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3, FileText } from 'lucide-react'
import BackButton from '../components/BackButton'
import { siteConfig } from '../site'
import { getAllPosts } from './posts'
import BlogFilteredList from './BlogFilteredList'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'NeutralAI articles on PII masking, AI governance, privacy engineering, and secure enterprise AI adoption.',
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': '/blog/feed.xml',
    },
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
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort()

  return (
    <main className="min-h-screen pt-24">
      <section className="relative overflow-hidden py-8 md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(249,115,22,0.14),transparent_22%)]" />
        <div className="container-custom relative z-10">
          <BackButton />

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-light">NeutralAI Blog</p>
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
                className="group overflow-hidden rounded-[28px] border border-primary/25 bg-background-secondary/80 shadow-2xl shadow-cyan-950/20 transition hover:-translate-y-1 hover:border-primary lg:max-w-3xl lg:justify-self-end"
              >
                {featured.visual ? (
                  <div className="relative aspect-[2.35] overflow-hidden border-b border-white/10">
                    <Image
                      src={featured.visual.src}
                      alt={featured.visual.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      priority
                    />
                  </div>
                ) : null}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                    <FileText className="h-4 w-4" />
                    Featured
                  </div>
                  <h2 className="mt-4 font-heading text-2xl font-bold leading-tight md:text-3xl">{featured.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{featured.description}</p>
                  <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
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
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-light">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <BlogFilteredList posts={posts} categories={categories} />
    </main>
  )
}
