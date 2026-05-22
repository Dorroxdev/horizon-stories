import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AuthorBio } from '../AuthorBio';

describe('AuthorBio compact variant', () => {
  it('renders root flex layout with avatar, name, and "Operator" role', () => {
    const { container } = render(<AuthorBio authorName="Altan" variant="compact" />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('flex');
    expect(root.className).toContain('flex-row');
    expect(root.className).toContain('items-center');
    expect(root.className).toContain('gap-3');

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.getAttribute('alt')).toBe('Altan');
    expect(img!.getAttribute('src')).toBe('/authors/altan.jpg');
    expect(img!.className).toContain('w-10');
    expect(img!.className).toContain('h-10');
    expect(img!.className).toContain('rounded-full');
    expect(img!.className).toContain('border');

    expect(screen.getByText('Altan')).toBeInTheDocument();
    expect(screen.getByText('Operator')).toBeInTheDocument();
  });

  it('uses default avatarSrc when none is provided', () => {
    const { container } = render(<AuthorBio authorName="Altan" variant="compact" />);
    const img = container.querySelector('img');
    expect(img!.getAttribute('src')).toBe('/authors/altan.jpg');
  });

  it('accepts a custom avatarSrc', () => {
    const { container } = render(
      <AuthorBio authorName="Altan" variant="compact" avatarSrc="/custom.png" />,
    );
    const img = container.querySelector('img');
    expect(img!.getAttribute('src')).toBe('/custom.png');
  });

  it('onError swaps img for icon fallback (compact)', () => {
    const { container } = render(<AuthorBio authorName="Altan" variant="compact" />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    fireEvent.error(img!);
    expect(container.querySelector('img')).toBeNull();
    const fallback = container.querySelector('[role="img"]');
    expect(fallback).not.toBeNull();
    expect(fallback!.getAttribute('aria-label')).toBe('Altan');
    expect(fallback!.className).toContain('w-10');
    expect(fallback!.className).toContain('h-10');
    expect(fallback!.className).toContain('bg-primary/20');
    expect(fallback!.className).toContain('rounded-full');
    const svg = fallback!.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('class') ?? '').toContain('w-5');
    expect(svg!.getAttribute('class') ?? '').toContain('h-5');
    expect(svg!.getAttribute('class') ?? '').toContain('text-primary');
    // Name still rendered
    expect(screen.getByText('Altan')).toBeInTheDocument();
  });
});

describe('AuthorBio full variant', () => {
  it('renders border-t wrapper, w-16 h-16 avatar, name, role, bio paragraph', () => {
    const { container } = render(
      <AuthorBio
        authorName="Altan"
        authorBio="Operator and builder."
        variant="full"
      />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('border-t');
    expect(root.className).toContain('border-border');
    expect(root.className).toContain('pt-8');
    expect(root.className).toContain('mt-12');
    expect(root.className).toContain('flex');
    expect(root.className).toContain('gap-4');

    const img = container.querySelector('img');
    expect(img!.className).toContain('w-16');
    expect(img!.className).toContain('h-16');

    const bio = container.querySelector('p');
    expect(bio).not.toBeNull();
    expect(bio!.textContent).toBe('Operator and builder.');
    expect(bio!.className).toContain('text-base');
    expect(bio!.className).toContain('text-muted-foreground');
    expect(bio!.className).toContain('mt-3');
    expect(bio!.className).toContain('max-w-xl');
  });

  it('omits the bio paragraph when authorBio is not provided', () => {
    const { container } = render(<AuthorBio authorName="Altan" variant="full" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
    expect(screen.getByText('Altan')).toBeInTheDocument();
    expect(screen.getByText('Operator')).toBeInTheDocument();
  });

  it('onError swaps img for icon fallback (full): w-16 h-16 + w-8 h-8 icon', () => {
    const { container } = render(<AuthorBio authorName="Altan" variant="full" />);
    const img = container.querySelector('img');
    fireEvent.error(img!);
    const fallback = container.querySelector('[role="img"]');
    expect(fallback).not.toBeNull();
    expect(fallback!.className).toContain('w-16');
    expect(fallback!.className).toContain('h-16');
    const svg = fallback!.querySelector('svg');
    expect(svg!.getAttribute('class') ?? '').toContain('w-8');
    expect(svg!.getAttribute('class') ?? '').toContain('h-8');
    expect(svg!.getAttribute('class') ?? '').toContain('text-primary');
  });

  it('forwards className to root', () => {
    const { container } = render(
      <AuthorBio authorName="A" variant="full" className="extra-class" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('extra-class');
    expect(root.className).toContain('border-t');
  });
});
