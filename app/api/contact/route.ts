import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { renderContactEmail } from "@/lib/email/contact-email";

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

  // No key wired up — local dev or a misconfigured deploy. Don't fail
  // the user; the lead is still logged above and they get a success
  // toast. Surface a server-side warning instead.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY missing — skipping email send. " +
        "Lead is logged but no email was delivered."
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

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
      // We don't want the user to see "failed" — their lead IS logged.
      // Return ok but mark delivered=false so we can monitor.
      return NextResponse.json({ ok: true, delivered: false });
    }

    console.log("[contact] email sent", { id: result.data?.id });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] unexpected error sending email", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
