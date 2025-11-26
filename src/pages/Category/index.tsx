import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { ProductCard } from "../../components/ProductCard";
import { PRODUCTS } from "../../constants/products";
import { Product } from "../../models/Product";
import * as S from "./styles";

export function Category() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const highlightProductId = (
    location.state as { highlightProductId?: string } | null
  )?.highlightProductId;

  if (!id) {
    return null;
  }

  const filteredProducts =
    id === "low-stock"
      ? PRODUCTS.filter((product) => product.stock > 0 && product.stock <= 10)
      : id === "promotions"
      ? PRODUCTS.filter(
          (product) => product instanceof Product && product.hasPromotion
        )
      : PRODUCTS.filter((product) => product.category === id);

  useEffect(() => {
    if (!highlightProductId) return;

    const element = document.getElementById(`product-${highlightProductId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightProductId, filteredProducts.length]);

  return (
    <>
      <Header />
      <S.Container>
        <S.Title>Products</S.Title>
        <S.ProductsGrid>
          {filteredProducts.map((product) => (
            <div key={product.id} id={`product-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </S.ProductsGrid>
      </S.Container>
    </>
  );
}
