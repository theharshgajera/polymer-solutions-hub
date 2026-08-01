# Multi-Tech Polymers

Marketing site for Multi-Tech Polymers — engineering plastics manufacturer in
Ahmedabad, Gujarat. Vite + React + TypeScript, with an Express backend for
ImageKit images and MongoDB-backed blog posts.

## Development

```bash
npm install
npm run dev          # frontend on :8080
npm run server       # API on :3001
```

## Build

```bash
npm run build
```

This runs three steps:

1. `vite build` — the client bundle.
2. `vite build --ssr src/entry-server.tsx` — an SSR bundle used only at build time.
3. `node scripts/prerender.mjs` — renders all 24 routes to static HTML.

The prerender step is what makes the site indexable. Without it every URL
returns the same `index.html`, so every page ships the homepage's title and a
canonical of `/` — which tells Google the 18 product pages are duplicates of
the homepage. It writes:

- `dist/<route>/index.html` for each route, with that page's own title,
  description, canonical, Open Graph and JSON-LD in the initial HTML
- `dist/sitemap.xml` — all 24 URLs
- `dist/app-shell.html` — a neutral shell for routes that are not prerendered
  (blog detail pages, whose content lives in MongoDB), so they don't advertise
  the homepage's canonical

## Deployment — IMPORTANT

Prerendering produces **directory-style** files: `/products/ptfe` lives at
`dist/products/ptfe/index.html`. The web server must map the clean URL to that
file. If it doesn't, it falls back to `dist/index.html` and every page serves
the homepage again — the exact problem prerendering solves.

Production runs **nginx** in front, serving `dist/` directly and proxying only
`/api` to Node. The `location /` block must be:

```nginx
location / {
    try_files $uri $uri/index.html /app-shell.html;
}

location /api {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

`$uri/index.html` is what serves the prerendered page at the canonical,
slash-free URL. Do **not** use `$uri/` alone — that issues a 301 to a
trailing-slash URL, which then disagrees with the canonical tag.

Apply and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Verify — this must return the product title, not the homepage title:

```bash
curl -s https://multitechpolymers.in/products/ptfe | grep -o '<title>[^<]*'
# <title>PTFE &amp; Teflon Rod, Sheet, Bush Manufacturer in Ahmedabad
```

If the site is ever served by Express instead of nginx, `server/index.js`
already handles this: `express.static(..., { redirect: false })` plus a
fallback that resolves `dist/<path>/index.html` before the shell.

## Product images

Product photos come from ImageKit at runtime. A cached copy of the URLs is
committed at `src/lib/productImages.json` so the prerendered HTML and the
Product JSON-LD carry real images instead of the generic OG fallback. Refresh
it after adding or replacing photos:

```bash
npm run seo:images
```

## SEO content

Search-targeting copy lives in `src/lib/productSeo.ts`, keyed by product slug:
titles, meta descriptions, H1s, synonyms, the typical-properties table, FAQs
and related-product links. `src/lib/products.ts` stays the plain catalogue.

`src/test/productSeo.test.ts` guards the invariants — every product has copy,
titles and descriptions are unique and within length, related links resolve.

```bash
npm test
```
