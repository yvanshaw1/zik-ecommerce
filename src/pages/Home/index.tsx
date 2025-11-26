import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import { Product } from "../../models/Product";
import { useProducts } from "../../hooks/useProducts";
import * as S from "./styles";

export function Home() {
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  // Produtos destaque: em promoção ou com poucas unidades.
  const highlightProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product instanceof Product &&
          (product.hasPromotion || product.isLowStock)
      ),
    [products]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Auto-slide do carrossel.
  useEffect(() => {
    if (highlightProducts.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === highlightProducts.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [highlightProducts.length]);

  // Centraliza o item ativo no container do carrossel.
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const children = container.children;
    const activeChild = children[currentIndex] as HTMLElement | undefined;
    if (!activeChild) return;

    const containerRect = container.getBoundingClientRect();
    const childRect = activeChild.getBoundingClientRect();

    const offset =
      childRect.left -
      containerRect.left -
      containerRect.width / 2 +
      childRect.width / 2;

    container.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  }, [currentIndex]);

  // Ao clicar no destaque, vai para a categoria do produto
  // e passa o id via state para possível destaque lá na lista.
  const handleHighlightClick = (product: Product) => {
    navigate(`/category/${product.category}`, {
      state: { highlightProductId: product.id },
    });
  };

  return (
    <S.Container>
      {/* Carrossel de destaques */}
      {highlightProducts.length > 0 && (
        <S.CarouselWrapper>
          <S.CarouselTitle>Highlights</S.CarouselTitle>

          <S.Carousel ref={carouselRef}>
            {highlightProducts.map((product, index) => {
              const isActive = index === currentIndex;

              return (
                <S.CarouselItem
                  key={product.id}
                  $isActive={isActive}
                  onClick={() => handleHighlightClick(product)}
                >
                  <S.HighlightImageWrapper>
                    <S.HighlightImage src={product.image} alt={product.name} />

                    {product.hasPromotion && (
                      <S.HighlightDiscountBadge>
                        -{product.discountPercent}%
                      </S.HighlightDiscountBadge>
                    )}

                    {product.isLowStock && (
                      <S.HighlightAlertBadge>
                        <S.HighlightAlertIcon>⚠</S.HighlightAlertIcon>
                      </S.HighlightAlertBadge>
                    )}
                  </S.HighlightImageWrapper>

                  <S.HighlightInfo>
                    <S.HighlightName>{product.name}</S.HighlightName>
                    <S.HighlightCategory>
                      {product.category}
                    </S.HighlightCategory>

                    {product.hasPromotion ? (
                      <S.HighlightPriceRow>
                        <S.HighlightDiscountedPrice>
                          R{" "}
                          {product.discountedPrice.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </S.HighlightDiscountedPrice>
                        <S.HighlightOriginalPrice>
                          R{" "}
                          {product.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </S.HighlightOriginalPrice>
                      </S.HighlightPriceRow>
                    ) : (
                      <S.HighlightPrice>
                        R{" "}
                        {product.price.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </S.HighlightPrice>
                    )}

                    {product.isLowStock && (
                      <S.HighlightLowStockText>
                        Few units available!
                      </S.HighlightLowStockText>
                    )}
                  </S.HighlightInfo>
                </S.CarouselItem>
              );
            })}
          </S.Carousel>

          <S.Dots>
            {highlightProducts.map((_, index) => (
              <S.Dot
                key={index}
                $active={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </S.Dots>
        </S.CarouselWrapper>
      )}

      {/* Grid de categorias */}
      <S.Title>Choose a category</S.Title>
      <S.CategoriesGrid>
        {CATEGORIES.map((cat) => (
          <S.CategoryCard
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <S.Emoji>{cat.emoji}</S.Emoji>
            <S.CategoryName>{cat.name}</S.CategoryName>
          </S.CategoryCard>
        ))}
      </S.CategoriesGrid>
    </S.Container>
  );
}
