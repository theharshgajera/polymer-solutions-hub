// Verified reviews from the Google Business Profile, transcribed 2 Aug 2026.
//
// WHY THESE ARE NOT MARKED UP AS SCHEMA
// Google's review-snippet policy forbids aggregating reviews collected on
// another site into your own structured data, and reviews about the business
// itself are excluded as self-serving. So these are displayed as attributed
// testimonials — real social proof for visitors — with no Review or
// aggregateRating JSON-LD. First-party reviews collected on this site would be
// eligible; see src/lib/productReviews.ts for that path.
//
// RULES:
//  1. Verbatim. Spelling and phrasing are exactly as the customer wrote them
//     ("ready stoke", "road" for rod, "darling" for Delrin). Tidying them up
//     would misrepresent what was said and makes the testimonials read as
//     manufactured.
//  2. Attribution is mandatory — every quote is shown with the reviewer's name
//     and a link to the Google profile, so anyone can verify it.
//  3. Dates are approximate: Google shows "2 months ago", not a date. Displayed
//     as month and year only, never as a precise day.

export type GoogleReview = {
  /** Reviewer name exactly as shown on Google. */
  author: string;
  /** Approximate month the review was left, derived from Google's relative date. */
  date: string;
  /** The review, verbatim. */
  body: string;
  /** Product slugs the review explicitly mentions. */
  products: string[];
  /** Google "Local Guide" badge — a small credibility signal. */
  localGuide?: boolean;
  /** Google auto-translated this review from another language. */
  translatedFrom?: string;
};

export const googleReviews: GoogleReview[] = [
  {
    author: "narendra prajapati",
    date: "2026-07",
    body: "Best quality material suppliers of teflon nylon pom pp material in ahmedabad",
    products: ["ptfe", "nylon-6", "delrin", "pp"],
  },
  {
    author: "PARESH MODI SHIV ENG WORK (CastNylon Mfg)",
    date: "2026-07",
    body: "Doing great business every item ready stock fast delivery. Pp , nylon , DELRIN",
    products: ["pp", "nylon-6", "cast-nylon", "delrin"],
  },
  {
    author: "Kirit Patel",
    date: "2026-07",
    body: "Best quality nylon rod supplier ahmedabad",
    products: ["nylon-6", "cast-nylon"],
  },
  {
    author: "Abdullah Solanki",
    date: "2026-07",
    body: "Best quality pp material supplier in Ahmedabad",
    products: ["pp"],
  },
  {
    author: "parth dodiya",
    date: "2026-07",
    body: "Best cast nylon supplier",
    products: ["cast-nylon"],
    localGuide: true,
  },
  {
    author: "Ashish Panchal",
    date: "2026-06",
    body: "Genuine quality material provided by multitech he has all types of industrial plastic components available must recomended and ready stoke everytime",
    products: [],
  },
  {
    author: "Kiran Thakor",
    date: "2026-04",
    body: "I get p.p and cast nylon road at the best price. Multi-tech is the best shop for me in Bhaffar and I buy everything from here.",
    products: ["pp", "cast-nylon"],
    translatedFrom: "Hindi",
  },
  {
    author: "ROHIT GAMING",
    date: "2026-04",
    body: "One of the best road is available in multi-tech p.p and nylon+cast nylon or darling teflon is also available in good price all of you come here and try one, it will be best for you multi tech rakhiyal four road gayatri chamber..",
    products: ["pp", "nylon-6", "cast-nylon", "ptfe"],
    translatedFrom: "Hindi",
  },
  {
    author: "manish parmar",
    date: "2026-06",
    body: "Good service",
    products: [],
    localGuide: true,
  },
  {
    author: "Komal Panchal",
    date: "2026-06",
    body: "Good service",
    products: [],
    localGuide: true,
  },
];

/**
 * Reviews that mention a given product, longest first so the most substantive
 * quote leads. Returns an empty array when nothing mentions it — the section
 * then renders nothing rather than padding with generic praise.
 */
export const getGoogleReviewsFor = (slug: string, limit = 3): GoogleReview[] =>
  googleReviews
    .filter((r) => r.products.includes(slug))
    .sort((a, b) => b.body.length - a.body.length)
    .slice(0, limit);

/** The most substantial reviews, for the homepage. */
export const getFeaturedGoogleReviews = (limit = 6): GoogleReview[] =>
  [...googleReviews].sort((a, b) => b.body.length - a.body.length).slice(0, limit);

/** "July 2026" — month precision only, since Google gives relative dates. */
export const formatReviewDate = (date: string): string =>
  new Date(`${date}-01T00:00:00Z`).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
