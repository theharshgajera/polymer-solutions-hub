import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Contact Us", href: "#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-navy text-primary-foreground text-sm">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@multitechpolymers.com" className="hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>info@multitechpolymers.com</span>
            </a>
          </div>
          <span className="hidden md:block font-body text-xs tracking-wider opacity-80">
            Manufacturer & Supplier of Engineering Plastics
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-background/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="Multi-Tech Polymers" className="h-14 w-auto" />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body font-semibold text-sm tracking-wide text-foreground hover:text-accent transition-colors uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden lg:inline-flex bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-body font-semibold text-sm hover:bg-accent transition-colors"
          >
            Get a Quote
          </a>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-background border-t border-border px-4 pb-4">
            <ul className="flex flex-col gap-3 pt-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-2 font-body font-semibold text-sm text-foreground hover:text-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <a
                href="#contact"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-body font-semibold text-sm text-center"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </a>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
