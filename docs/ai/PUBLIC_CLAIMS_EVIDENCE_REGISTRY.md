# Public Claims Evidence Registry

Related issue: [#73](https://github.com/nazifsohtaoglu/neutralai-website/issues/73)
Last reviewed: 2026-05-15

This registry maps high-risk public claims to their current evidence status, source, owner, and allowed wording.

Status values:

- `approved`: Public wording is supported by an approved source.
- `needs_evidence`: Claim can remain conservative, but supporting source package is incomplete.
- `nda_only`: Supporting details exist but are shared only through security/legal review.
- `roadmap`: Capability direction is valid, but rollout scope is not generally public/GA.
- `remove`: Claim should not be published in current wording.

## Claims Ledger

| Area | Public Claim | Status | Source | Owner | Review Date | Allowed Wording |
| --- | --- | --- | --- | --- | --- | --- |
| Homepage (`app/data/homepage.ts`) | `AES-256-GCM vault` and `AES-256-GCM-backed reversible tokenization` | `approved` | `app/data/homepage.ts`; `app/security/page.tsx`; gateway implementation references in security/trust content | Security + Product | 2026-05-15 | "AES-256-GCM-backed tokenization for governed restore paths." |
| Homepage (`app/data/homepage.ts`) | `SOC2 readiness` | `approved` | `app/trust-center/page.tsx` caveats: SOC2 is in progress, not completed | Security + Compliance | 2026-05-15 | "SOC2 readiness is in progress; this is not a certification claim." |
| Homepage (`app/data/homepage.ts`) | `GDPR-aligned controls` | `approved` | `app/use-cases/content.ts` (data-minimization mapping and disclaimers) | Compliance + Product Marketing | 2026-05-15 | "Supports GDPR-oriented minimization workflows; no blanket compliance guarantee." |
| Homepage (`app/data/homepage.ts`) | `Cyber Essentials via review` | `needs_evidence` | Trust-center evidence list plus internal readiness materials (not fully public) | Security | 2026-05-15 | "Cyber Essentials evidence is available through security review when applicable." |
| Homepage (`app/data/homepage.ts`) | `SOC2 / ISO / CE` value in proof card | `remove` | Old wording in `app/data/homepage.ts` replaced in ticket #73 | Product Marketing | 2026-05-15 | "SOC2 readiness / GDPR-aligned / Cyber Essentials via review." |
| Homepage (`app/data/homepage.ts`) | `public overall F1` (`99.8%`), holdout F1 metrics | `approved` | Source-of-truth comment in `app/data/homepage.ts` -> gateway benchmark artifacts (website issue #16 links) | Engineering + Product | 2026-05-15 | "Product benchmark, not a third-party independent evaluation." |
| Homepage (`app/data/homepage.ts`) | `measured overhead` (`~41 ms`) | `approved` | `app/data/homepage.ts`; trust-center latency wording separating gateway overhead from model generation | Engineering | 2026-05-15 | "Measured gateway overhead, reported separately from model generation time." |
| Homepage + Use Cases | `PHI-aware masking` | `approved` | `app/data/homepage.ts`; `app/use-cases/content.ts` healthcare section | Product + Compliance | 2026-05-15 | "PHI-aware masking support for eligible workflows; no blanket HIPAA claim." |
| Homepage + Use Cases | `BAA review support` | `approved` | `app/data/homepage.ts`; `app/use-cases/content.ts` healthcare disclaimers | Legal + Compliance | 2026-05-15 | "BAA review support for eligible deployments, subject to legal/commercial review." |
| Homepage (`app/data/homepage.ts`) | `Managed now, private cloud/on-prem planning` | `roadmap` | Pricing + deployment cards in `app/data/homepage.ts`; enterprise commercial path via contact flow | Product + Sales Engineering | 2026-05-15 | "Managed service is available; private cloud/on-prem are planned or scoped per enterprise review." |
| Security (`app/security/page.tsx`) | `Immutable compliance storage ... production readiness path` | `roadmap` | `app/security/page.tsx` explicitly marks this as future hardening milestone | Security + Engineering | 2026-05-15 | "Immutable compliance storage remains part of the production-hardening roadmap." |
| Security + Trust (`app/security/page.tsx`, `app/trust-center/page.tsx`) | `Readiness report/questionnaire under NDA` | `nda_only` | Trust-center caveats and evidence copy; security review contact path | Security + Legal | 2026-05-15 | "Detailed materials are shared through security/legal review, usually under NDA." |
| Developers (`app/developers/page.tsx`) | `SDKs are prepared for publication` | `roadmap` | `app/developers/page.tsx` explicitly states registry publication is in progress | Developer Relations + Engineering | 2026-05-15 | "SDK client shapes are public; install commands stay withheld until package publication is confirmed." |
| Use Cases (`app/use-cases/content.ts`) | FCA/PRA/PCI-DSS/GDPR support framing | `approved` | `app/use-cases/content.ts` disclaimers explicitly deny automatic approval claims | Compliance + Product Marketing | 2026-05-15 | "Supports review conversations, not automatic regulatory approval." |
| Trust Center (`app/trust-center/page.tsx`) | `No customer logos/testimonials until approved` | `approved` | `docs/customer-proof-framework.md`; trust-center "Customer Proof Framework" section | Marketing + Legal | 2026-05-15 | "Publish customer proof only after approval gates clear." |

## Repeatable Review Process For New Claims

1. Capture claim candidate in the related issue/PR with exact proposed wording.
2. Classify the claim as security, compliance, benchmark, deployment, or customer proof.
3. Attach evidence source link(s): code, benchmark artifact, doc, or approval note.
4. Assign status from this registry and add owner + review date.
5. If status is `needs_evidence`, `nda_only`, `roadmap`, or `remove`, keep/adjust wording to conservative language before merge.
6. Add or update content tests to lock conservative wording boundaries.
7. Re-run `npm run test:content` and `npm run build` before merge.

## Conservative Wording Rules (Enforced)

- Do not imply completed certification when status is readiness/in-progress.
- Do not imply independent validation for product benchmarks.
- Do not present legal advice or blanket compliance guarantees.
- Do not claim general availability for private-cloud/on-prem paths without explicit rollout confirmation.
- Do not publish NDA-only evidence details in public copy.
