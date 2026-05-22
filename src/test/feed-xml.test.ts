import { describe, it, expect } from 'vitest';
import { onRequestGet } from '../../functions/feed.xml';

interface Env {
  [key: string]: unknown;
}

interface MockContext {
  env: Env;
  request: Request;
}

function makeContext(): MockContext {
  return {
    env: {},
    request: new Request('https://horizonlaunchpad.com/feed.xml'),
  };
}

describe('functions/feed.xml — onRequestGet (Task 2)', () => {
  it('returns HTTP 200', async () => {
    const res = await onRequestGet(
      makeContext() as Parameters<typeof onRequestGet>[0],
    );
    expect(res.status).toBe(200);
  });

  it('sets Content-Type to application/rss+xml; charset=utf-8', async () => {
    const res = await onRequestGet(
      makeContext() as Parameters<typeof onRequestGet>[0],
    );
    expect(res.headers.get('Content-Type')).toBe(
      'application/rss+xml; charset=utf-8',
    );
  });

  it('sets Cache-Control to public, max-age=300', async () => {
    const res = await onRequestGet(
      makeContext() as Parameters<typeof onRequestGet>[0],
    );
    expect(res.headers.get('Cache-Control')).toBe('public, max-age=300');
  });

  it('body contains valid RSS 2.0 envelope', async () => {
    const res = await onRequestGet(
      makeContext() as Parameters<typeof onRequestGet>[0],
    );
    const body = await res.text();
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(body).toContain('<rss version="2.0"');
    expect(body).toContain('<channel>');
    expect(body).toContain('</channel>');
    expect(body).toContain('</rss>');
  });

  it('body contains channel title "Horizon Launchpad" and self link', async () => {
    const res = await onRequestGet(
      makeContext() as Parameters<typeof onRequestGet>[0],
    );
    const body = await res.text();
    expect(body).toContain('<title>Horizon Launchpad</title>');
    expect(body).toContain('<link>https://horizonlaunchpad.com</link>');
    expect(body).toContain(
      '<atom:link href="https://horizonlaunchpad.com/feed.xml" rel="self" type="application/rss+xml" />',
    );
  });

  it('body contains valid <item> structure when manifest has items', async () => {
    // When POSTS_HIDDEN is true (site-flags.ts), the on-disk manifest is empty
    // and the feed has no <item> elements. The item-structure assertions only
    // apply when posts are visible. The count-matches-manifest test below
    // covers the empty case rigorously.
    const manifest = (
      await import('../../functions/_posts-manifest.json')
    ).default as Array<{ slug: string }>;
    const res = await onRequestGet(
      makeContext() as Parameters<typeof onRequestGet>[0],
    );
    const body = await res.text();
    const itemMatches = body.match(/<item>/g) ?? [];
    expect(itemMatches.length).toBe(manifest.length);
    if (manifest.length > 0) {
      expect(body).toMatch(/<item>[\s\S]*<title>[\s\S]*<\/title>[\s\S]*<\/item>/);
      expect(body).toMatch(/<link>https:\/\/horizonlaunchpad\.com\/posts\//);
      expect(body).toMatch(/<guid isPermaLink="true">/);
      expect(body).toMatch(/<pubDate>/);
      expect(body).toMatch(/<category>/);
      expect(body).toMatch(/<description>/);
    }
  });

  it('escapes XML special characters in titles (smoke check via &amp;)', async () => {
    // We can't easily mutate the manifest at runtime since it's imported,
    // but we can assert that the escape function is wired by checking that
    // no raw "&" appears outside known-safe entity references.
    const res = await onRequestGet(
      makeContext() as Parameters<typeof onRequestGet>[0],
    );
    const body = await res.text();
    // Find all & in the body and ensure each is part of an entity.
    const matches = body.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g);
    expect(matches).toBeNull();
  });

  it('item count equals non-draft posts in committed manifest', async () => {
    // Pull current manifest via dynamic import to avoid coupling test count.
    const manifest = (await import('../../functions/_posts-manifest.json'))
      .default as Array<{ slug: string }>;
    const res = await onRequestGet(
      makeContext() as Parameters<typeof onRequestGet>[0],
    );
    const body = await res.text();
    const itemMatches = body.match(/<item>/g) ?? [];
    expect(itemMatches.length).toBe(manifest.length);
  });
});
