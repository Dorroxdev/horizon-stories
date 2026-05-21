interface Env {
  BEEHIIV_API_KEY: string;
  BEEHIIV_PUBLICATION_ID: string;
}

interface SubscribeRequest {
  email: string;
  source?: string;
}

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { BEEHIIV_API_KEY, BEEHIIV_PUBLICATION_ID } = context.env;

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    return jsonResponse({ error: 'Server configuration error' }, 500);
  }

  const pubId = BEEHIIV_PUBLICATION_ID.startsWith('pub_')
    ? BEEHIIV_PUBLICATION_ID
    : `pub_${BEEHIIV_PUBLICATION_ID}`;

  let body: SubscribeRequest;
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400);
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: 'Please enter a valid email address' }, 400);
  }

  const source =
    typeof body.source === 'string' && body.source.length > 0
      ? body.source.slice(0, 100)
      : undefined;

  const beehiivBody: Record<string, unknown> = {
    email,
    reactivate_existing: true,
    send_welcome_email: true,
  };
  if (source) {
    beehiivBody.utm_source = source;
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(beehiivBody),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(`Beehiiv API error ${res.status}: ${text}`);
      return jsonResponse({ error: 'Subscription service unavailable' }, 502);
    }

    return jsonResponse({ success: true }, 200);
  } catch (err) {
    console.error('Beehiiv request failed:', err);
    return jsonResponse({ error: 'Failed to process subscription' }, 500);
  }
};
