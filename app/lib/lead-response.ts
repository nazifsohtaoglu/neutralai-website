/** Apps Script can return HTTP 200 even when persisting a lead failed. */
export async function requireLeadAcceptance(response: Response): Promise<void> {
  if (!response.ok) throw new Error('lead_not_accepted')

  let result: unknown
  try {
    result = await response.json()
  } catch {
    throw new Error('lead_not_accepted')
  }

  if (
    typeof result !== 'object' ||
    result === null ||
    !('ok' in result) ||
    result.ok !== true
  ) {
    throw new Error('lead_not_accepted')
  }
}
