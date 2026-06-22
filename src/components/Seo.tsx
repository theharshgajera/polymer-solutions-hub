import { Helmet } from "react-helmet-async";
import { DEFAULT_KEYWORDS, OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/seo";

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
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

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

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad" />
    </Helmet>
  );
};

export default Seo;
