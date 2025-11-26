import { Category } from "../models/Category";

// Categorias exibidas na Home.
// Algumas são categorias reais, outras são "visões" (low-stock, promotions).
export const CATEGORIES: Category[] = [
  new Category({
    id: "laptops",
    name: "Laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    emoji: "💻",
  }),
  new Category({
    id: "gaming-pcs",
    name: "Gaming PCs",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
    emoji: "🎮",
  }),
  new Category({
    id: "peripherals",
    name: "Peripherals",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    emoji: "⌨️",
  }),
  new Category({
    id: "hardware",
    name: "Hardware",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500",
    emoji: "🔧",
  }),
  new Category({
    id: "low-stock",
    name: "Few Units Left",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500",
    emoji: "⚠️",
  }),
  new Category({
    id: "promotions",
    name: "Promotions",
    image: "https://images.unsplash.com/photo-1582439328712-42b4a9503c09?w=500",
    emoji: "🔥",
  }),
];
