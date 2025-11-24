import { Header } from "../../components/Header";
import { ProductCard } from "../../components/ProductCard";
import { PRODUTOS } from "../../constants/products";
import * as S from "./styles";

interface CategoriaProps {
  categoriaId: string;
}

export function Categoria({ categoriaId }: CategoriaProps) {
  const produtosFiltrados = PRODUTOS.filter(
    (produto) => produto.categoriaId === categoriaId
  );

  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Produtos</S.Title>
        <S.ProductsGrid>
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} product={produto} />
          ))}
        </S.ProductsGrid>
      </S.Container>
    </>
  );
}
