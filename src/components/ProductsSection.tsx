import { ArrowRight } from "lucide-react";

const products = [
  { name: "Nylon Rods & Sheets", desc: "High-strength nylon rods, bushes, profiles for machinery parts." },
  { name: "Cast Nylon Rods & Sheets", desc: "Superior wear resistance, ideal for heavy-duty industrial use." },
  { name: "UHMWPE Rods & Sheets", desc: "Ultra-high molecular weight polyethylene for extreme conditions." },
  { name: "PP Rods & Sheets", desc: "Polypropylene products with excellent chemical resistance." },
  { name: "PTFE (Teflon) Rods & Sheets", desc: "Non-stick, heat-resistant teflon products for precision." },
  { name: "PU Rods & Sheets", desc: "Polyurethane products with outstanding abrasion resistance." },
  { name: "POM (Delrin) Rods & Sheets", desc: "High stiffness, low friction engineering plastic components." },
  { name: "HDPE Sheets & Rods", desc: "High density polyethylene for versatile industrial applications." },
  { name: "PEEK Rods & Sheets", desc: "Premium high-performance polymer for aerospace & medical." },
  { name: "Machined Components", desc: "Precision CNC-machined plastic parts to your specifications." },
  { name: "PVC Rods & Sheets", desc: "Cost-effective, chemically resistant PVC products." },
  { name: "Polycarbonate Rods & Sheets", desc: "Impact-resistant, optically clear engineering plastics." },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-slate-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">
            What We Offer
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Product Range
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={i}
              className="group bg-background rounded-xl p-6 shadow-sm hover:shadow-lg border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <div className="w-4 h-4 rounded-sm bg-accent group-hover:bg-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {product.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-accent font-body text-sm font-semibold group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
