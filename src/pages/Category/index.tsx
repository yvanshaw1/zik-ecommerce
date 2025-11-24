import { Header } from "../../components/Header";
import { ProductCard } from "../../components/ProductCard";
import { PRODUTOS } from "../../constants/products";
import * as S from "./styles";

interface CategoryProps {
  categoryId: string;
}

export function Category({ categoryId }: CategoryProps) {
  const filteredProducts = PRODUTOS.filter(
    (product) => product.category === categoryId
  );

  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Products</S.Title>
        <S.ProductsGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.ProductsGrid>
      </S.Container>
    </>
  );
}
