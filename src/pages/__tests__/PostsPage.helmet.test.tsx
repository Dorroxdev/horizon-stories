import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PostsPage from '../PostsPage';

function renderPosts(url: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <PostsPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('PostsPage — Helmet SEO meta (Task 1b)', () => {
  it('sets <title> to period form "Posts. Horizon Launchpad"', async () => {
    renderPosts('/posts');
    await waitFor(() => {
      expect(document.title).toBe('Posts. Horizon Launchpad');
    });
  });

  it('sets <meta name="description"> to the period-form copy', async () => {
    renderPosts('/posts');
    await waitFor(() => {
      const desc = document.querySelector('meta[name="description"]');
      expect(desc).not.toBeNull();
      expect(desc!.getAttribute('content')).toBe(
        'Founder stories, expert playbooks, AI strategy, post-mortems, and frameworks. Written for builders.',
      );
    });
  });

  it('sets og:title, og:description, og:image, og:type', async () => {
    renderPosts('/posts');
    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogTitle?.getAttribute('content')).toBe('Posts. Horizon Launchpad');
      expect(ogDesc?.getAttribute('content')).toContain('Founder stories');
      expect(ogImage?.getAttribute('content')).toBe(
        'https://horizonlaunchpad.com/og-image.png',
      );
      expect(ogType?.getAttribute('content')).toBe('website');
    });
  });

  it('sets twitter:card to summary_large_image', async () => {
    renderPosts('/posts');
    await waitFor(() => {
      const tw = document.querySelector('meta[name="twitter:card"]');
      expect(tw?.getAttribute('content')).toBe('summary_large_image');
    });
  });

  it('sets canonical to absolute /posts URL (no query string)', async () => {
    renderPosts('/posts?pillar=founder-stories');
    await waitFor(() => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toBe(
        'https://horizonlaunchpad.com/posts',
      );
    });
  });

  it('Helmet chrome contains no em dash (U+2014)', async () => {
    renderPosts('/posts');
    await waitFor(() => {
      expect(document.title).toBe('Posts. Horizon Launchpad');
    });
    const title = document.title;
    const desc =
      document.querySelector('meta[name="description"]')?.getAttribute('content') ??
      '';
    const ogTitle =
      document.querySelector('meta[property="og:title"]')?.getAttribute('content') ??
      '';
    const ogDesc =
      document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content') ?? '';
    for (const v of [title, desc, ogTitle, ogDesc]) {
      expect(v).not.toContain('—');
    }
  });
});
