import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import Image from 'next/image'
import Link from 'next/link'

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  readingTime: string
}

type BlogPost = BlogPostMeta & {
  content: string
}

const blogDirectory = join(process.cwd(), 'content/blog')

function parseFrontmatter(source: string): { metadata: Record<string, string>; content: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

  if (!match) {
    throw new Error('Blog post is missing frontmatter')
  }

  const metadata = Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [key, ...valueParts] = line.split(':')
        return [key.trim(), valueParts.join(':').trim().replace(/^"|"$/g, '')]
      })
  )

  return {
    metadata,
    content: match[2].trim(),
  }
}

function calculateReadingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 220))} min read`
}

function readPostByFilename(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx$/, '')
  const source = readFileSync(join(blogDirectory, filename), 'utf8')
  const { metadata, content } = parseFrontmatter(source)

  return {
    slug,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    author: metadata.author,
    category: metadata.category,
    readingTime: calculateReadingTime(content),
    content,
  }
}

export function getAllPosts(): BlogPostMeta[] {
  return readdirSync(blogDirectory)
    .filter((filename) => filename.endsWith('.mdx'))
    .map(readPostByFilename)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ content: _content, ...meta }) => meta)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filename = `${slug}.mdx`

  if (!readdirSync(blogDirectory).includes(filename)) {
    return undefined
  }

  return readPostByFilename(filename)
}

function parseInline(text: string) {
  const segments = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)

  return segments.map((segment, index) => {
    if (segment.startsWith('`') && segment.endsWith('`')) {
      return (
        <code key={index} className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-primary-light">
          {segment.slice(1, -1)}
        </code>
      )
    }

    if (segment.startsWith('**') && segment.endsWith('**')) {
      return <strong key={index} className="font-semibold text-white">{segment.slice(2, -2)}</strong>
    }

    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const href = linkMatch[2]
      const isExternal = href.startsWith('http')

      if (isExternal) {
        return (
          <a key={index} href={href} target="_blank" rel="noreferrer" className="text-primary-light hover:text-primary">
            {linkMatch[1]}
          </a>
        )
      }

      return (
        <Link key={index} href={href} className="text-primary-light hover:text-primary">
          {linkMatch[1]}
        </Link>
      )
    }

    return segment
  })
}

function flushParagraph(paragraph: string[], blocks: React.ReactNode[], keyPrefix: string) {
  if (paragraph.length === 0) {
    return
  }

  blocks.push(
    <p key={`${keyPrefix}-${blocks.length}`} className="text-base leading-8 text-slate-300">
      {parseInline(paragraph.join(' '))}
    </p>
  )
  paragraph.length = 0
}

export function BlogPostBody({ content }: { content: string }) {
  const lines = content.split('\n')
  const blocks: React.ReactNode[] = []
  const paragraph: string[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (line.trim() === '') {
      flushParagraph(paragraph, blocks, 'paragraph')
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      flushParagraph(paragraph, blocks, 'paragraph')
      const language = line.replace('```', '').trim() || 'text'
      const codeLines: string[] = []
      index += 1

      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }

      blocks.push(
        <div key={`code-${blocks.length}`} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#020617]">
          <div className="border-b border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-light">
            {language}
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-200">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      )
      index += 1
      continue
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/)
    if (imageMatch) {
      flushParagraph(paragraph, blocks, 'paragraph')
      blocks.push(
        <figure key={`figure-${blocks.length}`} className="overflow-hidden rounded-[28px] border border-white/10 bg-background-secondary/80">
          <Image
            src={imageMatch[2]}
            alt={imageMatch[1]}
            width={1200}
            height={630}
            className="h-auto w-full"
          />
          {imageMatch[3] ? (
            <figcaption className="border-t border-white/10 px-5 py-3 text-sm leading-6 text-slate-400">
              {imageMatch[3]}
            </figcaption>
          ) : null}
        </figure>
      )
      index += 1
      continue
    }

    if (line.startsWith('## ')) {
      flushParagraph(paragraph, blocks, 'paragraph')
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="pt-4 font-heading text-3xl font-semibold text-white">
          {parseInline(line.slice(3))}
        </h2>
      )
      index += 1
      continue
    }

    if (line.startsWith('### ')) {
      flushParagraph(paragraph, blocks, 'paragraph')
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="pt-3 font-heading text-2xl font-semibold text-white">
          {parseInline(line.slice(4))}
        </h3>
      )
      index += 1
      continue
    }

    if (line.startsWith('- ')) {
      flushParagraph(paragraph, blocks, 'paragraph')
      const items: string[] = []

      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(lines[index].slice(2))
        index += 1
      }

      blocks.push(
        <ul key={`ul-${blocks.length}`} className="space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-7 text-slate-300">
              <span className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    paragraph.push(line.trim())
    index += 1
  }

  flushParagraph(paragraph, blocks, 'paragraph')

  return <div className="space-y-7">{blocks}</div>
}
