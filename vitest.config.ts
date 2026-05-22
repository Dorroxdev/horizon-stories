import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

// See vite.config.ts for the same plugin — duplicated here so that
// `import.meta.glob('*.mdx', { query: '?raw' })` resolves to raw source
// strings during Vitest runs as well as Vite builds.
function mdxRawLoader() {
  const projectRoot = path.resolve(__dirname);
  const srcRoot = path.resolve(__dirname, "src");
  const VIRTUAL_PREFIX = "\0mdx-raw:";
  return {
    name: "mdx-raw-loader",
    enforce: "pre" as const,
    resolveId(source: string, importer: string | undefined) {
      if (source.startsWith(VIRTUAL_PREFIX)) return source;
      if (!source.endsWith(".mdx?raw") && !source.endsWith(".mdx?raw&inline")) {
        return null;
      }
      const idNoQuery = source.replace(/\?raw(&inline)?$/, "");
      let absolutePath: string | null = null;
      if (path.isAbsolute(idNoQuery) && fs.existsSync(idNoQuery)) {
        absolutePath = idNoQuery;
      } else if (idNoQuery.startsWith("/")) {
        const candidates = [
          path.join(projectRoot, idNoQuery),
          path.join(srcRoot, idNoQuery.replace(/^\//, "")),
        ];
        absolutePath = candidates.find((p) => fs.existsSync(p)) ?? null;
      } else if (importer) {
        const candidate = path.resolve(path.dirname(importer), idNoQuery);
        if (fs.existsSync(candidate)) absolutePath = candidate;
      }
      if (!absolutePath) {
        throw new Error(`[mdx-raw-loader] cannot resolve ${source}`);
      }
      return VIRTUAL_PREFIX + absolutePath + "?raw";
    },
    load(id: string) {
      if (!id.startsWith(VIRTUAL_PREFIX)) return null;
      const rawId = id.slice(VIRTUAL_PREFIX.length);
      const idNoQuery = rawId.replace(/\?raw(&inline)?$/, "");
      const source = fs.readFileSync(idNoQuery, "utf-8");
      return `export default ${JSON.stringify(source)};`;
    },
  };
}

export default defineConfig({
  plugins: [
    mdxRawLoader(),
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
