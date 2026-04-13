import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Thank you for your enquiry! We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-slate-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">
            Get In Touch
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Contact Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
              Quick Enquiry
            </h3>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              Have a question about our products? Need a custom quote? Reach out to us and our team will respond promptly.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: Mail, label: "info@multitechpolymers.com", href: "mailto:info@multitechpolymers.com" },
                { icon: MapPin, label: "Ahmedabad, Gujarat, India", href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <item.icon className="w-5 h-5 text-accent group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="font-body text-foreground group-hover:text-accent transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-8 shadow-sm border border-border">
            <div className="space-y-5">
              {[
                { name: "name" as const, placeholder: "Your Name", type: "text" },
                { name: "email" as const, placeholder: "Email Address", type: "email" },
                { name: "phone" as const, placeholder: "Phone Number", type: "tel" },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  value={formData[field.name]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
              ))}
              <textarea
                placeholder="Your Message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-body font-bold text-sm hover:bg-accent transition-colors flex items-center justify-center gap-2"
              >
                Send Enquiry <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
