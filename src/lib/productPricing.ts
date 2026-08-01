// Indicative pricing used to emit `offers` in the Product JSON-LD.
//
// Google's Product rich result needs `offers`, `review` or `aggregateRating`.
// Without one of them the page still indexes and ranks normally — it just is
// not eligible for the price/rating snippet. See the note in seo.ts.
//
// RULES:
//  1. Only enter prices the business will actually honour. A price in JSON-LD
//     is a public quote; if the SERP shows a figure the customer cannot get,
//     that is a misleading offer and Google can demote or penalise for it.
//  2. Engineering plastics are quoted per kg / per sheet and move with resin
//     rates, so prefer a RANGE (AggregateOffer) over a single price and revisit
//     it periodically. `priceValidUntil` makes the freshness explicit.
//  3. A product with no entry here simply omits `offers`. That is the correct
//     state for anything genuinely quote-only.

export type ProductPricing = {
  /** Lowest price actually offered, in INR. */
  lowPrice: number;
  /** Highest price actually offered, in INR. Omit for a single fixed price. */
  highPrice?: number;
  /** What the price is per — shown on the page, e.g. "per kg", "per sheet". */
  unit: string;
  /** ISO date (YYYY-MM-DD) after which the quote should be re-checked. */
  priceValidUntil: string;
};

/**
 * Keyed by product slug. Adding an entry automatically adds `offers` to that
 * product's JSON-LD and a price line on the page; omitting one leaves the
 * product quote-only.
 *
 * Figures confirmed by Multi-Tech on 2 Aug 2026 as matching their own selling
 * prices. `priceValidUntil` is set six months out because resin rates move —
 * re-confirm the numbers before that date rather than letting them go stale.
 */
export const productPricing: Record<string, ProductPricing> = {
  ptfe: {
    // Virgin PTFE starts here; filled grades (glass, carbon, bronze, SS, PEEK)
    // run higher, so no upper bound is claimed.
    lowPrice: 860,
    unit: "per kg",
    priceValidUntil: "2027-02-28",
  },
  "cast-nylon": {
    lowPrice: 250,
    highPrice: 300,
    unit: "per kg",
    priceValidUntil: "2027-02-28",
  },
  "nylon-6": {
    // Extruded PA6 sits at the lower end of the cast-nylon band.
    lowPrice: 250,
    unit: "per kg",
    priceValidUntil: "2027-02-28",
  },
  uhmwpe: {
    // Wide spread: sheet grades from 160, rod and premium grades to 350.
    lowPrice: 160,
    highPrice: 350,
    unit: "per kg",
    priceValidUntil: "2027-02-28",
  },
  delrin: {
    lowPrice: 185,
    highPrice: 380,
    unit: "per kg",
    priceValidUntil: "2027-02-28",
  },
  pp: {
    lowPrice: 150,
    highPrice: 200,
    unit: "per kg",
    priceValidUntil: "2027-02-28",
  },
  hdpe: {
    lowPrice: 180,
    unit: "per kg",
    priceValidUntil: "2027-02-28",
  },
  // ---------------------------------------------------------------------------
  // NEEDS REVIEW — added 2 Aug 2026 as a starting figure supplied by the client
  // for every remaining product. Entered as `lowPrice` only, so both the page
  // and the markup read "From ₹500 per piece" — a floor, not an exact price.
  //
  // A single figure across products this different is unlikely to be right for
  // all of them. PEEK in particular is a premium polymer costing several times
  // this; check that one first. `priceValidUntil` is deliberately short so a
  // figure left uncorrected expires rather than sitting in the markup for a
  // year. Correct the numbers below and the page and JSON-LD both follow.
  // ---------------------------------------------------------------------------
  peek: { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  pu: { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  "cast-pu": { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  pps: { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  turcite: { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  bakelite: { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  acrylic: { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  polycarbonate: { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  "pc-roofing": { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  "rigid-pvc": { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
  "turbo-fan": { lowPrice: 500, unit: "per piece", priceValidUntil: "2026-11-30" },
};

export const getProductPricing = (slug: string): ProductPricing | undefined =>
  productPricing[slug];

/**
 * Human-readable price line, e.g. "₹250 – ₹300 per kg" or "From ₹860 per kg".
 * Without an upper bound the wording must say "From", to match the
 * AggregateOffer semantics and avoid implying a fixed price.
 */
export const formatPrice = (p: ProductPricing): string => {
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  return p.highPrice && p.highPrice !== p.lowPrice
    ? `${inr(p.lowPrice)} – ${inr(p.highPrice)} ${p.unit}`
    : `From ${inr(p.lowPrice)} ${p.unit}`;
};
