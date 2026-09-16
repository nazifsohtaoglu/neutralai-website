/* Standalone, time-driven worker. No web deployment or doPost handler. */
const LEAD_ALERT_STATE_KEY = 'LEAD_ALERT_STATE_V1';
const LEAD_ALERT_RECIPIENT = 'sales@neutralai.co.uk';

function withLeadAlertLock_(action) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return { status: 'busy' };
  try { return action(); } finally { lock.releaseLock(); }
}

function leadAlertContext_() {
  const properties = PropertiesService.getScriptProperties();
  const id = properties.getProperty('LEAD_SHEET_ID');
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) throw new Error('Configure LEAD_SHEET_ID');
  // Advanced Sheets API supports spreadsheets.readonly; SpreadsheetApp.openById
  // requires full spreadsheet access even when the caller only reads.
  const metadata = Sheets.Spreadsheets.get(id, { fields: 'sheets.properties' });
  const tab = (metadata.sheets || []).find(function (entry) { return entry.properties.title === 'Leads'; });
  if (!tab) throw new Error('Leads sheet/header missing');
  const result = Sheets.Spreadsheets.Values.get(id, "'Leads'", {
    valueRenderOption: 'UNFORMATTED_VALUE', dateTimeRenderOption: 'SERIAL_NUMBER'
  });
  const rows = result.values || [];
  if (!rows.length || !rows[0].length) throw new Error('Leads sheet/header missing');
  return { properties, rows, id, gid: tab.properties.sheetId };
}

function leadAlertFingerprint_(context, row) {
  const value = JSON.stringify(context.rows[row - 1]);
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8)
    .map(function (byte) { return ('0' + ((byte + 256) % 256).toString(16)).slice(-2); }).join('');
}

function saveLeadAlertState_(context, state) {
  context.properties.setProperty(LEAD_ALERT_STATE_KEY, JSON.stringify(state));
}

function loadLeadAlertState_(context) {
  const raw = context.properties.getProperty(LEAD_ALERT_STATE_KEY);
  if (!raw) throw new Error('Initialize notification baseline first');
  const state = JSON.parse(raw);
  if (state.version !== 1 || state.id !== context.id || state.gid !== context.gid ||
      !Number.isSafeInteger(state.cursor) || state.cursor < 1 ||
      context.rows.length < state.cursor ||
      state.header !== leadAlertFingerprint_(context, 1) ||
      state.anchor !== leadAlertFingerprint_(context, state.cursor)) {
    throw new Error('Lead sheet or cursor changed; manual reconciliation required');
  }
  return state;
}

// Run once with notifications disabled. Existing rows, including QA, are excluded.
// Re-running refuses to reset the cursor and silently discard unnotified leads.
function initializeLeadNotifications() {
  return withLeadAlertLock_(function () {
    const context = leadAlertContext_();
    if (context.properties.getProperty('LEAD_ALERTS_ENABLED') === 'true') {
      throw new Error('Disable notifications before initialization');
    }
    if (context.properties.getProperty(LEAD_ALERT_STATE_KEY)) throw new Error('Already initialized');
    const cursor = context.rows.length;
    const state = { version: 1, id: context.id, gid: context.gid, cursor,
      header: leadAlertFingerprint_(context, 1),
      anchor: leadAlertFingerprint_(context, cursor), pending: null };
    saveLeadAlertState_(context, state);
    return { status: 'initialized', cursor };
  });
}

// Safe to run before enabling; returns operational metadata only, never lead content.
function inspectLeadNotifications() {
  return withLeadAlertLock_(function () {
    const context = leadAlertContext_();
    const state = loadLeadAlertState_(context);
    return { enabled: context.properties.getProperty('LEAD_ALERTS_ENABLED') === 'true',
      cursor: state.cursor, newRows: context.rows.length - state.cursor,
      pendingBatch: state.pending ? state.pending.id : null };
  });
}

function notifyNewLeads() {
  return withLeadAlertLock_(function () {
    const properties = PropertiesService.getScriptProperties();
    if (properties.getProperty('LEAD_ALERTS_ENABLED') !== 'true') return { status: 'disabled' };
    const context = leadAlertContext_();
    const state = loadLeadAlertState_(context);
    if (state.pending) {
      throw new Error('Uncertain notification delivery; reconcile pending batch before retrying');
    }
    const end = context.rows.length;
    if (end === state.cursor) return { status: 'idle' };
    if (MailApp.getRemainingDailyQuota() < 1) {
      throw new Error('Mail quota unavailable; new rows retained for next scheduled run');
    }
    const pending = { id: Utilities.getUuid(), end,
      anchor: leadAlertFingerprint_(context, end), count: end - state.cursor };
    state.pending = pending;
    // Persist intent BEFORE sending. Any crash/exception after this point stops retries.
    saveLeadAlertState_(context, state);
    try {
      MailApp.sendEmail({ to: LEAD_ALERT_RECIPIENT,
        subject: 'NeutralAI: new website requests [' + pending.id + ']',
        body: pending.count + ' new website request(s) await review.\n' +
          'Open the access-controlled CRM: https://docs.google.com/spreadsheets/d/' +
          context.id + '/edit#gid=' + context.gid + '\n' +
          'Notification reference: ' + pending.id });
    } catch (_error) {
      throw new Error('Notification send outcome uncertain; reconcile pending batch before retrying');
    }
    state.cursor = pending.end;
    state.anchor = pending.anchor;
    state.pending = null;
    saveLeadAlertState_(context, state);
    return { status: 'sent', count: pending.count, batch: pending.id };
  });
}

// Owner-only editor operation, never expose through a web app.
// deliveryConfirmed=true after matching inbox receipt; false only after confirming
// it was not sent. An ambiguous result must remain pending; no automatic resend.
function resolveLeadNotification(batchId, deliveryConfirmed) {
  return withLeadAlertLock_(function () {
    const context = leadAlertContext_();
    if (context.properties.getProperty('LEAD_ALERTS_ENABLED') === 'true') {
      throw new Error('Disable notifications before reconciliation');
    }
    const state = loadLeadAlertState_(context);
    const pending = state.pending;
    if (!pending || pending.id !== batchId || typeof deliveryConfirmed !== 'boolean') {
      throw new Error('Exact pending batch and explicit delivery outcome required');
    }
    if (context.rows.length < pending.end ||
        leadAlertFingerprint_(context, pending.end) !== pending.anchor) {
      throw new Error('Pending sheet boundary changed; manual reconciliation required');
    }
    if (deliveryConfirmed) {
      state.cursor = pending.end;
      state.anchor = pending.anchor;
    }
    state.pending = null;
    saveLeadAlertState_(context, state);
    return { status: deliveryConfirmed ? 'acknowledged' : 'retry-authorized' };
  });
}
