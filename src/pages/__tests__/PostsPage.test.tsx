import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PostsPage from '../PostsPage';
import { getAllPosts, getPostsByPillar } from '@/lib/posts';

function renderPage(url: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <PostsPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('PostsPage', () => {
  it('renders heading "Posts" with display/bold/large classes', () => {
    renderPage('/posts');
    const h1 = screen.getByRole('heading', { level: 1, name: 'Posts' });
    expect(h1.className).toContain('font-display');
    expect(h1.className).toContain('font-bold');
    expect(h1.className).toContain('text-4xl');
    expect(h1.className).toContain('lg:text-5xl');
    expect(h1.className).toContain('leading-tight');
  });

  it('renders tagline in period form (no em dash)', () => {
    renderPage('/posts');
    const tagline = screen.getByText(/Founder stories, playbooks, and frameworks/i);
    expect(tagline.textContent).toBe(
      'Founder stories, playbooks, and frameworks. Written for builders.',
    );
    // Hard guard against em dash (U+2014)
    expect(tagline.textContent).not.toMatch(/—/);
    expect(tagline.textContent).not.toMatch(/—/);
    expect(tagline.className).toContain('text-lg');
    expect(tagline.className).toContain('text-muted-foreground');
    expect(tagline.className).toContain('mt-4');
    expect(tagline.className).toContain('max-w-2xl');
  });

  it('root has bg-background and min-h-screen', () => {
    const { container } = renderPage('/posts');
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('bg-background');
    expect(root.className).toContain('min-h-screen');
  });

  it('renders the PillarFilterChips with 6 chip buttons', () => {
    renderPage('/posts');
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Founder Stories' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Filter posts by pillar' }),
    ).toBeInTheDocument();
  });

  it('renders all posts when no filter is applied', () => {
    renderPage('/posts');
    const articles = document.querySelectorAll('article');
    expect(articles.length).toBe(getAllPosts().length);
    expect(articles.length).toBeGreaterThan(0);
  });

  it('shows stub post when filtering by founder-stories', () => {
    renderPage('/posts?pillar=founder-stories');
    const articles = document.querySelectorAll('article');
    expect(articles.length).toBe(getPostsByPillar('founder-stories').length);
    // Empty state should NOT be present
    expect(
      screen.queryByText('No posts in this pillar yet.'),
    ).not.toBeInTheDocument();
  });

  it('shows empty state when filtering by guides-frameworks (pillar with no posts)', () => {
    renderPage('/posts?pillar=guides-frameworks');
    expect(
      screen.getByText('No posts in this pillar yet.'),
    ).toBeInTheDocument();
    const articles = document.querySelectorAll('article');
    expect(articles.length).toBe(0);
  });

  it('empty state shows "Show all posts" link to /posts', () => {
    renderPage('/posts?pillar=guides-frameworks');
    const link = screen.getByRole('link', { name: 'Show all posts' });
    expect(link.getAttribute('href')).toBe('/posts');
  });

  it('shows empty state for unknown pillar slug', () => {
    renderPage('/posts?pillar=garbage');
    expect(
      screen.getByText('No posts in this pillar yet.'),
    ).toBeInTheDocument();
  });

  it('renders the filter section with proper container classes', () => {
    const { container } = renderPage('/posts');
    const sections = container.querySelectorAll('section');
    // hero, filter, list = 3 sections
    expect(sections.length).toBe(3);
    expect(sections[1].className).toContain('container');
    expect(sections[1].className).toContain('mx-auto');
    expect(sections[1].className).toContain('px-4');
    expect(sections[1].className).toContain('lg:px-8');
    expect(sections[1].className).toContain('pb-8');
  });

  it('renders the list section with max-w-3xl wrapper', () => {
    const { container } = renderPage('/posts');
    const sections = container.querySelectorAll('section');
    const listSection = sections[2];
    expect(listSection.className).toContain('pb-32');
    const inner = listSection.querySelector('div.max-w-3xl');
    expect(inner).not.toBeNull();
  });
});
