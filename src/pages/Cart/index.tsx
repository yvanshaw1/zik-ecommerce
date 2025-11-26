import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useProducts } from "../../hooks/useProducts";
import { usePayment } from "../../hooks/usePayment";
import type { PaymentMethod } from "../../models/PaymentMethod";
import { LoginRequiredModal } from "../../components/LoginRequiredModal";
import * as S from "./styles";

// Tela de carrinho: integra carrinho, estoque, autenticação e pagamento.
export function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products } = useProducts();
  const { methods, selectedMethodId, selectMethod, getFinalTotal } =
    usePayment();

  const { items, removeFromCart, updateQuantity, clearCart, getTotal } =
    useCart();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast("Product removed from cart", {
      style: {
        background: "#FFA500",
        color: "#fff",
        border: "none",
      },
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity);
  };

  const handleClearCart = () => {
    if (window.confirm("Do you really want to clean the cart?")) {
      clearCart();
      toast("Cart cleared", {
        style: {
          background: "#ff0000",
          color: "#fff",
          border: "none",
        },
      });
    }
  };

  // Checkout:
  // - exige usuário logado
  // - exige método de pagamento selecionado
  // - aplica regra do método de pagamento no total
  const handleCheckout = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!selectedMethodId) {
      toast.error("Please select a payment method before purchasing.");
      return;
    }

    const baseTotal = getTotal();
    const finalTotal = getFinalTotal(baseTotal);

    toast.success(
      `Purchase completed successfully! Paid R$ ${finalTotal.toFixed(2)}.`
    );
    clearCart();
    navigate("/");
  };

  // Consulta o estoque atual do produto para travar botões +/−.
  const getProductStock = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.stock : 0;
  };

  // Estado de carrinho vazio.
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

  const baseTotal = getTotal();
  const finalTotal = selectedMethodId ? getFinalTotal(baseTotal) : baseTotal;

  return (
    <>
      <S.Container>
        <S.Header>
          <h1>My Cart</h1>
          <S.ButtonGroup>
            <S.HomeButton onClick={() => navigate("/")}>Home</S.HomeButton>
            <S.ClearButton onClick={handleClearCart}>Clean cart</S.ClearButton>
          </S.ButtonGroup>
        </S.Header>

        <S.Content>
          <S.ItemsList>
            {items.map((item) => {
              const stock = getProductStock(item.id);
              const isDecreaseDisabled = item.quantity === 1;
              const isIncreaseDisabled = stock === 0 || item.quantity >= stock;

              return (
                <S.CartItem key={item.id}>
                  <S.ItemImage src={item.image} alt={item.name} />
                  <S.ItemInfo>
                    <S.ItemName>{item.name}</S.ItemName>
                    <S.ItemPrice>R$ {item.price.toFixed(2)}</S.ItemPrice>
                  </S.ItemInfo>

                  <S.QuantityControl>
                    <S.QuantityButton
                      disabled={isDecreaseDisabled}
                      onClick={() => {
                        if (isDecreaseDisabled) return;
                        handleUpdateQuantity(item.id, item.quantity - 1);
                      }}
                    >
                      -
                    </S.QuantityButton>

                    <S.Quantity>{item.quantity}</S.Quantity>

                    <S.QuantityButton
                      disabled={isIncreaseDisabled}
                      onClick={() => {
                        if (isIncreaseDisabled) return;
                        handleUpdateQuantity(item.id, item.quantity + 1);
                      }}
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
              );
            })}
          </S.ItemsList>

          <S.Summary>
            <S.SummaryTitle>Order Summary</S.SummaryTitle>

            <S.SummaryRow>
              <span>Subtotal:</span>
              <span>R$ {baseTotal.toFixed(2)}</span>
            </S.SummaryRow>

            <S.SummaryRow>
              <span>Shipping:</span>
              <span></span>
            </S.SummaryRow>

            <S.Divider />

            {/* Seleção do método de pagamento com pré-visualização do total */}
            <S.PaymentMethods>
              <S.PaymentMethodsTitle>Payment method</S.PaymentMethodsTitle>

              <S.PaymentMethodsList>
                {methods.map((method: PaymentMethod) => (
                  <S.PaymentMethodButton
                    key={method.id}
                    selected={selectedMethodId === method.id}
                    onClick={() => selectMethod(method.id)}
                  >
                    <span>{method.name}</span>
                    {method.description && <small>{method.description}</small>}
                    <small>
                      Total: R$ {method.calculateTotal(baseTotal).toFixed(2)}
                    </small>
                  </S.PaymentMethodButton>
                ))}
              </S.PaymentMethodsList>
            </S.PaymentMethods>

            <S.TotalRow>
              <span>Total:</span>
              <span>R$ {finalTotal.toFixed(2)}</span>
            </S.TotalRow>

            <S.CheckoutButton
              onClick={handleCheckout}
              disabled={!selectedMethodId}
            >
              Purchase
            </S.CheckoutButton>
          </S.Summary>
        </S.Content>
      </S.Container>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
