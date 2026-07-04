# NeutralAI Authentication

NeutralAI public website content is available without authentication.

NeutralAI Gateway API access uses scoped API keys sent from server-side integrations. Do not place API keys in browsers, mobile clients, public repositories, client-visible logs, or analytics events.

## API Key Header

```http
x-api-key: nai_live_your_key
```

Public API examples and SDK guidance are documented at:

- https://neutralai.co.uk/developers

## OAuth and OIDC

NeutralAI does not publish this marketing website as an OAuth or OIDC provider. If OAuth/OIDC metadata is added for a public API or application surface, it should be published from the owning service domain and reviewed separately before launch.

## Agent Access

Agents may read public website content, `llms.txt`, and the sitemap for search, retrieval, citation, and grounding. Training use is not granted by the site-level content signal.
