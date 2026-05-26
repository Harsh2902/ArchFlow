/**
 * Fire-and-forget logger that POSTs a contact-form submission to a
 * Google Apps Script web-app endpoint. The Apps Script (running on
 * the user's spreadsheet) appends a row to a "Leads" tab.
 *
 * Failures are swallowed — we never want a sheet-logging error to
 * break the form for the visitor. Errors land in the runtime log.
 */

import type { ContactPayload } from "@/lib/email/contact-email";

interface LogLeadExtras {
  emailDelivered: boolean;
  resendId?: string | null;
}

export async function logLeadToSheet(
  payload: ContactPayload,
  extras: LogLeadExtras
): Promise<{ ok: boolean }> {
  const url = process.env.SHEET_WEBHOOK_URL;
  const sharedSecret = process.env.SHEET_WEBHOOK_SECRET ?? "";

  if (!url) {
    console.warn(
      "[contact] SHEET_WEBHOOK_URL missing — skipping sheet log."
    );
    return { ok: false };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      // Apps Script web apps accept text/plain to avoid CORS preflight
      // headaches when invoked from a browser. We're calling
      // server-to-server, but using text/plain is still safer because
      // Apps Script's e.postData.contents only populates reliably for
      // text/plain bodies.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: sharedSecret,
        receivedAt: payload.receivedAt,
        name: payload.name,
        company: payload.company,
        email: payload.email,
        phone: payload.phone,
        projectType: payload.projectType,
        message: payload.message,
        emailDelivered: extras.emailDelivered,
        resendId: extras.resendId ?? ""
      }),
      // Don't let a slow sheet block the response to the user.
      signal: AbortSignal.timeout(4000)
    });
    if (!res.ok) {
      console.error(
        "[contact] sheet webhook responded non-OK",
        res.status,
        await res.text().catch(() => "")
      );
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] sheet webhook error", err);
    return { ok: false };
  }
}
