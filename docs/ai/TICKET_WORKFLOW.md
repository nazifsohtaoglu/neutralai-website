# Ticket Workflow

Use this workflow when taking a website ticket from idea to PR.

## 1. Triage

Classify the ticket:

- `content`
- `visual-ui`
- `conversion`
- `accessibility`
- `performance`
- `bug`
- `refactor`
- `security`
- `infra`
- `docs`
- `test`

Then identify:

- affected route or component
- affected visitor flow
- product claim risk
- expected verification command
- unknowns to capture in `OPEN_QUESTIONS.md`

## 2. Plan

For non-trivial work, write a short plan:

1. Read the relevant route/component.
2. Check current design and content conventions.
3. Make the smallest focused change.
4. Update content tests if CTA/copy expectations change.
5. Run targeted verification.
6. Summarize residual risk.

### Blog Visual Workflow

For blog articles or content hub work:

- Define the visual story before creating the image: audience, tension, product role, and desired emotional takeaway.
- Write an art-direction prompt for each hero visual before generating or sourcing assets.
- Avoid generic diagrams, stock-photo filler, literal dashboards, and images that only repeat article text.
- Prefer professional editorial scenes, metaphors, and product-motion storytelling that make NeutralAI's role clear without overclaiming capabilities.
- Keep generated visuals free of readable text, customer logos, credentials, invented metrics, and unsupported compliance claims.
- Verify final images for mobile/desktop framing, caption quality, and visual consistency across the blog series.

## 3. Implementation Rules

- Prefer existing components and styles over new abstractions.
- Keep marketing claims precise and supportable.
- Do not invent statistics, customers, compliance status, or benchmark results.
- Do not mix unrelated redesign work into narrow tickets.
- Preserve user changes in the worktree.
- Never include secrets or credentials in code, docs, tests, logs, or PR text.

## 4. Verification

Use `docs/ai/TESTING_AND_COMMANDS.md`.

If verification cannot be run, record:

- command attempted or skipped
- reason
- expected risk
- recommended next check

## 5. Done Criteria

A ticket is ready when:

- the requested route/component/content change is complete
- targeted checks have run or the reason is documented
- `./scripts/codex-security-pre-review.sh` has run and blocking findings are addressed
- mobile/desktop visual risk has been considered for UI work
- PR notes include summary, validation, risks, and follow-ups
