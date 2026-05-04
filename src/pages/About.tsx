import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Eye, Target, Users, Award, CheckCircle } from "lucide-react";
import aboutImage from "@/assets/about-factory.jpg";

const values = [
  { icon: CheckCircle, title: "Quality First", desc: "Every product undergoes rigorous quality checks before dispatch." },
  { icon: Users, title: "Customer Focus", desc: "We work closely with clients to deliver tailored solutions." },
  { icon: Award, title: "Industry Expertise", desc: "Decades of combined experience in engineering plastics." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Banner */}
      <section className="gradient-hero pt-40 pb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase mb-2">Know More</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">About Us</h1>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={aboutImage} alt="Multi-Tech Polymers Factory" width={800} height={600} loading="lazy" className="rounded-2xl shadow-xl w-full h-auto object-cover" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full" />
            </div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Multi-Tech</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                We at <strong className="text-navy">Multi-Tech</strong> are a foremost manufacturer and supplier of quality-approved engineering plastics parts, rods, and sheets. Our products include Nylon, Cast Nylon, PTFE (Teflon), HDPE, PP, UHMWPE, Delrin, PU, PEEK, and more.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Our hard work and determination have earned us accolades for quality supplying of all types of engineering plastics parts to various industries including automotive, aerospace, pharmaceutical, food processing, and many more.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Our full-line manufacturing capabilities enable us to produce any stock shape you require. For even greater savings and quicker turnarounds, we also create finished and semi-finished cast components tailored to your exact specifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                To establish ourselves as the go-to source for engineering plastics sheet & rod in important sectors like food processing and packaging, material handling, sugar, steel and iron processing, textiles, and pharmaceuticals.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Serve the client with the quickest turnaround time feasible. On-time and complete delivery is provided. Establish a workplace culture that values teamwork, honesty, and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">What Drives Us</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
