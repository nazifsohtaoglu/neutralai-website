import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function readSource(path) {
  return readFileSync(join(root, path), 'utf8')
}

function blogPostFiles() {
  return readdirSync(join(root, 'content/blog')).filter((filename) => filename.endsWith('.mdx'))
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
  assert.match(blogPosts, /next\/image/)
  assert.match(blogPosts, /<figure/)
  assert.match(post, /Why PII Masking Matters for Enterprise AI Adoption/)
  assert.match(post, /```text/)
})

test('blog content hub publishes the WEB-103 article set', () => {
  const posts = blogPostFiles()
  const combinedPosts = posts.map((filename) => readSource(`content/blog/${filename}`)).join('\n')

  assert.ok(posts.length >= 6)
  assert.match(combinedPosts, /NeutralAI vs Private AI vs Nightfall: PII Detection Benchmark 2026/)
  assert.match(combinedPosts, /How UK Financial Services Teams Use AI Safely Under FCA Guidance/)
  assert.match(combinedPosts, /The Hidden Cost of Shadow AI: Why Security Teams Need a Control Point/)
  assert.match(combinedPosts, /PII Detection Accuracy: Regex vs NER vs LLM-Based Approaches/)
  assert.match(combinedPosts, /From Presidio to Production: What Regulated Teams Actually Need/)
  assert.match(combinedPosts, /pii detection/i)
  assert.match(combinedPosts, /PII masking/i)
  assert.match(combinedPosts, /AI compliance gateway|AI governance/i)
  assert.match(combinedPosts, /Presidio alternative|Presidio to Production/i)
  assert.doesNotMatch(combinedPosts, /guaranteed independent benchmark/i)
})

test('blog articles include visual diagrams with accessible alt text', () => {
  const posts = blogPostFiles()
  const combinedPosts = posts.map((filename) => readSource(`content/blog/${filename}`)).join('\n')
  const expectedVisuals = [
    'vendor-benchmark-evidence.svg',
    'fca-ai-control-point.svg',
    'shadow-ai-control-point.svg',
    'pii-detection-stack.svg',
    'presidio-production-layers.svg',
    'pii-masking-flow.svg',
  ]

  for (const visual of expectedVisuals) {
    const visualSource = readSource(`public/blog/visuals/${visual}`)

    assert.match(combinedPosts, new RegExp(`!\\[[^\\]]+\\]\\(/blog/visuals/${visual.replace('.', '\\.')}`))
    assert.match(visualSource, /<title id="title">/)
    assert.match(visualSource, /<desc id="desc">/)
  }
})

test('blog visual SVGs avoid long unwrapped text runs', () => {
  const visualFiles = readdirSync(join(root, 'public/blog/visuals')).filter((filename) => filename.endsWith('.svg'))

  for (const visual of visualFiles) {
    const visualSource = readSource(`public/blog/visuals/${visual}`)
    const textRuns = [...visualSource.matchAll(/<text[^>]*>([^<]+)<\/text>/g)].map((match) => match[1])

    for (const text of textRuns) {
      assert.ok(text.length <= 58, `${visual} has an SVG text run that may overflow: "${text}"`)
    }
  }
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
  assert.match(sitemap, /getAllPosts/)
  assert.match(sitemap, /\/blog\/\$\{post\.slug\}/)
})

test('blog post metadata has SEO-safe fields and canonical paths', () => {
  const blogIndex = readSource('app/blog/page.tsx')
  const blogPost = readSource('app/blog/[slug]/page.tsx')
  const post = readSource('content/blog/why-pii-masking-matters-for-enterprise-ai-adoption.mdx')

  assert.match(blogIndex, /canonical: '\/blog'/)
  assert.match(blogIndex, /'application\/rss\+xml': '\/blog\/feed\.xml'/)
  assert.match(blogPost, /canonical: `\/blog\/\$\{post\.slug\}`/)
  assert.match(blogPost, /images: \['\/og-default\.png'\]/)
  assert.match(blogPost, /type: 'article'/)
  assert.match(post, /description: "A practical guide/)
  assert.match(post, /date: "2026-05-09"/)
  assert.match(post, /author: "NeutralAI Team"/)
})

test('blog RSS feed route is static and includes all posts', () => {
  const feed = readSource('public/blog/feed.xml')

  assert.match(feed, /<rss version="2\.0">/)
  assert.match(feed, /<item>/)
  assert.match(feed, /NeutralAI vs Private AI vs Nightfall/)
  assert.match(feed, /Why PII Masking Matters for Enterprise AI Adoption/)
})
