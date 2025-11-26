import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { PaymentContext, type PaymentContextType } from "./PaymentContext";
import {
  PaymentMethod,
  CreditCardPayment,
  PixPayment,
  BoletoPayment,
  type PaymentMethodId,
} from "../models/PaymentMethod";

interface PaymentProviderProps {
  children: ReactNode;
}

// Provider responsável por:
// - instanciar os métodos de pagamento disponíveis,
// - controlar qual está selecionado,
// - expor uma função para aplicar a regra de pagamento sobre o subtotal.
export function PaymentProvider({ children }: PaymentProviderProps) {
  const [selectedMethodId, setSelectedMethodId] =
    useState<PaymentMethodId | null>(null);

  // Instanciamos as estratégias de pagamento uma vez e reaproveitamos.
  const methods: PaymentMethod[] = useMemo(
    () => [new CreditCardPayment(), new PixPayment(), new BoletoPayment()],
    []
  );

  const selectMethod = (id: PaymentMethodId) => {
    setSelectedMethodId(id);
  };

  // Retorna o total final conforme o método de pagamento selecionado.
  // Se nenhum método estiver selecionado, devolve o valor base.
  const getFinalTotal = (baseAmount: number): number => {
    if (!selectedMethodId) return baseAmount;

    const method = methods.find((m) => m.id === selectedMethodId);
    if (!method) return baseAmount;

    return method.calculateTotal(baseAmount);
  };

  const value: PaymentContextType = {
    methods,
    selectedMethodId,
    selectMethod,
    getFinalTotal,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}
