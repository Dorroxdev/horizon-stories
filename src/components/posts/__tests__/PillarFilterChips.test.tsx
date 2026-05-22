import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { PillarFilterChips } from '../PillarFilterChips';
import { pillars, pillarSlugs } from '@/data/pillars';

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-search">{location.search}</div>;
}

function renderChips(initialUrl: string, extras?: React.ReactNode) {
  return render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <PillarFilterChips />
      <LocationDisplay />
      {extras}
    </MemoryRouter>,
  );
}

describe('PillarFilterChips', () => {
  it('renders 6 chips: All + 5 pillars, in pillarSlugs order', () => {
    renderChips('/posts');
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
    expect(buttons[0].textContent).toBe('All');
    for (let i = 0; i < pillarSlugs.length; i++) {
      expect(buttons[i + 1].textContent).toBe(pillars[pillarSlugs[i]].label);
    }
  });

  it('every chip is a <button> element (not <a>)', () => {
    renderChips('/posts');
    const buttons = screen.getAllByRole('button');
    for (const btn of buttons) {
      expect(btn.tagName).toBe('BUTTON');
    }
  });

  it('"All" is active when no pillar query param is present', () => {
    renderChips('/posts');
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn.getAttribute('aria-pressed')).toBe('true');
    expect(allBtn.className).toContain('bg-primary');
    expect(allBtn.className).toContain('text-primary-foreground');
    expect(allBtn.className).toContain('border-primary');
  });

  it('pillar chip is active when URL param matches', () => {
    renderChips('/posts?pillar=expert-playbooks');
    const playbooks = screen.getByRole('button', { name: 'Expert Playbooks' });
    expect(playbooks.getAttribute('aria-pressed')).toBe('true');
    expect(playbooks.className).toContain('bg-primary');
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn.getAttribute('aria-pressed')).toBe('false');
  });

  it('inactive chips carry inactive class tokens', () => {
    renderChips('/posts?pillar=founder-stories');
    const playbooks = screen.getByRole('button', { name: 'Expert Playbooks' });
    expect(playbooks.className).toContain('bg-transparent');
    expect(playbooks.className).toContain('text-foreground/70');
    expect(playbooks.className).toContain('border-border');
    expect(playbooks.className).toContain('hover:border-primary/50');
    expect(playbooks.className).toContain('hover:text-foreground');
  });

  it('all chips include base shape classes', () => {
    renderChips('/posts');
    for (const btn of screen.getAllByRole('button')) {
      expect(btn.className).toContain('rounded-full');
      expect(btn.className).toContain('px-4');
      expect(btn.className).toContain('py-1.5');
      expect(btn.className).toContain('text-sm');
      expect(btn.className).toContain('font-medium');
      expect(btn.className).toContain('border');
      expect(btn.className).toContain('transition-colors');
    }
  });

  it('clicking a pillar chip sets the ?pillar= param', () => {
    renderChips('/posts');
    fireEvent.click(screen.getByRole('button', { name: 'Founder Stories' }));
    expect(screen.getByTestId('location-search').textContent).toBe(
      '?pillar=founder-stories',
    );
  });

  it('clicking "All" clears the pillar param', () => {
    renderChips('/posts?pillar=founder-stories');
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId('location-search').textContent).toBe('');
  });

  it('clicking the active pillar chip is idempotent (URL unchanged)', () => {
    renderChips('/posts?pillar=founder-stories');
    fireEvent.click(screen.getByRole('button', { name: 'Founder Stories' }));
    expect(screen.getByTestId('location-search').textContent).toBe(
      '?pillar=founder-stories',
    );
  });

  it('container element has flex flex-wrap gap-2 and merges className', () => {
    render(
      <MemoryRouter initialEntries={['/posts']}>
        <PillarFilterChips className="custom-extra" />
      </MemoryRouter>,
    );
    const container = screen.getByRole('group');
    expect(container.className).toContain('flex');
    expect(container.className).toContain('flex-wrap');
    expect(container.className).toContain('gap-2');
    expect(container.className).toContain('custom-extra');
  });

  it('has a group role with accessible name "Filter posts by pillar"', () => {
    renderChips('/posts');
    expect(
      screen.getByRole('group', { name: 'Filter posts by pillar' }),
    ).toBeInTheDocument();
  });

  it('with unknown pillar in URL, no chip is active', () => {
    renderChips('/posts?pillar=garbage');
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn.getAttribute('aria-pressed')).toBe('false');
    for (const slug of pillarSlugs) {
      const btn = screen.getByRole('button', { name: pillars[slug].label });
      expect(btn.getAttribute('aria-pressed')).toBe('false');
    }
  });

  it('every pillar label is accessible via name', () => {
    renderChips('/posts');
    for (const slug of pillarSlugs) {
      expect(
        screen.getByRole('button', { name: pillars[slug].label }),
      ).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });
});
