import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { ProductCard } from "../../components/ProductCard";
import { PRODUCTS } from "../../constants/products";
import * as S from "./styles";

export function Category() {
  const { id } = useParams<{ id: string }>();

  const filteredProducts = PRODUCTS.filter(
    (product) => product.category === id
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
