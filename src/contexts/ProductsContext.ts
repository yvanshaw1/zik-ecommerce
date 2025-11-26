import { createContext } from "react";
import { Product } from "../models/Product";

// API pública do contexto de produtos.
// Responsável por fornecer a lista de produtos e funções de estoque.
export interface ProductsContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  // Tenta reservar quantidade de estoque; retorna false se não houver estoque.
  reserveStock: (productId: string, quantity: number) => boolean;
  // Devolve quantidade ao estoque.
  releaseStock: (productId: string, quantity: number) => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);
