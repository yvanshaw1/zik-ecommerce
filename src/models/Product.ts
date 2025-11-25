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
