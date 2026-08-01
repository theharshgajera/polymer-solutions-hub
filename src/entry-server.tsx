// Build-time entry used by scripts/prerender.mjs.
//
// The public site is a static SPA, so without this every URL shipped the same
// homepage <head> — identical title, description and, critically, a canonical
// pointing at "/". That told Google all 18 product pages were duplicates of the
// homepage. Rendering each route to static HTML at build time puts the correct
// title, canonical and Product JSON-LD in the initial response.

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import AppRoutes from "./AppRoutes";
import { rawProducts } from "./lib/products";

/**
 * Routes rendered to static HTML. Blog detail pages are excluded because their
 * content lives in MongoDB and is fetched at runtime; /admin is excluded
 * deliberately (it is noindex and behind a password).
 */
export const prerenderRoutes: string[] = [
  "/",
  "/about",
  "/products",
  ...rawProducts.map((p) => `/products/${p.id}`),
  "/industries",
  "/blogs",
  "/contact",
];

export function render(url: string): { html: string; head: string } {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  const head = [helmet?.title, helmet?.meta, helmet?.link, helmet?.script]
    .filter(Boolean)
    .map((tag) => tag!.toString())
    .filter(Boolean)
    .join("\n    ");

  return { html, head };
}
