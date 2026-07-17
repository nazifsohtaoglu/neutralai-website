// Data source of truth for the /compliance hub.
// Every date, quote, and URL below is verified against the internal claims
// register (pazarlama/claims-register.md) and fetched primary sources on the
// lastReviewed date. Quotes are verbatim from the cited documents — do not
// paraphrase inside `quote` fields; put paraphrase in `point`/`line` fields.

export type GuidanceEntry = {
  slug: string
  shortName: string
  publisher: string
  pageTitle: string
  title: string
  firstPublished: string
  lastUpdated?: string
  sourceUrl: string
  lastReviewed: string
  oneLineSummary: string
  directAnswer: string
  whatItSays: { point: string; quote?: string }[]
  whatItMeans: string[]
  controlMapping: { expectation: string; control: string; how: string }[]
  faq: { question: string; answer: string }[]
}

export type ControlMapRow = {
  control: string
  description: string
  guidanceLines: { shortName: string; slug: string; line: string }[]
}

const LAST_REVIEWED = '17 July 2026'

export const guidanceEntries: GuidanceEntry[] = [
  {
    slug: 'law-society-generative-ai',
    shortName: 'Law Society',
    publisher: 'The Law Society of England and Wales',
    pageTitle: 'Law Society generative AI guidance, explained for busy firms',
    title: 'Generative AI – the essentials',
    firstPublished: '17 November 2023',
    lastUpdated: 'June 2026',
    sourceUrl: 'https://www.lawsociety.org.uk/topics/ai-and-lawtech/generative-ai-the-essentials',
    lastReviewed: LAST_REVIEWED,
    oneLineSummary:
      'No confidential data into public generative AI tools; use fictional data for testing — the baseline for solicitors.',
    directAnswer:
      'The Law Society’s "Generative AI – the essentials" guide (first published November 2023, updated June 2026) tells solicitors they can use generative AI — but confidential data should not go into free, online generative AI services, and testing or template-building should always use fictional data rather than real client information. In practice that means firms need either an enterprise AI contract with retention guarantees, a technical control that removes client identifiers before prompts leave the firm, or both. The guide treats AI adoption as manageable risk — the emphasis is on confidentiality, competence, and supervision, not on avoiding AI.',
    whatItSays: [
      {
        point:
          'For free, online generative AI services — where the firm has no operational relationship with the vendor — the instruction on confidential data is unambiguous.',
        quote: 'do not put any confidential data into the tool',
      },
      {
        point:
          'Client confidential and personal data should not be used to test or build templates with generative AI — the guide says to create and use fictional data instead.',
      },
      {
        point:
          'Firms should understand what the AI provider does with input data — training use, retention, and access — before approving a tool, and weigh any sharing of client data with an AI business carefully.',
      },
      {
        point:
          'The June 2026 update added recent developments including a case in which two solicitors were referred to the SRA after AI-generated false information reached a court.',
      },
    ],
    whatItMeans: [
      'A written AI policy alone does not satisfy the guidance if staff can still paste client names into free chatbots — the control needs to reach the point of use.',
      'Tool approval should be based on the provider’s data terms (retention, training, access), not on popularity.',
      'If client identifiers are masked before a prompt leaves the firm, the confidentiality question changes materially: the public tool never receives the identifying content.',
      'Consent conversations get easier when you can show clients exactly what does and does not reach an AI provider.',
    ],
    controlMapping: [
      {
        expectation: 'No identifiable client data into public AI tools',
        control: 'Mask before send',
        how: 'Client names, addresses, NI/NHS numbers, and case references are detected and replaced with placeholders in the browser, before the prompt reaches the AI provider.',
      },
      {
        expectation: 'Understand and limit what the provider retains',
        control: 'Reversible vault (15-min TTL)',
        how: 'Real values never leave the firm; masked tokens are restored locally after the response returns, and vault entries expire in minutes by default.',
      },
      {
        expectation: 'Supervision and accountability for AI use',
        control: 'Audit trail',
        how: 'Every masking event is logged with policy, timestamp, and category counts — evidence of the control without storing raw client content.',
      },
    ],
    faq: [
      {
        question: 'Does the Law Society ban solicitors from using ChatGPT?',
        answer:
          'No. The guidance permits generative AI use but expects firms to protect client confidentiality — identifiable client data should not go into public AI tools without safeguards and informed consent. The practical question is how the firm enforces that in daily work.',
      },
      {
        question: 'Is masking client data before AI use enough to satisfy the guidance?',
        answer:
          'Masking materially reduces what an AI provider receives, which is central to the confidentiality concern. It is a strong technical control, not a compliance guarantee — firms still need policy, training, and appropriate provider terms.',
      },
      {
        question: 'How current is this guidance?',
        answer:
          'It is actively maintained: first published in November 2023, with updates in 2024, May and October 2025, and June 2026. The June 2026 revision added recent regulatory developments and case references. The core position on confidential data and public AI tools has been consistent throughout — always check the original page for the current text.',
      },
    ],
  },
  {
    slug: 'sra-ai-risk-outlook',
    shortName: 'SRA',
    publisher: 'Solicitors Regulation Authority',
    pageTitle: 'What the SRA actually says about AI in law firms',
    title: 'Risk Outlook report: the use of artificial intelligence in the legal market',
    firstPublished: '20 November 2023',
    sourceUrl: 'https://www.sra.org.uk/sra/research-publications/artificial-intelligence-legal-market/',
    lastReviewed: LAST_REVIEWED,
    oneLineSummary:
      'The regulator frames AI adoption itself as expected — the risk is adopting it without controls, or not adopting it at all.',
    directAnswer:
      'The SRA’s Risk Outlook report on AI in the legal market (November 2023) is notable for what it does not say: it does not tell firms to avoid AI. It reports that, reportedly, three quarters of the largest solicitors’ firms were already using AI, and frames the risk as failing to adopt safely rather than adopting at all. For smaller firms the message is uncomfortable in the other direction: the technology gap is real, and the safe-adoption expectations (confidentiality, accuracy, accountability) apply at every firm size.',
    whatItSays: [
      {
        point:
          'AI adoption in the legal market is already mainstream at the top end — the report cites that, reportedly, three quarters of the largest firms were using AI by late 2023.',
        quote: 'three quarters of the largest solicitors’ firms were using AI, nearly twice the number from just three years ago',
      },
      {
        point: 'Not adopting AI is itself framed as a competitive and client-service risk.',
        quote: 'The risk to firms might not come from adopting AI, but from failing to do so.',
      },
      {
        point: 'The regulator’s posture is enablement with conditions: AI must operate within the law, and firms remain accountable.',
        quote: 'We want to help firms and consumers safely gain the benefits that AI can bring.',
      },
    ],
    whatItMeans: [
      'The SRA is not a reason to ban AI — it is a reason to be able to show your AI use is controlled.',
      'Confidentiality and accountability expectations apply regardless of firm size; "we are too small to need controls" is not a position the report supports.',
      'The firms that benefit are the ones that can adopt quickly because their control story is already in place.',
      'Separate SRA compliance tips on AI and technology (updated February 2026) reinforce responsible adoption — check the SRA site for the current text.',
    ],
    controlMapping: [
      {
        expectation: 'Adopt AI safely rather than abstain',
        control: 'Mask before send',
        how: 'Staff keep using AI tools for productivity; the control removes client-identifiable data from prompts automatically, so adoption does not depend on perfect user discipline.',
      },
      {
        expectation: 'Remain accountable for AI use',
        control: 'Audit trail',
        how: 'Category-level masking logs show what was protected, when, and under which policy — the evidence layer for supervision and file reviews.',
      },
      {
        expectation: 'Operate within the law across tools',
        control: 'Policy + whitelist',
        how: 'Tenant policies and whitelisted terms apply the same masking rules across every supported AI site, rather than per-tool ad hoc decisions.',
      },
    ],
    faq: [
      {
        question: 'Does the SRA require law firms to use AI?',
        answer:
          'No. The Risk Outlook report observes that most large firms already use AI and frames non-adoption as a potential competitive risk — but it requires nothing. Its practical weight is in the safe-adoption expectations it sets for firms that do use AI.',
      },
      {
        question: 'Is the 75% adoption statistic current?',
        answer:
          'The figure comes from the SRA’s November 2023 report, which itself qualifies it as "reportedly". Treat it as a dated, directional signal about large-firm adoption, not a live market measurement.',
      },
      {
        question: 'What does "safe adoption" look like for a small firm?',
        answer:
          'A defined policy, an approved-tools list, a technical control that stops client identifiers reaching public AI tools, and evidence that the control ran. That combination is achievable without a security team.',
      },
    ],
  },
  {
    slug: 'bar-council-generative-ai',
    shortName: 'Bar Council',
    publisher: 'The Bar Council of England and Wales',
    pageTitle: 'The Bar Council on ChatGPT and LLMs: what barristers should know',
    title: 'Considerations when using ChatGPT and generative AI software based on large language models',
    firstPublished: '30 January 2024',
    lastUpdated: '25 November 2025',
    sourceUrl:
      'https://www.barcouncilethics.co.uk/documents/considerations-when-using-chatgpt-and-generative-ai-software-based-on-large-language-models/',
    lastReviewed: LAST_REVIEWED,
    oneLineSummary:
      'Extreme vigilance with privileged or confidential information in LLMs; never input personal data into prompts.',
    directAnswer:
      'The Bar Council’s considerations document on ChatGPT and LLM-based tools (January 2024, reviewed November 2025) does not prohibit generative AI — it sets out how to use it without breaching core duties. The sharpest lines are about data: be extremely vigilant about sharing legally privileged or confidential information with an LLM system, and do not input personal data into prompts. The November 2025 review added the Ayinde fabricated-citations judgments, connecting careless AI use directly to court sanctions. Note: the document describes itself as assistance, not formal BSB guidance.',
    whatItSays: [
      {
        point: 'Privileged and confidential information requires extreme caution with LLM systems.',
        quote:
          'Be extremely vigilant about sharing with a generative LLM system any legally privileged or confidential information',
      },
      {
        point: 'What goes into a system may not stay there — inputs can become training data and resurface.',
        quote:
          'anything that a user types into the system may be used to train the software and might find itself repeated verbatim in future results',
      },
      {
        point:
          'Personal data should not be entered into prompts at all; the document suggests synthetic data as a way to avoid UK GDPR breach.',
      },
      {
        point:
          'The November 2025 review added the Ayinde v Haringey judgments on fabricated AI citations — the courts are now part of this story, not a hypothetical.',
      },
    ],
    whatItMeans: [
      'For chambers and barristers, the input side (what reaches the model) is treated as seriously as the output side (hallucinated citations).',
      '"Vigilance" as a human-only control fails under deadline pressure — a technical mask-before-send step makes the vigilant path the default path.',
      'The synthetic-data suggestion maps directly to masking: structurally faithful placeholders preserve the legal question while removing the identifying content.',
      'This is an assistance document, not binding BSB guidance — but it is what a disciplinary tribunal would expect a barrister to have read.',
    ],
    controlMapping: [
      {
        expectation: 'Extreme vigilance with privileged/confidential information',
        control: 'Mask before send',
        how: 'Identifying and confidential specifics are removed from the prompt automatically — vigilance becomes a system property instead of a memory test.',
      },
      {
        expectation: 'Never input personal data into prompts',
        control: 'UK entity detection',
        how: 'Names, addresses, NI and NHS numbers, court references, and other UK identifiers are detected and replaced before the text leaves the browser.',
      },
      {
        expectation: 'Prefer synthetic stand-ins over real data',
        control: 'Reversible tokenisation',
        how: 'Placeholders like <PERSON_7K9X> act as consistent synthetic stand-ins; the real values are restored only in your environment after the response returns.',
      },
    ],
    faq: [
      {
        question: 'Is the Bar Council document binding on barristers?',
        answer:
          'No — it explicitly states it is not formal guidance for BSB Handbook purposes. It is an assistance document from the Bar Council’s IT Panel. In practice, it sets the expectations a regulator or tribunal would assume a careful barrister knows.',
      },
      {
        question: 'Can barristers use ChatGPT for drafting at all?',
        answer:
          'Yes, the document contemplates legitimate use. The constraints are on what goes in (no privileged, confidential, or personal data) and on verifying what comes out (the Ayinde judgments on fabricated citations are now cited in the November 2025 review).',
      },
      {
        question: 'How does masking relate to the "synthetic data" suggestion?',
        answer:
          'Masking automates it: real identifiers are replaced with structurally faithful placeholders before the prompt leaves your machine, which is exactly the synthetic stand-in pattern the document suggests — without asking the barrister to build synthetic examples by hand.',
      },
    ],
  },
  {
    slug: 'judiciary-ai-guidance',
    shortName: 'Judiciary',
    publisher: 'Courts and Tribunals Judiciary',
    pageTitle: 'The judiciary’s AI guidance: the clearest line in UK legal AI',
    title: 'Artificial Intelligence (AI) — Guidance for Judicial Office Holders',
    firstPublished: '12 December 2023',
    lastUpdated: '31 October 2025',
    sourceUrl:
      'https://www.judiciary.uk/guidance-and-resources/artificial-intelligence-ai-judicial-guidance-october-2025/',
    lastReviewed: LAST_REVIEWED,
    oneLineSummary:
      'Anything entered into a public AI chatbot "should be seen as being published to all the world."',
    directAnswer:
      'The judiciary’s AI guidance for judicial office holders (December 2023, updated October 2025) contains the single clearest sentence in UK legal AI: any information you input into a public AI chatbot "should be seen as being published to all the world." Judges are told not to enter anything that is not already public. The October 2025 update also added warnings about white text and hidden prompts embedded in documents. If that is the standard the bench applies to itself, it is a reasonable benchmark for anyone handling confidential material.',
    whatItSays: [
      {
        point: 'The confidentiality rule is absolute for public chatbots.',
        quote: 'Do not enter any information into a public AI chatbot that is not already in the public domain.',
      },
      {
        point: 'Inputs are treated as irreversible publication.',
        quote: 'Any information that you input into a public AI chatbot should be seen as being published to all the world.',
      },
      {
        point:
          'The October 2025 version added a glossary entry for "white text" and warns about hidden prompts concealed in documents — visible to the system but not the human reader.',
      },
      {
        point:
          'Coverage is broad: all judicial office holders plus clerks, judicial assistants, and legal advisers under the Lady Chief Justice and Senior President of Tribunals.',
      },
    ],
    whatItMeans: [
      'The "published to all the world" framing is the same reasoning the Upper Tribunal applied in Munir v SSHD when a representative pasted client letters into ChatGPT — this is now a consistent judicial position.',
      'If a matter may end up before a judge, assume the judge holds this view of what pasting into a chatbot means.',
      'The white-text warning matters for document uploads: what a human reviewer sees is not necessarily what the model receives.',
      'The operational answer is the same as everywhere else in this hub: make sure non-public information physically cannot reach the public tool.',
    ],
    controlMapping: [
      {
        expectation: 'Nothing non-public into public AI chatbots',
        control: 'Mask before send',
        how: 'Client-identifiable and confidential specifics are replaced before submission, so the public tool receives only de-identified content.',
      },
      {
        expectation: 'Treat inputs as irreversible publication',
        control: 'Reversible vault (15-min TTL)',
        how: 'Because real values never leave the firm, there is nothing to "recall" from the provider — restoration happens locally, and vault entries expire by default.',
      },
      {
        expectation: 'Beware hidden content in documents',
        control: 'Document scan gate',
        how: 'Uploads are scanned before submission, on the same masked path as typed prompts — reducing the gap between what a human sees and what the model receives.',
      },
    ],
    faq: [
      {
        question: 'Does the judiciary’s guidance apply to law firms?',
        answer:
          'Not directly — it binds judicial office holders and their support staff. Its wider value is as a benchmark: it shows how the bench itself characterises entering information into public AI tools, which informed the Upper Tribunal’s reasoning in Munir v SSHD.',
      },
      {
        question: 'What is the "white text" warning about?',
        answer:
          'Hidden prompts or concealed text can be embedded in a document so the system reads instructions a human reviewer cannot see. The October 2025 update added this to the guidance glossary — it is a document-upload risk, not just a chat risk.',
      },
      {
        question: 'What changed between the 2023 and 2025 versions?',
        answer:
          'The core confidentiality position is unchanged. The chain is December 2023 → April 2025 → October 2025, with the latest version adding the white-text/hidden-prompt warnings and updated definitions. Read the current version at the source link.',
      },
    ],
  },
  {
    slug: 'ico-generative-ai',
    shortName: 'ICO',
    publisher: 'Information Commissioner’s Office',
    pageTitle: 'The ICO’s position on generative AI and personal data',
    title: 'Response to the consultation series on generative AI',
    firstPublished: '12 December 2024',
    lastUpdated: 'March 2026 (strategy update)',
    sourceUrl:
      'https://ico.org.uk/about-the-ico/what-we-do/our-work-on-artificial-intelligence/response-to-the-consultation-series-on-generative-ai/',
    lastReviewed: LAST_REVIEWED,
    oneLineSummary:
      'The ICO has moved from consultation to enforcement posture on generative AI — with a statutory AI code in the pipeline.',
    directAnswer:
      'The ICO ran a five-part consultation on generative AI and data protection through 2024 and published its response in December 2024, holding firm on purpose limitation, accuracy, and controllership. Its AI and biometrics strategy (June 2025) went further: the direction is a statutory code of practice for AI and automated decision-making, now in development following the Data (Use and Access) Act. The regulator has said plainly it will use formal powers where personal information is used recklessly. For firms, UK GDPR applies to AI prompts today — there is no AI exemption.',
    whatItSays: [
      {
        point: 'Transparency expectations for generative AI developers are explicit and immediate.',
        quote: 'As a first step, we expect generative AI developers to significantly improve their approach to transparency.',
      },
      {
        point: 'The enforcement posture is stated, not implied.',
        quote:
          'we will not hesitate to use our formal powers to safeguard people’s rights if organisations are using personal information recklessly',
      },
      {
        point:
          'The June 2025 AI and biometrics strategy sets four priorities, including a statutory code of practice for AI and automated decision-making — in development following the DUAA.',
      },
      {
        point:
          'The consultation response held the ICO’s positions on purpose limitation, accuracy, and controllership for generative AI development and deployment.',
      },
    ],
    whatItMeans: [
      'Personal data in AI prompts is a data protection question under UK GDPR now — waiting for the statutory code is not a strategy.',
      'A firm that can show a masking control ran before AI use has a materially better answer to "how do you protect personal data in AI workflows?" than one relying on policy alone.',
      'Data minimisation is the principle doing the work: send the model only what it needs, which for most legal and financial tasks excludes real identifiers.',
      'The statutory AI/ADM code will raise evidence expectations — audit trails built now become the compliance surface later.',
    ],
    controlMapping: [
      {
        expectation: 'Data minimisation in AI processing',
        control: 'Mask before send',
        how: 'Identifiers are stripped from prompts by default, so the AI provider processes de-identified content — minimisation applied at the exact point of exposure.',
      },
      {
        expectation: 'Demonstrable accountability (UK GDPR Art. 5(2))',
        control: 'Audit trail + DPIA evidence pack',
        how: 'Masking events are logged by category and policy, and can be exported as a signed evidence pack that slots into a DPIA or an ICO enquiry response.',
      },
      {
        expectation: 'Lawful, controlled data flows to processors',
        control: 'BYOK + on-prem deployment',
        how: 'Firms that need tighter control can run the gateway in their own environment and use their own LLM contracts and keys, keeping the processing chain theirs.',
      },
    ],
    faq: [
      {
        question: 'Is there an ICO fine for pasting client data into ChatGPT?',
        answer:
          'Not yet, as at the last review of this page. The ICO’s first fine against a law firm (DPP Law, April 2025, £60,000) was about basic security failures, not AI use. The regulator’s stated posture on reckless personal-data use suggests the gap is opportunity, not safety.',
      },
      {
        question: 'Does UK GDPR apply to AI prompts?',
        answer:
          'Yes. If a prompt contains personal data, entering it into an AI tool is processing — lawful basis, minimisation, and accountability apply. There is no AI exemption in UK data protection law.',
      },
      {
        question: 'What is the statutory AI code and when is it coming?',
        answer:
          'Following the Data (Use and Access) Act 2025, the government and ICO are developing a statutory code of practice covering AI and automated decision-making. Timing is not fixed; the ICO’s March 2026 strategy update describes it as in development. Build evidence habits now rather than retrofitting.',
      },
    ],
  },
  {
    slug: 'data-use-and-access-act',
    shortName: 'DUAA 2025',
    publisher: 'UK Parliament (legislation.gov.uk)',
    pageTitle: 'No UK AI Act — so what actually binds you? The DUAA, explained',
    title: 'Data (Use and Access) Act 2025 (c. 18)',
    firstPublished: '19 June 2025 (Royal Assent)',
    lastUpdated: 'Main data-protection provisions in force 5 February 2026',
    sourceUrl: 'https://www.legislation.gov.uk/ukpga/2025/18',
    lastReviewed: LAST_REVIEWED,
    oneLineSummary:
      'The UK’s data reform act: ADM rules relaxed but conditioned, complaints procedures mandatory, ICO AI code incoming.',
    directAnswer:
      'The UK has no AI Act — but the Data (Use and Access) Act 2025 changes the data protection rules that govern AI use. Royal Assent came on 19 June 2025; the main data-protection provisions, including the automated decision-making changes (section 80), commenced on 5 February 2026, and the mandatory data-subject complaints procedure follows on 19 June 2026. The ADM reform expands when organisations can make significant automated decisions, in exchange for safeguards. For firms using AI on personal data, the compliance frame is DUAA-amended UK GDPR — not a hypothetical AI law.',
    whatItSays: [
      {
        point: 'The ADM reform is a trade: more room for automated decisions, with safeguards attached.',
        quote:
          'This section expands the circumstances in which an organisation can make significant decisions based solely on its automated processing of personal information',
      },
      {
        point: 'The "solely automated" test turns on meaningful human involvement.',
        quote: 'a decision is based solely on automated processing if there is no meaningful human involvement in taking it',
      },
      {
        point:
          'Commencement is staged: main data-protection provisions and the ADM changes (s.80, Sch.6) in force 5 February 2026; the data-subject complaints procedure requirement (s.103, Sch.10) from 19 June 2026.',
      },
      {
        point: 'The Act paves the way for the ICO’s statutory code of practice on AI and automated decision-making.',
      },
    ],
    whatItMeans: [
      'When someone says "there’s no AI regulation in the UK", the accurate answer is: the DUAA-amended UK GDPR regime is the AI regulation for personal data, and its provisions are in force now.',
      'The meaningful-human-involvement test makes documentation of AI workflows matter — you need to be able to show where humans sit in the loop.',
      'From June 2026, firms need a proper complaints procedure for data subjects — AI-related complaints will arrive through it.',
      'The safest way to keep AI workflows out of the hardest ADM questions is to keep personal identifiers out of the automated processing in the first place.',
    ],
    controlMapping: [
      {
        expectation: 'Lawful processing under DUAA-amended UK GDPR',
        control: 'Mask before send',
        how: 'Removing identifiers before AI processing reduces the personal-data footprint of the workflow — the strongest form of data minimisation.',
      },
      {
        expectation: 'Evidence for the meaningful-human-involvement test',
        control: 'Audit trail',
        how: 'Logged masking and routing events document how the AI step fits into the wider workflow, supporting the human-involvement narrative.',
      },
      {
        expectation: 'Answering data-subject complaints (from June 2026)',
        control: 'DPIA evidence pack',
        how: 'Exportable, signed summaries of what was masked and when give a concrete artefact for complaint responses and ICO correspondence.',
      },
    ],
    faq: [
      {
        question: 'Is the DUAA fully in force?',
        answer:
          'No — commencement is staged. The main data-protection provisions, including the ADM changes, commenced on 5 February 2026 (Commencement No. 6 Regulations, SI 2026/82). The mandatory complaints-procedure requirement follows on 19 June 2026. Say "main provisions in force", not "fully in force".',
      },
      {
        question: 'Does the DUAA replace UK GDPR?',
        answer:
          'No. It amends UK GDPR and the Data Protection Act 2018. Your existing data protection obligations continue, with modified rules in areas like automated decision-making, recognised legitimate interests, and complaints handling.',
      },
      {
        question: 'What should a firm using AI do about the ADM changes?',
        answer:
          'Map where AI makes or shapes significant decisions about individuals, document where meaningful human involvement sits, and reduce the personal data entering those workflows. If identifiers are masked before processing, many workflows simply carry less ADM exposure.',
      },
    ],
  },
  {
    slug: 'fca-ai-approach',
    shortName: 'FCA',
    publisher: 'Financial Conduct Authority',
    pageTitle: 'The FCA’s AI approach: no new rulebook, existing rules apply',
    title: 'AI and the FCA: our approach',
    firstPublished: 'AI Update, 22 April 2024',
    lastUpdated: 'Approach page updated 13 February 2026',
    sourceUrl: 'https://www.fca.org.uk/firms/innovation/ai-approach',
    lastReviewed: LAST_REVIEWED,
    oneLineSummary:
      'No AI-specific rulebook: Consumer Duty and SM&CR already cover AI use — accountability sits with named senior managers.',
    directAnswer:
      'The FCA has deliberately not written an AI rulebook. Its position, set out in the April 2024 AI Update and restated on its current approach page, is that existing frameworks — the Consumer Duty, the Senior Managers and Certification Regime, and existing data and operational-resilience rules — already apply to AI. That is not a lighter regime; it is a heavier one for individuals, because SM&CR means a named senior manager is accountable for AI-driven outcomes, and the Consumer Duty asks whether AI use delivers good customer outcomes. The FCA’s AI Live Testing programme runs alongside, supporting firms deploying AI — its second cohort was announced in April 2026.',
    whatItSays: [
      {
        point: 'The position is explicit on the FCA’s current approach page.',
        quote:
          'We do not plan to introduce extra regulations for AI. Instead, we’ll rely on existing frameworks, which mitigate many of the risks associated with AI.',
      },
      {
        point: 'The April 2024 AI Update reasons that AI risks are rarely unique to AI.',
        quote:
          'Many risks related to AI are not necessarily unique to AI itself and can therefore be mitigated within existing legislative and/or regulatory frameworks.',
      },
      {
        point: 'Accountability is personal: the AI Update names SM&CR as directly relevant.',
        quote:
          'The Senior Managers and Certification Regime (SM&CR) emphasises senior management accountability and is relevant to the safe and responsible use of AI.',
      },
      {
        point:
          'The AI Live Testing programme (part of the FCA’s AI Lab) supports firms deploying AI — cohort 2, announced 21 April 2026, includes eight firms from major banks to fintechs.',
      },
    ],
    whatItMeans: [
      'For a regulated financial firm, "can we use AI?" is the wrong question — "which senior manager owns the AI risk, and what evidence do they hold?" is the FCA-shaped question.',
      'Customer personal data entering AI tools sits under both UK GDPR and the Consumer Duty lens — a data leak through a prompt is also a customer-outcome failure.',
      'Evidence is the currency of SM&CR: technical controls that log what was protected before AI processing give the accountable manager something to stand on.',
      'The absence of an AI rulebook means there is no waiting game — the obligations are already live.',
    ],
    controlMapping: [
      {
        expectation: 'Consumer Duty: good outcomes when AI touches customer data',
        control: 'Mask before send',
        how: 'Customer identifiers, account references, and payment details are masked before prompts reach external AI providers — reducing the exposure that turns into a customer-outcome failure.',
      },
      {
        expectation: 'SM&CR: named accountability for AI use',
        control: 'Audit trail + DPIA evidence pack',
        how: 'Exportable logs of the control running give the accountable senior manager concrete evidence of the safeguards in place.',
      },
      {
        expectation: 'Operational control over data flows',
        control: 'BYOK + on-prem',
        how: 'Firms can keep the gateway inside their own environment and use their own provider contracts — the data flow stays within the firm’s documented perimeter.',
      },
    ],
    faq: [
      {
        question: 'Has the FCA banned or restricted generative AI?',
        answer:
          'No. The FCA has chosen not to write AI-specific rules and instead applies the existing framework — Consumer Duty, SM&CR, and existing data and resilience requirements — to AI use. Its AI Live Testing programme actively supports firms deploying AI.',
      },
      {
        question: 'Who is accountable when AI goes wrong at a regulated firm?',
        answer:
          'Under SM&CR, a named senior manager. That is why evidence matters: the accountable individual needs to show reasonable steps, and technical controls with audit trails are exactly that kind of evidence.',
      },
      {
        question: 'Does masking customer data help with FCA expectations?',
        answer:
          'It addresses the data-exposure slice of the risk: masking reduces what external AI providers receive, and the audit trail documents the control. It does not by itself satisfy Consumer Duty or SM&CR — those are broader regimes about outcomes and governance.',
      },
    ],
  },
]

// The seven NeutralAI controls mapped across all guidance — the
// /compliance/uk-guidance-map table. Lines paraphrase the guidance; verbatim
// quotes live on the per-guidance pages.
export const controlMapRows: ControlMapRow[] = [
  {
    control: 'Mask before send',
    description: 'PII detected and replaced in the browser before the prompt or upload leaves the firm.',
    guidanceLines: [
      { shortName: 'Law Society', slug: 'law-society-generative-ai', line: 'No identifiable client data into public AI tools without safeguards.' },
      { shortName: 'Judiciary', slug: 'judiciary-ai-guidance', line: 'Nothing non-public into a public AI chatbot — inputs are publication.' },
      { shortName: 'Bar Council', slug: 'bar-council-generative-ai', line: 'Extreme vigilance with privileged or confidential information; no personal data in prompts.' },
      { shortName: 'ICO', slug: 'ico-generative-ai', line: 'Data minimisation applies to AI processing under UK GDPR.' },
    ],
  },
  {
    control: 'Reversible vault (15-minute TTL)',
    description: 'Masked tokens restore locally after the response; encrypted vault entries expire in minutes.',
    guidanceLines: [
      { shortName: 'Judiciary', slug: 'judiciary-ai-guidance', line: 'Inputs are irreversible publication — so real values must never be the input.' },
      { shortName: 'Bar Council', slug: 'bar-council-generative-ai', line: 'Inputs may be retained, used for training, and repeated verbatim later.' },
      { shortName: 'Law Society', slug: 'law-society-generative-ai', line: 'Understand what the provider retains — or ensure it retains nothing identifying.' },
    ],
  },
  {
    control: 'Audit trail',
    description: 'Category-level masking events logged with policy and timestamp — no raw PII in the log.',
    guidanceLines: [
      { shortName: 'ICO', slug: 'ico-generative-ai', line: 'Accountability: demonstrate compliance, not just assert it.' },
      { shortName: 'FCA', slug: 'fca-ai-approach', line: 'SM&CR: the accountable senior manager needs evidence of reasonable steps.' },
      { shortName: 'SRA', slug: 'sra-ai-risk-outlook', line: 'Firms remain accountable for AI use — supervision needs a record.' },
      { shortName: 'DUAA 2025', slug: 'data-use-and-access-act', line: 'Document where human involvement sits in automated workflows.' },
    ],
  },
  {
    control: 'Whitelist & tenant policy',
    description: 'Firm-approved terms and per-tenant masking policy applied consistently across every AI tool.',
    guidanceLines: [
      { shortName: 'Law Society', slug: 'law-society-generative-ai', line: 'Approve tools deliberately; apply the same confidentiality rules everywhere.' },
      { shortName: 'SRA', slug: 'sra-ai-risk-outlook', line: 'Safe adoption is a firm-level posture, not a per-tool improvisation.' },
    ],
  },
  {
    control: 'BYOK',
    description: 'Growth/Enterprise tenants use their own LLM provider keys and contracts.',
    guidanceLines: [
      { shortName: 'ICO', slug: 'ico-generative-ai', line: 'Controllership: keep the processing chain under your own contracts.' },
      { shortName: 'FCA', slug: 'fca-ai-approach', line: 'Operational control over data flows within the firm’s documented perimeter.' },
    ],
  },
  {
    control: 'On-prem / private deployment',
    description: 'The gateway can run inside the firm’s own environment or VPC.',
    guidanceLines: [
      { shortName: 'Judiciary', slug: 'judiciary-ai-guidance', line: 'The guidance distinguishes public tools from systems inside a secure network.' },
      { shortName: 'FCA', slug: 'fca-ai-approach', line: 'Resilience and control expectations favour infrastructure the firm governs.' },
    ],
  },
  {
    control: 'SSO & access control',
    description: 'OIDC/SAML SSO, MFA posture, and role-based access for admin surfaces.',
    guidanceLines: [
      { shortName: 'ICO', slug: 'ico-generative-ai', line: 'Security of processing: control who can reach personal data and policy settings.' },
      { shortName: 'SRA', slug: 'sra-ai-risk-outlook', line: 'The DPP Law fine (April 2025) turned on missing basic access controls like MFA.' },
    ],
  },
]

export const hubFaq = [
  {
    question: 'Is there a single UK regulator for AI use in professional firms?',
    answer:
      'No. AI use is governed through existing regimes: the ICO for data protection, the SRA and Law Society for solicitors, the Bar Council and BSB for barristers, the FCA for financial services, and the courts through rulings and judicial guidance. This hub maps each source to the technical controls that address it.',
  },
  {
    question: 'Do these rules apply to a small firm without a security team?',
    answer:
      'Yes. Confidentiality, data protection, and accountability expectations apply at every firm size — none of the guidance carves out small firms. The practical difference is that small firms need controls that install in minutes rather than enterprise deployment projects.',
  },
  {
    question: 'Has anyone actually been sanctioned for pasting client data into AI?',
    answer:
      'The Upper Tribunal in Munir v SSHD ([2026] UKUT 81) accepted that a legal representative pasting Home Office letters into ChatGPT was a data breach, with self-reporting to regulators. There is not yet an ICO fine specifically for AI prompt leakage — the first law-firm fine (DPP Law, April 2025) was for basic security failures.',
  },
  {
    question: 'What is the fastest way to assess our exposure?',
    answer:
      'Work through the AI Confidentiality Checklist on this page — usage discovery, data exposure, policy, technical controls, audit evidence, and incident readiness in about 20 minutes. It is not a compliance assessment; it is a structured way to find the gaps.',
  },
] as const
