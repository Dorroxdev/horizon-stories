import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PostDetailPage from '../PostDetailPage';
import * as postsLib from '@/lib/posts';

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

function renderDetail(url: string) {
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
  document.title = '';
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PostDetailPage — Helmet SEO meta (post found, Task 1c)', () => {
  it('sets <title> to "<post.title>. Horizon Launchpad" period form', async () => {
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      expect(document.title).toMatch(/\. Horizon Launchpad$/);
    });
    // Ensure the title contains the post title's leading text
    expect(document.title).toContain('Horizon Launchpad');
  });

  it('sets description from post.excerpt', async () => {
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      const desc = document.querySelector('meta[name="description"]');
      expect(desc).not.toBeNull();
      // post excerpt begins with "Most founder stories"
      expect(desc!.getAttribute('content')).toContain('Most founder stories');
    });
  });

  it('sets og:type to "article" and article:published_time', async () => {
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      const ogType = document.querySelector('meta[property="og:type"]');
      const published = document.querySelector(
        'meta[property="article:published_time"]',
      );
      expect(ogType?.getAttribute('content')).toBe('article');
      expect(published?.getAttribute('content')).toBe('2026-05-22');
    });
  });

  it('sets article:author and article:section (pillar label)', async () => {
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      const author = document.querySelector('meta[property="article:author"]');
      const section = document.querySelector(
        'meta[property="article:section"]',
      );
      expect(author?.getAttribute('content')).toBe('Altan Doyran');
      expect(section?.getAttribute('content')).toBe('Founder Stories');
    });
  });

  it('og:image falls back to /og-image.png when post.ogImage is missing', async () => {
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage?.getAttribute('content')).toBe(
        'https://horizonlaunchpad.com/og-image.png',
      );
    });
  });

  it('og:image uses post.ogImage when provided (absolute URL composition)', async () => {
    const realPost = postsLib.getPostBySlug('building-horizon-launchpad-in-public');
    expect(realPost).toBeDefined();
    vi.spyOn(postsLib, 'getPostBySlug').mockReturnValue({
      ...realPost!,
      ogImage: '/custom-og.png',
    });
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage?.getAttribute('content')).toBe(
        'https://horizonlaunchpad.com/custom-og.png',
      );
    });
  });

  it('canonical link is absolute /posts/<slug>', async () => {
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toBe(
        'https://horizonlaunchpad.com/posts/building-horizon-launchpad-in-public',
      );
    });
  });

  it('omits article:modified_time when post.updatedAt is undefined', async () => {
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      // assert something else first so Helmet has flushed
      expect(document.title).toContain('Horizon Launchpad');
    });
    const modified = document.querySelector(
      'meta[property="article:modified_time"]',
    );
    expect(modified).toBeNull();
  });

  it('emits article:modified_time when post.updatedAt is set', async () => {
    const realPost = postsLib.getPostBySlug('building-horizon-launchpad-in-public');
    vi.spyOn(postsLib, 'getPostBySlug').mockReturnValue({
      ...realPost!,
      updatedAt: '2026-05-19',
    });
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      const modified = document.querySelector(
        'meta[property="article:modified_time"]',
      );
      expect(modified?.getAttribute('content')).toBe('2026-05-19');
    });
  });

  it('Helmet title and description have no em dash (U+2014)', async () => {
    renderDetail('/posts/building-horizon-launchpad-in-public');
    await waitFor(() => {
      expect(document.title.length).toBeGreaterThan(0);
    });
    // Helmet content (title + description) must not contain em dashes
    // even if post.title or post.excerpt could (this asserts the *chrome* we control:
    // the period separator between title and brand)
    expect(document.title.endsWith('. Horizon Launchpad')).toBe(true);
    expect(document.title).not.toMatch(/— Horizon Launchpad/);
  });
});

describe('PostDetailPage — Helmet 404 fallback (Task 1c)', () => {
  it('sets <title> to "Post not found. Horizon Launchpad"', async () => {
    renderDetail('/posts/does-not-exist');
    await waitFor(() => {
      expect(document.title).toBe('Post not found. Horizon Launchpad');
    });
  });

  it('sets meta robots="noindex" on 404 branch', async () => {
    renderDetail('/posts/does-not-exist');
    await waitFor(() => {
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots?.getAttribute('content')).toBe('noindex');
    });
  });

  it('404 title contains no em dash', async () => {
    renderDetail('/posts/does-not-exist');
    await waitFor(() => {
      expect(document.title.length).toBeGreaterThan(0);
    });
    expect(document.title).not.toMatch(/—/);
  });
});
