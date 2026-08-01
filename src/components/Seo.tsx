import { Helmet } from "react-helmet-async";
import {
  DEFAULT_KEYWORDS,
  OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/seo";

type SeoProps = {
  title: string;
  description: string;
  /** Path beginning with "/" — used for the canonical URL. */
  path?: string;
  keywords?: string;
  image?: string;
  /** "website" | "article" etc. */
  type?: string;
  /** One or more JSON-LD objects to inject. */
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

/**
 * Every tag here is rendered into the static HTML at build time by
 * scripts/prerender.mjs (it replaces the marked block in index.html), so
 * crawlers see the correct per-page head without executing JavaScript.
 */
const Seo = ({
  title,
  description,
  path = "/",
  keywords = DEFAULT_KEYWORDS,
  image = OG_IMAGE,
  type = "website",
  schema,
  noindex = false,
}: SeoProps) => {
  const canonical = absoluteUrl(path);
  const pageSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  // The business + website entities are emitted on every indexable page so the
  // "@id" references used by Product/Breadcrumb markup always resolve, and so
  // local-business signals are present site-wide. De-duplicated by @id in case
  // a page passes them explicitly.
  const baseSchemas = noindex ? [] : [localBusinessSchema(), websiteSchema()];
  const seen = new Set<string>();
  const schemas = [...baseSchemas, ...pageSchemas].filter((s) => {
    const id = typeof s["@id"] === "string" ? (s["@id"] as string) : null;
    if (!id) return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo — repeated here because the prerenderer replaces the whole head block */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad" />
      <meta name="geo.position" content="23.013806;72.624597" />
      <meta name="ICBM" content="23.013806, 72.624597" />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
