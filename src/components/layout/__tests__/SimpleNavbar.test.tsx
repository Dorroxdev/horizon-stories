import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SimpleNavbar from '../SimpleNavbar';

function renderNav(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <SimpleNavbar />
    </MemoryRouter>,
  );
}

function desktopLinks() {
  // Desktop nav lives in the `.hidden.lg:flex` container before the subscribe button
  const nav = document.querySelector('nav');
  expect(nav).not.toBeNull();
  const containers = nav!.querySelectorAll('div.hidden.lg\\:flex');
  // first matching container has the nav links (second one has the subscribe button)
  const linkContainer = containers[0] as HTMLElement;
  expect(linkContainer).toBeDefined();
  return within(linkContainer).getAllByRole('link');
}

describe('SimpleNavbar', () => {
  it('renders 3 nav links in desktop: Home, Posts, Resources', () => {
    renderNav('/');
    const links = desktopLinks();
    expect(links.length).toBe(3);
    expect(links[0].textContent).toBe('Home');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].textContent).toBe('Posts');
    expect(links[1].getAttribute('href')).toBe('/posts');
    expect(links[2].textContent).toBe('Resources');
    expect(links[2].getAttribute('href')).toBe('/resources');
  });

  it('highlights Posts link at /posts (and not Home or Resources)', () => {
    renderNav('/posts');
    const [home, posts, resources] = desktopLinks();
    expect(posts.className).toContain('text-primary');
    expect(posts.className).toContain('bg-primary/10');
    expect(home.className).not.toContain('bg-primary/10');
    expect(resources.className).not.toContain('bg-primary/10');
  });

  it('highlights Posts link at /posts/hello-world (prefix match)', () => {
    renderNav('/posts/hello-world');
    const [, posts] = desktopLinks();
    expect(posts.className).toContain('text-primary');
    expect(posts.className).toContain('bg-primary/10');
  });

  it('does NOT highlight Posts link at /post-anything (false-positive guard)', () => {
    renderNav('/post-anything');
    const [, posts] = desktopLinks();
    expect(posts.className).not.toContain('bg-primary/10');
  });

  it('does NOT highlight Resources link at /resources-archive (false-positive guard)', () => {
    renderNav('/resources-archive');
    const [, , resources] = desktopLinks();
    expect(resources.className).not.toContain('bg-primary/10');
  });

  it('highlights Home link only at /', () => {
    renderNav('/');
    const [home, posts, resources] = desktopLinks();
    expect(home.className).toContain('text-primary');
    expect(home.className).toContain('bg-primary/10');
    expect(posts.className).not.toContain('bg-primary/10');
    expect(resources.className).not.toContain('bg-primary/10');
  });

  it('does NOT highlight Home link at /posts (root path must not over-match)', () => {
    renderNav('/posts');
    const [home] = desktopLinks();
    expect(home.className).not.toContain('bg-primary/10');
  });

  it('does NOT highlight Home link at /resources', () => {
    renderNav('/resources');
    const [home] = desktopLinks();
    expect(home.className).not.toContain('bg-primary/10');
  });

  it('highlights Resources at /resources', () => {
    renderNav('/resources');
    const [home, posts, resources] = desktopLinks();
    expect(resources.className).toContain('text-primary');
    expect(resources.className).toContain('bg-primary/10');
    expect(home.className).not.toContain('bg-primary/10');
    expect(posts.className).not.toContain('bg-primary/10');
  });

  it('highlights Resources at /resources/some-slug (regression)', () => {
    renderNav('/resources/getting-started');
    const [, , resources] = desktopLinks();
    expect(resources.className).toContain('text-primary');
    expect(resources.className).toContain('bg-primary/10');
  });

  it('renders the mobile Sheet trigger button', () => {
    renderNav('/');
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });
});
