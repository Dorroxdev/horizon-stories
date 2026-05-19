const WPM = 220;

export function countWords(input: string): number {
  return input.trim().split(/\s+/).filter(Boolean).length;
}

export function readingTimeMinutes(input: string): number {
  const words = countWords(input);
  return Math.max(1, Math.ceil(words / WPM));
}
