// Modelo de domínio para produto.
// Encapsula regras de estoque e promoção (desconto baseado no nível de estoque).
export class Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly image: string;
  private _stock: number;

  constructor(params: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.price = params.price;
    this.category = params.category;
    this.image = params.image;
    this._stock = params.stock;
  }

  get stock(): number {
    return this._stock;
  }

  get isInStock(): boolean {
    return this._stock > 0;
  }

  get isLowStock(): boolean {
    return this._stock > 0 && this._stock < 5;
  }

  // Regra de desconto: quanto maior o estoque, maior o desconto.
  // - < 500 unidades: sem desconto
  // - >= 1000 unidades: 20%
  // - entre 500 e 1000: desconto entre 10% e 20%, calculado por interpolação
  get discountPercent(): number {
    const stock = this._stock;

    if (stock < 500) {
      return 0;
    }

    if (stock >= 1000) {
      return 20;
    }

    const factor = (stock - 500) / (1000 - 500);
    const percent = 10 + factor * 10;

    return Math.round(percent);
  }

  get hasPromotion(): boolean {
    return this.discountPercent > 0;
  }

  get discountedPrice(): number {
    if (!this.hasPromotion) return this.price;
    return this.price * (1 - this.discountPercent / 100);
  }

  // Retorna uma nova instância com estoque atualizado (imutabilidade).
  withUpdatedStock(newStock: number): Product {
    return new Product({
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      image: this.image,
      stock: newStock < 0 ? 0 : newStock,
    });
  }
}
