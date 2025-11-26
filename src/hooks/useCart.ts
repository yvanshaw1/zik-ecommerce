import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

// Hook de acesso ao contexto de carrinho.
// Garante que o contexto exista (ou lança erro em desenvolvimento).
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
