import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createHmac } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUTH_SECRET = process.env.AUTH_SECRET!;

export async function GET(req: NextRequest) {
  const { searchParams, pathname } = new URL(req.url);

  // 1. Prevent double-triggering from browser asset requests
  if (pathname.includes('favicon.ico')) {
    return new NextResponse(null, { status: 204 });
  }

  const email = searchParams.get('email');
  const sig = searchParams.get('sig');
  const ts = searchParams.get('ts'); // The timestamp from the link

  if (!email || !sig || !ts) {
    return new NextResponse('Error: Missing Protocol Data', { status: 400 });
  }

  // 2. Security: Verify HMAC Signature
  // The signature must match the one generated in your Server Action
  const expectedSig = createHmac('sha256', AUTH_SECRET)
    .update(`${email}-${ts}`)
    .digest('hex');

  if (sig !== expectedSig) {
    return new NextResponse('Unauthorized: Signature Mismatch', {
      status: 401,
    });
  }

  // 3. Temporal Security: Check if link is expired (24 Hour Window)
  const linkTime = parseInt(ts);
  const currentTime = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (currentTime - linkTime > twentyFourHours) {
    return new NextResponse('Forbidden: Access Link Expired', { status: 403 });
  }

  try {
    const alias = email.split('@')[0].toLowerCase();

    // 4. Execute the side effect: Send the "Welcome to the Void" Email
    await resend.emails.send({
      from: 'ECHO <onboarding@resend.dev>',
      to: email,
      subject: `You're in. The clock starts now.`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="background-color: #0a0a0a; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a; padding: 60px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background-color: #111111; border: 1px solid #222222; border-radius: 12px; overflow: hidden;">
                    <tr>
                      <td style="padding: 40px;">
                        <div style="font-weight: 800; color: #6366f1; font-size: 20px; letter-spacing: 2px; margin-bottom: 30px;">ECHO</div>
                        
                        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 16px 0; line-height: 1.2;">
                          Welcome to the shadows, ${alias}.
                        </h1>
                        
                        <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                          Your identity has been verified. You now have access to a space where words are written in sand. 
                          <strong>Every message, every thread, and every trace of your presence is deleted every 24 hours.</strong>
                        </p>

                        <div style="background-color: #18181b; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding-bottom: 12px;">
                                <span style="color: #6366f1; font-weight: bold; font-size: 13px;">✦ ANONYMOUS</span>
                                <div style="color: #71717a; font-size: 13px;">No profiles. No history.</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 12px;">
                                <span style="color: #6366f1; font-weight: bold; font-size: 13px;">✦ EPHEMERAL</span>
                                <div style="color: #71717a; font-size: 13px;">Total data purge every midnight.</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style="color: #6366f1; font-weight: bold; font-size: 13px;">✦ SECURE</span>
                                <div style="color: #71717a; font-size: 13px;">End-to-end signal encryption.</div>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <p style="color: #ffffff; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">What happens next?</p>
                        <p style="color: #71717a; font-size: 14px; margin: 0 0 32px 0;">
                          We’ll ping you the moment the next chat cycle begins. Get ready to speak your mind and leave nothing behind.
                        </p>

                        <div style="border-top: 1px solid #222222; padding-top: 24px; color: #3f3f46; font-size: 12px; font-style: italic;">
                          "Enjoy the silence." — The ECHO Team
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

    // 5. Success Response (Browser View)
    return new NextResponse(
      `
      <html>
        <body style="background: #000; color: #6366f1; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
          <div style="text-align: left; border-left: 2px solid #6366f1; padding-left: 20px;">
            <p style="margin: 5px 0;">> IDENTITY_VERIFIED</p>
            <p style="margin: 5px 0;">> PURGE_PROTOCOL_SYNCED</p>
            <p style="margin: 5px 0; color: white;">> WELCOME_TO_THE_VOID, ${alias.toUpperCase()}.</p>
            <p style="margin: 20px 0 0 0; font-size: 12px; color: #3f3f46;">[Check your inbox for the entry key]</p>
          </div>
        </body>
      </html>
    `,
      { headers: { 'Content-Type': 'text/html' } },
    );
  } catch (error) {
    console.error('Approval Error:', error);
    return new NextResponse('Transmission Failed', { status: 500 });
  }
}
