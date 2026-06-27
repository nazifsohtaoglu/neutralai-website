'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock3, Search, X } from 'lucide-react'
import type { BlogPostMeta } from './posts'

interface BlogFilteredListProps {
  posts: BlogPostMeta[]
  categories: string[]
}

export default function BlogFilteredList({ posts, categories }: BlogFilteredListProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = activeCategory === null || post.category === activeCategory
      const matchesQuery =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [posts, query, activeCategory])

  return (
    <section className="section bg-background-secondary">
      <div className="container-custom">
        <div className="mb-8 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">Latest Articles</p>
          <h2 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
            Start with the controls that unblock AI.
          </h2>
        </div>

        {/* Filter bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={[
                'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition',
                activeCategory === null
                  ? 'border-primary bg-primary/15 text-primary-light'
                  : 'border-white/10 bg-white/[0.04] text-slate-400 hover:border-primary/40 hover:text-slate-200',
              ].join(' ')}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={[
                  'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition',
                  activeCategory === cat
                    ? 'border-primary bg-primary/15 text-primary-light'
                    : 'border-white/10 bg-white/[0.04] text-slate-400 hover:border-primary/40 hover:text-slate-200',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-56 lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-8 pr-8 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Post grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
            <Search className="mb-4 h-8 w-8 text-slate-600" />
            <p className="text-base font-medium text-slate-300">No articles found</p>
            <p className="mt-1 text-sm">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-[24px] border border-white/10 bg-background transition hover:-translate-y-1 hover:border-primary/50"
              >
                {post.visual ? (
                  <div className="relative aspect-[1.9] overflow-hidden border-b border-white/10">
                    <Image
                      src={post.visual.src}
                      alt={post.visual.alt}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-light">
                    {post.category}
                  </span>
                  <h3 className="mt-5 font-heading text-2xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{post.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
