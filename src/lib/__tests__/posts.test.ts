import { describe, expect, it } from 'vitest';
import { parsePost, sortByPublishedAtDesc, getAllPosts, getPostBySlug, extractBodyText } from '../posts';
import { countWords, readingTimeMinutes } from '../reading-time';

const validBase = {
  title: 'A reasonable title',
  slug: 'a-reasonable-slug',
  excerpt: 'This is a sufficiently long excerpt that meets the minimum forty character requirement for posts.',
  pillar: 'founder-stories',
  publishedAt: '2026-05-18',
};

describe('parsePost (frontmatter schema)', () => {
  it('rejects missing title', () => {
    const { title: _, ...rest } = validBase;
    expect(() => parsePost(rest)).toThrow();
  });

  it('rejects missing slug', () => {
    const { slug: _, ...rest } = validBase;
    expect(() => parsePost(rest)).toThrow();
  });

  it('rejects malformed slug (uppercase)', () => {
    expect(() => parsePost({ ...validBase, slug: 'BadSlug' })).toThrow();
  });

  it('rejects malformed slug (underscore)', () => {
    expect(() => parsePost({ ...validBase, slug: 'bad_slug' })).toThrow();
  });

  it('rejects too-short excerpt (<40 chars)', () => {
    expect(() => parsePost({ ...validBase, excerpt: 'too short' })).toThrow();
  });

  it('rejects invalid pillar', () => {
    expect(() => parsePost({ ...validBase, pillar: 'not-a-pillar' })).toThrow();
  });

  it('rejects invalid publishedAt format', () => {
    expect(() => parsePost({ ...validBase, publishedAt: 'not-a-date' })).toThrow();
  });

  it('rejects dangling relatedResource', () => {
    expect(() =>
      parsePost({ ...validBase, relatedResource: 'this-resource-does-not-exist' })
    ).toThrow();
  });

  it('accepts minimal valid frontmatter', () => {
    expect(() => parsePost(validBase)).not.toThrow();
  });

  it('defaults draft to false and authorName to "Altan Doyran"', () => {
    const parsed = parsePost(validBase);
    expect(parsed.draft).toBe(false);
    expect(parsed.authorName).toBe('Altan Doyran');
  });
});

describe('sortByPublishedAtDesc', () => {
  it('sorts dates in descending order', () => {
    const input = [
      { publishedAt: '2026-01-01', id: 'a' },
      { publishedAt: '2026-03-15', id: 'b' },
      { publishedAt: '2025-12-31', id: 'c' },
    ];
    const sorted = sortByPublishedAtDesc(input);
    expect(sorted.map((x) => x.id)).toEqual(['b', 'a', 'c']);
  });
});

describe('integration: real MDX glob', () => {
  it('loads the hello-world stub post', () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(1);
    const stub = posts.find((p) => p.slug === 'hello-world');
    expect(stub).toBeDefined();
    expect(stub?.title).toContain('Hello, world');
    expect(stub?.pillar).toBe('founder-stories');
    expect(stub?.relatedResource).toBe('saas-validation-toolkit');
  });

  it('computes wordCount > 50 and readingTime >= 1 from the raw MDX body', () => {
    const post = getPostBySlug('hello-world');
    expect(post).toBeDefined();
    expect(post!.wordCount).toBeGreaterThan(50);
    expect(post!.readingTime).toBeGreaterThanOrEqual(1);
  });
});

describe('extractBodyText helper', () => {
  it('strips YAML frontmatter', () => {
    const fixture = '---\nfoo: bar\n---\nactual body words here';
    const text = extractBodyText(fixture);
    expect(text).toContain('actual body words here');
    expect(text).not.toContain('foo: bar');
  });

  it('strips JSX tags so the words inside callouts still count', () => {
    const fixture = '<Callout>Hello world</Callout>';
    const text = extractBodyText(fixture);
    expect(countWords(text)).toBe(2);
  });

  it('strips top-level import lines', () => {
    const fixture = "import X from 'y';\nReal content here";
    const text = extractBodyText(fixture);
    expect(text.trim()).toBe('Real content here');
  });

  it('handles empty input as empty string', () => {
    expect(extractBodyText('')).toBe('');
    expect(countWords('')).toBe(0);
    expect(readingTimeMinutes('')).toBeGreaterThanOrEqual(1);
  });
});
