import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { onRequestPost } from '../../functions/api/subscribe';

interface Env {
  BEEHIIV_API_KEY: string;
  BEEHIIV_PUBLICATION_ID: string;
}

interface MockContext {
  env: Env;
  request: Request;
}

function makeContext(body: unknown, env: Partial<Env> = {}): MockContext {
  return {
    env: {
      BEEHIIV_API_KEY: env.BEEHIIV_API_KEY ?? 'test-key',
      BEEHIIV_PUBLICATION_ID: env.BEEHIIV_PUBLICATION_ID ?? 'pub_test',
    },
    request: new Request('https://example.com/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  };
}

let originalFetch: typeof globalThis.fetch;
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  originalFetch = globalThis.fetch;
  fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    text: async () => '{"data":{"id":"sub_xxx"}}',
  });
  globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

function lastBeehiivBody(): Record<string, unknown> {
  const call = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
  expect(call).toBeDefined();
  const init = call?.[1] as RequestInit | undefined;
  expect(init?.body).toBeDefined();
  return JSON.parse(init!.body as string) as Record<string, unknown>;
}

describe('subscribe.ts onRequestPost — source/utm_source forwarding (AC-1b)', () => {
  it('forwards source as Beehiiv utm_source when provided', async () => {
    const ctx = makeContext({ email: 'a@b.co', source: 'post-foo' });
    const res = await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);

    expect(res.status).toBe(200);
    const body = lastBeehiivBody();
    expect(body).toEqual({
      email: 'a@b.co',
      reactivate_existing: true,
      send_welcome_email: true,
      utm_source: 'post-foo',
    });
  });

  it('omits utm_source from Beehiiv body when source is absent (legacy callers)', async () => {
    const ctx = makeContext({ email: 'a@b.co' });
    await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);

    const body = lastBeehiivBody();
    expect('utm_source' in body).toBe(false);
    expect(body).toEqual({
      email: 'a@b.co',
      reactivate_existing: true,
      send_welcome_email: true,
    });
  });

  it('preserves reactivate_existing and send_welcome_email regardless of source', async () => {
    const ctxA = makeContext({ email: 'a@b.co' });
    await onRequestPost(ctxA as Parameters<typeof onRequestPost>[0]);
    const bodyA = lastBeehiivBody();
    expect(bodyA.reactivate_existing).toBe(true);
    expect(bodyA.send_welcome_email).toBe(true);

    const ctxB = makeContext({ email: 'a@b.co', source: 'resource-x' });
    await onRequestPost(ctxB as Parameters<typeof onRequestPost>[0]);
    const bodyB = lastBeehiivBody();
    expect(bodyB.reactivate_existing).toBe(true);
    expect(bodyB.send_welcome_email).toBe(true);
  });
});

describe('subscribe.ts — slice(0, 100) cap on source (AC-1c.1–1c.3)', () => {
  it('truncates source longer than 100 chars to exactly 100 chars', async () => {
    const longSource = 'a'.repeat(150);
    const ctx = makeContext({ email: 'a@b.co', source: longSource });
    await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);

    const body = lastBeehiivBody();
    expect(typeof body.utm_source).toBe('string');
    expect((body.utm_source as string).length).toBe(100);
  });

  it('passes through source of exactly 100 chars unchanged', async () => {
    const exact = 'b'.repeat(100);
    const ctx = makeContext({ email: 'a@b.co', source: exact });
    await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);

    const body = lastBeehiivBody();
    expect(body.utm_source).toBe(exact);
    expect((body.utm_source as string).length).toBe(100);
  });

  it('silently truncates without console.warn or console.error', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const longSource = 'c'.repeat(101);
    const ctx = makeContext({ email: 'a@b.co', source: longSource });
    await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);

    expect(warnSpy).not.toHaveBeenCalled();
    expect(errSpy).not.toHaveBeenCalled();
  });
});

describe('subscribe.ts — invalid source types treated as absent (AC-1c.4)', () => {
  it.each([
    ['number', 42],
    ['null', null],
    ['object', { foo: 'bar' }],
    ['array', ['a', 'b']],
    ['boolean', true],
  ])('omits utm_source when source is a %s', async (_label, bad) => {
    const ctx = makeContext({ email: 'a@b.co', source: bad });
    await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);
    const body = lastBeehiivBody();
    expect('utm_source' in body).toBe(false);
  });

  it('omits utm_source when source is empty string (AC-1c.5)', async () => {
    const ctx = makeContext({ email: 'a@b.co', source: '' });
    await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);
    const body = lastBeehiivBody();
    expect('utm_source' in body).toBe(false);
  });
});

describe('subscribe.ts — existing error paths preserved (AC-1b.4)', () => {
  it('returns 500 when env vars missing', async () => {
    const ctx = makeContext({ email: 'a@b.co' }, { BEEHIIV_API_KEY: '', BEEHIIV_PUBLICATION_ID: '' });
    const res = await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);
    expect(res.status).toBe(500);
    const body = await res.json() as Record<string, unknown>;
    expect(body.error).toBe('Server configuration error');
  });

  it('returns 400 for invalid email', async () => {
    const ctx = makeContext({ email: 'not-an-email' });
    const res = await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);
    expect(res.status).toBe(400);
    const body = await res.json() as Record<string, unknown>;
    expect(body.error).toContain('valid email');
  });

  it('returns 400 for invalid JSON body', async () => {
    const ctx = makeContext('{not-json');
    const res = await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);
    expect(res.status).toBe(400);
    const body = await res.json() as Record<string, unknown>;
    expect(body.error).toBe('Invalid request body');
  });

  it('returns 502 when Beehiiv returns non-OK', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => 'internal error',
    });
    const ctx = makeContext({ email: 'a@b.co' });
    const res = await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);
    expect(res.status).toBe(502);
    const body = await res.json() as Record<string, unknown>;
    expect(body.error).toBe('Subscription service unavailable');
    expect(errSpy).toHaveBeenCalled();
  });

  it('returns success on Beehiiv 200 (AC-1b.5)', async () => {
    const ctx = makeContext({ email: 'a@b.co', source: 'resource-x' });
    const res = await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);
    expect(res.status).toBe(200);
    const body = await res.json() as Record<string, unknown>;
    expect(body.success).toBe(true);
  });

  it('preserves CORS headers on every response', async () => {
    const ctx = makeContext({ email: 'a@b.co' });
    const res = await onRequestPost(ctx as Parameters<typeof onRequestPost>[0]);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
  });
});
