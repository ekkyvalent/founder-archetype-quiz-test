import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, archetype, source } = await req.json();

  if (!email || !archetype) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const errors: string[] = [];

  // ── HubSpot ────────────────────────────────────────────────
  const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
  const FORM_ID = process.env.HUBSPOT_FORM_ID;

  if (PORTAL_ID && FORM_ID) {
    try {
      const hsRes = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'email', value: email },
              { name: 'quiz_archetype', value: archetype },
              { name: 'lead_source', value: source ?? 'founder-quiz' },
            ],
            context: {
              pageUri: 'https://aspireapp.com/founder-archetype-quiz/quiz',
              pageName: 'Aspire Founder Archetype Quiz',
            },
          }),
        }
      );

      if (!hsRes.ok) {
        const body = await hsRes.text();
        errors.push(`HubSpot error: ${hsRes.status} ${body}`);
      }
    } catch (e) {
      errors.push(`HubSpot exception: ${String(e)}`);
    }
  }

  // ── Customer.io ────────────────────────────────────────────
  const CIO_SITE_ID = process.env.CIO_SITE_ID;
  const CIO_API_KEY = process.env.CIO_API_KEY;

  if (CIO_SITE_ID && CIO_API_KEY) {
    try {
      const credentials = Buffer.from(`${CIO_SITE_ID}:${CIO_API_KEY}`).toString('base64');

      const cioRes = await fetch('https://track.customer.io/api/v1/identify', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: email,
          email,
          quiz_archetype: archetype,
          quiz_lead_source: source ?? 'founder-quiz',
          quiz_completed_at: Math.floor(Date.now() / 1000), // CIO uses Unix timestamp
        }),
      });

      if (!cioRes.ok) {
        const body = await cioRes.text();
        errors.push(`Customer.io error: ${cioRes.status} ${body}`);
      }
    } catch (e) {
      errors.push(`Customer.io exception: ${String(e)}`);
    }
  }

  // Return success even if integrations had issues —
  // we do not want a CRM error to block the user from seeing their results.
  if (errors.length > 0) {
    console.error('[submit-lead] Integration errors:', errors);
  }

  return NextResponse.json({ success: true, errors: errors.length > 0 ? errors : undefined });
}
