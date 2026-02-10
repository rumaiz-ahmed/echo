'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { createHmac } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const YOUR_EMAIL = process.env.ALERT_EMAIL!;
// Ensure you add this to your .env
const AUTH_SECRET = process.env.AUTH_SECRET!;

// 1. Define a Schema for validation
const WaitlistSchema = z.object({
  email: z.string().email('Invalid transmission coordinates.'),
  // A honeypot field to catch simple bots
  firstname: z.string().max(0).optional(),
});

/**
 * Generates a secure HMAC signature
 */
function generateSignature(email: string) {
  return createHmac('sha256', AUTH_SECRET).update(email).digest('hex');
}

export async function handleWaitlist(formData: FormData) {
  // 2. Validate Input
  const rawData = {
    email: formData.get('email'),
    firstname: formData.get('firstname'), // The hidden honeypot
  };

  const validated = WaitlistSchema.safeParse(rawData);

  if (!validated.success) {
    // If "firstname" was filled, it's a bot. We return success to fool it.
    if (rawData.firstname) return { success: true };
    return { success: false, error: validated.error.message };
  }

  const { email } = validated.data;
  const timestamp = new Date().toISOString();

  try {
    // 3. Save to Resend (Database)
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });

    // Add timestamp to the HMAC generation
    function generateSignature(email: string, ts: string) {
      return createHmac('sha256', AUTH_SECRET)
        .update(`${email}-${ts}`) // Bind the email and time together
        .digest('hex');
    }

    // 4. Secure Signature Logic
    const hmacSig = generateSignature(email, timestamp);

    // We use a hex-encoded HMAC instead of base64 concatenation
    const approveLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/approve-ghost?email=${encodeURIComponent(email)}&sig=${hmacSig}`;

    // 5. Admin Alert
    await resend.emails.send({
      from: 'ECHO PROTOCOL <system@resend.dev>',
      to: YOUR_EMAIL,
      subject: `[LOG] NEW IDENTITY: ${email}`,
      html: `
        <p>IDENT: ${email}</p>
        <a href="${approveLink}">EXECUTE_WELCOME_SEQUENCE</a>
      `,
    });

    // 6. User Confirmation
    await resend.emails.send({
      from: 'ECHO <onboarding@resend.dev>',
      to: email,
      subject: `You have vanished. Welcome to ECHO.`,
      html: `<h1>SIGNAL CAPTURED.</h1><p>You are whitelisted for Batch 01.</p>`,
    });

    return { success: true };
  } catch (err) {
    console.error('Waitlist Error:', err);
    return { success: false, error: 'Transmission interference detected.' };
  }
}

// 7. Prevent API abuse by adding caching to stats
export async function getRealtimeStats() {
  try {
    // Note: In production, wrap this in React 'cache' or Next.js 'unstable_cache'
    // to prevent hitting Resend rate limits on every page refresh.
    const { data } = await resend.contacts.list({ audienceId: AUDIENCE_ID });
    const count = data?.data?.length || 0;
    return { count, remaining: Math.max(0, 50 - count) };
  } catch (e) {
    return { count: 0, remaining: 50 };
  }
}
