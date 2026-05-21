import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Callout } from '../Callout';

describe('Callout', () => {
  it('defaults to info: border-primary/40, bg-primary/5, Info icon with text-primary, role=note', () => {
    const { container } = render(<Callout>Hello</Callout>);
    const root = container.firstChild as HTMLElement;
    expect(root.tagName).toBe('DIV');
    expect(root.getAttribute('role')).toBe('note');
    expect(root.className).toContain('border-primary/40');
    expect(root.className).toContain('bg-primary/5');
    expect(root.className).toContain('my-6');
    expect(root.className).toContain('flex');
    expect(root.className).toContain('gap-3');
    expect(root.className).toContain('rounded-r-lg');
    expect(root.className).toContain('border-l-2');
    expect(root.className).toContain('p-4');
    const svg = root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('aria-hidden')).toBe('true');
    expect(svg!.getAttribute('class') ?? '').toContain('text-primary');
    expect(svg!.getAttribute('class') ?? '').toContain('w-5');
    expect(svg!.getAttribute('class') ?? '').toContain('h-5');
    expect(svg!.getAttribute('class') ?? '').toContain('mt-0.5');
    expect(svg!.getAttribute('class') ?? '').toContain('shrink-0');
    expect(root.textContent).toContain('Hello');
  });

  it('warning variant uses destructive tokens and AlertTriangle icon', () => {
    const { container } = render(<Callout type="warning">Be careful</Callout>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('border-destructive/40');
    expect(root.className).toContain('bg-destructive/5');
    const svg = root.querySelector('svg');
    expect(svg!.getAttribute('class') ?? '').toContain('text-destructive');
  });

  it('success variant uses nessie tokens and CheckCircle2 icon', () => {
    const { container } = render(<Callout type="success">Done</Callout>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('border-nessie/40');
    expect(root.className).toContain('bg-nessie/5');
    const svg = root.querySelector('svg');
    expect(svg!.getAttribute('class') ?? '').toContain('text-nessie');
  });

  it('renders complex children inside flex-1 [&>p]:m-0 wrapper', () => {
    const { container } = render(
      <Callout>
        <p>One</p>
        <p>Two</p>
      </Callout>,
    );
    const content = container.querySelector('.flex-1');
    expect(content).not.toBeNull();
    expect(content!.className).toContain('flex-1');
    expect(content!.className).toContain('[&>p]:m-0');
    const paragraphs = content!.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('unknown type cast falls back to info classes (defensive)', () => {
    const { container } = render(
      <Callout type={'unknown' as unknown as 'info'}>X</Callout>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('border-primary/40');
    expect(root.className).toContain('bg-primary/5');
    const svg = root.querySelector('svg');
    expect(svg!.getAttribute('class') ?? '').toContain('text-primary');
  });

  it('brand token classes are present on all three variants (jsdom class assertion)', () => {
    const { container: c1 } = render(<Callout type="info">a</Callout>);
    const { container: c2 } = render(<Callout type="warning">b</Callout>);
    const { container: c3 } = render(<Callout type="success">c</Callout>);
    expect((c1.firstChild as HTMLElement).className).toContain('border-primary/40');
    expect((c2.firstChild as HTMLElement).className).toContain('border-destructive/40');
    expect((c3.firstChild as HTMLElement).className).toContain('border-nessie/40');
  });
});
