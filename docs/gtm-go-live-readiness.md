# GTM Go-Live Readiness Report

> Ticket: TEN-SOC-05 (#1335) — GTM go-live gate: legal clearance + website readiness smoke-test
> Date: 2026-06-27 · Domain verified from `app/site.ts` → `https://neutralai.co.uk`
> Scope: live website smoke-test + legal-clearance summary + cross-links. This report does **not** make legal decisions.

---

## A. Live Smoke-Test Results

All checks run against production (`https://neutralai.co.uk`) via direct HTTP fetch (Node `fetch`).
Note: `WebFetch` returns 403 from a bot/WAF rule, so rendered-content checks were done with raw `fetch` + the public API the playground itself calls. No fake leads were submitted to any CRM.

| Surface | URL | Status | Result | Finding |
|---|---|---|---|---|
| Homepage | `/` | 200 | Renders; ~224 KB | OK |
| Pricing | `/#pricing` (section on `/`) | 200 | Plans render: **Free, Starter, Team, Business, Enterprise**. Prices present: £0, £29, £99, £299 (+ annual/per-seat variants £3/£10/£25). | OK — pricing is a homepage anchor section, not a standalone `/pricing` page. |
| Playground | `/playground` | 200 | Interactive PII-masking demo page renders (~44 KB) with playground/mask markers. Backing API verified live (see next row). | OK |
| Playground API (live mask) | `POST https://api.neutralai.co.uk/v1/shield/mask` | 200 | Synthetic test `prompt` → `{"status":"neutralized","masked_text":"... <EMAIL_ADDRESS> ... <PHONE_NUMBER>"}`. CORS preflight (`OPTIONS`) → 200, `Access-Control-Allow-Origin: https://neutralai.co.uk`. End-to-end masking confirmed working. | OK |
| Lead-capture form | `/contact` (and `?intent=security-review`) | 200 | Form renders with Full name / Work email / Company / Size / Message fields + **"Send Request"** button. The **missing-config notice is NOT shown**, which means the Google Sheets lead endpoint env var is set in the production build, i.e. the form is wired. | OK (wired) — see findings below re: endpoint not POST-tested + Risk-Scan branding. |
| API health | `https://api.neutralai.co.uk/health` | 200 | Backend reachable. | OK |

### Smoke-test findings (non-blocking unless noted)

1. **Lead-form POST not exercised end-to-end.** The form posts to a Google Apps Script (`script.google.com/macros/s/.../exec`) endpoint. The client-side validator (`GoogleSheetsLeadForm.tsx`) confirms the endpoint is configured (the "not configured" fallback notice does not render in prod), but I deliberately did **not** submit a payload to avoid writing a junk row into the live lead sheet. **USER/OPS ACTION:** do one manual end-to-end submit (clearly-marked test row) and confirm it lands in the sheet + redirects to `/contact/thanks/`, then delete the test row.
2. **No dedicated "Risk-Scan" landing surface.** The GTM lead magnet is the "14-Day Shadow AI Risk Scan" (per `sosyal-medya/.../pazarlama/risk-scan-one-pager.md`), but the live site has **no `/risk-scan` page** and the string "Risk Scan" does not appear on the contact page. LinkedIn/blog CTAs that promise a "Risk Scan" currently land on the generic `/contact` form. **FINDING:** either add a Risk-Scan landing page/section before week-1 publish, or make CTAs explicitly point at `/contact?intent=...` with matching copy. (Do not fix the live site under this ticket — flagging only.)
3. **Pricing is a homepage anchor, not a standalone page.** Acceptance criterion says "live pricing page"; the implementation is `/#pricing`. Functionally fine, but confirm external/marketing links use `/#pricing` (they do in `app/site.ts` `homeSections.pricing`).

---

## B. Legal-Clearance Summary (from `kurumsal-hukuki-kurulum.md`)

Source: `/Users/nazifsohtaoglu/sosyal-medya/neutralai/kurumsal-hukuki-kurulum.md` (Turkish). The file is explicitly **not legal/tax advice** — it is prep for a solicitor + accountant. Context: founder is full-time at Stepstone (Totaljobs); NeutralAI built on personal time/devices/accounts; the LTD is to be incorporated in the spouse's name for tax reasons. Clean legal setup must complete **before taking revenue and before aggressive selling.**

Checklist items relevant to the three named topics:

| Topic | What the checklist says | Posting-tone implication |
|---|---|---|
| **Invention assignment / IP ownership** | Find the employment-contract clause; determine its scope ("during work" vs broad "any invention in the employer's field, even off-hours"). Open question: does NeutralAI IP fall under it? Adjacency warning: Stepstone processes candidate PII + uses AI; NeutralAI is "pre-LLM PII masking" — different market but neighbouring theme. **Do not assume "unrelated."** | Until a solicitor confirms IP sits with the founder, public "I built/own this product" framing carries risk. Favour an "AI Security Researcher" authority stance over "founder, buy now." |
| **Outside activity / moonlighting** | Determine whether side work is fully banned, or needs disclosure / written approval. | Behaviour rules (§8): ✅ low-visibility authority content; ❌ aggressive "I'm the founder, buy now"; ❌ selling to Stepstone customers/network; ❌ NeutralAI work on employer time/resources. |
| **IP clean transfer (founder → LTD)** | Sequence matters: (1) contract review confirms IP is the founder's → (2) clean-room evidence → (3) LTD formed (spouse ordinary shares, accountant-approved) → (4) signed/dated IP assignment → (5) all assets (domain, repo, Stripe, bank) moved to LTD. If step 1 says "IP belongs to employer," the assignment is void. | All asset/ownership moves must precede revenue and partner/referral signatures. |

### Posting-tone assessment

The checklist's **own §8 "stealth" rules already define a legally-cautious posting tone** — authority-building / "AI Security Researcher", low visibility, channel-led, no aggressive founder-selling, no selling into the employer's customers. As long as week-1 LinkedIn/blog posts stay in that lane, the **tone** is consistent with the document's own guardrails.

**However, this is not a legal sign-off.** Three items remain *verify*-state in the document (contract IP clause, spouse-LTD vs HMRC settlements, clean founder→LTD transfer) and the document repeatedly directs final decisions to a licensed solicitor + accountant. I am **not** marking any legal checklist item resolved.

### USER ACTIONS (founder sign-off required — blocking for revenue/aggressive sales, not necessarily for stealth content)

- [ ] **USER ACTION (legal):** Employment solicitor review of the 4 contract clauses (invention assignment, outside activity, non-compete/non-solicitation, confidentiality) → written opinion: who owns NeutralAI IP, is disclosure/approval required.
- [ ] **USER ACTION (tax):** Accountant review of the spouse-LTD structure (HMRC settlements / S624 ITTOIA, Arctic Systems, founder's role + salary/dividend balance).
- [ ] **USER ACTION (legal):** Execute the IP assignment (founder → LTD) **after** ownership is confirmed; then move domain/repo/Stripe/bank to the LTD.
- [ ] **USER ACTION (content):** Confirm planned week-1 posts stay within §8 stealth tone (no "founder, buy now"; no selling to Stepstone customers/network) before publishing.
- [ ] **USER ACTION (legal+tax):** Pricing/commission copy review before publish (checklist §7 + BUS-020 §10) — ties to #914.

---

## C. Cross-Links

### Depends on #1177 — "After company set up: production go-live switches"
This GTM gate is **downstream of #1177**. #1177 is `[BLOCKED]` until company formation and covers the technical go-live switches that must flip before marketing+sales:
- Stripe live keys + usage-metering outbox worker (off by default).
- Product-email outbox + Resend production secrets (SPF/DKIM/DMARC).
- Compliance-retention secrets (#731).
- **Browser-extension store publish + website "Install extension" CTAs pointing at live store URLs** — directly affects this website's go-live readiness.

→ **GTM cannot go live before #1177's switches are flipped.** In particular, confirm the site's Install-extension CTAs point at live store URLs (per #1177 §4) as part of website readiness.

### Depends on #914 — "Draft referral partner agreement commission schedule"
#914 drafts the referral commission schedule (20% of first-year net subscription revenue) and **requires explicit accountant + legal review gates before external publication or signature.** Any week-1 GTM content that mentions partner/referral/commission terms is gated on #914 being legally + accountant-reviewed. This overlaps the legal checklist's §7 "pricing/commission copy publish öncesi accountant+legal review" item.

→ **Do not publish partner/commission-bearing copy until #914 clears its review gates.**

---

## D. GO / NO-GO Recommendation

**Recommendation: CONDITIONAL NO-GO for week-1 publish** — the live website surfaces are technically healthy, but go-live is gated on founder legal sign-off and two dependency tickets.

**What is GREEN (website surfaces):**
- Homepage, pricing section, playground, contact/lead form, and the live masking API all return HTTP 200 and render/function correctly.
- Playground masking is verified working end-to-end against the production API.
- Lead form is wired (production endpoint configured).

**Blocking items (must clear before GO):**
1. **Legal sign-off (USER ACTIONS, §B):** solicitor IP/outside-activity opinion + accountant spouse-LTD opinion + executed IP assignment. The checklist itself bars revenue/aggressive sales until these complete.
2. **#1177 go-live switches** not yet flipped (company not formed; Stripe/email/extension-store steps pending). Confirm Install-extension CTAs point at live store URLs.
3. **#914 referral agreement** not yet through legal+accountant review — blocks any partner/commission copy.

**Non-blocking, fix-before-publish (website findings, §A):**
4. Manual end-to-end lead-form submission test (then delete test row).
5. Add a Risk-Scan landing surface or align CTAs, since the lead magnet currently has no dedicated page.

**Allowed now (within checklist §8 stealth tone):** "AI Security Researcher" authority content, low-visibility/channel-led activity. This is a *content posture*, not a commercial GTM launch — the founder should confirm planned posts stay in this lane.

---

_Generated for #1335. The orchestrator/founder owns all legal and GO/NO-GO decisions; this report is evidence + recommendation only._
