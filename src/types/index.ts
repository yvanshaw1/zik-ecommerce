export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  subtotal: number;
};

export type Category = {
  id: string;
  name: string;
  image: string;
  emoji: string;
};
