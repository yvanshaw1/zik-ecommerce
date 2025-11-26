import { useCart } from "../../hooks/useCart";
import { toast } from "sonner";
import * as S from "./styles";
import type { ProductLike } from "../../types";
import { Product } from "../../models/Product";
import { CartItem } from "../../models/CartItem";

interface ProductCardProps {
  product: ProductLike;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  const isLowStock =
    product instanceof Product
      ? product.isLowStock
      : product.stock > 0 && product.stock <= 10;

  const hasPromotion =
    product instanceof Product ? product.hasPromotion : false;

  const discountPercent =
    product instanceof Product ? product.discountPercent : 0;

  const finalPrice =
    product instanceof Product ? product.discountedPrice : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const cartItem = new CartItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    const ok = addToCart(cartItem);

    if (ok === false) {
      toast.error("Not enough stock available for this product.");
      return;
    }

    toast.success("Product added to cart!");
  };

  return (
    <S.Card $isLowStock={isLowStock}>
      {hasPromotion && <S.DiscountBadge>-{discountPercent}%</S.DiscountBadge>}

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

      {hasPromotion ? (
        <S.PriceRow>
          <S.DiscountedPrice>
            R${" "}
            {finalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </S.DiscountedPrice>
          <S.OriginalPrice>
            R${" "}
            {product.price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </S.OriginalPrice>
        </S.PriceRow>
      ) : (
        <S.Price>
          R${" "}
          {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </S.Price>
      )}

      {isLowStock && (
        <S.LowStockWarning>Few units available!</S.LowStockWarning>
      )}

      <S.Button onClick={handleAddToCart} disabled={isOutOfStock}>
        {isOutOfStock ? "Sold Out" : "Add to Cart"}
      </S.Button>
    </S.Card>
  );
}
