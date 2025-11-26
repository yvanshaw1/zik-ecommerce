import { Product as ProductModel } from "../models/Product";
import { CartItem as CartItemModel } from "../models/CartItem";
import { Category as CategoryModel } from "../models/Category";

// Tipos “planos” usados em dados serializados, APIs, mocks etc.
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type Category = {
  id: string;
  name: string;
  image: string;
  emoji: string;
};

// Tipos auxiliares que aceitam tanto o tipo plano quanto a classe de modelo.
// Úteis em componentes que precisam funcionar com dados vindos de constantes,
// APIs ou instâncias de domínio (ex.: ProductCard, CategoryCard).
export type ProductLike = Product | ProductModel;
export type CartItemLike = CartItem | CartItemModel;
export type CategoryLike = Category | CategoryModel;
