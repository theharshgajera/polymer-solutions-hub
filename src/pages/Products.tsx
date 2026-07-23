import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductSlideshow } from "@/components/ProductSlideshow";
import { useState, useEffect } from "react";
import { productKeywordGroups } from "@/lib/productKeywords";
import { breadcrumbSchema, faqSchema, productListSchema } from "@/lib/seo";
import { rawProducts, type Product } from "@/lib/products";

const productFaqs: Faq[] = [
  {
    q: "Who is the best PTFE & Teflon manufacturer in Ahmedabad, Gujarat?",
    a: "Multi-Tech Polymers is a leading manufacturer and supplier of PTFE (Teflon) products in Ahmedabad, Gujarat. We produce PTFE rod, PTFE sheet, PTFE ring, PTFE gasket, PTFE T bush, chevron packing sets and filled grades (carbon, glass and bronze filled PTFE) for industries across Gujarat and India.",
  },
  {
    q: "Do you supply Nylon, Cast Nylon and Delrin rods & sheets in Gujarat?",
    a: "Yes. We supply Nylon rod & sheet, Cast Nylon rod, sheet, gear, pad and machined parts, Polyamide rod & sheet, Delrin (POM / Polyacetal) rod & sheet, and Bakelite sheet & rod — manufactured and stocked in Ahmedabad for fast delivery across Gujarat.",
  },
  {
    q: "Which engineering plastics do you manufacture and stock?",
    a: "Our complete range includes PTFE / Teflon, Nylon, Cast Nylon, Delrin, POM, Polypropylene (PP), PEEK, UHMWPE, Polyurethane (PU), HDPE, Rigid PVC, Acrylic, Polycarbonate roofing sheet, Turcite, PPS / PEEK pistons and turbo fans — available as rods, sheets, bushes, gears, wheels, gaskets and custom machined parts.",
  },
  {
    q: "Can you manufacture custom machined plastic parts to drawings?",
    a: "Absolutely. Most of our components are CNC-machined and developed as per customer specification and drawings — including cast nylon gears, PU wheels, PTFE chevron packing sets, pistons and bespoke engineering plastic parts.",
  },
  {
    q: "Do you deliver engineering plastics across India?",
    a: "Yes. We are based in Rakhial, Ahmedabad and supply engineering plastics to customers throughout Gujarat and across India. Contact us on +91 98984 70707 or WhatsApp for a quotation.",
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(rawProducts);

  useEffect(() => {
    // Fetch images for all products
    const fetchAllImages = async () => {
      try {
        const promises = rawProducts.map(async (p) => {
          const res = await fetch(`/api/images?folder=/products/${p.id}&t=${Date.now()}`);
          if (!res.ok) return { ...p, images: [] };
          const data: { url: string }[] = await res.json();
          return { ...p, images: data.map((img) => img.url) };
        });
        const updatedProducts = await Promise.all(promises);
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    
    fetchAllImages();
  }, []);
  return (
    <div className="min-h-screen">
      <Seo
        title="PTFE, Teflon, Nylon, Delrin & PEEK Rods & Sheets | Manufacturer in Ahmedabad"
        description="Buy PTFE / Teflon rod & sheet, Nylon, Cast Nylon, Delrin (POM), PEEK, UHMWPE, PP, PU, HDPE & Rigid PVC rods, sheets, bushes, gears and machined parts from Multi-Tech Polymers — engineering plastics manufacturer & supplier in Ahmedabad, Gujarat."
        path="/products"
        keywords="PTFE rod, PTFE sheet, Teflon rod, Teflon sheet, PTFE T bush, PTFE gasket, Nylon rod, Cast Nylon gear, Delrin rod, POM sheet, PEEK rod, UHMWPE sheet, PU wheel, HDPE sheet, Rigid PVC rod, engineering plastics Ahmedabad Gujarat"
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
          productListSchema(rawProducts.map((p) => ({ name: p.name, description: p.desc }))),
          faqSchema(productFaqs.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />
      <Header />

      <section className="gradient-hero pt-40 pb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase mb-2">
            What We Offer
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
            Engineering Plastics Products in Ahmedabad
          </h1>
          <p className="font-body text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            Complete range of engineering plastics — PTFE, Teflon, Nylon, Delrin, PEEK, UHMWPE, PP, PU & HDPE rods, sheets, pipes, bushes, wheels and machined components — manufactured & supplied in Ahmedabad, Gujarat and across India.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <article
                key={product.id}
                className="group relative bg-card rounded-xl p-6 shadow-sm hover:shadow-xl border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                    <div className="w-4 h-4 rounded-sm bg-accent group-hover:bg-primary-foreground transition-colors" />
                  </div>
                  <span className="font-body text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {product.images && <ProductSlideshow images={product.images} />}

                <h3 className="font-heading text-xl font-bold text-navy mb-2">
                  <Link to={`/products/${product.id}`} className="hover:text-accent transition-colors">
                    {product.name}
                  </Link>
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                  {product.desc}
                </p>

                {product.items && product.items.length > 0 && (
                  <div className="mb-4">
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-2">
                      Available Forms
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 text-xs font-body font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded"
                        >
                          <Check className="w-3 h-3 text-accent" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.variants && (
                  <div className="mb-5 pt-4 border-t border-border">
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-2">
                      {product.variants.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.values.map((v) => (
                        <span
                          key={v}
                          className="inline-flex items-center gap-1 text-xs font-body font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded"
                        >
                          <Check className="w-3 h-3 text-accent" />
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  to={`/products/${product.id}`}
                  className="mt-auto inline-flex items-center gap-1 text-accent font-body text-sm font-semibold group-hover:gap-2 transition-all"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Range — keyword-rich crawlable list */}
      <section className="py-20 bg-slate-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">
              Complete Product Range
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Engineering Plastics We Manufacture &amp; Supply
            </h2>
            <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
              A full list of the PTFE, Teflon, Nylon, Delrin, PEEK and other engineering plastic
              products we manufacture and stock in Ahmedabad, Gujarat.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productKeywordGroups.map((group) => (
              <div key={group.category} className="bg-background rounded-xl p-6 border border-border shadow-sm">
                <h3 className="font-heading text-lg font-bold text-navy mb-3">{group.category}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="inline-flex items-center gap-1 text-xs font-body font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded">
                        <Check className="w-3 h-3 text-accent" />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        faqs={productFaqs}
        heading="Engineering Plastics — FAQs"
        className="bg-background"
      />

      {/* CTA */}
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">
            Can't Find What You Need?
          </h2>
          <p className="font-body text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            We manufacture custom engineering plastic parts to your specifications. Contact us for a tailored solution.
          </p>
          <a
            href="https://wa.me/919898470707?text=Hey%2C%20I%20have%20one%20requirement"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-gold text-foreground px-8 py-3.5 rounded-md font-body font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Request Custom Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
