import * as S from "./styles";
import type { Produto } from "../../types";

interface ProductCardProps {
  product: Produto;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <S.Card>
      <S.ImageWrapper>
        <S.ProductImage src={product.imagem} alt={product.nome} />
      </S.ImageWrapper>
      <S.ProductName>{product.nome}</S.ProductName>
      <S.ProductDescription>{product.descricao}</S.ProductDescription>
      <S.Price>
        R$ {product.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </S.Price>
      <S.Button>Comprar</S.Button>
    </S.Card>
  );
}
