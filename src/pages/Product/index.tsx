import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { PRODUCTS } from "../../constants/products";
import { useCart } from "../../hooks/useCart";
import type { CartItem } from "../../types";
import * as S from "./styles";

export function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Header />
        <S.Container>
          <S.ErrorMessage>Can't find product</S.ErrorMessage>
          <S.BackButton onClick={() => navigate(-1)}>Go back</S.BackButton>
        </S.Container>
      </>
    );
  }

  const formatarPreco = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    };
    addToCart(cartItem);
    alert(`${quantity}x ${product.name} Added to cart!`);
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.BackButton onClick={() => navigate(-1)}>← Back</S.BackButton>

        <S.ProductContainer>
          <S.ImageSection>
            <S.ProductImage src={product.image} alt={product.name} />
          </S.ImageSection>

          <S.InfoSection>
            <S.ProductName>{product.name}</S.ProductName>
            <S.ProductPrice>{formatarPreco(product.price)}</S.ProductPrice>

            <S.StockInfo>
              {product.stock > 0
                ? `${product.stock} available units`
                : "Soldout"}
            </S.StockInfo>

            <S.Description>
              <S.DescriptionTitle>Description</S.DescriptionTitle>
              <S.DescriptionText>{product.description}</S.DescriptionText>
            </S.Description>

            <S.Actions>
              <S.QuantitySelector>
                <S.QuantityButton onClick={decreaseQuantity}>
                  -
                </S.QuantityButton>
                <S.QuantityValue>{quantity}</S.QuantityValue>
                <S.QuantityButton onClick={increaseQuantity}>
                  +
                </S.QuantityButton>
              </S.QuantitySelector>

              <S.AddToCartButton
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "Add to cart" : "Soldout"}
              </S.AddToCartButton>
            </S.Actions>
          </S.InfoSection>
        </S.ProductContainer>
      </S.Container>
    </>
  );
}
