import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { PostSubscribeCTA } from '../PostSubscribeCTA';

function makeFetchMock(ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: 200,
    json: async () => ({ success: true }),
  });
}

function getLastBody(fetchMock: ReturnType<typeof vi.fn>): Record<string, unknown> {
  const call = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
  const init = call?.[1] as RequestInit | undefined;
  return JSON.parse(init!.body as string) as Record<string, unknown>;
}

let originalFetch: typeof globalThis.fetch;

beforeEach(() => {
  originalFetch = globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe('PostSubscribeCTA — default copy (AC-2b.1, 2b.2)', () => {
  it('renders default headline and description when no overrides', () => {
    render(<PostSubscribeCTA postSlug="hello-world" />);
    expect(
      screen.getByRole('heading', { level: 2 }).textContent,
    ).toBe('Get founder stories like this every week.');
    expect(
      screen.getByText(
        "Free. No spam. Unsubscribe anytime. Subscribe and we'll send the latest playbooks and frameworks straight to your inbox.",
      ),
    ).toBeInTheDocument();
  });

  it('default copy has no em dashes', () => {
    const { container } = render(<PostSubscribeCTA postSlug="hello-world" />);
    expect(container.textContent ?? '').not.toMatch(/—/);
  });
});

describe('PostSubscribeCTA — override props (AC-2b.3)', () => {
  it('uses overrides verbatim when headline + description provided', () => {
    render(
      <PostSubscribeCTA
        postSlug="hello-world"
        headline="Custom H"
        description="Custom D"
      />,
    );
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Custom H');
    expect(screen.getByText('Custom D')).toBeInTheDocument();
  });
});

describe('PostSubscribeCTA — DOM structure + classes (AC-2b.4)', () => {
  it('outer container is a <section> with base classes', () => {
    const { container } = render(<PostSubscribeCTA postSlug="hello-world" />);
    const section = container.querySelector('section');
    expect(section).not.toBeNull();
    const cls = section!.className;
    expect(cls).toContain('my-12');
    expect(cls).toContain('rounded-xl');
    expect(cls).toContain('border');
    expect(cls).toContain('border-border');
    expect(cls).toContain('bg-card/50');
    expect(cls).toContain('p-8');
    expect(cls).toContain('not-prose');
  });

  it('headline is <h2> (not <h3>) with display/bold/text-2xl', () => {
    render(<PostSubscribeCTA postSlug="hello-world" />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.tagName).toBe('H2');
    const cls = h2.className;
    expect(cls).toContain('font-display');
    expect(cls).toContain('font-bold');
    expect(cls).toContain('text-2xl');
    expect(cls).toContain('mb-2');
  });

  it('description <p> uses muted classes', () => {
    const { container } = render(<PostSubscribeCTA postSlug="hello-world" />);
    const paragraphs = container.querySelectorAll('p.text-muted-foreground');
    // First one should be the description
    expect(paragraphs.length).toBeGreaterThanOrEqual(1);
    const desc = paragraphs[0] as HTMLElement;
    expect(desc.className).toContain('mb-6');
    expect(desc.className).toContain('max-w-xl');
  });

  it('embeds a SubscribeForm with max-w-md class wrapper', () => {
    const { container } = render(<PostSubscribeCTA postSlug="hello-world" />);
    // SubscribeForm renders a wrapper div with className - the max-w-md is on the outer div
    const formWrapper = container.querySelector('.max-w-md');
    expect(formWrapper).not.toBeNull();
    // Email input should be present
    expect(container.querySelector('input[type="email"]')).not.toBeNull();
  });

  it('Subscribe button text is "Subscribe"', () => {
    render(<PostSubscribeCTA postSlug="hello-world" />);
    expect(screen.getByRole('button')).toHaveTextContent(/subscribe/i);
  });
});

describe('PostSubscribeCTA — source forwarded to SubscribeForm (AC-2b.5)', () => {
  it('defaults to source="post-<postSlug>" when source prop omitted', async () => {
    const fetchMock = makeFetchMock();
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    render(<PostSubscribeCTA postSlug="hello-world" />);
    const input = screen.getByPlaceholderText(/enter your email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'a@b.co' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const body = getLastBody(fetchMock);
    expect(body.source).toBe('post-hello-world');
    expect(body.email).toBe('a@b.co');
  });

  it('explicit source prop overrides the post-<postSlug> default', async () => {
    const fetchMock = makeFetchMock();
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    render(
      <PostSubscribeCTA postSlug="home-recent-posts" source="home-recent-posts" />,
    );
    const input = screen.getByPlaceholderText(/enter your email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'a@b.co' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const body = getLastBody(fetchMock);
    expect(body.source).toBe('home-recent-posts');
  });
});

describe('PostSubscribeCTA — className override (AC-2b.6)', () => {
  it('appends caller className via cn(...) onto outer section', () => {
    const { container } = render(
      <PostSubscribeCTA
        postSlug="x"
        className="bg-transparent border-none p-0 my-0"
      />,
    );
    const section = container.querySelector('section');
    const cls = section!.className;
    // Base classes still present
    expect(cls).toContain('rounded-xl');
    // Override classes appended
    expect(cls).toContain('bg-transparent');
    expect(cls).toContain('border-none');
    expect(cls).toContain('p-0');
    expect(cls).toContain('my-0');
  });
});
