// Per-product SEO layer: search-intent titles/descriptions, the typical
// properties table, product-level FAQs and hand-picked internal links.
//
// Kept separate from products.ts so the catalogue stays the catalogue and the
// search-targeting copy can be edited without touching product data.
//
// Spec values are typical published properties for the polymer class, quoted as
// ranges for guidance — exact figures depend on grade and are confirmed by the
// technical team (see SPEC_DISCLAIMER).

export type ProductSpec = { label: string; value: string };
export type ProductFaq = { q: string; a: string };

export type ProductSeo = {
  /** <title> — leads with the search term, city qualified. */
  metaTitle: string;
  /** Meta description, ~150-160 chars, with a call to action. */
  metaDescription: string;
  /** Focused keyword set for this page. */
  keywords: string;
  /** Visible H1 — carries the primary keyword, unlike the bare catalogue name. */
  h1: string;
  /** Synonyms searchers use; surfaced on-page and in Product schema. */
  alsoKnownAs?: string[];
  /** Typical published properties, rendered as a crawlable table. */
  specs?: ProductSpec[];
  /** Product-level Q&A — long-tail queries and AI-answer surfaces. */
  faqs?: ProductFaq[];
  /** Slugs of genuinely related products for internal linking. */
  related?: string[];
};

export const SPEC_DISCLAIMER =
  "Typical published values for the polymer class, given for guidance only. Exact properties vary by grade and filler — contact our technical team to confirm figures for your application.";

const CITY = "Ahmedabad";

export const productSeo: Record<string, ProductSeo> = {
  ptfe: {
    metaTitle: "PTFE & Teflon Rod, Sheet, Bush Manufacturer in Ahmedabad",
    metaDescription:
      "PTFE (Teflon) rod, sheet, bush, ring & gasket manufacturer in Ahmedabad, Gujarat. Virgin and filled grades — carbon, glass, bronze. Call +91 98984 70707.",
    keywords:
      "PTFE rod, PTFE sheet, Teflon rod, Teflon sheet, PTFE bush, PTFE T bush, PTFE ring, PTFE gasket, PTFE chevron packing set, carbon filled PTFE, glass filled PTFE, bronze filled PTFE, PTFE manufacturer Ahmedabad, Teflon supplier Gujarat",
    h1: "PTFE (Teflon) Rod, Sheet & Bush Manufacturer in Ahmedabad",
    alsoKnownAs: ["Teflon", "Polytetrafluoroethylene", "PTFE fluoropolymer"],
    specs: [
      { label: "Material", value: "PTFE (polytetrafluoroethylene) — virgin & filled grades" },
      { label: "Density", value: "2.13 – 2.20 g/cm³" },
      { label: "Service temperature", value: "approx. −200 °C to +260 °C" },
      { label: "Coefficient of friction", value: "0.05 – 0.10 (one of the lowest of any solid)" },
      { label: "Tensile strength", value: "20 – 35 MPa (virgin grade)" },
      { label: "Water absorption", value: "< 0.01 %" },
      { label: "Dielectric strength", value: "approx. 60 kV/mm" },
      { label: "Chemical resistance", value: "Inert to almost all acids, alkalis and solvents" },
      { label: "Colour", value: "White (virgin); filled grades in black, brown or grey" },
      { label: "Available forms", value: "Rod, sheet, bush, T bush, ring, gasket, chevron packing set, machined parts" },
    ],
    faqs: [
      {
        q: "Are PTFE and Teflon the same material?",
        a: "Yes — Teflon is a brand name for PTFE (polytetrafluoroethylene). When customers ask for a Teflon rod, Teflon sheet or Teflon bush in Ahmedabad, they are asking for the same PTFE material we manufacture and machine here in Gujarat.",
      },
      {
        q: "What is the maximum working temperature of PTFE?",
        a: "Virgin PTFE has a continuous service range of roughly −200 °C to +260 °C, which is why it is used for high-temperature seals, gaskets and insulation. For loads at elevated temperature, filled grades such as glass-filled or carbon-filled PTFE hold their shape better.",
      },
      {
        q: "Which filled PTFE grade should I choose?",
        a: "Glass-filled PTFE improves wear resistance and reduces creep under load; carbon-filled PTFE adds thermal conductivity and hardness for dynamic seals; bronze-filled PTFE gives the highest wear resistance for heavily loaded bearings; SS and PEEK filled grades suit aggressive chemical or high-load duty. Tell us the pressure, speed and chemical exposure and we will recommend a grade.",
      },
      {
        q: "Can you machine PTFE parts to my drawing?",
        a: `Yes. We CNC-machine PTFE components to customer drawings at our ${CITY} works — valve seats, bushes, seal rings, gaskets and chevron packing sets — and supply across Gujarat and India. Send your drawing on WhatsApp for a quotation.`,
      },
    ],
    related: ["turcite", "peek", "pps"],
  },

  "cast-nylon": {
    metaTitle: "Cast Nylon Rod, Sheet & Gear Manufacturer in Ahmedabad",
    metaDescription:
      "Cast Nylon (Polyamide) rod, sheet, gear, pad & machined parts manufacturer in Ahmedabad, Gujarat. MC 901, Oilon & MoS₂ grades. Call +91 98984 70707.",
    keywords:
      "cast nylon rod, cast nylon sheet, cast nylon gear, cast nylon pad, cast nylon TED, polyamide rod, polyamide sheet, MC 901 nylon, Oilon nylon, MoS2 cast nylon, cast nylon manufacturer Ahmedabad, nylon gear supplier Gujarat",
    h1: "Cast Nylon Rod, Sheet & Gear Manufacturer in Ahmedabad",
    alsoKnownAs: ["Cast Polyamide", "PA 6 G", "MC Nylon"],
    specs: [
      { label: "Material", value: "Cast Polyamide 6 (cast nylon)" },
      { label: "Density", value: "1.14 – 1.16 g/cm³" },
      { label: "Service temperature", value: "−40 °C to +100 °C continuous (short-term higher)" },
      { label: "Tensile strength", value: "75 – 85 MPa" },
      { label: "Hardness", value: "approx. 80 Shore D" },
      { label: "Water absorption", value: "2 – 3 % (in air); higher at saturation" },
      { label: "Grades", value: "MC 901 (blue), Oilon (green, oil-filled), MoS₂ (black)" },
      { label: "Colour", value: "Natural ivory, blue, green or black by grade" },
      { label: "Available forms", value: "Rod, sheet, pipe, gear, TED, pad, pulley, machined & customised parts" },
    ],
    faqs: [
      {
        q: "What is the difference between cast nylon and extruded nylon?",
        a: "Cast nylon is polymerised directly in the mould, which gives a higher molecular weight, better wear resistance, greater dimensional stability and much larger available sections than extruded Nylon 6. Extruded nylon is usually the economical choice for small-diameter rod; cast nylon is preferred for gears, large bushes and heavy wear parts.",
      },
      {
        q: "Can cast nylon replace bronze or steel gears?",
        a: "In many applications, yes. Cast nylon gears and bushes run quieter, weigh roughly one-seventh of bronze, need little or no lubrication (especially in Oilon or MoS₂ grades) and do not corrode. We machine cast nylon gears, sprockets, pulleys and wear pads to drawing.",
      },
      {
        q: "Which cast nylon grade is best for unlubricated running?",
        a: "Oilon (the green oil-filled grade) is formulated for dry or poorly lubricated running and gives a lower coefficient of friction and longer life in bushes and slide elements. MoS₂ grade improves bearing performance and wear where loads are high.",
      },
    ],
    related: ["nylon-6", "delrin", "uhmwpe"],
  },

  pp: {
    metaTitle: "Polypropylene (PP) Rod, Sheet & Pipe Supplier in Ahmedabad",
    metaDescription:
      "PP (polypropylene) rod, sheet, pipe & flange supplier in Ahmedabad, Gujarat. Chemical-resistant, weldable grades for tanks and ducting. Call +91 98984 70707.",
    keywords:
      "PP rod, PP sheet, polypropylene rod, polypropylene sheet, PP pipe, PP flange, PP machined parts, polypropylene supplier Ahmedabad, PP sheet manufacturer Gujarat, chemical tank plastic sheet",
    h1: "Polypropylene (PP) Rod, Sheet & Pipe Supplier in Ahmedabad",
    alsoKnownAs: ["PP", "Polypropylene", "PPH / PPCP"],
    specs: [
      { label: "Material", value: "Polypropylene (PP)" },
      { label: "Density", value: "0.90 – 0.92 g/cm³ (floats on water)" },
      { label: "Service temperature", value: "0 °C to +100 °C continuous" },
      { label: "Tensile strength", value: "30 – 35 MPa" },
      { label: "Water absorption", value: "< 0.02 %" },
      { label: "Chemical resistance", value: "Excellent to acids, alkalis and most salts" },
      { label: "Weldability", value: "Readily hot-gas and extrusion welded" },
      { label: "Available forms", value: "Rod, sheet, pipe, flange, machined parts" },
    ],
    faqs: [
      {
        q: "Is polypropylene suitable for chemical storage tanks?",
        a: "Yes. PP sheet is one of the most widely used materials for chemical tanks, scrubbers, pickling plants and fume ducting because it resists most acids and alkalis, is easy to hot-gas weld and is light enough to fabricate large vessels economically.",
      },
      {
        q: "What thickness of PP sheet do you supply?",
        a: `We stock and supply PP sheet in the thicknesses commonly used for tank and duct fabrication, along with PP rod, pipe and flanges. Share your fabrication drawing or size list and we will quote from ${CITY} for delivery across Gujarat and India.`,
      },
      {
        q: "PP or HDPE — which should I use?",
        a: "PP handles higher temperatures (up to about 100 °C) and is stiffer, making it the usual choice for hot chemical tanks and ducting. HDPE is tougher at low temperature and has better impact strength, so it is preferred for outdoor tanks, liners and food-contact parts.",
      },
    ],
    related: ["hdpe", "rigid-pvc", "uhmwpe"],
  },

  delrin: {
    metaTitle: "Delrin / POM Rod & Sheet Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "Delrin (POM / Polyacetal) rod, sheet & precision machined parts in Ahmedabad, Gujarat. High stiffness, low friction, tight tolerances. Call +91 98984 70707.",
    keywords:
      "Delrin rod, Delrin sheet, POM rod, POM sheet, polyacetal rod, polyacetal sheet, acetal rod, Delrin machined parts, Delrin supplier Ahmedabad, POM sheet manufacturer Gujarat",
    h1: "Delrin (POM / Polyacetal) Rod & Sheet Supplier in Ahmedabad",
    alsoKnownAs: ["POM", "Polyacetal", "Acetal", "Delrin"],
    specs: [
      { label: "Material", value: "POM-C / POM-H (acetal homopolymer & copolymer)" },
      { label: "Density", value: "1.41 – 1.42 g/cm³" },
      { label: "Service temperature", value: "−40 °C to +100 °C continuous" },
      { label: "Tensile strength", value: "62 – 70 MPa" },
      { label: "Coefficient of friction", value: "0.20 – 0.35" },
      { label: "Water absorption", value: "0.2 – 0.9 %" },
      { label: "Machinability", value: "Excellent — holds very tight tolerances" },
      { label: "Colour", value: "Natural white and black" },
      { label: "Available forms", value: "Rod, sheet, machined parts" },
    ],
    faqs: [
      {
        q: "Are Delrin, POM and Polyacetal the same thing?",
        a: "Yes — Delrin is DuPont's brand name for acetal homopolymer, while POM and Polyacetal are the generic names for the same family of engineering plastic. Customers searching for Delrin rod, POM sheet or Polyacetal rod in Ahmedabad are all served by this material.",
      },
      {
        q: "Delrin or Nylon — which is better for precision parts?",
        a: "Delrin (POM) is the better choice where dimensional stability matters: it absorbs far less moisture than nylon, so machined parts hold size in humid conditions, and it is stiffer with excellent fatigue endurance. Nylon wins where higher impact strength and abrasion resistance are needed.",
      },
      {
        q: "Do you machine Delrin gears and bushes to drawing?",
        a: "Yes. Delrin machines cleanly to very tight tolerances, and we produce precision gears, cams, bushes, rollers and snap-fit components to customer drawings from our Ahmedabad works.",
      },
    ],
    related: ["nylon-6", "cast-nylon", "peek"],
  },

  "nylon-6": {
    metaTitle: "Nylon 6 Rod Manufacturer & Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "Nylon 6 (Polyamide 6) rod supplier in Ahmedabad, Gujarat — high strength and abrasion resistant, machined into bushes, bearings and wear parts.",
    keywords:
      "nylon rod, nylon 6 rod, polyamide 6 rod, nylon machined parts, nylon bush, nylon bearing, nylon rod supplier Ahmedabad, nylon rod manufacturer Gujarat, extruded nylon rod",
    h1: "Nylon 6 (Polyamide 6) Rod Supplier in Ahmedabad",
    alsoKnownAs: ["Nylon", "Polyamide 6", "PA 6", "Extruded nylon"],
    specs: [
      { label: "Material", value: "Extruded Polyamide 6 (Nylon 6)" },
      { label: "Density", value: "1.13 – 1.15 g/cm³" },
      { label: "Service temperature", value: "−30 °C to +100 °C continuous" },
      { label: "Tensile strength", value: "70 – 80 MPa (dry as moulded)" },
      { label: "Water absorption", value: "2.5 – 3 % (in air)" },
      { label: "Resistance", value: "Good against oils, fuels and greases" },
      { label: "Colour", value: "Natural ivory and black" },
      { label: "Available forms", value: "Rod" },
    ],
    faqs: [
      {
        q: "What is Nylon 6 rod used for?",
        a: "Nylon 6 rod is machined into bushes, bearings, wear pads, rollers, guide wheels and general engineering components. It is a lightweight, quiet, corrosion-free replacement for bronze and steel in moderately loaded moving parts.",
      },
      {
        q: "Should I use Nylon 6 or Cast Nylon?",
        a: "Extruded Nylon 6 is economical and ideal for smaller-diameter machined parts. Cast Nylon offers better wear resistance, greater dimensional stability and much larger sections, so it is the better choice for gears, large bushes and heavy-duty wear components. We supply both from Ahmedabad.",
      },
      {
        q: "Does nylon absorb moisture?",
        a: "Yes — nylon absorbs 2–3 % moisture in normal air, which slightly increases toughness but also causes dimensional growth. Where tight tolerances must hold in humid conditions, Delrin (POM) or PTFE is usually the better selection.",
      },
    ],
    related: ["cast-nylon", "delrin", "uhmwpe"],
  },

  bakelite: {
    metaTitle: "Bakelite (Hylam) Sheet & Rod Supplier in Ahmedabad",
    metaDescription:
      "Bakelite / Hylam laminated phenolic sheet & rod supplier in Ahmedabad, Gujarat — high dielectric strength for switchgear and insulation panels.",
    keywords:
      "bakelite sheet, bakelite rod, hylam sheet, hylam rod, phenolic laminate sheet, electrical insulation sheet, bakelite supplier Ahmedabad, bakelite sheet manufacturer Gujarat",
    h1: "Bakelite (Hylam) Sheet & Rod Supplier in Ahmedabad",
    alsoKnownAs: ["Hylam", "Phenolic laminate", "Electrical grade laminate"],
    specs: [
      { label: "Material", value: "Laminated phenolic (paper / fabric reinforced)" },
      { label: "Density", value: "1.35 – 1.45 g/cm³" },
      { label: "Service temperature", value: "up to approx. +120 °C" },
      { label: "Dielectric strength", value: "approx. 10 – 20 kV/mm" },
      { label: "Flexural strength", value: "100 – 140 MPa" },
      { label: "Properties", value: "Heat resistant, flame retardant, dimensionally stable" },
      { label: "Colour", value: "Brown / black" },
      { label: "Available forms", value: "Sheet, rod" },
    ],
    faqs: [
      {
        q: "Is Bakelite the same as Hylam sheet?",
        a: "In Indian industry the names are used interchangeably. Hylam is a well-known brand of laminated phenolic sheet, and Bakelite is the original trade name for phenolic resin. Both describe the electrical-grade laminated phenolic sheet and rod we supply from Ahmedabad.",
      },
      {
        q: "What is Bakelite sheet used for?",
        a: "It is used wherever electrical insulation and mechanical strength are needed together — switchgear panels, transformer components, terminal boards, insulating barriers, spacers and machined insulating parts.",
      },
      {
        q: "Can Bakelite sheet be machined and drilled?",
        a: "Yes. Phenolic laminate cuts, drills and machines readily into panels, washers, bushes and insulating profiles. We machine components to customer drawings alongside supplying plain sheet and rod.",
      },
    ],
    related: ["rigid-pvc", "ptfe", "delrin"],
  },

  peek: {
    metaTitle: "PEEK Rod & Sheet Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "PEEK rod, sheet & machined parts supplier in Ahmedabad, Gujarat. High-performance polymer for 260 °C service — aerospace, medical, semiconductor.",
    keywords:
      "PEEK rod, PEEK sheet, PEEK machined parts, PEEK piston, polyether ether ketone, high temperature plastic rod, PEEK supplier Ahmedabad, PEEK rod manufacturer Gujarat",
    h1: "PEEK Rod, Sheet & Machined Parts Supplier in Ahmedabad",
    alsoKnownAs: ["Polyether ether ketone", "PEEK 450G", "High-performance thermoplastic"],
    specs: [
      { label: "Material", value: "PEEK (polyether ether ketone) — unfilled & filled grades" },
      { label: "Density", value: "1.30 – 1.32 g/cm³" },
      { label: "Continuous service temperature", value: "approx. +260 °C" },
      { label: "Melting point", value: "approx. 343 °C" },
      { label: "Glass transition temperature", value: "approx. 143 °C" },
      { label: "Tensile strength", value: "90 – 100 MPa" },
      { label: "Water absorption", value: "approx. 0.5 %" },
      { label: "Flammability", value: "Inherently flame retardant, low smoke" },
      { label: "Available forms", value: "Rod, sheet, machined parts, pistons" },
    ],
    faqs: [
      {
        q: "Why is PEEK more expensive than other engineering plastics?",
        a: "PEEK is a high-performance polymer with a continuous service temperature near 260 °C, metal-like strength and near-universal chemical resistance. The raw polymer itself is costly, but a PEEK part often outlasts several cheaper components, which is why it is specified for aerospace, medical, semiconductor and oil-and-gas duty.",
      },
      {
        q: "Can PEEK replace metal components?",
        a: "In many cases yes. PEEK offers high strength and stiffness at roughly one-fifth the weight of steel, will not corrode, and runs with lower friction — so it is used for bearings, bushes, pistons, seal rings and instrument parts that previously had to be metal.",
      },
      {
        q: "Do you supply PEEK pistons?",
        a: "Yes. We machine PEEK pistons alongside PPS and icecream-machine pistons to customer specification. Send your drawing or a sample and we will quote from our Ahmedabad works.",
      },
    ],
    related: ["ptfe", "pps", "delrin"],
  },

  uhmwpe: {
    metaTitle: "UHMWPE Sheet & Rod Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "UHMWPE sheet, rod & machined parts supplier in Ahmedabad, Gujarat — extreme abrasion resistance and low friction for wear strips, liners and conveyor parts.",
    keywords:
      "UHMWPE sheet, UHMWPE rod, UHMWPE machined parts, ultra high molecular weight polyethylene, wear strip, chute liner, conveyor guide rail, UHMWPE supplier Ahmedabad, UHMWPE sheet Gujarat",
    h1: "UHMWPE Sheet, Rod & Wear Parts Supplier in Ahmedabad",
    alsoKnownAs: ["Ultra high molecular weight polyethylene", "PE-UHMW", "PE 1000"],
    specs: [
      { label: "Material", value: "Ultra-high molecular weight polyethylene" },
      { label: "Density", value: "0.93 – 0.94 g/cm³" },
      { label: "Service temperature", value: "−200 °C to +80 °C" },
      { label: "Coefficient of friction", value: "0.10 – 0.20 — self-lubricating" },
      { label: "Abrasion resistance", value: "Higher than steel in sliding bulk-material wear" },
      { label: "Water absorption", value: "< 0.01 %" },
      { label: "Impact strength", value: "Outstanding, retained at low temperature" },
      { label: "Colour", value: "Natural white, green, black" },
      { label: "Available forms", value: "Rod, sheet, machined parts" },
    ],
    faqs: [
      {
        q: "What makes UHMWPE better than normal polyethylene?",
        a: "Its molecular chains are far longer than standard HDPE, which gives dramatically higher abrasion resistance, better impact strength and a lower coefficient of friction. That is why UHMWPE is chosen for chute liners, wear strips and guide rails where HDPE would wear out quickly.",
      },
      {
        q: "Where is UHMWPE sheet typically used?",
        a: "Chute, hopper and silo liners, conveyor wear strips and guide rails, chain guides, star wheels, idlers and material-handling components — anywhere abrasive bulk material slides against a surface.",
      },
      {
        q: "Is UHMWPE food-safe?",
        a: "FDA-compliant grades are available and are widely used in food-processing conveyors and handling equipment. Tell us the application and we will supply the appropriate grade.",
      },
    ],
    related: ["hdpe", "cast-nylon", "ptfe"],
  },

  turcite: {
    metaTitle: "Turcite Slideway Sheet Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "Turcite PTFE-based slideway sheet supplier in Ahmedabad, Gujarat. Stick-slip-free, low-friction bearing material for machine-tool guideways and CNC retrofits.",
    keywords:
      "Turcite sheet, Turcite B, slideway material, machine tool slideway sheet, PTFE bearing sheet, stick slip free slideway, Turcite supplier Ahmedabad, Turcite sheet Gujarat",
    h1: "Turcite Slideway Sheet Supplier in Ahmedabad",
    alsoKnownAs: ["Turcite B", "Slideway liner", "PTFE bearing sheet"],
    specs: [
      { label: "Material", value: "PTFE-based bearing composite" },
      { label: "Form", value: "Sheet / strip for bonding to slideways" },
      { label: "Friction behaviour", value: "Low friction, stick-slip-free motion" },
      { label: "Fitting", value: "Bonded to machined guideways with structural epoxy adhesive" },
      { label: "Benefit", value: "Restores worn slideways and improves positioning accuracy" },
      { label: "Typical use", value: "Machine-tool and CNC guideways" },
    ],
    faqs: [
      {
        q: "What is Turcite used for on machine tools?",
        a: "Turcite is bonded to machine-tool slideways as a low-friction bearing surface. It eliminates stick-slip at very low feed rates, improves positioning accuracy and protects the cast-iron guideway from wear — commonly used both on new machines and when retrofitting worn slideways.",
      },
      {
        q: "How is Turcite sheet fitted?",
        a: "The guideway is machined back by the material thickness, cleaned, and the Turcite is bonded on with a structural epoxy adhesive, then scraped or machined to final flatness. We supply the sheet cut to your required size.",
      },
      {
        q: "Do you supply Turcite in Gujarat?",
        a: `Yes — we stock and supply Turcite slideway sheet from ${CITY} to machine-tool builders, rebuilders and maintenance workshops across Gujarat and India. Call +91 98984 70707 with your size requirement.`,
      },
    ],
    related: ["ptfe", "uhmwpe", "cast-nylon"],
  },

  "pc-roofing": {
    metaTitle: "Polycarbonate Roofing Sheet Supplier in Ahmedabad",
    metaDescription:
      "Polycarbonate roofing sheet supplier in Ahmedabad, Gujarat — UV-protected, impact-resistant, lightweight sheets for roofing, skylights and canopies.",
    keywords:
      "polycarbonate roofing sheet, PC roofing sheet, turbo roofing sheet, transparent roofing sheet, skylight sheet, canopy roofing sheet, polycarbonate roofing sheet Ahmedabad, roofing sheet supplier Gujarat",
    h1: "Polycarbonate Roofing Sheet Supplier in Ahmedabad",
    alsoKnownAs: ["PC roofing sheet", "Transparent roofing sheet", "Skylight sheet"],
    specs: [
      { label: "Material", value: "Polycarbonate with UV protection for outdoor use" },
      { label: "Impact resistance", value: "Virtually unbreakable — far above glass or acrylic" },
      { label: "Service temperature", value: "approx. −40 °C to +120 °C" },
      { label: "Weight", value: "Roughly half the weight of glass" },
      { label: "Light transmission", value: "High — depends on tint and profile" },
      { label: "Weathering", value: "UV-protected for long outdoor service life" },
      { label: "Available forms", value: "Roofing sheet" },
    ],
    faqs: [
      {
        q: "How long does a polycarbonate roofing sheet last outdoors?",
        a: "UV-protected polycarbonate roofing sheet is made for long outdoor service and resists yellowing and impact far better than acrylic or fibreglass. Life depends on grade, exposure and installation — ask us for the specification suited to your site.",
      },
      {
        q: "Is polycarbonate roofing suitable for industrial sheds?",
        a: "Yes. It is widely used for factory and warehouse roof lights, skylights, canopies, walkway and parking covers, where its impact strength lets it survive hail and site handling while bringing natural daylight inside.",
      },
      {
        q: "What sizes and profiles do you supply?",
        a: `We supply polycarbonate roofing sheet from ${CITY} across Gujarat and India. Share your span, profile and quantity on WhatsApp or call +91 98984 70707 and we will quote the suitable sheet.`,
      },
    ],
    related: ["polycarbonate", "acrylic", "rigid-pvc"],
  },

  polycarbonate: {
    metaTitle: "Polycarbonate Sheet Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "Polycarbonate sheet supplier in Ahmedabad, Gujarat — optically clear and up to 250× the impact strength of glass. Ideal for machine guards, glazing and signage.",
    keywords:
      "polycarbonate sheet, PC sheet, clear polycarbonate sheet, machine guard sheet, unbreakable glass sheet, polycarbonate sheet supplier Ahmedabad, polycarbonate sheet Gujarat",
    h1: "Polycarbonate Sheet Supplier in Ahmedabad",
    alsoKnownAs: ["PC sheet", "Clear polycarbonate", "Unbreakable glazing sheet"],
    specs: [
      { label: "Material", value: "Polycarbonate (PC)" },
      { label: "Density", value: "approx. 1.20 g/cm³" },
      { label: "Service temperature", value: "approx. −40 °C to +120 °C" },
      { label: "Tensile strength", value: "60 – 70 MPa" },
      { label: "Light transmission", value: "approx. 88 % (clear grade)" },
      { label: "Impact strength", value: "Up to 250× that of glass" },
      { label: "Fabrication", value: "Machined, cold-formed and thermoformed" },
      { label: "Available forms", value: "Sheet" },
    ],
    faqs: [
      {
        q: "Polycarbonate or acrylic — which should I choose?",
        a: "Choose polycarbonate when impact strength and safety matter — machine guards, protective shields and glazing that must not shatter. Choose acrylic when optical clarity, surface hardness, polished edges and lower cost matter more, as in displays and signage.",
      },
      {
        q: "Can polycarbonate sheet be used for machine guards?",
        a: "Yes — it is the standard material for machine guarding and safety shields because it withstands impact without shattering while remaining transparent for operator visibility.",
      },
      {
        q: "Can polycarbonate sheet be cut and drilled on site?",
        a: "Yes. Polycarbonate cuts, drills and cold-forms readily with standard tooling. We can also supply it cut to your sizes from Ahmedabad.",
      },
    ],
    related: ["acrylic", "pc-roofing", "rigid-pvc"],
  },

  acrylic: {
    metaTitle: "Acrylic Sheet & Rod Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "Acrylic (PMMA) sheet and rod supplier in Ahmedabad, Gujarat — crystal-clear, weather-resistant material for displays, signage, glazing and light diffusers.",
    keywords:
      "acrylic sheet, acrylic rod, PMMA sheet, perspex sheet, display acrylic sheet, signage acrylic, acrylic sheet supplier Ahmedabad, acrylic rod Gujarat",
    h1: "Acrylic (PMMA) Sheet & Rod Supplier in Ahmedabad",
    alsoKnownAs: ["PMMA", "Perspex", "Plexiglass"],
    specs: [
      { label: "Material", value: "Acrylic / PMMA (polymethyl methacrylate)" },
      { label: "Density", value: "approx. 1.19 g/cm³" },
      { label: "Service temperature", value: "up to approx. +80 °C" },
      { label: "Light transmission", value: "approx. 92 % — higher than glass" },
      { label: "Tensile strength", value: "approx. 70 MPa" },
      { label: "Weathering", value: "Excellent UV and weather resistance" },
      { label: "Finishing", value: "Machines, flame-polishes and bonds cleanly" },
      { label: "Available forms", value: "Sheet, rod" },
    ],
    faqs: [
      {
        q: "What is acrylic sheet used for?",
        a: "Displays, POP stands, signage and lettering, glazing and skylights, light fittings and diffusers, and fabricated enclosures — anywhere high optical clarity and a clean polished finish are needed.",
      },
      {
        q: "Does acrylic yellow in sunlight?",
        a: "Good-quality acrylic is highly resistant to UV and weathering and holds its clarity outdoors far longer than most clear plastics, which is why it is a standard choice for signage and glazing.",
      },
      {
        q: "Do you supply acrylic rod as well as sheet?",
        a: `Yes — we supply both acrylic sheet and acrylic rod from ${CITY}, and can machine components to your drawing. Call +91 98984 70707 with your sizes.`,
      },
    ],
    related: ["polycarbonate", "pc-roofing", "rigid-pvc"],
  },

  pu: {
    metaTitle: "PU Wheel, Bush, Rod & Sheet Manufacturer in Ahmedabad",
    metaDescription:
      "Polyurethane (PU) wheel, trolley wheel, bush, rod & sheet manufacturer in Ahmedabad, Gujarat. Outstanding abrasion resistance and load capacity.",
    keywords:
      "PU rod, PU sheet, PU bush, PU wheel, trolley wheel, stacker wheel, polyurethane wheel, polyurethane bush, PU machined parts, PU wheel manufacturer Ahmedabad, polyurethane supplier Gujarat",
    h1: "Polyurethane (PU) Wheel, Bush, Rod & Sheet Manufacturer in Ahmedabad",
    alsoKnownAs: ["Polyurethane", "PU elastomer", "Urethane"],
    specs: [
      { label: "Material", value: "Polyurethane elastomer (PU)" },
      { label: "Hardness range", value: "typically 60 – 95 Shore A (harder grades available)" },
      { label: "Service temperature", value: "approx. −30 °C to +80 °C" },
      { label: "Abrasion resistance", value: "Outstanding — superior to most rubbers" },
      { label: "Tear strength", value: "High, with excellent resilience and rebound" },
      { label: "Oil resistance", value: "Good against oils and greases" },
      { label: "Available forms", value: "Rod, sheet, bush, wheel, trolley wheel, stacker wheel" },
    ],
    faqs: [
      {
        q: "Why choose PU wheels over rubber wheels?",
        a: "Polyurethane carries far higher loads for the same size, resists abrasion and tearing much better than rubber, does not mark floors, and rolls with lower resistance — so trolley, stacker and forklift wheels last considerably longer.",
      },
      {
        q: "What hardness should I specify for a PU wheel?",
        a: "Softer grades (around 70–80 Shore A) grip better and run more quietly over uneven floors; harder grades (85–95 Shore A) carry more load and roll more easily. Tell us the load, floor condition and speed and we will recommend a hardness.",
      },
      {
        q: "Can you make PU bushes and wheels to my size?",
        a: `Yes. We manufacture polyurethane wheels, bushes, rollers, seals and wear pads to customer drawings at our ${CITY} works, and also supply cast PU parts in custom hardnesses.`,
      },
    ],
    related: ["cast-pu", "uhmwpe", "cast-nylon"],
  },

  hdpe: {
    metaTitle: "HDPE Sheet, Rod & Pipe Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "HDPE sheet, rod, pipe & machined parts supplier in Ahmedabad, Gujarat. Chemical resistant, weldable, FDA-compliant grades. Call +91 98984 70707.",
    keywords:
      "HDPE sheet, HDPE rod, HDPE pipe, HDPE machined parts, high density polyethylene sheet, cutting board sheet, HDPE supplier Ahmedabad, HDPE sheet manufacturer Gujarat",
    h1: "HDPE Sheet, Rod & Pipe Supplier in Ahmedabad",
    alsoKnownAs: ["High density polyethylene", "PE 300 / PE 500", "Polyethylene sheet"],
    specs: [
      { label: "Material", value: "High-density polyethylene (HDPE)" },
      { label: "Density", value: "0.94 – 0.96 g/cm³" },
      { label: "Service temperature", value: "−50 °C to +80 °C" },
      { label: "Tensile strength", value: "22 – 31 MPa" },
      { label: "Water absorption", value: "< 0.01 %" },
      { label: "Chemical resistance", value: "Excellent against acids, alkalis and salts" },
      { label: "Weldability", value: "Readily hot-gas and butt welded" },
      { label: "Food contact", value: "FDA-compliant grades available" },
      { label: "Available forms", value: "Rod, sheet, pipe, machined parts" },
    ],
    faqs: [
      {
        q: "Is HDPE sheet food safe?",
        a: "FDA-compliant HDPE grades are available and are the standard material for cutting boards, food-handling surfaces and food-contact machined parts. Specify food grade when ordering and we will supply accordingly.",
      },
      {
        q: "Can HDPE be welded for tanks and fabrications?",
        a: "Yes. HDPE is readily hot-gas and butt welded, which makes it a common choice for chemical tanks, linings, ducting and fabricated fittings alongside polypropylene.",
      },
      {
        q: "HDPE or UHMWPE for wear applications?",
        a: "HDPE is the economical choice for general lining, tanks and light wear. Where abrasion is severe — chute liners, wear strips, conveyor guides — UHMWPE lasts far longer and is worth the extra cost.",
      },
    ],
    related: ["uhmwpe", "pp", "rigid-pvc"],
  },

  "rigid-pvc": {
    metaTitle: "Rigid PVC Sheet & Rod Supplier in Ahmedabad, Gujarat",
    metaDescription:
      "Rigid PVC sheet and rod supplier in Ahmedabad, Gujarat — chemically resistant, self-extinguishing and easy to fabricate for tanks, ducting and electrical parts.",
    keywords:
      "rigid PVC sheet, rigid PVC rod, PVC sheet, PVC rod, UPVC sheet, chemical resistant PVC sheet, rigid PVC supplier Ahmedabad, PVC sheet manufacturer Gujarat",
    h1: "Rigid PVC Sheet & Rod Supplier in Ahmedabad",
    alsoKnownAs: ["UPVC", "PVC-U", "Unplasticised PVC"],
    specs: [
      { label: "Material", value: "Rigid (unplasticised) PVC" },
      { label: "Density", value: "1.38 – 1.45 g/cm³" },
      { label: "Service temperature", value: "0 °C to +60 °C continuous" },
      { label: "Tensile strength", value: "45 – 55 MPa" },
      { label: "Flammability", value: "Self-extinguishing" },
      { label: "Chemical resistance", value: "Good against acids, alkalis and salt solutions" },
      { label: "Fabrication", value: "Easily cut, machined, bent and welded" },
      { label: "Available forms", value: "Sheet, rod" },
    ],
    faqs: [
      {
        q: "What is rigid PVC sheet used for?",
        a: "Chemical process equipment and tank linings, ducting and ventilation, fabricated fittings and covers, and electrical insulation parts — wherever good chemical resistance and flame retardancy are needed at low cost.",
      },
      {
        q: "Rigid PVC or polypropylene for chemical tanks?",
        a: "Rigid PVC is stiffer, self-extinguishing and cheaper, but limited to about 60 °C. Polypropylene handles up to roughly 100 °C and welds more easily for large vessels. The operating temperature usually decides the choice.",
      },
      {
        q: "Can rigid PVC sheet be welded?",
        a: "Yes — rigid PVC is readily hot-gas welded and bent, which is why it is widely used for fabricated ducting, covers and process equipment.",
      },
    ],
    related: ["pp", "hdpe", "bakelite"],
  },

  "cast-pu": {
    metaTitle: "Cast PU Parts, Rollers & Wheels Manufacturer in Ahmedabad",
    metaDescription:
      "Cast polyurethane parts manufacturer in Ahmedabad, Gujarat — custom rollers, wheels, pads, liners and wear parts cast to your hardness and drawing.",
    keywords:
      "cast PU, cast polyurethane, custom PU parts, PU roller, PU pad, PU liner, screen panel, cast polyurethane manufacturer Ahmedabad, custom PU parts Gujarat",
    h1: "Cast Polyurethane (PU) Custom Parts Manufacturer in Ahmedabad",
    alsoKnownAs: ["Cast polyurethane", "Custom PU moulding", "Urethane castings"],
    specs: [
      { label: "Material", value: "Cast polyurethane elastomer" },
      { label: "Hardness", value: "Custom — soft elastomer through to rigid grades" },
      { label: "Tear & abrasion resistance", value: "Excellent" },
      { label: "Load capability", value: "High load bearing with good rebound" },
      { label: "Process", value: "Cast to near-net shape, then machined as required" },
      { label: "Customisation", value: "Made to customer drawing, size and hardness" },
      { label: "Available forms", value: "Custom cast parts" },
    ],
    faqs: [
      {
        q: "What can be made from cast polyurethane?",
        a: "Custom rollers and wheels, pads, buffers and mounts, screen panels, liners, scrapers and bespoke wear parts — anything where a tough, abrasion-resistant elastomer is needed in a shape and hardness that is not available off the shelf.",
      },
      {
        q: "Do I need a drawing to order cast PU parts?",
        a: `A drawing is ideal, but a sample part or dimensioned sketch is usually enough to start. Send it on WhatsApp to +91 98984 70707 and our ${CITY} works will quote hardness, quantity and lead time.`,
      },
      {
        q: "What is the difference between cast PU and machined PU?",
        a: "Cast PU is moulded to near-net shape, which suits custom hardnesses, larger parts and repeat quantities. Machined PU is cut from rod or sheet stock and suits one-off or small precision parts. We supply both.",
      },
    ],
    related: ["pu", "cast-nylon", "uhmwpe"],
  },

  pps: {
    metaTitle: "PPS & PEEK Piston Manufacturer in Ahmedabad, Gujarat",
    metaDescription:
      "PPS piston, PEEK piston and icecream machine piston manufacturer in Ahmedabad, Gujarat. Precision machined for high-temperature and food-machinery duty.",
    keywords:
      "PPS piston, PEEK piston, icecream machine piston, ice cream machine piston, polyphenylene sulphide piston, plastic piston manufacturer Ahmedabad, food machine piston Gujarat",
    h1: "PPS, PEEK & Icecream Machine Piston Manufacturer in Ahmedabad",
    alsoKnownAs: ["Polyphenylene sulphide", "PPS", "Ryton-type polymer"],
    specs: [
      { label: "Material", value: "PPS (polyphenylene sulphide); also supplied in PEEK" },
      { label: "Density", value: "approx. 1.35 g/cm³ (unfilled)" },
      { label: "Continuous service temperature", value: "approx. +220 °C" },
      { label: "Chemical resistance", value: "Excellent — very few solvents attack it below 200 °C" },
      { label: "Water absorption", value: "< 0.05 %" },
      { label: "Dimensional stability", value: "Excellent under load and temperature" },
      { label: "Available forms", value: "Piston (PPS, PEEK, icecream machine)" },
    ],
    faqs: [
      {
        q: "Why are icecream machine pistons made from PPS or PEEK?",
        a: "Both polymers keep their dimensions under repeated heating, freezing and cleaning cycles, resist the cleaning chemicals used in food plants and run with low friction against the cylinder — so the piston seals reliably and lasts far longer than a general-purpose plastic.",
      },
      {
        q: "Can you make a piston from my old sample?",
        a: `Yes. Send us the worn piston or a dimensioned drawing and we will machine a replacement in PPS or PEEK at our ${CITY} works. Call +91 98984 70707 or message us on WhatsApp.`,
      },
      {
        q: "PPS or PEEK — which piston material is better?",
        a: "PPS is dimensionally excellent and more economical, serving continuously around 220 °C. PEEK goes higher (about 260 °C) with greater toughness and wear resistance, and is chosen for the most demanding duty. We supply both.",
      },
    ],
    related: ["peek", "ptfe", "delrin"],
  },

  "turbo-fan": {
    metaTitle: "Industrial Turbo Fan Manufacturer & Supplier in Ahmedabad",
    metaDescription:
      "High-performance industrial turbo fan supplier in Ahmedabad, Gujarat — heavy-duty plastic body, high-speed air delivery, low noise. Bulk supply available.",
    keywords:
      "turbo fan, plastic turbo fan, industrial turbo fan, high speed exhaust fan, ventilation fan, turbo fan manufacturer Ahmedabad, turbo fan supplier Gujarat, bulk turbo fan supply",
    h1: "High Performance Industrial Turbo Fan Supplier in Ahmedabad",
    alsoKnownAs: ["Plastic turbo fan", "Industrial blower fan", "High-speed ventilation fan"],
    specs: [
      { label: "Body", value: "Heavy-duty plastic construction" },
      { label: "Air delivery", value: "High-speed, high-volume airflow" },
      { label: "Efficiency", value: "Energy-efficient design" },
      { label: "Noise", value: "Low-noise operation" },
      { label: "Supply", value: "Bulk quantities available" },
      { label: "Typical use", value: "Industrial ventilation, cooling and air circulation" },
    ],
    faqs: [
      {
        q: "Where are turbo fans typically used?",
        a: "Workshops, warehouses, factories and godowns for general ventilation, spot cooling of work areas, exhaust and air-circulation duty where strong directed airflow is needed.",
      },
      {
        q: "Do you supply turbo fans in bulk?",
        a: `Yes — bulk supply is available for dealers, contractors and industrial buyers. Call +91 98984 70707 or message us on WhatsApp with your quantity and we will quote from ${CITY}.`,
      },
      {
        q: "What makes a turbo fan different from an ordinary exhaust fan?",
        a: "The turbo impeller design delivers a higher-velocity, more directed airflow for the same power draw, so it moves air further and ventilates larger industrial spaces more effectively than a standard exhaust fan.",
      },
    ],
    related: ["pp", "hdpe", "polycarbonate"],
  },
};

/** SEO copy for a product slug, if any has been written. */
export const getProductSeo = (id?: string): ProductSeo | undefined =>
  id ? productSeo[id] : undefined;
