// Image sources for the site. All remote photos come from Unsplash's CDN
// (free to use, hot-linkable). Every <img> goes through <FoodImage/>, which
// falls back to a bundled local photo or a coloured placeholder if a link
// ever breaks, so the layout never shows a broken-image icon.
import heroLocal from "../assets/hero.jpeg";
import burgerLocal from "../assets/landing.jpeg";

const u = (id: string, w = 800, h?: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}${
    h ? `&h=${h}` : ""
  }&q=75`;

export const PHOTO = {
  hero: "photo-1504674900247-0877df9cc836",
  burger: "photo-1568901346375-23c9450c58cd",
  pizza: "photo-1513104890138-7c749659a591",
  pasta: "photo-1621996346565-e3dbc646d9a9",
  dessert: "photo-1551024601-bec78aea704b",
  sushi: "photo-1579871494447-9811cf80d66c",
  salad: "photo-1546069901-ba9599a7e63c",
  breakfast: "photo-1567620905732-2d1ec7ab7445",
  bbq: "photo-1555939594-58d7cb561ad1",
  tacos: "photo-1565299585323-38d6b0865b47",
  interior: "photo-1517248135467-4c7edcad34c4",
  dining: "photo-1414235077428-338989a2e8c0",
  interior2: "photo-1555396273-367ea4eb4db5",
} as const;

export type PhotoKey = keyof typeof PHOTO;

export const photoUrl = (key: PhotoKey, w = 800, h?: number) =>
  u(PHOTO[key], w, h);

// Bundled local fallbacks (always available, no network needed)
export const LOCAL_FALLBACK = {
  generic: heroLocal,
  burger: burgerLocal,
};

// Cuisine -> photo, used for category tiles and restaurant fallbacks
const CUISINE_PHOTO: Record<string, PhotoKey> = {
  American: "burger",
  Burgers: "burger",
  BBQ: "bbq",
  Steak: "bbq",
  Breakfast: "breakfast",
  Cafe: "breakfast",
  Desserts: "dessert",
  Italian: "pizza",
  Pizza: "pizza",
  Pasta: "pasta",
  Japanese: "sushi",
  Sushi: "sushi",
  Seafood: "sushi",
  Healthy: "salad",
  Salads: "salad",
  Vegan: "salad",
  Organic: "salad",
  Mexican: "tacos",
  Tacos: "tacos",
  Tapas: "dining",
  Spanish: "dining",
  French: "dining",
  Greek: "dining",
};

export const photoForCuisines = (cuisines: string[] = []): PhotoKey => {
  for (const c of cuisines) if (CUISINE_PHOTO[c]) return CUISINE_PHOTO[c];
  return "dining";
};

// Dish name -> photo (menu items have no image of their own)
const DISH_KEYWORDS: [RegExp, PhotoKey][] = [
  [/burger|cheese ?burger|fries|chicken/i, "burger"],
  [/pizza|margherita|pepperoni/i, "pizza"],
  [/pasta|spaghetti|lasagn|penne|noodle/i, "pasta"],
  [/cake|brownie|ice ?cream|dessert|donut|doughnut|sweet|pudding/i, "dessert"],
  [/sushi|roll|salmon|fish|prawn|shrimp/i, "sushi"],
  [/salad|vegan|veg|bowl/i, "salad"],
  [/pancake|waffle|breakfast|egg|toast/i, "breakfast"],
  [/bbq|steak|ribs|grill|kebab|tikka|skewer/i, "bbq"],
  [/taco|burrito|nacho|quesadilla/i, "tacos"],
];

export const photoForDish = (name: string, fallback: PhotoKey = "dining") => {
  for (const [re, key] of DISH_KEYWORDS) if (re.test(name)) return key;
  return fallback;
};

export const CUISINE_TILES: { label: string; photo: PhotoKey }[] = [
  { label: "Burgers", photo: "burger" },
  { label: "Pizza", photo: "pizza" },
  { label: "Pasta", photo: "pasta" },
  { label: "Desserts", photo: "dessert" },
  { label: "Sushi", photo: "sushi" },
  { label: "Healthy", photo: "salad" },
];
