# Public Claims Evidence Registry

Related issue: [#73](https://github.com/nazifsohtaoglu/neutralai-website/issues/73)
Last reviewed: 2026-07-03

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
| Homepage (`app/data/homepage.ts`) | `holdout overall F1` (`98.4%`), PERSON-holdout F1, entity-family count | `approved` | `app/data/benchmark-facts.json`, generated from the gateway artifacts by `scripts/sync-benchmark-facts.mjs` | Engineering + Product | 2026-07-21 | "Product benchmark, not a third-party independent evaluation. Measured on a sample held out from detector tuning." |
| Homepage (`app/data/homepage.ts`) | `measured overhead` (`~41 ms`) | `approved` | `app/data/homepage.ts`; trust-center latency wording separating gateway overhead from model generation | Engineering | 2026-05-15 | "Measured gateway overhead, reported separately from model generation time." |
| Homepage + Use Cases | `PHI-aware masking` | `approved` | `app/data/homepage.ts`; `app/use-cases/content.ts` healthcare section | Product + Compliance | 2026-05-15 | "PHI-aware masking support for eligible workflows; no blanket HIPAA claim." |
| Homepage + Use Cases | `BAA review support` | `approved` | `app/data/homepage.ts`; `app/use-cases/content.ts` healthcare disclaimers | Legal + Compliance | 2026-05-15 | "BAA review support for eligible deployments, subject to legal/commercial review." |
| Homepage (`app/data/homepage.ts`) | `Managed now, private cloud/on-prem planning` | `roadmap` | Pricing + deployment cards in `app/data/homepage.ts`; enterprise commercial path via contact flow | Product + Sales Engineering | 2026-05-15 | "Managed service is available; private cloud/on-prem are planned or scoped per enterprise review." |
| Security (`app/security/page.tsx`) | `Immutable compliance storage ... production readiness path` | `roadmap` | `app/security/page.tsx` explicitly marks this as future hardening milestone | Security + Engineering | 2026-05-15 | "Immutable compliance storage remains part of the production-hardening roadmap." |
| Security + Trust (`app/security/page.tsx`, `app/trust-center/page.tsx`) | `Readiness report/questionnaire under NDA` | `nda_only` | Trust-center caveats and evidence copy; security review contact path | Security + Legal | 2026-05-15 | "Detailed materials are shared through security/legal review, usually under NDA." |
| Developers (`app/developers/page.tsx`) | `SDKs are published to PyPI and npm` | `approved` | Published packages: [`neutralai-sdk`](https://pypi.org/project/neutralai-sdk/) (PyPI) and [`neutralai-node-sdk`](https://www.npmjs.com/package/neutralai-node-sdk) (npm); install commands shown on `app/developers/page.tsx` | Developer Relations + Engineering | 2026-06-12 | "Python and Node SDKs are published; install with `pip install neutralai-sdk` / `npm install neutralai-node-sdk`." |
| Use Cases (`app/use-cases/content.ts`) | FCA/PRA/PCI-DSS/GDPR support framing | `approved` | `app/use-cases/content.ts` disclaimers explicitly deny automatic approval claims | Compliance + Product Marketing | 2026-05-15 | "Supports review conversations, not automatic regulatory approval." |
| Trust Center (`app/trust-center/page.tsx`) | `No customer logos/testimonials until approved` | `approved` | `docs/customer-proof-framework.md`; trust-center "Customer Proof Framework" section | Marketing + Legal | 2026-05-15 | "Publish customer proof only after approval gates clear." |
| Benchmark (`app/benchmark/page.tsx`) | ~~`99.8%` vs `57.5%` pooled overall F1 head-to-head~~ | `remove` | RETIRED 2026-07-21 (gateway#1643). A pooled overall F1 conflated coverage with accuracy: the baseline is not configured to attempt most benchmarked entity families, took a structural zero on them, and the gap therefore widened every time an entity type was added without anything becoming more accurate. Guarded by `tests/content/presidio-comparison.test.mjs` | Engineering + Product | 2026-07-21 | "Do not publish a single pooled NeutralAI-vs-Presidio F1. Cite coverage and shared-entity accuracy separately." |
| Benchmark (`app/benchmark/page.tsx`) | ~~Pooled holdout overall F1~~ | `remove` | RETIRED 2026-07-21 (gateway#1645). Same defect as the retired public pooled score: it is dominated by pattern-matched families sitting at 1.0, so it rises whenever one is added — 98.4% -> 99.9% when the UK pack entered the holdout, with no detection change. PERSON-holdout F1 is published instead | Engineering + Product | 2026-07-21 | "Do not quote a pooled holdout F1. Cite PERSON-holdout F1 and the shared-entity comparison." |
| Benchmark (`app/benchmark/page.tsx`) | PERSON-holdout F1 vs vanilla baseline (96.0% vs 45.5%) | `approved` | `app/data/benchmark-facts.json` `holdoutSet.personF1`, generated from the gateway holdout artifact | Engineering + Product | 2026-07-21 | "PERSON is the NER-driven entity and the hardest one; measured on data held out from tuning." |
| Benchmark (`app/benchmark/page.tsx`) | False positives on holdout: 14 (NeutralAI) vs 378 (vanilla baseline) | `approved` | `app/data/benchmark-facts.json` `sharedEntityAccuracy`. NOTE our own count is no longer zero — the 14 are PERSON over-masking ordinary German/Spanish/Turkish words, tracked in gateway#1652 | Engineering + Product | 2026-07-21 | "Publish the real count. It is 14, not 0, and the gap to the baseline is still the point." |
| Benchmark (`app/benchmark/page.tsx`) | Coverage: 16 entity families attempted vs 3 in a vanilla Presidio configuration | `approved` | `app/data/benchmark-facts.json` `coverage`, generated from the gateway artifacts | Engineering + Product | 2026-07-21 | "A vanilla configuration is not asked to detect these families; this is a coverage difference, not a detection failure on its part." |
| Benchmark (`app/benchmark/page.tsx`) | Shared-entity accuracy: `97.4%` vs `72.7%` holdout F1, 0 vs 371 false positives | `approved` | `app/data/benchmark-facts.json` `sharedEntityAccuracy`, restricted to EMAIL_ADDRESS/PERSON/PHONE_NUMBER on the holdout split | Engineering + Product | 2026-07-21 | "Like-for-like: only the entity families both configurations attempt, measured on data held out from tuning." |
| Benchmark (`app/benchmark/page.tsx`) | `OpenAI Privacy Filter` comparison row | `needs_evidence` | No head-to-head evaluation has been run yet; row is explicitly marked pending with no NeutralAI-verified score. Makes no claim about whether OpenAI has published its own benchmark numbers. | Product + Engineering | 2026-07-03 | "NeutralAI has not evaluated OpenAI Privacy Filter on this benchmark set — no NeutralAI-verified comparison is published here yet." |
| Benchmark (`app/benchmark/page.tsx`) | UK identity, financial and legal pack (10 families incl. National Insurance number, sort code, bank account, HMRC UTR, Companies House number, court case number, SRA ID, Land Registry title, driving licence) | `approved` | Measured in the gateway benchmark since 2026-07-21 (gateway#1640); each family carries a 0.95 per-entity F1 floor enforced in CI | Product + Engineering | 2026-07-21 | "Measured entity families, each gated at a 0.95 F1 floor that fails the build on a regression." |
| Benchmark (`app/benchmark/page.tsx`) | Per-entity F1 breakdown across 16 entity families | `approved` | Per-entity precision/recall/F1 for every measured family is in the gateway artifact `pii_detection_accuracy_benchmark_2026q2.json`; floors enforced in CI (gateway#1640) | Engineering + Product | 2026-07-21 | "Per-entity scores are measured on synthetic prompts and act as a regression gate, not a forecast of real-world accuracy." |
| Benchmark (`app/benchmark/page.tsx`) | UK NHS number is a supported entity type today | `approved` | Gateway recognizer `UK_NHS_NUMBER` shipped in `neutralai-gateway` `app/core/engine.py`, and listed in published supported-entity sources (`app/data/homepage.ts`, `app/how-it-works/page.tsx`) | Engineering | 2026-07-03 | "Supported entity type — no published per-entity F1 yet." |
| Benchmark (`app/benchmark/page.tsx`) | UK National Insurance number detection | `approved` | Gateway recognizer `UK_NATIONAL_INSURANCE_NUMBER` is measured in the benchmark with a 0.95 CI-enforced F1 floor (gateway#1640) | Engineering + Product | 2026-07-21 | "Measured entity family with a CI-enforced accuracy floor." |
| Benchmark (`app/benchmark/page.tsx`) | UK postcode detection | `remove` | Deliberately NOT a default recogniser (gateway#1638): a postcode is often a legitimate location query rather than personal data, so masking it by default breaks ordinary tasks. Ships as an opt-in policy template | Product + Engineering | 2026-07-21 | "Opt-in policy template, off by default — enable it if your users do not search by location." |

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
