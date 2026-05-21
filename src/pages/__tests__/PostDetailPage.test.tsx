import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostDetailPage from '../PostDetailPage';
import * as postsLib from '@/lib/posts';

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

function renderAt(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/posts/:slug" element={<PostDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PostDetailPage — valid post', () => {
  it('renders the post title, pillar badge, back link to /posts?pillar=, and prose article', () => {
    renderAt('/posts/hello-world');
    // Title (we use partial because the title contains an em dash in author content)
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toContain('Hello, world');
    expect(h1.className).toContain('font-display');
    expect(h1.className).toContain('font-bold');
    // Pillar badge for founder-stories renders the label
    expect(screen.getByText('Founder Stories')).toBeInTheDocument();
    // Back link uses pillar query (DEC-HL-009)
    const backLink = screen.getByRole('link', { name: /Back to Founder Stories/i });
    expect(backLink.getAttribute('href')).toBe('/posts?pillar=founder-stories');
    // Prose article container
    const article = document.querySelector('article');
    expect(article).not.toBeNull();
    expect(article!.className).toContain('prose');
    expect(article!.className).toContain('prose-invert');
    expect(article!.className).toContain('prose-lg');
    expect(article!.className).toContain('max-w-none');
  });

  it('renders ReadingTime in meta row with the post readingTime value', () => {
    renderAt('/posts/hello-world');
    expect(screen.getByText(/min read/i)).toBeInTheDocument();
  });

  it('renders a <time dateTime> matching the post publishedAt', () => {
    renderAt('/posts/hello-world');
    const time = document.querySelector('time');
    expect(time).not.toBeNull();
    expect(time!.getAttribute('datetime')).toBe('2026-05-18');
    // Format: "May 18, 2026"
    expect(time!.textContent).toMatch(/May 18, 2026/);
  });

  it('renders ShareButtons with the production absolute URL', () => {
    renderAt('/posts/hello-world');
    const twitter = screen.getByRole('link', { name: 'Share on Twitter' });
    const href = twitter.getAttribute('href') ?? '';
    expect(href).toContain('url=');
    expect(href).toContain(encodeURIComponent('https://horizonlaunchpad.com/posts/hello-world'));
  });

  it('renders the full AuthorBio at the bottom (border-t wrapper, w-16 avatar)', () => {
    const { container } = renderAt('/posts/hello-world');
    const fullBio = container.querySelector('div.border-t.border-border.pt-8.mt-12');
    expect(fullBio).not.toBeNull();
    const img = fullBio!.querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.className).toContain('w-16');
    expect(img!.className).toContain('h-16');
  });

  it('outermost wrapper has bg-background min-h-screen', () => {
    const { container } = renderAt('/posts/hello-world');
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('bg-background');
    expect(root.className).toContain('min-h-screen');
  });

  it('renders all three Callout variants from the MDX body via MDXProvider injection', () => {
    const { container } = renderAt('/posts/hello-world');
    const notes = container.querySelectorAll('[role="note"]');
    expect(notes.length).toBe(3);
    const classes = Array.from(notes).map((n) => (n as HTMLElement).className);
    expect(classes.some((c) => c.includes('border-primary/40'))).toBe(true);
    expect(classes.some((c) => c.includes('border-destructive/40'))).toBe(true);
    expect(classes.some((c) => c.includes('border-nessie/40'))).toBe(true);
  });

  it('has no em dashes in the page chrome (back link, footer "Back to all posts")', () => {
    const { container } = renderAt('/posts/hello-world');
    // Hero back link: "Back to {pillar}"
    const backLink = screen.getByRole('link', { name: /Back to Founder Stories/i });
    expect(backLink.textContent ?? '').not.toMatch(/—/);
    // Footer back-to-all-posts link
    const footerBack = screen.getByRole('link', { name: /Back to all posts/i });
    expect(footerBack.textContent ?? '').not.toMatch(/—/);
    // Hero meta row separator chars are middle dots, not em dashes
    const middleDots = container.querySelectorAll('span[aria-hidden="true"]');
    Array.from(middleDots).forEach((dot) => {
      expect((dot.textContent ?? '').includes('—')).toBe(false);
    });
  });
});

describe('PostDetailPage — not-found / fallback states', () => {
  it('renders "Post not found" for an unknown slug', () => {
    renderAt('/posts/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: 'Post not found' })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Back to all posts' });
    expect(link.getAttribute('href')).toBe('/posts');
    expect(document.querySelector('article')).toBeNull();
  });

  it('renders "Post not found" for a draft post (per AMB-3)', () => {
    const realPost = postsLib.getPostBySlug('hello-world');
    expect(realPost).toBeDefined();
    vi.spyOn(postsLib, 'getPostBySlug').mockReturnValue({ ...realPost!, draft: true });
    renderAt('/posts/hello-world');
    expect(screen.getByRole('heading', { level: 1, name: 'Post not found' })).toBeInTheDocument();
    expect(document.querySelector('article')).toBeNull();
  });

  it('back-link label falls back to "all posts" when pillar is unknown (defensive)', () => {
    const realPost = postsLib.getPostBySlug('hello-world');
    expect(realPost).toBeDefined();
    vi.spyOn(postsLib, 'getPostBySlug').mockReturnValue({
      ...realPost!,
      pillar: 'mystery-pillar-that-does-not-exist' as unknown as typeof realPost.pillar,
    });
    renderAt('/posts/hello-world');
    const backLinks = screen.getAllByRole('link', { name: /Back to all posts/i });
    // Both hero AND footer should now read "Back to all posts" and point to /posts
    expect(backLinks.length).toBeGreaterThanOrEqual(2);
    expect(backLinks[0].getAttribute('href')).toBe('/posts');
  });
});
