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
    toast.success("Product removed from cart");
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity);
  };

  const handleClearCart = () => {
    if (window.confirm("Do you really want to clean the cart?")) {
      clearCart();
      toast.success("Clean cart");
    }
  };

  const handleCheckout = () => {
    toast.success("Purchase completed successfully!");
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <S.Container>
        <S.EmptyCart>
          <h2>Your cart is empty</h2>
          <S.BackButton onClick={() => navigate("/")}>
            Return to the store
          </S.BackButton>
        </S.EmptyCart>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <h1>My Cart</h1>
        <S.ClearButton onClick={handleClearCart}>Clean cart</S.ClearButton>
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
          <S.SummaryTitle>Order Summary</S.SummaryTitle>
          <S.SummaryRow>
            <span>Subtotal:</span>
            <span>R$ {getTotal().toFixed(2)}</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>Shipping:</span>
            <span>Free</span>
          </S.SummaryRow>
          <S.Divider />
          <S.TotalRow>
            <span>Total:</span>
            <span>R$ {getTotal().toFixed(2)}</span>
          </S.TotalRow>
          <S.CheckoutButton onClick={handleCheckout}>Purchase</S.CheckoutButton>
        </S.Summary>
      </S.Content>
    </S.Container>
  );
}
