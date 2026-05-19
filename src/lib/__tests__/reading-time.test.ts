import { describe, expect, it } from 'vitest';
import { countWords, readingTimeMinutes } from '../reading-time';

describe('countWords', () => {
  it('handles empty strings', () => {
    expect(countWords('')).toBe(0);
  });

  it('handles whitespace-only strings', () => {
    expect(countWords('   \n\t  ')).toBe(0);
  });

  it('counts mixed whitespace correctly', () => {
    expect(countWords('hello\nworld\t  foo   bar')).toBe(4);
  });

  it('counts markdown tokens as words (no stripping)', () => {
    // ## + Heading + ** + bold + ** = tokens with spaces between them
    expect(countWords('## Heading **bold** word')).toBe(4);
  });
});

describe('readingTimeMinutes', () => {
  it('floors empty string to 1 minute', () => {
    expect(readingTimeMinutes('')).toBe(1);
  });

  it('returns 1 minute for 220 words (exact WPM)', () => {
    const text = Array(220).fill('word').join(' ');
    expect(readingTimeMinutes(text)).toBe(1);
  });

  it('returns 2 minutes for 221 words (boundary)', () => {
    const text = Array(221).fill('word').join(' ');
    expect(readingTimeMinutes(text)).toBe(2);
  });

  it('returns 5 minutes for 1100 words', () => {
    const text = Array(1100).fill('word').join(' ');
    expect(readingTimeMinutes(text)).toBe(5);
  });

  it('handles mixed whitespace correctly', () => {
    // 5 words across mixed whitespace
    expect(readingTimeMinutes('hello\nworld\t  foo   bar baz')).toBe(1);
  });

  it('counts markdown tokens as words (no stripping)', () => {
    // 4 words with markdown tokens
    expect(readingTimeMinutes('## Heading **bold** word')).toBe(1);
  });
});
