import { Facebook, Instagram } from "lucide-react";

export function SocialButtons() {
  const facebookUrl = "https://www.facebook.com/share/1Groz49Thj/?mibextid=wwXIfr";
  const instagramUrl = "https://www.instagram.com/multi.tech3/";

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative"
        aria-label="Follow us on Facebook"
      >
        <Facebook className="w-7 h-7 fill-current" />
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#1877F2] opacity-20 group-hover:animate-ping -z-10" />
      </a>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#E4405F] hover:bg-[#d62976] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="w-7 h-7" />
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#E4405F] opacity-20 group-hover:animate-ping -z-10" />
      </a>
    </div>
  );
}
