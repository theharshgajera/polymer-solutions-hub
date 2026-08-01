import { describe, it, expect } from "vitest";
import { rawProducts } from "@/lib/products";
import { productSeo } from "@/lib/productSeo";
import {
  getAggregateRating,
  getProductReviews,
  productReviews,
  reviewDrafts,
} from "@/lib/productReviews";
import { formatPrice, productPricing } from "@/lib/productPricing";
import { getGoogleReviewsFor, googleReviews } from "@/lib/googleReviews";
import { clampDescription, productSchema } from "@/lib/seo";

describe("per-product SEO copy", () => {
  it("covers every product in the catalogue", () => {
    const missing = rawProducts.filter((p) => !productSeo[p.id]).map((p) => p.id);
    expect(missing).toEqual([]);
  });

  it("only defines SEO for slugs that exist", () => {
    const slugs = new Set(rawProducts.map((p) => p.id));
    const orphans = Object.keys(productSeo).filter((id) => !slugs.has(id));
    expect(orphans).toEqual([]);
  });

  it("gives every product a unique title and description", () => {
    const titles = Object.values(productSeo).map((s) => s.metaTitle);
    const descriptions = Object.values(productSeo).map((s) => s.metaDescription);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("keeps titles and descriptions within the lengths Google renders", () => {
    for (const [id, s] of Object.entries(productSeo)) {
      expect(s.metaTitle.length, `${id} title`).toBeLessThanOrEqual(65);
      expect(s.metaDescription.length, `${id} description`).toBeLessThanOrEqual(160);
    }
  });

  it("targets Ahmedabad in every product title", () => {
    for (const [id, s] of Object.entries(productSeo)) {
      expect(s.metaTitle, `${id} title`).toMatch(/Ahmedabad/);
    }
  });

  it("only links related products that exist and never links to itself", () => {
    const slugs = new Set(rawProducts.map((p) => p.id));
    for (const [id, s] of Object.entries(productSeo)) {
      for (const rel of s.related ?? []) {
        expect(slugs.has(rel), `${id} -> ${rel}`).toBe(true);
        expect(rel, `${id} links to itself`).not.toBe(id);
      }
    }
  });
});

describe("clampDescription", () => {
  it("leaves short descriptions untouched", () => {
    expect(clampDescription("Short and sweet")).toBe("Short and sweet");
  });

  it("never cuts a word in half", () => {
    const long = `${"word ".repeat(60)}end`;
    const out = clampDescription(long);
    expect(out.length).toBeLessThanOrEqual(161); // 160 + ellipsis
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toMatch(/wor…$/);
  });
});

describe("productSchema", () => {
  const seo = productSeo.ptfe;
  const schema = productSchema({
    id: "ptfe",
    name: "PTFE Material (Teflon)",
    desc: "PTFE products",
    items: ["Rod", "Sheet"],
    images: ["https://ik.imagekit.io/x/ptfe.webp"],
    metaDescription: seo.metaDescription,
    alsoKnownAs: seo.alsoKnownAs,
    specs: seo.specs,
    keywords: seo.keywords,
  }) as unknown as {
    "@type": string;
    "@id": string;
    url: string;
    alternateName?: string[];
    material?: string;
    additionalProperty: { "@type": string; name: string; value: string }[];
    image: string[];
    offers?: unknown;
    review?: unknown;
    aggregateRating?: unknown;
  };

  it("emits a Product with a self-referencing @id and url", () => {
    expect(schema["@type"]).toBe("Product");
    expect(schema["@id"]).toBe("https://multitechpolymers.in/products/ptfe#product");
    expect(schema.url).toBe("https://multitechpolymers.in/products/ptfe");
  });

  it("carries synonyms, material and the specs as properties", () => {
    expect(schema.alternateName).toContain("Teflon");
    expect(schema.material).toMatch(/polytetrafluoroethylene/i);
    expect(schema.additionalProperty.length).toBe((seo.specs?.length ?? 0) + 2);
    expect(schema.additionalProperty[0]["@type"]).toBe("PropertyValue");
  });

  it("uses the real product images rather than the OG fallback", () => {
    expect(schema.image).toEqual(["https://ik.imagekit.io/x/ptfe.webp"]);
  });

  it("omits offers, review and aggregateRating when no real data backs them", () => {
    expect(schema.offers).toBeUndefined();
    expect(schema.review).toBeUndefined();
    expect(schema.aggregateRating).toBeUndefined();
  });
});

describe("Google Business Profile reviews", () => {
  it("only references product slugs that exist", () => {
    const slugs = new Set(rawProducts.map((p) => p.id));
    for (const r of googleReviews) {
      for (const s of r.products) expect(slugs.has(s), `${r.author} -> ${s}`).toBe(true);
    }
  });

  it("keeps an author and body on every review", () => {
    for (const r of googleReviews) {
      expect(r.author.trim().length).toBeGreaterThan(0);
      expect(r.body.trim().length).toBeGreaterThan(0);
      expect(r.date).toMatch(/^\d{4}-\d{2}$/);
    }
  });

  it("never feeds Google reviews into Product schema", () => {
    // Third-party reviews must not be re-marked-up as first-party ones.
    const withGoogle = rawProducts.filter((p) => getGoogleReviewsFor(p.id).length);
    expect(withGoogle.length).toBeGreaterThan(0); // sanity: some products do have them
    for (const p of withGoogle) {
      const s = productSchema({
        id: p.id,
        name: p.name,
        desc: p.desc,
        reviews: getProductReviews(p.id),
        aggregateRating: getAggregateRating(p.id),
      }) as Record<string, unknown>;
      expect(s.review, `${p.id} must not carry Google reviews`).toBeUndefined();
      expect(s.aggregateRating, `${p.id} must not carry a Google rating`).toBeUndefined();
    }
  });

  it("returns nothing for products no review mentions", () => {
    expect(getGoogleReviewsFor("turbo-fan")).toEqual([]);
  });
});

/** The commerce-related parts of the Product node, for assertions below. */
type CommerceSchema = {
  offers: {
    "@type": string;
    price?: number;
    lowPrice?: number;
    highPrice?: number;
    priceCurrency: string;
  };
  review: {
    "@type": string;
    author: { name: string };
    datePublished: string;
    reviewRating: { ratingValue: number };
  }[];
  aggregateRating: { ratingValue: number; reviewCount: number };
};

describe("offers, reviews and ratings", () => {
  const base = { id: "pps", name: "PPS Piston", desc: "PPS pistons" };

  it("emits an AggregateOffer for a price range", () => {
    const s = productSchema({
      ...base,
      pricing: { lowPrice: 1200, highPrice: 1800, unit: "per kg", priceValidUntil: "2027-03-31" },
    }) as unknown as CommerceSchema;
    expect(s.offers["@type"]).toBe("AggregateOffer");
    expect(s.offers.lowPrice).toBe(1200);
    expect(s.offers.highPrice).toBe(1800);
    expect(s.offers.priceCurrency).toBe("INR");
  });

  it("emits a 'from' AggregateOffer with no highPrice when no upper bound is known", () => {
    const s = productSchema({
      ...base,
      pricing: { lowPrice: 1500, unit: "per kg", priceValidUntil: "2027-03-31" },
    }) as unknown as CommerceSchema;
    // Never a bare Offer — that would assert an exact price.
    expect(s.offers["@type"]).toBe("AggregateOffer");
    expect(s.offers.lowPrice).toBe(1500);
    expect(s.offers.highPrice).toBeUndefined();
    expect(s.offers.price).toBeUndefined();
  });

  it("labels an open-ended price as 'From' on the page", () => {
    expect(formatPrice({ lowPrice: 860, unit: "per kg", priceValidUntil: "2027-02-28" })).toBe(
      "From ₹860 per kg"
    );
    expect(
      formatPrice({ lowPrice: 250, highPrice: 300, unit: "per kg", priceValidUntil: "2027-02-28" })
    ).toBe("₹250 – ₹300 per kg");
  });

  it("emits Review nodes with a named author, date and rating", () => {
    const s = productSchema({
      ...base,
      reviews: [
        { author: "R. Shah", rating: 5, date: "2026-06-01", body: "Great piston", organisation: "Acme Foods" },
      ],
      aggregateRating: { ratingValue: 5, reviewCount: 1 },
    }) as unknown as CommerceSchema;
    expect(s.review[0]["@type"]).toBe("Review");
    expect(s.review[0].author.name).toBe("R. Shah");
    expect(s.review[0].datePublished).toBe("2026-06-01");
    expect(s.review[0].reviewRating.ratingValue).toBe(5);
    expect(s.aggregateRating.reviewCount).toBe(1);
  });
});

describe("review and pricing data integrity", () => {
  it("never publishes a review without an author, date and rating", () => {
    for (const r of productReviews) {
      expect(r.author.trim().length, "review author").toBeGreaterThan(0);
      expect(r.date, "review date").toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(r.rating).toBeGreaterThanOrEqual(1);
      expect(r.rating).toBeLessThanOrEqual(5);
      expect(r.body.trim().length, "review body").toBeGreaterThan(0);
    }
  });

  it("only attaches reviews to products that exist", () => {
    const slugs = new Set([...rawProducts.map((p) => p.id), "general"]);
    for (const r of productReviews) expect(slugs.has(r.product), r.product).toBe(true);
    for (const d of reviewDrafts) expect(slugs.has(d.product), d.product).toBe(true);
  });

  it("returns no aggregateRating for a product with no reviews", () => {
    const withReviews = new Set(productReviews.map((r) => r.product));
    const without = rawProducts.map((p) => p.id).filter((id) => !withReviews.has(id));
    for (const id of without) expect(getAggregateRating(id), id).toBeNull();
  });

  it("averages ratings correctly when reviews exist", () => {
    for (const p of rawProducts) {
      const agg = getAggregateRating(p.id);
      if (!agg) continue;
      const rs = getProductReviews(p.id);
      expect(agg.reviewCount).toBe(rs.length);
      const mean = rs.reduce((s, r) => s + r.rating, 0) / rs.length;
      expect(agg.ratingValue).toBeCloseTo(Math.round(mean * 10) / 10, 5);
    }
  });

  it("keeps every priced product's priceValidUntil in the future", () => {
    // A price whose validity has lapsed is worse than no price: Google may drop
    // the offer and buyers see a stale quote. This fails the build once any
    // placeholder is left uncorrected past its review date.
    const today = new Date().toISOString().slice(0, 10);
    for (const [id, price] of Object.entries(productPricing)) {
      expect(price.priceValidUntil >= today, `${id} price expired on ${price.priceValidUntil}`).toBe(
        true
      );
    }
  });

  it("only prices products that exist, with sane ranges", () => {
    const slugs = new Set(rawProducts.map((p) => p.id));
    for (const [id, price] of Object.entries(productPricing)) {
      expect(slugs.has(id), id).toBe(true);
      expect(price.lowPrice).toBeGreaterThan(0);
      if (price.highPrice) expect(price.highPrice).toBeGreaterThanOrEqual(price.lowPrice);
      expect(price.priceValidUntil).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
