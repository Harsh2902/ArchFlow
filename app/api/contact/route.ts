import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(6).max(40),
  projectType: z.string().min(2).max(120),
  message: z.string().min(10).max(4000)
});

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

  // TODO: connect Resend (or similar) to forward this to harsh@archflow.co.in.
  // For now we log to the server console so the dev can confirm receipt.
  console.log("[contact] new enquiry", {
    ...parsed.data,
    receivedAt: new Date().toISOString()
  });

  return NextResponse.json({ ok: true });
}
