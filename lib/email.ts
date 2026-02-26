import { Resend } from "resend";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

/**
 * Resend email client.
 *
 * Usage:
 *   import { sendEmail } from "@/lib/email"
 *   await sendEmail({
 *     to: "user@example.com",
 *     subject: "Welcome!",
 *     react: <WelcomeEmail name="Alice" />,
 *   })
 */
const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  replyTo?: string;
}

export async function sendEmail({ to, subject, react, replyTo }: SendEmailOptions): Promise<void> {
  if (!resend) {
    logger.warn("RESEND_API_KEY not set — email sending is disabled");
    return;
  }

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    react,
    replyTo,
  });

  if (error) {
    logger.error({ error, to, subject }, "Failed to send email");
    throw new Error(`Email send failed: ${error.message}`);
  }
}
