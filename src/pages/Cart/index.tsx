import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { toast } from "sonner";
import * as S from "./styles";

export function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } =
    useCart();

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success("Produto removido do carrinho");
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity);
  };

  const handleClearCart = () => {
    if (window.confirm("Deseja realmente limpar o carrinho?")) {
      clearCart();
      toast.success("Carrinho limpo");
    }
  };

  const handleCheckout = () => {
    toast.success("Compra finalizada com sucesso!");
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <S.Container>
        <S.EmptyCart>
          <h2>Seu carrinho está vazio</h2>
          <S.BackButton onClick={() => navigate("/")}>
            Voltar para a loja
          </S.BackButton>
        </S.EmptyCart>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <h1>Meu Carrinho</h1>
        <S.ClearButton onClick={handleClearCart}>Limpar carrinho</S.ClearButton>
      </S.Header>

      <S.Content>
        <S.ItemsList>
          {items.map((item) => (
            <S.CartItem key={item.id}>
              <S.ItemImage src={item.image} alt={item.name} />
              <S.ItemInfo>
                <S.ItemName>{item.name}</S.ItemName>
                <S.ItemPrice>R$ {item.price.toFixed(2)}</S.ItemPrice>
              </S.ItemInfo>
              <S.QuantityControl>
                <S.QuantityButton
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </S.QuantityButton>
                <S.Quantity>{item.quantity}</S.Quantity>
                <S.QuantityButton
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </S.QuantityButton>
              </S.QuantityControl>
              <S.ItemTotal>
                R$ {(item.price * item.quantity).toFixed(2)}
              </S.ItemTotal>
              <S.RemoveButton onClick={() => handleRemoveItem(item.id)}>
                ✕
              </S.RemoveButton>
            </S.CartItem>
          ))}
        </S.ItemsList>

        <S.Summary>
          <S.SummaryTitle>Resumo do Pedido</S.SummaryTitle>
          <S.SummaryRow>
            <span>Subtotal:</span>
            <span>R$ {getTotal().toFixed(2)}</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>Frete:</span>
            <span>Grátis</span>
          </S.SummaryRow>
          <S.Divider />
          <S.TotalRow>
            <span>Total:</span>
            <span>R$ {getTotal().toFixed(2)}</span>
          </S.TotalRow>
          <S.CheckoutButton onClick={handleCheckout}>
            Finalizar Compra
          </S.CheckoutButton>
        </S.Summary>
      </S.Content>
    </S.Container>
  );
}
