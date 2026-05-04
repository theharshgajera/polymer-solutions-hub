import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner2 from "@/assets/banner-new-2.jpeg";
import banner3 from "@/assets/banner-new-3.jpeg";
import banner4 from "@/assets/banner-new-4.jpeg";
import banner5 from "@/assets/banner-new-5.jpeg";
import banner6 from "@/assets/banner-new-6.jpeg";
import banner7 from "@/assets/banner-new-7.jpeg";
import banner8 from "@/assets/banner-new-8.jpeg";
import banner9 from "@/assets/banner-new-9.jpeg";

const bannerImages = [banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner9];

const BannerGallery = () => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStartIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleImages = () => {
    return [
      bannerImages[currentStartIndex],
      bannerImages[(currentStartIndex + 1) % bannerImages.length],
      bannerImages[(currentStartIndex + 2) % bannerImages.length],
    ];
  };

  const visibleImages = getVisibleImages();

  return (
    <section className="pt-32 lg:pt-44 bg-slate-light/30">
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Mobile: 1 image, Tablet/PC: 2 images, Ultra-wide: 3 images */}
          {visibleImages.map((img, idx) => (
            <div 
              key={`${currentStartIndex}-${idx}`}
              className={`relative aspect-square overflow-hidden rounded-3xl shadow-xl border-4 border-white transition-all duration-700 animate-fade-in-up ${
                idx === 1 ? "hidden md:block" : idx === 2 ? "hidden 2xl:block" : "block"
              }`}
            >
              <img
                src={img}
                alt={`Multi-Tech Banner ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStartIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentStartIndex 
                  ? "bg-gold w-8" 
                  : "bg-navy/20 hover:bg-navy/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex bg-navy text-primary-foreground px-10 py-4 rounded-xl font-body font-bold text-base hover:bg-accent transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Explore Our Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannerGallery;
