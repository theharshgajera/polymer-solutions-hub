// Full categorised product keyword list (drives the "Complete Range" SEO section
// and is used to enrich structured data). Each item is a real product+form that
// customers search for in Ahmedabad / Gujarat.

export type KeywordGroup = {
  category: string;
  items: string[];
};

export const productKeywordGroups: KeywordGroup[] = [
  {
    category: "PTFE",
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
    items: ["Nylon Rod", "Nylon Sheet", "Nylon Machined Parts"],
  },
  {
    category: "Cast Nylon",
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
    items: ["Delrin Rod", "Delrin Sheet", "Delrin Machined Parts"],
  },
  {
    category: "POM / Polyacetal",
    items: ["POM Rod", "POM Sheet", "Polyacetal Rod", "Polyacetal Sheet"],
  },
  {
    category: "PP / Polypropylene",
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
    items: ["PEEK Rod", "PEEK Sheet", "PEEK Machined Parts"],
  },
  {
    category: "UHMWPE",
    items: ["UHMWPE Rod", "UHMWPE Sheet", "UHMWPE Machined Parts"],
  },
  {
    category: "Piston",
    items: ["PPS Piston", "Icecream Machine Piston", "PEEK Piston", "Turcite Sheet"],
  },
  {
    category: "Roofing Sheet",
    items: ["Polycarbonate Roofing Sheet"],
  },
  {
    category: "Acrylic",
    items: ["Acrylic Sheet", "Acrylic Rod"],
  },
  {
    category: "PU / Polyurethane",
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
    items: ["HDPE Sheet", "HDPE Rod", "HDPE Pipe", "HDPE Machined Parts"],
  },
  {
    category: "Rigid PVC",
    items: ["Rigid PVC Rod", "Rigid PVC Sheet"],
  },
  {
    category: "Turbo Fan",
    items: ["Turbo Fan", "Plastic Turbo Fan"],
  },
];
