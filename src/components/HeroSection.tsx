import { useState, useEffect } from "react";
import heroImage1 from "@/assets/hero-products.jpg";
import heroImage2 from "@/assets/hero-slider-1.webp";
import heroImage3 from "@/assets/hero-slider-2.webp";

const heroImages = [heroImage1, heroImage2, heroImage3];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 pt-48 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-4">
              Welcome to Multi-Tech
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gold leading-tight mb-6">
              House of Engineering Plastics Products in form of Sheets, Rods & Bushes
            </h2>
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-foreground/10 aspect-[16/10]">
              {heroImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Multi-Tech Polymers - Engineering Plastic Products ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-gold text-foreground rounded-xl px-6 py-3 shadow-lg z-10">
              <p className="font-heading text-2xl font-bold">20+</p>
              <p className="font-body text-xs font-semibold">Years Experience</p>
            </div>

            {/* Gallery indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex
                      ? "bg-gold w-6"
                      : "bg-white/60 hover:bg-white"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
              c            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
