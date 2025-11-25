import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { CartContext, type CartContextType } from "./CartContext";
import { CartItem } from "../models/CartItem";

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = "@ZiK:cart";

type StoredCartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) return [];

    try {
      const parsed: StoredCartItem[] = JSON.parse(storedCart);
      return parsed.map(
        (item) =>
          new CartItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          })
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const serialized: StoredCartItem[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized));
  }, [items]);

  const addToCart = (product: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? item.increment(1) : item
        );
      }

      return [...prevItems, product.withQuantity(1)];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? item.withQuantity(quantity) : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
