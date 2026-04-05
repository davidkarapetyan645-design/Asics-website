export type ProductGalleryImage = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

export type ProductReview = {
  age: string;
  body: string;
  frequency: string;
  gender: string;
  id: string;
  location: string;
  name: string;
  purpose: string;
  purchasedSize: string;
  rating: number;
  recommendation: string;
  title: string;
};

export type StoreProduct = {
  colorName: string;
  description: string;
  features: { label: string; value: string }[];
  fitNote: string;
  gallery: ProductGalleryImage[];
  id: string;
  materials: string[];
  name: string;
  price: number;
  reviews: ProductReview[];
  shippingNote: string;
  sizes: string[];
  summary: string;
  theme: {
    accent: string;
    border: string;
    button: string;
    glow: string;
    soft: string;
    surface: string;
  };
  usage: string[];
};

export const storefrontProducts: StoreProduct[] = [
  {
    id: "gel-kayano-14",
    name: "ASICS GEL-Kayano 14",
    colorName: "White / Oyster Grey",
    price: 140,
    summary: "A cleaner retro runner with support, shape and everyday comfort.",
    description:
      "GEL-Kayano 14 keeps the technical look people want, but it wears easier than it looks. It feels stable, holds the foot well and still works as an everyday pair.",
    fitNote:
      "Fits true to size for most people. If you prefer more room in the toe box, going up half a size is the safer choice.",
    features: [
      { label: "Feel", value: "Stable and secure" },
      { label: "Use", value: "City, travel, daily wear" },
      { label: "Weight", value: "Balanced for all-day comfort" },
    ],
    materials: ["Layered mesh upper", "Synthetic overlays", "GEL cushioning", "Rubber outsole"],
    usage: [
      "Good for long days in the city.",
      "Works well with relaxed outfits and cleaner looks.",
      "Feels more supportive than soft, which many people prefer for daily wear.",
    ],
    shippingNote: "Free delivery in 3-5 business days. Easy size exchange within 14 days.",
    sizes: ["39", "40", "40.5", "41.5", "42", "42.5", "43.5", "44", "45"],
    theme: {
      surface: "#f5f3eb",
      soft: "#ede8dc",
      accent: "#b7c6d1",
      border: "#d8d1c3",
      glow: "rgba(183, 198, 209, 0.45)",
      button: "#15181d",
    },
    gallery: [
      {
        src: "/store/gel-kayano-14-1.png",
        width: 1146,
        height: 860,
        alt: "ASICS GEL-Kayano 14 side view",
      },
      {
        src: "/store/gel-kayano-14-2.png",
        width: 756,
        height: 567,
        alt: "ASICS GEL-Kayano 14 front pair view",
      },
      {
        src: "/store/gel-kayano-14-3.png",
        width: 756,
        height: 567,
        alt: "ASICS GEL-Kayano 14 rear pair view",
      },
    ],
    reviews: [
      {
        id: "kayano-review-1",
        name: "Amina",
        location: "Dubai",
        age: "25-34",
        gender: "woman",
        purpose: "Everyday use",
        frequency: "4-5 times a week",
        purchasedSize: "40",
        rating: 5,
        title: "Very comfortable and easy to style",
        body:
          "I wanted something I could wear all day without feeling tired. This pair feels stable, looks clean and works with almost everything in my wardrobe.",
        recommendation: "Yes, I would buy it again.",
      },
      {
        id: "kayano-review-2",
        name: "Omar",
        location: "Abu Dhabi",
        age: "35-44",
        gender: "man",
        purpose: "City and travel",
        frequency: "1-3 times a week",
        purchasedSize: "43",
        rating: 4,
        title: "Supportive underfoot",
        body:
          "What I like most is the support. It does not feel sloppy. If you walk a lot during the day, that makes a real difference.",
        recommendation: "Yes, especially if you want support first.",
      },
    ],
  },
  {
    id: "gel-nimbus-10-1",
    name: "ASICS GEL-Nimbus 10.1",
    colorName: "White / Black",
    price: 140,
    summary: "Softer underfoot, more relaxed, and very easy to wear every day.",
    description:
      "GEL-Nimbus 10.1 feels more comfort-led. It gives you a softer step, a roomier visual shape and a cleaner balance between sport and lifestyle.",
    fitNote:
      "Most people can stay with their regular size. If your feet are wide or you prefer extra space, size up by half a size.",
    features: [
      { label: "Feel", value: "Soft and easy" },
      { label: "Use", value: "Daily wear, commute, walking" },
      { label: "Weight", value: "Comfort-first setup" },
    ],
    materials: ["Open mesh upper", "Supportive overlays", "Visible GEL pods", "Durable outsole"],
    usage: [
      "Great if comfort matters more than a strict performance feel.",
      "Easy option for everyday outfits and regular walking.",
      "A good choice if you want something softer than Kayano 14.",
    ],
    shippingNote: "Free delivery in 3-5 business days. Checkout supports major bank cards.",
    sizes: ["39", "40", "40.5", "41.5", "42", "42.5", "43.5", "44", "45"],
    theme: {
      surface: "#f4f4f0",
      soft: "#e7e6df",
      accent: "#c8c5bd",
      border: "#d7d4cc",
      glow: "rgba(200, 197, 189, 0.45)",
      button: "#0f1115",
    },
    gallery: [
      {
        src: "/store/gel-nimbus-10-1-1.png",
        width: 1146,
        height: 860,
        alt: "ASICS GEL-Nimbus 10.1 side view",
      },
      {
        src: "/store/gel-nimbus-10-1-2.png",
        width: 756,
        height: 567,
        alt: "ASICS GEL-Nimbus 10.1 front pair view",
      },
      {
        src: "/store/gel-nimbus-10-1-3.png",
        width: 756,
        height: 567,
        alt: "ASICS GEL-Nimbus 10.1 rear pair view",
      },
    ],
    reviews: [
      {
        id: "nimbus-review-1",
        name: "sakura0608",
        location: "Tokyo",
        age: "45-54",
        gender: "woman",
        purpose: "Everyday use",
        frequency: "1-3 times a week",
        purchasedSize: "25.0 cm",
        rating: 5,
        title: "The size worked out well after going up",
        body:
          "I usually wear 24 cm, but I ordered 25 cm and it turned out to be the right choice for me. It feels comfortable and the fit is much better with that extra room.",
        recommendation: "Yes, especially if you want a more comfortable fit.",
      },
      {
        id: "nimbus-review-2",
        name: "Kinoppi",
        location: "Japan",
        age: "45-54",
        gender: "man",
        purpose: "Everyday use",
        frequency: "More than 4 times a week",
        purchasedSize: "26.0 cm",
        rating: 4,
        title: "Light and breathable",
        body:
          "I like that the shoe feels breathable and light. The width works well for me, and it is easy to wear often during the week.",
        recommendation: "Yes, if you want a softer everyday pair.",
      },
    ],
  },
];
