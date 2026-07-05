const MARKDOWN_BODY = `# NeutralAI

NeutralAI publishes public product, security, pricing, and developer content for teams evaluating sensitive-data controls around LLM use. Use the canonical pages below for current product details and citations.

## Primary Resources

- Product overview: https://neutralai.co.uk/
- Developers: https://neutralai.co.uk/developers/
- Security: https://neutralai.co.uk/security/
- Trust center: https://neutralai.co.uk/trust-center/
- Pricing: https://neutralai.co.uk/pricing/
- Blog: https://neutralai.co.uk/blog/
- LLM guide: https://neutralai.co.uk/llms.txt
- API catalog: https://neutralai.co.uk/.well-known/api-catalog
- Agent skills index: https://neutralai.co.uk/.well-known/agent-skills/index.json

## Agent Use

Public website content can be read and cited for search, answer grounding, and agentic research. It must not be used for AI model training. Product capabilities should be cited from the linked public pages rather than inferred from this summary.
`

const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no, use=reference'
const MARKDOWN_RESPONSE_HEADERS = {
  'Cache-Control': 'no-store',
  'Content-Signal': CONTENT_SIGNAL,
  'Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
  'Content-Type': 'text/markdown; charset=utf-8',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  Vary: 'Accept',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
}

function normalisePath(pathname) {
  if (pathname === '') {
    return '/'
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

function acceptsMarkdown(acceptHeader) {
  if (!acceptHeader) {
    return false
  }

  return acceptHeader
    .toLowerCase()
    .split(',')
    .some((value) => {
      const [mediaType, ...parameters] = value.trim().split(';')
      const q = parameters.reduce((quality, parameter) => {
        const [key, rawValue] = parameter.trim().split('=')

        if (key === 'q') {
          const parsed = Number.parseFloat(rawValue)
          return Number.isNaN(parsed) ? 0 : parsed
        }

        return quality
      }, 1)

      return mediaType === 'text/markdown' && q > 0
    })
}

export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)

  if (
    request.method === 'GET' &&
    acceptsMarkdown(request.headers.get('Accept')) &&
    normalisePath(url.pathname) === '/'
  ) {
    return new Response(MARKDOWN_BODY, { headers: MARKDOWN_RESPONSE_HEADERS })
  }

  return context.next()
}
