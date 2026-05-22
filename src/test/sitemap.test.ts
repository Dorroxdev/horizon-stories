import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { generateSitemap, SITE } from '../../scripts/generate-sitemap';

const TODAY = '2026-05-19';

function makeTmpPostsDir(files: Record<string, string>): string {
  const dir = resolve(tmpdir(), `horizon-sitemap-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  mkdirSync(dir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(resolve(dir, name), content, 'utf-8');
  }
  return dir;
}

describe('generate-sitemap — generateSitemap() pure function (Task 2)', () => {
  let dir: string;
  beforeAll(() => {
    dir = makeTmpPostsDir({
      'real-post.mdx': `---
slug: "real-post"
title: "A real post"
excerpt: "An excerpt that is more than forty characters in length, which the schema requires."
pillar: "founder-stories"
publishedAt: "2026-05-10"
updatedAt: "2026-05-15"
draft: false
---

Body.
`,
      'draft-post.mdx': `---
slug: "draft-post"
title: "Should be excluded"
excerpt: "An excerpt that is more than forty characters in length, which the schema requires."
pillar: "ai-strategy"
publishedAt: "2026-05-11"
draft: true
---

Body.
`,
    });
  });

  afterAll(() => {
    try { rmSync(dir, { recursive: true, force: true }); } catch { /* noop */ }
  });

  it('emits static + resource + post URLs (1 home + 1 posts + 1 resources + 1 resource + 1 post = 5)', () => {
    const { urls } = generateSitemap({ postsDir: dir, today: TODAY });
    expect(urls.length).toBe(5);
    const locs = urls.map((u) => u.loc);
    expect(locs).toContain(`${SITE}/`);
    expect(locs).toContain(`${SITE}/posts`);
    expect(locs).toContain(`${SITE}/resources`);
    expect(locs).toContain(`${SITE}/resources/saas-validation-toolkit`);
    expect(locs).toContain(`${SITE}/posts/real-post`);
  });

  it('filters drafts: draft-post is NOT in URLs or manifest', () => {
    const { urls, manifest } = generateSitemap({ postsDir: dir, today: TODAY });
    expect(urls.some((u) => u.loc.includes('draft-post'))).toBe(false);
    expect(manifest.some((m) => m.slug === 'draft-post')).toBe(false);
  });

  it('sets home priority 1.0 / changefreq weekly', () => {
    const { urls } = generateSitemap({ postsDir: dir, today: TODAY });
    const home = urls.find((u) => u.loc === `${SITE}/`);
    expect(home?.priority).toBe('1.0');
    expect(home?.changefreq).toBe('weekly');
  });

  it('sets /posts priority 0.9 / changefreq daily', () => {
    const { urls } = generateSitemap({ postsDir: dir, today: TODAY });
    const posts = urls.find((u) => u.loc === `${SITE}/posts`);
    expect(posts?.priority).toBe('0.9');
    expect(posts?.changefreq).toBe('daily');
  });

  it('sets /resources priority 0.8 / changefreq monthly', () => {
    const { urls } = generateSitemap({ postsDir: dir, today: TODAY });
    const r = urls.find((u) => u.loc === `${SITE}/resources`);
    expect(r?.priority).toBe('0.8');
    expect(r?.changefreq).toBe('monthly');
  });

  it('sets individual post priority 0.7 / changefreq monthly', () => {
    const { urls } = generateSitemap({ postsDir: dir, today: TODAY });
    const post = urls.find((u) => u.loc === `${SITE}/posts/real-post`);
    expect(post?.priority).toBe('0.7');
    expect(post?.changefreq).toBe('monthly');
  });

  it('uses updatedAt as lastmod when present, publishedAt otherwise', () => {
    const { urls } = generateSitemap({ postsDir: dir, today: TODAY });
    const post = urls.find((u) => u.loc === `${SITE}/posts/real-post`);
    expect(post?.lastmod).toBe('2026-05-15');
  });

  it('contains no ?pillar= filter URLs', () => {
    const { urls, xml } = generateSitemap({ postsDir: dir, today: TODAY });
    expect(urls.every((u) => !u.loc.includes('?pillar='))).toBe(true);
    expect(xml).not.toMatch(/\?pillar=/);
  });

  it('contains no /thank-you URLs', () => {
    const { urls, xml } = generateSitemap({ postsDir: dir, today: TODAY });
    expect(urls.every((u) => !u.loc.includes('/thank-you'))).toBe(true);
    expect(xml).not.toMatch(/\/thank-you/);
  });

  it('produces XML with urlset element and proper xmlns', () => {
    const { xml } = generateSitemap({ postsDir: dir, today: TODAY });
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('</urlset>');
  });

  it('manifest entries have correct shape (slug, title, excerpt, publishedAt, pillar, pillarLabel)', () => {
    const { manifest } = generateSitemap({ postsDir: dir, today: TODAY });
    expect(manifest.length).toBe(1);
    const entry = manifest[0];
    expect(entry.slug).toBe('real-post');
    expect(entry.title).toBe('A real post');
    expect(entry.excerpt).toContain('excerpt');
    expect(entry.publishedAt).toBe('2026-05-10');
    expect(entry.updatedAt).toBe('2026-05-15');
    expect(entry.pillar).toBe('founder-stories');
    expect(entry.pillarLabel).toBe('Founder Stories');
  });

  it('omits updatedAt key when post has no updatedAt frontmatter', () => {
    const dir2 = makeTmpPostsDir({
      'no-update.mdx': `---
slug: "no-update"
title: "No update"
excerpt: "An excerpt that is more than forty characters in length, which the schema requires."
pillar: "ai-strategy"
publishedAt: "2026-05-01"
draft: false
---

Body.
`,
    });
    try {
      const { manifest } = generateSitemap({ postsDir: dir2, today: TODAY });
      expect(manifest.length).toBe(1);
      expect('updatedAt' in manifest[0]).toBe(false);
    } finally {
      rmSync(dir2, { recursive: true, force: true });
    }
  });

  it('em-dash sweep: sitemap XML contains no U+2014 in static/resource chrome', () => {
    const { xml } = generateSitemap({ postsDir: dir, today: TODAY });
    // Static URL section + resource URL section should be em-dash free.
    // (Post titles in manifest may contain em dashes from MDX bodies — that
    // surfaces via RSS, not sitemap; sitemap contains only URLs + dates.)
    const lines = xml.split('\n');
    for (const line of lines) {
      expect(line).not.toContain('—');
    }
  });

  it('uses today as lastmod for static URLs', () => {
    const { urls } = generateSitemap({ postsDir: dir, today: TODAY });
    const home = urls.find((u) => u.loc === `${SITE}/`);
    const postsLoc = urls.find((u) => u.loc === `${SITE}/posts`);
    expect(home?.lastmod).toBe(TODAY);
    expect(postsLoc?.lastmod).toBe(TODAY);
  });
});
