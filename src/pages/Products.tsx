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

export type Product = {
  id: string;
  name: string;
  desc: string;
  items: string[];
  variants?: { label: string; values: string[] };
  images?: string[];
};

export const rawProducts: Omit<Product, 'images'>[] = [
  {
    id: "ptfe",
    name: "PTFE Material (Teflon)",
    desc: "Non-stick, heat-resistant fluoropolymer (also known as Teflon) with outstanding chemical inertness and very low friction. Supplied as PTFE/Teflon rod, sheet, ring, gasket, T bush and chevron packing sets in Ahmedabad, Gujarat.",
    items: ["Rod", "Sheet", "Bush", "T Bush", "Ring", "Gasket", "Chevron Packing Set", "Machined Parts"],
    variants: {
      label: "Filled Grades",
      values: [
        "Carbon Filled PTFE",
        "Glass Filled PTFE",
        "Bronze Filled PTFE",
        "SS Filled PTFE",
        "PEEK Filled PTFE",
      ],
    },
  },
  {
    id: "cast-nylon",
    name: "Cast Nylon Material (Polyamide)",
    desc: "Superior wear resistance and mechanical properties. Cast Nylon (Polyamide) rod, sheet, gear, TED, pad and machined parts ideal for heavy-duty industrial use with excellent dimensional stability.",
    items: ["Rod", "Sheet", "Pipe", "Gear", "TED", "Pad", "Pulley", "Machined Parts", "Customized Parts"],
    variants: {
      label: "Grades",
      values: ["MC 901", "Oilon (Green)", "MOS₂ Cast Nylon"],
    },
  },
  {
    id: "pp",
    name: "Polypropylene Material (PP)",
    desc: "Excellent chemical resistance, lightweight, and cost-effective. Suitable for chemical tanks, ducts, and process equipment.",
    items: ["Rod", "Sheet", "Pipe", "Flange", "Machined Parts"],
  },
  {
    id: "delrin",
    name: "Delrin (POM – Polyacetal)",
    desc: "High stiffness, low friction engineering plastic. Delrin / POM / Polyacetal rod and sheet with excellent dimensional stability and fatigue resistance for precision machined parts.",
    items: ["Rod", "Sheet", "Machined Parts"],
  },
  {
    id: "nylon-6",
    name: "Nylon 6 (Polyamide 6)",
    desc: "High-strength extruded polyamide with great mechanical strength and abrasion resistance.",
    items: ["Rod"],
  },
  {
    id: "bakelite",
    name: "Bakelite (Hylam)",
    desc: "Laminated phenolic material with high electrical insulation and mechanical strength for electrical applications.",
    items: ["Sheet", "Rod"],
  },
  {
    id: "peek",
    name: "PEEK",
    desc: "Premium high-performance polymer for aerospace, medical, and extreme temperature applications up to 260°C.",
    items: ["Rod", "Sheet", "Machined Parts"],
  },
  {
    id: "uhmwpe",
    name: "UHMWPE",
    desc: "Ultra-high molecular weight polyethylene with extreme abrasion resistance, low friction, and outstanding impact strength.",
    items: ["Rod", "Sheet", "Machined Parts"],
  },
  {
    id: "turcite",
    name: "Turcite",
    desc: "PTFE-based bearing material providing low friction, stick-slip free movement for machine tool slideways.",
    items: ["Sheet"],
  },
  {
    id: "pc-roofing",
    name: "Polycarbonate Roofing Sheet",
    desc: "Turbo / generic polycarbonate roofing sheets — impact resistant, weatherproof and lightweight roofing solution.",
    items: ["Roofing Sheet"],
  },
  {
    id: "polycarbonate",
    name: "Polycarbonate Sheet",
    desc: "Impact-resistant, optically clear engineering plastic — 250x stronger than glass with excellent transparency.",
    items: ["Sheet"],
  },
  {
    id: "acrylic",
    name: "Acrylic Sheet & Rod",
    desc: "Crystal-clear, weather-resistant acrylic sheet and rod ideal for displays, signage and glazing applications.",
    items: ["Sheet", "Rod"],
  },
  {
    id: "pu",
    name: "Polyurethane (PU)",
    desc: "Outstanding abrasion resistance, high load-bearing capacity, and excellent resilience for industrial rollers, wheels and seals.",
    items: ["Rod", "Sheet", "Bush", "Wheel", "Trolley Wheel", "Stecker Wheel"],
  },
  {
    id: "hdpe",
    name: "HDPE",
    desc: "High density polyethylene for versatile industrial applications. HDPE sheet, rod, pipe and machined parts — chemical resistant with FDA compliant grades available.",
    items: ["Rod", "Sheet", "Pipe", "Machined Parts"],
  },
  {
    id: "rigid-pvc",
    name: "Rigid PVC",
    desc: "Cost-effective, chemically resistant rigid PVC for chemical processing, fabrication and construction applications.",
    items: ["Sheet", "Rod"],
  },
  {
    id: "cast-pu",
    name: "Cast Polyurethane",
    desc: "Cast PU with excellent tear strength, abrasion resistance and load-bearing capability for custom industrial parts.",
    items: ["Custom Cast Parts"],
  },
  {
    id: "pps",
    name: "PPS Piston",
    desc: "High-performance engineering thermoplastic pistons with exceptional thermal stability and chemical resistance — PPS piston, PEEK piston and icecream machine piston.",
    items: ["Piston"],
    variants: {
      label: "Piston Types",
      values: ["PPS Piston", "PEEK Piston", "Icecream Machine Piston"],
    },
  },
  {
    id: "turbo-fan",
    name: "High Performance Turbo Fan",
    desc: "Industrial-grade turbo fan with a heavy-duty plastic body. Designed for powerful airflow, energy efficiency, and low-noise, long-lasting performance.",
    items: [],
    variants: {
      label: "Features",
      values: [
        "High Speed Air Delivery",
        "Energy Efficient Design",
        "Low Noise Operation",
        "Bulk Supply Available"
      ],
    },
  },
];

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
          const data = await res.json();
          return { ...p, images: data.map((img: any) => img.url) };
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
                  {product.name}
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

                <a
                  href={`https://wa.me/919898470707?text=${encodeURIComponent(`Hey, I have one requirement regarding ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 text-accent font-body text-sm font-semibold group-hover:gap-2 transition-all"
                >
                  Enquire Now <ArrowRight className="w-4 h-4" />
                </a>
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
