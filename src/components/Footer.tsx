import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <img src={logo} alt="Multi-Tech Polymers" className="h-16 w-auto mb-4 brightness-200" />
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Leading manufacturer & supplier of engineering plastics rods, sheets, and machined components for diverse industrial applications.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm">
              {["Home", "About Us", "Products", "Industries", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, "")}`} className="text-primary-foreground/70 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Contact Info</h4>
            <div className="space-y-3 font-body text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@multitechpolymers.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4">
        <p className="text-center font-body text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Multi-Tech Polymers. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
