import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

test('blog infrastructure renders index and MDX-backed post pages', () => {
  const blogIndex = readSource('app/blog/page.tsx')
  const blogPost = readSource('app/blog/[slug]/page.tsx')
  const blogPosts = readSource('app/blog/posts.tsx')
  const post = readSource('content/blog/why-pii-masking-matters-for-enterprise-ai-adoption.mdx')

  assert.match(blogIndex, /NeutralAI Blog/)
  assert.match(blogIndex, /getAllPosts/)
  assert.match(blogPost, /generateStaticParams/)
  assert.match(blogPost, /BlogPosting/)
  assert.match(blogPosts, /content\/blog/)
  assert.match(blogPosts, /\.mdx/)
  assert.match(post, /Why PII Masking Matters for Enterprise AI Adoption/)
  assert.match(post, /```text/)
})

test('blog route is discoverable from navigation, footer, and sitemap', () => {
  const navbar = readSource('app/components/Navbar.tsx')
  const footer = readSource('app/components/Footer.tsx')
  const sitemap = readSource('app/sitemap.ts')

  assert.match(navbar, /Blog/)
  assert.ok(navbar.includes("href: '/blog'"))
  assert.match(footer, /Blog/)
  assert.ok(footer.includes("href: '/blog'"))
  assert.ok(sitemap.includes("'/blog'"))
  assert.ok(sitemap.includes("'/blog/why-pii-masking-matters-for-enterprise-ai-adoption'"))
})

test('blog post metadata has SEO-safe fields and canonical paths', () => {
  const blogIndex = readSource('app/blog/page.tsx')
  const blogPost = readSource('app/blog/[slug]/page.tsx')
  const post = readSource('content/blog/why-pii-masking-matters-for-enterprise-ai-adoption.mdx')

  assert.match(blogIndex, /canonical: '\/blog'/)
  assert.match(blogPost, /canonical: `\/blog\/\$\{post\.slug\}`/)
  assert.match(post, /description: "A practical guide/)
  assert.match(post, /date: "2026-05-09"/)
  assert.match(post, /author: "NeutralAI Team"/)
})
