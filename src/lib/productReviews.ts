// Customer reviews shown on product pages and marked up as Review /
// aggregateRating in the Product JSON-LD.
//
// RULES — these are not stylistic preferences, they are what keeps the markup
// legal and the site out of trouble:
//
//  1. Only publish reviews a real customer actually gave. Never write one, and
//     never "round out" a thin set with invented feedback. Google's structured
//     data policy prohibits it, and fake reviews breach India's CCPA guidelines
//     and BIS IS 19000:2022.
//  2. Every review needs a named author, a date and a rating. Google rejects
//     anonymous review markup, and schema.org requires `author`.
//  3. The review must be visible on the page. Markup that describes content a
//     visitor cannot see is cloaking.
//  4. Light spelling/grammar tidying of a handwritten review is fine. Changing
//     what the customer said is not.
//
// aggregateRating is only emitted for a product once it has at least one
// published review, so a product with no reviews simply omits the property
// rather than shipping a rating of zero.

export type ProductReview = {
  /** Product slug this review is about, or "general" for company-wide feedback. */
  product: string;
  /** Reviewer's name as given. Required — Google rejects anonymous reviews. */
  author: string;
  /** Whole or half stars, 1–5. */
  rating: number;
  /** ISO date (YYYY-MM-DD) the review was given. */
  date: string;
  /** The review text, as the customer wrote it. */
  body: string;
  /** Optional company/city, adds credibility for B2B buyers. */
  organisation?: string;
};

/**
 * Published reviews. Empty until the drafts below have an author, date and
 * rating — see reviewDrafts.
 */
export const productReviews: ProductReview[] = [];

/**
 * Real customer feedback collected on paper that cannot be published yet
 * because Google requires a named author, a date and a star rating.
 *
 * To publish one: fill in author/date/rating and move the entry into
 * productReviews above. Nothing else needs to change — the page section and
 * the JSON-LD pick it up automatically.
 */
export type ReviewDraft = {
  product: string;
  body: string;
  /** Fields still needed before this can go live. */
  needs: Array<"author" | "date" | "rating">;
};

export const reviewDrafts: ReviewDraft[] = [
  // Supplied by the client as customer feedback, mapped to the product page
  // each one refers to. None can be published until a real customer name and
  // date are attached to it — see the rules at the top of this file.
  { product: "general", body: "The price is best in the market.", needs: ["author", "date", "rating"] },
  {
    product: "pps",
    body: "Best quality PPS piston, always available whatever size I ask for.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "nylon-6",
    body: "Excellent finish and accurate dimensions. Perfect for our machining work.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "cast-nylon",
    body: "Very durable material with consistent quality. Delivery was quick every time.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "cast-nylon",
    body: "Long-lasting bushes with excellent wear resistance. Reduced our maintenance cost.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "ptfe",
    body: "The PTFE quality is outstanding and machines smoothly. Highly satisfied.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "ptfe",
    body: "Great chemical resistance and smooth surface finish. Exactly what we needed.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "hdpe",
    body: "Strong material, easy to machine, and supplied exactly to our specifications.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "hdpe",
    body: "Reliable quality and competitive pricing. We've ordered multiple times.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "uhmwpe",
    body: "Excellent wear resistance. Performs really well in heavy-duty applications.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "uhmwpe",
    body: "High-quality material with precise dimensions and fast dispatch.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "delrin",
    body: "Excellent machining quality with tight tolerances. Highly recommended.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "delrin",
    body: "Consistent material quality across every batch we've received.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "pp",
    body: "Good finish, accurate sizing, and always delivered on time.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "pp",
    body: "Great value for industrial applications. Easy to fabricate and install.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "pu",
    body: "Very durable and performs well under continuous load.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "pu",
    body: "Excellent abrasion resistance and premium material quality.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "peek",
    body: "Premium engineering plastic with exceptional quality. Worth the investment.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "peek",
    body: "Perfect for high-temperature applications. Consistent quality every order.",
    needs: ["author", "date", "rating"],
  },
  // Company-wide feedback. Reviews about the business itself, collected on our
  // own site, are not eligible for Google rich results under the self-serving
  // review policy — these can be displayed, but produce no stars in search.
  {
    product: "general",
    body: "Accurate dimensions and excellent fit. Installation was hassle-free.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "general",
    body: "One supplier for every engineering plastic we need. Reliable stock and service.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "general",
    body: "Large size availability and excellent packaging. Material arrived in perfect condition.",
    needs: ["author", "date", "rating"],
  },
  {
    product: "general",
    body: "Precision machining, tight tolerances, and quick turnaround. Great experience.",
    needs: ["author", "date", "rating"],
  },
];

/** Reviews for one product slug (company-wide reviews are not product-specific). */
export const getProductReviews = (slug: string): ProductReview[] =>
  productReviews.filter((r) => r.product === slug);

/**
 * Average rating and count for a product, or null when it has no reviews —
 * in which case no aggregateRating should be emitted at all.
 */
export const getAggregateRating = (
  slug: string
): { ratingValue: number; reviewCount: number } | null => {
  const reviews = getProductReviews(slug);
  if (!reviews.length) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return {
    // One decimal place — Google renders no more than that.
    ratingValue: Math.round((total / reviews.length) * 10) / 10,
    reviewCount: reviews.length,
  };
};
