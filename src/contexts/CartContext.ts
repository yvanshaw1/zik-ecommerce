import { createContext } from "react";
import type { Product, CartItem } from "../types";

export type CartContextType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
