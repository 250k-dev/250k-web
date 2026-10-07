import { Resend } from "resend";

const DEFAULT_NOTIFICATION_EMAIL = "marketing@250k.org";
const DEFAULT_FROM = "250k <noreply@250k.org>";

export type LeadEmailPayload = {
  userName: string;
  userEmail: string;
  notificationSubject: string;
  notificationText: string;
  confirmationSubject: string;
  confirmationText: string;
};

function notificationEmail(): string {
  return process.env.LEAD_NOTIFICATION_EMAIL?.trim() || DEFAULT_NOTIFICATION_EMAIL;
}

function fromAddress(): string {
  return process.env.RESEND_FROM?.trim() || DEFAULT_FROM;
}

export async function sendLeadEmails(payload: LeadEmailPayload): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("RESEND_API_KEY is not set; lead emails were skipped.");
    return;
  }

  const resend = new Resend(resendKey);
  const from = fromAddress();
  const internalTo = notificationEmail();

  try {
    const [internal, confirmation] = await Promise.all([
      resend.emails.send({
        from,
        to: [internalTo],
        replyTo: payload.userEmail,
        subject: payload.notificationSubject,
        text: payload.notificationText,
      }),
      resend.emails.send({
        from,
        to: [payload.userEmail],
        subject: payload.confirmationSubject,
        text: payload.confirmationText,
      }),
    ]);

    if (internal.error) {
      console.error("Resend internal notification error:", internal.error);
    }
    if (confirmation.error) {
      console.error("Resend user confirmation error:", confirmation.error);
    }
  } catch (error) {
    console.error("Resend error (lead still saved):", error);
  }
}
