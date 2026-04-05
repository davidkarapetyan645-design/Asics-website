export type SectionLink = {
  id: string;
  label: string;
};

export type StoryMoment = {
  body: string;
  eyebrow: string;
  productId: string;
  statLabel: string;
  statValue: string;
  title: string;
  variantId: string;
};

export type HistoryMilestone = {
  body: string;
  title: string;
  year: string;
};

export type TechnologyCard = {
  body: string;
  feel: string;
  title: string;
};

export type WearTestNote = {
  model: string;
  quote: string;
  theme: string;
};

export type TrustPillar = {
  body: string;
  title: string;
};

export const sectionLinks: SectionLink[] = [
  { id: "hero", label: "Hero" },
  { id: "story", label: "Story" },
  { id: "history", label: "History" },
  { id: "technology", label: "Tech" },
  { id: "catalog", label: "Catalog" },
  { id: "reviews", label: "Reviews" },
  { id: "buy", label: "Buy" },
];

export const storyMoments: StoryMoment[] = [
  {
    productId: "gel-kayano-14",
    variantId: "pure-silver-black",
    eyebrow: "Scroll chapter 01",
    title: "Precision layering for a sharper lifestyle statement",
    body:
      "GEL-Kayano 14 opens the story with metallic structure, technical mesh and a faster visual rhythm. It feels like performance history made cleaner and more directional.",
    statLabel: "Mood",
    statValue: "Night velocity",
  },
  {
    productId: "gel-1130",
    variantId: "white-graphite",
    eyebrow: "Scroll chapter 02",
    title: "Everyday comfort tuned for repeat wear",
    body:
      "GEL-1130 shifts the presentation into a calmer, lighter zone. It is the model that explains why ASICS works beyond hype: easy comfort, stable geometry and understated confidence.",
    statLabel: "Mood",
    statValue: "Daily glide",
  },
  {
    productId: "gel-nyc",
    variantId: "cream-oyster",
    eyebrow: "Scroll chapter 03",
    title: "Soft volume and premium texture for a slower luxury pace",
    body:
      "GEL-NYC lands the story with warmer light, softer cushioning and a fuller silhouette. It brings fashion energy to ASICS performance roots without losing credibility.",
    statLabel: "Mood",
    statValue: "Soft luxury",
  },
];

export const historyMilestones: HistoryMilestone[] = [
  {
    year: "1949",
    title: "Kihachiro Onitsuka starts with sport as a social mission",
    body:
      "The brand begins in Kobe, Japan, rooted in the belief that movement can rebuild confidence, discipline and community after hardship.",
  },
  {
    year: "1977",
    title: "ASICS becomes the name and the philosophy",
    body:
      "ASICS comes from the Latin phrase 'Anima Sana In Corpore Sano' - a sound mind in a sound body - turning performance into a broader mindset rather than just a product category.",
  },
  {
    year: "1986",
    title: "GEL cushioning gives the brand a visible comfort language",
    body:
      "Impact protection becomes something you can feel immediately: softer landings, better recovery and a signature technology story that keeps evolving.",
  },
  {
    year: "Now",
    title: "Performance intelligence moves into lifestyle culture",
    body:
      "Modern ASICS models translate decades of running expertise into silhouettes people wear for city life, travel, style and everyday comfort.",
  },
];

export const technologyCards: TechnologyCard[] = [
  {
    title: "GEL",
    body:
      "ASICS GEL absorbs impact at the moment of landing, softening harsh contact so the first touch feels calmer and more controlled.",
    feel: "You notice less slap, less shock and a smoother first step.",
  },
  {
    title: "Cushioning",
    body:
      "Foam geometry, segmented pods and tuned sole sculpting work together to manage transition, rebound and all-day comfort.",
    feel: "You feel less fatigue over long wear and a more consistent ride.",
  },
  {
    title: "Stability",
    body:
      "Guided base shapes and support-led platform design keep the foot centered, helping the shoe feel composed instead of vague.",
    feel: "You get confidence underfoot, especially through turns, pace changes and long city days.",
  },
];

export const wearTestNotes: WearTestNote[] = [
  {
    model: "GEL-Kayano 14",
    theme: "Support-led feel",
    quote:
      "The structure is what stands out first. It still feels comfortable, but more importantly it feels controlled and sharp.",
  },
  {
    model: "GEL-1130",
    theme: "Daily comfort",
    quote:
      "This is the easiest pair to wear every day. Light, stable and simple enough to work with almost anything.",
  },
  {
    model: "GEL-NYC",
    theme: "Soft lifestyle cushioning",
    quote:
      "The underfoot feel is noticeably softer. It has more volume, more comfort and still keeps the ASICS running identity.",
  },
];

export const trustPillars: TrustPillar[] = [
  {
    title: "Performance-first DNA",
    body:
      "ASICS starts from how the body moves, then turns that knowledge into product decisions that still matter when the shoe enters lifestyle culture.",
  },
  {
    title: "Comfort you can explain",
    body:
      "The value is not vague. GEL, cushioning geometry and guided stability create comfort that feels engineered instead of accidental.",
  },
  {
    title: "Archive credibility with current taste",
    body:
      "The silhouettes look right today because they come from real running history, not a trend-first imitation of performance design.",
  },
];
