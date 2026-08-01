import { describe, it, expect } from "vitest";
import { rawProducts } from "@/lib/products";
import { productSeo } from "@/lib/productSeo";
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

  it("omits offers, since pricing is quote-based", () => {
    expect(schema.offers).toBeUndefined();
  });
});
