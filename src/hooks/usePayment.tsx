import { useContext } from "react";
import { PaymentContext } from "../contexts/PaymentContext";

// Hook de acesso ao contexto de pagamento.
export function usePayment() {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error("usePayment must be used within PaymentProvider");
  }

  return context;
}
