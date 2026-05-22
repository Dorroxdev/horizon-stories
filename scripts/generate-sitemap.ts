import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { resources } from '../src/data/resources';
import { pillars, type PillarSlug } from '../src/data/pillars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const SITE = 'https://horizonlaunchpad.com';

export interface PostManifestEntry {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  pillar: string;
  pillarLabel: string;
}

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq?: string;
  priority?: string;
}

interface RawFrontmatter {
  slug?: unknown;
  title?: unknown;
  excerpt?: unknown;
  pillar?: unknown;
  publishedAt?: unknown;
  updatedAt?: unknown;
  draft?: unknown;
}

interface GenerateOptions {
  postsDir: string;
  today?: string;
}

interface GenerateResult {
  xml: string;
  manifest: PostManifestEntry[];
  urls: SitemapUrl[];
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function staticUrls(today: string): SitemapUrl[] {
  return [
    { loc: `${SITE}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE}/posts`, lastmod: today, changefreq: 'daily', priority: '0.9' },
    { loc: `${SITE}/resources`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
  ];
}

function resourceUrls(today: string): SitemapUrl[] {
  return resources.map((r) => ({
    loc: `${SITE}/resources/${r.slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7',
  }));
}

function readPostsFromDir(postsDir: string): {
  manifest: PostManifestEntry[];
  urls: SitemapUrl[];
} {
  const manifest: PostManifestEntry[] = [];
  const urls: SitemapUrl[] = [];
  let files: string[] = [];
  try {
    files = readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
  } catch {
    return { manifest, urls };
  }
  for (const f of files) {
    const raw = readFileSync(resolve(postsDir, f), 'utf-8');
    const parsed = matter(raw);
    const data = parsed.data as RawFrontmatter;
    if (data.draft === true) continue;
    const slug = asString(data.slug);
    const title = asString(data.title);
    const excerpt = asString(data.excerpt);
    const pillarSlug = asString(data.pillar) as PillarSlug;
    const publishedAt = asString(data.publishedAt);
    const updatedAt =
      typeof data.updatedAt === 'string' ? data.updatedAt : undefined;
    const pillarLabel = pillars[pillarSlug]?.label ?? asString(data.pillar);
    if (!slug || !publishedAt) continue;
    manifest.push({
      slug,
      title,
      excerpt,
      publishedAt,
      ...(updatedAt ? { updatedAt } : {}),
      pillar: asString(data.pillar),
      pillarLabel,
    });
    urls.push({
      loc: `${SITE}/posts/${slug}`,
      lastmod: updatedAt ?? publishedAt,
      changefreq: 'monthly',
      priority: '0.7',
    });
  }
  return { manifest, urls };
}

function buildXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((u) => {
      const lines = [
        `    <loc>${u.loc}</loc>`,
        `    <lastmod>${u.lastmod}</lastmod>`,
      ];
      if (u.changefreq) lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
      if (u.priority) lines.push(`    <priority>${u.priority}</priority>`);
      return `  <url>\n${lines.join('\n')}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/**
 * Pure generator — testable. Reads MDX files from `opts.postsDir`,
 * builds the manifest + URL list + XML string, returns them.
 */
export function generateSitemap(opts: GenerateOptions): GenerateResult {
  const today = opts.today ?? new Date().toISOString().split('T')[0];
  const { manifest, urls: postUrls } = readPostsFromDir(opts.postsDir);
  const urls: SitemapUrl[] = [
    ...staticUrls(today),
    ...resourceUrls(today),
    ...postUrls,
  ];
  const xml = buildXml(urls);
  return { xml, manifest, urls };
}

function main(): void {
  const postsDir = resolve(__dirname, '../src/content/posts');
  const sitemapOut = resolve(__dirname, '../public/sitemap.xml');
  const manifestOut = resolve(__dirname, '../functions/_posts-manifest.json');
  const { xml, manifest, urls } = generateSitemap({ postsDir });

  // Ensure functions/ exists (it always should, but be defensive)
  mkdirSync(dirname(manifestOut), { recursive: true });
  writeFileSync(sitemapOut, xml, 'utf-8');
  writeFileSync(manifestOut, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

  // eslint-disable-next-line no-console
  console.log(`Wrote ${urls.length} URLs to ${sitemapOut}`);
  // eslint-disable-next-line no-console
  console.log(`Wrote ${manifest.length} manifest entries to ${manifestOut}`);
}

// Run main() unless we're inside vitest (VITEST=true is set automatically by
// vitest worker bootstrap) or the explicit SITEMAP_SKIP_MAIN sentinel is set.
// Entry-point detection via `import.meta.url === file://${argv[1]}` is
// unreliable across tsx versions, so we gate on env instead.
if (
  process.env.VITEST !== 'true' &&
  process.env.SITEMAP_SKIP_MAIN !== '1'
) {
  main();
}
