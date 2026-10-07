import { Resend } from "resend";

const DEFAULT_FROM_EMAIL = "noreply@250k.org";
const DEFAULT_FROM_NAME = "250k";
const DEFAULT_NOTIFICATION_EMAIL = "marketing@250k.org";

export type LeadEmailPayload = {
  userName: string;
  userEmail: string;
  notificationSubject: string;
  notificationText: string;
  confirmationSubject: string;
  confirmationText: string;
};

function notificationEmail(): string {
  return (
    process.env.LEAD_NOTIFICATION_EMAIL?.trim() || DEFAULT_NOTIFICATION_EMAIL
  );
}

function extractEmail(raw: string): string | null {
  const trimmed = raw.trim().replace(/^["']|["']$/g, "");
  const angled = trimmed.match(/<([^>]+)>/);
  const candidate = (angled?.[1] ?? trimmed).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)) {
    return null;
  }
  return candidate;
}

function fromAddress(): string {
  const raw = process.env.RESEND_FROM?.trim() || DEFAULT_FROM_EMAIL;
  const email = extractEmail(raw) ?? DEFAULT_FROM_EMAIL;
  return `${DEFAULT_FROM_NAME} <${email}>`;
}

function toHtml(text: string): string {
  const escaped = text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `<pre style="font-family:ui-sans-serif,system-ui,sans-serif;white-space:pre-wrap;line-height:1.5">${escaped}</pre>`;
}

function logResendError(label: string, error: unknown): void {
  console.error(label, error instanceof Error ? error.message : JSON.stringify(error));
}

export async function sendLeadEmails(payload: LeadEmailPayload): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) {
    console.warn("RESEND_API_KEY is not set; lead emails were skipped.");
    return;
  }

  const resend = new Resend(resendKey);
  const from = fromAddress();
  const internalTo = notificationEmail();

  console.info("Sending lead emails", {
    from,
    notificationTo: internalTo,
    confirmationTo: payload.userEmail,
  });

  try {
    const [internal, confirmation] = await Promise.all([
      resend.emails.send({
        from,
        to: [internalTo],
        replyTo: payload.userEmail,
        subject: payload.notificationSubject,
        text: payload.notificationText,
        html: toHtml(payload.notificationText),
      }),
      resend.emails.send({
        from,
        to: [payload.userEmail],
        subject: payload.confirmationSubject,
        text: payload.confirmationText,
        html: toHtml(payload.confirmationText),
      }),
    ]);

    if (internal.error) {
      logResendError("Resend internal notification error:", internal.error);
    } else {
      console.info("Resend internal notification sent:", internal.data?.id);
    }

    if (confirmation.error) {
      logResendError("Resend user confirmation error:", confirmation.error);
    } else {
      console.info("Resend user confirmation sent:", confirmation.data?.id);
    }
  } catch (error) {
    logResendError("Resend error (lead still saved):", error);
  }
}
