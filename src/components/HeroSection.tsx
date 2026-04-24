import heroImage from "@/assets/hero-products.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 pt-48 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <p className="text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              Welcome to Multi-Tech Polymers
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Engineering Plastics{" "}
              <span className="text-gold">Rods & Sheets</span>
            </h1>
            <p className="font-body text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl">
              Leading manufacturer and supplier of premium quality engineering plastics — Nylon, Cast Nylon, PTFE, HDPE, PP, UHMWPE, Delrin, PU, PEEK and more. Precision-engineered for demanding industrial applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="bg-gold text-foreground px-8 py-3.5 rounded-md font-body font-bold text-sm hover:opacity-90 transition-opacity"
              >
                View Products
              </a>
              <a
                href="#contact"
                className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-md font-body font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-foreground/10">
              <img
                src={heroImage}
                alt="Multi-Tech Polymers - Engineering Plastic Rods and Sheets"
                width={1280}
                height={720}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-gold text-foreground rounded-xl px-6 py-3 shadow-lg">
              <p className="font-heading text-2xl font-bold">10+</p>
              <p className="font-body text-xs font-semibold">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
