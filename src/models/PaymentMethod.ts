// Identificadores suportados de métodos de pagamento.
export type PaymentMethodId = "credit-card" | "pix" | "boleto";

// Classe base abstrata para métodos de pagamento.
// Cada método concreto implementa sua própria regra de cálculo de total.
export abstract class PaymentMethod {
  readonly id: PaymentMethodId;
  readonly name: string;
  readonly description?: string;

  constructor(params: {
    id: PaymentMethodId;
    name: string;
    description?: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
  }

  // Dado um valor base (subtotal do carrinho), retorna o valor final
  // aplicando desconto/juros conforme a regra do método.
  abstract calculateTotal(baseAmount: number): number;

  // Helper para montar um label de exibição com nome + valor já calculado.
  getLabel(baseAmount: number): string {
    const final = this.calculateTotal(baseAmount);
    return `${this.name} - R$ ${final.toFixed(2)}`;
  }
}

// Cartão de crédito: sem desconto, valor final igual ao subtotal.
export class CreditCardPayment extends PaymentMethod {
  constructor() {
    super({
      id: "credit-card",
      name: "Credit Card",
      description: "Pay in 1x on credit card",
    });
  }

  calculateTotal(baseAmount: number): number {
    return baseAmount * 1;
  }
}

// Pix: 5% de desconto sobre o valor base.
export class PixPayment extends PaymentMethod {
  constructor() {
    super({
      id: "pix",
      name: "Pix",
      description: "Instant payment with 5% discount",
    });
  }

  calculateTotal(baseAmount: number): number {
    return baseAmount * 0.95;
  }
}

// Boleto: 2% de desconto sobre o valor base.
export class BoletoPayment extends PaymentMethod {
  constructor() {
    super({
      id: "boleto",
      name: "Boleto",
      description: "Bank slip with 2% discount",
    });
  }

  calculateTotal(baseAmount: number): number {
    return baseAmount * 0.98;
  }
}
