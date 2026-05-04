import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="gradient-hero pt-40 pb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase mb-2">Get In Touch</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">Contact Us</h1>
          <p className="font-body text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            Have a question or need a quote? We're here to help.
          </p>
        </div>
      </section>

      <ContactSection />

      {/* Map placeholder */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
            <iframe
              title="Multi-Tech Polymers Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.70717963824!2d72.41395065!3d23.020474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
