type PromptPart = {
  text: string
  tone?: 'danger' | 'safe'
}

type PromptLine = PromptPart[]

export const rawPromptLines: PromptLine[] = [
  [{ text: 'Draft a reply to ' }, { text: 'emma@client.com', tone: 'danger' }],
  [{ text: 'about claim ' }, { text: 'POL-44918', tone: 'danger' }],
  [{ text: 'and include phone ' }, { text: '+44 07...', tone: 'danger' }],
] as const

export const sanitizedPromptLines: PromptLine[] = [
  [{ text: 'Draft a reply to ' }, { text: 'EMAIL_TOKEN', tone: 'safe' }],
  [{ text: 'about claim ' }, { text: 'CLAIM_REFERENCE', tone: 'safe' }],
  [{ text: 'and include phone ' }, { text: 'PHONE_TOKEN', tone: 'safe' }],
] as const

function countPromptChars(lines: readonly PromptLine[]) {
  return lines.reduce(
    (total, line) => total + line.reduce((lineTotal, part) => lineTotal + part.text.length, 0),
    0
  )
}

export const rawPromptCharCount = countPromptChars(rawPromptLines)
export const sanitizedPromptCharCount = countPromptChars(sanitizedPromptLines)

export function renderPromptLines({
  lines,
  typedChars,
  highlightTokens,
  showCaret,
}: {
  lines: readonly PromptLine[]
  typedChars: number
  highlightTokens: boolean
  showCaret: boolean
}) {
  let consumedChars = 0

  return lines.map((line, lineIndex) => {
    const lineLength = line.reduce((total, part) => total + part.text.length, 0)
    const lineVisibleChars = Math.max(0, Math.min(lineLength, typedChars - consumedChars))
    const isCurrentLine =
      showCaret &&
      typedChars > consumedChars &&
      typedChars <= consumedChars + lineLength &&
      typedChars < countPromptChars(lines)

    consumedChars += lineLength

    if (lineVisibleChars <= 0) {
      return <div key={`line-${lineIndex}`} className="min-h-[1.9rem] md:min-h-[2.1rem]" />
    }

    let remainingChars = lineVisibleChars
    const parts = line.map((part, partIndex) => {
      if (remainingChars <= 0) {
        return null
      }

      const visibleLength = Math.min(remainingChars, part.text.length)
      const visibleText = part.text.slice(0, visibleLength)
      const partIsComplete = visibleLength === part.text.length
      remainingChars -= visibleLength

      if (part.tone && partIsComplete && highlightTokens) {
        return (
          <span
            key={`part-${lineIndex}-${partIndex}`}
            className={part.tone === 'danger' ? 'token-danger' : 'token-safe'}
          >
            {part.text}
          </span>
        )
      }

      return <span key={`part-${lineIndex}-${partIndex}`}>{visibleText}</span>
    })

    return (
      <div key={`line-${lineIndex}`} className="min-h-[1.9rem] break-words md:min-h-[2.1rem]">
        {parts}
        {isCurrentLine ? <span className="typing-caret ml-1" /> : null}
      </div>
    )
  })
}
