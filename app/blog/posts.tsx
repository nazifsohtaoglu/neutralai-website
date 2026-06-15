import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('json', json)

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  readingTime: string
  visual?: {
    src: string
    alt: string
    caption?: string
  }
}

type BlogPost = BlogPostMeta & {
  content: string
}

const blogDirectory = join(process.cwd(), 'content/blog')
const blogVisualPrefix = '/blog/visuals/'

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

function isSafeBlogImageSrc(src: string) {
  return src.startsWith(blogVisualPrefix)
}

function classifyBlogHref(href: string) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return 'internal'
  }

  if (href.startsWith('https://')) {
    return 'external'
  }

  return 'invalid'
}

function extractFirstImage(content: string): BlogPostMeta['visual'] {
  const imageMatch = content.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/m)

  if (!imageMatch || !isSafeBlogImageSrc(imageMatch[2])) {
    return undefined
  }

  return {
    alt: imageMatch[1],
    src: imageMatch[2],
    caption: imageMatch[3],
  }
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
    visual: extractFirstImage(content),
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
  const segments = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g)

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

    if (segment.startsWith('*') && segment.endsWith('*')) {
      return <em key={index} className="italic text-slate-200">{segment.slice(1, -1)}</em>
    }

    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const href = linkMatch[2]
      const hrefType = classifyBlogHref(href)

      if (hrefType === 'external') {
        return (
          <a key={index} href={href} target="_blank" rel="nofollow noreferrer" className="text-primary-light hover:text-primary">
            {linkMatch[1]}
          </a>
        )
      }

      if (hrefType === 'internal') {
        return (
          <Link key={index} href={href} className="text-primary-light hover:text-primary">
            {linkMatch[1]}
          </Link>
        )
      }

      return linkMatch[1]
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

    if (line.trim() === '---') {
      flushParagraph(paragraph, blocks, 'paragraph')
      blocks.push(<hr key={`hr-${blocks.length}`} className="my-2 border-white/10" />)
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
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{ margin: 0, background: 'transparent', padding: '1rem', fontSize: '0.8125rem', lineHeight: '1.5rem' }}
            codeTagProps={{ style: { background: 'transparent', fontFamily: 'inherit' } }}
          >
            {codeLines.join('\n')}
          </SyntaxHighlighter>
        </div>
      )
      index += 1
      continue
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/)
    if (imageMatch) {
      flushParagraph(paragraph, blocks, 'paragraph')

      if (!isSafeBlogImageSrc(imageMatch[2])) {
        index += 1
        continue
      }

      blocks.push(
        <figure key={`figure-${blocks.length}`} className="mx-auto max-w-3xl overflow-hidden rounded-[24px] border border-white/10 bg-background-secondary/80">
          <Image
            src={imageMatch[2]}
            alt={imageMatch[1]}
            width={1200}
            height={630}
            className="h-auto w-full"
          />
          {imageMatch[3] ? (
            <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-400 md:px-5 md:text-sm md:leading-6">
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

    if (line.startsWith('> ')) {
      flushParagraph(paragraph, blocks, 'paragraph')
      const quoteLines: string[] = []

      while (index < lines.length && lines[index].startsWith('> ')) {
        quoteLines.push(lines[index].slice(2))
        index += 1
      }

      blocks.push(
        <blockquote key={`quote-${blocks.length}`} className="border-l-2 border-primary/70 pl-4 text-base italic leading-8 text-slate-200">
          {parseInline(quoteLines.join(' '))}
        </blockquote>
      )
      continue
    }

    if (line.startsWith('|') && index + 1 < lines.length && /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(lines[index + 1])) {
      flushParagraph(paragraph, blocks, 'paragraph')
      const parseRow = (row: string) =>
        row.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim())
      const header = parseRow(line)
      index += 2
      const rows: string[][] = []

      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(parseRow(lines[index]))
        index += 1
      }

      blocks.push(
        <div key={`table-${blocks.length}`} className="overflow-x-auto rounded-[20px] border border-white/10">
          <table className="w-full border-collapse text-sm text-slate-300">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                {header.map((cell, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold text-white">{parseInline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-b border-white/5 last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-3 align-top">{parseInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
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
