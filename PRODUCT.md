# PRODUCT.md — NeutralAI Marketing Website

## Register

Brand (marketing site) — design IS the product here: the site must earn trust for a security product before a single feature is shown.

## What this is

Public marketing site for NeutralAI Gateway: a PII-masking layer for generative AI, aimed at regulated UK teams (law firms first, finance second). It sits between staff and AI tools, masking client-identifiable data before prompts leave the browser, with reversible tokenization and audit evidence.

## Target users

- **Sarah** — COLP/practice manager at a 10–50 person UK law firm. Non-technical, risk-literate, time-poor. Reads: Law Society Gazette, Legal IT Insider.
- **Priya** — owner of a small DPO/GDPR consultancy (partner channel). Compliance jargon fluent; recommends tools to clients.
- **Mark** — MSP owner serving law firms. Technical, procurement-aware.
- Secondary: developers evaluating the API/SDK (/developers, playground).

## Brand personality

Calm engineer in the cockpit: "specs, not hype". Stoic, precise, evidence-led. The voice makes strong claims only when a benchmark, ruling, or primary source backs them — and links it. Trust is the product; drama is the enemy. But calm ≠ flat: the site should feel like a well-lit control room, not a PDF.

## Anti-references (what we must NOT look like)

- Generic SaaS gradient-hero template ("AI-powered platform" slop).
- Fear-mongering security vendor (red alerts, hacker imagery, FUD).
- Legal-industry beige (parchment, serif-solemn, stock gavel photos).
- Wall-of-text compliance PDF — the exact failure mode of content pages: same-size grey text, no hierarchy, nothing to hold the eye.

## Strategic design principles

1. **Evidence as decoration.** The most interesting visual material IS the product material: masked-token transformations (`Sarah Thompson` → `<PERSON_7K9X>`), benchmark numbers, verbatim regulator quotes, dates. Style these as first-class visual objects (big, monospace, colored), not as body text.
2. **One accent does meaning, one does action.** Cyan = product/trust/interactive identity; orange = conversion CTAs only. Purple sparingly for "intelligence". Never decorative rainbow.
3. **Readable dark.** Body text ≥16px, slate-200/300 on dark backgrounds (4.5:1 minimum); slate-400/500 reserved for genuinely secondary metadata. If a page feels faint, the greys are wrong.
4. **Content pages carry the same craft as the homepage.** /compliance, /answers, /blog are the pages AI assistants cite and buyers actually read — they deserve hero treatment, pull-quotes, visual rhythm, not template prose.
5. **Motion is quiet and purposeful**: reveal, hover-lift, glow on interactive elements; respects prefers-reduced-motion.
