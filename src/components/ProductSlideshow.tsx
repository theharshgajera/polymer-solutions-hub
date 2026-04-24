import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSlideshowProps {
  images: string[];
}

export function ProductSlideshow({ images }: ProductSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    
    let interval: NodeJS.Timeout;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-muted flex items-center justify-center rounded-xl mb-6">
        <span className="text-muted-foreground text-sm font-body">No image available</span>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-48 mb-6 rounded-xl overflow-hidden group/slideshow shadow-inner bg-muted"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Product variant ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}
      
      {/* Overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none opacity-0 group-hover/slideshow:opacity-100 transition-opacity duration-300" />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-1.5 rounded-full opacity-0 group-hover/slideshow:opacity-100 transition-all duration-300 shadow-md backdrop-blur-sm -translate-x-2 group-hover/slideshow:translate-x-0"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex((prev) => (prev + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-1.5 rounded-full opacity-0 group-hover/slideshow:opacity-100 transition-all duration-300 shadow-md backdrop-blur-sm translate-x-2 group-hover/slideshow:translate-x-0"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "bg-white w-4 shadow-[0_0_4px_rgba(0,0,0,0.5)]" 
                    : "bg-white/60 hover:bg-white w-1.5"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
