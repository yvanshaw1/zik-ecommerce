import { createContext } from "react";
import type { PaymentMethodId } from "../models/PaymentMethod";
import { PaymentMethod } from "../models/PaymentMethod";

// API pública de pagamento exposta via Context.
// Não guarda valores de carrinho, só a regra para transformar o subtotal
// em valor final de acordo com o método selecionado.
export interface PaymentContextType {
  methods: PaymentMethod[];
  selectedMethodId: PaymentMethodId | null;
  selectMethod: (id: PaymentMethodId) => void;
  getFinalTotal: (baseAmount: number) => number;
}

export const PaymentContext = createContext<PaymentContextType | undefined>(
  undefined
);
