import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ResourceDetailPage from '../ResourceDetailPage';

function renderAt(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/resources/:slug" element={<ResourceDetailPage />} />
        <Route
          path="/resources/:slug/thank-you"
          element={<div data-testid="thank-you-page">Thank you</div>}
        />
      </Routes>
    </MemoryRouter>,
  );
}

let originalFetch: typeof globalThis.fetch;

beforeEach(() => {
  originalFetch = globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe('ResourceDetailPage — subscribe source forwarding (AC-3d.1, 3d.4)', () => {
  it('POST body contains source="resource-<slug>"', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    renderAt('/resources/saas-validation-toolkit');
    const input = screen.getByPlaceholderText(/enter your email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'a@b.co' } });
    // Submit button lives inside the <form>; the hero CTA is outside any form.
    const form = input.closest('form');
    expect(form).not.toBeNull();
    const submitBtn = form!.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitBtn).not.toBeNull();
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const call = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
    const init = call?.[1] as RequestInit;
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(body.source).toBe('resource-saas-validation-toolkit');
    expect(body.email).toBe('a@b.co');
  });

  it('still navigates to /resources/<slug>/thank-you on subscribe success (AC-3d.3)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;

    renderAt('/resources/saas-validation-toolkit');
    const input = screen.getByPlaceholderText(/enter your email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'a@b.co' } });
    // Submit button lives inside the <form>; the hero CTA is outside any form.
    const form = input.closest('form');
    expect(form).not.toBeNull();
    const submitBtn = form!.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitBtn).not.toBeNull();
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(
      () => {
        expect(screen.getByTestId('thank-you-page')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
