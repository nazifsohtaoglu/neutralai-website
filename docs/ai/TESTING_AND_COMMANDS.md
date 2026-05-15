# Testing and Commands

Run commands from the repo root. If a required tool is missing, first try the user's local machine installation/path before treating it as blocked.

## Commands

| Purpose | Command | Working directory |
| --- | --- | --- |
| Install | `npm install` | repo root |
| Dev server | `npm run dev` | repo root |
| Production build | `npm run build` | repo root |
| Start production server | `npm run start` | repo root |
| Lint | `npm run lint` | repo root |
| Accessibility smoke checks | `npm run test:a11y-smoke` | repo root (after `npm run build`) |
| Visual smoke checks | `npm run test:visual-smoke` | repo root (after `npm run build`) |
| Content tests | `npm run test:content` | repo root |
| Production dependency audit | `npm run audit:prod` | repo root |
| Pre-review security gate | `./scripts/codex-security-pre-review.sh` | repo root |

`npm run dev` starts Next.js on `http://localhost:3200`.

## Test Selection by Change Type

| Change | Minimum verification |
| --- | --- |
| Homepage content/CTA | `npm run test:content`, `npm run build` |
| Shared UI component | `npm run lint`, `npm run build`, `npm run test:a11y-smoke`, `npm run test:visual-smoke` |
| Global CSS/Tailwind | `npm run build`, `npm run test:a11y-smoke`, `npm run test:visual-smoke` |
| Package/dependency | `npm run build`, `npm run lint`, `npm run audit:prod` |
| CI workflow | Review workflow syntax and run matching npm scripts locally |
| Docs only | No functional test required unless links/scripts changed |

## Browser Verification

For meaningful visual and accessibility changes, run:

```bash
npm run build
npm run test:a11y-smoke
npm run test:visual-smoke
```

`test:a11y-smoke` serves `out/` locally, runs Playwright checks for landmarks/headings/interactive-control names on representative routes, validates contrast-sensitive text selectors, verifies consent-banner controls and desktop/mobile keyboard reachability, and saves a JSON report to `output/accessibility-smoke/`.

`test:visual-smoke` serves `out/` locally, runs Playwright checks for desktop/tablet/mobile across launch-critical routes, asserts no horizontal overflow, validates mobile nav placement, and saves screenshots to `output/visual-smoke/`.

## Known Quality Gaps

- No explicit TypeScript typecheck script separate from `next build`.
- Content tests appear limited; broaden them if changing messaging or CTAs heavily.
