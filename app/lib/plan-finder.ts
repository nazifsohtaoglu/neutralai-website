export type Workflow = 'evaluate' | 'workspace' | 'api'
export type Controls = 'personal' | 'shared' | 'governed' | 'enterprise'
export type PlanName = 'Free' | 'Developer' | 'Starter' | 'Team' | 'Business' | 'Enterprise'

export type PlanAnswers = {
  workflow: Workflow
  people: number
  controls: Controls
}

export type PlanForRecommendation = {
  name: string
  monthlyPrice: string
  includedUsers: number | null
  selfServeUserCap: number | null
  extraUserMonthlyGbp: number | null
}

export function isValidPeople(value: number) {
  return Number.isSafeInteger(value) && value >= 1 && value <= 10000
}

export function recommendPlan(answers: PlanAnswers, plans: readonly PlanForRecommendation[]) {
  if (!isValidPeople(answers.people)) return null
  const team = plans.find((plan) => plan.name === 'Team')
  const business = plans.find((plan) => plan.name === 'Business')
  if (team?.selfServeUserCap == null || business?.selfServeUserCap == null) return null

  let name: PlanName
  let reason: string
  if (answers.controls === 'enterprise' || answers.people > business.selfServeUserCap) {
    name = 'Enterprise'
    reason = answers.controls === 'enterprise'
      ? 'Your SSO, integration or private deployment requirements need a commercial review.'
      : 'Your workspace is larger than the self-serve plans support.'
  } else if (answers.controls === 'governed' || answers.people > team.selfServeUserCap) {
    name = 'Business'
    reason = answers.controls === 'governed'
      ? 'You need matter grouping, reviewer roles and policy controls.'
      : `Business supports your workspace size with ${business.includedUsers} users included.`
  } else if (answers.controls === 'shared' || answers.people > 1) {
    name = 'Team'
    reason = 'You need a shared workspace with team usage and audit history.'
  } else if (answers.workflow === 'api') {
    name = 'Developer'
    reason = 'You want the masking API and will call your own AI provider directly.'
  } else if (answers.workflow === 'evaluate') {
    name = 'Free'
    reason = 'You want to evaluate the masking workflow on your own before choosing a paid plan.'
  } else {
    name = 'Starter'
    reason = 'You want the app or browser extension for one person, without shared team controls.'
  }

  const plan = plans.find((candidate) => candidate.name === name)
  if (!plan) return null
  const extraUsers = plan.includedUsers == null ? 0 : Math.max(0, answers.people - plan.includedUsers)
  // Read the same GBP price displayed on the plan card, not a second price table.
  const basePrice = /^£\d+(?:\.\d{1,2})?$/.test(plan.monthlyPrice)
    ? Number(plan.monthlyPrice.slice(1))
    : null
  const monthlyTotal = basePrice == null || (extraUsers > 0 && plan.extraUserMonthlyGbp == null)
    ? null
    : basePrice + extraUsers * (plan.extraUserMonthlyGbp ?? 0)

  return { name, reason, extraUsers, monthlyTotal, basePrice }
}

export const maskingExplanation =
  'A masking request is a text submission to the protection service. Finding five names in that submission does not mean five requests. Requests are not words, pages or AI tokens.'

export const maskingLimitsExplanation =
  'Text-volume (token) limits apply as well as request limits. A token is a small piece of text used to measure usage, not one masked name. Free and Developer request figures are equivalents calculated from a token allowance: longer text can use it up in fewer submissions. A document may create several submissions, so the allowance is not a guaranteed number of documents or AI replies. Paid workspace plans can also have token overage charges; check your Billing limits.'

export const aiCreditExplanation =
  'AI credit is a money allowance for model usage through NeutralAI. It is separate from masking. The model, input length and response length determine how far it goes; it does not buy a fixed number of messages. If you use your own AI provider account, you pay that provider separately; BYOK within NeutralAI is available from Team onwards.'
