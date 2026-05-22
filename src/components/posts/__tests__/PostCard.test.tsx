import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostCard } from '../PostCard';
import type { Post } from '@/lib/posts';

function makePost(overrides: Partial<Post> = {}): Post {
  const base: Post = {
    title: 'Hello World',
    slug: 'hello-world',
    excerpt: 'Test excerpt body content for the post card render',
    pillar: 'founder-stories',
    publishedAt: '2026-05-18',
    draft: false,
    authorName: 'Altan Doyran',
    readingTime: 4,
    wordCount: 100,
    // body and filePath are not used in render assertions
    body: (() => null) as unknown as Post['body'],
    filePath: '/src/content/posts/hello-world.mdx',
  };
  return { ...base, ...overrides };
}

function renderCard(post: Post = makePost()) {
  return render(
    <MemoryRouter>
      <PostCard post={post} />
    </MemoryRouter>,
  );
}

describe('PostCard', () => {
  it('renders the pillar badge label', () => {
    renderCard();
    expect(screen.getByText('Founder Stories')).toBeInTheDocument();
  });

  it('renders <time> with dateTime attribute equal to publishedAt', () => {
    renderCard(makePost({ publishedAt: '2026-05-18' }));
    const time = document.querySelector('time');
    expect(time).not.toBeNull();
    expect(time?.getAttribute('dateTime')).toBe('2026-05-18');
  });

  it('renders the formatted date in en-US Month D, YYYY form', () => {
    renderCard(makePost({ publishedAt: '2026-05-18' }));
    expect(screen.getByText('May 18, 2026')).toBeInTheDocument();
  });

  it('renders reading time text "N min read"', () => {
    renderCard(makePost({ readingTime: 7 }));
    expect(screen.getByText('7 min read')).toBeInTheDocument();
  });

  it('renders an aria-hidden middle-dot separator (·)', () => {
    renderCard();
    const dot = screen.getByText('·');
    expect(dot).toBeInTheDocument();
    expect(dot.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders an h3 wrapping a <Link> to /posts/{slug}', () => {
    renderCard(makePost({ title: 'Hello World', slug: 'hello-world' }));
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.textContent).toBe('Hello World');
    expect(heading.className).toContain('font-display');
    expect(heading.className).toContain('font-bold');
    expect(heading.className).toContain('text-2xl');
    expect(heading.className).toContain('lg:text-3xl');
    expect(heading.className).toContain('leading-tight');
    const link = within(heading).getByRole('link', { name: 'Hello World' });
    expect(link.getAttribute('href')).toBe('/posts/hello-world');
  });

  it('renders excerpt paragraph with expected classes', () => {
    renderCard(makePost({ excerpt: 'A unique excerpt string here for grep' }));
    const p = screen.getByText('A unique excerpt string here for grep');
    expect(p.tagName).toBe('P');
    expect(p.className).toContain('text-muted-foreground');
    expect(p.className).toContain('text-base');
    expect(p.className).toContain('lg:text-lg');
    expect(p.className).toContain('leading-relaxed');
    expect(p.className).toContain('mt-3');
    expect(p.className).toContain('max-w-3xl');
  });

  it('renders "Read more" link with ArrowRight icon SVG to /posts/{slug}', () => {
    renderCard(makePost({ slug: 'hello-world' }));
    const link = screen.getByRole('link', { name: /Read more/i });
    expect(link.getAttribute('href')).toBe('/posts/hello-world');
    expect(link.className).toContain('text-primary');
    expect(link.className).toContain('hover:underline');
    expect(link.className).toContain('text-sm');
    expect(link.className).toContain('mt-4');
    expect(link.className).toContain('inline-flex');
    expect(link.className).toContain('items-center');
    expect(link.className).toContain('gap-1');
    // ArrowRight from lucide-react renders an <svg>
    const svg = link.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('wraps content in a motion.article with proper border/spacing classes', () => {
    renderCard();
    const article = document.querySelector('article');
    expect(article).not.toBeNull();
    const cls = article!.className;
    expect(cls).toContain('border-b');
    expect(cls).toContain('border-border');
    expect(cls).toContain('pb-10');
    expect(cls).toContain('mb-10');
    expect(cls).toContain('last:border-b-0');
    expect(cls).toContain('last:pb-0');
    expect(cls).toContain('last:mb-0');
  });

  it('renders correctly when index is omitted (defaults to 0)', () => {
    renderCard(makePost());
    const article = document.querySelector('article');
    expect(article).not.toBeNull();
  });

  it('renders with zero reading time without crashing', () => {
    renderCard(makePost({ readingTime: 0 }));
    expect(screen.getByText('0 min read')).toBeInTheDocument();
  });
});
