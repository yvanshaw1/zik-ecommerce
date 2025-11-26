import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { ProductCard } from "../../components/ProductCard";
import { Product } from "../../models/Product";
import { useProducts } from "../../hooks/useProducts";
import * as S from "./styles";

export function Category() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { products } = useProducts();

  // Usado quando veio do carrossel de destaques (Home)
  // para rolar até um produto específico.
  const highlightProductId = (
    location.state as { highlightProductId?: string } | null
  )?.highlightProductId;

  if (!id) {
    return null;
  }

  // Filtragem por categoria especial ("low-stock", "promotions")
  // ou por categoria normal (laptops, gaming-pcs, etc.).
  const filteredProducts =
    id === "low-stock"
      ? products.filter((product) => product.stock > 0 && product.stock <= 10)
      : id === "promotions"
      ? products.filter(
          (product) => product instanceof Product && product.hasPromotion
        )
      : products.filter((product) => product.category === id);

  // Se veio com highlightProductId, faz scroll suave até esse card.
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
