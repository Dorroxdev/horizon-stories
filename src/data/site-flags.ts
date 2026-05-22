/**
 * Site-wide feature flags. Plain TS module, safe to import from both the Vite
 * app bundle (via `@/data/site-flags`) and Node build scripts (via the relative
 * path `../src/data/site-flags`). Do NOT add Vite-specific imports here
 * (`import.meta.glob` etc.) or the scripts will break.
 */

/**
 * Kill switch for the entire posts surface.
 *
 * When `true` (production / dev):
 *   - `getAllPosts` / `getPostBySlug` / `getPostsByPillar` / `getRecentPosts`
 *     in `lib/posts.ts` all return empty (no posts visible anywhere in the
 *     React app: `/posts` list shows empty state, `/posts/:slug` returns
 *     "Post not found", `HorizonHome`'s RecentPostsSection returns null).
 *   - `scripts/generate-sitemap.ts` ALSO honors this flag and emits
 *     `public/sitemap.xml` + `functions/_posts-manifest.json` WITHOUT any
 *     post URLs / entries (and WITHOUT the `/posts` list URL itself).
 *   - `functions/feed.xml.ts` reads the resulting empty manifest, so
 *     `GET /feed.xml` returns valid-but-itemless RSS XML.
 *
 * Net effect: every public surface that could expose posts is empty.
 *
 * To re-enable posts publicly:
 *   1. Set `POSTS_HIDDEN_DEFAULT` below to `false`
 *   2. Run `npm run build` (the prebuild step regenerates sitemap + manifest)
 *   3. Redeploy via wrangler
 *
 * No other code changes needed. The MDX files in `src/content/posts/` stay
 * version-controlled and intact — they're just not surfaced.
 *
 * Set 2026-05-22: author wants to personalize the launch-slate posts'
 * `[BRACKETED]` placeholders before the posts surface goes live publicly.
 *
 * Test-env override:
 *   Under Vitest (`process.env.VITEST === 'true'`), `POSTS_HIDDEN` is
 *   forced to `false` so the existing test suite (which validates the
 *   un-gated posts pipeline) keeps passing. Tests that specifically want
 *   to validate the `POSTS_HIDDEN=true` behavior should `vi.mock` this
 *   module with `{ POSTS_HIDDEN: true }`.
 */
const POSTS_HIDDEN_DEFAULT = true;

const isVitest =
  typeof process !== 'undefined' &&
  typeof process.env !== 'undefined' &&
  process.env.VITEST === 'true';

export const POSTS_HIDDEN = isVitest ? false : POSTS_HIDDEN_DEFAULT;
