// Central SEO configuration & JSON-LD structured-data builders for Multi-Tech Polymers.

export const SITE_URL = "https://multitechpolymers.in";
export const SITE_NAME = "Multi-Tech Polymers";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

// Core business facts (kept in one place so structured data stays consistent).
export const BUSINESS = {
  name: SITE_NAME,
  legalName: "Multi-Tech Polymers",
  /** Every name the business trades under, including the Google listing name. */
  alternateNames: ["Multi-Tech", "Multitech", "Multi-Tech Polymers Ahmedabad", "મલ્ટિ-ટેક"],
  founder: "Ritesh Panchal",
  foundingDate: "2006",
  phone: "+91 98984 70707",
  phoneHref: "+919898470707",
  email: "multitech9@rediffmail.com",
  gst: "24AOOPP6539H1ZH",
  street: "3, Gayatri Chamber, Near Gravity Estate, Kevalkanta Ajod Dairy Road, Rakhial",
  city: "Ahmedabad",
  state: "Gujarat",
  postalCode: "380023",
  country: "IN",
  latitude: 23.013806,
  longitude: 72.624597,
  instagram: "https://www.instagram.com/multi.tech3/",
  facebook: "https://www.facebook.com/share/1Groz49Thj/?mibextid=wwXIfr",
  mapUrl: "https://maps.app.goo.gl/",
  // Google Business Profile — listed in sameAs so Google can tie the site to
  // the verified listing, and linked from the reviews section.
  googleMaps:
    "https://www.google.com/maps/place/Multi-Tech+(Multitech)/@23.0138408,72.6269831,17z/data=!4m6!3m5!1s0x395e86872fffffff:0xd7576ed854a038a!8m2!3d23.0138408!4d72.6269831!16s%2Fg%2F1vpfgyyz",
  /** Rating shown on the Google Business Profile, verified 2 Aug 2026. */
  googleRating: 4.8,
};

// High-value keywords (used as a sensible default; pages should override with focused terms).
export const DEFAULT_KEYWORDS = [
  "PTFE manufacturer Ahmedabad",
  "Teflon supplier Gujarat",
  "PTFE rod",
  "PTFE sheet",
  "Teflon rod",
  "Teflon sheet",
  "Nylon rod",
  "Cast Nylon rod",
  "Delrin rod",
  "POM sheet",
  "PEEK rod",
  "UHMWPE sheet",
  "engineering plastics manufacturer Ahmedabad",
  "engineering plastics supplier Gujarat",
].join(", ");

/**
 * Trim a meta description to the length Google renders without cutting a word
 * (or a phone number) in half.
 */
export const clampDescription = (text: string, max = 160): string => {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:—-]+$/, "")}…`;
};

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || SITE_URL;

type Json = Record<string, unknown>;

// LocalBusiness / Organization — describes the company, address & contact to Google.
export const localBusinessSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  // The business trades under several names — the Google Business Profile is
  // listed as "Multi-Tech (Multitech) મલ્ટિ-ટેક" while the site uses
  // "Multi-Tech Polymers". Declaring them all lets Google resolve the site and
  // the verified listing to one entity instead of treating them as separate
  // businesses, and helps the Gujarati name match vernacular searches.
  alternateName: BUSINESS.alternateNames,
  url: SITE_URL,
  logo: LOGO_URL,
  image: OG_IMAGE,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  founder: { "@type": "Person", name: BUSINESS.founder },
  foundingDate: BUSINESS.foundingDate,
  priceRange: "₹₹",
  vatID: BUSINESS.gst,
  areaServed: [
    { "@type": "City", name: "Ahmedabad" },
    { "@type": "State", name: "Gujarat" },
    { "@type": "Country", name: "India" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.state,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  // Mirrors the hours published on the Google Business Profile — keep the two
  // in step, since a mismatch between site and GBP weakens local signals.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  sameAs: [BUSINESS.instagram, BUSINESS.facebook, BUSINESS.googleMaps],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS.phone,
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["en", "hi", "gu"],
  },
});

// WebSite schema (helps Google understand the site).
export const websiteSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#business` },
});

// Breadcrumbs for a page.
export const breadcrumbSchema = (items: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

// FAQ schema — eligible for FAQ rich results.
export const faqSchema = (faqs: { q: string; a: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

// Single Product — for an individual product page.
//
// Google's Product rich result requires one of `offers`, `review` or
// `aggregateRating`. Each is emitted only when real data backs it:
//   - `offers`      when src/lib/productPricing.ts has an honourable price
//   - `review` /
//     `aggregateRating` when src/lib/productReviews.ts has genuine, published
//                       reviews that are also visible on the page
// With none of them the page still indexes and ranks normally; it is simply
// not eligible for the price/star snippet. Search Console reports that as a
// critical enhancement issue, which is expected for a quote-based business and
// must never be "fixed" by inventing prices or reviews.
export const productSchema = (p: {
  id: string;
  name: string;
  desc: string;
  items?: string[];
  images?: string[];
  metaDescription?: string;
  /** Search synonyms for the material, e.g. "Teflon" for PTFE. */
  alsoKnownAs?: string[];
  /** Typical published properties — emitted as PropertyValue pairs. */
  specs?: { label: string; value: string }[];
  keywords?: string;
  /** Real, honourable pricing. Omit for quote-only products. */
  pricing?: {
    lowPrice: number;
    highPrice?: number;
    unit: string;
    priceValidUntil: string;
  };
  /** Genuine customer reviews that are also rendered on the page. */
  reviews?: {
    author: string;
    rating: number;
    date: string;
    body: string;
    organisation?: string;
  }[];
  /** Average of those reviews. Pass null/undefined when there are none. */
  aggregateRating?: { ratingValue: number; reviewCount: number } | null;
}): Json => {
  const properties = [
    ...(p.specs?.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })) ?? []),
    ...(p.items?.map((i) => ({
      "@type": "PropertyValue",
      name: "Available Form",
      value: i,
    })) ?? []),
  ];

  const material = p.specs?.find((s) => s.label === "Material")?.value;
  const productUrl = absoluteUrl(`/products/${p.id}`);

  // Always AggregateOffer, never a single Offer. Engineering plastics are
  // quoted per kg across grades and sizes, so there is no one price — and
  // `lowPrice` alone correctly reads as "from ₹X". Emitting a bare Offer would
  // assert an exact price the customer may not get, which is a misleading
  // offer regardless of how the figure was arrived at. `highPrice` is included
  // only when a genuine upper bound is known.
  const offers = p.pricing
    ? {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: p.pricing.lowPrice,
        ...(p.pricing.highPrice && p.pricing.highPrice !== p.pricing.lowPrice
          ? { highPrice: p.pricing.highPrice }
          : {}),
        priceValidUntil: p.pricing.priceValidUntil,
        availability: "https://schema.org/InStock",
        url: productUrl,
        seller: { "@id": `${SITE_URL}/#business` },
      }
    : null;

  const reviews = p.reviews?.length
    ? p.reviews.map((r) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: r.author,
          ...(r.organisation ? { worksFor: { "@type": "Organization", name: r.organisation } } : {}),
        },
        datePublished: r.date,
        reviewBody: r.body,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
      }))
    : null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(`/products/${p.id}`)}#product`,
    name: p.name,
    description: p.metaDescription || p.desc,
    image: p.images && p.images.length ? p.images : [OG_IMAGE],
    sku: p.id,
    category: "Engineering Plastics",
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": `${SITE_URL}/#business` },
    url: absoluteUrl(`/products/${p.id}`),
    ...(p.alsoKnownAs && p.alsoKnownAs.length ? { alternateName: p.alsoKnownAs } : {}),
    ...(material ? { material } : {}),
    ...(p.keywords ? { keywords: p.keywords } : {}),
    ...(properties.length ? { additionalProperty: properties } : {}),
    ...(offers ? { offers } : {}),
    ...(reviews ? { review: reviews } : {}),
    ...(p.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: p.aggregateRating.ratingValue,
            reviewCount: p.aggregateRating.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    audience: { "@type": "Audience", audienceType: "Industrial and manufacturing buyers" },
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
  };
};

// ItemList of products (for the Products page).
export const productListSchema = (
  products: { name: string; description: string; path?: string }[]
): Json => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Engineering Plastics Products",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.description,
      brand: { "@type": "Brand", name: SITE_NAME },
      manufacturer: { "@id": `${SITE_URL}/#business` },
      areaServed: "Ahmedabad, Gujarat, India",
      ...(p.path ? { url: absoluteUrl(p.path) } : {}),
    },
  })),
});
