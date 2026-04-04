export const siteConfig = {
  name: 'NeutralAI',
  description:
    'NeutralAI Gateway helps teams route AI traffic through a security layer that detects, masks, and audits sensitive data before it reaches external models.',
  url: 'https://neutralai.co.uk',
  wwwUrl: 'https://www.neutralai.co.uk',
  apiBaseUrl: 'https://api.neutralai.co.uk',
  apiHealthUrl: 'https://api.neutralai.co.uk/health',
  apiReadyUrl: 'https://api.neutralai.co.uk/ready',
  appBaseUrl: 'https://app.neutralai.co.uk',
  contactEmail: 'privacy@neutralai.co.uk',
  securityEmail: 'security@neutralai.ai',
  supportEmail: 'support@neutralai.io',
  securityTxtPath: '/.well-known/security.txt',
  chromeExtensionUrl: '',
  edgeExtensionUrl: '',
} as const

export const contactLinks = {
  betaAccessMailto: `mailto:${siteConfig.contactEmail}?subject=NeutralAI%20beta%20access`,
  launchReviewMailto: `mailto:${siteConfig.contactEmail}?subject=NeutralAI%20launch%20readiness%20review`,
  securityMailto: `mailto:${siteConfig.securityEmail}?subject=Security%20enquiry%20for%20NeutralAI`,
} as const

export const homeSections = {
  problem: '/#problem',
  howItWorks: '/#how-it-works',
  trust: '/#trust',
  pricing: '/#pricing',
} as const

export const extensionLinks = {
  privacy: '/privacy',
  support: '/support/browser-extension',
  install: '/install-extension',
  signIn: `${siteConfig.appBaseUrl}/auth/signin`,
  session: `${siteConfig.appBaseUrl}/api/auth/session`,
  authContext: `${siteConfig.appBaseUrl}/api/extension/auth-context`,
  mask: `${siteConfig.apiBaseUrl}/v1/shield/mask`,
  remoteConfig: `${siteConfig.apiBaseUrl}/api/v1/extension/config`,
  telemetry: `${siteConfig.apiBaseUrl}/api/v1/extension/telemetry`,
  securityTxt: `${siteConfig.url}${siteConfig.securityTxtPath}`,
  supportMailto: `mailto:${siteConfig.supportEmail}?subject=NeutralAI%20browser%20extension%20support`,
} as const
