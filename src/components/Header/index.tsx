import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Settings, LogOut } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import * as S from "./styles";

export function Header() {
  const navigate = useNavigate();
  const { items } = useCart();
  const { user, logout } = useAuth();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <S.Container>
      <S.Logo onClick={handleLogoClick}>ZiK!</S.Logo>
      <S.Nav>
        {/* Cart button - always visible */}
        <S.CartButton onClick={() => navigate("/cart")}>
          <ShoppingCart size={20} color="white" />
          {totalItems > 0 && <S.Badge>{totalItems}</S.Badge>}
        </S.CartButton>

        {user ? (
          <>
            {/* Account button (gear icon) */}
            <S.NavButton onClick={() => navigate("/account")}>
              <Settings size={20} color="white" />
            </S.NavButton>

            {/* Logout button (exit icon) */}
            <S.NavButton onClick={handleLogout}>
              <LogOut size={20} color="white" />
            </S.NavButton>
          </>
        ) : (
          // Not logged in: show login button
          <S.NavButton onClick={() => navigate("/auth")}>
            <User size={20} color="white" />
          </S.NavButton>
        )}
      </S.Nav>
    </S.Container>
  );
}
