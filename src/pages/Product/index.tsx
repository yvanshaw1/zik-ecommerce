import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../models/CartItem";
import { useProducts } from "../../hooks/useProducts";
import * as S from "./styles";

export function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById } = useProducts();
  const [quantity, setQuantity] = useState(1);

  // Busca o produto atual pelo id de rota.
  const product = id ? getProductById(id) : undefined;

  // Se não encontrar o produto, mostra tela simples de erro + botão de voltar.
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

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Garante quantidade mínima 1.
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Garante que a quantidade não ultrapasse o estoque disponível.
  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    const cartItem = new CartItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });

    const ok = addToCart(cartItem);
    if (ok === false) {
      alert("Not enough stock available for this product.");
      return;
    }

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
            <S.ProductPrice>{formatPrice(product.price)}</S.ProductPrice>

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
