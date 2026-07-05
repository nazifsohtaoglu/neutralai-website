# Agent Readiness Runbook

This runbook covers the public, non-secret agent discovery controls for the NeutralAI website.

## Current Public Discovery Surface

- `public/llms.txt` gives agents a concise map of public pages and public contact points.
- `public/.well-known/api-catalog` publishes the public API linkset anchored to `https://api.neutralai.co.uk`.
- `public/.well-known/agent-skills/index.json` and the linked skill file describe how agents should read and cite public website content.
- `public/.well-known/auth.md` explains that the marketing website is public and does not publish OAuth or OIDC provider metadata.
- `public/_headers` advertises discovery resources with `Link` headers and the site-wide `Content-Signal` policy.
- `public/robots.txt` repeats the same `Content-Signal` policy for crawlers that inspect robots before headers.

## Markdown Negotiation

Cloudflare Markdown for Agents can convert HTML to Markdown at the edge when the zone setting is enabled and the request includes `Accept: text/markdown`.

Current production note: the zone setting `content_converter` was observed as `off` and not editable through the available API token/plan on 2026-07-04. Until the Cloudflare-managed setting is available, `functions/_middleware.js` serves a conservative Markdown summary for the homepage only when an agent explicitly sends `Accept: text/markdown`. Other routes continue to serve their normal HTML so the fallback does not replace page-specific content.

Verification:

```bash
curl -sSI -H 'Accept: text/markdown' https://neutralai.co.uk/
curl -sS -H 'Accept: text/markdown' https://neutralai.co.uk/ | head -40
```

Expected:

- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept`
- `Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference`
- Body starts with `# NeutralAI`

## Robots Content Signal

Verification:

```bash
curl -sS https://neutralai.co.uk/robots.txt
```

Expected repository-defined lines:

```txt
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference
Allow: /
Sitemap: https://neutralai.co.uk/sitemap.xml
```

Cloudflare may prepend managed robots directives in production. That is acceptable as long as the site-defined sitemap and content signal remain present.

## DNS-AID Candidate

DNS-AID is still draft-level agent discovery infrastructure. Do not publish claims for MCP, WebMCP, A2A, OAuth, OIDC, or commerce protocols unless the corresponding production service exists.

If the team chooses to publish a minimal DNS-AID index pointer, use an SVCB record that points only to the existing public website discovery surface:

```txt
_index._agents.neutralai.co.uk. 3600 IN SVCB 1 neutralai.co.uk. alpn="h2"
```

Verification:

```bash
dig +short _index._agents.neutralai.co.uk SVCB
dig +short _index._agents.neutralai.co.uk TYPE64
```

Expected:

```txt
1 neutralai.co.uk. alpn="h2"
```

Older `dig` builds may not understand the `SVCB` mnemonic and may require `TYPE64`; in that case the answer is printed as raw wire data.

Assumption: Because the DNS-AID draft may evolve, keep this record limited to the website origin and avoid protocol-specific parameters until a stable standard or owned production endpoint requires them.
