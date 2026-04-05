export type ProductFeature = {
  label: string;
  value: string;
};

export type ProductDetail = {
  label: string;
  value: string;
};

export type ProductTheme = {
  accent: string;
  ambient: [string, string];
  background: [string, string, string];
  glow: string;
  spotlight: string;
  swatch: string;
};

export type ProductVariant = {
  id: string;
  image: string;
  imageHeight: number;
  imageWidth: number;
  name: string;
  note: string;
  theme: ProductTheme;
};

export type Product = {
  description: string;
  detailPoints: ProductDetail[];
  era: string;
  feel: string;
  features: ProductFeature[];
  headline: string;
  id: string;
  idealFor: string;
  overview: string;
  name: string;
  price: number;
  scenarios: ProductDetail[];
  tags: string[];
  techNarrative: string;
  variants: ProductVariant[];
};

export const products: Product[] = [
  {
    id: "gel-kayano-14",
    name: "ASICS GEL-Kayano 14",
    era: "Archive performance reborn",
    headline: "Retro precision, recut for night movement.",
    description:
      "Layered silver panels, engineered mesh and segmented GEL cushioning deliver a sharper archival runner with premium city energy.",
    overview:
      "GEL-Kayano 14 bridges technical running heritage and a sharper lifestyle expression, with metallic layering, structured support and a more directional stance.",
    feel:
      "Secure through the midfoot with a crisp, responsive underfoot character that feels fast without going harsh.",
    idealFor: "City rotation, all-day wear, elevated sport styling",
    price: 140,
    features: [
      { label: "Cushion", value: "Dual GEL" },
      { label: "Upper", value: "Layered mesh" },
      { label: "Ride", value: "Structured glide" },
    ],
    detailPoints: [
      { label: "Look", value: "Metallic runner with premium contrast lines" },
      { label: "Support", value: "Stable base with a locked midfoot feel" },
      { label: "Energy", value: "Sharper transition for fast city pacing" },
    ],
    scenarios: [
      { label: "City", value: "Strong visual presence for long urban days." },
      { label: "Movement", value: "Confident support when the pace picks up." },
      { label: "Style", value: "Pairs naturally with relaxed tailoring or technical layers." },
    ],
    tags: ["night run", "archive tech", "statement silver"],
    techNarrative:
      "Segmented GEL units and a more structured chassis create a firmer, more controlled sensation built around precision rather than softness alone.",
    variants: [
      {
        id: "pure-silver-black",
        name: "Pure Silver / Black",
        image: "/images/gel-kayano-14.jpg",
        imageWidth: 500,
        imageHeight: 389,
        note: "Cold metal overlays with a crisp blue glow under the heel.",
        theme: {
          accent: "#9ee8ff",
          ambient: ["#287cff", "#7ee0ff"],
          background: ["#030812", "#10284f", "#2dc0ff"],
          glow: "rgba(87, 207, 255, 0.52)",
          spotlight: "rgba(230, 247, 255, 0.96)",
          swatch: "#8ed4ff",
        },
      },
    ],
  },
  {
    id: "gel-1130",
    name: "ASICS GEL-1130",
    era: "Daily running icon refined",
    headline: "Everyday pace with a cleaner, sharper stance.",
    description:
      "An early-2000s running icon refined into a modern daily rotation piece with lighter lines, stable tooling and understated speed.",
    overview:
      "GEL-1130 keeps the familiar layered runner language, then simplifies the experience into something lighter, easier and more versatile for everyday use.",
    feel:
      "Balanced and easygoing, with soft impact protection and a stable platform that never feels overly technical.",
    idealFor: "Daily commute, easy styling, comfort-first rotation",
    price: 140,
    features: [
      { label: "Cushion", value: "Rearfoot GEL" },
      { label: "Upper", value: "Open mesh" },
      { label: "Ride", value: "Easy glide" },
    ],
    detailPoints: [
      { label: "Look", value: "Lean runner proportions with clean panel flow" },
      { label: "Support", value: "Comfortable stability for repeated daily wear" },
      { label: "Energy", value: "Low-effort movement that stays light on foot" },
    ],
    scenarios: [
      { label: "City", value: "Comfortable enough for full-day movement and commute." },
      { label: "Movement", value: "Light support for easy runs, walks and errands." },
      { label: "Style", value: "Easy to wear with denim, cargos or cleaner minimal fits." },
    ],
    tags: ["daily rotation", "commute ready", "clean runner"],
    techNarrative:
      "Rearfoot GEL softens repeated impact while the guided base keeps the ride calm, making GEL-1130 the most effortless everyday option in the lineup.",
    variants: [
      {
        id: "white-graphite",
        name: "White / Graphite",
        image: "/images/gel-1130-white.jpg",
        imageWidth: 487,
        imageHeight: 458,
        note: "Crisp white base with graphite lines and a misty steel halo.",
        theme: {
          accent: "#d8eefc",
          ambient: ["#5e94d4", "#dceaf8"],
          background: ["#071019", "#294463", "#d9ebff"],
          glow: "rgba(193, 223, 255, 0.44)",
          spotlight: "rgba(250, 253, 255, 0.95)",
          swatch: "#eef7ff",
        },
      },
      {
        id: "black-steel",
        name: "Black / Steel",
        image: "/images/gel-1130-black.jpg",
        imageWidth: 458,
        imageHeight: 457,
        note: "Monochrome mesh framed by polished silver lines and darker depth.",
        theme: {
          accent: "#c3d6ff",
          ambient: ["#3c5cb6", "#8aa7ff"],
          background: ["#02040a", "#141d34", "#5d79ef"],
          glow: "rgba(114, 145, 255, 0.42)",
          spotlight: "rgba(235, 240, 255, 0.78)",
          swatch: "#5466d8",
        },
      },
    ],
  },
  {
    id: "gel-nyc",
    name: "ASICS GEL-NYC",
    era: "Lifestyle volume with performance roots",
    headline: "Soft volume with a fashion-forward running backbone.",
    description:
      "Mixed textures, chunky sculpted pods and neutral layering give GEL-NYC a more elevated silhouette without losing running DNA.",
    overview:
      "GEL-NYC takes archival cues from multiple ASICS runners and builds them into a softer, fuller shape designed for lifestyle wear with performance credibility.",
    feel:
      "Plusher and more relaxed underfoot, with noticeable softness and a roomier, more forgiving visual attitude.",
    idealFor: "Travel days, comfort-led style, softer premium mood",
    price: 140,
    features: [
      { label: "Cushion", value: "Plush GEL pods" },
      { label: "Upper", value: "Mixed mesh" },
      { label: "Ride", value: "Soft rebound" },
    ],
    detailPoints: [
      { label: "Look", value: "Chunkier pod geometry with softer neutral layering" },
      { label: "Support", value: "Comfort-led structure for longer casual wear" },
      { label: "Energy", value: "Cushioned rebound with a smoother, softer landing" },
    ],
    scenarios: [
      { label: "City", value: "Ideal for travel, weekend wandering and long café-to-street days." },
      { label: "Movement", value: "Soft cushioning for casual walking and everyday mileage." },
      { label: "Style", value: "A stronger fashion silhouette with laid-back premium colorways." },
    ],
    tags: ["elevated casual", "neutral palette", "soft structure"],
    techNarrative:
      "The larger GEL expression and sculpted sole geometry push comfort higher, giving GEL-NYC a more indulgent lifestyle ride while keeping ASICS performance DNA intact.",
    variants: [
      {
        id: "cream-oyster",
        name: "Cream / Oyster",
        image: "/images/gel-nyc-cream.jpg",
        imageWidth: 481,
        imageHeight: 479,
        note: "Warm neutrals and muted blue accents for a softer premium mood.",
        theme: {
          accent: "#f3e4d1",
          ambient: ["#9fb7d8", "#f4debf"],
          background: ["#0d1017", "#51556f", "#efe1c7"],
          glow: "rgba(243, 212, 170, 0.42)",
          spotlight: "rgba(255, 249, 240, 0.95)",
          swatch: "#f0ddc4",
        },
      },
    ],
  },
];
