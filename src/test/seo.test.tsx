import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Seo from "@/components/Seo";
import {
  localBusinessSchema,
  faqSchema,
  productListSchema,
  breadcrumbSchema,
  absoluteUrl,
  SITE_URL,
} from "@/lib/seo";

describe("Seo component", () => {
  it("injects title, description, canonical and JSON-LD into the document head", async () => {
    render(
      <HelmetProvider>
        <Seo
          title="Test Title"
          description="Test description for SEO"
          path="/products"
          schema={localBusinessSchema()}
        />
      </HelmetProvider>
    );

    await waitFor(() => expect(document.title).toBe("Test Title"));

    const desc = document.querySelector('meta[name="description"]');
    expect(desc?.getAttribute("content")).toBe("Test description for SEO");

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe("https://multitechpolymers.in/products");

    const ld = document.querySelector('script[type="application/ld+json"]');
    expect(ld).toBeTruthy();
    const parsed = JSON.parse(ld!.textContent || "{}");
    expect(parsed["@type"]).toBe("LocalBusiness");
    expect(parsed.address.addressLocality).toBe("Ahmedabad");
  });
});

describe("structured data builders", () => {
  it("absoluteUrl builds correct URLs", () => {
    expect(absoluteUrl("/products")).toBe(`${SITE_URL}/products`);
    expect(absoluteUrl("/")).toBe(SITE_URL);
  });

  it("faqSchema produces a valid FAQPage", () => {
    const s = faqSchema([{ q: "Q1?", a: "A1" }]) as Record<string, any>;
    expect(s["@type"]).toBe("FAQPage");
    expect(s.mainEntity).toHaveLength(1);
    expect(s.mainEntity[0]["@type"]).toBe("Question");
    expect(s.mainEntity[0].acceptedAnswer.text).toBe("A1");
  });

  it("productListSchema produces an ItemList of Products", () => {
    const s = productListSchema([{ name: "PTFE Rod", description: "Teflon rod" }]) as Record<string, any>;
    expect(s["@type"]).toBe("ItemList");
    expect(s.itemListElement[0].item["@type"]).toBe("Product");
    expect(s.itemListElement[0].item.name).toBe("PTFE Rod");
  });

  it("breadcrumbSchema numbers positions from 1", () => {
    const s = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]) as Record<string, any>;
    expect(s.itemListElement[0].position).toBe(1);
    expect(s.itemListElement[1].name).toBe("Products");
  });
});
