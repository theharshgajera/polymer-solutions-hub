import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  { id: "nylon", name: "Nylon Rods & Sheets", desc: "High-strength nylon rods, bushes, profiles, and machinery parts. Excellent mechanical strength and wear resistance for demanding applications." },
  { id: "cast-nylon", name: "Cast Nylon Rods & Sheets", desc: "Superior wear resistance and mechanical properties. Ideal for heavy-duty industrial use with excellent dimensional stability." },
  { id: "uhmwpe", name: "UHMWPE Rods & Sheets", desc: "Ultra-high molecular weight polyethylene for extreme abrasion resistance, low friction, and outstanding impact strength." },
  { id: "pp", name: "Polypropylene (PP) Rods & Sheets", desc: "Excellent chemical resistance, lightweight, and cost-effective. Suitable for chemical tanks, ducts, and laboratory equipment." },
  { id: "ptfe", name: "PTFE (Teflon) Rods & Sheets", desc: "Non-stick, heat-resistant teflon products. Outstanding chemical inertness and very low friction coefficient." },
  { id: "pu", name: "Polyurethane (PU) Rods & Sheets", desc: "Outstanding abrasion resistance, high load-bearing capacity, and excellent resilience for industrial rollers and seals." },
  { id: "pom", name: "POM (Delrin) Rods & Sheets", desc: "High stiffness, low friction engineering plastic. Excellent dimensional stability and fatigue resistance." },
  { id: "hdpe", name: "HDPE Sheets & Rods", desc: "High density polyethylene for versatile industrial applications. Chemical resistant and FDA compliant grades available." },
  { id: "peek", name: "PEEK Rods & Sheets", desc: "Premium high-performance polymer for aerospace, medical, and extreme temperature applications up to 260°C." },
  { id: "machined", name: "Machined Components", desc: "Precision CNC-machined plastic parts manufactured to your exact specifications and tolerances." },
  { id: "pvc", name: "PVC Rods & Sheets", desc: "Cost-effective, chemically resistant PVC products for plumbing, chemical processing, and construction." },
  { id: "polycarbonate", name: "Polycarbonate Rods & Sheets", desc: "Impact-resistant, optically clear engineering plastics. 250x stronger than glass with excellent transparency." },
  { id: "hylam", name: "Hylam Rods & Sheets", desc: "Laminated phenolic sheets with high electrical insulation and mechanical strength for electrical applications." },
  { id: "pet", name: "PET Sheets & Rods", desc: "Polyethylene terephthalate with excellent dimensional stability, low moisture absorption, and good machinability." },
  { id: "pallet-wheel", name: "Pallet Wheels", desc: "Durable nylon flat free pallet wheels designed for heavy-duty warehouse and logistics applications." },
  { id: "castor-wheel", name: "Castor Wheels", desc: "High-quality castor wheels built from premium materials for smooth mobility in industrial environments." },
  { id: "trolley-wheel", name: "Trolley Wheels", desc: "Robust trolley wheels engineered for reliable performance in material handling and transport." },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="gradient-hero pt-36 pb-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase mb-3">What We Offer</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Our Products</h1>
          <p className="font-body text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
            Complete range of engineering plastics rods, sheets, and machined components for every industrial need.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-background rounded-xl p-6 shadow-sm hover:shadow-lg border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <div className="w-4 h-4 rounded-sm bg-accent group-hover:bg-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{product.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{product.desc}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-accent font-body text-sm font-semibold group-hover:gap-2 transition-all"
                >
                  Enquire Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Can't Find What You Need?</h2>
          <p className="font-body text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            We manufacture custom engineering plastic parts to your specifications. Contact us for a tailored solution.
          </p>
          <Link to="/contact" className="inline-flex bg-gold text-foreground px-8 py-3.5 rounded-md font-body font-bold text-sm hover:opacity-90 transition-opacity">
            Request Custom Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
