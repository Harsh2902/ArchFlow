/**
 * Renders the internal notification email sent to the founders when
 * someone submits the contact form. Returns both HTML and plain-text
 * versions — Resend uses both.
 */

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  receivedAt: string;
}

export function renderContactEmail(p: ContactPayload) {
  const safe = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const formattedDate = new Date(p.receivedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short"
  });

  const subject = `New enquiry · ${p.company} (${p.projectType})`;

  const text = [
    `New ArchFlow enquiry`,
    ``,
    `Received: ${formattedDate} IST`,
    ``,
    `Name:         ${p.name}`,
    `Company:      ${p.company}`,
    `Email:        ${p.email}`,
    `Phone:        ${p.phone}`,
    `Project type: ${p.projectType}`,
    ``,
    `Message:`,
    p.message,
    ``,
    `---`,
    `Reply directly to this email to respond — it routes back to the sender.`
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>New ArchFlow enquiry</title>
</head>
<body style="margin:0;padding:0;background:#020617;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif;color:#e2e8f0;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#020617;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02));border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <span style="display:inline-block;background:#10b981;color:#020617;width:28px;height:28px;border-radius:8px;text-align:center;line-height:28px;font-weight:700;font-size:14px;vertical-align:middle;">A</span>
                    <span style="margin-left:10px;font-size:15px;font-weight:600;color:#f8fafc;vertical-align:middle;">ArchFlow</span>
                  </td>
                  <td align="right" style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#10b981;">
                    New enquiry
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:36px 28px 12px 28px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">A lead came in</p>
              <h1 style="margin:8px 0 0 0;font-size:28px;line-height:1.15;color:#f8fafc;font-weight:600;letter-spacing:-0.02em;">
                ${safe(p.company)}
              </h1>
              <p style="margin:8px 0 0 0;color:#94a3b8;font-size:14px;">
                ${safe(p.projectType)} &middot; ${formattedDate} IST
              </p>
            </td>
          </tr>

          <!-- Contact card -->
          <tr>
            <td style="padding:24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Name</p>
                    <p style="margin:4px 0 0 0;color:#f8fafc;font-size:15px;">${safe(p.name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Email</p>
                    <p style="margin:4px 0 0 0;font-size:15px;">
                      <a href="mailto:${safe(p.email)}" style="color:#34d399;text-decoration:none;">${safe(p.email)}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Phone</p>
                    <p style="margin:4px 0 0 0;font-size:15px;">
                      <a href="tel:${safe(p.phone.replace(/\s+/g, ""))}" style="color:#34d399;text-decoration:none;">${safe(p.phone)}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:8px 28px 24px 28px;">
              <p style="margin:0 0 8px 0;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">Their message</p>
              <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-left:3px solid #10b981;border-radius:8px;padding:16px 20px;color:#cbd5e1;font-size:14px;line-height:1.6;white-space:pre-wrap;">${safe(p.message)}</div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:8px 28px 32px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#10b981;border-radius:8px;">
                    <a href="mailto:${safe(p.email)}?subject=Re:%20Your%20enquiry%20to%20ArchFlow" style="display:inline-block;padding:12px 20px;color:#020617;text-decoration:none;font-size:14px;font-weight:600;">
                      Reply to ${safe(p.name.split(" ")[0])} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0 0;font-size:12px;color:#94a3b8;">
                Or just hit <strong style="color:#cbd5e1;">Reply</strong> in your mail client — it routes back to ${safe(p.email)} automatically.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;color:#64748b;">
                Sent by archflow.co.in &middot; If you weren&rsquo;t expecting this, ignore the email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
