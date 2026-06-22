// Central SEO configuration & JSON-LD structured-data builders for Multi-Tech Polymers.

export const SITE_URL = "https://multitechpolymers.in";
export const SITE_NAME = "Multi-Tech Polymers";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

// Core business facts (kept in one place so structured data stays consistent).
export const BUSINESS = {
  name: SITE_NAME,
  legalName: "Multi-Tech Polymers",
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
  sameAs: [BUSINESS.instagram, BUSINESS.facebook],
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
