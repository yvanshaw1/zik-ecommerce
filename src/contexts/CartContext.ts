import { createContext } from "react";
import { CartItem } from "../models/CartItem";

// API pública do carrinho exposta via Context.
// A implementação concreta fica no CartProvider.
export interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => boolean | void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
