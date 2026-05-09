import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from 'lucide-react'
import { siteConfig } from '../../site'
import { BlogPostBody, getAllPosts, getPostBySlug } from '../posts'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: `${siteConfig.url}/logo.png`,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  }

  return (
    <main className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="container-custom max-w-4xl py-16 md:py-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary-light hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <header className="mt-10 border-b border-border pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary-light">{post.category}</p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight md:text-6xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span>{post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        <div className="mt-10">
          <BlogPostBody content={post.content} />
        </div>

        <section className="mt-12 rounded-[30px] border border-primary/20 bg-primary/10 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-semibold text-white">Want to make AI safer for your team?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            NeutralAI helps regulated teams mask sensitive prompt data before it reaches external model providers.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={siteConfig.signupUrl} className="btn btn-cta justify-center px-8 py-4">
              Try Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="btn btn-secondary justify-center px-8 py-4">
              Talk to Sales
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
