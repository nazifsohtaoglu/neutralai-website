import { chromium } from 'playwright'
import { access, mkdir, readdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import ffmpegPath from 'ffmpeg-static'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const baseUrl = process.env.DEMO_BASE_URL ?? 'http://localhost:3200'
const assetDir = path.join(root, 'public/demo')
const recordingDir = path.join(root, 'output/playwright/neutralai-demo-video')
const videoPath = path.join(assetDir, 'neutralai-product-walkthrough.webm')
const captionsPath = path.join(assetDir, 'neutralai-product-walkthrough.vtt')
const posterPath = path.join(assetDir, 'neutralai-product-walkthrough-poster.png')
const voiceoverPath = process.env.DEMO_VOICEOVER_PATH ?? path.join(assetDir, 'neutralai-product-walkthrough-voiceover.mp3')
const runFile = promisify(execFile)

await mkdir(assetDir, { recursive: true })
await mkdir(recordingDir, { recursive: true })

for (const file of await readdir(recordingDir)) {
  if (file.endsWith('.webm')) {
    await unlink(path.join(recordingDir, file)).catch(() => {})
  }
}

async function assertLocalServer() {
  try {
    const response = await fetch(baseUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    throw new Error(`NeutralAI website is not reachable at ${baseUrl}. Start it with "npm run dev" first. ${error.message}`)
  }
}

function formatTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const wholeSeconds = Math.floor(seconds % 60)
  const milliseconds = Math.round((seconds - Math.floor(seconds)) * 1000)

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(wholeSeconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`
}

function renderVtt(cues) {
  return [
    'WEBVTT',
    '',
    ...cues.flatMap((cue, index) => [
      String(index + 1),
      `${formatTimestamp(cue.start)} --> ${formatTimestamp(cue.end)}`,
      cue.text,
      '',
    ]),
  ].join('\n')
}

async function getMediaDurationSeconds(filePath) {
  const { stderr } = await runFile(ffmpegPath, ['-i', filePath, '-hide_banner']).catch((error) => error)
  const match = stderr?.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2}\.\d{2})/)

  if (!match) {
    return 0
  }

  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3])
}

async function addVoiceoverTrack(inputVideoPath, outputVideoPath) {
  await access(voiceoverPath)
  await runFile(ffmpegPath, [
    '-y',
    '-i',
    inputVideoPath,
    '-i',
    voiceoverPath,
    '-map',
    '0:v:0',
    '-map',
    '1:a:0',
    '-c:v',
    'copy',
    '-c:a',
    'libopus',
    '-b:a',
    '96k',
    outputVideoPath,
  ])
}

await assertLocalServer()
const voiceoverDurationSeconds = await getMediaDurationSeconds(voiceoverPath)

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 810 },
  deviceScaleFactor: 1,
  recordVideo: { dir: recordingDir, size: { width: 1440, height: 810 } },
})
const page = await context.newPage()
const recordingStartedAt = Date.now()

const voiceoverCues = [
  {
    start: 0.3,
    end: 8.5,
    text: 'Teams are already using AI to summarise claims, cases, support tickets, and internal documents.',
  },
  {
    start: 8.5,
    end: 15.5,
    text: 'But sensitive data often sits inside the prompt before anyone notices.',
  },
  {
    start: 15.5,
    end: 23.5,
    text: 'NeutralAI adds a control layer before that prompt reaches an external model.',
  },
  {
    start: 23.5,
    end: 31.5,
    text: 'Paste a real workflow prompt, then run masking.',
  },
  {
    start: 31.5,
    end: 43,
    text: 'Names, emails, phone numbers, IBANs, card numbers, and other sensitive spans are detected and replaced with safe tokens.',
  },
  {
    start: 43,
    end: 51.5,
    text: 'The original prompt stays available for review, while the sanitized version is what moves forward.',
  },
  {
    start: 51.5,
    end: 60,
    text: 'Security and legal teams can see what was found, how it was classified, and why it was masked.',
  },
  {
    start: 60,
    end: 68.8,
    text: 'For workflows that need controlled restoration, reversible tokens can preserve business context without exposing raw identifiers by default.',
  },
  {
    start: 68.8,
    end: Math.max(75.3, voiceoverDurationSeconds),
    text: 'NeutralAI helps regulated teams use AI with clearer boundaries, cleaner evidence, and less sensitive data leaving the business. Try the playground, or book a live walkthrough to map this to your own AI workflow.',
  },
]

async function pause(ms = 700) {
  await page.waitForTimeout(ms)
}

async function installOverlay() {
  await page.addStyleTag({
    content: `
      html { scroll-behavior: smooth; }
      body { cursor: none !important; }
      .demo-video-cursor {
        position: fixed;
        z-index: 2147483647;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        border-radius: 999px;
        border: 2px solid rgb(34 211 238);
        background: rgba(34, 211, 238, 0.2);
        box-shadow: 0 0 0 8px rgba(34, 211, 238, 0.13), 0 18px 36px rgba(2, 6, 23, 0.34);
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 140ms ease, height 140ms ease, background 140ms ease;
      }
      .demo-video-cursor.is-down {
        width: 18px;
        height: 18px;
        background: rgba(34, 211, 238, 0.42);
      }
      .demo-video-caption {
        position: fixed;
        z-index: 2147483646;
        left: 32px;
        bottom: 28px;
        width: min(560px, calc(100vw - 64px));
        border: 1px solid rgba(34, 211, 238, 0.28);
        border-radius: 22px;
        background:
          radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.17), transparent 34%),
          linear-gradient(135deg, rgba(2, 6, 23, 0.96), rgba(8, 47, 73, 0.94));
        color: white;
        padding: 20px 22px;
        box-shadow: 0 28px 70px rgba(2, 6, 23, 0.55);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        opacity: 0;
        transform: translateY(18px);
        transition: opacity 320ms ease, transform 320ms ease;
        pointer-events: none;
      }
      .demo-video-caption.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
      .demo-video-caption__eyebrow {
        color: rgb(34 211 238);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .demo-video-caption__title {
        margin-top: 8px;
        font-size: 26px;
        line-height: 1.05;
        font-weight: 800;
        letter-spacing: 0;
      }
      .demo-video-caption__body {
        margin-top: 10px;
        color: rgb(203 213 225);
        font-size: 15px;
        line-height: 1.55;
      }
      .demo-video-end-card {
        position: fixed;
        inset: 0;
        z-index: 2147483645;
        display: grid;
        place-items: center;
        background:
          radial-gradient(circle at 16% 20%, rgba(34, 211, 238, 0.18), transparent 28%),
          radial-gradient(circle at 84% 12%, rgba(249, 115, 22, 0.14), transparent 24%),
          linear-gradient(135deg, #020617, #07111f 56%, #031b23);
        color: white;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .demo-video-end-card__inner {
        width: min(1080px, calc(100vw - 96px));
      }
      .demo-video-end-card__kicker {
        color: rgb(34 211 238);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.22em;
        text-transform: uppercase;
      }
      .demo-video-end-card h2 {
        margin: 14px 0 0;
        max-width: 860px;
        font-size: 58px;
        line-height: 0.98;
        font-weight: 850;
        letter-spacing: 0;
      }
      .demo-video-end-card p {
        margin: 18px 0 0;
        max-width: 720px;
        color: rgb(203 213 225);
        font-size: 19px;
        line-height: 1.6;
      }
      .demo-video-end-card__grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
        margin-top: 36px;
      }
      .demo-video-end-card__card {
        min-height: 170px;
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 24px;
        background: rgba(15, 23, 42, 0.78);
        padding: 24px;
        box-shadow: 0 22px 60px rgba(2, 6, 23, 0.34);
      }
      .demo-video-end-card__card strong {
        display: block;
        color: white;
        font-size: 21px;
      }
      .demo-video-end-card__card span {
        display: block;
        margin-top: 12px;
        color: rgb(148 163 184);
        font-size: 15px;
        line-height: 1.6;
      }
    `,
  })

  await page.evaluate(() => {
    document.querySelector('.demo-video-cursor')?.remove()
    document.querySelector('.demo-video-caption')?.remove()

    const cursor = document.createElement('div')
    cursor.className = 'demo-video-cursor'
    document.body.append(cursor)

    const caption = document.createElement('div')
    caption.className = 'demo-video-caption'
    caption.innerHTML = `
      <div class="demo-video-caption__eyebrow"></div>
      <div class="demo-video-caption__title"></div>
      <div class="demo-video-caption__body"></div>
    `
    document.body.append(caption)

    window.addEventListener('mousemove', (event) => {
      cursor.style.left = `${event.clientX}px`
      cursor.style.top = `${event.clientY}px`
    })
    window.addEventListener('mousedown', () => cursor.classList.add('is-down'))
    window.addEventListener('mouseup', () => cursor.classList.remove('is-down'))
  })
}

async function showCaption(eyebrow, title, body, duration = 2600) {
  await page.evaluate(
    ({ eyebrow, title, body }) => {
      const caption = document.querySelector('.demo-video-caption')
      if (!caption) {
        return
      }

      caption.querySelector('.demo-video-caption__eyebrow').textContent = eyebrow
      caption.querySelector('.demo-video-caption__title').textContent = title
      caption.querySelector('.demo-video-caption__body').textContent = body
      caption.classList.add('is-visible')
    },
    { eyebrow, title, body },
  )
  await pause(duration)
}

async function clickByRole(role, name) {
  const locator = page.getByRole(role, { name, exact: true }).first()
  await locator.scrollIntoViewIfNeeded()
  const box = await locator.boundingBox()
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 })
    await pause(220)
  }
  await locator.click()
}

await page.goto(`${baseUrl}/playground`)
await page.waitForLoadState('networkidle')
await installOverlay()
await page.mouse.move(1100, 300)
await showCaption(
  'NeutralAI walkthrough',
  'Control sensitive data before AI sees it',
  'Teams are already using AI, but sensitive prompt data needs a control point before it reaches external models.',
  9000,
)
await page.screenshot({ path: posterPath, type: 'png' })

await clickByRole('link', 'Try a sample')
await showCaption(
  'Self-guided evaluation',
  'Buyers can test the control model immediately',
  'The playground shows the masking path with safe sample data and no private app footage.',
  6500,
)

await pause(500)
await clickByRole('button', 'Finance review')
await showCaption(
  'Realistic prompt',
  'Start with a regulated workflow prompt',
  'This sample includes payment details and contact data so the masking behavior is obvious.',
  8500,
)

await clickByRole('button', 'Mask prompt')
await page.getByText('Demo preview ready').waitFor({ timeout: 5000 })
await showCaption(
  'Masking result',
  'Original and sanitized outputs sit side by side',
  'The raw prompt remains visible for review while the outbound version uses typed tokens.',
  12000,
)

await page.getByText('Entities and confidence').scrollIntoViewIfNeeded()
await pause(700)
await showCaption(
  'Evidence',
  'Teams can inspect what was found',
  'Entity type, matched text, and confidence context make the control easier for security and legal teams to review.',
  9500,
)

await page.getByRole('button', { name: 'Reversible', exact: true }).scrollIntoViewIfNeeded()
await page.mouse.wheel(0, -420)
await pause(500)
await clickByRole('button', 'Reversible')
await pause(2600)
await clickByRole('button', 'Mask prompt')
await page.getByText('Demo preview ready').waitFor({ timeout: 5000 })
await showCaption(
  'Governed restore',
  'Reversible mode creates scoped demo tokens',
  'That explains controlled restoration without exposing raw identifiers by default.',
  11500,
)

await page.evaluate(() => {
  document.querySelector('.demo-video-end-card')?.remove()
  const endCard = document.createElement('section')
  endCard.className = 'demo-video-end-card'
  endCard.innerHTML = `
    <div class="demo-video-end-card__inner">
      <div class="demo-video-end-card__kicker">NeutralAI Gateway</div>
      <h2>Use AI with clearer boundaries and less sensitive data leaving the business.</h2>
      <p>Try the playground, or book a live walkthrough to map NeutralAI to your own AI workflow.</p>
      <div class="demo-video-end-card__grid">
        <div class="demo-video-end-card__card"><strong>Mask before model calls</strong><span>PII is replaced with typed tokens before prompts are handed onward.</span></div>
        <div class="demo-video-end-card__card"><strong>Review evidence</strong><span>Teams can see what was detected and why it was masked.</span></div>
        <div class="demo-video-end-card__card"><strong>Plan rollout</strong><span>Move from playground evaluation to API, browser, and policy discussions.</span></div>
      </div>
    </div>
  `
  document.body.append(endCard)
})
await showCaption(
  'Next step',
  'Try the playground, or book a live walkthrough',
  'Map the control model to your own prompts, teams, and AI workflow.',
  Math.max(7000, (voiceoverDurationSeconds + 1) * 1000 - (Date.now() - recordingStartedAt)),
)

const rawVideo = await page.video()?.path()
await context.close()
await browser.close()

if (rawVideo) {
  await addVoiceoverTrack(rawVideo, videoPath)
  if (path.basename(rawVideo).startsWith('page@')) {
    await unlink(rawVideo).catch(() => {})
  }
}

await writeFile(captionsPath, renderVtt(voiceoverCues))

console.log(JSON.stringify({
  video: videoPath,
  captions: captionsPath,
  poster: posterPath,
  voiceover: voiceoverPath,
  baseUrl,
}))
