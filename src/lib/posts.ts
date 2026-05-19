import type { ComponentType } from 'react';
import { z } from 'zod';
import { pillarSlugs } from '@/data/pillars';
import { resources } from '@/data/resources';
import { readingTimeMinutes } from './reading-time';

const validResourceSlugs = new Set(resources.map((r) => r.slug));

export const PostFrontmatter = z.object({
  title: z.string().min(1).max(120),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(40).max(280),
  pillar: z.enum(pillarSlugs as [string, ...string[]]),
  publishedAt: z.string().date(),
  updatedAt: z.string().date().optional(),
  ogImage: z.string().optional(),
  relatedResource: z.string().optional()
    .refine(
      (slug) => !slug || validResourceSlugs.has(slug),
      { message: 'relatedResource must reference an existing resource slug from src/data/resources.ts' }
    ),
  draft: z.boolean().default(false),
  authorName: z.string().default('Altan Doyran'),
  authorBio: z.string().optional(),
});

export type PostFrontmatterT = z.infer<typeof PostFrontmatter>;

export interface Post extends PostFrontmatterT {
  readingTime: number;
  wordCount: number;
  body: ComponentType;
  filePath: string;
}

export function parsePost(frontmatter: unknown): PostFrontmatterT {
  return PostFrontmatter.parse(frontmatter);
}

export function sortByPublishedAtDesc<T extends { publishedAt: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

interface RawMdxModule {
  default: ComponentType;
  frontmatter: unknown;
}

const rawModules = import.meta.glob<RawMdxModule>(
  '/src/content/posts/*.mdx',
  { eager: true }
);

function loadPosts(): Post[] {
  const seen = new Set<string>();
  const posts: Post[] = [];
  for (const [filePath, mod] of Object.entries(rawModules)) {
    const parsed = PostFrontmatter.safeParse(mod.frontmatter);
    if (!parsed.success) {
      throw new Error(`[posts] Invalid frontmatter in ${filePath}: ${parsed.error.message}`);
    }
    const fm = parsed.data;
    if (seen.has(fm.slug)) {
      throw new Error(`[posts] Duplicate slug "${fm.slug}" in ${filePath}`);
    }
    seen.add(fm.slug);
    const wordCount = 0;
    const readingTime = Math.max(3, readingTimeMinutes(fm.excerpt));
    posts.push({
      ...fm,
      body: mod.default,
      readingTime,
      wordCount,
      filePath,
    });
  }
  return sortByPublishedAtDesc(posts);
}

const allPosts = loadPosts();
const publishedPosts = allPosts.filter((p) => !p.draft);

export function getAllPosts(includeDrafts = false): Post[] {
  return includeDrafts ? allPosts : publishedPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts(true).find((p) => p.slug === slug);
}

export function getPostsByPillar(pillar: string): Post[] {
  return publishedPosts.filter((p) => p.pillar === pillar);
}

export function getRecentPosts(n: number): Post[] {
  return publishedPosts.slice(0, n);
}
