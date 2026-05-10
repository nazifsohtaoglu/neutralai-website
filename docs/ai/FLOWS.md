# Critical Flows

## 1. Visitor Conversion Flow

```mermaid
sequenceDiagram
  participant V as Visitor
  participant H as Homepage
  participant N as Navigation
  participant C as CTA

  V->>H: lands on site
  H->>V: product category and value proposition
  V->>N: explores routes/sections
  V->>C: clicks primary or secondary CTA
  C-->>V: signup/contact/demo/trial destination
```

Notes:
- CTA labels and destinations should stay consistent across homepage, navbar, and content tests.
- Avoid adding claims that the gateway product cannot currently support.

## 2. Page Render Flow

```mermaid
graph TD
  Request["Request"] --> Next["Next.js App Router"]
  Next --> Layout["app/layout.tsx"]
  Layout --> Page["app/**/page.tsx"]
  Layout --> Shared["app/components/*"]
  Page --> CSS["app/globals.css + Tailwind"]
  Page --> Assets["public/*"]
  Next --> HTML["Rendered page"]
```

## 3. Build and CI Flow

```mermaid
sequenceDiagram
  participant Dev as Developer/Codex
  participant NPM as npm
  participant Next as Next build
  participant ESLint as ESLint
  participant CI as GitHub Actions

  Dev->>NPM: npm install or npm ci
  Dev->>Next: npm run build
  Dev->>ESLint: npm run lint
  Dev->>NPM: npm run test:content
  CI->>NPM: npm ci
  CI->>Next: npm run build
  CI->>ESLint: npm run lint
  CI->>NPM: npm run audit:prod
```

## 4. Content Test Flow

```mermaid
graph LR
  Test["tests/content/*.test.mjs"] --> Source["app/page.tsx and related content"]
  Source --> Assertions["CTA/copy assertions"]
  Assertions --> Result["pass/fail"]
```

## Open Questions Linked to Flows

- What is the canonical primary CTA destination for the website?
- Should content tests cover all public routes or only the homepage?
- Is the website intended to be static-exported through `out/`, deployed through Next server, or both?
