# Internal lead notifications

Status: source implementation only. Merging or deploying the website does **not** install this worker, authorize Google mail, create a trigger or send email. Revenue Operations owns activation, daily execution monitoring and inbox acceptance; notification delivery remains a launch acceptance item until those checks pass.

## Scope and separation

`ops/lead-notifications/Notifications.gs` is a **separate standalone Apps Script project**, with no web endpoint. Every five minutes it can send one digest of newly appended rows to the fixed internal address `sales@neutralai.co.uk`. It sends only a count, batch reference and restricted CRM link, never submitted names, addresses or messages. No customer auto-response is sent. The recipient must already have appropriate Sheet access; the link grants no access.

The existing ingestion web app stays unchanged: its successful Sheet write determines `{ok:true}`. Notification failure cannot change the browser acknowledgement. Consolidating the legacy duplicate `doPost` handlers is a separate change: adding mail permission to the public ingestion project would couple authorization and delivery to a working conversion path.

Assumption: the `Leads` sheet remains append-only, with its header row intact. Use filter views; do not sort, delete, insert or edit underlying rows while this cursor-based worker is active. Row counts plus hashes of the header and last processed row catch some changes, **not every edit/reorder**. If manual maintenance is necessary, disable the worker and reconcile all unnotified rows before resuming. It never writes to the Sheet or runs `setupSheet`.

## Activation by the Google Workspace owner

1. Create a new private standalone Apps Script project under the approved CRM owner. Restrict project editors; they can change notification code/recipient. Do not deploy it as a web app or copy it into the existing ingestion project.
2. Copy `Notifications.gs` and `appsscript.json`. Enable manifest visibility in project settings. The manifest enables Advanced Sheets API v4; confirm it appears under Services. With a standard Google Cloud project, enable the Google Sheets API there too. The worker uses this API because `SpreadsheetApp.openById` requires broader write-capable Sheets permission. Review the explicit read-only Sheets and send-mail scopes. No Gmail inbox access or trigger-management API scope is requested.
3. Set script properties `LEAD_SHEET_ID` to the existing CRM spreadsheet ID and `LEAD_ALERTS_ENABLED` to `false`. Never put credentials in script properties/source.
4. Manually triage all existing rows first. Run `initializeLeadNotifications` once and complete Google's authorization as the owner. Initialization excludes every existing row, including historical QA. It cannot be rerun to silently skip a backlog. Record the baseline cursor/time in private ops evidence. A row arriving before this snapshot belongs to the manual baseline review; check it too.
5. Run `inspectLeadNotifications` and inspect its returned metadata in the execution/debugger. If needed use a temporary editor-only wrapper with `console.log(inspectLeadNotifications())`; it returns no submitted fields. Confirm the expected baseline and no pending batch.
6. Create exactly one time-driven trigger for `notifyNewLeads`, every five minutes, under this same owner; configure immediate failure notifications in the trigger UI. No simple `onEdit` trigger is used. Change `LEAD_ALERTS_ENABLED` to `true` only when the fixed mailbox and failure monitoring are ready.
7. With explicit permission for the controlled internal test email, append one new synthetic QA row. Confirm unchanged ingestion acknowledgement, one stored row and one digest in the fixed internal inbox. Run again: no second digest. Do not reuse or resend the earlier form acceptance submissions. A successful `sendEmail` return alone is not inbox delivery proof.
8. Save evidence of sender identity, recipient receipt, batch reference, trigger owner/schedule and failure-notification setting without customer data. Until this acceptance passes, monitor the Sheet manually.

## Failure and recovery

A script lock serializes this project's invocations. No available mail quota leaves the cursor unchanged and fails the execution; a later scheduled run may try again. This can repeat until quota recovers; it does not make send attempts while quota is zero. Configuration/read failures also leave new rows available. Watch failure email and Apps Script Executions, not just the public website's health.

Before calling MailApp the worker stores a pending batch in one script property. After success it atomically replaces that property with the advanced cursor and clears pending. If sending throws, execution dies, or the final state write fails, the pending batch blocks subsequent sends. MailApp supplies no idempotency key: automatic resend after an ambiguous result risks duplicates. This design favors visible manual reconciliation over silently losing or repeatedly emailing requests. Do not claim exactly-once delivery. New rows still reach Sheets while notifications are blocked.

For a pending batch:

1. Set `LEAD_ALERTS_ENABLED=false`. Preserve `LEAD_ALERT_STATE_V1`; do not delete/reset it.
2. Read `inspectLeadNotifications` for its batch reference. Check the internal mailbox and owner send/audit evidence for that exact reference. Inbox absence alone is not proof of non-delivery; check spam/delays and sender evidence.
3. From an editor-only temporary wrapper, call `resolveLeadNotification('exact-batch-reference', true)` when receipt is confirmed, or `false` only when non-send is confirmed and a retry is authorized. Remove the wrapper afterwards. Unknown outcome stays pending. The function refuses enabled mode, a wrong batch, changed sheet boundary or a missing explicit boolean.
4. Inspect state, re-enable and monitor the next run. New rows appended while reconciliation was pending remain eligible. Never authorize retry just to silence an error.

To stop: set `LEAD_ALERTS_ENABLED=false`, then delete the trigger. Do not delete the state. An in-flight send may finish; wait for execution completion and reconcile before changing state or removing the project. Reverting website code does not uninstall the worker. A rollback here is disabling the worker while retaining Sheet data and manually monitoring new rows.

## Verification

Run `node --test tests/content/lead-notifications.test.mjs`. Tests execute the actual Apps Script source in a VM with fake Google services: baseline/no replay, fixed recipient/no submitted content, restart persistence, lock contention, quota deferral, send exceptions and post-send persistence failure, sheet changes, exact-batch reconciliation. They do not prove Google authorization, trigger operation or mailbox delivery.

API references: [Sheets values.get and read-only scope](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get), [Advanced service setup](https://developers.google.com/apps-script/guides/services/advanced), [MailApp](https://developers.google.com/apps-script/reference/mail/mail-app), [Script lock](https://developers.google.com/apps-script/reference/lock/lock-service), [Script properties](https://developers.google.com/apps-script/reference/properties/properties-service). Mail quota is per recipient and checked per execution; MailApp requires send-mail authorization and cannot read the inbox.
