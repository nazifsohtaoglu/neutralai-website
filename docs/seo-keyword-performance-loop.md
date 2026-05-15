# SEO Keyword Source of Truth and Content Performance Loop

Decision date: 2026-05-15  
Decision owner role: Content + Growth

This document defines the canonical SEO workflow for WEB-103 planning and for future blog/use-case tickets.

## Canonical Sources

1. Search demand source of truth: Google Ads Keyword Planner export (monthly search volume).
2. Search performance source of truth: Google Search Console Performance export (queries, clicks, impressions, CTR, average position).
3. Conversion source of truth: PostHog CTA and funnel dashboards defined in `docs/analytics-setup.md`.

Assumption: Product Analytics and Growth maintain access to Google Ads Keyword Planner and Google Search Console in private ops systems.

## Why This Source Stack

- Keyword Planner provides standardized monthly search-demand inputs for pre-publication keyword selection.
- Search Console provides real query and ranking outcomes after publication.
- PostHog ties SEO traffic to conversion-intent behavior instead of measuring traffic alone.

Using one tool alone is weak: search-volume-only planning misses on-page performance, and ranking-only reporting misses demand opportunity.

## Required Data Contract

Every tracked page must have one row in the SEO tracker with these fields:

- `url_path`
- `content_type` (`blog` or `use_case`)
- `primary_keyword`
- `secondary_keywords` (comma separated, optional)
- `buyer_intent` (`problem-aware`, `solution-aware`, `vendor-comparison`, `implementation`)
- `keyword_source_export_date` (date of the Keyword Planner export used)
- `monthly_search_volume_band` (as provided by Keyword Planner export)
- `search_console_snapshot_date`
- `clicks_28d`
- `impressions_28d`
- `ctr_28d`
- `avg_position_28d`
- `primary_cta_target` (`signup`, `demo`, `enterprise`, `security-review`)
- `next_review_date`
- `owner_role`

## Current Target Keyword Map

| URL path | Primary keyword | Buyer intent | Review cadence |
| --- | --- | --- | --- |
| `/blog/why-pii-masking-matters-for-enterprise-ai-adoption` | pii masking for enterprise ai | problem-aware | Every 28 days |
| `/blog/how-uk-financial-services-teams-use-ai-safely-under-fca-guidance` | ai governance financial services uk | implementation | Every 28 days |
| `/blog/hidden-cost-of-shadow-ai-security-control-point` | shadow ai risk management | problem-aware | Every 28 days |
| `/blog/pii-detection-accuracy-regex-vs-ner-vs-llm` | pii detection accuracy | solution-aware | Every 28 days |
| `/blog/from-presidio-to-production-regulated-teams` | presidio alternative for production | vendor-comparison | Every 28 days |
| `/blog/neutralai-vs-private-ai-vs-nightfall-pii-detection-benchmark-2026` | pii detection benchmark comparison | vendor-comparison | Every 28 days |
| `/use-cases/legal` | legal ai data protection | implementation | Every 28 days |
| `/use-cases/financial-services` | financial services ai data protection | implementation | Every 28 days |
| `/use-cases/healthcare` | healthcare ai data protection | implementation | Every 28 days |
| `/use-cases/insurance` | insurance ai data protection | implementation | Every 28 days |

## Performance Review Loop

1. Weekly (every Monday): export last 28 days from Search Console and refresh tracker metrics.
2. Monthly (first business day): export latest Keyword Planner volumes for all primary keywords.
3. Monthly review: flag pages that match any of:
   - average position worse than 20 with impressions above 100/month
   - CTR below 1.5% for non-branded queries
   - conversion-intent CTA clicks below target baseline for that page cluster
4. Refresh cycle: queue one content refresh ticket per flagged page cluster with a clear hypothesis.
5. Post-refresh verification: compare 28-day and 56-day snapshots before and after refresh.

## Ticket Requirements for Future Content Work

For every new blog or use-case ticket:

- include at least one target primary keyword from the approved Keyword Planner export
- declare buyer intent in the ticket body
- include success checks for Search Console and PostHog after publish
- avoid unsupported claims or invented benchmark/customer evidence

Tickets that do not include keyword source and buyer intent are not ready for implementation.
