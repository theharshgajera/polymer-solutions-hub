import Header from "@/components/Header";
import BannerGallery from "@/components/BannerGallery";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Target, Zap, Shield } from "lucide-react";
import { ProductSlideshow } from "@/components/ProductSlideshow";

const initialHighlights = [
  { id: "nylon-6", name: "Nylon Rods & Sheets", desc: "High-strength for machinery parts.", images: [] as string[] },
  { id: "cast-nylon", name: "Cast Nylon", desc: "Superior wear resistance.", images: [] as string[] },
  { id: "ptfe", name: "PTFE (Teflon)", desc: "Heat-resistant precision products.", images: [] as string[] },
  { id: "hdpe", name: "HDPE Sheets & Rods", desc: "Versatile industrial applications.", images: [] as string[] },
  { id: "uhmwpe", name: "UHMWPE", desc: "Extreme condition performance.", images: [] as string[] },
  { id: "peek", name: "PEEK", desc: "Premium aerospace-grade polymer.", images: [] as string[] },
];

const features = [
  { icon: Shield, title: "Quality Assured", desc: "ISO-standard manufacturing processes." },
  { icon: Zap, title: "Quick Turnaround", desc: "Fastest delivery in the industry." },
  { icon: Eye, title: "Custom Solutions", desc: "Tailored to your exact specifications." },
  { icon: Target, title: "Precision Machined", desc: "CNC-machined components on demand." },
];

const Index = () => {
  const [highlights, setHighlights] = useState(initialHighlights);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const promises = initialHighlights.map(async (p) => {
          const res = await fetch(`/api/images?folder=/products/${p.id}&t=${Date.now()}`);
          if (!res.ok) return p;
          const data = await res.json();
          return { ...p, images: data.map((img: any) => img.url) };
        });
        const updated = await Promise.all(promises);
        setHighlights(updated);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <BannerGallery />
      <HeroSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">Why Choose Us</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Your Trusted Polymer Partner</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-border hover:shadow-lg hover:border-accent/30 transition-all">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Product Highlights */}
      <section className="py-20 bg-slate-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">Our Products</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Featured Products</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((p, i) => (
              <div key={i} className="group bg-background rounded-xl p-6 shadow-sm hover:shadow-lg border border-border hover:border-accent/30 transition-all hover:-translate-y-1 flex flex-col">
                {p.images && p.images.length > 0 ? (
                  <ProductSlideshow images={p.images} />
                ) : (
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                    <div className="w-4 h-4 rounded-sm bg-accent group-hover:bg-primary-foreground transition-colors" />
                  </div>
                )}
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{p.name}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4">{p.desc}</p>
                <Link to="/products" className="mt-auto inline-flex items-center gap-1 text-accent font-body text-sm font-semibold group-hover:gap-2 transition-all">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="inline-flex bg-primary text-primary-foreground px-8 py-3 rounded-md font-body font-bold text-sm hover:bg-accent transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need Custom Engineering Plastics?
          </h2>
          <p className="font-body text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get in touch for a free consultation and quotation. We manufacture to your exact specifications.
          </p>
          <a 
            href="https://wa.me/919898470707?text=Hey%2C%20I%20have%20one%20requirement"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-gold text-foreground px-8 py-3.5 rounded-md font-body font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
