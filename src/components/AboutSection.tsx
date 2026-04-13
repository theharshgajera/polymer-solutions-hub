import { Target, Eye } from "lucide-react";
import aboutImage from "@/assets/about-factory.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={aboutImage}
              alt="Multi-Tech Polymers Manufacturing Facility"
              width={800}
              height={600}
              loading="lazy"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full" />
          </div>

          <div>
            <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">
              About Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Multi-Tech Polymers
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              We at <strong className="text-navy">Multi-Tech Polymers</strong> are a foremost manufacturer and supplier of quality-approved engineering plastics parts, rods, and sheets. Our products include Nylon, Cast Nylon, PTFE (Teflon), HDPE, PP, UHMWPE, Delrin, PU, PEEK, and more.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Our full-line manufacturing capabilities enable us to produce any stock shape you require. For greater savings and quicker turnarounds, we also create finished and semi-finished cast components tailored to your specifications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">Our Vision</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    To be the go-to source for engineering plastics across key industrial sectors.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">Our Mission</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Quickest turnaround, on-time delivery, and a culture of teamwork and integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
