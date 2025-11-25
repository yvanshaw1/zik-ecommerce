import { useCart } from "../../hooks/useCart";
import { toast } from "sonner";
import * as S from "./styles";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 5;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success("Product added to cart!");
  };

  return (
    <S.Card $isLowStock={isLowStock}>
      {isLowStock && (
        <S.AlertBadge>
          <S.AlertIcon>⚠</S.AlertIcon>
        </S.AlertBadge>
      )}
      <S.ImageWrapper>
        <S.ProductImage src={product.image} alt={product.name} />
      </S.ImageWrapper>
      <S.ProductName>{product.name}</S.ProductName>
      <S.ProductDescription>{product.description}</S.ProductDescription>
      <S.Price>
        R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </S.Price>
      {isLowStock && (
        <S.LowStockWarning>Few units available!</S.LowStockWarning>
      )}
      <S.Button onClick={handleAddToCart} disabled={isOutOfStock}>
        {isOutOfStock ? "Sold Out" : "Add to Cart"}
      </S.Button>
    </S.Card>
  );
}
