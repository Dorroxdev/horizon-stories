import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ResourceCTA } from '../ResourceCTA';
import { getResourceBySlug } from '@/data/resources';

const KNOWN_SLUG = 'saas-validation-toolkit';

function renderCTA(slug: string, className?: string) {
  return render(
    <MemoryRouter>
      <ResourceCTA resourceSlug={slug} className={className} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ResourceCTA — unknown slug returns null (AC-2a.2)', () => {
  it('returns null for nonexistent slug, no DOM nodes', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = renderCTA('nonexistent-slug-xyz');
    expect(container.firstChild).toBeNull();
    // Filter out React Router future-flag warnings (not from our component)
    const ourWarns = warn.mock.calls.filter(
      (args) => !String(args[0] ?? '').includes('React Router'),
    );
    const ourErrs = err.mock.calls.filter(
      (args) => !String(args[0] ?? '').includes('React Router'),
    );
    expect(ourWarns).toHaveLength(0);
    expect(ourErrs).toHaveLength(0);
  });
});

describe('ResourceCTA — known slug renders full layout (AC-2a.1, 2a.3, 2a.4, 2a.5)', () => {
  it('renders the container with brand layout classes', () => {
    const { container } = renderCTA(KNOWN_SLUG);
    const root = container.firstChild as HTMLElement;
    expect(root).not.toBeNull();
    const cls = root.className;
    expect(cls).toContain('rounded-xl');
    expect(cls).toContain('border-primary/20');
    expect(cls).toContain('bg-primary/5');
    expect(cls).toContain('p-6');
    expect(cls).toContain('flex');
    expect(cls).toContain('flex-col');
    expect(cls).toContain('sm:flex-row');
    expect(cls).toContain('gap-4');
    expect(cls).toContain('sm:items-center');
  });

  it('applies the not-prose defensive class', () => {
    const { container } = renderCTA(KNOWN_SLUG);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('not-prose');
  });

  it('renders resource title and tagline from getResourceBySlug', () => {
    const resource = getResourceBySlug(KNOWN_SLUG)!;
    renderCTA(KNOWN_SLUG);
    expect(screen.getByText(resource.title)).toBeInTheDocument();
    expect(screen.getByText(resource.tagline)).toBeInTheDocument();
  });

  it('renders the hardcoded "Want the toolkit I reference?" tagline (AC-2a.6)', () => {
    renderCTA(KNOWN_SLUG);
    expect(screen.getByText('Want the toolkit I reference?')).toBeInTheDocument();
  });

  it('renders <a href="/resources/<slug>"> via Button asChild Link (no nested anchors)', () => {
    renderCTA(KNOWN_SLUG);
    const link = screen.getByRole('link', { name: /Get free access/i }) as HTMLAnchorElement;
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe(`/resources/${KNOWN_SLUG}`);
    // No nested anchors
    expect(link.querySelector('a')).toBeNull();
  });

  it('renders an aria-hidden FileText icon (svg) in the icon block', () => {
    const { container } = renderCTA(KNOWN_SLUG);
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
    // At least the FileText + ArrowRight inside the Link
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });
});

describe('ResourceCTA — className merge (AC-2a.3 merge)', () => {
  it('appends caller className via cn(...)', () => {
    const { container } = renderCTA(KNOWN_SLUG, 'my-custom-cls');
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('my-custom-cls');
    // Base classes still present
    expect(root.className).toContain('rounded-xl');
  });
});

describe('ResourceCTA — em-dash guard (AC-2a.6, TS-2.11)', () => {
  it('rendered text content contains no U+2014', () => {
    const { container } = renderCTA(KNOWN_SLUG);
    expect(container.textContent ?? '').not.toMatch(/—/);
  });
});
