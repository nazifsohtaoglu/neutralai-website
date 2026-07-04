# NeutralAI Website Post-Ticket Red-Team Check

Use this prompt with an independent reviewer before opening a PR.

## Mode

- Review only the diff vs `origin/main`.
- Think adversarially: try to break, manipulate, or misuse the change.
- Do not trust the implementation author's assumptions.
- Keep output short, actionable, and ordered by severity.

## Objective

Find blockers before review:

1. Security or privacy regressions.
2. Public claim overstatement or unsupported product capability claims.
3. Trust-boundary confusion, secret exposure, unsafe headers, or unsafe external links.
4. Missing tests for the changed behavior.
5. Operational regressions in static export, edge headers, redirects, robots, sitemap, or well-known discovery files.

## Required Focus

- Secrets, tokens, credentials, private URLs, and internal-only metadata.
- Public marketing or compliance claims that are not supported by current product evidence.
- CSP/header changes, `Link` headers, `Content-Signal`, robots, sitemap, and `.well-known` resources.
- Unsafe JavaScript/React/Next.js patterns such as raw HTML sinks, dynamic script execution, open redirects, or client-exposed secrets.
- Accessibility, conversion, and visual regressions when UI files are touched.

## Finding Format

For each issue:

- Severity: Critical / Important / Minor
- Location: file and line
- Evidence: exact snippet or behavior
- Impact: what could go wrong
- Fix: smallest safe change

If there are no Critical or Important issues, say that explicitly and list residual risks.
