# Project Map

This file gives Codex a fast map of the NeutralAI website repository.

## Product Purpose

NeutralAI Website is the public marketing/product website for NeutralAI Gateway. It communicates the product value proposition, trust posture, feature narrative, and conversion paths for visitors interested in AI data protection and PII-safe LLM usage.

## Main Directories

| Path | Responsibility |
| --- | --- |
| `app/` | Next.js App Router pages, layout, global styles, and route segments |
| `app/components/` | Shared UI components such as navigation, footer, and reusable page elements |
| `public/` | Static public assets |
| `docs/` | Project documentation, dependency security notes, plans, and AI repo map |
| `tests/content/` | Node test runner content assertions |
| `.github/workflows/` | CI workflow for dependency/build/lint/audit checks |
| `out/`, `.next/` | Generated build output; do not edit manually |

## Entry Points

| Layer | Entry point |
| --- | --- |
| App shell | `app/layout.tsx` |
| Homepage | `app/page.tsx` |
| Shared UI | `app/components/*` |
| Global styles | `app/globals.css` |
| Next config | `next.config.js` |
| Package scripts | `package.json` |
| CI | `.github/workflows/dependency-security.yml` |

## Runtime and Frameworks

| Area | Choice |
| --- | --- |
| Runtime | Node.js |
| Framework | Next.js 16 App Router, React 18 |
| Styling | Tailwind CSS, global CSS |
| UI libraries | `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` |
| Package manager | npm with `package-lock.json` |
| Test runner | Node built-in test runner for content tests |
| Lint | ESLint 9 with Next config |
| Build | `next build` |

## Current Worktree Note

At the time this kit was installed, the target repo already had unrelated local changes in `app/components/Navbar.tsx`, `app/page.tsx`, `package.json`, Playwright output files, and `tests/content/primary-cta.test.mjs`. Treat those as user work unless explicitly told otherwise.

## Fast Reading Order

1. `AGENTS.md`
2. `docs/ai/PROJECT_MAP.md`
3. `docs/ai/ARCHITECTURE.md`
4. `docs/ai/FLOWS.md`
5. `docs/ai/RISK_REGISTER.md`
6. `docs/ai/TESTING_AND_COMMANDS.md`
7. `docs/ai/LAUNCH_READINESS_LEDGER.md` for launch go/no-go dependencies

## Assumptions

- Assumption: This repository is the public website, while the backend gateway product lives in a separate repository.
- Assumption: Generated `.next`, `out`, Playwright artifacts, and `node_modules` should not be edited manually.
