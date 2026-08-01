// Caches each product's ImageKit image URLs into src/lib/productImages.json.
//
// Product images are fetched from /api/images in the browser, which means the
// prerendered HTML shipped no <img> tags and the Product JSON-LD fell back to
// the generic OG image. Baking a cached list in gives crawlers real product
// images in the initial response; the runtime fetch still refreshes them, so a
// stale entry self-corrects on load.
//
// Run manually after adding or replacing product photos:
//   npm run seo:images
//
// Network failures are non-fatal: the existing cache is kept.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outFile = path.join(root, "src", "lib", "productImages.json");

const API_BASE = process.env.SEO_IMAGE_API || "https://multitechpolymers.in";

// Read the slugs straight out of the catalogue so the two can't drift.
const productsSrc = fs.readFileSync(path.join(root, "src", "lib", "products.ts"), "utf8");
const slugs = [...productsSrc.matchAll(/^\s{4}id: "([a-z0-9-]+)",$/gm)].map((m) => m[1]);

if (!slugs.length) {
  console.error("✗ No product slugs found in src/lib/products.ts — cache not updated.");
  process.exit(1);
}

const existing = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, "utf8")) : {};
const result = { ...existing };
let updated = 0;
let failed = 0;

for (const slug of slugs) {
  try {
    const res = await fetch(`${API_BASE}/api/images?folder=/products/${slug}`, {
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const urls = (Array.isArray(data) ? data : [])
      .map((img) => img?.url)
      .filter((u) => typeof u === "string" && u.startsWith("http"));
    result[slug] = urls;
    updated += 1;
    console.log(`  ${slug.padEnd(16)} ${urls.length} image(s)`);
  } catch (err) {
    failed += 1;
    console.warn(`  ${slug.padEnd(16)} failed (${err.message}) — keeping cached value`);
  }
}

fs.writeFileSync(outFile, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(`\n✓ Cached images for ${updated}/${slugs.length} products${failed ? ` (${failed} failed)` : ""} -> ${path.relative(root, outFile)}`);
