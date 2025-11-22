import { Header } from "../../components/Header";
import { PRODUTOS } from "../../constants/produtos";
// import type { Produto } from "../../types";
import * as S from "./styles";

interface CategoriaProps {
  categoriaId: string;
}

export function Categoria({ categoriaId }: CategoriaProps) {
  const produtosFiltrados = PRODUTOS.filter(
    (produto) => produto.categoriaId === categoriaId
  );

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Produtos</S.Title>
        <S.ProductsGrid>
          {produtosFiltrados.map((produto) => (
            <S.ProductCard key={produto.id}>
              <S.ProductImage src={produto.imagem} alt={produto.nome} />
              <S.ProductInfo>
                <S.ProductName>{produto.nome}</S.ProductName>
                <S.ProductDescription>{produto.descricao}</S.ProductDescription>
                <S.ProductFooter>
                  <S.ProductPrice>
                    {formatarPreco(produto.preco)}
                  </S.ProductPrice>
                  <S.BuyButton>Comprar</S.BuyButton>
                </S.ProductFooter>
              </S.ProductInfo>
            </S.ProductCard>
          ))}
        </S.ProductsGrid>
      </S.Container>
    </>
  );
}
