import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const source = readFileSync(new URL('../../ops/lead-notifications/Notifications.gs', import.meta.url), 'utf8');
const stateKey = 'LEAD_ALERT_STATE_V1';
function fixture() {
  const f = {
    rows: [['created_at', 'email', 'message'], ['old', 'old@example.test', 'historical QA']],
    props: new Map([['LEAD_SHEET_ID', 'test-sheet'], ['LEAD_ALERTS_ENABLED', 'false']]),
    sent: [], quota: 10, locked: false, releases: 0, sequence: 0, writes: 0,
    failWrite: 0, throwSend: false, gid: 42,
  };
  f.context = () => vm.createContext({
    LockService: { getScriptLock: () => ({
      tryLock: () => { if (f.locked) return false; f.locked = true; return true; },
      releaseLock: () => { f.locked = false; f.releases++; },
    }) },
    PropertiesService: { getScriptProperties: () => ({
      getProperty: key => f.props.get(key) ?? null,
      setProperty: (key, value) => {
        f.writes++;
        if (f.writes === f.failWrite) throw new Error('Simulated property store failure');
        f.props.set(key, value);
      },
    }) },
    Sheets: { Spreadsheets: {
      get: id => {
        assert.equal(id, f.props.get('LEAD_SHEET_ID'));
        return { sheets: [{ properties: { title: 'Leads', sheetId: f.gid } }] };
      },
      Values: { get: (id, range, options) => {
        assert.equal(id, f.props.get('LEAD_SHEET_ID'));
        assert.equal(range, "'Leads'");
        assert.equal(options.valueRenderOption, 'UNFORMATTED_VALUE');
        assert.equal(options.dateTimeRenderOption, 'SERIAL_NUMBER');
        return { values: structuredClone(f.rows) };
      } },
    } },
    Utilities: {
      DigestAlgorithm: { SHA_256: 'SHA_256' }, Charset: { UTF_8: 'UTF_8' },
      computeDigest: (_algorithm, value) => [...createHash('sha256').update(value).digest()],
      getUuid: () => `batch-${++f.sequence}`,
    },
    MailApp: {
      getRemainingDailyQuota: () => f.quota,
      sendEmail: message => {
        assert.ok(JSON.parse(f.props.get(stateKey)).pending, 'Intent must precede send');
        if (f.throwSend) throw new Error('Untrusted API detail should not be logged');
        f.sent.push(message);
        if (f.duringSend) f.duringSend();
      },
    },
  });
  f.boot = () => { f.api = f.context(); vm.runInContext(source, f.api); };
  f.boot();
  f.initialize = () => f.api.initializeLeadNotifications();
  f.enable = () => f.props.set('LEAD_ALERTS_ENABLED', 'true');
  f.disable = () => f.props.set('LEAD_ALERTS_ENABLED', 'false');
  f.add = () => f.rows.push(['new', 'attacker@example.test', '<script>private message</script>']);
  f.state = () => JSON.parse(f.props.get(stateKey));
  return f;
}
function active() { const f = fixture(); f.initialize(); f.enable(); f.add(); return f; }

test('disabled worker is inert even before configuration', () => {
  const f = fixture(); f.props.delete('LEAD_SHEET_ID');
  assert.equal(f.api.notifyNewLeads().status, 'disabled');
  assert.equal(f.writes, 0); assert.equal(f.sent.length, 0);
});
test('initialization excludes historical rows and refuses to reset a backlog', () => {
  const f = fixture(); f.initialize(); f.enable();
  assert.equal(f.api.notifyNewLeads().status, 'idle');
  f.add(); f.disable();
  assert.throws(() => f.initialize(), /Already initialized/);
  assert.equal(f.state().cursor, 2); assert.equal(f.sent.length, 0);
});
test('initialization is forbidden while enabled; worker requires explicit baseline', () => {
  const f = fixture(); f.enable();
  assert.throws(() => f.initialize(), /Disable/);
  assert.throws(() => f.api.notifyNewLeads(), /Initialize/);
});
test('one digest uses only fixed internal recipient, count and trusted link', () => {
  const f = active(); f.add();
  const result = f.api.notifyNewLeads();
  assert.equal(result.status, 'sent'); assert.equal(result.count, 2);
  assert.equal(f.sent.length, 1);
  const message = f.sent[0];
  assert.equal(message.to, 'sales@neutralai.co.uk');
  assert.match(message.body, /^2 new website request/);
  assert.match(message.body, /https:\/\/docs.google.com\/spreadsheets\/d\/test-sheet\/edit#gid=42/);
  assert.doesNotMatch(JSON.stringify(message), /attacker|private message|script>|historical QA/);
  assert.equal(f.state().cursor, 4); assert.equal(f.state().pending, null);
  f.boot(); assert.equal(f.api.notifyNewLeads().status, 'idle'); assert.equal(f.sent.length, 1);
});
test('lock contention sends nothing and does not release another execution lock', () => {
  const f = active(); f.locked = true; const releases = f.releases;
  assert.equal(f.api.notifyNewLeads().status, 'busy');
  assert.equal(f.releases, releases); assert.equal(f.sent.length, 0);
});
test('quota exhaustion defers retained rows, then recovery sends them', () => {
  const f = active(); f.quota = 0;
  assert.throws(() => f.api.notifyNewLeads(), /quota/);
  assert.equal(f.state().cursor, 2); assert.equal(f.state().pending, null);
  assert.equal(f.sent.length, 0); assert.equal(f.locked, false);
  f.quota = 1; assert.equal(f.api.notifyNewLeads().status, 'sent');
});
test('failed intent write prevents mail call entirely', () => {
  const f = active(); f.failWrite = f.writes + 1;
  assert.throws(() => f.api.notifyNewLeads(), /property store/);
  assert.equal(f.sent.length, 0); assert.equal(f.state().pending, null);
  assert.equal(f.locked, false);
});
test('send exception preserves pending and blocks retries after process restart', () => {
  const f = active(); f.throwSend = true;
  assert.throws(() => f.api.notifyNewLeads(), /outcome uncertain/);
  assert.equal(f.state().cursor, 2); assert.ok(f.state().pending);
  f.throwSend = false; f.boot();
  assert.throws(() => f.api.notifyNewLeads(), /reconcile pending batch/);
  assert.equal(f.sent.length, 0);
});
test('post-send persistence failure never automatically duplicates accepted mail', () => {
  const f = active(); f.failWrite = f.writes + 2;
  assert.throws(() => f.api.notifyNewLeads(), /property store/);
  assert.equal(f.sent.length, 1); assert.ok(f.state().pending);
  f.boot(); assert.throws(() => f.api.notifyNewLeads(), /reconcile pending batch/);
  assert.equal(f.sent.length, 1);
  f.disable();
  assert.equal(f.api.resolveLeadNotification(f.state().pending.id, true).status, 'acknowledged');
  f.enable(); assert.equal(f.api.notifyNewLeads().status, 'idle');
});
test('reconciliation requires disabled mode, exact batch and explicit boolean', () => {
  const f = active(); f.throwSend = true;
  assert.throws(() => f.api.notifyNewLeads()); const id = f.state().pending.id;
  assert.throws(() => f.api.resolveLeadNotification(id, true), /Disable/);
  f.disable();
  assert.throws(() => f.api.resolveLeadNotification('wrong', true), /Exact pending/);
  assert.throws(() => f.api.resolveLeadNotification(id, 'false'), /Exact pending/);
  assert.ok(f.state().pending);
});
test('confirmed non-send can be explicitly retried without skipping new rows', () => {
  const f = active(); f.throwSend = true;
  assert.throws(() => f.api.notifyNewLeads()); f.add(); f.disable();
  assert.equal(f.api.resolveLeadNotification(f.state().pending.id, false).status, 'retry-authorized');
  assert.equal(f.state().cursor, 2);
  f.throwSend = false; f.enable(); assert.equal(f.api.notifyNewLeads().count, 2);
});
test('new rows appended during send remain eligible for next digest', () => {
  const f = active(); f.duringSend = () => f.add();
  assert.equal(f.api.notifyNewLeads().count, 1);
  f.duringSend = null;
  assert.equal(f.api.notifyNewLeads().count, 1); assert.equal(f.sent.length, 2);
});
test('confirmed receipt does not skip rows added after ambiguous send', () => {
  const f = active(); f.failWrite = f.writes + 2;
  assert.throws(() => f.api.notifyNewLeads()); f.add(); f.disable();
  f.api.resolveLeadNotification(f.state().pending.id, true);
  f.enable(); assert.equal(f.api.notifyNewLeads().count, 1); assert.equal(f.sent.length, 2);
});
for (const [name, mutate] of [
  ['header change', f => { f.rows[0][0] = 'changed'; }],
  ['cursor-row edit', f => { f.rows[1][1] = 'changed'; }],
  ['sheet truncation', f => { f.rows = f.rows.slice(0, 1); }],
  ['sheet replacement', f => { f.gid = 99; }],
  ['spreadsheet replacement', f => { f.props.set('LEAD_SHEET_ID', 'other-sheet'); }],
]) test(`${name} stops sending for manual reconciliation`, () => {
  const f = active(); mutate(f);
  assert.throws(() => f.api.notifyNewLeads(), /manual reconciliation/);
  assert.equal(f.sent.length, 0); assert.equal(f.locked, false);
});
test('changed pending boundary cannot be acknowledged or retried blindly', () => {
  const f = active(); f.throwSend = true;
  assert.throws(() => f.api.notifyNewLeads()); f.disable();
  f.rows[2][0] = 'edited';
  assert.throws(() => f.api.resolveLeadNotification(f.state().pending.id, true), /boundary changed/);
  assert.ok(f.state().pending);
});
test('inspection is non-sending and exposes no customer fields', () => {
  const f = active(); const result = f.api.inspectLeadNotifications();
  assert.equal(result.newRows, 1); assert.equal(result.enabled, true);
  assert.doesNotMatch(JSON.stringify(result), /attacker|private|historical/);
  assert.equal(f.sent.length, 0);
});
test('manifest confines requested permissions to read-only Sheets and send-only mail', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../ops/lead-notifications/appsscript.json', import.meta.url)));
  assert.deepEqual(manifest.dependencies.enabledAdvancedServices, [
    { userSymbol: 'Sheets', version: 'v4', serviceId: 'sheets' },
  ]);
  assert.deepEqual(manifest.oauthScopes, [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/script.send_mail',
  ]);
});
