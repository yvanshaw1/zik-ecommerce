import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { ProductsContext, type ProductsContextType } from "./ProductsContext";
import { PRODUCTS } from "../constants/products";
import { Product } from "../models/Product";

interface ProductsProviderProps {
  children: ReactNode;
}

const PRODUCTS_STORAGE_KEY = "@ZiK:products";

type StoredProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
};

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return PRODUCTS;

    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!stored) return PRODUCTS;

    try {
      const parsed: StoredProduct[] = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) return PRODUCTS;

      return parsed.map(
        (p) =>
          new Product({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            image: p.image,
            stock: p.stock,
          })
      );
    } catch {
      return PRODUCTS;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const serialized: StoredProduct[] = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image,
      stock: p.stock,
    }));

    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(serialized));
  }, [products]);

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const reserveStock = useCallback(
    (productId: string, quantity: number): boolean => {
      if (quantity <= 0) return true;

      const product = products.find((p) => p.id === productId);
      if (!product) return false;
      if (product.stock < quantity) return false;

      const newStock = product.stock - quantity;

      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? p.withUpdatedStock(newStock) : p))
      );

      return true;
    },
    [products]
  );

  const releaseStock = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) return;

      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const newStock = product.stock + quantity;

      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? p.withUpdatedStock(newStock) : p))
      );
    },
    [products]
  );

  const value: ProductsContextType = {
    products,
    getProductById,
    reserveStock,
    releaseStock,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
