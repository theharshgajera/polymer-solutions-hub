import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Zap, Pill, Settings, Droplets, UtensilsCrossed,
  Shirt, Plane, Car, FlaskConical, Fuel, Wrench, Cpu
} from "lucide-react";

const industries = [
  { icon: Zap, name: "Electromechanical Industry", desc: "Precision plastic components for motors, generators, switches, and electrical assemblies." },
  { icon: Pill, name: "Pharmaceutical Industry", desc: "FDA-compliant materials for pharmaceutical machinery, packaging, and cleanroom equipment." },
  { icon: Settings, name: "Valves Industry", desc: "Corrosion-resistant seats, seals, and components for all types of industrial valves." },
  { icon: Droplets, name: "Hydraulics Industry", desc: "Wear-resistant bushings, seals, and guide rings for hydraulic cylinders and systems." },
  { icon: UtensilsCrossed, name: "Food Processing", desc: "Food-grade plastics for conveyors, cutting boards, and food handling equipment." },
  { icon: Shirt, name: "Textile Industry", desc: "Low-friction components for looms, spinning machines, and textile processing equipment." },
  { icon: Plane, name: "Aerospace Industry", desc: "High-performance PEEK and specialty polymers for aircraft components and systems." },
  { icon: Car, name: "Automotive Industry", desc: "Lightweight, durable plastic parts for engines, transmissions, and body components." },
  { icon: FlaskConical, name: "Chemical Industry", desc: "Chemically inert materials for tanks, pipes, linings, and chemical processing equipment." },
  { icon: Fuel, name: "Petrochemical Industry", desc: "High-temperature resistant components for refineries and petrochemical processing plants." },
  { icon: Wrench, name: "Machine Tools", desc: "Precision machined bushings, gears, and wear pads for CNC and conventional machines." },
  { icon: Cpu, name: "Electronics Industry", desc: "Electrically insulating materials for PCB supports, connectors, and electronic housings." },
];

const IndustriesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="gradient-hero pt-36 pb-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase mb-3">Trusted Across Sectors</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Industries We Serve</h1>
          <p className="font-body text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            Our engineering plastics are used across dozens of industries, from aerospace to food processing.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <div key={i} className="group bg-background rounded-xl p-8 border border-border hover:border-accent/30 hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-primary/5 group-hover:bg-primary flex items-center justify-center transition-colors mb-5">
                  <ind.icon className="w-7 h-7 text-accent group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{ind.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Need Plastics for Your Industry?</h2>
          <p className="font-body text-primary-foreground/70 mb-8">We'll recommend the best material for your application.</p>
          <Link to="/contact" className="inline-flex bg-gold text-foreground px-8 py-3.5 rounded-md font-body font-bold text-sm hover:opacity-90 transition-opacity">
            Get Expert Advice
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustriesPage;
