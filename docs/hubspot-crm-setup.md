# HubSpot CRM Setup

This website loads HubSpot forms from public environment variables only. Do not commit portal credentials, private app tokens, API keys, webhook secrets, or Slack tokens.

## Required Public Environment Variables

- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- `NEXT_PUBLIC_HUBSPOT_REGION`
- `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID`
- `NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID`
- `NEXT_PUBLIC_HUBSPOT_ENTERPRISE_FORM_ID`
- `NEXT_PUBLIC_HUBSPOT_SECURITY_REVIEW_FORM_ID`

## Required HubSpot Contact Properties

The HubSpot forms should capture these buyer qualification fields:

- `full_name`
- `email`
- `company_name`
- `company_size`
- `message`
- `referral_source`
- `website_intent`
- `lead_source`
- `website_page_url`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer_host`
- `landing_page_path`

## Form Routing

- Demo requests use `/contact?intent=demo`.
- Enterprise and pricing enquiries use `/contact?intent=enterprise`.
- Security review requests use `/contact?intent=security-review`.

Each form should redirect to `/contact/thanks/` after submission.

## Operational Setup Outside The Repo

- Create the HubSpot pipeline stages: Lead, Qualified, Demo, Proposal, Won, Lost.
- Configure HubSpot notifications for new website leads.
- Configure confirmation emails for demo, enterprise, and security-review forms.
- Connect Slack notifications through HubSpot or the team's approved automation layer.
- Add global tracking only after cookie consent and analytics ownership are approved.
