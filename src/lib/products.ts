// Single source of truth for the engineering-plastics catalogue.
// Consumed by the Products listing page, the individual ProductDetail pages,
// the Admin image manager and the SEO / structured-data builders.

export type Product = {
  id: string; // URL slug, e.g. /products/ptfe  — also the ImageKit folder name
  name: string;
  desc: string;
  items: string[];
  variants?: { label: string; values: string[] };
  images?: string[]; // populated at runtime from ImageKit
  // Enriched, crawlable content for the individual product page:
  overview?: string;
  features?: string[];
  applications?: string[];
  // Optional SEO overrides (sensible defaults are generated when omitted):
  metaTitle?: string;
  metaDescription?: string;
};

export const rawProducts: Product[] = [
  {
    id: "ptfe",
    name: "PTFE Material (Teflon)",
    desc: "Non-stick, heat-resistant fluoropolymer (also known as Teflon) with outstanding chemical inertness and very low friction. Supplied as PTFE/Teflon rod, sheet, ring, gasket, T bush and chevron packing sets in Ahmedabad, Gujarat.",
    items: ["Rod", "Sheet", "Bush", "T Bush", "Ring", "Gasket", "Chevron Packing Set", "Machined Parts"],
    variants: {
      label: "Filled Grades",
      values: [
        "Carbon Filled PTFE",
        "Glass Filled PTFE",
        "Bronze Filled PTFE",
        "SS Filled PTFE",
        "PEEK Filled PTFE",
      ],
    },
    overview:
      "PTFE (polytetrafluoroethylene), popularly known by the brand name Teflon, is a premium fluoropolymer valued for near-universal chemical inertness, a very low coefficient of friction and a wide service temperature range of roughly -200°C to +260°C. Multi-Tech Polymers manufactures virgin and filled PTFE in Ahmedabad, Gujarat as rod, sheet, bush, ring, gasket and CNC-machined components for demanding sealing, bearing and insulation duties.",
    features: [
      "Excellent chemical resistance to almost all acids, alkalis and solvents",
      "Very low coefficient of friction — self-lubricating and non-stick",
      "Wide operating temperature range: approx. -200°C to +260°C",
      "Outstanding electrical insulation and dielectric strength",
      "Food-grade / FDA-compliant virgin grade available",
      "Filled grades (glass, carbon, bronze, SS, PEEK) for higher wear resistance",
    ],
    applications: [
      "Seals, gaskets and chevron / V-ring packing sets for pumps and valves",
      "Valve seats, bushes and low-friction bearings",
      "Electrical and thermal insulation components",
      "Non-stick linings and slide plates",
      "Pharmaceutical, food and chemical processing equipment",
    ],
  },
  {
    id: "cast-nylon",
    name: "Cast Nylon Material (Polyamide)",
    desc: "Superior wear resistance and mechanical properties. Cast Nylon (Polyamide) rod, sheet, gear, TED, pad and machined parts ideal for heavy-duty industrial use with excellent dimensional stability.",
    items: ["Rod", "Sheet", "Pipe", "Gear", "TED", "Pad", "Pulley", "Machined Parts", "Customized Parts"],
    variants: {
      label: "Grades",
      values: ["MC 901", "Oilon (Green)", "MOS₂ Cast Nylon"],
    },
    overview:
      "Cast Nylon (cast Polyamide 6) is produced by casting the monomer directly into moulds, giving a higher molecular weight, better wear resistance and greater dimensional stability than extruded nylon. It is an ideal lightweight replacement for bronze and steel in gears, bushes and wear parts, and machines cleanly to tight tolerances.",
    features: [
      "High mechanical strength and stiffness",
      "Excellent wear and abrasion resistance",
      "Good fatigue and impact resistance",
      "Self-lubricating grades (Oilon, MoS₂) for reduced friction",
      "Lightweight replacement for bronze and steel",
      "Machines cleanly into gears and custom parts",
    ],
    applications: [
      "Industrial gears, sprockets and bushes",
      "Wear pads, guides and slide strips",
      "Rollers, pulleys and sheaves",
      "Heavy-duty bearings and bushings",
      "Material-handling and conveyor components",
    ],
  },
  {
    id: "pp",
    name: "Polypropylene Material (PP)",
    desc: "Excellent chemical resistance, lightweight, and cost-effective. Suitable for chemical tanks, ducts, and process equipment.",
    items: ["Rod", "Sheet", "Pipe", "Flange", "Machined Parts"],
    overview:
      "Polypropylene (PP) is a lightweight, cost-effective thermoplastic with excellent chemical and corrosion resistance and good weldability. It is widely fabricated into tanks, ducting and process equipment for the chemical and surface-treatment industries.",
    features: [
      "Excellent chemical and corrosion resistance",
      "Lightweight and cost-effective",
      "Good weldability for tanks and ducting",
      "Low moisture absorption",
      "Non-toxic / food-contact grades available",
    ],
    applications: [
      "Chemical storage tanks and scrubbers",
      "Ducting and fume-extraction systems",
      "Pickling plants and process equipment",
      "Fabricated fittings and flanges",
    ],
  },
  {
    id: "delrin",
    name: "Delrin (POM – Polyacetal)",
    desc: "High stiffness, low friction engineering plastic. Delrin / POM / Polyacetal rod and sheet with excellent dimensional stability and fatigue resistance for precision machined parts.",
    items: ["Rod", "Sheet", "Machined Parts"],
    overview:
      "Delrin (POM / Polyacetal) is a high-stiffness engineering plastic combining low friction, excellent dimensional stability and outstanding fatigue endurance. It is the material of choice for precision-machined gears, cams, bushes and small mechanical parts.",
    features: [
      "High stiffness and mechanical strength",
      "Low friction and excellent wear resistance",
      "Outstanding dimensional stability",
      "Low moisture absorption",
      "Good fatigue endurance for cyclic loads",
      "Machines to very tight tolerances",
    ],
    applications: [
      "Precision gears, cams and bearings",
      "Bushes, rollers and guides",
      "Electrical insulating parts",
      "Conveyor and automation components",
      "Fasteners and snap-fit parts",
    ],
  },
  {
    id: "nylon-6",
    name: "Nylon 6 (Polyamide 6)",
    desc: "High-strength extruded polyamide with great mechanical strength and abrasion resistance.",
    items: ["Rod"],
    overview:
      "Nylon 6 (extruded Polyamide 6) is a tough, high-strength engineering plastic with good abrasion and chemical resistance. As a lightweight metal replacement it is widely machined into bushes, bearings and wear parts.",
    features: [
      "High tensile and mechanical strength",
      "Good abrasion and wear resistance",
      "Good resistance to oils and fuels",
      "Lightweight alternative to metals",
      "Readily machined",
    ],
    applications: [
      "Bushes, bearings and wear pads",
      "Rollers and guide wheels",
      "General engineering and machined parts",
    ],
  },
  {
    id: "bakelite",
    name: "Bakelite (Hylam)",
    desc: "Laminated phenolic material with high electrical insulation and mechanical strength for electrical applications.",
    items: ["Sheet", "Rod"],
    overview:
      "Bakelite (Hylam) is a laminated phenolic material offering high electrical insulation, good mechanical strength and heat resistance. It is a long-established choice for switchgear, insulating panels and machined electrical components.",
    features: [
      "High electrical insulation / dielectric strength",
      "Good mechanical strength and rigidity",
      "Heat and flame resistant",
      "Dimensionally stable",
      "Available in sheet and rod",
    ],
    applications: [
      "Electrical insulation panels and barriers",
      "Switchgear and transformer components",
      "Terminal boards and insulating spacers",
      "Machined insulating parts",
    ],
  },
  {
    id: "peek",
    name: "PEEK",
    desc: "Premium high-performance polymer for aerospace, medical, and extreme temperature applications up to 260°C.",
    items: ["Rod", "Sheet", "Machined Parts"],
    overview:
      "PEEK (polyether ether ketone) is a premium high-performance polymer with a continuous service temperature around 260°C, exceptional mechanical strength and outstanding chemical and wear resistance. It serves the most demanding aerospace, medical, semiconductor and oil-and-gas applications.",
    features: [
      "Continuous service temperature up to ~260°C",
      "Outstanding chemical and hydrolysis resistance",
      "Very high mechanical strength and stiffness",
      "Excellent wear and fatigue resistance",
      "Inherently flame retardant with low smoke",
      "Biocompatible / medical grades available",
    ],
    applications: [
      "Aerospace and automotive components",
      "Medical and analytical instrument parts",
      "Semiconductor and high-temperature seals",
      "Bearings, bushes and pistons",
      "Chemical and oil-and-gas components",
    ],
  },
  {
    id: "uhmwpe",
    name: "UHMWPE",
    desc: "Ultra-high molecular weight polyethylene with extreme abrasion resistance, low friction, and outstanding impact strength.",
    items: ["Rod", "Sheet", "Machined Parts"],
    overview:
      "UHMWPE (ultra-high molecular weight polyethylene) offers extreme abrasion resistance, a very low coefficient of friction and outstanding impact strength even at low temperatures. It is the go-to lining and wear material for bulk material handling.",
    features: [
      "Extremely high abrasion and wear resistance",
      "Very low coefficient of friction — self-lubricating",
      "Outstanding impact strength, even at low temperature",
      "Excellent chemical resistance",
      "Non-stick, non-absorbent surface",
      "FDA-compliant grades available",
    ],
    applications: [
      "Wear strips, guide rails and chain guides",
      "Chute, hopper and silo liners",
      "Conveyor and material-handling parts",
      "Star wheels and idlers",
      "Bulk-material lining",
    ],
  },
  {
    id: "turcite",
    name: "Turcite",
    desc: "PTFE-based bearing material providing low friction, stick-slip free movement for machine tool slideways.",
    items: ["Sheet"],
    overview:
      "Turcite is a PTFE-based bearing material engineered for machine-tool slideways. Bonded to guideways it delivers low friction, stick-slip-free motion and improved positioning accuracy, extending the life of precision machinery.",
    features: [
      "Low friction, stick-slip-free movement",
      "Excellent wear resistance",
      "Good load-bearing capacity",
      "Bondable to machine slideways",
      "Improves positioning accuracy",
    ],
    applications: [
      "Machine-tool slideways and guideways",
      "CNC and precision machinery",
      "Retrofitting worn slideways",
    ],
  },
  {
    id: "pc-roofing",
    name: "Polycarbonate Roofing Sheet",
    desc: "Turbo / generic polycarbonate roofing sheets — impact resistant, weatherproof and lightweight roofing solution.",
    items: ["Roofing Sheet"],
    overview:
      "Polycarbonate roofing sheets are a lightweight, virtually unbreakable and weatherproof roofing solution. UV-protected for outdoor durability, they transmit natural light while withstanding impact, making them ideal for skylights, canopies and industrial roofing.",
    features: [
      "High impact resistance — virtually unbreakable",
      "UV-protected for outdoor weathering",
      "Lightweight and easy to install",
      "Good natural-light transmission",
      "Weatherproof and durable",
    ],
    applications: [
      "Industrial and commercial roofing",
      "Skylights and canopies",
      "Walkway and parking covers",
      "Greenhouses and sheds",
    ],
  },
  {
    id: "polycarbonate",
    name: "Polycarbonate Sheet",
    desc: "Impact-resistant, optically clear engineering plastic — 250x stronger than glass with excellent transparency.",
    items: ["Sheet"],
    overview:
      "Polycarbonate sheet is an optically clear engineering plastic with up to 250 times the impact strength of glass at roughly half the weight. It is easily fabricated and thermoformed for glazing, machine guards and safety applications.",
    features: [
      "Up to 250× the impact strength of glass",
      "Optically clear",
      "Lightweight",
      "Good temperature resistance",
      "Easy to fabricate and thermoform",
    ],
    applications: [
      "Machine guards and safety glazing",
      "Signage and displays",
      "Protective shields and partitions",
      "Skylights and glazing",
    ],
  },
  {
    id: "acrylic",
    name: "Acrylic Sheet & Rod",
    desc: "Crystal-clear, weather-resistant acrylic sheet and rod ideal for displays, signage and glazing applications.",
    items: ["Sheet", "Rod"],
    overview:
      "Acrylic (PMMA) is a crystal-clear, weather-resistant plastic with excellent optical clarity at roughly half the weight of glass. Easily machined and polished, acrylic sheet and rod are widely used for displays, signage, glazing and light diffusion.",
    features: [
      "Crystal-clear, high optical clarity",
      "Excellent weather and UV resistance",
      "Lightweight — about half the weight of glass",
      "Good machinability and polishability",
      "Available in sheet and rod",
    ],
    applications: [
      "Displays, signage and POP stands",
      "Glazing and skylights",
      "Light fittings and diffusers",
      "Fabricated enclosures",
    ],
  },
  {
    id: "pu",
    name: "Polyurethane (PU)",
    desc: "Outstanding abrasion resistance, high load-bearing capacity, and excellent resilience for industrial rollers, wheels and seals.",
    items: ["Rod", "Sheet", "Bush", "Wheel", "Trolley Wheel", "Stecker Wheel"],
    overview:
      "Polyurethane (PU) combines outstanding abrasion and tear resistance with high load-bearing capacity and excellent resilience. Available in a range of hardnesses, it is ideal for industrial wheels, rollers, bushes and seals subjected to heavy wear.",
    features: [
      "Outstanding abrasion and tear resistance",
      "High load-bearing capacity",
      "Excellent resilience and elasticity",
      "Good oil and grease resistance",
      "Available in various hardness (Shore) grades",
    ],
    applications: [
      "Industrial wheels and trolley wheels",
      "Rollers and forklift / stacker wheels",
      "Bushes, seals and coupling elements",
      "Wear pads and scrapers",
    ],
  },
  {
    id: "hdpe",
    name: "HDPE",
    desc: "High density polyethylene for versatile industrial applications. HDPE sheet, rod, pipe and machined parts — chemical resistant with FDA compliant grades available.",
    items: ["Rod", "Sheet", "Pipe", "Machined Parts"],
    overview:
      "HDPE (high-density polyethylene) is a versatile, chemically resistant thermoplastic with low moisture absorption and good impact strength. Lightweight and easily welded, it is widely used for tanks, food-contact parts, linings and machined components.",
    features: [
      "Excellent chemical and corrosion resistance",
      "Low moisture absorption",
      "Good impact strength and toughness",
      "Lightweight and easy to weld",
      "FDA-compliant grades available",
    ],
    applications: [
      "Chemical tanks and fabrications",
      "Cutting boards and food-contact parts",
      "Wear and lining applications",
      "Pipes, fittings and machined parts",
    ],
  },
  {
    id: "rigid-pvc",
    name: "Rigid PVC",
    desc: "Cost-effective, chemically resistant rigid PVC for chemical processing, fabrication and construction applications.",
    items: ["Sheet", "Rod"],
    overview:
      "Rigid PVC is a cost-effective, chemically resistant and self-extinguishing plastic that is easy to fabricate and weld. It is widely used for chemical process equipment, ducting and electrical insulation parts.",
    features: [
      "Good chemical and corrosion resistance",
      "Rigid and dimensionally stable",
      "Flame retardant (self-extinguishing)",
      "Good electrical insulation",
      "Easy to fabricate and weld",
    ],
    applications: [
      "Chemical process equipment and tanks",
      "Ducting and ventilation",
      "Fabricated fittings and covers",
      "Electrical insulation parts",
    ],
  },
  {
    id: "cast-pu",
    name: "Cast Polyurethane",
    desc: "Cast PU with excellent tear strength, abrasion resistance and load-bearing capability for custom industrial parts.",
    items: ["Custom Cast Parts"],
    overview:
      "Cast polyurethane is moulded to near-net shape in custom hardnesses, delivering excellent tear strength, abrasion resistance and load-bearing capability. It is ideal for bespoke rollers, wheels, pads and wear parts made to customer specification.",
    features: [
      "Excellent tear and abrasion resistance",
      "High load-bearing capability",
      "Custom hardness and dimensions",
      "Good resilience and rebound",
      "Cast to near-net shape",
    ],
    applications: [
      "Custom rollers and wheels",
      "Pads, buffers and mounts",
      "Screen panels and liners",
      "Bespoke industrial parts",
    ],
  },
  {
    id: "pps",
    name: "PPS Piston",
    desc: "High-performance engineering thermoplastic pistons with exceptional thermal stability and chemical resistance — PPS piston, PEEK piston and icecream machine piston.",
    items: ["Piston"],
    variants: {
      label: "Piston Types",
      values: ["PPS Piston", "PEEK Piston", "Icecream Machine Piston"],
    },
    overview:
      "PPS (polyphenylene sulphide) pistons offer exceptional thermal stability, chemical resistance and dimensional stability under load. Precision-machined PPS, PEEK and icecream-machine pistons are supplied to customer specification for high-temperature and food-machinery duties.",
    features: [
      "Exceptional thermal stability",
      "Excellent chemical resistance",
      "Dimensional stability under load",
      "Low moisture absorption",
      "Precision-machined to specification",
    ],
    applications: [
      "Icecream and food-machine pistons",
      "Pump and dispensing pistons",
      "High-temperature sealing components",
    ],
  },
  {
    id: "turbo-fan",
    name: "High Performance Turbo Fan",
    desc: "Industrial-grade turbo fan with a heavy-duty plastic body. Designed for powerful airflow, energy efficiency, and low-noise, long-lasting performance.",
    items: [],
    variants: {
      label: "Features",
      values: [
        "High Speed Air Delivery",
        "Energy Efficient Design",
        "Low Noise Operation",
        "Bulk Supply Available",
      ],
    },
    overview:
      "The high-performance turbo fan pairs a heavy-duty plastic body with a high-speed impeller for powerful, energy-efficient airflow. Engineered for low-noise, long-lasting operation, it suits industrial ventilation, cooling and air-circulation duties and is available for bulk supply.",
    features: [
      "High-speed, high-volume air delivery",
      "Energy-efficient design",
      "Low-noise operation",
      "Heavy-duty plastic body",
      "Bulk supply available",
    ],
    applications: [
      "Industrial ventilation and cooling",
      "Workshops and warehouses",
      "Exhaust and air-circulation systems",
    ],
  },
];

/** Look up a product by its URL slug. */
export const getProductBySlug = (id?: string): Product | undefined =>
  id ? rawProducts.find((p) => p.id === id) : undefined;

/** All product slugs — handy for sitemaps and static generation. */
export const productSlugs = rawProducts.map((p) => p.id);
