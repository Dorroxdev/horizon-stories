import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HorizonHome from '../HorizonHome';
import * as postsLib from '@/lib/posts';

function renderHome() {
  return render(
    <MemoryRouter>
      <HorizonHome />
    </MemoryRouter>,
  );
}

let originalFetch: typeof globalThis.fetch;

beforeEach(() => {
  originalFetch = globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe('HorizonHome — RecentPostsSection visible with posts (AC-4a.4, 4b.1, 4b.4)', () => {
  it('renders "Latest posts" heading and at least one card', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Latest posts' }),
    ).toBeInTheDocument();
    // Stub post fixture title contains "Hello, world"
    const cards = screen.getAllByRole('heading', { level: 3 });
    // At least one h3 from the recent posts cards
    expect(cards.length).toBeGreaterThan(0);
  });

  it('"See all posts" link points to /posts (AC-4f.5)', () => {
    renderHome();
    const seeAll = screen.getByRole('link', { name: /See all posts/i });
    expect(seeAll.getAttribute('href')).toBe('/posts');
  });

  it('renders the bottom PostSubscribeCTA with "Get every new post" headline (AC-4d.1, 4d.2)', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Get every new post' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Free, weekly. The newsletter goes out alongside each post.'),
    ).toBeInTheDocument();
  });

  it('renders at least one PillarBadge in the recent posts grid', () => {
    renderHome();
    // The stub post has pillar=founder-stories whose label is "Founder Stories"
    expect(screen.getAllByText('Founder Stories').length).toBeGreaterThan(0);
  });

  it('embedded SubscribeForm POST body contains source="home-recent-posts" (AC-4d.5)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    renderHome();
    // The recent-posts subscribe form: scope by finding the section containing the headline
    const homeCTA = screen.getByRole('heading', { level: 2, name: 'Get every new post' });
    const section = homeCTA.closest('section');
    expect(section).not.toBeNull();
    const input = section!.querySelector('input[type="email"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    fireEvent.change(input, { target: { value: 'a@b.co' } });
    const submitBtn = section!.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitBtn).not.toBeNull();
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const call = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
    const init = call?.[1] as RequestInit;
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(body.source).toBe('home-recent-posts');
  });
});

describe('HorizonHome — empty recent posts (AC-4c.1, 4c.5)', () => {
  it('returns null section when getRecentPosts returns []', () => {
    vi.spyOn(postsLib, 'getRecentPosts').mockReturnValue([]);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderHome();
    expect(screen.queryByRole('heading', { level: 2, name: 'Latest posts' })).toBeNull();
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Get every new post' }),
    ).toBeNull();

    // Other sections continue to render
    expect(
      screen.getByRole('heading', { level: 2, name: /What You'll Get/i }),
    ).toBeInTheDocument();

    const ourWarn = warn.mock.calls.filter(
      (args) => !String(args[0] ?? '').includes('React Router'),
    );
    const ourErr = err.mock.calls.filter(
      (args) => !String(args[0] ?? '').includes('React Router'),
    );
    expect(ourWarn).toHaveLength(0);
    expect(ourErr).toHaveLength(0);
  });
});

describe('HorizonHome — Recent Posts em-dash sweep (AC-X.2, AC-4f em-dash)', () => {
  it('section chrome (heading, subhead, CTA copy, button labels) contains no U+2014', () => {
    // Em-dash guard is on the NEW component copy shipped in this plan
    // (RecentPostsSection chrome + PostSubscribeCTA defaults+overrides).
    // Post titles are author content and may contain em dashes by editorial choice
    // (see PostDetailPage tests line 35).
    renderHome();
    const heading = screen.getByRole('heading', { level: 2, name: 'Latest posts' });
    expect(heading.textContent ?? '').not.toMatch(/—/);
    expect(
      screen.getByText('Stories, playbooks, and frameworks for builders.').textContent ?? '',
    ).not.toMatch(/—/);
    expect(screen.getByRole('link', { name: /See all posts/i }).textContent ?? '').not.toMatch(/—/);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Get every new post' }).textContent ?? '',
    ).not.toMatch(/—/);
    expect(
      screen.getByText('Free, weekly. The newsletter goes out alongside each post.').textContent ?? '',
    ).not.toMatch(/—/);
  });
});
