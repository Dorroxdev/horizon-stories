import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PillarBadge } from '../PillarBadge';
import { pillars, pillarSlugs } from '@/data/pillars';

describe('PillarBadge', () => {
  it('renders the pillar label (not slug)', () => {
    render(<PillarBadge pillar="founder-stories" />);
    expect(screen.getByText('Founder Stories')).toBeInTheDocument();
    expect(screen.queryByText('founder-stories')).not.toBeInTheDocument();
  });

  it('renders a rounded-full bordered pill', () => {
    render(<PillarBadge pillar="ai-strategy" />);
    const el = screen.getByText(pillars['ai-strategy'].label);
    expect(el.className).toContain('rounded-full');
    expect(el.className).toContain('border');
  });

  it('defaults to size="sm" classes (text-xs px-2 py-0.5)', () => {
    render(<PillarBadge pillar="founder-stories" />);
    const el = screen.getByText('Founder Stories');
    expect(el.className).toContain('text-xs');
    expect(el.className).toContain('px-2');
    expect(el.className).toContain('py-0.5');
  });

  it('renders explicit sm size with text-xs', () => {
    render(<PillarBadge pillar="founder-stories" size="sm" />);
    const el = screen.getByText('Founder Stories');
    expect(el.className).toContain('text-xs');
    expect(el.className).toContain('px-2');
    expect(el.className).toContain('py-0.5');
  });

  it('renders md size with text-sm px-3 py-1', () => {
    render(<PillarBadge pillar="founder-stories" size="md" />);
    const el = screen.getByText('Founder Stories');
    expect(el.className).toContain('text-sm');
    expect(el.className).toContain('px-3');
    expect(el.className).toContain('py-1');
  });

  it('applies accentClass from pillars metadata for each known slug', () => {
    for (const slug of pillarSlugs) {
      const { unmount } = render(<PillarBadge pillar={slug} />);
      const el = screen.getByText(pillars[slug].label);
      const firstAccentToken = pillars[slug].accentClass.split(' ')[0];
      expect(el.className).toContain(firstAccentToken);
      unmount();
    }
  });

  it('merges custom className via cn()', () => {
    render(
      <PillarBadge pillar="founder-stories" className="custom-class extra" />,
    );
    const el = screen.getByText('Founder Stories');
    expect(el.className).toContain('custom-class');
    expect(el.className).toContain('extra');
  });

  it('renders all 5 pillar labels correctly', () => {
    const expected = [
      'Founder Stories',
      'Expert Playbooks',
      'AI Strategy',
      'Failure Post-Mortems',
      'Guides & Frameworks',
    ];
    for (const slug of pillarSlugs) {
      const { unmount } = render(<PillarBadge pillar={slug} />);
      expect(screen.getByText(pillars[slug].label)).toBeInTheDocument();
      unmount();
    }
    // sanity: known label set
    expect(pillarSlugs.length).toBe(expected.length);
  });

  it('renders no className artifacts when className is omitted', () => {
    render(<PillarBadge pillar="founder-stories" />);
    const el = screen.getByText('Founder Stories');
    expect(el.className).not.toContain('undefined');
    expect(el.className).not.toContain('null');
  });
});
