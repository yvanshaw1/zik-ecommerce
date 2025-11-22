import { useNavigate } from "react-router-dom";
import * as S from "./styles";

export function Header() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Logo onClick={() => navigate("/")}>ZiK!</S.Logo>
      <S.Nav>
        <S.NavButton>Carrinho</S.NavButton>
        <S.NavButton>Login</S.NavButton>
      </S.Nav>
    </S.Container>
  );
}
