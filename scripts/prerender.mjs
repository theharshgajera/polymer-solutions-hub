// Prerenders every static route to real HTML after `vite build`.
//
// Why: the site is a client-rendered SPA, so the server returned the same
// index.html for every URL — every product page shipped the homepage title,
// description and a canonical of "https://multitechpolymers.in/". Google saw 18
// duplicates of the homepage instead of 18 product pages. This writes
// dist/<route>/index.html with that route's own head (title, description,
// canonical, Open Graph, Product/Breadcrumb JSON-LD) and body markup.
//
// Runs as part of `npm run build`; see package.json.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, ".ssr-dist");

const SITE_URL = "https://multitechpolymers.in";
const SITE_NAME = "Multi-Tech Polymers";

const HEAD_START = "<!--seo-head-start-->";
const HEAD_END = "<!--seo-head-end-->";
const ROOT_DIV = '<div id="root"></div>';

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

if (!template.includes(HEAD_START) || !template.includes(HEAD_END)) {
  throw new Error(
    `index.html is missing the ${HEAD_START} / ${HEAD_END} markers — prerendering cannot inject per-page meta tags.`
  );
}
if (!template.includes(ROOT_DIV)) {
  throw new Error(`index.html is missing ${ROOT_DIV} — prerendering cannot inject page markup.`);
}

const { render, prerenderRoutes } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const buildPage = (route) => {
  const { html, head } = render(route);

  if (!head.includes("<title")) {
    throw new Error(`Route ${route} rendered without a <title> — check its <Seo> usage.`);
  }

  const headStart = template.indexOf(HEAD_START);
  const headEnd = template.indexOf(HEAD_END) + HEAD_END.length;

  return (
    template.slice(0, headStart) +
    head +
    template.slice(headEnd)
  ).replace(ROOT_DIV, `<div id="root">${html}</div>`);
};

const outputFor = (route) =>
  route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, ...route.split("/").filter(Boolean), "index.html");

let written = 0;
for (const route of prerenderRoutes) {
  const outFile = outputFor(route);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buildPage(route), "utf8");
  written += 1;
  console.log(`  prerendered ${route.padEnd(28)} -> ${path.relative(root, outFile)}`);
}

// ---------------------------------------------------------------------------
// Fallback shell for routes that are not prerendered — currently blog detail
// pages, whose content lives in MongoDB. Serving dist/index.html for those made
// every blog URL respond with the homepage's title and a canonical of "/". This
// shell carries no page-specific claims, so react-helmet-async supplies the
// real ones on render without a wrong canonical sitting in the raw HTML.
// ---------------------------------------------------------------------------
const shellHead = `<title>${SITE_NAME} — Engineering Plastics Manufacturer in Ahmedabad</title>
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="geo.region" content="IN-GJ" />
    <meta name="geo.placename" content="Ahmedabad" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="en_IN" />`;

const shellHeadStart = template.indexOf(HEAD_START);
const shellHeadEnd = template.indexOf(HEAD_END) + HEAD_END.length;
fs.writeFileSync(
  path.join(distDir, "app-shell.html"),
  template.slice(0, shellHeadStart) + shellHead + template.slice(shellHeadEnd),
  "utf8"
);
console.log("  app-shell.html (fallback for non-prerendered routes)");

// ---------------------------------------------------------------------------
// sitemap.xml
//
// robots.txt has always pointed at /sitemap.xml, but no such file existed — the
// SPA fallback answered with HTML, so Google could not read a sitemap at all.
// Writing a real file guarantees it is served whatever the host does with
// unknown paths. Blog URLs are added at runtime by the Express route in
// server/index.js when that server handles the request.
// ---------------------------------------------------------------------------
const lastmod = new Date().toISOString().slice(0, 10);

const sitemapMeta = (route) => {
  if (route === "/") return { priority: "1.0", changefreq: "weekly" };
  if (route === "/products") return { priority: "0.9", changefreq: "weekly" };
  if (route.startsWith("/products/")) return { priority: "0.8", changefreq: "monthly" };
  if (route === "/blogs") return { priority: "0.7", changefreq: "weekly" };
  if (route === "/about" || route === "/industries") return { priority: "0.7", changefreq: "monthly" };
  return { priority: "0.6", changefreq: "monthly" };
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${prerenderRoutes
  .map((route) => {
    const { priority, changefreq } = sitemapMeta(route);
    const loc = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
console.log(`  sitemap.xml with ${prerenderRoutes.length} URLs`);

// The SSR bundle is a build artefact only — keep it out of the deployed dist.
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`\n✓ Prerendered ${written} routes to static HTML.`);
