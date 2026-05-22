import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PostDetailPage from '../PostDetailPage';
import * as postsLib from '@/lib/posts';

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

function renderAt(url: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/posts/:slug" element={<PostDetailPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
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

describe('PostDetailPage — CTA wiring (plan 02-04)', () => {
  it('renders ResourceCTA when relatedResource is set (AC-3a.1)', () => {
    // hello-world fixture has relatedResource: "saas-validation-toolkit"
    renderAt('/posts/hello-world');
    expect(screen.getByText('Want the toolkit I reference?')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Get free access/i });
    expect(link.getAttribute('href')).toBe('/resources/saas-validation-toolkit');
  });

  it('does NOT render ResourceCTA when relatedResource is undefined (AC-3a.2)', () => {
    const realPost = postsLib.getPostBySlug('hello-world');
    expect(realPost).toBeDefined();
    vi.spyOn(postsLib, 'getPostBySlug').mockReturnValue({
      ...realPost!,
      relatedResource: undefined,
    });
    renderAt('/posts/hello-world');
    expect(screen.queryByText('Want the toolkit I reference?')).toBeNull();
    expect(screen.queryByRole('link', { name: /Get free access/i })).toBeNull();
    // PostSubscribeCTA still renders
    expect(screen.getByText('Get founder stories like this every week.')).toBeInTheDocument();
  });

  it('handles bogus relatedResource slug without crashing (AC-3a.3)', () => {
    const realPost = postsLib.getPostBySlug('hello-world');
    vi.spyOn(postsLib, 'getPostBySlug').mockReturnValue({
      ...realPost!,
      relatedResource: 'bogus-slug-not-in-resources',
    });
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderAt('/posts/hello-world');
    // ResourceCTA returns null silently
    expect(screen.queryByText('Want the toolkit I reference?')).toBeNull();
    // PostSubscribeCTA still renders
    expect(screen.getByText('Get founder stories like this every week.')).toBeInTheDocument();
    const ourErr = err.mock.calls.filter(
      (args) => !String(args[0] ?? '').includes('React Router'),
    );
    expect(ourErr).toHaveLength(0);
  });

  it('renders PostSubscribeCTA exactly once with default copy (AC-3b.1, 3b.3, 3b.5)', () => {
    renderAt('/posts/hello-world');
    const matches = screen.getAllByText('Get founder stories like this every week.');
    expect(matches).toHaveLength(1);
  });

  it('footer DOM order: ResourceCTA → ShareButtons → AuthorBio → PostSubscribeCTA → Back link (AC-3a.4, 3b.4)', () => {
    const { container } = renderAt('/posts/hello-world');
    // Anchor: find ResourceCTA (by tagline text), ShareButtons (twitter link), AuthorBio full block, PostSubscribeCTA (h2 text), Back link
    const resourceCTA = screen.getByText('Want the toolkit I reference?').closest('div');
    const twitterLink = screen.getByRole('link', { name: 'Share on Twitter' });
    const authorBioFull = container.querySelector('div.border-t.border-border.pt-8.mt-12');
    const subscribeCTAHeading = screen.getByText('Get founder stories like this every week.');
    const backLink = screen.getByRole('link', { name: /Back to all posts/i });

    expect(resourceCTA).not.toBeNull();
    expect(authorBioFull).not.toBeNull();

    // Helper: returns the index in document order (lower = earlier)
    const pos = (node: Node) => {
      let idx = 0;
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT);
      let cur: Node | null = walker.nextNode();
      while (cur) {
        if (cur === node) return idx;
        idx++;
        cur = walker.nextNode();
      }
      return -1;
    };
    expect(pos(resourceCTA!)).toBeLessThan(pos(twitterLink));
    expect(pos(twitterLink)).toBeLessThan(pos(authorBioFull!));
    expect(pos(authorBioFull!)).toBeLessThan(pos(subscribeCTAHeading));
    expect(pos(subscribeCTAHeading)).toBeLessThan(pos(backLink));
  });

  it('CTAs are NOT descendants of <article class*="prose"> (AC-3c.1)', () => {
    const { container } = renderAt('/posts/hello-world');
    const proseArticle = container.querySelector('article.prose');
    expect(proseArticle).not.toBeNull();
    // ResourceCTA tagline text
    const resourceTagline = screen.getByText('Want the toolkit I reference?');
    expect(proseArticle!.contains(resourceTagline)).toBe(false);
    // PostSubscribeCTA heading
    const subscribeCTA = screen.getByText('Get founder stories like this every week.');
    expect(proseArticle!.contains(subscribeCTA)).toBe(false);
  });

  it('PostSubscribeCTA POST body contains source="post-<slug>" (AC-3b.2)', async () => {
    const originalFetch = globalThis.fetch;
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    try {
      renderAt('/posts/hello-world');
      const input = screen.getByPlaceholderText(/enter your email/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'a@b.co' } });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
      });
      await waitFor(() => expect(fetchMock).toHaveBeenCalled());
      const call = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
      const init = call?.[1] as RequestInit;
      const body = JSON.parse(init.body as string) as Record<string, unknown>;
      expect(body.source).toBe('post-hello-world');
      expect(body.email).toBe('a@b.co');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
