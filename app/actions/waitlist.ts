'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const YOUR_EMAIL = process.env.ALERT_EMAIL!;

const WaitlistSchema = z.object({
  email: z.string().email('Invalid transmission coordinates.'),
  firstname: z.string().max(0).optional(), // Honeypot
});

export async function handleWaitlist(formData: FormData) {
  const rawData = {
    email: formData.get('email'),
    firstname: formData.get('firstname'),
  };

  const validated = WaitlistSchema.safeParse(rawData);

  if (!validated.success) {
    if (rawData.firstname) return { success: true };
    return { success: false, error: validated.error.message };
  }

  const { email } = validated.data;

  try {
    // 1. Save to Resend Audience
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });

    // 2. Prepare the Mailto Content
    // We encode the strings so they work safely in a URL
    const subject = encodeURIComponent("You're in. Welcome to ECHO.");
    const body = encodeURIComponent(
      `Welcome to the shadows.\n\n` +
        `Your identity has been verified. You now have access to a space where words are written in sand. ` +
        `Every message, thread, and trace of your presence is deleted every 24 hours.\n\n` +
        `The next cycle begins soon.\n\n` +
        `Enjoy the silence.\n` +
        `— The ECHO Team`,
    );

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // 3. Send the "Magic Link" Alert to YOU
    await resend.emails.send({
      from: 'ECHO PROTOCOL <onboarding@resend.dev>',
      to: YOUR_EMAIL,
      subject: `[NEW_GHOST] ${email}`,
      html: `
        <div style="background: #000; color: #6366f1; padding: 40px; font-family: monospace; border: 1px solid #333;">
          <h2 style="color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px;">IDENTITY DETECTED</h2>
          <p style="color: #a1a1aa;">A new user has requested entry into the Void.</p>
          <div style="background: #111; padding: 20px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0;"><strong>USER:</strong> ${email}</p>
          </div>
          <p style="color: #a1a1aa; font-size: 12px;">Clicking the button below will open your local mail app to send the welcome kit.</p>
          <a href="${mailtoLink}" 
             style="display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px;">
            SEND_WELCOME_EMAIL
          </a>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error('Waitlist Error:', err);
    return { success: false, error: 'Transmission interference detected.' };
  }
}

export async function getRealtimeStats() {
  try {
    const { data } = await resend.contacts.list({ audienceId: AUDIENCE_ID });
    const count = data?.data?.length || 0;
    return { count, remaining: Math.max(0, 50 - count) };
  } catch (e) {
    return { count: 0, remaining: 50 };
  }
}
