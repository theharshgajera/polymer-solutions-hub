import {
  Zap, Pill, Settings, Droplets, UtensilsCrossed,
  Shirt, Plane, Car, FlaskConical, Fuel, Wrench, Cpu
} from "lucide-react";

const industries = [
  { icon: Zap, name: "Electromechanical" },
  { icon: Pill, name: "Pharmaceutical" },
  { icon: Settings, name: "Valves" },
  { icon: Droplets, name: "Hydraulics" },
  { icon: UtensilsCrossed, name: "Food Processing" },
  { icon: Shirt, name: "Textile" },
  { icon: Plane, name: "Aerospace" },
  { icon: Car, name: "Automotive" },
  { icon: FlaskConical, name: "Chemical" },
  { icon: Fuel, name: "Petrochemical" },
  { icon: Wrench, name: "Machine Tools" },
  { icon: Cpu, name: "Electronics" },
];

const IndustriesSection = () => {
  return (
    <section id="industries" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">
            Trusted Across Sectors
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Industries We Serve
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 bg-background"
            >
              <div className="w-14 h-14 rounded-full bg-primary/5 group-hover:bg-primary flex items-center justify-center transition-colors">
                <ind.icon className="w-6 h-6 text-accent group-hover:text-primary-foreground transition-colors" />
              </div>
              <p className="font-body text-sm font-semibold text-foreground text-center">
                {ind.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
