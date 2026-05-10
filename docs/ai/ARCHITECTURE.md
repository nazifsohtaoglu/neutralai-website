# Architecture

## Short Summary

This is a Next.js App Router marketing website for NeutralAI Gateway. It is mostly static/content-driven, with shared layout/components and build-time validation through Next, ESLint, content tests, and dependency audit. The main implementation risk is not backend data correctness, but content accuracy, conversion clarity, visual polish, accessibility, and keeping product claims aligned with the actual gateway product.

## Layers

| Layer | Files | Notes |
| --- | --- | --- |
| App shell | `app/layout.tsx` | Shared metadata, root HTML/body, global shell components |
| Pages/routes | `app/**/page.tsx` | App Router route segments |
| Homepage | `app/page.tsx` | Primary conversion and product narrative surface |
| Shared components | `app/components/*` | Navbar, footer, back button, and reusable UI |
| Styling | `app/globals.css`, `tailwind.config.ts` | Global visual system and Tailwind tokens |
| Tests | `tests/content/*.test.mjs` | Content/CTA assertions via Node test runner |
| CI | `.github/workflows/dependency-security.yml` | Install, build, lint, production dependency audit |

## Content Model

| Content Area | Purpose |
| --- | --- |
| Hero | State the product category and primary value proposition quickly |
| Navigation | Move visitors to product, pricing/contact, docs/legal, or conversion actions |
| Product explanation | Explain how PII masking protects LLM workflows |
| Trust/compliance | Support regulated-industry buying confidence without overclaiming |
| CTA | Convert visitor interest into signup, contact, demo, or trial intent |
| Legal/privacy routes | Provide policy and compliance-facing information |

## Critical Invariants

- Product claims must be accurate and should not overstate backend capabilities.
- Do not invent customer names, certifications, audit status, or compliance guarantees.
- Public CTAs should be consistent and tested by content checks.
- Navigation should remain available and accessible on desktop and mobile.
- Generated build artifacts should not be manually edited.
- Do not expose secrets or private operational details in public website content.

## External Dependencies

| Dependency | Usage |
| --- | --- |
| Next.js | App framework and build system |
| React | UI rendering |
| Tailwind CSS | Styling system |
| Framer Motion | Animation |
| Lucide React | Icons |
| npm audit | Production dependency risk check |

## Architecture Notes

- No backend API server was identified in this repo.
- No database or persistent data model was identified.
- CI currently focuses on build, lint, and critical production dependency audit.
- `CLAUDE.md` and `AGENTS.md` historically contained similar short guidance; keep `AGENTS.md` as the Codex entry point.
