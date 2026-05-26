/**
 * ArchFlow — Leads Webhook (Google Apps Script)
 *
 * This script is the receiving end of the contact-form webhook. Paste
 * it into Extensions → Apps Script on the Leads sheet, deploy it as a
 * Web App, and add the resulting URL to Vercel as SHEET_WEBHOOK_URL.
 *
 * Optional: set a shared secret on the script (Project Settings →
 * Script Properties → add "SECRET" = "<some-random-string>") and use
 * the same value as SHEET_WEBHOOK_SECRET on Vercel. Submissions
 * without a matching secret will be rejected.
 *
 * Sheet expectations:
 *   - First tab is named "Leads"
 *   - Row 1 holds these headers in order:
 *     Received (IST) | Name | Company | Email | Phone | Project type
 *     | Message | Email delivered | Resend ID
 *   - Run setupHeaders() once from the Apps Script editor to create
 *     them automatically if you haven't already.
 */

const SHEET_NAME = "Leads";

const HEADERS = [
  "Received (IST)",
  "Name",
  "Company",
  "Email",
  "Phone",
  "Project type",
  "Message",
  "Email delivered",
  "Resend ID"
];

function setupHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    // Optional shared-secret check
    const expected = PropertiesService.getScriptProperties().getProperty(
      "SECRET"
    );
    if (expected && body.secret !== expected) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Forbidden" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) setupHeaders();

    const received = body.receivedAt
      ? new Date(body.receivedAt)
      : new Date();
    const formattedDate = Utilities.formatDate(
      received,
      "Asia/Kolkata",
      "dd MMM yyyy, HH:mm"
    );

    sheet.appendRow([
      formattedDate,
      body.name || "",
      body.company || "",
      body.email || "",
      body.phone || "",
      body.projectType || "",
      body.message || "",
      body.emailDelivered ? "yes" : "no",
      body.resendId || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    "ArchFlow leads webhook is live. POST JSON to log a lead."
  );
}
