import { useState, useEffect } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen pt-32 lg:pt-40 bg-navy/5">
      <div className="absolute inset-0 z-0">
        {bannerImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Multi-Tech Polymers Banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Gallery indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex 
                ? "bg-gold w-8" 
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to banner slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerGallery;
