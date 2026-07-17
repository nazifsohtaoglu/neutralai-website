// Data source of truth for the /answers hub (#147).
// Buyer-phrased questions, ~100-word direct answers up top (GEO passage
// format), FAQPage schema per page. Every load-bearing claim is verified
// against the internal claims register and primary sources on lastReviewed.

export type AnswerEntry = {
  slug: string
  question: string
  category: string
  metaTitle: string
  metaDescription: string
  directAnswer: string
  sections: { heading: string; paragraphs: string[] }[]
  keyPoints?: string[]
  faq: { question: string; answer: string }[]
  sources?: { label: string; url: string }[]
  related: { label: string; href: string }[]
  lastReviewed: string
}

const LAST_REVIEWED = '17 July 2026'

export const answerEntries: AnswerEntry[] = [
  {
    slug: 'can-law-firms-use-chatgpt-with-client-data',
    question: 'Can law firms use ChatGPT with client data?',
    category: 'Legal AI',
    metaTitle: 'Can Law Firms Use ChatGPT With Client Data?',
    metaDescription:
      'What UK guidance and the Upper Tribunal actually say about law firms using ChatGPT with client data — and the technical control that changes the answer.',
    directAnswer:
      'Not with identifiable client data in the clear. The Law Society’s guidance says confidential data should not go into free, public generative AI tools, and the Upper Tribunal accepted in Munir v SSHD that pasting client correspondence into ChatGPT was a data breach. Law firms can still use ChatGPT productively in two ways: under an enterprise contract with retention and no-training guarantees, or — for any tool — by masking client-identifiable information before the prompt leaves the firm, so the model receives a de-identified version and confidentiality is never in question.',
    sections: [
      {
        heading: 'What the rules actually say',
        paragraphs: [
          'No UK rule bans law firms from using generative AI. The Law Society’s "Generative AI – the essentials" guide (first published November 2023, updated June 2026) permits use but is blunt about public tools: do not put confidential data into them, and use fictional data for testing. The SRA’s Risk Outlook report frames non-adoption as a risk in itself — the regulator’s concern is uncontrolled use, not use.',
          'The case law made this concrete. In Munir v SSHD, an immigration adviser used ChatGPT to summarise Home Office decision letters and polish client emails — routine work, no bad intent. When it surfaced in a tribunal hearing, he accepted it amounted to a data breach and self-reported to his regulators. The tribunal characterised uploading client material to an open AI tool as placing it in the public domain.',
        ],
      },
      {
        heading: 'The two compliant paths',
        paragraphs: [
          'Path one is contractual: ChatGPT Enterprise or an API agreement with no-training and retention commitments. It works — inside that one contract. It does nothing about staff using the free tier, other AI tools, or personal devices, and it still sends real client identifiers to the provider.',
          'Path two is technical: mask client-identifiable information before the prompt leaves the browser. Names, addresses, NI and NHS numbers, and case references become placeholders like <PERSON_7K9X>; the model works on the de-identified text; the real values are restored locally when the answer returns. The confidential content never reaches the provider, whichever tool staff use — and an audit trail records that the control ran.',
        ],
      },
    ],
    keyPoints: [
      'No ban exists — but identifiable client data in public AI tools is treated as a confidentiality breach.',
      'The Upper Tribunal has already accepted that pasting client letters into ChatGPT was a data breach.',
      'Enterprise contracts protect one tool; masking protects the prompt on every tool.',
      'Evidence matters: an audit trail of what was masked turns policy into something you can demonstrate.',
    ],
    faq: [
      {
        question: 'Is ChatGPT Enterprise enough on its own?',
        answer:
          'It covers the tool it contracts for. The gap is everything else: free-tier use, other AI tools, personal devices. Most firms combine an approved enterprise tool with a technical control that applies to whatever staff actually use.',
      },
      {
        question: 'What happened to the adviser in the tribunal case?',
        answer:
          'He accepted the breach and self-reported to the SRA and the IAA; the tribunal said it would have referred him had he not. There was no fine in that case — the exposure is regulatory referral, potential unlimited fines or striking-off at the disciplinary stage, and UK GDPR liability.',
      },
      {
        question: 'Does masking client data change the legal position?',
        answer:
          'It changes what the AI provider receives: de-identified text instead of confidential client information. That materially reduces the disclosure — though it is a risk-reduction control, not a legal guarantee, and firms still need policy and appropriate provider terms.',
      },
    ],
    sources: [
      {
        label: 'Law Society — Generative AI – the essentials',
        url: 'https://www.lawsociety.org.uk/topics/ai-and-lawtech/generative-ai-the-essentials',
      },
      {
        label: 'SRA — Risk Outlook: AI in the legal market (Nov 2023)',
        url: 'https://www.sra.org.uk/sra/research-publications/artificial-intelligence-legal-market/',
      },
    ],
    related: [
      { label: 'What did the UK tribunal say about ChatGPT and client data?', href: '/answers/uk-tribunal-chatgpt-client-data-ruling' },
      { label: 'UK compliance hub — all regulator guidance mapped', href: '/compliance' },
      { label: 'Legal use case — how firms deploy the control', href: '/use-cases/legal' },
      { label: 'How do I stop staff pasting PII into ChatGPT?', href: '/answers/stop-staff-pasting-pii-into-chatgpt' },
    ],
    lastReviewed: LAST_REVIEWED,
  },
  {
    slug: 'stop-staff-pasting-pii-into-chatgpt',
    question: 'How do I stop staff pasting PII into ChatGPT?',
    category: 'Practical controls',
    metaTitle: 'How to Stop Staff Pasting PII Into ChatGPT',
    metaDescription:
      'Policy and training fail under deadline pressure. The four options for stopping PII reaching ChatGPT — bans, training, enterprise contracts, and prompt-layer masking — compared honestly.',
    directAnswer:
      'You cannot reliably stop it with policy alone — you make it technically impossible for the PII to reach the tool. The four options are: ban AI (usage moves to personal devices and you lose visibility), train staff (helps, but fails under deadline pressure), buy an enterprise AI contract (covers one tool only), or mask PII at the point of use, in the browser, before the prompt leaves. Masking is the only option that works regardless of which AI tool staff choose, without slowing them down — and it produces an audit record instead of a blind spot.',
    sections: [
      {
        heading: 'Why bans and training keep failing',
        paragraphs: [
          'Samsung’s experience is the canonical example: within roughly twenty days of allowing ChatGPT, engineers had pasted proprietary source code and meeting notes into it three times — not sabotage, just people trying to work faster. The company banned generative AI outright, trading the leak risk for a permanent productivity tax and zero visibility into what still happens on personal devices.',
          'Training suffers a quieter failure: it depends on a busy person remembering the rule at the exact moment they paste. Data from DLP vendor Cyberhaven suggests a small fraction of employees account for the large majority of sensitive pastes — and they are usually the heaviest, most productive AI users.',
        ],
      },
      {
        heading: 'What a point-of-use control looks like',
        paragraphs: [
          'A browser extension sits on the AI sites staff already use. When someone types or uploads content containing PII — names, emails, phone numbers, NI or NHS numbers, account references — the identifiers are detected and replaced with placeholders before submission. The person keeps working; the model still gets a coherent prompt; the identifying data never leaves.',
          'Because the control runs at the point of use, it does not care which AI tool is involved, and it generates the thing bans and training never can: evidence. Category-level logs show what was protected, when, and under which policy — without storing the raw content.',
        ],
      },
    ],
    keyPoints: [
      'Bans push usage to personal devices — the risk goes invisible, not away.',
      'Training fails at the moment of deadline pressure; the heaviest AI users paste the most.',
      'Enterprise contracts cover one tool; staff use many.',
      'Masking at the point of use works on every tool and produces audit evidence.',
    ],
    faq: [
      {
        question: 'Does blocking AI sites at the firewall work?',
        answer:
          'Partially, on managed networks — and not at all on phones or home connections. The tribunal case and the Samsung leaks both happened around policies, not in their absence. Blocking also removes the productivity benefit rather than making it safe.',
      },
      {
        question: 'Will masking break the usefulness of the AI answer?',
        answer:
          'Rarely. Most legal, financial, and operational questions do not depend on real names — a structurally faithful placeholder preserves the reasoning task. Where the real values matter for reading the answer, reversible tokenisation restores them locally after the response returns.',
      },
      {
        question: 'How fast can this be deployed?',
        answer:
          'A browser extension installs in minutes per user, and enterprise policy tooling can force-install it across managed browsers. No network changes and no security team required.',
      },
    ],
    related: [
      { label: 'What is shadow AI?', href: '/answers/what-is-shadow-ai' },
      { label: 'What is reversible PII tokenization?', href: '/answers/what-is-reversible-pii-tokenization' },
      { label: 'Install the browser extension', href: '/install-extension' },
      { label: 'Published detection benchmark', href: '/benchmark' },
    ],
    lastReviewed: LAST_REVIEWED,
  },
  {
    slug: 'what-is-reversible-pii-tokenization',
    question: 'What is reversible PII tokenization?',
    category: 'Technology',
    metaTitle: 'What Is Reversible PII Tokenization?',
    metaDescription:
      'Reversible PII tokenization replaces identifiers with placeholders before AI processing and restores them after — masking without losing the answer. How it works, with the vault mechanics.',
    directAnswer:
      'Reversible PII tokenization replaces sensitive values in a prompt with consistent placeholders — "Sarah Thompson" becomes <PERSON_7K9X> — before the text reaches an AI model, then restores the real values in the response after it returns. Unlike permanent redaction, the answer comes back readable; unlike blocking, the work continues. The mapping between placeholder and real value lives in an encrypted vault (AES-256-GCM) with a short time-to-live — 15 minutes by default — so the restore window closes automatically. The AI provider only ever sees placeholders.',
    sections: [
      {
        heading: 'How the round trip works',
        paragraphs: [
          'On the way out, a detection engine finds identifiers in the prompt — names, emails, phone numbers, UK-specific values like NI and NHS numbers — and swaps each for a typed placeholder. The mapping is written to an encrypted vault. The masked prompt goes to the model.',
          'On the way back, the response usually mentions the placeholders ("advise <PERSON_7K9X> to accept the offer…"). The gateway streams the response through an unmasker that swaps placeholders back to real values — inside your environment, never at the provider. The vault entry then expires on its TTL, closing the restore window.',
          'This round trip is the part most detection engines cannot do. Microsoft’s open-source Presidio, for example, notes in its own documentation that it cannot restore values once an LLM rephrases the output — the productised vault-and-unmask path is exactly the gap.',
        ],
      },
      {
        heading: 'When you want it — and when you don’t',
        paragraphs: [
          'Reversible tokenization fits workflows where a human needs the real answer: drafting a letter about a specific client, summarising a matter, triaging a complaint. Irreversible masking (no vault entry, no restore) fits analytics, logging, and anything where nobody downstream needs the identity. A policy layer decides which entities get which treatment per tenant.',
        ],
      },
    ],
    keyPoints: [
      'Placeholders out, real values back in — the model never sees the identifiers.',
      'Vault entries are AES-256-GCM encrypted with a 15-minute default TTL.',
      'Restoration happens in your environment, not at the AI provider.',
      'Choose reversible or irreversible per entity type via policy.',
    ],
    faq: [
      {
        question: 'What happens if the vault entry expires before the response returns?',
        answer:
          'The response is delivered with placeholders intact — safe by default. TTL is configurable per tenant for long-running workflows; the default is deliberately short so the restore window is minutes, not days.',
      },
      {
        question: 'Is tokenization the same as anonymisation?',
        answer:
          'No. Tokenized data is pseudonymised — the mapping exists (briefly, encrypted) so values can be restored. True anonymisation is irreversible. That distinction matters under UK GDPR: pseudonymised data is still personal data, which is why the vault is encrypted, short-lived, and access-controlled.',
      },
      {
        question: 'Does consistent placeholder naming leak information?',
        answer:
          'Placeholders are consistent within a session so the model can reason coherently (<PERSON_7K9X> stays the same person), but the identifiers are random per session — there is no stable cross-session mapping an observer could accumulate.',
      },
    ],
    sources: [
      {
        label: 'Microsoft Presidio FAQ — on the limits of unmasking LLM output',
        url: 'https://microsoft.github.io/presidio/faq/',
      },
    ],
    related: [
      { label: 'Deep dive: the reversible vault (TTL, AES-GCM)', href: '/blog/reversible-pii-masking-ttl-aes-gcm-vault' },
      { label: 'Streaming redaction in LLM responses', href: '/blog/redacting-pii-in-streaming-llm-responses' },
      { label: 'DLP for LLMs explained', href: '/answers/dlp-for-llms-explained' },
      { label: 'Try it live in the playground', href: '/playground' },
    ],
    lastReviewed: LAST_REVIEWED,
  },
  {
    slug: 'uk-tribunal-chatgpt-client-data-ruling',
    question: 'What did the UK tribunal say about ChatGPT and client data?',
    category: 'Case law',
    metaTitle: 'The UK Tribunal Ruling on ChatGPT and Client Data, Explained',
    metaDescription:
      'Munir v SSHD [2026] UKUT 81: a legal representative pasted client letters into ChatGPT, and the Upper Tribunal treated it as placing them in the public domain. What happened and what it means.',
    directAnswer:
      'In Munir v SSHD [2026] UKUT 81 (IAC) — promulgated in November 2025 — the Upper Tribunal dealt with a legal representative who had used ChatGPT to summarise Home Office decision letters and improve client emails. Asked to explain his process at a hearing, he accepted it amounted to a data breach and undertook to notify his clients and regulators. The tribunal characterised uploading such material to an open AI tool as placing it in the public domain, breaching client confidentiality — and distinguished open tools from closed systems running inside a secure network.',
    sections: [
      {
        heading: 'What actually happened',
        paragraphs: [
          'The uses were mundane: polishing the wording of emails to clients, and uploading Home Office decision letters so the tool could summarise them. That ordinariness is the point — this was a busy professional using an available tool to work faster, which is precisely why it is predictable and repeatable in any firm.',
          'The conduct surfaced during a tribunal hearing. The representative set out his process, accepted on the spot that it was a data breach, and said he would notify affected clients, the SRA, and the immigration regulator. The tribunal noted it would have referred him to both regulators had he not already self-reported.',
        ],
      },
      {
        heading: 'Why the reasoning matters beyond this case',
        paragraphs: [
          'The tribunal’s framing — that placing client information into an open AI system puts it in the public domain — matches the judiciary’s own AI guidance, which tells judges to treat anything entered into a public AI chatbot as published to all the world. Two different judicial sources now describe the same act the same way.',
          'The ruling also drew a line the industry should notice: it distinguished open tools from closed AI systems operating inside a secure network, which it accepted could summarise material without those risks. The safe path is not "no AI" — it is AI where confidential content never reaches the open tool. Masking identifiers before the prompt leaves achieves that boundary at the point of use.',
        ],
      },
      {
        heading: 'What the exposure actually is',
        paragraphs: [
          'There was no fine in this case, because the representative self-reported. The exposure sits behind that: an SRA referral can end in unlimited fines, suspension, or striking off; a reportable breach engages UK GDPR, where penalties reach £17.5 million or 4% of turnover; and confidentiality, once lost to an open system, cannot be recalled.',
        ],
      },
    ],
    keyPoints: [
      'Promulgated November 2025; press coverage followed in February 2026 — cite the case, not the news wave.',
      'Routine use — email polish and letter summaries — was accepted to be a data breach.',
      'The tribunal treats open-AI upload as publication to the public domain.',
      'Closed systems in secure networks were explicitly distinguished — the control point is what reaches the open tool.',
    ],
    faq: [
      {
        question: 'Was the person involved fined or struck off?',
        answer:
          'No penalty was imposed in the ruling itself — he self-reported to the SRA and the IAA. The tribunal said it would have referred him had he not. The disciplinary and data protection processes carry the real exposure.',
      },
      {
        question: 'Does this ruling apply to all law firms?',
        answer:
          'It is an Upper Tribunal decision arising from immigration proceedings, but its reasoning about confidentiality and open AI tools is general — and it aligns with Law Society guidance and the judiciary’s own AI guidance. Prudent firms treat it as the current judicial view.',
      },
      {
        question: 'Would masking have changed this outcome?',
        answer:
          'The breach turned on client-identifiable material reaching an open tool. If the letters had been masked before upload — names, references, and identifying details replaced — the open tool would have received de-identified text. That is a materially different disclosure, though masking is a risk-reduction control, not a retroactive legal fix.',
      },
    ],
    related: [
      { label: 'Full analysis on the blog', href: '/blog/uk-tribunal-ai-client-confidentiality-ruling' },
      { label: 'Judiciary AI guidance — "published to all the world"', href: '/compliance/judiciary-ai-guidance' },
      { label: 'Can law firms use ChatGPT with client data?', href: '/answers/can-law-firms-use-chatgpt-with-client-data' },
      { label: 'UK compliance hub', href: '/compliance' },
    ],
    lastReviewed: LAST_REVIEWED,
  },
  {
    slug: 'dlp-for-llms-explained',
    question: 'What is DLP for LLMs?',
    category: 'Technology',
    metaTitle: 'DLP for LLMs, Explained',
    metaDescription:
      'Traditional DLP watches files and email — the prompt box is a gap. What data loss prevention means for LLM workflows, and how mask-and-forward differs from block-and-flag.',
    directAnswer:
      'DLP (data loss prevention) for LLMs is the control layer that stops sensitive data leaving your organisation through AI prompts and uploads. Traditional DLP watches files at rest, email, and endpoints — but text typed into ChatGPT’s input box usually walks straight past it. LLM-focused DLP closes that gap with three possible responses: block the prompt (stops work), flag it for review (after the fact), or mask the sensitive values and forward the rest (work continues, data stays). The architectures differ mainly in where they sit — network edge, endpoint agent, or in the browser at the point of use.',
    sections: [
      {
        heading: 'Why classic DLP misses the prompt box',
        paragraphs: [
          'Classic DLP was built for files and email: pattern-match attachments, watch endpoints, inspect network traffic. A prompt is different — it is composed live in a browser text box and submitted over an encrypted connection to a legitimate SaaS domain. Unless the control understands the AI site itself, the paste event looks like ordinary web traffic.',
          'That is why organisations with mature DLP still discover staff pasting customer records into chatbots. The question for any vendor is concrete: does your DLP see what goes into the ChatGPT input field before send?',
        ],
      },
      {
        heading: 'Block, flag, or mask — the three postures',
        paragraphs: [
          'Blocking stops the prompt entirely. Safe, but it taxes productivity and pushes users to personal devices. Flagging (observe-and-coach) lets the data go and tells someone afterwards — visibility without prevention. Masking detects the sensitive values and replaces them before submission, letting the rest of the prompt proceed: the user keeps working, the data never leaves, and the event is logged.',
          'Mask-and-forward with reversible tokenization is the strictest posture that still preserves the productivity benefit — which is why it suits regulated teams that cannot simply ban AI.',
        ],
      },
    ],
    keyPoints: [
      'The prompt box is the gap in traditional DLP coverage.',
      'Block stops work; flag reports after the data has gone; mask prevents while work continues.',
      'Point-of-use (browser) controls cover whatever AI tool staff actually use.',
      'Audit evidence — what was caught, when, under which policy — is half the value.',
    ],
    faq: [
      {
        question: 'Do we need LLM DLP if we already run Purview or Netskope?',
        answer:
          'Check the gap directly: does the existing control see and act on text entered into AI chat inputs, on managed and unmanaged tools alike, before submission? For most deployments the answer is partial at best — a prompt-layer control complements rather than replaces suite DLP.',
      },
      {
        question: 'What about AI tools we host ourselves?',
        answer:
          'Self-hosted models inside a secure network are a different risk category — the tribunal ruling on open tools explicitly distinguished them. Prompt-layer DLP matters most for public and third-party AI services where the data leaves your boundary.',
      },
      {
        question: 'How accurate does detection need to be?',
        answer:
          'Nothing catches 100%, and anyone claiming it is overselling. What matters is measured accuracy on the identifiers you care about (published benchmarks, not vibes) plus an audit trail that makes misses visible and improvable.',
      },
    ],
    related: [
      { label: 'Published detection benchmark (99.8% F1, internal test set)', href: '/benchmark' },
      { label: 'How do I stop staff pasting PII into ChatGPT?', href: '/answers/stop-staff-pasting-pii-into-chatgpt' },
      { label: 'What is reversible PII tokenization?', href: '/answers/what-is-reversible-pii-tokenization' },
      { label: 'Presidio alternative — build vs buy', href: '/presidio-alternative' },
    ],
    lastReviewed: LAST_REVIEWED,
  },
  {
    slug: 'what-is-shadow-ai',
    question: 'What is shadow AI?',
    category: 'Risk',
    metaTitle: 'What Is Shadow AI?',
    metaDescription:
      'Shadow AI is staff using AI tools outside sanctioned channels — invisible to IT and compliance. Why bans make it worse and how to measure your actual exposure.',
    directAnswer:
      'Shadow AI is employees using AI tools — ChatGPT, Claude, Gemini, translation and summarisation apps — outside any sanctioned, visible channel. It is the AI-era version of shadow IT, with a sharper edge: the input is often confidential text pasted in by the very people producing the most work. Bans reliably make it worse by pushing usage onto personal devices where no control can see it. The practical response is to measure it (discover what is actually being used), then make the sanctioned path safer than the shadow path with a control that masks sensitive data at the point of use.',
    sections: [
      {
        heading: 'Why it happens — and why bans backfire',
        paragraphs: [
          'People use shadow AI for the same reason they used shadow IT: the tools work and the official alternative is slower or absent. Samsung’s 2023 episode is the textbook case — engineers pasted source code into ChatGPT to fix bugs faster, three leaks in about twenty days, followed by a company-wide ban and an internal survey showing most staff considered generative AI a security risk anyway.',
          'A ban removes the visible usage, not the usage. It relocates the risk to phones and home laptops, where neither policy nor telemetry reaches. The firms that handle this well treat shadow AI as a demand signal: staff are telling you which capability they need.',
        ],
      },
      {
        heading: 'Measuring your real exposure',
        paragraphs: [
          'Industry measurements consistently find that a meaningful share of what employees paste into AI tools is sensitive — DLP vendor Cyberhaven’s analyses put the sensitive share of AI inputs in double-digit percentages, concentrated in a small group of heavy users. Your firm’s number is unknowable until you look.',
          'A practical first step is a time-boxed risk scan: run a point-of-use detector across a sample of real usage for two weeks and count what would have leaked — categories, volumes, tools — without storing the content itself. That turns an abstract worry into a concrete, prioritisable list.',
        ],
      },
    ],
    keyPoints: [
      'Shadow AI = unsanctioned AI use, invisible to IT and compliance.',
      'Bans relocate the risk to personal devices; they do not remove it.',
      'The heaviest AI users are usually the most productive staff — and the biggest paste risk.',
      'Measure first: a two-week risk scan turns the unknown into a prioritised list.',
    ],
    faq: [
      {
        question: 'Is shadow AI actually common in professional firms?',
        answer:
          'The SRA reported as far back as November 2023 that, reportedly, three quarters of the largest law firms were using AI — and informal use runs ahead of sanctioned deployment everywhere. If your firm has no approved AI path, assume the shadow path exists.',
      },
      {
        question: 'What should a firm do first?',
        answer:
          'Discovery before policy: find out which tools are in use and what kinds of data reach them. The AI Confidentiality Checklist on our compliance hub structures that review in about 20 minutes; a two-week risk scan quantifies it.',
      },
      {
        question: 'Does making one tool official solve shadow AI?',
        answer:
          'It helps — if the official tool is genuinely good. But coverage still matters: a point-of-use control that masks sensitive data on whatever tool staff open protects you during the long tail of partial adoption.',
      },
    ],
    related: [
      { label: 'The hidden cost of shadow AI (blog)', href: '/blog/hidden-cost-of-shadow-ai-security-control-point' },
      { label: 'How do I stop staff pasting PII into ChatGPT?', href: '/answers/stop-staff-pasting-pii-into-chatgpt' },
      { label: 'AI Confidentiality Checklist', href: '/compliance#checklist' },
      { label: 'Legal use case', href: '/use-cases/legal' },
    ],
    lastReviewed: LAST_REVIEWED,
  },
]

const chatgptGdprEntry: AnswerEntry = {
  slug: 'is-chatgpt-gdpr-compliant',
  question: 'Is ChatGPT GDPR compliant?',
  category: 'Data protection',
  metaTitle: 'Is ChatGPT GDPR Compliant?',
  metaDescription:
    'A tool cannot be "GDPR compliant" by itself — compliance belongs to your processing. What OpenAI actually commits to on training, retention, and DPAs, tier by tier, with sources.',
  directAnswer:
    'The question is slightly wrong — and the distinction matters. GDPR compliance is a property of processing, not of a tool: the ICO is explicit that accountability lies with the controller, i.e. the organisation using it. What you can assess is OpenAI’s data terms. Consumer ChatGPT trains on your conversations by default unless you opt out. Business products are different: ChatGPT Business, Enterprise, and the API do not train on your data by default, support a Data Processing Addendum, and offer retention controls. Whether your use is compliant depends on what personal data you put in, on what lawful basis — which is where minimisation and masking come in.',
  sections: [
    {
      heading: 'What OpenAI actually commits to, tier by tier',
      paragraphs: [
        'On the consumer side (Free and Plus), OpenAI’s own help centre says ChatGPT improves by training on conversations "unless you opt out". The opt-out is real — Settings → Data Controls — and turning it off keeps chats in history without using them for training. Deleted personal data is removed from systems within 30 days under the European privacy policy, subject to legal-obligation and security exceptions; temporary chats are deleted after 30 days.',
        'On the business side, the enterprise privacy page states: "By default, we do not use your business data for training our models" — covering ChatGPT Business (formerly Team), Enterprise, and the API. OpenAI executes Data Processing Addenda for those products, holds SOC 2 Type 2 attestation, and gives workspace admins retention controls; API inputs may be retained up to 30 days for abuse detection, with zero-data-retention available for eligible endpoints. For EEA users the controller is OpenAI Ireland, with the Irish DPC as lead supervisory authority; the declared lawful basis for training is legitimate interests.',
      ],
    },
    {
      heading: 'Why "is the tool compliant" is the wrong question',
      paragraphs: [
        'The ICO’s AI guidance puts overall accountability for data protection compliance on the controller — your organisation, not the vendor. The same tool can sit inside a perfectly lawful workflow or a plainly unlawful one, depending on what data goes in, on what basis, with what safeguards. So the useful question is: is our use of ChatGPT compliant? That turns on lawful basis, transparency to data subjects, minimisation, and your ability to demonstrate the controls you applied.',
        'This is also why regulatory history around OpenAI is easy to over-read. The Italian regulator temporarily restricted ChatGPT in 2023 and later issued a €15m fine — which an Italian court annulled in March 2026, with the underlying allegations never finally ruled on. The accurate takeaway is that regulators actively scrutinise AI data practices, not that any authority has settled whether ChatGPT "is" compliant.',
      ],
    },
    {
      heading: 'The minimisation shortcut',
      paragraphs: [
        'The strongest simplification available to any firm is to stop personal data entering the tool at all. If client names, contact details, and identifiers are masked in the browser before the prompt is submitted, the hardest GDPR questions — lawful basis for sending personal data to a third-party model, international transfers, retention at the provider — shrink dramatically, because the provider receives de-identified text. You still need policy and appropriate terms, but you are no longer betting compliance on a vendor’s data pipeline.',
      ],
    },
  ],
  keyPoints: [
    'GDPR compliance belongs to your processing — the ICO puts accountability on the controller, not the tool.',
    'Consumer ChatGPT trains on conversations by default (opt-out available); business tiers do not train by default and support DPAs.',
    'Deleted data is removed within 30 days, with legal-obligation exceptions; API zero-retention exists for eligible endpoints.',
    'Masking identifiers before submission shrinks the compliance surface regardless of tier.',
  ],
  faq: [
    {
      question: 'Can we sign a DPA with OpenAI?',
      answer:
        'Yes — OpenAI states it executes Data Processing Addenda for ChatGPT Business, ChatGPT Enterprise, and API use. Consumer Free/Plus accounts are not designed for that relationship, which is one reason client work does not belong on personal accounts.',
    },
    {
      question: 'If we opt out of training, is free ChatGPT safe for client data?',
      answer:
        'No. The opt-out stops training use; it does not change the confidentiality analysis, the retention rules, or your controller obligations. UK guidance — from the Law Society to the tribunal in Munir — treats identifiable client data in public AI tools as the problem, however the training toggle is set.',
    },
    {
      question: 'Didn’t OpenAI get fined under GDPR in Italy?',
      answer:
        'The Italian Garante fined OpenAI €15m in late 2024, but an Italian court annulled the fine in March 2026 — the merits were never finally decided. Use that history as evidence of regulatory scrutiny, not as a compliance verdict either way.',
    },
  ],
  sources: [
    { label: 'OpenAI — Enterprise privacy commitments', url: 'https://openai.com/enterprise-privacy/' },
    { label: 'OpenAI — Data controls FAQ', url: 'https://help.openai.com/en/articles/7730893-data-controls-faq' },
    { label: 'OpenAI — How your data is used to improve model performance', url: 'https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance' },
    { label: 'ICO — Accountability and governance implications of AI', url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/what-are-the-accountability-and-governance-implications-of-ai/' },
  ],
  related: [
    { label: 'Can law firms use ChatGPT with client data?', href: '/answers/can-law-firms-use-chatgpt-with-client-data' },
    { label: 'The ICO on generative AI and personal data', href: '/compliance/ico-generative-ai' },
    { label: 'What is reversible PII tokenization?', href: '/answers/what-is-reversible-pii-tokenization' },
    { label: 'How do I stop staff pasting PII into ChatGPT?', href: '/answers/stop-staff-pasting-pii-into-chatgpt' },
  ],
  lastReviewed: LAST_REVIEWED,
}

const euAiActEntry: AnswerEntry = {
  slug: 'does-the-eu-ai-act-apply-to-uk-firms',
  question: 'Does the EU AI Act apply to UK firms?',
  category: 'Regulation',
  metaTitle: 'Does the EU AI Act Apply to UK Firms?',
  metaDescription:
    'Merely using ChatGPT does not bring a UK firm under the EU AI Act — but two scope triggers can. The territorial rules, the staged timeline, and what governs UK firms instead.',
  directAnswer:
    'Usually not — merely using ChatGPT in a UK office does not bring a UK firm under the EU AI Act. The Act (Regulation (EU) 2024/1689, in force since August 2024) reaches beyond the EU in two main ways: if you place an AI system on the EU market as a provider, or if the output of your AI use is used in the EU. A UK firm serving EU clients with AI-produced work can be caught by that second trigger. What binds UK firms day to day is UK law: DUAA-amended UK GDPR and sector regulators, not the AI Act.',
  sections: [
    {
      heading: 'The territorial rules, plainly',
      paragraphs: [
        'Article 2 of the AI Act sets three main hooks. First: providers placing AI systems or general-purpose models on the EU market are covered regardless of where they are established — that catches a UK company selling an AI product into the EU, not a firm merely using someone else’s tool. Second: deployers established in the EU. Third — the one UK professional firms should actually check — providers and deployers in third countries where the output produced by the AI system is used in the EU.',
        'For a UK law or accounting firm, that means the ordinary use of ChatGPT for internal work is out of scope. The analysis changes if AI-produced output is delivered for use in the EU — for example, work product for an EU client engagement — or if the firm ships its own AI-powered tool to EU customers.',
      ],
    },
    {
      heading: 'The timeline keeps moving — check before you rely on it',
      paragraphs: [
        'The Act entered into force on 1 August 2024 with staged application: prohibited practices and AI-literacy duties from 2 February 2025, general-purpose AI obligations and governance from 2 August 2025, and general application from 2 August 2026.',
        'In June 2026 the European Parliament approved the "Digital Omnibus on AI" amendments, which postpone the high-risk system obligations — the widely reported new targets are December 2027 for Annex III high-risk systems and August 2028 for Annex I product-safety systems. If your exposure analysis turns on high-risk classification, verify the current dates on the Commission’s official pages before relying on them.',
      ],
    },
    {
      heading: 'What governs UK firms instead',
      paragraphs: [
        'The UK has no general AI statute. The framework is the March 2023 pro-innovation approach (existing regulators apply cross-sector principles) plus the Data (Use and Access) Act 2025, which amends UK GDPR — including the automated decision-making rules in force since February 2026. For a UK firm putting personal data into AI tools, that is the live compliance surface: data protection law, sector guidance, and confidentiality duties — the things our compliance hub maps to controls.',
      ],
    },
  ],
  keyPoints: [
    'Using ChatGPT internally does not, by itself, put a UK firm in AI Act scope.',
    'Two triggers to check: providing AI into the EU market, and AI output used in the EU.',
    'High-risk obligation dates were postponed by the June 2026 omnibus amendments — verify current dates before relying.',
    'Day to day, UK firms answer to DUAA-amended UK GDPR and their sector regulators.',
  ],
  faq: [
    {
      question: 'We have EU clients — are we caught?',
      answer:
        'Possibly, under the output-used-in-the-EU hook (Article 2). It depends on whether AI-produced output is actually used in the EU and in what role you act (provider vs deployer). This is exactly the kind of fact-specific question to take to counsel — the safe engineering posture meanwhile is to minimise the personal data entering AI workflows.',
    },
    {
      question: 'Is there a UK version of the AI Act coming?',
      answer:
        'Nothing equivalent is in force. The UK approach relies on existing regulators plus the DUAA’s data protection reforms, with an ICO statutory code on AI and automated decision-making in development. Watch that code — it will set the evidence expectations for UK AI use.',
    },
    {
      question: 'Does masking PII help with AI Act exposure?',
      answer:
        'It is not an AI Act compliance mechanism, but it shrinks the data protection surface that both regimes care about: less personal data in prompts means less exposure under UK GDPR today and simpler answers in any future scope analysis.',
    },
  ],
  sources: [
    {
      label: 'European Commission — AI Act regulatory framework (application timeline)',
      url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    },
    {
      label: 'Regulation (EU) 2024/1689 — full text (EUR-Lex)',
      url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
    },
  ],
  related: [
    { label: 'DUAA 2025 — the law that actually governs UK AI use', href: '/compliance/data-use-and-access-act' },
    { label: 'Is ChatGPT GDPR compliant?', href: '/answers/is-chatgpt-gdpr-compliant' },
    { label: 'UK compliance hub', href: '/compliance' },
    { label: 'Can law firms use ChatGPT with client data?', href: '/answers/can-law-firms-use-chatgpt-with-client-data' },
  ],
  lastReviewed: LAST_REVIEWED,
}

answerEntries.push(chatgptGdprEntry, euAiActEntry)

export const answersHubFaq = [
  {
    question: 'Who writes these answers?',
    answer:
      'The NeutralAI team — an AI security engineering group focused on PII detection and masking for regulated UK teams. Every date, quote, and statistic is checked against primary sources before publication, and each page shows when it was last reviewed.',
  },
  {
    question: 'Are these pages legal advice?',
    answer:
      'No. They summarise guidance, law, and technology honestly for orientation. For decisions about your firm’s specific obligations, take advice from your own counsel or DPO — and read the primary sources we link on every page.',
  },
] as const
