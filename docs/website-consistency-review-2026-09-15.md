# Website consistency review — 15 September 2026

## Scope

Reviewed route copy, shared homepage content, answer/compliance content, security and deployment pages, diagrams, demo captions/recording source, blog claim matches, and playground result handling. This is a repository consistency review, not a fresh legal opinion or a certification of production infrastructure. Existing unrelated changes in the original checkout were excluded by using a separate worktree from origin/main.

## Changes

- Replace demo, About and Security editorial instructions with visitor-facing descriptions. Keep browser/API rollout discussion distinct from the recorded sample walkthrough.
- Remove invented local confidence percentages. A live mask response displays only returned text; local findings never become API evidence. Empty string results remain valid; malformed/failed responses explicitly become local previews; edited input invalidates stale responses.
- Explain before submission that hosted custom inputs go to the gateway, built-in samples run locally, and the playground does not call a model. Use fictional data for evaluation.
- Scope masking claims to detected identifiers and supported workflows. Explain that remaining document context may still be confidential; remove universal-tool and compliance guarantees from answer pages.
- Distinguish local processing from hosted gateway processing and restoration. Describe vault retention as time-limited encrypted mappings, not zero retention.
- Align private deployment copy around enterprise scoping. Remove conflicting named hosting-region claims pending operational confirmation.
- Remove legacy Growth plan references from buyer guidance, distinguish provider BYOK from vault key custody, and direct readers to current pricing.
- Make the hidden-pricing state a current pricing enquiry rather than a conflicting prelaunch announcement. Remove the unsupported implication that entering a VAT number automatically exempts a UK customer.
- Update the demo recording workflow and public recording to match the revised playground.

## Evidence and boundaries

The gateway repository's vault implementation supports encrypted mappings with a configurable TTL (900 seconds by default). Its browser extension supports configured local/remote processing. Website claim wording must not imply hosted processing occurs inside every customer's device or network.

The public benchmark remains a separate, explicitly qualified product evaluation; this PR does not change scores or incorporate the original checkout's uncommitted benchmark work. Existing statements about third-party events/regulatory history were not comprehensively reverified. Specific region, commercial entitlements and release configuration questions are recorded in `docs/ai/OPEN_QUESTIONS.md` for Platform/Product owners rather than guessed.

## Verification

- `npm run test:content`
- `npm run lint`
- `npm run build`
- `npm run test:playground-results` — mocked responses; no real customer data or live API submissions.
- `npm run test:a11y-smoke`
- `npm run test:visual-smoke`
- Repository security pre-review and independent diff review before PR; Codex PR review loop after publication.

## Security review disposition

The security pass found additional absolute data-flow wording in How It Works, Security and Trust Center; those fixes were retained. The suggested silent-video conversion was not retained: the existing narration describes the sample workflow, and the newly recorded UI explicitly identifies illustrative local results. Keeping the matching narration/captions avoids an unrelated audio regression. Production confidence scores are absent from the updated recording. Retention badges now say policy-dependent where the accompanying text depends on deployment configuration.
