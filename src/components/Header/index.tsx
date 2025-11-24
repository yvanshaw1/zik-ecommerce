import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../contexts";
import * as S from "./styles";

export function Header() {
  const navigate = useNavigate();
  const { itens } = useCarrinho();

  return (
    <S.Container>
      <S.Logo onClick={() => navigate("/")}>ZiK!</S.Logo>
      <S.Nav>
        <S.NavButton onClick={() => navigate("/carrinho")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {itens.length > 0 && <span>({itens.length})</span>}
        </S.NavButton>
        <S.NavButton>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </S.NavButton>
      </S.Nav>
    </S.Container>
  );
}
