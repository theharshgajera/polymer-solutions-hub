import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandName from "@/components/BrandName";
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
              <img src={aboutImage} alt="Multi-Tech Factory" width={800} height={600} loading="lazy" className="rounded-2xl shadow-xl w-full h-auto object-cover" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full" />
            </div>
            <div>
              <h2 className="font-gloucester text-3xl md:text-4xl font-bold text-foreground mb-6"><BrandName /></h2>
              <ul className="font-gloucester text-muted-foreground leading-relaxed space-y-3 list-disc list-outside ml-5">
                <li>
                  <BrandName /> is a leading and most reliable supplier of Virgin and Compound Graded PTFE/Teflon<sup>®</sup> and other engineering polymers like Polyacetal (Delrin<sup>®</sup>), Polyamide (Nylon<sup>®</sup>), Cast Nylon, HDPE, UHMWPE, Polypropylene (PP), Polyurethane (PU), Rigid PVC, PEEK, Turcite Sheet etc.
                </li>
                <li>
                  Moulded &amp; Modified components are available in form of Sheet, Rod, Bush, Strips, Rings, Gaskets, Bellows etc. Most of the parts are manufactured &amp; developed as per customer specification.
                </li>
                <li>
                  Company has been promoted by <strong className="text-navy">Mr. Ritesh Panchal</strong>. Company established in year <strong className="text-navy">2006</strong> in Ahmedabad.
                </li>
                <li>
                  We offer engineering polymer components in Chemical, Petrochemical, Textile, Pharmaceuticals, Fertilizers, Paper Mills, Hydraulics, Valves &amp; Pumps manufacturing industries &amp; several other industries.
                </li>
                <li>
                  Characteristics of the materials are Low Friction, Outstanding stability for High Temperature, Chemical Resistance and Dielectric Properties.
                </li>
                <li>
                  <BrandName /> is equipped with the most modern machineries &amp; high tech measuring instruments. Our skilled machinists have the knowledge and experience to fabricate engineering plastics components. Our motto is to achieve maximum customer satisfaction through consistent quality at reasonable rates.
                </li>
                <li>
                  The success &amp; growth of the company is largely due to its committed employees, technical strength &amp; patronage of valued customers.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Mission - shown first */}
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-gloucester text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="font-gloucester text-muted-foreground leading-relaxed">
                At <BrandName />, our mission is to provide high-quality engineering plastic solutions with reliability, precision, and consistency. We are committed to delivering the right products on time, at competitive prices, while ensuring complete customer satisfaction and long-term partnerships.
              </p>
            </div>
            {/* Vision */}
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-gloucester text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <ul className="font-gloucester text-muted-foreground leading-relaxed space-y-2 list-disc list-outside ml-4">
                <li>At <BrandName />, our vision is to be a trusted leader in engineering plastic solutions by delivering quality, innovation, and long-term value to our customers.</li>
                <li>We aim to grow with advanced technology and continuously improve our products and services.</li>
                <li>Our focus is on building strong relationships through trust, reliability, and consistent performance.</li>
              </ul>
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
