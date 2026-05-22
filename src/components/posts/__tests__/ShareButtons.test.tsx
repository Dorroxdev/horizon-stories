import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { toast } from 'sonner';
import { ShareButtons } from '../ShareButtons';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const originalClipboard = (globalThis.navigator as Navigator).clipboard;

function setClipboard(impl: { writeText: (s: string) => Promise<void> } | undefined) {
  Object.defineProperty(globalThis.navigator, 'clipboard', {
    configurable: true,
    writable: true,
    value: impl,
  });
}

beforeEach(() => {
  vi.mocked(toast.success).mockReset();
  vi.mocked(toast.error).mockReset();
});

afterEach(() => {
  setClipboard(originalClipboard);
  vi.useRealTimers();
});

describe('ShareButtons structure', () => {
  it('renders Twitter, LinkedIn, and Copy controls inside a flex gap-2 container', () => {
    const { container } = render(
      <ShareButtons title="Hello" url="https://horizonlaunchpad.com/posts/hello" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('flex');
    expect(root.className).toContain('gap-2');

    expect(screen.getByRole('link', { name: 'Share on Twitter' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Share on LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy link' })).toBeInTheDocument();
  });

  it('forwards className to the root', () => {
    const { container } = render(
      <ShareButtons title="t" url="u" className="extra-class" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('extra-class');
    expect(root.className).toContain('flex');
  });
});

describe('ShareButtons href encoding', () => {
  it('Twitter href percent-encodes title and url', () => {
    render(<ShareButtons title="Foo & Bar?" url="https://example.com/a b" />);
    const link = screen.getByRole('link', { name: 'Share on Twitter' });
    expect(link.getAttribute('href')).toBe(
      'https://twitter.com/intent/tweet?text=Foo%20%26%20Bar%3F&url=https%3A%2F%2Fexample.com%2Fa%20b',
    );
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('LinkedIn href encodes URL only (no text param)', () => {
    render(
      <ShareButtons
        title="ignored"
        url="https://horizonlaunchpad.com/posts/abc?x=1"
      />,
    );
    const link = screen.getByRole('link', { name: 'Share on LinkedIn' });
    expect(link.getAttribute('href')).toBe(
      'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fhorizonlaunchpad.com%2Fposts%2Fabc%3Fx%3D1',
    );
    expect(link.getAttribute('href')).not.toContain('text=');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });
});

describe('ShareButtons copy behavior', () => {
  it('success path: calls clipboard, toasts success, swaps icon to CheckCheck', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<ShareButtons title="t" url="https://x.test/p" />);
    const btn = screen.getByRole('button', { name: 'Copy link' });
    expect(btn.textContent).toContain('Copy link');

    fireEvent.click(btn);
    await Promise.resolve();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('https://x.test/p');
    expect(vi.mocked(toast.success)).toHaveBeenCalledWith('Link copied');
    expect(vi.mocked(toast.error)).not.toHaveBeenCalled();
    expect(btn.textContent).toContain('Copied');
    expect(btn.getAttribute('aria-label')).toBe('Copy link');
  });

  it('error path: clipboard rejects, toasts error, icon stays Copy', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('nope'));
    setClipboard({ writeText });
    render(<ShareButtons title="t" url="https://x.test/p" />);
    const btn = screen.getByRole('button', { name: 'Copy link' });
    fireEvent.click(btn);
    await Promise.resolve();
    await Promise.resolve();

    expect(vi.mocked(toast.error)).toHaveBeenCalledWith('Could not copy');
    expect(vi.mocked(toast.success)).not.toHaveBeenCalled();
    expect(btn.textContent).toContain('Copy link');
    expect(btn.textContent).not.toContain('Copied');
  });

  it('fallback path: navigator.clipboard undefined → error toast', () => {
    setClipboard(undefined);
    render(<ShareButtons title="t" url="https://x.test/p" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
    expect(vi.mocked(toast.error)).toHaveBeenCalledWith('Could not copy');
    expect(vi.mocked(toast.success)).not.toHaveBeenCalled();
  });

  it('icon reverts to Copy after 2 seconds', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<ShareButtons title="t" url="https://x.test/p" />);
    const btn = screen.getByRole('button', { name: 'Copy link' });
    fireEvent.click(btn);
    // Let the resolved promise chain settle.
    await vi.advanceTimersByTimeAsync(0);
    expect(btn.textContent).toContain('Copied');
    await vi.advanceTimersByTimeAsync(2000);
    expect(btn.textContent).toContain('Copy link');
    expect(btn.textContent).not.toContain('Copied');
  });

  it('rapid double click: single timeout, no crash, icon stays CheckCheck for full 2s after the last click', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<ShareButtons title="t" url="https://x.test/p" />);
    const btn = screen.getByRole('button', { name: 'Copy link' });
    fireEvent.click(btn);
    await vi.advanceTimersByTimeAsync(500);
    fireEvent.click(btn);
    await vi.advanceTimersByTimeAsync(0);
    expect(btn.textContent).toContain('Copied');
    // From the most recent click, 1500ms in: still in copied state (only 1500/2000)
    await vi.advanceTimersByTimeAsync(1500);
    expect(btn.textContent).toContain('Copied');
    // From the most recent click, 2000ms in: should revert
    await vi.advanceTimersByTimeAsync(500);
    expect(btn.textContent).toContain('Copy link');
  });

  it('unmount during pending timer: no React warning, no crash', async () => {
    vi.useFakeTimers();
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    const { unmount } = render(<ShareButtons title="t" url="https://x.test/p" />);
    const btn = screen.getByRole('button', { name: 'Copy link' });
    await act(async () => {
      fireEvent.click(btn);
      await vi.advanceTimersByTimeAsync(0);
    });
    unmount();
    await vi.advanceTimersByTimeAsync(2500);
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });
});
