import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductSlideshow } from "@/components/ProductSlideshow";
import { useState, useEffect } from "react";

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
    desc: "Non-stick, heat-resistant fluoropolymer with outstanding chemical inertness and very low friction coefficient.",
    items: ["Rod", "Sheet", "Bush", "Ring", "Gasket", "Chevron Packing Set", "Machined Parts"],
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
    desc: "Superior wear resistance and mechanical properties. Ideal for heavy-duty industrial use with excellent dimensional stability.",
    items: ["Rod", "Sheet", "Pipe", "Machined Parts", "Pad", "Pulley", "Customized Parts"],
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
    desc: "High stiffness, low friction engineering plastic with excellent dimensional stability and fatigue resistance.",
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
    name: "Acrylic Sheet",
    desc: "Crystal-clear, weather-resistant transparent sheet ideal for displays, signage and glazing applications.",
    items: ["Sheet"],
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
    desc: "High density polyethylene for versatile industrial applications. Chemical resistant with FDA compliant grades available.",
    items: ["Rod", "Sheet", "Pipe"],
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
    desc: "High-performance engineering thermoplastic with exceptional thermal stability and chemical resistance.",
    items: ["Piston"],
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
      <Header />

      <section className="gradient-hero pt-36 pb-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            What We Offer
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
            Our Products
          </h1>
          <p className="font-body text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            Complete range of engineering plastics — rods, sheets, pipes, bushes, wheels and machined components for every industrial need.
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
