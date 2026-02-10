'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;
const YOUR_EMAIL = process.env.ALERT_EMAIL!;

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return text.replaceAll(/[&<>"']/g, (char) => map[char]);
}

export async function handleWaitlist(formData: FormData) {
  const email = escapeHtml(formData.get('email') as string);
  const timestamp = new Date().toISOString();

  if (!email || !email.includes('@')) {
    return { success: false, error: 'Invalid frequency.' };
  }

  try {
    // 1. Save to Database
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });

    const secretHmac = Buffer.from(
      `${email}-${process.env.RESEND_API_KEY}`,
    ).toString('base64');
    const approveLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/approve-ghost?email=${encodeURIComponent(email)}&sig=${secretHmac}`;

    await resend.emails.send({
      from: 'ECHO PROTOCOL <system@resend.dev>',
      to: YOUR_EMAIL,
      subject: `[LOG] NEW IDENTITY DETECTED: ${email}`,
      html: `
    <div style="background-color: #050505; color: #a1a1aa; padding: 40px; font-family: 'Courier New', Courier, monospace; line-height: 1.6;">
      <div style="border-left: 2px solid #6366f1; padding-left: 20px;">
        <h1 style="color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 30px;">> System.Log: New_Ghost_Added</h1>
        <p style="margin: 0;">IDENT: <span style="color: #6366f1;">${email}</span></p>
        <p style="margin: 0;">TIME: ${timestamp}</p>
        <p style="margin: 0;">LEGAL: Protocol_Accepted_v1.0</p>
        <p style="margin: 0; margin-bottom: 30px;">STATUS: Awaiting_Manual_Override</p>
        
        <a href="${approveLink}" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; font-size: 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.1em;">
          EXECUTE_WELCOME_SEQUENCE
        </a>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1f1f23; color: #3f3f46; font-size: 11px;">
          CAUTION: Clicking above triggers an immediate external transmission.
        </div>
      </div>
    </div>
  `,
    });

    // 3. CONFIRMATION (For User) - "The Ghost Card"
    await resend.emails.send({
      from: 'ECHO <onboarding@resend.dev>',
      to: email,
      subject: `You have vanished. Welcome to ECHO.`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="background-color: #000000; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000;">
              <tr>
                <td align="center" style="padding: 60px 20px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; border: 1px solid #1f1f23; background-color: #09090b;">
                    <tr>
                      <td style="padding: 50px;">
                        <div style="width: 40px; height: 40px; background-color: #6366f1; border-radius: 10px; margin-bottom: 40px;"></div>
                        <h1 style="color: #ffffff; font-family: sans-serif; font-size: 40px; font-weight: 900; letter-spacing: -0.05em; line-height: 0.9; text-transform: uppercase; font-style: italic; margin: 0 0 20px 0;">
                          SIGNAL<br/>CAPTURED.
                        </h1>
                        <p style="color: #a1a1aa; font-family: sans-serif; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                          You have been whitelisted for **Batch 01**. Your digital presence is now scheduled for daily midnight erasure.
                        </p>
                        
                        <div style="background-color: #18181b; padding: 25px; border-radius: 4px; margin-bottom: 30px;">
                          <h2 style="color: #ffffff; font-family: sans-serif; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 15px 0;">Protocol Status</h2>
                          <ul style="color: #71717a; font-family: sans-serif; font-size: 13px; padding-left: 18px; margin: 0;">
                            <li style="margin-bottom: 8px;">Founding Lifetime Badge: <span style="color: #6366f1;">Active</span></li>
                            <li style="margin-bottom: 8px;">Midnight Data Purge: <span style="color: #6366f1;">Enabled</span></li>
                            <li style="margin-bottom: 0;">Identity Shielding: <span style="color: #6366f1;">Verified</span></li>
                          </ul>
                        </div>

                        <p style="color: #3f3f46; font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; margin: 0;">
                          See you in the shadows.
                        </p>
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1f1f23;">
                           <p style="color: #27272a; font-family: sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">
                            © 2026 ECHO SYSTEMS // NO HISTORY // NO REGRETS
                           </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error('Waitlist Submission Error:', err);
    return { success: false, error: 'The signal failed. Try again.' };
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
