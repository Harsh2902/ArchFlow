import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { renderContactEmail } from "@/lib/email/contact-email";
import { logLeadToSheet } from "@/lib/sheets/log-lead";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(6).max(40),
  projectType: z.string().min(2).max(120),
  message: z.string().min(10).max(4000)
});

const FROM = "ArchFlow Website <notifications@archflow.co.in>";
const TO_PRIMARY = "harsh@archflow.co.in";
// Tanishq's mailbox not yet provisioned — keeping CC empty until it is,
// otherwise a bouncing CC can cause the whole send to fail.
const CC: string[] = [];

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const enquiry = {
    ...parsed.data,
    receivedAt: new Date().toISOString()
  };

  // Always log so we have a runtime audit trail even if email fails.
  console.log("[contact] new enquiry", enquiry);

  const apiKey = process.env.RESEND_API_KEY;
  let emailDelivered = false;
  let resendId: string | null = null;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { subject, html, text } = renderContactEmail(enquiry);

      const result = await resend.emails.send({
        from: FROM,
        to: [TO_PRIMARY],
        ...(CC.length > 0 ? { cc: CC } : {}),
        replyTo: enquiry.email,
        subject,
        html,
        text,
        headers: {
          "X-Entity-Ref-ID": `archflow-contact-${Date.now()}`
        }
      });

      if (result.error) {
        console.error("[contact] resend send error", result.error);
      } else {
        emailDelivered = true;
        resendId = result.data?.id ?? null;
        console.log("[contact] email sent", { id: resendId });
      }
    } catch (err) {
      console.error("[contact] unexpected error sending email", err);
    }
  } else {
    console.warn(
      "[contact] RESEND_API_KEY missing — skipping email send. " +
        "Lead is logged but no email was delivered."
    );
  }

  // Always attempt to log the lead to the sheet — even if email failed.
  // The sheet is the durable record; email is for urgency.
  const sheetResult = await logLeadToSheet(enquiry, {
    emailDelivered,
    resendId
  });

  return NextResponse.json({
    ok: true,
    delivered: emailDelivered,
    logged: sheetResult.ok
  });
}
