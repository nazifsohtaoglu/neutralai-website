# WEB-104 Demo Video Brief

This is the production brief for the on-demand demo video ticket.

## Goal

Create a short walkthrough that helps enterprise buyers understand NeutralAI before booking a live sales call.

## Required Story

1. Start with the problem: teams are already using AI, but sensitive prompt data needs a control point.
2. Show the playground: paste a realistic prompt and run masking.
3. Show detection evidence: entity types, confidence, and sanitized output.
4. Show reversible governance: tokenized value, controlled restore, and audit posture.
5. Show browser/API rollout path: extension, gateway/API handoff, and policy controls.
6. End with the CTA: try the playground or book a live walkthrough.

## Current Asset

- Video: `public/demo/neutralai-product-walkthrough.webm`
- Captions: `public/demo/neutralai-product-walkthrough.vtt`
- Poster: `public/demo/neutralai-product-walkthrough-poster.png`
- Recorder: `scripts/record-neutralai-demo-video.mjs`

Run the local site first, then refresh the assets with:

```bash
npm run dev
DEMO_BASE_URL=http://localhost:3200 npm run record:demo-video
```

## Production Rules

- Use real product surfaces only; do not show fabricated dashboards or unsupported admin features.
- Keep the final video under three minutes.
- Include captions or a transcript for accessibility.
- Avoid customer names, secrets, private credentials, internal URLs, and raw real-world PII.
- Prefer the local reviewed asset by default. If marketing wants YouTube or Vimeo, host the approved video there and add the embed URL to `siteConfig.demoVideoEmbedUrl`.

## Open Blocker

The page now has a local Playwright-generated video, captions, and poster. An external hosted URL is still optional, but browser extension or admin dashboard footage should not be added until those surfaces are explicitly approved for public marketing use.
