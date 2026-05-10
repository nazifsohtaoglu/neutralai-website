# Risk Register

Read this before changing sensitive website areas.

## Highest-Risk Areas

| Area | Files | Risk | Check before changing |
| --- | --- | --- | --- |
| Product claims | `app/page.tsx`, route copy, docs | Overstating compliance/security capabilities | Compare claims against actual product capability; avoid invented certifications/customers |
| Primary CTAs | `app/page.tsx`, `app/components/Navbar.tsx`, content tests | Broken conversion path or failing content tests | Verify labels, hrefs, and `npm run test:content` |
| Navbar/footer | `app/components/*`, `app/layout.tsx` | Broken navigation site-wide | Desktop/mobile check, accessibility basics |
| Global styling | `app/globals.css`, `tailwind.config.ts` | Layout/readability regressions | Build and browser check at multiple widths |
| Package/deps | `package.json`, `package-lock.json` | Build/lint/audit failures | Run build, lint, audit when dependencies change |
| Generated artifacts | `.next/`, `out/`, Playwright outputs | Committing generated noise | Do not edit manually; avoid staging unless explicitly requested |

## Specific Watch Items

1. Existing local changes were present when this kit was installed. Do not revert `app/components/Navbar.tsx`, `app/page.tsx`, `package.json`, or test/artifact changes unless the user explicitly asks.
2. Keep NeutralAI Gateway claims precise. If a capability is not verified from the gateway repo or product docs, write it as a roadmap/follow-up or ask.
3. Marketing pages should not contain secrets, internal URLs, private deployment details, or unsupported compliance claims.
4. Large animation changes should be checked for performance and mobile overlap.
5. If changing CTA copy, update content tests or add coverage.

## Before Changing Public Website Copy

- Identify the target visitor and buying stage.
- Check whether the claim is factual, aspirational, or unknown.
- Avoid hallucinating customer logos, certifications, regulatory approvals, or benchmark numbers.
- Prefer concrete product behavior over vague security language.
- Add unclear product facts to `docs/ai/OPEN_QUESTIONS.md`.
