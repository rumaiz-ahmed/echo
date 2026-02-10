import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const sig = searchParams.get('sig');

  // Basic security check: verify the signature matches
  const expectedSig = Buffer.from(
    `${email}-${process.env.RESEND_API_KEY}`,
  ).toString('base64');

  if (sig !== expectedSig || !email) {
    return new NextResponse('Unauthorized: Signal Corrupted', { status: 401 });
  }

  try {
    await resend.emails.send({
      from: 'ECHO <onboarding@resend.dev>',
      to: email,
      subject: `The shadows have opened. Welcome to ECHO.`,
      html: `
        <div style="background: black; color: white; padding: 50px; font-family: sans-serif;">
          <h1>ACCESS GRANTED.</h1>
          <p>Your identity has been verified by the Protocol. You are now live.</p>
        </div>
      `,
    });

    // Return a "Success" page that looks like a terminal
    return new NextResponse(
      `
      <html>
        <body style="background: #000; color: #6366f1; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh;">
          <div>
            <p>> VALIDATING_SIGNATURE... [OK]</p>
            <p>> SENDING_WELCOME_PACKET... [DONE]</p>
            <p>> GHOST_${email}_ACTIVATED.</p>
          </div>
        </body>
      </html>
    `,
      { headers: { 'Content-Type': 'text/html' } },
    );
  } catch (error) {
    return new NextResponse('Transmission Failed', { status: 500 });
  }
}
