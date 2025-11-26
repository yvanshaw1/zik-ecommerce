import { createContext } from "react";
import { Product } from "../models/Product";

export interface ProductsContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  reserveStock: (productId: string, quantity: number) => boolean;
  releaseStock: (productId: string, quantity: number) => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);
