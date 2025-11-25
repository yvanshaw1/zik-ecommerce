export class CartItem {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly image: string;
  readonly quantity: number;

  constructor(params: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.price = params.price;
    this.image = params.image;
    this.quantity = params.quantity < 0 ? 0 : params.quantity;
  }

  get total(): number {
    return this.price * this.quantity;
  }

  withQuantity(quantity: number): CartItem {
    return new CartItem({
      id: this.id,
      name: this.name,
      price: this.price,
      image: this.image,
      quantity: quantity < 0 ? 0 : quantity,
    });
  }

  increment(by: number = 1): CartItem {
    return this.withQuantity(this.quantity + by);
  }

  decrement(by: number = 1): CartItem {
    return this.withQuantity(this.quantity - by);
  }
}
