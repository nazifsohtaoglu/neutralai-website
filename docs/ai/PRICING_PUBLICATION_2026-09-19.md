# Monthly pricing publication — 19 September 2026

## Owner decision

The product owner explicitly authorized immediate publication of the existing monthly prices and then directed that the website change be committed and published through the repository's automatic deployment. This is an approved publication exception to the previous default-off accountant/legal-review prerequisite; it is not evidence of a new accountant or legal review. No Stripe amounts, tax configuration, or billing periods are changed by this release.

## Verified price and checkout evidence

At 20:54 UTC, production Chrome testing followed the application pricing CTA through billing into live Stripe Checkout for each plan. The merchant was NS APPLIED TECHNOLOGIES LTD. These existing values also match app/data/homepage.ts:

| Plan | Monthly GBP | Checkout total due GBP |
| --- | ---: | ---: |
| Developer | 9 | 9 |
| Starter | 29 | 29 |
| Team | 99 | 99 |
| Business | 299 | 299 |

Each checkout showed the matching plan and monthly billing period. No card was entered or payment submitted; each flow returned via Back to merchant. The account was an existing authenticated test account. A separate fresh-account Starter signup subsequently reached the same £29 monthly checkout without payment.

Evidence is retained in the launch workspace under `neutralai/pazarlama/kanitlar/2026-09-19-live-four-plan-checkout-browser.json` and `2026-09-19-live-fresh-signup-starter.json`. These records contain no card data or credentials. Website PR #181 records the publication change. Local static export verified all four monthly prices and absence of the hidden-pricing notice; production website verification follows merge.

## Explicit limits and remaining verification

Price and checkout parity is verified; comprehensive entitlement-matrix parity is not closed by those checks. Provider BYOK entitlement and supported private-deployment offers remain separate Product/Billing follow-ups. Actual paid activation was not exercised in production. No new legal, compliance, private-deployment, or general-availability approval is asserted here. Annual self-serve billing remains unavailable.

The owner-authorized publication proceeds with these remaining verification limits recorded, rather than treating checkout totals as proof of every advertised entitlement.
