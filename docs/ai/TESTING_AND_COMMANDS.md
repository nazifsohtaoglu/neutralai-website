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
| Content tests | `npm run test:content` | repo root |
| Production dependency audit | `npm run audit:prod` | repo root |
| Pre-review security gate | `./scripts/codex-security-pre-review.sh` | repo root |

`npm run dev` starts Next.js on `http://localhost:3200`.

## Test Selection by Change Type

| Change | Minimum verification |
| --- | --- |
| Homepage content/CTA | `npm run test:content`, `npm run build` |
| Shared UI component | `npm run lint`, `npm run build`; browser screenshot check when visual |
| Global CSS/Tailwind | `npm run build`; browser check on desktop and mobile |
| Package/dependency | `npm run build`, `npm run lint`, `npm run audit:prod` |
| CI workflow | Review workflow syntax and run matching npm scripts locally |
| Docs only | No functional test required unless links/scripts changed |

## Browser Verification

For meaningful visual changes, start the dev server and inspect the page:

```bash
npm run dev
```

Then open `http://localhost:3200` in the browser. Check at least desktop and mobile widths for layout overlap, CTA visibility, and navigation.

## Known Quality Gaps

- No dedicated Playwright test script is currently in `package.json`.
- No explicit TypeScript typecheck script separate from `next build`.
- Content tests appear limited; broaden them if changing messaging or CTAs heavily.
