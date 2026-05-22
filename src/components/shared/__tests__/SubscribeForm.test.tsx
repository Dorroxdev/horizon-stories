import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SubscribeForm from '../SubscribeForm';

function makeFetchMock(ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => ({ success: ok }),
  });
}

function getLastFetchBody(fetchMock: ReturnType<typeof vi.fn>): Record<string, unknown> {
  const call = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
  expect(call).toBeDefined();
  const init = call?.[1] as RequestInit | undefined;
  expect(init?.body).toBeDefined();
  return JSON.parse(init!.body as string) as Record<string, unknown>;
}

async function submitWithEmail(email: string) {
  const input = screen.getByPlaceholderText(/enter your email/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value: email } });
  // Submit via the surrounding <form> (button is type="submit")
  const button = screen.getByRole('button');
  fireEvent.click(button);
}

let originalFetch: typeof globalThis.fetch;

beforeEach(() => {
  originalFetch = globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe('SubscribeForm — source prop forwarding (AC-1a.1–1a.5)', () => {
  it('includes source in POST body when source is provided as a non-empty string', async () => {
    const fetchMock = makeFetchMock();
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    render(<SubscribeForm source="post-test-slug" />);
    await act(async () => {
      await submitWithEmail('a@b.co');
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const body = getLastFetchBody(fetchMock);
    expect(body).toEqual({ email: 'a@b.co', source: 'post-test-slug' });
  });

  it('excludes source key entirely when source prop is omitted', async () => {
    const fetchMock = makeFetchMock();
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    render(<SubscribeForm />);
    await act(async () => {
      await submitWithEmail('a@b.co');
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const body = getLastFetchBody(fetchMock);
    expect('source' in body).toBe(false);
    expect(body).toEqual({ email: 'a@b.co' });
  });

  it('excludes source key when source is empty string', async () => {
    const fetchMock = makeFetchMock();
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    render(<SubscribeForm source="" />);
    await act(async () => {
      await submitWithEmail('a@b.co');
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const body = getLastFetchBody(fetchMock);
    expect('source' in body).toBe(false);
  });

  it('excludes source key when source is explicitly undefined', async () => {
    const fetchMock = makeFetchMock();
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    render(<SubscribeForm source={undefined} />);
    await act(async () => {
      await submitWithEmail('a@b.co');
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const body = getLastFetchBody(fetchMock);
    expect('source' in body).toBe(false);
  });

  it('renders the same DOM (email input + Subscribe button) regardless of source prop', () => {
    const { rerender } = render(<SubscribeForm />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<SubscribeForm source="some-source" />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onSuccess (with source still forwarded) after successful submit', async () => {
    const fetchMock = makeFetchMock();
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;
    const onSuccess = vi.fn();

    render(<SubscribeForm source="resource-x" onSuccess={onSuccess} />);
    await act(async () => {
      await submitWithEmail('a@b.co');
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const body = getLastFetchBody(fetchMock);
    expect(body.source).toBe('resource-x');

    // onSuccess fires after ~800ms timeout — wait for it
    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
      },
      { timeout: 2000 },
    );
  });
});
