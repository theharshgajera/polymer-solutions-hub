// Full categorised product keyword list (drives the "Complete Range" SEO section
// and is used to enrich structured data). Each item is a real product+form that
// customers search for in Ahmedabad / Gujarat.

export type KeywordGroup = {
  category: string;
  /** Product page this category maps to, so the list links into the catalogue. */
  slug?: string;
  items: string[];
};

export const productKeywordGroups: KeywordGroup[] = [
  {
    category: "PTFE",
    slug: "ptfe",
    items: [
      "PTFE Rod",
      "PTFE Sheet",
      "PTFE Ring",
      "PTFE Chevron Packing Set",
      "PTFE Gasket",
      "PTFE T Bush",
      "Carbon Filled PTFE",
      "Glass Filled PTFE",
      "Bronze Filled PTFE",
    ],
  },
  {
    category: "Teflon",
    slug: "ptfe",
    items: [
      "Teflon Rod",
      "Teflon Sheet",
      "Teflon Ring",
      "Teflon T Bush",
      "Carbon Filled Teflon",
      "Glass Filled Teflon",
      "Bronze Filled Teflon",
    ],
  },
  {
    category: "Nylon",
    slug: "nylon-6",
    items: ["Nylon Rod", "Nylon Sheet", "Nylon Machined Parts"],
  },
  {
    category: "Cast Nylon",
    slug: "cast-nylon",
    items: [
      "Cast Nylon Rod",
      "Cast Nylon Sheet",
      "Cast Nylon Gear",
      "Cast Nylon TED",
      "Cast Nylon Pad",
      "Cast Nylon Machined Parts",
      "Polyamide Sheet",
      "Polyamide Rod",
      "Bakelite Sheet",
      "Bakelite Rod",
    ],
  },
  {
    category: "Delrin",
    slug: "delrin",
    items: ["Delrin Rod", "Delrin Sheet", "Delrin Machined Parts"],
  },
  {
    category: "POM / Polyacetal",
    slug: "delrin",
    items: ["POM Rod", "POM Sheet", "Polyacetal Rod", "Polyacetal Sheet"],
  },
  {
    category: "PP / Polypropylene",
    slug: "pp",
    items: [
      "PP Rod",
      "PP Sheet",
      "Polypropylene Rod",
      "Polypropylene Sheet",
      "PP Machined Parts",
    ],
  },
  {
    category: "PEEK",
    slug: "peek",
    items: ["PEEK Rod", "PEEK Sheet", "PEEK Machined Parts"],
  },
  {
    category: "UHMWPE",
    slug: "uhmwpe",
    items: ["UHMWPE Rod", "UHMWPE Sheet", "UHMWPE Machined Parts"],
  },
  {
    category: "Piston",
    slug: "pps",
    items: ["PPS Piston", "Icecream Machine Piston", "PEEK Piston", "Turcite Sheet"],
  },
  {
    category: "Roofing Sheet",
    slug: "pc-roofing",
    items: ["Polycarbonate Roofing Sheet"],
  },
  {
    category: "Acrylic",
    slug: "acrylic",
    items: ["Acrylic Sheet", "Acrylic Rod"],
  },
  {
    category: "PU / Polyurethane",
    slug: "pu",
    items: [
      "PU Rod",
      "PU Sheet",
      "PU Bush",
      "PU Wheel",
      "PU Machined Parts",
      "Cast PU",
    ],
  },
  {
    category: "HDPE",
    slug: "hdpe",
    items: ["HDPE Sheet", "HDPE Rod", "HDPE Pipe", "HDPE Machined Parts"],
  },
  {
    category: "Rigid PVC",
    slug: "rigid-pvc",
    items: ["Rigid PVC Rod", "Rigid PVC Sheet"],
  },
  {
    category: "Turbo Fan",
    slug: "turbo-fan",
    items: ["Turbo Fan", "Plastic Turbo Fan"],
  },
];
