#!/usr/bin/env node
/**
 * Regenerates app/data/benchmark-facts.json from the gateway's checked-in
 * benchmark artifacts, so no benchmark number on the public site is hand-typed.
 *
 *   node scripts/sync-benchmark-facts.mjs [--check]
 *
 * `--check` fails instead of writing when the committed facts are stale — use
 * it in CI so the site cannot silently drift from the artifact it cites.
 *
 * Point GATEWAY_REPO at the gateway checkout if it is not a sibling directory.
 *
 * WHY THIS EXISTS (gateway#1643): the site used to hard-code a headline
 * "vanilla Presidio 57.5% vs NeutralAI 99.8%". That pairing is not an accuracy
 * comparison — the baseline is never configured to attempt most of the scored
 * entity families, so it takes a structural zero on them and the gap widens
 * every time we add an entity type, with no accuracy change at all. The facts
 * below therefore separate the two claims that number was conflating:
 *
 *   coverage            — how many of the benchmarked families each side attempts
 *   sharedEntityAccuracy — accuracy over ONLY the families both sides attempt
 *
 * Shared-entity accuracy is read from the HOLDOUT set (not used for tuning);
 * the public synthetic set is clean enough that both engines score near 1.0 on
 * the easy families, which understates the real-world difference.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = resolve(HERE, '..')
const GATEWAY = process.env.GATEWAY_REPO ?? resolve(SITE_ROOT, '..', 'neutralai-gateway')
const BENCH_DIR = join(GATEWAY, 'documents', 'business', 'benchmarks')
const OUT = join(SITE_ROOT, 'app', 'data', 'benchmark-facts.json')

/**
 * This reads the gateway's WORKING TREE, not a pinned commit — which means a
 * gateway checkout sitting on a feature branch will silently publish numbers
 * that are not on `main` yet. That has already happened once: facts generated
 * from an unmerged holdout branch made the site cite a corpus nobody could
 * verify, and only a TypeScript error on an unexpectedly-empty array caught it.
 *
 * So refuse to run unless the gateway is on `main` and clean. Override with
 * ALLOW_DIRTY_GATEWAY=1 when you deliberately want to preview branch numbers.
 */
function assertGatewayIsPublishable() {
  if (process.env.ALLOW_DIRTY_GATEWAY === '1') {
    console.warn('ALLOW_DIRTY_GATEWAY=1 — generating from the gateway working tree as-is. Do not commit these facts.')
    return
  }
  const git = (args) => execFileSync('git', ['-C', GATEWAY, ...args], { encoding: 'utf8' }).trim()
  let branch
  let dirty
  try {
    branch = git(['rev-parse', '--abbrev-ref', 'HEAD'])
    dirty = git(['status', '--porcelain', '--', 'documents/business/benchmarks'])
  } catch (err) {
    console.error(`Could not inspect the gateway checkout at ${GATEWAY}: ${err.message}`)
    process.exit(1)
  }
  if (branch !== 'main') {
    console.error(
      `Gateway checkout is on "${branch}", not main. Published facts must come from merged artifacts.\n` +
        'Switch it to main, or set ALLOW_DIRTY_GATEWAY=1 to preview branch numbers without committing them.',
    )
    process.exit(1)
  }
  if (dirty) {
    console.error(`Gateway benchmark artifacts have uncommitted changes:\n${dirty}\nCommit or stash them first.`)
    process.exit(1)
  }
}

assertGatewayIsPublishable()

const read = (name) => JSON.parse(readFileSync(join(BENCH_DIR, name), 'utf8'))

const pub = read('pii_detection_accuracy_benchmark_2026q2.json')
const holdout = read('pii_detection_accuracy_holdout_benchmark_2026q2.json')

const day = (iso) => iso.slice(0, 10)
const pct = (n) => `${(n * 100).toFixed(1)}%`

/** F1 over a chosen subset of entities, pooled (not averaged) across them. */
function pooledF1(perEntity, entities) {
  let tp = 0
  let fp = 0
  let fn = 0
  for (const e of entities) {
    const s = perEntity[e]
    if (!s) continue
    tp += s.tp
    fp += s.fp
    fn += s.fn
  }
  const precision = tp + fp ? tp / (tp + fp) : 0
  const recall = tp + fn ? tp / (tp + fn) : 0
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0
  return { f1, precision, recall, tp, fp, fn }
}

/**
 * An entity counts as "attempted" by a side when it recorded any decision at
 * all on it. A family the baseline is not configured for produces tp=fp=0 —
 * it did not miss those cases, it never looked for them.
 */
const attempted = (perEntity) =>
  Object.keys(perEntity)
    .filter((e) => perEntity[e].tp + perEntity[e].fp > 0)
    .sort()

const pubNeutral = pub.results.neutralai.per_entity
const pubBaseline = pub.results.presidio_vanilla.per_entity
const holdNeutral = holdout.results.neutralai.per_entity
const holdBaseline = holdout.results.presidio_vanilla.per_entity

const neutralFamilies = Object.keys(pubNeutral).sort()
const baselineFamilies = attempted(pubBaseline)
const notAttempted = neutralFamilies.filter((e) => !baselineFamilies.includes(e))

// Shared families, measured on the holdout split.
const shared = Object.keys(holdNeutral)
  .filter((e) => attempted(holdBaseline).includes(e))
  .sort()
const sharedNeutral = pooledF1(holdNeutral, shared)
const sharedBaseline = pooledF1(holdBaseline, shared)

const facts = {
  $generatedBy: 'scripts/sync-benchmark-facts.mjs — do not edit by hand',
  $source: 'nazifsohtaoglu/neutralai-gateway documents/business/benchmarks/',

  publicSet: {
    generatedAt: day(pub.generated_at),
    caseCount: pub.case_count,
    languages: pub.languages,
    overallF1: pct(pub.results.neutralai.overall.f1),
    falsePositiveRate: pct(pub.results.neutralai.overall.false_positive_rate),
  },

  // The holdout set predates the UK pack, so it covers FEWER families than the
  // public set. Publish its family count next to its F1 or a reader will take
  // the holdout score as spanning everything the public set measures.
  holdoutSet: {
    generatedAt: day(holdout.generated_at),
    caseCount: holdout.case_count,
    overallF1: pct(holdout.results.neutralai.overall.f1),
    personF1: pct(holdNeutral.PERSON.f1),
    families: Object.keys(holdNeutral).length,
    familiesWithoutHoldoutCoverage: neutralFamilies.filter((e) => !(e in holdNeutral)),
  },

  // Claim 1 — coverage. Countable, and the real differentiator.
  coverage: {
    neutralaiFamilies: neutralFamilies.length,
    baselineFamilies: baselineFamilies.length,
    notAttemptedByBaseline: notAttempted,
    ukFamilies: neutralFamilies.filter((e) => e.startsWith('UK_')).length,
  },

  // Claim 2 — accuracy, restricted to what both sides actually attempt.
  sharedEntityAccuracy: {
    measuredOn: 'holdout',
    entities: shared,
    neutralaiF1: pct(sharedNeutral.f1),
    baselineF1: pct(sharedBaseline.f1),
    neutralaiFalsePositives: sharedNeutral.fp,
    baselineFalsePositives: sharedBaseline.fp,
    neutralaiPrecision: pct(sharedNeutral.precision),
    baselinePrecision: pct(sharedBaseline.precision),
    personNeutralaiF1: pct(holdNeutral.PERSON.f1),
    personBaselineF1: pct(holdBaseline.PERSON.f1),
    personBaselinePrecision: pct(holdBaseline.PERSON.precision),
    baselineFalsePositiveRate: pct(holdout.results.presidio_vanilla.overall.false_positive_rate),
  },
}

const next = `${JSON.stringify(facts, null, 2)}\n`

if (process.argv.includes('--check')) {
  let current = ''
  try {
    current = readFileSync(OUT, 'utf8')
  } catch {
    /* missing counts as stale */
  }
  if (current !== next) {
    console.error(`${OUT} is stale. Run: node scripts/sync-benchmark-facts.mjs`)
    process.exit(1)
  }
  console.log('benchmark facts are in sync with the gateway artifacts')
} else {
  writeFileSync(OUT, next)
  console.log(`wrote ${OUT}`)
}
