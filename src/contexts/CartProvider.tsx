import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { CartContext, type CartContextType } from "./CartContext";
import { CartItem } from "../models/CartItem";
import { useProducts } from "../hooks/useProducts";

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
  const { reserveStock, releaseStock } = useProducts();

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

  const addToCart = (product: CartItem): boolean => {
    const ok = reserveStock(product.id, 1);
    if (!ok) {
      return false;
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? item.increment(1) : item
        );
      }

      return [...prevItems, product.withQuantity(1)];
    });

    return true;
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === productId);
      if (item) {
        releaseStock(productId, item.quantity);
      }
      return prevItems.filter((i) => i.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === productId);
      if (!item) return prevItems;

      const diff = quantity - item.quantity;

      if (diff === 0) return prevItems;

      if (diff > 0) {
        const ok = reserveStock(productId, diff);
        if (!ok) {
          return prevItems;
        }
      } else {
        releaseStock(productId, Math.abs(diff));
      }

      return prevItems.map((i) =>
        i.id === productId ? i.withQuantity(quantity) : i
      );
    });
  };

  const clearCart = () => {
    setItems((prevItems) => {
      prevItems.forEach((item) => {
        releaseStock(item.id, item.quantity);
      });
      return [];
    });
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
