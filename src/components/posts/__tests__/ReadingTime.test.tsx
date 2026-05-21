import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ReadingTime } from '../ReadingTime';

describe('ReadingTime', () => {
  it('renders the Clock icon and "{minutes} min read" label', () => {
    const { container } = render(<ReadingTime minutes={5} />);
    const span = container.firstChild as HTMLElement;
    expect(span.tagName).toBe('SPAN');
    expect(span.textContent).toMatch(/5 min read/);
    const svg = span.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('class') ?? '').toContain('w-4');
    expect(svg!.getAttribute('class') ?? '').toContain('h-4');
  });

  it('icon has aria-hidden="true"', () => {
    const { container } = render(<ReadingTime minutes={7} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('aria-hidden')).toBe('true');
  });

  it('root span has the base classes', () => {
    const { container } = render(<ReadingTime minutes={2} />);
    const span = container.firstChild as HTMLElement;
    expect(span.className).toContain('inline-flex');
    expect(span.className).toContain('items-center');
    expect(span.className).toContain('gap-1.5');
    expect(span.className).toContain('text-sm');
    expect(span.className).toContain('text-muted-foreground');
  });

  it('className prop is merged onto the root', () => {
    const { container } = render(
      <ReadingTime minutes={2} className="mt-4 custom-class" />,
    );
    const span = container.firstChild as HTMLElement;
    expect(span.className).toContain('mt-4');
    expect(span.className).toContain('custom-class');
    expect(span.className).toContain('inline-flex');
  });

  it('renders 0 minutes without crash', () => {
    const { container } = render(<ReadingTime minutes={0} />);
    expect(container.textContent).toContain('0 min read');
  });

  it('renders large minutes verbatim', () => {
    const { container } = render(<ReadingTime minutes={120} />);
    expect(container.textContent).toContain('120 min read');
  });
});
