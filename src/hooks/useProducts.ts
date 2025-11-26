import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

// Hook de acesso ao contexto de produtos/estoque.
export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }

  return context;
}
