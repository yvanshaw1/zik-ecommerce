import * as S from "./styles";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <S.Card>
      <S.ImageWrapper>
        <S.ProductImage src={product.image} alt={product.name} />
      </S.ImageWrapper>
      <S.ProductName>{product.name}</S.ProductName>
      <S.ProductDescription>{product.description}</S.ProductDescription>
      <S.Price>
        R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </S.Price>
      <S.Button>Comprar</S.Button>
    </S.Card>
  );
}
